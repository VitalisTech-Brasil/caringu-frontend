import { useState, useEffect, useRef } from "react";
import { HiOutlineFilter, HiOutlineSearch } from "react-icons/hi";
import { FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";
import Header from "../components/Personal/Header/Header";
import Button from "../components/Utils/Button";
import { useNavigate } from "react-router-dom";
import Label from "../components/Utils/Label";
import InputPosLogin from "../components/Utils/InputPosLogin";
import { useForm } from "react-hook-form";
import { caringuApi } from "../provider/caringuApi";
import MascaraTelefone from "../components/Utils/Functions/MascaraTelefone";
import axios from "axios";

const ProcurandoPersonal = () => {

  const { register, handleSubmit, formState: { errors, isSubmitted }, setValue, trigger, reset } = useForm();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCards, setExpandedCards] = useState([]);
  const { fontSize, width } = useResponsiveStyles();
  const [allTrainers, setAllTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const sugestaoRef = useRef(null);
  const [cidadeQuery, setCidadeQuery] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [todasCidadesSP, setTodasCidadesSP] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [bairroQuery, setBairroQuery] = useState("");
  const [bairroSugestoes, setBairroSugestoes] = useState([]);
  const [bairrosSelecionados, setBairrosSelecionados] = useState([]); const [especialidades, setEspecialidades] = useState([]);
  const [especialidadeQuery, setEspecialidadeQuery] = useState("");
  const [especialidadeSugestoes, setEspecialidadeSugestoes] = useState([]);
  const [errosImagem, setErrosImagem] = useState({});


  useEffect(() => {
  const filtrosSalvos = localStorage.getItem("filtrosPersonal");
  if (filtrosSalvos) {
    setAppliedFilters(JSON.parse(filtrosSalvos));
    setDraftFilters(JSON.parse(filtrosSalvos));
  }
}, []);

  useEffect(() => {
    const fetchCidadesSP = async () => {
      try {
        const response = await axios.get(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios"
        );
        const nomesCidades = response.data.map((cidade) => cidade.nome);
        setTodasCidadesSP(nomesCidades);
      } catch (error) {
        console.error("Erro ao buscar cidades do IBGE:", error);
      }
    };

    fetchCidadesSP();
  }, []);

  useEffect(() => {
    if (!bairroQuery || bairroQuery.trim().length < 2) {
      setBairroSugestoes([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(bairroQuery)},São Paulo,Brasil&format=json&polygon_geojson=1`
        );
        const bairros = response.data
          .filter(item =>
            item.type === "suburb" || item.type === "neighbourhood"
          )
          .map(item => item.display_name.split(",")[0].trim());
        setBairroSugestoes([...new Set(bairros)]);
      } catch (error) {
        setBairroSugestoes([]);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [bairroQuery]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const response = await caringuApi.get("/especialidades");
        setEspecialidades(response.data);
      } catch (error) {
        console.error("Erro ao buscar especialidades:", error);
      }
    };

    fetchEspecialidades();
  }, []);

  useEffect(() => {
    if (!especialidadeQuery || especialidadeQuery.trim().length < 2) {
      setEspecialidadeSugestoes([]);
      return;
    }
    const filtro = especialidadeQuery.toLowerCase();
    const filtradas = especialidades.filter(e =>
      e.nome.toLowerCase().includes(filtro)
    );
    setEspecialidadeSugestoes(filtradas);
  }, [especialidadeQuery, especialidades])

  const handleInputChange = (e) => {
    if (e.target.name === "cidade") {
      setCidadeQuery(e.target.value);
    }
  };

  const handleSelectBairro = (bairro) => {
    if (!draftFilters.bairrosSelecionados.includes(bairro)) {
      setDraftFilters((prev) => ({
        ...prev,
        bairrosSelecionados: [...prev.bairrosSelecionados, bairro],
      }));
    }
    setValue("bairro", "");
    setBairroQuery("");
    setBairroSugestoes([]);
  };


  const handleRemoveBairro = (bairro) => {
    setDraftFilters((prev) => ({
      ...prev,
      bairrosSelecionados: prev.bairrosSelecionados.filter((b) => b !== bairro),
    }));
  };

  const handleEspecialidadeInputChange = (e) => {
    setEspecialidadeQuery(e.target.value);
  };

  const handleBairroInputChange = (e) => {
    setBairroQuery(e.target.value);
  };

  const handleGeneroChange = (e) => {
    const value = e.target.value;
    if (value === "TODOS") {
      setDraftFilters((prev) => ({
        ...prev,
        generosSelecionados: ["TODOS"],
      }));
    } else {
      setDraftFilters((prev) => {
        let filtered = prev.generosSelecionados.filter((g) => g !== "TODOS");
        if (filtered.includes(value)) {
          return { ...prev, generosSelecionados: filtered.filter((g) => g !== value) };
        } else {
          return { ...prev, generosSelecionados: [...filtered, value] };
        }
      });
    }
  };


  const handleRemoveGenero = (genero) => {
    setDraftFilters((prev) => ({
      ...prev,
      generosSelecionados: prev.generosSelecionados.filter((g) => g !== genero),
    }));
  };


  const handleDuracaoChange = (e) => {
    const value = e.target.value;
    if (value === "TODOS") {
      setDraftFilters((prev) => ({
        ...prev,
        duracoesSelecionadas: ["TODOS"],
      }));
    } else {
      setDraftFilters((prev) => {
        const filtered = prev.duracoesSelecionadas.filter((d) => d !== "TODOS");
        if (filtered.includes(value)) {
          return { ...prev, duracoesSelecionadas: filtered.filter((d) => d !== value) };
        } else {
          return { ...prev, duracoesSelecionadas: [...filtered, value] };
        }
      });
    }
  };
  const handleRemoveDuracao = (duracao) => {
    setDraftFilters((prev) => ({
      ...prev,
      duracoesSelecionadas: prev.duracoesSelecionadas.filter((d) => d !== duracao),
    }));
  };

  const handleFaixaPrecoChange = (e) => {
    const { name, value } = e.target;
    setDraftFilters((prev) => ({
      ...prev,
      faixaPrecoSelecionada: {
        ...prev.faixaPrecoSelecionada,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    if (!cidadeQuery || cidadeQuery.trim().length < 2) {
      setSugestoes([]);
      return;
    }

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      const filtro = cidadeQuery.toLowerCase();
      const filtradas = todasCidadesSP.filter((cidade) =>
        cidade.toLowerCase().startsWith(filtro)
      );
      setSugestoes(filtradas);
    }, 500);

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [cidadeQuery, todasCidadesSP]);

  const handleSelectSuggestion = (cidadeNome) => {
    if (!draftFilters.cidadesSelecionadas.includes(cidadeNome)) {
      setDraftFilters((prev) => ({
        ...prev,
        cidadesSelecionadas: [...prev.cidadesSelecionadas, cidadeNome],
      }));
    }
    setValue("cidade", "");
    setCidadeQuery("");
    setSugestoes([]);
  };

  const handleRemoveCidade = (cidade) => {
    setDraftFilters((prev) => ({
      ...prev,
      cidadesSelecionadas: prev.cidadesSelecionadas.filter((c) => c !== cidade),
    }));
  };

  const handleSelectEspecialidade = (especialidade) => {
    if (!draftFilters.especialidadesSelecionadas.some((e) => e.id === especialidade.id)) {
      setDraftFilters((prev) => ({
        ...prev,
        especialidadesSelecionadas: [...prev.especialidadesSelecionadas, especialidade],
      }));
    }
    setValue("especialidade", "");
    setEspecialidadeQuery("");
    setEspecialidadeSugestoes([]);
  };


  const handleRemoveEspecialidade = (esp) => {
    setDraftFilters((prev) => ({
      ...prev,
      especialidadesSelecionadas: prev.especialidadesSelecionadas.filter((e2) => e2.id !== esp.id),
    }));
  };


  const [appliedFilters, setAppliedFilters] = useState({
    cidadesSelecionadas: [],
    bairrosSelecionados: [],
    generosSelecionados: [],
    especialidadesSelecionadas: [],
    duracoesSelecionadas: [],
    faixaPrecoSelecionada: { min: "", max: "" }
  });
  const [draftFilters, setDraftFilters] = useState({ ...appliedFilters });

  const handleSaveFilters = () => {
    setAppliedFilters({ ...draftFilters });
    localStorage.setItem("filtrosPersonal", JSON.stringify(draftFilters));
    setIsFilterOpen(false);
  };

  const handleCancelFilters = () => {
    setDraftFilters({
      cidadesSelecionadas: [],
      bairrosSelecionados: [],
      generosSelecionados: [],
      especialidadesSelecionadas: [],
      duracoesSelecionadas: [],
      faixaPrecoSelecionada: { min: "", max: "" }
    });
    setAppliedFilters({
      cidadesSelecionadas: [],
      bairrosSelecionados: [],
      generosSelecionados: [],
      especialidadesSelecionadas: [],
      duracoesSelecionadas: [],
      faixaPrecoSelecionada: { min: "", max: "" }
    });
    setIsFilterOpen(false);
  };



  const listarPersonais = async () => {
    try {
      const response = await caringuApi.get("personal-trainers/disponiveis");
      setAllTrainers(response.data);
      setFilteredTrainers(response.data);
    } catch (error) {
      console.error("Erro ao buscar personal trainers:", error);
    }
  };


  useEffect(() => {
    listarPersonais();
  }, []);



  function redirecionarPerfilPersonal(trainer) {
    navigate(`/perfil-personal/${trainer.id}`);
  }

  const navigate = useNavigate();

  function useResponsiveStyles() {
    const [styles, setStyles] = useState({ fontSize: "24", width: "40%" });

    useEffect(() => {

      const updateStyles = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1536) {
          setStyles({ fontSize: "20px", width: "40%" });
        } else if (screenWidth >= 1280) {
          setStyles({ fontSize: "20px", width: "40%" });
        } else if (screenWidth >= 640) {
          setStyles({ fontSize: "16px", width: "60%" });
        } else {
          setStyles({ fontSize: "16px", width: "90%" });
        }
      };

      updateStyles();
      window.addEventListener("resize", updateStyles);
      return () => window.removeEventListener("resize", updateStyles);
    }, []);

    return styles;
  }

  const toggleFilterModal = () => {
    if (!isFilterOpen) {
      setDraftFilters({ ...appliedFilters });
    }
    setIsFilterOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allTrainers.filter(
      (trainer) =>
        trainer.nomePersonal.toLowerCase().includes(term)
    );
    setFilteredTrainers(filtered);
  };

  // Filtra os personal trainers com base nos filtros selecionados
  const toggleCardExpansion = (index) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };


  //filtro
  useEffect(() => {
    // Só filtra se já carregou os personais
    if (!allTrainers.length) return;

    const {
      cidadesSelecionadas,
      bairrosSelecionados,
      generosSelecionados,
      especialidadesSelecionadas,
      duracoesSelecionadas,
      faixaPrecoSelecionada
    } = appliedFilters;

    const filtrar = () => {
      return allTrainers.filter((trainer) => {
        // Gênero
        let generoOk = true;
        if (generosSelecionados.length > 0 && !generosSelecionados.includes("TODOS")) {
          generoOk = generosSelecionados.some((g) => {
            if (g === "MASCULINO") {
              return ["HOMEM_CISGENERO", "HOMEM_TRANSGENERO"].includes(trainer.genero);
            }
            if (g === "FEMININO") {
              return ["MULHER_CISGENERO", "MULHER_TRANSGENERO"].includes(trainer.genero);
            }
            if (g === "NAO_BINARIO") {
              return trainer.genero === "NAO_BINARIO";
            }
            return false;
          });
        }

        // Duração
        const duracaoOk =
          duracoesSelecionadas.length === 0 ||
          duracoesSelecionadas.includes("TODOS") ||
          (trainer.planos &&
            trainer.planos.some((plano) =>
              duracoesSelecionadas.includes(plano.periodo)
            ));

        // Cidade/Bairro (OU)
        let localizacaoOk = true;
        if (cidadesSelecionadas.length > 0 && bairrosSelecionados.length > 0) {
          localizacaoOk =
            cidadesSelecionadas.includes(trainer.cidade) ||
            bairrosSelecionados.includes(trainer.bairro);
        } else if (cidadesSelecionadas.length > 0) {
          localizacaoOk = cidadesSelecionadas.includes(trainer.cidade);
        } else if (bairrosSelecionados.length > 0) {
          localizacaoOk = bairrosSelecionados.includes(trainer.bairro);
        }

        // Especialidade (OU)
        const especialidadeOk =
          especialidadesSelecionadas.length === 0 ||
          trainer.especialidades.some((esp) =>
            especialidadesSelecionadas.some((sel) => sel.nome === esp)
          );

        // Faixa de preço
        const min = faixaPrecoSelecionada.min ? Number(faixaPrecoSelecionada.min) : null;
        const max = faixaPrecoSelecionada.max ? Number(faixaPrecoSelecionada.max) : null;
        let precoOk = true;
        if (min !== null || max !== null) {
          if (!trainer.planos || trainer.planos.length === 0) return false;
          const menorValor = Math.min(...trainer.planos.map((p) => p.valorAulas));
          if (min !== null && menorValor < min) precoOk = false;
          if (max !== null && menorValor > max) precoOk = false;
        }

        return generoOk && duracaoOk && localizacaoOk && especialidadeOk && precoOk;
      });
    };

    setFilteredTrainers(filtrar());
  }, [allTrainers, appliedFilters
  ]);

  const lidarErroImagem = (id) => {
    setErrosImagem((prev) => ({
      ...prev,
      [id]: true,
    }));
  };




  return (
    <div className="flex min-h-screen bg-[#fffdf6]">
      <div className="flex-1 overflow-y-auto">
        <Header />
        <main className="w-full h-auto">
          <div className="pl-[1rem] sm:pl-[3.5rem] w-[90%] h-auto flex mt-6 flex-col gap-6">
            <h1 className="text-xl sm:text-[32px] font-bold text-[#1E293B]">
              Encontre o Personal ideal
            </h1>
            <div className="w-full flex items-center gap-2 sm:gap-4 bg-[#fffdf6] border border-gray-300 rounded-md p-4">
              <input
                type="text"
                placeholder="Pesquisar Personal"
                value={searchTerm}
                onChange={handleSearch}
                className="w-[80%] flex-1 bg-transparent border-none outline-none text-xs sm:text-[16px] text-[#1E293B]"
              />
              <HiOutlineSearch className="shrink-0 w-4 h-4 sm:w-6 sm:h-6 text-[#1E293B]" />
              <button
                onClick={toggleFilterModal}
                aria-label="Filtrar"
                className="p-2 text-[#1E293B] hover:text-[#3B82F6]"
              >
                <HiOutlineFilter className="shrink-0 w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Lista de Personal Trainers */}
          <div className="mt-6 pl-[1rem] sm:pl-[3.5rem] w-[91%] h-auto rounded-md overflow-y-scroll">
            {filteredTrainers.length > 0 ? (
              filteredTrainers.map((trainer, index) => (
                <div

                  key={index}
                  className="border-solid border-2 border-[#1D2D441C] rounded-md p-4 mb-4 w-full"
                  onClick={() => toggleCardExpansion(index)}
                >
                  <div className="flex items-center">
                    <div className="flex flex-col md:flex-row items-center gap-4 w-[90%]">
                      {trainer.urlFotoPerfil && !errosImagem[trainer.email] ? (
                        <img
                          src={trainer.urlFotoPerfil}
                          alt={trainer.nomePersonal}
                          className="w-16 h-16 sm:w-19 sm:h-19 lg:w-22 lg:h-22 rounded-full"
                          onError={() => lidarErroImagem(trainer.email)}
                        />
                      ) : (
                        <FaUserCircle className="flex-shrink-0 w-16 h-16 sm:w-19 sm:h-19 lg:w-22 lg:h-22" />
                      )}

                      <div className="flex flex-col md:flex-row items-start w-full gap-4">
                        <div className=" w-full md:w-[32%] flex flex-col gap-3">
                          <h2 className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Nome:</b> {trainer.nomePersonal}
                          </h2>
                          <p className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Gênero: </b> {
                              trainer.genero === "HOMEM_CISGENERO" ? "Masculino Cisgênero"
                                : trainer.genero === "HOMEM_TRANSGENERO" ? "Masculino Transgênero"
                                  : trainer.genero === "MULHER_CISGENERO" ? "Feminino Cisgênero"
                                    : trainer.genero === "MULHER_TRANSGENERO" ? "Feminino Transgênero"
                                      : "Não Binário"
                            }
                          </p>
                          <p className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Especialidades: </b>
                            {trainer.especialidades[0]}{" "}
                            {trainer.especialidades.length > 1 &&
                              `+${trainer.especialidades.length - 1}`}
                          </p>
                        </div>
                        <div className=" w-full md:w-[32%] flex flex-col gap-3">
                          <h2 className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl text-[var(--cor-primaria)]">
                            <b className="break-words font-bold">Cidade:</b> {trainer.cidade}
                          </h2>
                          <p className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Bairro: </b> {trainer.bairro}

                          </p>
                          <h2 className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Experiência:</b>{" "}
                            {trainer.experiencia < 1
                              ? "menos de 1 ano"
                              : `${trainer.experiencia} ${trainer.experiencia === 1 ? "ano" : "anos"}`}
                          </h2>

                        </div>
                        <div className=" w-full md:w-[32%] flex flex-col gap-3">
                          <h2 className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl  text-[var(--cor-primaria)]">
                            <b className="font-bold">Valor da aula:</b>
                            {trainer.planos && trainer.planos.length > 0
                              ? ` R$ ${Math.min(...trainer.planos.map(plano => plano.valorAulas))}`
                              : " Não informado"}
                          </h2>
                          <p className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl  text-[var(--cor-primaria)]">
                            <b className="break-words font-bold">Email: </b> {trainer.email}

                          </p>
                          <p className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Contato: </b> {MascaraTelefone(trainer.celular)}
                          </p>

                        </div>

                      </div>
                    </div>

                    <div className="text-right w-[10%] h-full flex flex-row justify-end items-center">
                      <button

                        className="text-[#1D2D44] cursor-pointer"
                      >
                        {expandedCards.includes(index) ? (
                          <FaChevronUp size={26} />
                        ) : (
                          <FaChevronDown size={26} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Conteúdo expandido */}
                  {expandedCards.includes(index) && (
                    <div className="mt-4">
                      <ul className="font-normal text-base sm:text-xl md:text-base lg:text-xl text-[var(--cor-primaria)] mb-4">
                        {trainer.especialidades.map((especialidade, i) => (
                          <li key={i}>- {especialidade}</li>
                        ))}
                      </ul>
                      <div className="w-full h-auto flex flex-row items-center justify-center">
                        <Button
                          texto="Ver Planos do Personal"
                          onClick={() => redirecionarPerfilPersonal(trainer)}
                          cor="var(--azul-claro)"
                          corTexto="var(--cor-secundaria)"
                          fontWeight="600"
                          ariaLabel="Botão de Planos do Personal"
                          borderColor="none"
                          fontSize={fontSize}
                          width={width}
                          height="60px"
                        >

                        </Button>

                      </div>


                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                Nenhum personal encontrado para sua pesquisa.
              </p>
            )}
          </div>
        </main>

        {/* Modal de Filtros */}
        {isFilterOpen && (
          <div
            id="filter-modal"
            className={`${isFilterOpen ? "flex" : "hidden"
              } fixed inset-0 z-50 justify-center items-center bg-black/50 overflow-y-auto`}
          >
            <div className="relative p-4 w-full max-w-4xl">
              <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                <div className="flex justify-between items-center pb-4 mb-4 ">
                  <h3 className="text-4xl font-semibold text-[var(--cor-primaria)]">
                    Adicionar Filtro
                  </h3>
                  <button
                    type="button"
                    onClick={handleCancelFilters}
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


<form onSubmit={handleSubmit(handleSaveFilters)}>
                  {/* depois mudar aqui */}
                  <div className="grid grid-cols-2 gap-12">
                    {/* Cidade */}
                    <div className="relative">
                      <Label
                        id="cidade"
                        nomeLabel="Cidade"
                        fontSize="20px"
                        fontWeight="500"
                      />
                      <InputPosLogin
                        id="cidade"
                        name="cidade"
                        inputType="text"
                        placeholder="Selecione uma ou mais cidades desejadas"
                        fontSize="16px"
                        fontWeight="400"
                        fontSizeErro="16px"
                        width="100%"
                        {...register("cidade")}
                        onChange={handleInputChange}

                      />
                      {sugestoes.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-48 overflow-y-auto">
                          {sugestoes.map((cidade, idx) => (
                            <li
                              key={idx}
                              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                              onClick={() => handleSelectSuggestion(cidade)}
                            >
                              {cidade}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-2 mt-2">
                        {draftFilters.cidadesSelecionadas.map((cidade, idx) => (
                          <div
                            key={cidade}
                            className="bg-orange-500 text-white px-3 py-1 rounded-[5px] flex items-center cursor-pointer"
                          >
                            {cidade}
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleRemoveCidade(cidade);
                              }}
                              className="ml-2 font-bold bg-[#FFFDF6] rounded-[5px] h-5 w-5 flex items-center justify-center cursor-pointer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="4" viewBox="0 0 14 4" fill="none">
                                <path d="M12 2H2" stroke="#B41F1F" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Bairro */}

                    <div className="relative">
                      <Label
                        id="bairro"
                        nomeLabel="Bairro"
                        fontSize="20px"
                        fontWeight="500"
                      />
                      <InputPosLogin
                        id="bairro"
                        name="bairro"
                        inputType="text"
                        placeholder="Selecione um ou mais bairros desejados"
                        fontSize="16px"
                        fontWeight="400"
                        fontSizeErro="16px"
                        width="100%"
                        {...register("bairro")}
                        onChange={handleBairroInputChange}
                      />
                      {bairroSugestoes.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-48 overflow-y-auto">
                          {bairroSugestoes.map((bairro, idx) => (
                            <li
                              key={idx}
                              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                              onClick={() => handleSelectBairro(bairro)}
                            >
                              {bairro}
                            </li>
                          ))}
                        </ul>
                      )}
                      {bairroQuery.length >= 2 && bairroSugestoes.length === 0 && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 p-2 text-gray-500 text-sm flex justify-between items-center">
                          Nenhum bairro encontrado
                          <button
                            type="button"
                            className="ml-2 text-orange-600 underline text-xs"
                            onClick={() => {
                              if (
                                bairroQuery.trim() &&
                                !bairrosSelecionados.includes(bairroQuery.trim())
                              ) {
                                setBairrosSelecionados([...bairrosSelecionados, bairroQuery.trim()]);
                                setValue("bairro", "");
                                setBairroQuery("");
                                setBairroSugestoes([]);
                              }
                            }}
                          >
                            Adicionar "{bairroQuery.trim()}"
                          </button>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {draftFilters.bairrosSelecionados.map((bairro, idx) => (
                          <div
                            key={bairro}
                            className="bg-orange-500 text-white px-3 py-1 rounded-[5px] flex items-center cursor-pointer"
                          >
                            {bairro}
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleRemoveBairro(bairro);
                              }}
                              className="ml-2 font-bold bg-[#FFFDF6] rounded-[5px] h-5 w-5 flex items-center justify-center cursor-pointer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="4" viewBox="0 0 14 4" fill="none">
                                <path d="M12 2H2" stroke="#B41F1F" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gênero do Personal */}
                    <div>
                      <Label
                        id="genero"
                        nomeLabel="Gênero do Personal"
                        fontSize="20px"
                        fontWeight="500"
                      />
                      <div className="relative">
                        <select defaultValue=""
                          id="genero"
                          className="appearance-none text-base w-full flex items-center justify-center pt-[1%] pr-[1%] pb-[1%] pl-0 border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]"
                          onChange={handleGeneroChange}
                        >
                          <option disabled className="text-[#15171B87]" value="">Selecione um ou mais gêneros desejados</option>
                          <option value="TODOS">Todos</option>
                          <option value="MASCULINO">Masculino</option>
                          <option value="FEMININO">Feminino</option>
                          <option value="NAO_BINARIO">Não Binário</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
                            <path d="M0.532697 0.412777C-0.177566 0.956418 -0.177566 1.83792 0.532697 2.38154L9.43019 9.18545C10.851 10.2719 13.1531 10.2714 14.5732 9.18461L23.4672 2.37653C24.1776 1.8329 24.1776 0.951407 23.4672 0.407752C22.757 -0.135917 21.6054 -0.135917 20.8952 0.407752L13.2828 6.23469C12.5726 6.77845 11.421 6.77831 10.7107 6.23469L3.10474 0.412777C2.3945 -0.130892 1.24294 -0.130892 0.532697 0.412777Z" fill="#15171B" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {draftFilters.generosSelecionados.map((genero) => (
                          <div
                            key={genero}
                            className="bg-orange-500 text-white px-3 py-1 rounded-[5px] flex items-center cursor-pointer"
                          >
                            {genero === "TODOS"
                              ? "Todos"
                              : genero === "MASCULINO"
                                ? "Masculino"
                                : genero === "FEMININO"
                                  ? "Feminino"
                                  : "Não Binário"}
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleRemoveGenero(genero);
                              }}
                              className="ml-2 font-bold bg-[#FFFDF6] rounded-[5px] h-5 w-5 flex items-center justify-center cursor-pointer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="4" viewBox="0 0 14 4" fill="none">
                                <path d="M12 2H2" stroke="#B41F1F" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Especialidade */}

                    <div className="relative">
                      <Label
                        id="especialidade"
                        nomeLabel="Especialidade"
                        fontSize="20px"
                        fontWeight="500"
                      />
                      <InputPosLogin
                        id="especialidade"
                        name="especialidade"
                        inputType="text"
                        placeholder="Selecione uma ou mais especialidade desejadas"
                        fontSize="16px"
                        fontWeight="400"
                        fontSizeErro="16px"
                        width="100%"
                        {...register("especialidade")}
                        onChange={handleEspecialidadeInputChange}
                      />
                      {especialidadeSugestoes.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-48 overflow-y-auto">
                          {especialidadeSugestoes.map((esp) => (
                            <li
                              key={esp.id}
                              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                              onClick={() => handleSelectEspecialidade(esp)}
                            >
                              {esp.nome}
                            </li>
                          ))}
                        </ul>
                      )}
                      {especialidadeQuery.length >= 2 && especialidadeSugestoes.length === 0 && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 p-2 text-gray-500 text-sm">
                          Nenhuma especialidade encontrada
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {draftFilters.especialidadesSelecionadas.map((esp) => (
                          <div
                            key={esp.id}
                            className="bg-orange-500 text-white px-3 py-1 rounded-[5px] flex items-center cursor-pointer"
                          >
                            {esp.nome}
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleRemoveEspecialidade(esp);
                              }}
                              className="ml-2 font-bold bg-[#FFFDF6] rounded-[5px] h-5 w-5 flex items-center justify-center cursor-pointer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="4" viewBox="0 0 14 4" fill="none">
                                <path d="M12 2H2" stroke="#B41F1F" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Período de Plano Desejado */}
                    <div>
                      <Label
                        id="duracao"
                        nomeLabel="Período de Plano Desejado"
                        fontSize="20px"
                        fontWeight="500"
                      />
                      <div className="relative">
                        <select defaultValue=""
                          id="duracao"
                          className="appearance-none text-base w-full flex items-center justify-center pt-[1%] pr-[1%] pb-[1%] pl-0 border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]"
                          onChange={handleDuracaoChange}
                        >
                          <option disabled className="text-[#15171B87]" value="">Selecione o período</option>
                          <option value="TODOS">Todos</option>
                          <option value="MENSAL">Mensal</option>
                          <option value="SEMESTRAL">Semestral</option>
                          <option value="AVULSO">Avulso</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
                            <path d="M0.532697 0.412777C-0.177566 0.956418 -0.177566 1.83792 0.532697 2.38154L9.43019 9.18545C10.851 10.2719 13.1531 10.2714 14.5732 9.18461L23.4672 2.37653C24.1776 1.8329 24.1776 0.951407 23.4672 0.407752C22.757 -0.135917 21.6054 -0.135917 20.8952 0.407752L13.2828 6.23469C12.5726 6.77845 11.421 6.77831 10.7107 6.23469L3.10474 0.412777C2.3945 -0.130892 1.24294 -0.130892 0.532697 0.412777Z" fill="#15171B" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {draftFilters.duracoesSelecionadas.map((duracao) => (
                          <div
                            key={duracao}
                            className="bg-orange-500 text-white px-3 py-1 rounded-[5px] flex items-center cursor-pointer"
                          >
                            {duracao === "TODOS"
                              ? "Todos"
                              : duracao === "MENSAL"
                                ? "Mensal"
                                : duracao === "SEMESTRAL"
                                  ? "Semestral"
                                  : "Avulso"}
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                handleRemoveDuracao(duracao);
                              }}
                              className="ml-2 font-bold bg-[#FFFDF6] rounded-[5px] h-5 w-5 flex items-center justify-center cursor-pointer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="4" viewBox="0 0 14 4" fill="none">
                                <path d="M12 2H2" stroke="#B41F1F" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Faixa de Preço */}
                    <div>
                      <label id="preco" className="text-[var(--cor-primaria)] font-medium text-xl mb-2">
                        Faixa de preço da aula
                      </label>
                      <div className="flex gap-4">
                        <input
                          type="number"
                          name="min"
                          placeholder="R$ min"
                          value={draftFilters.faixaPrecoSelecionada.min}
                          onChange={handleFaixaPrecoChange}
                          className="border border-gray-300 rounded-md p-2 w-full text-[#1D2D44]"
                        />
                        <input
                          type="number"
                          name="max"
                          placeholder="R$ max"
                          value={draftFilters.faixaPrecoSelecionada.max}
                          onChange={handleFaixaPrecoChange}
                          className="border border-gray-300 rounded-md p-2 w-full text-[#1D2D44]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div aria-label="Opções de Botões" className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center mt-6">
                    <Button
                      texto="Cancelar"
                      corTexto="var(--cor-secundaria)"
                      cor="#B41F1F"
                      height="2.75rem"
                      width="13.25rem"
                      fontWeight="500"
                      ariaLabel={"Botão de Cancelar"}
                      type="button"
                      onClick={handleCancelFilters}
                    >
                    </Button>

                    <Button
                      texto="Salvar"
                      corTexto="var(--cor-secundaria)"
                      cor="#46982B"
                      height="2.75rem"
                      width="9.2rem"
                      fontWeight="600"
                      ariaLabel={"Botão de Salvar"}
                      type="submit"
                    >
                    </Button>

                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcurandoPersonal;