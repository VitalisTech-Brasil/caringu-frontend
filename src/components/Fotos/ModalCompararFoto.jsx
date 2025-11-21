import React, { useState } from "react";
import Button from "../Utils/Button";
import InputPosLogin from "../Utils/InputPosLogin";
import Label from "../Utils/Label";
import toast from 'react-hot-toast';
import CustomToast from '../../components/Utils/CustomToast';

function parseDataEnvio(dataEnvio) {
    const [dia, mes, ano] = dataEnvio.split("/");
    return new Date(Number(ano), Number(mes) - 1, Number(dia));
}

function handleInput(e, setter) {
    const valor = e.target.value;
    if (/^[0-9/]*$/.test(valor)) {
        let v = valor.replace(/\D/g, "");
        v = v.slice(0, 6);

        if (v.length >= 2) {
            const mes = v.slice(0, 2);
            if (Number(mes) < 1 || Number(mes) > 12) {
                return;
            }
        }
        if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);

        setter(v);
    }
}

function mesAnoParaISO(mesAno) {
    if (!mesAno || !/^\d{2}\/\d{4}$/.test(mesAno)) return null;
    const [mes, ano] = mesAno.split("/");
    return `${ano}-${mes}-01`;
}

function ModalCompararFoto({
    visivel,
    fecharModal,
    ariaLabel,
    fotosCorporais = {},
    tipoSelecionado

}) {

    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");
    const [filtro, setFiltro] = useState({ inicio: "", fim: "" });

    if (!visivel) return null;

    const fotosDoTipo = (fotosCorporais[tipoSelecionado] || []).map(foto => ({
        ...foto,
        dataObj: parseDataEnvio(foto.dataEnvio)
    }));

    const fotosFiltradas = fotosDoTipo.filter(foto => {
        if (!filtro.inicio && !filtro.fim) return true;
        const dataInicio = filtro.inicio ? new Date(mesAnoParaISO(filtro.inicio)) : null;
        const dataFim = filtro.fim ? new Date(mesAnoParaISO(filtro.fim)) : null;
        if (dataInicio && foto.dataObj < dataInicio) return false;
        if (dataFim && foto.dataObj > dataFim) return false;
        return true;
    });

    const tipoLabel = {
        FRONTAL: "Frontal",
        COSTAS: "Costas",
        PERFIL_DIREITO: "Perfil Direito",
        PERFIL_ESQUERDO: "Perfil Esquerdo"
    };

    function pesquisar() {
        const mesInicio = inicio.split("/")[0];
        const mesFim = fim.split("/")[0];
        if (
            !(/^\d{2}\/\d{4}$/.test(inicio) && /^\d{2}\/\d{4}$/.test(fim)) ||
            Number(mesInicio) < 1 || Number(mesInicio) > 12 ||
            Number(mesFim) < 1 || Number(mesFim) > 12
        ) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Preencha os dois campos de data corretamente." />
            ));
            return;
        }
        const dataInicio = new Date(mesAnoParaISO(inicio));
        const dataFim = new Date(mesAnoParaISO(fim));
        if (dataInicio > dataFim) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="A data inicial deve ser anterior ou igual à data final." />
            ));
            return;

        }
        setFiltro({ inicio, fim });
    }

    return (
        <>
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

                <div aria-label="Modal com conteúdo dentro" className={`relative p-4 w-[95%] lg:w-[85%] 2xl:w-[70%] max-h-[90vh] h-auto`}>
                    <div aria-label="Fechar Modal" className="relative bg-[var(--cor-secundaria)] rounded-[6px] h-full flex flex-col justify-center items-center">
                        {/* Botão para fechar o modal */}
                        <button
                            type="button"
                            onClick={fecharModal}
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
                        <div aria-label="Texto de apoio e Botões" className="flex flex-col items-center text-center py-10 sm:py-6 gap-4">
                            <h2 className="text-base md:text-xl font-bold mt-4 mb-2">
                                Comparar Fotos {tipoLabel[tipoSelecionado]}
                            </h2>
                            <div className="flex md:flex-row flex-col gap-4 justify-between items-center w-full px-6 md:px-12">
                                <div className="flex flex-row md:gap-10 items-center justify-between md:justify-center md:w-auto w-full">
                                    <div className="flex flex-col items-start h-auto w-1/2 md:w-auto">
                                        <Label
                                            id="DataDeInicio"
                                            fontSize="14px"
                                            nomeLabel="Início"
                                            fontWeight="500"
                                        />
                                        <InputPosLogin
                                            id="DataDeInicio"
                                            name="dataInicio"
                                            inputType="text"
                                            placeholder="MM/AAAA"
                                            fontSize="16px"
                                            fontWeight="500"
                                            fontSizeErro="16px"
                                            width="23vw"
                                            required={true}
                                            maxLength={7}
                                            onChange={e => handleInput(e, setInicio, inicio)}
                                            value={inicio}

                                        />
                                    </div>
                                    <div className=" flex flex-col items-start h-auto w-1/2 md:w-auto">
                                        <Label
                                            id="DataDeFim"
                                            fontSize="14px"
                                            nomeLabel="Fim"
                                            fontWeight="500"
                                        />
                                        <InputPosLogin
                                            id="DataDeFim"
                                            name="dataFim"
                                            inputType="text"
                                            placeholder="MM/AAAA"
                                            fontSize="16px"
                                            fontWeight="500"
                                            fontSizeErro="16px"
                                            width="23vw"
                                            required={true}
                                            maxLength={7}
                                            onChange={e => handleInput(e, setFim, fim)}
                                            value={fim}

                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4 items-center justify-start md:w-auto w-full">
                                    <Button
                                        type="button"
                                        onClick={pesquisar}
                                        cor="var(--azul-claro)"
                                        height="40px"
                                        corTexto="#fff"
                                        classNameExtra="px-4 py-1  rounded text-sm transition-colors"
                                        ariaLabel="Pesquisar fotos"
                                        texto="Pesquisar"
                                        fontWeight={800}
                                    ></Button>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setInicio("");
                                            setFim("");
                                            setFiltro({ inicio: "", fim: "" });
                                        }}
                                        cor="#E96E35"
                                        height="40px"
                                        corTexto="white"
                                        classNameExtra="px-3  rounded text-sm transition-colors"
                                        ariaLabel="Limpar filtro de fotos"
                                        texto="Limpar"
                                        fontWeight={800}
                                    ></Button>
                                </div>
                            </div>

                            <div className="w-full flex flex-wrap gap-2 justify-center px-4  overflow-y-auto h-auto max-h-[55vh]">
                                {fotosFiltradas.length === 0 ? (
                                    <span className="text-gray-400 text-sm">Nenhuma foto encontrada.</span>
                                ) : (
                                    fotosFiltradas.map(foto => (
                                        <div key={foto.id} className="flex flex-col items-center">
                                            <img
                                                src={foto.src}
                                                alt={tipoLabel[tipoSelecionado]}
                                                className="sm:w-36  w-20 sm:h-36 h-20 object-cover rounded border"
                                            />
                                            <span className="text-xs mt-1">{foto.dataEnvio}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalCompararFoto;