import React, { useState } from "react";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineClock } from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";
import { Avatar, Dropdown, Button, Popover } from "flowbite-react";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import Header from "../../components/Personal/Header/Header";

const GerenciarAlunos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Semana");
  const [sortOrder, setSortOrder] = useState(null); // A-Z or Z-A
  const [anamnesesPendentes, setAnamnesesPendentes] = useState(false);
  const [aguardandoTreino, setAguardandoTreino] = useState(false);

  const alunosAtivos = [
    {
      id: 1,
      nome: "Maria Gladys Mello da Silva",
      objetivo: "Emagrecer",
      telefone: "1191234-5678",
      avatar: "https://via.placeholder.com/50",
      status: "anamnesesPendentes", // Exemplo de status
    },
    {
      id: 2,
      nome: "João Silva",
      objetivo: "Ganhar Massa",
      telefone: "1198765-4321",
      avatar: "https://via.placeholder.com/50",
      status: "aguardandoTreino", // Exemplo de status
    },
    // Adicione mais alunos aqui
  ];

  // Função para aplicar filtros e ordenação
  const filteredAlunos = alunosAtivos
    .filter((aluno) => {
      if (anamnesesPendentes && aluno.status !== "anamnesesPendentes") return false;
      if (aguardandoTreino && aluno.status !== "aguardandoTreino") return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.nome.localeCompare(b.nome);
      if (sortOrder === "Z-A") return b.nome.localeCompare(a.nome);
      return 0;
    });

  return (
    <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
      {/* Menu Lateral */}
      <MenuLateral />

      {/* Conteúdo Principal */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Conteúdo */}
        <main className="p-6 font-sans space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Seção Esquerda: Alunos Ativos */}
            <div className="col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Alunos Ativos</h2>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Pesquisar aluno"
                    className="flex-1 border border-gray-300 rounded-md p-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="p-2 bg-gray-200 rounded-md">
                    <HiOutlineSearch className="w-5 h-5 text-gray-600" />
                  </button>
                  <Popover
                    placement="bottom"
                    trigger="click"
                    content={
                      <div className="p-4 space-y-4">
                        {/* Botões de Ordenação */}
                        <div className="flex gap-2">
                          <Button
                            color={sortOrder === "A-Z" ? "blue" : "gray"}
                            onClick={() => setSortOrder("A-Z")}
                          >
                            A-Z
                          </Button>
                          <Button
                            color={sortOrder === "Z-A" ? "blue" : "gray"}
                            onClick={() => setSortOrder("Z-A")}
                          >
                            Z-A
                          </Button>
                        </div>
                        {/* Botões de Filtros */}
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            color={anamnesesPendentes ? "blue" : "gray"}
                            onClick={() => setAnamnesesPendentes((prev) => !prev)}
                          >
                            <HiOutlineClock className="w-4 h-4 mr-1" />
                            Anamneses Pendentes
                          </Button>
                          <Button
                            color={aguardandoTreino ? "orange" : "gray"}
                            onClick={() => setAguardandoTreino((prev) => !prev)}
                          >
                            <HiOutlineClock className="w-4 h-4 mr-1 text-orange-500" />
                            Aguardando Treino
                          </Button>
                        </div>
                      </div>
                    }
                  >
                    <button className="p-2 bg-gray-200 rounded-md">
                      <HiOutlineFilter className="w-5 h-5 text-gray-600" />
                    </button>
                  </Popover>
                </div>
                <div className="space-y-4 overflow-y-auto max-h-[400px]">
                  {filteredAlunos.map((aluno) => (
                    <div
                      key={aluno.id}
                      className="flex items-center justify-between bg-white rounded-md shadow-sm p-4 gap-4"
                    >
                      <Avatar img={aluno.avatar} rounded />
                      <div className="flex-1">
                        <p className="font-bold text-md">{aluno.nome}</p>
                        <p className="text-sm text-gray-600">
                          Objetivo: {aluno.objetivo}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <HiOutlineClock className="w-4 h-4" />
                          {aluno.telefone}
                        </p>
                      </div>
                      <button className="p-2 text-gray-600 rounded hover:bg-gray-100">
                        <FaEllipsisV />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Seção Direita: Widgets */}
            <div className="space-y-4">
              {/* Presença de Alunos */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4">
                  Presença de alunos por:
                </h2>
                <Dropdown
                  label={filter}
                  inline
                  className="mb-4"
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <Dropdown.Item onClick={() => setFilter("Semana")}>
                    Semana
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilter("Mês")}>
                    Mês
                  </Dropdown.Item>
                </Dropdown>
                <div className="space-y-2 overflow-y-auto max-h-[200px]">
                  {/* Conteúdo do widget */}
                </div>
              </div>

              {/* Alunos com o plano perto do fim */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4">
                  Alunos com o plano perto do fim:
                </h2>
                <div className="space-y-2 overflow-y-auto max-h-[200px]">
                  {/* Conteúdo do widget */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GerenciarAlunos;