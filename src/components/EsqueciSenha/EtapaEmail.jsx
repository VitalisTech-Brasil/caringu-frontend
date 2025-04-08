// src/components/EsqueciSenha/EtapaEmail.jsx
import React from 'react';
import Input from '../Login/inputs';

const EtapaEmail = ({ email, setEmail, onAvancar }) => {
  const handleEnviarEmail = async () => {
    try {
      const response = await fetch("url do servidor pra ver se existe o email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        onAvancar();
      } else {
        alert("Email não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
    }
  };

  return (
    <section className='flex justify-center items-center h-screen w-1/2'>
      <div className='flex justify-center items-center h-full w-full'>
        <div className='flex justify-center items-center w-full h-150 flex-col gap-10'>
          <div className='flex w-100 items-center justify-between'>
            <div className='bg-[var(--cor-primaria)] rounded-full h-6 w-25'></div>
            <div className='bg-[var(--azul-claro)]  rounded-full h-6 w-25'></div>
            <div className='bg-[var(--azul-claro)]  rounded-full h-6 w-25'></div>
          </div>
          <div className='text-[var(--cor-primaria)] h-27 w-1/2 text-center flex-col justify-end'>
            <h1 className=' text-[48px]'>Recuperação de senha</h1>
            <p>Informe seu e-mail e enviaremos um código para redefinir sua senha.</p>
          </div>
          <div className='w-1/2'>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <footer className='flex flex-col h-25 justify-between items-center'>
            <button onClick={handleEnviarEmail} className='w-[511px] h-[50px] bg-[var(--laranja)] text-[var(--cor-secundaria)] rounded-[8px]'>
              Resetar Senha
            </button>
            <a href="/Login">Voltar para Login</a>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default EtapaEmail;
