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

  const [exercicioEvolucao, setExercicioEvolucao] = useState({
    exercicioId: null,
    nome: "",
    cargaAntiga: 0,
    cargaAtual: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDadosAluno = async () => {
      try {
        setLoading(true);
        setError(null);

        const [progressoResponse, treinosResponse, evolucaoResponse] =
          await Promise.all([
            caringuApi.get(`/alunos/${alunoId}/progresso-aulas`),
            caringuApi.get(`/alunos/${alunoId}/top-treinos`),
            caringuApi.get(`/alunos/${alunoId}/maior-evolucao-exercicio`),
          ]);

        // Atualizar estados com os dados recebidos
        setProgressoAulas(progressoResponse.data);
        setTopTreinos(treinosResponse.data || []);
        setExercicioEvolucao(
          evolucaoResponse.data || {
            exercicioId: null,
            nome: "Nenhum exercício encontrado",
            cargaAntiga: 0,
            cargaAtual: 0,
          }
        );

        console.log("Dados carregados com sucesso:", {
          progresso: progressoResponse.data,
          treinos: treinosResponse.data,
          evolucao: evolucaoResponse.data,
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
                        fontSize: "8px",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      - Últimos 30 dias
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

            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Funcionalidade em desenvolvimento
              </h3>
              <p className="text-gray-600">
                A visualização das próximas aulas será implementada em breve.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomeAluno;
