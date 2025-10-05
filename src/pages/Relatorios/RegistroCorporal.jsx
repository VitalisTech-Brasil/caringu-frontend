import React, { use } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import CarrosselRegistro from '../../components/Utils/CarrosselRegistro'

const RelatorioTreinos = () => {
    const { idAluno } = useParams();

    const imagensFrontais = [
        { id: 1, dataEnvio: "10/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/suellen/1frente.jpg" },
        { id: 2, dataEnvio: "11/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/suellen/2frente.jpeg" }
    ];

    const imagensPerfilDireita = [
        { id: 3, dataEnvio: "12/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/suellen/1ladoDireito.jpg" },
        { id: 4, dataEnvio: "13/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/suellen/2ladoDireito.jpg" }
    ];

    const imagensPerfilEsquerda = [
        { id: 5, dataEnvio: "12/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/suellen/1ladoEsquerdo.jpg" },
        { id: 6, dataEnvio: "13/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/suellen/2ladoEsquerdo.jpg" }

    ];

    const imagensCosta = [
        { id: 7, dataEnvio: "12/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/suellen/1costas.jpg" },
        { id: 8, dataEnvio: "13/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/suellen/2costas.jpg" }

    ];

    const imagensNaganoFrontais = [
        { id: 9, dataEnvio: "10/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/Nagano/1frente.jpg" },
        { id: 10, dataEnvio: "11/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/Nagano/2frente.jpg" }
    ];

    const imagensNaganoDireita = [
        { id: 11, dataEnvio: "12/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/Nagano/1ladoDireito.jpg" },
        { id: 12, dataEnvio: "13/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/Nagano/2ladoDireito.jpg" }
    ];

    const imagensNaganoEsquerda = [
        { id: 13, dataEnvio: "12/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/Nagano/1ladoEsquerdo.jpg" }/* ,
        { id: 14, dataEnvio: "13/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/Nagano/2ladoEsquerdo.jpg" } */

    ];

    const imagensNaganoCosta = [
        { id: 15, dataEnvio: "12/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/Nagano/1costas.jpg" },
        { id: 16, dataEnvio: "13/05/2025", src: "https://storagevitalis.blob.core.windows.net/fotos-perfil/Nagano/2costas.jpg" }
    ];

    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateral />
            <div className="flex-1 flex flex-col overflow-y-auto">
                <Header />
                <main className="p-4 md:p-8 space-y-8 flex flex-col">
                    <div className="bg-[var(--cor-secundaria)] rounded-lg p-4 md:p-6 border border-[#E6E6E2]">
                        <div className="justify-start text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] flex flex-wrap items-center gap-5">
                            <Link to={`/gerenciar-alunos`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                    <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <h1>Progresso corporal</h1>
                        </div>
                        <div className="flex flex-col max-h-[690px] overflow-y-auto">
                            <div className='flex flex-col mt-10 max-h-[400px]'>
                                <h1 className='font-semibold text-[24px]'>Frente</h1>
                                <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                    <CarrosselRegistro imagens={idAluno == 7 ? imagensNaganoFrontais : imagensFrontais} />
                                </div>
                            </div>
                            <div className='flex flex-col mt-10 max-h-[400px]'>
                                <h1 className='font-semibold text-[24px]'>Perfil Direita</h1>
                                <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                    <CarrosselRegistro imagens={idAluno == 7 ? imagensNaganoDireita : imagensPerfilDireita} />
                                </div>
                            </div>
                            <div className='flex flex-col mt-10 max-h-[400px]'>
                                <h1 className='font-semibold text-[24px]'>Perfil Esquerdo</h1>
                                <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                    <CarrosselRegistro imagens={idAluno == 7 ? imagensNaganoEsquerda : imagensPerfilEsquerda} />
                                </div>
                            </div>
                            <div className='flex flex-col mt-10 max-h-[400px]'>
                                <h1 className='font-semibold text-[24px]'>Costa</h1>
                                <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                    <CarrosselRegistro imagens={idAluno == 7 ? imagensNaganoCosta : imagensCosta} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div >
    )
}

export default RelatorioTreinos