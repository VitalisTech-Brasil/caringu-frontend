import React, { useEffect, useState } from 'react';
import '../styles/esqueciSenha.css'
import imagemEsqueciSenha from '../assets/images/imagem-esqueci-senha.svg'

import EtapaEmail from '../components/EsqueciSenha/EtapaEmail';
import EtapaCodigo from '../components/EsqueciSenha/EtapaCodigo';
import EtapaNovaSenha from '../components/EsqueciSenha/EtapaNovaSenha';
import EtapaSucesso from '../components/EsqueciSenha/EtapaSucesso';

const EsqueciSenha = () => {
    useEffect(() => {
        document.title = "Esqueci Senha"
    }, []);

    const [email, setEmail] = useState('');
    const [etapa, setEtapa] = useState("email");
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const irPraLogin = () => window.location.href = "/login";

    return (
        <main className='flex flex-row h-screen w-screen'>
            {etapa === "email" &&
                <EtapaEmail
                    email={email}
                    setEmail={setEmail}
                    onAvancar={() => setEtapa("codigo")}
                />}
            {etapa === "codigo" &&
                <EtapaCodigo
                    email={email}
                    onAvancar={() => setEtapa("novaSenha")}
                />}
            {etapa === "novaSenha" && (
                <EtapaNovaSenha
                    email={email}
                    novaSenha={novaSenha}
                    setNovaSenha={setNovaSenha}
                    confirmarSenha={confirmarSenha}
                    setConfirmarSenha={setConfirmarSenha}
                    onAvancar={() => setEtapa("sucesso")}
                />
            )}
            {etapa === "sucesso" &&
                <EtapaSucesso
                    irPraLogin={irPraLogin}
                />}
            <section className='h-screen w-1/2'>
                <div className="flex justify-end h-full w-full">
                    <img src={imagemEsqueciSenha} alt="" />
                </div>
            </section>
        </main>
    );
};

export default EsqueciSenha;
