import { Tabs } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";
import Header from "../../components/Personal/Header/Header";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import ModalRemoverEspecialidade from "../../components/Utils/ModalRemoverEspecialidade";

import { caringuApi } from '../../provider/caringuApi';

const Perfil = () => {

    const [formData, setFormData] = useState({});

    useEffect(() => {
        const pessoaId = sessionStorage.getItem('pessoaId');
        const token = sessionStorage.getItem('authToken');

        const fetchData = async () => {
            try {
                const response = await caringuApi.get(`/personal-trainers/${pessoaId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const celularComMascara = formatarCelular(response.data.celular);
                console.log(response.data);
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

    const [selectedTab, setSelectedTab] = useState("informacoes");

    const [modalVisible, setModalVisible] = useState(false);
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(null);
    const [deletarContaModal, setDeletarContaModal] = useState(false);

    const navigate = useNavigate();

    const handleRemoveEspecialidade = async (especialidade) => {
        const pessoaId = sessionStorage.getItem('pessoaId');
        const token = sessionStorage.getItem('authToken');

        try {
            await caringuApi.delete(`/personal-trainers/${pessoaId}/especialidades/${especialidade}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setFormData((prev) => ({
                ...prev,
                especialidade: prev.especialidade.filter((item) => item !== especialidade),
            }));
        } catch (error) {
            console.error("Erro ao remover especialidade:", error);
            alert("Não foi possível remover a especialidade. Tente novamente.");
        }
    };

    const handleConfirmRemove = (especialidadeId) => {
        setFormData((prev) => ({
            ...prev,
            especialidade: prev.especialidade.filter((item) => item !== especialidadeId),
        }));
        setModalVisible(false);
    };

    const handleCancelRemove = () => {
        setModalVisible(false);
        setEspecialidadeSelecionada(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "celular") {

            setFormData((prev) => ({
                ...prev,
                celular: formatarCelular(value),
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

        setFormData((prev) => ({
            ...prev,
            celular: formatted,
        }));
    };

    const formatarCelular = (celular) => {
        let digitos = celular.replace(/\D/g, "");

        if (digitos.length > 11) digitos = digitos.slice(0, 11);

        if (digitos.length > 7) {
            return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
        } else if (digitos.length > 2) {
            return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
        } else if (digitos.length > 0) {
            return `(${digitos}`;
        }

        return celular;
    }

    const removerMascara = (celular) => {
        return celular.replace(/\D/g, "");
    };

    const handleSave = async () => {
        const pessoaId = sessionStorage.getItem('pessoaId');
        const token = sessionStorage.getItem('authToken');

        const celularSemMascara = removerMascara(formData.celular);

        const dataParaSalvar = {
            ...formData,
            celular: celularSemMascara,
        };

        try {
            const response = await caringuApi.patch(`/personal-trainers/${pessoaId}`, dataParaSalvar, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Dados atualizados com sucesso:", response.data);
            window.location.reload(true);
        } catch (error) {
            console.error("Erro ao atualizar informações:", error);
        }
    };

    const handleDeletarConta = async () => {
        const pessoaId = sessionStorage.getItem('pessoaId');
        const token = sessionStorage.getItem('authToken');

        try {
            await caringuApi.delete(`/personal-trainers/${pessoaId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            navigate("/", { replace: true });
        } catch (error) {
            console.error("Erro ao deletar conta:", error);
            alert("Não foi possível deletar a conta. Tente novamente.");
        }
    };

    return (
        <div className="flex min-h-screen bg-[#fdfcf9]">
            {/* Menu Lateral */}
            <MenuLateral isOpen={true} />

            <div className="flex-1">
                {/* Cabeçalho */}
                <Header />

                <main className="p-8 space-y-8">
                    {/* Modal */}
                    {modalVisible && (
                        <ModalRemoverEspecialidade
                            especialidadeId={especialidadeSelecionada}
                            onConfirm={handleDeletarConta}
                            onCancel={handleCancelRemove}
                        />
                    )}

                    {/* Abas de Navegação */}
                    <Tabs>
                        <Tabs.Item
                            active={selectedTab === "informacoes"}
                            title="Informações pessoais"
                            onClick={() => setSelectedTab("informacoes")}
                        >
                            {/* Conteúdo da aba Informações Pessoais */}
                            <div className="space-y-8">
                                {/* Foto de Perfil */}
                                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
                                    {/* Imagem e Texto */}
                                    <div className="flex items-center gap-4">
                                        <img
                                            src="https://via.placeholder.com/150"
                                            alt="Foto de Perfil"
                                            className="w-28 h-28 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="text-[16px] font-semibold text-gray-800">
                                                Foto de perfil
                                            </h3>
                                            <p className="text-[14px] text-gray-500">
                                                PNG, JPEG, menos de 15MB
                                            </p>
                                        </div>
                                    </div>

                                    {/* Botões */}
                                    <div className="flex gap-4">
                                        <button className="flex items-center gap-2 px-4 py-2 text-[16px] text-gray-700 border border-gray-300 rounded-md">
                                            <HiOutlineUpload className="w-5 h-5" />
                                            Carregar foto
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 text-[16px] text-white bg-red-700 rounded-md">
                                            <HiOutlineTrash className="w-5 h-5" />
                                            Remover foto
                                        </button>
                                    </div>
                                </div>

                                {/* Informações Profissionais */}
                                <div className="bg-white shadow-md rounded-lg p-6">
                                    <h2 className="text-[18px] font-bold text-gray-800 mb-4">
                                        Informações Profissionais
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                                placeholder="Digite seu email"
                                                value={formData.email || ""}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[16px] font-medium text-gray-700">
                                                Especialidade
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.especialidades?.map((especialidade, index) => (
                                                    <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md text-[16px]">
                                                        {especialidade}
                                                        <button
                                                            onClick={() => handleRemoveEspecialidade(especialidade)}
                                                            className="text-red-600"
                                                        >
                                                            <HiOutlineTrash className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button
                                                    className="text-[16px] text-blue-600"
                                                    onClick={() => {
                                                        const novaEspecialidade = prompt("Digite a nova especialidade:");
                                                        if (novaEspecialidade) {
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                especialidade: [...prev.especialidade, novaEspecialidade],
                                                            }));
                                                        }
                                                    }}
                                                >
                                                    + Adicionar
                                                </button>
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
                                                type="number"
                                                className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                                placeholder="Digite os anos de experiência"
                                                value={formData.experiencia || ""}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            {/* <label className="block text-[16px] font-medium text-gray-700">
                                                Cidade
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                                placeholder="Digite sua cidade"
                                                value={formData.cidade || "São Paulo"}
                                                onChange={handleInputChange}
                                            /> */}
                                        </div>
                                    </div>

                                    {/* Botões Salvar e Cancelar */}
                                    <div className="flex justify-end gap-4 mt-6">
                                        <span className="px-6 py-2 text-[16px] text-white bg-[#B41F1F] rounded-md hover:bg-red-800"
                                            onClick={() => setModalVisible(true) }
                                        >
                                            Deletar Conta
                                        </span>
                                        <button
                                            className="px-6 py-2 text-[16px] text-white bg-[#46982B] rounded-md hover:bg-green-700"
                                            onClick={handleSave}
                                        >
                                            Salvar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Item>

                        <Tabs.Item
                            active={selectedTab === "senha"}
                            title="Atualizar Senha"
                            onClick={() => setSelectedTab("senha")}
                        >
                            {/* Conteúdo da aba Atualizar Senha */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700">
                                        Senha atual
                                    </label>
                                    <input
                                        type="password"
                                        className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                        placeholder="Digite sua senha atual"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700">
                                        Nova senha
                                    </label>
                                    <input
                                        type="password"
                                        className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                        placeholder="Digite sua nova senha"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[16px] font-medium text-gray-700">
                                        Confirmar nova senha
                                    </label>
                                    <input
                                        type="password"
                                        className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                        placeholder="Confirme sua nova senha"
                                    />
                                </div>
                            </div>
                        </Tabs.Item>

                        <Tabs.Item
                            active={selectedTab === "notificacao"}
                            title="Notificação"
                            onClick={() => setSelectedTab("notificacao")}
                        >
                            {/* Conteúdo da aba Notificação */}
                            <p className="text-[16px] text-gray-700">
                                Configurações de notificação em breve.
                            </p>
                        </Tabs.Item>
                    </Tabs>
                </main>
            </div>
        </div>
    );
};

export default Perfil;