import apiClient from '../client/apiClient';

// LOGIN
export const login = async (email: string, password: string) => {
  const response = await apiClient.post(
    '/auth/login',
    { email, password },
    { withCredentials: true } // <-- importante para cookies
  );

  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }

  return response.data;
};






// LOGOUT
export const logout = async () => {
  try {
    await apiClient.post('/auth/logout', {}, { withCredentials: true });
  } catch (err) {
    console.error('Erro ao fazer logout:', err);
  } finally {
    // Remove dados locais (mesmo que não tenha token)
    localStorage.removeItem('user');

    // Redireciona para login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
};




// VERIFICAR SE USUÁRIO ESTÁ AUTENTICADO
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('token');
  return !!token;
};

// OBTER TOKEN
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

// OBTER USUÁRIO ATUAL
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ATUALIZAR DADOS DO USUÁRIO NO LOCALSTORAGE
export const updateUserData = (userData: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};