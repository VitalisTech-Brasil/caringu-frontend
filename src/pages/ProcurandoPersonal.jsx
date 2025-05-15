import { useState } from "react";
import { HiOutlineFilter, HiOutlineSearch } from "react-icons/hi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "../components/Personal/Header/Header";
import MenuLateral from "../components/Personal/MenuLateral/MenuLateral";

const mockPersonalTrainers = [
  {
    nome: "Mônica Luiz Borges Moreno",
    especialidades: ["Treinamento para idosos", "Reabilitação e Prevenção de Lesões", "Alto rendimento"],
    estado: "SP",
    cidade: "São Paulo",
    experiencia: "2 Anos",
    email: "monica.moreno@gmail.com",
    telefone: "11912345678",
    imagem: "https://via.placeholder.com/50",
  },
  {
    nome: "João Pedro Silva",
    especialidades: ["Musculação", "Crossfit", "Treinamento Funcional"],
    estado: "RJ",
    cidade: "Rio de Janeiro",
    experiencia: "5 Anos",
    email: "joao.silva@gmail.com",
    telefone: "21987654321",
    imagem: "https://via.placeholder.com/50",
  },
  // Adicione mais objetos conforme necessário
];

const ProcurandoPersonal = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCards, setExpandedCards] = useState([]);
  const [filteredTrainers, setFilteredTrainers] = useState(mockPersonalTrainers);
  const [selectedFilters, setSelectedFilters] = useState({
    cidade: [],
    bairro: [],
    genero: "",
    especialidade: [],
    periodoPlano: "",
    faixaPreco: { min: "", max: "" },
  });

  const toggleFilterModal = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = mockPersonalTrainers.filter(
      (trainer) =>
        trainer.nome.toLowerCase().includes(term) ||
        trainer.especialidades.some((especialidade) => especialidade.toLowerCase().includes(term))
    );
    setFilteredTrainers(filtered);
  };

  const toggleCardExpansion = (index) => {
    setExpandedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleInputChange = (field, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      faixaPreco: { ...prev.faixaPreco, [field]: value },
    }));
  };

  const handleDropdownChange = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleRemoveChip = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#fffdf6]">
      <MenuLateral />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex flex-col flex-1 p-6">
          <div className="flex flex-col gap-6">
            <h1 className="text-[32px] font-bold text-[#1E293B]">
              Encontre o Personal ideal
            </h1>
            <div className="flex items-center gap-4 bg-[#fffdf6] border border-gray-300 rounded-md p-4 shadow-sm">
              <input
                type="text"
                placeholder="Pesquisar treino"
                value={searchTerm}
                onChange={handleSearch}
                className="flex-1 bg-transparent border-none outline-none text-[16px] text-[#1E293B]"
              />
              <HiOutlineSearch className="w-6 h-6 text-[#1E293B]" />
              <button
                onClick={toggleFilterModal}
                aria-label="Filtrar"
                className="p-2 text-[#1E293B] hover:text-[#3B82F6]"
              >
                <HiOutlineFilter className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Lista de Personal Trainers */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-4 max-h-[500px] overflow-y-scroll">
            {filteredTrainers.length > 0 ? (
              filteredTrainers.map((trainer, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={trainer.imagem}
                        alt={trainer.nome}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h2 className="font-bold text-lg text-[#1E293B]">
                          {trainer.nome}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {trainer.especialidades[0]}{" "}
                          {trainer.especialidades.length > 1 &&
                            `+${trainer.especialidades.length - 1}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {trainer.cidade}, {trainer.estado}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {trainer.experiencia}
                      </p>
                      <button
                        onClick={() => toggleCardExpansion(index)}
                        className="text-[#1E293B] hover:text-[#3B82F6]"
                      >
                        {expandedCards.includes(index) ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Conteúdo expandido */}
                  {expandedCards.includes(index) && (
                    <div className="mt-4">
                      <ul className="text-sm text-gray-600 mb-4">
                        {trainer.especialidades.map((especialidade, i) => (
                          <li key={i}>- {especialidade}</li>
                        ))}
                      </ul>
                      <div className="flex justify-between text-sm text-gray-600">
                        <p>Email: {trainer.email}</p>
                        <p>Contato: {trainer.telefone}</p>
                      </div>
                      <button className="mt-4 bg-[#7C8DB5] text-white rounded px-4 py-2 font-semibold hover:brightness-110">
                        Ver planos do personal
                      </button>
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
            className={`${
              isFilterOpen ? "flex" : "hidden"
            } fixed inset-0 z-50 justify-center items-center bg-black/50`}
          >
            <div className="relative p-6 w-full max-w-4xl max-h-full">
              <div className="relative bg-[#FFFDF6] rounded-lg shadow-lg">
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                  <h3 className="text-xl font-bold text-[#1D2D44]">
                    Adicionar Filtros
                  </h3>
                  <button
                    type="button"
                    className="text-[#D45C56] bg-transparent hover:bg-[#FEE2E2] rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                    onClick={toggleFilterModal}
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                      />
                    </svg>
                  </button>
                </div>
                <form className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Cidade */}
                    <div>
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
                    </div>

                    {/* Bairro */}
                    <div>
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
                    </div>

                    {/* Gênero do Personal */}
                    <div>
                      <label className="block text-sm font-medium text-[#1D2D44] mb-2">
                        Gênero do Personal
                      </label>
                      <select
                        value={selectedFilters.genero}
                        onChange={(e) =>
                          handleDropdownChange("genero", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-2"
                      >
                        <option value="">Selecione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                      </select>
                    </div>

                    {/* Especialidade */}
                    <div>
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
                    </div>

                    {/* Período de Plano Desejado */}
                    <div>
                      <label className="block text-sm font-medium text-[#1D2D44] mb-2">
                        Período de Plano Desejado
                      </label>
                      <select
                        value={selectedFilters.periodoPlano}
                        onChange={(e) =>
                          handleDropdownChange("periodoPlano", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-md p-2"
                      >
                        <option value="">Selecione</option>
                        <option value="Mensal">Mensal</option>
                        <option value="Semestral">Semestral</option>
                      </select>
                    </div>

                    {/* Faixa de Preço */}
                    <div>
                      <label className="block text-sm font-medium text-[#1D2D44] mb-2">
                        Faixa de preço
                      </label>
                      <div className="flex gap-4">
                        <input
                          type="text"
                          placeholder="R$ min"
                          value={selectedFilters.faixaPreco.min}
                          onChange={(e) =>
                            handleInputChange("min", e.target.value)
                          }
                          className="border border-gray-300 rounded-md p-2 w-full text-[#1D2D44]"
                        />
                        <input
                          type="text"
                          placeholder="R$ max"
                          value={selectedFilters.faixaPreco.max}
                          onChange={(e) =>
                            handleInputChange("max", e.target.value)
                          }
                          className="border border-gray-300 rounded-md p-2 w-full text-[#1D2D44]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={toggleFilterModal}
                      className="text-[#D45C56] hover:text-white bg-transparent hover:bg-[#D45C56] border border-[#D45C56] font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={toggleFilterModal}
                      className="text-white bg-[#46982B] hover:bg-[#36751F] font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Salvar
                    </button>
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