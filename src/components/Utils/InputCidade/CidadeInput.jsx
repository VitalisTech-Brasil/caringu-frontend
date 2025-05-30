import axios from "axios";
import React, { useEffect, useState } from "react";

const CidadeInput = ({ formData, setFormData }) => {
  const [cidadeQuery, setCidadeQuery] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [todasCidadesSP, setTodasCidadesSP] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "cidade") {
      setCidadeQuery(value);
    }
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
    setFormData((prev) => ({
      ...prev,
      cidade: cidadeNome,
    }));
    setCidadeQuery(cidadeNome);
    setSugestoes([]);
  };

  return (
    <div className="relative">
      <label className="block text-[16px] font-medium text-gray-700">Cidade</label>
      <input
        type="text"
        name="cidade"
        className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
        placeholder="Digite sua cidade"
        value={formData.cidade || ""}
        onChange={handleInputChange}
        autoComplete="off"
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
    </div>
  );
};

export default CidadeInput;