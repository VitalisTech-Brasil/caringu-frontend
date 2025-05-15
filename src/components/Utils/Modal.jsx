import Button from "./Button";
import React from "react";

function Modal({ 
         visivel,
         fecharModal,
         titulo,
         descricao,
         onConfirm,
         icone,
         textoBotaoConfirmar,
         textoBotaoCancelar,
         ariaLabel
}) {
  if (!visivel) return null;

  return (
    <>
      {/* Modal */}
      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
        aria-label={ariaLabel}
      >
        <div className="absolute inset-0 bg-[#000000] opacity-50"
              aria-label="Fundo Escurecido"
        ></div>

        <div aria-label="Modal com conteúdo dentro" className="relative p-4  w-2xl 2xl:w-4xl h-100 md:h-110 2xl:h-132">
          <div aria-label="Fechar Modal" className="relative bg-[var(--cor-secundaria)] rounded-[6px] h-full flex flex-col justify-center items-center">
            {/* Botão para fechar o modal */}
            <button
              type="button"
              onClick={fecharModal}
              aria-label="Botão de Fechar Modal"
              className="absolute top-2 right-2 text-[var(--cor-secundaria)] bg-[#B41F1F] cursor-pointer rounded-lg text-sm w-10 h-10 md:w-13 md:h-13 inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-label="Ícone de Fechar"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>

            {/* Conteúdo do modal */}
            <div aria-label="Texto de apoio e Botões" className="flex flex-col items-center text-center">

              <img src={icone} aria-label="Icone" className="w-20 h-20 sm:w-25 sm:h-25 md:w-30 md:h-30 mb-5" alt="icone" />
              <h1 aria-label="Título" className="text-[var(--cor-primaria)] font-bold text-[18px] sm:text-[24px] md:text-[32px] ">{titulo}</h1>
              <h3 aria-label="Descrição" className="mb-5 text-[16px] sm:text-[20px] md:text-[24px] font-medium text-[var(--cor-primaria)] opacity-68">
                {descricao}
              </h3>

              {/* Botões de ação */}
              <div aria-label="Opções de Botões" className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center">
                <Button
                  texto={textoBotaoCancelar}
                  corTexto="#B41F1F"
                  cor="var(--cor-secundaria)"
                  height="2.75rem"
                  width="13.25rem"
                  corHover="#1D2D4417"
                  fontWeight="500"
                  onClick={onConfirm}
                  ariaLabel={"Botão de Cancelar"}
                >
                </Button>

                <Button
                  texto={textoBotaoConfirmar}
                  corTexto="var(--cor-secundaria)"
                  cor="#46982B"
                  height="2.75rem"
                  width="9.2rem"
                  corHover="#46982BE5"
                  fontWeight="600"
                  onClick={fecharModal}
                  ariaLabel={"Botão de Confirmar"}
                >
                </Button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;