import React, { useState } from "react";
import "../styles/login.css"; // Importando o CSS

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const verificarUsuario = async (event) => {
        event.preventDefault();

        if (!email || !senha) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        try {
            const resposta = await fetch(`http://localhost:3000/pessoas?email=${email}`);
            const usuario = await resposta.json();

            if (usuario.length === 0) {
                alert("Usuário não encontrado!");
                return;
            }

            const payloadUsuario = usuario[0];

            if (payloadUsuario.senha !== senha) {
                alert("Senha incorreta!");
                return;
            }

            const sessaoLogada = await fetch("http://localhost:3000/sessao", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    usuarioId: payloadUsuario.id,
                    nome: payloadUsuario.nome,
                    email: payloadUsuario.email,
                    logadoEm: new Date().toISOString()
                })
            });

            if (!sessaoLogada.ok) {
                throw new Error("Erro ao criar sessão.");
            }

            alert(`Bem-vindo, ${payloadUsuario.nome}!`);
            window.location.href = "home.html";

        } catch (error) {
            console.error("Erro ao realizar login:", error);
            alert("Erro ao conectar ao servidor.");
        }
    };

    return (
        <main>
            <div className="coluna1"></div>
            <div className="coluna2">
                <form className="formulario" onSubmit={verificarUsuario}>
                    <div className="inputs">
                        <div className="input-container">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="senha">Senha</label>
                        </div>
                    </div>
                    <button id="botao-entrada" type="submit">Entrar</button>
                </form>
            </div>
        </main>
    );
};

export default Login;
