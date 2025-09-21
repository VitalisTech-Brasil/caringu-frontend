import { React, useEffect, useState } from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import setaVoltar from '../../assets/images/seta-voltar.svg';
import googleLogo from '../../assets/logos/google-logo.svg';
import loadingGif from "../../assets/gifs/loading.gif";
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Utils/Inputs';
import ButtonLogin from '../Utils/ButtonLogin';
import ButtonLoading from '../Utils/ButtonLoading';
import { useForm } from 'react-hook-form';
import { api } from '../../provider/api';
import toast from 'react-hot-toast';
import CustomToast from '../Utils/CustomToast';
import alert from "../../assets/images/alert.svg";

const ColunaInputs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();
  const [tempoRestante, setTempoRestante] = useState(null);

  useEffect(() => {
    return () => {
      toast.remove();
    };
  }, []);

  // efeito para fazer o contador regressivo
  useEffect(() => {
    if (tempoRestante === null) return;

    if (tempoRestante <= 0) {
      setTempoRestante(null); // desbloqueia quando chega a 0
      return;
    }

    const timer = setTimeout(() => {
      setTempoRestante((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [tempoRestante]);

  // formatar tempo em mm:ss
  const formatarTempo = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = segundos % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setLoadingGoogle(true);
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
      } finally {
        setLoadingGoogle(false);
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
    setLoading(true);
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
      } else if (error.response?.status === 423) {
        toast.custom((t) => (
          <CustomToast t={t} type="error" message="Login bloqueado por excesso de tentativas. Tente novamente mais tarde" />
        ));
        const tempo = error.response.data.tempoRestante;
        setTempoRestante(tempo);
      } else {
        console.error('Erro ao realizar login:', error);
        toast.custom((t) => (
          <CustomToast t={t} type="error" message="Erro ao conectar ao servidor. Tente novamente mais tarde." />
        ));
      }
    } finally {
      setLoading(false);
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
              marginBottomLinha="1.55rem"
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
              marginBottomLinha="1.55rem"
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


          <ButtonLogin
            texto={
              loading ? (
                <span className="flex items-center justify-center gap-2">
                  Entrando
                  <img src={loadingGif} alt="Carregando" className="w-7 h-7 inline-block" />
                </span>
              ) : 'Entrar'
            }
            type="submit"
            cor="var(--azul-claro)"
            corTexto="var(--cor-secundaria)"
            width="100%"
            height="12.15%"
            fontSize="14px"
            disabled={!!tempoRestante}
          />

          <ButtonLoading
            logo={googleLogo}
            texto={
              loadingGoogle ? (
                <span className="flex items-center justify-center gap-2">
                  Entrando com Google
                  <img src={loadingGif} alt="Carregando" className="w-7 h-7 inline-block" />
                </span>
              ) : 'Entrar com Google'
            }
            type="button"
            cor="var(--azul-escuro)"
            corTexto="var(--cor-secundaria)"
            width="100%"
            height="12.15%"
            fontSize="14px"
            onClick={() => loginGoogle()}
            disabled={!!tempoRestante}
          />

          {tempoRestante && (
            <div className="mt-2 w-full text-center font-bold text-[#D45C56] text-md flex justify-center gap-3">
              <img src={alert} alt="Ícone de alerta" />
              <span>Tente novamente em {formatarTempo(tempoRestante)}</span>
            </div>
          )}

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
