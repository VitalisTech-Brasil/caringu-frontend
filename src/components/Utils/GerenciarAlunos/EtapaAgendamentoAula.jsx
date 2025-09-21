import React from "react";
import Calendar from 'react-calendar';
import Button from "../Button";
import { format, addDays, isAfter } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import { useAgendamento } from "./Context/AgendamentoContext";

const EtapaAgendamentoAula = ({
    aluno,
    brasiliaToday,
    date,
    setDate,
    checkedDates,
    setCheckedDates,
    horarios,
    setHorarios,
    selectedDates,
    setSelectedDates,
    horarioInicio,
    setHorarioInicio,
    horarioFim,
    setHorarioFim,
    todosHorariosPreenchidos,
    diasSelecionados,
    setDiasSelecionados,
    showDropdown,
    setShowDropdown,
    handleDateClick,
    handleRemoveDate,
    handleSelectAll,
    handleCheck,
    handleToggleDropdown,
    handleCheckDia,
    diasSemana,
    fecharModal,
    onProsseguir
}) => {
    const { atualizarAgendamento } = useAgendamento();

    const handleSalvarHorarios = () => {
        const novosHorarios = { ...horarios };
        checkedDates.forEach(dateIso => {
            novosHorarios[dateIso] = {
                inicio: horarioInicio,
                fim: horarioFim
            };
        });
        setHorarios(novosHorarios);
        setHorarioInicio("");
        setHorarioFim("");
        setCheckedDates([]);
    };

    const montarAulasParaEnvio = () => {
        return {
            aulas: selectedDates
                .filter(date => horarios[date.toISOString()])
                .map(date => {
                    const { inicio, fim } = horarios[date.toISOString()];
                    const dataStr = date.toISOString().slice(0, 10); // "2025-09-25"
                    return {
                        dataHorarioInicio: `${dataStr}T${inicio}:00`,
                        dataHorarioFim: `${dataStr}T${fim}:00`
                    };
                })
        };
    };

    return (
        <>
            <div>
                <div className="flex flex-row gap-2 mt-12 md:mt-3 text-base sm:text-lg 2xl:text-2xl">
                    <span className="text-[var(--laranja)] font-semibold">{aluno.quantidade_aulas}</span>
                    <span>Aulas Para Agendar</span>
                </div>
            </div>
            <div className="md:border-2 md:border-[#1D2D441A] md:border-solid py-3 md:py-0 rounded-md w-full flex flex-col md:flex-row">
                <div className="calendario-modal w-full md:w-1/2 xl:w-[45%] flex flex-row justify-center items-center border-2 border-[#1D2D441A] border-solid md:border-none">
                    <Calendar
                        onChange={date => {
                            setDate(date);
                            handleDateClick(date);
                        }}
                        value={date}
                        locale="pt-BR"
                        className={"border-2 border-[var(--cor-secundaria)] rounded-full h-auto w-[85%] sm:w-[75%] md:w-[90%] 2xl:w-[24rem] 2xl:mb-0 mb-3"}
                        minDate={brasiliaToday}
                        formatMonthYear={(locale, date) => {
                            const str = format(date, "MMMM yyyy", { locale: ptBR });
                            return str.charAt(0).toUpperCase() + str.slice(1);
                        }}
                        tileClassName={({ date: tileDate, view }) => {
                            if (view === 'month' && tileDate < brasiliaToday) {
                                return 'text-gray-400';
                            }
                            if (selectedDates.some(d => d.toDateString() === tileDate.toDateString())) {
                                return 'bg-orange-500 text-white rounded-full border-orange-500 border-2 border-solid';
                            }
                            if (tileDate.toDateString() === brasiliaToday.toDateString()) {
                                return 'rounded-full';
                            }
                            return '';
                        }}
                        prevLabel={<span className="text-[24px] font-medium">ᐸ</span>}
                        nextLabel={<span className="text-[24px] font-medium">ᐳ</span>}
                        prev2Label={null}
                        next2Label={null}
                    />
                </div>
                <div className=" border-2 border-[#1D2D441A] border-solid md:border-l-2 md:border-r-0 border-t-0 md:border-b-0 flex flex-col w-full md:w-1/2 h-auto md:h-full xl:w-[55%]">
                    <div className="border-b-2 border-b-[#1D2D441A] border-b-solid pb-4 flex flex-col w-full items-center h-auto gap-2 mt-4 md:mt-1 px-0 md:px-3">
                        <span className="w-full text-center md:text-left font-semibold text-base sm:text-lg">
                            Agende seus treinos
                        </span>
                        <div className="w-full flex flex-row items-center justify-center md:justify-start">
                            <div className="relative w-[90%] md:w-[85%] xl:min-w-[60%] xl:w-auto">
                                <div
                                    className="p-2 rounded-md border-2 border-[#1D2D441A] bg-transparent cursor-pointer flex justify-between items-center text-sm 2xl:text-base"
                                    onClick={handleToggleDropdown}
                                >
                                    <span>
                                        {diasSelecionados.length === 0
                                            ? "Selecione o(s) dia(s) da semana"
                                            : diasSemana
                                                .filter(d => diasSelecionados.includes(d.value))
                                                .map(d => d.label)
                                                .join(", ")
                                        }
                                    </span>
                                    <svg className={`flex-shrink-0 ml-2 transition-transform ${showDropdown ? "rotate-180" : ""}`} width="20" height="20" fill="none" viewBox="0 0 24 24">
                                        <path d="M7 10l5 5 5-5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                {showDropdown && (
                                    <div className="absolute z-50 left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-auto text-sm">
                                        {diasSemana.map(dia => (
                                            <label
                                                key={dia.value}
                                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={diasSelecionados.includes(dia.value)}
                                                    onChange={() => handleCheckDia(dia.value)}
                                                    className="mr-2"
                                                />
                                                {dia.label}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center xl:items-start w-full h-auto mt-2 px-0 md:px-3">
                        <span className="font-semibold text-center w-full text-base md:text-left sm:text-lg">
                            Escolha o horário das aulas:
                        </span>
                        <div className="flex flex-row w-[95%] md:w-full h-auto items-center gap-2 mt-2 md:mt-1">
                            {selectedDates.length === 0 ? (
                                <span className="text-sm 2xl:text-base" style={{ color: "#00000073" }}>
                                    Nenhum dia selecionado
                                </span>
                            ) : (
                                <>
                                    <input
                                        type="checkbox"
                                        checked={checkedDates.length === selectedDates.length && selectedDates.length > 0}
                                        onChange={handleSelectAll}
                                        className="w-4.5 h-4.5"
                                        id="meuInput"
                                    />
                                    <label className="text-sm xl:text-base" htmlFor="meuInput">Selecionar Todos</label>
                                </>
                            )}
                        </div>
                        <div className="w-[95%] md:w-full">
                            <div className="flex flex-col gap-4 xl:gap-1 mt-2 max-h-65 h-auto md:max-h-31 md:h-31  overflow-y-auto">
                                {selectedDates.map((data, idx) => (
                                    <div key={data.toISOString()} className="w-full h-auto flex flex-col xl:flex-row xl:items-center">
                                        <div className="flex flex-row gap-2 w-full xl:w-[60%] h-auto items-center text-[14px]">
                                            <input
                                                type="checkbox"
                                                checked={checkedDates.includes(data.toISOString())}
                                                onChange={() => handleCheck(data)}
                                                className="w-5 h-5"
                                            />
                                            <div className="bg-orange-500 text-white px-3 py-1 rounded-[5px] flex items-center cursor-pointer w-full ">
                                                <button
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        handleRemoveDate(data);
                                                    }}
                                                    className="mr-2 font-bold bg-[#FFFDF6] rounded-[5px] h-4 w-4 flex items-center justify-center cursor-pointer"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="4" viewBox="0 0 14 4" fill="none">
                                                        <path d="M12 2H2" stroke="#B41F1F" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                                {(() => {
                                                    const str = format(data, "EEEE, dd/MM/yyyy", { locale: ptBR });
                                                    return str.charAt(0).toUpperCase() + str.slice(1);
                                                })()}
                                            </div>
                                        </div>
                                        <div className="flex flex-row w-full xl:w-[40%] h-auto items-center justify-center text-sm mt-0 sm:mt-1.5 xl:mt-0">
                                            <span>
                                                {horarios[data.toISOString()] && horarios[data.toISOString()].inicio && horarios[data.toISOString()].fim
                                                    ? `${horarios[data.toISOString()].inicio} - ${horarios[data.toISOString()].fim}`
                                                    : "Sem Horário Definido"}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full h-auto flex flex-col md:flex-row  items-center mt-4 md:justify-between pb-4 px-6 md:gap-0 gap-4 text-[20px]">
                            <div className="w-[95%] md:w-[42.5%] h-auto flex flex-col items-center md:items-start justify-center">
                                <span>
                                    Início:
                                </span>
                                <input
                                    type="time"
                                    value={horarioInicio}
                                    onChange={e => setHorarioInicio(e.target.value)}
                                    className="bg-transparent border-2 border-[#1D2D441A] border-solid p-2 rounded-md w-1/2 md:w-full"
                                />
                            </div>
                            <div className="w-[95%] md:w-[42.5%] h-auto flex flex-col items-center md:items-start justify-center">
                                <span>
                                    Fim:
                                </span>
                                <input
                                    type="time"
                                    value={horarioFim}
                                    onChange={e => setHorarioFim(e.target.value)}
                                    className="bg-transparent border-2 border-[#1D2D441A] border-solid p-2 rounded-md w-1/2 md:w-full"
                                />
                            </div>
                        </div>
                        <div className="w-full h-auto flex flex-col md:flex-row items-center gap-2 pb-4 px-10 md:px-0">
                            <Button
                                texto="Salvar Horário Marcados"
                                cor={horarioInicio && horarioFim && checkedDates.length > 0 ? "var(--azul-claro)" : "#15171B87"}
                                corTexto="var(--cor-secundaria)"
                                height="2.75rem"
                                fontWeight="500"
                                ariaLabel="Botão de Salvar Horário"
                                type="button"
                                disabled={!(horarioInicio && horarioFim && checkedDates.length > 0)}
                                onClick={handleSalvarHorarios}
                                classNameExtra="w-full md:mx-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div aria-label="Opções de Botões" className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center mt-4 h-auto 2xl:h-full">
                <Button
                    texto="Cancelar"
                    cor="var(--cor-secundaria)"
                    corTexto="#B41F1F"
                    height="2.75rem"
                    width="10.5rem"
                    fontWeight="500"
                    ariaLabel="Botão de Cancelar"
                    type="button"
                    borderColor="#B41F1F"
                    borderStyle="solid"
                    borderWidth="2px"
                    onClick={fecharModal}
                />
                <div className="relative flex items-center group">
                    <Button
                        texto="Prosseguir"
                        corTexto="var(--cor-secundaria)"
                        cor={todosHorariosPreenchidos ? "#46982B" : "#15171B87"}
                        height="2.75rem"
                        width="10.5rem"
                        fontWeight="600"
                        ariaLabel="Botão de Salvar"
                        type="submit"
                        disabled={!todosHorariosPreenchidos}
                        onClick={() => {
                            const dadosParaEnvio = montarAulasParaEnvio();
                            console.log(dadosParaEnvio);
                            atualizarAgendamento(dadosParaEnvio);
                            onProsseguir();
                        }}
                    />
                    <div className="absolute left-[16rem] xl:left-[18rem] -translate-x-1/2 bottom-full mb-2 hidden group-hover:hidden lg:group-hover:flex flex-col items-center z-50 pointer-events-none " >
                        <div className="bg-[var(--cor-secundaria)] text-black text-xs 2xl:text-base rounded py-2 px-4 shadow-lg w-[15vw] text-left border-2 border-black border-solid">
                            Certifique-se de que todas as aulas foram agendadas e que todas estão com horário definido.
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
export default EtapaAgendamentoAula;