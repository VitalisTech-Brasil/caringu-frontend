import React, { use } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import CarrosselRegistro from '../../components/Utils/CarrosselRegistro'

const RelatorioTreinos = () => {
    const { idAluno, idTreino } = useParams();

    const imagensFrontais = [
        { id: 1, dataEnvio: "10/05/2025", src: "https://cdn3.pixelcut.app/upscale_after_3_b6760ad57f.jpg" },
        { id: 2, dataEnvio: "11/05/2025", src: "https://cdn3.pixelcut.app/upscale_after_3_b6760ad57f.jpg" },
        { id: 3, dataEnvio: "10/05/2025", src: "https://cdn3.pixelcut.app/upscale_after_3_b6760ad57f.jpg" },
        { id: 4, dataEnvio: "11/05/2025", src: "https://cdn3.pixelcut.app/upscale_after_3_b6760ad57f.jpg" },
        { id: 5, dataEnvio: "10/05/2025", src: "https://cdn3.pixelcut.app/upscale_after_3_b6760ad57f.jpg" },
        { id: 6, dataEnvio: "11/05/2025", src: "https://cdn3.pixelcut.app/upscale_after_3_b6760ad57f.jpg" },
    ];

    const imagensPerfilDireita = [
        { id: 7, dataEnvio: "12/05/2025", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Nasa_blue_marble.jpg/250px-Nasa_blue_marble.jpg" },
        { id: 8, dataEnvio: "13/05/2025", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Nasa_blue_marble.jpg/250px-Nasa_blue_marble.jpg" },
        { id: 9, dataEnvio: "12/05/2025", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Nasa_blue_marble.jpg/250px-Nasa_blue_marble.jpg" },
        { id: 10, dataEnvio: "13/05/2025", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Nasa_blue_marble.jpg/250px-Nasa_blue_marble.jpg" },
        { id: 11, dataEnvio: "12/05/2025", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Nasa_blue_marble.jpg/250px-Nasa_blue_marble.jpg" },
        { id: 12, dataEnvio: "13/05/2025", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Nasa_blue_marble.jpg/250px-Nasa_blue_marble.jpg" },
        { id: 13, dataEnvio: "12/05/2025", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Nasa_blue_marble.jpg/250px-Nasa_blue_marble.jpg" },
        { id: 14, dataEnvio: "13/05/2025", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Nasa_blue_marble.jpg/250px-Nasa_blue_marble.jpg" },
    ];

    const imagensPerfilEsquerda = [
        { id: 15, dataEnvio: "12/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHp59YJK_PdoHWHTk2K6IaxlmGdZ7e-Npuw&s" },
        { id: 16, dataEnvio: "13/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHp59YJK_PdoHWHTk2K6IaxlmGdZ7e-Npuw&s" },
        { id: 17, dataEnvio: "12/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHp59YJK_PdoHWHTk2K6IaxlmGdZ7e-Npuw&s" },
        { id: 18, dataEnvio: "13/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHp59YJK_PdoHWHTk2K6IaxlmGdZ7e-Npuw&s" },
        { id: 19, dataEnvio: "12/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHp59YJK_PdoHWHTk2K6IaxlmGdZ7e-Npuw&s" },
        { id: 20, dataEnvio: "13/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHp59YJK_PdoHWHTk2K6IaxlmGdZ7e-Npuw&s" },
        { id: 21, dataEnvio: "12/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHp59YJK_PdoHWHTk2K6IaxlmGdZ7e-Npuw&s" },
        { id: 22, dataEnvio: "13/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqHp59YJK_PdoHWHTk2K6IaxlmGdZ7e-Npuw&s" },

    ];

    const imagensCosta = [
        { id: 23, dataEnvio: "12/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOjFO7lJA-zaMBXBdEVh1yb_y38BBsnmv_w&s" },
        { id: 24, dataEnvio: "13/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOjFO7lJA-zaMBXBdEVh1yb_y38BBsnmv_w&s" },
        { id: 25, dataEnvio: "12/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOjFO7lJA-zaMBXBdEVh1yb_y38BBsnmv_w&s" },
        { id: 26, dataEnvio: "13/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOjFO7lJA-zaMBXBdEVh1yb_y38BBsnmv_w&s" },
        { id: 27, dataEnvio: "12/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOjFO7lJA-zaMBXBdEVh1yb_y38BBsnmv_w&s" },
        { id: 28, dataEnvio: "13/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOjFO7lJA-zaMBXBdEVh1yb_y38BBsnmv_w&s" },
        { id: 29, dataEnvio: "12/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOjFO7lJA-zaMBXBdEVh1yb_y38BBsnmv_w&s" },
        { id: 30, dataEnvio: "13/05/2025", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOjFO7lJA-zaMBXBdEVh1yb_y38BBsnmv_w&s" },

    ];

    return (
        <div className="flex h-screen bg-[#fdfbf7] ">
            <MenuLateral />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-4 md:p-8 font-sans space-y-8 flex flex-col">
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
                                    <CarrosselRegistro imagens={imagensFrontais} />
                                </div>
                            </div>
                            <div className='flex flex-col mt-10 max-h-[400px]'>
                                <h1 className='font-semibold text-[24px]'>Perfil Direita</h1>
                                <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                    <CarrosselRegistro imagens={imagensPerfilDireita} />
                                </div>
                            </div>
                            <div className='flex flex-col mt-10 max-h-[400px]'>
                                <h1 className='font-semibold text-[24px]'>Perfil Esquerdo</h1>
                                <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                    <CarrosselRegistro imagens={imagensPerfilEsquerda} />
                                </div>
                            </div>
                            <div className='flex flex-col mt-10 max-h-[400px]'>
                                <h1 className='font-semibold text-[24px]'>Costa</h1>
                                <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                    <CarrosselRegistro imagens={imagensCosta} />
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