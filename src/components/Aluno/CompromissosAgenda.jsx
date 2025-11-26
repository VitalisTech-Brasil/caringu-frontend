import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CompromissosAgenda = ({ compromissos, selectedDay }) => {

    const [errosImagem, setErrosImagem] = useState({});

    const navigate = useNavigate();

    const lidarErroImagem = (id) => {
        setErrosImagem((prev) => ({
            ...prev,
            [id]: true,
        }));
    };

    const today = new Date();
    const todayFormatted = today.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    //Determinar se o dia selecionado é hoje
    const isToday = selectedDay?.fullDate === todayFormatted;

    // Função para normalizar a data no formato "dd/MM/yyyy" para um objeto Date
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day);
    };

    // Mapear os dias da semana para o formato personalizado
    const diasDaSemana = {
        Sunday: "Dom",
        Monday: "Seg",
        Tuesday: "Ter",
        Wednesday: "Qua",
        Thursday: "Qui",
        Friday: "Sex",
        Saturday: "Sab",
    };

    const formatarDataExtenso = (fullDate) => {
        if (!fullDate) return "";
        const [dia, mes, ano] = fullDate.split("/");
        const data = new Date(`${ano}-${mes}-${dia}`);
        const mesExtenso = data.toLocaleDateString("pt-BR", { month: "long" });
        const mesCapitalizado = mesExtenso.charAt(0).toUpperCase() + mesExtenso.slice(1);
        return `${dia} de ${mesCapitalizado} de ${ano}`;
    };

    // Filtrar compromissos para o dia selecionado
    const compromissosDoDia = compromissos.filter((compromisso) => {
        const compromissoDate = parseDate(compromisso.data); // Converter a data do compromisso
        const selectedDate = selectedDay?.fullDate
            ? parseDate(selectedDay.fullDate)
            : today;
        return compromissoDate.getTime() === selectedDate.getTime();
    });


    return (
        <>
            {/* Mostrar cabeçalho apenas se houver compromissos */}
            {compromissosDoDia.length > 0 && (
                <div className="flex flex-row items-center justify-start w-full h-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M27.4125 8.45026L23.2 25.3628C22.9 26.6253 21.775 27.5002 20.475 27.5002H4.04998C2.16248 27.5002 0.812499 25.6502 1.375 23.8377L6.63749 6.93781C6.99999 5.76281 8.08751 4.9502 9.31251 4.9502H24.6875C25.875 4.9502 26.8625 5.6752 27.275 6.6752C27.5125 7.2127 27.5625 7.82526 27.4125 8.45026Z" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" />
                        <path d="M20 27.5H25.975C27.5875 27.5 28.85 26.1375 28.7375 24.525L27.5 7.5" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.1 7.97513L13.4 2.5752" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20.475 7.98746L21.65 2.5625" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.625 15H19.625" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.375 20H18.375" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-base sm:text-xl font-normal text-[var(--azul-escuro)] ml-3">
                        {isToday ? "hoje" : selectedDay?.day || "hoje"}, {formatarDataExtenso(selectedDay?.fullDate)}

                    </span>
                </div>
            )}
            <div className="flex-1 min-h-0 overflow-y-auto mt-2">
                <div className=" flex flex-col items-center gap-6 w-full h-auto">

                    {compromissosDoDia.length > 0 ? (
                        compromissosDoDia.map((compromisso, index) => {
                            const compromissoDate = parseDate(compromisso.data);
                            const diaSemana = diasDaSemana[compromissoDate.toLocaleDateString("en-US", { weekday: "long" })];
                            return (
                                <div
                                    key={`${compromisso.id}-${index}`}
                                    className="flex flex-row  items-center justify-start bg-[var(--azul-escuro)] rounded-md w-full"
                                >
                                    <div className="flex flex-col items-center justify-center w-auto h-full  px-3 py-2">
                                        <span className="text-sm font-normal text-[var(--cor-secundaria)]">{diaSemana}</span>
                                        <span className="text-2xl font-bold text-[var(--cor-secundaria)]">
                                            {compromissoDate.getDate()}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center w-full h-auto gap-4 border-l border-[var(--cor-secundaria)]">
                                        <div className="flex flex-col justify-center items-start gap-2.5 w-full py-3">
                                            <div className="flex flex-row w-auto h-auto items-center gap-2 pl-3">
                                                {compromisso.personal.foto && !errosImagem[compromisso.personal.id] ? (
                                                    <img
                                                        src={compromisso.personal.foto}
                                                        alt={compromisso.personal.nome}
                                                        className="w-7 h-7 2xl:w-12 2xl:h-12 rounded-full object-cover shrink-0"
                                                        onError={() => lidarErroImagem(compromisso.personal.id)}
                                                    />
                                                ) : (
                                                    <FaUserCircle className="shrink-0 w-7 h-7 2xl:w-12 2xl:h-12 text-[var(--cor-secundaria)]" />
                                                )}
                                                <span className="text-[var(--cor-secundaria)] font-medium text-base">
                                                    {compromisso.personal.nome}
                                                </span>
                                            </div>
                                            <div className="text-[var(--cor-secundaria)] text-sm w-auto h-auto flex items-center gap-1.5 pl-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 2xl:w-6 2xl:h-6 shrink-0" viewBox="0 0 25 25" fill="none">
                                                    <path d="M22.9168 12.4997C22.9168 18.2497 18.2502 22.9163 12.5002 22.9163C6.75016 22.9163 2.0835 18.2497 2.0835 12.4997C2.0835 6.74967 6.75016 2.08301 12.5002 2.08301C18.2502 2.08301 22.9168 6.74967 22.9168 12.4997Z" fill="#FFFDF6" stroke="#FFFDF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M16.3647 15.8128L13.1356 13.8857C12.5731 13.5524 12.1147 12.7503 12.1147 12.0941V7.82324" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="text-base 2xl:text-xl font-medium">
                                                    {compromisso.dataHorarioInicio ? compromisso.dataHorarioInicio.slice(11, 16) : ""}
                                                </span>
                                                <span>-</span>
                                                <span className="text-base 2xl:text-xl font-medium">
                                                    {compromisso.dataHorarioFim ? compromisso.dataHorarioFim.slice(11, 16) : ""}
                                                </span>
                                            </div>
                                            <div className="flex flex-row  items-center pl-4 w-full">
                                                <button
                                                    onClick={() => navigate(
                                                        `/acompanhar-aula-aluno/${compromisso.id}`,
                                                        { state: { compromisso } }
                                                    )}
                                                    className="hover:bg-[#E2E4E7] hover:text-[var(--azul-escuro)] bg-[color:var(--azul-claro)] text-[var(--cor-secundaria)] text-xs 2xl:text-xl font-semibold rounded-md py-1 px-4 cursor-pointer h-auto w-45 2xl:w-70"
                                                >
                                                    Acompanhar Aula
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="w-full h-[95%] overflow-y-auto flex flex-col items-center justify-center gap-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 md:w-30 md:h-30 xl:w-40.5 xl:h-40.5" viewBox="0 0 162 162" fill="none">
                                <path d="M81 0C36.369 0 0 36.369 0 81C0 125.631 36.369 162 81 162C125.631 162 162 125.631 162 81C162 36.369 125.631 0 81 0ZM108.216 99.63C110.565 101.979 110.565 105.867 108.216 108.216C107.001 109.431 105.462 109.998 103.923 109.998C102.384 109.998 100.845 109.431 99.63 108.216L81 89.586L62.37 108.216C61.155 109.431 59.616 109.998 58.077 109.998C56.538 109.998 54.999 109.431 53.784 108.216C51.435 105.867 51.435 101.979 53.784 99.63L72.414 81L53.784 62.37C51.435 60.021 51.435 56.133 53.784 53.784C56.133 51.435 60.021 51.435 62.37 53.784L81 72.414L99.63 53.784C101.979 51.435 105.867 51.435 108.216 53.784C110.565 56.133 110.565 60.021 108.216 62.37L89.586 81L108.216 99.63Z" fill="#E96E35" />
                            </svg>
                            <span className="text-base sm:text-xl lg:text-2xl font-normal text-[#15171BAD]">
                                Não existem treinos agendados para o dia selecionado.
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default CompromissosAgenda;