import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Error from "./pages/Error";
import EsqueciSenha from "./pages/Esqueci-senha";
import GerenciarAlunos from "./pages/GerenciarAlunos/GerenciarAlunos";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Login from "./pages/login.jsx";
import Perfil from "./pages/Perfil/Perfil";
import RelatorioTreino from "./pages/Relatorios/RelatorioTreinos.jsx";
import Dashboard from "./pages/Relatorios/Dashboard.jsx";
import "./styles/global.css";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gerenciar-alunos" element={<GerenciarAlunos />} />
        <Route path="/relatorio-treino/:id" element={<RelatorioTreino />} />
        <Route path="/dashboard/:idAluno/:idTreino" element={<Dashboard />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;