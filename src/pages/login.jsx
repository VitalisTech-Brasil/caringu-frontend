import { useEffect } from "react";
import ColunaImagem from "../components/Login/ColunaImagem";
import ColunaInputs from "../components/Login/ColunaInputs";
import { Toaster } from 'react-hot-toast';


const Login = () => {
  useEffect(() => {
    document.title = "Login | CaringU"
  }, []);
  return (
    <main className="flex items-center justify-center h-screen w-scrren p-1">
      <ColunaImagem />
      <ColunaInputs />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
};

export default Login;
