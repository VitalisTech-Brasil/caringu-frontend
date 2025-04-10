import React from "react";
import bgImage from "../assets/images/primeira-imagem-fundo-index.svg";
import logoImage from '../assets/logos/caringu-logo-branco.svg'

export default function HomePage() {
  return (
    <>
      <header className="absolute top-0 left-0 z-1 w-full flex items-center justify-between text-white px-8">
        <div className="m-3 flex justify-center items-center bg-[#15171B]  h-[50px] w-[450px] ">
          <nav className="flex gap-10">
            <a href="#" className="text-sm hover:underline">Home</a>
            <a href="#" className="text-sm hover:underline">Sobre nós</a>
            <a href="#" className="text-sm hover:underline">Serviços</a>
            <a href="#" className="text-sm hover:underline">Fale conosco</a>
          </nav>
        </div>
        <img src={logoImage} alt="Logo CaringU" className="h-10" />
        <div className="flex gap-4 items-center">
          <a href="#" className="text-sm hover:underline">Inscreva-se</a>
          <button className="bg-[var(--laranja)] text-white text-sm font-medium px-4 py-2 rounded hover:bg-orange-600 transition-all">
            Entrar
          </button>
        </div>
      </header>
        <section className="relative w-full h-screen bg-cover flex items-start" style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="absolute inset-0 bg-black opacity-60" />
          <div className="relative z-10 flex flex-col justify-center items-start h-full text-white max-w-4xl mx-25">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Conquiste alunos com mais facilidade e praticidade
            </h1>
            <p className="text-lg mb-8 max-w-xl">
              A CaringU facilita a gestão, conecta você a novos alunos e otimiza a comunicação, permitindo focar no que importa: Transformar vidas através do treino.
            </p>
            <button className="bg-[var(--laranja)] text-white font-semibold px-6 py-3 rounded hover:bg-orange-600 transition">
              Cadastre-se
            </button>
          </div>
        </section>
        <section className="w-[98%] h-screen">
          asda
        </section>
    </>
  );
}
