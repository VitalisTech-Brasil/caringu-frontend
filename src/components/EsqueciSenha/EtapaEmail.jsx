// src/components/EsqueciSenha/EtapaEmail.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { caringuApi } from '../../provider/caringuApi';
import Input from '../Utils/Inputs';
import Button from '../Utils/Button';
import { useEmail } from './Context/EsqueciSenhaContext';

const EtapaEmail = ({ onAvancar }) => {
  const { atualizarEmail } = useEmail(); // pega o atualizarEmail do Context
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleEnviarEmail = async (data) => {
    const { email } = data;
    console.log(email)

    try {
      const response = await caringuApi.post('/esqueci-senha', { email });

      if (response.status === 200) {
        atualizarEmail(email); // <<< Atualiza o email no Context!
        onAvancar();            // Avança para a próxima etapa
      } else {
        alert("Email não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      alert("Ocorreu um erro ao tentar enviar o e-mail. Tente novamente.");
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
              Não se preocupe! Informe seu e-mail e enviaremos um link para redefinir sua senha.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleEnviarEmail)} className="w-1/2">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              marginBottomLinha="5.5%"
              margin="50px auto 0px 0px"
              corBordaInput={"#ccc"}

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
