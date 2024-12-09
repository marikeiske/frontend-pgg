'use client';

import { useState } from 'react';
import axios from '../../services/api'; // Importando o cliente Axios configurado

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { access_token, userId } = response.data; // Certifique-se de que o backend retorna o userId
      localStorage.setItem('token', access_token);
      localStorage.setItem('userId', userId); // Armazena o userId no localStorage
      alert('Login realizado com sucesso!');
      window.location.href = '/documents';
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Credenciais inválidas!');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  );
}
