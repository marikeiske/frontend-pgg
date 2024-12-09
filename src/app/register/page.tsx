'use client';

import { useState } from 'react';
import axios from '../../services/api'; // Importando o cliente Axios configurado

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      await axios.post('/auth/register', { email, password });
      alert('Usuário registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro ao registrar. Verifique os dados.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Registro</h2>
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
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Registrar
        </button>
      </form>
    </div>
  );
}
