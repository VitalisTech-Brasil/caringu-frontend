import React, { useEffect, useState } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import CarrosselRegistro from '../../components/Utils/CarrosselRegistro'
import { caringuApi } from '../../provider/caringuApi'

const RelatorioTreinos = () => {
    const { idAluno } = useParams();

    const [tipoFoto, setTipoFoto] = useState(null);
    const [periodoAvaliacaoEmMeses, setPeriodoAvaliacaoEmMeses] = useState(0);

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
                                <div key={tipo} className='flex flex-col mt-10 max-h-[400px] p-4'>
                                    <div className='flex items-center justify-between'>
                                        <h1 className='font-semibold text-[24px]'>{titulo}</h1>
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
        </div >
    )
}

export default RelatorioTreinos