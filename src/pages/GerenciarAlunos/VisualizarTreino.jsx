import React, { useState, useEffect } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { useParams, Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import AulaResumoCard from '../../components/Utils/GerenciarAlunos/CardAulaTreino'
import { caringuApi } from '../../provider/caringuApi'
import Input from "../../components/Utils/InputPosLogin"
import ExercicioVideoCard from "../../components/Utils/GerenciarAlunos/ExercicioVideoCard"

const VisualizarTreino = () => {
    const { idAluno } = useParams();
    const [imgErro, setImgErro] = useState(false);
    const [aluno, setAluno] = useState();

    const exercicios = [
        {
            id: 1,
            titulo: 'Rosca Direta Barra',
            carga: '20kg',
            repeticoes: '3x12',
            grupoMuscular: 'Bíceps',
            observacoes: 'Executar controlado.',
            videoUrl: 'https://www.youtube.com/watch?v=VXY9_csZXUY',
            inicialmenteAberto: true
        },
        {
            id: 2,
            titulo: 'Rosca Alternada',
            carga: '10kg',
            repeticoes: '4x10',
            grupoMuscular: 'Bíceps',
            observacoes: '',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
    ];

    const videoUrl = "https://www.youtube.com/watch?v=VXY9_csZXUY";

    const getYoutubeId = (url) => {
        const m = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
        return m ? m[1] : null;
    };
    const videoId = getYoutubeId(videoUrl);
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlay = () => setIsPlaying(true);

    const [exercicioAberto, setExercicioAberto] = useState(false);

    useEffect(() => {
        if (!exercicioAberto) setIsPlaying(false);
    }, [exercicioAberto]);

    useEffect(() => {
        document.title = "Visualizar Aula | Caringu"
        const fetchInfosAlunoFeedback = async () => {
            try {
                const response = await caringuApi.get(`/anamnese/${idAluno}`);// MUDAR URL PARA O NOVO ENDPOINT(!!!por padrão, deve ser sempre estar aberto o ultimo card do treino)
                setAluno(response.data);
                console.log("Informações do aluno:", response.data);
            } catch (error) {
                console.error("Erro ao buscar informações do aluno:", error);
            }
        };

        fetchInfosAlunoFeedback();
    }, [idAluno]);

    const aulas = [
        { id: 1, data: "10/05/2025", diaSemana: "Segunda-Feira", horarioInicio: "15:00", horarioFim: "16:00", nomePersoal: "João Pedro", nomeTreino: "Treino A" },
        { id: 2, data: "11/05/2025", diaSemana: "Terça-Feira", horarioInicio: "09:00", horarioFim: "10:00", nomePersoal: "João Pedro", nomeTreino: "Treino B" },
        { id: 3, data: "12/05/2025", diaSemana: "Quarta-Feira", horarioInicio: "18:00", horarioFim: "19:00", nomePersoal: "João Pedro", nomeTreino: "Treino C" },
        { id: 4, data: "13/05/2025", diaSemana: "Quinta-Feira", horarioInicio: "07:00", horarioFim: "08:00", nomePersoal: "João Pedro", nomeTreino: "Treino D" },
        { id: 5, data: "14/05/2025", diaSemana: "Sexta-Feira", horarioInicio: "17:00", horarioFim: "18:00", nomePersoal: "João Pedro", nomeTreino: "Treino E" },
        { id: 6, data: "15/05/2025", diaSemana: "Sábado", horarioInicio: "10:00", horarioFim: "11:00", nomePersoal: "João Pedro", nomeTreino: "Treino F" },
    ];

    const [aulaSelecionada, setAulaSelecionada] = useState(aulas[0] || null);


    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateral />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="w-full h-auto p-2 md:p-4 flex flex-col items-start gap-2">
                    <div className="w-full h-auto flex flex-row pl-4">
                        <div className=" h-auto">
                            <Link to={`/gerenciar-alunos`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                    <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="h-auto w-full flex flex-row items-center justify-center">
                        <div className="h-auto w-full bg-[rgba(29,45,68,0.11)] border-2 border-gray-300 rounded-md flex lg:flex-row flex-col gap-10 justify-center lg:items-start items-center py-5">
                            <div className="lg:w-[23%] w-[90%] bg-[var(--cor-secundaria)] min-h-[400px] lg:min-h-[468px] h-auto p-4 border-2 border-gray-300 rounded-md flex flex-col gap-6">
                                <div className="flex flex-row w-full h-auto gap-4 items-center">
                                    {aluno?.alunoId?.urlFotoPerfil && !imgErro ? (
                                        <img
                                            src={aluno.alunoId.urlFotoPerfil}
                                            alt="Imagem do aluno"
                                            className='w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 rounded-full'
                                            onError={() => setImgErro(true)}
                                        />

                                    ) : (
                                        <FaUserCircle className="flex-shrink-0 sm:w-12 sm:h-12 w-12 h-12 lg:w-12 lg:h-12 text-[#4B5563]" />
                                    )}
                                    <div className="xl:text-2xl text-base font-medium w-full">
                                        <span className="block w-full break-words">
                                            Maria Gladys
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-auto flex flex-col gap-3 lg:gap-6">
                                    <div className="h-auto flex flex-col">
                                        <span>Data de Nascimento</span>
                                        <span className="block w-full break-words">22/11/2005</span>
                                    </div>
                                    <div className="h-auto flex flex-col">
                                        <span>Gênero</span>
                                        <span className="block w-full break-words">Feminino</span>
                                    </div>
                                    <div className="h-auto flex flex-col">
                                        <span>Email</span>
                                        <span className="block w-full break-words whitespace-normal leading-snug">
                                            mariagladys@gmail.com
                                        </span>
                                    </div>
                                    <div className="h-auto flex flex-col">
                                        <span>Telefone</span>
                                        <span className="block w-full break-words">+55 (11) 91234-5678</span>
                                    </div>
                                    <div className="h-auto flex flex-col">
                                        <span>Nível de experiência</span>
                                        <span className="block w-full break-words">Levemente ativo</span>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-[28%] w-[90%] bg-[var(--cor-secundaria)] border-2 border-gray-300 rounded-md p-4 h-[700px] gap-3 flex flex-col overflow-y-auto">
                                <span className="text-[32px] font-bold text-[var(--azul-escuro)]">Aulas</span>
                                {aulas.length === 0 ? (
                                    <div className="text-sm italic text-gray-500">
                                        Nenhum treino atribuído.
                                    </div>
                                ) : (
                                    aulas.map(a => (
                                        <AulaResumoCard
                                            key={a.id}
                                            data={a.data}
                                            diaSemana={a.diaSemana}
                                            horarioInicio={a.horarioInicio}
                                            horarioFim={a.horarioFim}
                                            onVerFeedbacks={() => setAulaSelecionada(a)}
                                        />
                                    ))
                                )}
                            </div>
                            <div className="lg:w-[41%] w-[90%] bg-[var(--cor-secundaria)] border-2 border-gray-300 rounded-md py-4 px-6 2xl:px-10 h-[700px] gap-3 flex flex-col overflow-y-auto">
                                <div className="flex flex-col  pb-2 gap-1">
                                    <span className="text-2xl font-bold text-[var(--azul-escuro)]">
                                        Aula {aulaSelecionada.data}
                                    </span>
                                    <div className="flex flex-col items-start gap-1.5 text-[var(--azul-escuro)] text-base font-medium">
                                        <div className="flex flex-row items-center gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" fill="none">
                                                <path d="M7.5 8C9.433 8 11 6.433 11 4.5C11 2.567 9.433 1 7.5 1C5.567 1 4 2.567 4 4.5C4 6.433 5.567 8 7.5 8Z" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14 15C13.74 11.845 11.6043 9.36446 8.91143 9.0816C7.98286 8.9728 7.03571 8.9728 6.08857 9.0816C3.39571 9.38622 1.26 11.845 1 15" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="break-words">{aulaSelecionada.nomePersoal}</span>
                                        </div>
                                        <div className="flex flex-row items-center gap-3">
                                            <svg className="shrink-0" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.5336 4.7883L13.1466 14.3721C12.9766 15.0875 12.3391 15.5833 11.6024 15.5833H2.29489C1.2253 15.5833 0.460316 14.5349 0.779066 13.5078L3.76114 3.93124C3.96656 3.26541 4.58282 2.80493 5.27699 2.80493H13.9895C14.6624 2.80493 15.222 3.21577 15.4557 3.78244C15.5903 4.08702 15.6186 4.43413 15.5336 4.7883Z" stroke="#1D2D44" strokeMiterlimit="10" />
                                                <path d="M11.3333 15.5833H14.7191C15.6328 15.5833 16.3482 14.8112 16.2845 13.8975L15.5833 4.25" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M6.85669 4.51919L7.59336 1.45923" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.6025 4.52629L12.2684 1.45215" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M5.4541 8.5H11.1208" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4.74585 11.3333H10.4125" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="break-words">{aulaSelecionada.diaSemana}</span>
                                        </div>
                                        <div className="flex flex-row items-center gap-3">
                                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.50008 1.41675C4.59716 1.41675 1.41675 4.59716 1.41675 8.50008C1.41675 12.403 4.59716 15.5834 8.50008 15.5834C12.403 15.5834 15.5834 12.403 15.5834 8.50008C15.5834 4.59716 12.403 1.41675 8.50008 1.41675ZM11.5813 11.0288C11.4822 11.1988 11.3051 11.2909 11.1209 11.2909C11.0288 11.2909 10.9367 11.2697 10.8517 11.213L8.65591 9.90258C8.1105 9.57675 7.70675 8.86133 7.70675 8.23091V5.32675C7.70675 5.03633 7.94758 4.7955 8.238 4.7955C8.52841 4.7955 8.76925 5.03633 8.76925 5.32675V8.23091C8.76925 8.48591 8.98175 8.86133 9.20133 8.98883L11.3972 10.2992C11.6522 10.448 11.7372 10.7738 11.5813 11.0288Z" fill="#1D2D44" />
                                            </svg>
                                            <span className="break-words">
                                                {aulaSelecionada.horarioInicio} - {aulaSelecionada.horarioFim}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col h-[700px] w-full  gap-4 overflow-y-auto">
                                    <div className="flex flex-row items-center justify-start font-semibold text-2xl text-[var(--azul-escuro)] h-auto gap-2">
                                        <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                                            <ellipse cx="20.6176" cy="20.6177" rx="20.6176" ry="20.6176" fill="#748CAB" />
                                            <path d="M29.3258 15.2845H31.0671C31.5477 15.2845 31.9378 15.7482 31.9378 16.3195V26.6689C31.9378 27.2402 31.5477 27.7038 31.0671 27.7038H29.3258C28.8451 27.7038 28.4551 27.2402 28.4551 26.6689V16.3195C28.4551 15.7482 28.8451 15.2845 29.3258 15.2845Z" stroke="#FFFDF6" strokeWidth="2" />
                                            <path d="M25.8433 11.1449H27.5847C28.0653 11.1449 28.4554 11.6085 28.4554 12.1798V30.8087C28.4554 31.38 28.0653 31.8437 27.5847 31.8437H25.8433C25.3627 31.8437 24.9727 31.38 24.9727 30.8087V12.1798C24.9727 11.6085 25.3627 11.1449 25.8433 11.1449Z" stroke="#FFFDF6" strokeWidth="2" />
                                            <path d="M13.6519 11.1449H15.3933C15.8739 11.1449 16.264 11.6085 16.264 12.1798V30.8087C16.264 31.38 15.8739 31.8437 15.3933 31.8437H13.6519C13.1713 31.8437 12.7812 31.38 12.7812 30.8087V12.1798C12.7812 11.6085 13.1713 11.1449 13.6519 11.1449Z" stroke="#FFFDF6" strokeWidth="2" />
                                            <path d="M10.1695 15.2845H11.9109C12.3915 15.2845 12.7816 15.7482 12.7816 16.3195V26.6689C12.7816 27.2402 12.3915 27.7038 11.9109 27.7038H10.1695C9.68889 27.7038 9.29883 27.2402 9.29883 26.6689V16.3195C9.29883 15.7482 9.68889 15.2845 10.1695 15.2845Z" stroke="#FFFDF6" strokeWidth="2" />
                                            <path d="M31.9375 21.4941H34.5495" stroke="#FFFDF6" strokeWidth="2" />
                                            <path d="M16.2656 21.4941H24.9724" stroke="#FFFDF6" strokeWidth="2" />
                                            <path d="M6.6875 21.4941H9.29955" stroke="#FFFDF6" strokeWidth="2" />
                                        </svg>
                                        <span>
                                            {aulaSelecionada?.nomeTreino}
                                        </span>
                                    </div>
                                    {exercicios.map(ex => (
                                        <ExercicioVideoCard key={ex.id} {...ex} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VisualizarTreino;
