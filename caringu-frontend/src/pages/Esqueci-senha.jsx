import React, { useEffect, useState } from 'react';
import '../styles/esqueciSenha.css'
import imagemEsqueciSenha from '../assets/images/imagem-esqueci-senha.svg'
import imagemSucesso from '../assets/images/simboloSucesso.svg'
import Input from '../components/Login/inputs'
import InputVerificacao from '../components/EsqueciSenha/InputVerificacao';

const EsqueciSenha = () => {

    useEffect(() => {
        document.title = "Esqueci Senha"
    }, []);

    const [email, setEmail] = useState('');
    const [etapa, setEtapa] = useState("sucesso"); // etapas: email, codigo, novaSenha, sucesso
    const [novasenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleEnviarEmail = async () => {
        try {
            const response = await fetch("url do servidor pra ver se existe o email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                setEtapa("codigo");
            } else {
                alert("Email não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao enviar e-mail:", error);
        }
    };

    const handleVerificarCodigo = async () => {
        const response = await fetch("http://seu-servidor.com/api/verificar-codigo", {
            method: "POST",
            body: JSON.stringify({ email, codigo }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        if (data.success) {
            setEtapa("novaSenha");
        } else {
            alert("Código incorreto.");
        }
    };

    const handleAlterarSenha = async () => {
        const response = await fetch("http://seu-servidor.com/api/alterar-senha", {
            method: "POST",
            body: JSON.stringify({ email, novaSenha }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        if (data.success) {
            setEtapa("sucesso");
        } else {
            alert("Erro ao alterar a senha.");
        }
    };

    const irPraLogin = () => {
        window.location.href = "/login";
    }

    return (
        <>
            <main className='flex flex-row h-screen w-screen'>
                {etapa === "email" && (
                    <>
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
                                        <button onClick={handleEnviarEmail} className='w-[511px] h-[50px] bg-[var(--laranja)] cursor-pointer text-[var(--cor-secundaria)] rounded-[8px]'>
                                            Resetar Senha
                                        </button>
                                        <a href="/Login">Voltar para Login</a>
                                    </footer>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {etapa === "codigo" && (
                    <>
                        <section className='flex justify-center items-center h-screen w-1/2'>
                            <div className='flex justify-center items-center h-full w-full'>
                                <div className='flex justify-center items-center w-full h-150 flex-col gap-10'>
                                    <div className='flex w-100 items-center justify-between'>
                                        <div className='bg-[var(--azul-claro)]  rounded-full h-6 w-25'></div>
                                        <div className='bg-[var(--cor-primaria)] rounded-full h-6 w-25'></div>
                                        <div className='bg-[var(--azul-claro)]  rounded-full h-6 w-25'></div>
                                    </div>
                                    <div className='text-[var(--cor-primaria)] h-27 w-1/2 text-center flex-col justify-end'>
                                        <h1 className=' text-[48px]'>Verifique seu e-mail</h1>
                                        <p>Enviamos um código de verificação para [ email digitado]. Digite o código abaixo para continuar.</p>
                                    </div>
                                    <InputVerificacao />
                                    <footer className='flex flex-col h-30 justify-between items-center'>
                                        <button onClick={handleVerificarCodigo} className='w-[511px] h-[50px] bg-[var(--laranja)] cursor-pointer text-[var(--cor-secundaria)] rounded-[8px]'>
                                            Verificar Código
                                        </button>
                                        <p>Não recebeu o código? <a href="">Clique para reenviar em [x] segundos</a></p>
                                        <a href="/Login">Voltar para Login</a>
                                    </footer>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {etapa === "novaSenha" && (
                    <>
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
                                        <p>Sua nova senha deve ter pelo menos 6 caracteres</p>
                                    </div>
                                    <form onSubmit={handleAlterarSenha} className='h-1/2 w-1/2'>
                                        <Input
                                            id="novaSenha"
                                            name="senha"
                                            type="password"
                                            label="Nova Senha"
                                            value={novasenha}
                                            onChange={(e) => setSenha(e.target.value)}
                                            required
                                        />
                                        <div className='flex w-90 items-center justify-between'>
                                            <div className='bg-[#CECECE]  rounded-full h-3 w-20'></div>
                                            <div className='bg-[#CECECE] rounded-full h-3 w-20'></div>
                                            <div className='bg-[#CECECE]  rounded-full h-3 w-20'></div>
                                            <div className='bg-[#CECECE]  rounded-full h-3 w-20'></div>
                                        </div>
                                        <Input
                                            id="confirmarSenha"
                                            name="senha"
                                            type="password"
                                            label="Confirmar"
                                            value={confirmarSenha}
                                            onChange={(e) => setSenha(e.target.value)}
                                            required
                                        />
                                    </form>
                                    <footer className='flex flex-col h-30 justify-between items-center'>
                                        <button onClick={handleAlterarSenha} className='w-[511px] h-[50px] bg-[var(--laranja)] cursor-pointer text-[var(--cor-secundaria)] rounded-[8px]'>
                                            Alterar Senha
                                        </button>
                                        <a href="/Login">Voltar para Login</a>
                                    </footer>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                {etapa === "sucesso" && (
                    <>
                        <section className='flex justify-center items-center h-screen w-1/2'>
                            <div className='flex justify-center items-center h-full w-full'>
                                <div className='flex justify-center items-center w-full h-100 flex-col gap-10'>
                                    <div className='text-[var(--cor-primaria)] h-20 w-2/3 text-center flex-col justify-end'>
                                        <h1 className=' text-[48px]'>Senha alterada com sucesso!</h1>
                                        <p>Agora você já pode acessar sua conta com a nova senha.</p>
                                    </div>
                                    <div className="flex h-full w-full justify-center">
                                        <img src={imagemSucesso} alt="" className='h-60'/>
                                    </div>
                                    <footer className='flex flex-col h-30 justify-between items-center'>
                                        <button onClick={irPraLogin} className='w-[511px] h-[50px] bg-[var(--laranja)] cursor-pointer text-[var(--cor-secundaria)] rounded-[8px]'>
                                            Fazer Login
                                        </button>
                                    </footer>
                                </div>
                            </div>
                        </section>
                    </>
                )}
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
