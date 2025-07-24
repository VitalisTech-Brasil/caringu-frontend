import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Importando o axios
import { caringuApi } from '../../provider/caringuApi';
import InputVerificacao from './InputVerificacao';
import Button from '../Utils/Button';
import { useEmail } from './Context/EsqueciSenhaContext';  // Importando o useEmail

const EtapaCodigo = ({ onAvancar }) => {
  const { email } = useEmail(); // Pega o email do Context
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [codigo, setCodigo] = useState('');

  // Função para verificar o código
  const handleVerificarCodigo = async (codigo) => {

    try {
      // Envia o código para o backend para verificação
      const response = await caringuApi.post('/esqueci-senha/validacao-token', { email, codigo });

      console.log(response.status)

      if (response.status == 200) {
        onAvancar(); // Avança para a próxima etapa
      } else {
        alert('Código incorreto.');
      }
    } catch (error) {
      console.error('Erro ao verificar código:', error);
      alert('Erro ao tentar verificar o código.');
    }
  };

  const handleComplete = (codigo) => {
    setCodigo(codigo);  // Atualiza o estado do código
    handleVerificarCodigo(codigo);  // Chama a função de verificação
  };

  useEffect(() => {
    if (!email) {
      alert('Email não encontrado. Por favor, forneça um email primeiro.');
       // Redireciona de volta para a página anterior
      window.location.href = '/esqueci-senha';
    }
  }, [email]);

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
          onSubmit={handleSubmit(handleVerificarCodigo)}
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

            <a
              href="/login"
              className="text-xs md:text-sm text-[var(--cor-primaria)] hover:underline"
            >
              Voltar para Login
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EtapaCodigo;
