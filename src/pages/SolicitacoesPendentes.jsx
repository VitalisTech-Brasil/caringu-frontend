import React, { useState, useEffect } from "react";
import MenuLateral from "../components/Personal/MenuLateral/MenuLateral";
import Header from "../components/Personal/Header/Header";
import CardSolitacoes from "../components/Utils/CardSolitacoes";
import { useNavigate } from "react-router-dom";
import { caringuApi } from "../provider/caringuApi";

const SolicitacoesPendentes = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([]);

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const pessoaId = sessionStorage.getItem("pessoaId");
    const token = sessionStorage.getItem("authToken");

    const listarSolicitacoesPendentes = async () => {
        try {
            const response = await caringuApi.get(`/planos-contratados/solicitacoes-pendentes/${pessoaId}`, {

            });
            setSolicitacoesPendentes(response.data);
            console.log("Solicitações pendentes:", response.data);
        } catch (error) {
            console.error("Erro ao listar solicitações pendentes:", error);
        }
    }

    const atualizarStatus = async (id, status) => {
        try {
            await caringuApi.patch(
                `/planos-contratados/${id}/status`,
                { status },
            );
            listarSolicitacoesPendentes();
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
        }
    };

    useEffect(() => {
        document.title = "Solicitações Pendentes | Caringu";
        listarSolicitacoesPendentes();
    }, []);

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
                        {solicitacoesPendentes.length > 0 ? (
                            solicitacoesPendentes.map((solicitacao) => (
                                <CardSolitacoes
                                    key={solicitacao.id}
                                    nome={solicitacao.nomeAluno}
                                    nomePlano={solicitacao.nomePlano}
                                    telefone={solicitacao.celular ? solicitacao.celular : "Telefone não informado"}
                                    valorPlano={solicitacao.quantidadeAulas * solicitacao.valorAulas}
                                    confimarPagamento={() => atualizarStatus(solicitacao.id, "ATIVO")}
                                    cancelarSolicitacao={() => atualizarStatus(solicitacao.id, "INATIVO")}
                                />
                            ))
                        ) : (
                            <div className="text-center text-lg text-[var(--cor-primaria)]">
                                Nenhuma solicitação pendente encontrada.
                            </div>
                        )

                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default SolicitacoesPendentes;