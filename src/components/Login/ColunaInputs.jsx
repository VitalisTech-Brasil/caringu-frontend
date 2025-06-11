import { React, useEffect } from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import setaVoltar from '../../assets/images/seta-voltar.svg';
import googleLogo from '../../assets/logos/google-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Utils/Inputs';
import Button from '../Utils/Button';
import { useForm } from 'react-hook-form';
import { api } from '../../provider/api';
import toast from 'react-hot-toast';
import CustomToast from '../Utils/CustomToast';

const ColunaInputs = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();


  useEffect(() => {
    return () => {
      toast.remove();
    };
  }, []);

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      
      try {
        const response = await api.post('/login/google', {
          code: codeResponse.code
        }, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {
          sessionStorage.setItem('authToken', response.data.token);
          sessionStorage.setItem('usuario', response.data.nome);
          sessionStorage.setItem('pessoaId', response.data.pessoaId);
          sessionStorage.setItem('tipo', response.data.tipo);
          sessionStorage.setItem('email', response.data.email);

          toast.custom((t) => (
            <CustomToast t={t} type="success" message="Login com Google realizado!" />
          ));

          setTimeout(() => {
            if (response.data.tipo === "PERSONAL") {
              navigate('/home');
            } else {
              navigate('/procurando-personal');
            }
          }, 1000);
        }
      } catch (error) {
        toast.custom((t) => (
          <CustomToast t={t} type="error" message="Erro ao fazer login com Google." />
        ));
      }
    },
    onError: () => {
      toast.custom((t) => (
        <CustomToast t={t} type="error" message="Login com Google falhou." />
      ));
    },
    flow: 'auth-code'
  });

  const verificarUsuario = async (data) => {

    const { email, senha } = data;

    try {
      const response = await api.post('/login', { email, senha }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data?.token) {
        sessionStorage.setItem('pessoaId', response.data.pessoaId);
        sessionStorage.setItem('authToken', response.data.token);
        sessionStorage.setItem('usuario', response.data.nome);
        sessionStorage.setItem('tipo', response.data.tipo);
        sessionStorage.setItem('email', email);

        toast.custom((t) => (
          <CustomToast t={t} type="success" message="Login realizado com sucesso!" />
        ));

        setTimeout(() => {
          if (response.data.tipo === "PERSONAL") {
            navigate('/home');
          } else {
            navigate('/procurando-personal');
          }
        }, 1000);
      } else {
        throw new Error('Ops! Ocorreu um erro interno.');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.custom((t) => (
          <CustomToast t={t} type="error" message="Credenciais inválidas. Verifique seu email e senha." />
        ));
      } else {
        console.error('Erro ao realizar login:', error);
        toast.custom((t) => (
          <CustomToast t={t} type="error" message="Erro ao conectar ao servidor. Tente novamente mais tarde." />
        ));
      }
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-[95vh] w-[66%]" >
      <div className="mb-[3%]">
        <Link
          to="/"
          className="inline-block w-[8vw] h-[6vh] transition-transform duration-200 ease-in-out hover:scale-105"
        >
          <img src={setaVoltar} alt="Voltar" className="w-full h-full" />
        </Link>
      </div>

      <div className="h-[68%] w-[50%] flex flex-col justify-around items-center max-[800px]:w-[400px] max-[450px]:w-[300px]">
        <header className="flex flex-col justify-center items-center gap-[5px] text-center">
          <h1 className="text-[clamp(1.5rem,5vw,3rem)] font-black">
            Pronto para continuar?
          </h1>
          <p className="text-[clamp(1rem,2vw,1.5rem)] font-light">
            Faça login para continuar sua experiência.
          </p>
        </header>

        <form className="h-[70%] w-[70%] gap-2 flex flex-col justify-center items-center mb-[2%]" onSubmit={handleSubmit(verificarUsuario)}>
          <div className="inputs w-full max-[1050px]:w-[280px] max-[450px]:w-[250px]">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              marginBottomLinha="5.5%"
              margin="50px auto 0px 0px"
              corBordaInput={"#ccc"}
              {...register('email', { required: 'Email é obrigatório' })}
              isError={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              id="senha"
              name="senha"
              type="password"
              label="Senha"
              marginBottomLinha="5.5%"
              margin="50px auto 0px 0px"
              corBordaInput={"#ccc"}
              {...register('senha', { required: 'Senha é obrigatória' })}
              isError={!!errors.senha}
              errorMessage={errors.senha?.message}
            />
          </div>

          <div className="flex justify-start items-center w-full pt-[1%] pr-0 pb-[3%] pl-[2%]">
            <a className="text-base text-[var(--azul-escuro)] no-underline relative transition-transform duration-200 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[1px] after:w-full after:bg-[var(--azul-escuro)] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:scale-101 hover:after:scale-x-100" href="/esqueci-senha">Esqueci minha senha</a>
          </div>

          <Button
            texto="Entrar"
            type="submit"
            cor="var(--azul-claro)"
            corTexto="var(--cor-secundaria)"
            corHover="#677e9c"
            width="100%"
            height="12.15%"
            font-size="14px"
          />

          <Button
            logo={googleLogo}
            texto="Entrar com Google"
            type="button"
            cor="var(--azul-escuro)"
            corTexto="var(--cor-secundaria)"
            corHover="var(--cor-primaria)"
            width="100%"
            height="12.15%"
            font-size="14px"
            onClick={() => loginGoogle()}
          />
        </form>

        <footer className="justify-center items-center flex">
          <p className='max-[900px]:w-[270px]'>
            Não tem uma conta? <Link className="inline-block text-base text-[var(--azul-escuro)] no-underline relative transition-transform duration-200 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[2px] after:bg-[var(--azul-escuro)] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100" to="/cadastro">Cadastrar-se</Link>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default ColunaInputs;
