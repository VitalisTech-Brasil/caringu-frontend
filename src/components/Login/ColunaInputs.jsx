import React from 'react';
import setaVoltar from '../../assets/images/seta-voltar.svg';
import googleLogo from '../../assets/logos/google-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Utils/Inputs';
import Button from '../Utils/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Importando o axios

const ColunaInputs = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, senha } = data;

    try {
      const resposta = await axios.get(`http://localhost:3000/pessoas?email=${email}`);
      const usuario = resposta.data;

      if (usuario.length === 0) {
        alert('Usuário não encontrado!');
        return;
      }

      const payloadUsuario = usuario[0];

      if (payloadUsuario.senha !== senha) {
        alert('Senha incorreta!');
        return;
      }

      // Criação da sessão no backend
      const sessaoLogada = await axios.post('http://localhost:3000/sessao', {
        usuarioId: payloadUsuario.id,
        nome: payloadUsuario.nome,
        email: payloadUsuario.email,
        logadoEm: new Date().toISOString(),
      });

      if (sessaoLogada.status !== 200) {
        throw new Error('Erro ao criar sessão.');
      }

      alert(`Bem-vindo, ${payloadUsuario.nome}!`);
      navigate('/home');
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert('Erro ao conectar ao servidor.');
    }
  };

  const loginComGoogle = async () => {
    try {
      const resposta = await axios.get('http://localhost:3000/auth/google'); // Supondo que você tenha um endpoint no backend para o Google OAuth

      if (resposta.status !== 200) {
        throw new Error('Erro ao fazer login com o Google.');
      }

      const dadosUsuario = resposta.data;

      alert(`Bem-vindo, ${dadosUsuario.nome}!`);
      navigate('/home'); // Navega para a página inicial após login bem-sucedido com o Google
    } catch (error) {
      console.error('Erro ao realizar login com o Google:', error);
      alert('Erro ao conectar ao servidor.');
    }
  };

  return (
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

        <form className="formulario gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="inputs w-full">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              {...register('email', { required: 'Email é obrigatório' })}
              isError={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              id="senha"
              name="senha"
              type="password"
              label="Senha"
              {...register('senha', { required: 'Senha é obrigatória' })}
              isError={!!errors.senha}
              errorMessage={errors.senha?.message}
            />
          </div>

          <div className="recuperacao-senha">
            <a href="/esqueci-senha">Esqueci minha senha</a>
          </div>

          <Button
            texto="Entrar"
            type="submit"
            cor="var(--azul-claro)"
            corTexto="var(--cor-secundaria)"
            corHover="#677e9c"
            width="100%"
            height="17.57%"
            fontSize="14px"
            onClick={onSubmit}
          />

          <Button
            logo={googleLogo}
            texto="Entrar com Google"
            type="submit"
            onClick={loginComGoogle}
            cor="var(--azul-escuro)"
            corTexto="var(--cor-secundaria)"
            corHover="var(--cor-primaria)"
            width="100%"
            height="17.57%"
            fontSize="14px"
          />
        </form>

        <footer className="justify-center items-center">
          <p>
            Não tem uma conta? <Link to="/cadastro">Cadastrar-se</Link>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default ColunaInputs;
