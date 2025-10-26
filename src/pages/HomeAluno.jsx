import { useEffect, useRef, useState } from "react";
import Header from "../components/Aluno/Header/Header";
import MenuLateralAluno from "../components/Aluno/MenuLateral/MenuLateral";
import { caringuApi } from "../provider/caringuApi";

const HomeAluno = () => {
  // const navigate = useNavigate();
  const alunoId = sessionStorage.getItem("pessoaId");

  const menuRef = useRef(null);

  const [progressoAulas, setProgressoAulas] = useState({
    total: 0,
    realizadas: 0,
    pendentes: 0,
    percentual: 0,
  });

  const [topTreinos, setTopTreinos] = useState([]);

  const [proximasAulas, setProximasAulas] = useState([]);

  const [exercicioEvolucao, setExercicioEvolucao] = useState({
    exercicioId: null,
    nome: "",
    cargaAntiga: 0,
    cargaAtual: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMesAtual = () => {
    const meses = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const hoje = new Date();
    return meses[hoje.getMonth()];
  };

  useEffect(() => {
    const fetchDadosAluno = async () => {
      try {
        setLoading(true);
        setError(null);

        const [progressoResponse, treinosResponse, evolucaoResponse, proximasResponse] =
          await Promise.all([
            caringuApi.get(`/alunos/${alunoId}/progresso-aulas`),
            caringuApi.get(`/alunos/${alunoId}/top-treinos`),
            caringuApi.get(`/alunos/${alunoId}/maior-evolucao-exercicio`),
            caringuApi.get(`/aulas-treinos-exercicios/buscar-aulas/${alunoId}`),
          ]);

          const progressoData = progressoResponse?.data || {};
          const mappedProgresso = {
            total: progressoData.totalAulas ?? 0,
            realizadas: progressoData.aulasRealizadas ?? 0,
            pendentes: progressoData.aulasPendentes ?? 0,
            percentual: progressoData.percentualConclusao ?? 0,
          };

          const treinosData = Array.isArray(treinosResponse?.data)
            ? treinosResponse.data
            : [];
          const mappedTreinos = treinosData.map((t) => ({
            treinoId: t.treinoId ?? null,
            nome: t.treinoNome ?? t.nome ?? "",
            ocorrencias: t.qtdVezesRealizado ?? t.ocorrencias ?? 0,
          }));

          setProgressoAulas(mappedProgresso);
          setTopTreinos(mappedTreinos);
          
          const evolucaoData = evolucaoResponse?.data || null;
          
          const mappedEvolucao = evolucaoData
            ? {
                exercicioId: evolucaoData.exercicioId ?? null,
                nome: evolucaoData.nomeExercicio ?? evolucaoData.nome ?? "",
                cargaAntiga: evolucaoData.cargaAntiga ?? 0,
                cargaAtual: evolucaoData.cargaAtual ?? 0,
              }
            : {
                exercicioId: null,
                nome: "Nenhum exercício encontrado",
                cargaAntiga: 0,
                cargaAtual: 0,
              };

          setExercicioEvolucao(mappedEvolucao);

          const proximasData = Array.isArray(proximasResponse?.data)
            ? proximasResponse.data
            : [];
          
          const mappedProximas = proximasData.map((aula) => {
            return {
              id: aula.aulaId,
              aulaTreinoExercicioId: aula.aulaTreinoExercicioId,
              dataHorarioInicio: aula.dataHorarioInicio,
              dataHorarioFim: aula.dataHorarioFim,
              nomeTreino: aula.nomeTreino,
              nomeExercicio: aula.nomeExercicio,
              nomePersonal: aula.nomePersonal,
              urlFotoPerfil: aula.urlFotoPerfil,
              treinoId: aula.treinoId,
              exercicioId: aula.exercicioId,
              personalId: aula.personalId,
              status: "AGENDADA", 
            };
          });

          setProximasAulas(mappedProximas);

      } catch (error) {
        console.error("Erro ao buscar dados do aluno:", error);
        setError("Erro ao carregar dados. Tente novamente.");

        setProgressoAulas({
          total: 0,
          realizadas: 0,
          pendentes: 0,
          percentual: 0,
        });
        setTopTreinos([]);
        setExercicioEvolucao({
          exercicioId: null,
          nome: "Erro ao carregar",
          cargaAntiga: 0,
          cargaAtual: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    if (alunoId) {
      fetchDadosAluno();
    } else {
      setError("Sessão expirada. Faça login novamente.");
      setLoading(false);
    }
  }, [alunoId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--azul-claro)] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[var(--azul-claro)] text-white px-4 py-2 rounded-lg hover:opacity-90"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 font-inter"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Menu Lateral */}
      <MenuLateralAluno ref={menuRef} />

      <div className="w-full">
        {/* Header */}
        <Header menuRef={menuRef} />

        {/* Conteúdo Principal */}
        <main className="px-4 py-6 max-w-md mx-auto lg:max-w-4xl">
          {/* Resumo da Semana */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Resumo da semana
            </h2>

            <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0">
              {/* Conclusão do plano de aulas */}
              <div className="bg-[var(--azul-claro)] text-white rounded-xl">
                {/* Layout Mobile */}
                <div
                  className="lg:hidden p-4"
                  style={{
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <div className="flex flex-col h-full justify-between">
                    {/* Título e números */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="text-xs font-bold opacity-90 mb-1">
                          Conclusão do plano de aulas
                        </h3>
                        <div className="flex items-baseline space-x-1">
                          <span
                            style={{
                              fontSize: "16px",
                              fontFamily: "Inter, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            {progressoAulas.realizadas}
                          </span>
                          <span className="text-xs opacity-90 font-bold">
                            /
                          </span>
                          <span
                            style={{
                              fontSize: "16px",
                              fontFamily: "Inter, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            {progressoAulas.total}
                          </span>
                        </div>
                      </div>

                      {/* Porcentagem */}
                      <div className="flex items-baseline space-x-1">
                        <span
                          style={{
                            fontSize: "20px",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: "bold",
                          }}
                        >
                          {Math.round(progressoAulas.percentual)}%
                        </span>
                        <span
                          style={{
                            fontSize: "10px",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: "bold",
                            opacity: "0.9",
                          }}
                        >
                          completo
                        </span>
                      </div>
                    </div>

                    {/* Barra de progresso e pendentes */}
                    <div className="flex flex-col">
                      <div className="w-full bg-white/20 rounded-full h-1 mb-1">
                        <div
                          className="h-1 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.round(progressoAulas.percentual)}%`,
                            backgroundColor: "#1D2D44",
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-end">
                        <div
                          style={{
                            fontSize: "10px",
                            fontFamily: "Inter, sans-serif",
                            fontWeight: "bold",
                            opacity: "0.9",
                          }}
                        >
                          {progressoAulas.pendentes} pendentes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layout Desktop */}
                <div className="hidden lg:block p-6">
                  <div className="mb-3">
                    <h3 className="text-sm font-medium opacity-90">
                      Conclusão do plano de aulas
                    </h3>
                    <div className="text-2xl font-bold mt-1">
                      {progressoAulas.realizadas}/{progressoAulas.total}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">
                      {Math.round(progressoAulas.percentual)}% completo
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.round(progressoAulas.percentual)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-sm opacity-90">
                    {progressoAulas.pendentes} pendentes
                  </div>
                </div>
              </div>

              {/* Cards em linha para mobile e grid para desktop */}
              <div className="lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4 flex flex-row gap-3 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-hide">
                {/* Seu top de treinos */}
                <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 flex-shrink-0 w-[280px] lg:w-auto lg:flex-1 snap-start">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">
                    Seu top de treinos
                  </h3>
                  <div className="space-y-4">
                    {topTreinos.length > 0 ? (
                      topTreinos.slice(0, 3).map((treino, index) => {
                        const colors = ["#E96E35", "#748CAB", "#9CA3AF"];
                        return (
                          <div
                            key={treino.treinoId || index}
                            className="flex items-center"
                          >
                            {/* Número da posição */}
                            <div className="w-8 flex justify-start">
                              <span
                                className="text-sm font-bold"
                                style={{ color: colors[index] }}
                              >
                                {index + 1}º
                              </span>
                            </div>

                            {/* Nome do treino com linha e quantidade */}
                            <div className="flex-1 flex items-center justify-between ml-2">
                              <span
                                className="text-gray-700 font-bold"
                                style={{
                                  fontSize: "12px",
                                  fontFamily: "Inter, sans-serif",
                                }}
                              >
                                {treino.nome}
                              </span>
                              <div className="flex-1 border-b border-dotted border-gray-400 mx-3 h-0"></div>
                              <span className="text-sm font-bold text-gray-800">
                                {treino.ocorrencias}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <p className="text-sm">Nenhum treino encontrado</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Exercício com maior evolução */}
                <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 flex-shrink-0 w-[280px] lg:w-auto lg:flex-1 snap-start">
                  {/* Cabeçalho */}
                  <div className="mb-3 lg:mb-4">
                    <h4 className="text-sm font-medium text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                      Exercício com maior evolução
                    </h4>
                    <span className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                      De {getMesAtual()}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex flex-col items-center">
                    {exercicioEvolucao.nome && exercicioEvolucao.exercicioId ? (
                      <>
                        {/* Nome do exercício com ícone */}
                        <div className="flex items-center justify-center mb-4 lg:mb-6 w-full">
                          <span
                            className="font-semibold text-center text-sm lg:text-base"
                            style={{ color: "#E96E35", fontFamily: "Inter, sans-serif" }}
                          >
                            {exercicioEvolucao.nome}
                          </span>
                        </div>

                        {/* Layout horizontal para os valores */}
                        <div className="flex justify-center items-center gap-2 lg:gap-8 w-full">
                          {/* Carga anterior */}
                          <div className="flex flex-col items-end flex-1">
                            <div className="text-[8px] lg:text-xs text-gray-400 mb-1 whitespace-nowrap" style={{ fontFamily: "Inter, sans-serif" }}>
                              Carga anterior
                            </div>
                            <div className="text-base lg:text-2xl font-semibold text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                              {exercicioEvolucao.cargaAntiga}kg
                            </div>
                          </div>

                          <div className="self-center flex-shrink-0" style={{ color: "#E96E35" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>

                          {/* Carga atual */}
                          <div className="flex flex-col items-start flex-1">
                            <div className="text-[10px] lg:text-sm mb-1 whitespace-nowrap font-medium" style={{ color: "#E96E35", fontFamily: "Inter, sans-serif" }}>
                              Carga atual
                            </div>
                            <div className="text-xl lg:text-3xl font-bold" style={{ color: "#E96E35", fontFamily: "Inter, sans-serif" }}>
                              {exercicioEvolucao.cargaAtual}kg
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        <span className="text-4xl mb-3 block">📊</span>
                        <p className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                          {exercicioEvolucao.nome || "Nenhuma evolução encontrada"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Próximas Aulas */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Próximas aulas
            </h2>

            <div className="space-y-4">
              {proximasAulas.length > 0 ? (
                proximasAulas.map((aula) => (
                  <div
                    key={aula.id}
                    className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100"
                  >
                    {/* Cabeçalho da Aula */}
                    <div className="flex items-center justify-between mb-3 lg:mb-4 pb-3 lg:pb-4 border-b border-gray-200">
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-base lg:text-xl font-bold mb-1 truncate"
                          style={{
                            color: "#1D2D44",
                            fontFamily: "Inter",
                          }}
                        >
                          {aula.nomeTreino}
                        </h3>
                        <p className="text-xs lg:text-sm text-gray-600 break-words">
                          {new Date(aula.dataHorarioInicio).toLocaleDateString('pt-BR', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        aula.status === 'AGENDADA' ? 'bg-blue-100 text-blue-800' :
                        aula.status === 'CONCLUIDA' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {aula.status}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Personal */}
                      <div className="flex items-center mb-2 lg:mb-3">
                        {aula.urlFotoPerfil ? (
                          <img
                            src={aula.urlFotoPerfil}
                            alt={aula.nomePersonal}
                            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover mr-2 lg:mr-3 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-300 mr-2 lg:mr-3 flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-600 text-sm">👤</span>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] lg:text-xs text-gray-500">Personal Trainer</p>
                          <p className="font-medium text-sm lg:text-base text-gray-800 truncate">{aula.nomePersonal}</p>
                        </div>
                      </div>

                      {/* Exercício */}
                      <div className="flex items-center mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 text-gray-600 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] lg:text-xs text-gray-500">Exercício</p>
                          <p className="font-medium text-sm lg:text-base text-gray-800 truncate">{aula.nomeExercicio}</p>
                        </div>
                      </div>

                      {/* Horário */}
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 text-gray-600 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-medium text-sm lg:text-base text-gray-800">
                          {new Date(aula.dataHorarioInicio).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })} - {new Date(aula.dataHorarioFim).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      {/* Botão de ação */}
                      {aula.status === 'AGENDADA' && (
                        <button
                          className="w-full mt-3 lg:mt-4 text-white rounded-lg text-xs lg:text-sm font-medium hover:opacity-90 transition-opacity py-2"
                          style={{
                            backgroundColor: "#748CAB",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          Ver detalhes da aula
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100 text-center">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Nenhuma aula encontrada</h3>
                  <p className="text-gray-600">Você não tem próximas aulas agendadas.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomeAluno;
