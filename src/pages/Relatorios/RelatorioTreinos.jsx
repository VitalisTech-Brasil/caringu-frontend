import React, { use } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import ButtonInterno from '../../components/Utils/Button'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import MenuFiltro from '../../components/Utils/MenuFiltro'
import { caringuApi } from '../../provider/caringuApi'

const RelatorioTreinos = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [sortOrder, setSortOrder] = useState(null); // A-Z or Z-A
    const [exercicioSelecionado, setExercicioSelecionado] = useState(null);
    const [difficultyFilter, setDifficultyFilter] = useState(null); // "Fácil", "Média", "Difícil"
    const [treinos, setTreinos] = useState([]);

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


    useEffect(() => {
        const relatoriosTreinosAluno = async () => {
            try {
                const response = await caringuApi.get(`/treinos-exercicios/aluno/${idAluno}`);
                console.log('Treinos obtidos com sucesso:', response.data);
                setTreinos(response.data);
            } catch (error) {
                console.error('Erro ao buscar os treinos:', error);
            }
        }
        relatoriosTreinosAluno();
    }, []);

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




    const handleGrupoMuscularSelect = (value) => {
        setGrupoMuscularSelecionado(value);
        setGrupoMuscularFilter(value);
    };


    const filteredTreinos = treinos
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


    const irParaDash = (idTreino) => {
        navigate(`/dashboard/${idAluno}/${idTreino}`);
    }

    return (
        <div className="flex h-screen bg-[#fdfbf7]">
            <MenuLateral />
            <div className="flex-1 flex flex-col">
                <Header toggleSidebar={toggleSidebar} />
                <main className="p-4 md:p-8 space-y-8 flex flex-col">
                    <div className="bg-[var(--cor-secundaria)] rounded-lg p-4 md:p-6 border-2 border-[#E6E6E2]">
                        <div className="justify-start text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] flex flex-wrap items-center gap-5">
                            <Link to="/gerenciar-alunos">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                    <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <h1>Selecionar Treino</h1>
                        </div>
                        <div className="flex items-center gap-2 mb-4 max-w-[400px] mt-5">
                            <input
                                type="text"
                                placeholder="Pesquisar treino"
                                className="flex-1 border-2 border-gray-300 rounded-md p-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MenuFiltro
                                menuWidth="300px"
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
                        <div className="flex flex-col items-center gap-4 mt-5 bg-[var(--cor-secundaria)] p-4 rounded-lg max-h-140 overflow-y-auto overflow-x-hidden border-2 border-[#E6E6E2]">

                            {filteredTreinos.map((treino) => (
                                <div key={treino.treinoId} className="w-full bg-[var(--cor-secundaria)] border-2 border-[#E6E6E2] flex flex-wrap items-center rounded-lg justify-between p-4">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 w-full">
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-15 md:h-15" viewBox="0 0 60 49" fill="none">
                                                <path d="M48.3716 10.4004H52.0925C53.1194 10.4004 53.9529 11.4532 53.9529 12.7504V36.2504C53.9529 37.5476 53.1194 38.6004 52.0925 38.6004H48.3716C47.3447 38.6004 46.5112 37.5476 46.5112 36.2504V12.7504C46.5112 11.4532 47.3447 10.4004 48.3716 10.4004Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M40.9298 1H44.6506C45.6775 1 46.511 2.0528 46.511 3.35V45.65C46.511 46.9472 45.6775 48 44.6506 48H40.9298C39.9028 48 39.0693 46.9472 39.0693 45.65V3.35C39.0693 2.0528 39.9028 1 40.9298 1Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M14.8834 1H18.6042C19.6311 1 20.4646 2.0528 20.4646 3.35V45.65C20.4646 46.9472 19.6311 48 18.6042 48H14.8834C13.8564 48 13.0229 46.9472 13.0229 45.65V3.35C13.0229 2.0528 13.8564 1 14.8834 1Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M7.44147 10.4004H11.1623C12.1893 10.4004 13.0227 11.4532 13.0227 12.7504V36.2504C13.0227 37.5476 12.1893 38.6004 11.1623 38.6004H7.44147C6.41452 38.6004 5.58105 37.5476 5.58105 36.2504V12.7504C5.58105 11.4532 6.41452 10.4004 7.44147 10.4004Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M53.9531 24.5H59.5344" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M20.4648 24.5H39.069" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M0 24.5H5.58125" stroke="#E96E35" strokeWidth="2" />
                                            </svg>
                                            <div className='grid grid-cols-2 gap-4'>
                                                <div>
                                                    <p><b>Treino: </b>{treino.nomeTreino}</p>
                                                    <p><b>Quantidade de exercícios: </b>{treino.quantidadeExercicios}</p>
                                                </div>
                                                <div>
                                                   <p><b>Dificuldade: </b>{formatarDificuldade(treino.grauDificuldade)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <ButtonInterno
                                            texto="Ver Relatório"
                                            type="submit"
                                            cor="transparent"
                                            corTexto="var(--cor-primaria)"
                                            width="268px"
                                            height="50px"
                                            font-size="20px"
                                            onClick={() => { irParaDash(treino.treinoId) }}
                                            borderStyle="solid"
                                            borderWidth="2px"
                                            borderColor="rgba(29, 45, 68, 0.11)"
                                            fontWeight="600"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div >
    )
}

export default RelatorioTreinos