import MenuLateralAluno from '../../components/Aluno/MenuLateral/MenuLateral';
import Header from '../../components/Aluno/Header/Header';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AulaResumoCard from "../../components/Utils/GerenciarAlunos/CardAulaTreino"

function MinhasAulas() {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const aulas = [
        { idAula: 9, data_horario_inicio: "2025-12-03 15:00:00", data_horario_fim: "2025-12-03 16:00:00", nomePersonal: "Monica" },
        { idAula: 10, data_horario_inicio: "2025-12-04 15:00:00", data_horario_fim: "2025-12-04 16:00:00", nomePersonal: "Monica" },
        { idAula: 11, data_horario_inicio: "2025-12-05 15:00:00", data_horario_fim: "2025-12-05 16:00:00", nomePersonal: "Monica" },
    ];

    function getDiaSemana(dataString) {
        const dias = [
            "Domingo",
            "Segunda-Feira",
            "Terça-Feira",
            "Quarta-Feira",
            "Quinta-Feira",
            "Sexta-Feira",
            "Sábado"
        ];
        const data = new Date(dataString.replace(" ", "T"));
        return dias[data.getDay()];
    }

    function getDataFormatada(dataString) {
        const data = new Date(dataString.replace(" ", "T"));
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

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
                <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-[1rem]">
                    {/* Card de Evolução */}
                    {aulas.length === 0 ? (
                        <div className="text-sm italic text-gray-500">
                            Nenhum treino atribuído.
                        </div>
                    ) : (
                        aulas.map(aulaExercicio => (
                            <AulaResumoCard
                                key={aulaExercicio.idAula}
                                data={getDataFormatada(aulaExercicio.data_horario_inicio)}
                                diaSemana={getDiaSemana(aulaExercicio.data_horario_inicio)}
                                horarioInicio={aulaExercicio.data_horario_inicio.slice(11, 16)}
                                horarioFim={aulaExercicio.data_horario_fim.slice(11, 16)}
                                paddingCard="p-4"
                                alignIcons="flex-row"
                                alignText="justify-start"
                                onVerTreinos={() => {
                                    navigate(`/treinosAula/${aulaExercicio.idAula}`, {state: aulaExercicio});
                                }}
                            />
                        ))
                    )}
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