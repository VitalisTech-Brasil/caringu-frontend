import React, { useState } from "react";
import Header from "../../components/Personal/Header/Header";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import Calendar from "react-calendar";
import { isSameDay } from "date-fns";


const Agenda = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [value, setValue] = useState(new Date()); // Começa pelo mês atual

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
                <div className="p-4 bg-[#fdfaf4] min-h-screen flex items-center justify-center">
                    <Calendar
                        value={value}
                        onChange={setValue}
                        locale="pt-BR"
                        tileClassName={({ date, activeStartDate, view }) => {
                            if (view !== "month") return "w-10 h-10 text-base"; // Menor para outras views
                            let classes = "w-25 h-21 text-2xl flex items-center justify-center rounded-lg"; // Menor tamanho
                            if (date.getMonth() !== activeStartDate.getMonth()) {
                                classes += " relative text-[#15171B3D]";
                            } else if (isSameDay(date, hoje)) {
                                classes += " relative bg-gray-200";
                            } else if ([6, 12, 18].includes(date.getDate())) {
                                classes += " relative bg-[#E96E35] text-[var(--cor-secundaria)] font-bold";
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
                        className="rounded-xl shadow-xl border-none w-200 h-184 text-center"
                    />
                </div>
            </div>
        </div>
    );
};

export default Agenda;