import { createContext, useContext, useState } from "react";

const AgendamentoContext = createContext();

export const AgendamentoProvider = ({ children }) => {
    const [dadosAgendamento, setDadosAgendamento] = useState({});

    const atualizarAgendamento = (novosDados) => {
        setDadosAgendamento(prev => ({ ...prev, ...novosDados }));
    };

    return (
        <AgendamentoContext.Provider value={{ dadosAgendamento, atualizarAgendamento }}>
            {children}
        </AgendamentoContext.Provider>
    );
};

export const useAgendamento = () => useContext(AgendamentoContext);