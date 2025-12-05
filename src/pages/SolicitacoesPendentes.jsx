import React, { useState, useEffect } from "react";
import MenuLateral from "../components/Personal/MenuLateral/MenuLateral";
import Header from "../components/Personal/Header/Header";
import CardSolitacoes from "../components/Utils/CardSolitacoes";
import { useNavigate } from "react-router-dom";
import { caringuApi } from "../provider/caringuApi";
import MascaraTelefone from "../components/Utils/Functions/MascaraTelefone";
import Modal from "../components/Utils/Modal";
import iconCancelar from "../assets/images/cancelar.png";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../components/Utils/CustomToast";
import alerta from "../assets/images/alert.svg";


const SolicitacoesPendentes = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalCancelarVisivel, setModalCancelarVisivel] = useState(false);
    const [solicitacaoParaCancelar, setSolicitacaoParaCancelar] = useState(null);


    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const pessoaId = sessionStorage.getItem("pessoaId");
    // authToken agora é enviado via cookie HttpOnly

    const listarSolicitacoesPendentes = async () => {
        try {
            const response = await caringuApi.get(`/planos-contratados/solicitacoes-pendentes/${pessoaId}`, {

            });
            setSolicitacoesPendentes(response.data);
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
            setModalCancelarVisivel(false);
            setSolicitacaoParaCancelar(null);
            if (status === "ATIVO") {
                toast.custom((t) => (
                    <CustomToast t={t} type="success" message="Pagamento confirmado!" />
                ));
            }else{
                toast.custom((t) => (
                    <CustomToast t={t} type="error" message="Cancelamento realizado!" />
                ));
            }
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            toast.custom((t) => (
                    <CustomToast t={t} type="error" message="Erro ao atualizar status!" />
                ));
        }
    };

    useEffect(() => {
        document.title = "Solicitações Pendentes | Caringu";
        listarSolicitacoesPendentes();
    }, []);

    const closeModal = () => {
        setShowModal(false);
        navigate("/login");
    };

    const handleCancelarSolicitacao = (solicitacaoId) => {
        setSolicitacaoParaCancelar(solicitacaoId);
        setModalCancelarVisivel(true);
    };

    // A autenticação é verificada no nível das rotas

    return (
        <>
            <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
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
                            <span className="text-[var(--cor-primaria)] text-xl sm:text-2xl md:text-[28px] font-medium ml-7">
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
                                    telefone={solicitacao.celular ? MascaraTelefone(solicitacao.celular) : "Telefone não informado"}
                                    valorPlano={solicitacao.quantidadeAulas * solicitacao.valorAulas}
                                    confimarPagamento={() => atualizarStatus(solicitacao.id, "ATIVO")}
                                    cancelarSolicitacao={() => handleCancelarSolicitacao(solicitacao.id)}
                                />
                            ))
                        ) : (
                            <div className="text-center text-lg text-[var(--cor-primaria)]">
                                Nenhuma solicitação pendente encontrada.
                            </div>
                        )

                        }
                    </div>
                    <Modal
                        visivel={modalCancelarVisivel}
                        fecharModal={() => setModalCancelarVisivel(false)}
                        titulo="Tem certeza que deseja Cancelar a Solicitação?"
                        descricao="Alteração de status para Cancelado"
                        onConfirm={() => {
                            if (solicitacaoParaCancelar) {
                                atualizarStatus(solicitacaoParaCancelar, "CANCELADO");
                            }
                        }}
                        icone={iconCancelar}
                        textoBotaoConfirmar="Voltar"
                        textoBotaoCancelar="Cancelar Solicitação"
                        ariaLabel="Modal de Cancelamento"
                    />
                    <Toaster position='top-right' reverseOrder={false} />
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                <h2 className="text-xl font-bold text-center text-[#D45C56] flex items-center justify-center space-x-2">
                                    <img src={alerta} alt="Alerta" className="w-6 h-6" />
                                    <span>Acesso Negado</span>
                                </h2>
                                <p className="text-center mt-4">
                                    <div>Sessão expirada ou não autenticado.</div>
                                    <div>Clique em "Redirecionar" para fazer login.</div>
                                </p>
                                <div className="flex justify-center mt-6">
                                    <button
                                        className="bg-[#D45C56] text-white px-4 py-2 rounded-lg cursor-pointer"
                                        onClick={closeModal}
                                    >
                                        Redirecionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SolicitacoesPendentes;