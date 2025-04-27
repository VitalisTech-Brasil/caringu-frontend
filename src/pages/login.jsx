import { useEffect } from "react";
import { Link } from "react-router-dom"; // Importar Link
import ColunaImagem from "../components/Login/ColunaImagem";
import ColunaInputs from "../components/Login/ColunaInputs";
import Button from "../components/Utils/Button"; // Importar o componente Button
import "../styles/login.css";

const Login = () => {
  useEffect(() => {
    document.title = "Login | CaringU";
  }, []);

  return (
    <main className="flex items-center justify-center h-screen w-scrren p-1">
      <ColunaImagem />
      <ColunaInputs />
      <div className="absolute bottom-8 right-8">
        <Link to="/home">
          <Button
            texto="Ir para Home"
            cor="var(--laranja)"
            corTexto="var(--cor-secundaria)"
            corHover="#ca6333"
            width="150px"
            height="50px"
            fontSize="16px"
          />
        </Link>
      </div>
    </main>
  );
};

export default Login;
