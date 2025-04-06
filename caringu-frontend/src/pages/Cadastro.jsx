import React from 'react'
import { useState } from "react";

import styleCadastro from "../components/Cadastro/module/cadastro.module.css";

import Etapa2 from "../components/Cadastro/Etapa2";
import Etapa3 from "../components/Cadastro/Etapa3";
import Etapa4 from "../components/Cadastro/Etapa4";

import imagemCadastro from "../assets/images/imagem-cadastro.svg";
import logoCaringu from "../assets/logos/caringu-logotipo-light.svg";


/* import dumbellFitness from "../../assets/images/dumbbell-fitness.svg";
import mochilaFitness from "../../assets/images/mochila-treino.svg"; */

/* Não remover nenhum comentário, pois será utilizado na etapa que o Aluno existir no projeto */
const Cadastro = () => {
    const [etapa, setEtapa] = useState(2);
    return (
        <>
            <main className={styleCadastro.main}>
                <section className={styleCadastro['primeira-coluna']} style={{ backgroundImage: `url(${imagemCadastro})` }}>
                    <a href="../index.html">
                        <img className={styleCadastro.logo} src={logoCaringu} alt="Logo da CaringU" />
                    </a>
                </section>

                <section className={styleCadastro['segunda-coluna']}>
                    <div className={styleCadastro['container-form']}>

                        {etapa === 2 && (
                            <Etapa2 setEtapa={setEtapa} />
                        )}

                        {etapa === 3 && (
                            <Etapa3 setEtapa={setEtapa} />
                        )}

                        {etapa === 4 && (
                            <Etapa4 />
                        )}

                    </div>

                </section>

            </main>
        </>
    );
};

export default Cadastro;
