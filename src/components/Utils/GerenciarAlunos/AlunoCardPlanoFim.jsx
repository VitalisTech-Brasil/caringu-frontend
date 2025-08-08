import React from 'react';
import { FaUserCircle } from "react-icons/fa";

const AlunoCardPlanoFim = ({ aluno,  imgErro, setImgErro }) => {

        const aulasRestantes = aluno.totalAulasContratadas - aluno.treinosTotal;

    return (
        <div
            key={aluno.idAluno}
            className="relative flex items-center justify-between bg-[var(--cor-secundaria)] border-2 border-[#E6E6E2] p-4 gap-4 rounded-md hover:bg-gray-50 cursor-pointer transition duration-200"
        >
            {aluno.urlFotoPerfil && !imgErro ? (
                <img
                    src={aluno.urlFotoPerfil}
                    alt="Imagem do aluno"
                    className='w-12 h-12 lg:w-15 lg:h-15 rounded-full'
                    onError={() => setImgErro(true)}
                />
            ) : (
                <FaUserCircle className="flex-shrink-0 w-12 h-12 lg:w-15 lg:h-15 text-[#4B5563]" />
            )}

            <div className="flex-1">
                <p className="font-bold text-md">{aluno.nomeAluno}</p>
                <p className="text-sm text-gray-600">
                    {aulasRestantes} {aulasRestantes === 1 ? 'aula restante' : 'aulas restantes'}
                </p>
            </div>
        </div>
    );
};

export default AlunoCardPlanoFim;