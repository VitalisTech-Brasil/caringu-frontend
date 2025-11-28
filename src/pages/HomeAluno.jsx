import { useEffect, useRef, useState } from "react";
import Header from "../components/Aluno/Header/Header";
import MenuLateralAluno from "../components/Aluno/MenuLateral/MenuLateral";
import { caringuApi } from "../provider/caringuApi";
import Button from "../components/Utils/Button";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomeAluno = () => {

  useEffect(() => {
    document.title = "Home | CaringU";
  }, []);

  const navigate = useNavigate();
  const alunoId = sessionStorage.getItem("pessoaId");
  const [errosImagem, setErrosImagem] = useState({});

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

  const lidarErroImagem = (id) => {
    setErrosImagem((prev) => ({
      ...prev,
      [id]: true,
    }));
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

        console.log("Respostas das requisições:", proximasResponse);

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


        const mappedProximas = Array.isArray(proximasResponse?.data)
          ? proximasResponse.data.map((aula) => ({
            idAula: aula.idAula,
            dataAula: aula.dataAula,
            diaSemana: aula.diaSemana,
            horarioInicioFim: aula.horarioInicioFim,
            nomeTreino: aula.nomeTreino,
            exercicios: aula.exercicios,
            nomePersonal: aula.nomePersonal,
            urlFotoPerfil: aula.urlFotoPerfil,
          }))
          : [];
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
            <div className="w-full h-auto flex flex-col gap-2">
              {proximasAulas.length > 0 ? (
                proximasAulas.map((aula) => (
                  <div key={aula.idAula} className="w-full h-auto flex flex-col border border-gray-300 rounded-lg p-4 bg-[#1D2D4405] gap-3">
                    <div className="w-full h-auto flex lg:flex-row flex-col justify-between lg:items-center items-start gap-2 lg:gap-0">
                      <span className="text-[var(--azul-escuro)] font-bold text-2xl">
                        Aula - {aula.dataAula}
                      </span>
                      <Button
                        fontWeight="700"
                        texto={"Acompanhar Aula"}
                        cor="#748CAB"
                        corTexto="#FFFFFF"
                        ariaLabel={"Acompanhar Aula"}
                        fontSize={"16px"}
                        classNameExtra="px-4 py-1"
                        onClick={() => navigate(`/acompanhar-aula-aluno/${aula.idAula}`)}

                      />
                    </div>
                    <div className="w-full h-auto flex flex-col gap-4">
                      <div className="w-full h-auto flex flex-row justify-start items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                          <circle cx="18.5" cy="18.5" r="18.5" fill="#748CAB" />
                          <path d="M26.3126 13.7146H27.8751C28.3064 13.7146 28.6564 14.1306 28.6564 14.6432V23.9297C28.6564 24.4423 28.3064 24.8583 27.8751 24.8583H26.3126C25.8814 24.8583 25.5314 24.4423 25.5314 23.9297V14.6432C25.5314 14.1306 25.8814 13.7146 26.3126 13.7146Z" stroke="#FFFDF6" strokeWidth="2" />
                          <path d="M23.1876 10H24.7501C25.1814 10 25.5314 10.416 25.5314 10.9286V27.6442C25.5314 28.1568 25.1814 28.5729 24.7501 28.5729H23.1876C22.7564 28.5729 22.4064 28.1568 22.4064 27.6442V10.9286C22.4064 10.416 22.7564 10 23.1876 10Z" stroke="#FFFDF6" strokeWidth="2" />
                          <path d="M12.25 10H13.8125C14.2438 10 14.5938 10.416 14.5938 10.9286V27.6442C14.5938 28.1568 14.2438 28.5729 13.8125 28.5729H12.25C11.8188 28.5729 11.4688 28.1568 11.4688 27.6442V10.9286C11.4688 10.416 11.8188 10 12.25 10Z" stroke="#FFFDF6" strokeWidth="2" />
                          <path d="M9.12513 13.7146H10.6876C11.1189 13.7146 11.4689 14.1306 11.4689 14.6432V23.9297C11.4689 24.4423 11.1189 24.8583 10.6876 24.8583H9.12513C8.69387 24.8583 8.34387 24.4423 8.34387 23.9297V14.6432C8.34387 14.1306 8.69387 13.7146 9.12513 13.7146Z" stroke="#FFFDF6" strokeWidth="2" />
                          <path d="M28.6562 19.2864H31" stroke="#FFFDF6" strokeWidth="2" />
                          <path d="M14.5939 19.2864H22.4064" stroke="#FFFDF6" strokeWidth="2" />
                          <path d="M6 19.2864H8.34376" stroke="#FFFDF6" strokeWidth="2" />
                        </svg>
                        <span className="text-[var(--azul-escuro)] font-semibold text-xl"> {aula.nomeTreino} </span>
                      </div>
                      <div className="w-full h-auto flex flex-col items-start gap-2">
                        <div className="w-full h-auto">
                          <span className="text-[var(--azul-escuro)] font-medium text-base">
                            Exercícios
                          </span>
                        </div>
                        <div className="w-full h-auto flex flex-col gap-1 text-[#15171B87] text-sm font-medium">
                          {aula.exercicios && aula.exercicios.length > 0 ? (
                            aula.exercicios.slice(0, 2).map((ex) => (
                              <div key={ex.idExercicio} className="border border-gray-300 py-2.5 pl-4 rounded-[6px] w-full bg-[var(--cor-secundaria)] h-auto">
                                <span>{ex.nomeExercicio}</span>
                              </div>
                            ))
                          ) : (
                            <div className="border border-gray-300 py-2.5 pl-4 rounded-[6px] w-full bg-[var(--cor-secundaria)] h-auto">
                              <span>Nenhum exercício</span>
                            </div>
                          )}

                        </div>
                        {aula.exercicios && aula.exercicios.length > 2 && (
                          <div className="text-[#15171B87] text-sm w-full h-auto font-medium">
                            <span>+ {aula.exercicios.length - 2} exercícios</span>
                          </div>
                        )}
                      </div>
                      <div className="w-full h-auto flex flex-col items-start gap-1">
                        <div className="w-full h-auto">
                          <span className="text-[var(--azul-escuro)] font-medium text-base">
                            Cronograma
                          </span>
                        </div>
                        <div className="flex flex-row items-center justify-between text-[#15171B87] text-sm font-medium border border-gray-300 py-2.5 px-4 rounded-[6px] w-full bg-[var(--cor-secundaria)] h-auto">
                          <div className="w-auto h-auto flex flex-row items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 4 4" fill="none">
                              <circle cx="2" cy="2" r="2" transform="matrix(1 0 0 -1 0 4)" fill="#748CAB" />
                            </svg>
                            <span>{aula.diaSemana}</span>
                          </div>
                          <div className="h-auto w-auto flex flex-row items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                              <path d="M6.0572 0C2.71968 0 0 2.84603 0 6.3386C0 9.83117 2.71968 12.6772 6.0572 12.6772C9.39472 12.6772 12.1144 9.83117 12.1144 6.3386C12.1144 2.84603 9.39472 0 6.0572 0ZM8.69208 8.60149C8.60728 8.75361 8.45585 8.83601 8.29836 8.83601C8.21962 8.83601 8.14087 8.817 8.06819 8.76629L6.19046 7.59365C5.72405 7.30207 5.37879 6.66187 5.37879 6.09774V3.49891C5.37879 3.23903 5.58474 3.02351 5.83308 3.02351C6.08143 3.02351 6.28737 3.23903 6.28737 3.49891V6.09774C6.28737 6.32593 6.46909 6.66187 6.65686 6.77597L8.53459 7.94861C8.75265 8.08172 8.82534 8.3733 8.69208 8.60149Z" fill="#1D2D44" fillOpacity="0.79" />
                            </svg>
                            <span>
                              {aula.horarioInicioFim}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-auto flex flex-col items-start gap-1">
                        <div className="w-full h-auto flex flex-row items-center text-[var(--azul-escuro)] font-medium text-base ">
                          <span>Personal Trainer</span>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-4 text-[#15171B87] text-sm font-medium border border-gray-300 py-1.5 pl-4 rounded-[6px] w-full bg-[var(--cor-secundaria)] h-auto">
                          {aula.urlFotoPerfil && !errosImagem[aula.urlFotoPerfil] ? (
                            <img
                              src={aula.urlFotoPerfil}
                              alt={aula.nomePersonal}
                              className="w-[45px] h-[45px] object-cover rounded"
                              onError={() => lidarErroImagem(aula.urlFotoPerfil)}
                            />
                          ) : (
                            <FaUserCircle className="flex-shrink-0 w-[45px] h-[45px]" />
                          )}
                          <span>
                            {aula.nomePersonal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p className="text-sm">Nenhuma aula agendada</p>
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
