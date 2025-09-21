import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMedicalCase } from "react-icons/ci";
import { FaClipboardList, FaClock, FaDumbbell, FaUsers } from "react-icons/fa";
import { GoPersonAdd } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";
import Header from "../components/Personal/Header/Header";
import MenuLateral from "../components/Personal/MenuLateral/MenuLateral";
import Atalho from "../components/Utils/Atalho";
import CompromissosHoje from "../components/Utils/CompromissosHoje";
import EstaSemana from "../components/Utils/EstaSemana";
import KPI from "../components/Utils/KPI";

import { caringuApi } from "../provider/caringuApi";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  const [alunosAtivos, setAlunosAtivos] = useState(0);
  const [treinosVencimento, setTreinosVencimento] = useState(0);
  const [treinosCriados, setTreinosCriados] = useState(0);
  const [anamnesesPendentes, setAnamnesesPendentes] = useState(0);
  const [treinosFinalizados, setTreinosFinalizados] = useState([]);


  const navigate = useNavigate();
  const personalId = sessionStorage.getItem('pessoaId');


  useEffect(() => {

    const fetchData = async () => {
      try {
        const totalAlunosAtivos = await caringuApi.get(`/planos-contratados/kpis/alunos-ativos/${personalId}`);
        setAlunosAtivos(totalAlunosAtivos.data);

        const totalTreinosVencimento = await caringuApi.get(`/alunos-treinos/kpis/proximos-vencimento/${personalId}`);
        setTreinosVencimento(totalTreinosVencimento.data);

        const totalTreinosCriados = await caringuApi.get(`/treino/treinos-criados/${personalId}`);
        setTreinosCriados(totalTreinosCriados.data);

        const totalAnamnesePendentes = await caringuApi.get(`/anamnese/kpis/pendentes/${personalId}`);
        setAnamnesesPendentes(totalAnamnesePendentes.data);


      } catch (error) {
        console.error("Erro ao carrefae as informações da kpi e agenda:", error);
      }
    };

    fetchData();
    fetchTreinosFinalizados();
  }, []);


  const fetchTreinosFinalizados = async () => {
    try {
      const aulasPersonalResponse = await caringuApi.get(`/sessao-treino/personal-aulas/${personalId}`);
      setTreinosFinalizados(aulasPersonalResponse.data);
    } catch (error) {
      console.error("Erro ao buscar treinos finalizados:", error);
    }
  }

  function formatarHora(isoString) {
    const data = new Date(isoString);
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  function formatarData(isoString) {
    const data = new Date(isoString);
    return data.toLocaleDateString('pt-BR');
  }

  const compromissos = treinosFinalizados.map(item => ({
    id: item.id,
    horario: item.dataHorarioFim
      ? `${formatarHora(item.dataHorarioInicio)} - ${formatarHora(item.dataHorarioFim)}`
      : `${formatarHora(item.dataHorarioInicio)}`,
    data: formatarData(item.dataHorarioInicio),
    aluno: {
      nome: item.nomeAluno,
      foto: item.urlFotoPerfil,
    },
    finalizado: item.finalizado,

    dataHorarioFim: item.dataHorarioFim,
    dataHorarioInicio: item.dataHorarioInicio,
    nomeAluno: item.nomeAluno,
    urlFotoPerfil: item.urlFotoPerfil,
    idAluno: item.idAluno
  }));

  // Define o dia atual como padrão ao carregar a página
  useEffect(() => {
    const today = new Date();
    document.title = "Home | CaringU"
    setSelectedDay({
      day: today.toLocaleDateString("pt-BR", { weekday: "long" }),
      date: today.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      fullDate: today.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      isToday: true,
    });
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const atalhos = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-gray-800 group-hover:text-white transition-colors"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path d="M27.5 15.0005V21.2505C27.5 25.0005 25 27.5005 21.25 27.5005H8.75C5 27.5005 2.5 25.0005 2.5 21.2505V15.0005C2.5 11.6005 4.55 9.22549 7.7375 8.82549C8.0625 8.77549 8.4 8.75049 8.75 8.75049H21.25C21.575 8.75049 21.8875 8.76297 22.1875 8.81297C25.4125 9.18797 27.5 11.5755 27.5 15.0005Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22.1893 8.81299C21.8893 8.76299 21.5768 8.7505 21.2518 8.7505H8.75176C8.40176 8.7505 8.06426 8.7755 7.73926 8.8255C7.91426 8.4755 8.16426 8.1505 8.46426 7.8505L12.5268 3.77549C14.2393 2.07549 17.0143 2.07549 18.7268 3.77549L20.9143 5.98801C21.7143 6.77551 22.1393 7.77549 22.1893 8.81299Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M27.5 15.6255H23.75C22.375 15.6255 21.25 16.7505 21.25 18.1255C21.25 19.5005 22.375 20.6255 23.75 20.6255H27.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: "Visualizar Planos",
      onClick: () => navigate("/planos"),
    },
    {
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-gray-800 group-hover:text-white transition-colors"
        viewBox="0 0 41 40"
        fill="none">
        <path d="M27.3333 6.70001C33.0221 7.00001 35.875 9.05001 35.875 16.6667V26.6667C35.875 33.3333 34.1667 36.6667 25.625 36.6667H15.375C6.83333 36.6667 5.125 33.3333 5.125 26.6667V16.6667C5.125 9.06668 7.97792 7.00001 13.6667 6.70001" stroke="currentColor" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M17.0834 9.99992H23.9167C27.3334 9.99992 27.3334 8.33325 27.3334 6.66659C27.3334 3.33325 25.6251 3.33325 23.9167 3.33325H17.0834C15.3751 3.33325 13.6667 3.33325 13.6667 6.66659C13.6667 9.99992 15.3751 9.99992 17.0834 9.99992Z" fill="currentColor" stroke="currentColor" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M25.2837 23.6194H15.7166" stroke="currentColor" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20.5001 19.047L20.5001 28.3808" stroke="currentColor" stroke-width="2.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      ),
      label: "Agendar Aula",
      onClick: () => navigate("/gerenciar-treinos"),
    },
    {
      icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-gray-800 group-hover:text-white transition-colors"
        viewBox="0 0 30 31"
        fill="none">
        <path d="M25 10.8125V23C25 26.75 22.7625 28 20 28H10C7.2375 28 5 26.75 5 23V10.8125C5 6.75 7.2375 5.8125 10 5.8125C10 6.5875 10.3125 7.2875 10.825 7.8C11.3375 8.3125 12.0375 8.625 12.8125 8.625H17.1875C18.7375 8.625 20 7.3625 20 5.8125C22.7625 5.8125 25 6.75 25 10.8125Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 5.8125C20 7.3625 18.7375 8.625 17.1875 8.625H12.8125C12.0375 8.625 11.3375 8.3125 10.825 7.8C10.3125 7.2875 10 6.5875 10 5.8125C10 4.2625 11.2625 3 12.8125 3H17.1875C17.9625 3 18.6625 3.3125 19.175 3.825C19.6875 4.3375 20 5.0375 20 5.8125Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 16.75H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 21.75H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Criar Exercício",
      onClick: () => navigate("/gerenciar-exercicios"),
    },
    {
      icon: <VscFeedback />,
      label: "Responder Feedbacks",
      onClick: () => console.log("Responder Feedbacks clicado"),
    },
  ];

  const kpis = [
    {
      title: "Alunos Ativos",
      value: alunosAtivos,
      description: "Número total de alunos ativos.",
      icon: <FaUsers className="w-5 h-5 sm:w-7 sm:h-7" />,
      bgColor: "bg-[#748CAB1A]",
      iconColor: "text-[#748CAB]",
      rota: "/gerenciar-alunos"
    },
    {
      title: "Treinos Criados",
      value: treinosCriados,
      description: "Treinos criados recentemente.",
      icon: <FaDumbbell className="w-5 h-5 sm:w-7 sm:h-7" />,
      bgColor: "bg-[#46982B38]",
      iconColor: "text-[#46982B]",
      rota: "/gerenciar-treinos"
    },
    {
      title: "Treinos Próximos do Vencimento",
      value: treinosVencimento,
      description: "Treinos que expiram em 2 semanas.",
      icon: <FaClock className="w-5 h-5 sm:w-7 sm:h-7" />,
      bgColor: "bg-[#E96E354F]",
      iconColor: "text-[#E96E35]",
      rota: "/gerenciar-treinos"
    },
    {
      title: "Anamneses Pendentes",
      value: anamnesesPendentes,
      description: "Anamneses aguardando preenchimento.",
      icon: <FaClipboardList className="w-5 h-5 sm:w-7 sm:h-7" />,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      rota: "/gerenciar-alunos"
    },
  ];


  return (
    <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
      <MenuLateral isOpen={isSidebarOpen} />
      <div className="flex-1 overflow-y-auto max-h-[100vh]">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-8 space-y-8">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {kpis.map((kpi, index) => (
              <KPI
                key={index}
                title={kpi.title}
                value={kpi.value}
                description={kpi.description}
                icon={kpi.icon}
                bgColor={kpi.bgColor}
                iconColor={`${kpi.iconColor} hover:text-[#748CAB]`}
                rota={kpi.rota}
              />
            ))}
          </div>

          {/* Seção de Atalhos */}
          <div className="bg-[var(--cor-secundaria)] rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-[23px]">
              Atalhos
            </h2>{" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {atalhos.map((atalho, index) => (
                <Atalho
                  key={index}
                  icon={atalho.icon}
                  label={atalho.label}
                  onClick={atalho.onClick}
                />
              ))}
            </div>
          </div>

          {/* Seção de Compromissos */}
          <div className="flex flex-col 2xl:flex-row gap-6">
            <div className="2xl:w-[50%] w-full">
              <CompromissosHoje
                compromissos={compromissos}
                selectedDay={selectedDay}
                listarTreinosFinalizados={fetchTreinosFinalizados}
              />
            </div>
            <div className="2xl:w-[50%] w-full">
              <EstaSemana onDaySelect={setSelectedDay} compromissos={compromissos} borderType={"shadow"} />

            </div>

          </div>

        </main>
      </div>

    </div>
  );
};

export default Home;
