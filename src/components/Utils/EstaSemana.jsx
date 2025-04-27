import React, { useMemo } from "react";

const EstaSemana = ({ onDaySelect }) => {
  // Lógica para calcular os dias da semana
  const getCurrentWeek = () => {
    const days = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
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
    <div className="bg-[var(--cor-secundaria)] rounded-xl shadow-sm p-6" style={{ height: "auto", maxHeight: "200px" }}>
      <h2 className="text-sm font-bold text-gray-900">Esta Semana</h2>
      <div className="grid grid-cols-7 gap-2 mt-4">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between items-center p-2 rounded-md transition-all duration-300 cursor-pointer h-20 ${
              day.isToday
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-[var(--azul-claro)] hover:text-white"
            }`}
            onClick={() => onDaySelect(day)} // Chama a função de callback ao clicar no dia
          >
            <p className="text-xs capitalize">{day.day}</p>
            <p className="text-sm font-semibold self-end">{day.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstaSemana;