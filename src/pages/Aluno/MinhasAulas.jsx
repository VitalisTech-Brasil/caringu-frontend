import MenuLateralAluno from '../../components/Aluno/MenuLateral/MenuLateral';
import Header from '../../components/Aluno/Header/Header';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AulaResumoCard from "../../components/Utils/GerenciarAlunos/CardAulaTreino"
import { caringuApi } from '../../provider/caringuApi';
import Pagination from '../../components/Utils/Pagination';

function MinhasAulas() {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const idAluno = sessionStorage.getItem('pessoaId');

    const [aulas, setAulas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // página começa em 1
    const [totalPages, setTotalPages] = useState(1);
    const [itemsLength, setItemsLength] = useState(0);
    const pageSize = 4;
    const [searchTerm, setSearchTerm] = useState('');




    useEffect(() => {
        const fetchAulas = async () => {
            try {
                const response = await caringuApi.get(`/aulas/aluno/${idAluno}/plano?page=${currentPage - 1}&size=${pageSize}`);
                const { content, totalPages, totalElements } = response.data;
                setAulas(Array.isArray(content) ? content : []);
                setTotalPages(totalPages || 1);
                setItemsLength(totalElements || 0);
            } catch (error) {
                setAulas([]);
                setTotalPages(1);
                setItemsLength(0);
                console.error("Erro ao buscar aulas:", error);
            }
        };

        fetchAulas();
    }, [idAluno, currentPage]);

    const handleSearch = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5, 9);

        setSearchTerm(value);
    };


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

    const filteredAulas = aulas.filter((aula) => {
        if (!searchTerm) return true;

        const dataAula = aula.dataAula.replace(/[^0-9]/g, "");
        const busca = searchTerm.replace(/[^0-9]/g, "");

        return dataAula.includes(busca);
    });


    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
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
                <div className="flex flex-col w-full h-auto justify-center items-center gap-3">
                    <div className="px-[1rem] w-full sm:w-[75%] xl:w-[40%] h-auto flex mt-6 flex-col">
                        <div>
                            <h1 className="text-[20px] sm:text-[28px] font-bold text-[#1E293B]">
                                Encontre Todas as Suas Aulas Aqui!
                            </h1>
                        </div>
                        <div className="w-full flex justify-center items-center gap-2 sm:gap-4 bg-[var(--cor-secundaria)] py-4">
                            <input
                                type="text"
                                placeholder="Pesquisar Aula - Data"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-[80%] flex-1 bg-transparent border-b-2 pb-1 outline-none text-xs sm:text-[16px] text-[#1E293B]"
                            />
                            <svg className="shrink-0 w-4 h-4 sm:w-6 sm:h-6 text-[#1E293B]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 22L20 20" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="w-full sm:w-[75%] xl:w-[40%] h-auto grid grid-cols-1 gap-3 px-[1rem]">
                        {filteredAulas.length === 0 ? (
                            <div className="text-sm italic text-gray-500">
                                {searchTerm
                                    ? "Nenhuma aula encontrada para essa data."
                                    : "Nenhum treino atribuído."}
                            </div>
                        ) : (
                            filteredAulas.map(aulaExercicio => (
                                <AulaResumoCard
                                    key={aulaExercicio.aulaId}
                                    data={aulaExercicio.dataAula}
                                    diaSemana={aulaExercicio.diaSemana}
                                    horarioInicio={aulaExercicio.horarioAula}
                                    horarioFim={aulaExercicio.horarioFim}
                                    paddingCard="p-4"
                                    alignIcons="flex-row"
                                    alignText="justify-start"
                                    onVerTreinos={() => {
                                        navigate(`/treinosAula/${aulaExercicio.aulaId}`, { state: aulaExercicio });
                                    }}
                                />
                            ))
                        )}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsLength={filteredAulas.length}
                        onPageChange={goToPage}
                        onPrevious={goToPrevious}
                        onNext={goToNext}
                        maxVisible={3}
                    />
                </div>
            </div>
        </div >

    );
}

export default MinhasAulas