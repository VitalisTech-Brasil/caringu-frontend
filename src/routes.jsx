import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Error from "./pages/Error";
import EsqueciSenha from "./pages/Esqueci-senha";
import GerenciarAlunos from "./pages/GerenciarAlunos/GerenciarAlunos";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Login from "./pages/login.jsx";
import Perfil from "./pages/Perfil/Perfil";
import Planos from "./pages/Planos/Planos.jsx";
import ProcurandoPersonal from "./pages/ProcurandoPersonal";
import RelatorioTreino from "./pages/Relatorios/RelatorioTreinos.jsx";
import Dashboard from "./pages/Relatorios/Dashboard.jsx";
import Agenda from './pages/Agenda/Agenda.jsx';
import PerfilPersonal from "./pages/PerfilPersonal.jsx";
import SolicitacoesPendentes from "./pages/SolicitacoesPendentes.jsx";
import SessaoExpiradaModal from "./components/Utils/SessaoExpiradaModal.jsx";
import RegistroCorporal from "./pages/Relatorios/RegistroCorporal.jsx";
import FichaAluno from "./pages/GerenciarAlunos/PerfilAluno.jsx";
import GerenciarTreinos from "./pages/GerenciarTreinos/GerenciarTreinos.jsx";
import CriarTreino from "./pages/GerenciarTreinos/CriarTreino.jsx";
import EditarTreino from "./pages/GerenciarTreinos/EditarTreino.jsx";
import GerenciarExercicios from './pages/GerenciarExercicios/GerenciarExercicios.jsx';
import VisualizarPdf from "./pages/Relatorios/VisualizarPdf.jsx";
import Feedback from './pages/GerenciarAlunos/Feedback.jsx';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MinhaEvolucao from './pages/Aluno/MinhaEvolucao.jsx';
import "./styles/global.css";
import MinhasAulas from './pages/Aluno/MinhasAulas.jsx';
import TreinoAulas from './pages/Aluno/TreinoAulas.jsx';
import VisualizarAula from './pages/GerenciarAlunos/VisualizarTreino.jsx';
import FeedbackAluno from './pages/Aluno/Feedback/Feedback.jsx';
import FeedbackMensagem from './pages/Aluno/Feedback/FeedbackMensagem.jsx';
import HomeAluno from "./pages/HomeAluno";
import ProgressoCorporal from './pages/Aluno/ProgressoCorporal.jsx';
import AlunoPlanos from './pages/Aluno/AlunoPlanos.jsx';
import AcompanharAula from './pages/Agenda/AcompanharAula.jsx';
import PerfilAluno from './pages/Aluno/PerfilAluno.jsx';
import AgendaAluno from './pages/Aluno/Agenda.jsx';


const AppRoutes = () => {

  const [sessaoExpirada, setSessaoExpirada] = useState(false);
  const [modalMensagem, setModalMensagem] = useState("");
  const [modalTitulo, setModalTitulo] = useState("");

  useEffect(() => {
    const handler = () => {
      /*       setModalMensagem(sessionStorage.getItem("modalMensagem") || "");
            setModalTitulo(sessionStorage.getItem("modalTitulo") || ""); */
      setSessaoExpirada(true);
    };

    window.addEventListener('sessaoExpirada', handler);
    return () => window.removeEventListener('sessaoExpirada', handler);
  }, []);

  return (
    <Router>
      <SessaoExpiradaModal
        visible={sessaoExpirada}
        onClose={() => setSessaoExpirada(false)}
      />
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/procurando-personal" element={<ProcurandoPersonal />} />
        <Route path="/perfil-personal/:id" element={<PerfilPersonal />} />

        {/* Rotas protegidas */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/gerenciar-alunos" element={
          <ProtectedRoute>
            <GerenciarAlunos />
          </ProtectedRoute>
        } />
        <Route path="/gerenciar-treinos" element={
          <ProtectedRoute>
            <GerenciarTreinos />
          </ProtectedRoute>
        } />
        <Route path="/gerenciar-exercicios" element={
          <ProtectedRoute>
            <GerenciarExercicios />
          </ProtectedRoute>
        } />
        <Route path="/criar-treino" element={
          <ProtectedRoute>
            <CriarTreino />
          </ProtectedRoute>
        } />
        <Route path="/editar-treino/:id" element={
          <ProtectedRoute>
            <EditarTreino />
          </ProtectedRoute>
        } />
        <Route path="/relatorio-treino/:id" element={
          <ProtectedRoute>
            <RelatorioTreino />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/:idAluno/:idTreino" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/visualizar-pdf/:idAluno/:idTreino" element={
          <ProtectedRoute>
            <VisualizarPdf />
          </ProtectedRoute>
        } />
        <Route path="/relatorios/registro-corporal/:idAluno" element={
          <ProtectedRoute>
            <RegistroCorporal />
          </ProtectedRoute>
        } />
        <Route path="/ficha-aluno/:idAluno" element={
          <ProtectedRoute>
            <FichaAluno />
          </ProtectedRoute>
        } />
        <Route path="/perfil" element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        } />
        <Route path="/planos" element={
          <ProtectedRoute>
            <Planos />
          </ProtectedRoute>
        } />
        <Route path="/solicitacoes-pendentes" element={
          <ProtectedRoute>
            <SolicitacoesPendentes />
          </ProtectedRoute>
        } />
        <Route path="/agenda" element={
          <ProtectedRoute>
            <Agenda />
          </ProtectedRoute>
        } />
        <Route path="/minhaEvolucao" element={
          <ProtectedRoute>
            <MinhaEvolucao />
          </ProtectedRoute>
        } />
        <Route path="/minhasAulas" element={
          <ProtectedRoute>
            <MinhasAulas />
          </ProtectedRoute>
        } />
        <Route path="/treinosAula" element={
          <ProtectedRoute>
            <TreinoAulas />
          </ProtectedRoute>
        } />
        <Route path="/feedback/:idAluno" element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        } />
        <Route path="/home-aluno" element={
          <ProtectedRoute>
            <HomeAluno />
          </ProtectedRoute>
        } />
        <Route path="/visualizar-aula/:idAluno" element={
          <ProtectedRoute>
            <VisualizarAula />
          </ProtectedRoute>
        } />
        <Route path="/progresso-corporal-aluno" element={
          <ProtectedRoute>
            <ProgressoCorporal />
          </ProtectedRoute>
        } />
        <Route path="/aluno-planos" element={
          <ProtectedRoute>
            <AlunoPlanos />
          </ProtectedRoute>
        } />
        <Route path="/feedback-aluno" element={
          <ProtectedRoute>
            <FeedbackAluno />
          </ProtectedRoute>
        } />
        <Route path="/feedback-mensagem" element={
          <ProtectedRoute>
            <FeedbackMensagem />
          </ProtectedRoute>
        } />
        <Route path="/acompanhar-aula/:idAluno" element={
          <ProtectedRoute>
            <AcompanharAula />
          </ProtectedRoute>
        } />
        <Route path="/agenda-aluno" element={
          <ProtectedRoute>
            <AgendaAluno />
          </ProtectedRoute>
        } />
        <Route path="/perfil-aluno" element={
          <ProtectedRoute>
            <PerfilAluno />
          </ProtectedRoute>
        } />
        {/* Rota de erro */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;