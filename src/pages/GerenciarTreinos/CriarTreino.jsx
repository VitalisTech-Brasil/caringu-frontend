import { React, useState, useEffect, useRef } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Label from '../../components/Utils/Label'
import InputPosLogin from '../../components/Utils/InputPosLogin'
import Button from '../../components/Utils/Button'
import Modal from "../../components/Utils/Modal.jsx";
import lixeira from "../../assets/images/trash.png";
import iconCancelar from "../../assets/images/cancelar.png";
import info2 from "../../assets/images/info-2.svg";
import { caringuApi } from '../../provider/caringuApi.js'
import toast, { Toaster } from 'react-hot-toast'
import CustomToast from '../../components/Utils/CustomToast.jsx'


const CriarTreino = () => {

    const [exercicioInput, setExercicioInput] = useState('');
    const [sugestoes, setSugestoes] = useState([]); // vindo do backend
    const [exerciciosSelecionados, setExerciciosSelecionados] = useState([]);
    const [focado, setFocado] = useState(false);
    const sugestaoRef = useRef(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);
    const [modalDeletarVisivel, setModalDeletarVisivel] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [exercicios, setExercicios] = useState([]);
    const [exercicioEditando, setExercicioEditando] = useState(null);

    const onSubmit = (data) => {

        setExerciciosSelecionados(prev => {
            const existe = prev.some(ex => ex.id === exercicioEditando.id);
            if (existe) {
                return prev.map(ex => ex.id === exercicioEditando.id ? { ...ex, ...data } : ex);
            } else {
                return [...prev, { ...exercicioEditando, ...data }];
            }
        });

        setShowCreateModal(false);
        setExercicioEditando(null);
    };


    useEffect(() => {
        const handleClickFora = (event) => {
            if (sugestaoRef.current && !sugestaoRef.current.contains(event.target)) {
                setSugestoes([]); // esconde as sugestões
            }
        };

        document.addEventListener('mousedown', handleClickFora);

        return () => {
            document.removeEventListener('mousedown', handleClickFora);
        };
    }, []);

    useEffect(() => {
        if (exercicioInput.length >= 1) {
            const resultados = exercicios.filter(e =>
                e.nome.toLowerCase().includes(exercicioInput.toLowerCase())
            );
            setSugestoes(resultados);
        } else if (exercicioInput.length === 0) {
            setSugestoes(exercicios); // mostra todos se o campo estiver vazio
        }
    }, [exercicioInput, exercicios]); // agora também depende de 'exercicios'

    useEffect(() => {
        const buscarExercicios = async () => {
            try {
                const response = await caringuApi.get('/exercicios'); // ou caringuApi.get(...)
                setExercicios(response.data); // Assumindo que o backend retorna um array de exercícios
            } catch (error) {
                console.error('Erro ao buscar exercícios:', error);
            }
        };

        buscarExercicios();
    }, []);


    const adicionarExercicio = (exercicio) => {
        setExercicioEditando(exercicio);
        setShowCreateModal(true);
        setExercicioInput('');
        setSugestoes([]);
    };

    const handleSubmitTreino = async (data) => {
        try {
            const personalId = sessionStorage.getItem("pessoaId"); // Corrigido o nome da constante

            // 1. Criar treino
            const treinoResponse = await caringuApi.post('/treino', {
                nome: data.nomeTreino,
                descricao: data.descricao,
                personalId: personalId
            });

            const treinoId = treinoResponse.data.id;
            if (!treinoId) {
                throw new Error("ID do treino não retornado.");
            }

            // 2. Mapear grau de dificuldade
            const grauDificuldadeMap = {
                '1': 'INICIANTE',
                '2': 'INTERMEDIARIO',
                '3': 'AVANCADO'
            };

            // 3. Preparar exercícios personalizados
            const exerciciosPayload = exerciciosSelecionados.map((exercicio) => ({
                exercicioId: exercicio.id, // Certifique-se que o objeto tem 'id'
                carga: Number(exercicio.carga) || 0,
                repeticoes: Number(exercicio.repeticoes) || 10,
                series: Number(exercicio.series) || 3,
                descanso: Number(exercicio.tempoDescanso) || 60, // Use 'tempoDescanso' se esse for o nome do input
                dataHoraCriacao: new Date().toISOString(),
                dataHoraModificacao: new Date().toISOString(),
                origemTreinoExercicio: 'BIBLIOTECA',
                grauDificuldade: grauDificuldadeMap[data.dificuldade] || 'INICIANTE'
            }));

            // 4. Cadastrar lote de exercícios
            await caringuApi.post('/treinos-exercicios/cadastrar-lote', {
                treinoId,
                exercicios: exerciciosPayload
            });

            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Treino cadastrado com sucesso!" />
            ));
            reset();
            setExerciciosSelecionados([]); 
            
        } catch (error) {
            console.error('Erro ao cadastrar treino:', error);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao cadastrar treino" />
            ));
        }
    };

    const removerExercicio = (id) => {
        setExerciciosSelecionados(exerciciosSelecionados.filter(e => e.id !== id));
    };

    const { register, handleSubmit, formState: { errors, isSubmitted }, setValue, trigger, reset } = useForm({
        defaultValues: {
            nomeTreino: "",
            dificuldade: "",
            descricao: "",
            exercicios: []
        },
        mode: "onChange"
    });


    useEffect(() => {
        if (exercicioEditando) {
            setValue('carga', exercicioEditando.carga || '');
            setValue('series', exercicioEditando.series || '');
            setValue('repeticoes', exercicioEditando.repeticoes || '');
            setValue('tempoDescanso', exercicioEditando.tempoDescanso || '');
            // Adicione outros campos que existirem no seu formulário
        }
    }, [exercicioEditando, setValue]);

    const handleOpenModal = () => {
        setShowCreateModal(true);
    };

    const cancelarEdicao = () => {
        setModalConfirmarCancelarVisivel(false);
        setShowCreateModal(false);
        setExercicioEditando(null);
    };

    return (
        <div className="flex h-screen bg-[#fdfbf7] ">
            <MenuLateral />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-4 md:p-8 font-sans space-y-8 flex flex-col">
                    <div className="bg-[var(--cor-secundaria)] rounded-lg p-4 md:p-6 border border-[#E6E6E2]">
                        <div className="justify-start text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] flex flex-wrap items-center gap-5">
                            <Link to="/gerenciar-treinos">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                    <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <h1>Criar Treino</h1>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit(handleSubmitTreino)}>
                                <div className="flex flex-col space-y-3 md:grid md:grid-cols-2 md:gap-10 mt-4">

                                    <div className="col-span-1">
                                        {/* Nome do Treino */}
                                        <Label
                                            id="nomeTreino"
                                            nomeLabel="Nome do treino"
                                            fontSize="20px"
                                            fontWeight="500"
                                        />
                                        <InputPosLogin
                                            id="nomeTreino"
                                            name="nomeTreino"
                                            inputType="text"
                                            placeholder="Ex.: Treino de perna"
                                            fontSize="16px"
                                            fontWeight="400"
                                            fontSizeErro="16px"
                                            width="100%"
                                            {...register('nomeTreino', {
                                                required: 'O nome do treino é obrigatório',
                                                minLength: {
                                                    value: 3,
                                                    message: 'O nome deve ter pelo menos 3 caracteres',
                                                },
                                            })}
                                            isError={!!errors.nomeTreino}
                                            errorMessage={errors.nomeTreino?.message}
                                        />

                                        {/* Exercícios do treino */}
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
                                                value={exercicioInput}
                                                onChange={(e) => setExercicioInput(e.target.value)}
                                                onFocus={() => setFocado(true)}
                                                onBlur={() => setTimeout(() => setFocado(false), 200)} // pequeno delay para permitir clicar na sugestão
                                                placeholder="Digite o nome do exercício"
                                                className="border-b-2 w-full"
                                            />
                                            {focado && sugestoes.length > 0 && (
                                                <ul className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10">
                                                    {sugestoes.map((exercicio) => (
                                                        <li
                                                            key={exercicio.id}
                                                            onMouseDown={() => adicionarExercicio(exercicio)}
                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                        >
                                                            {exercicio.nome}
                                                        </li>
                                                    ))}
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
                                        {/* Grau de dificuldade */}
                                        <Label
                                            id="dificuldade"
                                            nomeLabel="Grau de dificuldade"
                                            fontSize="20px"
                                            fontWeight="500"
                                        />
                                        <div className="relative">
                                            <select
                                                defaultValue=""
                                                id="dificuldade"
                                                {...register("dificuldade", {
                                                    required: 'Selecione a dificuldade do treino'
                                                })}
                                                className="appearance-none text-base w-full flex items-center justify-center pt-1 pr-[1%] pb-[1%] pl-[1%] border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]"
                                            >
                                                <option disabled className="text-[#15171B87]" value="">Selecione o grau de dificuldade</option>
                                                <option value="1">Iniciante</option>
                                                <option value="2">Intermediário</option>
                                                <option value="3">Avançado</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
                                                    <path d="M0.532697 0.412777C-0.177566 0.956418 -0.177566 1.83792 0.532697 2.38154L9.43019 9.18545C10.851 10.2719 13.1531 10.2714 14.5732 9.18461L23.4672 2.37653C24.1776 1.8329 24.1776 0.951407 23.4672 0.407752C22.757 -0.135917 21.6054 -0.135917 20.8952 0.407752L13.2828 6.23469C12.5726 6.77845 11.421 6.77831 10.7107 6.23469L3.10474 0.412777C2.3945 -0.130892 1.24294 -0.130892 0.532697 0.412777Z" fill="#15171B" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.dificuldade && (
                                            <div className="flex items-center justify-start gap-1 text-[#D45C56] mt-3 text-sm">
                                                <img src={info2} alt="Erro" className="w-4 h-4" />
                                                <span>{errors.dificuldade.message}</span>
                                            </div>
                                        )}

                                        {/* Descrição */}
                                        <Label
                                            id="descricao"
                                            nomeLabel="Descrição"
                                            fontSize="20px"
                                            fontWeight="500"
                                        />
                                        <InputPosLogin
                                            id="descricao"
                                            name="descricao"
                                            inputType="text"
                                            placeholder="Ex.: Treino de perna para iniciantes"
                                            fontSize="16px"
                                            fontWeight="400"
                                            fontSizeErro="16px"
                                            width="100%"
                                            {...register('descricao', {
                                                required: 'A descrição do treino é obrigatória',
                                                minLength: {
                                                    value: 5,
                                                    message: 'A descrição deve ter pelo menos 5 caracteres',
                                                },
                                            })}
                                            isError={!!errors.descricao}
                                            errorMessage={errors.descricao?.message}
                                        />
                                    </div>
                                </div>

                                <h1>Exercícios adicionados:</h1>
                                <div className="flex flex-wrap gap-2 mt-2 md:max-w-1/2">
                                    {exerciciosSelecionados.map((exercicio) => (
                                        <div key={exercicio.id} className="bg-orange-500 text-white px-3 py-1 rounded-[5px] flex items-center cursor-pointer" onClick={() => handleOpenModal()}>
                                            {exercicio.nome}
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                removerExercicio(exercicio.id)
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
                                        type="submit"
                                        corTexto="var(--cor-secundaria)"
                                        cor="#46982B"
                                        height="2.75rem"
                                        width="9.2rem"
                                        corHover="#46982BE5"
                                        fontWeight="600"
                                        aria-label={"Botão de Salvar"}
                                    />

                                </div>
                            </form>

                        </div>
                        {showCreateModal && (
                            <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
                                <div className="absolute inset-0 bg-[#000000] opacity-50"
                                    aria-label="Fundo Escurecido"
                                ></div>
                                <div className="relative p-4 w-full max-w-2xl md:max-w-[1100px]">
                                    <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                                        {/* Header */}
                                        <div className="flex justify-between items-center pb-4 mb-4 ">
                                            <h3 className="text-4xl font-semibold text-[var(--cor-primaria)]">
                                                Personalizar exercício
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setModalConfirmarCancelarVisivel(true)
                                                }}
                                                className="bg-[#B41F1F] text-[var(--cor-secundaria)] rounded-lg text-xs sm:text-sm cursor-pointer w-10 h-10 md:w-13 md:h-13 inline-flex justify-center items-center absolute top-2 right-2"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Formulário */}
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="flex w-full">
                                                <div className="flex flex-col w-[65%] m-5">
                                                    <div className="grid grid-cols-2 mb-4 w-full">
                                                        {/* Coluna Esquerda */}
                                                        <div className="grid-span-1 w-full">
                                                            <Label
                                                                id="carga"
                                                                nomeLabel="Carga"
                                                                fontSize="20px"
                                                                fontWeight="500"
                                                            />
                                                            <InputPosLogin
                                                                id="carga"
                                                                name="carga"
                                                                inputType="number"
                                                                placeholder="Ex.: 20"
                                                                fontSize="16px"
                                                                fontWeight="400"
                                                                fontSizeErro="16px"
                                                                width="50%"
                                                                {...register('carga', {
                                                                    required: 'A carga é obrigatória',
                                                                    valueAsNumber: true,
                                                                    min: {
                                                                        value: 1,
                                                                        message: 'A carga deve ser maior que 0',
                                                                    },
                                                                })}
                                                                isError={!!errors.carga}
                                                                errorMessage={errors.carga?.message}
                                                            />

                                                            <Label
                                                                id="series"
                                                                nomeLabel="Séries"
                                                                fontSize="20px"
                                                                fontWeight="500"
                                                            />
                                                            <InputPosLogin
                                                                id="series"
                                                                name="series"
                                                                inputType="number"
                                                                placeholder="Ex.: 4"
                                                                fontSize="16px"
                                                                fontWeight="400"
                                                                fontSizeErro="16px"
                                                                width="50%"
                                                                {...register('series', {
                                                                    required: 'A quantidade de séries é obrigatória',
                                                                    valueAsNumber: true,
                                                                    min: {
                                                                        value: 1,
                                                                        message: 'A série deve ser maior que 0',
                                                                    },
                                                                })}
                                                                isError={!!errors.series}
                                                                errorMessage={errors.series?.message}
                                                            />
                                                        </div>

                                                        {/* Coluna Direita */}
                                                        <div className="grid-span-1">
                                                            <Label
                                                                id="repeticoes"
                                                                nomeLabel="Repetições"
                                                                fontSize="20px"
                                                                fontWeight="500"
                                                            />
                                                            <InputPosLogin
                                                                id="repeticoes"
                                                                name="repeticoes"
                                                                inputType="number"
                                                                placeholder="Ex.: 12"
                                                                fontSize="16px"
                                                                fontWeight="400"
                                                                fontSizeErro="16px"
                                                                width="50%"
                                                                {...register('repeticoes', {
                                                                    required: 'A quantidade de repetições é obrigatória',
                                                                    valueAsNumber: true,
                                                                    min: {
                                                                        value: 1,
                                                                        message: 'As repetições devem ser maiores que 0',
                                                                    },
                                                                })}
                                                                isError={!!errors.repeticoes}
                                                                errorMessage={errors.repeticoes?.message}
                                                            />

                                                            <Label
                                                                id="tempoDescanso"
                                                                nomeLabel="Tempo de descanso (segundos)"
                                                                fontSize="20px"
                                                                fontWeight="500"
                                                            />
                                                            <InputPosLogin
                                                                id="tempoDescanso"
                                                                name="tempoDescanso"
                                                                inputType="number"
                                                                placeholder="Ex.: 60"
                                                                fontSize="16px"
                                                                fontWeight="400"
                                                                fontSizeErro="16px"
                                                                width="50%"
                                                                {...register('tempoDescanso', {
                                                                    required: 'O tempo de descanso é obrigatório',
                                                                    valueAsNumber: true,
                                                                    min: {
                                                                        value: 1,
                                                                        message: 'O descanso deve ser maior que 0',
                                                                    },
                                                                })}
                                                                isError={!!errors.tempoDescanso}
                                                                errorMessage={errors.tempoDescanso?.message}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Vídeo e Dados do Exercício */}
                                                <div className="flex flex-col w-[35%] m-5 gap-5">
                                                    <div className="bg-gray-400 w-full h-full flex items-center justify-center rounded-lg">
                                                        {exercicioEditando?.videoUrl ? (
                                                            <video
                                                                src={exercicioEditando.videoUrl}
                                                                controls
                                                                className="w-full h-full rounded-lg"
                                                                aria-label="Vídeo do exercício"
                                                            />
                                                        ) : (
                                                            <h1>Vídeo não disponível</h1>
                                                        )}
                                                    </div>
                                                    <div className="grid-span-1 w-full">
                                                        <p><b>Nome:</b> {exercicioEditando?.nome}</p>
                                                        <p><b>Origem:</b> {exercicioEditando?.origem}</p>
                                                        <p><b>Grupo muscular:</b> {exercicioEditando?.grupoMuscular}</p>
                                                        <p><b>Observações:</b> {exercicioEditando?.observacoes || 'Sem observações'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Botões */}
                                            <div className="flex flex-col items-center sm:flex-row mt-5 gap-4 w-full justify-center">
                                                <Button
                                                    texto="Cancelar"
                                                    corTexto="#B41F1F"
                                                    cor="var(--cor-secundaria)"
                                                    height="2.75rem"
                                                    width="13.25rem"
                                                    corHover="#1D2D4417"
                                                    fontWeight="500"
                                                    aria-label="Botão de Cancelar"
                                                    onClick={() => setModalConfirmarCancelarVisivel(true)}
                                                />

                                                <Button
                                                    type="submit"
                                                    texto="Salvar"
                                                    corTexto="var(--cor-secundaria)"
                                                    cor="#46982B"
                                                    height="2.75rem"
                                                    width="9.2rem"
                                                    corHover="#46982BE5"
                                                    fontWeight="600"
                                                    aria-label="Botão de Salvar"
                                                />
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        )}
                        <Modal
                            visivel={modalDeletarVisivel}
                            fecharModal={() => setModalDeletarVisivel(false)}
                            titulo="Tem certeza que deseja excluir esse treino?"
                            descricao="Você não poderá disponibilizá-lo futuramente"
                            onConfirm={() => {
                                setModalConfirmarCancelarVisivel(false);
                                setShowCreateModal(false);
                            }}
                            icone={lixeira}
                            textoBotaoConfirmar="Manter Treino"
                            textoBotaoCancelar="Deletar mesmo assim"
                            aria-label="Modal de Exclusão de Treino"
                        />

                        <Modal
                            visivel={modalConfirmarCancelarVisivel}
                            fecharModal={() => setModalConfirmarCancelarVisivel(false)}
                            titulo="Tem certeza que deseja cancelar?"
                            descricao="Alterações que não forem salvas serão perdidas"
                            onConfirm={() => {
                                setModalConfirmarCancelarVisivel(false);
                                setShowCreateModal(false);
                                setShowEditModal(false);
                            }}
                            icone={iconCancelar}
                            textoBotaoConfirmar="Voltar"
                            textoBotaoCancelar="Cancelar mesmo assim"
                            aria-label="Modal de Cancelamento"
                        />
                        <Toaster position='top-right' reverseOrder={false} />
                    </div>
                </main>
            </div>
        </div >
    )
}

export default CriarTreino