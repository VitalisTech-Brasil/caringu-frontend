import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Error from "./pages/Error";
import EsqueciSenha from "./pages/Esqueci-senha";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Login from "./pages/login";
import GerenciarAlunos from "./pages/GerenciarAlunos/GerenciarAlunos"; // Importando GerenciarAlunos
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
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;