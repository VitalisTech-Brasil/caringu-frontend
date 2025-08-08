import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Utils/Button';
import { caringuApi } from '../../provider/caringuApi';

const FaleConosco = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const [telefone, setTelefone] = useState('')

    const handleTelefoneChange = (e) => {
        let input = e.target.value;
        let digitos = input.replace(/\D/g, "");

        if (digitos.length > 11) digitos = digitos.slice(0, 11);

        let formatted = "";

        if (digitos.length > 7) {
            formatted = `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
        } else if (digitos.length > 2) {
            formatted = `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
        } else if (digitos.length > 0) {
            formatted = `(${digitos}`;
        }

        setTelefone(formatted)
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setResponseMessage('');
        console.log(data);

        try {
            const response = await caringuApi.post('/fale-conosco', data);
            if (response.status === 200) {
                setResponseMessage('Mensagem enviada com sucesso!');
            } else {
                setResponseMessage('Erro ao enviar mensagem. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar:', error);
            setResponseMessage('Erro de conexão. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="fale" className="h-180 w-full bg-[var(--cor-secundaria)] flex flex-col items-center justify-center">
            <h1 className="text-[48px] font-bold max-[1000px]:text-[40px] max-[850px]:text-[38px] max-[700px]:text-[30px] max-[500px]:text-[26px] max-[420px]:text-[24px] max-[800px]:w-[650px] max-[700px]:w-[500px] max-[500px]:w-[400px] max-[420px]:w-[350px]">
                Conecte-se, treine e evolua com a CaringU!
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-4 h-full min-[950px]:h-[650px] max-[950px]:h-[600px] max-[700px]:h-[500px]">
                <div className="flex flex-col items-center justify-center gap-4 bg-[var(--azul-escuro)] w-[900px] mx-auto h-[550px] p-8 rounded-lg max-[950px]:w-[800px] max-[900px]:w-[700px] max-[950px]:h-[550px] max-[750px]:w-[600px] max-[700px]:h-[450px] max-[700px]:w-[500px] max-[535px]:w-[450px] max-[500px]:w-[380px] max-[415px]:w-[315px]">
                    <div className="flex items-center justify-start gap-4 w-full">
                        <p className="text-white text-[24px] font-bold">Fale Conosco</p>
                    </div>
                    <div className="flex flex-col min-[900px]:flex-row items-center justify-center gap-4 w-full min-[950px]:h-[150px] h-auto rounded-lg">
                        <div className="flex flex-col gap-1 w-full h-20 max-[950px]:h-[60px] max-[700px]:h-[45px]">
                            <label htmlFor="nome" className="text-[14px] text-white ">*Nome Completo</label>
                            <input
                                id="nome"
                                type="text"
                                placeholder="Digite seu Nome"
                                {...register("nome", { required: "Nome é obrigatório" })}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--azul-escuro)] bg-white text-black max-[950px]:w-[350px] max-[900px]:w-[625px] max-[750px]:w-[525px] max-[700px]:w-[425px] max-[700px]:h-[30px] max-[535px]:w-[375px] max-[500px]:w-[325px] max-[415px]:w-[250px]"
                            />
                            {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1 w-full h-20 max-[950px]:h-[60px] max-[700px]:h-[45px]">
                            <label htmlFor="telefone" className="text-[14px] text-white">Telefone para contato</label>
                            <input
                                id="telefone"
                                type="text"
                                placeholder="Digite seu Telefone"
                                {...register("telefone")}
                                onChange={handleTelefoneChange}
                                value={telefone}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--azul-escuro)] bg-white text-black max-[950px]:w-[350px] max-[900px]:w-[625px] max-[750px]:w-[525px] max-[700px]:w-[425px] max-[700px]:h-[30px] max-[535px]:w-[375px] max-[500px]:w-[325px] max-[415px]:w-[250px]"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full h-20 max-[950px]:h-[60px] max-[700px]:h-[45px]">
                        <label htmlFor="email" className="text-[14px] text-white">*Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Digite seu Email"
                            {...register("email", {
                                required: "Email é obrigatório",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email inválido"
                                }
                            })}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--azul-escuro)] bg-white text-black max-[950px]:w-[725px] max-[900px]:w-[625px] max-[750px]:w-[525px] max-[700px]:w-[425px] max-[700px]:h-[30px] max-[535px]:w-[375px] max-[500px]:w-[325px] max-[415px]:w-[250px]"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col gap-1 w-full max-[950px]:h-[100px] max-[700px]:h-[75px]">
                        <label htmlFor="mensagem" className="text-[14px] text-white">*Mensagem</label>
                        <textarea
                            id="mensagem"
                            placeholder="Digite sua mensagem"
                            {...register("mensagem", { required: "Mensagem é obrigatória" })}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--azul-escuro)] bg-white text-black h-[100px] max-[950px]:w-[725px] max-[900px]:w-[625px] max-[750px]:w-[525px] max-[700px]:w-[425px] max-[535px]:w-[375px] max-[500px]:w-[325px] max-[415px]:w-[250px]"
                        />
                        {errors.mensagem && <p className="text-red-500 text-sm">{errors.mensagem.message}</p>}
                    </div>
                    <div className="flex items-center justify-start gap-4 w-full">
                        <p className="text-white text-[14px]">*Obrigatório</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 max-[750px]:w-[300px] max-[750px]:h-[20px] max-[950px]:text-[16px] max-[500px]:w-[250px] max-[480px]:h-[15px]">
                        <Button
                            texto={isSubmitting ? 'Enviando...' : responseMessage ? 'Enviado' : 'Enviar'}
                            cor="var(--azul-claro)"
                            corTexto="var(--cor-secundaria)"
                            width="400px"
                            height="40px"
                            type="submit"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
            </form>

            {/* Mensagem de resposta do servidor */}
            {responseMessage && <p className="text-center text-lg text-white mt-4">{responseMessage}</p>}
        </section>
    );
};

export default FaleConosco;
