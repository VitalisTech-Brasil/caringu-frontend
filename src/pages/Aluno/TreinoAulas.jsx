import MenuLateralAluno from '../../components/Aluno/MenuLateral/MenuLateral';
import Header from '../../components/Personal/Header/Header';
import Pagination from '../../components/Utils/Pagination';
import Button from "../../components/Utils/Button";
import { useState } from 'react';

function TreinoAulas() {
    const video = false

    // estado para controlar se o card está expandido ou retraído
    const [expandido, setExpandido] = useState(false);
    return (
        <div>
            <div className="flex min-h-screen bg-[#fdfbf7]">
                {/* <MenuLateralAluno /> */}
                <div className="flex-1 overflow-y-auto">
                    <Header />
                    <div className="pl-[1rem] sm:pl-[3.5rem] w-[100%] h-auto flex mt-4 gap-7 border-b-2 border-[#1D2D441A]">
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke="#1D2D44" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20.5 12H3.66998" stroke="#1D2D44" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>

                        <div className='mb-4'>
                            <h1 className=' text-[20px] sm:text-[28px] font-bold text-[#1E293B]'>Aula - 10/05/2025</h1>
                            <div className='flex flex-col'>
                                <span className='flex items-center gap-2'>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.76219 6C7.22332 6 8.4078 4.88071 8.4078 3.5C8.4078 2.11929 7.22332 1 5.76219 1C4.30106 1 3.11658 2.11929 3.11658 3.5C3.11658 4.88071 4.30106 6 5.76219 6Z" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M10.5242 11C10.3337 8.89665 8.76903 7.24297 6.79616 7.0544C6.11586 6.98187 5.42195 6.98187 4.72804 7.0544C2.75517 7.25748 1.19048 8.89665 1 11" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Mônica Luiz Borges Moreno
                                </span>
                                <span className='flex items-center gap-2'>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_7417_11392)">
                                            <rect width="12" height="12" fill="#FDFFFD" />
                                            <path d="M10.965 3.38L9.28001 10.145C9.16001 10.65 8.71001 11 8.19001 11H1.62C0.865004 11 0.325012 10.26 0.550012 9.53497L2.65501 2.77502C2.80001 2.30502 3.23501 1.97998 3.72501 1.97998H9.87501C10.35 1.97998 10.745 2.26998 10.91 2.66998C11.005 2.88498 11.025 3.13 10.965 3.38Z" stroke="#1D2D44" stroke-miterlimit="10" />
                                            <path d="M8 11H10.39C11.035 11 11.54 10.455 11.495 9.81L11 3" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M4.83997 3.19L5.35997 1.03003" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M8.19 3.19489L8.66 1.0249" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M3.84998 6H7.84998" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M3.34998 8H7.34998" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
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
                    </div>
                    <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap">
                        {/* Card de Evolução */}
                        <div className="w-[85%] md:w-[45%] lg:w-[30%] mx-auto my-6 p-2 border border-gray-300 rounded-lg flex flex-col gap-4">
                            <span className="text-[20px] sm:text-[24px] font-bold text-[#1E293B] flex items-center gap-3">
                                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="18.5" cy="18.5" r="18.5" fill="#748CAB" />
                                    <path d="M26.3126 13.7146H27.8751C28.3063 13.7146 28.6563 14.1306 28.6563 14.6432V23.9297C28.6563 24.4423 28.3063 24.8583 27.8751 24.8583H26.3126C25.8813 24.8583 25.5313 24.4423 25.5313 23.9297V14.6432C25.5313 14.1306 25.8813 13.7146 26.3126 13.7146Z" stroke="#FFFDF6" stroke-width="2" />
                                    <path d="M23.1877 10H24.7502C25.1814 10 25.5314 10.416 25.5314 10.9286V27.6442C25.5314 28.1568 25.1814 28.5729 24.7502 28.5729H23.1877C22.7564 28.5729 22.4064 28.1568 22.4064 27.6442V10.9286C22.4064 10.416 22.7564 10 23.1877 10Z" stroke="#FFFDF6" stroke-width="2" />
                                    <path d="M12.2501 10H13.8126C14.2438 10 14.5938 10.416 14.5938 10.9286V27.6442C14.5938 28.1568 14.2438 28.5729 13.8126 28.5729H12.2501C11.8188 28.5729 11.4688 28.1568 11.4688 27.6442V10.9286C11.4688 10.416 11.8188 10 12.2501 10Z" stroke="#FFFDF6" stroke-width="2" />
                                    <path d="M9.12519 13.7146H10.6877C11.1189 13.7146 11.4689 14.1306 11.4689 14.6432V23.9297C11.4689 24.4423 11.1189 24.8583 10.6877 24.8583H9.12519C8.69393 24.8583 8.34393 24.4423 8.34393 23.9297V14.6432C8.34393 14.1306 8.69393 13.7146 9.12519 13.7146Z" stroke="#FFFDF6" stroke-width="2" />
                                    <path d="M28.6562 19.2864H31" stroke="#FFFDF6" stroke-width="2" />
                                    <path d="M14.5938 19.2864H22.4064" stroke="#FFFDF6" stroke-width="2" />
                                    <path d="M6 19.2864H8.34376" stroke="#FFFDF6" stroke-width="2" />
                                </svg>
                                Treino de Peito
                            </span>
                            <div className="flex justify-between items-center">
                                <div className='flex items-center'>
                                    <span className='text-[16px] sm:text-[20px] text-[#1E293B] font-semibold ml-2'>
                                        Exercícios
                                    </span>
                                </div>
                            </div>
                            <div
                                className="border-[#15171B3D] border-2 rounded-xl p-3 flex flex-col gap-3 transition-all duration-300"
                            >
                                {/* Cabeçalho do card */}
                                <div className="flex justify-between items-center">
                                    <span className="text-[14px] sm:text-[20px] text-[var(--laranja)] font-bold">
                                        Nome do Exercício
                                    </span>

                                    {/* Botão para retrair/expandir */}
                                    <button
                                        onClick={() => setExpandido(!expandido)}
                                        className="text-sm text-[var(--laranja)] hover:underline"
                                    >
                                        {expandido ? <svg width="17" height="7" viewBox="0 0 17 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.1314 6.25233C16.6049 5.92615 16.6049 5.39725 16.1314 5.07107L10.1997 0.988732C9.25253 0.336881 7.71778 0.337131 6.77108 0.989233L0.841705 5.07408C0.368113 5.40026 0.368113 5.92916 0.841705 6.25535C1.31518 6.58155 2.08292 6.58155 2.55639 6.25535L7.63133 2.75919C8.1048 2.43293 8.87254 2.43301 9.34601 2.75919L14.4167 6.25233C14.8902 6.57854 15.6579 6.57854 16.1314 6.25233Z" fill="#1D2D44" />
                                        </svg>
                                            :
                                            <svg width="16" height="6" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.355131 0.247666C-0.118377 0.573851 -0.118377 1.10275 0.355131 1.42893L6.28679 5.51127C7.23398 6.16312 8.76873 6.16287 9.71543 5.51077L15.6448 1.42592C16.1184 1.09974 16.1184 0.570844 15.6448 0.244651C15.1713 -0.0815504 14.4036 -0.0815504 13.9301 0.244651L8.85518 3.74081C8.38171 4.06707 7.61397 4.06699 7.1405 3.74081L2.06983 0.247666C1.59633 -0.0785353 0.828627 -0.0785353 0.355131 0.247666Z" fill="#1D2D44" />
                                            </svg>
                                        }
                                    </button>
                                </div>

                                {/* Sempre visível: Carga e Repetições */}
                                <div className="flex gap-5 ml-2">
                                    <span className="flex items-center gap-2">
                                        {/* Ícone da carga */}
                                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.33283 2.4397H10.0507C10.2489 2.4397 10.4097 2.63085 10.4097 2.86637V7.13311C10.4097 7.36863 10.2489 7.55978 10.0507 7.55978H9.33283C9.13469 7.55978 8.97388 7.36863 8.97388 7.13311V2.86637C8.97388 2.63085 9.13469 2.4397 9.33283 2.4397Z" stroke="#1D2D44" />
                                            <path d="M7.8971 0.733154H8.61501C8.81315 0.733154 8.97397 0.924304 8.97397 1.15983V8.83995C8.97397 9.07548 8.81315 9.26663 8.61501 9.26663H7.8971C7.69896 9.26663 7.53815 9.07548 7.53815 8.83995V1.15983C7.53815 0.924304 7.69896 0.733154 7.8971 0.733154Z" stroke="#1D2D44" />
                                            <path d="M2.87165 0.733154H3.58956C3.7877 0.733154 3.94851 0.924304 3.94851 1.15983V8.83995C3.94851 9.07548 3.7877 9.26663 3.58956 9.26663H2.87165C2.67351 9.26663 2.5127 9.07548 2.5127 8.83995V1.15983C2.5127 0.924304 2.67351 0.733154 2.87165 0.733154Z" stroke="#1D2D44" />
                                            <path d="M1.43592 2.4397H2.15383C2.35197 2.4397 2.51278 2.63085 2.51278 2.86637V7.13311C2.51278 7.36863 2.35197 7.55978 2.15383 7.55978H1.43592C1.23778 7.55978 1.07697 7.36863 1.07697 7.13311V2.86637C1.07697 2.63085 1.23778 2.4397 1.43592 2.4397Z" stroke="#1D2D44" />
                                            <path d="M10.4097 4.99976H11.4865" stroke="#1D2D44" />
                                            <path d="M3.94855 4.99976H7.53809" stroke="#1D2D44" />
                                            <path d="M0 4.99976H1.07686" stroke="#1D2D44" />
                                        </svg>

                                        <div className="text-[10px] sm:text-[20px]">
                                            <b className="text-[10px] sm:text-[20px]">Carga: </b>20Kg
                                        </div>
                                    </span>

                                    <span className="flex items-center gap-2">
                                        {/* Ícone de repetições */}
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.36149 11.9166H8.61149C11.3198 11.9166 12.4032 10.8333 12.4032 8.12492V4.87492C12.4032 2.16659 11.3198 1.08325 8.61149 1.08325H5.36149C2.65316 1.08325 1.56982 2.16659 1.56982 4.87492V8.12492C1.56982 10.8333 2.65316 11.9166 5.36149 11.9166Z" stroke="#1D2D44" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.96566 6.49992C9.96566 8.14659 8.63316 9.47909 6.98649 9.47909C5.33982 9.47909 4.33773 7.82159 4.33773 7.82159M4.33773 7.82159H5.68107M4.33773 7.82159V9.31117M4.00732 6.49992C4.00732 4.85325 5.32899 3.52075 6.98649 3.52075C8.97441 3.52075 9.96566 5.17825 9.96566 5.17825M9.96566 5.17825V3.68867M9.96566 5.17825H8.64399" stroke="#1D2D44" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                        <div className="text-[10px] sm:text-[20px]">
                                            <b className="text-[10px] sm:text-[20px]">Repetições: </b>2x30
                                        </div>
                                    </span>
                                </div>

                                {/* Conteúdo expandido */}
                                {expandido && (
                                    <>
                                        {/* Grupo muscular */}
                                        <div className="ml-2">
                                            <span className="flex items-center gap-2">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_7516_2802)">
                                                        <path d="M5.32562 3.12006H6.58862C6.60852 3.08653 6.6206 3.04895 6.62394 3.0101C6.62729 2.97126 6.62183 2.93216 6.60796 2.89573L5.32596 1.32739L5.32562 3.12006Z" fill="#FCFCFC" />
                                                        <path d="M4.26799 7.42561C4.25097 7.31634 4.22804 7.20807 4.19932 7.10128C3.99265 6.36028 3.81932 6.04662 3.89332 5.26995C3.98999 4.74195 3.98432 3.68228 5.38765 3.84728C5.75832 3.89095 6.33532 4.15628 6.66565 4.15061C6.85465 4.14728 6.99232 3.76495 7.00465 3.63761C7.02165 3.46228 6.71632 3.16428 6.58865 3.11962C6.29214 3.02364 5.99422 2.93207 5.69499 2.84495C5.34865 2.74461 5.36665 2.27661 5.34465 2.10995C5.33981 2.07111 5.34652 2.03171 5.36395 1.99667C5.38138 1.96163 5.40876 1.93251 5.44265 1.91295C5.51265 1.87162 5.56765 1.91028 5.63565 1.95461L5.93065 2.17061C6.09632 2.31262 5.63932 2.58395 5.76299 2.62928C5.76299 2.62928 6.34799 2.84895 6.59865 2.89461C6.73599 2.91962 7.20999 2.38495 7.23765 2.07128C7.25932 1.82462 6.10499 0.710282 5.28199 0.277615C4.99265 0.125615 4.82299 0.0372818 4.63232 0.0462818C4.40465 0.0569485 4.33299 0.146948 4.04965 0.389615C2.76732 1.48662 1.52265 3.85895 1.33999 4.38395C0.591319 6.53761 0.474319 7.67228 0.447652 8.31328C0.431124 8.50818 0.422673 8.70368 0.422319 8.89928C0.443986 8.89928 0.0889857 10.5659 0.422319 10.8993C0.755652 11.2326 2.19765 11.2326 2.19765 11.2326C5.53099 12.5623 11.721 12.2153 11.721 8.82161C11.721 4.76428 5.44999 5.30262 4.26799 7.42561Z" fill="#1D2D44" />
                                                        <path d="M6.87668 10.6927C5.82334 10.582 5.00068 10.0657 4.95434 10.036C4.87977 9.98852 4.82713 9.91333 4.80801 9.827C4.78888 9.74067 4.80483 9.65028 4.85234 9.57571C4.89986 9.50114 4.97506 9.4485 5.06139 9.42937C5.14772 9.41024 5.23811 9.42619 5.31268 9.47371C5.32601 9.48204 6.64701 10.3044 7.92801 9.96271C8.63634 9.77404 9.21701 9.25771 9.65368 8.42904C9.69487 8.3508 9.76546 8.29213 9.84992 8.26594C9.93437 8.23975 10.0258 8.24818 10.104 8.28937C10.1823 8.33057 10.2409 8.40116 10.2671 8.48561C10.2933 8.57007 10.2849 8.66147 10.2437 8.73971C9.71534 9.74171 8.99234 10.3707 8.09468 10.6084C7.67568 10.719 7.26068 10.733 6.87668 10.6927Z" fill="#FCFCFC" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_7516_2802">
                                                            <rect width="12" height="12" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                                <div className="text-[10px] sm:text-[20px]">
                                                    <b className="text-[10px] sm:text-[20px]">Grupo muscular: </b>Braço
                                                </div>
                                            </span>
                                        </div>

                                        {/* Observações */}
                                        <div className="ml-2">
                                            <span className="flex items-center gap-2">
                                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4.33331 6.6084H8.12498" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M4.33331 8.7749H6.70581" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M5.41665 3.24992H7.58331C8.66665 3.24992 8.66665 2.70825 8.66665 2.16659C8.66665 1.08325 8.12498 1.08325 7.58331 1.08325H5.41665C4.87498 1.08325 4.33331 1.08325 4.33331 2.16659C4.33331 3.24992 4.87498 3.24992 5.41665 3.24992Z" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M8.66667 2.17749C10.4704 2.27499 11.375 2.94124 11.375 5.41666V8.66666C11.375 10.8333 10.8333 11.9167 8.125 11.9167H4.875C2.16667 11.9167 1.625 10.8333 1.625 8.66666V5.41666C1.625 2.94666 2.52958 2.27499 4.33333 2.17749" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                                <div className="text-[10px] sm:text-[20px]">
                                                    <b className="text-[10px] sm:text-[20px]">Observações: </b>Sem Observações
                                                </div>
                                            </span>
                                        </div>

                                        {/* Tempo de descanso */}
                                        <div className="ml-2">
                                            <span className="flex items-center gap-2">
                                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6.0572 0C2.71968 0 0 2.84603 0 6.3386C0 9.83117 2.71968 12.6772 6.0572 12.6772C9.39472 12.6772 12.1144 9.83117 12.1144 6.3386C12.1144 2.84603 9.39472 0 6.0572 0ZM8.69208 8.60149C8.60728 8.75361 8.45585 8.83601 8.29836 8.83601C8.21962 8.83601 8.14087 8.817 8.06819 8.76629L6.19046 7.59365C5.72405 7.30207 5.37879 6.66187 5.37879 6.09774V3.49891C5.37879 3.23903 5.58474 3.02351 5.83308 3.02351C6.08143 3.02351 6.28737 3.23903 6.28737 3.49891V6.09774C6.28737 6.32593 6.46909 6.66187 6.65686 6.77597L8.53459 7.94861C8.75265 8.08172 8.82534 8.3733 8.69208 8.60149Z" fill="#1D2D44" />
                                                </svg>

                                                <div className="text-[10px] sm:text-[20px]">
                                                    <b className="text-[10px] sm:text-[20px]">Tempo de Descanso: </b>2 minutos
                                                </div>
                                            </span>
                                        </div>

                                        {/* Vídeo ou placeholder */}
                                        <div className="ml-2">
                                            <span className="flex items-center gap-2">
                                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.9166 8.80216V5.55216C11.9166 2.84383 10.8333 1.7605 8.12498 1.7605H4.87498C2.16665 1.7605 1.08331 2.84383 1.08331 5.55216V8.80216C1.08331 11.5105 2.16665 12.5938 4.87498 12.5938H8.12498C10.8333 12.5938 11.9166 11.5105 11.9166 8.80216Z" stroke="#1D2D44" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M1.36499 4.52856H11.635" stroke="#1D2D44" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M4.61499 1.82007V4.45257" stroke="#1D2D44" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M8.38501 1.82007V4.20882" stroke="#1D2D44" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M5.28125 8.50431V7.85431C5.28125 7.02014 5.87167 6.67889 6.59208 7.09598L7.15542 7.42098L7.71875 7.74598C8.43917 8.16306 8.43917 8.84556 7.71875 9.26264L7.15542 9.58764L6.59208 9.91264C5.87167 10.3297 5.28125 9.98848 5.28125 9.15431V8.50431V8.50431Z" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                                <b className="text-[10px] sm:text-[20px]">Exemplo de execução:</b>
                                            </span>
                                            <div>
                                                {video ? (
                                                    <video src="" controls className="h-40 mt-2 rounded-xl" />
                                                ) : (
                                                    <div className="border-2 border-[#15171B3D] h-40 mt-2 flex justify-center items-center rounded-xl">
                                                        <svg width="33" height="35" viewBox="0 0 33 35" fill="none">
                                                            <path
                                                                d="M2 17.5V11.1489C2 2.99834 7.74989 -0.335979 14.7658 3.7393L20.2519 6.91485L25.7381 10.0904C32.754 14.1657 32.754 20.8343 25.7381 24.9096L20.2519 28.0852L14.7658 31.2607C7.74989 35.336 2 32.0017 2 23.8511V17.5Z"
                                                                stroke="#15171B" strokeOpacity="0.24" strokeWidth="3"
                                                                strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
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

export default TreinoAulas