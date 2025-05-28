import React, { use } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import ButtonInterno from '../../components/Utils/Button'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { Popover, Button } from "flowbite-react";
import { HiOutlineFilter } from "react-icons/hi";

const RelatorioTreinos = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState(null); // A-Z or Z-A
    const params = useParams();
    const navigate = useNavigate();


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        document.title = "Relatórios de Treino | CaringU"
        // pegarExercicios(params.id)
    }, [])

    // const pegarExercicios = async (id) => {
    //     try {
    //         const response = await caringuApi.get(`/treinos/${id}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
    //             },
    //         });

    //         if (response.status === 200) {
    //             console.log('Treinos obtidos com sucesso:', response.data);
    //             // Aqui você pode atualizar o estado com os treinos recebidos
    //             // Exemplo: setTreinos(response.data);
    //         } else {
    //             throw new Error('Erro ao obter os treinos.');
    //         }
    //     } catch (error) {
    //         console.error('Erro ao buscar os treinos:', error);
    //         toast.custom((t) => (
    //             <CustomToast t={t} type="error" message="Erro ao buscar os treinos. Tente novamente mais tarde." />
    //         ));
    //     }
    // };

    const treinos = [
        {
            id: 1,
            nome: "Treino de Braços",
            quantidadeExercicios: 8,
        },
        {
            id: 2,
            nome: "Treino de Pernas",
            quantidadeExercicios: 10,
        },
        {
            id: 3,
            nome: "Treino de Peito",
            quantidadeExercicios: 6,
        },
        {
            id: 4,
            nome: "Treino de Costas",
            quantidadeExercicios: 7,
        },
        {
            id: 5,
            nome: "Treino de Ombros",
            quantidadeExercicios: 5,
        },
        {
            id: 6,
            nome: "Treino de Abdômen",
            quantidadeExercicios: 6,
        },
    ];

    const filteredTreinos = treinos
        .filter((treino) => {
            if (searchTerm && !treino.nome.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            if (sortOrder === "A-Z") return a.nome.localeCompare(b.nome);
            if (sortOrder === "Z-A") return b.nome.localeCompare(a.nome);
            return 0;
        });

    const idAluno = params.id;
    const irParaDash = (idTreino) => {
        navigate(`/dashboard/${idAluno}/${idTreino}`);
    }

    return (
        <div className="flex h-screen bg-[#fdfbf7]">
            <MenuLateral />
            <div className="flex-1 flex flex-col">
                <Header toggleSidebar={toggleSidebar} />
                <main className="p-4 md:p-8 space-y-8 flex flex-col">
                    <div className="bg-[var(--cor-secundaria)] rounded-lg p-4 md:p-6 border border-[#E6E6E2]">
                        <div className="justify-start text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] flex flex-wrap items-center gap-5">
                            <Link to="/gerenciar-alunos">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                    <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <h1>Selecionar Treino</h1>
                        </div>
                        <div className="flex items-center gap-2 mb-4 max-w-[400px] mt-5">
                            <input
                                type="text"
                                placeholder="Pesquisar treino"
                                className="flex-1 border border-gray-300 rounded-md p-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Popover
                                placement="bottom"
                                trigger="click"
                                content={
                                    <div className="p-4 space-y-4 ">
                                        <div className="flex gap-2">
                                            <Button
                                                color={sortOrder === "A-Z" ? "blue" : "gray"}
                                                onClick={() =>
                                                    setSortOrder((prev) => (prev === "A-Z" ? null : "A-Z"))
                                                }
                                            >
                                                A-Z
                                            </Button>
                                            <Button
                                                color={sortOrder === "Z-A" ? "blue" : "gray"}
                                                onClick={() =>
                                                    setSortOrder((prev) => (prev === "Z-A" ? null : "Z-A"))
                                                }
                                            >
                                                Z-A
                                            </Button>
                                        </div>
                                    </div>
                                }
                            >
                                <button className="p-2 bg-gray-200 rounded-md">
                                    <HiOutlineFilter className="w-5 h-5 text-gray-600" />
                                </button>
                            </Popover>
                        </div>
                        <div className="flex flex-col items-center gap-4 mt-5 bg-[var(--cor-secundaria)] p-4 rounded-lg max-h-140 overflow-y-auto overflow-x-hidden">

                            {filteredTreinos.map((treino) => (
                                <div key={treino.id} className="w-full bg-[var(--cor-secundaria)] border border-[#E6E6E2] flex flex-wrap items-center rounded-lg justify-between p-4">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 w-full">
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-15 md:h-15" viewBox="0 0 60 49" fill="none">
                                                <path d="M48.3716 10.4004H52.0925C53.1194 10.4004 53.9529 11.4532 53.9529 12.7504V36.2504C53.9529 37.5476 53.1194 38.6004 52.0925 38.6004H48.3716C47.3447 38.6004 46.5112 37.5476 46.5112 36.2504V12.7504C46.5112 11.4532 47.3447 10.4004 48.3716 10.4004Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M40.9298 1H44.6506C45.6775 1 46.511 2.0528 46.511 3.35V45.65C46.511 46.9472 45.6775 48 44.6506 48H40.9298C39.9028 48 39.0693 46.9472 39.0693 45.65V3.35C39.0693 2.0528 39.9028 1 40.9298 1Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M14.8834 1H18.6042C19.6311 1 20.4646 2.0528 20.4646 3.35V45.65C20.4646 46.9472 19.6311 48 18.6042 48H14.8834C13.8564 48 13.0229 46.9472 13.0229 45.65V3.35C13.0229 2.0528 13.8564 1 14.8834 1Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M7.44147 10.4004H11.1623C12.1893 10.4004 13.0227 11.4532 13.0227 12.7504V36.2504C13.0227 37.5476 12.1893 38.6004 11.1623 38.6004H7.44147C6.41452 38.6004 5.58105 37.5476 5.58105 36.2504V12.7504C5.58105 11.4532 6.41452 10.4004 7.44147 10.4004Z" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M53.9531 24.5H59.5344" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M20.4648 24.5H39.069" stroke="#E96E35" strokeWidth="2" />
                                                <path d="M0 24.5H5.58125" stroke="#E96E35" strokeWidth="2" />
                                            </svg>
                                            <div>
                                                <p><b>Treino: </b>{treino.nome}</p>
                                                <p><b>Quantidade de exercícios: </b>{treino.quantidadeExercicios}</p>
                                            </div>
                                        </div>
                                        <ButtonInterno
                                            texto="Ver Relatório"
                                            type="submit"
                                            cor="transparent"
                                            corTexto="var(--cor-primaria)"
                                            corHover="var(--cor-primaria)"
                                            width="268px"
                                            height="50px"
                                            font-size="20px"
                                            onClick={() => { irParaDash(treino.id) }}
                                            borderStyle="solid"
                                            borderWidth="4px"
                                            borderColor="rgba(29, 45, 68, 0.11)"
                                            fontWeight="600"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div >
    )
}

export default RelatorioTreinos