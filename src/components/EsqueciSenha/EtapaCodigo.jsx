// src/components/EsqueciSenha/EtapaCodigo.jsx
import React, { useState } from 'react';
import InputVerificacao from './InputVerificacao';

const EtapaCodigo = ({ email, onAvancar }) => {
  const [codigo, setCodigo] = useState('');

  const handleVerificarCodigo = async () => {
    const response = await fetch("http://seu-servidor.com/api/verificar-codigo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, codigo }),
    });

    const data = await response.json();
    if (data.success) {
      onAvancar();
    } else {
      alert("Código incorreto.");
    }
  };

  return (
    <section className='flex justify-center items-center h-screen w-1/2'>
      <div className='flex justify-center items-center h-full w-full'>
        <div className='flex justify-center items-center w-full h-150 flex-col gap-10'>
          <div className='flex w-100 items-center justify-between'>
            <div className='bg-[var(--azul-claro)] rounded-full h-6 w-25'></div>
            <div className='bg-[var(--cor-primaria)] rounded-full h-6 w-25'></div>
            <div className='bg-[var(--azul-claro)] rounded-full h-6 w-25'></div>
          </div>
          <div className='text-[var(--cor-primaria)] h-27 w-1/2 text-center flex-col justify-end'>
            <h1 className=' text-[48px]'>Verifique seu e-mail</h1>
            <p>Enviamos um código de verificação para <strong>{email}</strong>. Digite o código abaixo para continuar.</p>
          </div>
          <InputVerificacao value={codigo} onChange={setCodigo} />
          <footer className='flex flex-col h-30 justify-between items-center'>
            <button onClick={handleVerificarCodigo} className='w-[511px] h-[50px] bg-[var(--laranja)] text-[var(--cor-secundaria)] rounded-[8px]'>
              Verificar Código
            </button>
            <p>Não recebeu o código? <a href="">Clique para reenviar em [x] segundos</a></p>
            <a href="/Login">Voltar para Login</a>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default EtapaCodigo;
