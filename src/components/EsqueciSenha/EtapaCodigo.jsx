import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Importando o axios
import { caringuApi } from '../../provider/caringuApi';
import InputVerificacao from './InputVerificacao';
import Button from '../Utils/Button';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import CustomToast from '../Utils/CustomToast';
import { useEmail } from './Context/EsqueciSenhaContext';  // Importando o useEmail

const EtapaCodigo = ({ onAvancar }) => {
  const { email } = useEmail(); // Pega o email do Context
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [codigo, setCodigo] = useState('');
  const [contadorReset, setContadorReset] = useState(60);
  const [permiteReenviar, setPermiteReenviar] = useState(false);

  // Função para verificar o código
  const handleVerificarCodigo = async (codigo) => {

    try {
      // Envia o código para o backend para verificação
      const response = await caringuApi.post('/esqueci-senha/validacao-token', { email, codigo });


      if (response.status == 200) {
        onAvancar(); // Avança para a próxima etapa
        toast.custom((t) => (
          <CustomToast t={t} type="success" message="Código verificado com sucesso!" />
        ));
      } else {
        toast.custom((t) => (
          <CustomToast t={t} type="error" message="Código incorreto." />
        ));
      }
    } catch (error) {
      console.error('Erro ao verificar código:', error);
      toast.custom((t) => (
        <CustomToast t={t} type="error" message="Erro ao tentar verificar o código." />
      ));
    }
  };

  const handleReenviarCodigo = async () => {
    if (!permiteReenviar) return;

    setPermiteReenviar(false);
    setContadorReset(60);

    try {
      const response = await caringuApi.post('/esqueci-senha', { email });
      if (response.status === 200) {
        toast.custom((t) => (
          <CustomToast t={t} type="success" message="Novo código enviado!" />
        ));
      }
    } catch (error) {
      console.error('Erro ao reenviar código:', error);
      toast.custom((t) => (
        <CustomToast t={t} type="error" message="Erro ao enviar o código. Tente novamente." />
      ));
    }
  };

  const handleComplete = (codigo) => {
    setCodigo(codigo);  // Atualiza o estado do código
  };

  useEffect(() => {
    if (!email) {
      toast.custom((t) => (
        <CustomToast t={t} type="error" message="Email não encontrado. Por favor, forneça um email primeiro." />
      ));
      window.location.href = '/esqueci-senha';
    }
  }, [email]);

  useEffect(() => {
    let interval = null;

    if (!permiteReenviar && contadorReset > 0) {
      interval = setInterval(() => {
        setContadorReset(prev => prev - 1);
      }, 1000);
    } else if (contadorReset === 0) {
      setPermiteReenviar(true);
    }

    return () => clearInterval(interval);
  }, [contadorReset, permiteReenviar]);

  return (
    <section className="flex justify-center items-center min-h-screen w-full xl:w-1/2 px-4 py-8">
      <div className="flex flex-col items-center w-full max-w-md md:max-w-xl">
        {/* Barra de progresso */}
        <div className="flex w-full max-w-[400px] items-center justify-between gap-2 md:gap-4 mb-8">
          <div className="bg-[var(--azul-claro)] rounded-full h-2 md:h-3 w-1/4 max-w-[100px] min-w-[40px]"></div>
          <div className="bg-[var(--cor-primaria)] rounded-full h-2 md:h-3 w-1/4 max-w-[100px] min-w-[40px]"></div>
          <div className="bg-[var(--azul-claro)] rounded-full h-2 md:h-3 w-1/4 max-w-[100px] min-w-[40px]"></div>
        </div>

        {/* Texto principal */}
        <div className="text-[var(--cor-primaria)] text-center mb-8 w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[48px] font-bold mb-2 md:mb-4">
            Verifique seu e-mail
          </h1>
          <p className="text-sm md:text-base">
            Enviamos um código de verificação para <strong className="break-all">{email}</strong>.
            Digite o código abaixo para continuar.
          </p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerificarCodigo(codigo);
          }}
          className="w-full max-w-xs md:max-w-md"
        >
          <InputVerificacao
            length={4}
            onComplete={handleComplete}
            className="mb-6" // Adicione esta prop se o componente aceitar className
          />

          <div className="flex flex-col items-center gap-4 w-full">
            <Button
              texto="Verificar Código"
              type="submit"
              cor="var(--laranja)"
              corTexto="var(--cor-secundaria)"
              width="100%"
              height="40px"
              fontSize="14px"
            />

            <div className='text-sm'>
              Não recebeu o código?
              <button
                type="button"
                onClick={handleReenviarCodigo}
                disabled={!permiteReenviar}
                className={`ml-1 underline ${permiteReenviar ? 'cursor-pointer font-bold' : 'cursor-not-allowed opacity-50'}`}
              >
                {permiteReenviar ? 'Clique aqui para reenviar' : `Reenviar código em ${contadorReset}s`}
              </button>
            </div>

            <a
              href="/login"
              className="text-xs md:text-sm text-[var(--cor-primaria)] hover:underline"
            >
              Voltar para Login
            </a>
          </div>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default EtapaCodigo;
