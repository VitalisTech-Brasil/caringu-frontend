import React, { useState } from "react";
import Header from "../../components/Personal/Header/Header";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import Button from "../../components/Utils/Button";
import relogioIcon from "../../assets/images/clock.png";
import addPlanoIcon from "../../assets/images/additem.svg";
import CardPlano from "../../components/Utils/CardPlano";
import CardAlunoAtivos from "../../components/Utils/CardAlunoAtivos";
import Modal from "../../components/Utils/Modal";
import iconCancelar from "../../assets/images/cancelar.png";
import lixeira from "../../assets/images/trash.png";

const Planos = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // const [modal1Visivel, setModal1Visivel] = useState(false);
    // const [modal2Visivel, setModal2Visivel] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <>
            <div className="flex min-h-screen bg-[#fdfbf7]">
                <MenuLateral isOpen={isSidebarOpen} />
                <div className="flex-1">
                    <Header toggleSidebar={toggleSidebar} />
                    <div className="flex flex-row items-end justify-between flex-nowrap h-[80px] w-full">
                        <div className="h-full flex flex-row items-end pl-[2.5rem]">
                            <span className="text-[var(--cor-primaria)] font-medium text-[32px]">Planos criados </span>
                        </div>
                        <div className="h-full w-[35rem] flex flex-row items-end gap-[22px] justify-start">
                            <Button
                                texto="Solitições Pendentes"
                                logo={relogioIcon}
                                width="300px"
                                height="50px"
                                color="#1D2D441C"
                                corTexto="var(--cor-primaria)"
                                borderStyle="solid"
                                borderWidth="2px"
                                borderColor="rgba(29, 45, 68, 0.11)"
                                ariaLabel="Botão de Soluções Pendentes"
                                fontSize="24px"
                                fontWeight="300"
                                corHover="#1D2D4417"
                            >
                            </Button>
                            <Button
                                texto="Criar Plano"
                                logo={addPlanoIcon}
                                borderStyle="solid"
                                borderWidth="2px"
                                borderColor="rgba(29, 45, 68, 0.11)"
                                ariaLabel="Botão de Criar Plano"
                                height="50px"
                                width="190px"
                                color="#1D2D441C"
                                corTexto="var(--cor-primaria)"
                                fontSize="24px"
                                fontWeight="300"
                                corHover="#1D2D4417"
                            >
                            </Button>
                        </div>
                    </div>
                    <div className="ml-10 mt-4 overflow-x-auto max-w-[93vw]">
                        <div className="flex gap-9 w-fit">
                            <CardPlano  />
                            <CardPlano />
                            <CardPlano  />
                            <CardPlano />
                            <CardPlano />
                        </div>
                    </div>
                    <div className="w-full  mt-3 pl-10 ">
                        <span className="font-medium text-[32px] text-[var(--cor-primaria)]">Alunos com planos ativos</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
                    </div>

                
                                

                    {/* <div className="p-8 flex gap-4">
                    <button
                        onClick={() => setModal1Visivel(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Abrir Modal 1
                    </button>

                    <button
                        onClick={() => setModal2Visivel(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        Abrir Modal 2
                    </button>
                </div>

                <Modal
                    visivel={modal1Visivel}
                    fecharModal={() => setModal1Visivel(false)}
                    titulo="Tem certeza que deseja cancelar?"
                    descricao="Alterações que não forem salvas serão perdidas"
                    onConfirm={() => {
                        setModal1Visivel(false);
                    }}
                    icone={iconCancelar}
                     textoBotaoConfirmar="Voltar"
                     textoBotaoCancelar="Cancelar mesmo assim"
                     ariaLabel="Modal de Cancelamento"
                />

                <Modal
                    visivel={modal2Visivel}
                    fecharModal={() => setModal2Visivel(false)}
                    titulo="Tem certeza que deseja excluir esse plano?"
                    descricao="Você não poderá disponibilizá-los futuramente"
                    onConfirm={() => {
                        alert("Plano excluído!");
                        setModal2Visivel(false);
                    }}
                    icone={lixeira}
                    textoBotaoConfirmar="Manter Plano"
                    textoBotaoCancelar="Deletar mesmo assim"
                    ariaLabel="Modal de Exclusão de Plano"
                /> */}
                </div>
            </div>
        </>
    )
}

export default Planos;