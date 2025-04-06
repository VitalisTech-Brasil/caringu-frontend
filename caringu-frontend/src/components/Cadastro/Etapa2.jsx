import React from 'react'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styleCadastro from "./module/cadastro.module.css";

import alert from "../../assets/images/alert.svg";
import check from "../../assets/images/check.svg";
import setaEsquerda from "../../assets/images/seta-esquerda.svg";

export default function Etapa2({ setEtapa }) {

    const [senhaInteragiu, setSenhaInteragiu] = useState(false);
    const [senhaValue, setSenhaValue] = useState("");
    const [confirmarSenhaValue, setConfirmarSenhaValue] = useState("");
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const senha = watch("senha");
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("Dados da etapa 2:", data);
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

                    <div className={styleCadastro["input-container"]}>
                        <input
                            type="text"
                            id="nome"
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

                    <div className={styleCadastro["input-container"]}>
                        <input
                            type="date"
                            id="data"
                            className={styleCadastro['data-nascimento']}
                            {...register("data", { required: true })}

                            placeholder=""
                        />
                        <label htmlFor="data" className={styleCadastro.label}>* Data de nascimento</label>
                        <div
                            className={styleCadastro.underline}
                            style={{ marginBottom: errors.data ? "-4px" : "0px" }}
                        >

                        </div>
                    </div>

                    {errors.data && (
                        <div className={styleCadastro.erro}>
                            <img src={alert} alt="Ícone de alerta" />
                            <span>Data é obrigatória.</span>
                        </div>
                    )}

                </div>

            </div>

            <div className={styleCadastro['input-email']}>

                <div className={styleCadastro['input-container']}>
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
                        style={{ marginBottom: errors.email ? "-4px" : "0px" }}
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

            </div>

            <div className={styleCadastro['input-telefone']}>

                <div className={styleCadastro["input-container"]}>
                    <input
                        type="text"
                        id="telefone"
                        maxLength={11}
                        {...register("telefone", { required: true })}
                        placeholder=""
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

                    <div className={styleCadastro["input-container"]}>
                        <input
                            type="password"
                            id="senha"
                            placeholder=""
                            minLength={6} maxLength={16}
                            {...register("senha", {
                                required: "Senha é obrigatória.",
                                validate: {
                                    tamanho: (value) => value.length >= 6 && value.length <= 16 || "Entre 6 a 16 caracteres.",
                                    especial: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Mínimo de 1 caractere especial.",
                                    maiuscula: (value) => /[A-Z]/.test(value) || "Mínimo de 1 letra maiúscula.",
                                    numero: (value) => /\d/.test(value) || "Mínimo de 1 número."
                                }
                            })}
                            onFocus={() => setSenhaInteragiu(true)}
                            value={senhaValue}
                            onChange={(e) => {
                                setSenhaValue(e.target.value);
                                console.log(senhaValue);
                                if (!senhaInteragiu) setSenhaInteragiu(true);
                            }}
                        />

                        <label htmlFor="senha" className={styleCadastro.label}>* Senha</label>
                        <div
                            className={styleCadastro.underline}
                            style={{ marginBottom: errors.senha ? "0px" : "0px" }}
                        >

                        </div>
                    </div>

                    <div className={styleCadastro['container-erros']}>

                        {/* 1 - Tamanho */}
                        <div className={
                            senhaInteragiu
                                ? senhaValue.length >= 6 && senhaValue.length <= 16
                                    ? styleCadastro.check
                                    : styleCadastro.erro
                                : styleCadastro.neutro
                        }>
                            {senhaInteragiu && (
                                <img
                                    src={senhaValue.length >= 6 && senhaValue.length <= 16 ? check : alert}
                                    alt="Ícone"
                                />
                            )}
                            <span>Entre 6 a 16 caracteres.</span>
                        </div>

                        {/* 2 - Caractere especial */}
                        <div className={
                            senhaInteragiu
                                ? /[!@#$%^&*(),.?":{}|<>]/.test(senhaValue)
                                    ? styleCadastro.check
                                    : styleCadastro.erro
                                : styleCadastro.neutro}>
                            {senhaInteragiu && (
                                <img
                                    src={/[!@#$%^&*(),.?":{}|<>]/.test(senhaValue) ? check : alert}
                                    alt="Ícone"
                                />
                            )}
                            <span>Mínimo de 1 caractere especial (ex: !, @, #, $, etc).</span>
                        </div>

                        {/* 3 - Letra maiúscula */}
                        <div className={
                            senhaInteragiu
                                ? /[A-Z]/.test(senhaValue)
                                    ? styleCadastro.check
                                    : styleCadastro.erro
                                : styleCadastro.neutro}>
                            {senhaInteragiu && (
                                <img
                                    src={/[A-Z]/.test(senhaValue) ? check : alert}
                                    alt="Ícone"
                                />
                            )}
                            <span>Mínimo de 1 letra maiúscula.</span>
                        </div>

                        {/* 4 - Número */}
                        <div className={
                            senhaInteragiu
                                ? /\d/.test(senhaValue)
                                    ? styleCadastro.check
                                    : styleCadastro.erro
                                : styleCadastro.neutro}>
                            {senhaInteragiu && (
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

                    <div className={styleCadastro['input-container']}>
                        <input
                            type="password"
                            id="confirmarSenha"
                            minLength={6} maxLength={16}
                            {...register("confirmarSenha", {
                                required: "Confirmação de senha é obrigatória.",
                                validate: (value) => value === senhaValue || "As senhas não coincidem."
                            })}
                            placeholder=""
                        />
                        <label htmlFor="confirmarSenha" className={styleCadastro.label}>* Confirmar senha</label>
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
                    defaultValue=""
                    {...register("genero", { required: true })}
                >
                    <option value="" disabled>* Gênero</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="NAO_BINARIO">Não binário</option>
                    <option value="OUTRO">Outro</option>
                    <option value="NAO_INFORMAR">Prefiro não informar</option>
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
