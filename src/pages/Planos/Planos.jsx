import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import alerta from "../../assets/images/alert.svg";
import { caringuApi } from "../../provider/caringuApi";
import toast from 'react-hot-toast';
import CustomToast from '../../components/Utils/CustomToast';
import { Toaster } from 'react-hot-toast';
import ModalPlano from "../../components/Utils/ModalPlano";
import CardAluno from "../../components/Utils/GerenciarAlunos/CardAluno";

const Planos = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalDeletarVisivel, setModalDeletarVisivel] = useState(false);
    const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [modalCancelarPlanoVisivel, setModalCancelarPlanoVisivel] = useState(false);
    const [planos, setPlanos] = useState([])
    const [planoIdParaDeletar, setPlanoIdParaDeletar] = useState(null);
    const [planoEditado, setPlanoEditado] = useState(null);
    const [alunosAtivos, setAlunosAtivos] = useState([]);
    const [imgErro, setImgErro] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);


    const { fontSize, width } = useResponsiveStyles();
    const navigate = useNavigate();

    const pessoaId = sessionStorage.getItem("pessoaId");

    const fetchPlanos = async () => {
        try {
            const response = await caringuApi.get(`/planos/${pessoaId}`);
            setPlanos(response.data);
        } catch (error) {
            console.error("Erro ao buscar planos:", error);
        }
    };

    const alunosPlanosAtivos = async () => {
        try {
            const response = await caringuApi.get(`/alunos/detalhes/personal/${pessoaId}`)
            setAlunosAtivos(response.data);
        } catch (error) {
            console.error("Erro ao buscar alunos com planos ativos:", error);
        }
    }

    function formatarNivelExperiencia(nivel) {
        if (!nivel) {
            return 'Nível não informado';
        }
        switch (nivel) {
            case 'INICIANTE':
                return 'Iniciante';
            case 'INTERMEDIARIO':
                return 'Intermediário';
            case 'AVANCADO':
                return 'Avançado';
            default:
                return nivel;
        }
    }

    useEffect(() => {
        document.title = "Planos | Caringu";
        fetchPlanos();
        alunosPlanosAtivos();
    }, []);




    const cadastrarPlano = async (data) => {
        try {
            const payload = {
                nome: data.plano,
                periodo: data.duracao,
                quantidadeAulas: Number(data.aulas),
                valorAulas: Number(data.preco),
            };

            await caringuApi.post(`/planos/${pessoaId}`, payload);


            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Plano criado com sucesso!" />
            ));

            await fetchPlanos();

            setShowCreateModal(false);
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao criar plano. Verifique os dados e tente novamente." />
            ));
            console.error(error);
        }
    };


    const confirmDelete = async () => {
        try {
            await caringuApi.delete(`/planos/${pessoaId}/${planoIdParaDeletar}`);
            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Plano deletado com sucesso!" />
            ));
            await fetchPlanos();
            setModalDeletarVisivel(false);
            setPlanoIdParaDeletar(null);
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao deletar plano. Tente novamente." />
            ));
            console.error(error);
        }
    };

    const editarPlano = async (data) => {
        try {
            const payload = {
                nome: data.plano,
                periodo: data.duracao,
                quantidadeAulas: Number(data.aulas),
                valorAulas: Number(data.preco),
            };

            await caringuApi.put(`/planos/${pessoaId}/${planoEditado.id}`, payload);


            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Plano editado com sucesso!" />
            ));
            await fetchPlanos();
            setShowEditModal(false);
            setPlanoEditado(null);
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao editar plano. Verifique os dados e tente novamente." />
            ));
            console.error(error);
        }
    };


    function useResponsiveStyles() {
        const [styles, setStyles] = useState({ fontSize: "16px", width: "100%" });

        useEffect(() => {

            const updateStyles = () => {
                const screenWidth = window.innerWidth;

                if (screenWidth >= 1536) {
                    setStyles({ fontSize: "24px", width: "33%" });
                } else if (screenWidth >= 1280) {
                    setStyles({ fontSize: "20px", width: "33%" });
                } else if (screenWidth >= 768) {
                    setStyles({ fontSize: "16px", width: "33%" });
                } else {
                    setStyles({ fontSize: "16px", width: "90%" });
                }
            };

            updateStyles();
            window.addEventListener("resize", updateStyles);
            return () => window.removeEventListener("resize", updateStyles);
        }, []);

        return styles;
    }

    useEffect(() => {
        let tokenExistente = sessionStorage.getItem("authToken");

        if (!tokenExistente) {
            setShowModal(true);
        }
    }, [])

    const closeModal = () => {
        setShowModal(false);
        navigate("/login");
    };


    // Função para alternar o estado do menu lateral
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }


    // Função para abrir o modal de exclusão
    const openDeleteModal = (planoId) => {
        setPlanoIdParaDeletar(planoId);
        setModalDeletarVisivel(true);
    };

    // Função para abrir o modal de edição
    const handleOpenEditModal = (plano) => {
        setPlanoEditado(plano);
        setShowEditModal(true);
    };


    // Função para abrir o modal de criação
    const handleOpenModal = () => {
        setPlanoEditado(null);
        setShowCreateModal(true);
    };

    // Função para abrir o modal de cancelamento
    const openCancelarPlanoModal = () => {
        setModalCancelarPlanoVisivel(true);
    };


    return (
        <>
            <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
                <MenuLateral isOpen={isSidebarOpen} />
                <div className="flex-1 overflow-y-auto">
                    <Header toggleSidebar={toggleSidebar} />
                    <div className="w-full h-auto">
                        <div className="flex md:flex-row flex-col md:items-end items-start justify-between flex-nowrap h-[170px] md:h-[80px] w-full relative">
                            <div className="h-full flex flex-row items-center sm:items-end pl-[1rem] sm:pl-[2.5rem]">
                                <span className="text-[var(--cor-primaria)] font-medium text-lg sm:text-[24px] xl:text-[32px]">Planos criados </span>
                            </div>
                            <div className="h-full  w-full md:w-[35rem] flex md:justify-center justify-start flex-col md:flex-row md:items-center pl-[1rem] sm:pl-[2.5rem] md:pl-0 items-start gap-[22px] ">
                                <Button
                                    texto="Solicitações pendentes"
                                    logo={relogioIcon}
                                    classNameExtra="md:w-[53%] w-[90%]"
                                    height="50px"
                                    cor="var(--cor-secundaria)"
                                    corTexto="var(--cor-primaria)"
                                    borderStyle="solid"
                                    borderWidth="2px"
                                    borderColor="rgba(29, 45, 68, 0.11)"
                                    ariaLabel="Botão de Soluções Pendentes"
                                    fontSize={fontSize}
                                    fontWeight="300"
                                    onClick={() => navigate("/solicitacoes-pendentes")}
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
                                    cor="var(--cor-secundaria)"
                                    corTexto="var(--cor-primaria)"
                                    fontSize={fontSize}
                                    fontWeight="300"
                                    onClick={handleOpenModal}
                                >
                                </Button>
                            </div>
                        </div>
                        <div className="pl-[1rem] sm:pl-0 ml-0 sm:ml-10 mt-4 overflow-x-auto max-w-[93vw]">
                            <div className="flex gap-9 w-fit">
                                {planos.length === 0 ? (
                                    <div className="text-center text-[var(--cor-primaria)] font-medium text-lg sm:text-2xl py-8">
                                        Nenhum plano cadastrado ainda.
                                    </div>
                                ) : (
                                    planos.map((item) => (
                                        <CardPlano
                                            key={item.id}
                                            id={item.id}
                                            nome={item.nome}
                                            periodo={item.periodo}
                                            quantidadeAulas={item.quantidadeAulas}
                                            valorAulas={item.valorAulas}
                                            valorPlano={item.valorPlano}
                                            onEditar={() => handleOpenEditModal(item)}
                                            onDeletar={() => openDeleteModal(item.id)}
                                            showContratarPlano={false}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full  mt-3 sm:pl-10 pl-[1rem] ">
                        <span className="font-medium  text-lg sm:text-[24px] xl:text-[32px] text-[var(--cor-primaria)]">Alunos com Planos Ativos</span>
                    </div>
                    <div className="sm:pl-10 pl-[1rem] grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mt-4 w-[91%] h-130 overflow-y-auto pb-4">                        {alunosAtivos.length === 0 ? (
                        <div className="text-center text-[var(--cor-primaria)] font-medium text-lg sm:text-2xl ">
                            Nenhum aluno com plano ativo no momento.
                        </div>
                    ) : (
                        alunosAtivos.map((aluno, idx) => (
                            <CardAluno
                                key={aluno.idAluno}
                                aluno={aluno}
                                onCardClick={(idAluno) => navigate(`/perfil-aluno/${idAluno}`)}
                                imgErro={imgErro}
                                setImgErro={setImgErro}
                                totalCards={alunosAtivos.length}
                                origemUsoOption={"Planos"}
                                idButton="btn-cancelar-plano"
                                textoButton="Cancelar Plano"
                                corButton="#B41F1F"
                                ariaLabelButton="Cancelar Plano"
                                classNameExtraButton="sm:text-base text-xs 2xl:h-[50px] sm:h-[35px] h-[30px] sm:w-[40%] w-[90%] mt-1"
                                onClickButton={openCancelarPlanoModal}
                            />
                        ))
                    )}
                    </div>

                    {/* Modal para criar */}
                    <ModalPlano
                        visivel={showCreateModal}
                        onClose={() => setModalConfirmarCancelarVisivel(true)}
                        onSubmit={cadastrarPlano}
                        titulo="Criar plano"
                    />

                    {/* Modal para editar */}
                    <ModalPlano
                        visivel={showEditModal}
                        onClose={() => setModalConfirmarCancelarVisivel(true)}
                        onSubmit={editarPlano}
                        titulo="Editar plano"
                        planoData={planoEditado}
                    />

                    <Modal
                        visivel={modalConfirmarCancelarVisivel}
                        fecharModal={() => setModalConfirmarCancelarVisivel(false)}
                        titulo="Tem certeza que deseja cancelar?"
                        descricao="Alterações que não forem salvas serão perdidas"
                        onConfirm={() => {
                            setModalConfirmarCancelarVisivel(false);
                            setShowCreateModal(false);
                            setShowEditModal(false);
                        }}
                        icone={iconCancelar}
                        textoBotaoConfirmar="Voltar"
                        textoBotaoCancelar="Cancelar mesmo assim"
                        ariaLabel="Modal de Cancelamento"
                    />

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

                    <Modal
                        visivel={modalCancelarPlanoVisivel}
                        fecharModal={() => setModalCancelarPlanoVisivel(false)}
                        titulo="Tem certeza que deseja cancelar esse plano?"
                        descricao={
                            <>
                                Essa ação não poderá ser desfeita.<br />
                                Negocie um possível reembolso antes de cancelar.
                                Converse previamente com o aluno sobre o cancelamento.
                            </>
                        }
                        icone={iconCancelar}
                        textoBotaoConfirmar="Manter Plano"
                        textoBotaoCancelar="Sim, desejo cancelar"
                        ariaLabel="Modal de Cancelamento de Plano"
                        heightModalWeb="h-132"
                    />


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
                <Toaster position="top-right" reverseOrder={false} />
            </div>
        </>
    )
}

export default Planos;