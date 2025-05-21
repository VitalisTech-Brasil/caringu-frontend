import React, { useState, useEffect } from "react";
import Header from "../../components/Personal/Header/Header";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import Calendar from "react-calendar";
import EstaSemana from "../../components/Utils/EstaSemana";
import { isSameDay } from "date-fns";


const Agenda = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedDay, setSelectedDay] = useState(null);
    const [value, setValue] = useState(new Date());


    useEffect(() => {
        const today = new Date();
        document.title = "Home | CaringU"
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


    const treinos = [
        new Date(2025, 2, 6),
        new Date(2025, 2, 12),
        new Date(2025, 2, 18),
    ];

    const treinosPassados = [
        new Date(2025, 2, 3),
    ];

    const hoje = new Date();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-[#fdfbf7]">
            <MenuLateral isOpen={isSidebarOpen} />
            <div className="flex-1 overflow-y-auto">
                <Header toggleSidebar={toggleSidebar} />
                <div className="w-full h-auto flex flex-row">
                    <div className="pl-[3.5rem] pt-12 pb-2 w-[50%] h-auto flex flex-col">
                        <Calendar
                            value={value}
                            onChange={setValue}
                            locale="pt-BR"
                            tileClassName={({ date, activeStartDate, view }) => {
                                if (view !== "month") return "w-10 h-10 text-base"; // Menor para outras views
                                let classes = "w-20 h-15 text-2xl flex items-center justify-center rounded-lg"; // Menor tamanho
                                if (date.getMonth() !== activeStartDate.getMonth()) {
                                    classes += " relative text-[#15171B3D]";
                                } else if (isSameDay(date, hoje)) {
                                    classes += "relative bg-[#748CAB36] rounded-md text-[var(--azul-escuro)]";
                                } else if ([6, 12, 18].includes(date.getDate())) {
                                    classes += " relative bg-[var(--laranja)] text-[var(--cor-secundaria)] font-bold";
                                } else if (date.getDate() === 3) {
                                    classes += " relative bg-[#E96E354F]";
                                } else {
                                    classes += " hover:bg-[#1D2D4436]";
                                }
                                return classes;
                            }}
                            tileContent={({ date, view }) => {
                                if (view !== "month") return null;
                                if ([6, 12, 18].includes(date.getDate())) {
                                    return <div className="absolute top-[-12px] left-[-10px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="29" viewBox="0 0 34 29" fill="none">
                                            <path d="M27.5241 6.42725H29.6387C30.2223 6.42725 30.696 7.03503 30.696 7.78391V21.3506C30.696 22.0995 30.2223 22.7072 29.6387 22.7072H27.5241C26.9405 22.7072 26.4668 22.0995 26.4668 21.3506V7.78391C26.4668 7.03503 26.9405 6.42725 27.5241 6.42725Z" fill="#1D2D44" stroke="#1D2D44" stroke-width="1.75" />
                                            <path d="M23.2951 1H25.4097C25.9933 1 26.467 1.60779 26.467 2.35667V26.7767C26.467 27.5255 25.9933 28.1333 25.4097 28.1333H23.2951C22.7115 28.1333 22.2378 27.5255 22.2378 26.7767V2.35667C22.2378 1.60779 22.7115 1 23.2951 1Z" fill="#1D2D44" stroke="#1D2D44" stroke-width="1.75" />
                                            <path d="M8.49334 1H10.6079C11.1916 1 11.6652 1.60779 11.6652 2.35667V26.7767C11.6652 27.5255 11.1916 28.1333 10.6079 28.1333H8.49334C7.90971 28.1333 7.43604 27.5255 7.43604 26.7767V2.35667C7.43604 1.60779 7.90971 1 8.49334 1Z" fill="#1D2D44" stroke="#1D2D44" stroke-width="1.75" />
                                            <path d="M4.26384 6.42725H6.37844C6.96207 6.42725 7.43574 7.03503 7.43574 7.78391V21.3506C7.43574 22.0995 6.96207 22.7072 6.37844 22.7072H4.26384C3.68021 22.7072 3.20654 22.0995 3.20654 21.3506V7.78391C3.20654 7.03503 3.68021 6.42725 4.26384 6.42725Z" fill="#1D2D44" stroke="#1D2D44" stroke-width="1.75" />
                                            <path d="M30.6963 14.5664H33.8682H30.6963Z" fill="#1D2D44" />
                                            <path d="M30.6963 14.5664H33.8682" stroke="#1D2D44" stroke-width="1.75" />
                                            <path d="M11.665 14.5664H22.238H11.665Z" fill="#1D2D44" />
                                            <path d="M11.665 14.5664H22.238" stroke="#1D2D44" stroke-width="5" />
                                            <path d="M0.034668 14.5664H3.20657H0.034668Z" fill="#1D2D44" />
                                            <path d="M0.034668 14.5664H3.20657" stroke="#1D2D44" stroke-width="1.75" />
                                        </svg>
                                    </div>;
                                }
                                return null;
                            }}
                            calendarType="gregory"
                            formatMonthYear={(locale, date) => {
                                const month = date.toLocaleDateString('pt-BR', { month: 'long' });
                                const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
                                return `${capitalizedMonth} ${date.getFullYear()}`;
                            }}
                            prevLabel={<span className="text-[32px] font-semibold">
                                ᐸ
                            </span>
                            }
                            nextLabel={<span className="text-[32px] font-semibold"> ᐳ </span>}
                            prev2Label={null}
                            next2Label={null}
                            className="rounded-xl shadow-[6px_5px_7px_2px_rgba(0,_0,_0,_0.1)] w-185 h-149 text-center"
                        />
                        <div className="w-full h-auto flex flex-col items-start justify-start gap-4 mt-6 pb-2">
                            <div className="flex flex-row items-center justify-start">
                                <div className="w-10 h-10 rounded-md bg-[#748CAB36] mr-4">
                                </div>
                                <span className="text-[var(--cor-primaria)] font-normal text-2xl">
                                    Dia Atual
                                </span>
                            </div>
                            <div className="flex flex-row items-center justify-start">
                                <div className="w-10 h-10 rounded-md bg-[var(--laranja)] mr-4 relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-5 absolute top-[-8px] left-[-12px]" viewBox="0 0 23 20" fill="none">
                                        <path d="M18.3714 4.62695H19.7846C20.1746 4.62695 20.4912 5.03314 20.4912 5.53362V14.6003C20.4912 15.1008 20.1746 15.507 19.7846 15.507H18.3714C17.9814 15.507 17.6648 15.1008 17.6648 14.6003V5.53362C17.6648 5.03314 17.9814 4.62695 18.3714 4.62695Z" fill="#1D2D44" stroke="#1D2D44" stroke-width="1.5" />
                                        <path d="M15.5452 1H16.9584C17.3485 1 17.665 1.40619 17.665 1.90667V18.2267C17.665 18.7271 17.3485 19.1333 16.9584 19.1333H15.5452C15.1552 19.1333 14.8386 18.7271 14.8386 18.2267V1.90667C14.8386 1.40619 15.1552 1 15.5452 1Z" fill="#1D2D44" stroke="#1D2D44" stroke-width="1.5" />
                                        <path d="M5.65289 1H7.06608C7.45613 1 7.77268 1.40619 7.77268 1.90667V18.2267C7.77268 18.7271 7.45613 19.1333 7.06608 19.1333H5.65289C5.26285 19.1333 4.94629 18.7271 4.94629 18.2267V1.90667C4.94629 1.40619 5.26285 1 5.65289 1Z" fill="#1D2D44" stroke="#1D2D44" stroke-width="1.5" />
                                        <path d="M2.82647 4.62695H4.23967C4.62971 4.62695 4.94627 5.03314 4.94627 5.53362V14.6003C4.94627 15.1008 4.62971 15.507 4.23967 15.507H2.82647C2.43643 15.507 2.11987 15.1008 2.11987 14.6003V5.53362C2.11987 5.03314 2.43643 4.62695 2.82647 4.62695Z" fill="#1D2D44" stroke="#1D2D44" stroke-width="1.5" />
                                        <path d="M20.4915 10.0664H22.6113H20.4915Z" fill="#1D2D44" />
                                        <path d="M20.4915 10.0664H22.6113" stroke="#1D2D44" stroke-width="2" />
                                        <path d="M7.77271 10.0664H14.8387H7.77271Z" fill="#1D2D44" />
                                        <path d="M7.77271 10.0664H14.8387" stroke="#1D2D44" stroke-width="2" />
                                        <path d="M0 10.0664H2.1198H0Z" fill="#1D2D44" />
                                        <path d="M0 10.0664H2.1198" stroke="#1D2D44" stroke-width="2" />
                                    </svg>
                                </div>
                                <span className="text-[var(--cor-primaria)] font-normal text-2xl">
                                    Dias de treino
                                </span>
                            </div>
                            <div className="flex flex-row items-center justify-start">
                                <div className="w-10 h-10 rounded-md bg-[#E96E354F] mr-4">
                                </div>
                                <span className="text-[var(--cor-primaria)] font-normal text-2xl">
                                    Dias de treinos passados
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className=" w-[48%] h-auto flex flex-col pt-12">
                        <EstaSemana onDaySelect={setValue} />
                        <div className="mt-5 border-solid border-[#1D2D441C] border-4 rounded-md w-full h-[68%] p-10 ">
                            <div className="bg-red-200 flex flex-row items-center justify-start w-full h-auto ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                    <path d="M31.0673 9.57709L26.2931 28.7446C25.9531 30.1755 24.6781 31.1671 23.2048 31.1671H4.58978C2.45061 31.1671 0.920632 29.0703 1.55813 27.0162L7.52229 7.86298C7.93312 6.53131 9.16564 5.61035 10.554 5.61035H27.979C29.3248 5.61035 30.444 6.43203 30.9115 7.56536C31.1806 8.17453 31.2373 8.86875 31.0673 9.57709Z" stroke="#1D2D44" stroke-width="2" stroke-miterlimit="10" />
                                    <path d="M22.6665 31.1667H29.4382C31.2657 31.1667 32.6965 29.6225 32.569 27.795L31.1665 8.5" stroke="#1D2D44" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M13.7134 9.03789L15.1867 2.91797" stroke="#1D2D44" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M23.2051 9.05258L24.5367 2.9043" stroke="#1D2D44" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className="text-xl font-normal text-[var(--azul-escuro)] ml-3">
                                    Quinta, 22 de Maio de 2025
                                </span>
                            </div>
                            <div className="w-full h-[95%] bg-amber-200 overflow-y-auto flex flex-col items-center justify-start pt-4 gap-6">
                                <div
                                    className="flex items-center justify-start bg-[var(--azul-escuro)] rounded-md shadow-sm overflow-hidden w-full py-4 h-auto opacity-0 animate-fade-in"
                                >
                                    <div className="flex flex-col items-center justify-center w-auto h-full border-r border-[var(--cor-secundaria)] px-5">
                                        <span className="text-2xl font-normal text-[var(--cor-secundaria)]">Quin</span>
                                        <span className="text-5xl font-bold text-[var(--cor-secundaria)]">
                                            22
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-center justify-between w-full h-auto">
                                        <div className="flex flex-col justify-center gap-4 ml-4">
                                            <div className="text-white text-sm flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                    <path d="M22.9168 12.4997C22.9168 18.2497 18.2502 22.9163 12.5002 22.9163C6.75016 22.9163 2.0835 18.2497 2.0835 12.4997C2.0835 6.74967 6.75016 2.08301 12.5002 2.08301C18.2502 2.08301 22.9168 6.74967 22.9168 12.4997Z" fill="#FFFDF6" stroke="#FFFDF6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M16.3647 15.8128L13.1356 13.8857C12.5731 13.5524 12.1147 12.7503 12.1147 12.0941V7.82324" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <span className="text-xl font-medium text-[var(--cor-secundaria)]">9:00 - 10:00</span>
                                            </div>
                                            <div className="text-white text-sm flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                    <path d="M3.77094 8.84343C5.82302 -0.177407 19.1876 -0.16699 21.2293 8.85384C22.4272 14.1455 19.1355 18.6247 16.2501 21.3955C14.1564 23.4163 10.8439 23.4163 8.73969 21.3955C5.86469 18.6247 2.57302 14.1351 3.77094 8.84343Z" fill="#FFFDF6" stroke="#FFFDF6" stroke-width="1.5" />
                                                    <path d="M12.5 13.9902C14.2949 13.9902 15.75 12.5352 15.75 10.7402C15.75 8.94531 14.2949 7.49023 12.5 7.49023C10.7051 7.49023 9.25 8.94531 9.25 10.7402C9.25 12.5352 10.7051 13.9902 12.5 13.9902Z" fill="#1D2D44" stroke="#1D2D44" stroke-width="1.5" />
                                                </svg>
                                                <span className="text-xl font-medium text-[var(--cor-secundaria)]">Academia XYZ</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start justify-center gap-2 mr-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={"https://res.cloudinary.com/lptennis/image/upload/v1665352930/zllaquu1qwwi2jx1scif.jpg"}
                                                    alt={"Ricardo Lima"}
                                                    className="w-15 h-15 rounded-full object-cover"
                                                />
                                                <span className="text-[var(--cor-secundaria)] font-medium text-xl">
                                                    Ricardo Lima
                                                </span>
                                            </div>
                                            <button className="bg-transparent border-solid border-2 border-[#E2E4E7] text-[var(--cor-secundaria)] text-base font-normal rounded-md py-1 px-3 cursor-pointer">
                                                Marcar como feito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center justify-start bg-[var(--azul-escuro)] rounded-md shadow-sm overflow-hidden w-full py-4 h-auto opacity-0 animate-fade-in"
                                >
                                    <div className="flex flex-col items-center justify-center w-auto h-full border-r border-[var(--cor-secundaria)] px-5">
                                        <span className="text-2xl font-normal text-[var(--cor-secundaria)]">Quin</span>
                                        <span className="text-5xl font-bold text-[var(--cor-secundaria)]">
                                            22
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-center justify-between w-full h-auto">
                                        <div className="flex flex-col justify-center gap-4 ml-4">
                                            <div className="text-white text-sm flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                    <path d="M22.9168 12.4997C22.9168 18.2497 18.2502 22.9163 12.5002 22.9163C6.75016 22.9163 2.0835 18.2497 2.0835 12.4997C2.0835 6.74967 6.75016 2.08301 12.5002 2.08301C18.2502 2.08301 22.9168 6.74967 22.9168 12.4997Z" fill="#FFFDF6" stroke="#FFFDF6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M16.3647 15.8128L13.1356 13.8857C12.5731 13.5524 12.1147 12.7503 12.1147 12.0941V7.82324" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <span className="text-xl font-medium text-[var(--cor-secundaria)]">9:00 - 10:00</span>
                                            </div>
                                            <div className="text-white text-sm flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                    <path d="M3.77094 8.84343C5.82302 -0.177407 19.1876 -0.16699 21.2293 8.85384C22.4272 14.1455 19.1355 18.6247 16.2501 21.3955C14.1564 23.4163 10.8439 23.4163 8.73969 21.3955C5.86469 18.6247 2.57302 14.1351 3.77094 8.84343Z" fill="#FFFDF6" stroke="#FFFDF6" stroke-width="1.5" />
                                                    <path d="M12.5 13.9902C14.2949 13.9902 15.75 12.5352 15.75 10.7402C15.75 8.94531 14.2949 7.49023 12.5 7.49023C10.7051 7.49023 9.25 8.94531 9.25 10.7402C9.25 12.5352 10.7051 13.9902 12.5 13.9902Z" fill="#1D2D44" stroke="#1D2D44" stroke-width="1.5" />
                                                </svg>
                                                <span className="text-xl font-medium text-[var(--cor-secundaria)]">Academia XYZ</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start justify-center gap-2 mr-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={"https://res.cloudinary.com/lptennis/image/upload/v1665352930/zllaquu1qwwi2jx1scif.jpg"}
                                                    alt={"Ricardo Lima"}
                                                    className="w-15 h-15 rounded-full object-cover"
                                                />
                                                <span className="text-[var(--cor-secundaria)] font-medium text-xl">
                                                    Ricardo Lima
                                                </span>
                                            </div>
                                            <button className="bg-transparent border-solid border-2 border-[#E2E4E7] text-[var(--cor-secundaria)] text-base font-normal rounded-md py-1 px-3 cursor-pointer">
                                                Marcar como feito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center justify-start bg-[var(--azul-escuro)] rounded-md shadow-sm overflow-hidden w-full py-4 h-auto opacity-0 animate-fade-in"
                                >
                                    <div className="flex flex-col items-center justify-center w-auto h-full border-r border-[var(--cor-secundaria)] px-5">
                                        <span className="text-2xl font-normal text-[var(--cor-secundaria)]">Quin</span>
                                        <span className="text-5xl font-bold text-[var(--cor-secundaria)]">
                                            22
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-center justify-between w-full h-auto">
                                        <div className="flex flex-col justify-center gap-4 ml-4">
                                            <div className="text-white text-sm flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                    <path d="M22.9168 12.4997C22.9168 18.2497 18.2502 22.9163 12.5002 22.9163C6.75016 22.9163 2.0835 18.2497 2.0835 12.4997C2.0835 6.74967 6.75016 2.08301 12.5002 2.08301C18.2502 2.08301 22.9168 6.74967 22.9168 12.4997Z" fill="#FFFDF6" stroke="#FFFDF6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M16.3647 15.8128L13.1356 13.8857C12.5731 13.5524 12.1147 12.7503 12.1147 12.0941V7.82324" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <span className="text-xl font-medium text-[var(--cor-secundaria)]">9:00 - 10:00</span>
                                            </div>
                                            <div className="text-white text-sm flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                                    <path d="M3.77094 8.84343C5.82302 -0.177407 19.1876 -0.16699 21.2293 8.85384C22.4272 14.1455 19.1355 18.6247 16.2501 21.3955C14.1564 23.4163 10.8439 23.4163 8.73969 21.3955C5.86469 18.6247 2.57302 14.1351 3.77094 8.84343Z" fill="#FFFDF6" stroke="#FFFDF6" stroke-width="1.5" />
                                                    <path d="M12.5 13.9902C14.2949 13.9902 15.75 12.5352 15.75 10.7402C15.75 8.94531 14.2949 7.49023 12.5 7.49023C10.7051 7.49023 9.25 8.94531 9.25 10.7402C9.25 12.5352 10.7051 13.9902 12.5 13.9902Z" fill="#1D2D44" stroke="#1D2D44" stroke-width="1.5" />
                                                </svg>
                                                <span className="text-xl font-medium text-[var(--cor-secundaria)]">Academia XYZ</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-start justify-center gap-2 mr-4">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={"https://res.cloudinary.com/lptennis/image/upload/v1665352930/zllaquu1qwwi2jx1scif.jpg"}
                                                    alt={"Ricardo Lima"}
                                                    className="w-15 h-15 rounded-full object-cover"
                                                />
                                                <span className="text-[var(--cor-secundaria)] font-medium text-xl">
                                                    Ricardo Lima
                                                </span>
                                            </div>
                                            <button className="bg-transparent border-solid border-2 border-[#E2E4E7] text-[var(--cor-secundaria)] text-base font-normal rounded-md py-1 px-3 cursor-pointer">
                                                Marcar como feito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Agenda;