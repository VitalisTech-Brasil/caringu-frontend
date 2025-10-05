import { useEffect } from "react";
import ColunaImagem from "../components/Login/ColunaImagem";
import ColunaInputs from "../components/Login/ColunaInputs";
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import CustomToast from '../components/Utils/CustomToast';


const Login = () => {

  useEffect(() => {
    document.title = "Login | CaringU"
    
    // Verifica se o usuário foi redirecionado de uma rota protegida
    const wasRedirected = sessionStorage.getItem('redirectedToLogin');
    const lastProtectedRoute = sessionStorage.getItem('lastProtectedRoute');
    
    if (wasRedirected === 'true') {
      // Remove as flags imediatamente para evitar duplicação
      sessionStorage.removeItem('redirectedToLogin');
      sessionStorage.removeItem('lastProtectedRoute');
      
      // Adiciona um pequeno delay para garantir que o componente esteja totalmente montado
      setTimeout(() => {
        toast.custom((t) => (
          <CustomToast t={t} type="error" message="Você precisa fazer login para acessar esta página." />
        ));
      }, 200);
    } else if (lastProtectedRoute) {
      // Caso do botão voltar do navegador (sem flag de redirecionamento)
      sessionStorage.removeItem('lastProtectedRoute');
      
      setTimeout(() => {
        toast.custom((t) => (
          <CustomToast t={t} type="error" message="Você precisa fazer login para acessar esta página." />
        ));
      }, 200);
    }
  }, []);
  return (
    <main className="flex items-center justify-center h-screen w-screen p-1">
      <ColunaImagem />
      <ColunaInputs />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
};

export default Login;
