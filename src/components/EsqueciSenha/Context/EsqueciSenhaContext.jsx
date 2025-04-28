import { createContext, useContext, useState } from "react";

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");

  const atualizarEmail = (novoEmail) => {
    setEmail(novoEmail);
  };

  return (
    <EmailContext.Provider value={{ email, atualizarEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);
