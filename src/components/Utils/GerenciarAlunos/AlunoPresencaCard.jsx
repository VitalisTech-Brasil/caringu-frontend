import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";

const AlunoPresencaCard = ({ 
    aluno, 
    filter,
}) => {
    const [imgErroLocal, setImgErroLocal] = useState(false);
    const frequenciaMediaMensal = aluno.frequenciaTreino
        ? Math.round(aluno.frequenciaTreino * 52 / 12)
        : 0;

    return (
        <div
            key={aluno.idAluno}
            className="relative flex sm:flex-row flex-col items-center justify-between bg-[var(--cor-secundaria)] rounded-md p-2 sm:p-4 gap-4 w-full border-2 border-[#E6E6E2] hover:bg-gray-50 transition duration-200"
        >
            {aluno.urlFotoPerfil && !imgErroLocal ? (
                <img
                    src={aluno.urlFotoPerfil}
                    alt="Imagem do aluno"
                    className='w-20 h-20 sm:w-12 sm:h-12 lg:w-15 lg:h-15 rounded-full'
                    onError={() => setImgErroLocal(true)}
                />
            ) : (
                <FaUserCircle className="flex-shrink-0 w-12 h-12 lg:w-15 lg:h-15 text-[#4B5563]" />
            )}

            {filter === "SEMANA" && (
                <div className="flex-1">
                    <p className="font-bold text-md">
                        {aluno.nomeAluno} {aluno.treinosSemanaCalculado === 0 ? "não treinou" : `treinou ${aluno.treinosSemanaCalculado}x`} essa semana
                    </p>
                    <p className="text-sm text-gray-600">
                        Frequência determinada: {aluno.frequenciaTreino}x por semana
                    </p>
                </div>
            )}

            {filter === "MES" && (
                <div className="flex-1">
                    <p className="font-bold text-md">
                        {aluno.nomeAluno} {aluno.treinosMesCalculado === 0 ? "não treinou" : `treinou ${aluno.treinosMesCalculado}x`} esse mês
                    </p>
                    <p className="text-sm text-gray-600">
                        Frequência determinada: {frequenciaMediaMensal}x por mês
                    </p>
                </div>
            )}
        </div>
    );
};

export default AlunoPresencaCard;