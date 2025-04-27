import { React}  from 'react';
import setaVoltar from '../../assets/images/seta-voltar.svg';
import googleLogo from '../../assets/logos/google-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Utils/Inputs';
import Button from '../Utils/Button';
import { useForm } from 'react-hook-form';
import { api } from '../../provider/api';

const ColunaInputs = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();

  const verificarUsuario = async (data) => {
 
    const { email, senha } = data;
    console.log('Email:', email);
    console.log('Senha:', senha);

    if (!email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const response= await api.post('/login', {email,senha},{
        headers: {
          'Content-Type': 'application/json'
        }
      });

        if (response.status === 200 && response.data?.token) {
          sessionStorage.setItem('authToken',response.data.token);
          sessionStorage.setItem('usuario',response.data.nome);
          sessionStorage.setItem('tipo',response.data.tipo);
          setTimeout(() =>{
            navigate('/home'); // mudar aqui para a página que vai se redirecionar após o login
          },1000);
        }else {
          throw new Error('Ops! Ocorreu um erro interno.');
        }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
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

        <form className="formulario gap-2" onSubmit={handleSubmit(verificarUsuario)}>
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
          />

          <Button
            logo={googleLogo}
            texto="Entrar com Google"
            type="submit"
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
