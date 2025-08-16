import React, { useState, useRef, useEffect } from "react";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import Header from "../../components/Personal/Header/Header";
import ButtonInterno from "../../components/Utils/Button";
import { useParams, useNavigate } from "react-router-dom";
import iconCancelar from "../../assets/images/cancelar.png";
import Modal from "../../components/Utils/Modal.jsx";
import lixeira from "../../assets/images/trash.png";
import { Controller, useForm } from "react-hook-form";
import InputPosLogin from "../../components/Utils/InputPosLogin";
import Label from "../../components/Utils/Label";
import info2 from "../../assets/images/info-2.svg";
import MenuFiltro from "../../components/Utils/MenuFiltro";
import { caringuApi } from "../../provider/caringuApi.js";
import Select from 'react-select';
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/Utils/CustomToast.jsx";
import MascaraData from "../../components/Utils/Functions/MascaraData.js"
import TreinoCard from "../../components/Utils/GerenciarTreinos/TreinoCard.jsx";
import TreinoActionsMenu from "../../components/Utils/GerenciarTreinos/TreinoActionsMenu.jsx";
import Pagination from "../../components/Utils/Pagination.jsx";


const GerenciarTreinos = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [difficultyFilter, setDifficultyFilter] = useState(null);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [modalDeletarVisivel, setModalDeletarVisivel] = useState(false);
    const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [origemFilter, setOrigemFilter] = useState("");
    const [origemSelecionada, setOrigemSelecionada] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const [treinosAtribuidos, setTreinosAtribuidos] = useState([]);
    const [treinos, setTreinos] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const idPersonal = sessionStorage.getItem("pessoaId")
    const { fontSize, width } = useResponsiveStyles();
    const [idTreinoExercicioParaDeletar, setIdTreinoExercicioParaDeletar] = useState(null);
    const [exerciciosSelecionados, setExerciciosSelecionados] = useState([]);



    const { register, handleSubmit, control, reset, watch, formState: { errors, isSubmitted }, setValue, trigger } = useForm({
        defaultValues: {
            plano: "",
            duracao: "",
            preco: "",
            aulas: ""
        },
        mode: "onChange"
    });

    const handleAddTreino = (data) => {

        if (!data.treino || !data.diasDaSemana || !data.dataVencimento) return;

        setTreinosAtribuidos((prev) => [
            ...prev,
            {
                alunosId: data.email.value, // ou outro campo de ID
                treinosExerciciosId: data.treino.value,
                treinoNome: data.treino.label,
                diasSemana: data.diasDaSemana.map(d => d.value),
                dataVencimento: data.dataVencimento
            },
        ]);


        // Limpar campos do formulário, exceto o email
        reset({
            email: data.email,
            treino: null,
            diasDaSemana: [],
            dataVencimento: ""
        });
    };

    const handleSalvarTodos = async () => {
        const alunoSelecionado = watch("email");

        const alunoId = alunoSelecionado?.key;

        try {
            if (treinosAtribuidos.length > 0) {
                for (const treino of treinosAtribuidos) {
                    await caringuApi.post('/alunos-treinos', {
                        ...treino,
                        alunosId: alunoId,
                    });
                }
                toast.custom((t) => (
                    <CustomToast t={t} type="success" message="Treinos atribuídos com sucesso!" />
                ));
                setTreinosAtribuidos([]);
                reset({
                    treino: null,
                    diasDaSemana: [],
                    dataVencimento: ""
                });
                return
            }
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Você deve atribuir um treino!" />
            ));
        } catch (err) {
            console.error('Erro ao salvar treinos:', err);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao salvar treinos." />
            ));
        }
    };
    const fetchInfosTreinos = async () => {
        try {
            const response = await caringuApi.get(`/treinos-exercicios/personal/${idPersonal}`);
            setTreinos(response.data);
        } catch (error) {
            console.error("Erro ao buscar informações dos treinos:", error);
        }
    };

    useEffect(() => {
        fetchInfosTreinos();
    }, [idPersonal]);

    useEffect(() => {
        const fetchInfosAlunos = async () => {
            try {
                const response = await caringuApi.get(`/alunos/detalhes/personal/${idPersonal}`);
                setAlunos(response.data);
            } catch (error) {
                console.error("Erro ao buscar informações dos treinos:", error);
            }
        };

        fetchInfosAlunos();
    }, [idPersonal]);


    const alunoOptions = alunos
        .filter(aluno => aluno.idAnamnese != null)
        .map(aluno => ({
            key: aluno.idAluno,
            value: aluno.email,
            label: `${aluno.nomeAluno} - ${aluno.email}`,
        }));

    const toggleFavorito = async (id) => {
        try {
            // Pega o treino atual
            const treinoAtual = treinos.find((treino) => treino.treinoId === id);
            const novoFavorito = !treinoAtual.favorito;

            // Envia o novo valor para o backend
            await caringuApi.patch(`/treino/${id}/favorito`, {
                favorito: novoFavorito
            });

            // Atualiza o estado local após sucesso
            const treinoIndex = treinos.findIndex((treino) => treino.treinoId === id);
            const updatedTreinos = [...treinos];
            updatedTreinos[treinoIndex].favorito = novoFavorito;
            setTreinos(updatedTreinos);

        } catch (error) {
            console.error('Erro ao atualizar favorito:', error);
        }
    };

    function useResponsiveStyles() {
        const [styles, setStyles] = useState({ fontSize: "16px", width: "100%" });

        useEffect(() => {

            document.title = "Gerenciar Treinos | CaringU"

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

    const handleOrigemSelect = (value) => {
        setOrigemSelecionada(value);
        setOrigemFilter(value);
    };

    const filteredTreinos = treinos
        .filter((treino) => {
            if (searchTerm && !treino.nomeTreino.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            if (difficultyFilter && treino.grauDificuldade.toLowerCase() !== difficultyFilter.toLowerCase()) {
                return false;
            }
            if (origemFilter && origemFilter !== "" && treino.origemTreinoExercicio.toLowerCase() !== origemFilter.toLowerCase()) {
                return false;
            }
            if (showOnlyFavorites && !treino.favorito) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            if (sortOrder === "A-Z") return a.nomeTreino.localeCompare(b.nome);
            if (sortOrder === "Z-A") return b.nomeTreino.localeCompare(a.nome);
            return 0;
        });

    const treinoOptions = filteredTreinos.map(t => ({
        value: t.treinoId,
        label: t.nomeTreino,
    }));

    const openDeleteModal = (id) => {
        setIdTreinoExercicioParaDeletar(id);
        setModalDeletarVisivel(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await caringuApi.delete(`/treino/${id}`);

            // Considera sucesso se status for 204 (No Content) ou 200 (OK)
            if (response.status === 204 || response.status === 200) {
                setExerciciosSelecionados(prev => prev.filter(ex => ex.id !== id));
                toast.custom((t) => (
                    <CustomToast t={t} type="success" message="Treino excluido com sucesso!" />
                ));
                await fetchInfosTreinos();
                setModalDeletarVisivel(false);
            } else {
                throw new Error('Erro inesperado ao deletar');
            }

        } catch (error) {
            if (error.response) {
                console.error('Erro do servidor:', error.response.data);
                toast.custom((t) => (
                    <CustomToast t={t} type="error" message={error.response.data.message || 'Erro ao deletar exercício'} />
                ));
                setModalDeletarVisivel(false);
            } else if (error.request) {
                console.error('Sem resposta do servidor:', error.request);
                toast.custom((t) => (
                    <CustomToast t={t} type="error" message="Sem resposta do servidor" />
                ));
                setModalDeletarVisivel(false);
            } else {
                console.error('Erro inesperado:', error.message);
                toast.custom((t) => (
                    <CustomToast t={t} type="error" message="Erro inesperado ao deletar exercício" />
                ));
                setModalDeletarVisivel(false);
            }
        }
    };

    const handleOpenModal = () => {
        setOpenMenuId(false);
        setShowCreateModal(true);
    };

    const handleEditTreino = (treinoId) => {
        navigate(`/editar-treino/${treinoId}`);
    };

    const handleDeleteTreino = (treinoId) => {
        openDeleteModal(treinoId);
    };

    const handleMenuClick = (treinoId) => {
        setOpenMenuId(openMenuId === treinoId ? null : treinoId);
    };

    function useMenuWidth() {
        const [width, setWidth] = useState(window.innerWidth >= 640 ? "280px" : "235px");

        useEffect(() => {
            const handleResize = () => {
                setWidth(window.innerWidth >= 640 ? "300px" : "235px");
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return width;
    }

    const menuWidth = useMenuWidth();


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(() => {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 640) return 3;
        return 1;
    });

    useEffect(() => {
        const handleResize = () => {
            let newItemsPerPage;
            if (window.innerWidth >= 1024) {
                newItemsPerPage = 4;
            } else if (window.innerWidth >= 640) {
                newItemsPerPage = 3;
            }else {
                newItemsPerPage = 1;
            }
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortOrder, difficultyFilter, origemFilter, showOnlyFavorites]);

    // Funções de paginação
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const totalPages = Math.ceil(filteredTreinos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTreinos = filteredTreinos.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="flex min-h-screen bg-[#fdfbf7]">
            <MenuLateral />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="bg-[#F9F9F9] rounded-lg p-4 md:p-6 border border-[#E6E6E2] sm:h-[84%] m-4 sm:m-8">
                    <h1 className="text-zinc-900 md:text-3xl font-semibold font-['Inter']">Gerenciamento de Treinos</h1>
                    <div className="flex flex-col md:flex-row items-center gap-2 mt-5 justify-between max-w-full">
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="text"
                                placeholder="Pesquisar treino"
                                className="flex-1 border border-gray-300 rounded-md p-2 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MenuFiltro
                                menuWidth={menuWidth}
                                buttonIcon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-xl cursor-pointer w-6"
                                        viewBox="0 0 35 35"
                                        fill="none"
                                    >
                                        <path
                                            d="M7.87504 3.0625H27.125C28.7292 3.0625 30.0417 4.375 30.0417 5.97917V9.1875C30.0417 10.3542 29.3125 11.8125 28.5834 12.5417L22.3125 18.0833C21.4375 18.8125 20.8542 20.2708 20.8542 21.4375V27.7083C20.8542 28.5833 20.2709 29.75 19.5417 30.1875L17.5 31.5C15.6042 32.6667 12.9792 31.3542 12.9792 29.0208V21.2917C12.9792 20.2708 12.3959 18.9583 11.8125 18.2292L6.27087 12.3958C5.54171 11.6667 4.95837 10.3542 4.95837 9.47917V6.125C4.95837 4.375 6.27087 3.0625 7.87504 3.0625Z"
                                            stroke="#1D2D44"
                                            strokeWidth="3"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M15.9396 3.0625L8.75 14.5833"
                                            stroke="#1D2D44"
                                            strokeWidth="3"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>}
                                options={[
                                    // 🔤 Ordenação
                                    {
                                        id: "az",
                                        label: "A-Z",
                                        active: sortOrder === "A-Z",
                                        onClick: () => setSortOrder((prev) => (prev === "A-Z" ? null : "A-Z")),
                                        icon: <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`w-7 ${sortOrder === "A-Z" ? "stroke-white" : "stroke-black"}`}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >                            <path d="M10.4498 6.71997L6.72974 3L3.00977 6.71997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.72949 21V3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M13.5498 17.2803L17.2698 21.0002L20.9898 17.2803" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17.2695 3V21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>,
                                        width: "40%",
                                    },
                                    {
                                        id: "za",
                                        label: "Z-A",
                                        active: sortOrder === "Z-A",
                                        onClick: () => setSortOrder((prev) => (prev === "Z-A" ? null : "Z-A")),
                                        icon: <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`w-7 ${sortOrder === "Z-A" ? "stroke-white" : "stroke-black"}`}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path d="M10.4498 6.71997L6.72974 3L3.00977 6.71997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6.72949 21V3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M13.5498 17.2803L17.2698 21.0002L20.9898 17.2803" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17.2695 3V21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>,
                                        width: "40%",
                                    },
                                    {
                                        id: "favoritos",
                                        label: "Favoritos",
                                        width: "55%",
                                        active: showOnlyFavorites == true,
                                        className: "flex items-center justify-start gap-2 p-2",
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-7 ${showOnlyFavorites ? "stroke-white" : "stroke-[#E96E35]"}`
                                            } viewBox="0 0 35 35" fill="none">
                                                <path d="M20.0229 5.11885L22.5896 10.2522C22.9396 10.9668 23.8729 11.6522 24.6604 11.7834L29.3125 12.5563C32.2875 13.0522 32.9875 15.2105 30.8437 17.3397L27.2271 20.9563C26.6146 21.5688 26.2792 22.7501 26.4687 23.5959L27.5042 28.073C28.3208 31.6168 26.4396 32.9876 23.3042 31.1355L18.9437 28.5543C18.1562 28.0876 16.8583 28.0876 16.0562 28.5543L11.6958 31.1355C8.57499 32.9876 6.67916 31.6022 7.49582 28.073L8.53124 23.5959C8.72082 22.7501 8.38541 21.5688 7.77291 20.9563L4.15624 17.3397C2.02707 15.2105 2.71249 13.0522 5.68749 12.5563L10.3396 11.7834C11.1125 11.6522 12.0458 10.9668 12.3958 10.2522L14.9625 5.11885C16.3625 2.33343 18.6375 2.33343 20.0229 5.11885Z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ),
                                        onClick: () => setShowOnlyFavorites((prev) => !prev),
                                    },
                                    {
                                        type: "dropdown",
                                        id: "origem",
                                        label: "Origem",
                                        width: "55%",
                                        selected: origemSelecionada,
                                        icon:
                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="25" viewBox="0 0 29 25" fill="none">
                                                <path d="M23.5625 5.5791H25.375C25.8752 5.5791 26.2812 6.09194 26.2812 6.72384V18.1712C26.2812 18.8031 25.8752 19.3159 25.375 19.3159H23.5625C23.0623 19.3159 22.6562 18.8031 22.6562 18.1712V6.72384C22.6562 6.09194 23.0623 5.5791 23.5625 5.5791Z" stroke="#46982B" strokeWidth="2" />
                                                <path d="M19.9375 1H21.75C22.2502 1 22.6562 1.51284 22.6562 2.14474V22.75C22.6562 23.3819 22.2502 23.8947 21.75 23.8947H19.9375C19.4373 23.8947 19.0312 23.3819 19.0312 22.75V2.14474C19.0312 1.51284 19.4373 1 19.9375 1Z" stroke="#46982B" strokeWidth="2" />
                                                <path d="M7.25 1H9.0625C9.56275 1 9.96875 1.51284 9.96875 2.14474V22.75C9.96875 23.3819 9.56275 23.8947 9.0625 23.8947H7.25C6.74975 23.8947 6.34375 23.3819 6.34375 22.75V2.14474C6.34375 1.51284 6.74975 1 7.25 1Z" stroke="#46982B" strokeWidth="2" />
                                                <path d="M3.625 5.5791H5.4375C5.93775 5.5791 6.34375 6.09194 6.34375 6.72384V18.1712C6.34375 18.8031 5.93775 19.3159 5.4375 19.3159H3.625C3.12475 19.3159 2.71875 18.8031 2.71875 18.1712V6.72384C2.71875 6.09194 3.12475 5.5791 3.625 5.5791Z" stroke="#46982B" strokeWidth="2" />
                                                <path d="M26.2812 12.4473H29" stroke="#46982B" strokeWidth="2" />
                                                <path d="M9.96875 12.4473H19.0312" stroke="#46982B" strokeWidth="2" />
                                                <path d="M0 12.4473H2.71875" stroke="#46982B" strokeWidth="2" />
                                            </svg>,
                                        items: [
                                            { label: "Limpar filtro", value: "" },
                                            { label: "Biblioteca", value: "BIBLIOTECA" },
                                            { label: "Personal", value: "PERSONAL" },
                                        ],
                                        onSelect: handleOrigemSelect,
                                    },

                                    // 🎯 Dificuldade
                                    {
                                        id: "INICIANTE",
                                        label: "Dificuldade: Iniciante",
                                        active: difficultyFilter === "INICIANTE",
                                        className: "flex items-center justify-start gap-2 p-2",
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`w-7 ${difficultyFilter === "INICIANTE" ? "stroke-white" : "stroke-[#748CAB]"}`}
                                                viewBox="0 0 31 31"
                                                fill="none"
                                            >
                                                <path
                                                    d="M6.6521 2.58325V28.4166"
                                                    strokeWidth="2.5"
                                                    strokeMiterlimit="10"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M6.6521 5.16675H21.1188C24.6063 5.16675 25.3813 7.10425 22.9271 9.55841L21.3771 11.1084C20.3438 12.1417 20.3438 13.8209 21.3771 14.7251L22.9271 16.2751C25.3813 18.7292 24.4771 20.6667 21.1188 20.6667H6.6521"
                                                    strokeWidth="2.5"
                                                    strokeMiterlimit="10"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        ),
                                        onClick: () => setDifficultyFilter(prev => (prev === "INICIANTE" ? null : "INICIANTE")),
                                    },
                                    {
                                        id: "intermediario",
                                        label: "Dificuldade: Intermediário",
                                        active: difficultyFilter === "INTERMEDIARIO",
                                        className: "flex items-center justify-start gap-2 p-2",
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-7 ${difficultyFilter === "INTERMEDIARIO" ? "stroke-white" : "stroke-[#E8CD00]"}`
                                            } viewBox="0 0 31 31" fill="none">
                                                <path d="M6.6521 2.58325V28.4166" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.6521 5.16675H21.1188C24.6063 5.16675 25.3813 7.10425 22.9271 9.55841L21.3771 11.1084C20.3438 12.1417 20.3438 13.8209 21.3771 14.7251L22.9271 16.2751C25.3813 18.7292 24.4771 20.6667 21.1188 20.6667H6.6521" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ),
                                        onClick: () =>
                                            setDifficultyFilter((prev) => (prev === "INTERMEDIARIO" ? null : "INTERMEDIARIO")),
                                    },
                                    {
                                        id: "avancado",
                                        label: "Dificuldade: Avançado",
                                        active: difficultyFilter === "AVANCADO",
                                        className: "flex items-center justify-start gap-2 p-2",
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-7 ${difficultyFilter === "AVANCADO" ? "stroke-white" : "stroke-[#B41F1F]"}`
                                            } viewBox="0 0 31 31" fill="none">
                                                <path d="M6.6521 2.58325V28.4166" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.6521 5.16675H21.1188C24.6063 5.16675 25.3813 7.10425 22.9271 9.55841L21.3771 11.1084C20.3438 12.1417 20.3438 13.8209 21.3771 14.7251L22.9271 16.2751C25.3813 18.7292 24.4771 20.6667 21.1188 20.6667H6.6521" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        ),
                                        onClick: () =>
                                            setDifficultyFilter((prev) => (prev === "AVANCADO" ? null : "AVANCADO")),
                                    }
                                ]}
                            />
                        </div>
                        <div className="flex sm:flex-row flex-col w-full md:w-2xl gap-4 md:gap-4 lg:gap-13">
                            <ButtonInterno
                                texto="Criar Treino"
                                type="submit"
                                corTexto="var(--azul-escuro)"
                                borderColor={"#E6E6E2"}
                                borderStyle={"solid"}
                                borderWidth={"2px"}
                                classNameExtra="w-full sm:w-1/2"
                                height="50px"
                                cor="var(--cor-secundaria)"
                                font-size={fontSize}
                                onClick={() => navigate("/criar-treino")}
                                logoSvg={
                                    <svg className="w-8 h-8" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 19.8252H24.375" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M13 26.3252H20.1175" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16.25 9.75H22.75C26 9.75 26 8.125 26 6.5C26 3.25 24.375 3.25 22.75 3.25H16.25C14.625 3.25 13 3.25 13 6.5C13 9.75 14.625 9.75 16.25 9.75Z" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M26 6.53223C31.4112 6.82473 34.125 8.82348 34.125 16.2497V25.9997C34.125 32.4997 32.5 35.7497 24.375 35.7497H14.625C6.5 35.7497 4.875 32.4997 4.875 25.9997V16.2497C4.875 8.83973 7.58875 6.82473 13 6.53223" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M28.6024 8.14982L21.4187 15.7536C21.1474 16.0423 20.8849 16.6111 20.8324 17.0048L20.5087 19.8398C20.3949 20.8636 21.1299 21.5636 22.1449 21.3886L24.9624 20.9073C25.3562 20.8373 25.9074 20.5486 26.1787 20.2511L33.3624 12.6473C34.6049 11.3348 35.1649 9.83857 33.2312 8.00982C31.3062 6.19857 29.8449 6.83732 28.6024 8.14982Z" fill="#FFFDF6" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M27.4038 9.41895C27.7801 11.8339 29.7401 13.6802 32.1726 13.9252" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                }
                            />
                            <ButtonInterno
                                texto="Atribuir Treinos"
                                type="submit"
                                corTexto="var(--azul-escuro)"
                                borderColor={"#E6E6E2"}
                                borderStyle={"solid"}
                                borderWidth={"2px"}
                                cor="var(--cor-secundaria)"
                                classNameExtra="w-full sm:w-1/2"
                                height="50px"
                                font-size={fontSize}
                                logoSvg={
                                    <svg className="w-8 h-8" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M36.7591 17.2984L36.7353 25.4233C36.7115 33.5483 33.4519 36.7888 25.327 36.7649L15.577 36.7363C7.45205 36.7125 4.21159 33.453 4.23542 25.328L4.26401 15.5781C4.28783 7.45311 7.54735 4.21265 15.6723 4.23648L23.7973 4.2603" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M36.7592 17.2978L30.2592 17.2788C25.3842 17.2645 23.764 15.6347 23.7783 10.7597L23.7974 4.25977L36.7592 17.2978Z" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M31.7368 18.6667H28.9895V16H25.3895V21.0833H15.3474V16H11.7474V18.6667H9V25.3333H11.7474V28H15.3474V22.9167H25.3895V28H28.9895V25.3333H31.7368V18.6667Z" fill="#1D2D44" />
                                    </svg>
                                }
                                onClick={handleOpenModal}
                            />
                        </div>
                    </div>
                    <div className="relative flex flex-col items-center gap-4 bg-transparent p-4 rounded-lg h-110 sm:h-140 mt-5">
                        {currentTreinos.map((treino) => (
                            <TreinoCard
                                key={treino.treinoId}
                                treino={treino}
                                onToggleFavorito={toggleFavorito}
                                onMenuClick={handleMenuClick}
                                openMenuId={openMenuId}
                                menuRef={menuRef}
                                buttonRef={buttonRef}
                            >
                                <TreinoActionsMenu
                                    treino={treino}
                                    onEdit={handleEditTreino}
                                    onDelete={handleDeleteTreino}
                                />
                            </TreinoCard>
                        ))}
                        {showCreateModal && (
                            <div className="fixed inset-0 z-[49] flex justify-center items-center overflow-y-auto">
                                <div className="absolute inset-0 bg-[#000000] opacity-50"
                                    aria-label="Fundo Escurecido"
                                ></div>
                                <div className="relative p-4 w-full max-w-2xl">
                                    <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                                        <div className="flex justify-between items-center pb-4 mb-4 ">
                                            <h1 className="text-4xl font-semibold text-[var(--cor-primaria)]">
                                                Atribuir Treino
                                            </h1>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setModalConfirmarCancelarVisivel(true)
                                                }}
                                                className="bg-[#B41F1F] text-[var(--cor-secundaria)] rounded-lg text-xs sm:text-sm cursor-pointer w-10 h-10 md:w-13 md:h-13 inline-flex justify-center items-center absolute top-2 right-2"
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


                                        <form onSubmit={handleSubmit(handleAddTreino)}>
                                            <div className="grid gap-4 mb-4">
                                                <div className="flex flex-col gap-4">
                                                    <Label
                                                        id="email"
                                                        nomeLabel="Email do aluno"
                                                        fontSize="20px"
                                                        fontWeight="500"
                                                    />
                                                    <Controller
                                                        name="email"
                                                        control={control}
                                                        rules={{ required: 'Selecione um aluno' }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={alunoOptions}
                                                                placeholder="Busque e selecione um aluno"
                                                                isClearable
                                                                className="basic-single"
                                                                classNamePrefix="select"
                                                                styles={{
                                                                    control: (base, state) => ({
                                                                        ...base,
                                                                        borderColor: state.isFocused ? '#748CAB' : 'var(--cor-primaria)',
                                                                        boxShadow: 'none',
                                                                        borderWidth: '2px',
                                                                        borderRadius: '0.375rem',
                                                                        padding: '2px',
                                                                    }),
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    {errors.email && (
                                                        <span className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                            <img src={info2} alt="Erro" className="w-4 h-4" />
                                                            {errors.email.message}
                                                        </span>
                                                    )}
                                                    <ul className="mt-4 space-y-2">
                                                        {treinosAtribuidos.map((t, i) => (
                                                            <li key={i} className="flex items-center justify-between text-sm text-gray-700">
                                                                <span>
                                                                    - {t.treinoNome} - Dias: {t.diasSemana.join(', ')} - Vence em: {MascaraData(t.dataVencimento)}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setTreinosAtribuidos(current =>
                                                                            current.filter((_, index) => index !== i)
                                                                        );
                                                                    }}
                                                                    className="ml-4 text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                                                                    aria-label={`Remover treino ID ${t.treinosExerciciosId}`}
                                                                >
                                                                    Remover
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="border-[2px] border-[#E6E6E2] rounded-[7px] p-5">
                                                    <Label
                                                        id="treino"
                                                        nomeLabel="Selecione o Treino"
                                                        fontSize="20px"
                                                        fontWeight="500"
                                                    />
                                                    <Controller
                                                        name="treino"
                                                        control={control}
                                                        rules={{ required: 'Selecione um treino' }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={treinoOptions}
                                                                placeholder="Busque e selecione um treino"
                                                                isClearable
                                                                className="basic-single my-2"
                                                                classNamePrefix="select"
                                                                styles={{
                                                                    control: (base, state) => ({
                                                                        ...base,
                                                                        borderColor: state.isFocused ? '#748CAB' : 'var(--cor-primaria)',
                                                                        boxShadow: 'none',
                                                                        borderWidth: '2px',
                                                                        borderRadius: '0.375rem',
                                                                        padding: '2px',
                                                                    }),
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    {errors.treino && (
                                                        <span className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                            <img src={info2} alt="Erro" className="w-4 h-4" />
                                                            {errors.treino.message}
                                                        </span>
                                                    )}

                                                    <Label
                                                        id="diasDaSemana"
                                                        nomeLabel="Dias da Semana"
                                                        fontSize="20px"
                                                        fontWeight="500"
                                                    />
                                                    <Controller
                                                        name="diasDaSemana"
                                                        control={control}
                                                        rules={{ required: 'Selecione pelo menos um dia' }}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                isMulti
                                                                options={[
                                                                    { value: 'SEGUNDA', label: 'Segunda' },
                                                                    { value: 'TERCA', label: 'Terça' },
                                                                    { value: 'QUARTA', label: 'Quarta' },
                                                                    { value: 'QUINTA', label: 'Quinta' },
                                                                    { value: 'SEXTA', label: 'Sexta' },
                                                                    { value: 'SABADO', label: 'Sábado' },
                                                                    { value: 'DOMINGO', label: 'Domingo' },
                                                                ]}
                                                                placeholder="Selecione os dias"
                                                                className="basic-single"
                                                                classNamePrefix="select"
                                                                styles={{
                                                                    control: (base, state) => ({
                                                                        ...base,
                                                                        borderColor: state.isFocused ? '#748CAB' : 'var(--cor-primaria)',
                                                                        boxShadow: 'none',
                                                                        borderWidth: '2px',
                                                                        borderRadius: '0.375rem',
                                                                        padding: '2px',
                                                                    }),
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    {errors.diasDaSemana && (
                                                        <span className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                            <img src={info2} alt="Erro" className="w-4 h-4" />
                                                            {errors.diasDaSemana.message}
                                                        </span>
                                                    )}
                                                    <div className="mt-5">
                                                        <Label
                                                            id="dataVencimento"
                                                            nomeLabel="Data de Vencimento"
                                                            fontSize="20px"
                                                            fontWeight="500"
                                                        />
                                                        <InputPosLogin
                                                            id="dataVencimento"
                                                            name="dataVencimento"
                                                            inputType="date"
                                                            placeholder="30/12/2024"
                                                            fontSize="16px"
                                                            fontWeight="400"
                                                            fontSizeErro="16px"
                                                            width="50%"
                                                            inputMode="numeric"
                                                            {...register('dataVencimento', {
                                                                required: 'A data de vencimento é obrigatória',
                                                                validate: (value) => {
                                                                    const dataSelecionada = new Date(value);
                                                                    const hoje = new Date();
                                                                    dataSelecionada.setHours(0, 0, 0, 0);
                                                                    hoje.setHours(0, 0, 0, 0);
                                                                    if (dataSelecionada < hoje) {
                                                                        return "Data passada não permitida.";
                                                                    }
                                                                    return true;
                                                                }
                                                            })}
                                                        />
                                                        {errors.dataVencimento && (
                                                            <span className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                                <img src={info2} alt="Erro" className="w-4 h-4" />
                                                                {errors.dataVencimento.message}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex justify-end mt-4">
                                                        <ButtonInterno
                                                            texto="Acrescentar treino"
                                                            type="submit"
                                                            cor="#748CAB"
                                                            corTexto="#ffffff"
                                                            width="40%"
                                                            height="50px"
                                                            font-size="14px"
                                                        />
                                                    </div>


                                                </div>
                                            </div>
                                            <div aria-label="Opções de Botões" className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center">
                                                <ButtonInterno
                                                    texto="Cancelar"
                                                    corTexto="#B41F1F"
                                                    cor="var(--cor-secundaria)"
                                                    height="2.75rem"
                                                    width="13.25rem"
                                                    fontWeight="500"
                                                    aria-label={"Botão de Cancelar"}
                                                    onClick={() => setModalConfirmarCancelarVisivel(true)}
                                                >
                                                </ButtonInterno>

                                                <ButtonInterno
                                                    texto="Salvar"
                                                    corTexto="var(--cor-secundaria)"
                                                    cor="#46982B"
                                                    height="2.75rem"
                                                    width="9.2rem"
                                                    fontWeight="600"
                                                    aria-label={"Botão de Salvar"}
                                                    onClick={handleSalvarTodos}
                                                >
                                                </ButtonInterno>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Modal
                            visivel={modalDeletarVisivel}
                            fecharModal={() => setModalDeletarVisivel(false)}
                            titulo="Tem certeza que deseja excluir esse treino?"
                            descricao="Você não poderá disponibilizá-lo futuramente"
                            onConfirm={() => handleDelete(idTreinoExercicioParaDeletar)}
                            icone={lixeira}
                            textoBotaoConfirmar="Manter Treino"
                            textoBotaoCancelar="Deletar mesmo assim"
                            aria-label="Modal de Exclusão de Treino"
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
                                reset()
                            }}
                            icone={iconCancelar}
                            textoBotaoConfirmar="Voltar"
                            textoBotaoCancelar="Cancelar mesmo assim"
                            aria-label="Modal de Cancelamento"
                        />
                        <Toaster position='top-right' reverseOrder={false} />
                    </div>
                    <div className="flex justify-center mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            itemsLength={filteredTreinos.length}
                            onPageChange={goToPage}
                            onPrevious={goToPrevious}
                            onNext={goToNext}
                            maxVisible={3}
                        />
                    </div>
                </div>
            </div >
            <Toaster position="top-right" reverseOrder={false} />
        </div >
    )
}

export default GerenciarTreinos;