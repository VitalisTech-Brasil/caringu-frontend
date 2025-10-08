import React from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { CadastroProvider, useCadastro } from '../components/Cadastro/context/CadastroContext';

import Etapa2 from "../components/Cadastro/Etapa2";
import Etapa3 from "../components/Cadastro/Etapa3";
import Etapa4 from "../components/Cadastro/Etapa4";

import styleCadastro from "../components/Cadastro/module/cadastro.module.css";
import imagemCadastro from "../assets/images/imagem-cadastro.svg";
import logoCaringu from "../assets/logos/caringu-logotipo-light.svg";


/* import dumbellFitness from "../../assets/images/dumbbell-fitness.svg";
import mochilaFitness from "../../assets/images/mochila-treino.svg"; */

/* Não remover nenhum comentário, pois será utilizado na etapa que o Aluno existir no projeto */
const Cadastro = () => {
    useEffect(() => {
        document.title = "Cadastro | CaringU"
    }, []);

    const [etapa, setEtapa] = useState(2);
    return (
        <>
            <CadastroProvider>
                <main className="flex items-center justify-start h-[100vh] w-full p-[1%]">
                    <section className="hidden md:block w-[40%] h-full
                        bg-cover lg:bg-center bg-position-[70%] bg-no-repeat
                        relative rounded-[1%]
                        transition-all"
                        style={{ backgroundImage: `url(${imagemCadastro})` }}>
                        <Link to="/">
                            <button style={{ cursor: "pointer" }}>
                                <img className="absolute top-5 left-5 w-[15vw] 2xl:w-[10vw] h-auto" src={logoCaringu} alt="Logo da CaringU" />
                            </button>
                        </Link>
                    </section>

                    <section
                        className={`
                            w-full lg:w-[60%] h-full flex
                            ${etapa === 2 ? 'items-start' : 'items-center'}
                            justify-center overflow-visible sm:py-0 py-4
                            
                        `}
                    >
                        <div className={`${styleCadastro['container-form']} 2xl:h-[95%] h-auto 2xl:w-[85%] w-[90%]`}>

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
            </CadastroProvider>
        </>
    );
};

export default Cadastro;
