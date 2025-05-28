import React, { useState, useRef, useEffect } from "react";
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
    const contentRefs = useRef([]);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        contentRefs.current.forEach((el, index) => {
            if (!el) return;

            if (openIndex === index) {
                const scrollHeight = el.scrollHeight;
                el.style.maxHeight = scrollHeight + "px";
            } else {
                el.style.maxHeight = "0px";
            }
        });
    }, [openIndex]);

    return (
        <div className="w-300 mx-auto px-4 py-10 max-[700px]:py-0 max-[700px]:px-0 max-[1350px]:w-[830px] max-[900px]:w-[630px] max-[700px]:w-[430px] max-[700px]:h-[600px] max-[700px]mx-10px max-[550px]:w-[330px]">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className={`rounded-md border mb-4 shadow-sm transition-all w-full
                        ${openIndex === index
                            ? "bg-[var(--azul-escuro)] text-white min-[900px]:h-[180px] max-[700px]:h-[250px] max-[550px]:h-[270px]"
                            : "bg-white text-black max-[1350px]:w-[800px] max-[900px]:w-[600px] max-[700px]:w-[430px] max-[700px]:h-[90px] max-[600px]:h-[75px] max-[550px]:w-[330px]"}`
                    }
                >
                    <button
                        onClick={() => toggle(index)}
                        className="w-full flex items-center justify-between p-5 text-left max-[1350px]:w-[800px] max-[900px]:w-[600px] max-[700px]:w-[425px] max-[550px]:w-[325px]"
                    >
                        <span className="font-medium text-lg max-[550px]:text-[14px]">{faq.question}</span>
                        <FaChevronDown
                            className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                    <div
                        ref={(el) => (contentRefs.current[index] = el)}
                        className="overflow-hidden transition-all duration-500 px-5"
                        style={{ maxHeight: "0px" }}
                    >
                        <div className="py-5 max-[700px]:py-0 max-[700px]:text-[14px]">
                            {faq.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
