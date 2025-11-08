import React, { useEffect, useRef, useState } from 'react'
import MenuLateralAluno from '../../components/Aluno/MenuLateral/MenuLateral';
import Button from "../../components/Utils/Button";
import Header from '../../components/Aluno/Header/Header';
import { Link, useParams } from 'react-router-dom';
import CarrosselRegistro from '../../components/Utils/CarrosselRegistro';
import ModalEvolucaoCorporal from '../../components/Fotos/ModalEvolucaoCorporal';
import { caringuApi } from '../../provider/caringuApi';

const ProgressoCorporal = () => {
    const menuRef = useRef(null);
    const { idAluno } = useParams();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tipoFoto, setTipoFoto] = useState(null);
    const [periodoAvaliacaoEmMeses, setPeriodoAvaliacaoEmMeses] = useState(0);

    const [fotosCorporais, setFotosCorporais] = useState({
        FRONTAL: [],
        COSTAS: [],
        PERFIL_DIREITO: [],
        PERFIL_ESQUERDO: [],
    });

    const abrirModal = (tipo) => {
        setTipoFoto(tipo);
        setIsModalOpen(true);
    };

    const fecharModal = () => {
        setIsModalOpen(false);
        setTipoFoto(null);
    };

    const handleListarFotosCorporais = async () => {
        try {
            const response = await caringuApi.get(`/evolucao-corporal/aluno/${idAluno ? idAluno : 7}`);
            const fotos = response.data;
            console.log("Fotos recebidas:", fotos);

            setPeriodoAvaliacaoEmMeses(fotos.length > 0 ? fotos[0].periodoAvaliacao : 0);

            // Organiza as fotos por tipo
            const agrupadas = {
                FRONTAL: [],
                COSTAS: [],
                PERFIL_DIREITO: [],
                PERFIL_ESQUERDO: [],
            };

            fotos.forEach((f) => {
                if (agrupadas[f.tipo]) {
                    agrupadas[f.tipo].push({
                        id: f.id,
                        dataEnvio: new Date(f.dataEnvio).toLocaleDateString("pt-BR"),
                        src: f.urlFotoShape
                    });
                }
            });

            setFotosCorporais(agrupadas);
            console.log("Evoluções corporais do aluno:", agrupadas);
        } catch (error) {
            console.error("Erro ao listar fotos:", error);
        }
    };

    useEffect(() => {
        handleListarFotosCorporais();
    }, [idAluno]);
    
    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateralAluno ref={menuRef} />
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
                            {[
                                { titulo: "Frente", tipo: "FRONTAL", imagens: fotosCorporais.FRONTAL },
                                { titulo: "Perfil Esquerdo", tipo: "PERFIL_ESQUERDO", imagens: fotosCorporais.PERFIL_ESQUERDO },
                                { titulo: "Perfil Direito", tipo: "PERFIL_DIREITO", imagens: fotosCorporais.PERFIL_DIREITO },
                                { titulo: "Costas", tipo: "COSTAS", imagens: fotosCorporais.COSTAS }
                            ].map(({ titulo, tipo, imagens }) => (
                                <div key={tipo} className='flex flex-col mt-10 max-h-[400px] p-4'>
                                    <div className='flex items-center justify-between'>
                                        <h1 className='font-semibold text-[24px]'>{titulo}</h1>
                                        <Button
                                            texto="Enviar foto"
                                            cor="#748CAB"
                                            corTexto="#FFFFFF"
                                            onClick={() => abrirModal(tipo)}
                                            width="140px"
                                            height="30px"
                                            fontSize="12px"
                                        />
                                    </div>
                                    <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                        <CarrosselRegistro imagens={imagens} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
            {isModalOpen && (
                <ModalEvolucaoCorporal
                    tipo={tipoFoto}
                    alunoId={idAluno}
                    periodoAvaliacao={periodoAvaliacaoEmMeses}
                    onClose={fecharModal}
                />
            )}
        </div >
    )
}

export default ProgressoCorporal
