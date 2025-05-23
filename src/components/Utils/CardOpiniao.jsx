import React from "react";
import Rating from "react-rating";

const CardOpiniao = () => {

    const StarFull = () => (
        <svg className="mx-0.5 w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
            <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7253 17.835L28.0054 21.555C27.3754 22.185 27.0303 23.4 27.2253 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" fill="#E96E35" stroke="#E96E35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

    const StarEmpty = () => (
        <svg className="mx-0.5 w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
            <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7254 17.835L28.0054 21.555C27.3754 22.185 27.0304 23.4 27.2254 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

    return (
        <>
            <div className="w-[95%] xl:w-[89%] h-[42rem] sm:h-[22rem] md:h-[18rem] lg:h-[15rem] xl:h-[20rem] 2xl:h-[21rem] rounded-md border-[4px] border-[#1D2D441C] border-solid flex flex-col items-start p-4 pr-[2rem]">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full h-auto">
                    <div className="flex flex-row items-center gap-6">
                        <img src="https://res.cloudinary.com/lptennis/image/upload/v1686091349/as2sdwupcq1dlskeiu9d.jpg" alt="Foto do Aluno" className="rounded-full h-[70px] w-[70px] md:h-[92px] md:w-[92px]" />
                        <div className="flex flex-col items-start justify-start gap-1.5">
                            <span className="text-[var(--cor-primaria)] font-semibold text-base sm:text-xl xl:text-base 2xl:text-xl">Maria Gladys Mello da Silva</span>
                            <span className="text-[var(--cor-primaria)] font-normal text-sm">17/04/2025</span>
                        </div>
                    </div>
                    <div className="h-auto w-auto md:pt-0 pt-3 flex flex-row items-center justify-center">
                        <Rating
                            initialRating={3.5}
                            readonly
                            fractions={2}
                            stop={5}
                            emptySymbol={<StarEmpty />}
                            fullSymbol={<StarFull />}
                        />
                    </div>
                </div>
                <div className="flex w-full h-auto  pl-5 pt-6">
                    <p className="text-[var(--cor-primaria)] font-normal text-base sm:text-base  2xl:text-xl">
Profissional incrível, extremamente atenciosa, educada e muito cuidadosa em cada detalhe! Demonstra empatia e dedicação em tudo o que faz. O atendimento foi impecável do início ao fim. Recomendo com total confiança! Pode contratar sem medo, é garantia de qualidade e carinho no serviço prestado.                                        </p>
                </div>
            </div>
        </>
    );
}

export default CardOpiniao;