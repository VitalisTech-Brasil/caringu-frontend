import React from 'react';
// import '../styles/esqueciSenha.css'
import imagemEsqueciSenha from '../assets/images/imagem-esqueci-senha.svg'


const EsqueciSenha = () => {
    return (
        <>
            <main className='flex-row h-screen w-screen'>
                <section className='flex justify-center items-center h-screen w-1/2'>
                    <div className='flex justify-center items-center h-full w-full'>
                        <div className='flex justify-center items-center w-7 h-100 flex-col'>
                            <div className='flex w-100 items-center justify-between'>
                                <div className='border-2 border-red-950'>quadrado 1</div>
                                <div className='border-black border-10'>quadrado 2</div>
                                <div className='border-black border-10'>quadrado 3</div>
                            </div>
                            <div className='bg-green-900 text-blue-900'>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
                            <div className='bg-amber-950 text-emerald-500'>WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW</div>
                        </div>
                    </div>
                </section>
                <section className='h-screen w-1/2'>
                    <div className="flex justify-end h-full w-full">
                        <img src={imagemEsqueciSenha} alt="" />
                    </div>
                </section>
            </main>
        </>
    )
}

export default EsqueciSenha
