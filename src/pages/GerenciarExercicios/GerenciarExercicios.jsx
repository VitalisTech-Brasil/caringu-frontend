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
import { icons } from "lucide-react";

const GerenciarExercicios = () => {


    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(null); // A-Z or Z-A
    const [openMenuId, setOpenMenuId] = useState(null);
    const [difficultyFilter, setDifficultyFilter] = useState(null); // "Fácil", "Média", "Difícil"
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const [modalDeletarVisivel, setModalDeletarVisivel] = useState(false);
    const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false)
    const [exercicioSelecionado, setExercicioSelecionado] = useState(null);

    const [origemSelecionada, setOrigemSelecionada] = useState("");
    const [grupoMuscularSelecionado, setGrupoMuscularSelecionado] = useState("");

    const [origemFilter, setOrigemFilter] = useState("");
    const [grupoMuscularFilter, setGrupoMuscularFilter] = useState("");

    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const params = useParams();
    const navigate = useNavigate();

    const [exercicios, setExercicios] = useState([
        {
            id: 1,
            nome: "Rosca Direta",
            grupoMuscular: "Bíceps",
            origem: "Biblioteca CaringU",
            favorito: true,
            url: "https://www.youtube.com/watch?v=rosca-direta",
            observacoes: "Focar na execução e postura."
        },
        {
            id: 2,
            nome: "Rosca Martelo",
            grupoMuscular: "Bíceps",
            origem: "Criados por mim",
            favorito: false,
            url: "https://www.youtube.com/watch?v=rosca-martelo",
            observacoes: "Manter os cotovelos fixos."
        },
        {
            id: 3,
            nome: "Tríceps Testa",
            grupoMuscular: "Tríceps",
            origem: "Biblioteca CaringU",
            favorito: true,
            url: "https://www.youtube.com/watch?v=triceps-testa",
            observacoes: "Evitar abrir demais os cotovelos."
        },
        {
            id: 4,
            nome: "Agachamento Livre",
            grupoMuscular: "Pernas",
            origem: "Biblioteca CaringU",
            favorito: true,
            url: "https://www.youtube.com/watch?v=agachamento-livre",
            observacoes: "Descer até 90 graus mantendo a coluna neutra."
        },
        {
            id: 5,
            nome: "Leg Press",
            grupoMuscular: "Pernas",
            origem: "Criados por mim",
            favorito: false,
            url: "https://www.youtube.com/watch?v=leg-press",
            observacoes: "Não estender completamente os joelhos."
        },
        {
            id: 6,
            nome: "Cadeira Extensora",
            grupoMuscular: "Quadríceps",
            origem: "Biblioteca CaringU",
            favorito: true,
            url: "https://www.youtube.com/watch?v=cadeira-extensora",
            observacoes: "Segurar 2 segundos no topo do movimento."
        },
        {
            id: 7,
            nome: "Supino Reto",
            grupoMuscular: "Peitoral",
            origem: "Biblioteca CaringU",
            favorito: true,
            url: "https://www.youtube.com/watch?v=supino-reto",
            observacoes: "Controle na descida e pés firmes no chão."
        },
        {
            id: 8,
            nome: "Crucifixo",
            grupoMuscular: "Peitoral",
            origem: "Criados por mim",
            favorito: false,
            url: "https://www.youtube.com/watch?v=crucifixo",
            observacoes: "Não deixar os braços descerem além da linha dos ombros."
        },
        {
            id: 9,
            nome: "Remada Curvada",
            grupoMuscular: "Costas",
            origem: "Biblioteca CaringU",
            favorito: true,
            url: "https://www.youtube.com/watch?v=remada-curvada",
            observacoes: "Manter a coluna neutra e abdômen contraído."
        },
        {
            id: 10,
            nome: "Puxada Frontal",
            grupoMuscular: "Costas",
            origem: "Criados por mim",
            favorito: false,
            url: "https://www.youtube.com/watch?v=puxada-frontal",
            observacoes: "Concentrar na ativação das dorsais."
        },
        {
            id: 11,
            nome: "Desenvolvimento",
            grupoMuscular: "Ombros",
            origem: "Biblioteca CaringU",
            favorito: true,
            url: "https://www.youtube.com/watch?v=desenvolvimento",
            observacoes: "Não deixar os cotovelos baixar abaixo da linha dos ombros."
        },
        {
            id: 12,
            nome: "Elevação Lateral",
            grupoMuscular: "Ombros",
            origem: "Criados por mim",
            favorito: false,
            url: "https://www.youtube.com/watch?v=elevacao-lateral",
            observacoes: "Executar lentamente, foco no deltoide lateral."
        },
        {
            id: 13,
            nome: "Abdominal Infra",
            grupoMuscular: "Abdômen",
            origem: "Biblioteca CaringU",
            favorito: true,
            url: "https://www.youtube.com/watch?v=abdominal-infra",
            observacoes: "Não utilizar o balanço das pernas."
        },
        {
            id: 14,
            nome: "Prancha",
            grupoMuscular: "Abdômen",
            origem: "Criados por mim",
            favorito: false,
            url: "https://www.youtube.com/watch?v=prancha",
            observacoes: "Manter o abdômen contraído e a lombar neutra."
        }
    ]);



    const { register, handleSubmit, formState: { errors, isSubmitted }, setValue, trigger, reset } = useForm({
        defaultValues: {
            plano: "",
            duracao: "",
            preco: "",
            aulas: ""
        },
        mode: "onChange"
    });


    const toggleFavorito = (id) => {
        const exercicioIndex = exercicios.findIndex((exercicio) => exercicio.id === id);
        const updatedexercicios = [...exercicios];
        updatedexercicios[exercicioIndex].favorito = !updatedexercicios[exercicioIndex].favorito;
        setExercicios(updatedexercicios);
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

    const handleGrupoMuscularSelect = (value) => {
        setGrupoMuscularSelecionado(value);
        setGrupoMuscularFilter(value);
    };

    const filteredExercicios = exercicios
        .filter((exercicio) => {
            if (searchTerm && !exercicio.nome.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            if (grupoMuscularFilter && grupoMuscularFilter !== "" &&
                exercicio.grupoMuscular.toLowerCase() !== grupoMuscularFilter.toLowerCase()) {
                return false;
            }
            if (origemFilter && origemFilter !== "" &&
                exercicio.origem.toLowerCase() !== origemFilter.toLowerCase()) {
                return false;
            }
            if (showOnlyFavorites && !exercicio.favorito) {
                return false;
            }
            if (difficultyFilter && exercicio.dificuldade !== difficultyFilter) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            if (sortOrder === "A-Z") return a.nome.localeCompare(b.nome);
            if (sortOrder === "Z-A") return b.nome.localeCompare(a.nome);
            return 0;
        });

    useEffect(() => {
        if (showEditModal && exercicioSelecionado) {
            reset({
                nome: exercicioSelecionado.nome,
                url: exercicioSelecionado.url || '',
                grupoMuscular: exercicioSelecionado.grupoMuscular,
                observacoes: exercicioSelecionado.observacoes || '',
            });
        }
    }, [showEditModal, exercicioSelecionado, reset]);

    const openDeleteModal = () => {
        setModalDeletarVisivel(true);

    };

    const confirmDelete = () => {
        alert("exercicio excluído!");
        setModalDeletarVisivel(false);
    };

    const handleOpenModal = () => {
        setShowCreateModal(true);
    };

    const handleEditarExercicio = (exercicio) => {
        setExercicioSelecionado(exercicio);
        setShowEditModal(true);
    };


    const ExercicioActionsMenu = ({ exercicio }) => (
        <div className="flex flex-col text-sm font-medium w-[120px] max-w-[200px]">
            <button className="flex items-center justify-end gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer"
                onClick={() => handleEditarExercicio(exercicio)}
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
                onClick={() => openDeleteModal(exercicio.id)}
            >
                Excluir
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21.0702 5.23C19.4602 5.07 17.8502 4.95 16.2302 4.86V4.85L16.0102 3.55C15.8602 2.63 15.6402 1.25 13.3002 1.25H10.6802C8.35016 1.25 8.13016 2.57 7.97016 3.54L7.76016 4.82C6.83016 4.88 5.90016 4.94 4.97016 5.03L2.93016 5.23C2.51016 5.27 2.21016 5.64 2.25016 6.05C2.29016 6.46 2.65016 6.76 3.07016 6.72L5.11016 6.52C10.3502 6 15.6302 6.2 20.9302 6.73C20.9602 6.73 20.9802 6.73 21.0102 6.73C21.3902 6.73 21.7202 6.44 21.7602 6.05C21.7902 5.64 21.4902 5.27 21.0702 5.23Z" fill="#B41F1F" />
                    <path d="M19.2302 8.14C18.9902 7.89 18.6602 7.75 18.3202 7.75H5.68024C5.34024 7.75 5.00024 7.89 4.77024 8.14C4.54024 8.39 4.41024 8.73 4.43024 9.08L5.05024 19.34C5.16024 20.86 5.30024 22.76 8.79024 22.76H15.2102C18.7002 22.76 18.8402 20.87 18.9502 19.34L19.5702 9.09C19.5902 8.73 19.4602 8.39 19.2302 8.14ZM13.6602 17.75H10.3302C9.92024 17.75 9.58024 17.41 9.58024 17C9.58024 16.59 9.92024 16.25 10.3302 16.25H13.6602C14.0702 16.25 14.4102 16.59 14.4102 17C14.4102 17.41 14.0702 17.75 13.6602 17.75ZM14.5002 13.75H9.50024C9.09024 13.75 8.75024 13.41 8.75024 13C8.75024 12.59 9.09024 12.25 9.50024 12.25H14.5002C14.9102 12.25 15.2502 12.59 15.2502 13C15.2502 13.41 14.9102 13.75 14.5002 13.75Z" fill="#B41F1F" />
                </svg>
            </button>
        </div>
    );

    const isAnyFilterActive = [
        origemFilter,
        grupoMuscularFilter,
        difficultyFilter,
        showOnlyFavorites
    ].some(Boolean);

    const handleClearFilters = () => {
        setOrigemFilter("");
        setGrupoMuscularFilter("");
        setDifficultyFilter("");
        setShowOnlyFavorites(false);
        setSearchTerm("");

        // Zera também os selecionados dos dropdowns
        setOrigemSelecionada("");
        setGrupoMuscularSelecionado("");
    };

    return (
        <div className="flex min-h-screen bg-[#fdfbf7]">
            <MenuLateral />
            <div className="flex-1 overflow-y-auto max-h-[100vh]">
                <Header />

                {/* <div className="flex flex-col justify-center items-center w-full"> */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-5 lg:gap-30 w-full my-5 md:my-10">
                    <div className="border border-[#E6E6E2] rounded-md w-90 md:w-80 lg:w-100 lg:h-1/4 h-25 grid grid-cols-3 justify-center items-center p-5">
                        <svg className="col-span-1 max-w-15 max-h-15" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="41.5" cy="41.5" r="41.5" fill="#748CAB" fillOpacity="0.21" />
                            <path d="M55.8693 29.4697H58.8262C59.6423 29.4697 60.3046 30.3064 60.3046 31.3372V50.0122C60.3046 51.0431 59.6423 51.8797 58.8262 51.8797H55.8693C55.0532 51.8797 54.3909 51.0431 54.3909 50.0122V31.3372C54.3909 30.3064 55.0532 29.4697 55.8693 29.4697Z" stroke="#748CAB" strokeWidth="3" />
                            <path d="M49.9555 22H52.9124C53.7285 22 54.3908 22.8366 54.3908 23.8675V57.4825C54.3908 58.5134 53.7285 59.35 52.9124 59.35H49.9555C49.1394 59.35 48.4771 58.5134 48.4771 57.4825V23.8675C48.4771 22.8366 49.1394 22 49.9555 22Z" stroke="#748CAB" strokeWidth="3" />
                            <path d="M29.2575 22H32.2144C33.0305 22 33.6928 22.8366 33.6928 23.8675V57.4825C33.6928 58.5134 33.0305 59.35 32.2144 59.35H29.2575C28.4414 59.35 27.7791 58.5134 27.7791 57.4825V23.8675C27.7791 22.8366 28.4414 22 29.2575 22Z" stroke="#748CAB" strokeWidth="3" />
                            <path d="M23.3437 29.4697H26.3005C27.1166 29.4697 27.779 30.3064 27.779 31.3372V50.0122C27.779 51.0431 27.1166 51.8797 26.3005 51.8797H23.3437C22.5276 51.8797 21.8652 51.0431 21.8652 50.0122V31.3372C21.8652 30.3064 22.5276 29.4697 23.3437 29.4697Z" stroke="#748CAB" strokeWidth="3" />
                            <path d="M60.3047 40.6748H64.74" stroke="#748CAB" strokeWidth="3" />
                            <path d="M33.6926 40.6748H48.477" stroke="#748CAB" strokeWidth="3" />
                            <path d="M17.4299 40.6748H21.8652" stroke="#748CAB" strokeWidth="3" />
                        </svg>
                        <div className="col-span-2 flex-col">
                            <h1 className="font-semibold">Exercícios Criados</h1>
                            10
                        </div>
                    </div>
                    <div className="border border-[#E6E6E2] rounded-md w-90 md:w-80 lg:w-100 lg:h-1/4 h-25 grid grid-cols-3 justify-center items-center p-5">
                        <svg className="col-span-1 max-w-15 max-h-15" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="41.5" cy="41.5" r="41.5" fill="#E96E35" fillOpacity="0.31" />
                            <path d="M38.0418 30.2946H44.9585C48.4168 30.2946 48.4168 28.5654 48.4168 26.8363C48.4168 23.3779 46.6877 23.3779 44.9585 23.3779H38.0418C36.3127 23.3779 34.5835 23.3779 34.5835 26.8363C34.5835 30.2946 36.3127 30.2946 38.0418 30.2946Z" stroke="#E96E35" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M48.4167 26.8711C54.1748 27.1823 57.0625 29.3092 57.0625 37.2115V47.5865C57.0625 54.5032 55.3333 57.9615 46.6875 57.9615H36.3125C27.6667 57.9615 25.9375 54.5032 25.9375 47.5865V37.2115C25.9375 29.3265 28.8252 27.1823 34.5833 26.8711" stroke="#E96E35" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="col-span-2 flex-col">
                            <h1 className="font-semibold">Exercícios da Biblioteca</h1>
                            7
                        </div>
                    </div>
                </div>
                <div className="bg-[var(--cor-secundaria)] rounded-lg p-6 md:p-6 border border-[#E6E6E2] max-h-135 md:h-[65%] mx-8">
                    <h1 className="text-zinc-900 md:text-3xl font-semibold font-['Inter']">Gerenciamento de Exercícios</h1>
                    <div className="flex flex-col md:flex-row items-center gap-2 mt-5 justify-between max-w-full">
                        <div className="flex items-center gap-2 md:w-full">
                            <input
                                type="text"
                                placeholder="Pesquisar exercicio"
                                className="flex-1 border max-w-50 border-gray-300 rounded-md p-2 md:max-w-1/2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MenuFiltro
                                menuWidth="280px"
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
                                    {
                                        id: "az",
                                        label: "A-Z",
                                        width: '50%',
                                        active: sortOrder === "A-Z",
                                        onClick: () => setSortOrder((prev) => (prev === "A-Z" ? null : "A-Z")),
                                    },
                                    {
                                        id: "za",
                                        label: "Z-A",
                                        width: '50%',
                                        active: sortOrder === "Z-A",
                                        onClick: () => setSortOrder((prev) => (prev === "Z-A" ? null : "Z-A")),
                                    },
                                    {
                                        id: "favoritos",
                                        label: "Favoritos",
                                        width: "55%",
                                        icon:
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                                <path d="M20.0229 5.11885L22.5896 10.2522C22.9396 10.9668 23.8729 11.6522 24.6604 11.7834L29.3125 12.5563C32.2875 13.0522 32.9875 15.2105 30.8437 17.3397L27.2271 20.9563C26.6146 21.5688 26.2792 22.7501 26.4687 23.5959L27.5042 28.073C28.3208 31.6168 26.4396 32.9876 23.3042 31.1355L18.9437 28.5543C18.1562 28.0876 16.8583 28.0876 16.0562 28.5543L11.6958 31.1355C8.57499 32.9876 6.67916 31.6022 7.49582 28.073L8.53124 23.5959C8.72082 22.7501 8.38541 21.5688 7.77291 20.9563L4.15624 17.3397C2.02707 15.2105 2.71249 13.0522 5.68749 12.5563L10.3396 11.7834C11.1125 11.6522 12.0458 10.9668 12.3958 10.2522L14.9625 5.11885C16.3625 2.33343 18.6375 2.33343 20.0229 5.11885Z" stroke="#E96E35" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>,
                                        active: showOnlyFavorites,
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
                                            { label: "Biblioteca CaringU", value: "Biblioteca CaringU" },
                                            { label: "Criados por mim", value: "Criados por mim" },
                                            { label: "Outro", value: "Outro" },
                                        ],
                                        onSelect: handleOrigemSelect,
                                    },
                                    {
                                        type: "dropdown",
                                        id: "grupoMuscular",
                                        label: "Grupo muscular",
                                        selected: grupoMuscularSelecionado,
                                        active: grupoMuscularFilter === grupoMuscularSelecionado,
                                        width: '85%',
                                        icon:
                                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                                                <path d="M26.4858 27.75C30.1858 27.75 31.1108 25.6687 31.1108 23.125V13.875C31.1108 11.3312 30.1858 9.25 26.4858 9.25C22.7858 9.25 21.8608 11.3312 21.8608 13.875V23.125C21.8608 25.6687 22.7858 27.75 26.4858 27.75Z" stroke="#748CAB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M10.5142 27.75C6.81416 27.75 5.88916 25.6687 5.88916 23.125V13.875C5.88916 11.3312 6.81416 9.25 10.5142 9.25C14.2142 9.25 15.1392 11.3312 15.1392 13.875V23.125C15.1392 25.6687 14.2142 27.75 10.5142 27.75Z" stroke="#748CAB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M15.1392 18.5H21.8608" stroke="#748CAB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M34.6875 22.3541V14.6458" stroke="#748CAB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M2.3125 22.3541V14.6458" stroke="#748CAB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>,
                                        items: [
                                            { label: "Limpar filtro", value: "" },
                                            { label: "Peitoral", value: "Peitoral" },
                                            { label: "Costas", value: "Costas" },
                                            { label: "Pernas", value: "Pernas" },
                                            { label: "Braços", value: "Braços" },
                                        ],
                                        onSelect: handleGrupoMuscularSelect,
                                    }

                                ]}
                            />
                        </div>
                        <div className="flex justify-end md:w-2xl gap-4 md:gap-13">
                            <ButtonInterno
                                classNameExtra="p-4"
                                texto="Criar Exercicio"
                                type="submit"
                                corTexto="var(--azul-escuro)"
                                corHover="#F9FAFB"
                                borderColor={"#E6E6E2"}
                                borderStyle={"solid"}
                                borderWidth={"2px"}
                                width="60%"
                                height="50px"
                                font-size={fontSize}
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
                                onClick={handleOpenModal}
                            />
                        </div>
                    </div>
                    <div className="relative flex flex-col items-center gap-4 bg-[var(--cor-secundaria)] p-4 rounded-lg max-h-70 md:max-h-[75%] overflow-y-auto mt-5 border border-[#E6E6E2]">
                        {filteredExercicios.map((exercicio) => (
                            <div key={exercicio.id} className="relative w-full bg-[var(--cor-secundaria)] border border-[#E6E6E2] flex flex-wrap items-center rounded-lg px-2">
                                <div className="relative flex flex-col md:flex-row items-center justify-between md:gap-8 w-full p-5">
                                    <div className="relative flex flex-col md:flex-row  md:gap-10 items-center md:items-start justify-start w-full">
                                        <div className="relative flex grid-cols-2 items-center justify-between bg-[#FFFDF6] rounded-lg w-[90%] md:w-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-15 col-span-1" viewBox="0 0 70 70" fill="none">
                                                <path d="M58.3334 24.0622V52.4997C58.3334 61.2497 53.1126 64.1663 46.6667 64.1663H23.3334C16.8876 64.1663 11.6667 61.2497 11.6667 52.4997V24.0622C11.6667 14.583 16.8876 12.3955 23.3334 12.3955C23.3334 14.2038 24.0625 15.8372 25.2583 17.033C26.4542 18.2288 28.0876 18.958 29.8959 18.958H40.1042C43.7209 18.958 46.6667 16.0122 46.6667 12.3955C53.1126 12.3955 58.3334 14.583 58.3334 24.0622Z" stroke="#1D2D44" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M46.6666 12.3955C46.6666 16.0122 43.7208 18.958 40.1041 18.958H29.8958C28.0874 18.958 26.454 18.2288 25.2582 17.033C24.0623 15.8372 23.3333 14.2038 23.3333 12.3955C23.3333 8.77884 26.2791 5.83301 29.8958 5.83301H40.1041C41.9124 5.83301 43.5458 6.56219 44.7417 7.75802C45.9375 8.95385 46.6666 10.5872 46.6666 12.3955Z" stroke="#1D2D44" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M23.3333 37.917H34.9999" stroke="#1D2D44" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M23.3333 49.583H46.6666" stroke="#1D2D44" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <div className="flex flex-col gap-2 col-span-1 md:hidden">
                                                <div className="flex justify-end items-center">
                                                    <div className="relative" ref={buttonRef}>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Prevent card click event
                                                                setOpenMenuId(openMenuId === exercicio.id ? null : exercicio.id);
                                                            }}
                                                            className="flex items-center justify-center w-8 h-8 rounded-[5px] bg-gray-200 hover:bg-gray-300 transition duration-200"
                                                        >
                                                            <FaEllipsisV className="text-xl cursor-pointer" />
                                                        </button>
                                                        {openMenuId === exercicio.id && (
                                                            <div
                                                                style={{
                                                                    position: 'fixed',
                                                                    top: buttonRef.current?.getBoundingClientRect().top || 0,
                                                                    left: (buttonRef.current?.getBoundingClientRect().left || 0) - 180,
                                                                }}
                                                                className="bg-white border border-gray-200 rounded-md shadow-lg p-2 z-[9999] min-w-[160px]"
                                                            >
                                                                <ExercicioActionsMenu exercicio={exercicio} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row md:grid-cols-2 md:gap-5 w-full">
                                            <div className="md:col-span-1 text-sm md:text-lg">
                                                <p><b>Nome: </b>{exercicio.nome}</p>
                                                <p><b>Grupo Muscular: </b>{exercicio.grupoMuscular}</p>
                                            </div>
                                            <div className="md:col-span-1 text-sm md:text-lg ">
                                                <p><b>Origem: </b>{exercicio.origem}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:flex flex-col-reverse justify-end md:flex-row md:gap-10 hidden">
                                        <div>
                                            <ButtonInterno
                                                logoSvg={
                                                    exercicio.favorito ? (
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
                                                    toggleFavorito(exercicio.id);
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-end items-center">
                                            <div className="relative" ref={buttonRef}>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent card click event
                                                        setOpenMenuId(openMenuId === exercicio.id ? null : exercicio.id);
                                                    }}
                                                >
                                                    <FaEllipsisV className="text-xl cursor-pointer" />
                                                </button>
                                                {openMenuId === exercicio.id && (
                                                    <div
                                                        ref={menuRef}
                                                        onClick={(e) => e.stopPropagation()} // Prevent card click event
                                                        className="absolute top-0 right-full mr-2 z-30 bg-white border border-gray-200 rounded-md shadow-lg p-2"
                                                    >
                                                        <ExercicioActionsMenu exercicio={exercicio} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:hidden gap-2">
                                        <ButtonInterno
                                            logoSvg={
                                                exercicio.favorito ? (
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
                                                toggleFavorito(exercicio.id);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        {showCreateModal && (
                            <div className="fixed inset-0 z-40 flex justify-center items-center overflow-y-auto">
                                <div className="absolute inset-0 bg-[#000000] opacity-50"
                                    aria-label="Fundo Escurecido"
                                ></div>
                                <div className="relative p-4 w-full max-w-2xl">
                                    <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                                        <div className="flex justify-between items-center pb-4 mb-4 ">
                                            <h1 className="text-4xl font-semibold text-[var(--cor-primaria)]">
                                                Criar Exercício
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
                                                <Label
                                                    id="nome"
                                                    nomeLabel="Nome"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="nome"
                                                    name="nome"
                                                    inputType="text"
                                                    placeholder="Digite o nome do exercício"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    {...register('nome', {
                                                        required: 'O nome do exercício é obrigatório',
                                                        minLength: {
                                                            value: 3,
                                                            message: 'O nome deve ter pelo menos 3 caracteres',
                                                        },
                                                    })}
                                                    isError={!!errors.nome}
                                                    errorMessage={errors.nome?.message}
                                                />

                                                <Label
                                                    id="url"
                                                    nomeLabel="URL do vídeo"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="url"
                                                    name="url"
                                                    inputType="text"
                                                    placeholder="Insira o URL do vídeo do exercício"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    inputMode="text"
                                                    {...register('url', {
                                                        required: 'A URL é obrigatória',
                                                        pattern: {
                                                            value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
                                                            message: 'Insira uma URL válida',
                                                        },
                                                    })}
                                                    isError={!!errors.url}
                                                    errorMessage={errors.url?.message}
                                                />

                                                <Label
                                                    id="grupoMuscular"
                                                    nomeLabel="Grupo muscular"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="grupoMuscular"
                                                    name="grupoMuscular"
                                                    inputType="text"
                                                    placeholder="Ex: Peitoral"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    inputMode="text"
                                                    {...register('grupoMuscular', {
                                                        required: 'O grupo muscular é obrigatório',
                                                        minLength: {
                                                            value: 3,
                                                            message: 'O grupo muscular deve ter pelo menos 3 caracteres',
                                                        },
                                                    })}
                                                    isError={!!errors.grupoMuscular}
                                                    errorMessage={errors.grupoMuscular?.message}
                                                />

                                                <Label
                                                    id="observacoes"
                                                    nomeLabel="Observações"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="observacoes"
                                                    name="observacoes"
                                                    inputType="text"
                                                    placeholder="Observações sobre o exercício"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    inputMode="text"
                                                    {...register('observacoes', {
                                                        required: 'As observações são obrigatórias',
                                                        minLength: {
                                                            value: 3,
                                                            message: 'As observações devem ter pelo menos 3 caracteres',
                                                        },
                                                    })}
                                                    isError={!!errors.observacoes}
                                                    errorMessage={errors.observacoes?.message}
                                                />


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

                        {showEditModal && exercicioSelecionado && (
                            <div className="fixed inset-0 z-40 flex justify-center items-center overflow-y-auto">
                                <div className="absolute inset-0 bg-[#000000] opacity-50" aria-label="Fundo Escurecido"></div>
                                <div className="relative p-4 w-full max-w-2xl">
                                    <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                                        <div className="flex justify-between items-center pb-4 mb-4">
                                            <h1 className="text-4xl font-semibold text-[var(--cor-primaria)]">
                                                Editar Exercício
                                            </h1>
                                            <button
                                                type="button"
                                                onClick={() => setModalConfirmarCancelarVisivel(true)}
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
                                        <form onSubmit={handleSubmit((data) => console.log("Dados editados:", data))}>
                                            <div className="grid gap-4 mb-4">
                                                <Label
                                                    id="nome"
                                                    nomeLabel="Nome"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="nome"
                                                    name="nome"
                                                    inputType="text"
                                                    placeholder="Digite o nome do exercício"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    {...register('nome', {
                                                        required: 'O nome do exercício é obrigatório',
                                                        minLength: {
                                                            value: 3,
                                                            message: 'O nome deve ter pelo menos 3 caracteres',
                                                        },
                                                    })}
                                                    isError={!!errors.nome}
                                                    errorMessage={errors.nome?.message}
                                                />

                                                <Label
                                                    id="url"
                                                    nomeLabel="URL do vídeo"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="url"
                                                    name="url"
                                                    inputType="text"
                                                    placeholder="Insira o URL do vídeo do exercício"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    inputMode="text"
                                                    {...register('url', {
                                                        required: 'A URL é obrigatória',
                                                        pattern: {
                                                            value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
                                                            message: 'Insira uma URL válida',
                                                        },
                                                    })}
                                                    isError={!!errors.url}
                                                    errorMessage={errors.url?.message}
                                                />

                                                <Label
                                                    id="grupoMuscular"
                                                    nomeLabel="Grupo muscular"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="grupoMuscular"
                                                    name="grupoMuscular"
                                                    inputType="text"
                                                    placeholder="Ex: Peitoral"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    inputMode="text"
                                                    {...register('grupoMuscular', {
                                                        required: 'O grupo muscular é obrigatório',
                                                        minLength: {
                                                            value: 3,
                                                            message: 'O grupo muscular deve ter pelo menos 3 caracteres',
                                                        },
                                                    })}
                                                    isError={!!errors.grupoMuscular}
                                                    errorMessage={errors.grupoMuscular?.message}
                                                />

                                                <Label
                                                    id="observacoes"
                                                    nomeLabel="Observações"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="observacoes"
                                                    name="observacoes"
                                                    inputType="text"
                                                    placeholder="Observações sobre o exercício"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    inputMode="text"
                                                    {...register('observacoes', {
                                                        required: 'As observações são obrigatórias',
                                                        minLength: {
                                                            value: 3,
                                                            message: 'As observações devem ter pelo menos 3 caracteres',
                                                        },
                                                    })}
                                                    isError={!!errors.observacoes}
                                                    errorMessage={errors.observacoes?.message}
                                                />


                                            </div>
                                            <div className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center">
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
                                                />
                                                <ButtonInterno
                                                    texto="Salvar"
                                                    corTexto="var(--cor-secundaria)"
                                                    cor="#46982B"
                                                    height="2.75rem"
                                                    width="9.2rem"
                                                    corHover="#46982BE5"
                                                    fontWeight="600"
                                                    aria-label={"Botão de Salvar"}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Modal
                            visivel={modalDeletarVisivel}
                            fecharModal={() => setModalDeletarVisivel(false)}
                            titulo="Tem certeza que deseja excluir esse exercicio?"
                            descricao="Você não poderá disponibilizá-lo futuramente"
                            onConfirm={() => {
                                setModalConfirmarCancelarVisivel(false);
                                setShowCreateModal(false);
                            }}
                            icone={lixeira}
                            textoBotaoConfirmar="Manter exercicio"
                            textoBotaoCancelar="Deletar mesmo assim"
                            aria-label="Modal de Exclusão de exercicio"
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
                {/* </div> */}
            </div >
        </div >
    )
}

export default GerenciarExercicios;