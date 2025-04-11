import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
    {
        question: "O sistema oferece relatórios personalizáveis?",
        answer: "Os personal trainers podem adicionar a anamnese e visualizar a lista de alunos com opções de busca aqueles sem treinos atribuídos. O sistema também permite acompanhar a presença semanal ou mensal, auxiliando na identificação de baixa frequência e no gerenciamento de planos a expirar."
  },
    {
        question: "O sistema permite gerenciar exercícios individualmente?",
        answer: "Sim, cada exercício pode ser atribuído de forma individual para os alunos e também pode ser reutilizado em treinos diferentes."
    },
    {
        question: "O sistema possui uma agenda para organizar compromissos?",
        answer: "Sim, há uma agenda integrada com visão mensal, semanal e diária para melhor controle das aulas e compromissos."
    },
    {
        question: "Como funcionam os feedbacks dos alunos?",
        answer: "Os alunos podem enviar feedbacks diretamente pela plataforma, e você recebe notificações e relatórios sobre isso."
    },
    {
        question: "Como funciona o gerenciamento de alunos?",
        answer: "Você pode cadastrar alunos, atribuir treinos, acompanhar desempenho e manter o histórico de evolução de cada um."
    }
];

export default function PerguntasFrequentes() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-300 mx-auto px-4 py-10">
            {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className={`rounded-md border mb-4 shadow-sm transition-all w-full ${isOpen ? "bg-[var(--azul-escuro)] text-white" : "bg-white text-black"
                            }`}
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex items-center justify-between p-5 text-left"
                        >
                            <span className="font-medium text-lg">
                                {faq.question}
                            </span>
                            <FaChevronDown
                                className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {isOpen && (
                            <div className="px-5 pb-5">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
