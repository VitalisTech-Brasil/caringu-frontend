import React, { useState } from "react";
import MenuLateral from "../components/Personal/MenuLateral/MenuLateral";
import Header from "../components/Personal/Header/Header";
import CardPersonal from "../components/Utils/CardPersonal";
import CardPlano from "../components/Utils/CardPlano";
import CardOpiniao from "../components/Utils/CardOpiniao";
import Rating from 'react-rating'
import barraProgresso from "../assets/images/barra-progresso.svg";
import barraMetade from "../assets/images/barra-metade.svg";
import barraCompleta from "../assets/images/barra-completa.svg";
import Button from "../components/Utils/Button";


const PerfilPersonal = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [modalContratar, setModalContratar] = useState(false);
    const [planoSelecionado, setPlanoSelecionado] = useState(null);

    // Estados por plano
    const [statusPagamento, setStatusPagamento] = useState({});
    const [botaoDesabilitado, setBotaoDesabilitado] = useState({});

    const planos = [
        { id: 1, nome: "Plano Básico", duracao: "MENSAL", preco: "50.00", aulas: "10" },
        { id: 2, nome: "Plano Avançado", duracao: "SEMESTRAL", preco: "300.00", aulas: "60" },
        { id: 3, nome: "Plano Avulso", duracao: "AVULSO", preco: "20.00", aulas: "1" },
    ];

    const openModalContratar = (id) => {
        setPlanoSelecionado(id);
        setModalContratar(true);
    }

    const closeModalContratar = () => {
        setModalContratar(false);
        setPlanoSelecionado(null);
    }

    const handleConfirmarPagamento = () => {
        setStatusPagamento(prev => ({ ...prev, [planoSelecionado]: "confirmado" }));
        setBotaoDesabilitado(prev => ({ ...prev, [planoSelecionado]: true }));
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
    const [rating, setRating] = React.useState(0.0);

    const ratingChanged = (newRating) => {
        setRating(newRating);
        console.log(newRating)
    }

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
                            {planos.map((plano) => (
                                <CardPlano
                                    key={plano.id}
                                    showContratarPlano={true}
                                    onModalContratar={() => openModalContratar(plano.id)}
                                    textoBotao={
                                        statusPagamento[plano.id] === "confirmado"
                                            ? "Verificar Status"
                                            : "Contratar Plano"
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row w-full h-auto">
                        <div className="flex flex-col w-[95%] h-auto mt-3 mb-6 ml-[2.5rem] pt-5 border-solid border-[#1D2D441C] border-2 rounded-md">
                            <div className="w-[95%] h-auto flex flex-col lg:flex-row items-start gap-3 lg:gap-0 lg:items-center justify-between pl-[10%] sm:pl-[5rem]">
                                <span className="text-[var(--cor-primaria)] text-base xl:text-[28px] 2xl:text-[32px] font-medium">
                                    Opiniões sobre o personal:
                                </span>
                                <div className="gap-5 pl-4 pr-4 pt-4 md:pt-0 flex flex-col md:flex-row items-center text-[var(--cor-primaria)] h-auto rounded-md border-solid border-[#1D2D441C] border-2 text-base sm:text-xl lg:text-base xl:text-xl font-light">
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
                            <div className="pl-[10%] sm:pl-[5rem] grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4 w-full">
                                <CardOpiniao />
                                <CardOpiniao />
                                <CardOpiniao />
                                <CardOpiniao />
                                <CardOpiniao />
                            </div>
                        </div>
                    </div>
                    {modalContratar && (
                        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
                            <div className="absolute inset-0 bg-[#000000] opacity-50"
                                aria-label="Fundo Escurecido"
                            ></div>
                            <div className="relative p-4 w-full max-w-2xl">
                                <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                                    {/* Header */}
                                    <div className="flex justify-between items-center pb-4 mb-4 ">
                                        <button
                                            type="button"
                                            onClick={closeModalContratar}
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
                                    <div className="w-auto h-auto flex flex-row items-start justify-start gap-10 pl-0 md:pl-5">
                                        <img
                                            src={
                                                statusPagamento[planoSelecionado] === "confirmado"
                                                    ? barraMetade
                                                    : barraProgresso
                                            }
                                            alt="" className="pt-4 h-115 sm:h-106" />
                                        <div className="flex flex-col items-start justify-start sm:gap-12">
                                            <div>
                                                <h2 className="text-[var(--cor-primaria)]  font-semibold text-base sm:text-xl">
                                                    Combinar com o Personal Trainer
                                                </h2>
                                                <p className="text-[var(--cor-primaria)] text-[13px] sm:text-sm font-normal">
                                                    Antes de realizar o pagamento, é preciso combinar com o Personal Trainer a forma de pagamento. Entre em contato pelo número localizado no seu perfil antes de realizar qualquer pagamento.
                                                </p>
                                            </div>
                                            <div>
                                                <h2 className="text-[var(--cor-primaria)] mt-[12%] sm:mt-0 font-semibold text-base sm:text-xl">
                                                    Confirmar pagamento</h2>
                                                <p className="text-[var(--cor-primaria)] text-[13px] sm:text-sm font-normal">
                                                    Para que o plano seja liberado, é necessário combinar uma forma de pagamento com o personal e realizar o pagamento. Quando essa etapa for completa, clique no botão “confirmar pagamento”.
                                                </p>
                                            </div>
                                            <div>
                                                <h2 className="text-[var(--cor-primaria)]  mt-[12%] sm:mt-0 font-semibold text-base sm:text-xl">
                                                    Esperando confirmação do personal</h2>
                                                <p className="text-[var(--cor-primaria)] text-[13px] sm:text-sm font-normal">
                                                    Após isso, o personal deve confirmar se recebeu o pagamento. Aguarde até que essa etapa seja concluída.                                            </p>
                                            </div>
                                            <div>
                                                <h2 className="text-[var(--cor-primaria)]  mt-[12%] sm:mt-0 font-semibold text-base sm:text-xl">
                                                    Plano liberado</h2>
                                                <p className="text-[var(--cor-primaria)] text-[13px] sm:text-sm font-normal">
                                                    Com todas as etapas anteriores concluídas, o plano será liberado para o seu acompanhamento.                                            </p>
                                            </div>
                                        </div>


                                    </div>
                                    <div aria-label="Opções de Botões" className="flex flex-col items-center pt-15 w-full justify-center">


                                        <Button
                                            texto="Confirmar pagamento"
                                            corTexto="var(--cor-secundaria)"
                                            cor="var(--azul-claro)"
                                            height="3rem"
                                            width="45%"
                                            corHover="var(--azul-claro)"
                                            fontWeight="600"
                                            ariaLabel={"Botão de Pagamento"}
                                            fontSize="16px"
                                            onClick={handleConfirmarPagamento}
                                            disabled={botaoDesabilitado[planoSelecionado]}
                                        >
                                        </Button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

        </>
    );
}

export default PerfilPersonal;