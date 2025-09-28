import React, { useState, useEffect } from "react";
import EtapaAgendamentoAula from "../../components/Utils/GerenciarAlunos/EtapaAgendamentoAula"
import EtapaAtribuicao from "../../components/Utils/GerenciarAlunos/EtapaAtribuicaoTreinos"
import CardAluno from "../../components/Utils/GerenciarAlunos/CardAluno";
import { addDays, isAfter } from "date-fns";
import { AgendamentoProvider, useAgendamento } from "./GerenciarAlunos/Context/AgendamentoContext";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import CustomToast from '../Utils/CustomToast';
import { caringuApi } from "../../provider/caringuApi";

const ModalAgendarAula = ({
    fecharModal,
    ariaLabel,
    aluno
}) => {
    const getToday = () => {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const brasilia = new Date(utc - (3 * 60 * 60 * 1000));
        brasilia.setHours(0, 0, 0, 0);
        return brasilia;
    }
    const brasiliaToday = getToday();
    const [date, setDate] = useState(new Date());
    const [openMenuId, setOpenMenuId] = useState(null);
    const [imgErro, setImgErro] = useState(false);
    const [checkedDates, setCheckedDates] = useState([]);
    const [horarios, setHorarios] = useState({});
    const [selectedDates, setSelectedDates] = useState([]);
    const [horarioInicio, setHorarioInicio] = useState("");
    const [horarioFim, setHorarioFim] = useState(""); ''
    const todosHorariosPreenchidos = selectedDates.length > 0 &&
        selectedDates.every(d => horarios[d.toISOString()]);
    const [diasSelecionados, setDiasSelecionados] = useState([]);
    const [aulasDisponiveis, setAulasDisponiveis] = useState({})

    const currentAlunos = [aluno];

    const handleDateClick = (clickedDate) => {
        const dateStr = clickedDate.toDateString();
        const isSelected = selectedDates.some(d => d.toDateString() === dateStr);

        if (!isSelected && selectedDates.length >= aluno.quantidade_aulas) {

            toast.custom((t) => (
                <CustomToast t={t} type="error" message={`Você só pode selecionar até ${aluno.quantidade_aulas} datas.`} />
            ));
            return;
        }

        if (isSelected) {

            setSelectedDates(selectedDates.filter(d => d.toDateString() !== dateStr));
        } else {

            setSelectedDates([...selectedDates, clickedDate]);
        }
    };

    const handleRemoveDate = (dateToRemove) => {
        setSelectedDates(selectedDates.filter(d => d.toDateString() !== dateToRemove.toDateString()));
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setCheckedDates(selectedDates.map(d => d.toISOString()));
        } else {
            setCheckedDates([]);
        }
    };

    const handleCheck = (date) => {
        const iso = date.toISOString();
        if (checkedDates.includes(iso)) {
            setCheckedDates(checkedDates.filter(d => d !== iso));
        } else {
            setCheckedDates([...checkedDates, iso]);
        }
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const diasSemana = [
        { value: "segunda", label: "Todas as Segundas-feiras" },
        { value: "terca", label: "Todas as Terças-feiras" },
        { value: "quarta", label: "Todas as Quartas-feiras" },
        { value: "quinta", label: "Todas as Quintas-feiras" },
        { value: "sexta", label: "Todas as Sextas-feiras" },
        { value: "sabado", label: "Todos os Sábados" },
        { value: "domingo", label: "Todos os Domingos" },
    ];

    const handleToggleDropdown = () => setShowDropdown(!showDropdown);

    const handleCheckDia = (value) => {
        if (diasSelecionados.includes(value)) {
            setDiasSelecionados(diasSelecionados.filter(d => d !== value));
        } else {
            setDiasSelecionados([...diasSelecionados, value]);
        }
    };

    // Buscar disponibilidade + IDs de rascunhos
    const getBuscarAulasDisponiveis = async () => {
        try {
            const response = await caringuApi.get(`/aulas/${aluno.idAluno}/disponibilidade`);
            setAulasDisponiveis(response.data);
            console.log("AulasDisponivei32s3232: ");
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar aulas disponíveis:", error);
        }
    };

    useEffect(() => {
        getBuscarAulasDisponiveis();
    }, []);

    function getNextDatesFromWeekdays(weekdays, totalAulas, startDate = new Date()) {
        const diasMap = {
            'domingo': 0,
            'segunda': 1,
            'terca': 2,
            'terça': 2,
            'quarta': 3,
            'quinta': 4,
            'sexta': 5,
            'sabado': 6,
            'sábado': 6,
        };

        const diasSelecionados = weekdays.map(d => diasMap[d.toLowerCase()]).sort((a, b) => a - b);

        let datas = [];
        let dataAtual = new Date(startDate);
        dataAtual.setHours(0, 0, 0, 0);

        while (datas.length < totalAulas) {
            for (let i = 0; i < diasSelecionados.length && datas.length < totalAulas; i++) {
                let prox = new Date(dataAtual);
                let add = (diasSelecionados[i] - prox.getDay() + 7) % 7;
                if (add === 0 && datas.length === 0 && isAfter(prox, startDate)) add = 7;
                prox = addDays(prox, add);
                prox.setHours(0, 0, 0, 0);
                if (isAfter(prox, startDate) || prox.getTime() === startDate.setHours(0, 0, 0, 0)) {
                    datas.push(new Date(prox));
                }
                dataAtual = addDays(prox, 1);
            }
        }
        return datas.slice(0, totalAulas);
    }

    useEffect(() => {
        if (diasSelecionados.length > 0) {
            const novasDatas = getNextDatesFromWeekdays(
                diasSelecionados,
                aulasDisponiveis.aulasRestantes,
                getToday()
            );

            // 🔑 junta as datas antigas (rascunhos, manuais) com as novas
            setSelectedDates(prev => {
                const todas = [...prev, ...novasDatas];
                // remove duplicatas (mesma data no calendário)
                const unicas = todas.filter(
                    (d, idx, arr) =>
                        idx === arr.findIndex(o => o.toDateString() === d.toDateString())
                );
                return unicas;
            });

            setCheckedDates([]);
        } else {
            // Se desmarcar tudo, só mantém os rascunhos que já estavam
            setSelectedDates(prev =>
                prev.filter(d => horarios[d.toISOString()]) // mantém as que têm horário (rascunhos)
            );
            setCheckedDates([]);
        }
    }, [diasSelecionados]);

    const handleSalvarHorarios = () => {
        if (!horarioInicio || !horarioFim) return;
        const novosHorarios = { ...horarios };
        checkedDates.forEach(dateIso => {
            novosHorarios[dateIso] = {
                inicio: horarioInicio,
                fim: horarioFim
            };
        });
        setHorarios(novosHorarios);
        setCheckedDates([]);
    };

    const [etapa, setEtapa] = useState(1);
    return (
        <AgendamentoProvider>
            {/* Modal */}
            <div
                id="popup-modal"
                tabIndex="-1"
                className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
                aria-label={ariaLabel}
            >
                <div className="absolute inset-0 bg-[#000000] opacity-50"
                    aria-label="Fundo Escurecido"
                ></div>
                <div aria-label="Modal com conteúdo dentro" className="relative p-4 2xl:p-10 bg-[var(--cor-secundaria)] rounded-[6px] h-[95%] w-[95%] lg:w-[70%] 2xl:w-[60%] flex flex-col justify-start items-center">
                    {/* Conteúdo do modal */}
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 h-auto w-full sticky top-0 bg-[var(--cor-secundaria)] z-10 pt-2 pb-2">
                            <div className="flex flex-row gap-2.5 w-full md:w-90 h-auto  items-center justify-center md:justify-start">
                                <span className={`w-8 h-8 flex items-center justify-center rounded-full ${etapa === 1 ? "bg-[var(--azul-escuro)]" : "bg-[#15171B3D]"} text-white`}>
                                    1
                                </span>
                                <span className={`text-sm 2xl:text-base font-bold ${etapa === 1 ? "" : "text-[#15171B3D]"}`}>
                                    Agendamentos de Aulas
                                </span>
                            </div>
                            <span className="h-6 md:h-1 w-0.5 md:w-15 bg-[#15171B3D] rounded-2xl"></span>
                            <div className="flex flex-row gap-2.5 w-full h-auto  items-center justify-center md:justify-start pl-0 md:pl-4">
                                <span className={`w-8 h-8 flex items-center justify-center rounded-full ${etapa === 2 ? "bg-[var(--azul-escuro)]" : "bg-[#15171B3D]"} text-white`}>
                                    2
                                </span>
                                <span className={`text-sm 2xl:text-base font-bold ${etapa === 2 ? "" : "text-[#15171B3D]"}`}>
                                    Atribuição de Treinos
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex-1 overflow-y-auto flex flex-col items-center md:items-start gap-0 md:gap-1">
                            <div className="mt-8 md:mt-1 w-auto md:w-full">
                                <h1 className="text-base md:text-[24px] 2xl:text-[32px] font-semibold">
                                    Agendar Aulas
                                </h1>
                            </div>
                            <div className=" w-[80%] md:w-[65%] h-80 sm:h-40 xl:h-50 2xl:h-35 flex flex-col justify-center md:justify-start">
                                <CardAluno
                                    key={aluno.idAluno}
                                    aluno={aluno}
                                    openMenuId={openMenuId}
                                    setOpenMenuId={setOpenMenuId}
                                    imgErro={imgErro}
                                    setImgErro={setImgErro}
                                    totalCards={currentAlunos.length}
                                    origemUso="ModalAgendarAula"
                                    origemUsoOption="ModalAgendarAula"
                                    alinhamentoCard="justify-center"
                                    heightCardInterno="100%"
                                    gapConteudo="gap-4"
                                    heightCardInternoWeb="100%"
                                />
                            </div>
                            <Toaster position="top-right" reverseOrder={false} />
                            {etapa === 1 && (
                                <EtapaAgendamentoAula
                                    aluno={aluno}
                                    currentAlunos={currentAlunos}
                                    brasiliaToday={brasiliaToday}
                                    date={date}
                                    setDate={setDate}
                                    openMenuId={openMenuId}
                                    setOpenMenuId={setOpenMenuId}
                                    imgErro={imgErro}
                                    setImgErro={setImgErro}
                                    checkedDates={checkedDates}
                                    setCheckedDates={setCheckedDates}
                                    horarios={horarios}
                                    setHorarios={setHorarios}
                                    selectedDates={selectedDates}
                                    setSelectedDates={setSelectedDates}
                                    horarioInicio={horarioInicio}
                                    setHorarioInicio={setHorarioInicio}
                                    horarioFim={horarioFim}
                                    setHorarioFim={setHorarioFim}
                                    todosHorariosPreenchidos={todosHorariosPreenchidos}
                                    diasSelecionados={diasSelecionados}
                                    setDiasSelecionados={setDiasSelecionados}
                                    showDropdown={showDropdown}
                                    setShowDropdown={setShowDropdown}
                                    handleDateClick={handleDateClick}
                                    handleRemoveDate={handleRemoveDate}
                                    handleSelectAll={handleSelectAll}
                                    handleCheck={handleCheck}
                                    handleToggleDropdown={handleToggleDropdown}
                                    handleCheckDia={handleCheckDia}
                                    handleSalvarHorarios={handleSalvarHorarios}
                                    diasSemana={diasSemana}
                                    fecharModal={fecharModal}
                                    onProsseguir={() => setEtapa(2)}
                                />
                            )}
                            {etapa === 2 && (
                                <EtapaAtribuicao
                                    aluno={aluno}
                                    diasSelecionados={diasSelecionados}
                                    setDiasSelecionados={setDiasSelecionados}
                                    datasAleatorias={selectedDates.map(d => {
                                        const dia = String(d.getDate()).padStart(2, '0');
                                        const mes = String(d.getMonth() + 1).padStart(2, '0');
                                        const ano = d.getFullYear();
                                        return `${dia}/${mes}/${ano}`;
                                    })}
                                    datasSelecionadas={checkedDates}
                                    setDatasSelecionadas={setCheckedDates}
                                    showDropdown={showDropdown}
                                    setShowDropdown={setShowDropdown}
                                    diasSemana={diasSemana}
                                    handleCheckDia={handleCheckDia}
                                    onVoltar={() => setEtapa(1)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AgendamentoProvider>
    );
}

export default ModalAgendarAula;