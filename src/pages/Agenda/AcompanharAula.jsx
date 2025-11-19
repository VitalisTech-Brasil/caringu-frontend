import { useEffect, useState } from 'react';
import React from "react";
import { useParams, Link, useLocation } from 'react-router-dom'
import { caringuApi } from '../../provider/caringuApi';
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral';
import Header from '../../components/Personal/Header/Header';
import { FaUserCircle } from 'react-icons/fa';
import ExercicioVideoCard from '../../components/Utils/GerenciarAlunos/ExercicioVideoCard';
import Button from "../../components/Utils/Button"
import MascaraData from "../../components/Utils/Functions/MascaraData";
import MascaraGenero from "../../components/Utils/Functions/MascaraGenero";
import MascaraNivelExperiencia from '../../components/Utils/Functions/MascaraNivelExperiencia';
import MascaraTelefone from '../../components/Utils/Functions/MascaraTelefone';


const AcompanharAula = () => {

    const { idAluno } = useParams();
    const [aluno, setAluno] = useState();
    const [imgErro, setImgErro] = useState(false);
    const [aberto, setAberto] = useState(false);
    const [treinos, setTreinos] = useState([]);
    const location = useLocation();
    const idAula = location.state?.idAula;
    const [aula, setAula] = useState(null);
    const [exerciciosAbertos, setExerciciosAbertos] = useState({});




    const handleToggleFinalizado = (treinoIdx, exIdx, checked) => {
        setTreinos(prev =>
            prev.map((treino, tIdx) =>
                tIdx === treinoIdx
                    ? {
                        ...treino,
                        exercicios: treino.exercicios.map((ex, eIdx) =>
                            eIdx === exIdx
                                ? { ...ex, exerciciosFinalizados: checked }
                                : ex
                        )
                    }
                    : treino
            )
        );
    };


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
        const fetchInfosAluno = async () => {
            try {
                const response = await caringuApi.get(`/alunos/${idAluno}`);
                setAluno(response.data);
                const aulaData = await caringuApi.get(`/aulas-treinos-exercicios/acompanhamento-aulas/${idAula}`);
                setAula(aulaData.data);
                console.log("Aula:", aulaData.data);
            } catch (error) {
                console.error("Erro ao buscar informações do aluno:", error);
            }
        };

        fetchInfosAluno();
    }, [idAluno, idAula]);



    const marcarComoConcluido = async (idAula) => {
        try {
            await caringuApi.patch(
                `/aulas/${idAula}/status`,
                {
                    status: "REALIZADO"
                }
            );
            setAula(prev => prev ? { ...prev, aulaStatus: "REALIZADO" } : prev);
        } catch (error) {
            console.error("Erro ao marcar aula como concluído:", error);
        }
    };


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
                                    <span className="text-base sm:text-xl lg:text-base 2xl:text-[24px] font-medium">{aluno?.nome}</span>
                                    <div className="flex lg:flex-row flex-col w-full h-auto items-start gap-3 xl:justify-between">
                                        <div className="flex flex-col w-auto h-auto">
                                            <span className="text-base sm:text-xl lg:text-sm xl:text-base 2xl:text-xl text-[#15171B85] font-medium">Data de Nascimento</span>
                                            <span className="text-base lg:text-sm xl:text-base font-normal">{MascaraData(aluno?.dataNascimento)}</span>
                                        </div>
                                        <div className="flex flex-col w-auto h-auto">
                                            <span className="text-base sm:text-xl lg:text-sm xl:text-base 2xl:text-xl text-[#15171B85] font-medium">Gênero</span>
                                            <span className="text-base lg:text-sm xl:text-base font-normal">{MascaraGenero(aluno?.genero)}</span>
                                        </div>
                                        <div className="flex flex-col w-auto h-auto">
                                            <span className="text-base sm:text-xl lg:text-sm xl:text-base 2xl:text-xl text-[#15171B85] font-medium">Nível de Experiência</span>
                                            <span className="text-base lg:text-sm xl:text-base font-normal">{MascaraNivelExperiencia(aluno?.nivelExperiencia)}</span>
                                        </div>
                                        <div className="flex flex-col w-auto h-auto">
                                            <span className="text-base sm:text-xl lg:text-sm xl:text-base 2xl:text-xl text-[#15171B85] font-medium">Telefone</span>
                                            <span className="text-base lg:text-sm xl:text-base font-normal">{MascaraTelefone(aluno?.telefone)}</span>
                                        </div>
                                        <div className="flex flex-col w-auto h-auto">
                                            <span className="text-base sm:text-xl lg:text-sm xl:text-base 2xl:text-xl text-[#15171B85] font-medium">Email</span>
                                            <span className="text-base lg:text-sm xl:text-base font-normal">{aluno?.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {aula && (
                                <>
                                    <div
                                        className="bg-[var(--cor-secundaria)] border-2 border-gray-300 rounded-md py-4 flex flex-row w-[95%] 2xl:w-[85%] h-auto justify-between font-semibold text-base sm:text-xl lg:text-base xl:text-xl text-[var(--azul-escuro)] items-center cursor-pointer"
                                        onClick={() => setAberto(v => !v)}
                                    >
                                        <span>
                                            Treino Concluído: {aula.aulaStatus === "REALIZADO" ? 1 : 0}
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
                                        <div className="bg-[var(--cor-secundaria)] border-2 border-gray-300 rounded-md flex flex-col items-start justify-center h-auto w-[95%] 2xl:w-[85%] py-5  px-2 sm:px-4 xl:px-12 gap-8  mb-2">
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
                                                <span>{aula.nomeTreino}</span>
                                            </div>
                                            <div className="flex flex-col h-auto w-full gap-2">
                                                {aula.exercicios.map((ex, exIdx) => (
                                                    <ExercicioVideoCard
                                                        key={ex.idExecucaoExercicio}
                                                        titulo={ex.nomeExercicio}
                                                        carga={ex.cargaKg}
                                                        repeticoesSeries={ex.repeticoesSeries}
                                                        observacoes={ex.observacoes}
                                                        urlVideoExecucao={ex.urlExemploExecucao}
                                                        tempoDescanso={segundosParaMinutos(Number(ex.descansoSegundos))}
                                                        exerciciosFinalizados={ex.finalizado}
                                                        origemUso="visualizarAulas"
                                                        inicialmenteAberto={!!exerciciosAbertos[ex.idExecucaoExercicio]}
                                                        onToggleAberto={() => handleToggleExercicio(ex.idExecucaoExercicio)}
                                                        espacamentoEntreIcons="justify-start gap-3 xl:gap-10"
                                                        larguraVideo="xl:w-[40%] md:w-[80%] w-full"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
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
                                    onClick={() => marcarComoConcluido(aula.idAula)}
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