import { useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCadastro } from "./context/CadastroContext";

import mochilaTreino from "../../assets/images/mochila-treino.svg";
import setaEsquerda from "../../assets/images/seta-esquerda.svg";
import styleCadastro from "./module/cadastro.module.css";

export default function Etapa1({ setEtapa }) {
  const [tipoContaSelecionada, setTipoContaSelecionada] = useState("");
  const { atualizarDados } = useCadastro();
  const navigate = useNavigate();

  const selecionarTipoConta = (tipo) => {
    setTipoContaSelecionada(tipo);
  };

  const prosseguir = () => {
    if (!tipoContaSelecionada) return;

    atualizarDados({ tipoConta: tipoContaSelecionada });
    setEtapa(2);
  };

  const voltarEtapa = () => {
    navigate("/login");
  };

  return (
    <div className="sm:gap-[1rem] gap-[1.5rem] flex flex-col">
      <div
        className={`${styleCadastro.titulo} justify-center lg:justify-start`}
      >
        <h1
          className="text-[2rem] lg:text-[3rem] text-center lg:text-left"
          style={{
            fontFamily: "Inter, sans-serif",
            color: "#15171B",
            fontWeight: "bold",
            lineHeight: "1.2",
            marginBottom: "16px",
          }}
        >
          Como deseja se cadastrar?
        </h1>
      </div>

      <div className="mb-6 lg:mb-8">
        <h2
          className="text-[1.25rem] lg:text-[2rem] text-center lg:text-left"
          style={{
            fontFamily: "Inter, sans-serif",
            color: "#15171B",
            fontWeight: "600",
            lineHeight: "1.2",
          }}
        >
          Escolha o tipo de conta que deseja criar.
        </h2>
      </div>

      <div className="flex flex-col space-y-4 lg:space-y-6 mb-6 lg:mb-8">
        <div
          className={`cursor-pointer rounded-xl border-4 transition-all duration-200 w-full ${
            tipoContaSelecionada === "personal"
              ? "border-[#E96E35] shadow-lg lg:scale-105"
              : "border-transparent hover:border-[#E96E35] hover:shadow-md"
          }`}
          style={{
            minHeight: "120px",
            backgroundColor: "#748CAB",
            maxWidth: "807px",
          }}
          onClick={() => selecionarTipoConta("personal")}
        >
          <div className="flex items-center h-full px-4 lg:px-8 py-4">
            <div className="mr-3 lg:mr-6 flex-shrink-0">
              <FaDumbbell
                className="text-[24px] lg:text-[48px]"
                style={{
                  color: "#FFFDF6",
                }}
              />
            </div>

            {/* Conteúdo do Card */}
            <div className="flex flex-col flex-1">
              <h3
                className="text-[1.25rem] lg:text-[2rem] mb-1 lg:mb-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#FFFDF6",
                  fontWeight: "bold",
                }}
              >
                Personal Trainer
              </h3>
              <p
                className="text-[0.875rem] lg:text-[1.5rem] leading-tight"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#FFFDF6",
                  fontWeight: "400",
                }}
              >
                Para profissionais que oferecem serviços de treino
              </p>
            </div>
          </div>
        </div>

        {/* Card Aluno */}
        <div
          className={`cursor-pointer rounded-xl border-4 transition-all duration-200 w-full ${
            tipoContaSelecionada === "aluno"
              ? "border-[#E96E35] shadow-lg lg:scale-105"
              : "border-transparent hover:border-[#E96E35] hover:shadow-md"
          }`}
          style={{
            minHeight: "120px",
            backgroundColor: "#748CAB",
            maxWidth: "807px",
          }}
          onClick={() => selecionarTipoConta("aluno")}
        >
          <div className="flex items-center h-full px-4 lg:px-8 py-4">
            <div className="mr-3 lg:mr-6 flex-shrink-0">
              <img
                src={mochilaTreino}
                alt="Mochila de treino"
                className="w-6 h-6 lg:w-12 lg:h-12"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(98%) sepia(8%) saturate(1080%) hue-rotate(36deg) brightness(110%) contrast(95%)",
                }}
              />
            </div>

            {/* Conteúdo do Card */}
            <div className="flex flex-col flex-1">
              <h3
                className="text-[1.25rem] lg:text-[2rem] mb-1 lg:mb-2"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#FFFDF6",
                  fontWeight: "bold",
                }}
              >
                Aluno
              </h3>
              <p
                className="text-[0.875rem] lg:text-[1.5rem] leading-tight"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#FFFDF6",
                  fontWeight: "400",
                }}
              >
                Para quem busca um personal trainer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer com botões */}
      <footer className={styleCadastro.footer}>
        <button
          className={styleCadastro.voltar}
          type="button"
          onClick={voltarEtapa}
        >
          <img src={setaEsquerda} alt="Seta mirando para esquerda" />
          <span>Voltar</span>
        </button>

        <button
          className={`
                        h-[40px] w-[110px] lg:xl:w-[14.5%] cursor-pointer rounded-lg text-[14px] lg:text-[16px]
                        transition-all duration-200 ease-in-out
                        ${
                          tipoContaSelecionada
                            ? "bg-[var(--laranja)] text-[var(--branco)] hover:bg-[#ef7f4b] focus:bg-[#ef7f4b] lg:hover:scale-105 lg:focus:scale-105"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }
                    `}
          type="button"
          onClick={prosseguir}
          disabled={!tipoContaSelecionada}
        >
          Prosseguir
        </button>
      </footer>
    </div>
  );
}
