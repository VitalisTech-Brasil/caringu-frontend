import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCadastro } from "./context/CadastroContext";

import axios from "axios";
import { caringuApi } from "../../provider/caringuApi";
import { pythonApi } from "../../provider/pythonApi";

import styleCadastro from "./module/cadastro.module.css";

import loading from "../../assets/gifs/loading-black.gif";
import alert from "../../assets/images/alert.svg";
import botaoDelete from "../../assets/images/botao-delete.svg";
import check from "../../assets/images/check.svg";
import info from "../../assets/images/info.svg";
import setaEsquerda from "../../assets/images/seta-esquerda.svg";
import toolTipCref from "../../assets/images/tooltip-cref.svg";

export default function Etapa3({ setEtapa }) {
  const [crefStatus, setCrefStatus] = useState(null); // 'ok' | 'erro' | null | validando
  const [mensagemCref, setMensagemCref] = useState("");

  const [especialidadeInteragiu, setEspecialidadeInteragiu] = useState(false);
  const [botaoInteragiu, setBotaoInteragiu] = useState(false);

  const { dadosCadastro, atualizarDados } = useCadastro();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      cref: dadosCadastro.cref || "",
      especialidade: dadosCadastro.especialidade || "",
      experiencia: dadosCadastro.experiencia || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    Object.entries(dadosCadastro).forEach(([key, value]) => {
      if (value) setValue(key, value);
    });
  }, []);

  const [buscaEspecialidade, setBuscaEspecialidade] = useState("");
  const [sugestoes, setSugestoes] = useState([]);

  const [opcoesEspecialidade, setEspecialidades] = useState({});
  const [especialidadesSelecionadas, setEspecialidadesSelecionadas] = useState(
    dadosCadastro.especialidade || []
  );

  useEffect(() => {
    caringuApi
      .get("/especialidades")
      .then((response) => {
        let especialidades = response.data;
        setEspecialidades(especialidades);
      })
      .catch((error) => console.error("Erro ao buscar especialidades:", error));
  }, []);

  useEffect(() => {
    setValue("especialidade", especialidadesSelecionadas);
    trigger("especialidade");
  }, [especialidadesSelecionadas]);

  const handleEspecialidadeChange = (e) => {
    const valor = e.target.value;
    setBuscaEspecialidade(valor);

    if (valor.length > 0) {
      const filtradas = opcoesEspecialidade.filter(
        (op) =>
          op.nome.toLowerCase().includes(valor.toLowerCase()) &&
          !especialidadesSelecionadas.some(
            (especialidade) => especialidade.id === op.id
          )
      );
      setSugestoes(filtradas);
    } else {
      setSugestoes([]);
    }
  };

  const selecionarSugestao = (sugestao) => {
    const jaSelecionado = especialidadesSelecionadas.some(
      (esp) => esp.id === sugestao.id
    );

    if (!jaSelecionado) {
      setEspecialidadesSelecionadas((prev) => [...prev, sugestao]);
      setBuscaEspecialidade("");
      setSugestoes([]);
    }
  };

  const removerEspecialidade = (especialidade) => {
    setEspecialidadesSelecionadas((prev) =>
      prev.filter((esp) => esp.id !== especialidade.id)
    );
  };

  const voltarEtapa = async () => {
    const data = {
      cref: watch("cref"),
      especialidade: especialidadesSelecionadas,
      experiencia: watch("experiencia"),
    };

    atualizarDados(data);
    setEtapa(2);
  };

  const debouncedAzureCall = debounce(async (cref) => {
    try {
      const response = await pythonApi.get(`/consultar?registro=${cref}`);

      // Ajuste simples: se veio algum dado da API Python, consideramos CREF válido
      if (response?.data && response.data.length > 0 && response.data[0].nome == dadosCadastro.nome && response.data[0].cref == cref) {
        setCrefStatus("ok");
        setMensagemCref("CREF válido!");
      } else {
        setCrefStatus("erro");
        setMensagemCref("CREF e/ou nome não encontrado ou inválido.");
      }

      console.log("Resposta da função:", response.data);
    } catch (error) {
      setCrefStatus("erro");
      setMensagemCref("Erro ao verificar o CREF. Tente novamente.");
      console.error("Erro ao chamar a função:", error);
    }
  }, 5000);

  const verificarCrefNoBanco = async (cref) => {
    try {
      const response = await caringuApi.get(
        "/personal-trainers/verificacao-cref",
        {
          params: { cref },
        }
      );

      if (response.data) {
        setCrefStatus("erro");
        setMensagemCref("CREF já cadastrado.");
        return "erro";
      } else {
        setCrefStatus("ok");
        return "ok";
      }
    } catch (error) {
      setCrefStatus("erro");
      setMensagemCref("Erro ao verificar CREF no banco. Tente novamente.");
      console.error("Erro ao verificar CREF no banco:", error);
      return "erro";
    }
  };

  const handleCrefChange = async (e) => {
    let input = e.target.value.toUpperCase();
    let inputFormatado = input.replace(/[^A-Z0-9]/gi, "");

    if (inputFormatado.length > 11)
      inputFormatado = inputFormatado.slice(0, 11);

    let formatted = "";

    if (inputFormatado.length > 11) {
      formatted = `${inputFormatado.slice(0, 6)}-${inputFormatado.slice(
        6,
        7
      )}/${inputFormatado.slice(7, 9)}`;
    } else if (inputFormatado.length > 7) {
      formatted = `${inputFormatado.slice(0, 6)}-${inputFormatado.slice(
        6,
        7
      )}/${inputFormatado.slice(7)}`;
    } else if (inputFormatado.length > 6) {
      formatted = `${inputFormatado.slice(0, 6)}-${inputFormatado.slice(6)}`;
    } else {
      formatted = inputFormatado;
    }

    setValue("cref", formatted);
    trigger("cref");

    if (/^\d{6}-[A-Z]\/[A-Z]{2}$/.test(formatted)) {
      setMensagemCref("Validando CREF...");
      setCrefStatus("validando");

      const statusBanco = await verificarCrefNoBanco(formatted);

      if (statusBanco !== "erro") {
        setMensagemCref("Validando CREF...");
        setCrefStatus("validando");
        debouncedAzureCall(formatted);
      }
    }
  };

  const onSubmit = async (data) => {
    const isFormValido = await trigger();
    const isEspecialidadeValida = especialidadesSelecionadas.length > 0;

    if (!isFormValido || !isEspecialidadeValida) {
      if (!isEspecialidadeValida) setBotaoInteragiu(true);
      return;
    }

    if (crefStatus !== "ok") {
      if (crefStatus === "validando") {
        setMensagemCref("Aguarde a validação do CREF antes de prosseguir.");
      }

      if (crefStatus === null) {
        setMensagemCref("Validando CREF...");
        setCrefStatus("validando");

        const statusBanco = await verificarCrefNoBanco(data.cref);

        if (statusBanco !== "erro") {
          setMensagemCref("Validando CREF...");
          setCrefStatus("validando");
          debouncedAzureCall(data.cref);
        }
      }

      return;
    }

    atualizarDados(data);

    function converterParaISO(dataBR) {
      const [dia, mes, ano] = dataBR.split("/");
      return `${ano}-${mes}-${dia}`;
    }

    function formatarCelular(celular) {
      return celular.replace(/\D/g, "");
    }

    const payloadFinal = {
      nome: dadosCadastro.nome || "",
      email: dadosCadastro.email || "",
      senha: dadosCadastro.senha || "",
      celular: formatarCelular(dadosCadastro.telefone),
      dataNascimento: converterParaISO(dadosCadastro.dataNascimento),
      genero: dadosCadastro.genero || "",
      urlFotoPerfil: dadosCadastro.fotoPerfilGoogle || null,
      tipoConta: dadosCadastro.tipoConta || "personal",
      cref: data.cref,
      especialidadesIds: especialidadesSelecionadas.map((esp) =>
        Number(esp.id)
      ),
      experiencia: data.experiencia,
    };

    console.log(data);
    console.log("Payload acima");
    console.info("Payload enviado: ", payloadFinal);

    try {
      await caringuApi.post("/personal-trainers", payloadFinal);
      console.info("Cadastro realizado com sucesso!");
      setEtapa(4);
    } catch (error) {
      console.error("Erro no cadastro: ", error.response.data.message);
    }
  };

  return (
    <form
      className="sm:gap-[1rem] gap-[1.5rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={`${styleCadastro.titulo} justify-center lg:justify-start text-2xl sm:text-[2rem] lg:text-[40px] xl:text-[3rem]`}
      >
        <h1>Informações Profissionais</h1>
      </div>

      <div className={styleCadastro["input-cref"]}>
        <div
          className={styleCadastro["tooltip-wrapper"]}
          style={{
            marginBottom: errors.cref?.message || crefStatus ? "3%" : "-2%",
          }}
        >
          <img
            src={info}
            alt="Informação"
            className={styleCadastro["info-icon"]}
          />
          <div className={styleCadastro["tooltip-box"]}>
            <img src={toolTipCref} alt="Tooltip CREF" />
          </div>
        </div>

        <div className={styleCadastro["input-crefErros"]}>
          <div className={styleCadastro["input-container-cadastro"]}>
            <input
              type="text"
              id="cref"
              autoComplete="off"
              maxLength={11}
              placeholder=""
              {...register("cref", {
                required: "CREF é obrigatório.",
                pattern: {
                  value: /^\d{6}-[A-Z]\/[A-Z]{2}$/,
                  message: "Formato de CREF inválido. Ex: 123456-G/SP",
                },
              })}
              onChange={handleCrefChange}
            />
            <label htmlFor="cref" className={styleCadastro.label}>
              * Registro do CREF
            </label>
            <div
              className={styleCadastro.underline}
              style={{ marginBottom: errors.cref ? "0px" : "0px" }}
            />
          </div>
          {errors.cref && (
            <div className={styleCadastro.erro}>
              <img src={alert} alt="Ícone de alerta" />
              <span>{errors.cref.message}</span>
            </div>
          )}

          {!errors.cref && crefStatus && (
            <div
              className={styleCadastro.erro}
              style={{
                color:
                  crefStatus === "ok"
                    ? "green"
                    : crefStatus === "validando"
                    ? "#999"
                    : "#D45C56",
              }}
            >
              <img
                src={
                  crefStatus === "ok"
                    ? check
                    : crefStatus === "validando"
                    ? loading
                    : alert
                }
                alt="Ícone de status"
                width={"18px"}
              />
              <span>{mensagemCref}</span>
            </div>
          )}
        </div>
      </div>

      <div
        className={`${styleCadastro["container-nome-data"]} items-start xl:flex-row flex-col`}
      >
        <div
          className={`${styleCadastro["div-principal-especialidade"]} xl:w-[69%] w-full flex flex-col items-start gap-5`}
        >
          <div
            className={`${styleCadastro["input-especialidade"]} lg:w-[96%] w-[97%] lg:ml-[5%] ml-[3%]`}
            style={{ position: "relative" }}
          >
            <div
              className={
                styleCadastro["input-container-cadastro-especialidade"]
              }
            >
              <input
                type="text"
                id="especialidade"
                autoComplete="off"
                style={{ borderBottom: "2px solid black" }}
                className={styleCadastro["nome-input"]}
                placeholder=""
                value={buscaEspecialidade}
                onChange={(e) => {
                  handleEspecialidadeChange(e);
                  if (!especialidadeInteragiu) setEspecialidadeInteragiu(true);
                }}
              />
              <label
                htmlFor="especialidade"
                className={styleCadastro.label}
                style={{ color: "#333" }}
              >
                * Digite para buscar especialidades
              </label>
              <div
                className={styleCadastro.underline}
                style={{
                  marginBottom: errors.especialidade ? "-4px" : "0px",
                  backgroundColor: "#333",
                }}
              />
            </div>

            {sugestoes.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  top: "77%",
                  left: 0,
                  width: "100%",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "0 0 8px 8px",
                  maxHeight: "200px",
                  overflowY: "auto",
                  zIndex: 500,
                }}
              >
                {sugestoes.map((opcao, index) => (
                  <li
                    key={index}
                    onClick={() => selecionarSugestao(opcao)}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {opcao.nome}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              width: "100%",
              marginLeft: "2%",
              maxHeight: "120px",
              zIndex: "100",
            }}
          >
            {especialidadesSelecionadas.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "-5px",
                  width: "97%",
                  maxHeight: "200px",
                  overflowY: "auto",
                  paddingRight: "5px",
                }}
              >
                {especialidadesSelecionadas.map((esp, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderRadius: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "16px",
                    }}
                  >
                    <span>
                      {idx + 1}. {esp.nome}
                    </span>
                    <button
                      type="button"
                      onClick={() => removerEspecialidade(esp)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "bold",
                        color: "#f00",
                      }}
                    >
                      <img
                        src={botaoDelete}
                        alt="Botão para deletar a especialidade"
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.especialidade ||
              ((botaoInteragiu || especialidadeInteragiu) &&
                especialidadesSelecionadas.length == 0 && (
                  <div className={styleCadastro.erro}>
                    <img src={alert} alt="Ícone de alerta" />
                    <span>Escolha ao menos uma especialidade.</span>
                  </div>
                ))}
          </div>
        </div>

        <div
          className={`${styleCadastro["input-anosExperiencia"]} xl:w-[27%] w-full xl:pl-0 pl-5`}
        >
          <div
            className={`${styleCadastro["input-container-cadastro"]} justify-start`}
          >
            <input
              type="text"
              id="experiencia"
              maxLength={2}
              className={`${styleCadastro["data-nascimento"]} peer`}
              {...register("experiencia", { required: true })}
              placeholder=""
            />
            <label htmlFor="experiencia" className={styleCadastro.label}>
              * Anos de experiência
            </label>
            <div
              className={`
                                absolute left-0 w-full h-[2px] bg-[#333]
                                scale-x-0 peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100
                                transition-all duration-300 ease-in-out
                                ${errors.experiencia ? "bottom-1" : "bottom-0"}
                            `}
              style={{ marginBottom: errors.experiencia ? "-4px" : "0px" }}
            ></div>
          </div>

          {errors.experiencia && (
            <div className={styleCadastro.erro}>
              <img src={alert} alt="Ícone de alerta" />
              <span>Experiência é obrigatória.</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-end items-end 2xl:h-[17.4%] h-[90px] z-[-1]">
        <hr style={{ border: "1px solid #00000039", width: "96%" }} />
        <div style={{ marginTop: "1%", width: "96%" }}>* Obrigatório</div>
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
          onClick={() => setBotaoInteragiu(true)}
          type="submit"
        >
          Cadastrar
        </button>
      </footer>
    </form>
  );
}
