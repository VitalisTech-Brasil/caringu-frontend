import React from 'react'
import { useNavigate } from 'react-router-dom';

import cadastroSucedido from "../../assets/images/simbolo-sucesso.svg";
import styleCadastro from "./module/cadastro.module.css";

export default function Etapa4() {

    const navigate = useNavigate();
    const irParaLogin = () => {
        navigate('/login');
    };

    return (
        <>
            <div className={styleCadastro["cadastro-container"]}>
                <h1>Cadastro realizado com sucesso!</h1>
                <h2>Agora você já pode acessar sua conta!</h2>
                <img src={cadastroSucedido} alt="Símbolo de check" />
                <button onClick={irParaLogin}>Fazer Login</button>
            </div>
        </>
    )
}
