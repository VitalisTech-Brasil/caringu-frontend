import React, { useState, useEffect } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { useParams, Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import AulaResumoCard from '../../components/Utils/GerenciarAlunos/CardAula'
import Input from '../../components/Utils/InputPosLogin'
import Button from '../../components/Utils/Button'
import CaixaFeedback from '../../components/Utils/GerenciarAlunos/CaixaFeedback'
import { caringuApi } from '../../provider/caringuApi'
import { useLocation } from 'react-router-dom'
import MascaraTelefone from "../../components/Utils/Functions/MascaraTelefone"
import MascaraData from "../../components/Utils/Functions/MascaraData"
import MascaraNivelExperiencia from "../../components/Utils/Functions/MascaraNivelExperiencia";
import MascaraGenero from '../../components/Utils/Functions/MascaraGenero';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import CustomToast from '../../components/Utils/CustomToast';

const Feedback = () => {
    const { idAluno } = useParams();
    const [imgErro, setImgErro] = useState(false);
    const location = useLocation();
    const alunoFromState = location.state?.aluno;
    const [novoFeedback, setNovoFeedback] = useState("");
    const personalId = sessionStorage.getItem('pessoaId');

    useEffect(() => {
        document.title = "Feedback | Caringu"
        fetchAulas();
    }, [idAluno]);

    const [aulas, setAulas] = useState([]);
    const [aulaSelecionada, setAulaSelecionada] = useState(aulas[0] || null);


    const fetchAulas = async () => {
        let todasAulas = [];
        let page = 0;
        let last = false;

        try {
            while (!last) {
                const response = await caringuApi.get(`/aulas/aluno/${idAluno}/plano?page=${page}&size=20`);
                const { content, last: isLast } = response.data;
                todasAulas = todasAulas.concat(Array.isArray(content) ? content : []);
                last = isLast;
                page += 1;
            }
            setAulas(todasAulas);
            if (todasAulas.length > 0) {
                setAulaSelecionada(todasAulas[0]);
            }
            console.log("Aulas do aluno:", todasAulas);
        } catch (error) {
            setAulas([]);
            setAulaSelecionada(null);
            console.error("Erro ao buscar aulas:", error);
        }
    };


    const [mensagensFeedback, setMensagensFeedback] = useState([]);

    const fetchFeedbacksAula = async (idAula) => {
        try {
            const response = await caringuApi.get(`/feedbacks/aula/${idAula}`);
            const feedbacksArray = response.data;
            let feedbacks = [];
            if (
                Array.isArray(feedbacksArray) &&
                feedbacksArray.length > 0 &&
                feedbacksArray[0] &&
                typeof feedbacksArray[0] === 'object' &&
                Array.isArray(feedbacksArray[0].feedbacks)
            ) {
                feedbacks = feedbacksArray[0].feedbacks;
            }
            setMensagensFeedback(feedbacks);
            console.log("Feedbacks da aula:", feedbacks);
        } catch (error) {
            console.error("Erro ao buscar feedbacks da aula:", error);
            setMensagensFeedback([]);
        }
    };

    const enviarFeedback = async (e) => {
        e.preventDefault();
        if (!novoFeedback.trim() || !aulaSelecionada) return;
        const now = new Date();
        const brasiliaOffsetMs = -3 * 60 * 60 * 1000; 
        const brasiliaDate = new Date(now.getTime() + brasiliaOffsetMs);

        try {
            const payload = {
                autorId: Number(personalId),
                aulaId: aulaSelecionada.aulaId,
                autorTipo: "PERSONAL",
                descricao: novoFeedback,
                dataCriacao: brasiliaDate.toISOString()
            };
            await caringuApi.post("/feedbacks", payload);
            setNovoFeedback("");
            fetchFeedbacksAula(aulaSelecionada.aulaId);
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao enviar feedback." />
            ));
            console.error(error);
        }
    };

    useEffect(() => {
        if (aulaSelecionada?.aulaId) {
            fetchFeedbacksAula(aulaSelecionada.aulaId);
        }
    }, [aulaSelecionada]);

    if (!alunoFromState) {
        return (
            <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
                <MenuLateral />
                <div className="flex-1 overflow-y-auto">
                    <Header />
                    <div className="w-full h-auto p-2 md:p-4 2xl:">
                        <span className="text-xl text-gray-500">Informações do aluno não disponíveis.</span>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateral />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="w-full h-auto p-2 md:p-4 2xl:">
                    <div className="w-full h-auto flex flex-row ">
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
                        <div className="h-auto w-[95%] bg-[rgba(29,45,68,0.11)] border-2 border-gray-300 rounded-md flex lg:flex-row flex-col gap-10 justify-center lg:items-start items-center py-5">
                            <div className="lg:w-[28%] w-[90%] bg-[var(--cor-secundaria)] min-h-[400px] lg:min-h-[468px] h-auto p-4 border-2 border-gray-300 rounded-md flex flex-col gap-6">
                                <div className="flex flex-row w-full h-auto gap-4 items-center">
                                    {alunoFromState?.urlFotoPerfil && !imgErro ? (
                                        <img
                                            src={alunoFromState.urlFotoPerfil}
                                            alt="Imagem do aluno"
                                            className='w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 rounded-full'
                                            onError={() => setImgErro(true)}
                                        />

                                    ) : (
                                        <FaUserCircle className="flex-shrink-0 sm:w-12 sm:h-12 w-12 h-12 lg:w-12 lg:h-12 text-[#4B5563]" />
                                    )}
                                    <div className="xl:text-2xl text-base font-medium w-full">
                                        <span className="block w-full break-words">
                                            {alunoFromState.nomeAluno}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-auto flex flex-col gap-3 lg:gap-6">
                                    <div className="h-auto flex flex-col">
                                        <span>Data de Nascimento</span>
                                        <span className="block w-full break-words">{MascaraData(alunoFromState.dataNascimento)}</span>
                                    </div>
                                    <div className="h-auto flex flex-col">
                                        <span>Gênero</span>
                                        <span className="block w-full break-words">{MascaraGenero(alunoFromState.genero)}</span>
                                    </div>
                                    <div className="h-auto flex flex-col">
                                        <span>Email</span>
                                        <span className="block w-full break-words whitespace-normal leading-snug">
                                            {alunoFromState.email}
                                        </span>
                                    </div>
                                    <div className="h-auto flex flex-col">
                                        <span>Telefone</span>
                                        <span className="block w-full break-words">{MascaraTelefone(alunoFromState.celular)}</span>
                                    </div>
                                    <div className="h-auto flex flex-col">
                                        <span>Nível de experiência</span>
                                        <span className="block w-full break-words">{MascaraNivelExperiencia(alunoFromState.nivelExperiencia)}</span>
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
                                    aulas.map((a) => (
                                        <AulaResumoCard
                                            key={a.aulaId}
                                            dataAula={a.dataAula}
                                            diaSemana={a.diaSemana}
                                            horarioAula={a.horarioAula}
                                            horarioFim={a.horarioFim}
                                            qtdFeedbacks={a.qtdFeedbacks}
                                            onVerFeedbacks={() => setAulaSelecionada(a)}
                                        />
                                    ))
                                )}
                            </div>
                            <div className="lg:w-[28%] w-[90%] bg-[var(--cor-secundaria)] border-2 border-gray-300 rounded-md py-4 h-[700px] gap-3 flex flex-col overflow-y-auto">
                                {aulaSelecionada ? (
                                    <>
                                        <div className="flex flex-col border-b-2 border-solid border-gray-300 px-6 2xl:px-14 pb-6 gap-1">
                                            <span className="text-2xl font-bold text-[var(--azul-escuro)]">
                                                Aula {aulaSelecionada.dataAula}
                                            </span>
                                            <div className="flex flex-col items-start gap-1.5 text-[var(--azul-escuro)] text-base font-medium">
                                                <div className="flex flex-row items-center gap-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" fill="none">
                                                        <path d="M7.5 8C9.433 8 11 6.433 11 4.5C11 2.567 9.433 1 7.5 1C5.567 1 4 2.567 4 4.5C4 6.433 5.567 8 7.5 8Z" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14 15C13.74 11.845 11.6043 9.36446 8.91143 9.0816C7.98286 8.9728 7.03571 8.9728 6.08857 9.0816C3.39571 9.38622 1.26 11.845 1 15" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <span className="break-words">{aulaSelecionada.nomePersonal}</span>
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
                                                        {aulaSelecionada.horarioAula} - {aulaSelecionada.horarioFim}
                                                    </span>
                                                </div>
                                                <div className="flex flex-row items-center gap-3">
                                                    <svg className='shrink-0' xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
                                                        <path d="M15.5111 3.91675H16.7043C17.0336 3.91675 17.3009 4.24341 17.3009 4.64591V11.9376C17.3009 12.3401 17.0336 12.6667 16.7043 12.6667H15.5111C15.1818 12.6667 14.9146 12.3401 14.9146 11.9376V4.64591C14.9146 4.24341 15.1818 3.91675 15.5111 3.91675Z" stroke="#1D2D44" />
                                                        <path d="M13.1249 1H14.3181C14.6474 1 14.9147 1.32667 14.9147 1.72917V14.8542C14.9147 15.2567 14.6474 15.5833 14.3181 15.5833H13.1249C12.7956 15.5833 12.5283 15.2567 12.5283 14.8542V1.72917C12.5283 1.32667 12.7956 1 13.1249 1Z" stroke="#1D2D44" />
                                                        <path d="M4.77286 1H5.96604C6.29536 1 6.56263 1.32667 6.56263 1.72917V14.8542C6.56263 15.2567 6.29536 15.5833 5.96604 15.5833H4.77286C4.44354 15.5833 4.17627 15.2567 4.17627 14.8542V1.72917C4.17627 1.32667 4.44354 1 4.77286 1Z" stroke="#1D2D44" />
                                                        <path d="M2.38614 3.91675H3.57932C3.90864 3.91675 4.17591 4.24341 4.17591 4.64591V11.9376C4.17591 12.3401 3.90864 12.6667 3.57932 12.6667H2.38614C2.05682 12.6667 1.78955 12.3401 1.78955 11.9376V4.64591C1.78955 4.24341 2.05682 3.91675 2.38614 3.91675Z" stroke="#1D2D44" />
                                                        <path d="M17.3013 8.29175H19.091" stroke="#1D2D44" />
                                                        <path d="M6.5625 8.29175H12.5284" stroke="#1D2D44" />
                                                        <path d="M0 8.29175H1.78977" stroke="#1D2D44" />
                                                    </svg>
                                                    <div className="flex 2xl:flex-row flex-col gap-1">
                                                        <span className="break-words">Treino da Aula:</span>
                                                        <span className="break-words">{aulaSelecionada.nomeTreino}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col h-full  justify-between items-center">
                                            <CaixaFeedback
                                                aula={aulaSelecionada}
                                                mensagens={mensagensFeedback}
                                            />
                                            <form
                                                className="border-t-2 border-solid border-gray-300 px-4 flex flex-col h-auto gap-2 w-full pt-5"
                                                onSubmit={enviarFeedback}
                                            >
                                                <Input
                                                    id={`feedback`}
                                                    name={`feedback`}
                                                    inputType={"text"}
                                                    placeholder={"Escreva seu Feedback"}
                                                    fontSize="16px"
                                                    fontWeight="500"
                                                    width="100%"
                                                    value={novoFeedback}
                                                    onChange={e => setNovoFeedback(e.target.value)}
                                                />
                                                <div className="w-full h-auto flex flex-col items-center">
                                                    <Button
                                                        id="enviarFeedback"
                                                        type="submit"
                                                        texto="Enviar Feedback"
                                                        corTexto="#fff"
                                                        cor="var(--azul-claro)"
                                                        classNameExtra="w-full h-10 text-base"
                                                        ariaLabel={"Botão Enviar Feedback"}
                                                        fontWeight="600"
                                                        logoSvg={
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                                <path d="M8.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V9.75" stroke="#FDFFFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M12.0299 2.26495L6.11991 8.17495C5.89491 8.39995 5.66991 8.84245 5.62491 9.16495L5.30241 11.4224C5.18241 12.2399 5.75991 12.8099 6.57741 12.6974L8.83491 12.3749C9.14991 12.3299 9.59241 12.1049 9.82491 11.8799L15.7349 5.96995C16.7549 4.94995 17.2349 3.76495 15.7349 2.26495C14.2349 0.764945 13.0499 1.24495 12.0299 2.26495Z" stroke="#FDFFFD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                                <path d="M11.1826 3.11255C11.6851 4.90505 13.0876 6.30755 14.8876 6.81755" stroke="#FDFFFD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        }
                                                    />

                                                </div>
                                            </form>
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        Selecione uma aula para ver os detalhes.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    )
}

export default Feedback;