import React, { createContext, useState, useContext, useEffect } from "react";

const FotoPerfilContext = createContext();

export const FotoPerfilProvider = ({ children }) => {
  const [fotoPerfil, setFotoPerfilState] = useState("");

  // Restaurar a URL da foto do sessionStorage ao carregar o contexto
  useEffect(() => {
    const storedFoto = sessionStorage.getItem("fotoPerfil");
    if (storedFoto) {
      setFotoPerfilState(storedFoto);
    }
  }, []);

  // Atualizar o estado e salvar no sessionStorage
  const setFotoPerfil = (url) => {
    setFotoPerfilState(url);
    if (url) {
      sessionStorage.setItem("fotoPerfil", url);
    } else {
      sessionStorage.removeItem("fotoPerfil");
    }
  };

  return (
    <FotoPerfilContext.Provider value={{ fotoPerfil, setFotoPerfil }}>
      {children}
    </FotoPerfilContext.Provider>
  );
};

export const useFotoPerfil = () => useContext(FotoPerfilContext);
