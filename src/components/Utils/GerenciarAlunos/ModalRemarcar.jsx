import React, { useState } from "react";
import Button from "../Button";
import Input from '../Inputs';
import { useForm } from "react-hook-form";


const ModalRemarcar = ({
    visivel,
    fecharModal,
    onConfirm,
    agendamento,
    ariaLabel = "Modal de Remarcar Agendamento"
}) => {
    const [novaData, setNovaData] = useState("");
    const [novoHorario, setNovoHorario] = useState("");


    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();

    const onSubmit = (data) => {
        if (onConfirm) {
            onConfirm({
                id: agendamento?.id,
                novaData: data.data,
                novoHorario: data.horario,
                dataHora: `${data.data} ${data.horario}`
            });
        }
    };


    const handleFechar = () => {
        setNovaData("");
        setNovoHorario("");
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

            <div aria-label="Modal com conteúdo dentro" className="relative p-4  w-2xl h-100 md:h-110 2xl:h-125">
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
                    <div aria-label="Texto de apoio e Botões" className="flex flex-col items-start text-center w-full  px-15">
                        <h1 aria-label="Título" className="text-[var(--cor-primaria)] font-bold text-[18px] sm:text-[24px] md:text-[32px] ">Remarcar Aula</h1>
                        <div className="flex flex-col w-full items-start mt-5">
                            <span className="text-xl">
                                Email do Aluno
                            </span>
                            <span className="text-[#15171B87]">
                                mariagladys@gmail.com
                            </span>
                        </div>
                        <div className="w-full h-55 flex flex-col items-center justify-end">
                            <form className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col w-full py-2 border-2 rounded-2xl border-[#1D2D441A]" aria-label="Inputs de Data e Horário">
                                    <div>
                                        <span className="text-xl font-medium">
                                            Escolha a data e horário para reposição da aula
                                        </span>
                                    </div>
                                    <div className="w-full flex flex-row items-center justify-center gap-15" aria-label="Inputs de Data e Horário">
                                        <div className="w-[30%] h-auto ">
                                            <Input
                                                id="data"
                                                name="data"
                                                type="date"
                                                marginBottomLinha="1.55rem"
                                                margin="25px auto 0px 0px"
                                                corBordaInput={"#ccc"}
                                                {...register('data', { required: 'Data é obrigatória' })}
                                                isError={!!errors.data}
                                                errorMessage={errors.data?.message}
                                            />
                                        </div>
                                        <div className="w-[30%] h-auto">
                                            <select
                                                id="horario"
                                                name="horario"
                                                {...register('horario', { required: 'Horário é obrigatório' })}
                                                className="w-full p-2 rounded-md focus:border-[var(--cor-primaria)] focus:outline-none bg-transparent"
                                                style={{
                                                    borderWidth: "2px",
                                                    borderStyle: "solid",
                                                    borderColor: "#1D2D441A",
                                                    backgroundColor: "transparent"
                                                }}                                        >
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
                                            {errors.horario && (
                                                <span className="text-red-500 text-xs">{errors.horario.message}</span>
                                            )}
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