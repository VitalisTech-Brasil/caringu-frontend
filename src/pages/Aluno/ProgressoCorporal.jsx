import React, { useRef } from 'react'
import MenuLateralAluno from '../../components/Aluno/MenuLateral/MenuLateral';
import Button from "../../components/Utils/Button";
import Header from '../../components/Aluno/Header/Header';
import { Link, useParams } from 'react-router-dom';
import CarrosselRegistro from '../../components/Utils/CarrosselRegistro';
import MenuLateral from '../../components/Index/MenuLateralIndex';

const ProgressoCorporal = () => {
    const menuRef = useRef(null);
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
                <Header
                    title="Progresso Corporal"
                    menuRef={menuRef}
                    icon={
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.44997 27.5H21.55C25 27.5 26.375 25.3875 26.5375 22.8125L27.1875 12.4875C27.3625 9.7875 25.2125 7.5 22.5 7.5C21.7375 7.5 21.0375 7.0625 20.6875 6.3875L19.7875 4.575C19.2125 3.4375 17.7125 2.5 16.4375 2.5H13.575C12.2875 2.5 10.7875 3.4375 10.2125 4.575L9.31246 6.3875C8.96246 7.0625 8.26247 7.5 7.49997 7.5C4.78747 7.5 2.63747 9.7875 2.81247 12.4875L3.46247 22.8125C3.61247 25.3875 4.99997 27.5 8.44997 27.5Z" stroke="#1D2D44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M13.125 10H16.875" stroke="#1D2D44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15 22.5C17.2375 22.5 19.0625 20.675 19.0625 18.4375C19.0625 16.2 17.2375 14.375 15 14.375C12.7625 14.375 10.9375 16.2 10.9375 18.4375C10.9375 20.675 12.7625 22.5 15 22.5Z" stroke="#1D2D44" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    }
                />
                <main className="p-4 md:p-8 space-y-8 flex flex-col">
                    <div className="bg-[var(--cor-secundaria)] rounded-lg p-4 md:p-6">
                        <div className="justify-center text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] flex flex-wrap items-center gap-5">
                            <h1>Acompanhe sua progressão corporal</h1>
                        </div>
                        <div className="flex flex-col max-h-[690px] overflow-y-auto">
                            <div className='flex flex-col mt-10 max-h-[400px] p-4'>
                                <div className='flex items-center justify-between'>
                                    <h1 className='font-semibold text-[24px]'>Frente</h1>
                                    <Button
                                        texto="Enviar foto"
                                        cor="#748CAB"
                                        corTexto="#FFFFFF"
                                        width=" 140px"
                                        height="30px"
                                        fontSize="12px"
                                        logoSvg={<svg className='w-5 h-5' viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.87502 9.2085V5.9585L3.79169 7.04183" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M4.875 5.9585L5.95833 7.04183" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.9166 5.41683V8.12516C11.9166 10.8335 10.8333 11.9168 8.12498 11.9168H4.87498C2.16665 11.9168 1.08331 10.8335 1.08331 8.12516V4.87516C1.08331 2.16683 2.16665 1.0835 4.87498 1.0835H7.58331" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.9166 5.41683H9.74998C8.12498 5.41683 7.58331 4.87516 7.58331 3.25016V1.0835L11.9166 5.41683Z" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        }>
                                    </Button>
                                </div>
                                <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                    <CarrosselRegistro imagens={idAluno == 7 ? imagensNaganoFrontais : imagensFrontais} />
                                </div>
                            </div>
                            <div className='flex flex-col mt-10 max-h-[400px]'>
                                <div className='flex items-center justify-between'>
                                    <h1 className='font-semibold text-[24px]'>Perfil Esquerdo</h1>
                                    <Button
                                        texto="Enviar foto"
                                        cor="#748CAB"
                                        corTexto="#FFFFFF"
                                        width=" 140px"
                                        height="30px"
                                        fontSize="12px"
                                        logoSvg={<svg className='w-5 h-5' viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.87502 9.2085V5.9585L3.79169 7.04183" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M4.875 5.9585L5.95833 7.04183" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.9166 5.41683V8.12516C11.9166 10.8335 10.8333 11.9168 8.12498 11.9168H4.87498C2.16665 11.9168 1.08331 10.8335 1.08331 8.12516V4.87516C1.08331 2.16683 2.16665 1.0835 4.87498 1.0835H7.58331" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.9166 5.41683H9.74998C8.12498 5.41683 7.58331 4.87516 7.58331 3.25016V1.0835L11.9166 5.41683Z" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        }>
                                    </Button>
                                </div>
                                <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                    <CarrosselRegistro imagens={idAluno == 7 ? imagensNaganoDireita : imagensPerfilDireita} />
                                </div>
                            </div>
                            <div className='flex flex-col mt-10 max-h-[400px]'>
                                <div className='flex items-center justify-between'>
                                    <h1 className='font-semibold text-[24px]'>Perfil Direito</h1>
                                    <Button
                                        texto="Enviar foto"
                                        cor="#748CAB"
                                        corTexto="#FFFFFF"
                                        width=" 140px"
                                        height="30px"
                                        fontSize="12px"
                                        logoSvg={<svg className='w-5 h-5' viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.87502 9.2085V5.9585L3.79169 7.04183" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M4.875 5.9585L5.95833 7.04183" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.9166 5.41683V8.12516C11.9166 10.8335 10.8333 11.9168 8.12498 11.9168H4.87498C2.16665 11.9168 1.08331 10.8335 1.08331 8.12516V4.87516C1.08331 2.16683 2.16665 1.0835 4.87498 1.0835H7.58331" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.9166 5.41683H9.74998C8.12498 5.41683 7.58331 4.87516 7.58331 3.25016V1.0835L11.9166 5.41683Z" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        }>
                                    </Button>
                                </div>
                                <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                    <CarrosselRegistro imagens={idAluno == 7 ? imagensNaganoEsquerda : imagensPerfilEsquerda} />
                                </div>
                            </div>
                            <div className='flex flex-col mt-10 max-h-[400px]'>
                                <div className='flex items-center justify-between'>
                                    <h1 className='font-semibold text-[24px]'>Contas</h1>
                                    <Button
                                        texto="Enviar foto"
                                        cor="#748CAB"
                                        corTexto="#FFFFFF"
                                        width=" 140px"
                                        height="30px"
                                        fontSize="12px"
                                        logoSvg={<svg className='w-5 h-5' viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.87502 9.2085V5.9585L3.79169 7.04183" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M4.875 5.9585L5.95833 7.04183" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.9166 5.41683V8.12516C11.9166 10.8335 10.8333 11.9168 8.12498 11.9168H4.87498C2.16665 11.9168 1.08331 10.8335 1.08331 8.12516V4.87516C1.08331 2.16683 2.16665 1.0835 4.87498 1.0835H7.58331" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.9166 5.41683H9.74998C8.12498 5.41683 7.58331 4.87516 7.58331 3.25016V1.0835L11.9166 5.41683Z" stroke="#FDFFFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        }>
                                    </Button>
                                </div>
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

export default ProgressoCorporal
