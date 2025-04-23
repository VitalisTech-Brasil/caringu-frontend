import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Utils/Inputs'; // O componente Input deve receber `register`
import axios from 'axios';

const EtapaNovaSenha = ({ email, onAvancar }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const handleAlterarSenha = async (data) => {
    const { novaSenha } = data;
    try {
      const response = await axios.post("http://seu-servidor.com/api/alterar-senha", {
        email,
        novaSenha
      });

      const responseData = response.data;
      if (responseData.success) {
        onAvancar();
      } else {
        alert("Erro ao alterar a senha.");
      }
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      alert("Erro ao tentar alterar a senha.");
    }
  };

  return (
    <section className='flex justify-center items-center h-screen w-1/2'>
      <div className='flex justify-center items-center h-full w-full'>
        <div className='flex justify-center items-center w-full h-150 flex-col gap-10'>
          <div className='flex w-100 items-center justify-between'>
            <div className='bg-[var(--azul-claro)] rounded-full h-3 w-25'></div>
            <div className='bg-[var(--azul-claro)] rounded-full h-3 w-25'></div>
            <div className='bg-[var(--cor-primaria)] rounded-full h-3 w-25'></div>
          </div>
          <div className='text-[var(--cor-primaria)] h-20 w-2/3 text-center flex-col justify-end'>
            <h1 className=' text-[48px]'>Escolha uma nova senha</h1>
            <p>Sua nova senha deve ter pelo menos 6 caracteres.</p>
          </div>

          <form onSubmit={handleSubmit(handleAlterarSenha)} className='h-1/2 w-1/2'>
            <Input
              id="novaSenha"
              name="novaSenha"
              label="Nova Senha"
              type="password"
              error={errors.novaSenha}
            />

            <Input
              id="confirmarSenha"
              name="confirmarSenha"
              label="Confirmar Senha"
              type="password"
              error={errors.confirmarSenha}
            />

            <footer className='flex flex-col h-30 justify-between items-center'>
              <button
                type="submit"
                className='w-[511px] h-[50px] bg-[var(--laranja)] text-[var(--cor-secundaria)] rounded-[8px]'
              >
                Alterar Senha
              </button>
              <a href="/Login">Voltar para Login</a>
            </footer>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EtapaNovaSenha;
