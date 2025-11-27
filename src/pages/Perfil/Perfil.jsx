import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Personal/Header/Header";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import ModalRemoverEspecialidade from "../../components/Utils/ModalRemoverEspecialidade";
import { caringuApi } from '../../provider/caringuApi';
import { Toaster } from 'react-hot-toast';
import CustomToast from "../../components/Utils/CustomToast.jsx";
import FotoPerfil from "../../components/PerfilPersonal/FotoPerfil/FotoPerfil.jsx";
import { HiOutlineExternalLink, HiOutlineTrash } from "react-icons/hi";
import CidadeInput from "../../components/Utils/InputCidade/CidadeInput.jsx";
import MascaraTelefone from "../../components/Utils/Functions/MascaraTelefone.js";
import { useFotoPerfil } from "../../context/FotoPerfilContext";
import PreferenciasNotificacao from "../../components/PerfilPersonal/Secoes/PreferenciasNotificacao.jsx";
import toast from "react-hot-toast";

const Perfil = () => {
    const { fotoPerfil, setFotoPerfil } = useFotoPerfil();

    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("informacoes");
    const tipo = sessionStorage.getItem("tipo");
    const colunas = tipo === "PERSONAL" ? "lg:grid-cols-3" : "lg:grid-cols-2";
    const [formData, setFormData] = useState({});
    const alunoId = sessionStorage.getItem("pessoaId");
    const personalId = sessionStorage.getItem('pessoaId');

    const [showModal, setShowModal] = useState(false);
    const [idEspecialidade, setIdEspecialidade] = useState(null);
    const [novaEspecialidade, setNovaEspecialidade] = useState('');
    const [especialidadesSelecionadas, setEspecialidadesSelecionadas] = useState([]);
    const [sugestoesEspecialidade, setSugestoesEspecialidade] = useState([]);
    const [especialidadesDisponiveis, setEspecialidadesDisponiveis] = useState([]);

    // Funções de fetch reutilizáveis
    const fetchPersonalData = async () => {
        try {
            const response = await caringuApi.get(`/personal-trainers/${personalId}`);
            const celularComMascara = MascaraTelefone(response.data.celular);

            setFormData({
                ...response.data,
                celular: celularComMascara,
            });
            // Atualiza contexto de foto também
            setFotoPerfil(response.data.urlFotoPerfil || "");
        } catch (error) {
            console.error("Erro ao buscar personal trainer:", error);
        }
    };

    const fetchAlunoData = async () => {
        try {
            const response = await caringuApi.get(`/alunos/${alunoId}`);
            const celularComMascara = MascaraTelefone(response.data.celular);

            const dadosComMascara = {
                ...response.data,
                celular: celularComMascara,
            };

            setFormData(dadosComMascara);
            setFotoPerfil(response.data.urlFotoPerfil || "");
        } catch (error) {
            console.error("Erro ao buscar aluno:", error);
        }
    };

    // Busca inicial condicional baseada no tipo de usuário
    useEffect(() => {
        document.title = "Perfil | CaringU";
        if (tipo === "PERSONAL") {
            fetchPersonalData();
        } else if (tipo === "ALUNO") {
            fetchAlunoData();
        }
    }, [tipo, personalId, alunoId]);

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

            // Recarregar dados do personal via API (melhor que reload de página)
            await fetchPersonalData();
            toast.custom(t => <CustomToast t={t} type="success" message="Especialidades adicionadas com sucesso!" />);

        } catch (error) {
            console.error('Erro ao adicionar especialidades:', error);
            toast.custom(t => <CustomToast t={t} type="error" message="Erro ao adicionar especialidades." />);
        }
    };

    // Remover especialidade
    const handleRemoveEspecialidade = async (idEspecialidade) => {
        try {
            await caringuApi.delete(`/personal-trainers/${personalId}/especialidades/${idEspecialidade}`);

            setFormData((prev) => ({
                ...prev,
                especialidades: (prev.especialidades || []).filter(e => e.id !== idEspecialidade)
            }));
        } catch (error) {
            console.error("Erro ao remover especialidade:", error);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Não foi possível remover a especialidade. Tente novamente." />
            ));
        }
    };

    const removerMascara = (celular) => celular.replace(/\D/g, "");

    // Unifica handleSave para ALUNO e PERSONAL
    const handleSave = async () => {
        if (tipo === "ALUNO") {
            if (!alunoId) {
                toast.custom(t => <CustomToast t={t} type="error" message="ID do aluno não definido!" />);
                return;
            }

            const dataParaSalvar = {
                nome: formData.nome || undefined,
                email: formData.email || undefined,
                celular: formData.celular ? removerMascara(formData.celular) : undefined,
                urlFotoPerfil: formData.urlFotoPerfil || undefined,
                dataNascimento: formData.dataNascimento || undefined,
                genero: formData.genero || undefined,
                peso: formData.peso != null ? Number(formData.peso) : undefined,
                altura: formData.altura != null ? Number(formData.altura) : undefined,
                nivelAtividade: formData.nivelAtividade || undefined,
                nivelExperiencia: formData.nivelExperiencia || undefined,
            };

            try {
                await caringuApi.patch(`/alunos/${alunoId}`, dataParaSalvar);
                setFotoPerfil(formData.urlFotoPerfil || "");
                toast.custom(t => <CustomToast t={t} type="success" message="Perfil salvo com sucesso!" />);
            } catch (error) {
                toast.custom(t => <CustomToast t={t} type="error" message="Não foi possível salvar as informações do perfil." />);
                console.error("Erro ao atualizar informações (aluno):", error);
            }
            return;
        }

        if (tipo === "PERSONAL") {
            if (!personalId) {
                toast.custom(t => <CustomToast t={t} type="error" message="ID do personal não definido!" />);
                return;
            }

            const dataParaSalvarPersonal = {
                nome: formData.nome || undefined,
                email: formData.email || undefined,
                celular: formData.celular ? removerMascara(formData.celular) : undefined,
                urlFotoPerfil: formData.urlFotoPerfil || undefined,
                dataNascimento: formData.dataNascimento || undefined,
                genero: formData.genero || undefined,
                experiencia: formData.experiencia != null ? Number(formData.experiencia) : undefined,
                bairro: formData.bairro || undefined,
                nomeBairro: formData.nomeBairro || undefined,
                cref: formData.cref || undefined,
                nivelAtividade: formData.nivelAtividade || undefined,
                nivelExperiencia: formData.nivelExperiencia || undefined,
 especialidades: (formData.especialidades || []).map(e =>
        typeof e === "object" ? { id: e.id } : { id: e }
    ),
            };

            try {
                console.log("Enviando para API:", dataParaSalvarPersonal);

                await caringuApi.patch(`/personal-trainers/${personalId}`, dataParaSalvarPersonal);
                setFotoPerfil(formData.urlFotoPerfil || "");
                await fetchPersonalData();
                toast.custom(t => <CustomToast t={t} type="success" message="Perfil salvo com sucesso!" />);
            } catch (error) {
                toast.custom(t => <CustomToast t={t} type="error" message="Não foi possível salvar as informações do personal." />);
                console.error("Erro ao atualizar informações (personal):", error);
            }
            return;
        }
    };

    const handleCancelRemove = () => {
        setModalVisible(false);
        setIdEspecialidade(null);
    };

    const handleDeletarConta = async () => {
        const pessoaId = sessionStorage.getItem('pessoaId');

        try {
            await caringuApi.delete(`/personal-trainers/${pessoaId}`);
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Erro ao deletar conta:", error);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Não foi possível deletar a conta. Tente novamente." />
            ));
        }
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

        setFormData((prev) => ({ ...prev, celular: formatted }));
    };

    return (
        <div className="flex md:flex-row min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateral isOpen={true} />

            <div className="flex-1 flex flex-col w-full overflow-y-auto">
                <Header />

                <main className="flex-grow p-4 md:p-8 space-y-8 w-full h-[90vh]">
                    {modalVisible && (
                        <ModalRemoverEspecialidade
                            especialidadeId={idEspecialidade}
                            onConfirm={handleDeletarConta}
                            onCancel={handleCancelRemove}
                        />
                    )}

                    {/* Seções */}
                    <div className="w-full">
                        <div className="w-full h-full">
                            {/* Cabeçalho das abas */}
                            <div className="flex justify-center w-full mb-6 items-center">
                                <div
                                    className={`grid grid-cols-1 ${colunas} w-full max-w-[900px] justify-items-center`}
                                >
                                    {/* Informações pessoais */}
                                    <button
                                        onClick={() => setSelectedTab("informacoes")}
                                        className={`w-full max-w-[300px] px-6 py-2 text-md font-medium border-2 cursor-pointer transition-all duration-200 rounded-md 
                                                    ${selectedTab === "informacoes"
                                                ? "bg-[#E96E35] text-white border-[#E96E35]"
                                                : "bg-white text-black border-gray-200 hover:bg-gray-100 hover:text-black"
                                            }`}
                                    >
                                        Informações Pessoais
                                    </button>

                                    {/* Notificações (apenas para personal) */}
                                    {tipo === "PERSONAL" && (
                                        <button
                                            onClick={() => setSelectedTab("notificacao")}
                                            className={`w-full max-w-[300px] px-6 py-2 text-md font-medium border-2 cursor-pointer transition-all duration-200 rounded-md 
                                                        ${selectedTab === "notificacao"
                                                    ? "bg-[#E96E35] text-white border-[#E96E35]"
                                                    : "bg-white text-black border-gray-200 hover:bg-gray-100 hover:text-black"
                                                }`}
                                        >
                                            Notificações
                                        </button>
                                    )}

                                    {/* Redefinir Senha */}
                                    <button
                                        onClick={() => setSelectedTab("senha")}
                                        className={`w-full max-w-[300px] px-6 py-2 text-md font-medium border-2 flex items-center justify-center gap-2 transition-all duration-200 rounded-md
                                                    ${selectedTab === "senha"
                                                ? "bg-[#E96E35] text-white border-[#E96E35]"
                                                : "bg-white text-black border-gray-200 hover:bg-gray-100 hover:text-black"
                                            }`}
                                    >
                                        Redefinir Senha
                                        <HiOutlineExternalLink />
                                    </button>
                                </div>
                            </div>


                            {/* Conteúdo das abas */}
                            {selectedTab === "informacoes" && (
                                <div>
                                    {tipo === "ALUNO" ? (
                                        <div className="space-y-8">
                                            <FotoPerfil
                                                key={fotoPerfil || formData.urlFotoPerfil || 'foto-perfil'}
                                                urlFoto={fotoPerfil}
                                                nomePersonal={formData.nome || ""}
                                                onFotoChange={(novaFoto) => {
                                                    setFotoPerfil(novaFoto); // Atualizar o contexto
                                                    setFormData((prev) => ({ ...prev, urlFotoPerfil: novaFoto })); // Atualizar o estado local
                                                }}
                                            />


                                            <div className="bg-white border-2 border-[#1D2D441C] rounded-lg p-6 flex flex-col justify-center">
                                                <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center w-full p-2">
                                                    <h2 className="text-[24px] font-bold text-gray-800 flex justify-between items-center ">
                                                        Informações Pessoais
                                                    </h2>

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
                                                                value={formData.email || ""}
                                                                disabled
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
                                                            <select
                                                                name="genero"
                                                                className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                                                value={formData.genero || ""}
                                                                onChange={handleInputChange}
                                                            >
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
                                        </div>
                                    ) : (
                                        <div className="space-y-8">
                                            {/* Foto de Perfil */}
                                            <FotoPerfil
                                                key={fotoPerfil || formData.urlFotoPerfil || 'foto-perfil'}
                                                urlFoto={fotoPerfil}
                                                nomePersonal={formData.nome || ""}
                                                onFotoChange={(novaFoto) => {
                                                    setFotoPerfil(novaFoto); // Atualizar o contexto
                                                    setFormData((prev) => ({ ...prev, urlFotoPerfil: novaFoto })); // Atualizar o estado local
                                                }}
                                            />


                                            {/* Informações Profissionais */}
                                            <div className="bg-white border-2 border-[#1D2D441C] rounded-lg p-6 flex flex-col justify-center h-124.5">
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
                                                                            onClick={() => { setModalVisible(true); setIdEspecialidade(especialidade.id); }}
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
                                                                                    onClick={() => { setShowModal(false); setNovaEspecialidade(""); }}
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
                                    )}
                                </div>
                            )}

                            {selectedTab === "senha" && navigate("/esqueci-senha")}

                            {selectedTab === "notificacao" && (
                                <div className="flex items-center justify-center w-full h-full">
                                    <PreferenciasNotificacao />
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Perfil;