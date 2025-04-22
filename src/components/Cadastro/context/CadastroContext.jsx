import { createContext, useContext, useState } from "react";

const CadastroContext = createContext();

export const CadastroProvider = ({ children }) => {
  const [dadosCadastro, setDadosCadastro] = useState({});

  const atualizarDados = (novosDados) => {
    setDadosCadastro((prev) => ({ ...prev, ...novosDados }));
  };

  return (
    <CadastroContext.Provider value={{ dadosCadastro, atualizarDados }}>
      {children}
    </CadastroContext.Provider>
  );
};

export const useCadastro = () => useContext(CadastroContext);