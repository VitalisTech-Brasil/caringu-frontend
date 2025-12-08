import React, { useState, useEffect } from "react";
import Button from "../Button";
import Input from '../Inputs';
import { useForm } from "react-hook-form";
import Label from "../Label";
import { caringuApi } from "../../../provider/caringuApi";
import toast from 'react-hot-toast';
import CustomToast from '../../../components/Utils/CustomToast';


const ModalRemarcar = ({
    visivel,
    fecharModal,
    onConfirm,
    agendamento,
    ariaLabel = "Modal de Remarcar Agendamento",
    atualizarCalendario
}) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    function toBrasiliaISOString(dateStr, timeStr) {
        const [year, month, day] = dateStr.split('-').map(Number);
        const [hour, minute] = timeStr.split(':').map(Number);
        const date = new Date(Date.UTC(year, month - 1, day, hour + 3, minute));
        date.setUTCHours(date.getUTCHours() - 3);
        return date.toISOString();
    }


    const onSubmit = async () => {
        // Monta os campos para o backend
        const idAula = agendamento?.id;
        const idTreinoNovo = agendamentoCompleto?.idTreino;
        const novoHorarioInicio = toBrasiliaISOString(dataAula, horarioInicio);
        const novoHorarioFim = toBrasiliaISOString(dataAula, horarioFim);

        const now = new Date();
        const pad = (n) => n.toString().padStart(2, '0');
        const brasiliaDateStr = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
        const brasiliaTimeStr = pad(now.getHours()) + ':' + pad(now.getMinutes());
        const agoraBrasiliaISO = toBrasiliaISOString(brasiliaDateStr, brasiliaTimeStr);

        if (new Date(novoHorarioInicio) <= new Date(agoraBrasiliaISO)) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="O horário de início deve estar no futuro." />
            ));
            return;
        }

        if (horarioFim <= horarioInicio) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="O horário de fim deve ser após o horário de início." />
            ));
            return;
        }

        const payload = {
            idAula,
            idTreinoNovo,
            novoHorarioInicio,
            novoHorarioFim
        };

        try {
            await caringuApi.put('/aulas-treinos-exercicios/remarcar', payload);
            if (onConfirm) onConfirm(payload);
            if (atualizarCalendario) atualizarCalendario();

            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Aula remarcada com sucesso!" />
            ));
            if (fecharModal) fecharModal();
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao remarcar aula" />
            ));
            console.error(error);
        }
    };



    const [agendamentoCompleto, setAgendamentoCompleto] = useState(null);
    const [treinosPersonal, setTreinosPersonal] = useState([]);
    const [horarioInicio, setHorarioInicio] = useState("");
    const [horarioFim, setHorarioFim] = useState("");
    const [dataAula, setDataAula] = useState("");


    const today = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    )
        .toISOString()
        .slice(0, 10);
    const pessoaId = sessionStorage.getItem("pessoaId");


    useEffect(() => {
        const fetchData = async () => {
            const idAula = agendamento?.id;
            if (idAula && pessoaId) {
                try {
                    const [aulaRes, treinosRes] = await Promise.all([
                        caringuApi.get(`/aulas/${pessoaId}?idAula=${idAula}`),
                        caringuApi.get(`/treinos-exercicios/personal/${pessoaId}`)
                    ]);
                    setAgendamentoCompleto(aulaRes.data);
                    setTreinosPersonal(treinosRes.data);
                } catch (error) {
                    console.error("Erro ao buscar dados:", error);
                }
            }
        };
        fetchData();
    }, [agendamento?.id, pessoaId]);


    useEffect(() => {
        if (agendamentoCompleto?.dataHorarioInicio && visivel) {
            const data = agendamentoCompleto.dataHorarioInicio.slice(0, 10);
            setDataAula(data);
            setHorarioInicio(agendamentoCompleto.dataHorarioInicio.slice(11, 16));
            setHorarioFim(agendamentoCompleto.dataHorarioFim.slice(11, 16));
            setValue('data', data);
        }
    }, [agendamentoCompleto?.dataHorarioInicio, agendamentoCompleto?.dataHorarioFim, visivel, setValue]);

    const handleFechar = () => {
       
        if (fecharModal) fecharModal();
    };

    if (!visivel) return null;

    return (
        <div
            id="popup-modal"
            tabIndex="-1"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
            aria-label={ariaLabel}
        >
            <div className="absolute inset-0 bg-[#000000] opacity-50"
                aria-label="Fundo Escurecido"
            ></div>

            <div aria-label="Modal com conteúdo dentro" className="relative p-4 w-[85%] xl:w-[60%] h-180">
                <div aria-label="Fechar Modal" className="relative bg-[var(--cor-secundaria)] rounded-[6px] h-full flex flex-col justify-center items-center">
                    {/* Botão para fechar o modal */}
                    <button
                        type="button"
                        onClick={handleFechar}
                        aria-label="Botão de Fechar Modal"
                        className="absolute top-2 right-2 text-[var(--cor-secundaria)] bg-[#B41F1F] cursor-pointer rounded-lg text-sm w-10 h-10 md:w-13 md:h-13 inline-flex justify-center items-center"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-label="Ícone de Fechar"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                    </button>

                    {/* Conteúdo do modal */}
                    <div aria-label="Texto de apoio e Botões" className="flex flex-col items-start text-center w-full h-auto px-4 sm:px-15">
                        <h1 aria-label="Título" className="text-[var(--cor-primaria)] font-bold text-[18px] sm:text-[24px] md:text-[32px] ">Remarcar Aula</h1>
                        <div className="flex flex-col w-full items-start mt-1 sm:mt-5 h-auto">
                            <span className="text-base sm:text-xl">
                                Email do Aluno
                            </span>
                            <span className="text-[#15171B87]">
                                {agendamentoCompleto?.emailAluno}
                            </span>
                        </div>
                        <div className="w-full h-auto flex flex-col items-center justify-end">
                            <form className="flex flex-col gap-4 w-full h-auto" onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col py-2 mt-4 border-2 rounded-2xl border-[#1D2D441A] h-auto  w-full 2xl:w-[75%]" aria-label="Inputs de Data e Horário">
                                    <div>
                                        <span className="text-sm sm:text-base md:text-xl font-medium">
                                            Escolha a data e horário para reposição da aula
                                        </span>
                                    </div>
                                    <div className="w-full flex flex-col md:flex-row items-center md:justify-center gap-3 md:gap-15" aria-label="Inputs de Data e Horário">
                                        <div className="w-[80%] md:w-[23%] h-auto flex flex-col items-start">
                                            <Label
                                                id={"data"}
                                                nomeLabel={"Data:"}
                                                fontWeight={"600"}
                                            />
                                            <Input
                                                id="data"
                                                name="data"
                                                type="date"
                                                marginBottomLinha="1.55rem"
                                                margin="10px auto 0px 0px"
                                                corBordaInput={"#ccc"}
                                                value={dataAula}
                                                min={today}
                                                {...register('data', { required: 'Data é obrigatória' })}
                                                onChange={e => {
                                                    setDataAula(e.target.value);
                                                    setValue('data', e.target.value);
                                                }}
                                                isError={!!errors.data}
                                                errorMessage={errors.data?.message}
                                            />
                                        </div>
                                        <div className="w-[80%] md:w-[23%] h-auto flex flex-col items-start">
                                            <Label
                                                id={"horarioInicio"}
                                                nomeLabel={"Início:"}
                                                fontWeight={"600"}
                                            />
                                            <select
                                                id="horarioInicio"
                                                name="horarioInicio"
                                                value={horarioInicio}
                                                {...register('horarioInicio', { required: 'Horário é obrigatório' })}
                                                onChange={e => setHorarioInicio(e.target.value)}
                                                className="w-full  p-1 sm:p-2 rounded-md focus:border-[var(--cor-primaria)] focus:outline-none bg-transparent"
                                                style={{
                                                    borderWidth: "2px",
                                                    borderStyle: "solid",
                                                    borderColor: "#1D2D441A",
                                                    backgroundColor: "transparent"
                                                }}
                                            >
                                                {Array.from({ length: 24 * 2 }, (_, i) => {
                                                    const hour = String(Math.floor(i / 2)).padStart(2, '0');
                                                    const min = i % 2 === 0 ? '00' : '30';
                                                    const value = `${hour}:${min}`;
                                                    return (
                                                        <option key={value} value={value}>
                                                            {value}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {errors.horario && (
                                                <span className="text-red-500 text-xs">{errors.horario.message}</span>
                                            )}
                                        </div>
                                        <div className="w-[80%] md:w-[23%] h-auto flex flex-col items-start">
                                            <Label
                                                id={"horarioFim"}
                                                nomeLabel={"Fim:"}
                                                fontWeight={"600"}
                                            />
                                            <select
                                                id="horarioFim"
                                                name="horarioFim"
                                                value={horarioFim}
                                                {...register('horarioFim', { required: 'Horário é obrigatório' })}
                                                onChange={e => setHorarioFim(e.target.value)}
                                                className="w-full  p-1 sm:p-2 rounded-md focus:border-[var(--cor-primaria)] focus:outline-none bg-transparent"
                                                style={{
                                                    borderWidth: "2px",
                                                    borderStyle: "solid",
                                                    borderColor: "#1D2D441A",
                                                    backgroundColor: "transparent"
                                                }}
                                            >
                                                {Array.from({ length: 24 * 2 }, (_, i) => {
                                                    const hour = String(Math.floor(i / 2)).padStart(2, '0');
                                                    const min = i % 2 === 0 ? '00' : '30';
                                                    return (
                                                        <option key={`${hour}:${min}`} value={`${hour}:${min}`}>
                                                            {hour}:{min}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            {errors.horarioFim && (
                                                <span className="text-red-500 text-xs">{errors.horarioFim.message}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-auto ">
                                    <h1 aria-label="Título" className="text-[var(--cor-primaria)] font-bold text-[18px] sm:text-[24px] md:text-[32px] ">Treino:</h1>
                                    <div className="flex flex-col gap-12 w-full max-h-40 h-auto overflow-y-auto px-4 py-10 border-2 rounded-2xl border-[#1D2D441A] border-solid">
                                        <div className="relative">
                                            <select
                                                className="appearance-none text-sm sm:text-base w-full flex items-center justify-center pt-[1%] pr-[1%] pb-[1%] pl-0 border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]"
                                                value={agendamentoCompleto?.idTreino || ""}
                                                onChange={e => {
                                                    setAgendamentoCompleto(prev => ({
                                                        ...prev,
                                                        idTreino: e.target.value
                                                    }));
                                                }}
                                            >
                                                <option disabled value="">Selecione um Treino</option>
                                                {treinosPersonal.map(t => (
                                                    <option key={t.treinoId} value={t.treinoId}>{t.nomeTreino}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
                                                    <path d="M0.532697 0.412777C-0.177566 0.956418 -0.177566 1.83792 0.532697 2.38154L9.43019 9.18545C10.851 10.2719 13.1531 10.2714 14.5732 9.18461L23.4672 2.37653C24.1776 1.8329 24.1776 0.951407 23.4672 0.407752C22.757 -0.135917 21.6054 -0.135917 20.8952 0.407752L13.2828 6.23469C12.5726 6.77845 11.421 6.77831 10.7107 6.23469L3.10474 0.412777C2.3945 -0.130892 1.24294 -0.130892 0.532697 0.412777Z" fill="#15171B" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div aria-label="Opções de Botões" className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center">
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
                                        onClick={handleFechar}
                                    />
                                    <Button
                                        texto="Salvar"
                                        corTexto="var(--cor-secundaria)"
                                        cor="#46982B"
                                        height="2.75rem"
                                        width="10.5rem"
                                        fontWeight="600"
                                        ariaLabel="Botão de Salvar"
                                        type="submit"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalRemarcar;