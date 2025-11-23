import React, { useState, useRef, useEffect } from 'react';
import MenuLateralAluno from '../../../components/Aluno/MenuLateral/MenuLateral';
import Header from '../../../components/Aluno/Header/Header';
import AulaResumoCard from '../../../components/Aluno/CardAula';
import Pagination from '../../../components/Utils/Pagination';
import { useNavigate } from 'react-router-dom';
import { caringuApi } from '../../../provider/caringuApi';

const Feedback = () => {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const idAluno = sessionStorage.getItem('pessoaId');
    const [aulas, setAulas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [totalPages, setTotalPages] = useState(1);
    const [inputType, setInputType] = useState('text');
    const [selectedDate, setSelectedDate] = useState('');
    const [searchActive, setSearchActive] = useState(false);

    const formatInputDate = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        document.title = "Feedback | Caringu";
        const fetchInfosAula = async () => {
            try {
                const page = currentPage - 1;
                // Monta a query de data se houver busca
                let url = `/aulas/aluno/${idAluno}/plano?page=${page}&size=${itemsPerPage}`;
                if (searchActive && selectedDate) {
                    url += `&data=${selectedDate}`; // selectedDate já está no formato yyyy-mm-dd
                }
                const response = await caringuApi.get(url);
                const aulasTratadas = response.data.content.map(a => ({
                    id: a.aulaId,
                    data: a.dataAula,
                    diaSemana: a.diaSemana,
                    horarioInicio: a.horarioAula,
                    horarioFim: a.horarioFim,
                    quantidadeFeedbacks: a.qtdFeedbacks,
                    nomePersonal: a.nomePersonal,
                    nomeTreino: a.nomeTreino,
                }));
                setAulas(aulasTratadas);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Erro ao buscar informações da aula:", error);
            }
        };
        fetchInfosAula();
    }, [idAluno, currentPage, searchActive, selectedDate]);

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setSearchActive(true);
        setCurrentPage(1);
    };

    const handleInputFocus = () => {
        setInputType('date');
    };

    const handleInputBlur = (e) => {
        if (!e.target.value) {
            setSearchActive(false);
            setSelectedDate('');
            setInputType('text');
        }
    };

    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateralAluno ref={menuRef} />
            <div className="flex-1 overflow-y-auto">
                <Header
                    menuRef={menuRef}
                    title="Feedback"
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                            <path d="M27.5 14.375V19.375C27.5 23.75 25 25.625 21.25 25.625H8.75C5 25.625 2.5 23.75 2.5 19.375V10.625C2.5 6.25 5 4.375 8.75 4.375H15" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.75 11.25L12.6625 14.375C13.95 15.4 16.0625 15.4 17.35 14.375" stroke="#1D2D44" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M24.35 3.5248L24.7 4.23729C24.875 4.58729 25.3125 4.9123 25.7 4.9873L26.175 5.0623C27.6 5.2998 27.9375 6.3498 26.9125 7.3873L26.475 7.82479C26.1875 8.12479 26.025 8.69979 26.1125 9.09979L26.175 9.3623C26.5625 11.0873 25.65 11.7498 24.15 10.8498L23.825 10.6623C23.4375 10.4373 22.8125 10.4373 22.425 10.6623L22.1 10.8498C20.5875 11.7623 19.675 11.0873 20.075 9.3623L20.1375 9.09979C20.225 8.69979 20.0625 8.12479 19.775 7.82479L19.3375 7.3873C18.3125 6.3498 18.65 5.2998 20.075 5.0623L20.55 4.9873C20.925 4.9248 21.375 4.58729 21.55 4.23729L21.9 3.5248C22.575 2.1623 23.675 2.1623 24.35 3.5248Z" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    }
                />
                <div className="w-full h-auto flex flex-col justify-center items-center">
                    <div className="lg:w-[70%] w-full 2xl:w-[50%] h-auto flex flex-col items-center justify-center">
                        <div className="pt-3 flex flex-row items-center justify-start w-full text-[var(--cor-primaria)] text-xl font-semibold px-4">
                            <span>Receba e dê feedbacks sobre os treinos </span>
                        </div>
                        <div className="w-full flex justify-center items-center gap-2 sm:gap-4 bg-transparent py-4 px-4">
                            <input
                                type={inputType}
                                placeholder="Pesquisar Aula - Data"
                                value={selectedDate}
                                onFocus={handleInputFocus}
                                onChange={handleDateChange}
                                onBlur={handleInputBlur}
                                className="w-[80%] flex-1 bg-transparent border-b-2 pb-1 outline-none text-xs sm:text-[16px] text-[#1E293B]"
                            />
                            <svg className="shrink-0 w-6 h-6 text-[#1E293B]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 22L20 20" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="lg:w-[70%] w-full 2xl:w-[50%]  p-4 h-[70vh] gap-3 flex flex-col overflow-y-auto">
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
                                    nomeTreino={a.nomeTreino}
                                    onVerFeedbacks={() => navigate('/feedback-mensagem', { state: { aula: a } })}
                                />
                            ))
                        )}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsLength={aulas.length}
                        onPageChange={goToPage}
                        onPrevious={goToPrevious}
                        onNext={goToNext}
                        maxVisible={3}
                    />
                </div>
            </div>
        </div>
    )
}

export default Feedback;