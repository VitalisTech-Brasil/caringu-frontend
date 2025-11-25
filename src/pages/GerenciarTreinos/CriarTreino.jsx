import { React, useState, useEffect, useRef } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { Link, useNavigate } from 'react-router-dom'
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
import ModalPersonalizarExercicio from '../../components/Utils/ModalPersonalizarExercicio.jsx'
import ExercicioChip from '../../components/Utils/CriarTreino/ExercicioChip.jsx'

const CriarTreino = () => {

    const [exercicioInput, setExercicioInput] = useState('');
    const [sugestoes, setSugestoes] = useState([]);
    const [exerciciosSelecionados, setExerciciosSelecionados] = useState([]);
    const [focado, setFocado] = useState(false);
    const sugestaoRef = useRef(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);
    const [modalDeletarVisivel, setModalDeletarVisivel] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [exercicios, setExercicios] = useState([]);
    const [exercicioEditando, setExercicioEditando] = useState(null);
    const [selectAberto, setSelectAberto] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setExerciciosSelecionados(prev => {
            const existe = exercicioEditando && prev.some(ex => ex.id === exercicioEditando.id);
            if (existe) {
                return prev.map(ex => ex.id === exercicioEditando.id ? { ...ex, ...data } : ex);
            } else {
                const newId = exercicioEditando?.id || crypto.randomUUID();
                return [...prev, { id: newId, ...(exercicioEditando || {}), ...data }];
            }
        });

        setShowCreateModal(false);
        setExercicioEditando(null);
    };


    useEffect(() => {
        const handleClickFora = (event) => {
            if (sugestaoRef.current && !sugestaoRef.current.contains(event.target)) {
                setSugestoes([]);
            }
        };

        document.addEventListener('mousedown', handleClickFora);

        return () => {
            document.removeEventListener('mousedown', handleClickFora);
        };
    }, []);

    useEffect(() => {
        if (exercicioInput.length >= 1) {
            let resultados = exercicios
                .filter(e =>
                    e.nome.toLowerCase().includes(exercicioInput.toLowerCase())
                )
                .filter(e =>
                    !exerciciosSelecionados.some(sel => sel.id === e.id)
                );

            setSugestoes(resultados);
        } else if (exercicioInput.length === 0) {
            const restantes = exercicios.filter(e =>
                !exerciciosSelecionados.some(sel => sel.id === e.id)
            );
            setSugestoes(restantes);
        }
    }, [exercicioInput, exercicios, exerciciosSelecionados]);

    useEffect(() => {
        const pessoaId = sessionStorage.getItem("pessoaId")

        if (pessoaId === null) return;

        const buscarExercicios = async () => {
            try {
                const response = await caringuApi.get(`/exercicios/por-personal/${pessoaId}`);
                setExercicios(response.data);
                console.log("Exercicios", response.data);
            } catch (error) {
                console.error('Erro ao buscar exercícios:', error);
            }
        };

        buscarExercicios();
    }, []);


    const adicionarExercicio = async (exercicio) => {
        const valido = await trigger(['nomeTreino', 'descricao', 'dificuldade']);
        if (!valido) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Preencha os campos do treino antes de adicionar exercícios." />
            ));
            return;
        }
        setExercicioEditando(exercicio);
        setShowCreateModal(true);
        setExercicioInput('');
        setSugestoes([]);
    };


    const isValidYoutubeUrl = (url) => {
        if (!url || url.trim() === "") return true;
        const youtubeRegex = /^(https:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        return youtubeRegex.test(url);
    };

    const handleSubmitTreino = async (data) => {
        try {
            const personalId = sessionStorage.getItem("pessoaId");

            if (!personalId) {
                toast.custom((t) => (
                    <CustomToast t={t} type="error" message="Sessão expirada. Faça login novamente." />
                ));
                navigate("/login");
                return;
            }

            const treinoResponse = await caringuApi.post('/treino', {
                nome: data.nomeTreino,
                descricao: data.descricao,
                personalId: personalId
            });

            const idTreino = treinoResponse.data.id;
            if (!idTreino) {
                throw new Error("ID do treino não retornado.");
            }


            const grauDificuldadeMap = {
                '1': 'INICIANTE',
                '2': 'INTERMEDIARIO',
                '3': 'AVANCADO'
            };

            const exerciciosPayload = exerciciosSelecionados.map((exercicio) => ({
                exercicioId: exercicio.id,
                carga: Number(exercicio.carga) || 0,
                repeticoes: Number(exercicio.repeticoes) || 10,
                series: Number(exercicio.series) || 3,
                descanso: Number(exercicio.tempoDescanso) || 60,
                dataHoraCriacao: new Date().toISOString(),
                dataHoraModificacao: new Date().toISOString(),
                origemTreinoExercicio: 'PERSONAL',
                grauDificuldade: grauDificuldadeMap[data.dificuldade] || 'INICIANTE'
            }));

            await caringuApi.post('/treinos-exercicios/cadastrar-lote', {
                idTreino,
                exercicios: exerciciosPayload
            });

            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Treino cadastrado com sucesso!" />
            ));
            reset();
            setExerciciosSelecionados([]);
            navigate("/gerenciar-treinos")

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
            resetExercicio({
                carga: exercicioEditando.carga || '',
                series: exercicioEditando.series || '',
                repeticoes: exercicioEditando.repeticoes || '',
                tempoDescanso: exercicioEditando.tempoDescanso || '',
                videoUrl: exercicioEditando.videoUrl || ''
            });
        } else {
            resetExercicio()
        }
    }, [exercicioEditando, resetExercicio]);

    const {
        register: registerExercicio,
        handleSubmit: handleSubmitExercicio,
        formState: { errors: errorsExercicio },
        reset: resetExercicio
    } = useForm({
        defaultValues: {
            carga: "",
            series: "",
            repeticoes: "",
            tempoDescanso: "",
            videoUrl: ""
        }
    });

    const handleOpenModal = (exercicio) => {
        setShowCreateModal(true);
        setExercicioEditando(exercicio);
    };

    return (
        <div className="flex h-screen bg-[var(--cor-secundaria)]">
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
                                                onBlur={() => setTimeout(() => setFocado(false), 200)}
                                                placeholder="Digite o nome do exercício"
                                                className="border-b-2 w-full pt-2 pb-1"
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
                                                onClick={() => setSelectAberto((prev) => !prev)}
                                                onBlur={() => setSelectAberto(false)}
                                                className="appearance-none peer text-base w-full pt-2 pb-1 pr-[1%] pl-[1%] border-b-2 border-[var(--cor-primaria)] text-[#333] transition-all"
                                            >
                                                <option disabled className="text-[#15171B87]" value="">Selecione a dificuldade</option>
                                                <option value="1">Iniciante</option>
                                                <option value="2">Intermediário</option>
                                                <option value="3">Avançado</option>
                                            </select>
                                            <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 transition-transform duration-200 ease-in-out ${selectAberto ? 'rotate-180' : 'rotate-0'}`}>
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

                                <h1 className='mt-6'>Exercícios adicionados:</h1>
                                <div className="flex flex-wrap gap-2 mt-2 md:max-w-1/2">
                                    {exerciciosSelecionados.map((exercicio) => (
                                        <ExercicioChip
                                            key={exercicio.id}
                                            exercicio={exercicio}
                                            onEdit={handleOpenModal}
                                            onRemove={removerExercicio}
                                        />
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
                                        fontWeight="600"
                                        aria-label={"Botão de Salvar"}
                                    />

                                </div>
                            </form>

                        </div>
                        {showCreateModal && (
                            <ModalPersonalizarExercicio
                                visivel={showCreateModal}
                                onClose={() => setModalConfirmarCancelarVisivel(true)}
                                onSubmit={handleSubmitExercicio(onSubmit)}
                                register={registerExercicio}
                                handleSubmit={handleSubmitExercicio}
                                errors={errorsExercicio}
                                exercicio={exercicioEditando}
                                InputComponent={InputPosLogin}
                                isValidYoutubeUrl={isValidYoutubeUrl}
                            />
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
                    </div>
                </main>
            </div>
            <Toaster position='top-right' reverseOrder={false} />
        </div >
    )
}

export default CriarTreino