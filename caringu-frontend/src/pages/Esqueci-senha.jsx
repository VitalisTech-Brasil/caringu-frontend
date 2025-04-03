import React from 'react';
import '../styles/esqueciSenha.css'
import imagemEsqueciSenha from '../assets/images/imagem-esqueci-senha.svg'


const EsqueciSenha = () => {
    return (
        <>
            <main className='flex-row gap-10 h-screen w-screen'>
                <section className='w-1/2'>
                    <div className='flex justify-center items-center bg-black h-218 w-full'>Teste</div>
                </section>
                <section className="flex justify-center items-center w-1/2">
                    <img className="h-218 w-full" src={imagemEsqueciSenha} />
                </section>
            </main>
        </>
    )
}

export default EsqueciSenha
