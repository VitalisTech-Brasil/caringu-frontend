import { FaEllipsisV } from "react-icons/fa";
import ButtonInterno from "../Button"
import { useRef, useEffect } from "react";

const ExercicioCard = ({
    exercicio,
    isOpen,
    setOpenMenuId,
    toggleFavorito,
    // eslint-disable-next-line no-unused-vars
    ExercicioActionsMenu,
}) => {
    const buttonRef = useRef();
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen != null &&
                menuRef.current &&
                !menuRef.current?.contains(event.target) &&
                !buttonRef.current?.contains(event.target)
            ) {
                setOpenMenuId(null);
            }
        };

        const handleScroll = () => setOpenMenuId(null);

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };

    }, [isOpen]);

    return (
        <div className="relative w-full border border-[#E6E6E2] bg-[var(--cor-secundaria)] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
            {/* Infos principais */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-start w-full">
                {/* Ações para mobile */}
                <div className="flex sm:hidden flex-row justify-end w-full gap-2position: fixed; top: 524.797px; left: 31px; width: 280px;">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(isOpen ? null : exercicio.id);
                        }}
                        className="flex items-center justify-center sm:w-8 w-4 sm:h-8 h-4 rounded-[5px] cursor-pointer hover:bg-gray-300 transition duration-200"
                    >
                        <FaEllipsisV />
                    </button>
                    {isOpen && (
                        <div className="absolute right-2 top-[15%] sm:top-[90%] mt-2 w-[10rem] sm:w-[11rem] md:w-[12rem] z-50 bg-[var(--cor-secundaria)] border border-gray-200 rounded-md shadow-lg p-2">
                            <ExercicioActionsMenu exercicio={exercicio} />
                        </div>
                    )}
                </div>
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#FFFDF6] rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-15 col-span-1" viewBox="0 0 70 70" fill="none">
                        <path d="M58.3334 24.0622V52.4997C58.3334 61.2497 53.1126 64.1663 46.6667 64.1663H23.3334C16.8876 64.1663 11.6667 61.2497 11.6667 52.4997V24.0622C11.6667 14.583 16.8876 12.3955 23.3334 12.3955C23.3334 14.2038 24.0625 15.8372 25.2583 17.033C26.4542 18.2288 28.0876 18.958 29.8959 18.958H40.1042C43.7209 18.958 46.6667 16.0122 46.6667 12.3955C53.1126 12.3955 58.3334 14.583 58.3334 24.0622Z" stroke="#1D2D44" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M46.6666 12.3955C46.6666 16.0122 43.7208 18.958 40.1041 18.958H29.8958C28.0874 18.958 26.454 18.2288 25.2582 17.033C24.0623 15.8372 23.3333 14.2038 23.3333 12.3955C23.3333 8.77884 26.2791 5.83301 29.8958 5.83301H40.1041C41.9124 5.83301 43.5458 6.56219 44.7417 7.75802C45.9375 8.95385 46.6666 10.5872 46.6666 12.3955Z" stroke="#1D2D44" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M23.3333 37.917H34.9999" stroke="#1D2D44" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M23.3333 49.583H46.6666" stroke="#1D2D44" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm md:text-base"><b>Nome:</b> {exercicio.nome}</p>
                    <p className="text-sm md:text-base">
                        <b>Grupo: </b>
                        {
                            exercicio.grupoMuscular === 'PEITORAL' ? 'Peitoral' :
                                exercicio.grupoMuscular === 'COSTAS' ? 'Costas' :
                                    exercicio.grupoMuscular === 'PERNAS' ? 'Pernas' :
                                        exercicio.grupoMuscular === 'OMBRO' ? 'Ombro' :
                                            exercicio.grupoMuscular === 'BRACO' ? 'Braço' :
                                                exercicio.grupoMuscular === 'CORE' ? 'Core' :
                                                    exercicio.grupoMuscular === 'CARDIO' ? 'Cardio' :
                                                        exercicio.grupoMuscular
                        }
                    </p>
                    <p className="text-sm md:text-base">
                        <b>Origem: </b>
                        {
                            exercicio.origem === "PERSONAL" ? "Personal" :
                                exercicio.origem === "BIBLIOTECA" ? "Biblioteca" :
                                    exercicio.origem
                        }</p>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center md:gap-4 gap-2 w-full sm:w-auto">
                <ButtonInterno
                    logoSvg={
                        exercicio.favorito ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 58 58" fill="none">
                                <path d="M33.1809 8.48238L37.4342 16.9891C38.0142 18.1732 39.5609 19.309 40.8659 19.5266L48.575 20.8074C53.505 21.629 54.665 25.2057 51.1125 28.7341L45.1192 34.7274C44.1042 35.7424 43.5484 37.6999 43.8625 39.1016L45.5784 46.5207C46.9317 52.3932 43.8142 54.6649 38.6184 51.5957L31.3925 47.3182C30.0875 46.5449 27.9367 46.5449 26.6075 47.3182L19.3817 51.5957C14.21 54.6649 11.0684 52.3691 12.4217 46.5207L14.1375 39.1016C14.4517 37.6999 13.8959 35.7424 12.8809 34.7274L6.88752 28.7341C3.35919 25.2057 4.49502 21.629 9.42502 20.8074L17.1342 19.5266C18.415 19.309 19.9617 18.1732 20.5417 16.9891L24.795 8.48238C27.115 3.86655 30.885 3.86655 33.1809 8.48238Z" fill="#E96E35" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 58 58" fill="none">
                                <path d="M33.1809 8.48238L37.4342 16.9891C38.0142 18.1732 39.5609 19.309 40.8659 19.5266L48.575 20.8074C53.505 21.629 54.665 25.2057 51.1125 28.7341L45.1192 34.7274C44.1042 35.7424 43.5484 37.6999 43.8625 39.1016L45.5784 46.5207C46.9317 52.3932 43.8142 54.6649 38.6184 51.5957L31.3925 47.3182C30.0875 46.5449 27.9367 46.5449 26.6075 47.3182L19.3817 51.5957C14.21 54.6649 11.0684 52.3691 12.4217 46.5207L14.1375 39.1016C14.4517 37.6999 13.8959 35.7424 12.8809 34.7274L6.88752 28.7341C3.35919 25.2057 4.49502 21.629 9.42502 20.8074L17.1342 19.5266C18.415 19.309 19.9617 18.1732 20.5417 16.9891L24.795 8.48238C27.115 3.86655 30.885 3.86655 33.1809 8.48238Z" fill="#FFFDF6" stroke="#15171B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )
                    }
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorito(exercicio.id);
                    }}
                />
                <div ref={buttonRef} className="relative hidden sm:flex">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(isOpen ? null : exercicio.id);
                        }}
                        className="flex items-center justify-center sm:w-8 w-4 sm:h-8 h-4 rounded-[5px] cursor-pointer hover:bg-gray-300 transition duration-200"
                    >
                        <FaEllipsisV />
                    </button>
                    {isOpen && (
                        <div
                            ref={menuRef}
                            className="absolute top-0 right-full mr-2 z-50 bg-[var(--cor-secundaria)] border border-gray-200 rounded-md shadow-lg p-2"
                        >
                            <ExercicioActionsMenu exercicio={exercicio} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExercicioCard;