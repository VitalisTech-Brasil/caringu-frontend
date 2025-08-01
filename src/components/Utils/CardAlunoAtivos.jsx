import { useState } from "react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";


const CardAlunoAtivos = ({
    idAlunos,
    urlImagem,
    nome,
    nomePlano,
    niverExperiencia
}) => {

    const [errosImagem, setErrosImagem] = useState({});

    const lidarErroImagem = (id) => {
        setErrosImagem((prev) => ({
            ...prev,
            [id]: true,
        }));
    };

    return (
        <>
            <div id={idAlunos}
                className="w-[85%] sm:w-[90%] h-auto rounded-md border-[2px] border-[#1D2D441C] border-solid flex flex-col justify-around items-start pl-[1rem] sm:pl-0 ml-[1rem] sm:ml-10 p-2 pr-[3rem] sm:gap-0 gap-2">
                <div className="flex flex-col md:flex-row md:items-center items-start justify-between w-full h-auto pl-2 gap-2 sm:gap-4 md:gap-0">
                    <div className="flex flex-row items-center gap-3 sm:gap-6">
                        {urlImagem && !errosImagem[idAlunos] ? (
                            <img
                                src={urlImagem}
                                alt="Foto do Aluno"
                                className="rounded-full h-[45px] w-[45px] md:h-[62px] md:w-[62px]"
                                onError={() => lidarErroImagem(idAlunos)}
                            />
                        ) : (
                            <FaUserCircle className="h-[45px] w-[45px] md:h-[62px] md:w-[62px]" />
                        )}
                        <span className="text-[var(--cor-primaria)] font-semibold text-base sm:text-[28px] lg:text-xl">{nome}</span>
                    </div>
                    <div className="text-[var(--azul-claro)] font-normal text-base sm:text-[24px] lg:text-xl bg-[#748CAB36] rounded-[15px] h-auto w-auto p-[0.5rem] 2xl:p-3  flex flex-row items-center justify-center text-center">
                        {nomePlano}
                    </div>
                </div>
                <div className="flex flex-row items-center w-full h-auto  gap-3 pl-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 xl:w-8 xl:h-8" viewBox="0 0 32 32" fill="none">
                        <path d="M6.8667 2.66699V29.3337" stroke="#1D2D44" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.8667 5.33301H21.8C25.4 5.33301 26.2 7.33301 23.6667 9.86634L22.0667 11.4663C21 12.533 21 14.2663 22.0667 15.1997L23.6667 16.7997C26.2 19.333 25.2667 21.333 21.8 21.333H6.8667" fill="#1D2D44" />
                        <path d="M6.8667 5.33301H21.8C25.4 5.33301 26.2 7.33301 23.6667 9.86634L22.0667 11.4663C21 12.533 21 14.2663 22.0667 15.1997L23.6667 16.7997C26.2 19.333 25.2667 21.333 21.8 21.333H6.8667" stroke="#1D2D44" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-base sm:text-[28px] lg:text-xl font-normal text-[var(--cor-primaria)]">{niverExperiencia}</span>
                </div>
            </div>

        </>
    )
}

export default CardAlunoAtivos;