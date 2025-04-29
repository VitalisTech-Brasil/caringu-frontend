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
    <section className="flex justify-center items-center h-screen w-1/2">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex justify-center items-center w-full h-150 flex-col gap-10">
          <div className="flex w-100 items-center justify-between">
            <div className="bg-[var(--azul-claro)] rounded-full h-3 w-25"></div>
            <div className="bg-[var(--cor-primaria)] rounded-full h-3 w-25"></div>
            <div className="bg-[var(--azul-claro)] rounded-full h-3 w-25"></div>
          </div>

          <div className="text-[var(--cor-primaria)] h-27 w-1/2 text-center flex-col justify-end">
            <h1 className="text-[48px]">Verifique seu e-mail</h1>
            <p>
              Enviamos um código de verificação para <strong>{email}</strong>. Digite o código abaixo para continuar.
            </p>
          </div>

          {/* Formulário com react-hook-form */}
          <form onSubmit={handleSubmit(handleVerificarCodigo)} className="w-1/2">
            <InputVerificacao
              length={4}
              onComplete={handleComplete}  // Passando a função handleComplete
            />

            <footer className="flex flex-col h-30 justify-between items-center">
              <Button
                texto="Verificar Código"
                type="submit"
                cor="var(--laranja)"
                corTexto="var(--cor-secundaria)"
                corHover="#ca6333"
                width="511px"
                height="50px"
                fontSize="14px"
              />
              <p>
                Não recebeu o código?{' '}
                <a href="">Clique para reenviar em [x] segundos</a>
              </p>
              <a href="/login">Voltar para Login</a>
            </footer>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EtapaCodigo;
