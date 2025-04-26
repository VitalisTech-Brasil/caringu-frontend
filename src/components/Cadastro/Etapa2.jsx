import axios from 'axios';

import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCadastro } from './context/CadastroContext';
import { parse, isValid } from 'date-fns';

import { caringuApi } from '../../provider/caringuApi';

import styleCadastro from "./module/cadastro.module.css";
import alert from "../../assets/images/alert.svg";
import check from "../../assets/images/check.svg";
import olhoAberto from '../../assets/images/eye.svg';
import olhoFechado from '../../assets/images/eye-slash.svg';
import setaEsquerda from "../../assets/images/seta-esquerda.svg";

export default function Etapa2({ setEtapa }) {

    const [erroEmailExistente, setErroEmailExistente] = useState(null);

    const [senhaInteragiu, setSenhaInteragiu] = useState(false);
    const [senhaValue, setSenhaValue] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

    const { dadosCadastro, atualizarDados } = useCadastro();
    const { register, handleSubmit, formState: { errors, isSubmitted }, trigger, setValue } = useForm({
        defaultValues: {
            nome: dadosCadastro.nome || "",
            email: dadosCadastro.email || "",
            telefone: dadosCadastro.telefone || "",
            dataNascimento: dadosCadastro.dataNascimento || "",
            genero: dadosCadastro.genero || "",
            senha: dadosCadastro.senha || "",
            confirmarSenha: dadosCadastro.confirmarSenha
        },
        mode: 'onChange'
    });

    const navigate = useNavigate();

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
            formatted = `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
        } else if (digitos.length > 2) {
            formatted = `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
        } else if (digitos.length > 0) {
            formatted = `(${digitos}`;
        }

        setValue("telefone", formatted);
        trigger("telefone");
    };

    useEffect(() => {
        console.log("DADOS AO VOLTAR PRA ETAPA 2:", dadosCadastro);
        Object.entries(dadosCadastro).forEach(([key, value]) => {
            if (value) setValue(key, value);
        });
        setSenhaValue(dadosCadastro.senha || "");
    }, []);

    const verificarEmail = async (email) => {
        try {
            const response = await caringuApi.get("/pessoas/verificacao-email", {
                params: { email }
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
            alert("entrou aqui")
            return;
        }

        const emailExiste = await verificarEmail(email);
        if (emailExiste) {
            console.log("email ja existe")
            return;
        }

        atualizarDados(data);
        setEtapa(3);
    };

    const voltarEtapa = () => {
        navigate("/login");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className={styleCadastro.titulo}>
                <h1>Dados Cadastrais</h1>
            </div>

            <div className={styleCadastro["container-nome-data"]}>

                <div className={styleCadastro['input-nome']}>

                    <div className={styleCadastro["input-container-cadastro"]}>
                        <input
                            type="text"
                            id="nome"
                            maxLength={100}
                            className={styleCadastro['nome-input']}
                            {...register("nome", { required: true })}
                            placeholder=""
                        />

                        <label htmlFor="nome" className={styleCadastro.label}>* Nome completo</label>
                        <div
                            className={styleCadastro.underline}
                            style={{ marginBottom: errors.nome ? "-4px" : "0px" }}
                        >

                        </div>
                    </div>

                    {errors.nome && (
                        <div className={styleCadastro.erro}>
                            <img src={alert} alt="Ícone de alerta" />
                            <span>Nome é obrigatório.</span>
                        </div>
                    )}

                </div>

                <div className={styleCadastro['input-data']}>

                    <div className={styleCadastro["input-container-cadastro"]}>
                        <input
                            type="text"
                            id="dataNascimento"
                            className={styleCadastro['data-nascimento']}
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
                                }

                            })}
                            onChange={handleDateChange}
                        />
                        <label htmlFor="dataNascimento" className={styleCadastro.label}>* Data de nascimento</label>
                        <div
                            className={styleCadastro.underline}
                            style={{ marginBottom: errors.dataNascimento ? "-4px" : "0px" }}
                        >

                        </div>
                    </div>

                    {errors.dataNascimento && (
                        <div className={styleCadastro.erro}>
                            <img src={alert} alt="Ícone de alerta" />
                            <span>{errors.dataNascimento.message}</span>
                        </div>
                    )}

                </div>

            </div>

            <div className={styleCadastro['input-email']}>

                <div className={styleCadastro['input-container-cadastro']}>
                    <input
                        type="text"
                        id="email"
                        {...register("email", {
                            required: "E-mail é obrigatório.",
                            pattern: { value: /^\S+@\S+\.\S+$/, message: "E-mail inválido." }
                        })}
                        placeholder=""
                    />
                    <label htmlFor="email" className={styleCadastro.label}>* E-mail</label>
                    <div
                        className={styleCadastro.underline}
                        style={{ marginBottom: errors.email || erroEmailExistente ? "-4px" : "0px" }}
                    >

                    </div>
                </div>

                {errors.email && (
                    <div className={styleCadastro.erro}>
                        <img src={alert} alt="Ícone de alerta" />
                        <span>
                            {errors.email.type === "required" && "E-mail é obrigatório."}
                            {errors.email.type === "pattern" && "E-mail inválido."}
                        </span>
                    </div>
                )}

                {erroEmailExistente && (
                    <div className={styleCadastro.erro}>
                        <img src={alert} alt="Ícone de alerta" />
                        <span>{erroEmailExistente}</span>
                    </div>
                )}

            </div>

            <div className={styleCadastro['input-telefone']}>

                <div className={styleCadastro["input-container-cadastro"]}>
                    <input
                        type="text"
                        id="telefone"
                        placeholder=""
                        {...register("telefone", { required: true })}
                        onChange={handleTelefoneChange}
                    />
                    <label htmlFor="telefone" className={styleCadastro.label}>* Telefone</label>
                    <div
                        className={styleCadastro.underline}
                        style={{ marginBottom: errors.telefone ? "-4px" : "0px" }}
                    >

                    </div>
                </div>

                {errors.telefone && (
                    <div className={styleCadastro.erro}>
                        <img src={alert} alt="Ícone de alerta" />
                        <span>Telefone é obrigatório.</span>
                    </div>
                )}

            </div>

            <div className={styleCadastro["container-senhas"]}>

                <div className={styleCadastro["input-senha"]}>

                    <div className={styleCadastro["input-container-cadastro"]}>
                        <input
                            type={showSenha ? "text" : "password"}
                            id="senha"
                            placeholder=""
                            minLength={6} maxLength={16}
                            {...register("senha", {
                                required: "Senha é obrigatória.",
                                validate: {
                                    tamanho: (value) => value.length >= 6 && value.length <= 16 || "Entre 6 a 16 caracteres.",
                                    especial: (value) => /[!@#$%^&*(),.?":{}|<>^~'./]/.test(value) || "Mínimo de 1 caractere especial.",
                                    maiuscula: (value) => /[A-Z]/.test(value) || "Mínimo de 1 letra maiúscula.",
                                    numero: (value) => /\d/.test(value) || "Mínimo de 1 número."
                                }
                            })}
                            value={senhaValue}
                            onChange={(e) => {
                                setSenhaValue(e.target.value);
                                if (!senhaInteragiu) setSenhaInteragiu(true);
                            }}
                        />

                        <label htmlFor="senha" className={styleCadastro.label}>* Senha</label>
                        <button
                            type="button"
                            onClick={() => setShowSenha(prev => !prev)}
                            className={styleCadastro["btn-olho"]}
                            tabIndex={-1}
                        >
                            <img src={showSenha ? olhoAberto : olhoFechado} alt="Mostrar senha" />
                        </button>
                        <div
                            className={styleCadastro.underline}
                            style={{ marginBottom: errors.senha ? "0px" : "0px" }}
                        >

                        </div>
                    </div>

                    <div className={styleCadastro['container-erros']}>
                        {/* 1 - Tamanho */}
                        <div className={
                            senhaInteragiu || isSubmitted
                                ? senhaValue.length >= 6 && senhaValue.length <= 16
                                    ? styleCadastro.check
                                    : styleCadastro.erro
                                : styleCadastro.neutro
                        }>
                            {(senhaInteragiu || isSubmitted) && (
                                <img
                                    src={senhaValue.length >= 6 && senhaValue.length <= 16 ? check : alert}
                                    alt="Ícone"
                                />
                            )}
                            <span>Entre 6 a 16 caracteres.</span>
                        </div>

                        {/* 2 - Caractere especial */}
                        <div className={
                            senhaInteragiu || isSubmitted
                                ? /[!@#$%^&*(),.?":{}|<>]/.test(senhaValue)
                                    ? styleCadastro.check
                                    : styleCadastro.erro
                                : styleCadastro.neutro
                        }>
                            {(senhaInteragiu || isSubmitted) && (
                                <img
                                    src={/[!@#$%^&*(),.?":{}|<>]/.test(senhaValue) ? check : alert}
                                    alt="Ícone"
                                />
                            )}
                            <span>Mínimo de 1 caractere especial (ex: !, @, #, $, etc).</span>
                        </div>

                        {/* 3 - Letra maiúscula */}
                        <div className={
                            senhaInteragiu || isSubmitted
                                ? /[A-Z]/.test(senhaValue)
                                    ? styleCadastro.check
                                    : styleCadastro.erro
                                : styleCadastro.neutro
                        }>
                            {(senhaInteragiu || isSubmitted) && (
                                <img
                                    src={/[A-Z]/.test(senhaValue) ? check : alert}
                                    alt="Ícone"
                                />
                            )}
                            <span>Mínimo de 1 letra maiúscula.</span>
                        </div>

                        {/* 4 - Número */}
                        <div className={
                            senhaInteragiu || isSubmitted
                                ? /\d/.test(senhaValue)
                                    ? styleCadastro.check
                                    : styleCadastro.erro
                                : styleCadastro.neutro
                        }>
                            {(senhaInteragiu || isSubmitted) && (
                                <img
                                    src={/\d/.test(senhaValue) ? check : alert}
                                    alt="Ícone"
                                />
                            )}
                            <span>Mínimo de 1 número.</span>
                        </div>

                    </div>
                </div>

                <div className={styleCadastro['input-confirmarSenha']}>

                    <div className={styleCadastro['input-container-cadastro']}>
                        <input
                            type={showConfirmarSenha ? "text" : "password"}
                            id="confirmarSenha"
                            minLength={6} maxLength={16}
                            {...register("confirmarSenha", {
                                required: "Confirmação de senha é obrigatória.",
                                validate: (value) => value === senhaValue || "As senhas não coincidem."
                            })}
                            placeholder=""
                        />
                        <label htmlFor="confirmarSenha" className={styleCadastro.label}>* Confirmar senha</label>
                        <button
                            type="button"
                            onClick={() => setShowConfirmarSenha(prev => !prev)}
                            className={styleCadastro["btn-olho"]}
                            tabIndex={-1}
                        >
                            <img src={showConfirmarSenha ? olhoAberto : olhoFechado} alt="Mostrar senha" />
                        </button>
                        <div
                            className={styleCadastro.underline}
                            style={{ marginBottom: errors.confirmarSenha ? "0px" : "0px" }}
                        >

                        </div>
                    </div>

                    {errors.confirmarSenha && (
                        <div className={styleCadastro['erro-confirmacaoSenha']}>
                            <img src={alert} alt="Ícone de alerta" />
                            <span>{errors.confirmarSenha.message}</span>
                        </div>
                    )}

                </div>

            </div>

            <div className={styleCadastro['input-genero']}>

                <select
                    className={styleCadastro.select}
                    /* style={{color: "#ccc", borderColor: "#ccc"}} se quiser pode descomentar */
                    defaultValue=""
                    {...register("genero", { required: true })}
                >
                    <option value="" disabled>* Gênero</option>
                    <option value="HOMEM_CISGENERO">Homem Cisgênero</option>
                    <option value="HOMEM_TRANSGENERO">Homem Transgênero</option>
                    <option value="MULHER_CISGENERO">Mulher Cisgênero</option>
                    <option value="MULHER_TRANSGENERO">Mulher Transgênero</option>
                    <option value="NAO_BINARIO">Não Binário</option>
                </select>

                {errors.genero && (
                    <div className={styleCadastro.erro}>
                        <img src={alert} alt="Ícone de alerta" />
                        <span>Selecione o gênero.</span>
                    </div>
                )}

            </div>

            <div>
                <hr style={{ border: "1px solid #00000039", width: "100%" }} />
                <div style={{ marginTop: "1%" }}>* Obrigatório</div>
            </div>

            <footer className={styleCadastro.footer}>
                <button className={styleCadastro.voltar} type="button" onClick={voltarEtapa}>
                    <img src={setaEsquerda} alt="Seta mirando para esquerda" />
                    <span>Voltar</span>
                </button>

                <button className={styleCadastro.prosseguir} type="submit">Prosseguir</button>
            </footer>
        </form>
    )
}
