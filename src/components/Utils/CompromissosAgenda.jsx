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

    // Filtrar compromissos para o dia selecionado
    const compromissosDoDia = compromissos.filter((compromisso) => {
        const compromissoDate = parseDate(compromisso.data); // Converter a data do compromisso
        const selectedDate = selectedDay?.fullDate
            ? parseDate(selectedDay.fullDate)
            : today;
        return compromissoDate.getTime() === selectedDate.getTime();
    });

    return (
        <div>
            
        </div>
    )

}

export default CompromissosAgenda;