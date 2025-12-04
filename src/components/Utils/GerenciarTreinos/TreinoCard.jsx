import React from 'react';
import { FaEllipsisV } from "react-icons/fa";
import ButtonInterno from "../../../components/Utils/Button";

const TreinoCard = ({ 
    treino, 
    onToggleFavorito,
    onMenuClick,
    openMenuId,
    menuRef,
    buttonRef,
    children 
}) => {
    const getDificuldadeText = (dificuldade) => {
        switch (dificuldade) {
            case 'INICIANTE': return 'Iniciante';
            case 'INTERMEDIARIO': return 'Intermediário';
            case 'AVANCADO': return 'Avançado';
            default: return dificuldade;
        }
    };

    const getOrigemText = (origem) => {
        switch (origem) {
            case 'BIBLIOTECA': return 'Biblioteca';
            case 'PERSONAL': return 'Personal';
            default: return origem;
        }
    };

    return (
        <div 
            key={treino.treinoId} 
            className="relative w-full bg-[var(--cor-secundaria)] border border-[#E6E6E2] flex flex-wrap items-center rounded-lg p-2"
        >
            <div className="relative flex gap-1 sm:gap-2 sm:flex-row flex-col-reverse sm:items-center items-start justify-between md:gap-8 w-full sm:p-4 p-2 md:p-5">
                <div className="relative flex sm:flex-row flex-col gap-5 md:gap-10 items-center md:items-start justify-start w-full">
                    {/* Ícone do treino */}
                    <div className="relative flex grid-cols-2 items-center justify-between bg-[#FDFFFD] rounded-lg w-12 md:w-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="sm:w-10 sm:h-15 w:14 h-21 col-span-1" viewBox="0 0 60 49" fill="none">
                            <path d="M48.3716 10.4004H52.0925C53.1194 10.4004 53.9529 11.4532 53.9529 12.7504V36.2504C53.9529 37.5476 53.1194 38.6004 52.0925 38.6004H48.3716C47.3447 38.6004 46.5112 37.5476 46.5112 36.2504V12.7504C46.5112 11.4532 47.3447 10.4004 48.3716 10.4004Z" stroke="#E96E35" strokeWidth="2" />
                            <path d="M40.9298 1H44.6506C45.6775 1 46.511 2.0528 46.511 3.35V45.65C46.511 46.9472 45.6775 48 44.6506 48H40.9298C39.9028 48 39.0693 46.9472 39.0693 45.65V3.35C39.0693 2.0528 39.9028 1 40.9298 1Z" stroke="#E96E35" strokeWidth="2" />
                            <path d="M14.8834 1H18.6042C19.6311 1 20.4646 2.0528 20.4646 3.35V45.65C20.4646 46.9472 19.6311 48 18.6042 48H14.8834C13.8564 48 13.0229 46.9472 13.0229 45.65V3.35C13.0229 2.0528 13.8564 1 14.8834 1Z" stroke="#E96E35" strokeWidth="2" />
                            <path d="M7.44147 10.4004H11.1623C12.1893 10.4004 13.0227 11.4532 13.0227 12.7504V36.2504C13.0227 37.5476 12.1893 38.6004 11.1623 38.6004H7.44147C6.41452 38.6004 5.58105 37.5476 5.58105 36.2504V12.7504C5.58105 11.4532 6.41452 10.4004 7.44147 10.4004Z" stroke="#E96E35" strokeWidth="2" />
                            <path d="M53.9531 24.5H59.5344" stroke="#E96E35" strokeWidth="2" />
                            <path d="M20.4648 24.5H39.069" stroke="#E96E35" strokeWidth="2" />
                            <path d="M0 24.5H5.58125" stroke="#E96E35" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* Informações do treino */}
                    <div className="flex flex-col md:flex-row md:grid-cols-2 md:gap-5 w-full">
                        <div className="md:col-span-1 text-base md:text-lg">
                            <p><b>Treino: </b>{treino.nomeTreino}</p>
                            <p><b>Quantidade de exercícios: </b>{treino.quantidadeExercicios}</p>
                        </div>
                        <div className="md:col-span-1 text-base md:text-lg">
                            <p><b>Dificuldade: </b>{getDificuldadeText(treino.grauDificuldade)}</p>
                            <p><b>Origem: </b>{getOrigemText(treino.origemTreinoExercicio)}</p>
                        </div>
                    </div>

                    {/* Botão favorito mobile */}
                    <div className="flex flex-col sm:hidden gap-2">
                        <ButtonInterno
                            logoSvg={
                                treino.favorito ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="sm:w-10 sm:h-10 w-13 h-13" viewBox="0 0 58 58" fill="none">
                                        <path d="M33.1809 8.48238L37.4342 16.9891C38.0142 18.1732 39.5609 19.309 40.8659 19.5266L48.575 20.8074C53.505 21.629 54.665 25.2057 51.1125 28.7341L45.1192 34.7274C44.1042 35.7424 43.5484 37.6999 43.8625 39.1016L45.5784 46.5207C46.9317 52.3932 43.8142 54.6649 38.6184 51.5957L31.3925 47.3182C30.0875 46.5449 27.9367 46.5449 26.6075 47.3182L19.3817 51.5957C14.21 54.6649 11.0684 52.3691 12.4217 46.5207L14.1375 39.1016C14.4517 37.6999 13.8959 35.7424 12.8809 34.7274L6.88752 28.7341C3.35919 25.2057 4.49502 21.629 9.42502 20.8074L17.1342 19.5266C18.415 19.309 19.9617 18.1732 20.5417 16.9891L24.795 8.48238C27.115 3.86655 30.885 3.86655 33.1809 8.48238Z" fill="#E96E35" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="sm:w-10 sm:h-10 w-13 h-13" viewBox="0 0 58 58" fill="none">
                                        <path d="M33.1809 8.48238L37.4342 16.9891C38.0142 18.1732 39.5609 19.309 40.8659 19.5266L48.575 20.8074C53.505 21.629 54.665 25.2057 51.1125 28.7341L45.1192 34.7274C44.1042 35.7424 43.5484 37.6999 43.8625 39.1016L45.5784 46.5207C46.9317 52.3932 43.8142 54.6649 38.6184 51.5957L31.3925 47.3182C30.0875 46.5449 27.9367 46.5449 26.6075 47.3182L19.3817 51.5957C14.21 54.6649 11.0684 52.3691 12.4217 46.5207L14.1375 39.1016C14.4517 37.6999 13.8959 35.7424 12.8809 34.7274L6.88752 28.7341C3.35919 25.2057 4.49502 21.629 9.42502 20.8074L17.1342 19.5266C18.415 19.309 19.9617 18.1732 20.5417 16.9891L24.795 8.48238C27.115 3.86655 30.885 3.86655 33.1809 8.48238Z" fill="#FFFDF6" stroke="#15171B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )
                            }
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorito(treino.treinoId);
                            }}
                        />
                    </div>
                </div>

                {/* Botões da direita */}
                <div className="flex justify-end sm:flex-row flex-col-reverse gap-8 md:gap-5 lg:gap-10 sm:w-auto w-full">
                    {/* Botão favorito desktop */}
                    <div className="hidden sm:flex">
                        <ButtonInterno
                            logoSvg={
                                treino.favorito ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 58 58" fill="none">
                                        <path d="M33.1809 8.48238L37.4342 16.9891C38.0142 18.1732 39.5609 19.309 40.8659 19.5266L48.575 20.8074C53.505 21.629 54.665 25.2057 51.1125 28.7341L45.1192 34.7274C44.1042 35.7424 43.5484 37.6999 43.8625 39.1016L45.5784 46.5207C46.9317 52.3932 43.8142 54.6649 38.6184 51.5957L31.3925 47.3182C30.0875 46.5449 27.9367 46.5449 26.6075 47.3182L19.3817 51.5957C14.21 54.6649 11.0684 52.3691 12.4217 46.5207L14.1375 39.1016C14.4517 37.6999 13.8959 35.7424 12.8809 34.7274L6.88752 28.7341C3.35919 25.2057 4.49502 21.629 9.42502 20.8074L17.1342 19.5266C18.415 19.309 19.9617 18.1732 20.5417 16.9891L24.795 8.48238C27.115 3.86655 30.885 3.86655 33.1809 8.48238Z" fill="#E96E35" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 58 58" fill="none">
                                        <path d="M33.1809 8.48238L37.4342 16.9891C38.0142 18.1732 39.5609 19.309 40.8659 19.5266L48.575 20.8074C53.505 21.629 54.665 25.2057 51.1125 28.7341L45.1192 34.7274C44.1042 35.7424 43.5484 37.6999 43.8625 39.1016L45.5784 46.5207C46.9317 52.3932 43.8142 54.6649 38.6184 51.5957L31.3925 47.3182C30.0875 46.5449 27.9367 46.5449 26.6075 47.3182L19.3817 51.5957C14.21 54.6649 11.0684 52.3691 12.4217 46.5207L14.1375 39.1016C14.4517 37.6999 13.8959 35.7424 12.8809 34.7274L6.88752 28.7341C3.35919 25.2057 4.49502 21.629 9.42502 20.8074L17.1342 19.5266C18.415 19.309 19.9617 18.1732 20.5417 16.9891L24.795 8.48238C27.115 3.86655 30.885 3.86655 33.1809 8.48238Z" fill="#FFFDF6" stroke="#15171B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )
                            }
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorito(treino.treinoId);
                            }}
                        />
                    </div>

                    {/* Menu de ações */}
                    <div 
                        onClick={(e) => {
                            e.stopPropagation();
                            onMenuClick(treino.treinoId);
                        }}
                        className="flex justify-end items-center"
                    >
                        <div className="relative" ref={buttonRef}>
                            <button className="flex items-center justify-center sm:w-8 w-4 sm:h-8 h-4 cursor-pointer rounded-[5px] sm:hover:bg-gray-300 transition duration-200">
                                <FaEllipsisV className="text-xl" />
                            </button>

                            {openMenuId === treino.treinoId && (
                                <div
                                    ref={menuRef}
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute top-0 right-full mr-2 z-50 bg-[var(--cor-secundaria)] border border-gray-200 rounded-md shadow-lg p-2"
                                >
                                    {children}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreinoCard;