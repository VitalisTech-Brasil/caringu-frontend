// src/components/EsqueciSenha/EtapaCodigo.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Importando o axios
import InputVerificacao from './InputVerificacao';
import Button from '../Utils/Button';

const EtapaCodigo = ({ email, onAvancar }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [codigo, setCodigo] = useState('');

  const handleVerificarCodigo = async (data) => {
    const { codigo } = data; // Pega o código do formulário

    try {
      // Usando axios para enviar a requisição de verificação de código
      const response = await axios.post('http://seu-servidor.com/api/verificar-codigo', { email, codigo });

      if (response.data.success) {
        onAvancar(); // Avança para a próxima etapa
      } else {
        alert('Código incorreto.');
      }
    } catch (error) {
      console.error('Erro ao verificar código:', error);
      alert('Erro ao tentar verificar o código.');
      onAvancar();
    }
  };

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
            <p>Enviamos um código de verificação para <strong>{email}</strong>. Digite o código abaixo para continuar.</p>
          </div>

          {/* Formulário com react-hook-form */}
          <form onSubmit={handleSubmit(handleVerificarCodigo)} className="w-1/2">
            <InputVerificacao
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              id="codigo"
              name="codigo"
              label="Código"
              {...register('codigo', {
                required: 'O código é obrigatório',
                pattern: {
                  value: /^[0-9]{6}$/, // Exemplo: código de 6 dígitos
                  message: 'Código inválido. Deve conter 6 dígitos.'
                }
              })}
              isError={!!errors.codigo}
              errorMessage={errors.codigo?.message}
              onComplete={(codigo) => setCodigo(codigo)}
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
                onClick={handleVerificarCodigo}
              />
              <p>
                Não recebeu o código?{' '}
                <a href="">Clique para reenviar em [x] segundos</a>
              </p>
              <a href="/Login">Voltar para Login</a>
            </footer>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EtapaCodigo;
