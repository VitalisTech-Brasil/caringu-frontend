import React, { useEffect, useState } from 'react'
import FotoPerfil from '../FotoPerfil/FotoPerfil';
import { caringuApi } from '../../../provider/caringuApi';
import MascaraTelefone from '../../Utils/Functions/MascaraTelefone';
import { HiOutlineTrash } from 'react-icons/hi';

export default function InformacoesPessoais() {

    const [formData, setFormData] = useState({});

    useEffect(() => {
        document.title = "Perfil | CaringU"

        const pessoaId = sessionStorage.getItem('pessoaId');

        const fetchData = async () => {
            try {
                const response = await caringuApi.get(`/personal-trainers/${pessoaId}`);
                const celularComMascara = MascaraTelefone(response.data.celular);
                
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
        const pessoaId = sessionStorage.getItem('pessoaId');

        const celularSemMascara = removerMascara(formData.celular);
        const especialidadesIds = formData.especialidades?.map(e => e.id) ?? [];

        const dataParaSalvar = {
            ...formData,
            celular: celularSemMascara,
            especialidadesIds: especialidadesIds
        };

        const emailAnterior = sessionStorage.getItem('email');

        try {
            const response = await caringuApi.patch(`/personal-trainers/${pessoaId}`, dataParaSalvar);

            console.log("Dados atualizados com sucesso:", response.data);

            if (dataParaSalvar.email !== emailAnterior) {
                sessionStorage.clear();
                sessionStorage.setItem("modalMensagem", "Seu e-mail foi alterado. Por segurança, você será desconectado.");
                sessionStorage.setItem("modalTitulo", "Alteração de e-mail");

                window.dispatchEvent(new Event("sessaoExpirada"));

            } else {
                window.location.reload(true);
            }

        } catch (error) {
            console.error("Erro ao atualizar informações:", error);
        }
    };

    return (
        <>
            {/* Conteúdo da aba Informações Pessoais */}
            <div className="space-y-8">
                {/* Foto de Perfil */}
                <FotoPerfil />

                {/* Informações Profissionais */}
                <div className="bg-white shadow-md border-[#1d2d44] rounded-lg p-6 flex flex-col justify-center h-124.5">
                    <div className="flex justify-between items-center w-full p-2">
                        <h2 className="text-[24px] font-bold text-gray-800 flex justify-between items-center ">
                            Informações Profissionais
                        </h2>
                        {/* Botões Salvar e Cancelar */}
                        <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-4 mt-4 sm:mt-0">
                            <button
                                className="w-full sm:w-auto flex items-center justify-center px-6 py-2 text-base text-white bg-[#46982B] rounded-md hover:bg-[#4d7b3e]"
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
                                <div className="flex flex-wrap gap-2 overflow-x-auto">
                                    {formData.especialidades?.map((especialidade) => (
                                        <div key={especialidade.id} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md text-[16px]">
                                            {especialidade.nome}
                                            <button
                                                onClick={() => handleRemoveEspecialidade(especialidade.id)}
                                                className="text-red-600"
                                            >
                                                <HiOutlineTrash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        className="text-[16px] text-blue-600"
                                        onClick={() => {
                                            const nomeEspecialidade = prompt("Digite a nova especialidade:");
                                            if (nomeEspecialidade) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    especialidades: [
                                                        ...(prev.especialidades || []),
                                                        { id: null, nome: nomeEspecialidade },
                                                    ],
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
                                    type="text"
                                    maxLength={2}
                                    className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                    placeholder="Digite os anos de experiência"
                                    value={formData.experiencia || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-[16px] font-medium text-gray-700">
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                    placeholder="Digite sua cidade"
                                    value={formData.cidade || "São Paulo"}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-[16px] font-medium text-gray-700">
                                    Bairro
                                </label>
                                <input
                                    type="text"
                                    className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                                    placeholder="Digite seu bairro"
                                    value={formData.bairro || "Vila Prudente"}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
