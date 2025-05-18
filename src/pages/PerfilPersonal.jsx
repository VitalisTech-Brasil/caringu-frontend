import React, { useState } from "react";
import MenuLateral from "../components/Personal/MenuLateral/MenuLateral";
import Header from "../components/Personal/Header/Header";
import CardPersonal from "../components/Utils/CardPersonal";
import CardPlano from "../components/Utils/CardPlano";
import CardOpiniao from "../components/Utils/CardOpiniao";
import Rating from 'react-rating'


const PerfilPersonal = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const [rating, setRating] = React.useState(0.0);

    const ratingChanged = (newRating) => {
        setRating(newRating);
        console.log(newRating)
    }

    const StarFull = () => (
        <svg className="mx-1.5" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7253 17.835L28.0054 21.555C27.3754 22.185 27.0303 23.4 27.2253 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" fill="#E96E35" stroke="#E96E35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

    const StarEmpty = () => (
        <svg className="mx-1.5" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7254 17.835L28.0054 21.555C27.3754 22.185 27.0304 23.4 27.2254 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )


    return (
        <>
            <div className="flex min-h-screen bg-[#fdfbf7]">
                <MenuLateral isOpen={isSidebarOpen} />
                <div className="flex-1 overflow-y-auto">
                    <Header onToggleSidebar={toggleSidebar} />
                    <div className="w-full h-auto">
                        <div className="pl-[2.5rem] pt-2 pb-2 w-full h-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
                                <path d="M21.1331 13.0957L7.72852 26.5003L21.1331 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M45.2717 26.5H8.10547" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <CardPersonal />
                    </div>
                    <div className="flex flex-row items-end justify-between flex-nowrap h-auto w-full relative z-10">
                        <div className="h-full flex pl-[2.5rem] pt-3">
                            <span className="text-[var(--cor-primaria)] font-medium text-lg sm:text-[24px] xl:text-[32px]">Planos</span>
                        </div>
                    </div>
                    <div className="ml-10 mt-4 overflow-x-auto max-w-[93vw]">
                        <div className="flex gap-9 w-fit">
                            <CardPlano
                                showDropdown={false} />
                            <CardPlano
                                showDropdown={false} />
                            <CardPlano
                                showDropdown={false} />
                            <CardPlano
                                showDropdown={false} />
                            <CardPlano
                                showDropdown={false} />

                        </div>
                    </div>
                    <div className="flex flex-row w-full h-auto">
                        <div className="flex flex-col w-[95%] h-auto mt-3 mb-6 ml-[2.5rem] pt-5 border-solid border-[#1D2D441C] border-2 rounded-md">
                            <div className="w-[95%] h-auto flex flex-row items-center justify-between pl-[5rem]">
                                <span className="text-[var(--cor-primaria)] text-[32px] font-medium">
                                    Opiniões sobre o personal:
                                </span>
                                <div className="gap-5 pl-4 pr-4 flex flex-row items-center text-[var(--cor-primaria)] h-auto rounded-md border-solid border-[#1D2D441C] border-2 text-xl font-light">
                                    <span>
                                        Ordernar por avaliação
                                    </span>
                                    <div className="pt-2 pb-2">
                                        <Rating
                                            initialRating={rating}
                                            fractions={2}
                                            emptySymbol={<StarEmpty />}
                                            fullSymbol={<StarFull />}
                                            onChange={ratingChanged}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pl-[5rem] grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 w-full">
                                    <CardOpiniao />
                                    <CardOpiniao />
                                    <CardOpiniao />
                                    <CardOpiniao />
                                    <CardOpiniao />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default PerfilPersonal;