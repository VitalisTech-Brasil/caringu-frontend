import React, { useEffect, useState } from "react";
import { caringuApi } from "../../../provider/caringuApi";

const PREFERENCIAS_INFO = {
    FEEDBACK_TREINO: {
        titulo: "Feedback do aluno sobre o seu treino",
        descricao: "Receba notificações quando o aluno retornar um feedback sobre o treino.",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 53 53" fill="none">
                <path d="M19.3542 41.5417H18.25C9.41667 41.5417 5 39.3333 5 28.2917V17.25C5 8.41667 9.41667 4 18.25 4H35.9167C44.75 4 49.1667 8.41667 49.1667 17.25V28.2917C49.1667 37.125 44.75 41.5417 35.9167 41.5417H34.8125C34.1279 41.5417 33.4654 41.8729 33.0458 42.425L29.7333 46.8417C28.2758 48.785 25.8908 48.785 24.4333 46.8417L21.1208 42.425C20.7675 41.9392 19.9504 41.5417 19.3542 41.5417Z" stroke="#1D2D44" strokeWidth="4" />
                <path d="M38 20.6667H35.2208V18H31.5792V23.0833H21.4208V18H17.7792V20.6667H15V27.3333H17.7792V30H21.4208V24.9167H31.5792V30H35.2208V27.3333H38V20.6667Z" fill="#1D2D44" />
            </svg>
        )
    },
    PAGAMENTO_REALIZADO: {
        titulo: "Notificação de pagamentos de planos",
        descricao: "Fique por dentro assim que o aluno informar um pagamento realizado.",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 53 53" fill="none">
                <path d="M4.4165 18.7708H29.8123" stroke="#1D2D44" strokeWidth="4" />
                <path d="M13.25 36.4375H17.6667" stroke="#1D2D44" strokeWidth="4" />
                <path d="M23.1875 36.4375H32.0208" stroke="#1D2D44" strokeWidth="4" />
                <path d="M48.5832 24.3579V35.5763C48.5832 43.3275 46.6178 45.2708 38.7782 45.2708H14.2215C6.38192 45.2708 4.4165 43.3275 4.4165 35.5763V17.4238C4.4165 9.6725 6.38192 7.72917 14.2215 7.72917H29.8123" stroke="#1D2D44" strokeWidth="4" />
                <path d="M36.4375 13.25L39.75 16.5625L48.5833 7.72917" stroke="#1D2D44" strokeWidth="4" />
            </svg>
        )
    },
    PLANO_PROXIMO_VENCIMENTO: {
        titulo: "Plano próximo do vencimento",
        descricao: "Seja avisado quando o plano de um aluno estiver próximo do fim.",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 56 52" fill="none">
                <path d="M27.5 42C28.8807 42 30 40.8807 30 39.5C30 38.1193 28.8807 37 27.5 37C26.1193 37 25 38.1193 25 39.5C25 40.8807 26.1193 42 27.5 42Z" fill="#1D2D44" />
                <path d="M28 20V31" stroke="#1D2D44" strokeWidth="4" strokeLinecap="round" />
                <path d="M3.60951 42.0737L22.8985 5.0276C25.0005 0.990785 30.9995 0.990812 33.1015 5.0276L52.3905 42.0737C54.2866 45.7153 51.529 50 47.289 50H8.71088C4.47097 50 1.71335 45.7153 3.60951 42.0737Z" stroke="#1D2D44" strokeWidth="4" />
            </svg>
        )
    },
    NOVA_FOTO_PROGRESSO: {
        titulo: "Progresso corporal",
        descricao: "Saiba quando um aluno compartilhar uma nova foto do seu progresso corporal.",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 51 51" fill="none">
                <path d="M14.3649 46.75H36.6349C42.4999 46.75 44.8374 43.1587 45.1136 38.7812L46.2186 21.2287C46.5161 16.6387 42.8611 12.75 38.2499 12.75C36.9536 12.75 35.7636 12.0063 35.1686 10.8588L33.6386 7.7775C32.6611 5.84375 30.1111 4.25 27.9436 4.25H23.0774C20.8886 4.25 18.3386 5.84375 17.3611 7.7775L15.8311 10.8588C15.2361 12.0063 14.0461 12.75 12.7499 12.75C8.13862 12.75 4.48362 16.6387 4.78112 21.2287L5.88612 38.7812C6.14112 43.1587 8.49987 46.75 14.3649 46.75Z" stroke="#1D2D44" strokeWidth="4" />
                <path d="M22.3125 17H28.6875" stroke="#1D2D44" strokeWidth="4" />
                <path d="M25.5 38.25C29.3037 38.25 32.4062 35.1475 32.4062 31.3438C32.4062 27.54 29.3037 24.4375 25.5 24.4375C21.6963 24.4375 18.5938 27.54 18.5938 31.3438C18.5938 35.1475 21.6963 38.25 25.5 38.25Z" stroke="#1D2D44" strokeWidth="4" />
            </svg>
        )
    },
    TREINO_PROXIMO_VENCIMENTO: {
        titulo: "Vencimento de Treinos",
        descricao: "Notificações com 2 semanas de antecedência sobre treinos próximos do vencimento ou renovação.",
        icone: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50" fill="none">
                <path d="M45.8334 25.0001C45.8334 36.5001 36.5001 45.8334 25.0001 45.8334C13.5001 45.8334 4.16675 36.5001 4.16675 25.0001C4.16675 13.5001 13.5001 4.16675 25.0001 4.16675C36.5001 4.16675 45.8334 13.5001 45.8334 25.0001Z" stroke="#1D2D44" strokeWidth="3" />
                <path d="M32.7292 31.6249L26.2709 27.7708C25.1459 27.1041 24.2292 25.4999 24.2292 24.1874V15.6458" stroke="#1D2D44" strokeWidth="3" />
            </svg>
        )
    },
};

export default function PreferenciasNotificacao() {

    const [preferencias, setPreferencias] = useState([]);

    useEffect(() => {

        const personalId = sessionStorage.getItem("pessoaId");

        caringuApi.get(`/preferencias-notificacao/${personalId}`)
            .then(response => {
                const data = response.data.map((item) => ({
                    ...item,
                    ...PREFERENCIAS_INFO[item.tipo],
                }));

                setPreferencias(data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])


    const toggleAtivo = (id) => {
        const item = preferencias.find((p) => p.id === id);
        if (!item) return;

        const novoStatus = !item.ativada;

        setPreferencias((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, ativada: novoStatus } : p
            )
        );

        const personalId = sessionStorage.getItem("pessoaId");

        caringuApi.put(`/preferencias-notificacao/${personalId}`, {
            tipo: item.tipo,
            ativada: novoStatus,
        })
            .then(() => {
            })
            .catch(err => {
                console.error("Erro ao atualizar preferência:", err);
            
                setPreferencias((prev) =>
                    prev.map((p) =>
                        p.id === id ? { ...p, ativada: item.ativada } : p
                    )
                );
            });
    };

    return (
        <div className="space-y-4 border-[#1d2d441c] border-2 p-4 w-full h-full flex flex-col items-center justify-center overflow-y-auto">
            {preferencias.map((item) => (
                <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between w-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-4 sm:space-y-0 sm:space-x-4"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10">{item.icone}</div>
                        <div>
                            <h3 className="text-md sm:text-lg font-semibold text-gray-800">{item.titulo}</h3>
                            <p className="text-sm text-gray-600">{item.descricao}</p>
                        </div>
                    </div>

                    <div className="self-start sm:self-center">
                        <div
                            className={`relative inline-flex items-center h-6 w-11 cursor-pointer rounded-full transition-colors duration-300 ${item.ativada ? "bg-[#738CAB]" : "bg-[#D9D9D9]"}`}
                            onClick={() => toggleAtivo(item.id)}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform bg-[#1D2D44] rounded-full shadow-md transition-transform duration-300 ${item.ativada ? "translate-x-6" : "translate-x-1"}`}
                            />
                        </div>
                    </div>
                </div>

            ))}
        </div>
    );
}