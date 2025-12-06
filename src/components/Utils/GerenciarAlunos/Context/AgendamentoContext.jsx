import { createContext, useContext, useState } from "react";

const AgendamentoContext = createContext();

export const AgendamentoProvider = ({ children }) => {
    const [dadosAgendamento, setDadosAgendamento] = useState({});

    const [treinosEtapa2, setTreinosEtapa2] = useState(null);

    const atualizarAgendamento = (novosDados) => {
        setDadosAgendamento(prev => ({ ...prev, ...novosDados }));
    };

    return (
        <AgendamentoContext.Provider
            value={{
                dadosAgendamento,
                atualizarAgendamento,
                treinosEtapa2,
                setTreinosEtapa2
            }}
        >
            {children}
        </AgendamentoContext.Provider>
    );
};

export const useAgendamento = () => useContext(AgendamentoContext);