import React from "react";
import Button from "../Button";

const CardAulaTreino = ({
    data,
    diaSemana,
    horarioInicio,
    horarioFim,
    onVerTreinos,
    paddingCard = "p-2",
    alignIcons = "2xl:flex-row lg:flex-col sm:flex-row flex-col",
    alignText = "sm:justify-start justify-center"

}) => {
    return (
        <div className={`border-2 border-gray-300 rounded ${paddingCard} flex flex-col h-auto gap-2`}>
            <div className="flex xl:flex-row lg:flex-col-reverse sm:flex-row flex-col-reverse gap-2 xl:gap-0 xl:justify-between lg:justify-start justify-between h-auto w-full">
                <div className="flex flex-row flex-wrap gap-1 font-bold xl:text-2xl text-xl w-auto h-auto">
                    <span>Aula</span>
                    <span>{data}</span>
                </div>
            </div>
            <div className={`flex ${alignIcons} w-auto h-auto items-center gap-2 2xl:gap-10`}>
                <div className={`h-auto w-full flex flex-row gap-1 items-center ${alignText} text-base font-medium text-[var(--azul-escuro)]`}>
                    <svg className="shrink-0" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5336 4.7883L13.1466 14.3721C12.9766 15.0875 12.3391 15.5833 11.6024 15.5833H2.29489C1.2253 15.5833 0.460316 14.5349 0.779066 13.5078L3.76114 3.93124C3.96656 3.26541 4.58282 2.80493 5.27699 2.80493H13.9895C14.6624 2.80493 15.222 3.21577 15.4557 3.78244C15.5903 4.08702 15.6186 4.43413 15.5336 4.7883Z" stroke="#1D2D44" strokeMiterlimit="10" />
                        <path d="M11.3333 15.5833H14.7191C15.6328 15.5833 16.3482 14.8112 16.2845 13.8975L15.5833 4.25" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.85669 4.51919L7.59336 1.45923" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.6025 4.52629L12.2684 1.45215" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5.4541 8.5H11.1208" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.74585 11.3333H10.4125" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>
                        {diaSemana}
                    </span>
                </div>
                <div className={`h-auto w-full flex flex-row gap-1 items-center ${alignText} text-base font-medium text-[var(--azul-escuro)]`}>
                    <svg className="shrink-0" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.50008 1.41675C4.59716 1.41675 1.41675 4.59716 1.41675 8.50008C1.41675 12.403 4.59716 15.5834 8.50008 15.5834C12.403 15.5834 15.5834 12.403 15.5834 8.50008C15.5834 4.59716 12.403 1.41675 8.50008 1.41675ZM11.5813 11.0288C11.4822 11.1988 11.3051 11.2909 11.1209 11.2909C11.0288 11.2909 10.9367 11.2697 10.8517 11.213L8.65591 9.90258C8.1105 9.57675 7.70675 8.86133 7.70675 8.23091V5.32675C7.70675 5.03633 7.94758 4.7955 8.238 4.7955C8.52841 4.7955 8.76925 5.03633 8.76925 5.32675V8.23091C8.76925 8.48591 8.98175 8.86133 9.20133 8.98883L11.3972 10.2992C11.6522 10.448 11.7372 10.7738 11.5813 11.0288Z" fill="#1D2D44" />
                    </svg>
                    <span>
                        {horarioInicio} - {horarioFim}
                    </span>
                </div>
            </div>
            <div>
                <Button
                    id="btnVerTreinos"
                    texto="Ver Treinos"
                    corTexto="#fff"
                    cor="var(--azul-claro)"
                    classNameExtra="w-full h-10 text-base"
                    ariaLabel={"Botão Ver Treinos"}
                    fontWeight="600"
                    onClick={onVerTreinos}
                />
            </div>
        </div>
    );

}

export default CardAulaTreino;