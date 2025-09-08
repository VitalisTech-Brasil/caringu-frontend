import React from "react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { format } from "date-fns";
import { caringuApi } from "../../provider/caringuApi";
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";
import { PiCalendarCheckLight } from "react-icons/pi";
import "../../styles/compromissos.css"; // Importando o arquivo compromissos.css



const CompromissosHoje = ({ compromissos, selectedDay, listarTreinosFinalizados }) => {

  const [errosImagem, setErrosImagem] = useState({});

  const lidarErroImagem = (id) => {
    setErrosImagem((prev) => ({
      ...prev,
      [id]: true,
    }));
  };


  const treinoFim = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");

  const marcarComoConcluido = async (idTreinoFinalizado) => {
    try {
      await caringuApi.patch(
        `treinos-finalizados/${idTreinoFinalizado}/finalizar`,
        {
          dataHorarioFim: treinoFim,
        }
      );

      if (listarTreinosFinalizados) listarTreinosFinalizados();
    } catch (error) {
      console.error("Erro ao marcar compromisso como concluído:", error);
    }
  };

  // Obter a data atual formatada
  const today = new Date();
  const todayFormatted = today.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Determinar se o dia selecionado é hoje
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

  // Filtrar compromissos para o dia selecionado
  const compromissosDoDia = compromissos.filter((compromisso) => {
    const compromissoDate = parseDate(compromisso.data); // Converter a data do compromisso
    const selectedDate = selectedDay?.fullDate
      ? parseDate(selectedDay.fullDate)
      : today;
    return compromissoDate.getTime() === selectedDate.getTime();
  });

  return (
    <div
      className={`bg-[var(--cor-secundaria)] rounded-xl shadow-sm p-6 flex-1 transition-all duration-500 ease-in-out h-full`}
      style={{
        maxHeight: compromissosDoDia.length > 3 ? "631px" : "auto",
        overflowY: compromissosDoDia.length > 3 ? "auto" : "hidden",
      }}
    >
      <h2 className="text-xl md:text-[28px] font-bold text-gray-900">
        Compromissos de {isToday ? "Hoje" : selectedDay?.day || "Hoje"}
      </h2>
      {compromissosDoDia.length > 0 ? (
        compromissosDoDia.map((compromisso, index) => {
          const compromissoDate = parseDate(compromisso.data);
          const diaSemana = diasDaSemana[compromissoDate.toLocaleDateString("en-US", { weekday: "long" })];

          return (
            <div
              key={`${compromisso.id}-${index}`} // Garantir que a chave seja única
              className="flex items-center justify-between bg-primary-900 rounded-md shadow-sm overflow-hidden w-full min-h-[80px] mt-4 opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`, // Adiciona um pequeno atraso para cada item
              }}
            >
              {/* Bloco da Data */}
              <div className="flex flex-col items-center justify-center w-16 h-full border-r border-white/20 px-2">
                <span className="text-xs font-semibold text-white">{diaSemana}</span>
                <span className="text-2xl font-bold text-white">
                  {compromissoDate.getDate()}
                </span>
              </div>

              {/* Bloco Central */}
              <div className="flex flex-col justify-center gap-1 ml-4">
                <div className="text-base 2xl:text-xl font-medium text-[var(--cor-secundaria)] flex items-center gap-2">
                  <HiOutlineClock />
                  {/* <span>{compromisso.horario}</span> */}
                  <span>{compromisso.horario}</span>
                </div>

              </div>

              {/* Bloco da Pessoa + Botão */}
              <div className="flex flex-col items-center justify-center gap-2 mr-4">
                <div className="flex items-center gap-2">
                  {compromisso.aluno.foto && !errosImagem[compromisso.aluno.id] ? (
                    <img
                      src={compromisso.aluno.foto}
                      alt={compromisso.aluno.nome}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={() => lidarErroImagem(compromisso.aluno.id)}
                    />
                  ) : (
                    <FaUserCircle className="w-8 h-8 text-[var(--cor-secundaria)]" />

                  )}
                  <span className="text-[var(--cor-secundaria)] font-medium text-base 2xl:text-xl">
                    {compromisso.aluno.nome}
                  </span>
                </div>
                {compromisso.dataHorarioFim === null && (
                  <button
                    onClick={() => marcarComoConcluido(compromisso.id)}
                    className="bg-transparent border border-white text-white text-xs font-semibold rounded-md py-1 px-3 hover:opacity-80">
                    Marcar como feito
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <PiCalendarCheckLight className="text-black-600 text-6xl mb-4" />
          <p className="text-gray-500 text-base text-center">
            Nenhum compromisso encontrado para {isToday ? "hoje" : selectedDay?.day || "hoje"}.
          </p>
        </div>
      )}
    </div>
  );
};

export default CompromissosHoje;