import React from "react";
import Button from "../Button";


const CardAula = ({
    data,
    diaSemana,
    horarioInicio,
    horarioFim,
    quantidadeFeedbacks,
    onVerFeedbacks
}) => {
    return (
        <div className="border-2 border-gray-300 rounded p-2 flex flex-col h-auto gap-2">
            <div className="flex xl:flex-row lg:flex-col-reverse sm:flex-row flex-col-reverse gap-2 xl:gap-0 xl:justify-between lg:justify-start justify-between h-auto w-full">
                <div className="flex flex-row flex-wrap gap-1 font-bold xl:text-2xl text-xl w-auto h-auto">
                    <span>Aula</span>
                    <span>{data}</span>
                </div>
                <div className="h-auto w-auto">
                    <div className="min-h-6 h-auto w-auto  border-1 border-[var(--laranja)] text-[var(--laranja)] rounded-2xl flex flex-wrap flex-row items-center justify-center gap-1 text-[12px] font-normal px-2">
                        <svg className="shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.66659 12.6666H5.33325C2.66659 12.6666 1.33325 11.9999 1.33325 8.66659V5.33325C1.33325 2.66659 2.66659 1.33325 5.33325 1.33325H10.6666C13.3333 1.33325 14.6666 2.66659 14.6666 5.33325V8.66659C14.6666 11.3333 13.3333 12.6666 10.6666 12.6666H10.3333C10.1266 12.6666 9.92659 12.7666 9.79992 12.9333L8.79992 14.2666C8.35992 14.8533 7.63992 14.8533 7.19992 14.2666L6.19992 12.9333C6.09325 12.7866 5.84659 12.6666 5.66659 12.6666Z" stroke="#E96E35" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.6644 7.33333H10.6704" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.99691 7.33333H8.0029" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.32967 7.33333H5.33566" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{quantidadeFeedbacks}</span>
                        <span>Feedbacks</span>
                    </div>
                </div>
            </div>
            <div className="flex 2xl:flex-row lg:flex-col sm:flex-row flex-col w-auto h-auto items-center gap-2 2xl:gap-10">
                <div className="h-auto w-full flex flex-row gap-1 items-center sm:justify-start justify-center text-base font-medium text-[var(--azul-escuro)]">
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
                <div className="h-auto w-full flex flex-row gap-1 items-center sm:justify-start justify-center text-base font-medium text-[var(--azul-escuro)]">
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
                    id="btnVerFeedbacks"
                    texto="Ver Feedbacks"
                    corTexto="#fff"
                    cor="var(--azul-claro)"
                    classNameExtra="w-full h-10 text-base"
                    ariaLabel={"Botão Ver Feedbacks"}
                    fontWeight="600"
                    onClick={onVerFeedbacks}
                />
            </div>
        </div>
    );
}

export default CardAula;