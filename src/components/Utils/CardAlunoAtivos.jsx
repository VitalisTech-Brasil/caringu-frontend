import React from "react";
import pessoa from "../../assets/images/image.png";

const CardAlunoAtivos = () => {
    return (
        <>
            <div className="w-[90%] h-[9.5rem] rounded-md border-[2px] border-[#1D2D441C] border-solid flex flex-col justify-around items-start ml-10 p-2 pr-[3rem]">
                <div className="flex flex-row items-center justify-between w-full h-auto">
                    <div className="flex flex-row items-center gap-6">
                        <img src={pessoa} alt="Foto do Aluno" className="rounded-full h-[62px] w-[62px]" />
                        <span className="text-[var(--cor-primaria)] font-semibold text-[28px]">Maria Gladys Mello da Silva</span>
                    </div>
                    <div className="text-[var(--azul-claro)] font-normal text-2xl bg-[#748CAB36] rounded-[15px] h-11 w-39 flex items-center justify-center">
                        Plano Basic
                    </div>
                </div>
                <div className="flex flex-row items-center w-full h-auto  gap-3 pl-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6.8667 2.66699V29.3337" stroke="#1D2D44" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.8667 5.33301H21.8C25.4 5.33301 26.2 7.33301 23.6667 9.86634L22.0667 11.4663C21 12.533 21 14.2663 22.0667 15.1997L23.6667 16.7997C26.2 19.333 25.2667 21.333 21.8 21.333H6.8667" fill="#1D2D44"/>
                    <path d="M6.8667 5.33301H21.8C25.4 5.33301 26.2 7.33301 23.6667 9.86634L22.0667 11.4663C21 12.533 21 14.2663 22.0667 15.1997L23.6667 16.7997C26.2 19.333 25.2667 21.333 21.8 21.333H6.8667" stroke="#1D2D44" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="text-[28px] font-normal text-[var(--cor-primaria)]">Iniciante</span>
                </div>
            </div>

        </>
    )
}

export default CardAlunoAtivos;