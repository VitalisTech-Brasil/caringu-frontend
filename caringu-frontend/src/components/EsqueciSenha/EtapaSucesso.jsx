// src/components/EsqueciSenha/EtapaSucesso.jsx
import React from 'react';
import imagemSucesso from '../../assets/images/simboloSucesso.svg';

const EtapaSucesso = ({ irPraLogin }) => {
  return (
    <section className='flex justify-center items-center h-screen w-1/2'>
      <div className='flex justify-center items-center h-full w-full'>
        <div className='flex justify-center items-center w-full h-100 flex-col gap-10'>
          <div className='text-[var(--cor-primaria)] h-20 w-2/3 text-center flex-col justify-end'>
            <h1 className=' text-[48px]'>Senha alterada com sucesso!</h1>
            <p>Agora você já pode acessar sua conta com a nova senha.</p>
          </div>
          <img src={imagemSucesso} alt="Sucesso" className='h-60' />
          <footer className='flex flex-col h-30 justify-between items-center'>
            <button onClick={irPraLogin} className='w-[511px] h-[50px] bg-[var(--laranja)] text-[var(--cor-secundaria)] rounded-[8px]'>
              Fazer Login
            </button>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default EtapaSucesso;
