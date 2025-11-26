import React from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import ButtonInterno from '../../components/Utils/Button'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import MenuFiltro from '../../components/Utils/MenuFiltro'
import { caringuApi } from '../../provider/caringuApi'
import TreinoRelatorioCard from '../../components/Utils/GerenciarTreinos/TreinoRelatorioCard'
import Pagination from '../../components/Utils/Pagination'

const RelatorioTreinos = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [sortOrder, setSortOrder] = useState(null); // A-Z or Z-A
    const [difficultyFilter, setDifficultyFilter] = useState(null); // "Fácil", "Média", "Difícil"
    const [treinos, setTreinos] = useState({ content: [], totalPages: 0, number: 0, size: 2 });

    const params = useParams();
    const navigate = useNavigate();
    const idAluno = params.id;


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        document.title = "Relatórios de Treino | CaringU"
        // pegarExercicios(params.id)
    }, [])

    const buscarTreinosAlunoRelatorios = async (page = 0, size = itemsPerPage) => {
        try {
            const { data } = await caringuApi.get(
                `/treinos-exercicios/aluno-paginado/${idAluno}`,
                { params: { page, size } }
            );
            setTreinos(data);
        } catch (e) {
            console.error(`Erro ao buscar os treinos do aluno com ID ${idAluno}:`, e);
        }
    };

    function formatarDificuldade(valor) {
        switch (valor) {
            case "INICIANTE":
                return "Iniciante";
            case "INTERMEDIARIO":
                return "Intermediário";
            case "AVANCADO":
                return "Avançado";
            default:
                return valor;
        }
    }



    const irParaDash = (idTreino) => {
        navigate(`/dashboard/${idAluno}/${idTreino}`);
    }

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
            } else {
                newItemsPerPage = 1;
            }
            setItemsPerPage(newItemsPerPage);
            setCurrentPage(1);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        buscarTreinosAlunoRelatorios(0, itemsPerPage);
    }, [idAluno, itemsPerPage]);

    const filteredTreinos = (treinos.content ?? [])
        .filter((treino) => {
            if (searchTerm && !treino.nomeTreino.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            if (difficultyFilter && treino.grauDificuldade.toLowerCase() !== difficultyFilter.toLowerCase()) {
                return false;
            }


            return true;
        })
        .sort((a, b) => {
            if (sortOrder === "A-Z") return a.nomeTreino.localeCompare(b.nomeTreino);
            if (sortOrder === "Z-A") return b.nomeTreino.localeCompare(a.nomeTreino);
            return 0;
        });

    const currentTreinos = filteredTreinos;
    const totalPages = treinos.totalPages ?? 0;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, sortOrder, difficultyFilter]);

    const goToPage = (page) => {
        setCurrentPage(page);
        buscarTreinosAlunoRelatorios(page - 1, itemsPerPage);
    };

    const goToPrevious = () => {
        if (currentPage > 1) goToPage(currentPage - 1);
    };

    const goToNext = () => {
        if (currentPage < totalPages) goToPage(currentPage + 1);
    };

    return (
        <div className="flex h-screen bg-[var(--cor-secundaria)]">
            <MenuLateral />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Header toggleSidebar={toggleSidebar} />
                <main className="p-4 md:p-8 space-y-8 flex flex-col">
                    <div className="bg-[#F9F9F9] rounded-lg p-4 md:p-6 border-2 border-[#E6E6E2]">
                        <div className="justify-start text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] flex flex-wrap items-center gap-5">
                            <Link to="/gerenciar-alunos">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                    <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <h1>Selecionar Treino</h1>
                        </div>
                        <div className="flex items-center gap-2 mb-4 w-full mt-5">
                            <input
                                type="text"
                                placeholder="Pesquisar treino"
                                className="flex-1 border-2 border-gray-300 rounded-md p-2 w-full sm:w-auto"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MenuFiltro
                                //menuWidth="300px"
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

                                    // 🎯 Dificuldade
                                    {
                                        id: "INICIANTE",
                                        label: "Dificuldade: INICIANTE",
                                        active: difficultyFilter === "INICIANTE",
                                        className: "flex items-center justify-start gap-2 p-2",
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`shrink-0 w-7 ${difficultyFilter === "INICIANTE" ? "stroke-white" : "stroke-[#748CAB]"}`}
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`shrink-0 w-7 ${difficultyFilter === "INTERMEDIARIO" ? "stroke-white" : "stroke-[#E8CD00]"}`
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`shrink-0 w-7 ${difficultyFilter === "AVANCADO" ? "stroke-white" : "stroke-[#B41F1F]"}`
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
                        <div className="flex flex-col items-center gap-4 mt-5 bg-transparent p-4 rounded-lg max-h-140 overflow-y-auto overflow-x-hidden ">

                            {currentTreinos.map((treino) => (
                                <TreinoRelatorioCard
                                    key={treino.treinoId}
                                    treino={treino}
                                    onVerRelatorio={irParaDash}
                                    formatarDificuldade={formatarDificuldade}
                                />
                            ))}
                            <div className="flex justify-center mt-4">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    itemsLength={currentTreinos.length}
                                    onPageChange={goToPage}
                                    onPrevious={goToPrevious}
                                    onNext={goToNext}
                                    maxVisible={3}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div >
    )
}

export default RelatorioTreinos