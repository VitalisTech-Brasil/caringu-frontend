import React, { useEffect, useRef, useState } from 'react';
import { FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import MascaraTelefone from "../Functions/MascaraTelefone";
import Button from "../Button";
import { caringuApi } from '../../../provider/caringuApi';

const CardAluno = ({
    aluno,
    onCardClick,
    onMenuAction,
    openMenuId,
    setOpenMenuId,
    imgErro,
    setImgErro,
    totalCards,
    alinhamentoCard = "justify-center",
    origemUso = "gerenciarAlunos",
    origemUsoOption = "gerenciarAlunos",
    heightCardInterno = "55%",
    heightCardInternoWeb = "50%",
    gapConteudo = "gap-0",
    idButton = "btn-ver-feedbacks",
    textoButton = "Ver feedbacks",
    corButton = "var(--laranja)",
    ariaLabelButton = "Ver feedbacks",
    classNameExtraButton = "sm:text-base text-xs 2xl:h-[50px] sm:h-[35px] h-[30px] sm:w-[40%] w-[90%] mt-1",
    onClickButton,

}) => {

    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const [aulasDisponiveis, setAulasDisponiveis] = useState({aulasRestantes:0});

    const formatarNivelAtividade = (nivel) => {
        if (!nivel) return "Não informado";

        switch (nivel) {
            case "SEDENTARIO":
                return "Sedentário";
            case "LEVEMENTE_ATIVO":
                return "Levemente Ativo";
            case "MODERADAMENTE_ATIVO":
                return "Moderadamente Ativo";
            case "MUITO_ATIVO":
                return "Muito Ativo";
            case "EXTREMAMENTE_ATIVO":
                return "Extremamente Ativo";
            default:
                return nivel;
        }
    };

    const getBuscarAulasDisponiveis = async () => {
        try {
            const response = await caringuApi.get(`/aulas/${aluno.idAluno}/disponibilidade`);
            setAulasDisponiveis(response.data);
        } catch (error) {
            console.error("Erro ao buscar aulas disponíveis:", error);
        }
    };

    const AlunoActionsMenu = ({ aluno }) => (
        <div className="flex flex-col text-xs sm:text-sm font-medium w-full">
            <button
                className="flex items-center justify-between gap-2 p-1 sm:p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer"
                onClick={() => onMenuAction('anamnese', aluno)}
            >
                <span className="">
                    {aluno.idAnamnese ? 'Editar Anamnese' : 'Criar Anamnese'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z" fill="#738CAB" />
                    <path d="M19.0201 3.47967C17.0801 1.53967 15.1801 1.48967 13.1901 3.47967L11.9801 4.68967C11.8801 4.78967 11.8401 4.94967 11.8801 5.08967C12.6401 7.73967 14.7601 9.85967 17.4101 10.6197C17.4501 10.6297 17.4901 10.6397 17.5301 10.6397C17.6401 10.6397 17.7401 10.5997 17.8201 10.5197L19.0201 9.30967C20.0101 8.32967 20.4901 7.37967 20.4901 6.41967C20.5001 5.42967 20.0201 4.46967 19.0201 3.47967Z" fill="#738CAB" />
                    <path d="M15.6098 11.5298C15.3198 11.3898 15.0398 11.2498 14.7698 11.0898C14.5498 10.9598 14.3398 10.8198 14.1298 10.6698C13.9598 10.5598 13.7598 10.3998 13.5698 10.2398C13.5498 10.2298 13.4798 10.1698 13.3998 10.0898C13.0698 9.8098 12.6998 9.4498 12.3698 9.0498C12.3398 9.0298 12.2898 8.9598 12.2198 8.8698C12.1198 8.7498 11.9498 8.5498 11.7998 8.3198C11.6798 8.1698 11.5398 7.9498 11.4098 7.7298C11.2498 7.4598 11.1098 7.1898 10.9698 6.9098C10.9486 6.86441 10.9281 6.81924 10.9083 6.77434C10.7607 6.44102 10.3261 6.34358 10.0683 6.60133L4.33983 12.3298C4.20983 12.4598 4.08983 12.7098 4.05983 12.8798L3.51983 16.7098C3.41983 17.3898 3.60983 18.0298 4.02983 18.4598C4.38983 18.8098 4.88983 18.9998 5.42983 18.9998C5.54983 18.9998 5.66983 18.9898 5.78983 18.9698L9.62983 18.4298C9.80983 18.3998 10.0598 18.2798 10.1798 18.1498L15.9011 12.4285C16.1607 12.1689 16.0628 11.7235 15.7252 11.5794C15.6872 11.5632 15.6488 11.5467 15.6098 11.5298Z" fill="#738CAB" />
                </svg>
            </button>
            {aulasDisponiveis.aulasRestantes > 0 && (
                <button
                    className="flex items-center justify-between gap-2 p-1 sm:p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer"
                    onClick={() => onMenuAction('agendarAula', aluno)}
                >
                    <span className="">
                        Agendar Aula
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#15171B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 12H16" stroke="#15171B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 16V8" stroke="#15171B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}
            {aluno.idAnamnese && (
                <button
                    className="flex items-center justify-between gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer"
                    onClick={() => onMenuAction('relatorio', aluno)}
                >
                    <span className="">Ver relatórios</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M16.5 9.5L12.3 13.7L10.7 11.3L7.5 14.5" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.5 9.5H16.5V11.5" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}


            {/* //ADD */}
            {aluno.idCorporal && (
                <button
                    className="flex items-center justify-between gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer"
                    onClick={() => onMenuAction('progressao', aluno)}
                >
                    <span className="">Progressão corporal</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M2.77017 18.25C2.89017 20.31 4.00017 22 6.76017 22H17.2402C20.0002 22 21.1002 20.31 21.2302 18.25L21.7502 9.99C21.8902 7.83 20.1702 6 18.0002 6C17.3902 6 16.8302 5.65 16.5502 5.11L15.8302 3.66C15.3702 2.75 14.1702 2 13.1502 2H10.8602C9.83017 2 8.63017 2.75 8.17017 3.66L7.45017 5.11C7.17017 5.65 6.61017 6 6.00017 6C3.83017 6 2.11017 7.83 2.25017 9.99L2.51017 14.06" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.5002 8H13.5002" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12.0002 18C13.7902 18 15.2502 16.54 15.2502 14.75C15.2502 12.96 13.7902 11.5 12.0002 11.5C10.2102 11.5 8.75018 12.96 8.75018 14.75C8.75018 16.54 10.2102 18 12.0002 18Z" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}
            {aluno.idAula && (
                <button
                    className="flex items-center justify-between gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer"
                    onClick={() => onMenuAction('visualizarAula', aluno)}
                >
                    <span className="">Visualizar Aulas</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21.25 9.15005C18.94 5.52005 15.56 3.43005 12 3.43005C10.22 3.43005 8.49 3.95005 6.91 4.92005C5.33 5.90005 3.91 7.33005 2.75 9.15005C1.75 10.7201 1.75 13.2701 2.75 14.8401C5.06 18.4801 8.44 20.5601 12 20.5601C13.78 20.5601 15.51 20.0401 17.09 19.0701C18.67 18.0901 20.09 16.6601 21.25 14.8401C22.25 13.2801 22.25 10.7201 21.25 9.15005ZM12 16.0401C9.76 16.0401 7.96 14.2301 7.96 12.0001C7.96 9.77005 9.76 7.96005 12 7.96005C14.24 7.96005 16.04 9.77005 16.04 12.0001C16.04 14.2301 14.24 16.0401 12 16.0401Z" fill="#E96E35" />
                        <path d="M12 9.14001C10.43 9.14001 9.15002 10.42 9.15002 12C9.15002 13.57 10.43 14.85 12 14.85C13.57 14.85 14.86 13.57 14.86 12C14.86 10.43 13.57 9.14001 12 9.14001Z" fill="#E96E35" />
                    </svg>
                </button>
            )}
        </div>
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setOpenMenuId(null);
            }
        }
        if (openMenuId === aluno.idAluno) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openMenuId, aluno.idAluno]);

    return (
        <div
            className={`flex flex-col w-full ${totalCards > 2 ? 'h-full' : `h-full sm:h-full 2xl:h-[${heightCardInterno}]`} items-start ${alinhamentoCard} bg-[var(--cor-secundaria)] rounded-md 2xl:p-4 sm:p-3 p-2 hover:bg-gray-50 border-2 border-gray-200 ${gapConteudo}`}
            key={aluno.idAluno}
        >
            <div
                className={`relative flex flex-col-reverse sm:flex-row sm:items-center items-start justify-between  sm:gap-4 w-full h-[${heightCardInterno}] sm:h-1/3 gap-3`}
            >
                <div className="gap-1 sm:gap-4 flex sm:flex-row flex-col items-center justify-end w-full h-full">
                    {aluno.urlFotoPerfil && !imgErro ? (
                        <img
                            src={aluno.urlFotoPerfil}
                            alt="Imagem do aluno"
                            className='sm:w-12 sm:h-12 w-20 h-20 lg:w-12 lg:h-12 rounded-full'
                            onError={() => setImgErro(true)}
                        />

                    ) : (
                        <FaUserCircle className="flex-shrink-0 sm:w-12 sm:h-12 w-15 h-15 lg:w-12 lg:h-12 text-[#4B5563]" />
                    )}

                    <div className="flex-1 w-full flex flex-col items-start justify-center">
                        <p className="font-bold text-base w-full sm:text-left text-center">{aluno.nomeAluno}</p>
                        <p className="text-[12px] w-full text-gray-600 flex flex-col sm:flex-row items-start justify-center sm:justify-start">
                            <b className="text-center sm:w-auto w-full">Telefone:</b> <span className="text-center sm:w-auto w-full">{MascaraTelefone(aluno.celular)}</span>
                        </p>
                    </div>
                </div>
                <div className="h-auto w-full sm:w-auto flex flex-row gap-4 sm:justify-start justify-between">
                    <div className="text-[var(--azul-claro)] font-normal text-xs bg-[#748CAB36] rounded-[15px] h-auto w-[100px] p-[0.5rem] 2xl:p-2  flex flex-row items-center justify-center text-center">
                        {aluno.nomePlano}
                    </div>
                    {origemUsoOption === "gerenciarAlunos" && (
                        //Botão + menu
                        <div onClick={(e) => {
                            e.stopPropagation(); // Prevent card click event
                            setOpenMenuId(openMenuId === aluno.idAluno ? null : aluno.idAluno);
                            getBuscarAulasDisponiveis();
                        }}
                            className="w-8 h-8 pt-2 sm:pt-0 flex justify-center items-center rounded-[5px] cursor-pointer sm:hover:bg-gray-300 transition duration-200">
                            <div className="relative" ref={buttonRef}>
                                <button
                                    className="flex items-center justify-center sm:w-6 w-4 sm:h-6 h-4 cursor-pointer"
                                >
                                    <FaEllipsisV className="text-xl" />
                                </button>

                                {openMenuId === aluno.idAluno && (
                                    <div
                                        ref={menuRef}
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute right-0 mt-2 z-[9999] bg-[var(--cor-secundaria)] border-2 border-gray-200 rounded-md shadow-lg p-2 w-40 sm:w-55"
                                    >
                                        <AlunoActionsMenu aluno={aluno} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <div className="w-full h-auto sm:h-1/3 flex flex-col items-start justify-center">
                <p className="flex items-start gap-0.5 text-[12px] sm:text-base">
                    {aluno.objetivoTreino ? (
                        <>
                            <span><b>Objetivo:</b> {aluno.objetivoTreino}</span>
                        </>
                    ) : (
                        <>
                            <HiOutlineClock className="shrink-0 mt-1 w-4 h-4" />
                            <span>Anamnese pendente</span>
                        </>
                    )
                    }
                </p>
                <p className="flex items-start text-[12px] sm:text-base">
                    <span><b>Nível de atividade atual:</b> {formatarNivelAtividade(aluno.nivelAtividade)}</span>
                </p>
            </div>
            {origemUso === "gerenciarAlunos" && (
                <div className="w-full h-auto sm:h-1/3 flex flex-col sm:flex-row items-center justify-around gap-2 sm:gap-0 border-t-2 border-gray-200 rounded-b-md">
                    <Button
                        id={idButton}
                        texto={textoButton}
                        cor={corButton}
                        corTexto="#fff"
                        ariaLabel={ariaLabelButton}
                        fontWeight={"600"}
                        classNameExtra={classNameExtraButton}
                        onClick={() => onClickButton(aluno.idAluno)}
                    />
                    <Button
                        id={"btn-visualizar-aluno"}
                        texto={"Ver Perfil do Aluno"}
                        cor={"var(--azul-claro)"}
                        corTexto="#fff"
                        ariaLabel={"Visualizar Perfil"}
                        fontWeight={"600"}
                        classNameExtra={"sm:text-base text-xs 2xl:h-[50px] sm:h-[35px] h-[30px] sm:w-[40%] w-[90%]"}
                        onClick={() => onCardClick(aluno.idAluno)}
                    />
                </div>
            )}
        </div>
    );
}

export default CardAluno;