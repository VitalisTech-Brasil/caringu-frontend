import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./cadastro.module.css"

import imagemCadastro from "../../assets/images/imagem-cadastro.svg";
import logoCaringu from "../../assets/logos/caringu-logotipo-light.svg";
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
            <main>
                <section className="coluna1" style={{ backgroundImage: `url(${imagemCadastro})` }}>
                    <a href="../index.html">
                        <img className="logo" src={logoCaringu} alt="Logo da CaringU" />
                    </a>
                </section>

                <section className="coluna2">
                    <section className="container">

                    {/* {etapa === 1 && (
                        <div className="etapa1">
                            <header className="container-titulos">
                                <h1>Como deseja se cadastrar?</h1>
                                <h2>Escolha o tipo de conta que deseja criar.</h2>
                            </header>
                            <div className="container-botoes">
                                <button
                                    id="botao-personal"
                                    className={tipoConta === "personal" ? "botaoSelecionado" : ""}
                                    onClick={() => selecionarTipoConta("personal")}>
                                    <div className="imagem-botao">
                                        <img src={dumbellFitness} alt="Halter de academia" />
                                    </div>
                                    <div className="descricao">
                                        <span>Personal Trainer</span>
                                        <p>Para profissionais que oferecem serviços de treinos.</p>
                                    </div>
                                </button>
                                <button
                                    id="botao-aluno"
                                    className={tipoConta === "aluno" ? "botaoSelecionado" : ""}
                                    onClick={() => selecionarTipoConta("aluno")}>
                                    <div className="imagem-botao">
                                        <img src={mochilaFitness} alt="Mochila de treino" />
                                    </div>
                                    <div className="descricao">
                                        <span>Aluno</span>
                                        <p>Para quem busca um personal trainer.</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                    */}

                        {etapa === 2 && (
                            <div className="etapa2">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h1>Dados Cadastrais</h1>

                                    <input
                                        type="text"
                                        placeholder="* Nome completo"
                                        {...register("nome", { required: "Nome é obrigatório." })}
                                    />

                                    <input
                                        type="date"
                                        placeholder="* Data de nascimento"
                                        maxLength={10}
                                        max={10}
                                        {...register("dataNascimento", { required: "Data de nascimento é obrigatória." })}
                                    />

                                    <input
                                        type="email"
                                        placeholder="* Email"
                                        {...register("email", {
                                            required: "E-mail é obrigatório.",
                                            pattern: { value: /^\S+@\S+\.\S+$/, message: "E-mail inválido." }
                                        })}
                                    />

                                    <input
                                        type="tel"
                                        placeholder="* Telefone"
                                        {...register("telefone", { required: "Telefone é obrigatório." })}
                                    />

                                    <input
                                        type="password"
                                        placeholder="* Senha"
                                        minLength={6} maxLength={16}
                                        {...register("senha", { required: "Senha é obrigatória.", minLength: { value: 6, message: "Mínimo de 6 caracteres." } })}
                                    />

                                    <input
                                        type="password"
                                        placeholder="* Confirmar Senha"
                                        {...register("confirmarSenha", { required: "Confirmação de senha obrigatória." })}
                                    />

                                    <select {...register("genero", { required: "Selecione um gênero." })} defaultValue="">
                                        <option value="" disabled>* Selecione o gênero</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Feminino</option>
                                        <option value="NAO_BINARIO">Não binário</option>
                                        <option value="OUTRO">Outro</option>
                                        <option value="NAO_INFORMAR">Prefiro não informar</option>
                                    </select>

                                    <hr />
                                    <span>*  Obrigatório</span>
                                    {/* Exibição de erros em uma única div */}
                                    {Object.keys(errors).length > 0 && (
                                        <div className="mensagens-erro">
                                            {Object.values(errors).map((erro, index) => (
                                                <p key={index} className="erro">{erro.message}</p>
                                            ))}
                                        </div>
                                    )}

                                    <footer>
                                        <button className="voltar" type="button" onClick={voltarEtapa}>
                                            <img src={setaEsquerda} alt="Seta mirando para esquerda" />
                                            <span>Voltar</span>
                                        </button>

                                        <button className="prosseguir" type="submit">Prosseguir</button>
                                    </footer>
                                </form>

                            </div>
                        )}

                        {etapa === 3 /* tipoConta === "personal"  */ && (
                            <div className="etapa3-personal">
                                <form>
                                    <h1>Informações Profissionais</h1>
                                    <input
                                        type="text"
                                        name='cref'
                                        placeholder="* Registro do CREF"
                                        /* onChange={mascaraCREF} */
                                        maxLength={11} required />
                                    <input
                                        name='experiencia'
                                        type="text"
                                        maxLength={2}
                                        placeholder="* Anos de experiência" required />

                                    <select id="select_especialidade" name="especialidade" required defaultValue={""}>
                                        <option value="" disabled>* Selecione uma especialidade</option>
                                        <option value="musculacao">Musculação</option>
                                        <option value="treinamento-funcional">Treinamento Funcional</option>
                                        <option value="hiit">HIIT (Treino Intervalado de Alta Intensidade)</option>
                                        <option value="core">Treinamento de Core</option>
                                        <option value="emagrecimento">Treinamento para Emagrecimento</option>
                                        <option value="corrida-caminhada">Corrida e Caminhada</option>
                                        <option value="ciclismo-indoor">Ciclismo Indoor (Spinning)</option>
                                        <option value="treinamento-esportivo">Treinamento Esportivo</option>
                                        <option value="hipertrofia">Hipertrofia Muscular</option>
                                    </select>
                                </form>

                                <hr />
                                <span>*  Obrigatório</span>

                                <footer>
                                    <button className="voltar" onClick={voltarEtapa}>
                                        <img src={setaEsquerda} alt="Seta mirando para esquerda" />
                                        <span>Voltar</span>
                                    </button>

                                    <button className="prosseguir-etapa3" type="submit">Prosseguir</button>
                                </footer>
                            </div>
                        )}

                        {etapa === 4 && (
                            <div>
                                Cadastro realizado com sucesso
                            </div>
                        )}
                    </section>
                </section>
            </main>
        </>
    );
};

export default Cadastro23;
