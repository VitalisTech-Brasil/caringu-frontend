import { useEffect } from "react";
import ColunaImagem from "../components/Login/ColunaImagem";
import ColunaInputs from "../components/Login/ColunaInputs";
import '../styles/login.css'


const Login = () => {
  useEffect(() => {
    document.title = "Login | CaringU"
  }, []);
  return (
    <main className="flex items-center justify-center h-screen w-scrren p-1">
      <ColunaImagem/>
      <ColunaInputs/>
    </main>
  );
};

export default Login;
