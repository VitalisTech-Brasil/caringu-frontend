import React, { useRef, useState } from 'react';
import { FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";
import MascaraTelefone from "../Functions/MascaraTelefone";
import Button from "../Button";

const CardAluno = ({
    aluno,
    onCardClick,
    onMenuAction,
    openMenuId,
    setOpenMenuId,
    imgErro,
    setImgErro,
    totalCards
}) => {

    const menuRef = useRef(null);
    const buttonRef = useRef(null);

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

            {/* REMOVER MOCK */}
            {(aluno.idAluno == 7 || aluno.idAluno == 8) && (
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

            {/* //ADD */}
            {/* {aluno.idCorporal && (
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
            )} */}
        </div>
    );

    return (
        <div className={`flex flex-col w-full ${totalCards > 2 ? 'h-full' : 'h-1/2'} items-start justify-start bg-[var(--cor-secundaria)] rounded-md sm:p-4 p-2 hover:bg-gray-50 border-2 border-gray-200`}
            key={aluno.idAluno}
        >
            <div
                className="relative flex flex-row sm:items-center items-start justify-between  sm:gap-4 w-full h-1/3"
            >
                <div className="gap-4 flex sm:flex-row flex-col items-center justify-end w-full h-full">
                    {aluno.urlFotoPerfil && !imgErro ? (
                        <img
                            src={aluno.urlFotoPerfil}
                            alt="Imagem do aluno"
                            className='sm:w-12 sm:h-12 w-20 h-20 lg:w-15 lg:h-15 rounded-full'
                            onError={() => setImgErro(true)}
                        />

                    ) : (
                        <FaUserCircle className="flex-shrink-0 sm:w-12 sm:h-12 w-20 h-20 lg:w-15 lg:h-15 text-[#4B5563]" />
                    )}

                    <div className="flex-1 w-full flex flex-col items-start justify-center">
                        <p className="font-bold text-xl w-full sm:text-left text-center">{aluno.nomeAluno}</p>
                        <p className="text-base text-gray-600 flex items-start">
                            <b>Telefone:</b> {MascaraTelefone(aluno.celular)}
                        </p>
                    </div>
                </div>
                <div className="text-[var(--azul-claro)] font-normal text-xs bg-[#748CAB36] rounded-[15px] h-auto w-[100px] p-[0.5rem] 2xl:p-2  flex flex-row items-center justify-center text-center">
                    {aluno.nomePlano}
                </div>

                {/* Botão + menu */}
                <div onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    setOpenMenuId(openMenuId === aluno.idAluno ? null : aluno.idAluno);
                }}
                    className="pt-2 sm:pt-0 flex justify-end items-center rounded-[5px] cursor-pointer sm:hover:bg-gray-300 transition duration-200">
                    <div className="relative" ref={buttonRef}>
                        <button
                            className="flex items-center justify-center sm:w-8 w-4 sm:h-8 h-4 cursor-pointer"
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
            </div>
            <div className="w-full h-1/3 flex flex-col items-start justify-center">
                <p className="flex items-start gap-0.5 text-base">
                    {aluno.objetivoTreino ? (
                        <>
                            <span className="text-gray-600"><b>Objetivo:</b> {aluno.objetivoTreino}</span>
                        </>
                    ) : (
                        <>
                            <HiOutlineClock className="shrink-0 mt-1 w-4 h-4 text-[#4B5563]" />
                            <span>Anamnese pendente</span>
                        </>
                    )
                    }
                </p>
                <p className="flex items-start text-base">
                    <span><b>Nível de atividade atual:</b> {formatarNivelAtividade(aluno.nivelAtividade)}</span>
                </p>
            </div>
            <div className="w-full h-1/3 flex flex-col items-center justify-end border-t-2 border-gray-200 rounded-b-md">
                <Button
                    id={"btn-visualizar-aluno"}
                    texto={"Ver Perfil do Aluno"}
                    cor={"var(--azul-claro)"}
                    corTexto="#fff"
                    height={"50px"}
                    ariaLabel={"Visualizar Perfil"}
                    fontSize={"16px"}
                    fontWeight={"600"}
                    width={"80%"}
                    onClick={() => onCardClick(aluno.idAluno)}
                />
            </div>
        </div>
    );
}

export default CardAluno;