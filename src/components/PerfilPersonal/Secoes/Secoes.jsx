import React, { useState } from "react";
import InformacoesPessoaisPersonal from "./InformacoesPessoais";
import { useNavigate } from "react-router-dom";
import PreferenciasNotificacao from "./PreferenciasNotificacao";
import { HiOutlineExternalLink } from "react-icons/hi";
import InformacoesPessoaisAluno from "../../Aluno/InformacoesPessoaisAluno";

export default function Secoes() {
    const [selectedTab, setSelectedTab] = useState("informacoes");
    const navigate = useNavigate();
    const tipo = sessionStorage.getItem("tipo");
    const colunas = tipo === "PERSONAL" ? "lg:grid-cols-3" : "lg:grid-cols-2";

    return (
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
                        Informações pessoais
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
                        <InformacoesPessoaisAluno />
                    ) : (
                        <InformacoesPessoaisPersonal />
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
    );
}