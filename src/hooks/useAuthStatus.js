import { useState, useEffect } from 'react';

/**
 * Hook simples para verificar se o usuário está logado
 * Baseado apenas nos dados do sessionStorage
 * A validação real do token é feita pelos interceptors da API
 */
export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = () => {
      const pessoaId = sessionStorage.getItem('pessoaId');
      const usuario = sessionStorage.getItem('usuario');
      
      setIsLoggedIn(!!(pessoaId && usuario));
      setIsLoading(false);
    };

    checkLoginStatus();

    // Escuta mudanças no sessionStorage
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Também verifica quando o componente é montado
    const interval = setInterval(checkLoginStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return { isLoggedIn, isLoading };
};
