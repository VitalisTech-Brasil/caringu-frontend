import React, { useState, useRef, useEffect } from "react";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import Header from "../../components/Personal/Header/Header";
import { FaEllipsisV } from "react-icons/fa";
import { Popover, Button } from "flowbite-react"; // Certifique-se de que Modal está correto
import ButtonInterno from "../../components/Utils/Button"; // Certifique-se de que ButtonInterno está correto
import { HiOutlineFilter } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";
import iconCancelar from "../../assets/images/cancelar.png";
import Modal from "../../components/Utils/Modal.jsx"; // Certifique-se de que o caminho está correto
import lixeira from "../../assets/images/trash.png";
import { useForm } from "react-hook-form";
import InputPosLogin from "../../components/Utils/InputPosLogin";
import Label from "../../components/Utils/Label";
import info2 from "../../assets/images/info-2.svg";
import MenuFiltro from "../../components/Utils/MenuFiltro";

const GerenciarTreinos = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(null); // A-Z or Z-A
    const [openMenuId, setOpenMenuId] = useState(null);
    const [difficultyFilter, setDifficultyFilter] = useState(null); // "Fácil", "Média", "Difícil"
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [modalDeletarVisivel, setModalDeletarVisivel] = useState(false);
    const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [origemFilter, setOrigemFilter] = useState("");
    const [origemSelecionada, setOrigemSelecionada] = useState("");
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const params = useParams();
    const navigate = useNavigate();

    const [treinos, setTreinos] = useState([
        {
            id: 1,
            nome: "Treino de Braços",
            dificuldade: "INICIANTE",
            origem: "BIBLIOTECA",
            quantidadeExercicios: 3,
            favorito: true,
            exercicios: [
                {
                    id: 1,
                    nome: "Rosca Direta",
                    carga: 10,
                    series: 4,
                    repeticoes: 12,
                    descanso: 60,
                    observacoes: "Focar na execução"
                },
                {
                    id: 2,
                    nome: "Rosca Martelo",
                    carga: 8,
                    series: 3,
                    repeticoes: 10,
                    descanso: 60,
                    observacoes: ""
                },
                {
                    id: 3,
                    nome: "Tríceps Testa",
                    carga: 12,
                    series: 4,
                    repeticoes: 12,
                    descanso: 90,
                    observacoes: ""
                }
            ]
        },
        {
            id: 2,
            nome: "Treino de Pernas",
            dificuldade: "AVANCADO",
            origem: "PERSONAL",
            quantidadeExercicios: 3,
            favorito: false,
            exercicios: [
                {
                    id: 4,
                    nome: "Agachamento Livre",
                    carga: 50,
                    series: 5,
                    repeticoes: 8,
                    descanso: 120,
                    observacoes: "Descer até 90 graus"
                },
                {
                    id: 5,
                    nome: "Leg Press",
                    carga: 150,
                    series: 4,
                    repeticoes: 10,
                    descanso: 90,
                    observacoes: ""
                },
                {
                    id: 6,
                    nome: "Cadeira Extensora",
                    carga: 40,
                    series: 4,
                    repeticoes: 12,
                    descanso: 60,
                    observacoes: "Segurar 2s no topo"
                }
            ]
        },
        {
            id: 3,
            nome: "Treino de Peito",
            dificuldade: "INTERMEDIARIO",
            origem: "BIBLIOTECA",
            quantidadeExercicios: 2,
            favorito: true,
            exercicios: [
                {
                    id: 7,
                    nome: "Supino Reto",
                    carga: 30,
                    series: 4,
                    repeticoes: 10,
                    descanso: 90,
                    observacoes: "Manter controle na descida"
                },
                {
                    id: 8,
                    nome: "Crucifixo",
                    carga: 12,
                    series: 3,
                    repeticoes: 12,
                    descanso: 60,
                    observacoes: ""
                }
            ]
        },
        {
            id: 4,
            nome: "Treino de Costas",
            dificuldade: "AVANCADO",
            origem: "PERSONAL",
            quantidadeExercicios: 2,
            favorito: true,
            exercicios: [
                {
                    id: 9,
                    nome: "Remada Curvada",
                    carga: 40,
                    series: 4,
                    repeticoes: 10,
                    descanso: 90,
                    observacoes: "Mantenha coluna neutra"
                },
                {
                    id: 10,
                    nome: "Puxada Frontal",
                    carga: 35,
                    series: 4,
                    repeticoes: 12,
                    descanso: 60,
                    observacoes: ""
                }
            ]
        },
        {
            id: 5,
            nome: "Treino de Ombros",
            dificuldade: "INICIANTE",
            origem: "BIBLIOTECA",
            quantidadeExercicios: 2,
            favorito: true,
            exercicios: [
                {
                    id: 11,
                    nome: "Desenvolvimento",
                    carga: 20,
                    series: 4,
                    repeticoes: 10,
                    descanso: 60,
                    observacoes: ""
                },
                {
                    id: 12,
                    nome: "Elevação Lateral",
                    carga: 6,
                    series: 3,
                    repeticoes: 15,
                    descanso: 60,
                    observacoes: "Executar devagar"
                }
            ]
        },
        {
            id: 6,
            nome: "Treino de Abdômen",
            dificuldade: "INTERMEDIARIO",
            origem: "PERSONAL",
            quantidadeExercicios: 2,
            favorito: false,
            descricao: "Treino para definição abdominal",
            exercicios: [
                {
                    id: 13,
                    nome: "Abdominal Infra",
                    carga: 0,
                    series: 4,
                    repeticoes: 15,
                    descanso: 45,
                    observacoes: ""
                },
                {
                    id: 14,
                    nome: "Prancha",
                    carga: 0,
                    series: 3,
                    repeticoes: 1,
                    descanso: 60,
                    observacoes: "Manter por 60 segundos"
                }
            ]
        }
    ]); // Simulated data

    const { register, handleSubmit, formState: { errors, isSubmitted }, setValue, trigger } = useForm({
        defaultValues: {
            plano: "",
            duracao: "",
            preco: "",
            aulas: ""
        },
        mode: "onChange"
    });


    const toggleFavorito = (id) => {
        const treinoIndex = treinos.findIndex((treino) => treino.id === id);
        const updatedTreinos = [...treinos];
        updatedTreinos[treinoIndex].favorito = !updatedTreinos[treinoIndex].favorito;
        setTreinos(updatedTreinos);
    };

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

    const handleOrigemSelect = (value) => {
        setOrigemSelecionada(value);
        setOrigemFilter(value);
    };

    const filteredTreinos = treinos
        .filter((treino) => {
            if (searchTerm && !treino.nome.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            if (difficultyFilter && treino.dificuldade.toLowerCase() !== difficultyFilter.toLowerCase()) {
                return false;
            }
            if (origemFilter && origemFilter !== "" && treino.origem.toLowerCase() !== origemFilter.toLowerCase()) {
                return false;
            }
            if (showOnlyFavorites && !treino.favorito) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            if (sortOrder === "A-Z") return a.nome.localeCompare(b.nome);
            if (sortOrder === "Z-A") return b.nome.localeCompare(a.nome);
            return 0;
        });

    const openDeleteModal = () => {
        setModalDeletarVisivel(true);

    };

    const confirmDelete = () => {
        alert("Treino excluído!");
        setModalDeletarVisivel(false);
    };

    const handleDelete = () => {
        setMenuOpen(false);
        openDeleteModal();
    };

    const handleOpenModal = () => {
        setOpenMenuId(false);
        setShowCreateModal(true);
    };

    const TreinoActionsMenu = ({ treino }) => (
        <div className="flex flex-col text-sm font-medium w-[120px] max-w-[200px]">
            <button className="flex items-center justify-end gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer"
                onClick={() => { navigate(`/editar-treino/${treino.id}`) }}
            >
                Editar
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z" fill="#738CAB" />
                    <path d="M19.0201 3.47967C17.0801 1.53967 15.1801 1.48967 13.1901 3.47967L11.9801 4.68967C11.8801 4.78967 11.8401 4.94967 11.8801 5.08967C12.6401 7.73967 14.7601 9.85967 17.4101 10.6197C17.4501 10.6297 17.4901 10.6397 17.5301 10.6397C17.6401 10.6397 17.7401 10.5997 17.8201 10.5197L19.0201 9.30967C20.0101 8.32967 20.4901 7.37967 20.4901 6.41967C20.5001 5.42967 20.0201 4.46967 19.0201 3.47967Z" fill="#738CAB" />
                    <path d="M15.6098 11.5298C15.3198 11.3898 15.0398 11.2498 14.7698 11.0898C14.5498 10.9598 14.3398 10.8198 14.1298 10.6698C13.9598 10.5598 13.7598 10.3998 13.5698 10.2398C13.5498 10.2298 13.4798 10.1698 13.3998 10.0898C13.0698 9.8098 12.6998 9.4498 12.3698 9.0498C12.3398 9.0298 12.2898 8.9598 12.2198 8.8698C12.1198 8.7498 11.9498 8.5498 11.7998 8.3198C11.6798 8.1698 11.5398 7.9498 11.4098 7.7298C11.2498 7.4598 11.1098 7.1898 10.9698 6.9098C10.9486 6.86441 10.9281 6.81924 10.9083 6.77434C10.7607 6.44102 10.3261 6.34358 10.0683 6.60133L4.33983 12.3298C4.20983 12.4598 4.08983 12.7098 4.05983 12.8798L3.51983 16.7098C3.41983 17.3898 3.60983 18.0298 4.02983 18.4598C4.38983 18.8098 4.88983 18.9998 5.42983 18.9998C5.54983 18.9998 5.66983 18.9898 5.78983 18.9698L9.62983 18.4298C9.80983 18.3998 10.0598 18.2798 10.1798 18.1498L15.9011 12.4285C16.1607 12.1689 16.0628 11.7235 15.7252 11.5794C15.6872 11.5632 15.6488 11.5467 15.6098 11.5298Z" fill="#738CAB" />
                </svg>
            </button>
            <button
                className="flex items-center justify-end gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer"
                onClick={() => handleDelete()}
            >
                Excluir
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21.0702 5.23C19.4602 5.07 17.8502 4.95 16.2302 4.86V4.85L16.0102 3.55C15.8602 2.63 15.6402 1.25 13.3002 1.25H10.6802C8.35016 1.25 8.13016 2.57 7.97016 3.54L7.76016 4.82C6.83016 4.88 5.90016 4.94 4.97016 5.03L2.93016 5.23C2.51016 5.27 2.21016 5.64 2.25016 6.05C2.29016 6.46 2.65016 6.76 3.07016 6.72L5.11016 6.52C10.3502 6 15.6302 6.2 20.9302 6.73C20.9602 6.73 20.9802 6.73 21.0102 6.73C21.3902 6.73 21.7202 6.44 21.7602 6.05C21.7902 5.64 21.4902 5.27 21.0702 5.23Z" fill="#B41F1F" />
                    <path d="M19.2302 8.14C18.9902 7.89 18.6602 7.75 18.3202 7.75H5.68024C5.34024 7.75 5.00024 7.89 4.77024 8.14C4.54024 8.39 4.41024 8.73 4.43024 9.08L5.05024 19.34C5.16024 20.86 5.30024 22.76 8.79024 22.76H15.2102C18.7002 22.76 18.8402 20.87 18.9502 19.34L19.5702 9.09C19.5902 8.73 19.4602 8.39 19.2302 8.14ZM13.6602 17.75H10.3302C9.92024 17.75 9.58024 17.41 9.58024 17C9.58024 16.59 9.92024 16.25 10.3302 16.25H13.6602C14.0702 16.25 14.4102 16.59 14.4102 17C14.4102 17.41 14.0702 17.75 13.6602 17.75ZM14.5002 13.75H9.50024C9.09024 13.75 8.75024 13.41 8.75024 13C8.75024 12.59 9.09024 12.25 9.50024 12.25H14.5002C14.9102 12.25 15.2502 12.59 15.2502 13C15.2502 13.41 14.9102 13.75 14.5002 13.75Z" fill="#B41F1F" />
                </svg>
            </button>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#fdfbf7]">
            <MenuLateral />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="bg-[var(--cor-secundaria)] rounded-lg p-6 md:p-6 border border-[#E6E6E2] max-h-full m-8">
                    <h1 className="text-zinc-900 md:text-3xl font-semibold font-['Inter']">Gerenciamento de Treinos</h1>
                    <div className="flex flex-col md:flex-row items-center gap-2 mt-5 justify-between max-w-full">
                        <div className="flex items-center gap-2 md:w-full">
                            <input
                                type="text"
                                placeholder="Pesquisar treino"
                                className="flex-1 border max-w-50 border-gray-300 rounded-md p-2 md:max-w-1/2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MenuFiltro
                                menuWidth="310px"
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
                                        width: "40%",
                                    },
                                    {
                                        id: "za",
                                        label: "Z-A",
                                        active: sortOrder === "Z-A",
                                        onClick: () => setSortOrder((prev) => (prev === "Z-A" ? null : "Z-A")),
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
                                                <path d="M23.5625 5.5791H25.375C25.8752 5.5791 26.2812 6.09194 26.2812 6.72384V18.1712C26.2812 18.8031 25.8752 19.3159 25.375 19.3159H23.5625C23.0623 19.3159 22.6562 18.8031 22.6562 18.1712V6.72384C22.6562 6.09194 23.0623 5.5791 23.5625 5.5791Z" stroke="#46982B" stroke-width="2" />
                                                <path d="M19.9375 1H21.75C22.2502 1 22.6562 1.51284 22.6562 2.14474V22.75C22.6562 23.3819 22.2502 23.8947 21.75 23.8947H19.9375C19.4373 23.8947 19.0312 23.3819 19.0312 22.75V2.14474C19.0312 1.51284 19.4373 1 19.9375 1Z" stroke="#46982B" stroke-width="2" />
                                                <path d="M7.25 1H9.0625C9.56275 1 9.96875 1.51284 9.96875 2.14474V22.75C9.96875 23.3819 9.56275 23.8947 9.0625 23.8947H7.25C6.74975 23.8947 6.34375 23.3819 6.34375 22.75V2.14474C6.34375 1.51284 6.74975 1 7.25 1Z" stroke="#46982B" stroke-width="2" />
                                                <path d="M3.625 5.5791H5.4375C5.93775 5.5791 6.34375 6.09194 6.34375 6.72384V18.1712C6.34375 18.8031 5.93775 19.3159 5.4375 19.3159H3.625C3.12475 19.3159 2.71875 18.8031 2.71875 18.1712V6.72384C2.71875 6.09194 3.12475 5.5791 3.625 5.5791Z" stroke="#46982B" stroke-width="2" />
                                                <path d="M26.2812 12.4473H29" stroke="#46982B" stroke-width="2" />
                                                <path d="M9.96875 12.4473H19.0312" stroke="#46982B" stroke-width="2" />
                                                <path d="M0 12.4473H2.71875" stroke="#46982B" stroke-width="2" />
                                            </svg>,
                                        items: [
                                            { label: "Limpar filtro", value: "" },
                                            { label: "BIBLIOTECA", value: "BIBLIOTECA" },
                                            { label: "PERSONAL", value: "PERSONAL" },
                                        ],
                                        onSelect: handleOrigemSelect,
                                    },

                                    // 🎯 Dificuldade
                                    {
                                        id: "INICIANTE",
                                        label: "Dificuldade: INICIANTE",
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
                                        label: "Dificuldade: INTERMEDIARIO",
                                        active: difficultyFilter === "INTERMEDIARIO",
                                        className: "flex items-center justify-start gap-2 p-2",
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-7 ${difficultyFilter === "INTERMEDIARIO" ? "stroke-white" : "stroke-[#E8CD00]"}`
                                            } viewBox="0 0 31 31" fill="none">
                                                <path d="M6.6521 2.58325V28.4166" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M6.6521 5.16675H21.1188C24.6063 5.16675 25.3813 7.10425 22.9271 9.55841L21.3771 11.1084C20.3438 12.1417 20.3438 13.8209 21.3771 14.7251L22.9271 16.2751C25.3813 18.7292 24.4771 20.6667 21.1188 20.6667H6.6521" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        ),
                                        onClick: () =>
                                            setDifficultyFilter((prev) => (prev === "INTERMEDIARIO" ? null : "INTERMEDIARIO")),
                                    },
                                    {
                                        id: "avancado",
                                        label: "Dificuldade: AVANCADO",
                                        active: difficultyFilter === "AVANCADO",
                                        className: "flex items-center justify-start gap-2 p-2",
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-7 ${difficultyFilter === "AVANCADO" ? "stroke-white" : "stroke-[#B41F1F]"}`
                                            } viewBox="0 0 31 31" fill="none">
                                                <path d="M6.6521 2.58325V28.4166" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M6.6521 5.16675H21.1188C24.6063 5.16675 25.3813 7.10425 22.9271 9.55841L21.3771 11.1084C20.3438 12.1417 20.3438 13.8209 21.3771 14.7251L22.9271 16.2751C25.3813 18.7292 24.4771 20.6667 21.1188 20.6667H6.6521" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        ),
                                        onClick: () =>
                                            setDifficultyFilter((prev) => (prev === "AVANCADO" ? null : "AVANCADO")),
                                    }
                                ]}
                            />
                        </div>
                        <div className="flex md:w-2xl gap-4 md:gap-13">
                            <ButtonInterno
                                texto="Criar Treino"
                                type="submit"
                                corTexto="var(--azul-escuro)"
                                corHover="#F9FAFB"
                                borderColor={"#E6E6E2"}
                                borderStyle={"solid"}
                                borderWidth={"2px"}
                                width="50%"
                                height="50px"
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
                                corHover="#F9FAFB"
                                borderColor={"#E6E6E2"}
                                borderStyle={"solid"}
                                borderWidth={"2px"}
                                width="50%"
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
                    <div className="relative flex flex-col items-center gap-4 bg-[var(--cor-secundaria)] p-4 rounded-lg max-h-130 overflow-y-auto mt-5 border border-[#E6E6E2]">
                        {filteredTreinos.map((treino) => (
                            <div key={treino.id} className="relative w-full bg-[var(--cor-secundaria)] border border-[#E6E6E2] flex flex-wrap items-center rounded-lg p-2">
                                <div className="relative flex flex-col gap-10 md:flex-row items-center justify-between md:gap-8 w-full p-5">
                                    <div className="relative  flex flex-col md:flex-row gap-5 md:gap-10 items-center md:items-start justify-start w-full">
                                        <div className="relative flex grid-cols-2 items-center justify-between bg-[#FFFDF6] rounded-lg w-[90%] md:w-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-15 col-span-1" viewBox="0 0 60 49" fill="none">
                                                <path d="M48.3716 10.4004H52.0925C53.1194 10.4004 53.9529 11.4532 53.9529 12.7504V36.2504C53.9529 37.5476 53.1194 38.6004 52.0925 38.6004H48.3716C47.3447 38.6004 46.5112 37.5476 46.5112 36.2504V12.7504C46.5112 11.4532 47.3447 10.4004 48.3716 10.4004Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M40.9298 1H44.6506C45.6775 1 46.511 2.0528 46.511 3.35V45.65C46.511 46.9472 45.6775 48 44.6506 48H40.9298C39.9028 48 39.0693 46.9472 39.0693 45.65V3.35C39.0693 2.0528 39.9028 1 40.9298 1Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M14.8834 1H18.6042C19.6311 1 20.4646 2.0528 20.4646 3.35V45.65C20.4646 46.9472 19.6311 48 18.6042 48H14.8834C13.8564 48 13.0229 46.9472 13.0229 45.65V3.35C13.0229 2.0528 13.8564 1 14.8834 1Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M7.44147 10.4004H11.1623C12.1893 10.4004 13.0227 11.4532 13.0227 12.7504V36.2504C13.0227 37.5476 12.1893 38.6004 11.1623 38.6004H7.44147C6.41452 38.6004 5.58105 37.5476 5.58105 36.2504V12.7504C5.58105 11.4532 6.41452 10.4004 7.44147 10.4004Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M53.9531 24.5H59.5344" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M20.4648 24.5H39.069" stroke="#E96E35" strokeWidth="2" />
                                                    // <path d="M0 24.5H5.58125" stroke="#E96E35" strokeWidth="2" />
                                            </svg>
                                            <div className="flex flex-col gap-2 col-span-1 md:hidden">

                                                <div className="flex justify-end items-center">
                                                    <div className="relative" ref={buttonRef}>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Prevent card click event
                                                                setOpenMenuId(openMenuId === treino.id ? null : treino.id);
                                                            }}
                                                            className="flex items-center justify-center w-8 h-8 rounded-[5px] bg-gray-200 hover:bg-gray-300 transition duration-200"
                                                        >
                                                            <FaEllipsisV className="text-xl cursor-pointer" />
                                                        </button>

                                                        {openMenuId === treino.id && (
                                                            <div
                                                                style={{
                                                                    position: 'fixed',
                                                                    top: buttonRef.current?.getBoundingClientRect().top || 0,
                                                                    left: (buttonRef.current?.getBoundingClientRect().left || 0) - 180,
                                                                }}
                                                                className="bg-white border border-gray-200 rounded-md shadow-lg p-2 z-0 min-w-[160px]"
                                                            >
                                                                <TreinoActionsMenu treino={treino} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row md:grid-cols-2 md:gap-5 w-full">
                                            <div className="md:col-span-1 text-sm md:text-lg">
                                                <p><b>Treino: </b>{treino.nome}</p>
                                                <p><b>Quantidade de exercícios: </b>{treino.quantidadeExercicios}</p>
                                            </div>
                                            <div className="md:col-span-1 text-sm md:text-lg ">
                                                <p><b>Dificuldade: </b>{treino.dificuldade}</p>
                                                <p><b>Origem: </b>{treino.origem}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:flex flex-col-reverse justify-end md:flex-row md:gap-10 hidden">
                                        <div>
                                            <ButtonInterno
                                                logoSvg={
                                                    treino.favorito ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 58 58" fill="none">
                                                            <path d="M33.1809 8.48238L37.4342 16.9891C38.0142 18.1732 39.5609 19.309 40.8659 19.5266L48.575 20.8074C53.505 21.629 54.665 25.2057 51.1125 28.7341L45.1192 34.7274C44.1042 35.7424 43.5484 37.6999 43.8625 39.1016L45.5784 46.5207C46.9317 52.3932 43.8142 54.6649 38.6184 51.5957L31.3925 47.3182C30.0875 46.5449 27.9367 46.5449 26.6075 47.3182L19.3817 51.5957C14.21 54.6649 11.0684 52.3691 12.4217 46.5207L14.1375 39.1016C14.4517 37.6999 13.8959 35.7424 12.8809 34.7274L6.88752 28.7341C3.35919 25.2057 4.49502 21.629 9.42502 20.8074L17.1342 19.5266C18.415 19.309 19.9617 18.1732 20.5417 16.9891L24.795 8.48238C27.115 3.86655 30.885 3.86655 33.1809 8.48238Z" fill="#E96E35" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 58 58" fill="none">
                                                            <path d="M33.1809 8.48238L37.4342 16.9891C38.0142 18.1732 39.5609 19.309 40.8659 19.5266L48.575 20.8074C53.505 21.629 54.665 25.2057 51.1125 28.7341L45.1192 34.7274C44.1042 35.7424 43.5484 37.6999 43.8625 39.1016L45.5784 46.5207C46.9317 52.3932 43.8142 54.6649 38.6184 51.5957L31.3925 47.3182C30.0875 46.5449 27.9367 46.5449 26.6075 47.3182L19.3817 51.5957C14.21 54.6649 11.0684 52.3691 12.4217 46.5207L14.1375 39.1016C14.4517 37.6999 13.8959 35.7424 12.8809 34.7274L6.88752 28.7341C3.35919 25.2057 4.49502 21.629 9.42502 20.8074L17.1342 19.5266C18.415 19.309 19.9617 18.1732 20.5417 16.9891L24.795 8.48238C27.115 3.86655 30.885 3.86655 33.1809 8.48238Z" fill="#FFFDF6" stroke="#15171B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    )
                                                }
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent card click event
                                                    toggleFavorito(treino.id);
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-end items-center">
                                            <div className="relative" ref={buttonRef}>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent card click event
                                                        setOpenMenuId(openMenuId === treino.id ? null : treino.id);
                                                    }}
                                                >
                                                    <FaEllipsisV className="text-xl cursor-pointer" />
                                                </button>

                                                {openMenuId === treino.id && (
                                                    <div
                                                        ref={menuRef}
                                                        onClick={(e) => e.stopPropagation()} // Prevent card click event
                                                        className="absolute top-0 right-full mr-2 z-50 bg-white border border-gray-200 rounded-md shadow-lg p-2"
                                                    >
                                                        <TreinoActionsMenu treino={treino} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:hidden gap-2">
                                        <ButtonInterno
                                            logoSvg={
                                                treino.favorito ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 58 58" fill="none">
                                                        <path d="M33.1809 8.48238L37.4342 16.9891C38.0142 18.1732 39.5609 19.309 40.8659 19.5266L48.575 20.8074C53.505 21.629 54.665 25.2057 51.1125 28.7341L45.1192 34.7274C44.1042 35.7424 43.5484 37.6999 43.8625 39.1016L45.5784 46.5207C46.9317 52.3932 43.8142 54.6649 38.6184 51.5957L31.3925 47.3182C30.0875 46.5449 27.9367 46.5449 26.6075 47.3182L19.3817 51.5957C14.21 54.6649 11.0684 52.3691 12.4217 46.5207L14.1375 39.1016C14.4517 37.6999 13.8959 35.7424 12.8809 34.7274L6.88752 28.7341C3.35919 25.2057 4.49502 21.629 9.42502 20.8074L17.1342 19.5266C18.415 19.309 19.9617 18.1732 20.5417 16.9891L24.795 8.48238C27.115 3.86655 30.885 3.86655 33.1809 8.48238Z" fill="#E96E35" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 58 58" fill="none">
                                                        <path d="M33.1809 8.48238L37.4342 16.9891C38.0142 18.1732 39.5609 19.309 40.8659 19.5266L48.575 20.8074C53.505 21.629 54.665 25.2057 51.1125 28.7341L45.1192 34.7274C44.1042 35.7424 43.5484 37.6999 43.8625 39.1016L45.5784 46.5207C46.9317 52.3932 43.8142 54.6649 38.6184 51.5957L31.3925 47.3182C30.0875 46.5449 27.9367 46.5449 26.6075 47.3182L19.3817 51.5957C14.21 54.6649 11.0684 52.3691 12.4217 46.5207L14.1375 39.1016C14.4517 37.6999 13.8959 35.7424 12.8809 34.7274L6.88752 28.7341C3.35919 25.2057 4.49502 21.629 9.42502 20.8074L17.1342 19.5266C18.415 19.309 19.9617 18.1732 20.5417 16.9891L24.795 8.48238C27.115 3.86655 30.885 3.86655 33.1809 8.48238Z" fill="#FFFDF6" stroke="#15171B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )
                                            }
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent card click event
                                                toggleFavorito(treino.id);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
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


                                        <form onSubmit={handleSubmit((data) => console.log("Dados do formulário:", data))}>
                                            <div className="grid gap-4 mb-4">
                                                <div>
                                                    <Label
                                                        id="email"
                                                        nomeLabel="Email do aluno"
                                                        fontSize="20px"
                                                        fontWeight="500"
                                                    />
                                                    <InputPosLogin
                                                        id="email"
                                                        name="email"
                                                        inputType="email"
                                                        placeholder="Ex.: aluno@gmail.com"
                                                        fontSize="16px"
                                                        fontWeight="400"
                                                        fontSizeErro="16px"
                                                        width="100%"
                                                        {...register('email', {
                                                            required: 'Email do Aluno é obrigatório',
                                                            pattern: {
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: 'Email inválido',
                                                            },
                                                        })}
                                                        isError={!!errors.email}
                                                        errorMessage={errors.email?.message}
                                                    />
                                                    <ButtonInterno
                                                        texto="Acrescentar treino"
                                                        type="submit"
                                                        cor="#748CAB"
                                                        corTexto="#ffffff"
                                                        corHover="#677e9c"
                                                        width="40%"
                                                        height="50px"
                                                        font-size="14px"

                                                    />
                                                </div>
                                                <div className="border-[2px] border-[#E6E6E2] rounded-[7px] p-5">
                                                    <Label
                                                        id="duracao"
                                                        nomeLabel="Período de duração do plano"
                                                        fontSize="20px"
                                                        fontWeight="500"
                                                    />
                                                    <div className="relative">
                                                        <select defaultValue=""
                                                            id="duracao"
                                                            {...register("duracao", { required: 'Selecione o Período de duração do plano' })}
                                                            className="appearance-none text-base w-full flex items-center justify-center pt-[1%] pr-[1%] pb-[1%] pl-0 border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]">
                                                            <option disabled className="text-[#15171B87]" value="">Selecione o período</option>
                                                            <option value="MENSAL">Mensal</option>
                                                            <option value="SEMESTRAL">Semestral</option>
                                                            <option value="AVULSO">Avulso</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
                                                                <path d="M0.532697 0.412777C-0.177566 0.956418 -0.177566 1.83792 0.532697 2.38154L9.43019 9.18545C10.851 10.2719 13.1531 10.2714 14.5732 9.18461L23.4672 2.37653C24.1776 1.8329 24.1776 0.951407 23.4672 0.407752C22.757 -0.135917 21.6054 -0.135917 20.8952 0.407752L13.2828 6.23469C12.5726 6.77845 11.421 6.77831 10.7107 6.23469L3.10474 0.412777C2.3945 -0.130892 1.24294 -0.130892 0.532697 0.412777Z" fill="#15171B" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span className="error-message" style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                        height: 'auto',
                                                        marginTop: '12px',
                                                        color: '#D45C56',
                                                        fontSize: '16px',
                                                    }}>{errors.duracao && (
                                                        <div className="flex items-center justify-start gap-1 text-[#D45C56]">
                                                            <img src={info2} alt="Erro" className="w-4 h-4" />
                                                            <span>Selecione o Período de duração do plano</span>
                                                        </div>
                                                    )}
                                                    </span>
                                                    <Label
                                                        id="horario"
                                                        nomeLabel="Horário"
                                                        fontSize="20px"
                                                        fontWeight="500"
                                                    />
                                                    <InputPosLogin
                                                        id="horario"
                                                        name="horario"
                                                        inputType="time"
                                                        placeholder="15:45"
                                                        fontSize="16px"
                                                        fontWeight="400"
                                                        fontSizeErro="16px"
                                                        width="25%"
                                                        inputMode="numeric"
                                                        {...register('horario', {
                                                            required: 'O horário é obrigatório'
                                                        })}
                                                    />

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
                                                            required: 'A data de vencimento é obrigatória'
                                                        })}
                                                    />
                                                    <Label
                                                        id="diasDaSemana"
                                                        nomeLabel="Dias da Semana"
                                                        fontSize="20px"
                                                        fontWeight="500"
                                                    />
                                                    <div className="relative">
                                                        <select defaultValue=""
                                                            id="diasDaSemana"
                                                            {...register("diasDaSemana", {
                                                                required: 'Selecione o dia da semana'
                                                            })}
                                                            className="appearance-none text-base w-full flex items-center justify-center pt-[1%] pr-[1%] pb-[1%] pl-0 border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]">
                                                            <option disabled className="text-[#15171B87]" value="">Selecione o período</option>
                                                            <option value="SEGUNDA">Segunda</option>
                                                            <option value="TERCA">Terça</option>
                                                            <option value="QUARTA">Quarta</option>
                                                            <option value="QUINTA">Quinta</option>
                                                            <option value="SEXTA">Sexta</option>
                                                            <option value="SABADO">Sábado</option>
                                                            <option value="DOMINGO">Domingo</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
                                                                <path d="M0.532697 0.412777C-0.177566 0.956418 -0.177566 1.83792 0.532697 2.38154L9.43019 9.18545C10.851 10.2719 13.1531 10.2714 14.5732 9.18461L23.4672 2.37653C24.1776 1.8329 24.1776 0.951407 23.4672 0.407752C22.757 -0.135917 21.6054 -0.135917 20.8952 0.407752L13.2828 6.23469C12.5726 6.77845 11.421 6.77831 10.7107 6.23469L3.10474 0.412777C2.3945 -0.130892 1.24294 -0.130892 0.532697 0.412777Z" fill="#15171B" />
                                                            </svg>
                                                        </div>
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
                                                    corHover="#1D2D4417"
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
                                                    corHover="#46982BE5"
                                                    fontWeight="600"
                                                    aria-label={"Botão de Salvar"}
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
                            onConfirm={() => {
                                setModalConfirmarCancelarVisivel(false);
                                setShowCreateModal(false);
                            }}
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
                            }}
                            icone={iconCancelar}
                            textoBotaoConfirmar="Voltar"
                            textoBotaoCancelar="Cancelar mesmo assim"
                            aria-label="Modal de Cancelamento"
                        />
                    </div>
                </div>
            </div >
        </div >
    )
}

export default GerenciarTreinos;