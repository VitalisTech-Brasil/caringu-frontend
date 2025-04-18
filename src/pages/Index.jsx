import React from "react";
import bgImage from "../assets/images/primeira-imagem-fundo-index.svg";
import logoImage from '../assets/logos/caringu-logo-branco.svg'
import cardImage from '../assets/images/cardIndex.svg'
import secondImage from '../assets/images/segunda-imagem-fundo-index.svg'
import Carrossel from "../components/Index/Carrossel";
import PerguntasFrequentes from "../components/Index/PerguntasFrequentes";
import Button from "../components/Utils/Button";
import { Link } from "react-router-dom";

export default function HomePage() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <header className="absolute top-0 left-0 z-11 w-full h-[80px] flex items-center justify-between text-white px-8 pl-20 pr-20">
        <nav className="flex gap-8 m-4 justify-center items-center bg-[#15171B] h-16 w-[400px] rounded-[6px]">
          <a className="text-sm hover:underline font-bold text-[14px] cursor-pointer transition-all" onClick={() => scrollToSection('home')}>Home</a>
          <a className="text-sm hover:underline font-bold text-[14px] cursor-pointer transition-all" onClick={() => scrollToSection('sobre')}>Sobre nós</a>
          <a className="text-sm hover:underline font-bold text-[14px] cursor-pointer transition-all" onClick={() => scrollToSection('servicos')}>Serviços</a>  
          <a className="text-sm hover:underline font-bold text-[14px] cursor-pointer transition-all" onClick={() => scrollToSection('fale')}>Fale conosco</a>
        </nav>
        <img src={logoImage} alt="Logo CaringU" className="h-[50px]" />
        <div className="flex gap-16 items-center w-[300px] justify-end">
          <Link to="/cadastro"><a className="text-sm font-bold text-[14px] cursor-pointer hover:underline transition-all">Inscreva-se</a></Link>
          <Link to="/login"><Button texto="Entrar" cor="var(--laranja)" corTexto="var(--cor-secundaria)" corHover="#ca6333" width="80px" height="40px" fontSize="14px" /></Link>
        </div>
      </header>
      <section id="home" className="relative w-full h-screen bg-cover flex items-start" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 flex flex-col justify-center items-start h-full text-white max-w-250 mx-25">
          <p className="text-[64px] font-extrabold mb-6">
            Conquiste alunos com mais facilidade e praticidade
          </p>
          <p className="text-[24px] mb-8 max-w-160">
            A CaringU facilita a gestão, conecta você a novos alunos e otimiza a comunicação, permitindo focar no que importa: Transformar vidas através do treino.
          </p>
          <Link to="/cadastro"><Button texto="Cadastre-se" cor="var(--laranja)" corTexto="var(--cor-secundaria)" corHover="#ca6333" width="200px" height="50px" fontSize="18px" /></Link>
        </div>
      </section>
      <section id="sobre" className="h-screen w-full bg-[var(--cor-secundaria)]">
        <div className="flex flex-col items-center justify-center gap-4 h-1/3 mb-10 w-full">
          <h1 className="text-[48px] font-bold">Por que criamos a CaringU?</h1>
          <p className="text-[24px] max-w-300  text-center">A  <b>CaringU</b> surgiu com o objetivo de conectar os personal trainers com seus alunos e facilitar a organização dos treinos, exercícios e aulas agendadas.</p>
        </div>
        <div className="flex items-center justify-center gap-8 h-1/2">
          <div className="w-[400px] h-[500px] border-[#15171b46] border-2 gap-4 text-center">
            <img src={cardImage} alt="Card" className="w-full h-auto" />
            <div className="flex m-5">
              <div className="flex flex-col gap-4">
                <p className="text-[20px] font-bold text-start">Pesquisas com personal trainers</p>
                <p className="text-[16px] text-start">Buscamos entender o personal e nos colocar no seu lugar para entender suas dores. Para isso, passamos por uma série de pesquisas  com aprofundamento das dificuldades do profissional da área.</p>
              </div>
            </div>
          </div>
          <div className="w-[400px] h-[500px] border-[#15171b46] border-2 gap-4 text-center">
            <img src={cardImage} alt="Card" className="w-full h-auto" />
            <div className="flex m-5">
              <div className="flex flex-col gap-4">
                <p className="text-[20px] font-bold text-start">Algo relacionado a alunos</p>
                <p className="text-[16px] text-start">Buscamos entender o personal e nos colocar no seu lugar para entender suas dores. Para isso, passamos por uma série de pesquisas  com aprofundamento das dificuldades do profissional da área.</p>
              </div>
            </div>
          </div>
          <div className="w-[400px] h-[500px] border-[#15171b46] border-2 gap-4 text-center">
            <img src={cardImage} alt="Card" className="w-full h-auto" />
            <div className="flex m-5">
              <div className="flex flex-col gap-4">
                <p className="text-[20px] font-bold text-start">Pesquisas com personal trainers</p>
                <p className="text-[16px] text-start">Desenvolvemos uma solução prática que conta com funcionalidades que buscam suprir a necessidade de organização do personal, como gerenciamento de alunos, agenda e relatórios para acompanhar o desempenho do aluno.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="servicos" className="h-screen w-full relative bg-cover flex items-start flex-col" style={{ backgroundImage: `url(${secondImage})` }}>
        <div className="absolute inset-0 bg-black opacity-80" />
        <div className="relative z-1 flex flex-col justify-center items-center h-1/2 text-white w-full">
          <h1 className="text-[48px] font-bold">
            Nossas soluções
          </h1>
          <p className="text-[24px] text-center max-w-4xl">As soluções implementadas na CaringU foram construídas sob medida para auxiliar os Personal Trainers em suas dores do dia a dia.</p>
        </div>
        <div className="w-full h-1/3 flex justify-center items-center">
          <Carrossel />
        </div>
      </section>
      <section id="perguntas-frequentes" className="h-180 w-full bg-[var(--cor-secundaria)] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 h-1/3">
          <h1 className="text-[48px] font-bold">
            Perguntas Frequentes
          </h1>
          <PerguntasFrequentes />
        </div>
      </section>
      <section id="fale" className="h-180 w-full bg-[var(--cor-secundaria)] flex flex-col items-center justify-center">
        <h1 className="text-[48px] font-bold">
          Conecte-se, treine e evolua com a CaringU!
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <div className="flex flex-col items-center justify-center gap-4 bg-[var(--azul-escuro)] w-[900px] h-[550px] p-8 rounded-lg">
            <div className="flex items-center justify-start gap-4 w-full">
              <p className="text-white text-[24px] font-bold">Fale Conosco</p>
            </div>
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="nome" className="text-[14px] text-white">
                  *Nome Completo
                </label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Digite seu Nome"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--azul-escuro)] bg-white text-black"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="telefone" className="text-[14px] text-white">
                  Telefone para contato
                </label>
                <input
                  id="telefone"
                  type="text"
                  placeholder="Digite seu Telefone"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--azul-escuro)] bg-white text-black"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email" className="text-[14px] text-white">
                *Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Digite seu Email"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--azul-escuro)] bg-white text-black"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="mensagem" className="text-[14px] text-white">
                *Mensagem
              </label>
              <textarea
                id="mensagem"
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--azul-escuro)] bg-white text-black h-[100px]"
              />
            </div>
            <div className="flex items-center justify-start gap-4 w-full">
              <p className="text-white text-[14px]">*Obrigatório</p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button texto="Enviar" cor="var(--azul-claro)" corTexto="var(--cor-secundaria)" corHover="#677e9c" width="400px" height="50px" />
            </div>
          </div>
        </div>
      </section>
      <footer className="h-[350px] w-full bg-[var(--azul-escuro)] flex items-center  px-20">
        <div className="flex flex-col items-start justify-center h-full w-[1500px] gap-5">
          <img src='src/assets/logos/caringu-logo-branco-fundo-laranja.svg' alt="Logo CaringU" className="h-[90px] w-[350px]" />
          <div className="w-[500px]">
            <h1 className="text-white text-[20px] font-bold">Transforme seu treino com mais facilidade</h1>
            <p className="text-white text-[14px]">
              Elevamos sua experiência fitness, conectando você ao personal ideal para seus objetivos, tornando sua jornada mais eficiente e motivadora.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center h-full w-[150px] gap-3 mr-20" id="navegacao">
          <h1 className="text-white text-[20px] font-bold">
            Navegação
          </h1>
          <a onClick={() => scrollToSection('home')}>Home</a>
          <a onClick={() => scrollToSection('sobre')}>Sobre nós</a>
          <a onClick={() => scrollToSection('servicos')}>Serviços</a>
          <a onClick={() => scrollToSection('fale')}>Fale conosco</a>
          <Link to="/login" ><a>Entrar</a></Link>
          <Link to="/cadastro"><a>Inscreva-se</a></Link>
        </div>
        <div className="flex flex-col items-start justify-center h-full w-[40px] gap-5">
          <img src="src/assets/logos/github-logo.svg" alt="Logo Github" className="h-[30px] w-[30px] cursor-pointer transition-all hover:scale-110" />
          <img src="src/assets/logos/linkedin-logo.svg" alt="Logo Linkedin" className="h-[30px] w-[30px] cursor-pointer transition-all hover:scale-110" />
          <img src="src/assets/logos/instagram-logo.svg" alt="Logo Instagram" className="h-[30px] w-[30px] cursor-pointer transition-all hover:scale-110" />
        </div>
      </footer>
    </>
  );
}
