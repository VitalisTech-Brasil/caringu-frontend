import React, { useEffect, useState } from 'react';
import '../styles/esqueciSenha.css'
import imagemEsqueciSenha from '../assets/images/imagem-esqueci-senha.svg'
import Input from '../components/Login/inputs'

const EsqueciSenha = () => {

    useEffect(() => {
        document.title = "Esqueci Senha"
    }, []);

    const [email, setEmail] = useState('');

    return (
        <>
            <main className='flex flex-row h-screen w-screen'>
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
                                <p>Não se preocupe! Isso acontece. Informe seu e-mail e enviaremos um link para você redefinir sua senha.</p>
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
                                <button className='w-[511px] h-[50px] bg-[var(--laranja)] cursor-pointer text-[var(--cor-secundaria)]'>
                                    Resetar Senha
                                </button>
                                <a href="/Login">Voltar para Login</a>
                            </footer>
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
