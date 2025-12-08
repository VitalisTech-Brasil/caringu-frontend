import React from "react";
import ButtonInterno from "../Button";

const TreinoRelatorioCard = ({
    treino,
    onVerRelatorio,
    formatarDificuldade
}) => {
    return (
        <div
            key={treino.treinoId}
            className="w-full bg-[var(--cor-secundaria)] border-2 border-[#E6E6E2] flex flex-wrap items-center rounded-lg justify-between p-4"
        >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-8 w-full">
                <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex grid-cols-2 items-center justify-between bg-[#FDFFFD] rounded-lg w-12 md:w-10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="sm:w-10 sm:h-15 w:14 h-21 col-span-1"
                            viewBox="0 0 60 49"
                            fill="none"
                        >
                            <path d="M48.3716 10.4004H52.0925C53.1194 10.4004 53.9529 11.4532 53.9529 12.7504V36.2504C53.9529 37.5476 53.1194 38.6004 52.0925 38.6004H48.3716C47.3447 38.6004 46.5112 37.5476 46.5112 36.2504V12.7504C46.5112 11.4532 47.3447 10.4004 48.3716 10.4004Z" stroke="#E96E35" strokeWidth="2" />
                            <path d="M40.9298 1H44.6506C45.6775 1 46.511 2.0528 46.511 3.35V45.65C46.511 46.9472 45.6775 48 44.6506 48H40.9298C39.9028 48 39.0693 46.9472 39.0693 45.65V3.35C39.0693 2.0528 39.9028 1 40.9298 1Z" stroke="#E96E35" strokeWidth="2" />
                            <path d="M14.8834 1H18.6042C19.6311 1 20.4646 2.0528 20.4646 3.35V45.65C20.4646 46.9472 19.6311 48 18.6042 48H14.8834C13.8564 48 13.0229 46.9472 13.0229 45.65V3.35C13.0229 2.0528 13.8564 1 14.8834 1Z" stroke="#E96E35" strokeWidth="2" />
                            <path d="M7.44147 10.4004H11.1623C12.1893 10.4004 13.0227 11.4532 13.0227 12.7504V36.2504C13.0227 37.5476 12.1893 38.6004 11.1623 38.6004H7.44147C6.41452 38.6004 5.58105 37.5476 5.58105 36.2504V12.7504C5.58105 11.4532 6.41452 10.4004 7.44147 10.4004Z" stroke="#E96E35" strokeWidth="2" />
                            <path d="M53.9531 24.5H59.5344" stroke="#E96E35" strokeWidth="2" />
                            <path d="M20.4648 24.5H39.069" stroke="#E96E35" strokeWidth="2" />
                            <path d="M0 24.5H5.58125" stroke="#E96E35" strokeWidth="2" />
                        </svg>
                    </div>
                    <div className='flex flex-col md:flex-row fle gap-0 md:gap-4 w-full items-start sm:w-auto'>
                        <div>
                            <p><b>Treino: </b>{treino.nomeTreino}</p>
                            <p><b>Quantidade de exercícios: </b>{treino.quantidadeExercicios}</p>
                        </div>
                        <div>
                            <p><b>Dificuldade: </b>{formatarDificuldade(treino.grauDificuldade)}</p>
                        </div>
                    </div>
                </div>
                <ButtonInterno
                    texto="Ver Relatório"
                    type="submit"
                    cor="var(--cor-secundaria)"
                    corTexto="var(--cor-primaria)"
                    classNameExtra="w-full sm:w-[180px] md:w-[268px]"
                    height="50px"
                    font-size="20px"
                    onClick={() => onVerRelatorio(treino.treinoId)}
                    borderStyle="solid"
                    borderWidth="2px"
                    borderColor="rgba(29, 45, 68, 0.11)"
                    fontWeight="600"
                />
            </div>
        </div>
    );
};

export default TreinoRelatorioCard;