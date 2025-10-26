import React from 'react'
import MenuLateralAluno from '../../components/Aluno/MenuLateral/MenuLateral';
import Header from '../../components/Aluno/Header/Header';
import Pagination from '../../components/Utils/Pagination';
import Button from "../../components/Utils/Button";
import { useRef } from 'react';



const MinhaEvolucao = () => {
    const menuRef = useRef();

    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateralAluno ref={menuRef} />
            <div className="flex-1 overflow-y-auto">
                <Header
                    menuRef={menuRef}
                    title='Minha Evolução'
                    icon={
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.37505 21.25H22.6126C24.9876 21.25 26.2375 20 26.2375 17.625V2.5H3.73755V17.625C3.75005 20 5.00005 21.25 7.37505 21.25Z"
                                stroke="#1D2D44"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2.5 2.5H27.5"
                                stroke="#1D2D44"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10 27.5L15 25V21.25"
                                stroke="#1D2D44"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20 27.5L15 25"
                                stroke="#1D2D44"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.375 13.75L13.3125 10.4625C13.625 10.2 14.0375 10.275 14.25 10.625L15.75 13.125C15.9625 13.475 16.375 13.5375 16.6875 13.2875L20.625 10"
                                stroke="#1D2D44"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                />
                <div className="pl-[1rem] sm:pl-[3.5rem] w-[90%] h-auto flex mt-6 flex-col gap-6">
                    <div>
                        <h1 className="text-xl sm:text-[32px] font-bold text-[#1E293B]">
                            Visualize sua evolução em cada treino
                        </h1>
                    </div>
                    <div className="w-full flex justify-center items-center gap-2 sm:gap-4 bg-[var(--cor-secundaria)] py-4">
                        <input
                            type="text"
                            placeholder="Pesquisar Treino"
                            // value={searchTerm}
                            // onChange={handleSearch}
                            className="w-[80%] flex-1 bg-transparent border-b-2 pb-1 outline-none text-xs sm:text-[16px] text-[#1E293B]"
                        />
                        <svg className="shrink-0 w-4 h-4 sm:w-6 sm:h-6 text-[#1E293B]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#1D2D44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 22L20 20" stroke="#1D2D44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className="w-full h-auto flex flex-col md:flex-row md:flex-wrap">
                    {/* Card de Evolução */}
                    <div className="w-[90%] md:w-[45%] lg:w-[30%] mx-auto my-6 p-4 border border-gray-300 rounded-lg flex flex-col gap-4">
                        <span className="text-[20px] sm:text-[24px] font-bold text-[#1E293B]">
                            Treino X
                        </span>
                        <div className="gap-4 sm:gap-8 flex items-center">
                            <svg className='w-4' viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 6C6.88071 6 8 4.88071 8 3.5C8 2.11929 6.88071 1 5.5 1C4.11929 1 3 2.11929 3 3.5C3 4.88071 4.11929 6 5.5 6Z" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 11C9.82 8.89665 8.34143 7.24297 6.47714 7.0544C5.83429 6.98187 5.17857 6.98187 4.52286 7.0544C2.65857 7.25748 1.18 8.89665 1 11" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span className='text-[16px] sm:text-[20px] text-[#1E293B]'>
                                Pedro henrique
                            </span>
                            <Button
                                texto="Ver Relatório"
                                fontSize="14px"
                                fontWeight="600"
                                width="40%"
                                height="30px"
                                cor="#748CAB"
                                corTexto="#FFFFFF"
                                classNameExtra='ml-7 sm:ml-0'
                            />
                        </div>
                        <div className='gap-4 sm:gap-8 flex items-center'>
                            <svg className='w-4' viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6364 3H11.4546C11.6804 3 11.8637 3.224 11.8637 3.5V8.5C11.8637 8.776 11.6804 9 11.4546 9H10.6364C10.4106 9 10.2273 8.776 10.2273 8.5V3.5C10.2273 3.224 10.4106 3 10.6364 3Z" stroke="#1D2D44" />
                                <path d="M9.00003 1H9.81822C10.044 1 10.2273 1.224 10.2273 1.5V10.5C10.2273 10.776 10.044 11 9.81822 11H9.00003C8.77422 11 8.59094 10.776 8.59094 10.5V1.5C8.59094 1.224 8.77422 1 9.00003 1Z" stroke="#1D2D44" />
                                <path d="M3.27274 1H4.09092C4.31674 1 4.50001 1.224 4.50001 1.5V10.5C4.50001 10.776 4.31674 11 4.09092 11H3.27274C3.04692 11 2.86365 10.776 2.86365 10.5V1.5C2.86365 1.224 3.04692 1 3.27274 1Z" stroke="#1D2D44" />
                                <path d="M1.63639 3H2.45457C2.68039 3 2.86366 3.224 2.86366 3.5V8.5C2.86366 8.776 2.68039 9 2.45457 9H1.63639C1.41057 9 1.22729 8.776 1.22729 8.5V3.5C1.22729 3.224 1.41057 3 1.63639 3Z" stroke="#1D2D44" />
                                <path d="M11.8636 6H13.0909" stroke="#1D2D44" />
                                <path d="M4.5 6H8.59091" stroke="#1D2D44" />
                                <path d="M0 6H1.22727" stroke="#1D2D44" />
                            </svg>

                            <span className="text-[16px] sm:text-[20px] text-[#1E293B]">
                                <b>10</b> Treinos Concluídos
                            </span>
                        </div>
                    </div>
                    <div className="w-[90%] md:w-[45%] lg:w-[30%] mx-auto my-6 p-4 border border-gray-300 rounded-lg flex flex-col gap-4">
                        <span className="text-[20px] sm:text-[24px] font-bold text-[#1E293B]">
                            Treino X
                        </span>
                        <div className="gap-4 sm:gap-8 flex items-center">
                            <svg className='w-4' viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 6C6.88071 6 8 4.88071 8 3.5C8 2.11929 6.88071 1 5.5 1C4.11929 1 3 2.11929 3 3.5C3 4.88071 4.11929 6 5.5 6Z" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 11C9.82 8.89665 8.34143 7.24297 6.47714 7.0544C5.83429 6.98187 5.17857 6.98187 4.52286 7.0544C2.65857 7.25748 1.18 8.89665 1 11" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span className='text-[16px] sm:text-[20px] text-[#1E293B]'>
                                Pedro henrique
                            </span>
                            <Button
                                texto="Ver Relatório"
                                fontSize="14px"
                                fontWeight="600"
                                width="40%"
                                height="30px"
                                cor="#748CAB"
                                corTexto="#FFFFFF"
                                classNameExtra='ml-7 sm:ml-0'
                            />
                        </div>
                        <div className='gap-4 sm:gap-8 flex items-center'>
                            <svg className='w-4' viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6364 3H11.4546C11.6804 3 11.8637 3.224 11.8637 3.5V8.5C11.8637 8.776 11.6804 9 11.4546 9H10.6364C10.4106 9 10.2273 8.776 10.2273 8.5V3.5C10.2273 3.224 10.4106 3 10.6364 3Z" stroke="#1D2D44" />
                                <path d="M9.00003 1H9.81822C10.044 1 10.2273 1.224 10.2273 1.5V10.5C10.2273 10.776 10.044 11 9.81822 11H9.00003C8.77422 11 8.59094 10.776 8.59094 10.5V1.5C8.59094 1.224 8.77422 1 9.00003 1Z" stroke="#1D2D44" />
                                <path d="M3.27274 1H4.09092C4.31674 1 4.50001 1.224 4.50001 1.5V10.5C4.50001 10.776 4.31674 11 4.09092 11H3.27274C3.04692 11 2.86365 10.776 2.86365 10.5V1.5C2.86365 1.224 3.04692 1 3.27274 1Z" stroke="#1D2D44" />
                                <path d="M1.63639 3H2.45457C2.68039 3 2.86366 3.224 2.86366 3.5V8.5C2.86366 8.776 2.68039 9 2.45457 9H1.63639C1.41057 9 1.22729 8.776 1.22729 8.5V3.5C1.22729 3.224 1.41057 3 1.63639 3Z" stroke="#1D2D44" />
                                <path d="M11.8636 6H13.0909" stroke="#1D2D44" />
                                <path d="M4.5 6H8.59091" stroke="#1D2D44" />
                                <path d="M0 6H1.22727" stroke="#1D2D44" />
                            </svg>

                            <span className="text-[16px] sm:text-[20px] text-[#1E293B]">
                                <b>10</b> Treinos Concluídos
                            </span>
                        </div>
                    </div>
                    <div className="w-[90%] md:w-[45%] lg:w-[30%] mx-auto my-6 p-4 border border-gray-300 rounded-lg flex flex-col gap-4">
                        <span className="text-[20px] sm:text-[24px] font-bold text-[#1E293B]">
                            Treino X
                        </span>
                        <div className="gap-4 sm:gap-8 flex items-center">
                            <svg className='w-4' viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 6C6.88071 6 8 4.88071 8 3.5C8 2.11929 6.88071 1 5.5 1C4.11929 1 3 2.11929 3 3.5C3 4.88071 4.11929 6 5.5 6Z" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 11C9.82 8.89665 8.34143 7.24297 6.47714 7.0544C5.83429 6.98187 5.17857 6.98187 4.52286 7.0544C2.65857 7.25748 1.18 8.89665 1 11" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span className='text-[16px] sm:text-[20px] text-[#1E293B]'>
                                Pedro henrique
                            </span>
                            <Button
                                texto="Ver Relatório"
                                fontSize="14px"
                                fontWeight="600"
                                width="40%"
                                height="30px"
                                cor="#748CAB"
                                corTexto="#FFFFFF"
                                classNameExtra='ml-7 sm:ml-0'
                            />
                        </div>
                        <div className='gap-4 sm:gap-8 flex items-center'>
                            <svg className='w-4' viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6364 3H11.4546C11.6804 3 11.8637 3.224 11.8637 3.5V8.5C11.8637 8.776 11.6804 9 11.4546 9H10.6364C10.4106 9 10.2273 8.776 10.2273 8.5V3.5C10.2273 3.224 10.4106 3 10.6364 3Z" stroke="#1D2D44" />
                                <path d="M9.00003 1H9.81822C10.044 1 10.2273 1.224 10.2273 1.5V10.5C10.2273 10.776 10.044 11 9.81822 11H9.00003C8.77422 11 8.59094 10.776 8.59094 10.5V1.5C8.59094 1.224 8.77422 1 9.00003 1Z" stroke="#1D2D44" />
                                <path d="M3.27274 1H4.09092C4.31674 1 4.50001 1.224 4.50001 1.5V10.5C4.50001 10.776 4.31674 11 4.09092 11H3.27274C3.04692 11 2.86365 10.776 2.86365 10.5V1.5C2.86365 1.224 3.04692 1 3.27274 1Z" stroke="#1D2D44" />
                                <path d="M1.63639 3H2.45457C2.68039 3 2.86366 3.224 2.86366 3.5V8.5C2.86366 8.776 2.68039 9 2.45457 9H1.63639C1.41057 9 1.22729 8.776 1.22729 8.5V3.5C1.22729 3.224 1.41057 3 1.63639 3Z" stroke="#1D2D44" />
                                <path d="M11.8636 6H13.0909" stroke="#1D2D44" />
                                <path d="M4.5 6H8.59091" stroke="#1D2D44" />
                                <path d="M0 6H1.22727" stroke="#1D2D44" />
                            </svg>

                            <span className="text-[16px] sm:text-[20px] text-[#1E293B]">
                                <b>10</b> Treinos Concluídos
                            </span>
                        </div>
                    </div>
                    <div className="w-[90%] md:w-[45%] lg:w-[30%] mx-auto my-6 p-4 border border-gray-300 rounded-lg flex flex-col gap-4">
                        <span className="text-[20px] sm:text-[24px] font-bold text-[#1E293B]">
                            Treino X
                        </span>
                        <div className="gap-4 sm:gap-8 flex items-center">
                            <svg className='w-4' viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 6C6.88071 6 8 4.88071 8 3.5C8 2.11929 6.88071 1 5.5 1C4.11929 1 3 2.11929 3 3.5C3 4.88071 4.11929 6 5.5 6Z" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 11C9.82 8.89665 8.34143 7.24297 6.47714 7.0544C5.83429 6.98187 5.17857 6.98187 4.52286 7.0544C2.65857 7.25748 1.18 8.89665 1 11" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span className='text-[16px] sm:text-[20px] text-[#1E293B]'>
                                Pedro henrique
                            </span>
                            <Button
                                texto="Ver Relatório"
                                fontSize="14px"
                                fontWeight="600"
                                width="40%"
                                height="30px"
                                cor="#748CAB"
                                corTexto="#FFFFFF"
                                classNameExtra='ml-7 sm:ml-0'
                            />
                        </div>
                        <div className='gap-4 sm:gap-8 flex items-center'>
                            <svg className='w-4' viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6364 3H11.4546C11.6804 3 11.8637 3.224 11.8637 3.5V8.5C11.8637 8.776 11.6804 9 11.4546 9H10.6364C10.4106 9 10.2273 8.776 10.2273 8.5V3.5C10.2273 3.224 10.4106 3 10.6364 3Z" stroke="#1D2D44" />
                                <path d="M9.00003 1H9.81822C10.044 1 10.2273 1.224 10.2273 1.5V10.5C10.2273 10.776 10.044 11 9.81822 11H9.00003C8.77422 11 8.59094 10.776 8.59094 10.5V1.5C8.59094 1.224 8.77422 1 9.00003 1Z" stroke="#1D2D44" />
                                <path d="M3.27274 1H4.09092C4.31674 1 4.50001 1.224 4.50001 1.5V10.5C4.50001 10.776 4.31674 11 4.09092 11H3.27274C3.04692 11 2.86365 10.776 2.86365 10.5V1.5C2.86365 1.224 3.04692 1 3.27274 1Z" stroke="#1D2D44" />
                                <path d="M1.63639 3H2.45457C2.68039 3 2.86366 3.224 2.86366 3.5V8.5C2.86366 8.776 2.68039 9 2.45457 9H1.63639C1.41057 9 1.22729 8.776 1.22729 8.5V3.5C1.22729 3.224 1.41057 3 1.63639 3Z" stroke="#1D2D44" />
                                <path d="M11.8636 6H13.0909" stroke="#1D2D44" />
                                <path d="M4.5 6H8.59091" stroke="#1D2D44" />
                                <path d="M0 6H1.22727" stroke="#1D2D44" />
                            </svg>

                            <span className="text-[16px] sm:text-[20px] text-[#1E293B]">
                                <b>10</b> Treinos Concluídos
                            </span>
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

    );
}

export default MinhaEvolucao