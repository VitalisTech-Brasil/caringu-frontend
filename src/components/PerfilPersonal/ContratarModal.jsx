import React from "react";
import barraProgresso from "../../assets/images/barra-progresso.svg";
import barraProgresso2 from "../../assets/images/barra-progresso-2.svg";
import barraMetade from "../../assets/images/barra-metade.svg";
import barraCompleta from "../../assets/images/barra-completa.svg";
import Button from "../Utils/Button";

const ContratarModal = ({
  open,
  statusEtapa,
  closeModal,
  handleJaCombinei,
  handleConfirmarPagamento,
}) => {
  if (!open) return null;

  let barraImg = barraProgresso;
  if (statusEtapa === "PENDENTE") barraImg = barraProgresso2;
  else if (statusEtapa === "COMBINADO") barraImg = barraMetade;
  else if (statusEtapa === "PAGO") barraImg = barraCompleta;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
      <div className="absolute inset-0 bg-[#000000] opacity-50" aria-label="Fundo Escurecido"></div>
      <div className="relative p-4 w-full max-w-2xl">
        <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 mb-4 ">
            <button
              type="button"
              onClick={closeModal}
              className="bg-[#B41F1F] text-[var(--cor-secundaria)] rounded-lg text-xs sm:text-sm cursor-pointer w-10 h-10 md:w-13 md:h-13 inline-flex justify-center items-center absolute top-2 right-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="w-auto h-auto flex flex-row items-start justify-start gap-10 pl-0 md:pl-5">
            <img
              src={barraImg}
              alt="Status de contratação de plano"
              className="pt-4 h-135 sm:h-115"
            />
            <div className="flex flex-col items-start justify-start sm:gap-8">
              <div>
                <h2 className="text-[var(--cor-primaria)]  font-semibold text-base sm:text-xl">
                  Combinar com o Personal Trainer
                </h2>
                <p className="text-[var(--cor-primaria)] text-[13px] sm:text-base font-normal">
                  Antes de realizar o pagamento, é preciso combinar com o Personal Trainer a forma de pagamento. Entre em contato pelo número localizado no seu perfil antes de realizar qualquer pagamento.
                </p>
              </div>
              <div>
                <h2 className="text-[var(--cor-primaria)] mt-[11%] sm:mt-0 font-semibold text-base sm:text-xl">
                  Confirmar pagamento</h2>
                <p className="text-[var(--cor-primaria)] text-[13px] sm:text-base font-normal">
                  Para que o plano seja liberado, é necessário combinar uma forma de pagamento com o personal e realizar o pagamento. Quando essa etapa for completa, clique no botão “confirmar pagamento”.
                </p>
              </div>
              <div>
                <h2 className="text-[var(--cor-primaria)]  mt-[11%] sm:mt-0 font-semibold text-base sm:text-xl">
                  Esperando confirmação do personal</h2>
                <p className="text-[var(--cor-primaria)] text-[13px] sm:text-base font-normal">
                  Após isso, o personal deve confirmar se recebeu o pagamento. Aguarde até que essa etapa seja concluída.
                </p>
              </div>
              <div>
                <h2 className="text-[var(--cor-primaria)]  mt-[11%] sm:mt-0 font-semibold text-base sm:text-xl">
                  Plano liberado</h2>
                <p className="text-[var(--cor-primaria)] text-[13px] sm:text-base font-normal">
                  Com todas as etapas anteriores concluídas, o plano será liberado para o seu acompanhamento.
                </p>
              </div>
            </div>
          </div>
          <div aria-label="Opções de Botões" className="flex flex-col items-center pt-15 w-full justify-center">
            {statusEtapa === "INICIAL" && (
              <Button
                texto="Já conversei com o personal"
                corTexto="var(--cor-secundaria)"
                cor="var(--azul-claro)"
                height="3rem"
                width="45%"
                fontWeight="600"
                ariaLabel="Já conversei com o personal"
                fontSize="16px"
                onClick={handleJaCombinei}
              />
            )}
            {statusEtapa === "PENDENTE" && (
              <Button
                texto="Confirmar pagamento"
                corTexto="var(--cor-secundaria)"
                cor="var(--azul-claro)"
                height="3rem"
                width="45%"
                fontWeight="600"
                ariaLabel="Confirmar pagamento"
                fontSize="16px"
                onClick={handleConfirmarPagamento}
              />
            )}
            {statusEtapa === "COMBINADO" && (
              <Button
                texto="Confirmar pagamento"
                corTexto="var(--cor-secundaria)"
                cor="#D9D9D9"
                height="3rem"
                width="45%"
                fontWeight="600"
                ariaLabel="Confirmar pagamento"
                fontSize="16px"
                disabled={true}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContratarModal;
