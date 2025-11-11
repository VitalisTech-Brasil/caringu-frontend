import React, { useState, useEffect, useRef } from 'react'
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
  const [exercicios, setExercicios] = useState([]);
  const [exercicioEditando, setExercicioEditando] = useState(null);
  const navigate = useNavigate();

  const {
    register: registerTreino,
    handleSubmit: handleSubmitTreino,
    formState: { errors: errorsTreino },
    reset: resetTreino,
    watch: watchTreino,
  } = useForm({
    defaultValues: {
      nomeTreino: '',
      dificuldade: '',
      descricao: '',
    },
    mode: 'onChange'
  });

  const {
    register: registerEx,
    handleSubmit: handleSubmitEx,
    formState: { errors: errorsEx },
    reset: resetEx,
    setValue: setValueEx,
    getValues: getValuesEx
  } = useForm({
    defaultValues: {
      carga: '',
      series: '',
      repeticoes: '',
      tempoDescanso: '',
      videoUrl: ''
    },
    mode: 'onChange'
  });

  useEffect(() => {
    const buscarExercicios = async () => {
      try {
        const response = await caringuApi.get('/exercicios');
        setExercicios(response.data || []);
      } catch (err) {
        console.error('Erro ao buscar exercícios:', err);
        toast.custom(t => <CustomToast t={t} type="error" message="Erro ao carregar exercícios" />);
      }
    };
    buscarExercicios();
  }, []);

  useEffect(() => {
    const termo = exercicioInput.trim().toLowerCase();
    if (termo.length >= 1) {
      const resultados = exercicios
        .filter(e => e.nome && e.nome.toLowerCase().includes(termo))
        .filter(e => !exerciciosSelecionados.some(sel => sel.id === e.id));
      setSugestoes(resultados);
    } else {
      const restantes = exercicios.filter(e => !exerciciosSelecionados.some(sel => sel.id === e.id));
      setSugestoes(restantes);
    }
  }, [exercicioInput, exercicios, exerciciosSelecionados]);

  useEffect(() => {
    const handleClickFora = (ev) => {
      if (sugestaoRef.current && !sugestaoRef.current.contains(ev.target)) {
        setSugestoes([]);
      }
    };
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  const isValidYoutubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const abrirModalExercicio = (exercicio) => {
    setExercicioEditando(exercicio || null);
    if (exercicio) {
      setValueEx('carga', exercicio.carga ?? '');
      setValueEx('series', exercicio.series ?? '');
      setValueEx('repeticoes', exercicio.repeticoes ?? '');
      setValueEx('tempoDescanso', exercicio.tempoDescanso ?? '');
      setValueEx('videoUrl', exercicio.videoUrl ?? '');
    } else {
      resetEx();
    }
    setShowCreateModal(true);
    setExercicioInput('');
    setSugestoes([]);
  };

  const onSubmitExercicio = (dados) => {
    if (!isValidYoutubeUrl(dados.videoUrl)) {
      toast.custom(t => <CustomToast t={t} type="error" message="URL do YouTube inválida." />);
      return;
    }

    setExerciciosSelecionados(prev => {
      if (exercicioEditando && prev.some(p => p.id === exercicioEditando.id)) {
        return prev.map(p => p.id === exercicioEditando.id ? { ...p, ...dados } : p);
      }
      if (exercicioEditando) {
        return [...prev, { ...exercicioEditando, ...dados }];
      }
      return [...prev, { id: Date.now().toString(), nome: dados.nome || 'Exercício', ...dados }];
    });

    resetEx();
    setExercicioEditando(null);
    setShowCreateModal(false);
  };

  const removerExercicio = (id) => {
    setExerciciosSelecionados(prev => prev.filter(e => e.id !== id));
  };

  const cancelarEdicao = () => {
    setModalConfirmarCancelarVisivel(false);
    setShowCreateModal(false);
    setExercicioEditando(null);
    resetEx();
  };

  const salvarTreino = async (data) => {
    if (!data.nomeTreino || !data.descricao || !data.dificuldade) {
      toast.custom(t => <CustomToast t={t} type="error" message="Preencha nome, descrição e dificuldade antes de salvar." />);
      return;
    }
    if (!exerciciosSelecionados || exerciciosSelecionados.length === 0) {
      toast.custom(t => <CustomToast t={t} type="error" message="Adicione pelo menos um exercício ao treino." />);
      return;
    }

    try {
      const personalId = sessionStorage.getItem("pessoaId");
      const treinoResponse = await caringuApi.post('/treino', {
        nome: data.nomeTreino,
        descricao: data.descricao,
        personalId
      });

      const idTreino = treinoResponse.data?.id;
      if (!idTreino) throw new Error('ID do treino não retornado');

      const grauDificuldadeMap = {
        '1': 'INICIANTE',
        '2': 'INTERMEDIARIO',
        '3': 'AVANCADO'
      };

      const exerciciosPayload = exerciciosSelecionados.map(ex => ({
        exercicioId: ex.id,
        carga: Number(ex.carga) || 0,
        repeticoes: Number(ex.repeticoes) || 10,
        series: Number(ex.series) || 3,
        descanso: Number(ex.tempoDescanso) || 60,
        dataHoraCriacao: new Date().toISOString(),
        dataHoraModificacao: new Date().toISOString(),
        origemTreinoExercicio: 'PERSONAL',
        grauDificuldade: grauDificuldadeMap[data.dificuldade] || 'INICIANTE'
      }));

      await caringuApi.post('/treinos-exercicios/cadastrar-lote', {
        idTreino,
        exercicios: exerciciosPayload
      });

      toast.custom(t => <CustomToast t={t} type="success" message="Treino cadastrado com sucesso!" />);
      resetTreino();
      setExerciciosSelecionados([]);
      navigate('/gerenciar-treinos');
    } catch (err) {
      console.error('Erro ao cadastrar treino:', err);
      toast.custom(t => <CustomToast t={t} type="error" message="Erro ao cadastrar treino" />);
    }
  };

  return (
    <div className="flex h-screen bg-[var(--cor-secundaria)]">
      <MenuLateral />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-4 md:p-8 space-y-8 flex flex-col">
          <div className="bg-[var(--cor-secundaria)] rounded-lg p-4 md:p-6 border border-[#E6E6E2]">
            <div className="justify-start text-zinc-900 text-xl md:text-3xl font-semibold flex items-center gap-5">
              <Link to="/gerenciar-treinos">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                  <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <h1>Criar Treino</h1>
            </div>

            <form onSubmit={handleSubmitTreino(salvarTreino)}>
              <div className="flex flex-col space-y-3 md:grid md:grid-cols-2 md:gap-10 mt-4">
                <div>
                  <Label id="nomeTreino" nomeLabel="Nome do treino" fontSize="20px" fontWeight="500" />
                  <InputPosLogin
                    id="nomeTreino"
                    placeholder="Ex.: Treino de perna"
                    {...registerTreino('nomeTreino', {
                      required: 'O nome do treino é obrigatório',
                      minLength: { value: 3, message: 'Mínimo de 3 caracteres' }
                    })}
                    isError={!!errorsTreino.nomeTreino}
                    errorMessage={errorsTreino.nomeTreino?.message}
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
                      className="border-b-2 w-full pt-2 pb-1"
                    />
                    {focado && sugestoes.length > 0 && (
                      <ul className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10">
                        {sugestoes.map(ex => (
                          <li
                            key={ex.id}
                            onMouseDown={() => abrirModalExercicio(ex)}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          >
                            {ex.nome}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label id="dificuldade" nomeLabel="Grau de dificuldade" fontSize="20px" fontWeight="500" />
                  <select
                    defaultValue=""
                    id="dificuldade"
                    {...registerTreino("dificuldade", { required: 'Selecione a dificuldade' })}
                    className="appearance-none text-base w-full pt-2 pb-1 pr-[1%] pl-[1%] border-b-2 border-[var(--cor-primaria)] text-[#333]"
                  >
                    <option disabled value="">Selecione a dificuldade</option>
                    <option value="1">Iniciante</option>
                    <option value="2">Intermediário</option>
                    <option value="3">Avançado</option>
                  </select>
                  {errorsTreino.dificuldade && (
                    <div className="flex items-center gap-1 text-[#D45C56] mt-3 text-sm">
                      <img src={info2} alt="Erro" className="w-4 h-4" />
                      <span>{errorsTreino.dificuldade.message}</span>
                    </div>
                  )}

                  <Label id="descricao" nomeLabel="Descrição" fontSize="20px" fontWeight="500" />
                  <InputPosLogin
                    id="descricao"
                    placeholder="Ex.: Treino de perna para iniciantes"
                    {...registerTreino('descricao', {
                      required: 'A descrição do treino é obrigatória',
                      minLength: { value: 5, message: 'Mínimo de 5 caracteres' }
                    })}
                    isError={!!errorsTreino.descricao}
                    errorMessage={errorsTreino.descricao?.message}
                  />
                </div>
              </div>

              <h1 className='mt-6'>Exercícios adicionados:</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {exerciciosSelecionados.map(ex => (
                  <ExercicioChip
                    key={ex.id}
                    exercicio={ex}
                    onEdit={() => abrirModalExercicio(ex)}
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
                />
              </div>
            </form>

            {showCreateModal && (
              <ModalPersonalizarExercicio
                visivel={showCreateModal}
                onClose={() => setModalConfirmarCancelarVisivel(true)}
                onSubmit={handleSubmitEx(onSubmitExercicio)}
                register={registerEx}
                handleSubmit={handleSubmitEx}
                errors={errorsEx}
                exercicio={exercicioEditando}
                InputComponent={InputPosLogin}
                isValidYoutubeUrl={isValidYoutubeUrl}
              />
            )}

            <Modal
              visivel={modalConfirmarCancelarVisivel}
              fecharModal={() => setModalConfirmarCancelarVisivel(false)}
              titulo="Tem certeza que deseja cancelar?"
              descricao="Alterações não salvas serão perdidas"
              onConfirm={cancelarEdicao}
              icone={iconCancelar}
              textoBotaoConfirmar="Voltar"
              textoBotaoCancelar="Cancelar mesmo assim"
            />
          </div>
        </main>
      </div>
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  );
};

export default CriarTreino;
