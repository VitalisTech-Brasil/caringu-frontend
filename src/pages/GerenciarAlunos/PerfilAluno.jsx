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
        <div className="flex min-h-screen bg-[#fdfbf7] ">
            <MenuLateral />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-4 md:p-8 font-sans space-y-3 flex flex-col">
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

                        <div className="flex flex-col max-h-60 overflow-y-auto">
                            <div className="flex flex-col md:flex-row items-center md:gap-[30px] mt-2 p-5 border-2 border-[#E6E6E2] rounded-lg">
                                
                                {aluno?.alunoId?.urlFotoPerfil && !imgErro ? (
                                    <img
                                        src={aluno.alunoId.urlFotoPerfil}
                                        alt="Imagem do aluno"
                                        className='h-[116px]'
                                        onError={() => setImgErro(true)}
                                    />

                                ) : (
                                    <FaUserCircle className="flex-shrink-0 w-16 h-16 sm:w-19 sm:h-19 lg:w-22 lg:h-22" />
                                )}

                                <div className='flex flex-col md:flex-row items-start mt-4 gap-4'>

                                    <div className='flex flex-col gap-4'>
                                        <p><b>Nome:</b> {aluno?.alunoId?.nome ? `${aluno.alunoId.nome}` : "N/A"}</p>
                                        <p><b>Email:</b> {aluno?.alunoId?.email ? `${aluno.alunoId.email}` : "N/A"}</p>
                                        <p><b>Gênero:</b> {aluno?.alunoId?.genero ? `${aluno.alunoId.genero}` : "N/A"}</p>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <p><b>Data de nascimento:</b> {aluno?.alunoId?.dataNascimento ? `${MascaraData(aluno.alunoId.dataNascimento)}` : "N/A"}</p>
                                        <p><b>Telefone:</b> {aluno?.alunoId?.celular ? `${MascaraTelefone(aluno.alunoId.celular)}` : "N/A"}</p>
                                        <p><b>Nível de experiência:</b> {aluno?.alunoId?.nivelExperiencia ? `${aluno.alunoId.nivelExperiencia}` : "N/A"}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <h1 className="text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] mt-5">Dados Físicos</h1>
                        <div className="flex flex-col max-h-40 overflow-y-auto p-5 border-2 my-4 border-[#E6E6E2] rounded-lg justify-start">
                            <div className='mx-4 mb-2 w-5xl flex gap-10 grid-cols-2'>
                                <div className='cols-span-1'>
                                    <p><b>Peso:</b></p>
                                    <p>{aluno?.alunoId?.peso ? `${aluno.alunoId.peso} Kg` : "N/A"}</p>
                                </div>
                                <div className='cols-span-1'>
                                    <p><b>Altura:</b></p>
                                    <p>{aluno?.alunoId?.altura ? `${aluno.alunoId.altura} m` : "N/A"}</p>
                                </div>
                            </div>
                            <div className='mx-4 mt-2 flex gap-20 grid-cols-3 w-5xl'>
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
                        <div className="flex flex-col max-h-50 overflow-y-auto p-5 border-2 my-4 border-[#E6E6E2] rounded-lg justify-start">
                            <div className='flex grid-cols-2'>
                                <div className='mx-2 w-3xl flex gap-5 cols-span-1 flex-col'>
                                    <div>
                                        <p><b>Frequência de treino desejada:</b></p>
                                        <p>{aluno?.frequenciaTreino ? `${aluno.frequenciaTreino}x na semana` : "N/A"}</p>
                                    </div>
                                    <div className='flex gap-20'>
                                        <div>
                                            <p><b>Objetivo:</b></p>
                                            <p>{aluno?.objetivoTreino ? `${aluno.objetivoTreino}` : "N/A"}</p>
                                        </div>
                                        <div>
                                            <p><b>Nível de atividade atual:</b></p>
                                            <p>{aluno?.alunoId?.nivelAtividade ? `${aluno.alunoId.nivelAtividade}` : "N/A"}</p>
                                        </div>
                                        <div>
                                            <p><b>Doenças Metabólicas:</b></p>
                                            <p>{aluno?.doencaMetabolica ? `${aluno.doencaMetabolicaDescricao}` : "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='cols-span-1 h-full w-1/2 flex justify-start'>
                                    <div className='w-sm'>
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