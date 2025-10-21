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

    return (
        <div className="w-full h-full">
            {/* Cabeçalho das abas */}
            <div className="flex flex-col sm:flex-row justify-center w-full mb-6 items-center">
                <button
                    onClick={() => setSelectedTab("informacoes")}
                    className={`w-[60%] lg:w-[20%]  px-6 py-2 text-md font-medium border-2 cursor-pointer transition-colors duration-200 rounded-md ${selectedTab === "informacoes"
                        ? "bg-[#E96E35] text-white border-[#E96E35]"
                        : "bg-white text-black border-gray-200 hover:bg-gray-100 hover:text-black"
                        }`}
                >
                    Informações pessoais
                </button>
                {tipo === "PERSONAL" ? (
                    <button
                        onClick={() => setSelectedTab("notificacao")}
                        className={`w-[60%] lg:w-[20%]  px-6 py-2 text-md font-medium border-2 rounded-md cursor-pointer transition-colors duration-200 ${selectedTab === "notificacao"
                            ? "bg-[#E96E35] text-white border-[#E96E35]"
                            : "bg-white text-black border-gray-200 hover:bg-gray-100 hover:text-black"
                            }`}
                    >
                        Notificações
                    </button>
                ) : null}
                <button
                    onClick={() => setSelectedTab("senha")}
                    className={`w-[60%] lg:w-[20%]  px-6 py-2 text-md font-medium border-2 flex items-center cursor-pointer justify-center gap-2 transition-colors duration-200 rounded-md ${selectedTab === "senha"
                        ? "bg-[#E96E35] text-white border-[#E96E35]"
                        : "bg-white text-black border-gray-200 hover:bg-gray-100 hover:text-black"
                        }`}
                >
                    Redefinir Senha
                    <HiOutlineExternalLink />
                </button>
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