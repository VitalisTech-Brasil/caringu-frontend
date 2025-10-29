import React, { useEffect, useState } from "react";
import { caringuApi } from "../../provider/caringuApi";
import { toast } from "react-hot-toast";
import CustomToast from "../Utils/CustomToast";
import FotoPerfil from "../../components/PerfilPersonal/FotoPerfil/FotoPerfil";
import MascaraTelefone from "../Utils/Functions/MascaraTelefone";

export default function InformacoesPessoaisAluno() {
    const [formData, setFormData] = useState({});
    const [urlFotoPerfil, setUrlFotoPerfil] = useState("");
    const [alunoData, setAlunoData] = useState({});

    const alunoId = sessionStorage.getItem("pessoaId");

    useEffect(() => {
        document.title = "Perfil | CaringU";
        const fetchData = async () => {
            try {
                const response = await caringuApi.get(`/alunos/${alunoId}`);
                const celularComMascara = MascaraTelefone(response.data.celular);

                const dadosComMascara = {
                    ...response.data,
                    celular: celularComMascara,
                };

                setUrlFotoPerfil(response.data.urlFotoPerfil);
                setFormData(dadosComMascara);
                setAlunoData(dadosComMascara);
            } catch (error) {
                console.error("Erro ao buscar aluno:", error);
            }
        };

        fetchData();
    }, [alunoId]);

    const removerMascara = (celular) => celular.replace(/\D/g, "");

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
        if (!alunoId) {
            console.error("ID do aluno não definido!");
            return;
        }

        const dataParaSalvar = {};

        if (formData.nome) dataParaSalvar.nome = formData.nome;
        if (formData.email) dataParaSalvar.email = formData.email;
        if (formData.celular) dataParaSalvar.celular = removerMascara(formData.celular);
        if (formData.urlFotoPerfil) dataParaSalvar.urlFotoPerfil = formData.urlFotoPerfil;
        if (formData.dataNascimento) dataParaSalvar.dataNascimento = formData.dataNascimento;
        if (formData.genero) dataParaSalvar.genero = formData.genero;
        if (formData.peso != null) dataParaSalvar.peso = Number(formData.peso);
        if (formData.altura != null) dataParaSalvar.altura = Number(formData.altura);
        if (formData.nivelAtividade) dataParaSalvar.nivelAtividade = formData.nivelAtividade;
        if (formData.nivelExperiencia) dataParaSalvar.nivelExperiencia = formData.nivelExperiencia;

        try {
            await caringuApi.patch(`/alunos/${alunoId}`, dataParaSalvar);

            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Perfil salvo com sucesso!" />
            ));

            setAlunoData((prev) => ({ ...prev, ...dataParaSalvar }));

            setFormData((prev) => ({ ...prev, ...dataParaSalvar }));
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Não foi possível salvar as informações do perfil." />
            ));
            console.error("Erro ao atualizar informações:", error);
        }
    };


    return (
        <>
            <div className="space-y-8">
                <FotoPerfil
                    urlFoto={urlFotoPerfil}
                    nomePersonal={alunoData.nome || ""}
                    onFotoChange={(novaUrl) => setUrlFotoPerfil(novaUrl)}
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
        </>
    );
}
