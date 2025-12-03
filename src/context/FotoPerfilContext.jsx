import React, { createContext, useState, useContext } from "react";

const FotoPerfilContext = createContext();

export const FotoPerfilProvider = ({ children }) => {
  const [profilePhoto, setProfilePhoto] = useState("");

  const setFotoPerfil = (url) => {
    setProfilePhoto(url || "");
  };

  return (
    <FotoPerfilContext.Provider value={{ fotoPerfil: profilePhoto, setFotoPerfil }}>
      {children}
    </FotoPerfilContext.Provider>
  );
};

export const useFotoPerfil = () => useContext(FotoPerfilContext);
