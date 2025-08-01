import React, { useEffect, useState } from 'react'
import FotoPerfil from '../FotoPerfil/FotoPerfil';
import { caringuApi } from '../../../provider/caringuApi';
import MascaraTelefone from '../../Utils/Functions/MascaraTelefone';
import { HiOutlineTrash } from 'react-icons/hi';
import ModalRemoverEspecialidade from '../../Utils/ModalRemoverEspecialidade';

import { toast, Toaster } from 'react-hot-toast';
import CustomToast from '../../Utils/CustomToast';
import CidadeInput from '../../Utils/InputCidade/CidadeInput';

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

                

                console.log(response.data);
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
            alert("Não foi possível remover a especialidade. Tente novamente.");
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
                {/* Foto de Perfil */}
                <FotoPerfil urlFoto={urlFotoPerfil} nomePersonal={formData.nome || ""} />

                {/* Informações Profissionais */}
                <div className="bg-white shadow-md border-[#1d2d44] rounded-lg p-6 flex flex-col justify-center h-124.5">
                    <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center w-full p-2">
                        <h2 className="text-[24px] font-bold text-gray-800 flex justify-between items-center ">
                            Informações Profissionais
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
                                    Especialidade
                                </label>
                                <div className="flex flex-wrap gap-2 overflow-x-auto">
                                    {formData.especialidades?.map((especialidade) => (

                                        <div key={especialidade.id} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md text-[16px]">
                                            {especialidade.nome}
                                            <button
                                                onClick={() => { setModalVisible(true), setIdEspecialidade(especialidade.id) }}
                                                className="text-red-600"
                                            >
                                                <HiOutlineTrash className="w-5 h-5 cursor-pointer" />
                                            </button>
                                        </div>
                                    ))}

                                    {modalVisible && (
                                        <ModalRemoverEspecialidade
                                            especialidadeId={idEspecialidade}
                                            onConfirm={handleRemoveEspecialidade}
                                            onCancel={handleCancelRemove}
                                        />
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button className='cursor-pointer' onClick={() => setShowModal(true)}>+ Adicionar</button>
                                    </div>

                                    {showModal && (
                                        <div className="fixed inset-0 bg-[#0000007b] bg-opacity-50 flex items-center justify-center z-50">
                                            <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
                                                <h3 className="text-lg font-semibold mb-4">Nova Especialidade</h3>

                                                <input
                                                    type="text"
                                                    value={novaEspecialidade}
                                                    onChange={(e) => {
                                                        const valor = e.target.value;
                                                        setNovaEspecialidade(valor);

                                                        if (valor.length > 0) {
                                                            const filtradas = especialidadesDisponiveis.filter(op =>
                                                                op.nome.toLowerCase().includes(valor.toLowerCase()) &&
                                                                !formData.especialidades?.some(esp => esp.id === op.id) &&
                                                                !especialidadesSelecionadas.some(esp => esp.id === op.id)
                                                            );
                                                            setSugestoesEspecialidade(filtradas);
                                                        } else {
                                                            setSugestoesEspecialidade([]);
                                                        }
                                                    }}
                                                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                                                    placeholder="Digite a nova especialidade"
                                                />

                                                {sugestoesEspecialidade.length > 0 && (
                                                    <ul className="border border-gray-300 rounded-md max-h-40 overflow-y-auto mb-4">
                                                        {sugestoesEspecialidade.map((opcao) => (
                                                            <li
                                                                key={opcao.id}
                                                                onClick={() => {
                                                                    setEspecialidadesSelecionadas((prev) => {
                                                                        if (!prev.some(e => e.id === opcao.id)) {
                                                                            return [...prev, opcao];
                                                                        }
                                                                        return prev;
                                                                    });
                                                                    setNovaEspecialidade('');
                                                                    setSugestoesEspecialidade([]);
                                                                }}
                                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                            >
                                                                {opcao.nome}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {especialidadesSelecionadas.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4 max-h-40 overflow-y-auto border border-gray-200 p-2 rounded">
                                                        {especialidadesSelecionadas.map((esp, index) => (
                                                            <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2">
                                                                {esp.nome}
                                                                <button
                                                                    onClick={() =>
                                                                        setEspecialidadesSelecionadas(prev =>
                                                                            prev.filter((_, i) => i !== index)
                                                                        )
                                                                    }
                                                                    className="text-red-600 font-bold cursor-pointer h-3.5 flex justify-center items-center"
                                                                >
                                                                    &times;
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex justify-end gap-4 mt-4">
                                                    <button
                                                        onClick={() => { setShowModal(false), setNovaEspecialidade("") }}
                                                        className="text-gray-600 hover:text-gray-800 cursor-pointer"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        onClick={handleAdicionarEspecialidades}
                                                        className="px-4 py-2 bg-[#E96E35] hover:bg-orange-500 text-white rounded-md cursor-pointer"
                                                    >
                                                        Adicionar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
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
                            <div>
                                <label className="block text-[16px] font-medium text-gray-700">
                                    CREF
                                </label>
                                <input
                                    name="cref"
                                    type="text"
                                    className="form-input border border-gray-300 text-gray-400 bg-gray-200 rounded-md p-3 w-full text-[16px] cursor-not-allowed"
                                    placeholder="Digite seu CREF"
                                    value={formData.cref || ""}
                                    disabled={true}
                                />
                            </div>
                            <div>
                                <label className="block text-[16px] font-medium text-gray-700">
                                    Anos de experiência
                                </label>
                                <input
                                    name="experiencia"
                                    type="text"
                                    maxLength={2}
                                    className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                    placeholder="Digite os anos de experiência"
                                    value={formData.experiencia || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <CidadeInput formData={formData} setFormData={setFormData} />
                            <div>
                                <label className="block text-[16px] font-medium text-gray-700">
                                    Bairro
                                </label>
                                <input
                                    type="text"
                                    name="bairro"
                                    className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                    placeholder="Digite seu bairro"
                                    value={formData.bairro || ""}
                                    onChange={handleInputChange}
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
