import React from "react";
import Rating from 'react-rating'
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";



const CardPersonal = ({
    nomePersonal,
    cidade,
    experiencia,
    celular,
    email,
    urlFoto,
    especialidades = [],
    mediaEstrela,
    quantidadeAvaliacao

}) => {

    const [errosImagem, setErrosImagem] = useState({});


    const StarFull = () => (
        <svg className="mx-1.5 w-8 h-8 sm:w-10 sm:h-10 lg:w-5 lg:h-5 2xl:h-9 2xl:w-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
            <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7253 17.835L28.0054 21.555C27.3754 22.185 27.0303 23.4 27.2253 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" fill="#E96E35" stroke="#E96E35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

    const StarEmpty = () => (
        <svg className="mx-1.5 w-8 h-8 sm:w-10 sm:h-10 lg:w-5 lg:h-5 2xl:h-9 2xl:w-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
            <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7254 17.835L28.0054 21.555C27.3754 22.185 27.0304 23.4 27.2254 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )


    const lidarErroImagem = (id) => {
        setErrosImagem((prev) => ({
            ...prev,
            [id]: true,
        }));
    };

    function formatarQuantidadeAvaliacao(quantidadeAvaliacao) {
        return quantidadeAvaliacao > 100 ? "+ 100" : ` ${quantidadeAvaliacao}`;
    }

    return (
        <div className="flex lg:flex-row flex-col items-start ml-[2.5rem] border-solid border-[#1D2D441C] border-2 rounded-md h-auto w-[85%] lg:w-[95%] gap-3 xl:gap-6 2xl:gap-12 pb-4 pl-[10%] lg:pl-3 xl:pl-5 2xl:pl-12">
            <div className="mt-9 lg:ml-0 ml-[31%]">
                {urlFoto && !errosImagem[email] ? (
                    <img
                        src={urlFoto}
                        alt={nomePersonal}
                        className="w-25 h-25 sm:w-40 sm:h-40 lg:w-18 lg:h-18 xl:w-25 xl:h-25 2xl:w-33 2xl:h-33 rounded-full"
                        onError={() => lidarErroImagem(email)}
                    />
                ) : (
                    <FaUserCircle className="flex-shrink-0 w-25 h-25 sm:w-40 sm:h-40 lg:w-18 lg:h-18 xl:w-25 xl:h-25 2xl:w-33 2xl:h-33" />
                )}
            </div>
            <div className="flex flex-col items-start justify-start  mt-11 w-58 sm:w-115 lg:w-80 xl:w-100" >
                <div>
                    <h2 className="text-xl sm:text-[32px] lg:text-2xl xl:text-[28px] text-[var(--cor-primaria)] font-semibold">
                        {nomePersonal}
                    </h2>
                </div>
                <div className="flex md:flex-row flex-col items-center justify-start w-full gap-4 md:gap-0">
                    <div className="flex flex-col items-start justify-center w-[100%] md:w-[100%]">
                        <div className="flex flex-row items-center justify-start text-[var(--cor-primaria)] h-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] lg:w-[25px] lg:h-[25px]" viewBox="0 0 25 25" fill="none">
                                <path d="M3.77045 8.06901C5.82253 -0.951821 19.1871 -0.941404 21.2288 8.07943C22.4267 13.3711 19.135 17.8503 16.2496 20.6211C14.1559 22.6419 10.8434 22.6419 8.7392 20.6211C5.8642 17.8503 2.57253 13.3607 3.77045 8.06901Z" fill="#FFFDF6" stroke="#1D2D44" strokeWidth="1.5" />
                                <path d="M12.5 13.9902C14.2949 13.9902 15.75 12.5352 15.75 10.7402C15.75 8.94531 14.2949 7.49023 12.5 7.49023C10.7051 7.49023 9.25 8.94531 9.25 10.7402C9.25 12.5352 10.7051 13.9902 12.5 13.9902Z" stroke="#1D2D44" strokeWidth="1.5" />
                            </svg>
                            <span className="text-base sm:text-xl lg:text-xs xl:text-base 2xl:text-xl font-medium ml-3 w-[100%]">
                                {cidade}
                            </span>
                        </div>
                        <div className="flex flex-col text-base sm:text-xl lg:text-xs xl:text-base 2xl:text-xl text-[var(--cor-primaria)]">
                            <div className="flex flex-row gap-2 items-center">
                                <svg className="w-[25px] h-[25px] sm:w-[40px] sm:h-[40px] lg:w-[17px] lg:h-[17px]" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5 0C6.9595 0 0 6.9595 0 15.5C0 24.0405 6.9595 31 15.5 31C24.0405 31 31 24.0405 31 15.5C31 6.9595 24.0405 0 15.5 0ZM22.2425 21.0335C22.0255 21.4055 21.638 21.607 21.235 21.607C21.0335 21.607 20.832 21.5605 20.646 21.4365L15.841 18.569C14.6475 17.856 13.764 16.2905 13.764 14.911V8.556C13.764 7.9205 14.291 7.3935 14.9265 7.3935C15.562 7.3935 16.089 7.9205 16.089 8.556V14.911C16.089 15.469 16.554 16.2905 17.0345 16.5695L21.8395 19.437C22.3975 19.7625 22.5835 20.4755 22.2425 21.0335Z" fill="#1D2D44" />
                                </svg>
                                <span className="font-normal h-auto break-all">
                                    <b className="font-semibold">Experiência:</b>{" "}
                                    {experiencia < 1
                                        ? "menos de 1 ano"
                                        : `${experiencia} ${experiencia === 1 ? "ano" : "anos"}`}
                                </span>
                            </div>
                            <span className="font-normal h-auto break-all">
                                {email}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-auto w-auto  text-[var(--cor-primaria)] mt-11">
                <h3 className="text-xl sm:text-2xl lg:text-base xl:text-xl 2xl:text-2xl font-semibold mb-5">
                    Especialidades:
                </h3>
                {especialidades.map((esp, idx) => (
                    <div className="flex bg-[#E96E35]/11 rounded-md mb-2 border-2 border-[#E96E35]/20 text-[#E96E35] justify-center" key={idx}>
                        <span
                            key={idx}
                            className="font-normal text-base sm:text-xl lg:text-xs xl:text-base 2xl:text-md p-1"
                        >
                            {esp}
                        </span>
                    </div>
                ))}

            </div>
            <div className="flex flex-col justify-center items-start text-[var(--cor-primaria)] mt-11">
                <div>
                    <h3 className="font-semibold text-xl sm:text-2xl lg:text-base xl:text-xl 2xl:text-2xl ml-1">
                        Avaliações:
                    </h3>
                </div>
                <div className="lg:mt-0 lg:mb-0 mt-2 mb-2">
                    <Rating
                        initialRating={mediaEstrela}
                        readonly
                        fractions={2}
                        stop={5}
                        emptySymbol={<StarEmpty />}
                        fullSymbol={<StarFull />}
                    />
                </div>
                <div>
                    <span className=" ml-1 text-base sm:text-xl lg:text-xs xl:text-base 2xl:text-xl font-normal">
                        {formatarQuantidadeAvaliacao(quantidadeAvaliacao)} avaliações
                    </span>
                </div>
            </div>
        </div>
    );

}

export default CardPersonal;