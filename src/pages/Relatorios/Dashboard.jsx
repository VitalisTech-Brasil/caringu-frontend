import React, { use } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Button from '../../components/Utils/Button';
import exportarPDF from '../../assets/images/exportar-PDF.svg';
import ReactApexChart from 'react-apexcharts';
import { caringuApi } from '../../provider/caringuApi'
import toast, { Toaster } from 'react-hot-toast'
import CustomToast from '../../components/Utils/CustomToast'
import GraficoEvolucaoCarga from '../../components/Dashboard/GraficoEvolucaoCarga'
import GraficoEvolucaoTreinosCumpridos from '../../components/Dashboard/GraficoEvolucaoTreinosCumpridos'

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [exercicios, setExercicios] = useState([]);
    const [exercicioSelecionado, setExercicioSelecionado] = useState('');

    const { idAluno, idTreino } = useParams();
    const [fontSize, setFontSize] = useState("16px");

    const [nomeTreino, setNomeTreino] = useState("");
    const [infoAluno, setInfoAluno] = useState([]);

    /* Gráficos */
    const [dadosEvolucaoCarga, setDadosEvolucaoCarga] = useState([]);
    const [dadosEvolucaoTreinosCumpridos, setDadosEvolucaoTreinosCumpridos] = useState([]);
    const [dadosHorasTreinadas, setDadosHorasTreinadas] = useState([]);
    const [dadosGraficoHorasPorMes, setDadosGraficoHorasPorMes] = useState(new Array(12).fill(0))

    /* KPIs */
    const [treinosCumpridosMensal, setTreinosCumpridosMensal] = useState("");

    const [horasTreinadasSemanal, setHorasTreinadasSemanal] = useState("--");
    const [labelHoras, setLabelHoras] = useState("Carregando...");

    const [aderencia, setAderencia] = useState("");

    useEffect(() => {
        caringuApi.get(`/alunos/${idAluno}`)
            .then(response => {

                const aluno = response.data;

                setInfoAluno(aluno);
            })
            .catch(error => {
                console.error("Erro ao buscar informação de aluno:", error);
                toast.custom((t) => (
                    <CustomToast t={t} type="error" message="Erro ao buscar informação de aluno!" />
                ));
            });
    }, [])

    useEffect(() => {
        caringuApi.get(`/treinos-exercicios/exercicios-por-treino/${idTreino}/${idAluno}`)
            .then(response => {

                const lista = response.data;

                if (lista.length > 0) {
                    setExercicioSelecionado(lista[0].exercicioId);

                    setNomeTreino(lista[0].nomeTreino)

                    buscarEvolucaoCargaPorExercicio(lista[0].exercicioId);
                    buscarEvolucaoTreinosCumpridosMensal(lista[0].exercicioId);
                    buscarHorasTreinadas(lista[0].exercicioId);
                    setExercicios(lista)
                }
            })
            .catch(error => {
                console.error("Erro ao buscar exercícios:", error);
                toast.custom((t) => (
                    <CustomToast t={t} type="error" message="Erro ao buscar exercícios!" />
                ));
            });

    }, []);

    const buscarEvolucaoCargaPorExercicio = async (exercicioId) => {
        try {
            const response = await caringuApi.get(
                `/treinos-finalizados/evolucao-carga`,
                {
                    params: {
                        alunoId: idAluno,
                        exercicioId: exercicioId
                    }
                }
            );
            setDadosEvolucaoCarga(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados do gráfico:', error);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao buscar dados da evolução de carga!" />
            ));
        }
    };

    const buscarEvolucaoTreinosCumpridosMensal = async (exercicioId) => {
        try {
            const response = await caringuApi.get(
                `/treinos-finalizados/evolucao-treinos-cumpridos`,
                {
                    params: {
                        alunoId: idAluno,
                        exercicioId: exercicioId
                    }
                }
            );

            const dados = response.data;
            const hoje = new Date();
            const mesAtual = hoje.getMonth() + 1;
            const anoAtual = hoje.getFullYear();

            setDadosEvolucaoTreinosCumpridos(dados);

            const dadosMesAtual = dados.find(d => d.mes === mesAtual && d.ano === anoAtual);

            if (dadosMesAtual) {
                const realizados = dadosMesAtual.treinosRealizados;
                const frequenciaSemanal = parseInt(dadosMesAtual.frequenciaEsperadaPorSemana);
                const semanasPorMes = 52 / 12;
                const esperados = Math.round(frequenciaSemanal * semanasPorMes);

                setTreinosCumpridosMensal(`${realizados}/${esperados}`);

                const aderencia = esperados > 0 ? ((realizados / esperados) * 100).toFixed(1) : '0.0';
                setAderencia(`${aderencia}%`);
            } else {
                setTreinosCumpridosMensal(`0/0`);
                setAderencia(`0.0%`);
            }

        } catch (error) {
            console.error('Erro ao buscar dados do gráfico:', error);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao buscar dados da evolução de treinos cumpridos!" />
            ));
        }
    };

    const buscarHorasTreinadas = async (exercicioId) => {
        try {
            const response = await caringuApi.get(`/treinos-finalizados/horas-treinadas`, {
                params: {
                    alunoId: idAluno,
                    exercicioId: exercicioId
                }
            });

            const dados = response.data.dados;
            setDadosHorasTreinadas(response.data);

            const resultado = calcularHorasKPI(dados);
            setHorasTreinadasSemanal(resultado.valor);
            setLabelHoras(resultado.label);

            const grafico = processarHorasPorMes(dados);
            setDadosGraficoHorasPorMes(grafico);

        } catch (error) {
            console.error('Erro ao buscar dados do gráfico:', error);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao buscar dados da evolução de carga!" />
            ));
        }
    };

    const processarHorasPorMes = (dados) => {
        const meses = new Array(12).fill(0);

        dados.forEach(item => {
            const mesIndex = item.mes - 1;
            meses[mesIndex] += item.horasTreinadas;
        });

        return meses;
    };

    const calcularHorasKPI = (dados) => {
        const horasPorSemana = {};

        for (const item of dados) {
            const key = item.anoSemana;
            horasPorSemana[key] = (horasPorSemana[key] || 0) + item.horasTreinadas;
        }

        const semanaAtual = getAnoSemanaAtual();

        const horasSemanaAtual = horasPorSemana[semanaAtual];

        let label, horas;

        // Se tiver treinado alguma vez na semana:
        if (horasSemanaAtual) {
            label = "Horas Treinadas por Semana";
            horas = horasSemanaAtual;
        } else {
            label = "Média de Horas por Semana";
            const totalSemanas = Object.keys(horasPorSemana).length;
            const totalHoras = Object.values(horasPorSemana).reduce((a, b) => a + b, 0);
            horas = totalSemanas > 0 ? totalHoras / totalSemanas : 0;
        }

        const h = Math.floor(horas);
        const m = Math.round((horas - h) * 60);

        return {
            label,
            valor: `${h}h ${m}min`
        };
    };

    const getAnoSemanaAtual = () => {
        const now = new Date();

        const thursday = new Date(now);
        thursday.setDate(now.getDate() + (4 - (now.getDay() || 7)));

        const year = thursday.getFullYear();

        const firstJan = new Date(year, 0, 1);
        const firstThursday = new Date(firstJan);
        firstThursday.setDate(firstJan.getDate() + (4 - (firstJan.getDay() || 7)));

        const weekNumber = Math.ceil(
            ((thursday - firstThursday) / 86400000 + 1) / 7
        );

        return `${year}${String(weekNumber).padStart(2, '0')}`;
    };

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        document.title = "Dashboard de Treino | CaringU"

        const smQuery = window.matchMedia("(max-width: 767px)");

        const updateFontSize = (e) => {
            if (e.matches) {
                setFontSize("14px"); // sm
            } else {
                setFontSize("18px"); // md+
            }
        };

        // Inicial
        updateFontSize(smQuery);

        // Escuta mudanças
        smQuery.addEventListener("change", updateFontSize);
        return () => smQuery.removeEventListener("change", updateFontSize);
    }, []);

    return (
        <div className="flex min-h-screen bg-[#fdfbf7]">
            <MenuLateral />
            <div className="flex-1 flex flex-col">
                <Header toggleSidebar={toggleSidebar} />
                <main className="p-10 md:p-8 space-y-8">
                    <div className="bg-[var(--cor-secundaria)] rounded-lg p-4 md:p-6 border-2 border-[#E6E6E2] flex md:flex-row flex-col w-full">
                        <div className="flex flex-col justify-center w-full md:w-1/2">
                            <div className="justify-start text-zinc-900 text-xl md:text-3xl font-semibold flex flex-wrap items-center gap-5 max-h-7">
                                <Link to={`/relatorio-treino/${idAluno}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                        <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                                <h1>{nomeTreino}</h1>
                            </div>
                            <div className="flex md:hidden justify-start w-full mt-4">
                                <div className='flex justify-between w-full border-2 border-[#E6E6E2] rounded-md p-5 text-2xs sm:text-sm'>
                                    <h1><b>Aluno: </b>{infoAluno.nome}</h1>
                                    <h1><b>Peso: </b>{infoAluno.peso}KG</h1>
                                    <h1><b>Altura: </b>{infoAluno.altura}m</h1>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-5 mt-8">
                                <div className='flex justify-between items-center w-full gap-4'>
                                    <Button
                                        texto={"Visualizar gráficos em PDF"}
                                        logo={exportarPDF}
                                        borderColor={"#E6E6E2"}
                                        borderWidth={"2px"}
                                        borderStyle={"solid"}
                                        width={"50%"}
                                        height={"50px"}
                                        fontSize={fontSize}
                                        corHover={"#E6E6E2"}
                                        cor={"#FFFDF6"}
                                        onClick={() =>
                                            navigate(`/visualizar-pdf/${idAluno}/${idTreino}`, {
                                                state: {
                                                    exercicioSelecionadoId: exercicioSelecionado,
                                                    exercicioSelecionadoNome: exercicios.find((e) => e.exercicioId == exercicioSelecionado)?.nomeExercicio || "",
                                                },
                                            })
                                        }
                                    />


                                </div>
                                <div className='flex flex-wrap justify-between items-center w-full '>
                                    <div className="items-center flex flex-col w-full sm:w-[30%] border-2 border-[#E6E6E2] rounded-md p-5 h-55 relative">
                                        <div className="flex items-center justify-center  rounded-full bg-[#748CAB] absolute top-5">
                                            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="45" cy="45" r="45" fill="#748CAB" />
                                                <path d="M64.309 31.1992H68.1789C69.247 31.1992 70.1139 32.2296 70.1139 33.4992V56.4992C70.1139 57.7688 69.247 58.7992 68.1789 58.7992H64.309C63.2409 58.7992 62.374 57.7688 62.374 56.4992V33.4992C62.374 32.2296 63.2409 31.1992 64.309 31.1992Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M56.5692 22H60.4392C61.5073 22 62.3741 23.0304 62.3741 24.3V65.7C62.3741 66.9696 61.5073 68 60.4392 68H56.5692C55.5011 68 54.6343 66.9696 54.6343 65.7V24.3C54.6343 23.0304 55.5011 22 56.5692 22Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M29.4799 22H33.3498C34.4179 22 35.2848 23.0304 35.2848 24.3V65.7C35.2848 66.9696 34.4179 68 33.3498 68H29.4799C28.4118 68 27.5449 66.9696 27.5449 65.7V24.3C27.5449 23.0304 28.4118 22 29.4799 22Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M21.7401 31.1992H25.6101C26.6782 31.1992 27.545 32.2296 27.545 33.4992V56.4992C27.545 57.7688 26.6782 58.7992 25.6101 58.7992H21.7401C20.672 58.7992 19.8052 57.7688 19.8052 56.4992V33.4992C19.8052 32.2296 20.672 31.1992 21.7401 31.1992Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M70.1133 45H75.9182" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M35.2847 45H54.6343" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M14 45H19.8049" stroke="#FFFDF6" strokeWidth="3" />
                                            </svg>

                                        </div>
                                        <div className="mt-24 md:mt-25 text-center flex flex-col justify-between h-30">
                                            <p className="leading-tight break-words text-md font-medium">Treinos Realizados por Mês</p>
                                            <h2 className="text-2xl font-bold">{treinosCumpridosMensal}</h2>
                                        </div>
                                    </div>
                                    <div className="items-center flex flex-col w-full sm:w-[30%] border-2 border-[#E6E6E2] rounded-md p-5 h-55 relative">
                                        <div className="flex items-center justify-center rounded-full bg-[#748CAB] absolute top-5">
                                            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="45" cy="45" r="45" fill="#748CAB" />
                                                <path d="M75.0832 44.4994C75.0832 60.8294 61.8298 74.0827 45.4998 74.0827C29.1698 74.0827 15.9165 60.8294 15.9165 44.4994C15.9165 28.1693 29.1698 14.916 45.4998 14.916C61.8298 14.916 75.0832 28.1693 75.0832 44.4994Z" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M56.4753 53.9072L47.3044 48.4343C45.7069 47.4876 44.4053 45.2097 44.4053 43.346V31.2168" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="mt-24 md:mt-25 text-center flex flex-col justify-between h-30">
                                            <p className="leading-tight break-words text-md font-medium">{labelHoras}</p>
                                            <h2 className="text-2xl font-bold">{horasTreinadasSemanal}</h2>
                                        </div>
                                    </div>
                                    <div className="items-center flex flex-col w-full sm:w-[30%] border-2 border-[#E6E6E2] rounded-md p-5 h-55 relative">
                                        <div className="flex items-center justify-center rounded-full bg-[#748CAB] absolute top-5">
                                            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="45" cy="45" r="45" fill="#748CAB" />
                                                <path d="M59.8125 37.1035L47.3875 49.5285L42.6542 42.4285L33.1875 51.8952" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M53.8955 37.1035H59.8122V43.0202" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M37.6253 74.0827H55.3753C70.167 74.0827 76.0837 68.166 76.0837 53.3744V35.6244C76.0837 20.8327 70.167 14.916 55.3753 14.916H37.6253C22.8337 14.916 16.917 20.8327 16.917 35.6244V53.3744C16.917 68.166 22.8337 74.0827 37.6253 74.0827Z" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="mt-27 md:mt-27 text-center flex flex-col justify-between h-30">
                                            <p className="leading-tight break-words text-md font-medium">Aderência</p>
                                            <h2 className="text-2xl font-bold">{aderencia}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex flex-col'>
                                    <div className="flex flex-wrap items-center justify-start w-full gap-4">
                                        <h1 className='text-sm sm:text-xl font-semibold'>Evolução de carga do exercício:</h1>
                                        <select
                                            id=""
                                            name=""
                                            value={exercicioSelecionado}
                                            onChange={(e) => {
                                                const novoId = e.target.value;
                                                setExercicioSelecionado(novoId);
                                                buscarEvolucaoCargaPorExercicio(novoId);
                                            }}
                                            className='border-2 border-[#E6E6E2] rounded-md'
                                        >
                                            <option value="" disabled>Selecione o Exercício</option>
                                            {exercicios.map((exercicio) => (
                                                <option key={exercicio.treinoExercicioId} value={exercicio.exercicioId}>
                                                    {exercicio.nomeExercicio}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <GraficoEvolucaoCarga dados={dadosEvolucaoCarga} />
                                </div>
                            </div>

                        </div>
                        <div className='max-w-full md:w-1/2 flex flex-col items-center'>
                            <div className="hidden md:flex justify-end w-full max-h-[80px] md:justify-end">
                                <div className='flex justify-center sm:gap-8 md:gap-16 lg:gap-32 border-2 border-[#E6E6E2] rounded-md p-5 md:w-17/18'>
                                    <h1 className="text-sm md:text-[20px] md:max-w-1xl text-black font-normal"><b>Aluno: </b>{infoAluno.nome} </h1>
                                    <h1 className="text-sm md:text-[20px] text-black font-normal"><b>Peso: </b>{infoAluno.peso}KG</h1>
                                    <h1 className="text-sm md:text-[20px] text-black font-normal"><b>Altura: </b>{infoAluno.altura}m</h1>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5 m-3 md:w-11/13'>
                                <h1 className='text-xl font-semibold'>Evolução dos treinos cumpridos</h1>
                                <GraficoEvolucaoTreinosCumpridos dadosAPI={dadosEvolucaoTreinosCumpridos} />
                                <h1 className='text-xl font-semibold'>Total de horas treinadas por mês</h1>
                                <div className='border-2 border-[#E6E6E2] rounded-md p-5'>
                                    <ReactApexChart
                                        options={{
                                            chart: {
                                                type: 'bar',
                                                toolbar: {
                                                    show: true,
                                                    tools: {
                                                        download: true,
                                                        selection: false,
                                                        zoom: false,
                                                        zoomin: false,
                                                        zoomout: false,
                                                        pan: false,
                                                        reset: false,
                                                    }
                                                },
                                            },
                                            plotOptions: {
                                                bar: {
                                                    horizontal: false,
                                                    borderRadius: 5,
                                                    columnWidth: '50%',
                                                },
                                            },
                                            dataLabels: { enabled: false },
                                            stroke: {
                                                show: true,
                                                width: 2,
                                                colors: ['transparent'],
                                            },
                                            colors: ['#748CAB'],
                                            xaxis: {
                                                categories: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
                                            },
                                            yaxis: {
                                                title: {
                                                    text: 'Total de Horas Treinadas',
                                                    style: { fontWeight: 600, color: '#1D2D44' },
                                                },
                                            },
                                            fill: {
                                                opacity: 1,
                                            },
                                            tooltip: {
                                                y: {
                                                    formatter: (val) => `${val} hora(s)`,
                                                },
                                            },
                                            grid: {
                                                borderColor: '#E6E6E2',
                                            },
                                        }}
                                        series={[
                                            {
                                                name: 'Horas Treinadas',
                                                data: dadosGraficoHorasPorMes,
                                            },
                                        ]}
                                        type="bar"
                                        height={215}
                                    />

                                </div>
                            </div>
                        </div>

                    </div>
                    <Toaster position='top-right' reverseOrder={false} />
                </main>
            </div>
        </div >
    )
}

export default Dashboard