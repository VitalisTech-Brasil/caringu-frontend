import React, { useState, useEffect } from "react";
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
    const [modalDeletarVisivel, setModalDeletarVisivel] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { fontSize, width } = useResponsiveStyles();

    function useResponsiveStyles() {
        const [styles, setStyles] = useState({ fontSize: "16px", width: "100%" });

        useEffect(() => {
            const updateStyles = () => {
                const screenWidth = window.innerWidth;

                if (screenWidth >= 1536) {
                    setStyles({ fontSize: "24px", width: "33%" });
                } else if (screenWidth >= 1280) {
                    setStyles({ fontSize: "20px", width: "33%" });
                } else if (screenWidth >= 640) {
                    setStyles({ fontSize: "16px", width: "33%" });
                } else {
                    setStyles({ fontSize: "14px", width: "50%" });
                }
            };

            updateStyles();
            window.addEventListener("resize", updateStyles);
            return () => window.removeEventListener("resize", updateStyles);
        }, []);

        return styles;
    }



    // const [modal2Visivel, setModal2Visivel] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const openDeleteModal = () => {
        setModalDeletarVisivel(true);
    };

    const confirmDelete = () => {
        alert("Plano excluído!");
        setModalDeletarVisivel(false);
    };




    const handleOpenModal = () => {
        setShowCreateModal(true);
    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
    };

    return (
        <>
            <div className="flex min-h-screen bg-[#fdfbf7]">
                <MenuLateral isOpen={isSidebarOpen} />
                <div className="flex-1 overflow-y-auto">
                    <Header toggleSidebar={toggleSidebar} />
                    <div className="w-full h-auto">
                        <div className="flex flex-row items-end justify-between flex-nowrap h-[170px] sm:h-[80px] w-full relative z-10">
                            <div className="h-full flex flex-row items-center sm:items-end pl-[2.5rem]">
                                <span className="text-[var(--cor-primaria)] font-medium text-lg sm:text-[24px] xl:text-[32px]">Planos criados </span>
                            </div>
                            <div className="h-full w-[35rem] flex  justify-center flex-col items-center sm:flex-row sm:justify-start sm:items-end gap-[22px] ">
                                <Button
                                    texto="Solitações Pendentes"
                                    logo={relogioIcon}
                                    width="53%"
                                    height="50px"
                                    color="#1D2D441C"
                                    corTexto="var(--cor-primaria)"
                                    borderStyle="solid"
                                    borderWidth="2px"
                                    borderColor="rgba(29, 45, 68, 0.11)"
                                    ariaLabel="Botão de Soluções Pendentes"
                                    fontSize={fontSize}
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
                                    width={width}
                                    color="#1D2D441C"
                                    corTexto="var(--cor-primaria)"
                                    fontSize={fontSize}
                                    fontWeight="300"
                                    corHover="#1D2D4417"
                                    onClick={handleOpenModal}
                                >
                                </Button>
                            </div>
                        </div>
                        <div className="ml-10 mt-4 overflow-x-auto max-w-[93vw]">
                            <div className="flex gap-9 w-fit">
                                <CardPlano
                                    onDeletar={openDeleteModal}
                                >
                                </CardPlano>
                                <CardPlano
                                    onDeletar={openDeleteModal}
                                >
                                </CardPlano>
                                <CardPlano
                                    onDeletar={openDeleteModal}
                                >
                                </CardPlano>
                                <CardPlano
                                    onDeletar={openDeleteModal}
                                >
                                </CardPlano>
                                <CardPlano
                                    onDeletar={openDeleteModal}
                                >
                                </CardPlano>

                            </div>
                        </div>
                    </div>


                    <div className="w-full  mt-3 pl-10 ">
                        <span className="font-medium  text-lg sm:text-[24px] xl:text-[32px] text-[var(--cor-primaria)]">Alunos com planos ativos</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
                    </div>

                    {/* Modal para criar */}
                    {showCreateModal && (
                        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
                            <div className="absolute inset-0 bg-[#000000] opacity-50"
                                aria-label="Fundo Escurecido"
                            ></div>
                            <div className="relative p-4 w-full max-w-2xl">
                                <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:p-5">
                                    {/* Header */}
                                    <div className="flex justify-between items-center pb-4 mb-4 ">
                                        <h3 className="text-lg font-semibold text-[var(--cor-primaria)]">
                                            Criar novo plano
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Formulário */}
                                    <form>
                                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[var(--cor-primaria)]">
                                                    Nome do plano
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Digite o nome"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-[var(--cor-primaria)]">
                                                    Período de duração do plano
                                                </label>
                                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                    <option value="">Selecionar</option>
                                                    <option value="musculacao">Musculação</option>
                                                    <option value="pilates">Pilates</option>
                                                    <option value="natacao">Natação</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[var(--cor-primaria)]">
                                                    Preço por aula
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Digite o nome"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[var(--cor-primaria)]">
                                                    Quantidade de aulas no período
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Digite o nome"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                        >
                                            Salvar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}



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
                /> */}

                    <Modal
                        visivel={modalDeletarVisivel}
                        fecharModal={() => setModalDeletarVisivel(false)}
                        titulo="Tem certeza que deseja excluir esse plano?"
                        descricao="Você não poderá disponibilizá-los futuramente"
                        onConfirm={confirmDelete}
                        icone={lixeira}
                        textoBotaoConfirmar="Manter Plano"
                        textoBotaoCancelar="Deletar mesmo assim"
                        ariaLabel="Modal de Exclusão de Plano"
                    />
                </div>
            </div>
        </>
    )
}

export default Planos;