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

        const [progressoResponse, treinosResponse, evolucaoResponse /*, proximasResponse */] =
          await Promise.all([
            caringuApi.get(`/alunos/${alunoId}/progresso-aulas`),
            caringuApi.get(`/alunos/${alunoId}/top-treinos`),
            caringuApi.get(`/alunos/${alunoId}/maior-evolucao-exercicio`),
            // caringuApi.get(`/alunos/${alunoId}/proximas-aulas`), 
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

          const mockedProximas = [
            {
              id: 1,
              data: "2025-10-15 18:00",
              treino: "Treino Funcional",
              exercicios: ["Agachamento", "Flexão", "Prancha", "Burpee"],
              totalExercicios: 4,
            },
            {
              id: 2,
              data: "2025-10-18 07:30",
              treino: "Cardio e Core",
              exercicios: ["Corrida", "Abdominais", "Mountain Climbers"],
              totalExercicios: 3,
            },
          ];

          setProximasAulas(mockedProximas);

        console.log("Dados carregados com sucesso:", {
          progresso: progressoResponse.data,
          treinos: treinosResponse.data,
          evolucao: evolucaoResponse.data,
          proximas: mockedProximas,
        });
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
      console.warn("ID do aluno não encontrado no sessionStorage");
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

  // Exibir erro se houver
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
                    width: "382px",
                    height: "88px",
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
              <div className="lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4 flex flex-row space-x-4 lg:space-x-0">
                {/* Seu top de treinos */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-1">
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
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-1">
                  <div
                    className="flex items-baseline mb-4"
                    style={{
                      width: "144px",
                      height: "34px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    <h4 className="text-sm font-medium text-gray-600">
                      Exercício com maior evolução
                    </h4>
                      <span
                      className="ml-1 text-gray-500"
                      style={{
                        fontSize: "15px",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      De {getMesAtual()}
                    </span>
                  </div>
                  <div className="text-center">
                    {exercicioEvolucao.nome && exercicioEvolucao.exercicioId ? (
                      <>
                        <div className="flex items-center justify-center mb-4">
                          <span className="text-xl mr-2">📈</span>
                          <span
                            className="font-medium"
                            style={{ color: "#E96E35" }}
                          >
                            {exercicioEvolucao.nome}
                          </span>
                        </div>

                        {/* Layout horizontal para os valores */}
                        <div className="flex justify-center space-x-8">
                          {/* Carga anterior */}
                          <div className="text-center">
                            <div className="text-xs text-gray-500 mb-1">
                              Carga anterior
                            </div>
                            <div className="text-lg font-bold text-gray-600">
                              {exercicioEvolucao.cargaAntiga}kg
                            </div>
                          </div>

                          {/* Carga atual */}
                          <div className="text-center">
                            <div
                              className="text-xs"
                              style={{ color: "#1D2D44" }}
                            >
                              Carga atual
                            </div>
                            <div
                              className="text-lg font-bold"
                              style={{ color: "#1D2D44" }}
                            >
                              {exercicioEvolucao.cargaAtual}kg
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <span className="text-xl mb-2 block">📊</span>
                        <p className="text-sm">
                          {exercicioEvolucao.nome ||
                            "Nenhuma evolução encontrada"}
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
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    {/* Cabeçalho da Aula */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                      <h3
                        className="text-2xl font-bold lg:text-2xl truncate"
                        style={{
                          color: "#1D2D44",
                          fontFamily: "Inter",
                          fontSize: "24px",
                          maxWidth: "60%",
                        }}
                      >
                        Aula - {aula.data}
                      </h3>
                      <button
                        className="text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                        style={{
                          width: "144px",
                          height: "32px",
                          backgroundColor: "#9CABC2",
                          fontSize: "14px",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        Acompanhar aula
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      {/* Treino */}
                      <div className="flex items-center mb-4">
                        <div
                          className="w-[37px] h-[37px] rounded-full flex items-center justify-center mr-3"
                          style={{ backgroundColor: "#748CAB" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-5 h-5 text-white"
                            style={{ color: "#FFFDF6" }}
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M9 11.5a3.5 3.5 0 1 1 7 0v3h1v1H8v-1h1v-3z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-800">
                          {aula.treino}
                        </span>
                      </div>

                      {/* Exercícios */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-2">
                          Exercícios
                        </h4>
                        <div className="flex flex-col space-y-2">
                          {(aula.exercicios || [])
                            .slice(0, 2)
                            .map((exercicio, index) => (
                              <div
                                key={exercicio.id ?? index}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50"
                                style={{
                                  width: "100%",
                                  maxWidth: "314px",
                                  height: "36px",
                                  fontFamily: "Inter, sans-serif",
                                }}
                              >
                                {typeof exercicio === "string" ? exercicio : exercicio.nome}
                              </div>
                            ))}
                          {(aula.totalExercicios || 0) > 2 && (
                            <div className="relative group">
                              <div className="text-sm text-gray-500 font-medium mt-2 cursor-pointer hover:text-gray-700 transition-colors">
                                +{(aula.totalExercicios || 0) - 2} exercícios
                              </div>
                              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                                <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 shadow-lg min-w-max">
                                  <div className="space-y-1">
                                    {(aula.exercicios || [])
                                      .slice(2)
                                      .map((exercicio, idx) => (
                                        <div
                                          key={exercicio.id ?? idx}
                                          className="whitespace-nowrap"
                                        >
                                          {typeof exercicio === "string" ? exercicio : exercicio.nome}
                                        </div>
                                      ))}
                                  </div>
                                  <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" aria-hidden="true"></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
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
