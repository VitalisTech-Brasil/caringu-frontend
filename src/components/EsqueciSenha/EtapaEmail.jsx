// src/components/EsqueciSenha/EtapaEmail.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';  // Importando o axios
import Input from '../Utils/Inputs';
import Button from '../Utils/Button';

const EtapaEmail = ({ onAvancar }) => {
  // Usando o hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleEnviarEmail = async (data) => {
    const { email } = data; // Pega o email do formulário

    try {
      // Usando axios para enviar a requisição ao backend
      const response = await axios.post('url_do_servidor_para_validar_email', { email });

      // Verificando a resposta do backend
      if (response.data.success) {
        onAvancar(); // Avança para a próxima etapa
      } else {
        alert("Email não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      alert("Erro ao tentar recuperar a senha.");
      onAvancar();
    }
  };

  return (
    <section className="flex justify-center items-center h-screen w-1/2">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex justify-center items-center w-full h-150 flex-col gap-10">
          <div className="flex w-100 items-center justify-between">
            <div className="bg-[var(--cor-primaria)] rounded-full h-3 w-25"></div>
            <div className="bg-[var(--azul-claro)] rounded-full h-3 w-25"></div>
            <div className="bg-[var(--azul-claro)] rounded-full h-3 w-25"></div>
          </div>
          <div className="text-[var(--cor-primaria)] h-27 w-2/3 text-center flex-col justify-end">
            <h1 className="text-[48px] font-bold">Recuperação de senha</h1>
            <p className="text-[20px] font-normal">
              Não se preocupe! Isso acontece. Informe seu e-mail e enviaremos um link para você redefinir sua senha.
            </p>
          </div>

          {/* Formulário com react-hook-form */}
          <form onSubmit={handleSubmit(handleEnviarEmail)} className="w-1/2">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              {...register("email", {
                required: "O email é obrigatório",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Formato de e-mail inválido"
                }
              })}
              isError={!!errors.email}
              errorMessage={errors.email?.message}
            />

            <footer className="flex flex-col h-25 justify-between items-center">
              <Button
                texto="Resetar Senha"
                type="submit"
                cor="var(--laranja)"
                corTexto="var(--cor-secundaria)"
                corHover="#ca6333"
                width="511px"
                height="50px"
                fontSize="14px"
                onClick={handleEnviarEmail}
              />
              <a href="/Login">Voltar para Login</a>
            </footer>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EtapaEmail;
