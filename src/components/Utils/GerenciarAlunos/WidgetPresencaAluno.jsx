import React from 'react';
import { Dropdown, DropdownItem } from "flowbite-react";
import AlunoPresencaCard from './AlunoPresencaCard';

const WidgetPresencaAlunos = ({ 
    valorSelecionado, 
    filter,
    alunosAtivos,
    alunosFiltrados,
    imgErro,
    setImgErro,
    onFilterChange,
}) => {
    return (
        <div className="bg-[var(--cor-secundaria)] rounded-xl p-6 flex-1 overflow-hidden h-100 border-2 border-[#E6E6E2]">
            <h2 className="text-lg font-bold mb-4">
                Presença de alunos por:
            </h2>
            
            <Dropdown label={valorSelecionado} className="!bg-[var(--cor-secundaria)]" inline>
                <DropdownItem 
                    className="filter bg-[var(--cor-secundaria)] !text-[var(--cor-primaria)] hover:!bg-gray-200 hover:!text-[var(--cor-primaria)]" 
                    onClick={() => onFilterChange("SEMANA", "Semana")}
                >
                    Semana
                </DropdownItem>
                <DropdownItem 
                    className="filter bg-[var(--cor-secundaria)] !text-[var(--cor-primaria)] hover:!bg-gray-200 hover:!text-[var(--cor-primaria)]" 
                    onClick={() => onFilterChange("MES", "Mês")}
                >
                    Mês
                </DropdownItem>
            </Dropdown>

            <div className="space-y-2 overflow-y-auto border-2 border-[#E6E6E2] rounded-md mt-2 h-65 p-2">
                {alunosAtivos.length === 0 && (
                    <div className="flex justify-center items-center h-full text-gray-500">
                        Sem alunos no momento.
                    </div>
                )}

                {alunosFiltrados.length > 0 && (
                    <>
                        {alunosFiltrados.map((aluno) => (
                            <AlunoPresencaCard
                                key={aluno.idAluno}
                                aluno={aluno}
                                filter={filter}
                                imgErro={imgErro}
                                setImgErro={setImgErro}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default WidgetPresencaAlunos;