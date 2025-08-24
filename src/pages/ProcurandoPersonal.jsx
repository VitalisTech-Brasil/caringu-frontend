import React, { useState, useEffect, useRef } from "react";
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
import Rating from 'react-rating'
import Pagination from "../../src/components/Utils/Pagination";

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
  const [rating, setRating] = React.useState(0.0);

  const [sortOrder, setSortOrder] = useState(null); // A-Z or Z-A
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (window.innerWidth >= 640) return 4;
    return 6;
  });

  const totalPages = Math.ceil(filteredTrainers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTrainers = filteredTrainers.slice(startIndex, startIndex + itemsPerPage);
  useEffect(() => {
    const handleResize = () => {
      let newItemsPerPage;
      if (window.innerWidth >= 640) {
        newItemsPerPage = 4;
      } else {
        newItemsPerPage = 6;
      }
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder, filteredTrainers]);

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
      console.log(response.data)
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

  const ratingChanged = (newRating) => {
    setRating(newRating);
    console.log(newRating)
  }

  const StarFull = () => (
    <svg className="mx-0.5 w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
      <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7253 17.835L28.0054 21.555C27.3754 22.185 27.0303 23.4 27.2253 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" fill="#E96E35" stroke="#E96E35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  const StarEmpty = () => (
    <svg className="mx-0.5 w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
      <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7254 17.835L28.0054 21.555C27.3754 22.185 27.0304 23.4 27.2254 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

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
            <div>
              <h1 className="text-xl sm:text-[32px] font-bold text-[#1E293B]">
                Encontre o Personal Ideal
              </h1>
              <span className="hidden md:block">Navegue e filtre para encontrar o treinador perfeito para você.</span>
            </div>
          </div>

          {/* Lista de Personal Trainers */}
          <div className="xl:w-[96%] m-6 p-4 h-auto flex flex-col mt-6 border-2 border-[#E4E8E8] rounded-lg bg-[#fffdf6]">
            <div className="md:mt-6 pl-[1rem] sm:pl-[3.5rem] w-full h-auto rounded-md ">
              <div className="w-full flex items-center gap-2 sm:gap-4 bg-[#fffdf6] py-4">
                <input
                  type="text"
                  placeholder="Pesquisar Personal"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-[80%] flex-1 bg-transparent border-b-2 pb-1 outline-none text-xs sm:text-[16px] text-[#1E293B]"
                />
                <svg className="shrink-0 w-4 h-4 sm:w-6 sm:h-6 text-[#1E293B]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#1D2D44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M22 22L20 20" stroke="#1D2D44" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <button
                  onClick={toggleFilterModal}
                  aria-label="Filtrar"
                  className="p-2 text-[#1E293B]"
                >
                  <svg className="shrink-0 w-4 h-4 sm:w-6 sm:h-6 text-[#1E293B]" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.85002 2.27502H20.15C21.3417 2.27502 22.3167 3.25002 22.3167 4.44169V6.82502C22.3167 7.69169 21.775 8.77502 21.2333 9.31669L16.575 13.4334C15.925 13.975 15.4917 15.0584 15.4917 15.925V20.5834C15.4917 21.2334 15.0583 22.1 14.5167 22.425L13 23.4C11.5917 24.2667 9.64168 23.2917 9.64168 21.5584V15.8167C9.64168 15.0584 9.20835 14.0834 8.77502 13.5417L4.65835 9.20836C4.11668 8.66669 3.68335 7.69169 3.68335 7.04169V4.55002C3.68335 3.25002 4.65835 2.27502 5.85002 2.27502Z" stroke="#1D2D44" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.8408 2.27502L6.5 10.8334" stroke="#1D2D44" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
                <div className="pt-2 pb-2 border-2 border-[#1D2D441C] rounded-md hidden items-center justify-center p-2 md:flex">
                  <span>Ordenar por avaliação</span>
                  <Rating
                    initialRating={rating}
                    fractions={2}
                    emptySymbol={<StarEmpty />}
                    fullSymbol={<StarFull />}
                    onChange={ratingChanged}
                  />
                </div>
              </div>
            </div>
            {currentTrainers.length > 0 ? (
              <div className="flex flex-wrap w-full gap-4 mx-3 mt-4">
                {currentTrainers.map((trainer, index) => {
                  // calcula o menor plano desse personal
                  const menorPlano = trainer.planos.reduce((menor, atual) =>
                    atual.valorAulas < menor.valorAulas ? atual : menor
                  );
                  return (
                    <div
                      key={trainer.id}
                      className="border-2 border-gray-200 mb-4 w-[44%] md:w-[45%] md:h-[40%] lg:w-[22%] lg:mx-2 xl: flex items-center flex-col gap-3 rounded"
                      onClick={() => toggleCardExpansion(index)}
                    >
                      <div className="w-full h-1/2 sm:h-40  flex items-center justify-center relative">
                        {trainer.urlFotoPerfil && !errosImagem[trainer.email] ? (
                          <img
                            src={trainer.urlFotoPerfil}
                            alt={trainer.nomePersonal}
                            className="w-full h-full sm:w-19 sm:h-19 lg:w-22 lg:h-22 object-cover rounded"
                            onError={() => lidarErroImagem(trainer.email)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
                            <FaUserCircle className="flex-shrink-0 w-full h-1/2 sm:w-20 sm:h-20 md:h-40 lg:w-22 lg:h-22" />
                          </div>
                        )}
                        {/* badge de avaliação no canto superior direito */}
                        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded flex items-center gap-1">
                          <span className="text-sm font-semibold text-yellow-500 flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 21 19" fill="none">
                              <path d="M11.9396 2.77875L13.361 5.56541C13.5549 5.95333 14.0717 6.32541 14.5079 6.39666L17.0842 6.81625C18.7317 7.08541 19.1194 8.25708 17.9322 9.41291L15.9293 11.3762C15.5901 11.7087 15.4043 12.35 15.5093 12.8092L16.0827 15.2396C16.535 17.1633 15.4932 17.9075 13.7568 16.9021L11.342 15.5008C10.9058 15.2475 10.1871 15.2475 9.74286 15.5008L7.32806 16.9021C5.59974 17.9075 4.54982 17.1554 5.0021 15.2396L5.57551 12.8092C5.6805 12.35 5.49475 11.7087 5.15554 11.3762L3.15263 9.41291C1.9735 8.25708 2.35308 7.08541 4.00064 6.81625L6.57697 6.39666C7.00501 6.32541 7.52189 5.95333 7.71572 5.56541L9.13714 2.77875C9.91246 1.26666 11.1724 1.26666 11.9396 2.77875Z" fill="#E96E35" stroke="#E96E35" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            {trainer.avaliacao ? trainer.avaliacao.toFixed(1) : "0.0"}
                          </span>
                        </div>
                      </div>
                      {/* conteúdo do card */}
                      <div className="w-full h-1/2 flex flex-col gap-1 px-2">
                        <p className="text-md">{trainer.nomePersonal.split(" ").slice(0, 2).join(" ")}</p>
                        <p className="text-sm flex gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 16 15" fill="none">
                            <path d="M2.8848 5.25314C4.07807 -0.104942 11.8495 -0.0987544 13.0367 5.25933C13.7332 8.4024 11.8192 11.0629 10.1413 12.7087C8.92383 13.909 6.99764 13.909 5.77409 12.7087C4.1023 11.0629 2.18823 8.39622 2.8848 5.25314Z" fill="#FDFCFA" stroke="#1D2D44" stroke-width="1.5" />
                            <path d="M7.96113 8.3094C9.00487 8.3094 9.85098 7.44513 9.85098 6.379C9.85098 5.31288 9.00487 4.44861 7.96113 4.44861C6.9174 4.44861 6.07129 5.31288 6.07129 6.379C6.07129 7.44513 6.9174 8.3094 7.96113 8.3094Z" stroke="#1D2D44" stroke-width="1.5" />
                          </svg>
                          {trainer.cidade}
                        </p>
                        <p className="text-sm flex gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 16 15" fill="none">
                            <path d="M7.96015 1.25C4.62264 1.25 1.90295 4.05625 1.90295 7.5C1.90295 10.9438 4.62264 13.75 7.96015 13.75C11.2977 13.75 14.0174 10.9438 14.0174 7.5C14.0174 4.05625 11.2977 1.25 7.96015 1.25ZM10.595 9.73125C10.5102 9.88125 10.3588 9.9625 10.2013 9.9625C10.1226 9.9625 10.0438 9.94375 9.97114 9.89375L8.09341 8.7375C7.62701 8.45 7.28175 7.81875 7.28175 7.2625V4.7C7.28175 4.44375 7.48769 4.23125 7.73604 4.23125C7.98438 4.23125 8.19033 4.44375 8.19033 4.7V7.2625C8.19033 7.4875 8.37204 7.81875 8.55982 7.93125L10.4375 9.0875C10.6556 9.21875 10.7283 9.50625 10.595 9.73125Z" fill="#1D2D44" />
                          </svg>
                          {trainer.experiencia} anos de experiência
                        </p>
                        {/* especialidades */}
                        {trainer.especialidades?.length > 0 && (
                          <div className="flex gap-1 items-center">
                            <span className="bg-[#E96E35]/11 text-xs px-1 py-1 rounded border-2 border-[#E96E35]/20 text-[#E96E35]">
                              {trainer.especialidades[0]}
                            </span>
                            {trainer.especialidades.length > 1 && (
                              <span className="text-[var(--cor-primaria)] text-xs px-1 py-1 rounded border-2 border-[var(--cor-primaria)]/11">
                                +{trainer.especialidades.length - 1}
                              </span>
                            )}
                          </div>
                        )}
                        {/* plano mais barato */}
                        <p className="text-sm">
                          <span className="font-bold text-2xl">R$ {menorPlano.valorAulas}</span> /{" "}
                          {menorPlano.periodo === "MENSAL"
                            ? "Mês"
                            : menorPlano.periodo === "ANUAL"
                              ? "Ano"
                              : menorPlano.periodo === "SEMESTRAL"
                                ? "Semestre"
                                : "Aula"}
                        </p>
                        <Button
                          texto="Ver Perfil"
                          fontSize="14px"
                          fontWeight="600"
                          width="100%"
                          height="35px"
                          cor="#748CAB"
                          corTexto="#FFFFFF"
                          classNameExtra="mb-2"
                          onClick={() => redirecionarPerfilPersonal(trainer)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                Nenhum personal encontrado para sua pesquisa.
              </p>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsLength={filteredTrainers.length}
              onPageChange={goToPage}
              onPrevious={goToPrevious}
              onNext={goToNext}
              maxVisible={3}
            />
          </div>
        </main>
        {/* Modal de Filtros */}
        {
          isFilterOpen && (
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
          )
        }
      </div >
    </div >
  );
};

export default ProcurandoPersonal;