import React, { useRef, useState } from 'react'
import Header from '../../components/Aluno/Header/Header';
import MenuLateralAluno from '../../components/Aluno/MenuLateral/MenuLateral';
import Button from "../../components/Utils/Button";
import CardExercicio from '../../components/Aluno/ExecicioCard';

const AcompanharAula = () => {
    const video = false

    // estado para controlar se o card está expandido ou retraído
    const [expandido, setExpandido] = useState(false);
    const menuRef = useRef(null);

    const exerciciosMock = [
        {
            id: 1,
            nome: "Supino Reto",
            carga: "40Kg",
            repeticoes: "3x12",
            grupoMuscular: "Peito",
            observacoes: "Manter postura correta",
            tempoDescanso: "90 segundos",
            video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // ✅ YouTube
        },
        {
            id: 2,
            nome: "Rosca Direta",
            carga: "20Kg",
            repeticoes: "2x15",
            grupoMuscular: "Bíceps",
            observacoes: "Sem balanço",
            tempoDescanso: "60 segundos",
            video: "/videos/rosca.mp4", // ✅ arquivo local
        },
    ];
    return (
        <div>
            <div className="flex min-h-screen bg-[#fdfbf7]">
                {/* <MenuLateralAluno /> */}
                <MenuLateralAluno ref={menuRef} />
                <div className="flex-1 overflow-y-auto">
                    <Header
                        menuRef={menuRef}
                        title="Acompanhar aula"
                        icon={
                            <svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.375 6.25006H26.25C26.7675 6.25006 27.1875 6.81006 27.1875 7.50006V20.0001C27.1875 20.6901 26.7675 21.2501 26.25 21.2501H24.375C23.8575 21.2501 23.4375 20.6901 23.4375 20.0001V7.50006C23.4375 6.81006 23.8575 6.25006 24.375 6.25006Z" stroke="#1D2D44" strokeWidth="2.5" />
                                <path d="M20.625 1.25H22.5C23.0175 1.25 23.4375 1.81 23.4375 2.5V25C23.4375 25.69 23.0175 26.25 22.5 26.25H20.625C20.1075 26.25 19.6875 25.69 19.6875 25V2.5C19.6875 1.81 20.1075 1.25 20.625 1.25Z" stroke="#1D2D44" strokeWidth="2.5" />
                                <path d="M7.5 1.25H9.375C9.8925 1.25 10.3125 1.81 10.3125 2.5V25C10.3125 25.69 9.8925 26.25 9.375 26.25H7.5C6.9825 26.25 6.5625 25.69 6.5625 25V2.5C6.5625 1.81 6.9825 1.25 7.5 1.25Z" stroke="#1D2D44" strokeWidth="2.5" />
                                <path d="M3.75 6.25018H5.625C6.1425 6.25018 6.5625 6.81018 6.5625 7.50018V20.0002C6.5625 20.6902 6.1425 21.2502 5.625 21.2502H3.75C3.2325 21.2502 2.8125 20.6902 2.8125 20.0002V7.50018C2.8125 6.81018 3.2325 6.25018 3.75 6.25018Z" stroke="#1D2D44" strokeWidth="2.5" />
                                <path d="M27.1875 13.75H30" stroke="#1D2D44" strokeWidth="2.5" />
                                <path d="M10.3125 13.75H19.6875" stroke="#1D2D44" strokeWidth="2.5" />
                                <path d="M0 13.75H2.8125" stroke="#1D2D44" strokeWidth="2.5" />
                            </svg>

                        }
                    />
                    <div className='flex w-full items-center flex-col justify-center'>
                        <div className="pl-[1rem] sm:pl-[3.5rem] w-[100%] h-auto flex mt-4 gap-7 border-b-2 border-[#1D2D441A] lg:max-w-4xl lg:border-b-0">
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M20.5 12H3.66998" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className='mb-4 w-[40%]'>
                                <h1 className=' text-[20px] sm:text-[28px] font-bold text-[#1E293B]'>Aula - 10/05/2025</h1>
                                <div className='flex flex-col'>
                                    <span className='flex items-center gap-2'>
                                        <svg className='shrink-0' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.76219 6C7.22332 6 8.4078 4.88071 8.4078 3.5C8.4078 2.11929 7.22332 1 5.76219 1C4.30106 1 3.11658 2.11929 3.11658 3.5C3.11658 4.88071 4.30106 6 5.76219 6Z" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10.5242 11C10.3337 8.89665 8.76903 7.24297 6.79616 7.0544C6.11586 6.98187 5.42195 6.98187 4.72804 7.0544C2.75517 7.25748 1.19048 8.89665 1 11" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Mônica Luiz Borges Moreno
                                    </span>
                                    <span className='flex items-center gap-2'>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_7417_11392)">
                                                <rect width="12" height="12" fill="#FDFFFD" />
                                                <path d="M10.965 3.38L9.28001 10.145C9.16001 10.65 8.71001 11 8.19001 11H1.62C0.865004 11 0.325012 10.26 0.550012 9.53497L2.65501 2.77502C2.80001 2.30502 3.23501 1.97998 3.72501 1.97998H9.87501C10.35 1.97998 10.745 2.26998 10.91 2.66998C11.005 2.88498 11.025 3.13 10.965 3.38Z" stroke="#1D2D44" strokeMiterlimit="10" />
                                                <path d="M8 11H10.39C11.035 11 11.54 10.455 11.495 9.81L11 3" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4.83997 3.19L5.35997 1.03003" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.19 3.19489L8.66 1.0249" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3.84998 6H7.84998" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M3.34998 8H7.34998" stroke="#1D2D44" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_7417_11392">
                                                    <rect width="12" height="12" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Segunda-Feira
                                    </span>
                                    <span className='flex items-center gap-2'>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 0C2.694 0 0 2.694 0 6C0 9.306 2.694 12 6 12C9.306 12 12 9.306 12 6C12 2.694 9.306 0 6 0ZM8.61 8.142C8.526 8.286 8.376 8.364 8.22 8.364C8.142 8.364 8.064 8.346 7.992 8.298L6.132 7.188C5.67 6.912 5.328 6.306 5.328 5.772V3.312C5.328 3.066 5.532 2.862 5.778 2.862C6.024 2.862 6.228 3.066 6.228 3.312V5.772C6.228 5.988 6.408 6.306 6.594 6.414L8.454 7.524C8.67 7.65 8.742 7.926 8.61 8.142Z" fill="#1D2D44" />
                                        </svg>
                                        15:00 - 16:00
                                    </span>
                                </div>
                            </div>
                            <div className='min-h-full w-[40%] flex items-end justify-end'>
                                <Button
                                    texto="Finalizar Aula"
                                    fontSize="14px"
                                    fontWeight="600"
                                    width="65%"
                                    height="35px"
                                    cor="#748CAB"
                                    corTexto="#FFFFFF"
                                    classNameExtra='m-3'
                                />
                            </div>
                        </div>
                        <div className="w-full h-auto flex flex-col">
                            {/* Card de Evolução */}
                            <div className="w-[85%] md:w-[45%] lg:w-[40%] mx-auto my-6 p-2 border border-gray-300 rounded-lg flex flex-col gap-4">
                                <span className="text-[20px] sm:text-[24px] font-bold text-[#1E293B] flex items-center gap-3">
                                    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="18.5" cy="18.5" r="18.5" fill="#748CAB" />
                                        <path d="M26.3126 13.7146H27.8751C28.3063 13.7146 28.6563 14.1306 28.6563 14.6432V23.9297C28.6563 24.4423 28.3063 24.8583 27.8751 24.8583H26.3126C25.8813 24.8583 25.5313 24.4423 25.5313 23.9297V14.6432C25.5313 14.1306 25.8813 13.7146 26.3126 13.7146Z" stroke="#FFFDF6" strokeWidth="2" />
                                        <path d="M23.1877 10H24.7502C25.1814 10 25.5314 10.416 25.5314 10.9286V27.6442C25.5314 28.1568 25.1814 28.5729 24.7502 28.5729H23.1877C22.7564 28.5729 22.4064 28.1568 22.4064 27.6442V10.9286C22.4064 10.416 22.7564 10 23.1877 10Z" stroke="#FFFDF6" strokeWidth="2" />
                                        <path d="M12.2501 10H13.8126C14.2438 10 14.5938 10.416 14.5938 10.9286V27.6442C14.5938 28.1568 14.2438 28.5729 13.8126 28.5729H12.2501C11.8188 28.5729 11.4688 28.1568 11.4688 27.6442V10.9286C11.4688 10.416 11.8188 10 12.2501 10Z" stroke="#FFFDF6" strokeWidth="2" />
                                        <path d="M9.12519 13.7146H10.6877C11.1189 13.7146 11.4689 14.1306 11.4689 14.6432V23.9297C11.4689 24.4423 11.1189 24.8583 10.6877 24.8583H9.12519C8.69393 24.8583 8.34393 24.4423 8.34393 23.9297V14.6432C8.34393 14.1306 8.69393 13.7146 9.12519 13.7146Z" stroke="#FFFDF6" strokeWidth="2" />
                                        <path d="M28.6562 19.2864H31" stroke="#FFFDF6" strokeWidth="2" />
                                        <path d="M14.5938 19.2864H22.4064" stroke="#FFFDF6" strokeWidth="2" />
                                        <path d="M6 19.2864H8.34376" stroke="#FFFDF6" strokeWidth="2" />
                                    </svg>
                                    Treino de Peito
                                </span>
                                <div className='flex flex-col w-full gap-5'>
                                    <div className="w-full sm:w-[80%] flex flex-col gap-4">
                                        {exerciciosMock.map((exercicio) => (
                                            <CardExercicio key={exercicio.id} data={exercicio} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Arrumar aqui Depois */}
                    {/* <Pagination
                        currentPage={}
                        totalPages={}
                        itemsLength={}
                        onPageChange={}
                        onPrevious={}
                        onNext={}
                        maxVisible={}
                    /> */}

                </div>
            </div >

        </div>
    )
}

export default AcompanharAula