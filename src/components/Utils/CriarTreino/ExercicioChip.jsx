import React from 'react';

const ExercicioChip = ({ exercicio, onEdit, onRemove }) => {
    return (
        <div 
            key={exercicio.id} 
            className="bg-orange-500 text-white px-3 py-1 rounded-[5px] flex items-center cursor-pointer hover:bg-orange-600 transition-colors duration-200" 
            onClick={() => onEdit(exercicio)}
        >
            {exercicio.nome}
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(exercicio.id);
                }}
                className="ml-2 font-bold bg-[#FFFDF6] rounded-[5px] h-5 w-5 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                aria-label={`Remover exercício ${exercicio.nome}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="4" viewBox="0 0 14 4" fill="none">
                    <path d="M12 2H2" stroke="#B41F1F" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

export default ExercicioChip;