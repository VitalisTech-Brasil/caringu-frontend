import React, { useEffect, useState } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { Link } from 'react-router-dom'
import { useParams} from 'react-router-dom'
import CarrosselRegistro from '../../components/Utils/CarrosselRegistro'
import { caringuApi } from '../../provider/caringuApi'
import Button from '../../components/Utils/Button'
import ModalCompararFoto from '../../components/Fotos/ModalCompararFoto';
import { Toaster } from 'react-hot-toast';


const RelatorioTreinos = () => {
    const { idAluno } = useParams();

    const [tipoFoto, setTipoFoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [fotosCorporais, setFotosCorporais] = useState({
        FRONTAL: [],
        COSTAS: [],
        PERFIL_DIREITO: [],
        PERFIL_ESQUERDO: [],
    });

    const handleListarFotosCorporais = async () => {
        try {
            const response = await caringuApi.get(`/evolucao-corporal/aluno/${idAluno ? idAluno : 7}`);
            const fotos = response.data;
            console.log("Fotos recebidas:", fotos);

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

    const abrirModal = (tipo) => {
        setTipoFoto(tipo);
        setIsModalOpen(true);
    };

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
                            {[
                                { titulo: "Frente", tipo: "FRONTAL", imagens: fotosCorporais.FRONTAL },
                                { titulo: "Perfil Esquerdo", tipo: "PERFIL_ESQUERDO", imagens: fotosCorporais.PERFIL_ESQUERDO },
                                { titulo: "Perfil Direito", tipo: "PERFIL_DIREITO", imagens: fotosCorporais.PERFIL_DIREITO },
                                { titulo: "Costas", tipo: "COSTAS", imagens: fotosCorporais.COSTAS }
                            ].map(({ titulo, tipo, imagens }) => (
                                <div key={tipo} className='flex flex-col mt-8 max-h-[400px] sm:p-4 p-0'>
                                    <div className='flex sm:flex-row flex-col items-start sm:items-center justify-between sm:gap-0 gap-2 sm:pb-0 pb-3'>
                                        <h1 className='font-semibold text-[24px]'>{titulo}</h1>
                                        <Button
                                            texto="Comparar Fotos"
                                            cor="#748CAB"
                                            corTexto="#FFFFFF"
                                            onClick={() => abrirModal(tipo)}
                                            width="140px"
                                            height="30px"
                                            fontSize="12px"
                                            fontWeight={"700"}
                                        />
                                    </div>
                                    <div className='border-2 border-[#E6E6E2] rounded-lg'>
                                        <CarrosselRegistro imagens={imagens} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {isModalOpen && (
                        <ModalCompararFoto
                            visivel={isModalOpen}
                            fecharModal={() => setIsModalOpen(false)}
                            ariaLabel="Modal para comparar fotos corporais"
                            fotosCorporais={fotosCorporais}
                            tipoSelecionado={tipoFoto}
                        />
                    )}
                </main>
                <Toaster position="top-right" reverseOrder={false} />
            </div>
        </div >
    )
}

export default RelatorioTreinos