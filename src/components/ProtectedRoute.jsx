import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuth';

/**
 * Componente para proteger rotas que requerem autenticação
 * Verifica se o usuário está logado e redireciona se necessário
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, userRole } = useAuthStatus();


  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-[var(--cor-secundaria)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--cor-primaria)] mx-auto mb-4"></div>
          <p className="text-[var(--cor-primaria)]">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Se não estiver logado, redireciona para login
  if (!isAuthenticated) {
    // Marca que o usuário foi redirecionado para mostrar toast no login
    sessionStorage.setItem('redirectedToLogin', 'true');

    // Salva a rota atual para detectar navegação pelo botão voltar
    const currentPath = window.location.pathname;
    sessionStorage.setItem('lastProtectedRoute', currentPath);

    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/*" replace />;
  }

  // Se estiver logado, renderiza o componente filho
  return children;
};

export default ProtectedRoute;
