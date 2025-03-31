import React from 'react'
import { useState } from "react";
import InputMask from "react-input-mask";
import "./cadastro.css"
import { validarDadosCadastrais, validarDadosProfissionais } from './validacoes';

import imagemCadastro from "../../assets/images/imagem-cadastro.svg";

import logoCaringu from "../../assets/logos/caringu-logotipo-light.svg";
import dumbellFitness from "../../assets/images/dumbbell-fitness.svg";
import mochilaFitness from "../../assets/images/mochila-treino.svg";
import setaEsquerda from "../../assets/images/seta-esquerda.svg";

const Cadastro = () => {
    const [etapa, setEtapa] = useState(1);
    const [tipoConta, setTipoConta] = useState(null);
    const [erros, setErros] = useState({});

    /* DADOS CADASTRAIS */
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [genero, setGenero] = useState("");

    /* INFORMAÇÕES PROFISSIONAIS */
    const [cref, setCref] = useState("");
    const [experiencia, setExperiencia] = useState("");
    const [especialidade, setEspecialidade] = useState("");

    const totalEtapas = tipoConta === "personal" ? 3 : tipoConta === "aluno" ? 2 : 1;

    const validarCampos = () => {
        let errosTemp = {};

        if (etapa === 2) {
            if (!nome.trim()) errosTemp.nome = "Nome é obrigatório.";
            if (!dataNascimento.trim() || dataNascimento.length < 10) errosTemp.dataNascimento = "Data de nascimento inválida.";
            if (!email.trim() || !email.includes("@")) errosTemp.email = "E-mail inválido.";
            if (!telefone.trim() || telefone.length < 10) errosTemp.telefone = "Telefone inválido.";
            if (!senha.trim() || senha.length < 6) errosTemp.senha = "Senha deve ter pelo menos 6 caracteres.";
            if (senha !== confirmarSenha) errosTemp.confirmarSenha = "As senhas não coincidem.";
            if (!genero) errosTemp.genero = "Selecione um gênero.";
        }

        if (etapa === 3 && tipoConta === "personal") {
            if (!cref.trim()) errosTemp.cref = "CREF é obrigatório.";
            if (!experiencia.trim()) errosTemp.experiencia = "Experiência é obrigatória.";
            if (!especialidade) errosTemp.especialidade = "Selecione uma especialidade.";
        }

        setErros(errosTemp);

        return Object.keys(errosTemp).length === 0; // Retorna true se não houver erros
    };

    const avancarEtapa = () => {
        if (etapa === 1 && tipoConta === null) {
            alert("Por favor, selecione um tipo de conta antes de prosseguir!");
            return;
        }

        if (!validarCampos()) return;

        if (etapa < totalEtapas) setEtapa(etapa + 1);
    };

    const voltarEtapa = () => {
        if (etapa > 1) setEtapa(etapa - 1);
    };

    const selecionarTipoConta = (tipo) => {
        setTipoConta(tipo);
    };

    const mascaraData = (e) => {
        let valor = e.target.value.replace(/\D+/g, '')

        // Adiciona a máscara para a data (dd/mm/aaaa)
        if (valor.length <= 2) {
            valor = valor.replace(/(\d{2})/, '$1');
        } else if (valor.length <= 4) {
            valor = valor.replace(/(\d{2})(\d{2})/, '$1/$2');
        } else if (valor.length <= 6) {
            valor = valor.replace(/(\d{2})(\d{2})(\d{2})/, '$1/$2/$3');
        } else {
            valor = valor.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        }

        setDataNascimento(valor);
    }

    const mascaraCREF = (e) => {
        let valor = e.target.value.replace(/[^0-9A-Za-z]/g, '').toUpperCase();

        if (valor.length > 6) {
            valor = valor.slice(0, 6) + '-' + valor.slice(6);
        }

        if (valor.length > 8 && valor.indexOf('/') === -1) {
            valor = valor.slice(0, 8) + '/' + valor.slice(8);
        }

        if (valor.indexOf('/') !== -1 && valor.length > valor.indexOf('/') + 3) {
            valor = valor.slice(0, valor.indexOf('/') + 4);
        }

        setCref(valor);
    };



    return (
        <main>
            <section className="coluna1" style={{ backgroundImage: `url(${imagemCadastro})` }}>
                <a href="../index.html">
                    <img className="logo" src={logoCaringu} alt="Logo da CaringU" />
                </a>
            </section>

            <section className="coluna2">


                <section className="container">
                    {etapa === 1 && (
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

                    {etapa === 2 && (
                        <div className="etapa2">
                            <form>
                                <h1>Dados Cadastrais</h1>

                                <div className="div-nome-data">
                                    <input
                                        type="text"
                                        name="nome"
                                        id='input-nome'
                                        placeholder="* Nome completo"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        name="dataNascimento"
                                        id='input-dataNascimento'
                                        placeholder="* Data de nascimento"
                                        onChange={(e) => setDataNascimento(e.target.value)}
                                        value={dataNascimento}
                                        maxLength={10}
                                        required
                                    />
                                </div>

                                <input type="text" name="email" placeholder="* Email" required />

                                <input type="text" name="telefone" placeholder="* Telefone" maxLength={11} required />
                                <div className="senhas">
                                    <div className="div-senha">
                                        <input type="password"
                                            name="senha" placeholder="* Senha"
                                            minLength={6} maxLength={16}
                                            required />
                                        <div className="validacoes-senha">
                                            <span>Entre 6 - 16 caracteres</span>
                                            <span>Mínimo de 1 caractere especial (ex: !, @, #, $, etc.)</span>
                                            <span>Mínimo de 1 letra maiúscula</span>
                                            <span>Mínimo de 1 número</span>
                                        </div>
                                    </div>
                                    <div className="div-confirmarSenha">
                                        <input type="password" name="confirmarSenha" minLength={6} maxLength={16} placeholder="* Confirmar Senha" required />
                                    </div>
                                </div>

                                <select name="genero" defaultValue="">
                                    <option value="" disabled>* Selecione o gênero</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="NAO_BINARIO">Não binário</option>
                                    <option value="OUTRO">Outro</option>
                                    <option value="NAO_INFORMAR">Prefiro não informar</option>
                                </select>
                                
                                <div>
                                    <hr />
                                    <span>*  Obrigatório</span>
                                </div>
                            </form>

                        </div>
                    )}

                    {etapa === 3 && tipoConta === "personal" && (
                        <div className="etapa3-personal">
                            <form>
                                <h1>Informações Profissionais</h1>
                                <input
                                    type="text"
                                    name='cref'
                                    placeholder="* Registro do CREF"
                                    onChange={mascaraCREF}
                                    maxLength={11} required />
                                <input
                                    name='experiencia'
                                    type="text"
                                    maxLength={2}
                                    placeholder="* Anos de experiência" required />

                                <select id="select_especialidade" name="especialidade" required >
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
                        </div>
                    )}

                    <footer>
                        {etapa >= 1 && (
                            <button className="voltar" onClick={voltarEtapa}>
                                <img src={setaEsquerda} alt="Seta mirando para esquerda" />
                                <span>Voltar</span>
                            </button>
                        )}
                        <button className="prosseguir" onClick={avancarEtapa} disabled={etapa === 1 && tipoConta === null}>Prosseguir</button>
                    </footer>
                </section>
            </section>
        </main>
    );
};

export default Cadastro;
