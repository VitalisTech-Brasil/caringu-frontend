import { useEffect, useState } from 'react'
import FotoPerfil from '../PerfilPersonal/FotoPerfil/FotoPerfil';
import { caringuApi } from '../../provider/caringuApi';
import MascaraTelefone from '../Utils/Functions/MascaraTelefone';
import { toast, Toaster } from 'react-hot-toast';
import CustomToast from '../Utils/CustomToast';

export default function InformacoesPessoais() {

    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [idEspecialidade, setIdEspecialidade] = useState(false);
    const [novaEspecialidade, setNovaEspecialidade] = useState('');
    const [buscaEspecialidade, setBuscaEspecialidade] = useState("");

    const [especialidadesSelecionadas, setEspecialidadesSelecionadas] = useState([]);
    const [sugestoesEspecialidade, setSugestoesEspecialidade] = useState([]);
    const [especialidadesDisponiveis, setEspecialidadesDisponiveis] = useState([]);
    const [urlFotoPerfil, setUrlFotoPerfil] = useState("");

    const [nomeBairroAntigo, setNomeBairroAntigo] = useState("");

    const personalId = sessionStorage.getItem('pessoaId');

    useEffect(() => {
        document.title = "Perfil | CaringU"

        const fetchData = async () => {
            try {
                const response = await caringuApi.get(`/personal-trainers/${personalId}`);
                const celularComMascara = MascaraTelefone(response.data.celular);

                setNomeBairroAntigo(response.data.nomeBairro);
                setUrlFotoPerfil(response.data.urlFotoPerfil);

                setFormData({
                    ...response.data,
                    celular: celularComMascara,
                });
            } catch (error) {
                console.error("Erro ao buscar personal trainer:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        caringuApi.get('/especialidades')
            .then(response => {
                setEspecialidadesDisponiveis(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar especialidades:", error);
            });
    }, []);

    const handleAdicionarEspecialidades = async () => {
        try {
            await caringuApi.post(`/personal-trainers-especialidades/${personalId}`, {
                especialidades: especialidadesSelecionadas.map(e => ({
                    id: e.id,
                    nome: e.nome
                }))
            });

            setNovaEspecialidade('');
            setSugestoesEspecialidade([]);
            setEspecialidadesSelecionadas([]);
            setShowModal(false);

            window.location.reload(true);

        } catch (error) {
            console.error('Erro ao adicionar especialidades:', error);
        }
    };

    const handleBuscaEspecialidade = (e) => {
        const valor = e.target.value;
        setBuscaEspecialidade(valor);

        if (valor.length > 0) {
            const filtradas = especialidadesDisponiveis.filter(op =>
                op.nome.toLowerCase().includes(valor.toLowerCase()) &&
                !formData.especialidades?.some(esp => esp.id === op.id)
            );
            setSugestoesEspecialidade(filtradas);
        } else {
            setSugestoesEspecialidade([]);
        }
    };

    const selecionarEspecialidade = (especialidade) => {
        setFormData((prev) => ({
            ...prev,
            especialidades: [...(prev.especialidades || []), especialidade],
        }));
        setBuscaEspecialidade("");
        setSugestoesEspecialidade([]);
    };

    const removerMascara = (celular) => {
        return celular.replace(/\D/g, "");
    };

    const handleRemoveEspecialidade = async (idEspecialidade) => {

        try {
            await caringuApi.delete(`/personal-trainers/${personalId}/especialidades/${idEspecialidade}`);

            setFormData((prev) => ({
                ...prev,
                especialidades: prev.especialidades.filter(e => e.id !== idEspecialidade)
            }));
        } catch (error) {
            console.error("Erro ao remover especialidade:", error);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Não foi possível remover a especialidade. Tente novamente." />
            ));
        }
    };

    const handleCancelRemove = () => {
        setModalVisible(false);
        /* setEspecialidadeSelecionada(null); */
    };

    const handleTelefoneChange = (e) => {
        let input = e.target.value;
        let digitos = input.replace(/\D/g, "");

        if (digitos.length > 11) digitos = digitos.slice(0, 11);

        let formatted = "";

        if (digitos.length > 7) {
            formatted = `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
        } else if (digitos.length > 2) {
            formatted = `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
        } else if (digitos.length > 0) {
            formatted = `(${digitos}`;
        }

        setFormData((prev) => ({
            ...prev,
            celular: formatted,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "celular") {

            setFormData((prev) => ({
                ...prev,
                celular: MascaraTelefone(value),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSave = async () => {

        const celularSemMascara = removerMascara(formData.celular);
        const especialidadesIds = formData.especialidades?.map(e => e.id) ?? [];

        const dataParaSalvar = {
            ...formData,
            celular: celularSemMascara,
            especialidadesIds: especialidadesIds
        };

        try {
            await caringuApi.patch(`/personal-trainers/${personalId}`, dataParaSalvar);

            if (formData.idBairro) {

                await caringuApi.patch(`/personal-trainers/${personalId}/bairro`, {
                    bairroId: formData.idBairro,
                    novoNomeBairro: formData.bairro,
                    cidadeId: formData.idCidade,
                    novoNomeCidade: formData.cidade,
                });

                toast.custom((t) => (
                    <CustomToast t={t} type="success" message="Perfil salvo com sucesso!" />
                ));
            } else {

                if (!formData.bairro || !formData.cidade) {
                    toast.custom((t) => (
                        <CustomToast t={t} type="error" message="Preencha o bairro e a cidade para continuar." />
                    ));
                    return;
                }

                await caringuApi.post(`/personal-trainers/${personalId}/bairros`, {
                    nomeBairro: formData.bairro,
                    cidadeId: formData.idCidade,
                    nomeCidade: formData.cidade,
                });

                toast.custom((t) => (
                    <CustomToast t={t} type="success" message="Perfil salvo com sucesso!" />
                ));
            }

            window.location.reload(true);

        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Não foi possível salvar as informações do perfil." />
            ));
            console.error("Erro ao atualizar informações:", error);
        }
    };

    return (
        <>
            {/* Conteúdo da aba Informações Pessoais */}
            <div className="space-y-8">
                <FotoPerfil urlFoto={urlFotoPerfil} nomePersonal={formData.nome || ""} />

                {/* Informações Profissionais */}
                <div className="bg-white border-2 border-[#1D2D441C] rounded-lg p-6 flex flex-col justify-center h-124.5">
                    <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center w-full p-2">
                        <h2 className="text-[24px] font-bold text-gray-800 flex justify-between items-center ">
                            Informações Pessoais
                        </h2>
                        {/* Botões Salvar e Cancelar */}
                        <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-4 mt-4 sm:mt-0">
                            <button
                                className="w-full cursor-pointer sm:w-auto flex items-center justify-center px-6 py-2 text-base text-white bg-[#46982B] rounded-md hover:bg-[#4d7b3e]"
                                onClick={handleSave}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                    <div className="bg-white border-[#1d2d44] rounded-lg p-6 overflow-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[16px] font-medium text-gray-700">
                                    Nome completo
                                </label>
                                <input
                                    name="nome"
                                    type="text"
                                    className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                    placeholder="Digite seu nome completo"
                                    value={formData.nome || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-[16px] font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    className="form-input border border-gray-300 text-gray-400 bg-gray-200 rounded-md p-3 w-full text-[16px] cursor-not-allowed"
                                    placeholder="Digite seu email"
                                    value={formData.email || ""}
                                    onChange={handleInputChange}
                                    disabled={true}
                                />
                            </div>

                            <div>
                                <label className="block text-[16px] font-medium text-gray-700">
                                    Data de nascimento
                                </label>
                                <input
                                    name="dataNascimento"
                                    type="date"
                                    className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                    value={formData.dataNascimento || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-[16px] font-medium text-gray-700">
                                    Gênero
                                </label>
                                <select name="genero" className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]" value={formData.genero || ""} onChange={handleInputChange}>
                                    <option value="" disabled>Selecione</option>
                                    <option value="HOMEM_CISGENERO">Homem cisgênero</option>
                                    <option value="HOMEM_TRANSGENERO">Homem transgênero</option>
                                    <option value="MULHER_CISGENERO">Mulher cisgênero</option>
                                    <option value="MULHER_TRANSGENERO">Mulher transgênero</option>
                                    <option value="NAO_BINARIO">Não binário</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[16px] font-medium text-gray-700">
                                    Telefone
                                </label>
                                <input
                                    name="celular"
                                    type="tel"
                                    className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                    placeholder="(XX) XXXXX-XXXX"
                                    value={formData.celular || ""}
                                    onChange={handleTelefoneChange}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <Toaster position='top-right' reverseOrder={false} />
            </div>
        </>
    )
}
