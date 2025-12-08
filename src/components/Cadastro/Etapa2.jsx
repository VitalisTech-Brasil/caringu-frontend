import { isValid, parse } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCadastro } from "./context/CadastroContext";

import { caringuApi } from "../../provider/caringuApi";

import alert from "../../assets/images/alert.svg";
import check from "../../assets/images/check.svg";
import olhoFechado from "../../assets/images/eye-slash.svg";
import olhoAberto from "../../assets/images/eye.svg";
import setaEsquerda from "../../assets/images/seta-esquerda.svg";
import styleCadastro from "./module/cadastro.module.css";

export default function Etapa2({ setEtapa }) {
  const [erroEmailExistente, setErroEmailExistente] = useState(null);

  const [senhaInteragiu, setSenhaInteragiu] = useState(false);
  const [senhaValue, setSenhaValue] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  const { dadosCadastro, atualizarDados } = useCadastro();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    trigger,
    setValue,
  } = useForm({
    defaultValues: {
      nome: dadosCadastro.nome || "",
      email: dadosCadastro.email || "",
      telefone: dadosCadastro.telefone || "",
      dataNascimento: dadosCadastro.dataNascimento || "",
      genero: dadosCadastro.genero || "",
      senha: dadosCadastro.senha || "",
      confirmarSenha: dadosCadastro.confirmarSenha,
    },
    mode: "onChange",
  });

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);

    if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    setValue("dataNascimento", value);
    trigger("dataNascimento");
  };

  const handleTelefoneChange = (e) => {
    let input = e.target.value;
    let digitos = input.replace(/\D/g, "");

    if (digitos.length > 11) digitos = digitos.slice(0, 11);

    let formatted = "";

    if (digitos.length > 7) {
      formatted = `(${digitos.slice(0, 2)}) ${digitos.slice(
        2,
        7
      )}-${digitos.slice(7)}`;
    } else if (digitos.length > 2) {
      formatted = `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
    } else if (digitos.length > 0) {
      formatted = `(${digitos}`;
    }

    setValue("telefone", formatted);
    trigger("telefone");
  };

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setValue("email", email);
    trigger("email");

    setErroEmailExistente(null);

    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const emailExiste = await verificarEmail(email);
      if (emailExiste) {
        setErroEmailExistente("Este e-mail já está cadastrado.");
      }
    }
  };

  useEffect(() => {
    Object.entries(dadosCadastro).forEach(([key, value]) => {
      if (value) setValue(key, value);
    });
    setSenhaValue(dadosCadastro.senha || "");
  }, [dadosCadastro, setValue]);

  const verificarEmail = async (email) => {
    try {
      const response = await caringuApi.get("/pessoas/verificacao-email", {
        params: { email },
      });

      if (response.data === true) {
        setErroEmailExistente("Este e-mail já está cadastrado.");
        return true;
      } else {
        setErroEmailExistente(null);
        return false;
      }
    } catch (err) {
      console.error("Erro ao verificar e-mail:", err);
      setErroEmailExistente("Erro ao verificar e-mail.");
      return false;
    }
  };

  const onSubmit = async (data) => {
    const email = data.email;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return;
    }

    const emailExiste = await verificarEmail(email);
    if (emailExiste) {
      return;
    }

    atualizarDados(data);

    // Direcionar fluxo baseado no tipo de conta
    if (dadosCadastro.tipoConta === "personal") {
      setEtapa(3); // Personal Trainer vai para Etapa3 (CREF + especialidades)
    } else if (dadosCadastro.tipoConta === "aluno") {
      // Para alunos, fazer cadastro direto aqui
      await cadastrarAluno(data);
    } else {
      // Fallback para o fluxo original caso não tenha tipo definido
      setEtapa(3);
    }
  };

  const cadastrarAluno = async (data) => {
    try {
      function converterParaISO(dataBR) {
        const [dia, mes, ano] = dataBR.split("/");
        return `${ano}-${mes}-${dia}`;
      }

      function formatarCelular(celular) {
        return celular.replace(/\D/g, "");
      }

      const payloadAluno = {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        celular: formatarCelular(data.telefone),
        dataNascimento: converterParaISO(data.dataNascimento),
        genero: data.genero,
        urlFotoPerfil: dadosCadastro.fotoPerfilGoogle || null,
      };

      console.info("Payload aluno enviado: ", payloadAluno);

      // Tentar endpoint específico para alunos primeiro, senão usar endpoint genérico
      try {
        await caringuApi.post("/alunos", payloadAluno);
      } catch (error) {
        if (error.response?.status === 404) {
          // Se endpoint /alunos não existir, usar endpoint genérico
          await caringuApi.post("/usuarios", payloadAluno);
        } else {
          throw error;
        }
      }

      console.info("Cadastro de aluno realizado com sucesso!");
      setEtapa(4);
    } catch (error) {
      console.error(
        "Erro no cadastro do aluno: ",
        error.response?.data?.message || error.message
      );
      // Aqui você pode adicionar tratamento de erro, como mostrar uma mensagem para o usuário
      alert("Erro ao realizar cadastro. Tente novamente.");
    }
  };

  const voltarEtapa = () => {
    setEtapa(1);
  };

  return (
    <form
      className="sm:gap-[1rem] gap-[1.5rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`${styleCadastro.titulo} justify-center lg:justify-start text-[2rem] lg:text-[3rem]`}
      >
        <h1>Dados Cadastrais</h1>
      </div>

      <div
        className={`${styleCadastro["container-nome-data"]} sm:flex-row flex-col items-start`}
      >
        <div
          className={`${styleCadastro["input-nome"]} xl:w-[62%] md:w-[55%] sm:w-[60%] w-full`}
        >
          <div className={styleCadastro["input-container-cadastro"]}>
            <input
              type="text"
              id="nome"
              maxLength={100}
              className={`${styleCadastro["nome-input"]} peer`}
              {...register("nome", { required: true })}
              placeholder=""
            />

            <label htmlFor="nome" className={styleCadastro.label}>
              * Nome completo
            </label>
            <div
              className={`
                                absolute left-0 bottom-0 w-full h-[2px] bg-[#333]
                                scale-x-0 peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100
                                transition-all duration-300 ease-in-out
                                ${errors.nome ? "bottom-1" : "bottom-0"}
                            `}
              style={{ marginBottom: errors.nome ? "-4px" : "0px" }}
            ></div>
          </div>

          {errors.nome && (
            <div className={styleCadastro.erro}>
              <img src={alert} alt="Ícone de alerta" />
              <span className="text-[14px] 2xl:text-base">
                Nome é obrigatório.
              </span>
            </div>
          )}
        </div>

        <div
          className={`${styleCadastro["input-data"]} xl:w-[28%] md:w-[45%] sm:w-[35%] w-full`}
        >
          <div className={styleCadastro["input-container-cadastro"]}>
            <input
              type="text"
              id="dataNascimento"
              className={`${styleCadastro["data-nascimento"]} peer`}
              placeholder=""
              {...register("dataNascimento", {
                required: "Data é obrigatória",
                validate: (value) => {
                  const data = parse(value, "dd/MM/yyyy", new Date());

                  if (!isValid(data)) {
                    return "Data inválida";
                  }

                  const hoje = new Date();
                  if (data > hoje) {
                    return "Data futura não permitida.";
                  }

                  return true;
                },
              })}
              onChange={handleDateChange}
            />
            <label
              htmlFor="dataNascimento"
              className={`${styleCadastro.label}`}
            >
              * Data de nascimento
            </label>
            <div
              className={`
                                absolute left-0 w-full h-[2px] bg-[#333]
                                scale-x-0 peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100
                                transition-all duration-300 ease-in-out
                                ${
                                  errors.dataNascimento
                                    ? "bottom-1"
                                    : "bottom-0"
                                }
                            `}
              style={{ marginBottom: errors.dataNascimento ? "-4px" : "0px" }}
            ></div>
          </div>

          {errors.dataNascimento && (
            <div className={styleCadastro.erro}>
              <img src={alert} alt="Ícone de alerta" />
              <span className="text-[14px] 2xl:text-base">
                {errors.dataNascimento.message}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styleCadastro["input-email"]}>
        <div className={styleCadastro["input-container-cadastro"]}>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: "E-mail é obrigatório.",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "E-mail inválido." },
            })}
            placeholder=""
            onChange={handleEmailChange}
            className="peer"
          />
          <label htmlFor="email" className={styleCadastro.label}>
            * E-mail
          </label>
          <div
            className={`
                            absolute left-0 w-full h-[1px] bg-[#333]
                            scale-x-0 peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100
                            transition-all duration-300 ease-in-out
                            ${
                              errors.email || erroEmailExistente
                                ? "bottom-1"
                                : "bottom-0"
                            }
                        `}
            style={{
              marginBottom: errors.email || erroEmailExistente ? "-4px" : "0px",
            }}
          ></div>
        </div>

        {!erroEmailExistente && errors.email && (
          <div className={styleCadastro.erro}>
            <img src={alert} alt="Ícone de alerta" />
            <span className="text-[14px] 2xl:text-base">
              {errors.email.type === "required" && "E-mail é obrigatório."}
              {errors.email.type === "pattern" && "E-mail inválido."}
            </span>
          </div>
        )}

        {erroEmailExistente && (
          <div className={styleCadastro.erro}>
            <img src={alert} alt="Ícone de alerta" />
            <span className="text-[14px] 2xl:text-base">
              {erroEmailExistente}
            </span>
          </div>
        )}
      </div>

      <div className={styleCadastro["input-telefone"]}>
        <div className={styleCadastro["input-container-cadastro"]}>
          <input
            type="text"
            id="telefone"
            placeholder=""
            {...register("telefone", { required: true })}
            onChange={handleTelefoneChange}
            className="peer"
          />
          <label htmlFor="telefone" className={styleCadastro.label}>
            * Telefone
          </label>
          <div
            className={`
                            absolute left-0 bottom-0 w-full h-[2px] bg-[#333]
                            scale-x-0 peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100
                            transition-all duration-300 ease-in-out
                            ${errors.telefone ? "bottom-1" : "bottom-0"}
                        `}
            style={{ marginBottom: errors.telefone ? "-4px" : "0px" }}
          ></div>
        </div>

        {errors.telefone && (
          <div className={styleCadastro.erro}>
            <img src={alert} alt="Ícone de alerta" />
            <span className="text-[14px] 2xl:text-base">
              Telefone é obrigatório.
            </span>
          </div>
        )}
      </div>

      <div
        className={`${styleCadastro["container-senhas"]} flex-col lg:flex-row sm:gap-0 gap-4`}
      >
        <div className={`${styleCadastro["input-senha"]} w-full lg:w-[54%]`}>
          <div className={styleCadastro["input-container-cadastro"]}>
            <input
              type={showSenha ? "text" : "password"}
              id="senha"
              placeholder=""
              minLength={6}
              maxLength={16}
              {...register("senha", {
                required: "Senha é obrigatória.",
                validate: {
                  tamanho: (value) =>
                    (value.length >= 6 && value.length <= 16) ||
                    "Entre 6 a 16 caracteres.",
                  especial: (value) =>
                    /[!@#$%^&*(),.?":{}|<>^~'./]/.test(value) ||
                    "Mínimo de 1 caractere especial.",
                  maiuscula: (value) =>
                    /[A-Z]/.test(value) || "Mínimo de 1 letra maiúscula.",
                  numero: (value) => /\d/.test(value) || "Mínimo de 1 número.",
                },
              })}
              value={senhaValue}
              onChange={(e) => {
                setSenhaValue(e.target.value);
                if (!senhaInteragiu) setSenhaInteragiu(true);
              }}
              className="peer"
            />

            <label htmlFor="senha" className={styleCadastro.label}>
              * Senha
            </label>
            <button
              type="button"
              onClick={() => setShowSenha((prev) => !prev)}
              className={`${styleCadastro["btn-olho"]} w-5 h-5 lg:w-7 lg:h-7`}
              tabIndex={-1}
            >
              <img
                src={showSenha ? olhoAberto : olhoFechado}
                alt="Mostrar senha"
              />
            </button>
            <div
              className={`
                                absolute left-0 bottom-0 w-full h-[2px] bg-[#333]
                                scale-x-0 peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100
                                transition-all duration-300 ease-in-out
                                ${errors.senha ? "bottom-0" : "bottom-0"}
                            `}
              style={{ marginBottom: errors.senha ? "0px" : "0px" }}
            ></div>
          </div>

          <div className={styleCadastro["container-erros"]}>
            {/* 1 - Tamanho */}
            <div
              className={
                senhaInteragiu || isSubmitted
                  ? senhaValue.length >= 6 && senhaValue.length <= 16
                    ? styleCadastro.check
                    : styleCadastro.erro
                  : styleCadastro.neutro
              }
            >
              {(senhaInteragiu || isSubmitted) && (
                <img
                  src={
                    senhaValue.length >= 6 && senhaValue.length <= 16
                      ? check
                      : alert
                  }
                  alt="Ícone"
                />
              )}
              <span className="text-[14px] 2xl:text-base">
                Entre 6 a 16 caracteres.
              </span>
            </div>

            {/* 2 - Caractere especial */}
            <div
              className={
                senhaInteragiu || isSubmitted
                  ? /[!@#$%^&*(),.?":{}|<>]/.test(senhaValue)
                    ? styleCadastro.check
                    : styleCadastro.erro
                  : styleCadastro.neutro
              }
            >
              {(senhaInteragiu || isSubmitted) && (
                <img
                  src={
                    /[!@#$%^&*(),.?":{}|<>]/.test(senhaValue) ? check : alert
                  }
                  alt="Ícone"
                />
              )}
              <span className="text-[14px] 2xl:text-base">
                Mínimo de 1 caractere especial (ex: !, @, #, $, etc).
              </span>
            </div>

            {/* 3 - Letra maiúscula */}
            <div
              className={
                senhaInteragiu || isSubmitted
                  ? /[A-Z]/.test(senhaValue)
                    ? styleCadastro.check
                    : styleCadastro.erro
                  : styleCadastro.neutro
              }
            >
              {(senhaInteragiu || isSubmitted) && (
                <img
                  src={/[A-Z]/.test(senhaValue) ? check : alert}
                  alt="Ícone"
                />
              )}
              <span className="text-[14px] 2xl:text-base">
                Mínimo de 1 letra maiúscula.
              </span>
            </div>

            {/* 4 - Número */}
            <div
              className={
                senhaInteragiu || isSubmitted
                  ? /\d/.test(senhaValue)
                    ? styleCadastro.check
                    : styleCadastro.erro
                  : styleCadastro.neutro
              }
            >
              {(senhaInteragiu || isSubmitted) && (
                <img src={/\d/.test(senhaValue) ? check : alert} alt="Ícone" />
              )}
              <span className="text-[14px] 2xl:text-base">
                Mínimo de 1 número.
              </span>
            </div>
          </div>
        </div>

        <div
          className={`${styleCadastro["input-confirmarSenha"]} w-full lg:w-[40%]`}
        >
          <div className={styleCadastro["input-container-cadastro"]}>
            <input
              type={showConfirmarSenha ? "text" : "password"}
              id="confirmarSenha"
              minLength={6}
              maxLength={16}
              {...register("confirmarSenha", {
                required: "Confirmação de senha é obrigatória.",
                validate: (value) =>
                  value === senhaValue || "As senhas não coincidem.",
              })}
              placeholder=""
              className="peer"
            />
            <label htmlFor="confirmarSenha" className={styleCadastro.label}>
              * Confirmar senha
            </label>
            <button
              type="button"
              onClick={() => setShowConfirmarSenha((prev) => !prev)}
              className={`${styleCadastro["btn-olho"]} w-5 h-5 lg:w-7 lg:h-7`}
              tabIndex={-1}
            >
              <img
                src={showConfirmarSenha ? olhoAberto : olhoFechado}
                alt="Mostrar senha"
              />
            </button>
            <div
              className={`
                                absolute left-0 bottom-0 w-full h-[2px] bg-[#333]
                                scale-x-0 peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100
                                transition-all duration-300 ease-in-out
                                ${
                                  errors.confirmarSenha
                                    ? "bottom-0"
                                    : "bottom-0"
                                }
                            `}
              style={{ marginBottom: errors.confirmarSenha ? "0px" : "0px" }}
            ></div>
          </div>

          {errors.confirmarSenha && (
            <div className={styleCadastro["erro-confirmacaoSenha"]}>
              <img src={alert} alt="Ícone de alerta" />
              <span className="text-[14px] 2xl:text-base">
                {errors.confirmarSenha.message}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={styleCadastro["input-genero"]}>
        <select
          className={styleCadastro.select}
          /* style={{color: "#ccc", borderColor: "#ccc"}} se quiser pode descomentar */
          defaultValue=""
          {...register("genero", { required: true })}
        >
          <option value="" disabled>
            * Gênero
          </option>
          <option value="HOMEM_CISGENERO">Homem Cisgênero</option>
          <option value="HOMEM_TRANSGENERO">Homem Transgênero</option>
          <option value="MULHER_CISGENERO">Mulher Cisgênero</option>
          <option value="MULHER_TRANSGENERO">Mulher Transgênero</option>
          <option value="NAO_BINARIO">Não Binário</option>
        </select>

        {errors.genero && (
          <div className={styleCadastro.erro}>
            <img src={alert} alt="Ícone de alerta" />
            <span className="text-[14px] 2xl:text-base">
              Selecione o gênero.
            </span>
          </div>
        )}
      </div>

      <div>
        <hr style={{ border: "1px solid #00000039", width: "100%" }} />
        <div style={{ marginTop: "1%" }}>* Obrigatório</div>
      </div>

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
          className="
                 h-[40px] xl:w-[14.5%]
                w-[110px]
                cursor-pointer
                bg-[var(--laranja)] text-[var(--branco)]
                rounded-lg
                text-[16px]
                transition-all duration-200 ease-in-out
                hover:bg-[#ef7f4b] focus:bg-[#ef7f4b]
                hover:scale-105 focus:scale-105
                "
          type="submit"
        >
          Prosseguir
        </button>
      </footer>
    </form>
  );
}
