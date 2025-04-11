import React from "react";
import bgImage from "../assets/images/primeira-imagem-fundo-index.svg";
import logoImage from '../assets/logos/caringu-logo-branco.svg'
import cardImage from '../assets/images/cardIndex.svg'
import secondImage from '../assets/images/segunda-imagem-fundo-index.svg'
import Carousel from "../components/Index/Carrossel";
import PerguntasFrequentes from "../components/Index/PerguntasFrequentes";

export default function HomePage() {
  return (
    <>
      <header className="absolute top-0 left-0 z-1 w-full h-[100px] flex items-center justify-between text-white px-8 ">
        <div className="m-4 flex justify-center items-center bg-[#15171B]  h-[70px] w-[450px] ">
          <nav className="flex gap-10">
            <a href="#" className="text-sm hover:underline font-bold text-[16px]">Home</a>
            <a href="#" className="text-sm hover:underline font-bold text-[16px]">Sobre nós</a>
            <a href="#" className="text-sm hover:underline font-bold text-[16px]">Serviços</a>
            <a href="#" className="text-sm hover:underline font-bold text-[16px]">Fale conosco</a>
          </nav>
        </div>
        <img src={logoImage} alt="Logo CaringU" className="h-[67px]" />
        <div className="flex gap-20 items-center w-[450px] justify-end">
          <a href="#" className="text-sm hover:underline font-bold text-[16px]">Inscreva-se</a>
          <button className="bg-[var(--laranja)] text-white text-sm font-medium px-4 py-2 rounded hover:bg-orange-600 transition-all h-[50px] w-[91px]">
            Entrar
          </button>
        </div>
      </header>
      <section className="relative w-full h-screen bg-cover flex items-start" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 flex flex-col justify-center items-start h-full text-white max-w-400 mx-25">
          <p className="text-[96px] font-extrabold mb-6">
            Conquiste alunos com mais facilidade e praticidade
          </p>
          <p className="text-[32px] mb-8 max-w-240">
            A CaringU facilita a gestão, conecta você a novos alunos e otimiza a comunicação, permitindo focar no que importa: Transformar vidas através do treino.
          </p>
          <button className="bg-[var(--laranja)] text-white font-semibold px-6 py-3 rounded hover:bg-orange-600 transition w-[261px] h-[62px] text-[24px]">
            Cadastre-se
          </button>
        </div>
      </section>
      <section className="h-screen w-full bg-[var(--cor-secundaria)]">
        <div className="flex flex-col items-center justify-center gap-4 h-1/3">
          <h1 className="text-4xl font-bold text-[64px]">Por que criamos a CaringU?</h1>
          <p className="text-[32px] max-w-7xl text-center">A  <b>CaringU</b> surgiu com o objetivo de conectar os personal trainers com seus alunos e facilitar a organização dos treinos, exercícios e aulas agendadas.</p>
        </div>
        <div className="flex items-center justify-center gap-50 h-1/2">
          <div className="w-[490px] h-[607px] border-[#15171b46] border-2 gap-4 text-center">
            <img src={cardImage} alt="Card" />
            <div className="flex m-5">
              <div className="flex flex-col gap-4">
                <p className="text-[24px] font-bold text-start">Pesquisas com personal trainers</p>
                <p className="text-[20px] text-start">Buscamos entender o personal e nos colocar no seu lugar para entender suas dores. Para isso, passamos por uma série de pesquisas  com aprofundamento das dificuldades do profissional da área.</p>
              </div>
            </div>
          </div>
          <div className="w-[490px] h-[607px] border-[#15171b46] border-2 gap-4 text-center">
            <img src={cardImage} alt="Card" />
            <div className="flex m-5">
              <div className="flex flex-col gap-4">
                <p className="text-[24px] font-bold text-start">Algo relacionado a alunos</p>
                <p className="text-[20px] text-start">Buscamos entender o personal e nos colocar no seu lugar para entender suas dores. Para isso, passamos por uma série de pesquisas  com aprofundamento das dificuldades do profissional da área.</p>
              </div>
            </div>
          </div>
          <div className="w-[490px] h-[607px] border-[#15171b46] border-2 gap-4 text-center">
            <img src={cardImage} alt="Card" />
            <div className="flex m-5">
              <div className="flex flex-col gap-4">
                <p className="text-[24px] font-bold text-start">Pesquisas com personal trainers</p>
                <p className="text-[20px] text-start">Desenvolvemos uma solução prática que conta com funcionalidades que buscam suprir a necessidade de organização do personal, como gerenciamento de alunos, agenda e relatórios para acompanhar o desempenho do aluno.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="h-screen w-full relative bg-cover flex items-start flex-col" style={{ backgroundImage: `url(${secondImage})` }}>
        <div className="absolute inset-0 bg-black opacity-80" />
        <div className="relative z-1 flex flex-col justify-center items-center h-1/2 text-white w-full">
          <h1 className="text-[64px] font-bold">
            Nossas soluções
          </h1>
          <p className="text-[32px] text-center max-w-5xl">As soluções implementadas na CaringU foram construídas sob medida para auxiliar os Personal Trainers em suas dores do dia a dia.</p>
        </div>
        <div className="w-full h-1/3 flex justify-center items-center">
          <Carousel />
        </div>
      </section>
      <section className="h-screen w-full bg-[var(--cor-secundaria)] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 h-1/3">
          <h1 className="text-[64px] font-bold">
            Perguntas Frequentes
          </h1>
          <PerguntasFrequentes />
        </div>
      </section>
      <section className="h-screen w-full bg-[var(--cor-secundaria)] flex flex-col items-center justify-center">
        <h1 className="text-[64px] font-bold">
          Conecte-se, treine e evolua com a CaringU!
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 h-1/3">
          <div className="flex flex-col items-center justify-center gap-4 bg-[var(--azul-escuro)] w-[1076px] h-[624px]">
            <div className="flex items-center justify-center gap-4">
              <input type="text" placeholder="Nome" />
              <input type="text" placeholder="Email" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <input type="text" placeholder="Mensagem" />
              <button className="bg-[var(--laranja)] text-white font-semibold px-6 py-3 rounded hover:bg-orange-600 transition w-[261px] h-[62px] text-[24px]">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
