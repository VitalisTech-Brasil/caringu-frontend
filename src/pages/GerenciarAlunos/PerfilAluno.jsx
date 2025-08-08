import React, { useState, useEffect } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import Image from '../../assets/images/image.png'
import { caringuApi } from "../../provider/caringuApi";
import MascaraTelefone from '../../components/Utils/Functions/MascaraTelefone'
import MascaraData from '../../components/Utils/Functions/MascaraData'
import { FaUserCircle } from 'react-icons/fa'

const PerfilAluno = () => {

    const { idAluno } = useParams();
    const [aluno, setAluno] = useState();
    const [imgErro, setImgErro] = useState(false);

    useEffect(() => {
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
        <div className="flex min-h-screen bg-[#fdfbf7]">
            <MenuLateral />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Header />
                <main className="p-4 md:p-8 space-y-3 flex flex-col">
                    <div className="flex items-center text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] gap-8">
                        <Link to={`/gerenciar-alunos`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <h1>Perfil do Aluno</h1>
                    </div>
                    <div className="bg-[var(--cor-secundaria)] rounded-lg p-4 md:p-6 border border-[#E6E6E2] md:max-h-[780px] overflow-y-auto">
                        <h1 className="text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter']">Dados Pessoais</h1>

                        <div className="flex flex-col h-auto">
                            <div className="flex flex-col lg:flex-row items-center md:gap-[30px] mt-2 p-5 border-2 border-[#E6E6E2] rounded-lg">

                                {aluno?.alunoId?.urlFotoPerfil && !imgErro ? (
                                    <img
                                        src={aluno.alunoId.urlFotoPerfil}
                                        alt="Imagem do aluno"
                                        className=' w-20 h-20 sm:w-30 sm:h-30 rounded-full'
                                        onError={() => setImgErro(true)}
                                    />

                                ) : (
                                    <FaUserCircle className="flex-shrink-0 w-16 h-16 sm:w-25 sm:h-25 lg:w-30 lg:h-30" />
                                )}

                                <div className='flex flex-col md:flex-row items-start mt-4 gap-4'>

                                    <div className='flex flex-col gap-4'>
                                        <p><b>Nome:</b> {aluno?.alunoId?.nome ? `${aluno.alunoId.nome}` : "N/A"}</p>
                                        <p><b>Email:</b> {aluno?.alunoId?.email ? `${aluno.alunoId.email}` : "N/A"}</p>
                                        <p>
                                            <b>
                                                Gênero:
                                            </b> {
                                                aluno?.alunoId?.genero === "HOMEM_CISGENERO" ? "Homem Cisgênero" :
                                                    aluno?.alunoId?.genero === "HOMEM_TRANSGENERO" ? "Homem Transgênero" :
                                                        aluno?.alunoId?.genero === "MULHER_CISGENERO" ? "Mulher Cisgênero" :
                                                            aluno?.alunoId?.genero === "MULHER_TRANSGENERO" ? "Mulher Transgênero" :
                                                                aluno?.alunoId?.genero === "NAO_BINARIO" ? "Não Binário" :
                                                                    aluno?.alunoId?.genero || "N/A"
                                            }
                                        </p>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <p><b>Data de nascimento:</b> {aluno?.alunoId?.dataNascimento ? `${MascaraData(aluno.alunoId.dataNascimento)}` : "N/A"}</p>
                                        <p><b>Telefone:</b> {aluno?.alunoId?.celular ? `${MascaraTelefone(aluno.alunoId.celular)}` : "N/A"}</p>
                                        <p>
                                            <b>
                                                Nível de experiência:
                                            </b> {
                                                aluno?.alunoId?.nivelExperiencia === "INICIANTE" ? "Iniciante" :
                                                    aluno?.alunoId?.nivelExperiencia === "INTERMEDIARIO" ? "Intermediário" :
                                                        aluno?.alunoId?.nivelExperiencia === "AVANCADO" ? "Avançado" :
                                                            aluno?.alunoId?.nivelExperiencia || "N/A"
                                            }
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <h1 className="text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] mt-5">Dados Físicos</h1>
                        <div className="flex flex-col max-h-40 overflow-y-auto p-5 border-2 my-4 border-[#E6E6E2] rounded-lg justify-start w-full">
                            <div className='mx-4 mb-2 flex gap-2 sm:gap-10 flex-col sm:flex-row'>
                                <div className='cols-span-1'>
                                    <p><b>Peso:</b></p>
                                    <p>{aluno?.alunoId?.peso ? `${aluno.alunoId.peso} Kg` : "N/A"}</p>
                                </div>
                                <div className='cols-span-1'>
                                    <p><b>Altura:</b></p>
                                    <p>{aluno?.alunoId?.altura ? `${aluno.alunoId.altura} m` : "N/A"}</p>
                                </div>
                            </div>
                            <div className='mx-4 mt-1 sm:mt-2 flex gap-2 sm:gap-20 flex-col sm:flex-row'>
                                <div className='cols-span-1 '>
                                    <div className='my-4'>
                                        <p><b>Desconforto:</b></p>
                                        <p>{aluno?.desconforto ? `${aluno.desconfortoDescricao}` : "Não"}</p>
                                    </div>
                                    <div className='my-4'>
                                        <p><b>Próteses:</b></p>
                                        <p>{aluno?.proteses ? `${aluno.protesesDescricao}` : "Não"}</p>
                                    </div>
                                </div>
                                <div className='cols-span-1'>
                                    <div className='my-4'>
                                        <p><b>Lesão:</b></p>
                                        <p>{aluno?.lesao ? `${aluno.lesao}` : "Não"}</p>
                                    </div>
                                    <div className='my-4'>
                                        <p><b>Fumante:</b></p>
                                        <p>{aluno?.fumante ? `Sim` : "Não"}</p>
                                    </div>
                                </div>
                                <div className='cols-span-1'>
                                    <div className='my-4'>
                                        <p><b>Doenças Metabólicas:</b></p>
                                        <p>{aluno?.doencaMetabolica ? `${aluno.doencaMetabolica}` : "Não"}</p>
                                    </div>
                                    <div className='my-4'>
                                        <p><b>Deficiências:</b></p>
                                        <p>{aluno?.deficiencia ? `${aluno.deficienciaDescricao}` : "Não"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] mt-5">Atividade física e Recursos</h1>
                        <div className="flex flex-col max-h-50 overflow-y-auto p-5 border-2 my-4 border-[#E6E6E2] rounded-lg justify-start w-full">
                            <div className='flex flex-col sm:flex-row'>
                                <div className='mx-2 flex gap-5 flex-col w-auto'>
                                    <div>
                                        <p><b>Frequência de treino desejada:</b></p>
                                        <p>{aluno?.frequenciaTreino ? `${aluno.frequenciaTreino}x na semana` : "N/A"}</p>
                                    </div>
                                    <div className='flex flex-col sm:flex-row sm:gap-10 lg:gap-20'>
                                        <div>
                                            <p><b>Objetivo:</b></p>
                                            <p>{aluno?.objetivoTreino ? `${aluno.objetivoTreino}` : "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className='font-bold w-[10vw]'>Nível de atividade atual:</p>
                                            <p>
                                                {
                                                    aluno?.alunoId?.nivelAtividade === "SEDENTARIO" ? "Sedentário" :
                                                        aluno?.alunoId?.nivelAtividade === "LEVEMENTE_ATIVO" ? "Levemente Ativo" :
                                                            aluno?.alunoId?.nivelAtividade === "MODERADAMENTE_ATIVO" ? "Moderadamente Ativo" :
                                                                aluno?.alunoId?.nivelAtividade === "MUITO_ATIVO" ? "Muito Ativo" :
                                                                    aluno?.alunoId?.nivelAtividade === "EXTREMAMENTE_ATIVO" ? "Extremamente Ativo" :
                                                                        aluno?.alunoId?.nivelAtividade || "N/A"
                                                }
                                            </p>

                                        </div>
                                        <div>
                                            <p><b>Doenças Metabólicas:</b></p>
                                            <p>{aluno?.doencaMetabolica ? `${aluno.doencaMetabolicaDescricao}` : "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='mx-2 sm:mx-0 cols-span-1 h-full flex justify-start w-auto'>
                                    <div className='w-auto'>
                                        <p><b>Experiência:</b></p>
                                        <p>{aluno?.experiencia ? `${aluno.experienciaDescricao}` : "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div >
    )
}

export default PerfilAluno