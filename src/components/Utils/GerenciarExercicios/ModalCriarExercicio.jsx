import React from "react";
import { useForm } from "react-hook-form";
import InputPosLogin from "../../Utils/InputPosLogin";
import InputAnamnese from "../../Utils/GerenciarAlunos/InputAnamnese";
import Label from "../../Utils/Label";
import Button from "../Button";
import info2 from "../../../assets/images/info-2.svg";

const ModalCriarExercicio = ({ onClose, onSubmit, isVisible, setModalConfirmarCancelarVisivel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-40 flex justify-center items-center overflow-y-auto">
            <div className="absolute inset-0 bg-[#000000] opacity-50" aria-label="Fundo Escurecido"></div>
            <div className="relative p-4 w-full max-w-2xl">
                <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                    <div className="flex justify-between items-center pb-4 mb-4">
                        <h1 className="text-4xl font-semibold text-[var(--cor-primaria)]">Criar Exercício</h1>
                        <button
                            type="button"
                            onClick={() => setModalConfirmarCancelarVisivel(true)}
                            className="bg-[#B41F1F] text-[var(--cor-secundaria)] rounded-lg text-xs sm:text-sm cursor-pointer w-10 h-10 absolute top-2 right-2 flex justify-center items-center"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 mb-4">
                            <Label id="nome" nomeLabel="Nome" fontSize="20px" fontWeight="500" />
                            <InputAnamnese
                                id="nome"
                                inputType="text"
                                placeholder="Digite o nome do exercício"
                                {...register("nome", {
                                    required: "O nome do exercício é obrigatório",
                                    minLength: {
                                        value: 3,
                                        message: "O nome deve ter pelo menos 3 caracteres",
                                    },
                                })}
                                isError={!!errors.nome}
                                errorMessage={errors.nome?.message}
                            />

                            <Label id="urlVideo" nomeLabel="URL do vídeo" fontSize="20px" fontWeight="500" />
                            <InputAnamnese
                                id="urlVideo"
                                inputType="text"
                                placeholder="Insira o URL do vídeo do exercício"
                                {...register("urlVideo", {
                                    required: false,
                                    pattern: {
                                        value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
                                        message: "Insira uma URL válida",
                                    },
                                })}
                                isError={!!errors.urlVideo}
                                errorMessage={errors.urlVideo?.message}
                            />

                            <Label id="grupoMuscular" nomeLabel="Grupo muscular" fontSize="20px" fontWeight="500" />
                            <select
                                id="grupoMuscular"
                                defaultValue={""}
                                {...register("grupoMuscular", { required: "O grupo muscular é obrigatório" })}
                                className="border border-gray-300 rounded-md px-4 py-2"
                            >
                                <option value="" disabled={true}>Selecione...</option>
                                <option value="PEITORAL">Peitoral</option>
                                <option value="COSTAS">Costas</option>
                                <option value="PERNAS">Pernas</option>
                                <option value="OMBRO">Ombro</option>
                                <option value="BRACO">Braço</option>
                                <option value="CORE">Core</option>
                                <option value="CARDIO">Cardio</option>
                            </select>

                            {errors.grupoMuscular && (
                                <div className="flex items-center gap-2">
                                    <img
                                        src={info2}
                                        alt="Erro"
                                        className="w-4.5 h-4.5"
                                    />
                                    <span className="text-[#D45C56]">{errors.grupoMuscular.message}</span>
                                </div>
                            )}

                            <Label id="observacoes" nomeLabel="Observações" fontSize="20px" fontWeight="500" />
                            <InputAnamnese
                                id="observacoes"
                                inputType="text"
                                placeholder="Observações sobre o exercício"
                                {...register("observacoes", {
                                    minLength: {
                                        value: 3,
                                        message: "As observações devem ter pelo menos 3 caracteres",
                                    },
                                })}
                                isError={!!errors.observacoes}
                                errorMessage={errors.observacoes?.message}
                            />
                        </div>

                        <div className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center">
                            <Button
                                texto="Cancelar"
                                corTexto="#B41F1F"
                                type="button"
                                cor="var(--cor-secundaria)"
                                height="2.75rem"
                                width="13.25rem"
                                fontWeight="500"
                                onClick={() => setModalConfirmarCancelarVisivel(true)}
                            />
                            <Button
                                texto="Salvar"
                                corTexto="var(--cor-secundaria)"
                                cor="#46982B"
                                height="2.75rem"
                                width="9.2rem"
                                fontWeight="600"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalCriarExercicio;