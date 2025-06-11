// src/components/EsqueciSenha/EtapaSucesso.jsx
import React from 'react';
import imagemSucesso from '../../assets/images/simboloSucesso.svg';

const EtapaSucesso = ({ irPraLogin }) => {
  return (
    <section className='flex justify-center items-center w-full xl:w-1/2'>
      <div className='flex justify-center items-center w-full px-4 py-8'>
        <div className='flex flex-col items-center w-full max-w-md md:max-w-xl'>
          <div className='text-[var(--cor-primaria)] text-center mb-8'>
            <h1 className='text-2xl md:text-4xl lg:text-[48px] font-bold mb-4'>
              Senha alterada com sucesso!
            </h1>
            <p className='text-base md:text-[24px]'>
              Agora você já pode acessar sua conta com a nova senha.
            </p>
          </div>
          
          <img 
            src={imagemSucesso} 
            alt="Sucesso" 
            className='h-32 md:h-40 lg:h-48 mb-2'
          />
          
          <div className='w-full max-w-xs md:max-w-md'>
            <button 
              onClick={irPraLogin} 
              className='
                w-full 
                h-12 md:h-[50px] 
                bg-[var(--laranja)] 
                text-[var(--cor-secundaria)] 
                rounded-lg
                hover:opacity-90 
                transition-opacity
                cursor-pointer
              '
            >
              Fazer Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EtapaSucesso;