import React, { use } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import Image from '../../assets/images/image.png'

const PerfilAluno = () => {


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
                            <div className="flex flex-col md:flex-row items-center md:gap-[100px] mt-2 p-5 border-2 border-[#E6E6E2] rounded-lg">
                                <img src={Image} alt="" className='h-[116px]' />
                                <div className='flex flex-col md:flex-row items-start mt-4 gap-4'>

                                    <div className='flex flex-col gap-4'>
                                        <p><b>Nome:</b> Maria Gladys Mello da Silva</p>
                                        <p><b>Email:</b> mariagladys@gmail.com</p>
                                        <p><b>Gênero:</b> Feminino</p>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <p><b>Data de nascimento:</b> 08/05/1958</p>
                                        <p><b>Telefone:</b> 1191234-5678</p>
                                        <p><b>Nível de experiência:</b> Iniciante</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <h1 className="text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] mt-5">Dados Físicos</h1>
                        <div className="flex flex-col max-h-40 overflow-y-auto p-5 border-2 border-[#E6E6E2] rounded-lg justify-start">
                            <div className='mx-2 w-5xl flex gap-10 grid-cols-2'>
                                <div className='cols-span-1'>
                                    <p><b>Peso:</b></p>
                                    <p>100 Kg</p>
                                </div>
                                <div className='cols-span-1'>
                                    <p><b>Altura:</b></p>
                                    <p>1.79 m</p>
                                </div>
                            </div>
                            <div className='m-2 flex gap-10 grid-cols-3'>
                                <div className='cols-span-1'>
                                    <p><b>Desconforto:</b></p>
                                    <p>Dor na articulação do cotovelo</p>
                                </div>
                                <div className='cols-span-1'>
                                    <p><b>Lesão:</b></p>
                                    <p>Doenças Neuromusculares</p>
                                </div>
                                <div className='cols-span-1'>
                                    <p><b>Doenças Metabólicas:</b></p>
                                    <p>N/A</p>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] mt-5">Atividade física e Recursos</h1>
                        <div className="flex flex-col max-h-50 overflow-y-auto p-5 border-2 border-[#E6E6E2] rounded-lg justify-start">
                            <div className='flex grid-cols-2'>
                                <div className='mx-2 w-2xl flex gap-5 cols-span-1 flex-col'>
                                    <div>
                                        <p><b>Frequência de treino desejada:</b></p>
                                        <p>4x na semana</p>
                                    </div>
                                    <div className='flex gap-10'>
                                        <div>
                                            <p><b>Objetivo:</b></p>
                                            <p>Emagrecimento</p>
                                        </div>
                                        <div>
                                            <p><b>Nível de atividade atual:</b></p>
                                            <p>Levemente ativo</p>
                                        </div>
                                        <div>
                                            <p><b>Doenças Metabólicas:</b></p>
                                            <p>N/A</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='cols-span-1 h-full w-1/2 flex justify-start'>
                                    <div className='w-sm'>
                                        <p><b>Experiência:</b></p>
                                        <p>Treinei por 2 anos em academia com foco em hipertrofia, acompanhado por personal. Fiz uma pausa de 1 ano e agora estou voltando para emagrecer.</p>
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