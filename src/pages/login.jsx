import { useEffect } from "react";
import { Link } from "react-router-dom";
import ColunaImagem from "../components/Login/ColunaImagem";
import ColunaInputs from "../components/Login/ColunaInputs";
import "../styles/login.css";

const Login = () => {
  useEffect(() => {
    document.title = "Login | CaringU";
  }, []);

  return (
    <main className="flex items-center justify-center h-screen w-screen p-1">
      <ColunaImagem />
      <ColunaInputs />
      <div className="absolute bottom-10 right-10">
        <Link to="/personal">
          {" "}
          {/* Certifique-se de que o path está correto */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Acessar Dashboard
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Login;
