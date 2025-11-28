import React, { useState, useEffect } from "react";
import Header from "../../components/Personal/Header/Header";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import EstaSemana from "../../components/Utils/EstaSemana";
import CompromissosAgenda from "../../components/Utils/CompromissosAgenda";
import Calendario from "../../components/Utils/Calendario";
import { isSameDay } from "date-fns";
import { caringuApi } from "../../provider/caringuApi";
import { Toaster } from 'react-hot-toast';



const Agenda = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedDay, setSelectedDay] = useState(null);
    const [value, setValue] = useState(new Date());
    const [treinosFinalizados, setTreinosFinalizados] = useState([]);


    useEffect(() => {
        const today = new Date();
        document.title = "Agenda | CaringU"
        setSelectedDay({
            day: today.toLocaleDateString("pt-BR", { weekday: "long" }),
            date: today.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
            }),
            fullDate: today.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }),
            isToday: true,
        });
    }, []);

    const pessoaId = sessionStorage.getItem("pessoaId");



    const exibirTreinos = async () => {
        try {
            const response = await caringuApi.get(`/aulas/personal-aulas/${pessoaId}`);
            setTreinosFinalizados(response.data);
        } catch (error) {
            console.error("Erro ao exibir treinos:", error);
        }
    }

    function formatarHora(isoString) {
        const data = new Date(isoString);
        return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    function formatarData(isoString) {
        const data = new Date(isoString);
        return data.toLocaleDateString('pt-BR');
    }

    const compromissos = treinosFinalizados.map(item => {
        const status = item.status?.toUpperCase().trim();
        return {
            id: item.idAula,
            status,
            horario: item.status === "REALIZADO"
                ? `${formatarHora(item.dataHorarioInicio)} - ${formatarHora(item.dataHorarioFim)}`
                : `${formatarHora(item.dataHorarioInicio)}`,
            data: formatarData(item.dataHorarioInicio),
            aluno: {
                nome: item.nomeAluno,
                foto: item.urlFotoPerfil,
            },
            finalizado: item.finalizado,
            dataHorarioFim: item.dataHorarioFim,
            dataHorarioInicio: item.dataHorarioInicio,
            nomeAluno: item.nomeAluno,
            urlFotoPerfil: item.urlFotoPerfilAluno,
            idAluno: item.idAluno
        }
    });




    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateral isOpen={isSidebarOpen} />
            <div className="flex-1 overflow-y-auto">
                <Header toggleSidebar={toggleSidebar} />
                <div className="w-full h-auto flex lg:flex-row flex-col">
                    <div className="pl-[1rem] sm:pl-[3.5rem] pt-2 sm:pt-12 pb-2 w-full lg:w-[50%] h-auto flex flex-col">
                        <Calendario
                            value={value}
                            compromissos={compromissos}
                            onChange={(date) => {
                                setValue(date);
                                setSelectedDay({
                                    day: date.toLocaleDateString("pt-BR", { weekday: "long" }),
                                    date: date.toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                    }),
                                    fullDate: date.toLocaleDateString("pt-BR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    }),
                                    isToday: isSameDay(date, new Date()),
                                });
                            }}
                        />
                        <div className=" w-full h-auto flex flex-col items-start justify-start gap-4 mt-6 pb-2">
                            <div className="flex flex-row items-center justify-start">
                                <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-md bg-[#748CAB36] mr-4">
                                </div>
                                <span className="text-[var(--cor-primaria)] font-normal text-base sm:text-2xl">
                                    Dia Atual
                                </span>
                            </div>
                            <div className="flex flex-row items-center justify-start">
                                <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-md bg-[var(--laranja)] mr-4 relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-4 sm:w-5 sm:h-4 absolute top-[-8px] left-[-12px]" viewBox="0 0 23 20" fill="none">
                                        <path d="M18.3714 4.62695H19.7846C20.1746 4.62695 20.4912 5.03314 20.4912 5.53362V14.6003C20.4912 15.1008 20.1746 15.507 19.7846 15.507H18.3714C17.9814 15.507 17.6648 15.1008 17.6648 14.6003V5.53362C17.6648 5.03314 17.9814 4.62695 18.3714 4.62695Z" fill="#1D2D44" stroke="#1D2D44" strokeWidth="1.5" />
                                        <path d="M15.5452 1H16.9584C17.3485 1 17.665 1.40619 17.665 1.90667V18.2267C17.665 18.7271 17.3485 19.1333 16.9584 19.1333H15.5452C15.1552 19.1333 14.8386 18.7271 14.8386 18.2267V1.90667C14.8386 1.40619 15.1552 1 15.5452 1Z" fill="#1D2D44" stroke="#1D2D44" strokeWidth="1.5" />
                                        <path d="M5.65289 1H7.06608C7.45613 1 7.77268 1.40619 7.77268 1.90667V18.2267C7.77268 18.7271 7.45613 19.1333 7.06608 19.1333H5.65289C5.26285 19.1333 4.94629 18.7271 4.94629 18.2267V1.90667C4.94629 1.40619 5.26285 1 5.65289 1Z" fill="#1D2D44" stroke="#1D2D44" strokeWidth="1.5" />
                                        <path d="M2.82647 4.62695H4.23967C4.62971 4.62695 4.94627 5.03314 4.94627 5.53362V14.6003C4.94627 15.1008 4.62971 15.507 4.23967 15.507H2.82647C2.43643 15.507 2.11987 15.1008 2.11987 14.6003V5.53362C2.11987 5.03314 2.43643 4.62695 2.82647 4.62695Z" fill="#1D2D44" stroke="#1D2D44" strokeWidth="1.5" />
                                        <path d="M20.4915 10.0664H22.6113H20.4915Z" fill="#1D2D44" />
                                        <path d="M20.4915 10.0664H22.6113" stroke="#1D2D44" strokeWidth="2" />
                                        <path d="M7.77271 10.0664H14.8387H7.77271Z" fill="#1D2D44" />
                                        <path d="M7.77271 10.0664H14.8387" stroke="#1D2D44" strokeWidth="2" />
                                        <path d="M0 10.0664H2.1198H0Z" fill="#1D2D44" />
                                        <path d="M0 10.0664H2.1198" stroke="#1D2D44" strokeWidth="2" />
                                    </svg>
                                </div>
                                <span className="text-[var(--cor-primaria)] font-normal text-base sm:text-2xl">
                                    Dias de treino
                                </span>
                            </div>
                            <div className="flex flex-row items-center justify-start">
                                <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-md bg-[#E96E354F] mr-4">
                                </div>
                                <span className="text-[var(--cor-primaria)] font-normal text-base sm:text-2xl">
                                    Dias de treinos passados
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-[96%] lg:w-[48%] h-200 flex flex-col pt-2 lg:pt-12 pl-[1rem] sm:pl-[3.5rem] lg:pl-0">
                        <EstaSemana
                            onDaySelect={(diaSelecionado) => {
                                setSelectedDay(diaSelecionado);
                                const [day, month, year] = diaSelecionado.fullDate.split('/');
                                const jsDate = new Date(Number(year), Number(month) - 1, Number(day));
                                setValue(jsDate);
                            }}
                            compromissos={compromissos}
                        />
                        <div className="mt-5 border-solid border-[#1D2D441C] border-4 rounded-md w-full h-[68%] p-10 flex flex-col mb-5 lg:mb-0">
                            <CompromissosAgenda
                                compromissos={compromissos}
                                selectedDay={selectedDay}
                                atualizarTreinos={exibirTreinos}
                            />

                        </div>
                    </div>
                </div>
            </div>
             <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
};

export default Agenda;