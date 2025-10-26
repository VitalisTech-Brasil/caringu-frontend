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
import KpiDashboard from '../../components/Dashboard/KpiDashboard'
import GraficoHorasTreinadas from '../../components/Dashboard/GraficoHorasTreinadas'

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

    const buscarEvolucaoCargaPorExercicio = async (idExercicio) => {
        try {
            const response = await caringuApi.get(
                `/aulas/evolucao-carga`,
                {
                    params: {
                        idAluno: idAluno,
                        idExercicio: idExercicio
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

    const buscarEvolucaoTreinosCumpridosMensal = async (idExercicio) => {
        try {
            const response = await caringuApi.get(
                `/aulas/evolucao-treinos-cumpridos`,
                {
                    params: {
                        idAluno: idAluno,
                        idExercicio: idExercicio
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

    const buscarHorasTreinadas = async (idExercicio) => {
        try {
            const response = await caringuApi.get(`/aulas/horas-treinadas`, {
                params: {
                    idAluno: idAluno,
                    idExercicio: idExercicio
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
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateral />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Header toggleSidebar={toggleSidebar} />
                <main className="p-4 md:p-8 space-y-8">
                    <div className="bg-[var(--cor-secundaria)] rounded-lg p-4 lg:p-6 border-2 border-[#E6E6E2] flex lg:flex-row flex-col w-full lg:gap-0 gap-3">
                        <div className="flex flex-col justify-center w-full lg:w-1/2">
                            <div className="justify-start text-zinc-900 text-xl md:text-3xl font-semibold flex flex-wrap items-center gap-5 max-h-7">
                                <Link to={`/relatorio-treino/${idAluno}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                        <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                                <h1 className="text-xl md:text-2xl xl:text-3xl" >{nomeTreino}</h1>
                            </div>
                            <div className="flex md:hidden justify-start w-full mt-4">
                                <div className='flex flex-col sm:gap-0 gap-2 sm:flex-row justify-between w-full border-2 border-[#E6E6E2] rounded-md p-3 sm:p-5 sm:text-sm'>
                                    <h1><b>Aluno: </b>{infoAluno.nome}</h1>
                                    <h1><b>Peso: </b>{infoAluno.peso}KG</h1>
                                    <h1><b>Altura: </b>{infoAluno.altura}m</h1>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-5 mt-8">
                                <div className='flex justify-between items-center w-full gap-4'>
                                    <Button
                                        texto={"Visualizar Gráficos em PDF"}
                                        logo={exportarPDF}
                                        borderColor={"#E6E6E2"}
                                        borderWidth={"2px"}
                                        borderStyle={"solid"}
                                        classNameExtra="xl:w-[50%] w-full"
                                        height={"50px"}
                                        fontSize={fontSize}
                                        cor={"var(--cor-secundaria)"}
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
                                <div className='flex flex-wrap justify-between items-center w-full sm:gap-0 gap-3'>
                                    <KpiDashboard
                                        treinosCumpridosMensal={treinosCumpridosMensal}
                                        labelHoras={labelHoras}
                                        horasTreinadasSemanal={horasTreinadasSemanal}
                                        aderencia={aderencia}
                                    />

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
                                                <option key={exercicio.alunoTreinoExercicioId} value={exercicio.exercicioId}>
                                                    {exercicio.nomeExercicio}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <GraficoEvolucaoCarga dados={dadosEvolucaoCarga} />
                                </div>
                            </div>

                        </div>
                        <div className='max-w-full lg:w-1/2 flex flex-col items-center'>
                            <div className="hidden md:flex justify-end w-full max-h-[80px] md:justify-end">
                                <div className='flex justify-center gap-3 lg:gap-8 2xl:gap-32 border-2 border-[#E6E6E2] rounded-md p-3 2xl:p-5 md:w-17/18'>
                                    <h1 className="text-sm md:text-base lg:text-lg 2xl:text-[20px] md:max-w-1xl text-black font-normal"><b>Aluno: </b>{infoAluno.nome} </h1>
                                    <h1 className="text-sm md:text-base lg:text-lg 2xl:text-[20px] text-black font-normal"><b>Peso: </b>{infoAluno.peso}KG</h1>
                                    <h1 className="text-sm md:text-base lg:text-lg 2xl:text-[20px] text-black font-normal"><b>Altura: </b>{infoAluno.altura}m</h1>
                                </div>
                            </div>
                            <div className='flex flex-col justify-end lg:justify-start gap-5 m-0 mt-2 lg:mt-0 lg:m-3 w-full sm:w-[85%]'>
                                <h1 className='text-xl font-semibold'>Evolução dos treinos cumpridos</h1>
                                <GraficoEvolucaoTreinosCumpridos dadosAPI={dadosEvolucaoTreinosCumpridos} />
                                <h1 className='text-xl font-semibold'>Total de horas treinadas por mês</h1>
                                <GraficoHorasTreinadas dados={dadosGraficoHorasPorMes} />
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