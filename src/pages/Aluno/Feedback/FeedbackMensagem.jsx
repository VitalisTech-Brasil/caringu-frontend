import React, { useState, useRef, useEffect } from "react";
import MenuLateralAluno from "../../../components/Aluno/MenuLateral/MenuLateral";
import Header from "../../../components/Aluno/Header/Header";
import { useLocation, Link } from "react-router-dom";
import Button from "../../../components/Utils/Button"
import Input from "../../../components/Utils/InputPosLogin";
import CaixaFeedback from "../../../components/Utils/GerenciarAlunos/CaixaFeedback"
import { caringuApi } from "../../../provider/caringuApi";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import CustomToast from '../../../components/Utils/CustomToast';

const FeedbackMensagem = () => {
    const menuRef = useRef(null);

    const location = useLocation();
    const aula = location.state?.aula;
    const [novoFeedback, setNovoFeedback] = useState("");
    const alunoId = sessionStorage.getItem('pessoaId');
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
                autorId: Number(alunoId),
                aulaId: aulaSelecionada.id,
                autorTipo: "ALUNO",
                descricao: novoFeedback,
                dataCriacao: brasiliaDate.toISOString()
            };
            await caringuApi.post("/feedbacks", payload);
            setNovoFeedback("");
            fetchFeedbacksAula(aulaSelecionada.id);
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao enviar feedback." />
            ));
            console.error(error);
        }
    };

    const [aulaSelecionada, setAulaSelecionada] = useState(aula || null);


    useEffect(() => {
        if (aulaSelecionada?.id) {
            fetchFeedbacksAula(aulaSelecionada.id);
        }
    }, [aulaSelecionada]);

    if (!aula) {
        return (
            <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
                <MenuLateralAluno ref={menuRef} />
                <div className="flex-1 overflow-y-auto">
                    <Header
                        menuRef={menuRef}
                        title="Feedback"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M27.5 14.375V19.375C27.5 23.75 25 25.625 21.25 25.625H8.75C5 25.625 2.5 23.75 2.5 19.375V10.625C2.5 6.25 5 4.375 8.75 4.375H15" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.75 11.25L12.6625 14.375C13.95 15.4 16.0625 15.4 17.35 14.375" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M24.35 3.5248L24.7 4.23729C24.875 4.58729 25.3125 4.9123 25.7 4.9873L26.175 5.0623C27.6 5.2998 27.9375 6.3498 26.9125 7.3873L26.475 7.82479C26.1875 8.12479 26.025 8.69979 26.1125 9.09979L26.175 9.3623C26.5625 11.0873 25.65 11.7498 24.15 10.8498L23.825 10.6623C23.4375 10.4373 22.8125 10.4373 22.425 10.6623L22.1 10.8498C20.5875 11.7623 19.675 11.0873 20.075 9.3623L20.1375 9.09979C20.225 8.69979 20.0625 8.12479 19.775 7.82479L19.3375 7.3873C18.3125 6.3498 18.65 5.2998 20.075 5.0623L20.55 4.9873C20.925 4.9248 21.375 4.58729 21.55 4.23729L21.9 3.5248C22.575 2.1623 23.675 2.1623 24.35 3.5248Z" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    />
                    <div className="w-full h-auto p-2 md:p-4">
                        <span className="text-xl text-gray-500">Informações da aula não disponíveis.</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateralAluno ref={menuRef} />
            <div className="flex-1 overflow-y-auto">
                <Header
                    menuRef={menuRef}
                    title="Feedback"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <path d="M27.5 14.375V19.375C27.5 23.75 25 25.625 21.25 25.625H8.75C5 25.625 2.5 23.75 2.5 19.375V10.625C2.5 6.25 5 4.375 8.75 4.375H15" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.75 11.25L12.6625 14.375C13.95 15.4 16.0625 15.4 17.35 14.375" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24.35 3.5248L24.7 4.23729C24.875 4.58729 25.3125 4.9123 25.7 4.9873L26.175 5.0623C27.6 5.2998 27.9375 6.3498 26.9125 7.3873L26.475 7.82479C26.1875 8.12479 26.025 8.69979 26.1125 9.09979L26.175 9.3623C26.5625 11.0873 25.65 11.7498 24.15 10.8498L23.825 10.6623C23.4375 10.4373 22.8125 10.4373 22.425 10.6623L22.1 10.8498C20.5875 11.7623 19.675 11.0873 20.075 9.3623L20.1375 9.09979C20.225 8.69979 20.0625 8.12479 19.775 7.82479L19.3375 7.3873C18.3125 6.3498 18.65 5.2998 20.075 5.0623L20.55 4.9873C20.925 4.9248 21.375 4.58729 21.55 4.23729L21.9 3.5248C22.575 2.1623 23.675 2.1623 24.35 3.5248Z" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                />
                <div className="w-full h-auto flex flex-col justify-center items-center">
                    <div className="lg:w-[70%] w-full 2xl:w-[50%] lg:border-2 lg:border-gray-300 lg:rounded-md lg:mt-4 bg-[var(--cor-secundaria)] py-4 h-[700px] gap-3 flex flex-col overflow-y-auto">
                        <div className="flex w-full flex-row border-b-2 border-solid border-gray-300 gap-3">
                            <div className="w-auto h-auto flex flex-row justify-center items-start pl-1">
                                <div className="h-auto">
                                    <Link to={`/feedback-aluno`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer shrink-0" viewBox="0 0 53 53" fill="none">
                                            <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className=" flex flex-col pb-6 gap-1 w-full">
                                <span className="text-2xl font-bold text-[var(--azul-escuro)]">
                                    Aula {aula?.data}
                                </span>
                                <div className="flex flex-col items-start gap-1.5 text-[var(--azul-escuro)] text-base font-medium">
                                    <div className="flex flex-row items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" fill="none">
                                            <path d="M7.5 8C9.433 8 11 6.433 11 4.5C11 2.567 9.433 1 7.5 1C5.567 1 4 2.567 4 4.5C4 6.433 5.567 8 7.5 8Z" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14 15C13.74 11.845 11.6043 9.36446 8.91143 9.0816C7.98286 8.9728 7.03571 8.9728 6.08857 9.0816C3.39571 9.38622 1.26 11.845 1 15" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="break-words">{aula?.nomePersonal}</span>
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
                                        <span className="break-words">{aula?.diaSemana}</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-3">
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.50008 1.41675C4.59716 1.41675 1.41675 4.59716 1.41675 8.50008C1.41675 12.403 4.59716 15.5834 8.50008 15.5834C12.403 15.5834 15.5834 12.403 15.5834 8.50008C15.5834 4.59716 12.403 1.41675 8.50008 1.41675ZM11.5813 11.0288C11.4822 11.1988 11.3051 11.2909 11.1209 11.2909C11.0288 11.2909 10.9367 11.2697 10.8517 11.213L8.65591 9.90258C8.1105 9.57675 7.70675 8.86133 7.70675 8.23091V5.32675C7.70675 5.03633 7.94758 4.7955 8.238 4.7955C8.52841 4.7955 8.76925 5.03633 8.76925 5.32675V8.23091C8.76925 8.48591 8.98175 8.86133 9.20133 8.98883L11.3972 10.2992C11.6522 10.448 11.7372 10.7738 11.5813 11.0288Z" fill="#1D2D44" />
                                        </svg>
                                        <span className="break-words">
                                            {aula?.horarioInicio} - {aula?.horarioFim}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-center gap-3">
                                        <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
                                            <path d="M15.5111 3.91675H16.7043C17.0336 3.91675 17.3009 4.24341 17.3009 4.64591V11.9376C17.3009 12.3401 17.0336 12.6667 16.7043 12.6667H15.5111C15.1818 12.6667 14.9146 12.3401 14.9146 11.9376V4.64591C14.9146 4.24341 15.1818 3.91675 15.5111 3.91675Z" stroke="#1D2D44" />
                                            <path d="M13.1249 1H14.3181C14.6474 1 14.9147 1.32667 14.9147 1.72917V14.8542C14.9147 15.2567 14.6474 15.5833 14.3181 15.5833H13.1249C12.7956 15.5833 12.5283 15.2567 12.5283 14.8542V1.72917C12.5283 1.32667 12.7956 1 13.1249 1Z" stroke="#1D2D44" />
                                            <path d="M4.77286 1H5.96604C6.29536 1 6.56263 1.32667 6.56263 1.72917V14.8542C6.56263 15.2567 6.29536 15.5833 5.96604 15.5833H4.77286C4.44354 15.5833 4.17627 15.2567 4.17627 14.8542V1.72917C4.17627 1.32667 4.44354 1 4.77286 1Z" stroke="#1D2D44" />
                                            <path d="M2.38614 3.91675H3.57932C3.90864 3.91675 4.17591 4.24341 4.17591 4.64591V11.9376C4.17591 12.3401 3.90864 12.6667 3.57932 12.6667H2.38614C2.05682 12.6667 1.78955 12.3401 1.78955 11.9376V4.64591C1.78955 4.24341 2.05682 3.91675 2.38614 3.91675Z" stroke="#1D2D44" />
                                            <path d="M17.3013 8.29175H19.091" stroke="#1D2D44" />
                                            <path d="M6.5625 8.29175H12.5284" stroke="#1D2D44" />
                                            <path d="M0 8.29175H1.78977" stroke="#1D2D44" />
                                        </svg>
                                        <div className="flex flex-row gap-1 flex-wrap items-center justify-start">
                                            <span className="break-words">Treino da Aula:</span>
                                            <span className="break-all">{aula?.nomeTreino}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col h-full  justify-between items-center">
                            <CaixaFeedback
                                aula={aulaSelecionada}
                                mensagens={mensagensFeedback}
                                aluno={"aluno"}
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
                                    fontWeight="500"
                                    width="100%"
                                    fontSize={"12px"}
                                    value={novoFeedback}
                                    onChange={(e) => setNovoFeedback(e.target.value)}

                                />
                                <div className="w-full h-auto flex flex-col items-center">
                                    <Button
                                        id="enviarFeedback"
                                        type="submit"
                                        texto="Enviar Feedback"
                                        corTexto="#fff"
                                        cor="var(--azul-claro)"
                                        classNameExtra="w-full h-10 text-[12px]"
                                        ariaLabel={"Botão Enviar Feedback"}
                                        fontWeight="600"
                                        logoSvg={
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path d="M8.25 1.5H6.75C3 1.5 1.5 3 1.5 6.75V11.25C1.5 15 3 16.5 6.75 16.5H11.25C15 16.5 16.5 15 16.5 11.25V9.75" stroke="#FDFFFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12.0299 2.26495L6.11991 8.17495C5.89491 8.39995 5.66991 8.84245 5.62491 9.16495L5.30241 11.4224C5.18241 12.2399 5.75991 12.8099 6.57741 12.6974L8.83491 12.3749C9.14991 12.3299 9.59241 12.1049 9.82491 11.8799L15.7349 5.96995C16.7549 4.94995 17.2349 3.76495 15.7349 2.26495C14.2349 0.764945 13.0499 1.24495 12.0299 2.26495Z" stroke="#FDFFFD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.1826 3.11255C11.6851 4.90505 13.0876 6.30755 14.8876 6.81755" stroke="#FDFFFD" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        }
                                        height={"h-2"}
                                    />

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default FeedbackMensagem;