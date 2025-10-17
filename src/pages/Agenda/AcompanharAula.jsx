import { useEffect, useState } from 'react';
import React from "react";
import { useParams, Link } from 'react-router-dom'
import { caringuApi } from '../../provider/caringuApi';
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral';
import Header from '../../components/Personal/Header/Header';
import { FaUserCircle } from 'react-icons/fa';
import ExercicioVideoCard from '../../components/Utils/GerenciarAlunos/ExercicioVideoCard';
import Button from "../../components/Utils/Button"



const AcompanharAula = () => {

    const { idAluno } = useParams();
    const [aluno, setAluno] = useState();
    const [imgErro, setImgErro] = useState(false);
    const [treinoAberto, setTreinoAberto] = useState(false);
    const [aberto, setAberto] = useState(false);


    const treinos = [
        {
            id: 1,
            nome: 'Treino superior',
            treinoFinalizado: false,
            exercicios: [
                {
                    id: 1,
                    titulo: 'Rosca Direta Barra',
                    carga: '20kg',
                    repeticoes: '3x12',
                    grupoMuscular: 'Bíceps',
                    observacoes: 'Executar controlado.',
                    videoUrl: 'https://www.youtube.com/watch?v=VXY9_csZXUY',
                    tempoDescanso: '150',
                    exerciciosFinalizados: false
                },

                {
                    id: 3,
                    titulo: 'Rosca Martelo',
                    carga: '12kg',
                    repeticoes: '4x12',
                    grupoMuscular: 'Bíceps',
                    observacoes: 'Executar com controle.',
                    videoUrl: 'https://youtu.be/Tm98k4tmtxg?si=3I5kD-G_SAMSwBxy',
                    tempoDescanso: '150',
                    exerciciosFinalizados: false
                },
                {
                    id: 4,
                    titulo: 'Rosca Inversa',
                    carga: '8kg',
                    repeticoes: '4x10',
                    grupoMuscular: 'Bíceps',
                    observacoes: 'Executar com controle.',
                    videoUrl: 'https://youtu.be/wxSUcEiO3kc?si=kuYAX_3Mcc6SettW',
                    tempoDescanso: '150',
                    exerciciosFinalizados: true
                }
            ]
        },

    ];

    const treinoFinalizado = treinos.every(t => t.treinoFinalizado);
    const [treinoAbertoIdx, setTreinoAbertoIdx] = useState(treinos.length - 1);



    function segundosParaMinutos(segundos) {
        const min = Math.floor(segundos / 60);
        const sec = segundos % 60;
        if (sec === 0) {
            return min === 1 ? "1 min" : `${min} min`;
        }
        let minStr = min > 0 ? `${min} min` : "";
        let secStr = sec > 0 ? `${sec} s` : "";
        return [minStr, secStr].filter(Boolean).join(" ");
    }

    useEffect(() => {
        document.title = "Acompanhar Aula | Caringu"
        const fetchInfosAlunoFeedback = async () => {
            try {
                const response = await caringuApi.get(`/anamnese/${idAluno}`);// MUDAR URL PARA O NOVO ENDPOINT(!!!por padrão, deve ser sempre estar aberto o ultimo card do treino)
                setAluno(response.data);
                // console.log("Informações do aluno:", response.data);
            } catch (error) {
                console.error("Erro ao buscar informações do aluno:", error);
            }
        };

        fetchInfosAlunoFeedback();
    }, [idAluno]);


    // ENDPOINT ANTIGO DE MARCAR COMO CONCLUIDO
    // const marcarComoConcluido = async (idTreinoFinalizado) => {
    //         try {
    //             await caringuApi.patch(
    //                 `treinos-finalizados/${idTreinoFinalizado}/finalizar`,
    //                 {
    //                     dataHorarioFim: treinoFim,
    //                 }
    //             );

    //             if (atualizarTreinos) atualizarTreinos();
    //         } catch (error) {
    //             console.error("Erro ao marcar compromisso como concluído:", error);
    //         }
    //     };


    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateral />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="w-full h-auto p-2 md:p-4 flex flex-col items-start gap-3 sm:gap-0">
                    <div className="w-full h-auto flex flex-row ">
                        <div className=" h-auto">
                            <Link to={`/agenda`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                    <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="h-auto w-full flex flex-row items-center justify-center">
                        <div className="max-h-[80vh] h-auto w-[95%] bg-[rgba(29,45,68,0.11)] border-2 border-gray-300 rounded-md flex flex-col justify-start items-center py-5 gap-4 overflow-y-auto">
                            <div className="bg-[var(--cor-secundaria)] border-2 border-gray-300 rounded-md flex lg:flex-row flex-col items-center h-auto w-[95%] 2xl:w-[85%] py-5 px-2 sm:px-4 xl:px-12 gap-8">
                                {aluno?.alunoId?.urlFotoPerfil && !imgErro ? (
                                    <img
                                        src={aluno.alunoId.urlFotoPerfil}
                                        alt="Imagem do aluno"
                                        className='w-20 h-20 lg:w-12 lg:h-12 xl:w-20 xl:h-20 2xl:w-25 2xl:h-25 rounded-full'
                                        onError={() => setImgErro(true)}
                                    />

                                ) : (
                                    <FaUserCircle className="flex-shrink-0 w-20 h-20 lg:w-12 lg:h-12 xl:w-20 xl:h-20 2xl:w-25 2xl:h-25 text-[#4B5563]" />
                                )}
                                <div className="flex flex-col h-auto w-full items-start justify-center gap-3 lg:gap-0">
                                    <span className="text-base sm:text-xl lg:text-base 2xl:text-[24px] font-medium"> Maria Gladys</span>
                                    <div className="flex lg:flex-row flex-col w-full h-auto items-start gap-3 xl:justify-between">
                                        <div className="flex flex-col w-auto h-auto">
                                            <span className="text-base sm:text-xl lg:text-sm xl:text-base 2xl:text-xl text-[#15171B85] font-medium">Data de Nascimento</span>
                                            <span className="text-base lg:text-sm xl:text-base font-normal">22/11/2005</span>
                                        </div>
                                        <div className="flex flex-col w-auto h-auto">
                                            <span className="text-base sm:text-xl lg:text-sm xl:text-base 2xl:text-xl text-[#15171B85] font-medium">Gênero</span>
                                            <span className="text-base lg:text-sm xl:text-base font-normal">Feminino</span>
                                        </div>
                                        <div className="flex flex-col w-auto h-auto">
                                            <span className="text-base sm:text-xl lg:text-sm xl:text-base 2xl:text-xl text-[#15171B85] font-medium">Nível de Experiência</span>
                                            <span className="text-base lg:text-sm xl:text-base font-normal">Levemente ativo</span>
                                        </div>
                                        <div className="flex flex-col w-auto h-auto">
                                            <span className="text-base sm:text-xl lg:text-sm xl:text-base 2xl:text-xl text-[#15171B85] font-medium">Telefone</span>
                                            <span className="text-base lg:text-sm xl:text-base font-normal">+55 (11) 91234-5678</span>
                                        </div>
                                        <div className="flex flex-col w-auto h-auto">
                                            <span className="text-base sm:text-xl lg:text-sm xl:text-base 2xl:text-xl text-[#15171B85] font-medium">Email</span>
                                            <span className="text-base lg:text-sm xl:text-base font-normal">mariagladys@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {treinos.every(t => t.treinoFinalizado) && (
                                <>
                                    <div
                                        className="bg-[var(--cor-secundaria)] border-2 border-gray-300 rounded-md py-4 px-2 sm:px-4 xl:px-12 flex flex-row w-[95%] 2xl:w-[85%] h-auto justify-between font-semibold text-base sm:text-xl lg:text-base xl:text-xl text-[var(--azul-escuro)] items-center cursor-pointer"
                                        onClick={() => setAberto(v => !v)}
                                    >
                                        <span>
                                            Treino Concluído: {treinos.filter(t => t.treinoFinalizado).length}
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="26" height="11" viewBox="0 0 26 11" fill="none"
                                            className={`transition-transform duration-300 ${aberto ? 'rotate-180' : ''}`}
                                        >
                                            <path d="M0.562751 0.701826C-0.187584 1.25317 -0.187584 2.14715 0.562751 2.69848L9.96224 9.59874C11.4632 10.7006 13.8952 10.7001 15.3954 9.5979L24.7912 2.69339C25.5417 2.14207 25.5417 1.24808 24.7912 0.69673C24.0409 0.145361 22.8244 0.145361 22.0741 0.69673L14.0322 6.60619C13.2819 7.15766 12.0653 7.15752 11.315 6.60619L3.27991 0.701826C2.52959 0.150457 1.31307 0.150457 0.562751 0.701826Z" fill="#1D2D44" />
                                        </svg>
                                    </div>
                                    {aberto && (
                                        treinos.map((treino, idx) => (
                                            <div key={treino.id} className="bg-[var(--cor-secundaria)] border-2 border-gray-300 rounded-md flex flex-col items-start justify-center h-auto w-[95%] 2xl:w-[85%] py-5  px-2 sm:px-4 xl:px-12 gap-8  mb-2">
                                                <div className="flex flex-row items-center justify-start font-semibold  text-xl xl:text-2xl text-[var(--azul-escuro)] h-auto gap-2 w-auto ">
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
                                                    <span>{treino.nome}</span>
                                                </div>
                                                <div className="flex flex-col h-auto w-full gap-2">
                                                    {treino.exercicios.map(ex => (
                                                        <ExercicioVideoCard
                                                            origemUso={"visualizarAulas"}
                                                            espacamentoEntreIcons="justify-start gap-3 xl:gap-10"
                                                            key={ex.id}
                                                            {...ex}
                                                            tempoDescanso={segundosParaMinutos(Number(ex.tempoDescanso))}
                                                            desabilitarObservacoes={false}
                                                            larguraVideo="xl:w-[40%] md:w-[80%] w-full"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </>
                            )}
                            {!treinos.every(t => t.treinoFinalizado) && (
                                treinos.map((treino, idx) => (
                                    <div key={treino.id} className="bg-[var(--cor-secundaria)] border-2 border-gray-300 rounded-md flex flex-col items-start justify-center h-auto w-[95%] 2xl:w-[85%] py-5  px-2 sm:px-4 xl:px-12 gap-8  mb-2">
                                        <div className="flex flex-row items-center justify-start font-semibold  text-xl xl:text-2xl text-[var(--azul-escuro)] h-auto gap-2 w-auto ">
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
                                            <span>{treino.nome}</span>
                                        </div>
                                        <div className="flex flex-col h-auto w-full gap-2">
                                            {treino.exercicios.map(ex => (
                                                <ExercicioVideoCard
                                                    origemUso={"visualizarAulas"}
                                                    espacamentoEntreIcons="justify-start gap-3 xl:gap-10"
                                                    key={ex.id}
                                                    {...ex}
                                                    tempoDescanso={segundosParaMinutos(Number(ex.tempoDescanso))}
                                                    desabilitarObservacoes={false}
                                                    larguraVideo="xl:w-[40%] md:w-[80%] w-full"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                            <div className="w-[95%] 2xl:w-[85%] h-auto flex flex-col items-center">
                                <Button
                                    id={"FinalizarTreino"}
                                    texto={"Finalizar Treino"}
                                    corTexto="#fff"
                                    cor="var(--azul-claro)"
                                    classNameExtra="w-50 h-10 text-base"
                                    ariaLabel={"Botão de Finalizar Treino"}
                                    fontWeight="600"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcompanharAula;