import React, { useState, useRef, useEffect } from "react";
import Label from "../Label";
import Button from "../Button";
import Input from "../InputPosLogin";
import { useAgendamento } from "./Context/AgendamentoContext";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

const EtapaAtribuicao = ({
    diasSelecionados,
    setDiasSelecionados,
    datasSelecionadas,
    setDatasSelecionadas,
    showDropdown,
    setShowDropdown,
    diasSemana,
    onVoltar
}) => {

    function useResponsiveFontSize() {
        const [fontSize, setFontSize] = useState("20px");

        useEffect(() => {
            function handleResize() {
                if (window.innerWidth >= 48 * 16) {
                    setFontSize("20px");
                } else {
                    setFontSize("16px");
                }
            }
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return fontSize;
    }
    const fontSizeResponsive = useResponsiveFontSize();

    const [treinos, setTreinos] = useState([
        {
            tipoSelecao: "",
            inputType: "text",
            treinoSelecionado: "",
            dateVencimento: "",
            datasSelecionadas: [],
            diasSelecionados: [],
            showDropdown: false,
        }
    ]);

    const dropdownRefs = useRef([]);

    const handleAdicionarTreino = () => {
        setTreinos([
            ...treinos,
            {
                tipoSelecao: "",
                inputType: "text",
                treinoSelecionado: "",
                dateVencimento: "",
                datasSelecionadas: [],
                diasSelecionados: [],
                showDropdown: false,
            }
        ]);
    };

    const handleTreinoChange = (index, field, value) => {
        setTreinos(prev =>
            prev.map((t, i) => i === index ? { ...t, [field]: value } : t)
        );
    };

    const { dadosAgendamento } = useAgendamento();
    const diasMarcados = (dadosAgendamento.diasSemanaMarcados || []).map(d => d.value);
    const selectedDates = dadosAgendamento.selectedDates || [];

    function todasDatasAtribuidas() {
        // Datas atribuídas em treinos personalizados
        const datasPersonalizadas = treinos
            .filter(t => t.tipoSelecao === "personalizado")
            .flatMap(t => t.datasSelecionadas);

        // Dias da semana atribuídos em treinos semanais
        const diasSemanais = treinos
            .filter(t => t.tipoSelecao === "semanal")
            .flatMap(t => t.diasSelecionados);

        // Para cada data agendada, verifica se está em algum treino
        return selectedDates.every(date => {
            const dateObj = typeof date === "string" ? new Date(date) : date;
            const iso = dateObj.toISOString();
            const diaSemanaMap = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
            const diaSemana = diaSemanaMap[dateObj.getDay()];
            return datasPersonalizadas.includes(iso) || diasSemanais.includes(diaSemana);
        });
    }

    function getBrasiliaDateString() {
        const now = new Date();
        const brasiliaOffset = -3 * 60;
        const localOffset = now.getTimezoneOffset();
        const brasiliaTime = new Date(now.getTime() + (brasiliaOffset - localOffset) * 60000);

        const dia = String(brasiliaTime.getDate()).padStart(2, '0');
        const mes = String(brasiliaTime.getMonth() + 1).padStart(2, '0');
        const ano = brasiliaTime.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    useEffect(() => {
        function handleClickOutside(event) {
            dropdownRefs.current.forEach((ref, idx) => {
                if (ref && !ref.contains(event.target)) {
                    setTreinos(prev =>
                        prev.map((t, i) => i === idx ? { ...t, showDropdown: false } : t)
                    );
                }
            });
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getDatasDisponiveis = (idx) => {

        const datasUsadas = treinos
            .filter((_, i) => i !== idx)
            .flatMap(t => t.tipoSelecao === "personalizado" ? t.datasSelecionadas : []);

        const diasRecorrentesSelecionados = treinos
            .flatMap(t => t.tipoSelecao === "semanal" ? t.diasSelecionados : []);

        return selectedDates.filter(date => {
            const dateObj = typeof date === "string" ? new Date(date) : date;
            const dayIndex = dateObj.getDay();


            const diaValue = diasSemana.find(d => {

                const map = {
                    "domingo": 0,
                    "segunda": 1,
                    "terca": 2,
                    "quarta": 3,
                    "quinta": 4,
                    "sexta": 5,
                    "sabado": 6
                };
                return map[d.value] === dayIndex;
            })?.value;

            if (diasRecorrentesSelecionados.includes(diaValue)) {
                return false;
            }

            return !datasUsadas.includes(date.toISOString());
        });
    };

    const getDiasSemanaDisponiveis = () => {
        return diasSemana.filter(diaObj => diasMarcados.includes(diaObj.value));
    };

    const handleCheckData = (data) => {
        setDatasSelecionadas(prev =>
            prev.includes(data)
                ? prev.filter(d => d !== data)
                : [...prev, data]
        );
    };

    const handleSelectAllDias = () => {
        if (diasSelecionados.length === diasSemana.length) {
            setDiasSelecionados([]);
        } else {
            setDiasSelecionados(diasSemana.map(d => d.value));
        }
    };
    const handleRemoverTreino = (idx) => {
        setTreinos(prev => {
            const novos = prev.filter((_, i) => i !== idx);
            return novos;
        });
    };


    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center w-full gap-2">
                <div className="flex flex-row mt-8 md:mt-3 text-base sm:text-2xl font-semibold">
                    <span>Treinos</span>
                </div>
                <div className="w-full md:w-auto flex flex-row justify-center items-center">
                    <Button
                        texto="Adicionar Mais um Treino"
                        cor="var(--azul-claro)"
                        corTexto="var(--cor-secundaria)"
                        height="2.75rem"
                        fontWeight="500"
                        ariaLabel="Botão de Salvar Horário"
                        type="button"
                        logoSvg={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        }
                        onClick={handleAdicionarTreino}
                        classNameExtra="w-[80%] md:w-[240px]"
                    />
                </div>
            </div>
            {treinos.length === 0 ? (
                <div className="w-full text-center text-lg text-gray-500 my-8">
                    Nenhum treino adicionado. Clique em "Adicionar Mais um Treino" para começar.
                </div>
            ) : (
                treinos.map((treino, idx) => {
                    const datasDisponiveis = getDatasDisponiveis(idx);
                    const diasSemanaDisponiveis = getDiasSemanaDisponiveis();
                    return (
                        <div key={idx} className="w-full h-auto mt-3 flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-auto h-auto ">
                                <button
                                    onClick={() => {
                                        handleRemoverTreino(idx);
                                    }}
                                    className="mr-2 font-bold bg-[#FFFDF6] rounded-[5px] h-6 w-6 flex items-center justify-center cursor-pointer border-1 border-solid border-[black]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="4" viewBox="0 0 14 4" fill="none">
                                        <path d="M12 2H2" stroke="#B41F1F" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="border-2 border-[#1D2D441A] border-solid py-3 md:py-0 rounded-md w-full flex flex-col items-center mt-1 h-auto">
                                <div className="w-[95%] pt-2">
                                    <Label
                                        id={`treino_selecionado_${idx}`}
                                        nomeLabel="Selecione o Treino"
                                        fontSize={fontSizeResponsive}
                                        fontWeight="500"
                                    />
                                    <div className="relative w-full md:w-[75%] xl:w-[30rem]">
                                        <select
                                            className="appearance-none text-sm sm:text-base w-full flex items-center justify-center pt-[1%] pr-[1%] pb-[1%] pl-0 border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]"
                                            value={treino.treinoSelecionado}
                                            onChange={e => handleTreinoChange(idx, "treinoSelecionado", e.target.value)}
                                        >
                                            <option disabled className="text-[#15171B87]" value="">Selecione um Treino Para Prosseguir</option>
                                            <option value="Musculacao">Musculação</option>
                                            <option value="Pernas">Pernas</option>
                                            <option value="Rosca">Rosca</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
                                                <path d="M0.532697 0.412777C-0.177566 0.956418 -0.177566 1.83792 0.532697 2.38154L9.43019 9.18545C10.851 10.2719 13.1531 10.2714 14.5732 9.18461L23.4672 2.37653C24.1776 1.8329 24.1776 0.951407 23.4672 0.407752C22.757 -0.135917 21.6054 -0.135917 20.8952 0.407752L13.2828 6.23469C12.5726 6.77845 11.421 6.77831 10.7107 6.23469L3.10474 0.412777C2.3945 -0.130892 1.24294 -0.130892 0.532697 0.412777Z" fill="#15171B" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[95%] mt-3 md:mt-5 flex flex-col md:flex-row md:gap-10 xl:gap-25">
                                    <div className="w-full md:w-[15rem]">
                                        <Label
                                            id={`date_vencimento_${idx}`}
                                            nomeLabel="Data de Vencimento"
                                            fontSize={fontSizeResponsive}
                                            fontWeight="500"
                                        />
                                        <Input
                                            id={`date_vencimento_${idx}`}
                                            name={`date_vencimento_${idx}`}
                                            inputType={treino.inputType}
                                            placeholder={getBrasiliaDateString()}
                                            fontSize="16px"
                                            fontWeight="500"
                                            width="100%"
                                            onFocus={() => handleTreinoChange(idx, "inputType", "date")}
                                            onBlur={e => {
                                                if (!e.target.value) handleTreinoChange(idx, "inputType", "text");
                                            }}
                                        />
                                    </div>
                                    <div className="w-full md:w-auto mt-3 md:mt-0">
                                        <div className="w-full gap-2 flex flex-row items-center">
                                            <Label
                                                id="realizar_treino"
                                                nomeLabel="Dia Para Realizar o Treino:"
                                                fontSize={fontSizeResponsive}
                                                fontWeight="500"
                                            />
                                            <div className="relative flex items-center group">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                    <circle cx="7.5" cy="7.5" r="7" stroke="#1D2D44" />
                                                    <path d="M7.65997 8.5V8.29004C7.65997 7.61004 8.08 7.25002 8.5 6.96002C8.91 6.68002 9.31995 6.32003 9.31995 5.66003C9.31995 4.74003 8.57997 4 7.65997 4C6.73997 4 6 4.74003 6 5.66003" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M7.65566 10.8901H7.66466" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="absolute left-[3rem] xl:left-[8vw] -translate-x-1/2 bottom-full mb-2 hidden group-hover:hidden lg:group-hover:flex flex-col items-center z-50 pointer-events-none ">
                                                    <div className="bg-[var(--cor-secundaria)] text-black text-xs 2xl:text-base rounded py-2 px-4 shadow-lg w-[15vw] text-left border-2 border-black border-solid">
                                                        Selecione os dias de aula agendados em que o aluno deverá realizar esse treino
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="w-full mt-4 relative">
                                                {/* Radio para dias personalizados */}
                                                <label className="flex items-center gap-2 cursor-pointer mb-2">
                                                    <input
                                                        type="radio"
                                                        name={`tipoSelecao_${idx}`}
                                                        value="personalizado"
                                                        checked={treino.tipoSelecao === "personalizado"}
                                                        onChange={() => {
                                                            handleTreinoChange(idx, "tipoSelecao", "personalizado");
                                                            handleTreinoChange(idx, "showDropdown", true);
                                                        }}
                                                    />
                                                    <span
                                                        onClick={() => {
                                                            handleTreinoChange(idx, "tipoSelecao", "personalizado");
                                                            handleTreinoChange(idx, "showDropdown", true);
                                                        }}
                                                        style={{ cursor: "pointer" }}

                                                        className="text-base"
                                                    >
                                                        Selecionar dias personalizados
                                                    </span>
                                                </label>
                                                {/* Dropdown flutuante para datas personalizadas */}
                                                {treino.tipoSelecao === "personalizado" && treino.showDropdown && (
                                                    <div
                                                        ref={el => dropdownRefs.current[idx] = el}
                                                        className="absolute z-50 left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-40 overflow-auto text-sm"
                                                    >
                                                        <label className="flex items-center px-4 py-2 font-semibold hover:bg-gray-100 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={treino.datasSelecionadas.length === datasDisponiveis.length}
                                                                onChange={() => {
                                                                    handleTreinoChange(idx, "datasSelecionadas", treino.datasSelecionadas.length === datasDisponiveis.length ? [] : datasDisponiveis.map(date => date.toISOString()));
                                                                }}
                                                                className="mr-2"
                                                            />
                                                            Selecionar todos
                                                        </label>
                                                        {datasDisponiveis.map(date => {
                                                            const str = format(date, "EEEE, dd/MM/yyyy", { locale: ptBR });
                                                            const label = str.charAt(0).toUpperCase() + str.slice(1);
                                                            return (
                                                                <label key={date.toISOString()} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={treino.datasSelecionadas.includes(date.toISOString())}
                                                                        onChange={() => {
                                                                            const selecionadas = treino.datasSelecionadas.includes(date.toISOString())
                                                                                ? treino.datasSelecionadas.filter(d => d !== date.toISOString())
                                                                                : [...treino.datasSelecionadas, date.toISOString()];
                                                                            handleTreinoChange(idx, "datasSelecionadas", selecionadas);
                                                                        }}
                                                                        className="mr-2"
                                                                    />
                                                                    {label}
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                )}

                                                {/* Radio para recorrência semanal */}
                                                <label className="flex items-center gap-2 cursor-pointer mb-2 mt-2">
                                                    <input
                                                        type="radio"
                                                        name={`tipoSelecao_${idx}`}
                                                        value="semanal"
                                                        checked={treino.tipoSelecao === "semanal"}
                                                        onChange={() => {
                                                            handleTreinoChange(idx, "tipoSelecao", "semanal");
                                                            handleTreinoChange(idx, "showDropdown", true);
                                                        }}
                                                    />
                                                    <span
                                                        onClick={() => {
                                                            handleTreinoChange(idx, "tipoSelecao", "semanal");
                                                            handleTreinoChange(idx, "showDropdown", true);
                                                        }}
                                                        style={{ cursor: "pointer" }}
                                                        className="text-base"
                                                    >
                                                        Selecionar recorrência semanal
                                                    </span>
                                                </label>
                                                {treino.tipoSelecao === "semanal" && treino.showDropdown && (
                                                    <div
                                                        ref={el => dropdownRefs.current[idx] = el}
                                                        className="absolute z-50 left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-40 overflow-auto text-sm"
                                                    >
                                                        <label className="flex items-center px-4 py-2 font-semibold hover:bg-gray-100 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={treino.diasSelecionados.length === diasSemanaDisponiveis.length}
                                                                onChange={() => {
                                                                    handleTreinoChange(idx, "diasSelecionados", treino.diasSelecionados.length === diasSemanaDisponiveis.length ? [] : diasSemanaDisponiveis.map(d => d.value));
                                                                }}
                                                                className="mr-2"
                                                            />
                                                            Selecionar todos
                                                        </label>
                                                        {diasSemanaDisponiveis.map(diaObj => {
                                                            const dayIndexMap = {
                                                                "domingo": 0,
                                                                "segunda": 1,
                                                                "terca": 2,
                                                                "quarta": 3,
                                                                "quinta": 4,
                                                                "sexta": 5,
                                                                "sabado": 6
                                                            };
                                                            const dayIdx = dayIndexMap[diaObj.value];
                                                            const totalDatasDoDia = selectedDates.filter(date => {
                                                                const dateObj = typeof date === "string" ? new Date(date) : date;
                                                                return !isNaN(dateObj.getTime()) && dateObj.getDay() === dayIdx;
                                                            }).length;

                                                            const totalSelecionadas = treinos
                                                                .filter((t, i) => t.tipoSelecao === "semanal" && t.diasSelecionados.includes(diaObj.value) && i !== idx)
                                                                .length * totalDatasDoDia;

                                                            const disabled = totalDatasDoDia > 0 && totalSelecionadas >= totalDatasDoDia && !treino.diasSelecionados.includes(diaObj.value);

                                                            return (
                                                                <label key={diaObj.value} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={treino.diasSelecionados.includes(diaObj.value)}
                                                                        onChange={() => {
                                                                            const selecionados = treino.diasSelecionados.includes(diaObj.value)
                                                                                ? treino.diasSelecionados.filter(d => d !== diaObj.value)
                                                                                : [...treino.diasSelecionados, diaObj.value];
                                                                            handleTreinoChange(idx, "diasSelecionados", selecionados);
                                                                        }}
                                                                        className="mr-2"
                                                                        disabled={disabled}
                                                                    />
                                                                    {diaObj.label}
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
            <div aria-label="Opções de Botões" className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center mt-4 h-auto 2xl:h-full">
                <Button
                    texto="Voltar"
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
                    onClick={onVoltar}
                />
                <Button
                    texto="Salvar"
                    corTexto="var(--cor-secundaria)"
                    cor={todasDatasAtribuidas() ? "#46982B" : "#15171B87"}
                    height="2.75rem"
                    width="10.5rem"
                    fontWeight="600"
                    ariaLabel="Botão de Salvar"
                    type="submit"
                />
            </div >
        </>
    );
};
export default EtapaAtribuicao;