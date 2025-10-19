import React, { useRef, useState } from 'react'
import MenuLateralAluno from '../../components/Aluno/MenuLateral/MenuLateral'
import Header from '../../components/Aluno/Header/Header'
import CardPlanoAluno from '../../components/Utils/CardPlanoAluno';
import Rating from 'react-rating'
import Button from "../../utils/../components/Utils/Button";



const AlunoPlanos = () => {
    const menuRef = useRef(null);
    const [showModalAvaliar, setModalAvaliar] = useState(false);
    const [showModalEnviado, setModalEnviado] = useState(false);
    const [rating, setRating] = React.useState(0.0);

    const openModalAvaliar = () => setModalAvaliar(true);
    const openModalEnviado = () => setModalEnviado(true);

    const StarFull = () => (
        <svg className="mx-0.5 w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
            <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7253 17.835L28.0054 21.555C27.3754 22.185 27.0303 23.4 27.2253 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" fill="#E96E35" stroke="#E96E35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

    const StarEmpty = () => (
        <svg className="mx-0.5 w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
            <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7254 17.835L28.0054 21.555C27.3754 22.185 27.0304 23.4 27.2254 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )

    const ratingChanged = (newRating) => {
        setRating(newRating);
        console.log(newRating)
    }

    const confirmarEnvio = () => {
        setModalAvaliar(false)
        setModalEnviado(true)
    }

    return (
        <div className="flex min-h-screen bg-[#fdfbf7]">
            <MenuLateralAluno ref={menuRef} />
            <div className="flex-1 overflow-y-auto">
                <Header
                    menuRef={menuRef}
                    title='Planos'
                    icon={
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.5 15V21.25C27.5 25 25 27.5 21.25 27.5H8.75C5 27.5 2.5 25 2.5 21.25V15C2.5 11.6 4.55 9.225 7.7375 8.825C8.0625 8.775 8.4 8.75 8.75 8.75H21.25C21.575 8.75 21.8875 8.76248 22.1875 8.81248C25.4125 9.18748 27.5 11.575 27.5 15Z" stroke="#1D2D44" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22.1893 8.8125C21.8893 8.7625 21.5768 8.75001 21.2518 8.75001H8.75176C8.40176 8.75001 8.06426 8.77501 7.73926 8.82501C7.91426 8.47501 8.16426 8.15001 8.46426 7.85001L12.5268 3.775C14.2393 2.075 17.0143 2.075 18.7268 3.775L20.9143 5.98752C21.7143 6.77502 22.1393 7.775 22.1893 8.8125Z" stroke="#1D2D44" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M27.5 15.625H23.75C22.375 15.625 21.25 16.75 21.25 18.125C21.25 19.5 22.375 20.625 23.75 20.625H27.5" stroke="#1D2D44" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    }
                />
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CardPlanoAluno
                        key={1}
                        id={1}
                        nome="Plano Mensal"
                        periodo="MENSAL"
                        quantidadeAulas={2}
                        valorAulas={20}
                        valorPlano={40}
                        onAvaliarPersonal={openModalAvaliar}
                    />
                </div>
            </div>
            {showModalAvaliar && (
                <div className="fixed inset-0 z-[49] flex justify-center items-center overflow-y-auto">
                    <div className="absolute inset-0 bg-[#000000] opacity-50"
                        aria-label="Fundo Escurecido"
                    ></div>
                    <div className="relative p-4 w-full max-w-2xl">
                        <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                            <div className="flex justify-between items-center pb-4 mb-4 ">
                                <h1 className="text-4xl font-semibold text-[var(--cor-primaria)]">
                                    Avaliar Personal
                                </h1>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setModalAvaliar(false)
                                    }}
                                    className="bg-[#B41F1F] text-[var(--cor-secundaria)] rounded-lg text-xs sm:text-sm cursor-pointer w-10 h-10 md:w-13 md:h-13 inline-flex justify-center items-center absolute top-2 right-2"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="mb-4 flex flex-col gap-2">
                                <span>Nota:</span>
                                <Rating
                                    initialRating={rating}
                                    fractions={2}
                                    emptySymbol={<StarEmpty />}
                                    fullSymbol={<StarFull />}
                                    onChange={ratingChanged}
                                />
                            </div>
                            <div>
                                <span>Deixe um comentário:</span>
                                <div className='flex p-6'>
                                    <span className='text-gray-400'>Compartilhe o que achou do serviço do personal</span>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <Button
                                    texto="Enviar"
                                    cor="#748CAB"
                                    corTexto="#FFFFFF"
                                    width=" 140px"
                                    height="30px"
                                    fontSize="12px"
                                    classNameExtra="mt-2"
                                    onClick={() => confirmarEnvio()}
                                >
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalEnviado && (
                <div className="fixed inset-0 z-[49] flex justify-center items-center overflow-y-auto">
                    <div className="absolute inset-0 bg-[#000000] opacity-50"
                        aria-label="Fundo Escurecido"
                    ></div>
                    <div className="relative p-4 w-full max-w-2xl">
                        <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                            <div className='flex justify-center p-4'>
                                <svg className='w-35' viewBox="0 0 114 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M57 0C25.5075 0 0 25.5075 0 57C0 67.6875 2.9925 77.805 8.265 86.355C18.0975 102.885 36.195 114 57 114C77.805 114 95.9025 102.885 105.735 86.355C111.007 77.805 114 67.6875 114 57C114 25.5075 88.4925 0 57 0ZM85.0725 52.2975L54.72 80.37C52.725 82.2225 50.0175 83.22 47.4525 83.22C44.745 83.22 42.0375 82.2225 39.9 80.085L25.7925 65.9775C21.66 61.845 21.66 55.005 25.7925 50.8725C29.925 46.74 36.765 46.74 40.8975 50.8725L47.7375 57.7125L70.5375 36.6225C74.8125 32.6325 81.6525 32.9175 85.6425 37.1925C89.6325 41.4675 89.3475 48.3075 85.0725 52.2975Z" fill="#46982B" />
                                </svg>
                            </div>
                            <div className='flex flex-col justify-center items-center text-center'>
                                <h1 className='text-xl font-semibold text-[var(--cor-primaria)]'>Agradecemos seu comentário!</h1>
                                <span className='w-[55%]'>Em breve sua avaliação será apresentada no perfil do personal.</span>
                                <Button
                                    texto="Enviar"
                                    cor="#748CAB"
                                    corTexto="#FFFFFF"
                                    width=" 140px"
                                    height="30px"
                                    fontSize="12px"
                                    classNameExtra="mt-10"
                                    onClick={() => setModalEnviado(false)}
                                >
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AlunoPlanos