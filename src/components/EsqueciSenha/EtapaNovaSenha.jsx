import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { caringuApi } from '../../provider/caringuApi';

import styleCadastro from '../Cadastro/module/cadastro.module.css';
import alerta from "../../assets/images/alert.svg";
import check from "../../assets/images/check.svg";
import olhoAberto from '../../assets/images/eye.svg';
import olhoFechado from '../../assets/images/eye-slash.svg';
import Button from '../Utils/Button';
import toast from 'react-hot-toast';
import CustomToast from '../Utils/CustomToast';
import { Toaster } from 'react-hot-toast';


import { useEmail } from './Context/EsqueciSenhaContext';

const EtapaNovaSenha = ({ onAvancar }) => {

  const { email } = useEmail();

  const [senhaInteragiu, setSenhaInteragiu] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitted }, watch } = useForm({
    mode: 'onChange'
  });

  const [senhaValue, setSenhaValue] = useState("");

  const handleAlterarSenha = async (data) => {
    const { senha } = data;
    try {
      const response = await caringuApi.patch("/esqueci-senha/nova-senha", {
        email,
        novaSenha: senha,
      });

      if (response.status == 200) {
        onAvancar();
        toast.custom((t) => (
          <CustomToast t={t} type="success" message="Senha alterada com sucesso!" />
        ));
      } else {
        toast.custom((t) => (
          <CustomToast t={t} type="error" message="Erro ao alterar a senha." />
        ));
      }
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      toast.custom((t) => (
        <CustomToast t={t} type="error" message="Erro ao tentar alterar a senha." />
      ));
    }
  };

  return (
    <section className='flex justify-center items-center h-screen w-full xl:w-1/2 px-2'>
      <div className='flex justify-center items-center h-full w-full'>
        <div className='flex flex-col justify-center items-center w-full h-150 gap-20 max-[700px]:h-auto max-[700px]:gap-6 py-4'>
          <div className="flex w-full max-w-[400px] items-center justify-center gap-10">
            <div className="bg-[var(--azul-claro)] rounded-full h-3 w-1/4 max-[500px]:w-[60px]"></div>
            <div className="bg-[var(--azul-claro)] rounded-full h-3 w-1/4 max-[500px]:w-[60px]"></div>
            <div className="bg-[var(--cor-primaria)] rounded-full h-3 w-1/4 max-[500px]:w-[60px]"></div>
          </div>
          <div className='text-[var(--cor-primaria)] h-20 w-2/3 max-[700px]:w-[90%] text-center flex-col justify-end'>
            <h1 className='text-[48px] max-[700px]:text-[28px]'>Escolha uma nova senha</h1>
            <p className='max-[700px]:text-sm'>Sua nova senha deve ter pelo menos 6 caracteres.</p>
          </div>

          <form onSubmit={handleSubmit(handleAlterarSenha)} className='h-1/2 w-1/2 m-5 max-[700px]:w-[95%] max-[700px]:m-2'>
            <div className={styleCadastro["input-senha"]}>
              <div className={`${styleCadastro["input-container"]} `}>
                <input
                  type={showSenha ? "text" : "password"}
                  id="senha"
                  className="input"
                  placeholder=""
                  minLength={6} maxLength={16}
                  {...register("senha", {
                    required: "Senha é obrigatória.",
                    validate: {
                      tamanho: (value) => value.length >= 6 && value.length <= 16 || "Entre 6 a 16 caracteres.",
                      especial: (value) => /[!@#$%^&*(),.?":{}|<>^~'./]/.test(value) || "Mínimo de 1 caractere especial.",
                      maiuscula: (value) => /[A-Z]/.test(value) || "Mínimo de 1 letra maiúscula.",
                      numero: (value) => /\d/.test(value) || "Mínimo de 1 número."
                    }
                  })}
                  autoComplete="new-password"
                  value={senhaValue}
                  onChange={(e) => {
                    setSenhaValue(e.target.value);
                    if (!senhaInteragiu) setSenhaInteragiu(true);
                  }}
                />

                <label htmlFor="senha" className={styleCadastro.label}>* Senha</label>
                <button
                  type="button"
                  onClick={() => setShowSenha(prev => !prev)}
                  className={styleCadastro["btn-olho"]}
                  tabIndex={-1}
                >
                  <img src={showSenha ? olhoAberto : olhoFechado} alt="Mostrar senha" />
                </button>
                <div
                  className={styleCadastro.underline}
                  style={{ marginBottom: errors.senha ? "0px" : "0px" }}
                >
                </div>
              </div>

              <div className={styleCadastro['container-erros']}>
                {/* 1 - Tamanho */}
                <div className={
                  senhaInteragiu || isSubmitted
                    ? senhaValue.length >= 6 && senhaValue.length <= 16
                      ? styleCadastro.check
                      : styleCadastro.erro
                    : styleCadastro.neutro
                }>
                  {(senhaInteragiu || isSubmitted) && (
                    <img
                      src={senhaValue.length >= 6 && senhaValue.length <= 16 ? check : alerta}
                      alt="Ícone"
                    />
                  )}
                  <span>Entre 6 a 16 caracteres.</span>
                </div>

                {/* 2 - Caractere especial */}
                <div className={
                  senhaInteragiu || isSubmitted
                    ? /[!@#$%^&*(),.?":{}|<>]/.test(senhaValue)
                      ? styleCadastro.check
                      : styleCadastro.erro
                    : styleCadastro.neutro
                }>
                  {(senhaInteragiu || isSubmitted) && (
                    <img
                      src={/[!@#$%^&*(),.?":{}|<>]/.test(senhaValue) ? check : alerta}
                      alt="Ícone"
                    />
                  )}
                  <span>Mínimo de 1 caractere especial (ex: !, @, #, $, etc).</span>
                </div>

                {/* 3 - Letra maiúscula */}
                <div className={
                  senhaInteragiu || isSubmitted
                    ? /[A-Z]/.test(senhaValue)
                      ? styleCadastro.check
                      : styleCadastro.erro
                    : styleCadastro.neutro
                }>
                  {(senhaInteragiu || isSubmitted) && (
                    <img
                      src={/[A-Z]/.test(senhaValue) ? check : alerta}
                      alt="Ícone"
                    />
                  )}
                  <span>Mínimo de 1 letra maiúscula.</span>
                </div>

                {/* 4 - Número */}
                <div className={
                  senhaInteragiu || isSubmitted
                    ? /\d/.test(senhaValue)
                      ? styleCadastro.check
                      : styleCadastro.erro
                    : styleCadastro.neutro
                }>
                  {(senhaInteragiu || isSubmitted) && (
                    <img
                      src={/\d/.test(senhaValue) ? check : alerta}
                      alt="Ícone"
                    />
                  )}
                  <span>Mínimo de 1 número.</span>
                </div>
              </div>
            </div>

            <div className={[styleCadastro['input-confirmarSenha'], "mb-7 mt-10"].join(" ")}>
              <div className={styleCadastro['input-container']}>
                <input
                  type={showConfirmarSenha ? "text" : "password"}
                  id="confirmarSenha"
                  minLength={6} maxLength={16}
                  {...register("confirmarSenha", {
                    required: "Confirmação de senha é obrigatória.",
                    validate: (value) => value === watch("senha") || "As senhas não coincidem."
                  })}
                  placeholder=""
                />
                <label htmlFor="confirmarSenha" className={styleCadastro.label}>* Confirmar senha</label>
                <button
                  type="button"
                  onClick={() => setShowConfirmarSenha(prev => !prev)}
                  className={styleCadastro["btn-olho"]}
                  tabIndex={-1}
                >
                  <img src={showConfirmarSenha ? olhoAberto : olhoFechado} alt="Mostrar senha" />
                </button>
                <div
                  className={styleCadastro.underline}
                  style={{ marginBottom: errors.confirmarSenha ? "0px" : "0px" }}
                >
                </div>
              </div>

              {errors.confirmarSenha && (
                <div className="flex items-center gap-2 mt-1 text-[#D45C56]">
                  <img src={alerta} alt="Ícone de alerta" />
                  <span>{errors.confirmarSenha.message}</span>
                </div>
              )}
            </div>

            <footer className='flex flex-col h-30 justify-between items-center'>
              <Button
                texto="Alterar Senha"
                type="submit"
                cor="var(--laranja)"
                corTexto="var(--cor-secundaria)"
                width="100%"
                height="50px"
                fontSize="14px"
                className="max-[700px]:w-full"
              />
              <a href="/Login" className="mt-2 text-sm">Voltar para Login</a>
            </footer>
          </form>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </section>
  );
};

export default EtapaNovaSenha;