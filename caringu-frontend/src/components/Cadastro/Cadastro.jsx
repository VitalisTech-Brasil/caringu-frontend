import React from 'react'
import { useState } from "react";
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
    const [cref, setCref] = useState("");
    const [dadosCadastrais, setDadosCadastrais] = useState({
        nome: "",
        dataNascimento: "",
        email: "",
        telefone: "",
        senha: "",
        confirmarSenha: "",
        genero: "",
    });
    
    const [dadosProfissionais, setDadosProfissionais] = useState({
        cref: "",
        experiencia: "",
        especialidade: "",
    });

    const handleChangeCadastral = (e) => {
        setDadosCadastrais({ ...dadosCadastrais, [e.target.name]: e.target.value });
    };
    
    const handleChangeProfissional = (e) => {
        setDadosProfissionais({ ...dadosProfissionais, [e.target.name]: e.target.value });
    };

    const totalEtapas = tipoConta === "personal" ? 3 : tipoConta === "aluno" ? 2 : 1;

    const avancarEtapa = () => {
        if (etapa === 1 && tipoConta === null) {
            alert("Por favor, selecione um tipo de conta antes de prosseguir!");
            return;
        }
    
        if (etapa === 2 && !validarDadosCadastrais(dadosCadastrais)) {
            return;
        }
    
        if (etapa === 3 && tipoConta === "personal" && !validarDadosProfissionais(dadosProfissionais)) {
            return;
        }

        if (etapa < totalEtapas) setEtapa(etapa + 1);
    };

    const voltarEtapa = () => {
        if (etapa > 1) setEtapa(etapa - 1);
    };

    const selecionarTipoConta = (tipo) => {
        setTipoConta(tipo);
    };

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
                                <input type="text" name="nome" placeholder="* Nome completo" required onChange={handleChangeCadastral} value={dadosCadastrais.nome}/>
                                <input type="date" name="dataNascimento" placeholder="* Data de nascimento" maxLength={10} required onChange={handleChangeCadastral} value={dadosCadastrais.dataNascimento}/>
                                <input type="text" name="email" placeholder="* Email" required onChange={handleChangeCadastral} value={dadosCadastrais.email}/>
                                <input type="text" name="telefone" placeholder="* Telefone" maxLength={11} required onChange={handleChangeCadastral} value={dadosCadastrais.telefone}/>
                                <div className="div-senha">
                                    <input
                                        type="password"
                                        name="senha" placeholder="* Senha"
                                        minLength={6} maxLength={16}
                                        required 
                                        onChange={handleChangeCadastral} value={dadosCadastrais.senha}/>
                                    <div>
                                        <span>Entre 6 - 16 caracteres</span>
                                        <span>Mínimo de 1 caractere especial (ex: !, @, #, $, etc.)</span>
                                        <span>Mínimo de 1 letra maiúscula</span>
                                        <span>Mínimo de 1 número</span>
                                    </div>
                                </div>
                                <input type="password" name="confirmarSenha" minLength={6} maxLength={16} placeholder="* Confirmar Senha" required onChange={handleChangeCadastral} value={dadosCadastrais.confirmarSenha}/>
                                <select name="genero"
                                    onChange={handleChangeCadastral}
                                    value={dadosCadastrais.genero} defaultValue="">
                                    <option value="" disabled>* Selecione o gênero</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                    <option value="NAO_BINARIO">Não binário</option>
                                    <option value="OUTRO">Outro</option>
                                    <option value="NAO_INFORMAR">Prefiro não informar</option>
                                </select>
                            </form>

                            <hr />
                            <span>*  Obrigatório</span>
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
                                    onKeyUp={mascaraCREF}
                                    onChange={mascaraCREF}
                                    value={cref}
                                    maxLength={11} required />
                                <input 
                                    name='experiencia'
                                    type="number"
                                    onChange={handleChangeProfissional} 
                                    value={dadosProfissionais.experiencia}
                                    placeholder="* Anos de experiência" required />

                                <select id="select_especialidade" name="especialidade" required defaultValue="" onChange={handleChangeProfissional} value={dadosProfissionais.especialidade}>
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
