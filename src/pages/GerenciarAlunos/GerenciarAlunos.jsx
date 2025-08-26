import React, { useEffect, useState } from "react";
import { isSameWeek, isSameMonth, parse } from "date-fns";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import Header from "../../components/Personal/Header/Header";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Utils/Modal";
import iconCancelar from "../../assets/images/cancelar.png";
import MenuFiltro from "../../components/Utils/MenuFiltro";
import CardAluno from "../../components/Utils/GerenciarAlunos/CardAluno";
import WidgetPresencaAlunos from "../../components/Utils/GerenciarAlunos/WidgetPresencaAluno";
import WidgetAlunosPlano from "../../components/Utils/GerenciarAlunos/WidgetAlunosPlano";
import { caringuApi } from "../../provider/caringuApi";
import FormularioAnamnese from "../../components/Utils/GerenciarAlunos/FormularioAnamnese";
import toast, { Toaster } from "react-hot-toast";
import CustomToast from "../../components/Utils/CustomToast";
import Pagination from "../../components/Utils/Pagination";

const GerenciarAlunos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("SEMANA");
  const [valorSelecionado, setValorSelecionado] = useState("Semana");
  const [sortOrder, setSortOrder] = useState(null); // A-Z or Z-A
  const [anamnesesPendentes, setAnamnesesPendentes] = useState(false);
  const [aguardandoTreino, setAguardandoTreino] = useState(false);
  const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [alunosCards, setAlunosCards] = useState([]); // Para os cards (paginados)
  const [alunosCompletos, setAlunosCompletos] = useState([]); // Para os widgets (todos)

  const [totalElements, setTotalElements] = useState(0);
  const [totalPagesAPI, setTotalPagesAPI] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (window.innerWidth >= 1536) return 4;
    if (window.innerWidth >= 768) return 2;
    return 1;
  });

  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] = useState(null);

  const [respostasBack, setRespostasBack] = useState({});
  const [alunoAtual, setAlunoAtual] = useState(null);
  const [imgErro, setImgErro] = useState(false);

  const handleOpenModal = (aluno) => {
    setAlunoAtual(aluno)
    setShowCreateModal(true);
    setOpenMenuId(null)
  };

  const handleRadioChange = (id, value) => {
    setRespostas(prev => ({ ...prev, [id]: value }));
  };


  const now = new Date();

  const alunosFiltrados = alunosCompletos
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

  // const { register, handleSubmit, formState: { errors, isSubmitted }, setValue, trigger } = useForm({
  //   defaultValues: {
  //     plano: "",
  //     duracao: "",
  //     preco: "",
  //     aulas: ""
  //   },
  //   mode: "onChange"
  // });

  useEffect(() => {
    const KpiAlunoSelecionada = sessionStorage.getItem("KPI_ALUNO_SELECIONADA");

    if (KpiAlunoSelecionada) {
      setAnamnesesPendentes(true);
    }

    sessionStorage.removeItem("KPI_ALUNO_SELECIONADA");
  }, [])

  useEffect(() => {
    const personalId = sessionStorage.getItem('pessoaId');

    const fetchData = async () => {
      try {
        const responseCompletos = await caringuApi.get(`/alunos/detalhes/personal/${personalId}`);
        setAlunosCompletos(responseCompletos.data);

        if (searchTerm || anamnesesPendentes || aguardandoTreino || sortOrder) {

          setAlunosCards(responseCompletos.data);
          setTotalElements(responseCompletos.data.length);
          setTotalPagesAPI(0); // Reset para usar paginação local
        } else {

          const responsePaginado = await caringuApi.get(`/alunos/detalhes/personal/paginado/${personalId}`, {
            params: {
              page: currentPage - 1,
              size: itemsPerPage
            }
          });

          const data = responsePaginado.data;
          setAlunosCards(data.content);
          setTotalElements(data.totalElements);
          setTotalPagesAPI(data.totalPages);
        }
      } catch (error) {
        console.error("Erro ao buscar alunos ativos:", error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, searchTerm, sortOrder, anamnesesPendentes, aguardandoTreino]);

  const handleCardClick = (alunoId) => {
    navigate(`/perfil-aluno/${alunoId}`);
  };

  const handleMenuAction = (action, aluno) => {
    switch (action) {
      case 'anamnese':
        handleOpenModal(aluno);
        break;
      case 'relatorio':
        navigate(`/relatorio-treino/${aluno.idAluno}`);
        break;
      case 'progressao':
        navigate(`/relatorios/registro-corporal/${aluno.idAluno}`);
        break;
      default:
        break;
    }
  };



  // Aplicar filtros e ordenação
  const filteredAlunos = alunosCards
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

  //Configurações de paginação
  const totalPages = searchTerm || anamnesesPendentes || aguardandoTreino || sortOrder
    ? Math.ceil(filteredAlunos.length / itemsPerPage)
    : totalPagesAPI || Math.ceil(filteredAlunos.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAlunos = searchTerm || anamnesesPendentes || aguardandoTreino || sortOrder
    ? filteredAlunos.slice(startIndex, startIndex + itemsPerPage)
    : filteredAlunos;

  useEffect(() => {
    const handleResize = () => {
      let newItemsPerPage;
      if (window.innerWidth >= 1536) {
        newItemsPerPage = 4;
      } else if (window.innerWidth >= 640) {
        newItemsPerPage = 2;
      } else {
        newItemsPerPage = 1;
      }
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder, anamnesesPendentes, aguardandoTreino]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePresencaAlunoClick = (aluno) => {
    navigate(`/perfil-aluno/${aluno.idAluno}`);
  };

  const handleFilterChange = (filterType, valorLabel) => {
    setFilter(filterType);
    setValorSelecionado(valorLabel);
  };

  function useMenuWidth() {
    const [width, setWidth] = useState(window.innerWidth >= 640 ? "280px" : "235px");

    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth >= 640 ? "280px" : "235px");
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  }

  const menuWidth = useMenuWidth();

  return (
    <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
      <MenuLateral />
      <div className="flex-1 overflow-y-auto">
        <Header />
        <main className="w-full overflow-y-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 m-6 h-full">
            <div className="col-span-3 border-2 border-[#E6E6E2] rounded-md">
              <div className="bg-[var(--cor-secundaria)] rounded-xl h-full p-6 z-10">
                <h2 className="text-xl font-bold mb-4">Alunos Ativos</h2>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Pesquisar aluno"
                    className="flex-1 border-2 border-gray-300 rounded-md p-2 w-40"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <div className="flex justify-end items-center">
                    <MenuFiltro
                      menuWidth={menuWidth}
                      buttonIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-xl cursor-pointer w-7"
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
                          icon: <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`shrink-0 w-7 ${sortOrder === "A-Z" ? "stroke-white" : "stroke-black"}`}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path d="M10.4498 6.71997L6.72974 3L3.00977 6.71997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.72949 21V3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.5498 17.2803L17.2698 21.0002L20.9898 17.2803" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.2695 3V21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>,
                          active: sortOrder === "A-Z",
                          onClick: () =>
                            setSortOrder((prev) => (prev === "A-Z" ? null : "A-Z")),
                          width: "60%",
                        },
                        {
                          id: "za",
                          label: "Z-A",
                          icon: <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`shrink-0 w-7 ${sortOrder === "Z-A" ? "stroke-white" : "stroke-black"}`}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path d="M10.4498 6.71997L6.72974 3L3.00977 6.71997" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.72949 21V3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.5498 17.2803L17.2698 21.0002L20.9898 17.2803" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.2695 3V21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>,
                          active: sortOrder === "Z-A",
                          onClick: () =>
                            setSortOrder((prev) => (prev === "Z-A" ? null : "Z-A")),
                          width: "60%",
                        },
                        {
                          id: "anamnese",
                          icon:<svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`w-7 ${anamnesesPendentes ? "stroke-white" : "stroke-[#4B5563]"}`}
                              viewBox="0 0 35 35"
                              fill="none">
                              <path d="M22.225 2.91669H12.775C7.29164 2.91669 6.86872 7.84585 9.82914 10.5292L25.1708 24.4709C28.1312 27.1542 27.7083 32.0834 22.225 32.0834H12.775C7.29164 32.0834 6.86872 27.1542 9.82914 24.4709L25.1708 10.5292C28.1312 7.84585 27.7083 2.91669 22.225 2.91669Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>,
                          label: "Anamneses Pendentes",
                          active: anamnesesPendentes,
                          onClick: () => setAnamnesesPendentes((prev) => !prev),
                        },
                        {
                          id: "treino",
                          label: "Agendamentos Pendentes",
                          icon: <svg xmlns="http://www.w3.org/2000/svg" className={`shrink-0 w-7 ${aguardandoTreino ? "stroke-white" : "stroke-[#E96E35]"}`} viewBox="0 0 35 35" fill="none">
                            <path d="M32.0833 17.5C32.0833 25.55 25.55 32.0833 17.5 32.0833C9.44996 32.0833 2.91663 25.55 2.91663 17.5C2.91663 9.45 9.44996 2.91666 17.5 2.91666C25.55 2.91666 32.0833 9.45 32.0833 17.5Z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22.9104 22.1375L18.3896 19.4396C17.6021 18.9729 16.9604 17.85 16.9604 16.9313V10.9521" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>,
                          active: aguardandoTreino,
                          onClick: () => setAguardandoTreino((prev) => !prev),
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="relative z-0 space-y-2 border-2 sm:h-[600px] lg:h-[85%] h-[500px] border-gray-200 rounded-md p-4">

                  {filteredAlunos.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Nenhum aluno encontrado
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 h-[90%]">
                      {currentAlunos.map((aluno) => (
                        <CardAluno
                          key={aluno.idAluno}
                          aluno={aluno}
                          onCardClick={handleCardClick}
                          onMenuAction={handleMenuAction}
                          openMenuId={openMenuId}
                          setOpenMenuId={setOpenMenuId}
                          imgErro={imgErro}
                          setImgErro={setImgErro}
                          totalCards={currentAlunos.length}
                        />
                      ))}
                    </div>
                  )}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsLength={filteredAlunos.length}
                    onPageChange={goToPage}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    maxVisible={3}
                  />
                </div>
              </div>
            </div >

            {/* Seção Direita: Widgets */}
            <div className="gap-5 flex flex-col col-span-2" >

              <WidgetPresencaAlunos
                valorSelecionado={valorSelecionado}
                filter={filter}
                alunosAtivos={alunosCompletos}
                alunosFiltrados={alunosFiltrados}
                imgErro={imgErro}
                setImgErro={setImgErro}
                onFilterChange={handleFilterChange}
                onAlunoClick={handlePresencaAlunoClick}
              />

              <WidgetAlunosPlano
                alunosAtivos={alunosCompletos}
                imgErro={imgErro}
                setImgErro={setImgErro}
              />

              {showCreateModal && alunoAtual && (
                <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto h-full">
                  <div className="absolute inset-0 bg-[#000000] opacity-50" aria-label="Fundo Escurecido" />
                  <div className="relative p-4 w-full max-w-2xl">
                    <div className="relative bg-[var(--cor-secundaria)] rounded-lg shadow p-4 sm:p-10 max-h-[80vh] flex flex-col">
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
                              toast.custom((t) => (
                                <CustomToast t={t} type="success" message="Anamnese atualizada com sucesso!" />
                              ));

                              setTimeout(() => {
                                window.location.reload(true);
                              }, 1000);

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
            </div >
          </div >
        </main >
      </div >
    </div >
  );
};

export default GerenciarAlunos;
