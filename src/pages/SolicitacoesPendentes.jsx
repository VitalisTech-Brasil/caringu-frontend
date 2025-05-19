import React, { useState } from "react";
import MenuLateral from "../components/Personal/MenuLateral/MenuLateral";
import Header from "../components/Personal/Header/Header";
import CardSolitacoes from "../components/Utils/CardSolitacoes";
import { useNavigate } from "react-router-dom";

const SolicitacoesPendentes = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    return (
        <>
            <div className="flex min-h-screen bg-[#fdfbf7]">
                <MenuLateral isOpen={isSidebarOpen} />
                <div className="flex-1 overflow-y-auto">
                    <Header onToggleSidebar={toggleSidebar} />
                    <div className="w-full h-auto">
                        <div className="pl-[1.5rem] sm:pl-[2.5rem] pt-2 pb-2 w-full h-auto flex flex-row items-center justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none"
                                className="cursor-pointer"
                                onClick={() => navigate("/planos")}>
                                <path d="M21.1331 13.0957L7.72852 26.5003L21.1331 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M45.2717 26.5H8.10547" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[var(--cor-primaria)] text-xl sm:text-2xl md:text-[28px] xl:text-[32px] font-medium ml-7">
                                Solicitações de planos pendentes
                            </span>
                        </div>

                    </div>
                    <div className="grid grid-cols-1 gap-7 pt-2">
                        <CardSolitacoes />
                        <CardSolitacoes />
                        <CardSolitacoes />
                        <CardSolitacoes />
                        <CardSolitacoes />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SolicitacoesPendentes;