import React from "react";

const CardAlunoAtivos = ({
    idAlunos,
    urlImagem,
    nome,
    nomePlano,
    niverExperiencia
}) => {
    return (
        <>
            <div id={idAlunos}
            className="w-[90%] h-[9.5rem] rounded-md border-[2px] border-[#1D2D441C] border-solid flex flex-col justify-around items-start ml-10 p-2 pr-[3rem]">
                <div className="flex flex-row items-center justify-between w-full h-auto pl-2">
                    <div className="flex flex-row items-center gap-6">
                        <img src={urlImagem} alt="Foto do Aluno" className="rounded-full h-[45px] w-[45px] md:h-[62px] md:w-[62px]" />
                        <span className="text-[var(--cor-primaria)] font-semibold text-base sm:text-[28px] lg:text-xl 2xl:text-[28px]">{nome}</span>
                    </div>
                    <div className="text-[var(--azul-claro)] font-normal text-base sm:text-[28px] lg:text-xl 2xl:text-2xl bg-[#748CAB36] rounded-[15px] h-auto w-auto p-1 2xl:p-3  flex flex-row items-center justify-center text-center">
                        {nomePlano}
                    </div>
                </div>
                <div className="flex flex-row items-center w-full h-auto  gap-3 pl-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 xl:w-8 xl:h-8" viewBox="0 0 32 32" fill="none">
                    <path d="M6.8667 2.66699V29.3337" stroke="#1D2D44" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.8667 5.33301H21.8C25.4 5.33301 26.2 7.33301 23.6667 9.86634L22.0667 11.4663C21 12.533 21 14.2663 22.0667 15.1997L23.6667 16.7997C26.2 19.333 25.2667 21.333 21.8 21.333H6.8667" fill="#1D2D44"/>
                    <path d="M6.8667 5.33301H21.8C25.4 5.33301 26.2 7.33301 23.6667 9.86634L22.0667 11.4663C21 12.533 21 14.2663 22.0667 15.1997L23.6667 16.7997C26.2 19.333 25.2667 21.333 21.8 21.333H6.8667" stroke="#1D2D44" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-base sm:text-[28px] lg:text-xl 2xl:text-[28px] font-normal text-[var(--cor-primaria)]">{niverExperiencia}</span>
                </div>
            </div>

        </>
    )
}

export default CardAlunoAtivos;