'use client';

import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
  email: string;
  userId: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5555/auth/login', { email, password });
      const { token, userId } = response.data; // Certifique-se de que o backend retorna o userId
      setUser({ email, userId }); // Adiciona o userId no estado do usuário
      localStorage.setItem('token', token); // Salva o token no localStorage
      localStorage.setItem('userId', userId.toString()); // Salva o userId no localStorage
      router.push('/documents'); // Redireciona para a página de documentos
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Credenciais inválidas!');
    }
  };
  
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove o token ao sair
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};


export default AuthProvider;