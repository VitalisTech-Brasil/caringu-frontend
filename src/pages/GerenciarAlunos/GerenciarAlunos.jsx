import React, { useEffect, useRef, useState } from "react";
import { HiOutlineClock } from "react-icons/hi";
import { FaEllipsisV } from "react-icons/fa";
import { Avatar, Dropdown, Button, Popover, DropdownItem } from "flowbite-react";
import { isSameWeek, isSameMonth, parse } from "date-fns";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import Header from "../../components/Personal/Header/Header";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Utils/Modal";
import lixeira from "../../assets/images/trash.png";
import iconCancelar from "../../assets/images/cancelar.png";
import { useForm } from "react-hook-form";
import MenuFiltro from "../../components/Utils/MenuFiltro";

import { caringuApi } from "../../provider/caringuApi";
import MascaraTelefone from "../../components/Utils/Functions/MascaraTelefone";
import FormularioAnamnese from "../../components/Utils/GerenciarAlunos/FormularioAnamnese";
import toast, { Toaster } from "react-hot-toast";

const GerenciarAlunos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("SEMANA");
  const [valorSelecionado, setValorSelecionado] = useState("Semana");
  const [sortOrder, setSortOrder] = useState(null); // A-Z or Z-A
  const [anamnesesPendentes, setAnamnesesPendentes] = useState(false);
  const [aguardandoTreino, setAguardandoTreino] = useState(false);
  const [modalDeletarVisivel, setModalDeletarVisivel] = useState(false);
  const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] = useState(null);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonRefFilter = useRef(null);

  const [respostas, setRespostas] = useState({});
  const [respostasBack, setRespostasBack] = useState({});
  const [alunosAtivos, setAlunosAtivos] = useState([]);
  const [respostasPorAluno, setRespostasPorAluno] = useState({});
  const [alunoAtual, setAlunoAtual] = useState(null)

  const handleOpenModal = (aluno) => {
    setAlunoAtual(aluno)
    setShowCreateModal(true);
    setOpenMenuId(null)
  };

  const handleRadioChange = (id, value) => {
    setRespostas(prev => ({ ...prev, [id]: value }));
  };

  const rect = buttonRefFilter.current?.getBoundingClientRect();

  const now = new Date();

  const alunosFiltrados = alunosAtivos
    .filter((aluno) => aluno.frequenciaTreino != null)
    .map((aluno) => {
      const horarios = Array.isArray(aluno.horariosFimTotal) ? aluno.horariosFimTotal : [];

      const treinosSemana = horarios.filter((h) => {
        if (!h || typeof h !== "string") return false;
        try {
          const data = parse(h, "yyyy-MM-dd HH:mm", new Date());
          return isSameWeek(data, now, { weekStartsOn: 1 });
        } catch {
          return false;
        }
      }).length;

      const treinosMes = horarios.filter((h) => {
        if (!h || typeof h !== "string") return false;
        try {
          const data = parse(h, "yyyy-MM-dd HH:mm", new Date());
          return isSameMonth(data, now);
        } catch {
          return false;
        }
      }).length;

      return {
        ...aluno,
        treinosSemanaCalculado: treinosSemana,
        treinosMesCalculado: treinosMes,
      };
    });

  const { register, handleSubmit, formState: { errors, isSubmitted }, setValue, trigger } = useForm({
    defaultValues: {
      plano: "",
      duracao: "",
      preco: "",
      aulas: ""
    },
    mode: "onChange"
  });

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

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openMenuId]);

  useEffect(() => {
    const personalId = sessionStorage.getItem('pessoaId');

    const fetchData = async () => {
      try {
        const response = await caringuApi.get(`/alunos/detalhes/personal/${personalId}`);
        const aluno = response.data;

        setAlunosAtivos(aluno);
        console.log(aluno);

      } catch (error) {
        console.error("Erro ao buscar alunos ativos:", error);
      }
    };

    fetchData();
  }, []);

  // Componente do menu de ações do aluno
  const AlunoActionsMenu = ({ aluno }) => (
    <div className="flex flex-col text-sm font-medium min-w-[160px] max-w-[220px] w-full">
      <button
        className="flex items-center justify-between gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer"
        onClick={() => handleOpenModal(aluno)}
      >
        <span className="truncate">
          {aluno.idAnamnese ? 'Editar Anamnese' : 'Criar Anamnese'}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z" fill="#738CAB" />
          <path d="M19.0201 3.47967C17.0801 1.53967 15.1801 1.48967 13.1901 3.47967L11.9801 4.68967C11.8801 4.78967 11.8401 4.94967 11.8801 5.08967C12.6401 7.73967 14.7601 9.85967 17.4101 10.6197C17.4501 10.6297 17.4901 10.6397 17.5301 10.6397C17.6401 10.6397 17.7401 10.5997 17.8201 10.5197L19.0201 9.30967C20.0101 8.32967 20.4901 7.37967 20.4901 6.41967C20.5001 5.42967 20.0201 4.46967 19.0201 3.47967Z" fill="#738CAB" />
          <path d="M15.6098 11.5298C15.3198 11.3898 15.0398 11.2498 14.7698 11.0898C14.5498 10.9598 14.3398 10.8198 14.1298 10.6698C13.9598 10.5598 13.7598 10.3998 13.5698 10.2398C13.5498 10.2298 13.4798 10.1698 13.3998 10.0898C13.0698 9.8098 12.6998 9.4498 12.3698 9.0498C12.3398 9.0298 12.2898 8.9598 12.2198 8.8698C12.1198 8.7498 11.9498 8.5498 11.7998 8.3198C11.6798 8.1698 11.5398 7.9498 11.4098 7.7298C11.2498 7.4598 11.1098 7.1898 10.9698 6.9098C10.9486 6.86441 10.9281 6.81924 10.9083 6.77434C10.7607 6.44102 10.3261 6.34358 10.0683 6.60133L4.33983 12.3298C4.20983 12.4598 4.08983 12.7098 4.05983 12.8798L3.51983 16.7098C3.41983 17.3898 3.60983 18.0298 4.02983 18.4598C4.38983 18.8098 4.88983 18.9998 5.42983 18.9998C5.54983 18.9998 5.66983 18.9898 5.78983 18.9698L9.62983 18.4298C9.80983 18.3998 10.0598 18.2798 10.1798 18.1498L15.9011 12.4285C16.1607 12.1689 16.0628 11.7235 15.7252 11.5794C15.6872 11.5632 15.6488 11.5467 15.6098 11.5298Z" fill="#738CAB" />
        </svg>
      </button>
      <button className="flex items-center justify-between gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer" onClick={() => redirectToRelatorio(aluno.idAluno)}>
        <span className="truncate">
          Ver relatórios
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16.5 9.5L12.3 13.7L10.7 11.3L7.5 14.5" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 9.5H16.5V11.5" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#E96E35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {/* <button className="flex items-center justify-between gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer " onClick={() => navigate(`/criar-treino`)}>

        <span className="truncate">
          Cadastrar treino
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#15171B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12H16" stroke="#15171B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 16V8" stroke="#15171B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button> */}
      <button className="flex items-center justify-between gap-2 p-2 hover:text-gray-900 hover:bg-gray-100 rounded text-left cursor-pointer" onClick={() => navigate(`/relatorios/registro-corporal/${aluno.idAluno}`)}>
        <span className="truncate">
          Progressão corporal
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2.77017 18.25C2.89017 20.31 4.00017 22 6.76017 22H17.2402C20.0002 22 21.1002 20.31 21.2302 18.25L21.7502 9.99C21.8902 7.83 20.1702 6 18.0002 6C17.3902 6 16.8302 5.65 16.5502 5.11L15.8302 3.66C15.3702 2.75 14.1702 2 13.1502 2H10.8602C9.83017 2 8.63017 2.75 8.17017 3.66L7.45017 5.11C7.17017 5.65 6.61017 6 6.00017 6C3.83017 6 2.11017 7.83 2.25017 9.99L2.51017 14.06" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5002 8H13.5002" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.0002 18C13.7902 18 15.2502 16.54 15.2502 14.75C15.2502 12.96 13.7902 11.5 12.0002 11.5C10.2102 11.5 8.75018 12.96 8.75018 14.75C8.75018 16.54 10.2102 18 12.0002 18Z" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
      if (anamnesesPendentes && aluno.idAnamnese) return false;
      if (aguardandoTreino && aluno.idAlunoTreino) return false;
      if (searchTerm && !aluno.nomeAluno.toLowerCase().includes(searchTerm.toLowerCase()))
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.nomeAluno.localeCompare(b.nomeAluno);
      if (sortOrder === "Z-A") return b.nomeAluno.localeCompare(a.nomeAluno);
      return 0;
    });

  return (
    <div className="flex min-h-screen bg-[#fdfbf7]">
      <MenuLateral />
      <div className="flex-1 overflow-y-auto">
        <Header />
        <main className="w-full overflow-y-auto max-h-screen">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 m-8">
            <div className="col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-6 h-[84.5vh] ">
                <h2 className="text-xl font-bold mb-4">Alunos Ativos</h2>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Pesquisar aluno"
                    className="flex-1 border border-gray-300 rounded-md p-2 w-40"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <div className="flex justify-end items-center">
                    <MenuFiltro
                      buttonIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-xl cursor-pointer w-6"
                          viewBox="0 0 35 35"
                          fill="none"
                        >
                          <path
                            d="M7.87504 3.0625H27.125C28.7292 3.0625 30.0417 4.375 30.0417 5.97917V9.1875C30.0417 10.3542 29.3125 11.8125 28.5834 12.5417L22.3125 18.0833C21.4375 18.8125 20.8542 20.2708 20.8542 21.4375V27.7083C20.8542 28.5833 20.2709 29.75 19.5417 30.1875L17.5 31.5C15.6042 32.6667 12.9792 31.3542 12.9792 29.0208V21.2917C12.9792 20.2708 12.3959 18.9583 11.8125 18.2292L6.27087 12.3958C5.54171 11.6667 4.95837 10.3542 4.95837 9.47917V6.125C4.95837 4.375 6.27087 3.0625 7.87504 3.0625Z"
                            stroke="#1D2D44"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.9396 3.0625L8.75 14.5833"
                            stroke="#1D2D44"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                      options={[
                        {
                          id: "az",
                          label: "A-Z",
                          active: sortOrder === "A-Z",
                          onClick: () =>
                            setSortOrder((prev) => (prev === "A-Z" ? null : "A-Z")),
                          width: "40%",
                        },
                        {
                          id: "za",
                          label: "Z-A",
                          active: sortOrder === "Z-A",
                          onClick: () =>
                            setSortOrder((prev) => (prev === "Z-A" ? null : "Z-A")),
                          width: "40%",
                        },
                        {
                          id: "anamnese",
                          label: "Anamneses Pendentes",
                          active: anamnesesPendentes,
                          onClick: () => setAnamnesesPendentes((prev) => !prev),
                        },
                        {
                          id: "treino",
                          label: "Aguardando Treino",
                          active: aguardandoTreino,
                          onClick: () => setAguardandoTreino((prev) => !prev),
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="relative z-0 space-y-2 overflow-y-auto max-h-[65vh] md:max-h-[67vh]  border h-full border-gray-200 rounded-md p-4">

                  {filteredAlunos.map((aluno) => (

                    <div
                      key={aluno.idAluno}
                      className="relative flex items-center justify-between bg-white rounded-md p-4 gap-4 w-full hover:bg-gray-50 cursor-pointer border border-gray-200 transition duration-200"
                      onClick={() => redirectToPerfilAluno(aluno.idAluno)}
                    >
                      <Avatar img={aluno.avatar} rounded />

                      <div className="flex-1">
                        <p className="font-bold text-md">{aluno.nomeAluno}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-0.5">
                          {aluno.objetivoTreino ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 28 28" fill="none">
                                <path d="M14.175 19.25V21.7" stroke="#748CAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.34155 25.6667H20.0082V24.5C20.0082 23.2167 18.9582 22.1667 17.6749 22.1667H10.6749C9.39155 22.1667 8.34155 23.2167 8.34155 24.5V25.6667V25.6667Z" fill="#748CAB" />
                                <path d="M7.17505 25.6667H21.175" stroke="#748CAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M13.9999 18.6666C9.48492 18.6666 5.83325 15.015 5.83325 10.5V6.99998C5.83325 4.42165 7.92159 2.33331 10.4999 2.33331H17.4999C20.0783 2.33331 22.1666 4.42165 22.1666 6.99998V10.5C22.1666 15.015 18.5149 18.6666 13.9999 18.6666Z" fill="#748CAB" />
                                <path d="M6.38155 13.5917C5.50655 13.3117 4.73655 12.7983 4.12988 12.1917C3.07988 11.025 2.37988 9.62501 2.37988 7.99168C2.37988 6.35835 3.66322 5.07501 5.29655 5.07501H6.05488C5.82155 5.61168 5.70488 6.20668 5.70488 6.82501V10.325C5.70488 11.4917 5.94988 12.5883 6.38155 13.5917Z" stroke="#748CAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21.6184 13.5917C22.4934 13.3117 23.2634 12.7983 23.8701 12.1917C24.9201 11.025 25.6201 9.62501 25.6201 7.99168C25.6201 6.35835 24.3367 5.07501 22.7034 5.07501H21.9451C22.1784 5.61168 22.2951 6.20668 22.2951 6.82501V10.325C22.2951 11.4917 22.0501 12.5883 21.6184 13.5917Z" stroke="#748CAB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="text-sm text-gray-600">Objetivo: {aluno.objetivoTreino}</span>
                            </>
                          ) : (
                            <>
                              <HiOutlineClock className="w-4 h-4 text-[#4B5563]" />
                              <span className="text-sm">Anamnese pendente</span>
                            </>
                          )
                          }
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 28 28" fill="none">
                            <path d="M25.6316 21.385C25.6316 21.805 25.5383 22.2366 25.3399 22.6566C25.1416 23.0766 24.8849 23.4733 24.5466 23.8466C23.9749 24.4766 23.3449 24.9316 22.6333 25.2233C21.9333 25.515 21.1749 25.6666 20.3583 25.6666C19.1683 25.6666 17.8966 25.3866 16.5549 24.815C15.2133 24.2433 13.8716 23.4733 12.5416 22.505C11.1999 21.525 9.92825 20.44 8.71492 19.2383C7.51325 18.025 6.42825 16.7533 5.45992 15.4233C4.50325 14.0933 3.73325 12.7633 3.17325 11.445C2.61325 10.115 2.33325 8.84331 2.33325 7.62998C2.33325 6.83665 2.47325 6.07831 2.75325 5.37831C3.03325 4.66665 3.47659 4.01331 4.09492 3.42998C4.84159 2.69498 5.65825 2.33331 6.52159 2.33331C6.84825 2.33331 7.17492 2.40331 7.46659 2.54331C7.76992 2.68331 8.03825 2.89331 8.24825 3.19665L10.9549 7.01165C11.1649 7.30331 11.3166 7.57165 11.4216 7.82831C11.5266 8.07331 11.5849 8.31831 11.5849 8.53998C11.5849 8.81998 11.5033 9.09998 11.3399 9.36831C11.1883 9.63665 10.9666 9.91665 10.6866 10.1966L9.79992 11.1183C9.67158 11.2466 9.61325 11.3983 9.61325 11.585C9.61325 11.6783 9.62492 11.76 9.64825 11.8533C9.68325 11.9466 9.71825 12.0166 9.74159 12.0866C9.95159 12.4716 10.3133 12.9733 10.8266 13.58C11.3516 14.1866 11.9116 14.805 12.5183 15.4233C13.1483 16.0416 13.7549 16.6133 14.3733 17.1383C14.9799 17.6516 15.4816 18.0016 15.8783 18.2116C15.9366 18.235 16.0066 18.27 16.0883 18.305C16.1816 18.34 16.2749 18.3516 16.3799 18.3516C16.5783 18.3516 16.7299 18.2816 16.8583 18.1533L17.7449 17.2783C18.0366 16.9866 18.3166 16.765 18.5849 16.625C18.8533 16.4616 19.1216 16.38 19.4133 16.38C19.6349 16.38 19.8683 16.4266 20.1249 16.5316C20.3816 16.6366 20.6499 16.7883 20.9416 16.9866L24.8033 19.7283C25.1066 19.9383 25.3166 20.1833 25.4449 20.475C25.5616 20.7666 25.6316 21.0583 25.6316 21.385Z" fill="#748CAB" />
                          </svg>
                          {MascaraTelefone(aluno.celular)}
                        </p>
                      </div>

                      {/* Botão + menu */}
                      <div className="flex justify-end items-center">
                        <div className="relative" ref={buttonRef}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card click event
                              setOpenMenuId(openMenuId === aluno.idAluno ? null : aluno.idAluno);
                            }}
                            className="flex items-center justify-center w-8 h-8 rounded-[5px] bg-gray-200 hover:bg-gray-300 transition duration-200"
                          >
                            <FaEllipsisV className="text-xl cursor-pointer" />
                          </button>

                          {openMenuId === aluno.idAluno && (
                            <div
                              ref={menuRef}
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 mt-2 z-[9999] bg-white border border-gray-200 rounded-md shadow-lg p-2 min-w-[160px]"
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
            </div >

            {/* Seção Direita: Widgets */}
            < div className="max-h-[84.5vh] gap-5 flex flex-col col-span-2" >
              <div className="bg-white rounded-xl shadow-sm p-6 h-1/2 ">
                <h2 className="text-lg font-bold mb-4">
                  Presença de alunos por:
                </h2>
                <Dropdown label={valorSelecionado} inline>
                  <DropdownItem onClick={() => { setFilter("SEMANA"), setValorSelecionado("Semana") }}>Semana</DropdownItem>
                  <DropdownItem onClick={() => { setFilter("MES"), setValorSelecionado("Mês") }}>Mês</DropdownItem>
                </Dropdown>
                <div className="space-y-2 overflow-y-auto border border-[#E6E6E2] rounded-md mt-2 max-h-[70%]">
                  {/* Conteúdo do widget */}
                  {alunosAtivos.length == 0 && (
                    <div className="flex justify-center">
                      Sem alunos no momento.
                    </div>
                  )}

                  {alunosFiltrados.length > 0 && (
                    <>
                      {alunosFiltrados.map((aluno) => {
                        // Calcula a frequência mensal com base na frequência semanal (ou null/0)
                        const frequenciaMediaMensal = aluno.frequenciaTreino
                          ? Math.round(aluno.frequenciaTreino * 52 / 12)
                          : 0;

                        return (
                          <div
                            key={aluno.idAluno}
                            className="relative flex items-center justify-between bg-white rounded-md shadow-sm p-4 gap-4 w-full"
                          >
                            <Avatar img={aluno.avatar} rounded />

                            {filter === "SEMANA" && (
                              <div className="flex-1">
                                <p className="font-bold text-md">
                                  {aluno.nomeAluno} {aluno.treinosSemanaCalculado === 0 ? "não treinou" : `treinou ${aluno.treinosSemanaCalculado}x`} essa semana
                                </p>
                                <p className="text-sm text-gray-600">
                                  Frequência determinada: {aluno.frequenciaTreino}x por semana
                                </p>
                              </div>
                            )}

                            {filter === "MES" && (
                              <div className="flex-1">
                                <p className="font-bold text-md">
                                  {aluno.nomeAluno} {aluno.treinosMesCalculado === 0 ? "não treinou" : `treinou ${aluno.treinosMesCalculado}x`} esse mês
                                </p>
                                <p className="text-sm text-gray-600">
                                  Frequência determinada: {frequenciaMediaMensal}x por mês
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex-1 overflow-hidden">
                <h2 className="text-lg font-bold mb-4">
                  Alunos com o plano perto do fim:
                </h2>
                <div className="space-y-2 overflow-y-auto max-h-full border border-[#E6E6E2] rounded-md">
                  {/* Conteúdo do widget */}
                  {[...alunosAtivos]
                    .filter(
                      (aluno) => aluno.totalAulasContratadas - aluno.treinosTotal > 0
                    )
                    .sort((a, b) => {
                      const aulasRestantesA = a.totalAulasContratadas - a.treinosTotal;
                      const aulasRestantesB = b.totalAulasContratadas - b.treinosTotal;
                      return aulasRestantesA - aulasRestantesB;
                    })
                    .map((aluno) => (
                      <div
                        key={aluno.idAluno}
                        className="relative flex items-center justify-between bg-white border border-[#E6E6E2] p-4 gap-4 m-4"
                      >
                        <Avatar img={aluno.avatar} rounded />

                        <div className="flex-1">
                          <p className="font-bold text-md">{aluno.nomeAluno}</p>
                          <p className="text-sm text-gray-600">
                            {aluno.totalAulasContratadas - aluno.treinosTotal} aulas restantes
                          </p>
                        </div>
                      </div>
                    ))}

                  {showCreateModal && alunoAtual && (
                    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
                      <div className="absolute inset-0 bg-[#000000] opacity-50" aria-label="Fundo Escurecido" />
                      <div className="relative p-4 w-full max-w-2xl">
                        <div className="relative bg-[var(--cor-secundaria)] rounded-lg shadow sm:p-10 max-h-[80vh] flex flex-col">
                          <div className="flex justify-between items-center pb-4 mb-4">
                            <div>
                              <h1 className="text-4xl font-semibold text-[var(--cor-primaria)]">Anamnese</h1>
                              <div className="flex gap-3 mt-2">
                                <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9.58984 11C12.3513 11 14.5898 8.76142 14.5898 6C14.5898 3.23858 12.3513 1 9.58984 1C6.82842 1 4.58984 3.23858 4.58984 6C4.58984 8.76142 6.82842 11 9.58984 11Z" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M18.18 21C18.18 17.13 14.33 14 9.59 14C4.85 14 1 17.13 1 21" stroke="#1D2D44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p>{alunoAtual.nomeAluno}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setModalConfirmarCancelarVisivel(true)
                              }}
                              className="bg-[#B41F1F] text-[var(--cor-secundaria)] rounded-lg text-xs sm:text-sm cursor-pointer w-10 h-10 md:w-13 md:h-13 inline-flex justify-center items-center absolute top-2 right-2"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          <FormularioAnamnese
                            aluno={alunoAtual}
                            respostasBack={respostasBack}
                            onSubmit={async (data) => {
                              try {
                                const alunoId = alunoAtual.idAluno;
                                const idAnamnese = alunoAtual.idAnamnese;

                                // 1. Separa os campos físicos
                                const dadosFisicos = {
                                  peso: parseFloat(data.peso),
                                  altura: parseFloat(data.altura),
                                  nivelAtividade: data.nivelAtividade,
                                  nivelExperiencia: data.nivelExperiencia
                                };

                                // 2. Separa os campos da anamnese
                                const dadosAnamnese = {
                                  objetivoTreino: data.objetivo,
                                  frequenciaTreino: data.frequencia,
                                  fumante: data.fumante === 'true',
                                  desconforto: data.desconforto === 'true',
                                  desconfortoDescricao: data.desconfortoDescricao || null,
                                  lesao: data.lesao === 'true',
                                  lesaoDescricao: data.lesaoDescricao || null,
                                  experiencia: data.experiencia === 'true',
                                  experienciaDescricao: data.experienciaDescricao || null,
                                  proteses: data.proteses === 'true',
                                  protesesDescricao: data.protesesDescricao || null,
                                  doencaMetabolica: data.doencaMetabolica === 'true',
                                  doencaMetabolicaDescricao: data.doencaMetabolicaDescricao || null,
                                  deficiencia: data.deficiencia === 'true',
                                  deficienciaDescricao: data.deficienciaDescricao || null
                                };

                                // 3. Atualiza dados físicos do aluno (sempre)
                                await caringuApi.patch(`/alunos/${alunoId}/dados-fisicos`, dadosFisicos);

                                // 4. Criação ou edição da anamnese
                                if (idAnamnese) {
                                  // Edição
                                  await caringuApi.patch(`/anamnese/${idAnamnese}`, dadosAnamnese);
                                  toast.success("Anamnese atualizada com sucesso!");
                                  window.location.reload(true);
                                } else {
                                  // Criação
                                  await caringuApi.post(`/anamnese`, { alunoId, ...dadosAnamnese });
                                  toast.success("Anamnese criada com sucesso!");
                                  window.location.reload(true);
                                }

                                setShowCreateModal(false);

                              } catch (error) {
                                console.error("Erro ao salvar anamnese:", error);
                                toast.error("Erro ao salvar anamnese. Tente novamente.");
                              }
                            }}
                            onCancelar={() => setModalConfirmarCancelarVisivel(true)}
                          />

                        </div>
                      </div>
                    </div>
                  )}

                  <Toaster position="top-right" reverseOrder={false} />
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
                    }}
                    icone={iconCancelar}
                    textoBotaoConfirmar="Voltar"
                    textoBotaoCancelar="Cancelar mesmo assim"
                    aria-label="Modal de Cancelamento"
                  />
                </div>
              </div>
            </div >
          </div >
        </main >
      </div >
    </div >
  );
};

export default GerenciarAlunos;
