import React, { createContext, useState, useContext, useEffect } from "react";

const FotoPerfilContext = createContext();

export const FotoPerfilProvider = ({ children }) => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const storedPhoto = sessionStorage.getItem("fotoPerfil");
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }
  }, []);

  const setFotoPerfil = (url) => {
    setProfilePhoto(url);
    setForceUpdate((prev) => prev + 1);
    if (url) {
      sessionStorage.setItem("fotoPerfil", url);
    } else {
      sessionStorage.removeItem("fotoPerfil");
    }
  };

  return (
    <FotoPerfilContext.Provider value={{ fotoPerfil: profilePhoto, setFotoPerfil, forceUpdate }}>
      {children}
    </FotoPerfilContext.Provider>
  );
};

export const useFotoPerfil = () => useContext(FotoPerfilContext);
