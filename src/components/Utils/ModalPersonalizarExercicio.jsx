import React from "react";
import Label from "../Utils/Label";
import Button from "../Utils/Button";
import InputEditar from "./InputEditar";

const ModalPersonalizarExercicio = ({
    visivel,
    onClose,
    onSubmit,
    register,
    handleSubmit,
    errors,
    exercicio,
    isValidYoutubeUrl,
}) => {
    if (!visivel) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
            <div className="absolute inset-0 bg-[#000000] opacity-50" aria-label="Fundo Escurecido"></div>
            <div className="relative p-4 w-full max-w-2xl md:max-w-[1300px]">
                <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                    <div className="flex justify-between items-center pb-4 mb-4">
                        <h3 className="text-4xl font-semibold text-[var(--cor-primaria)]">
                            Personalizar exercício
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-[#B41F1F] text-[var(--cor-secundaria)] rounded-lg w-10 h-10 absolute top-2 right-2 flex items-center justify-center cursor-pointer hover:bg-[#921c1c]"
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
                        <div className="flex w-full">
                            <div className="flex flex-col w-[65%] m-5">
                                <div className="grid grid-cols-2 mb-4 w-full">
                                    {/* Coluna Esquerda */}
                                    <div className="grid-span-1 flex flex-col gap-10 w-1/2">
                                        <div>
                                            <Label id="carga" nomeLabel="Carga" fontSize="20px" fontWeight="500" />
                                            <InputEditar
                                                id="carga"
                                                name="carga"
                                                inputType="number"
                                                placeholder="Ex.: 20"
                                                {...register('carga', {
                                                    required: 'A carga é obrigatória',
                                                    valueAsNumber: true,
                                                    min: { value: 1, message: 'A carga deve ser maior que 0' },
                                                })}
                                                isError={!!errors.carga}
                                                errorMessage={errors.carga?.message}
                                            />
                                        </div>

                                        <div>
                                            <Label id="series" nomeLabel="Séries" fontSize="20px" fontWeight="500" />
                                            <InputEditar
                                                id="series"
                                                name="series"
                                                inputType="number"
                                                placeholder="Ex.: 4"
                                                {...register('series', {
                                                    required: 'As séries são obrigatórias',
                                                    valueAsNumber: true,
                                                    min: { value: 1, message: 'A série deve ser maior que 0' },
                                                })}
                                                isError={!!errors.series}
                                                errorMessage={errors.series?.message}
                                            />
                                        </div>
                                    </div>

                                    {/* Coluna Direita */}
                                    <div className="grid-span-1 flex flex-col gap-10 w-full">
                                        <div>
                                            <Label id="repeticoes" nomeLabel="Repetições" fontSize="20px" fontWeight="500" />
                                            <InputEditar
                                                id="repeticoes"
                                                name="repeticoes"
                                                inputType="number"
                                                placeholder="Ex.: 12"
                                                {...register('repeticoes', {
                                                    required: 'As repetições são obrigatórias',
                                                    valueAsNumber: true,
                                                    min: { value: 1, message: 'As repetições devem ser maiores que 0' },
                                                })}
                                                isError={!!errors.repeticoes}
                                                errorMessage={errors.repeticoes?.message}
                                            />
                                        </div>

                                        <div>
                                            <div>
                                                <Label
                                                    id="tempoDescanso"
                                                    nomeLabel="Tempo de descanso"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <span className='text-[14px]'> (segundos)</span>
                                            </div>
                                            <InputEditar
                                                id="tempoDescanso"
                                                name="tempoDescanso"
                                                inputType="number"
                                                placeholder="Ex.: 60"
                                                {...register('tempoDescanso', {
                                                    required: 'O tempo de descanso é obrigatório',
                                                    valueAsNumber: true,
                                                    min: { value: 1, message: 'O descanso deve ser maior que 0' },
                                                })}
                                                isError={!!errors.tempoDescanso}
                                                errorMessage={errors.tempoDescanso?.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Coluna de vídeo e dados do exercício */}
                            <div className="flex flex-col w-[35%] h-[40%] m-5 gap-5">
                                <div className="bg-gray-400 w-full h-[40%] flex items-center justify-center rounded-lg">
                                    {(() => {
                                        const url = exercicio?.urlVideo || exercicio?.videoUrl;

                                        if (!url) {
                                            return <h1>Vídeo não disponível</h1>;
                                        } else if (url.toLowerCase().endsWith(".gif")) {
                                            return (
                                                <div className="w-full aspect-[16/9] rounded-lg flex items-center justify-center">
                                                    <img
                                                        src={url}
                                                        alt="GIF demonstrativo"
                                                        className="w-full h-full object-contain rounded-lg"
                                                    />
                                                </div>
                                            )
                                        } else if (isValidYoutubeUrl(url)) {
                                            return (
                                                <iframe
                                                    className="w-full h-full rounded-lg"
                                                    src={url}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                />
                                            );
                                        } else {
                                            return <h1>Vídeo não disponível</h1>;
                                        }
                                    })()}
                                </div>
                                <div className="grid-span-1 w-full">
                                    <p><b>Nome:</b> {exercicio?.nomeExercicio || exercicio?.nome}</p>
                                    <p><b>Origem:</b> {exercicio?.origemExercicio || exercicio?.origem}</p>
                                    <p><b>Grupo muscular:</b> {exercicio?.grupoMuscular}</p>
                                    <p><b>Observações:</b> {exercicio?.observacoes || 'Sem observações'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Botões */}
                        <div className="flex flex-col items-center sm:flex-row mt-5 gap-4 w-full justify-center">
                            <Button
                                texto="Cancelar"
                                type="button"
                                corTexto="#B41F1F"
                                cor="var(--cor-secundaria)"
                                height="2.75rem"
                                width="13.25rem"
                                fontWeight="500"
                                aria-label="Botão de Cancelar"
                                onClick={onClose}
                                borderStyle={"solid"}
                                borderWidth={"2px"}
                                borderColor={"#B41F1F"}
                            />
                            <Button
                                type="submit"
                                texto="Salvar"
                                corTexto="var(--cor-secundaria)"
                                cor="#46982B"
                                height="2.75rem"
                                width="9.2rem"
                                fontWeight="600"
                                aria-label="Botão de Salvar"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalPersonalizarExercicio;