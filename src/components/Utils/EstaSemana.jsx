import React, { useMemo } from "react";

const EstaSemana = ({ onDaySelect }) => {
  // Lógica para calcular os dias da semana
  const getCurrentWeek = () => {
    const days = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
    const today = new Date();
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

  return (
    <div className="bg-[var(--cor-secundaria)] rounded-md border-solid border-[#1D2D441C] border-4 p-6" style={{ height: "auto", maxHeight: "300px" }}>
      <h2 className="text-2xl font-semibold text-[var(--cor-primaria)]">Esta Semana</h2>
      <div className="grid grid-cols-7 gap-2 mt-4">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between items-center p-2 rounded-md transition-all duration-300 cursor-pointer h-32 ${
              day.isToday
                ? "bg-[#748CAB36] text-[var(--azul-escuro)]"
                : "border-solid border-[#1D2D441C] border-4 text-gray-700 hover:bg-[#1D2D4436]"
            }`}
            onClick={() => onDaySelect(day)} // Chama a função de callback ao clicar no dia
          >
            <p className="text-xl font-semibold capitalize">{day.day}</p>
            <p className="text-xl self-center">{day.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstaSemana;