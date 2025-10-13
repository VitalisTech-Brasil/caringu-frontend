import MenuLateralAluno from '../../components/Aluno/MenuLateral/MenuLateral';
import Header from '../../components/Aluno/Header/Header';
import Pagination from '../../components/Utils/Pagination';
import Button from "../../components/Utils/Button";
import { useRef } from 'react';

function MinhasAulas() {

      const menuRef = useRef(null);
    
    return (
        <div className="flex min-h-screen bg-[#fdfbf7]">
            <MenuLateralAluno ref={menuRef} />
            <div className="flex-1 overflow-y-auto">
                <Header
                    menuRef={menuRef}
                    title='Minhas Aulas'
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
                            <path d="M24.375 7H26.25C26.7675 7 27.1875 7.56 27.1875 8.25V20.75C27.1875 21.44 26.7675 22 26.25 22H24.375C23.8575 22 23.4375 21.44 23.4375 20.75V8.25C23.4375 7.56 23.8575 7 24.375 7Z" stroke="#1D2D44" strokeWidth="2.5" />
                            <path d="M20.625 2H22.5C23.0175 2 23.4375 2.56 23.4375 3.25V25.75C23.4375 26.44 23.0175 27 22.5 27H20.625C20.1075 27 19.6875 26.44 19.6875 25.75V3.25C19.6875 2.56 20.1075 2 20.625 2Z" stroke="#1D2D44" strokeWidth="2.5" />
                            <path d="M7.5 2H9.375C9.8925 2 10.3125 2.56 10.3125 3.25V25.75C10.3125 26.44 9.8925 27 9.375 27H7.5C6.9825 27 6.5625 26.44 6.5625 25.75V3.25C6.5625 2.56 6.9825 2 7.5 2Z" stroke="#1D2D44" strokeWidth="2.5" />
                            <path d="M3.75 7.00024H5.625C6.1425 7.00024 6.5625 7.56024 6.5625 8.25024V20.7502C6.5625 21.4402 6.1425 22.0002 5.625 22.0002H3.75C3.2325 22.0002 2.8125 21.4402 2.8125 20.7502V8.25024C2.8125 7.56024 3.2325 7.00024 3.75 7.00024Z" stroke="#1D2D44" strokeWidth="2.5" />
                            <path d="M27.1875 14.5H30" stroke="#1D2D44" strokeWidth="2.5" />
                            <path d="M10.3125 14.5H19.6875" stroke="#1D2D44" strokeWidth="2.5" />
                            <path d="M0 14.5H2.8125" stroke="#1D2D44" strokeWidth="2.5" />
                        </svg>
                    }
                />
                <div className="pl-[1rem] sm:pl-[3.5rem] w-[90%] h-auto flex mt-6 flex-col">
                    <div>
                        <h1 className="text-[20px] sm:text-[28px] font-bold text-[#1E293B]">
                            Encontre Todas as Suas Aulas Aqui!
                        </h1>
                    </div>
                    <div className="w-full flex justify-center items-center gap-2 sm:gap-4 bg-[#fffdf6] py-4">
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
                            Aula - 10/05/2025
                        </span>
                        <div className="flex justify-between items-center">
                            <div className='flex items-center gap-2 sm:gap-4'>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="17" height="17" fill="#FDFFFD" />
                                    <path d="M15.5338 4.7883L13.1467 14.3721C12.9767 15.0875 12.3392 15.5833 11.6025 15.5833H2.29501C1.22543 15.5833 0.460438 14.5349 0.779188 13.5078L3.76127 3.93124C3.96668 3.26541 4.58294 2.80493 5.27711 2.80493H13.9896C14.6625 2.80493 15.2221 3.21577 15.4559 3.78244C15.5904 4.08702 15.6188 4.43413 15.5338 4.7883Z" stroke="#1D2D44" stroke-miterlimit="10" />
                                    <path d="M11.3334 15.5833H14.7192C15.633 15.5833 16.3484 14.8112 16.2846 13.8975L15.5834 4.25" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.85669 4.51919L7.59336 1.45923" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.6025 4.52629L12.2684 1.45215" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.45422 8.5H11.1209" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4.74585 11.3333H10.4125" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className='text-[16px] sm:text-[20px] text-[#1E293B]'>
                                    Segunda-Feira
                                </span>
                            </div>
                            <div className='flex items-center gap-2 sm:gap-4'>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.50002 1.41675C4.5971 1.41675 1.41669 4.59716 1.41669 8.50008C1.41669 12.403 4.5971 15.5834 8.50002 15.5834C12.4029 15.5834 15.5834 12.403 15.5834 8.50008C15.5834 4.59716 12.4029 1.41675 8.50002 1.41675ZM11.5813 11.0288C11.4821 11.1988 11.305 11.2909 11.1209 11.2909C11.0288 11.2909 10.9367 11.2697 10.8517 11.213L8.65585 9.90258C8.11044 9.57675 7.70669 8.86133 7.70669 8.23091V5.32675C7.70669 5.03633 7.94752 4.7955 8.23794 4.7955C8.52835 4.7955 8.76919 5.03633 8.76919 5.32675V8.23091C8.76919 8.48591 8.98169 8.86133 9.20127 8.98883L11.3971 10.2992C11.6521 10.448 11.7371 10.7738 11.5813 11.0288Z" fill="#1D2D44" />
                                </svg>

                                <span className="text-[16px] sm:text-[20px] text-[#1E293B]">
                                    15:00 - 16:00
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>

                            <Button
                                texto="Ver Treinos"
                                fontSize="14px"
                                fontWeight="600"
                                width="80%"
                                height="45px"
                                cor="#748CAB"
                                corTexto="#FFFFFF"
                                classNameExtra='ml-7 sm:ml-0'
                            />
                        </div>
                    </div>
                    <div className="w-[90%] md:w-[45%] lg:w-[30%] mx-auto my-6 p-4 border border-gray-300 rounded-lg flex flex-col gap-4">
                        <span className="text-[20px] sm:text-[24px] font-bold text-[#1E293B]">
                            Aula - 10/05/2025
                        </span>
                        <div className="flex justify-between items-center">
                            <div className='flex items-center gap-2 sm:gap-4'>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="17" height="17" fill="#FDFFFD" />
                                    <path d="M15.5338 4.7883L13.1467 14.3721C12.9767 15.0875 12.3392 15.5833 11.6025 15.5833H2.29501C1.22543 15.5833 0.460438 14.5349 0.779188 13.5078L3.76127 3.93124C3.96668 3.26541 4.58294 2.80493 5.27711 2.80493H13.9896C14.6625 2.80493 15.2221 3.21577 15.4559 3.78244C15.5904 4.08702 15.6188 4.43413 15.5338 4.7883Z" stroke="#1D2D44" stroke-miterlimit="10" />
                                    <path d="M11.3334 15.5833H14.7192C15.633 15.5833 16.3484 14.8112 16.2846 13.8975L15.5834 4.25" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.85669 4.51919L7.59336 1.45923" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.6025 4.52629L12.2684 1.45215" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.45422 8.5H11.1209" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4.74585 11.3333H10.4125" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className='text-[16px] sm:text-[20px] text-[#1E293B]'>
                                    Segunda-Feira
                                </span>
                            </div>
                            <div className='flex items-center gap-2 sm:gap-4'>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.50002 1.41675C4.5971 1.41675 1.41669 4.59716 1.41669 8.50008C1.41669 12.403 4.5971 15.5834 8.50002 15.5834C12.4029 15.5834 15.5834 12.403 15.5834 8.50008C15.5834 4.59716 12.4029 1.41675 8.50002 1.41675ZM11.5813 11.0288C11.4821 11.1988 11.305 11.2909 11.1209 11.2909C11.0288 11.2909 10.9367 11.2697 10.8517 11.213L8.65585 9.90258C8.11044 9.57675 7.70669 8.86133 7.70669 8.23091V5.32675C7.70669 5.03633 7.94752 4.7955 8.23794 4.7955C8.52835 4.7955 8.76919 5.03633 8.76919 5.32675V8.23091C8.76919 8.48591 8.98169 8.86133 9.20127 8.98883L11.3971 10.2992C11.6521 10.448 11.7371 10.7738 11.5813 11.0288Z" fill="#1D2D44" />
                                </svg>

                                <span className="text-[16px] sm:text-[20px] text-[#1E293B]">
                                    15:00 - 16:00
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>

                            <Button
                                texto="Ver Treinos"
                                fontSize="14px"
                                fontWeight="600"
                                width="80%"
                                height="45px"
                                cor="#748CAB"
                                corTexto="#FFFFFF"
                                classNameExtra='ml-7 sm:ml-0'
                            />
                        </div>
                    </div>
                    <div className="w-[90%] md:w-[45%] lg:w-[30%] mx-auto my-6 p-4 border border-gray-300 rounded-lg flex flex-col gap-4">
                        <span className="text-[20px] sm:text-[24px] font-bold text-[#1E293B]">
                            Aula - 10/05/2025
                        </span>
                        <div className="flex justify-between items-center">
                            <div className='flex items-center gap-2 sm:gap-4'>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="17" height="17" fill="#FDFFFD" />
                                    <path d="M15.5338 4.7883L13.1467 14.3721C12.9767 15.0875 12.3392 15.5833 11.6025 15.5833H2.29501C1.22543 15.5833 0.460438 14.5349 0.779188 13.5078L3.76127 3.93124C3.96668 3.26541 4.58294 2.80493 5.27711 2.80493H13.9896C14.6625 2.80493 15.2221 3.21577 15.4559 3.78244C15.5904 4.08702 15.6188 4.43413 15.5338 4.7883Z" stroke="#1D2D44" stroke-miterlimit="10" />
                                    <path d="M11.3334 15.5833H14.7192C15.633 15.5833 16.3484 14.8112 16.2846 13.8975L15.5834 4.25" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.85669 4.51919L7.59336 1.45923" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.6025 4.52629L12.2684 1.45215" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.45422 8.5H11.1209" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4.74585 11.3333H10.4125" stroke="#1D2D44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span className='text-[16px] sm:text-[20px] text-[#1E293B]'>
                                    Segunda-Feira
                                </span>
                            </div>
                            <div className='flex items-center gap-2 sm:gap-4'>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.50002 1.41675C4.5971 1.41675 1.41669 4.59716 1.41669 8.50008C1.41669 12.403 4.5971 15.5834 8.50002 15.5834C12.4029 15.5834 15.5834 12.403 15.5834 8.50008C15.5834 4.59716 12.4029 1.41675 8.50002 1.41675ZM11.5813 11.0288C11.4821 11.1988 11.305 11.2909 11.1209 11.2909C11.0288 11.2909 10.9367 11.2697 10.8517 11.213L8.65585 9.90258C8.11044 9.57675 7.70669 8.86133 7.70669 8.23091V5.32675C7.70669 5.03633 7.94752 4.7955 8.23794 4.7955C8.52835 4.7955 8.76919 5.03633 8.76919 5.32675V8.23091C8.76919 8.48591 8.98169 8.86133 9.20127 8.98883L11.3971 10.2992C11.6521 10.448 11.7371 10.7738 11.5813 11.0288Z" fill="#1D2D44" />
                                </svg>

                                <span className="text-[16px] sm:text-[20px] text-[#1E293B]">
                                    15:00 - 16:00
                                </span>
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>

                            <Button
                                texto="Ver Treinos"
                                fontSize="14px"
                                fontWeight="600"
                                width="80%"
                                height="45px"
                                cor="#748CAB"
                                corTexto="#FFFFFF"
                                classNameExtra='ml-7 sm:ml-0'
                            />
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

export default MinhasAulas