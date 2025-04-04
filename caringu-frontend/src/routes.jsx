import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Cadastro from "./components/Cadastro/Cadastro";
import EsqueciSenha from "./pages/Esqueci-senha";
import Index from "./pages/Index";
import Error from "./pages/Error";
import './styles/global.css'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/esqueci-senha" element={<EsqueciSenha/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
