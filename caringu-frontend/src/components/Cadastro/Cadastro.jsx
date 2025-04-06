import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import styleCadastro from "./cadastro.module.css"

import imagemCadastro from "../../assets/images/imagem-cadastro.svg";
import logoCaringu from "../../assets/logos/caringu-logotipo-light.svg";
import alert from "../../assets/images/alert.svg";
import check from "../../assets/images/check.svg";
import setaEsquerda from "../../assets/images/seta-esquerda.svg";
/* import dumbellFitness from "../../assets/images/dumbbell-fitness.svg";
import mochilaFitness from "../../assets/images/mochila-treino.svg"; */


/* Não remover nenhum comentário, pois será utilizado na etapa que o Aluno existir no projeto */
const Cadastro = () => {
    const [etapa, setEtapa] = useState(2);
    const [tipoConta, setTipoConta] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const totalEtapas = tipoConta === "personal" ? 4 : tipoConta === "aluno" ? 3 : 3;

    const onSubmit = (data) => {
        console.log("Dados do formulário:", data);
        avancarEtapa();
    };

    console.log("Tipo Conta: " + tipoConta);
    console.log("Total Etapas: " + totalEtapas);
    console.log("Etapa: " + etapa);

    const avancarEtapa = () => {
        /* if (etapa === 1 && tipoConta === null) {
            alert("Por favor, selecione um tipo de conta antes de prosseguir!");
            return;
        } */

        if (etapa < totalEtapas) setEtapa(etapa + 1);
    };

    const voltarEtapa = () => {
        if (etapa > 2) setEtapa(etapa - 1);
    };

    /* Não remover, pois será utilizado na etapa que o Aluno existir no projeto */
    const selecionarTipoConta = (tipo) => {
        setTipoConta(tipo);
    };

    return (
        <>
            <main className={styleCadastro.main}>
                <section className={styleCadastro['primeira-coluna']} style={{ backgroundImage: `url(${imagemCadastro})` }}>
                    <a href="../index.html">
                        <img className={styleCadastro.logo} src={logoCaringu} alt="Logo da CaringU" />
                    </a>
                </section>

                <section className={styleCadastro['segunda-coluna']}>
                    <div className={styleCadastro['container-form']}>

                        <form action="">

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
                                            required
                                        />

                                        <label htmlFor="nome" className={styleCadastro.label}>* Nome completo</label>
                                        <div className={styleCadastro.underline}></div>
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
                                        <input type="text" id="data" className={styleCadastro['data-nascimento']} required />
                                        <label htmlFor="data" className={styleCadastro.label}>* Data de nascimento</label>
                                        <div className={styleCadastro.underline}></div>
                                    </div>

                                    <div className={styleCadastro.erro}>
                                        <img src={alert} alt="Ícone de alerta" />
                                        <span>Data é obrigatória.</span>
                                    </div>

                                </div>

                            </div>

                            <div className={styleCadastro['input-email']}>

                                <div className={styleCadastro['input-container']}>
                                    <input type="text" id="email" required />
                                    <label htmlFor="email" className={styleCadastro.label}>* E-mail</label>
                                    <div className={styleCadastro.underline}></div>
                                </div>

                                <div className={styleCadastro.erro}>
                                    <img src={alert} alt="Ícone de alerta" />
                                    <span>E-mail é obrigatório.</span>
                                </div>

                            </div>

                            <div className={styleCadastro['input-telefone']}>

                                <div className={styleCadastro["input-container"]}>
                                    <input type="text" id="telefone" required />
                                    <label htmlFor="telefone" className={styleCadastro.label}>* Telefone</label>
                                    <div className={styleCadastro.underline}></div>
                                </div>

                                <div className={styleCadastro.erro}>
                                    <img src={alert} alt="Ícone de alerta" />
                                    <span>Telefone é obrigatório.</span>
                                </div>

                            </div>

                            <div className={styleCadastro["container-senhas"]}>

                                <div className={styleCadastro["input-senha"]}>

                                    <div className={styleCadastro["input-container"]}>
                                        <input type="password" id="senha" required />
                                        <label htmlFor="senha" className={styleCadastro.label}>* Senha</label>
                                        <div className={styleCadastro.underline}></div>
                                    </div>

                                    <div className={styleCadastro['container-erros']}>

                                        <div className={styleCadastro.erro}>
                                            <img src={alert} alt="Ícone de alerta" />
                                            <span>Entre 6 a 16 caracteres.</span>
                                        </div>
                                        <div className={styleCadastro.erro}>
                                            <img src={alert} alt="Ícone de alerta" />
                                            <span>Mínimo de 1 caractere especial (ex: !, @, #, $, etc).</span>
                                        </div>

                                        <div className={styleCadastro.erro}>
                                            <img src={alert} alt="Ícone de alerta" />
                                            <span>Mínimo de 1 letra maiúscula.</span>
                                        </div>

                                        <div className={styleCadastro.erro}>
                                            <img src={alert} alt="Ícone de alerta" />
                                            <span>Mínimo de 1 número.</span>
                                        </div>

                                    </div>

                                </div>

                                <div className={styleCadastro['input-confirmarSenha']}>

                                    <div className={styleCadastro['input-container']}>
                                        <input type="password" id="confirmarSenha" required />
                                        <label htmlFor="confirmarSenha" className={styleCadastro.label}>* Confirmar senha</label>
                                        <div className={styleCadastro.underline}></div>
                                    </div>

                                    <div className={styleCadastro['erro-confirmacaoSenha']}>
                                        <img src={alert} alt="Ícone de alerta" />
                                        <span>Confirmação de senha é obrigatória.</span>
                                    </div>

                                </div>

                            </div>

                            <div className={styleCadastro['input-genero']}>

                                <select className={styleCadastro.select} defaultValue="#" required>
                                    <option value="#" disabled>* Gênero</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="NAO_BINARIO">Não binário</option>
                                    <option value="OUTRO">Outro</option>
                                    <option value="NAO_INFORMAR">Prefiro não informar</option>
                                </select>

                                <div className={styleCadastro.erro}>
                                    <img src={alert} alt="Ícone de alerta" />
                                    <span>Selecione o gênero.</span>
                                </div>

                            </div>

                            <div>
                                <hr style={{height: "2%", width: "100%", color: "grey"}}/>
                                <div style={{marginTop: "1%"}}>* Obrigatório</div>
                            </div>
                        </form>


                        <footer className={styleCadastro.footer}>
                            <button className={styleCadastro.voltar} type="button" onClick={voltarEtapa}>
                                <img src={setaEsquerda} alt="Seta mirando para esquerda" />
                                <span>Voltar</span>
                            </button>

                            <button className={styleCadastro.prosseguir} type="submit">Prosseguir</button>
                        </footer>

                    </div>

                </section>

            </main>
        </>
    );
};

export default Cadastro;
