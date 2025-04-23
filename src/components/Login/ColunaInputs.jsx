import React, { useState } from 'react';
import setaVoltar from '../../assets/images/seta-voltar.svg';
import googleLogo from '../../assets/logos/google-logo.svg';
import { Link } from 'react-router-dom';
import Input from '../Utils/Inputs';
import Button from '../Utils/Button';
import { api } from '../../provider/api';
import { useNavigate } from 'react-router-dom';

const ColunaInputs = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const verificarUsuario = async (event) => {
 
    event.preventDefault();

    console.log('Email:', email);
    console.log('Senha:', senha);

    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const response= await api.post('/login', {
        email: email,
        senha: senha
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      });


        if (response.status === 200 && response.data?.token) {
          sessionStorage.setItem('authToken',response.data.token);
          sessionStorage.setItem('usuario',response.data.nome);
          sessionStorage.setItem('tipo',response.data.tipo);
          setTimeout(() =>{
            navigate('/'); // mudar aqui para a página que vai se redirecionar após o login
          },1000);
        }else {
          throw new Error('Ops! Ocorreu um erro interno.');
        }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert('Erro ao conectar ao servidor.');

    }
  };


      // const resposta = await fetch(
      //   `http://localhost:3000/pessoas?email=${email}`
      // );
      // const usuario = await resposta.json();

      // if (usuario.length === 0) {
      //   alert('Usuário não encontrado!');
      //   return;
      // }

      // const payloadUsuario = usuario[0];

      // if (payloadUsuario.senha !== senha) {
      //   alert('Senha incorreta!');
      //   return;
      // }

      // const sessaoLogada = await fetch('http://localhost:3000/sessao', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     usuarioId: payloadUsuario.id,
      //     nome: payloadUsuario.nome,
      //     email: payloadUsuario.email,
      //     logadoEm: new Date().toISOString(),
      //   }),
      // });

      // if (!sessaoLogada.ok) {
      //   throw new Error('Erro ao criar sessão.');
      // }

      // alert(`Bem-vindo, ${payloadUsuario.nome}!`);
      // window.location.href = 'home.html'; 


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

          <form className="formulario gap-2" onSubmit={verificarUsuario}>
            <div className="inputs w-full">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => {
                  console.log('Email digitado:', e.target.value);
                  setEmail(e.target.value);
                }}
                required
              />
              <Input
                id="senha"
                name="senha"
                type="password"
                label="Senha"
                value={senha}
                onChange={(e) => {
                  console.log('Senha digitada:', e.target.value);
                  setSenha(e.target.value);
                }}
                required
              />

            </div>

            <div className="recuperacao-senha">
              <a href="/esqueci-senha">Esqueci minha senha</a>
            </div>
            {/* 
            <button id="botao-entrada" type="submit">
              Entrar
            </button> */}

            <Button texto="Entrar" type="submit" cor="var(--laranja)" corTexto="var(--cor-secundaria)" corHover="#ca6333" width="100%" height="17.57%" fontSize="14px" />

            <Button logo={googleLogo} texto="Entrar com Google" type="submit" cor="var(--azul-escuro)" corTexto="var(--cor-secundaria)" corHover="var(--cor-primaria)" width="100%" height="17.57%" fontSize="14px" />
{/* 
            <div className="container-botao-google">
              <button className="login-google">
                <img src={googleLogo} alt="Google Logo" />
                Entrar com Google
              </button>
            </div> */}

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
