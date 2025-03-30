import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./components/Cadastro/Cadastro"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
