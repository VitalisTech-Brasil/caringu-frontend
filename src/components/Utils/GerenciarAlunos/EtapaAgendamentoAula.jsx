import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import Button from "../Button";
import { format, addDays } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import { useAgendamento } from "./Context/AgendamentoContext";
import { caringuApi } from "../../../provider/caringuApi";
import toast from 'react-hot-toast';
import CustomToast from '../../Utils/CustomToast';
import ButtonLoading from "../ButtonLoading";

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
    showDropdown,
    handleDateClick,
    handleSelectAll,
    handleCheck,
    handleToggleDropdown,
    handleCheckDia,
    diasSemana,
    fecharModal,
    manualDates,
    setManualDates,
    rascunhosPersistidos,
    setRascunhosPersistidos,
    onProsseguir,
    atualizarAlunos
}) => {
    const { atualizarAgendamento } = useAgendamento();
    const [datasAulasBloqueadas, setDatasAulasBloqueadas] = useState([]);
    const rascunhosDates = rascunhosPersistidos ?? [];      // array de { id, date }
    const setRascunhosDates = setRascunhosPersistidos;     // setter vindo do pai

    const [aulasDisponiveis, setAulasDisponiveis] = useState({})
    const [showRascunhoModal, setShowRascunhoModal] = useState(false);
    const [rascunhosCarregados, setRascunhosCarregados] = useState(false);
    const [, setGeneratedDates] = useState([]);

    function getNextAvailableDates(weekdays, slotsToFill, startDate = new Date(), occupiedSet = new Set()) {
        const diasMap = {
            'domingo': 0, 'segunda': 1, 'terca': 2, 'terça': 2, 'quarta': 3,
            'quinta': 4, 'sexta': 5, 'sabado': 6, 'sábado': 6,
        };
        const diasSelecionados = weekdays.map(d => diasMap[d.toLowerCase()]).sort((a, b) => a - b);
        if (diasSelecionados.length === 0 || slotsToFill <= 0) return [];

        const candidates = [];
        let weekOffset = 0;
        // geramos semana a semana até preencher slots
        while (candidates.length < slotsToFill) {
            const base = addDays(new Date(startDate), 7 * weekOffset);
            base.setHours(0, 0, 0, 0);

            for (let i = 0; i < diasSelecionados.length && candidates.length < slotsToFill; i++) {
                const targetWeekday = diasSelecionados[i];
                // calcula data desta semana para weekday
                const prox = new Date(base);
                const diff = (targetWeekday - prox.getDay() + 7) % 7;
                prox.setDate(prox.getDate() + diff);
                prox.setHours(0, 0, 0, 0);

                // só inclui se for >= startDate (evita pegar dias passados)
                if (prox >= startDate) {
                    const key = prox.toDateString();
                    if (!occupiedSet.has(key)) {
                        candidates.push(new Date(prox));
                    }
                }
            }
            weekOffset++;
            // safety: evita loop infinito (gera até 52 semanas caso necessário)
            if (weekOffset > 52 && candidates.length === 0) break;
        }

        // já vêm em ordem cronológica porque percorremos semanas em ordem
        return candidates.slice(0, slotsToFill);
    }

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

    // Função auxiliar para processar os rascunhos
    const processarRascunhos = (aulas, { carregar = false } = {}) => {
        if (!aulas || aulas.length === 0) {
            setRascunhosDates([]);
            return;
        }

        const datas = aulas.map(a => ({
            id: a.idAula,
            date: new Date(a.dataHorarioInicio)
        }));
        setRascunhosDates(datas);

        if (carregar) {
            const novosHorarios = {};
            aulas.forEach(a => {
                const dateKey = new Date(a.dataHorarioInicio).toISOString();
                const inicio = a.dataHorarioInicio.split("T")[1].slice(0, 5);
                const fim = a.dataHorarioFim.split("T")[1].slice(0, 5);
                novosHorarios[dateKey] = { inicio, fim };
            });
            setHorarios(prev => ({ ...prev, ...novosHorarios }));
            setRascunhosCarregados(true);
        }
    };

    // Remover data (local, dentro do EtapaAgendamentoAula)
    const handleRemoveDateLocal = async (date) => {
        const dateStr = date.toDateString();

        // se é manual
        if (manualDates && manualDates.some(d => d.toDateString() === dateStr)) {
            setManualDates(prev => prev.filter(d => d.toDateString() !== dateStr));
            return;
        }

        // se é rascunho (agora temos id)
        const rascunho = rascunhosDates.find(r => r.date.toDateString() === dateStr);
        if (rascunho) {
            try {
                await caringuApi.delete("/aulas/rascunhos", { data: [rascunho.id] });

                setRascunhosDates(prev => prev.filter(r => r.id !== rascunho.id));
                setSelectedDates(prev => prev.filter(d => d.toDateString() !== dateStr));

                setHorarios(prev => {
                    const copy = { ...prev };
                    delete copy[date.toISOString()];
                    return copy;
                });

                toast.custom(t => (
                    <CustomToast t={t} type="success" message="Aula em rascunho removida." />
                ));
            } catch (error) {
                console.error("Erro ao deletar rascunho:", error);
                toast.custom(t => (
                    <CustomToast t={t} type="error" message="Erro ao excluir aula em rascunho." />
                ));
            }
            return;
        }

        // se é automática
        setSelectedDates(prev => prev.filter(d => d.toDateString() !== dateStr));
    };

    // Buscar disponibilidade + verificar rascunhos
    const getBuscarAulasDisponiveis = async () => {
        try {
            const response = await caringuApi.get(`/aulas/${aluno.idAluno}/disponibilidade`);
            setAulasDisponiveis(response.data);

            const rascunhoRespondido = sessionStorage.getItem("RASCUNHO_RESPONDIDO") === "true";

            if (response.data.aulasRascunho > 0 && !rascunhoRespondido) {
                // só mostra o modal se ainda não respondeu
                setShowRascunhoModal(true);
            }
        } catch (error) {
            console.error("Erro ao buscar aulas disponíveis:", error);
        }
    };

    // Continuar com os rascunhos
    const carregarRascunhos = async () => {
        try {

            const response = await caringuApi.get(`/aulas/${aluno.idAluno}/rascunhos`);

            processarRascunhos(response.data.aulas, { carregar: true });
            setShowRascunhoModal(false);

            sessionStorage.setItem("RASCUNHO_RESPONDIDO", "true")
        } catch (error) {
            console.error("Erro ao buscar aulas em rascunho:", error);
        }
    };

    // Deletar rascunhos
    const deletarRascunhos = async () => {
        try {
            // Buscar rascunhos do backend
            const response = await caringuApi.get(`/aulas/${aluno.idAluno}/rascunhos`);
            const rascunhos = response.data.aulas;

            if (rascunhos.length > 0) {
                // Montar lista de IDs para deletar
                const lista = rascunhos.map(r => r.idAula);

                // Deletar usando a lista correta
                await caringuApi.delete("/aulas/rascunhos", { data: lista });
            }

            // Limpar estado
            setSelectedDates([]);
            setShowRascunhoModal(false);
            setRascunhosCarregados(false);

            sessionStorage.setItem("RASCUNHO_RESPONDIDO", "true");
        } catch (error) {
            console.error("Erro ao deletar aulas em rascunho:", error);
        }
    };

    // Criar aulas como rascunhos
    const criarAulasRascunho = async (listaAulas) => {
        try {
            await caringuApi.post(`/aulas/${aluno.idAluno}/rascunhos`, {
                aulas: listaAulas

            });

            if (typeof atualizarAlunos === "function") {
                atualizarAlunos();
            }

            onProsseguir();
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message={`Erro ao criar aulas em rascunho - ${error.response.data.message}`} />
            ));
            console.error("Erro ao criar aulas em rascunho:", error);
        }
    };

    useEffect(() => {
        getBuscarAulasDisponiveis();

        const exibirAulas = async () => {
            try {
                const response = await caringuApi.get(`/aulas/alunos-aulas/${aluno.idAluno}`);
                const datas = response.data.map(aula =>
                    new Date(aula.dataHorarioInicio).toDateString()
                );
                setDatasAulasBloqueadas(datas);

                console.log("Aulas do aluno selecionado:", response.data);
            } catch (error) {
                console.error("Erro ao exibir aulas:", error);
            }
        };

        exibirAulas();
    }, [aluno.idAluno]);

    // manualDates vem via props do ModalAgendarAula
    useEffect(() => {
        // se não temos disponibilidade ainda, não faz nada
        if (!aulasDisponiveis || typeof aulasDisponiveis.aulasRestantes !== 'number') {
            setGeneratedDates([]);
            // mas mantém rascunhos e manuais
            setSelectedDates(prev => {
                // garante que selectedDates contenha rascunhos e manuais (pelo menos)
                return prev;
            });
            return;
        }

        const start = brasiliaToday ?? new Date();

        // occupied = rascunhos + manuais (strings "Tue Sep 30 2025")
        const occupiedKeys = new Set([
            ...rascunhosDates.map(r => r.date.toDateString()),
            ...(manualDates || []).map(d => d.toDateString())
        ])

        const occupiedCount = occupiedKeys.size;
        const totalAllowed = aulasDisponiveis.aulasRestantes; // já considera confirmadas/rascunhos
        const slotsToFill = Math.max(0, totalAllowed - occupiedCount);

        // gera apenas as N datas necessárias (excluindo já ocupadas)
        const novasGeradas = getNextAvailableDates(diasSelecionados, slotsToFill, start, occupiedKeys);

        // atualiza generatedDates
        setGeneratedDates(novasGeradas);

        // monta selectedDates = union(rascunhos + manuais + geradas), sem duplicatas, ordenado
        const all = [
            ...rascunhosDates.map(r => new Date(r.date)),
            ...(manualDates || []).map(d => new Date(d)),
            ...novasGeradas
        ];

        // dedupe e ordenar
        const unique = all
            .filter((d, idx, arr) => idx === arr.findIndex(o => o.toDateString() === d.toDateString()))
            .sort((a, b) => a - b);

        setSelectedDates(unique);
        setCheckedDates([]); // resetar checks ao recalcular
    }, [diasSelecionados, aulasDisponiveis, manualDates, rascunhosDates]);

    const montarAulasParaEnvio = () => {
        return {
            aulas: selectedDates
                .filter(date => horarios[date.toISOString()])
                .map(date => {
                    const { inicio, fim } = horarios[date.toISOString()];
                    const dataStr = date.toISOString().slice(0, 10);
                    return {
                        dataHorarioInicio: `${dataStr}T${inicio}:00`,
                        dataHorarioFim: `${dataStr}T${fim}:00`
                    };
                })
        };
    };

    return (
        <>
            {showRascunhoModal && (
                <div className="fixed inset-0 flex items-center justify-center 
                  bg-black/30 backdrop-brightness-50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold mb-4 text-center">
                            Você possui {aulasDisponiveis.aulasRascunho} aula(s) em rascunho.
                        </h2>
                        <p className="text-center mb-6">
                            Deseja continuar com essas aulas ou descartá-las?
                        </p>
                        <div className="flex justify-around">
                            <Button
                                texto="Continuar"
                                cor="var(--azul-claro)"
                                corTexto="white"
                                classNameExtra="p-3"
                                onClick={carregarRascunhos}
                            />
                            <Button
                                texto="Deletar"
                                cor="var(--cor-secundaria)"
                                corTexto="#B41F1F"
                                classNameExtra="p-3"
                                onClick={deletarRascunhos}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div>
                <div className="flex flex-row gap-2 mt-12 md:mt-3 text-base sm:text-lg 2xl:text-2xl">
                    <span className="text-[var(--laranja)] font-semibold">
                        {rascunhosCarregados && aulasDisponiveis.aulasRascunho > 0 ? (
                            <>
                                {aulasDisponiveis.aulasRestantes} restantes |{" "}
                                {aulasDisponiveis.aulasRascunho} rascunho(s)
                            </>
                        ) : (
                            aulasDisponiveis.aulasRestantes
                        )}
                    </span>
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
                        tileClassName={({ date, view }) => {
                            if (view === 'month' && datasAulasBloqueadas.includes(date.toDateString())) {
                                return 'bg-[#E96E354F] text-black rounded-full'; // ou sua classe customizada
                            }
                            if (view === 'month' && date < brasiliaToday) {
                                return 'text-gray-400';
                            }
                            if (selectedDates.some(d => d.toDateString() === date.toDateString())) {
                                return 'bg-orange-500 cursor-pointer text-white rounded-full border-orange-500 border-2 border-solid';
                            }
                            if (date.toDateString() === brasiliaToday.toDateString()) {
                                return 'rounded-full';
                            }
                            return 'cursor-pointer';
                        }}
                        tileDisabled={({ date, view }) => {
                            return view === 'month' && datasAulasBloqueadas.includes(date.toDateString());
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
                                {[...selectedDates]
                                    .sort((a, b) => {
                                        const horarioA = horarios[a.toISOString()]?.inicio || "23:59";
                                        const horarioB = horarios[b.toISOString()]?.inicio || "23:59";

                                        // compara primeiro pela data
                                        if (a.toDateString() !== b.toDateString()) {
                                            return a - b; // data mais próxima vem primeiro
                                        }
                                        // se a data for igual, compara pelo horário
                                        return horarioA.localeCompare(horarioB);
                                    })
                                    .map((data) => (
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
                                                            handleRemoveDateLocal(data);
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
                            <ButtonLoading
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
                    <ButtonLoading
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
                            console.log({
                                ...dadosParaEnvio,
                                diasSemanaMarcados: diasSemana.filter(d => diasSelecionados.includes(d.value))
                            });
                            atualizarAgendamento({
                                ...dadosParaEnvio,
                                diasSemanaMarcados: diasSemana.filter(d => diasSelecionados.includes(d.value))
                            });
                            criarAulasRascunho(dadosParaEnvio.aulas);
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