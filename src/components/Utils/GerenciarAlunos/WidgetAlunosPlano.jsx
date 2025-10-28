import React from 'react';
import AlunoCardPlanoFim from './AlunoCardPlanoFim';

const WidgetAlunosPlano = ({ 
    alunosAtivos
    /* imgErro removido — Card gerencia erro local */
}) => {
    // Filtra e ordena os alunos com plano perto do fim
    const alunosComPlano = [...alunosAtivos]
        .filter((aluno) => aluno.totalAulasContratadas - aluno.treinosTotal > 0)
        .sort((a, b) => {
            const aulasRestantesA = a.totalAulasContratadas - a.treinosTotal;
            const aulasRestantesB = b.totalAulasContratadas - b.treinosTotal;
            return aulasRestantesA - aulasRestantesB;
        });

    return (
        <div className="bg-[var(--cor-secundaria)] rounded-xl p-6 flex-1 overflow-hidden h-100 border-2 border-[#E6E6E2]">
            <h2 className="text-lg font-bold mb-4">
                Alunos com o plano perto do fim:
            </h2>
            <div className="space-y-2 overflow-y-auto border-2 border-[#E6E6E2] rounded-md p-2 h-70">
                {alunosComPlano.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-gray-500">
                        Nenhum aluno com plano próximo do fim
                    </div>
                ) : (
                    alunosComPlano.map((aluno) => (
                        <AlunoCardPlanoFim
                            key={aluno.idAluno}
                            aluno={aluno}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default WidgetAlunosPlano;