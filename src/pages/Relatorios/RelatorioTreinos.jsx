import React, { use } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import Input from '../../components/Utils/Inputs'
import Button from '../../components/Utils/Button'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import CustomToast from '../../components/Utils/CustomToast'
import {caringuApi} from '../../provider/caringuApi';

const RelatorioTreinos = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const params = useParams();
    const navigate = useNavigate();


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        pegarExercicios(params.id)
    }, [])

    const pegarExercicios = async (id) => {
        try {
            const response = await caringuApi.get(`/treinos/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
                },
            });

            if (response.status === 200) {
                console.log('Treinos obtidos com sucesso:', response.data);
                // Aqui você pode atualizar o estado com os treinos recebidos
                // Exemplo: setTreinos(response.data);
            } else {
                throw new Error('Erro ao obter os treinos.');
            }
        } catch (error) {
            console.error('Erro ao buscar os treinos:', error);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao buscar os treinos. Tente novamente mais tarde." />
            ));
        }
    };

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
    const idAluno = params.id;
    const irParaDash = (idTreino) => {
        console.log(idAluno, idTreino)
        navigate(`/dashboard/${idAluno}/${idTreino}`);
    }

    return (
        <div className="flex h-screen bg-[#fdfbf7]">
            <MenuLateral />
            <div className="flex-1 flex flex-col">
                <Header toggleSidebar={toggleSidebar} />
                <main className="p-4 md:p-8 font-sans space-y-8 flex flex-col">
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
                        <div className="flex flex-wrap items-center gap-4 mt-5">
                            <div className="w-full md:w-110">
                                <Input
                                    id="treino"
                                    name="treino"
                                    label="Pesquisar Treino"
                                    type="text"
                                    required={true}
                                />
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" viewBox="0 0 35 35" fill="none">
                                    <path d="M16.7707 30.6243C24.4221 30.6243 30.6248 24.4216 30.6248 16.7702C30.6248 9.11874 24.4221 2.91602 16.7707 2.91602C9.11923 2.91602 2.9165 9.11874 2.9165 16.7702C2.9165 24.4216 9.11923 30.6243 16.7707 30.6243Z" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M32.0832 32.0827L29.1665 29.166" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" viewBox="0 0 35 35" fill="none">
                                    <path d="M7.87516 3.0625H27.1252C28.7293 3.0625 30.0418 4.375 30.0418 5.97917V9.1875C30.0418 10.3542 29.3127 11.8125 28.5835 12.5417L22.3127 18.0833C21.4377 18.8125 20.8543 20.2708 20.8543 21.4375V27.7083C20.8543 28.5833 20.271 29.75 19.5418 30.1875L17.5002 31.5C15.6043 32.6667 12.9793 31.3542 12.9793 29.0208V21.2917C12.9793 20.2708 12.396 18.9583 11.8127 18.2292L6.271 12.3958C5.54183 11.6667 4.9585 10.3542 4.9585 9.47917V6.125C4.9585 4.375 6.271 3.0625 7.87516 3.0625Z" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.9396 3.0625L8.75 14.5833" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4 mt-5 bg-[var(--cor-secundaria)] p-4 rounded-lg max-h-140 overflow-y-auto overflow-x-hidden">

                            {treinos.map((treino) => (
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
                                        <Button
                                            texto="Ver Relatório"
                                            type="submit"
                                            cor="var(--azul-claro)"
                                            corTexto="var(--cor-secundaria)"
                                            corHover="#677e9c"
                                            width="268px"
                                            height="50px"
                                            font-size="14px"
                                            onClick={() => {irParaDash(treino.id)}}
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