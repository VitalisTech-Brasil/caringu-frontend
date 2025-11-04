import React from 'react';

const MensagemFeedback = ({
    label,
    texto,
    paddingLeftMensagem = "10%"
}) => {

        const labelExibido = label === "ALUNO"
        ? "Resposta do Aluno:"
        : label === "PERSONAL"
            ? "Seu comentário:"
            : label;

    return (
        <div className="flex flex-col flex-wrap items-start w-auto h-auto gap-0.5 justify-start text-xs text-[#15171B]">
            <div className="flex flex-wrap flex-row items-center w-auto h-auto gap-1 justify-start">
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4.25 9.5H4C2 9.5 1 9 1 6.5V4C1 2 2 1 4 1H8C10 1 11 2 11 4V6.5C11 8.5 10 9.5 8 9.5H7.75C7.595 9.5 7.445 9.575 7.35 9.7L6.6 10.7C6.27 11.14 5.73 11.14 5.4 10.7L4.65 9.7C4.57 9.59 4.385 9.5 4.25 9.5Z" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.99823 5.5H8.00272" stroke="#1D2D44" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.99774 5.5H6.00223" stroke="#1D2D44" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.99725 5.5H4.00174" stroke="#1D2D44" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                    {labelExibido}
                </span>
            </div>
            <div className={`sm:pl-[4%] pl-[${paddingLeftMensagem}] w-full`}>
                <span className="w-full text-xs whitespace-normal break-words">
                    {texto}
                </span>
            </div>
        </div>
    );
}

export default MensagemFeedback;