import React, { useEffect, useRef, useState } from "react";

import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineClock,
} from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";
import { Avatar, Dropdown, Button, Popover, DropdownItem } from "flowbite-react";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import Header from "../../components/Personal/Header/Header";
import { useNavigate } from "react-router-dom";

const GerenciarAlunos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Semana");
  const [sortOrder, setSortOrder] = useState(null); // A-Z or Z-A
  const [anamnesesPendentes, setAnamnesesPendentes] = useState(false);
  const [aguardandoTreino, setAguardandoTreino] = useState(false);
  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    document.title = "Gerenciar Alunos | CaringU"
    const handleClickOutside = (event) => {
      if (
        openMenuId !== null &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setOpenMenuId(null);
      }
    };

    const handleScroll = () => setOpenMenuId(null);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openMenuId]);

  const alunosAtivos = [
    {
      id: 1,
      nome: "Ana Paula Oliveira",
      objetivo: "Definição Muscular",
      telefone: "1199988-1234",
      avatar: "https://placehold.co/50x50",
      status: "anamnesesPendentes",
      aulasRestantes: 8.5,
      frequenciaSemanal: 3.0,
    },
    {
      id: 2,
      nome: "Carlos Eduardo Ramos",
      objetivo: "Hipertrofia",
      telefone: "1198877-2345",
      avatar: "https://placehold.co/50x50",
      status: "aguardandoTreino",
      aulasRestantes: 12.0,
      frequenciaSemanal: 4.0,
    },
    {
      id: 3,
      nome: "Juliana Martins Silva",
      objetivo: "Emagrecimento",
      telefone: "1197766-3456",
      avatar: "https://placehold.co/50x50",
      status: "treinoEmAndamento",
      aulasRestantes: 5.0,
      frequenciaSemanal: 2.0,
    },
    {
      id: 4,
      nome: "Fernando Costa Souza",
      objetivo: "Resistência Cardiorrespiratória",
      telefone: "1196655-4567",
      avatar: "https://placehold.co/50x50",
      status: "anamnesesPendentes",
      aulasRestantes: 10.0,
      frequenciaSemanal: 3.0,
    },
    {
      id: 5,
      nome: "Mariana Lima Rocha",
      objetivo: "Reabilitação Pós-cirúrgica",
      telefone: "1195544-5678",
      avatar: "https://placehold.co/50x50",
      status: "aguardandoTreino",
      aulasRestantes: 6.5,
      frequenciaSemanal: 2.0,
    },
    {
      id: 6,
      nome: "Rafael dos Santos",
      objetivo: "Condicionamento Físico",
      telefone: "1194433-6789",
      avatar: "https://placehold.co/50x50",
      status: "treinoEmAndamento",
      aulasRestantes: 14.0,
      frequenciaSemanal: 5.0,
    },
    {
      id: 7,
      nome: "Bianca Ferreira Melo",
      objetivo: "Qualidade de Vida",
      telefone: "1193322-7890",
      avatar: "https://placehold.co/50x50",
      status: "treinoConcluido",
      aulasRestantes: 0.0,
      frequenciaSemanal: 2.0,
    },
    {
      id: 8,
      nome: "Gustavo Almeida Nunes",
      objetivo: "Ganho de Peso",
      telefone: "1192211-8901",
      avatar: "https://placehold.co/50x50",
      status: "anamnesesPendentes",
      aulasRestantes: 7.5,
      frequenciaSemanal: 3.0,
    }
  ];




  // Componente do menu de ações do aluno
  const AlunoActionsMenu = ({ aluno }) => (
    <div className="flex flex-col text-sm font-medium min-w-[160px]">
      <button className="flex items-center justify-end gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer">
        Anamnese
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z" fill="#738CAB" />
          <path d="M19.0201 3.47967C17.0801 1.53967 15.1801 1.48967 13.1901 3.47967L11.9801 4.68967C11.8801 4.78967 11.8401 4.94967 11.8801 5.08967C12.6401 7.73967 14.7601 9.85967 17.4101 10.6197C17.4501 10.6297 17.4901 10.6397 17.5301 10.6397C17.6401 10.6397 17.7401 10.5997 17.8201 10.5197L19.0201 9.30967C20.0101 8.32967 20.4901 7.37967 20.4901 6.41967C20.5001 5.42967 20.0201 4.46967 19.0201 3.47967Z" fill="#738CAB" />
          <path d="M15.6098 11.5298C15.3198 11.3898 15.0398 11.2498 14.7698 11.0898C14.5498 10.9598 14.3398 10.8198 14.1298 10.6698C13.9598 10.5598 13.7598 10.3998 13.5698 10.2398C13.5498 10.2298 13.4798 10.1698 13.3998 10.0898C13.0698 9.8098 12.6998 9.4498 12.3698 9.0498C12.3398 9.0298 12.2898 8.9598 12.2198 8.8698C12.1198 8.7498 11.9498 8.5498 11.7998 8.3198C11.6798 8.1698 11.5398 7.9498 11.4098 7.7298C11.2498 7.4598 11.1098 7.1898 10.9698 6.9098C10.9486 6.86441 10.9281 6.81924 10.9083 6.77434C10.7607 6.44102 10.3261 6.34358 10.0683 6.60133L4.33983 12.3298C4.20983 12.4598 4.08983 12.7098 4.05983 12.8798L3.51983 16.7098C3.41983 17.3898 3.60983 18.0298 4.02983 18.4598C4.38983 18.8098 4.88983 18.9998 5.42983 18.9998C5.54983 18.9998 5.66983 18.9898 5.78983 18.9698L9.62983 18.4298C9.80983 18.3998 10.0598 18.2798 10.1798 18.1498L15.9011 12.4285C16.1607 12.1689 16.0628 11.7235 15.7252 11.5794C15.6872 11.5632 15.6488 11.5467 15.6098 11.5298Z" fill="#738CAB" />
        </svg>
      </button>
      <button className="flex items-center justify-end gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer" onClick={() => redirectToRelatorio(aluno.id)}>
        Ver relatórios
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16.5 9.5L12.3 13.7L10.7 11.3L7.5 14.5" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 9.5H16.5V11.5" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="flex items-center justify-end gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer">
        Cadastrar treino
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#15171B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12H16" stroke="#15171B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 16V8" stroke="#15171B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button className="flex items-center justify-end gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer" onClick={() => navigate(`/relatorios/registro-corporal/${aluno.id}`)}>
        Progressão corporal
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2.77017 18.25C2.89017 20.31 4.00017 22 6.76017 22H17.2402C20.0002 22 21.1002 20.31 21.2302 18.25L21.7502 9.99C21.8902 7.83 20.1702 6 18.0002 6C17.3902 6 16.8302 5.65 16.5502 5.11L15.8302 3.66C15.3702 2.75 14.1702 2 13.1502 2H10.8602C9.83017 2 8.63017 2.75 8.17017 3.66L7.45017 5.11C7.17017 5.65 6.61017 6 6.00017 6C3.83017 6 2.11017 7.83 2.25017 9.99L2.51017 14.06" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M10.5002 8H13.5002" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12.0002 18C13.7902 18 15.2502 16.54 15.2502 14.75C15.2502 12.96 13.7902 11.5 12.0002 11.5C10.2102 11.5 8.75018 12.96 8.75018 14.75C8.75018 16.54 10.2102 18 12.0002 18Z" stroke="#1D2D44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  );

  const redirectToRelatorio = (id) => {
    navigate(`/relatorio-treino/${id}`);
  }

  const redirectToPerfilAluno = (id) => {
    navigate(`/perfil-aluno/${id}`);
  }

  // Aplicar filtros e ordenação
  const filteredAlunos = alunosAtivos
    .filter((aluno) => {
      if (anamnesesPendentes && aluno.status !== "anamnesesPendentes")
        return false;
      if (aguardandoTreino && aluno.status !== "aguardandoTreino")
        return false;
      if (searchTerm && !aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()))
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.nome.localeCompare(b.nome);
      if (sortOrder === "Z-A") return b.nome.localeCompare(a.nome);
      return 0;
    });

  return (
    <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
      <MenuLateral />
      <div className="flex-1">
        <Header />
        <main className="p-6 font-sans space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 h-full">
                <h2 className="text-xl font-bold mb-4">Alunos Ativos</h2>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Pesquisar aluno"
                    className="flex-1 border border-gray-300 rounded-md p-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Popover
                    placement="bottom"
                    trigger="click"
                    content={
                      <div className="p-4 space-y-4">
                        <div className="flex gap-2">
                          <Button
                            color={sortOrder === "A-Z" ? "blue" : "gray"}
                            onClick={() =>
                              setSortOrder((prev) => (prev === "A-Z" ? null : "A-Z"))
                            }
                          >
                            A-Z
                          </Button>
                          <Button
                            color={sortOrder === "Z-A" ? "blue" : "gray"}
                            onClick={() =>
                              setSortOrder((prev) => (prev === "Z-A" ? null : "Z-A"))
                            }
                          >
                            Z-A
                          </Button>
                        </div>
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
                <div className="space-y-4 overflow-y-auto max-h-[620px]">

                  {filteredAlunos.map((aluno) => (
                    <div
                      key={aluno.id}
                      className="relative flex items-center justify-between bg-white rounded-md shadow-sm p-4 gap-4 w-full hover:bg-gray-50 cursor-pointer"
                      onClick={() => redirectToPerfilAluno(aluno.id)}
                    >
                      <Avatar img={aluno.avatar} rounded />

                      <div className="flex-1">
                        <p className="font-bold text-md">{aluno.nome}</p>
                        <p className="text-sm text-gray-600">Objetivo: {aluno.objetivo}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <HiOutlineClock className="w-4 h-4" />
                          {aluno.telefone}
                        </p>
                      </div>

                      {/* Botão + menu */}
                      <div className="flex justify-end items-center">
                        <div className="relative" ref={buttonRef}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card click event
                              setOpenMenuId(openMenuId === aluno.id ? null : aluno.id);
                            }}
                            className="flex items-center justify-center w-8 h-8 rounded-[5px] bg-gray-200 hover:bg-gray-300 transition duration-200"
                          >
                            <FaEllipsisV className="text-xl cursor-pointer" />
                          </button>

                          {openMenuId === aluno.id && (
                            <div
                              ref={menuRef}
                              onClick={(e) => e.stopPropagation()} // Prevent card click event
                              className="absolute top-0 right-full mr-2 z-50 bg-white border border-gray-200 rounded-md shadow-lg p-2"
                            >
                              <AlunoActionsMenu aluno={aluno} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  ))}
                </div>
              </div>
            </div>

            {/* Seção Direita: Widgets */}
            <div className="space-y-4 max-h-full">
              <div className="bg-white rounded-xl shadow-sm p-6 h-1/2">
                <h2 className="text-lg font-bold mb-4">
                  Presença de alunos por:
                </h2>
                <Dropdown label={filter} inline className="mb-4">
                  <DropdownItem onClick={() => setFilter("Semana")}>Semana</DropdownItem>
                  <DropdownItem onClick={() => setFilter("Mês")}>Mês</DropdownItem>
                </Dropdown>
                <div className="space-y-2 overflow-y-auto max-h-[250px]">
                  {/* Conteúdo do widget */}
                  {filteredAlunos.map((aluno) => (
                    <div
                      key={aluno.id}
                      className="relative flex items-center justify-between bg-white rounded-md shadow-sm p-4 gap-4 w-full"
                    >
                      <Avatar img={aluno.avatar} rounded />

                      <div className="flex-1">
                        <p className="font-bold text-md">{aluno.nome} não treinou essa semana</p>
                        <p className="text-sm text-gray-600">Frequência determinada: {aluno.frequenciaSemanal}x por semana</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 h-1/2">
                <h2 className="text-lg font-bold mb-4">
                  Alunos com o plano perto do fim:
                </h2>
                <div className="space-y-2 overflow-y-auto max-h-[270px]">
                  {/* Conteúdo do widget */}
                  {filteredAlunos.map((aluno) => (
                    <div
                      key={aluno.id}
                      className="relative flex items-center justify-between bg-white rounded-md shadow-sm p-4 gap-4 w-full"
                    >
                      <Avatar img={aluno.avatar} rounded />

                      <div className="flex-1">
                        <p className="font-bold text-md">{aluno.nome} não treinou essa semana</p>
                        <p className="text-sm text-gray-600">{aluno.aulasRestantes} aulas restantes</p>
                      </div>
                    </div>

                  ))}
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
