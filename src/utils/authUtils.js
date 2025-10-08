import { caringuApi } from '../provider/caringuApi';

/**
 * Função para fazer logout do usuário
 * Chama o endpoint de logout no backend para invalidar o cookie HttpOnly
 */
export const logout = async () => {
  try {
    // Chama o endpoint de logout no backend
    // O backend deve invalidar o cookie HttpOnly
    await caringuApi.post('/logout');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    // Mesmo com erro, continuamos com a limpeza local
  } finally {
    // Limpa os dados locais do usuário
    sessionStorage.clear();
    // Redireciona para a página inicial
    window.location.href = '/';
  }
};

export const checkAuth = async () => {
  // Verifica se há dados do usuário no sessionStorage
  const pessoaId = sessionStorage.getItem('pessoaId');
  const usuario = sessionStorage.getItem('usuario');
  
  if (!pessoaId || !usuario) {
    return false;
  }
  
  // Se há dados, assumimos que está autenticado
  // A validação real do token será feita quando fizer uma requisição
  return true;
};

/**
 * Função para verificar autenticação e redirecionar se necessário
 * Usada nas páginas protegidas
 */
export const requireAuth = async (navigate) => {
  const isAuthenticated = await checkAuth();
  
  if (!isAuthenticated) {
    // Limpa dados locais e redireciona para login
    sessionStorage.clear();
    navigate('/login');
    return false;
  }
  
  return true;
};
