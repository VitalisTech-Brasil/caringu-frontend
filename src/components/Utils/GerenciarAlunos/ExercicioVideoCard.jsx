import React, { useState, useEffect, useMemo } from 'react';
import Input from '../../Utils/InputPosLogin';

const extrairYoutubeId = (url) => {
    const m = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
    return m ? m[1] : null;
};

const ExercicioVideoCard = ({
    titulo,
    carga,
    repeticoes,
    grupoMuscular,
    observacoes = '',
    videoUrl,
    tempoDescanso,
    exerciciosFinalizados,
    espacamentoEntreIcons = "justify-start sm:gap-2 gap-4 xl:gap-4",
    larguraVideo = "lg:w-[80%] xl:w-[65%] md:w-[60%] w-full",
    inicialmenteAberto = false,
    desabilitarObservacoes = true,
    origemUso,
}) => {
    const [aberto, setAberto] = useState(inicialmenteAberto);
    const [isPlaying, setIsPlaying] = useState(false);
    const [observacoesLocal, setObservacoesLocal] = useState(observacoes);
    const videoId = useMemo(() => extrairYoutubeId(videoUrl), [videoUrl]);

    const toggle = () => setAberto(v => !v);
    const handlePlay = () => setIsPlaying(true);

    useEffect(() => {
        if (!aberto) setIsPlaying(false);
    }, [aberto]);

    useEffect(() => {
        setObservacoesLocal(observacoes);
    }, [observacoes]);

    function getTituloStyle(exerciciosFinalizados) {
        return {
            color: exerciciosFinalizados ? '#C5C8C6' : 'var(--laranja)',
            textDecoration: exerciciosFinalizados ? 'line-through' : 'none'
        };
    }

    function getIndicadorStyle(exerciciosFinalizados) {
        return {
            color: exerciciosFinalizados ? '#C5C8C6' : 'var(--cor-primaria)',
        };
    }

    function getIconIndicadorStyle(exerciciosFinalizados) {
        return exerciciosFinalizados ? '#C5C8C6' : 'var(--azul-escuro)';
    }


    return (
        <div className={`flex flex-row w-full h-auto gap-3 md:gap-6 ${aberto ? 'items-start' : 'items-center'}`}>
            {origemUso === "visualizarAulas" && (
                <div className={`w-auto flex flex-row ${aberto ? 'mt-[4.3vh]' : 'items-center'}`}>
                    <input type="checkbox" name="" id="" checked={exerciciosFinalizados} />
                </div>
            )}
            <div className="border-2 border-gray-300 rounded p-4 flex flex-col w-full h-auto gap-6">
                <div
                    className="flex flex-row h-auto w-full gap-1 cursor-pointer select-none"
                    onClick={toggle}
                    aria-expanded={aberto}
                    aria-label={aberto ? 'Recolher exercício' : 'Expandir exercício'}
                >
                    <div className="flex flex-col h-auto w-[90%] justify-start gap-1">
                        <div
                            className="w-auto h-auto text-base lg:text-xl font-bold"
                            style={
                                getTituloStyle(exerciciosFinalizados)
                            }>
                            <span className="break-words whitespace-normal">{titulo}</span>
                        </div>
                        <div className={`sm:mt-0 mt-4 flex flex-col lg:flex-row lg:flex-wrap items-start w-full ${espacamentoEntreIcons} text-base`}>
                            <div className="flex flex-col sm:flex-row items-center h-auto sm:w-auto w-full gap-2 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="none" viewBox="0 0 16 14">
                                    <path d="M12.3028 3.65649H13.2404C13.4991 3.65649 13.7092 3.90613 13.7092 4.21373V9.78605C13.7092 10.0936 13.4991 10.3433 13.2404 10.3433H12.3028C12.044 10.3433 11.834 10.0936 11.834 9.78605V4.21373C11.834 3.90613 12.044 3.65649 12.3028 3.65649Z" stroke={getIconIndicadorStyle(exerciciosFinalizados)} />
                                    <path d="M10.4278 1.42749H11.3654C11.6241 1.42749 11.8342 1.67713 11.8342 1.98472V12.0149C11.8342 12.3225 11.6241 12.5721 11.3654 12.5721H10.4278C10.169 12.5721 9.95898 12.3225 9.95898 12.0149V1.98472C9.95898 1.67713 10.169 1.42749 10.4278 1.42749Z" stroke={getIconIndicadorStyle(exerciciosFinalizados)} />
                                    <path d="M3.86528 1.42749H4.80286C5.06163 1.42749 5.27165 1.67713 5.27165 1.98472V12.0149C5.27165 12.3225 5.06163 12.5721 4.80286 12.5721H3.86528C3.6065 12.5721 3.39648 12.3225 3.39648 12.0149V1.98472C3.39648 1.67713 3.6065 1.42749 3.86528 1.42749Z" stroke={getIconIndicadorStyle(exerciciosFinalizados)} />
                                    <path d="M1.98832 3.65649H2.92591C3.18468 3.65649 3.3947 3.90613 3.3947 4.21373V9.78605C3.3947 10.0936 3.18468 10.3433 2.92591 10.3433H1.98832C1.72955 10.3433 1.51953 10.0936 1.51953 9.78605V4.21373C1.51953 3.90613 1.72955 3.65649 1.98832 3.65649Z" stroke={getIconIndicadorStyle(exerciciosFinalizados)} />
                                    <path d="M13.709 6.99963H15.1154" stroke={getIconIndicadorStyle(exerciciosFinalizados)} />
                                    <path d="M5.26953 6.99963H9.95745" stroke={getIconIndicadorStyle(exerciciosFinalizados)} />
                                    <path d="M0.113281 6.99963H1.51966" stroke={getIconIndicadorStyle(exerciciosFinalizados)} />
                                </svg>
                                <div className="flex flex-col sm:flex-row items-center gap-1"
                                    style={getIndicadorStyle(exerciciosFinalizados)}
                                >
                                    <span className="font-bold">Carga:</span>
                                    <span>{carga}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center h-auto sm:w-auto w-full gap-1 flex-shrink-0">
                                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="15" fill="none" viewBox="0 0 20 15">
                                    <path d="M7.64678 13.75H12.3044C16.1857 13.75 17.7383 12.5 17.7383 9.375V5.625C17.7383 2.5 16.1857 1.25 12.3044 1.25H7.64678C3.76543 1.25 2.21289 2.5 2.21289 5.625V9.375C2.21289 12.5 3.76543 13.75 7.64678 13.75Z" stroke={getIconIndicadorStyle(exerciciosFinalizados)} strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.244 7.5C14.244 9.4 12.3344 10.9375 9.97456 10.9375C7.6147 10.9375 6.17859 9.025 6.17859 9.025M6.17859 9.025H8.10375M6.17859 9.025V10.7438M5.70508 7.5C5.70508 5.6 7.59918 4.0625 9.97456 4.0625C12.8235 4.0625 14.244 5.975 14.244 5.975M14.244 5.975V4.25625M14.244 5.975H12.3499" stroke={getIconIndicadorStyle(exerciciosFinalizados)} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex sm:flex-row flex-col items-center gap-1"
                                    style={getIndicadorStyle(exerciciosFinalizados)}
                                >
                                    <span className="font-bold">Repetições:</span>
                                    <span>{repeticoes}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-1 flex-shrink min-w-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" fill="none" viewBox="0 0 20 15">
                                    <path d="M8.88477 3.90001H10.8456C10.8765 3.8581 10.8953 3.81112 10.9005 3.76257C10.9057 3.71401 10.8972 3.66514 10.8756 3.6196L8.88528 1.65918L8.88477 3.90001Z" fill="#FCFCFC" />
                                    <path d="M7.24209 9.28208C7.21567 9.14549 7.18008 9.01015 7.13548 8.87666C6.81462 7.95041 6.54552 7.55833 6.66041 6.5875C6.81048 5.9275 6.80169 4.60291 8.98042 4.80916C9.55589 4.86375 10.4517 5.19541 10.9646 5.18833C11.258 5.18416 11.4717 4.70625 11.4909 4.54708C11.5173 4.32791 11.0432 3.95541 10.845 3.89958C10.3847 3.77961 9.92213 3.66515 9.45756 3.55625C8.91987 3.43083 8.94781 2.84583 8.91366 2.6375C8.90613 2.58895 8.91655 2.5397 8.94362 2.4959C8.97068 2.4521 9.01318 2.4157 9.06581 2.39125C9.17448 2.33958 9.25987 2.38791 9.36545 2.44333L9.82345 2.71333C10.0806 2.89083 9.37114 3.23 9.56314 3.28666C9.56314 3.28666 10.4714 3.56125 10.8605 3.61833C11.0738 3.64958 11.8097 2.98125 11.8526 2.58916C11.8863 2.28083 10.0941 0.887913 8.81636 0.34708C8.36716 0.15708 8.10375 0.0466633 7.80773 0.0579133C7.45427 0.0712466 7.343 0.183747 6.90312 0.48708C4.91225 1.85833 2.97985 4.82375 2.69625 5.48C1.53392 8.17208 1.35227 9.59041 1.31087 10.3917C1.28521 10.6353 1.27209 10.8797 1.27154 11.1242C1.30518 11.1242 0.754026 13.2075 1.27154 13.6242C1.78905 14.0408 4.02781 14.0408 4.02781 14.0408C9.20295 15.7029 18.8132 15.2692 18.8132 11.0271C18.8132 5.95541 9.07719 6.62833 7.24209 9.28208Z" fill={getIconIndicadorStyle(exerciciosFinalizados)} />
                                    <path d="M11.2923 13.3659C9.65697 13.2276 8.37975 12.5821 8.30781 12.5451C8.19204 12.4857 8.11032 12.3917 8.08062 12.2837C8.05092 12.1758 8.07568 12.0628 8.14946 11.9696C8.22323 11.8764 8.33997 11.8106 8.474 11.7867C8.60803 11.7628 8.74837 11.7827 8.86414 11.8421C8.88484 11.8526 10.9357 12.8805 12.9246 12.4534C14.0243 12.2176 14.9258 11.5721 15.6037 10.5363C15.6677 10.4385 15.7773 10.3652 15.9084 10.3324C16.0395 10.2997 16.1814 10.3102 16.3029 10.3617C16.4243 10.4132 16.5154 10.5015 16.5561 10.607C16.5968 10.7126 16.5837 10.8268 16.5197 10.9246C15.6995 12.1771 14.577 12.9634 13.1833 13.2605C12.5328 13.3988 11.8885 13.4163 11.2923 13.3659Z" fill="#FCFCFC" />
                                </svg>
                                <div className="flex flex-row flex-wrap items-center gap-1 min-w-0"
                                    style={getIndicadorStyle(exerciciosFinalizados)}
                                >
                                    <span className="whitespace-nowrap font-bold">Grupo Muscular:</span>
                                    <span className="break-words min-w-0">{grupoMuscular}</span>
                                </div>
                            </div>
                            {origemUso === "visualizarAulas" && (
                                <div className="flex flex-col sm:flex-row items-center h-auto sm:w-auto w-full gap-1 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0" width="20" height="19" viewBox="0 0 20 19" fill="none">
                                        <path d="M10.1404 0C4.90588 0 0.640381 4.2655 0.640381 9.5C0.640381 14.7345 4.90588 19 10.1404 19C15.3749 19 19.6404 14.7345 19.6404 9.5C19.6404 4.2655 15.3749 0 10.1404 0ZM14.2729 12.8915C14.1399 13.1195 13.9024 13.243 13.6554 13.243C13.5319 13.243 13.4084 13.2145 13.2944 13.1385L10.3494 11.381C9.61788 10.944 9.07638 9.9845 9.07638 9.139V5.244C9.07638 4.8545 9.39938 4.5315 9.78888 4.5315C10.1784 4.5315 10.5014 4.8545 10.5014 5.244V9.139C10.5014 9.481 10.7864 9.9845 11.0809 10.1555L14.0259 11.913C14.3679 12.1125 14.4819 12.5495 14.2729 12.8915Z" fill={getIconIndicadorStyle(exerciciosFinalizados)} />
                                    </svg>
                                    <div className="flex sm:flex-row flex-col items-center gap-1"
                                        style={getIndicadorStyle(exerciciosFinalizados)}>
                                        <span className="font-bold text-center sm:text-start">Tempo de descanso:</span>
                                        <span>{tempoDescanso}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row w-[10%] justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26" height="11" viewBox="0 0 26 11" fill="none"
                            className={`transition-transform duration-300 ${aberto ? 'rotate-180' : ''}`}
                        >
                            <path d="M0.562751 0.701826C-0.187584 1.25317 -0.187584 2.14715 0.562751 2.69848L9.96224 9.59874C11.4632 10.7006 13.8952 10.7001 15.3954 9.5979L24.7912 2.69339C25.5417 2.14207 25.5417 1.24808 24.7912 0.69673C24.0409 0.145361 22.8244 0.145361 22.0741 0.69673L14.0322 6.60619C13.2819 7.15766 12.0653 7.15752 11.315 6.60619L3.27991 0.701826C2.52959 0.150457 1.31307 0.150457 0.562751 0.701826Z" fill="#1D2D44" />
                        </svg>
                    </div>
                </div>

                {aberto && (
                    <div className="flex flex-col h-auto w-full px-1 sm:px-7">
                        <div className="flex flex-col h-auto w-full">
                            <label htmlFor={`observacoes-${titulo}`}>Observações</label>
                            <Input
                                id={`observacoes-${titulo}`}
                                name="Observações"
                                inputType="text"
                                placeholder="Observações sobre o exercício"
                                value={observacoesLocal}
                                onChange={e => setObservacoesLocal(e.target.value)}
                                fontSize="16px"
                                fontWeight="500"
                                width="100%"
                                disabled={desabilitarObservacoes}
                            />
                        </div>
                        <div className="flex flex-col h-auto w-full gap-2.5 mt-2">
                            <div className="flex flex-row items-center gap-2.5">
                                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="15" fill="none" viewBox="0 0 16 15">
                                    <path d="M14.4824 9.375V5.625C14.4824 2.5 13.2324 1.25 10.1074 1.25H6.35742C3.23242 1.25 1.98242 2.5 1.98242 5.625V9.375C1.98242 12.5 3.23242 13.75 6.35742 13.75H10.1074C13.2324 13.75 14.4824 12.5 14.4824 9.375Z" stroke="#1D2D44" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.30664 4.44373H14.1566" stroke="#1D2D44" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.05664 1.31873V4.35623" stroke="#1D2D44" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.4082 1.31873V4.07498" stroke="#1D2D44" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.82617 9.0312V8.2812C6.82617 7.3187 7.50742 6.92495 8.33867 7.4062L8.98867 7.7812L9.63867 8.1562C10.4699 8.63745 10.4699 9.42495 9.63867 9.9062L8.98867 10.2812L8.33867 10.6562C7.50742 11.1374 6.82617 10.7437 6.82617 9.7812V9.0312Z" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Exemplo de execução:</span>
                            </div>
                            <div className={`relative ${larguraVideo} aspect-video overflow-hidden border-2 border-gray-300 rounded`}>
                                {!isPlaying && (
                                    <button
                                        type="button"
                                        onClick={handlePlay}
                                        className="group w-full h-full relative"
                                        aria-label="Reproduzir vídeo"
                                    >
                                        <img
                                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                            alt="Thumbnail do vídeo"
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 51" fill="none"
                                                className="drop-shadow-md transition-transform group-active:scale-95 w-8 h-8 sm:w-15 sm:h-15 lg:w-8 lg:h-8 xl:w-19 xl:h-19 shrink-0">
                                                <path d="M1.73242 25.5V15.8709C1.73242 3.51362 11.0512 -1.54165 22.4218 4.63701L31.3131 9.45154L40.2045 14.2661C51.5751 20.4447 51.5751 30.5553 40.2045 36.7339L31.3131 41.5485L22.4218 46.363C11.0512 52.5416 1.73242 47.4864 1.73242 35.1291V25.5Z"
                                                    stroke="#FFF" strokeOpacity="0.9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </button>
                                )}
                                {isPlaying && (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                                        title="Vídeo do exercício"
                                        className="absolute inset-0 w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExercicioVideoCard;