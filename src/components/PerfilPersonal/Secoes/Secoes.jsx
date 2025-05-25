import React, { useState } from "react";
import InformacoesPessoais from "./InformacoesPessoais";
import { useNavigate } from "react-router-dom";
import PreferenciasNotificacao from "./PreferenciasNotificacao";
import { HiOutlineExternalLink } from "react-icons/hi";

export default function Secoes() {
    const [selectedTab, setSelectedTab] = useState("informacoes");
    const navigate = useNavigate();

    return (
        <div className="w-full h-full">
            {/* Cabeçalho das abas */}
            <div className="flex flex-col sm:flex-row justify-center w-full gap-2 sm:gap-0 mb-6">
                <button
                    onClick={() => setSelectedTab("informacoes")}
                    className={`px-6 py-2 text-md font-medium border cursor-pointer transition-colors duration-200 rounded-t-md sm:rounded-l-md sm:rounded-tr-none sm:border-r-0 ${selectedTab === "informacoes"
                        ? "bg-[#E96E35] text-white border-[#E96E35]"
                        : "bg-white text-black border-gray-200 hover:bg-gray-100 hover:text-black"
                        }`}
                >
                    Informações pessoais
                </button>

                <button
                    onClick={() => setSelectedTab("notificacao")}
                    className={`px-6 py-2 text-md font-medium border-t border-b cursor-pointer transition-colors duration-200 sm:border ${selectedTab === "notificacao"
                        ? "bg-[#E96E35] text-white border-[#E96E35]"
                        : "bg-white text-black border-gray-200 hover:bg-gray-100 hover:text-black"
                        }`}
                >
                    Notificações
                </button>

                <button
                    onClick={() => setSelectedTab("senha")}
                    className={`px-6 py-2 text-md font-medium border flex items-center cursor-pointer justify-center gap-2 transition-colors duration-200 rounded-b-md sm:rounded-r-md sm:rounded-bl-none sm:border-l-0 ${selectedTab === "senha"
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
                    <InformacoesPessoais />
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