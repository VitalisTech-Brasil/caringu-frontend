import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth, requireAuth } from '../utils/authUtils';

/**
 * Hook personalizado para gerenciar autenticação
 * Verifica se o usuário está autenticado e redireciona se necessário
 */
export const useAuth = (redirectOnFail = true) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, true = authenticated, false = not authenticated
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setIsLoading(true);
        const authStatus = await checkAuth();
        setIsAuthenticated(authStatus);
        
        if (!authStatus && redirectOnFail) {
          // Se não estiver autenticado e deve redirecionar, limpa dados e redireciona
          sessionStorage.clear();
          navigate('/login');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
        
        if (redirectOnFail) {
          sessionStorage.clear();
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [navigate, redirectOnFail]);

  return {
    isAuthenticated,
    isLoading,
    checkAuth: () => requireAuth(navigate)
  };
};

/**
 * Hook para páginas que requerem autenticação
 * Mostra loading enquanto verifica e redireciona automaticamente se não autenticado
 */
export const useRequireAuth = () => {
  return useAuth(true);
};

/**
 * Hook para verificar autenticação sem redirecionar automaticamente
 * Útil para componentes que precisam saber o status mas não devem redirecionar
 */
export const useAuthStatus = () => {
  return useAuth(false);
};
