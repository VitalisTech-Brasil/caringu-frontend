import React from "react";
import { HiOutlineTrash, HiX } from "react-icons/hi";

const ModalRemoverEspecialidade = ({
  especialidadeId,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50 z-50">
      <div className="bg-[#fdfcf9] rounded-md p-6 max-w-md w-full">
        {/* Cabeçalho com botão de fechar */}
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            aria-label="Fechar modal"
            className="rounded-full bg-red-600 text-white p-2 cursor-pointer hover:bg-red-700"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>

        {/* Ícone de alerta */}
        <div className="flex justify-center my-4">
          <HiOutlineTrash className="text-red-600 text-6xl" />
        </div>

        {/* Texto de confirmação */}
        <div className="text-center">
          <h2 className="font-bold text-gray-900 text-[18px]">
            Tem certeza que deseja remover?
          </h2>
          <p className="text-gray-500 mt-2 text-[16px]">
            Você não poderá utilizá-la futuramente.
          </p>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => {onConfirm(especialidadeId), onCancel()}}
            className="text-red-600 border-solid border-2 border-[#B41F1F] font-semibold bg-transparent cursor-pointer text-[16px] p-2 rounded-md"
          >
            Remover mesmo assim
          </button>
          <button
            onClick={onCancel}
            className="bg-green-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-green-700 text-[16px]"
          >
            Manter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRemoverEspecialidade;