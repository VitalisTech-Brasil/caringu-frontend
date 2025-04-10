// src/components/EsqueciSenha/EtapaNovaSenha.jsx
import React from 'react';
import Input from '../Login/inputs';
import '../../styles/esqueciSenha.css'

const EtapaNovaSenha = ({ email, novaSenha, setNovaSenha, confirmarSenha, setConfirmarSenha, onAvancar }) => {
  const handleAlterarSenha = async () => {
    if (novaSenha !== confirmarSenha) {
      return alert("As senhas não coincidem.");
    }

    const response = await fetch("http://seu-servidor.com/api/alterar-senha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, novaSenha }),
    });

    const data = await response.json();
    if (data.success) {
      onAvancar();
    } else {
      alert("Erro ao alterar a senha.");
    }
  };

  return (
    <section className='flex justify-center items-center h-screen w-1/2'>
      <div className='flex justify-center items-center h-full w-full'>
        <div className='flex justify-center items-center w-full h-150 flex-col gap-10'>
          <div className='flex w-100 items-center justify-between'>
            <div className='bg-[var(--azul-claro)]  rounded-full h-6 w-25'></div>
            <div className='bg-[var(--azul-claro)]  rounded-full h-6 w-25'></div>
            <div className='bg-[var(--cor-primaria)] rounded-full h-6 w-25'></div>
          </div>
          <div className='text-[var(--cor-primaria)] h-20 w-2/3 text-center flex-col justify-end'>
            <h1 className=' text-[48px]'>Escolha uma nova senha</h1>
            <p>Sua nova senha deve ter pelo menos 6 caracteres.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleAlterarSenha(); }} className='h-1/2 w-1/2'>
            <div>
              <Input
                id="novaSenha"
                name="senha"
                type="password"
                label="Nova Senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
              />
              <div className='flex w-90 items-center justify-between'>
                <div className='bg-[#CECECE]  rounded-full h-3 w-20'></div>
                <div className='bg-[#CECECE] rounded-full h-3 w-20'></div>
                <div className='bg-[#CECECE]  rounded-full h-3 w-20'></div>
                <div className='bg-[#CECECE]  rounded-full h-3 w-20'></div>
              </div>
            </div>
            <Input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              label="Confirmar Senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </form>
          <footer className='flex flex-col h-30 justify-between items-center'>
            <button onClick={handleAlterarSenha} className='w-[511px] h-[50px] bg-[var(--laranja)] text-[var(--cor-secundaria)] rounded-[8px]'>
              Alterar Senha
            </button>
            <a href="/Login">Voltar para Login</a>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default EtapaNovaSenha;
