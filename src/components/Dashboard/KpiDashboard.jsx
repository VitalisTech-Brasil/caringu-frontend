import React from "react";

const KpiDashboard = ({
    treinosCumpridosMensal = "--", 
    labelHoras = "Carregando...", 
    horasTreinadasSemanal = "--", 
    aderencia = "--" 

}) => {
    return (
        <>
           <div className="flex items-center flex-col w-full sm:w-[30%] border-2 border-[#E6E6E2] rounded-md p-3 lg:p-5 h-55 relative">
                                        <div className="flex items-center justify-center  rounded-full bg-[#748CAB] absolute top-5">
                                            <svg className="w-10 h-10 lg:w-15 lg:h-15 xl:w-22.5 xl:h-22.5" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="45" cy="45" r="45" fill="#748CAB" />
                                                <path d="M64.309 31.1992H68.1789C69.247 31.1992 70.1139 32.2296 70.1139 33.4992V56.4992C70.1139 57.7688 69.247 58.7992 68.1789 58.7992H64.309C63.2409 58.7992 62.374 57.7688 62.374 56.4992V33.4992C62.374 32.2296 63.2409 31.1992 64.309 31.1992Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M56.5692 22H60.4392C61.5073 22 62.3741 23.0304 62.3741 24.3V65.7C62.3741 66.9696 61.5073 68 60.4392 68H56.5692C55.5011 68 54.6343 66.9696 54.6343 65.7V24.3C54.6343 23.0304 55.5011 22 56.5692 22Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M29.4799 22H33.3498C34.4179 22 35.2848 23.0304 35.2848 24.3V65.7C35.2848 66.9696 34.4179 68 33.3498 68H29.4799C28.4118 68 27.5449 66.9696 27.5449 65.7V24.3C27.5449 23.0304 28.4118 22 29.4799 22Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M21.7401 31.1992H25.6101C26.6782 31.1992 27.545 32.2296 27.545 33.4992V56.4992C27.545 57.7688 26.6782 58.7992 25.6101 58.7992H21.7401C20.672 58.7992 19.8052 57.7688 19.8052 56.4992V33.4992C19.8052 32.2296 20.672 31.1992 21.7401 31.1992Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M70.1133 45H75.9182" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M35.2847 45H54.6343" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M14 45H19.8049" stroke="#FFFDF6" strokeWidth="3" />
                                            </svg>
                                        </div>
                                        <div className="mt-11 lg:mt-18 xl:mt-25 text-center flex flex-col justify-evenly xl:justify-between h-30">
                                            <p className="leading-tight break-words text-base font-medium">Treinos Realizados por Mês</p>
                                            <h2 className="text-base lg:text-lg xl:text-2xl font-bold">{treinosCumpridosMensal}</h2>
                                        </div>
                                    </div>
                                    <div className="items-center flex flex-col w-full sm:w-[30%] border-2 border-[#E6E6E2] rounded-md p-3 lg:p-5 h-55 relative">
                                        <div className="flex items-center justify-center rounded-full bg-[#748CAB] absolute top-5">
                                            <svg className="w-10 h-10 lg:w-15 lg:h-15 xl:w-22.5 xl:h-22.5" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="45" cy="45" r="45" fill="#748CAB" />
                                                <path d="M75.0832 44.4994C75.0832 60.8294 61.8298 74.0827 45.4998 74.0827C29.1698 74.0827 15.9165 60.8294 15.9165 44.4994C15.9165 28.1693 29.1698 14.916 45.4998 14.916C61.8298 14.916 75.0832 28.1693 75.0832 44.4994Z" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M56.4753 53.9072L47.3044 48.4343C45.7069 47.4876 44.4053 45.2097 44.4053 43.346V31.2168" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="mt-14 lg:mt-18 xl:mt-25 text-center flex flex-col justify-evenly xl:justify-between h-30">
                                            <p className="leading-tight break-words text-base font-medium">{labelHoras}</p>
                                            <h2 className="text-base lg:text-lg xl:text-2xl font-bold">{horasTreinadasSemanal}</h2>
                                        </div>
                                    </div>
                                    <div className="items-center flex flex-col w-full sm:w-[30%] border-2 border-[#E6E6E2] rounded-md p-3 lg:p-5 h-55 relative">
                                        <div className="flex items-center justify-center rounded-full bg-[#748CAB] absolute top-5">
                                            <svg className="w-10 h-10 lg:w-15 lg:h-15 xl:w-22.5 xl:h-22.5" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="45" cy="45" r="45" fill="#748CAB" />
                                                <path d="M59.8125 37.1035L47.3875 49.5285L42.6542 42.4285L33.1875 51.8952" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M53.8955 37.1035H59.8122V43.0202" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M37.6253 74.0827H55.3753C70.167 74.0827 76.0837 68.166 76.0837 53.3744V35.6244C76.0837 20.8327 70.167 14.916 55.3753 14.916H37.6253C22.8337 14.916 16.917 20.8327 16.917 35.6244V53.3744C16.917 68.166 22.8337 74.0827 37.6253 74.0827Z" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="mt-8 lg:mt-20 xl:mt-27 text-center flex flex-col justify-evenly xl:justify-between h-30">
                                            <p className="leading-tight break-words text-base font-medium">Aderência</p>
                                            <h2 className="text-base lg:text-lg xl:text-2xl font-bold">{aderencia}</h2>
                                        </div>
                                    </div>
        </>
    );
};

export default KpiDashboard;
