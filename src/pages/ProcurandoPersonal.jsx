import { useState, useEffect, useRef } from "react";
import { HiOutlineFilter, HiOutlineSearch } from "react-icons/hi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "../components/Personal/Header/Header";
import Button from "../components/Utils/Button";
import { useNavigate } from "react-router-dom";
import Label from "../components/Utils/Label";
import InputPosLogin from "../components/Utils/InputPosLogin";
import { useForm } from "react-hook-form";
import { caringuApi } from "../provider/caringuApi";
import MascaraTelefone from "../components/Utils/Functions/MascaraTelefone";

const ProcurandoPersonal = () => {

  const { register, handleSubmit, formState: { errors, isSubmitted }, setValue, trigger, reset } = useForm();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCards, setExpandedCards] = useState([]);
  const { fontSize, width } = useResponsiveStyles();
  const [allTrainers, setAllTrainers] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState([]);
  const sugestaoRef = useRef(null);
  const [cidadeInput, setCidadeInput] = useState("");
  const [cidadesSugestao, setCidadesSugestao] = useState([]);
  const [cidadeFocada, setCidadeFocada] = useState(false);
  const [cidadesSelecionadas, setCidadesSelecionadas] = useState([]);


  // Função para lidar com o foco no campo de cidade
  const buscarCidades = async (query) => {
    if (query.length < 2) {
      setCidadesSugestao([]);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?countrycodes=br&format=json&q=${encodeURIComponent(query)}&featureType=city&addressdetails=1&limit=10&accept-language=pt`
      );

      const data = await res.json();

      // Processar para extrair apenas nomes de cidades únicas
      const nomesCidades = new Set();

      data.forEach(item => {
        const cidade = item.address?.city || item.address?.town ||
          item.address?.village || item.address?.municipality;

        if (cidade) {
          nomesCidades.add(cidade);
        }
      });

      // Converter o Set para array
      setCidadesSugestao(Array.from(nomesCidades));
    } catch (e) {
      setCidadesSugestao([]);
    }
  };


  const [selectedFilters, setSelectedFilters] = useState({
    cidade: [],
    bairro: [],
    genero: "",
    especialidade: [],
    duracao: "",
    faixaPreco: { min: "", max: "" }
  });


  const listarPersonais = async () => {
    try {
      const response = await caringuApi.get("personal-trainers/disponiveis");
      setAllTrainers(response.data);
      console.log("Personal Trainers disponíveis:", response.data);
      setFilteredTrainers(response.data);
    } catch (error) {
      console.error("Erro ao buscar personal trainers:", error);
    }
  };


  useEffect(() => {
    listarPersonais();
  }, []);

  function redirecionarPerfilPersonal(trainer) {
    navigate(`/perfil-personal/${trainer.id}`, {
      state: {
        nomePersonal: trainer.nomePersonal,
        urlFotoPerfil: trainer.urlFotoPerfil,
        cidade: trainer.cidade,
        experiencia: trainer.experiencia,
        celular: MascaraTelefone(trainer.celular),
        email: trainer.email,
        especialidades: trainer.especialidades
      }
    });
  }


  const navigate = useNavigate();

  function useResponsiveStyles() {
    const [styles, setStyles] = useState({ fontSize: "24", width: "40%" });

    useEffect(() => {

      const updateStyles = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1536) {
          setStyles({ fontSize: "24px", width: "40%" });
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

  // // Atualiza os filtros selecionados
  // const handleInputChange = (field, value) => {
  //   setSelectedFilters((prev) => ({
  //     ...prev,
  //     faixaPreco: { ...prev.faixaPreco, [field]: value },
  //   }));
  // };


  // // Atualiza os filtros selecionados para dropdowns
  // const handleDropdownChange = (category, value) => {
  //   setSelectedFilters((prev) => ({
  //     ...prev,
  //     [category]: value,
  //   }));
  // };


  // // Remove um filtro específico (chip) da lista de filtros selecionados
  // const handleRemoveChip = (category, value) => {
  //   setSelectedFilters((prev) => ({
  //     ...prev,
  //     [category]: prev[category].filter((item) => item !== value),
  //   }));
  // };



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
                  className="border-solid border-4 border-[#1D2D441C] rounded-md p-4 mb-4 w-full"
                  onClick={() => toggleCardExpansion(index)}
                >
                  <div className="flex items-center">
                    <div className="flex flex-col md:flex-row items-center gap-4 w-[90%]">
                      <img
                        src={trainer.urlFotoPerfil}
                        alt={trainer.nomePersonal}
                        className="w-16 h-16 sm:w-19 sm:h-19 lg:w-22 lg:h-22 rounded-full"
                      />
                      <div className="flex flex-col md:flex-row items-start w-full gap-4">
                        <div className=" w-full md:w-[32%] flex flex-col gap-3">
                          <h2 className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl xl:text-2xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Nome:</b> {trainer.nomePersonal}
                          </h2>
                          <p className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl xl:text-2xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Gênero: </b> {
                              trainer.genero === "HOMEM_CISGENERO" ? "Masculino Cisgênero"
                                : trainer.genero === "HOMEM_TRANSGENERO" ? "Masculino Transgênero"
                                  : trainer.genero === "MULHER_CISGENERO" ? "Feminino Cisgênero"
                                    : trainer.genero === "MULHER_TRANSGENERO" ? "Feminino Transgênero"
                                      : "Não Binário"
                            }
                          </p>
                          <p className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl xl:text-2xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Especialidades: </b>
                            {trainer.especialidades[0]}{" "}
                            {trainer.especialidades.length > 1 &&
                              `+${trainer.especialidades.length - 1}`}
                          </p>
                        </div>
                        <div className=" w-full md:w-[32%] flex flex-col gap-3">
                          <h2 className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl xl:text-2xl text-[var(--cor-primaria)]">
                            <b className="break-words font-bold">Cidade:</b> {trainer.cidade}
                          </h2>
                          <p className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl xl:text-2xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Bairro: </b> {trainer.bairro}

                          </p>
                          <h2 className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl xl:text-2xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Experiência:</b>{" "}
                            {trainer.experiencia < 1
                              ? "menos de 1 ano"
                              : `${trainer.experiencia} ${trainer.experiencia === 1 ? "ano" : "anos"}`}
                          </h2>

                        </div>
                        <div className=" w-full md:w-[32%] flex flex-col gap-3">
                          <h2 className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl xl:text-2xl text-[var(--cor-primaria)]">
                            <b className="font-bold">Valor da aula:</b>
                            {trainer.planos && trainer.planos.length > 0
                              ? ` R$ ${Math.min(...trainer.planos.map(plano => plano.valorAulas))}`
                              : " Não informado"}
                          </h2>
                          <p className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl xl:text-2xl text-[var(--cor-primaria)]">
                            <b className="break-words font-bold">Email: </b> {trainer.email}

                          </p>
                          <p className="break-words font-normal text-base sm:text-xl md:text-base lg:text-xl xl:text-2xl text-[var(--cor-primaria)]">
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
                      <ul className="font-normal text-base sm:text-xl md:text-base lg:text-xl xl:text-2xl text-[var(--cor-primaria)] mb-4">
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
                    onClick={toggleFilterModal}
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


                <form>
                  {/* depois mudar aqui */}
                  <div className="grid grid-cols-2 gap-12">
                    {/* Cidade */}
                    {/* <div>
                      <label className="block text-sm font-medium text-[#1D2D44] mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        placeholder="Digite para buscar..."
                        className="w-full border-b border-gray-300 focus:outline-none focus:border-[#1D2D44] mb-2"
                      />
                      <div className="flex flex-wrap gap-2">
                        {selectedFilters.cidade.map((cidade) => (
                          <div
                            key={cidade}
                            className="flex items-center bg-[#E96E35] text-white px-3 py-1 rounded-full"
                          >
                            {cidade}
                            <button
                              type="button"
                              onClick={() => handleRemoveChip("cidade", cidade)}
                              className="ml-2 text-white"
                            >
                              -
                            </button>
                          </div>
                        ))}
                      </div>
                    </div> */}
                    <div className="relative" ref={sugestaoRef}>
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
                        onChange={e => {
                          setCidadeInput(e.target.value);
                          buscarCidades(e.target.value);
                        }}
                        onFocus={() => setCidadeFocada(true)}
                        onBlur={() => setTimeout(() => setCidadeFocada(false), 200)}
                      />

                      {cidadeFocada && cidadesSugestao.length > 0 && (
                        <ul className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10">
                          {cidadesSugestao.map((nomeCidade, index) => (
                            <li
                              key={`${nomeCidade}-${index}`}
                              onClick={() => {
                                if (!cidadesSelecionadas.includes(nomeCidade)) {
                                  setCidadesSelecionadas([...cidadesSelecionadas, nomeCidade]);
                                }
                                setCidadeInput("");
                                setCidadesSugestao([]);
                              }}
                              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            >
                              {nomeCidade}
                            </li>
                          ))}
                        </ul>
                      )}
                      {cidadeFocada && cidadeInput.length >= 2 && cidadesSugestao.length === 0 && (
                        <div className="absolute bg-white border w-full p-2 text-gray-500 z-10">
                          Nenhuma cidade encontrada
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {cidadesSelecionadas.map((cidade, idx) => (
                          <div
                            key={cidade}
                            className="bg-orange-500 text-white px-3 py-1 rounded-[5px] flex items-center cursor-pointer"
                          >
                            {cidade}
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                setCidadesSelecionadas(cidadesSelecionadas.filter(c => c !== cidade));
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
                    {/* <div>
                      <label className="block text-sm font-medium text-[#1D2D44] mb-2">
                        Bairro
                      </label>
                      <input
                        type="text"
                        placeholder="Digite para buscar..."
                        className="w-full border-b border-gray-300 focus:outline-none focus:border-[#1D2D44] mb-2"
                      />
                      <div className="flex flex-wrap gap-2">
                        {selectedFilters.bairro.map((bairro) => (
                          <div
                            key={bairro}
                            className="flex items-center bg-[#E96E35] text-white px-3 py-1 rounded-full"
                          >
                            {bairro}
                            <button
                              type="button"
                              onClick={() => handleRemoveChip("bairro", bairro)}
                              className="ml-2 text-white"
                            >
                              -
                            </button>
                          </div>
                        ))}
                      </div>
                    </div> */}

                    <div>
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
                      />
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
                          className="appearance-none text-base w-full flex items-center justify-center pt-[1%] pr-[1%] pb-[1%] pl-0 border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]">
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
                    </div>

                    {/* Especialidade */}
                    {/* <div>
                      <label className="block text-sm font-medium text-[#1D2D44] mb-2">
                        Especialidade
                      </label>
                      <input
                        type="text"
                        placeholder="Digite para buscar..."
                        className="w-full border-b border-gray-300 focus:outline-none focus:border-[#1D2D44] mb-2"
                      />
                      <div className="flex flex-wrap gap-2">
                        {selectedFilters.especialidade.map((especialidade) => (
                          <div
                            key={especialidade}
                            className="flex items-center bg-[#E96E35] text-white px-3 py-1 rounded-full"
                          >
                            {especialidade}
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveChip("especialidade", especialidade)
                              }
                              className="ml-2 text-white"
                            >
                              -
                            </button>
                          </div>
                        ))}
                      </div>
                    </div> */}
                    <div>
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
                      />
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
                          className="appearance-none text-base w-full flex items-center justify-center pt-[1%] pr-[1%] pb-[1%] pl-0 border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]">
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
                    </div>

                    {/* Faixa de Preço */}
                    <div>
                      <label id="preco" className="text-[var(--cor-primaria)] font-medium text-xl mb-2">
                        Faixa de preço da aula
                      </label>
                      <div className="flex gap-4">
                        <input
                          type="number"
                          placeholder="R$ min"
                          // value={selectedFilters.faixaPreco.min}
                          // onChange={(e) =>
                          //   handleInputChange("min", e.target.value)
                          // }
                          className="border border-gray-300 rounded-md p-2 w-full text-[#1D2D44]"
                        />
                        <input
                          type="number"
                          placeholder="R$ max"
                          // value={selectedFilters.faixaPreco.max}
                          // onChange={(e) =>
                          //   handleInputChange("max", e.target.value)
                          // }
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
                      corHover="#B41F1F"
                      fontWeight="500"
                      ariaLabel={"Botão de Cancelar"}
                      type="button"
                      onClick={toggleFilterModal}
                    >
                    </Button>

                    <Button
                      texto="Salvar"
                      corTexto="var(--cor-secundaria)"
                      cor="#46982B"
                      height="2.75rem"
                      width="9.2rem"
                      corHover="#46982BE5"
                      fontWeight="600"
                      ariaLabel={"Botão de Salvar"}
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