import { useEffect, useRef, useState } from "react";
import {
  FaChartLine,
  FaClock,
  FaDumbbell,
  FaHome,
  FaUser,
} from "react-icons/fa";
import MenuLateralAluno from "../components/Aluno/MenuLateral/MenuLateral";
// import { caringuApi } from "../provider/caringuApi";

const HomeAluno = () => {
  // const navigate = useNavigate();
  // const alunoId = sessionStorage.getItem('pessoaId');

  const menuRef = useRef(null);

  // Estados para os dados da página
  const [aulasConcluidas] = useState(2);
  const [totalAulas] = useState(10);
  const [topTreinos] = useState([
    { nome: "Treino 1", quantidade: 10 },
    { nome: "Treino 2", quantidade: 6 },
    { nome: "Treino 3", quantidade: 1 },
  ]);
  const [exercicioEvolucao] = useState({
    nome: "Supino",
    cargaAnterior: "10kg",
    cargaAtual: "15kg",
  });
  const [proximasAulas] = useState([
    {
      id: 1,
      data: "10/05/2025",
      treino: "Treino superior",
      exercicios: ["Exercício 1", "Exercício 2", "Exercício 3"],
      totalExercicios: 5,
      horario: "09:00 - 10:00",
      personalTrainer: "Marcos Luiz Borges Moreno",
    },
    {
      id: 2,
      data: "17/05/2025",
      treino: "Treino inferior",
      exercicios: ["Agachamento", "Leg Press"],
      totalExercicios: 4,
      horario: "14:00 - 15:00",
      personalTrainer: "Marcos Luiz Borges Moreno",
    },
  ]);

  // Calcular porcentagem de conclusão
  const porcentagemConclusao = Math.round((aulasConcluidas / totalAulas) * 100);
  const aulasPendentes = totalAulas - aulasConcluidas;

  useEffect(() => {
    // Aqui você pode fazer as chamadas para a API para buscar os dados reais
    // fetchDadosAluno();
  }, []);

  // const fetchDadosAluno = async () => {
  //   try {
  //     // Implementar chamadas para a API quando disponível
  //     // const responseAulas = await caringuApi.get(`/aluno/aulas/${alunoId}`);
  //     // const responseTreinos = await caringuApi.get(`/aluno/top-treinos/${alunoId}`);
  //     // etc...
  //   } catch (error) {
  //     console.error("Erro ao buscar dados do aluno:", error);
  //   }
  // };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Menu Lateral */}
      <MenuLateralAluno ref={menuRef} />

      {/* Conteúdo Principal - Agora ocupa toda a largura */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
          {/* Mobile Layout - Com botão de menu e conteúdo centralizado */}
          <div className="flex items-center justify-between max-w-md mx-auto lg:hidden">
            {/* Botão do menu (3 traços) - Mobile */}
            <button
              className="p-2 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
              onClick={() => menuRef.current?.toggleMenu()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 39 39"
                fill="none"
              >
                <path
                  d="M4.875 11.375H34.125"
                  stroke="#1D2D44"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M4.875 19.5H34.125"
                  stroke="#1D2D44"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M4.875 27.625H34.125"
                  stroke="#1D2D44"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Conteúdo central */}
            <div className="flex items-center space-x-2 flex-1 justify-center">
              <FaHome
                className="text-[#1D2D44]"
                style={{ width: "34px", height: "30px" }}
              />
              <h1
                className="font-bold"
                style={{
                  fontSize: "24px",
                  fontFamily: "Inter",
                  color: "#1D2D44",
                }}
              >
                Página inicial
              </h1>
            </div>

            {/* Espaço vazio para manter centralização */}
            <div className="w-10"></div>
          </div>

          {/* Desktop Layout - Alinhado à esquerda */}
          <div className="hidden lg:flex items-center justify-start">
            <div className="flex items-center space-x-2">
              {/* Botão do menu (3 traços) */}
              <button
                className="p-2 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                onClick={() => menuRef.current?.toggleMenu()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 39 39"
                  fill="none"
                >
                  <path
                    d="M4.875 11.375H34.125"
                    stroke="#1D2D44"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.875 19.5H34.125"
                    stroke="#1D2D44"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.875 27.625H34.125"
                    stroke="#1D2D44"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <FaHome
                className="text-[#1D2D44]"
                style={{ width: "34px", height: "30px" }}
              />
              <h1
                className="font-bold"
                style={{
                  fontSize: "24px",
                  fontFamily: "Inter",
                  color: "#1D2D44",
                }}
              >
                Página inicial
              </h1>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal */}
        <main className="px-4 py-6 max-w-md mx-auto lg:max-w-4xl">
          {/* Resumo da Semana */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Resumo da semana
            </h2>

            <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0">
              {/* Conclusão do plano de aulas */}
              <div className="bg-[var(--azul-claro)] text-white rounded-xl p-6">
                <div className="mb-3">
                  <h3 className="text-sm font-medium opacity-90">
                    Conclusão do plano de aulas
                  </h3>
                  <div className="text-2xl font-bold mt-1">
                    {aulasConcluidas}/{totalAulas}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">
                    {porcentagemConclusao}% completo
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${porcentagemConclusao}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-sm opacity-90">
                  {aulasPendentes} pendentes
                </div>
              </div>

              {/* Seu top de treinos */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-600 mb-4">
                  Seu top de treinos
                </h3>
                <div className="space-y-3">
                  {topTreinos.map((treino, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-800">
                          {index + 1}º
                        </span>
                        <span className="text-sm text-gray-700">
                          {treino.nome}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-800">
                        {treino.quantidade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercício com maior evolução */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-sm font-medium text-gray-600 mb-4">
                  Exercício com maior evolução
                </h3>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <FaChartLine className="text-green-500 text-xl mr-2" />
                    <span className="font-medium text-gray-800">
                      {exercicioEvolucao.nome}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Carga anterior</div>
                    <div className="text-lg font-bold text-gray-800">
                      {exercicioEvolucao.cargaAnterior}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Carga atual
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {exercicioEvolucao.cargaAtual}
                    </div>
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
              {proximasAulas.map((aula) => (
                <div
                  key={aula.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  {/* Cabeçalho da Aula */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <h3
                      className="text-2xl font-bold"
                      style={{
                        color: "#1D2D44",
                        fontFamily: "Inter",
                        fontSize: "24px",
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
                      }}
                    >
                      Acompanhar aula
                    </button>
                  </div>

                  {/* Treino */}
                  <div className="flex items-center mb-4">
                    <div
                      className="w-[37px] h-[37px] rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: "#748CAB" }}
                    >
                      <FaDumbbell
                        style={{
                          color: "#FFFDF6",
                          width: "25px",
                          height: "18px",
                        }}
                      />
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
                    <div className="space-y-1">
                      {aula.exercicios.slice(0, 2).map((exercicio, index) => (
                        <div key={index} className="text-sm text-gray-700">
                          {exercicio}
                        </div>
                      ))}
                      {aula.totalExercicios > 2 && (
                        <div className="text-sm text-gray-500 font-medium">
                          +{aula.totalExercicios - 2} exercícios
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cronograma */}
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-3"></div>
                    <FaClock className="text-gray-500 mr-2 text-sm" />
                    <span className="text-sm text-gray-600">
                      {aula.horario}
                    </span>
                  </div>

                  {/* Personal Trainer */}
                  <div className="flex items-center">
                    <FaUser className="text-gray-500 mr-3" />
                    <div>
                      <div className="text-xs text-gray-500">
                        Personal Trainer
                      </div>
                      <div className="text-sm font-medium text-gray-800">
                        {aula.personalTrainer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomeAluno;
