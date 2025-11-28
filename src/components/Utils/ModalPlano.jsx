import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Button from './Button';
import InputPosLogin from './InputPosLogin';
import Label from './Label';
import info2 from "../../assets/images/info-2.svg";

const ModalPlano = ({
    visivel,
    onClose,
    onSubmit,
    titulo = "Criar plano",
    planoData = null,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields, isSubmitted },
        setValue,
        trigger,
        reset,
        control
    } = useForm({
        mode: "onSubmit"
    });

    const duracaoWatch = useWatch({ control, name: "duracao" });

    useEffect(() => {
        if (visivel) {
            if (planoData) {

                setTimeout(() => {
                    reset({
                        plano: planoData.nome || "",
                        duracao: planoData.periodo || "",
                        preco: planoData.valorAulas?.toString() || "",
                        aulas: planoData.quantidadeAulas?.toString() || ""
                    });
                }, 100);

            } else {
                reset({
                    plano: "",
                    duracao: "",
                    preco: "",
                    aulas: ""
                });
            }
        }
    }, [planoData, reset, visivel]);

    useEffect(() => {
        if (!planoData && duracaoWatch === "AVULSO") {
            setValue("aulas", "1");
            if (isSubmitted || touchedFields.aulas) {
                trigger("aulas");
            }
        } else if (!planoData && duracaoWatch && duracaoWatch !== "AVULSO") {
            setValue("aulas", "");
            if (isSubmitted || touchedFields.aulas) {
                trigger("aulas");
            }
        }
    }, [duracaoWatch, setValue, trigger, isSubmitted, touchedFields.aulas, planoData]);

    const handlePrecoChange = (e) => {
        let input = e.target.value;
        let digitos = input.replace(/\D/g, "").slice(0, 6);
        let formatted = "";

        if (digitos.length <= 2) {
            const padded = digitos.padStart(2, "0");
            formatted = `0.${padded}`;
        } else {
            const reais = digitos.slice(0, -2);
            const centavos = digitos.slice(-2);
            formatted = `${parseInt(reais.slice(0, 4), 10)}.${centavos}`;
        }

        setValue("preco", formatted);
        if (isSubmitted) {
            trigger("preco");
        }
    };

    const handleQuantidadeAulasChange = (e) => {
        let input = e.target.value;
        let digitos = input.replace(/\D/g, "");
        setValue("aulas", digitos);
        if (isSubmitted) {
            trigger("aulas");
        }
    };

    if (!visivel) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
            <div className="absolute inset-0 bg-[#000000] opacity-50" aria-label="Fundo Escurecido"></div>
            <div className="relative p-4 w-full max-w-2xl">
                <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                    {/* Header */}
                    <div className="flex justify-between items-center pb-4 mb-4">
                        <h3 className="text-4xl font-semibold text-[var(--cor-primaria)]">
                            {titulo}
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-[#B41F1F] text-[var(--cor-secundaria)] rounded-lg text-xs sm:text-sm cursor-pointer w-10 h-10 md:w-13 md:h-13 inline-flex justify-center items-center absolute top-2 right-2"
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

                    {/* Formulário */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 mb-4">
                            {/* Nome do plano */}
                            <div>
                                <Label
                                    id="plano"
                                    nomeLabel="Nome do plano"
                                    fontSize="20px"
                                    fontWeight="500"
                                />
                                <InputPosLogin
                                    id="plano"
                                    name="plano"
                                    inputType="text"
                                    placeholder="Ex.: Plano Básico"
                                    fontSize="16px"
                                    fontWeight="400"
                                    fontSizeErro="16px"
                                    width="100%"
                                    {...register('plano', { required: 'Nome do plano é obrigatório' })}
                                    isError={!!errors.plano}
                                    errorMessage={errors.plano?.message}
                                />
                            </div>

                            {/* Duração */}
                            <div>
                                <Label
                                    id="duracao"
                                    nomeLabel="Período de duração do plano"
                                    fontSize="20px"
                                    fontWeight="500"
                                />
                                <div className="relative">
                                    <select
                                        defaultValue=""
                                        id="duracao"
                                        {...register("duracao", { required: 'Selecione o período de duração do plano' })}
                                        className="appearance-none text-base w-full flex items-center justify-center pt-[1%] pr-[1%] pb-[1%] pl-0 border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]"
                                    >
                                        <option disabled className="text-[#15171B87]" value="">Selecione o período</option>
                                        <option value="MENSAL">Mensal</option>
                                        <option value="SEMESTRAL">Semestral</option>
                                        <option value="AVULSO">Avulso</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
                                            <path d="M0.532697 0.412777C-0.177566 0.956418 -0.177566 1.83792 0.532697 2.38154L9.43019 9.18545C10.851 10.2719 13.1531 10.2714 14.5732 9.18461L23.4672 2.37653C24.1776 1.8329 24.1776 0.951407 23.4672 0.407752C22.757 -0.135917 21.6054 -0.135917 20.8952 0.407752L13.2828 6.23469C12.5726 6.77845 11.421 6.77831 10.7107 6.23469L3.10474 0.412777C2.3945 -0.130892 1.24294 -0.130892 0.532697 0.412777Z" fill="#15171B" />
                                        </svg>
                                    </div>
                                </div>
                                {errors.duracao && (
                                    <div className="flex items-center justify-start gap-1 text-[#D45C56] mt-3 text-sm">
                                        <img src={info2} alt="Erro" className="w-4 h-4" />
                                        <span>{errors.duracao.message}</span>
                                    </div>
                                )}
                            </div>

                            {/* Preço */}
                            <div>
                                <Label
                                    id="preco"
                                    nomeLabel="Preço por aula"
                                    fontSize="20px"
                                    fontWeight="500"
                                />
                                <InputPosLogin
                                    id="preco"
                                    name="preco"
                                    inputType="text"
                                    placeholder="Digite o valor em reais"
                                    fontSize="16px"
                                    fontWeight="400"
                                    fontSizeErro="16px"
                                    width="100%"
                                    inputMode="numeric"
                                    {...register('preco', {
                                        required: 'Preço por aula é obrigatório',
                                        pattern: {
                                            value: /^[0-9]+([.,][0-9]{1,2})?$/,
                                            message: "Informe um valor válido, ex: 50,00"
                                        }
                                    })}
                                    isError={!!errors.preco}
                                    errorMessage={errors.preco?.message}
                                    onChange={handlePrecoChange}
                                />
                            </div>

                            {/* Quantidade de aulas */}
                            <div>
                                <Label
                                    id="aulas"
                                    nomeLabel="Quantidade de aulas no período"
                                    fontSize="20px"
                                    fontWeight="500"
                                />
                                <InputPosLogin
                                    id="aulas"
                                    name="aulas"
                                    inputType="text"
                                    placeholder="Ex.: 5"
                                    fontSize="16px"
                                    fontWeight="400"
                                    fontSizeErro="16px"
                                    width="100%"
                                    inputMode="numeric"
                                    disabled={duracaoWatch === "AVULSO"}
                                    {...register('aulas', {
                                        required: 'Quantidade de aulas é obrigatória',
                                        pattern: {
                                            value: /^[1-9][0-9]*$/,
                                            message: "Informe apenas números inteiros positivos"
                                        }
                                    })}
                                    isError={!!errors.aulas}
                                    errorMessage={errors.aulas?.message}
                                    onChange={handleQuantidadeAulasChange}
                                />
                            </div>
                        </div>

                        {/* Botões */}
                        <div aria-label="Opções de Botões" className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center">
                            <Button
                                texto="Cancelar"
                                corTexto="#B41F1F"
                                cor="var(--cor-secundaria)"
                                height="2.75rem"
                                width="13.25rem"
                                fontWeight="500"
                                ariaLabel="Botão de Cancelar"
                                type="button"
                                onClick={onClose}
                                borderStyle={"solid"}
                                borderWidth={"2px"}
                                borderColor={"#B41F1F"}
                            />
                            <Button
                                texto="Salvar"
                                corTexto="var(--cor-secundaria)"
                                cor="#46982B"
                                height="2.75rem"
                                width="9.2rem"
                                fontWeight="600"
                                ariaLabel="Botão de Salvar"
                                type="submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalPlano;