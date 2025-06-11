import React, { useMemo } from "react";

const EstaSemana = ({ onDaySelect, compromissos }) => {

      const today = new Date();

  // Lógica para calcular os dias da semana
  const getCurrentWeek = () => {
    const days = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
    const currentDay = today.getDay();

    return days.map((day, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - currentDay + index);
      return {
        day,
        date: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }), // Formato dd/MM
        fullDate: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }), // Formato dd/MM/yyyy
        isToday: index === currentDay,
      };
    });
  };

  const weekDays = useMemo(() => getCurrentWeek(), []);

  const existeTreino = (fullDate) => {
    return compromissos?.some(c => c.data === fullDate);
  };

  //function para verificar se existe antes do dia atual
  const existeAntes = (fullDate) => {
    const [dia, mes, ano] = fullDate.split("/");
    const data = new Date(`${ano}-${mes}-${dia}T00:00:00`);
    return data < today;
  };

  return (
    <div className="bg-[var(--cor-secundaria)] rounded-md border-solid border-[#1D2D441C] border-4 p-6" style={{ height: "auto" }}>
      <h2 className="text-base font-semibold text-[var(--cor-primaria)]">Esta Semana</h2>
      <div className="2xl:grid 2xl:grid-cols-7 flex  gap-2 mt-4 overflow-x-auto">
        {weekDays.map((day, index) => {
          let bgClass = "border-solid border-[#1D2D441C] border-4 text-gray-700 hover:bg-[#1D2D4436]";
          if (day.isToday) {
            bgClass = "bg-[#748CAB36] text-[var(--azul-escuro)]";
          } else if (existeTreino(day.fullDate) && existeAntes(day.fullDate)) {
            bgClass = "bg-[#E96E354F] text-[var(--cor-primaria)]";
          } else if (existeTreino(day.fullDate)) {
            bgClass = "bg-[var(--laranja)] text-[var(--cor-secundaria)]";
          }
          return (
            <div
              key={index}
              className={`min-w-25 2xl:min-w-21 flex flex-col justify-between items-center p-2 rounded-md transition-all duration-300 cursor-pointer h-32 ${bgClass}`}
              onClick={() => onDaySelect(day)}
            >
              <p className="text-base  font-semibold capitalize">{day.day}</p>
              <p className="text-base  self-center">{day.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EstaSemana;