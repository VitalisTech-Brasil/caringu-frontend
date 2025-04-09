import React, { useState } from 'react';
import setaVoltar from '../../assets/images/seta-voltar.svg';
import googleLogo from '../../assets/logos/google-logo.svg';
import { Link } from 'react-router-dom';
import Input from './inputs';
import PasswordToggleButton from './PasswordToggleButton';

const ColunaInputs = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const verificarUsuario = async (event) => {
    event.preventDefault();

    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3000/pessoas?email=${email}`
      );
      const usuario = await resposta.json();

      if (usuario.length === 0) {
        alert('Usuário não encontrado!');
        return;
      }

      const payloadUsuario = usuario[0];

      if (payloadUsuario.senha !== senha) {
        alert('Senha incorreta!');
        return;
      }

      const sessaoLogada = await fetch('http://localhost:3000/sessao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuarioId: payloadUsuario.id,
          nome: payloadUsuario.nome,
          email: payloadUsuario.email,
          logadoEm: new Date().toISOString(),
        }),
      });

      if (!sessaoLogada.ok) {
        throw new Error('Erro ao criar sessão.');
      }

      alert(`Bem-vindo, ${payloadUsuario.nome}!`);
      window.location.href = 'home.html';
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert('Erro ao conectar ao servidor.');
    }
  };

  return (
    <>
      <section className="coluna2">
        <div className="seta-voltar">
          <Link to="/">
            <img className="imagem-seta" src={setaVoltar} alt="Voltar" />
          </Link>
        </div>

        <div className="container">
          <header className="container-titulos">
            <h1>Pronto para continuar?</h1>
            <p>Faça login para continuar sua experiência.</p>
          </header>

          <form className="formulario" onSubmit={verificarUsuario}>
            <div className="inputs w-full">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                id="senha"
                name="senha"
                type="password"
                label="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

            </div>

            <div className="recuperacao-senha">
              <a href="/esqueci-senha">Esqueci minha senha</a>
            </div>

            <button id="botao-entrada" type="submit">
              Entrar
            </button>

            <div className="container-botao-google">
              <button className="login-google">
                <img src={googleLogo} alt="Google Logo" />
                Entrar com Google
              </button>
            </div>

          </form>

          <footer className='justify-center items-center'>
            <p>
              Não tem uma conta? <Link to="/cadastro">Cadastrar-se</Link>
            </p>
          </footer>
        </div>
      </section>
    </>
  );
};

export default ColunaInputs;
