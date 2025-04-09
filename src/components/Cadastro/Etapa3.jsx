import React from 'react'
import { useForm } from "react-hook-form";

import styleCadastro from "./module/cadastro.module.css";

import setaEsquerda from "../../assets/images/seta-esquerda.svg";
import alert from "../../assets/images/alert.svg";
import toolTipCref from "../../assets/images/tooltip-cref.svg";
import info from "../../assets/images/info.svg";

export default function Etapa3({ setEtapa }) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log("Dados da etapa 3:", data);
        setEtapa(4);
    };

    const voltarEtapa = () => {
        setEtapa(2);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className={styleCadastro.titulo}>
                <h1>Informações Profissionais</h1>
            </div>

            <div className={styleCadastro['input-cref']}>

                <div className={styleCadastro['tooltip-wrapper']} style={{ marginBottom: errors.cref?.message ? "3%" : "-2%" }}>
                    <img src={info} alt="Informação" className={styleCadastro['info-icon']} />
                    <div className={styleCadastro['tooltip-box']}>
                        <img src={toolTipCref} alt="Tooltip CREF" />
                    </div>
                </div>

                <div className={styleCadastro["input-crefErros"]}>
                    <div className={styleCadastro['input-container']}>
                        <input
                            type="text"
                            id="cref"
                            maxLength={10}
                            {...register("cref", {
                                required: "Formato de CREF inválido."
                            })}
                            placeholder=""
                        />
                        <label htmlFor="cref" className={styleCadastro.label}>* Registro do CREF</label>
                        <div
                            className={styleCadastro.underline}
                            style={{ marginBottom: errors.cref ? "0px" : "0px" }}
                        />
                    </div>
                    {errors.cref && (
                        <div className={styleCadastro.erro}>
                            <img src={alert} alt="Ícone de alerta" />
                            <span>{errors.cref.message}</span>
                        </div>
                    )}
                </div>
            </div>


            <div className={styleCadastro["container-nome-data"]}>

                <div className={styleCadastro['input-especialidade']}>

                    <div className={styleCadastro["input-container-especialidade"]}>
                        <input
                            type="text"
                            id="especialidade"
                            className={styleCadastro['nome-input']}
                            {...register("especialidade", { required: true })}
                            placeholder=""
                        />
                        <label htmlFor="especialidade" className={styleCadastro.label}>* Especialidade</label>
                        <div
                            className={styleCadastro.underline}
                            style={{ marginBottom: errors.especialidade ? "-4px" : "0px" }}
                        >
                        </div>
                    </div>

                    {errors.especialidade && (
                        <div className={styleCadastro.erro}>
                            <img src={alert} alt="Ícone de alerta" />
                            <span>Especialidade é obrigatória.</span>
                        </div>
                    )}

                </div>

                <div className={styleCadastro['input-anosExperiencia']}>

                    <div className={styleCadastro["input-container"]}>
                        <input
                            type="text"
                            id="anosExperiencia"
                            maxLength={2}
                            className={styleCadastro['data-nascimento']}
                            {...register("anosExperiencia", { required: true })}

                            placeholder=""
                        />
                        <label htmlFor="anosExperiencia" className={styleCadastro.label}>* Anos de experiência</label>
                        <div
                            className={styleCadastro.underline}
                            style={{ marginBottom: errors.anosExperiencia ? "-4px" : "0px" }}
                        >

                        </div>
                    </div>

                    {errors.anosExperiencia && (
                        <div className={styleCadastro.erro}>
                            <img src={alert} alt="Ícone de alerta" />
                            <span>Experiência é obrigatória.</span>
                        </div>
                    )}

                </div>

            </div>

            <div>
                <hr style={{ border: "1px solid #00000039", width: "100%", marginTop: "15%" }} />
                <div style={{ marginTop: "1%" }}>* Obrigatório</div>
            </div>

            <footer className={styleCadastro.footer}>
                <button className={styleCadastro.voltar} type="button" onClick={voltarEtapa}>
                    <img src={setaEsquerda} alt="Seta mirando para esquerda" />
                    <span>Voltar</span>
                </button>

                <button className={styleCadastro.prosseguir} type="submit">Prosseguir</button>
            </footer>
        </form>
    )
}
