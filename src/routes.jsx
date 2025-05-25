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
import ProcurandoPersonal from "./pages/ProcurandoPersonal"; // Importação da nova página
import RelatorioTreino from "./pages/Relatorios/RelatorioTreinos.jsx";
import Dashboard from "./pages/Relatorios/Dashboard.jsx";
import PerfilPersonal from "./pages/PerfilPersonal.jsx";
import SolicitacoesPendentes from "./pages/SolicitacoesPendentes.jsx";
import SessaoExpiradaModal from "./components/Utils/SessaoExpiradaModal.jsx";
import RegistroCorporal from "./pages/Relatorios/RegistroCorporal.jsx";
import PerfilAluno from "./pages/GerenciarAlunos/PerfilAluno.jsx";
import GerenciarTreinos from "./pages/GerenciarTreinos/GerenciarTreinos.jsx";
import CriarTreino from "./pages/GerenciarTreinos/CriarTreino.jsx";
import "./styles/global.css";

const AppRoutes = () => {

  const [sessaoExpirada, setSessaoExpirada] = useState(false);
  const [modalMensagem, setModalMensagem] = useState("");
  const [modalTitulo, setModalTitulo] = useState("");

  useEffect(() => {
    const handler = () => {
      setModalMensagem(sessionStorage.getItem("modalMensagem") || "");
      setModalTitulo(sessionStorage.getItem("modalTitulo") || "");
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
        titulo={modalTitulo}
        mensagem={modalMensagem}
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gerenciar-alunos" element={<GerenciarAlunos />} />
        <Route path="/gerenciar-treinos" element={<GerenciarTreinos />} />
        <Route path="/criar-treino" element={<CriarTreino />} />
        <Route path="/relatorio-treino/:id" element={<RelatorioTreino />} />
        <Route path="/dashboard/:idAluno/:idTreino" element={<Dashboard />} />
        <Route path="/relatorios/registro-corporal/:idAluno" element={<RegistroCorporal />} />
        <Route path="/perfil-aluno/:idAluno" element={<PerfilAluno />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/procurando-personal" element={<ProcurandoPersonal />} />
        <Route path="/perfil-personal" element={<PerfilPersonal />} />
        <Route path="/solicitacoes-pendentes" element={<SolicitacoesPendentes />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;