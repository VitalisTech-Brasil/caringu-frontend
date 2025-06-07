import { React, useState, useEffect, useRef } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Label from '../../components/Utils/Label'
import InputEditar from '../../components/Utils/InputEditar'
import Button from '../../components/Utils/Button'
import Modal from "../../components/Utils/Modal.jsx";
import lixeira from "../../assets/images/trash.png";
import iconCancelar from "../../assets/images/cancelar.png";
import info2 from "../../assets/images/info-2.svg";
import { caringuApi } from '../../provider/caringuApi.js'



const EditarTreino = () => {
    const [exercicioInput, setExercicioInput] = useState('');
    const [sugestoes, setSugestoes] = useState([]);
    const [exerciciosSelecionados, setExerciciosSelecionados] = useState([]);
    const [focado, setFocado] = useState(false);
    const [modalExercicioVisivel, setModalExercicioVisivel] = useState(false);
    const [exercicioAtual, setExercicioAtual] = useState(null); // Exercício sendo editado
    const sugestaoRef = useRef(null);
    const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);


    const [valorNomeTreino, setValorNomeTreino] = useState("")



    const { id } = useParams();
    const treinoId = parseInt(id);
    const idPersonal = sessionStorage.getItem("pessoaId")

    // Simulação do banco de dados
    const [treino, setTreino] = useState([]);

    const exerciciosTreino = useState([])

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            nomeTreino: "",
            dificuldade: "",
            descricao: "",
            exercicios: []
        },
        mode: "onChange"
    });


    const descricaoValue = watch('descricao'); // pega o valor atual do campo descricao

    // Quando receber os dados da API, atualize o valor com setValue
    useEffect(() => {
        if (treino?.[0]?.descricaoTreino) {
            setValue('descricao', treino[0].descricaoTreino);
        }
    }, [treino, setValue]);



    useEffect(() => {
        const fetchSugestoes = async () => {
            if (exercicioInput.trim().length < 2) {
                setSugestoes([]);
                return;
            }

            try {
                const response = await caringuApi.get(`/exercicios/buscar?nome=${encodeURIComponent(exercicioInput)}`);
                setSugestoes(response.data);
            } catch (error) {
                console.error("Erro ao buscar sugestões de exercício:", error);
            }
        };

        fetchSugestoes();
    }, [exercicioInput]);

    const adicionarExercicio = (exercicio) => {
        if (!exerciciosSelecionados.find(e => e.id === exercicio.id)) {
            setExerciciosSelecionados([
                ...exerciciosSelecionados,
                { ...exercicio, carga: 0, series: 0, repeticoes: 0, descanso: 0 }
            ]);
        }
        setExercicioInput('');
        setSugestoes([]);
    };

    useEffect(() => {
        if (treino && treino.grauDificuldade) {
            setValue("dificuldade", treino.grauDificuldade);
        }
    }, [treino, setValue]);

    useEffect(() => {
        const fetchInfosTreino = async () => {
            try {
                const response = await caringuApi.get(`/treinos-exercicios/buscar-info-treino-edit/${idPersonal}/${treinoId}`);
                const data = response.data;

                if (data.length > 0) {
                    setTreino(data); // array completo com os exercícios

                    // Campos principais do formulário (nome do treino, descrição, etc.)
                    const treinoInfo = data[0];
                    setValorNomeTreino(treinoInfo.nomeTreino);
                    setValue('nomeTreino', treinoInfo.nomeTreino);
                    setValue('descricaoTreino', treinoInfo.descricaoTreino);
                }
            } catch (error) {
                console.error("Erro ao buscar informações dos treinos:", error);
            }
        };

        fetchInfosTreino();
    }, [idPersonal]);

    useEffect(() => {
        // Preenche os valores iniciais do formulário e dos exercícios
        setValue("nomeTreino", treino.nomeTreino);
        setValue("dificuldade", treino.dificuldade);
        setValue("descricao", treino.descricao);
        setExerciciosSelecionados(treino.exercicios);
    }, []);

    const listaExerciciosMock = [
        { id: 1, nome: "Supino" },
        { id: 2, nome: "Agachamento" },
        { id: 3, nome: "Remada curvada" },
        { id: 4, nome: "Rosca direta" },
        { id: 5, nome: "Desenvolvimento" },
        { id: 6, nome: "Leg press" },
        { id: 7, nome: "Puxada frontal" }
    ];

    const abrirModalExercicio = (exercicio) => {
        setExercicioAtual(exercicio);
        setModalExercicioVisivel(true);
    };

    const atualizarExercicio = (id, campo, valor) => {
        setExerciciosSelecionados(prev =>
            prev.map(exercicio =>
                exercicio.id === id ? { ...exercicio, [campo]: valor } : exercicio
            )
        );
    };

    const removerExercicio = (id) => {
        setExerciciosSelecionados(exerciciosSelecionados.filter(e => e.id !== id));
    };

    const salvarTreino = (data) => {
        const treinoAtualizado = {
            ...data,
            exercicios: exerciciosSelecionados
        };
        console.log("Treino atualizado:", treinoAtualizado);
        alert("Treino atualizado com sucesso!");
    };

    const salvarExercicio = (e) => {
        e.preventDefault();
        // Os valores já foram atualizados pelo atualizarExercicio
        setModalExercicioVisivel(false);
        setExercicioAtual(null);
    };

    console.log("treinos", treino)
    console.log()

    return (
        <div className="flex h-screen bg-[#fdfbf7]">
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
                            <h1>Editar Treino</h1>
                        </div>
                        <form onSubmit={handleSubmit(salvarTreino)}>
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
                                        defaultValue={treino?.[0]?.nomeTreino || ""}
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
                                    <div className="relative" ref={sugestaoRef}>
                                        <Label id="exerciciosTreino" nomeLabel="Exercícios que compõem o treino" fontSize="20px" fontWeight="500" />
                                        <input
                                            id="exerciciosTreino"
                                            type="text"
                                            value={exercicioInput}
                                            onChange={(e) => setExercicioInput(e.target.value)}
                                            onFocus={() => setFocado(true)}
                                            onBlur={() => setTimeout(() => setFocado(false), 200)}
                                            placeholder="Digite o nome do exercício"
                                            className="border-b-2 w-full"
                                        />
                                        {focado && sugestoes.length > 0 && (
                                            <ul className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10">
                                                {sugestoes.map((exercicio) => (
                                                    <li
                                                        key={exercicio.id}
                                                        onClick={() => adicionarExercicio(exercicio)}
                                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                    >
                                                        {exercicio.nome}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 space-y-3">
                                    <Label id="dificuldade" nomeLabel="Grau de dificuldade" fontSize="20px" fontWeight="500" />
                                    <select
                                        defaultValue=""
                                        id="dificuldade"
                                        {...register("dificuldade", {
                                            required: 'Selecione a dificuldade do treino'
                                        })}
                                        className="appearance-none text-base w-full flex items-center justify-center pt-1 pr-[1%] pb-[1%] pl-[1%] border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]"
                                    >
                                        <option disabled value="" className="text-[#15171B87]">
                                            Selecione o grau de dificuldade
                                        </option>
                                        <option value="INICIANTE">Iniciante</option>
                                        <option value="INTERMEDIARIO">Intermediário</option>
                                        <option value="AVANCADO">Avançado</option>
                                    </select>
                                    {errors.dificuldade && (
                                        <div className="flex items-center justify-start gap-1 text-[#D45C56] mt-3 text-sm">
                                            <img src={info2} alt="Erro" className="w-4 h-4" />
                                            <span>{errors.dificuldade.message}</span>
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
                                        value={descricaoValue}  // passa o valor do watch aqui
                                        onChange={(e) => setValue('descricao', e.target.value)}  // atualiza o valor do form
                                        {...register('descricao', {
                                            required: 'A descrição do treino é obrigatório',
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
                            <h1 className="mt-6">Exercícios adicionados:</h1>
                            <div className="flex flex-wrap gap-2 mt-2 md:max-w-1/2">
                                {treino.map((exercicio) => (

                                    <div key={exercicio.exercicioId} className="bg-orange-500 text-white px-3 py-1 rounded-[5px] flex items-center cursor-pointer" onClick={() => abrirModalExercicio(exercicio)}>
                                        {exercicio.nomeExercicio}
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
                <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
                    <div className="absolute inset-0 bg-[#000000] opacity-50"></div>
                    <div className="relative p-4 w-full max-w-2xl md:max-w-[1100px]">
                        <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                            <div className="flex justify-between items-center pb-4 mb-4">
                                <h3 className="text-4xl font-semibold text-[var(--cor-primaria)]">
                                    Personalizar exercício
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setModalExercicioVisivel(false)}
                                    className="bg-[#B41F1F] text-[var(--cor-secundaria)] rounded-lg text-xs sm:text-sm cursor-pointer w-10 h-10 md:w-13 md:h-13 inline-flex justify-center items-center absolute top-2 right-2"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={salvarExercicio}>
                                <div className="flex w-full">
                                    <div className="flex flex-col w-[65%] m-5">
                                        <div className="grid grid-cols-2 mb-4 w-full">
                                            <div className="grid-span-1 w-full">
                                                <Label id="carga" nomeLabel="Carga" fontSize="20px" fontWeight="500" />
                                                <InputEditar
                                                    id="carga"
                                                    name="carga"
                                                    value={exercicioAtual?.carga || ''}
                                                    inputType="number"
                                                    placeholder="Ex.: 20"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="50%"
                                                    onChange={(e) => atualizarExercicio(exercicioAtual.id, 'carga', Number(e.target.value))}
                                                    {...register('carga', {
                                                        required: 'A carga é obrigatória',
                                                        pattern: {
                                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                            message: 'Email inválido',
                                                        },
                                                    })}
                                                    isError={!!errors.email}
                                                    errorMessage={errors.email?.message}
                                                />
                                                <Label id="series" nomeLabel="Séries" fontSize="20px" fontWeight="500" />
                                                <InputEditar
                                                    id="series"
                                                    name="series"
                                                    inputType="number"
                                                    placeholder="Ex.: 20"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="50%"
                                                    value={exercicioAtual?.series || ''}
                                                    onChange={(e) => atualizarExercicio(exercicioAtual.id, 'series', Number(e.target.value))}
                                                    {...register('series', {
                                                        required: 'A quantidade de séries é obrigatória',
                                                        pattern: {
                                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                            message: 'Email inválido',
                                                        },
                                                    })}
                                                    isError={!!errors.email}
                                                    errorMessage={errors.email?.message}
                                                />
                                            </div>
                                            <div className="grid-span-1">
                                                <Label id="repeticoes" nomeLabel="Repetições" fontSize="20px" fontWeight="500" />
                                                <InputEditar
                                                    id="repeticoes"
                                                    name="repeticoes"
                                                    inputType="number"
                                                    placeholder="Ex.: 20"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="50%"
                                                    inputMode="numeric"
                                                    onChange={(e) => atualizarExercicio(exercicioAtual.id, 'repeticoes', Number(e.target.value))}
                                                    value={exercicioAtual?.repeticoes || ''}
                                                    {...register('repeticoes', {
                                                        required: 'A quantidade de repetições é obrigatória'
                                                    })}
                                                />
                                                <Label id="descanso" nomeLabel="Tempo de descanso" fontSize="20px" fontWeight="500" />
                                                <InputEditar
                                                    id="tempoDescanso"
                                                    name="tempoDescanso"
                                                    inputType="number"
                                                    placeholder="Ex.: 20"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="50%"
                                                    inputMode="numeric"
                                                    onChange={(e) => atualizarExercicio(exercicioAtual.id, 'descanso', Number(e.target.value))}
                                                    value={exercicioAtual?.descanso || ''}
                                                    {...register('repeticoes', {
                                                        required: 'O tempo de descanço é obrigatório'
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <Label id="observacoes" nomeLabel="Observações" fontSize="20px" fontWeight="500" />
                                            <input
                                                type="text"
                                                value={exercicioAtual?.observacoes || ''}
                                                onChange={(e) => atualizarExercicio(exercicioAtual.id, 'observacoes', e.target.value)}
                                                placeholder="Ex.: Como deve ser feito"
                                                className="border-b-2 w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-[35%] m-5 gap-5">
                                        <div className="bg-gray-400 w-full h-full flex items-center justify-center rounded-lg">
                                            <h1>Video</h1>
                                        </div>
                                        <div className="grid-span-1 w-full">
                                            <p><b>Nome:</b> {exercicioAtual?.nome}</p>
                                            <p><b>Origem:</b> Biblioteca CaringU</p>
                                            <p><b>Grupo muscular:</b> Peitoral</p>
                                            <p><b>Observações:</b> {exercicioAtual?.observacoes || 'Sem observações'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4 mt-6">
                                    <Button
                                        texto="Cancelar"
                                        corTexto="#B41F1F"
                                        cor="transparent"
                                        height="2.75rem"
                                        width="13.25rem"
                                        corHover="#1D2D4417"
                                        fontWeight="500"
                                        onClick={() => setModalExercicioVisivel(false)}
                                    />
                                    <Button
                                        texto="Salvar"
                                        corTexto="var(--cor-secundaria)"
                                        cor="#46982B"
                                        height="2.75rem"
                                        width="9.2rem"
                                        corHover="#46982BE5"
                                        fontWeight="600"
                                        type="submit"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditarTreino;