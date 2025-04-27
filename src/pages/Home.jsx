import React, { useEffect, useState } from "react";
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

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  // Define o dia atual como padrão ao carregar a página
  useEffect(() => {
    const today = new Date();
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
      icon: <GoPersonAdd />,
      label: "Adicionar Aluno",
      onClick: () => console.log("Adicionar Aluno clicado"),
    },
    {
      icon: <CiMedicalCase />,
      label: "Adicionar Treino",
      onClick: () => console.log("Adicionar Treino clicado"),
    },
    {
      icon: <TbReportAnalytics />,
      label: "Acessar Relatório",
      onClick: () => console.log("Acessar Relatório clicado"),
    },
    {
      icon: <VscFeedback />,
      label: "Responder Feedbacks",
      onClick: () => console.log("Responder Feedbacks clicado"),
    },
  ];

  const kpis = [
    {
      title: "Alunos ativos",
      value: 120,
      description: "Número total de alunos ativos.",
      icon: <FaUsers />,
      bgColor: "bg-[#748CAB1A]",
      iconColor: "text-[#748CAB]",
    },
    {
      title: "Treinos criados",
      value: 45,
      description: "Treinos criados recentemente.",
      icon: <FaDumbbell />,
      bgColor: "bg-[#46982B38]",
      iconColor: "text-[#46982B]",
    },
    {
      title: "Treinos próximos do vencimento",
      value: 8,
      description: "Treinos que expiram em breve.",
      icon: <FaClock />,
      bgColor: "bg-[#E96E354F]",
      iconColor: "text-[#E96E35]",
    },
    {
      title: "Anamneses pendentes",
      value: 5,
      description: "Anamneses aguardando preenchimento.",
      icon: <FaClipboardList />,
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  const compromissos = [
    {
      id: 1,
      horario: "9:00 - 10:00",
      local: "Academia XYZ",
      data: new Date().toLocaleDateString("pt-BR"),
      aluno: {
        nome: "João Silva",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 2,
      horario: "14:00 - 15:00",
      local: "Academia ABC",
      data: "30/04/2025",
      aluno: {
        nome: "Maria Oliveira",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 3,
      horario: "10:00 - 11:00",
      local: "Academia XYZ",
      data: "30/04/2025",
      aluno: {
        nome: "Carlos Souza",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 4,
      horario: "11:00 - 12:00",
      local: "Academia ABC",
      data: "30/04/2025",
      aluno: {
        nome: "Ana Paula",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 5,
      horario: "15:00 - 16:00",
      local: "Academia XYZ",
      data: "30/04/2025",
      aluno: {
        nome: "Lucas Mendes",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 6,
      horario: "8:00 - 9:00",
      local: "Academia XYZ",
      data: "29/04/2025",
      aluno: {
        nome: "Fernanda Lima",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 7,
      horario: "9:00 - 10:00",
      local: "Academia ABC",
      data: "29/04/2025",
      aluno: {
        nome: "Rafael Costa",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 8,
      horario: "10:00 - 11:00",
      local: "Academia XYZ",
      data: "29/04/2025",
      aluno: {
        nome: "Juliana Alves",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 9,
      horario: "11:00 - 12:00",
      local: "Academia ABC",
      data: "29/04/2025",
      aluno: {
        nome: "Pedro Henrique",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 10,
      horario: "13:00 - 14:00",
      local: "Academia XYZ",
      data: "29/04/2025",
      aluno: {
        nome: "Mariana Silva",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 11,
      horario: "14:00 - 15:00",
      local: "Academia ABC",
      data: "29/04/2025",
      aluno: {
        nome: "Gabriel Santos",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 12,
      horario: "9:00 - 10:00",
      local: "Academia XYZ",
      data: "28/04/2025",
      aluno: {
        nome: "Beatriz Oliveira",
        foto: "https://via.placeholder.com/150",
      },
    },
    {
      id: 13,
      horario: "10:00 - 11:00",
      local: "Academia ABC",
      data: "03/05/2025",
      aluno: {
        nome: "Ricardo Lima",
        foto: "https://via.placeholder.com/150",
      },
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#fdfbf7]">
      <MenuLateral isOpen={isSidebarOpen} />
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-8 font-sans space-y-8">
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
              />
            ))}
          </div>

          {/* Seção de Atalhos */}
          <div className="bg-[var(--cor-secundaria)] rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Atalhos</h2>
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
          <div className="flex flex-col md:flex-row gap-6">
            <CompromissosHoje
              compromissos={compromissos}
              selectedDay={selectedDay}
            />
            <EstaSemana onDaySelect={setSelectedDay} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
