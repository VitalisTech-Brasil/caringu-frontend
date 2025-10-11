import React, { useState, useEffect, useRef } from 'react';
import MenuLateralAluno from '../../components/Aluno/MenuLateral/MenuLateral';
import Header from '../../components/Aluno/Header/Header';
import iconFeed from '../../assets/images/feed.svg';
import AulaResumoCard from '../../components/Aluno/CardAula';
import Pagination from '../../components/Utils/Pagination';


const Feedback = () => {
    const menuRef = useRef(null);
    // const { idAluno } = useParams();
    // const [imgErro, setImgErro] = useState(false);
    // const [aluno, setAluno] = useState();


    // useEffect(() => {
    //     document.title = "Feedback | Caringu"
    //     const fetchInfosAlunoFeedback = async () => {
    //         try {
    //             const response = await caringuApi.get(`/anamnese/${idAluno}`);// MUDAR URL PARA O NOVO ENDPOINT (!!!por padrão, deve ser sempre estar aberto o ultimo card do feedback)
    //             setAluno(response.data);
    //             console.log("Informações do aluno:", response.data);
    //         } catch (error) {
    //             console.error("Erro ao buscar informações do aluno:", error);
    //         }
    //     };

    //     fetchInfosAlunoFeedback();
    // }, [idAluno]);

    const aulas = [
        { id: 1, data: "10/05/2025", diaSemana: "Segunda-Feira", horarioInicio: "15:00", horarioFim: "16:00", quantidadeFeedbacks: 4, nomePersonal: "João Pedro", nomeTreino: "Treino A" },
        { id: 2, data: "11/05/2025", diaSemana: "Terça-Feira", horarioInicio: "09:00", horarioFim: "10:00", quantidadeFeedbacks: 0, nomePersonal: "João Pedro", nomeTreino: "Treino B" },
        { id: 3, data: "12/05/2025", diaSemana: "Quarta-Feira", horarioInicio: "18:00", horarioFim: "19:00", quantidadeFeedbacks: 2, nomePersonal: "João Pedro", nomeTreino: "Treino C" },
        { id: 4, data: "13/05/2025", diaSemana: "Quinta-Feira", horarioInicio: "07:00", horarioFim: "08:00", quantidadeFeedbacks: 1, nomePersonal: "João Pedro", nomeTreino: "Treino D" },
        { id: 5, data: "14/05/2025", diaSemana: "Sexta-Feira", horarioInicio: "17:00", horarioFim: "18:00", quantidadeFeedbacks: 3, nomePersonal: "João Pedro", nomeTreino: "Treino E" },
        { id: 6, data: "15/05/2025", diaSemana: "Sábado", horarioInicio: "10:00", horarioFim: "11:00", quantidadeFeedbacks: 0, nomePersonal: "João Pedro", nomeTreino: "Treino F" },
    ];

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // const [aulaSelecionada, setAulaSelecionada] = useState(aulas[0] || null);

    // const mensagensFeedback = [
    //     { id: 1, label: 'Resposta do Aluno(a):', texto: 'Não senti mais dor!' },
    //     { id: 2, label: 'Seu comentário:', texto: 'Que bom!' },
    //     { id: 3, label: 'Resposta do Aluno(a):', texto: 'Consegui fazer todos os exercícios!' },
    // ];


    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateralAluno ref={menuRef} />
            <div className="flex-1 overflow-y-auto">
                <Header
                    menuRef={menuRef}
                    title="Feedback"
                    icon={iconFeed}
                />
                <div className="w-full h-auto flex flex-col justify-center items-center">
                    <div className="w-full h-auto flex flex-col items-center justify-center">
                        <div className="pt-3 flex flex-row items-center justify-start w-full text-[var(--cor-primaria)] text-xl font-semibold px-4">
                            <span>Receba e dê feedbacks sobre os treinos </span>
                        </div>
                        <div className="w-full flex justify-center items-center gap-2 sm:gap-4 bg-transparent py-4 px-4">
                            <input
                                type="date"
                                placeholder="Pesquisar Treino"
                                // value={searchTerm}
                                // onChange={handleSearch}
                                className="w-[80%] flex-1 bg-transparent border-b-2 pb-1 outline-none text-xs sm:text-[16px] text-[#1E293B]"
                            />
                            <svg className="shrink-0 w-6 h-6 text-[#1E293B]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#1D2D44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M22 22L20 20" stroke="#1D2D44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    {/* bg-[var(--cor-secundaria)] */}
                    <div className="lg:w-[28%] w-full bg-red-200 p-4 h-[650px] gap-3 flex flex-col overflow-y-auto">
                        {aulas.length === 0 ? (
                            <div className="text-sm italic text-gray-500">
                                Nenhum treino atribuído.
                            </div>
                        ) : (
                            aulas.map(a => (
                                <AulaResumoCard
                                    key={a.id}
                                    data={a.data}
                                    diaSemana={a.diaSemana}
                                    horarioInicio={a.horarioInicio}
                                    horarioFim={a.horarioFim}
                                    nomePersonal={a.nomePersonal}
                                    onVerFeedbacks={() => setAulaSelecionada(a)}
                                />
                            ))
                        )}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            itemsLength={filteredAlunos.length}
                            onPageChange={goToPage}
                            onPrevious={goToPrevious}
                            onNext={goToNext}
                            maxVisible={3}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback;