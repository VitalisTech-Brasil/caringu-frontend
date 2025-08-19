import React, { useState, useEffect } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import MascaraTelefone from '../../components/Utils/Functions/MascaraTelefone'
import MascaraData from '../../components/Utils/Functions/MascaraData'
import calcularIdade from '../../components/Utils/Functions/Calculos'
import { Link, useParams } from 'react-router-dom'
import { caringuApi } from "../../provider/caringuApi";
import { FaUserCircle } from 'react-icons/fa'

const PerfilAluno = () => {
    const { idAluno } = useParams();
    const [aluno, setAluno] = useState();
    const [imgErro, setImgErro] = useState(false);

    useEffect(() => {
        document.title = "Perfil do Aluno | Caringu"
        const fetchInfosAluno = async () => {
            try {
                const response = await caringuApi.get(`/anamnese/${idAluno}`);
                setAluno(response.data);
            } catch (error) {
                console.error("Erro ao buscar informações do aluno:", error);
            }
        };

        fetchInfosAluno();
    }, [idAluno]);

    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateral />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Header />
                <main className="p-2 md:p-4 space-y-3 flex flex-col">
                    {/* Título */}
                    <div className="flex items-center text-zinc-900 text-lg sm:text-xl md:text-3xl font-semibold gap-4 sm:gap-6 md:gap-8">
                        <Link to={`/gerenciar-alunos`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <h1>Perfil do Aluno</h1>
                    </div>

                    <div className="bg-[#F9F9F9] rounded-lg p-4 md:p-6 border border-[#E6E6E2] flex flex-col gap-6">

                        {/* Parte de cima */}
                        <div className="flex flex-col lg:flex-row gap-6 w-full">

                            {/* Dados Pessoais */}
                            <div className="lg:w-1/3 border-2 bg-[var(--cor-secundaria)] border-[#3d4b5d1f] rounded-md p-4 sm:p-5 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    {aluno?.alunoId?.urlFotoPerfil && !imgErro ? (
                                        <img
                                            src={aluno.alunoId.urlFotoPerfil}
                                            alt="Imagem do aluno"
                                            className='w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 rounded-full'
                                            onError={() => setImgErro(true)}
                                        />

                                    ) : (
                                        <FaUserCircle className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14" />
                                    )}
                                    <h2 className="text-black text-lg sm:text-xl md:text-2xl">Dados Pessoais</h2>
                                </div>
                                <div className="flex flex-col gap-3 text-sm sm:text-base">
                                    <div>
                                        <div className="text-[var(--cinza-claro)]">Nome Completo</div>
                                        <span>{aluno?.alunoId?.nome ? `${aluno.alunoId.nome}` : "N/A"}</span>
                                    </div>
                                    <div>
                                        <div className="text-[var(--cinza-claro)]">Data de Nascimento</div>
                                        <span>{aluno?.alunoId?.dataNascimento ? `${MascaraData(aluno.alunoId.dataNascimento)}` : "Não infomada"}</span>
                                    </div>
                                    <div>
                                        <div className="text-[var(--cinza-claro)]">Gênero</div>
                                        <span>{
                                            aluno?.alunoId?.genero === "HOMEM_CISGENERO" ? "Homem Cisgênero" :
                                                aluno?.alunoId?.genero === "HOMEM_TRANSGENERO" ? "Homem Transgênero" :
                                                    aluno?.alunoId?.genero === "MULHER_CISGENERO" ? "Mulher Cisgênero" :
                                                        aluno?.alunoId?.genero === "MULHER_TRANSGENERO" ? "Mulher Transgênero" :
                                                            aluno?.alunoId?.genero === "NAO_BINARIO" ? "Não Binário" :
                                                                aluno?.alunoId?.genero || "N/A"
                                        }
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-[var(--cinza-claro)]">E-mail</div>
                                        <span>{aluno?.alunoId?.email ? `${aluno.alunoId.email}` : "Não infomado"}</span>
                                    </div>
                                    <div>
                                        <div className="text-[var(--cinza-claro)]">Telefone</div>
                                        <span>{aluno?.alunoId?.celular ? `${MascaraTelefone(aluno.alunoId.celular)}` : "Não infomado"}</span>
                                    </div>
                                    <div>
                                        <div className="text-[var(--cinza-claro)]">Nível de experiência</div>
                                        <span>{
                                            aluno?.alunoId?.nivelExperiencia === "INICIANTE" ? "Iniciante" :
                                                aluno?.alunoId?.nivelExperiencia === "INTERMEDIARIO" ? "Intermediário" :
                                                    aluno?.alunoId?.nivelExperiencia === "AVANCADO" ? "Avançado" :
                                                        aluno?.alunoId?.nivelExperiencia || "Não infomado"
                                        }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Dados Físicos */}
                            <div className="lg:w-2/3 border-2 bg-[var(--cor-secundaria)] border-[#3d4b5d1f] rounded-md p-4 sm:p-5 flex flex-col gap-4">
                                {/* Título */}
                                <div className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <path d="M44 15.62V25H35.84C35.6 24.98 35.08 24.68 34.96 24.46L32.88 20.52C32.06 18.96 30.64 18.08 29.12 18.16C27.6 18.24 26.3 19.26 25.64 20.92L22.88 27.84L22.48 26.8C21.5 24.26 18.7 22.34 15.94 22.34L4 22.4V15.62C4 8.34 8.34 4 15.62 4H32.38C39.66 4 44 8.34 44 15.62Z" fill="#E96E35" />
                                        <path d="M44 32.38V28H35.84C34.5 28 32.92 27.04 32.3 25.86L30.22 21.92C29.66 20.86 28.86 20.92 28.42 22.02L23.82 33.64C23.32 34.94 22.48 34.94 21.96 33.64L19.68 27.88C19.14 26.48 17.46 25.34 15.96 25.34L4 25.4V32.38C4 39.54 8.2 43.86 15.26 43.98C15.48 44 15.72 44 15.94 44H31.94C32.24 44 32.54 44 32.82 43.98C39.84 43.82 44 39.52 44 32.38Z" fill="#E96E35" />
                                        <path d="M3.99994 25.4V32.02C3.95994 31.38 3.93994 30.7 3.93994 30V25.4H3.99994Z" fill="#E96E35" />
                                    </svg>
                                    <h2 className="text-black text-lg sm:text-xl md:text-2xl">Dados Físicos</h2>
                                </div>

                                {/* KPIs */}
                                <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-4">
                                    <div className="flex-1 min-w-[100px] flex flex-col items-center border-2 border-[#3d4b5d1f] rounded-md p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M8 2V5" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16 2V5" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3.5 9.08997H20.5" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="text-xs text-[var(--cinza-claro)]">Idade</span>
                                        <span className="font-bold text-lg sm:text-xl text-center">{aluno?.alunoId?.dataNascimento ? `${calcularIdade(aluno.alunoId.dataNascimento)}` : "Não informada"}</span>
                                    </div>
                                    <div className="flex-1 min-w-[100px] flex flex-col items-center border-2 border-[#3d4b5d1f] rounded-md p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M10 22H14C19 22 21 20 21 15V9C21 4 19 2 14 2H10C5 2 3 4 3 9V15C3 20 5 22 10 22Z" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17.25 8.29004C14.26 5.63004 9.74 5.63004 6.75 8.29004L8.93 11.79C10.68 10.23 13.32 10.23 15.07 11.79L17.25 8.29004Z" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="text-xs text-[var(--cinza-claro)]">Peso</span>
                                        <span className="font-bold text-lg sm:text-xl text-center">{aluno?.alunoId?.peso ? `${aluno.alunoId.peso} Kg` : "Não informado"}</span>
                                    </div>
                                    <div className="flex-1 min-w-[100px] flex flex-col items-center border-2 border-[#3d4b5d1f] rounded-md p-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M22 10C22 8 21 7 19 7H5C3 7 2 8 2 10V14C2 16 3 17 5 17H19C21 17 22 16 22 14" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M18 7V12" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M6 7V11" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M10.05 7L10 12" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M14 7V10" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        <span className="text-xs text-[var(--cinza-claro)]">Altura</span>
                                        <span className="font-bold text-lg sm:text-xl text-center">{aluno?.alunoId?.altura ? `${aluno.alunoId.altura} m` : "Não informado"}</span>
                                    </div>
                                </div>

                                {/* Infos anamnese */}
                                <div className="flex flex-col lg:flex-row gap-6">
                                    <div className="flex-1 flex flex-col gap-4">
                                        <div>
                                            <div className="text-[var(--cinza-claro)] text-sm sm:text-base">Áreas de desconforto</div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className={`${aluno?.desconforto ? "bg-[var(--laranja)] text-white px-2 py-1 rounded-sm" : ""}`}>{aluno?.desconforto ? `${aluno.desconfortoDescricao}` : "Nenhuma"}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[var(--cinza-claro)] text-sm sm:text-base">Próteses</div>
                                            <span>{aluno?.proteses ? `${aluno.protesesDescricao}` : "Nenhuma"}</span>
                                        </div>
                                        <div>
                                            <div className="text-[var(--cinza-claro)] text-sm sm:text-base">Lesões</div>
                                            <span className={`${aluno?.lesao ? "bg-[var(--laranja)] text-white px-2 py-1 rounded-sm" : ""}`}>{aluno?.lesao ? `${aluno.lesaoDescricao}` : "Nenhuma"}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col gap-4">
                                        <div>
                                            <div className="text-[var(--cinza-claro)] text-sm sm:text-base">Fumante</div>
                                            <span>{aluno?.fumante ? `Sim` : "Não"}</span>
                                        </div>
                                        <div>
                                            <div className="text-[var(--cinza-claro)] text-sm sm:text-base">Doenças Metabólicas</div>
                                            <span>{aluno?.doencaMetabolica ? `${aluno.doencaMetabolicaDescricao}` : "Nenhuma"}</span>
                                        </div>
                                        <div>
                                            <div className="text-[var(--cinza-claro)] text-sm sm:text-base">Deficiências</div>
                                            <span>{aluno?.deficiencia ? `${aluno.deficienciaDescricao}` : "Nenhuma"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Parte de baixo */}
                        <div className="flex flex-col justify-start border-2 bg-[var(--cor-secundaria)] border-[#3d4b5d1f] rounded-md p-4 sm:p-5 gap-4">
                            <div className='flex items-center gap-3'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                                    <rect width="37" height="37" rx="6" fill="#E96E35" />
                                    <path d="M28.375 12.737H30.25C30.7675 12.737 31.1875 13.2675 31.1875 13.9212V25.7633C31.1875 26.417 30.7675 26.9475 30.25 26.9475H28.375C27.8575 26.9475 27.4375 26.417 27.4375 25.7633V13.9212C27.4375 13.2675 27.8575 12.737 28.375 12.737Z" stroke="#FDFFFD" strokeWidth="1.5" />
                                    <path d="M24.625 8H26.5C27.0175 8 27.4375 8.53053 27.4375 9.18422V30.5001C27.4375 31.1538 27.0175 31.6843 26.5 31.6843H24.625C24.1075 31.6843 23.6875 31.1538 23.6875 30.5001V9.18422C23.6875 8.53053 24.1075 8 24.625 8Z" stroke="#FDFFFD" strokeWidth="1.5" />
                                    <path d="M11.5 8H13.375C13.8925 8 14.3125 8.53053 14.3125 9.18422V30.5001C14.3125 31.1538 13.8925 31.6843 13.375 31.6843H11.5C10.9825 31.6843 10.5625 31.1538 10.5625 30.5001V9.18422C10.5625 8.53053 10.9825 8 11.5 8Z" stroke="#FDFFFD" strokeWidth="1.5" />
                                    <path d="M7.75 12.737H9.625C10.1425 12.737 10.5625 13.2675 10.5625 13.9212V25.7633C10.5625 26.417 10.1425 26.9475 9.625 26.9475H7.75C7.2325 26.9475 6.8125 26.417 6.8125 25.7633V13.9212C6.8125 13.2675 7.2325 12.737 7.75 12.737Z" stroke="#FDFFFD" strokeWidth="1.5" />
                                    <path d="M31.1875 19.8421H34" stroke="#FDFFFD" strokeWidth="1.5" />
                                    <path d="M14.3125 19.8421H23.6875" stroke="#FDFFFD" strokeWidth="1.5" />
                                    <path d="M4 19.8421H6.8125" stroke="#FDFFFD" strokeWidth="1.5" />
                                </svg>
                                <h2 className="text-black text-lg sm:text-xl md:text-2xl">Atividades Físicas e Recursos</h2>
                            </div>

                            <div className="flex flex-col xl:flex-row gap-6">
                                {/* Coluna 1 */}
                                <div className="flex-1 flex flex-col sm:flex-row gap-6 lg:gap-35">
                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <div className="text-[var(--cinza-claro)] text-sm sm:text-base">Frequência de Treino Desejada</div>
                                            <span>{aluno?.frequenciaTreino ? `${aluno.frequenciaTreino}x na semana` : "Não informado"}</span>
                                        </div>
                                        <div>
                                            <div className="text-[var(--cinza-claro)] text-sm sm:text-base">Nível de Atividade Atual</div>
                                            <span>
                                                {
                                                    aluno?.alunoId?.nivelAtividade === "SEDENTARIO" ? "Sedentário" :
                                                        aluno?.alunoId?.nivelAtividade === "LEVEMENTE_ATIVO" ? "Levemente Ativo" :
                                                            aluno?.alunoId?.nivelAtividade === "MODERADAMENTE_ATIVO" ? "Moderadamente Ativo" :
                                                                aluno?.alunoId?.nivelAtividade === "MUITO_ATIVO" ? "Muito Ativo" :
                                                                    aluno?.alunoId?.nivelAtividade === "EXTREMAMENTE_ATIVO" ? "Extremamente Ativo" :
                                                                        aluno?.alunoId?.nivelAtividade || "Não informado"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[var(--cinza-claro)] text-sm sm:text-base">Objetivo</div>
                                        <span>{aluno?.objetivoTreino ? `${aluno.objetivoTreino}` : "Não informado"}</span>
                                    </div>
                                </div>

                                {/* Experiência */}
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className='flex gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M22 4.67001V16.74C22 17.7 21.22 18.6 20.26 18.72L19.93 18.76C17.75 19.05 14.39 20.16 12.47 21.22C12.21 21.37 11.78 21.37 11.51 21.22L11.47 21.2C9.54997 20.15 6.20003 19.05 4.03003 18.76L3.73999 18.72C2.77999 18.6 2 17.7 2 16.74V4.66C2 3.47 2.96997 2.57001 4.15997 2.67001C6.25997 2.84001 9.43997 3.90003 11.22 5.01003L11.47 5.16C11.76 5.34 12.24 5.34 12.53 5.16L12.7 5.05001C13.33 4.66001 14.13 4.27001 15 3.92001V8.00002L17 6.67001L19 8.00002V2.78005C19.27 2.73005 19.53 2.70002 19.77 2.68002H19.83C21.02 2.58002 22 3.47001 22 4.67001Z" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 5.48999V20.49" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19 2.78003V8L17 6.66998L15 8V3.91998C16.31 3.39998 17.77 2.98003 19 2.78003Z" stroke="#15171B" strokeOpacity="0.53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="text-[var(--cinza-claro)] text-sm sm:text-base">Experiência</div>
                                    </div>

                                    <div className="p-2 border-2 border-[#3d4b5d1f] max-w-3xl h-20 overflow-auto rounded-md text-sm sm:text-base">
                                        {aluno?.experiencia
                                            ? aluno.experienciaDescricao
                                            : "Nenhuma experiência relatada."}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}

export default PerfilAluno
