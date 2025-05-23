import React from "react";
import Button from "../Utils/Button"

const CardSolitacoes = ({ }) => {
    return (
        <>
            <div className="ml-[1.5rem] sm:ml-[2.5rem] h-auto w-[95%] border-solid border-[#1D2D441C] border-[4px] rounded-md">
                <div className="flex flex-col md:flex-row items-center px-4 md:pl-[5rem] gap-4 md:gap-8 mt-4 mb-4">
                    <div className="flex flex-col items-start justify-center gap-2 md:gap-4 w-full md:w-[35%] p-2 md:p-0">
                        <div className="flex flex-row items-center text-lg md:text-base xl:text-2xl text-[var(--cor-primaria)] w-full">
                            <span className="font-normal break-words">
                                <b className="font-semibold">Nome do cliente:</b> Maria Gladys Mello da Silva
                            </span>
                        </div>
                        <div className="text-lg md:text-base xl:text-2xl text-[var(--cor-primaria)] w-full">
                            <span className="font-normal break-words">
                                <b className="font-semibold">Plano solicitado:</b> Plano Basic
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-2 md:gap-4 w-full md:w-[35%] p-2 md:p-0">
                        <div className="flex flex-row items-center text-lg md:text-base xl:text-2xl text-[var(--cor-primaria)] w-full">
                            <span className="font-normal break-words">
                                <b className="font-semibold">Telefone:</b> 11964217580
                            </span>
                        </div>
                        <div className="text-lg md:text-base xl:text-2xl text-[var(--cor-primaria)] w-full">
                            <span className="font-normal break-words">
                                <b className="font-semibold">Valor do plano:</b> R$500,00
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-row flex-wrap lg:flex-nowrap items-center h-auto justify-start md:justify-end w-full md:w-[30%] gap-2 md:gap-6 ">
                        <div className="w-full md:w-48 flex items-center h-[3.5rem]"> 
                            <Button
                                id="btnConfirmarPagamento"
                                texto="Confirmar pagamento"
                                onClick={() => { }}
                                cor="#46982B"
                                corTexto="var(--cor-secundaria)"
                                corHover="#46982B"
                                width="100%"
                                height="100%"
                                fontSize="16px"
                                ariaLabel="Botão Confirmar pagamento"
                            />
                        </div>
                        <div className="w-full md:w-48 flex items-center h-[3.5rem]"> 
                            <Button
                                id="btnCancelar"
                                texto="Cancelar Solicitação"
                                onClick={() => { }}
                                cor="#B41F1F"
                                corTexto="var(--cor-secundaria)"
                                corHover="#B41F1F"
                                width="100%"
                                height="100%"
                                fontSize="16px"
                                ariaLabel="Botão Cancelar Solicitação"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardSolitacoes;