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
                <h1 className='sm:text-[40px] text-[32px]'>Cadastro realizado com sucesso!</h1>
                <h2 className='sm:text-[24px] text-[20px]'>Agora você já pode acessar sua conta!</h2>
                <img
                className='sm:w-[110px] w-[80px] sm:h-[110px] h-[80px]'
                src={cadastroSucedido} alt="Símbolo de check" />
                <button className='sm:w-[25vw] w-[50vw]' onClick={irParaLogin}>Fazer Login</button>
            </div>
        </>
    )
}
