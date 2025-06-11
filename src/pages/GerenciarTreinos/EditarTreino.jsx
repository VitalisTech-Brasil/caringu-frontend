import { React, useState, useEffect, useRef } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Label from '../../components/Utils/Label'
import InputEditar from '../../components/Utils/InputEditar'
import Button from '../../components/Utils/Button'
import info2 from "../../assets/images/info-2.svg";
import { caringuApi } from '../../provider/caringuApi.js'
import toast, { Toaster } from 'react-hot-toast'
import CustomToast from '../../components/Utils/CustomToast.jsx'
import Modal from "../../components/Utils/Modal.jsx";
import iconCancelar from "../../assets/images/cancelar.png";
import ModalPersonalizarExercicio from '../../components/Utils/ModalPersonalizarExercicio.jsx'



const EditarTreino = () => {
    // Estados locais
    const [exercicioInput, setExercicioInput] = useState('');
    const [focado, setFocado] = useState(false);
    const [modalExercicioVisivel, setModalExercicioVisivel] = useState(false);
    const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);
    const [sugestoes, setSugestoes] = useState([]);
    const [exercicios, setExercicios] = useState([]);
    const [treino, setTreino] = useState([]);
    const [exercicioAtual, setExercicioAtual] = useState(null);
    const [exerciciosSelecionados, setExerciciosSelecionados] = useState([]);
    const [exerciciosEditados, setExerciciosEditados] = useState([]);
    const [indexExercicioAtual, setIndexExercicioAtual] = useState(null);
    const [selectAberto, setSelectAberto] = useState(false);
    const { id } = useParams();
    const treinoId = parseInt(id);
    const idPersonal = sessionStorage.getItem('pessoaId');
    const sugestaoRef = useRef(null);
    const navigate = useNavigate();

    // React Hook Form
    const {
        register: registerTreino,
        handleSubmit: handleSubmitTreino,
        setValue,
        reset: resetTreino,
        formState: { errors: errorsTreino },
    } = useForm();

    const {
        register: registerExercicio,
        handleSubmit: handleSubmitExercicio,
        formState: { errors: errorsExercicio },
        setValue: setValueExercicio,
        watch: watchExercicio,
        reset: resetExercicio,
    } = useForm();



    // Busca os exercícios do backend (ao montar)
    useEffect(() => {
        const buscarExercicios = async () => {
            try {
                const response = await caringuApi.get('/exercicios');
                setExercicios(response.data);
            } catch (error) {
                console.error('Erro ao buscar exercícios:', error);
            }
        };
        buscarExercicios();
    }, []);


    // Busca treino e seus exercícios
    useEffect(() => {
        const fetchInfosTreino = async () => {
            try {
                const response = await caringuApi.get(`/treinos-exercicios/buscar-info-treino-edit/${idPersonal}/${treinoId}`);
                const data = response.data;
                if (data.length > 0) {
                    setTreino(data);
                    setExerciciosSelecionados(data);
                    setExerciciosEditados(data);
                }
            } catch (error) {
                console.error('Erro ao buscar informações dos treinos:', error);
            }
        };
        fetchInfosTreino();
    }, [idPersonal, treinoId]);

    useEffect(() => {
        if (treino && treino.length > 0) {
            const treinoInfo = treino[0];  // supondo que o objeto tenha os campos do treino
            resetTreino({
                nomeTreino: treinoInfo.nomeTreino || '',
                dificuldade: treinoInfo.grauDificuldade || '',
                descricao: treinoInfo.descricaoTreino || '',
            });
        }
    }, [treino, resetTreino]);

    useEffect(() => {
        if (exercicioInput.trim().length < 2) {
            setSugestoes([]);
            return;
        }

        const termo = exercicioInput.trim().toLowerCase();
        const resultados = exercicios.filter((ex) =>
            ex.nome.toLowerCase().includes(termo)
        );
        setSugestoes(resultados);
    }, [exercicioInput]);

    useEffect(() => {
        const handleClickFora = (event) => {
            if (sugestaoRef.current && !sugestaoRef.current.contains(event.target)) {
                setFocado(false); // <- atualiza corretamente o estado de foco
            }
        };
        document.addEventListener('mousedown', handleClickFora);
        return () => document.removeEventListener('mousedown', handleClickFora);
    }, []);

    // Atualiza campos do modal quando o exercícioAtual muda
    useEffect(() => {
        if ('Atualizando modal com:', exercicioAtual) {

            resetExercicio({
                carga: exercicioAtual.carga,
                series: exercicioAtual.series,
                repeticoes: exercicioAtual.repeticoes,
                tempoDescanso: exercicioAtual.descanso || exercicioAtual.tempoDescanso,
            });
        }
    }, [exercicioAtual, resetExercicio]);

    // Salvar edição do exercício (form modal)
    const onSubmitExercicio = (data) => {
        if (!exercicioAtual) return;

        const exercicioAtualizado = {
            ...exercicioAtual,
            ...data
        };

        if (indexExercicioAtual === null) {
            // Novo exercício (ainda não estava na lista)
            setExerciciosEditados(prev => [...prev, exercicioAtualizado]);
        } else {
            // Atualizando exercício existente
            const novosExercicios = [...exerciciosEditados];
            novosExercicios[indexExercicioAtual] = exercicioAtualizado;
            setExerciciosEditados(novosExercicios);
        }

        setModalExercicioVisivel(false);
        setExercicioAtual(null);
        setIndexExercicioAtual(null);
    };


    // Adiciona novo exercício ao treino (abre modal para ele)
    const abrirModalExercicio = (exercicio) => {
        const existente = exerciciosEditados.find(e =>
            e.exercicioId === exercicio.id || e.exercicioId === exercicio.exercicioId
        );

        if (existente) {
            setExercicioAtual(existente);
            setIndexExercicioAtual(exerciciosEditados.findIndex(e =>
                e.exercicioId === existente.exercicioId
            ));
        } else {
            // Só cria objeto temporário para edição
            const novoExercicio = {
                ...exercicio,
                exercicioId: exercicio.id,
                nomeExercicio: exercicio.nome,
                origemExercicio: exercicio.origem,
                grupoMuscular: exercicio.grupoMuscular,
                observacoes: exercicio.observacoes || '',
                carga: '',
                series: '',
                repeticoes: '',
                tempoDescanso: '',
            };

            setExercicioAtual(novoExercicio);
            setIndexExercicioAtual(null); // Novo exercício
        }

        setModalExercicioVisivel(true);
        setExercicioInput('');
        setSugestoes([]);
    };



    // Remover exercício da lista
    const removerExercicio = (id) => {
        setExerciciosEditados((prev) => {
            const novaLista = prev.filter(e => e.exercicioId !== id);
            return novaLista;
        });
    };

    // Salvar treino completo com exercícios editados
    const salvarTreino = async (data) => {
        const payload = {
            treinoId: treinoId, // do useParams
            exercicios: exerciciosEditados.map((ex) => ({
                exercicioId: ex.exercicioId || ex.id,
                carga: parseFloat(ex.carga),
                repeticoes: parseInt(ex.repeticoes),
                series: parseInt(ex.series),
                descanso: parseInt(ex.tempoDescanso || ex.descanso), // garantir compatibilidade
                dataHoraCriacao: ex.dataHoraCriacao || new Date().toISOString(),
                dataHoraModificacao: new Date().toISOString(),
                origemTreinoExercicio: ex.origemTreinoExercicio || 'BIBLIOTECA',
                grauDificuldade: data.dificuldade || 'INICIANTE'
            })),
        };

        const payloadTreino = {
            nome: data.nomeTreino,
            descricao: data.descricao
        }
        try {
            const response = await caringuApi.put(
                `/treinos-exercicios/atualizar/treinos/${treinoId}/exercicios`,
                payload
            );

            const responseTreino = await caringuApi.put(`/treino/${treinoId}/personal/${idPersonal}`, payloadTreino)

            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Treino atualizado com sucesso!" />
            ));
            navigate("/gerenciar-treinos");
        } catch (error) {
            console.error('Erro ao salvar treino:', error);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao salvar treino. Tente novamente." />
            ));
        }
    };


    // Função auxiliar para validar URL do YouTube (se precisar)
    const isValidYoutubeUrl = (url) => {
        const youtubeRegex = /^(https:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        return youtubeRegex.test(url);
    };

    return (
        <div className="flex h-screen bg-[#fdfbf7]">
            <MenuLateral />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-4 md:p-8 space-y-8 flex flex-col">
                    <div className="bg-[var(--cor-secundaria)] rounded-lg p-4 md:p-6 border border-[#E6E6E2]">
                        <div className="justify-start text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] flex flex-wrap items-center gap-5">
                            <Link to="/gerenciar-treinos">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                    <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <h1>Editar Treino</h1>
                        </div>
                        <form onSubmit={handleSubmitTreino(salvarTreino)}>
                            <div className="flex flex-col space-y-3 md:grid md:grid-cols-2 md:gap-10 mt-4">
                                <div className="col-span-1">
                                    <Label id="nomeTreino" nomeLabel="Nome do treino" fontSize="20px" fontWeight="500" />
                                    <InputEditar
                                        id="nomeTreino"
                                        name="nomeTreino"
                                        inputType="text"
                                        placeholder="Ex.: Treino de perna"
                                        fontSize="16px"
                                        fontWeight="400"
                                        fontSizeErro="16px"
                                        width="100%"
                                        {...registerTreino('nomeTreino', {
                                            required: 'O nome do treino é obrigatório',
                                            minLength: {
                                                value: 3,
                                                message: 'O nome deve ter pelo menos 3 caracteres',
                                            },
                                        })}
                                        isError={!!errorsTreino.nomeTreino}
                                        errorMessage={errorsTreino.nomeTreino?.message}
                                    />
                                    <div className="relative" ref={sugestaoRef}>
                                        <Label
                                            id="exerciciosTreino"
                                            nomeLabel="Exercícios que compõem o treino"
                                            fontSize="20px"
                                            fontWeight="500"
                                        />
                                        <input
                                            id="exerciciosTreino"
                                            type="text"
                                            onFocus={() => setFocado(true)}
                                            onBlur={() => setTimeout(() => setFocado(false), 200)} // pequeno delay para permitir clicar na sugestão
                                            onChange={(e) => setExercicioInput(e.target.value)}
                                            value={exercicioInput}
                                            placeholder="Digite o nome do exercício"
                                            className="border-b-2 w-full pt-2 pb-1"
                                        />
                                        {focado && sugestoes.length > 0 && (
                                            <ul className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10">
                                                {sugestoes.map((exercicio) => {
                                                    return (
                                                        <li
                                                            key={exercicio.id}
                                                            onMouseDown={() => abrirModalExercicio(exercicio)}
                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                        >
                                                            {exercicio.nome}
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                        {focado && exercicioInput.length >= 2 && sugestoes.length === 0 && (
                                            <div className="absolute bg-white border w-full p-2 text-gray-500 z-10">
                                                Nenhum exercício encontrado
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 space-y-3">
                                    <Label
                                        id="dificuldade"
                                        nomeLabel="Grau de dificuldade"
                                        fontSize="20px"
                                        fontWeight="500"
                                    />
                                    <div className='relative'>
                                        <select
                                            id="dificuldade"
                                            {...registerTreino("dificuldade", {
                                                required: 'Selecione a dificuldade do treino'
                                            })}
                                            onClick={() => setSelectAberto((prev) => !prev)}
                                            onBlur={() => setSelectAberto(false)}
                                            className="appearance-none peer text-base w-full pt-2 pb-1 pr-[1%] pl-[1%] border-b-2 border-[var(--cor-primaria)] text-[#333] transition-all"
                                        >
                                            <option disabled value="" className="text-[#15171B87]">
                                                Selecione o grau de dificuldade
                                            </option>
                                            <option value="INICIANTE">Iniciante</option>
                                            <option value="INTERMEDIARIO">Intermediário</option>
                                            <option value="AVANCADO">Avançado</option>
                                        </select>
                                        <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 transition-transform duration-200 ease-in-out ${selectAberto ? 'rotate-180' : 'rotate-0'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
                                                <path d="M0.532697 0.412777C-0.177566 0.956418 -0.177566 1.83792 0.532697 2.38154L9.43019 9.18545C10.851 10.2719 13.1531 10.2714 14.5732 9.18461L23.4672 2.37653C24.1776 1.8329 24.1776 0.951407 23.4672 0.407752C22.757 -0.135917 21.6054 -0.135917 20.8952 0.407752L13.2828 6.23469C12.5726 6.77845 11.421 6.77831 10.7107 6.23469L3.10474 0.412777C2.3945 -0.130892 1.24294 -0.130892 0.532697 0.412777Z" fill="#15171B" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errorsTreino.dificuldade && (
                                        <div className="flex items-center justify-start gap-1 text-[#D45C56] mt-3 text-sm">
                                            <img src={info2} alt="Erro" className="w-4 h-4" />
                                            <span>{errorsTreino.dificuldade.message}</span>
                                        </div>
                                    )}
                                    <Label id="descricao" nomeLabel="Descrição" fontSize="20px" fontWeight="500" />
                                    <InputEditar
                                        id="descricao"
                                        name="descricao"
                                        inputType="text"
                                        placeholder="Ex.: Treino de perna para iniciantes"
                                        fontSize="16px"
                                        fontWeight="400"
                                        fontSizeErro="16px"
                                        width="100%"
                                        {...registerTreino('descricao', {
                                            required: 'A descrição do treino é obrigatório',
                                            minLength: {
                                                value: 5,
                                                message: 'A descrição deve ter pelo menos 5 caracteres',
                                            },
                                        })}
                                        isError={!!errorsTreino.descricao}
                                        errorMessage={errorsTreino.descricao?.message}
                                    />
                                </div>
                            </div>
                            <h1 className="mt-6">Exercícios adicionados:</h1>
                            <div className="flex flex-wrap gap-2 mt-2 md:max-w-1/2">
                                {exerciciosEditados.map((exercicio) => (

                                    <div key={exercicio.exercicioId || exercicio.id} className="bg-orange-500 text-white px-3 py-1 rounded-[5px] flex items-center cursor-pointer" onClick={() => abrirModalExercicio(exercicio)}>
                                        {exercicio.nomeExercicio || exercicio.nome}
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            removerExercicio(exercicio.exercicioId || exercicio.id)
                                        }}
                                            className="ml-2 font-bold bg-[#FFFDF6] rounded-[5px] h-5 w-5 flex items-center justify-center cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="4" viewBox="0 0 14 4" fill="none">
                                                <path d="M12 2H2" stroke="#B41F1F" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg></button>
                                    </div>


                                ))}
                            </div>
                            <div className="flex items-center justify-center mt-7">
                                <Button
                                    texto="Salvar"
                                    corTexto="var(--cor-secundaria)"
                                    cor="#46982B"
                                    height="2.75rem"
                                    width="9.2rem"
                                    corHover="#46982BE5"
                                    fontWeight="600"
                                    aria-label={"Botão de Salvar"}
                                    type="submit"
                                />
                            </div>
                        </form>
                    </div>
                </main>
            </div>
            {modalExercicioVisivel && (
                <ModalPersonalizarExercicio
                    visivel={modalExercicioVisivel}
                    onClose={() => setModalConfirmarCancelarVisivel(true)}
                    onSubmit={handleSubmitExercicio(onSubmitExercicio)}
                    register={registerExercicio}
                    handleSubmit={handleSubmitExercicio}
                    errors={errorsExercicio}
                    exercicio={exercicioAtual}
                    InputComponent={InputEditar}
                    isValidYoutubeUrl={isValidYoutubeUrl}
                />
            )}
            <Modal
                visivel={modalConfirmarCancelarVisivel}
                fecharModal={() => setModalConfirmarCancelarVisivel(false)}
                titulo="Tem certeza que deseja cancelar?"
                descricao="Alterações que não forem salvas serão perdidas"
                onConfirm={() => {
                    setModalConfirmarCancelarVisivel(false);
                    setModalExercicioVisivel(false);
                }}
                icone={iconCancelar}
                textoBotaoConfirmar="Voltar"
                textoBotaoCancelar="Cancelar mesmo assim"
                aria-label="Modal de Cancelamento"
            />
            <Toaster position='top-right' reverseOrder={false} />
        </div>
    );
};

export default EditarTreino;