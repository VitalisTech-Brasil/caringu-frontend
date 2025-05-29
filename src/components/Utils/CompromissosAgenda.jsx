const CompromissosAgenda = ({ compromissos, selectedDay }) => {

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
        Wednesday: "Quar",
        Thursday: "Quin",
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <path d="M31.0673 9.57709L26.2931 28.7446C25.9531 30.1755 24.6781 31.1671 23.2048 31.1671H4.58978C2.45061 31.1671 0.920632 29.0703 1.55813 27.0162L7.52229 7.86298C7.93312 6.53131 9.16564 5.61035 10.554 5.61035H27.979C29.3248 5.61035 30.444 6.43203 30.9115 7.56536C31.1806 8.17453 31.2373 8.86875 31.0673 9.57709Z" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M22.6665 31.1667H29.4382C31.2657 31.1667 32.6965 29.6225 32.569 27.795L31.1665 8.5" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.7134 9.03789L15.1867 2.91797" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M23.2051 9.05258L24.5367 2.9043" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-base sm:text-xl font-normal text-[var(--azul-escuro)] ml-3">
                        {isToday ? "hoje" : selectedDay?.day || "hoje"}, {formatarDataExtenso(selectedDay?.fullDate)}

                    </span>
                </div>
            )}
            <div className="flex-1 min-h-0 overflow-y-auto mt-2">
                <div className=" flex flex-col items-center gap-6 pb-2">

                    {compromissosDoDia.length > 0 ? (
                        compromissosDoDia.map((compromisso, index) => {
                            const compromissoDate = parseDate(compromisso.data);
                            const diaSemana = diasDaSemana[compromissoDate.toLocaleDateString("en-US", { weekday: "long" })];
                            return (
                                <div
                                    key={`${compromisso.id}-${index}`}
                                    className="flex sm:flex-row flex-col items-center justify-start bg-[var(--azul-escuro)] rounded-md w-full py-4 sm:px-0 px-2 sm:gap-0 gap-4"
                                >
                                    <div className="flex flex-col items-center justify-center w-auto h-full border-b sm:border-b-0 sm:border-r border-[var(--cor-secundaria)] sm:px-5 py-2">
                                        <span className="text-xl 2xl:text-2xl font-normal text-[var(--cor-secundaria)]">{diaSemana}</span>
                                        <span className="text-4xl 2xl:text-5xl font-bold text-[var(--cor-secundaria)]">
                                            {compromissoDate.getDate()}
                                        </span>
                                    </div>
                                    <div className="flex sm:flex-row flex-col items-center justify-between w-full h-auto sm:gap-0 gap-4">
                                        <div className="flex flex-col justify-center gap-4 ml-4">
                                            <div className="text-white text-sm flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 2xl:w-6 2xl:h-6 shrink-0" viewBox="0 0 25 25" fill="none">
                                                    <path d="M22.9168 12.4997C22.9168 18.2497 18.2502 22.9163 12.5002 22.9163C6.75016 22.9163 2.0835 18.2497 2.0835 12.4997C2.0835 6.74967 6.75016 2.08301 12.5002 2.08301C18.2502 2.08301 22.9168 6.74967 22.9168 12.4997Z" fill="#FFFDF6" stroke="#FFFDF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M16.3647 15.8128L13.1356 13.8857C12.5731 13.5524 12.1147 12.7503 12.1147 12.0941V7.82324" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <span className="text-base 2xl:text-xl font-medium text-[var(--cor-secundaria)]">{compromisso.horario}</span>
                                            </div>
                                        </div>
                                        <div className="flex sm:flex-col flex-col sm:items-end items-center justify-center gap-2 mr-0 sm:mr-4">
                                            <div className="flex sm:flex-row flex-col items-center gap-2">
                                                <img
                                                    src={"https://res.cloudinary.com/lptennis/image/upload/v1665352930/zllaquu1qwwi2jx1scif.jpg"}
                                                    alt={"Ricardo Lima"}
                                                    className="w-13 h-13 2xl:w-15 2xl:h-15 rounded-full object-cover"
                                                />
                                                <span className="text-[var(--cor-secundaria)] font-medium text-base 2xl:text-xl">
                                                    {compromisso.aluno.nome}
                                                </span>
                                            </div>
                                            <button className="bg-transparent border-solid border-2 border-[#E2E4E7] text-[var(--cor-secundaria)] text-base 2xl:text-xl font-normal rounded-md py-1 px-3 cursor-pointer">
                                                Marcar como feito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="w-full h-[95%] overflow-y-auto flex flex-col items-center justify-center gap-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 sm:w-40.5 sm:h-40.5" viewBox="0 0 162 162" fill="none">
                                <path d="M81 0C36.369 0 0 36.369 0 81C0 125.631 36.369 162 81 162C125.631 162 162 125.631 162 81C162 36.369 125.631 0 81 0ZM108.216 99.63C110.565 101.979 110.565 105.867 108.216 108.216C107.001 109.431 105.462 109.998 103.923 109.998C102.384 109.998 100.845 109.431 99.63 108.216L81 89.586L62.37 108.216C61.155 109.431 59.616 109.998 58.077 109.998C56.538 109.998 54.999 109.431 53.784 108.216C51.435 105.867 51.435 101.979 53.784 99.63L72.414 81L53.784 62.37C51.435 60.021 51.435 56.133 53.784 53.784C56.133 51.435 60.021 51.435 62.37 53.784L81 72.414L99.63 53.784C101.979 51.435 105.867 51.435 108.216 53.784C110.565 56.133 110.565 60.021 108.216 62.37L89.586 81L108.216 99.63Z" fill="#E96E35" />
                            </svg>
                            <span className="text-xl sm:text-3xl font-normal text-[#15171BAD]">
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