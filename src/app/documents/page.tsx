'use client';

import { useState, useEffect } from 'react';
import api from '../../services/api'; // Atualize com seu caminho para o axios configurado
import { useAuth } from '../../contexts/AuthContext'; // Certifique-se de que o caminho está correto


interface Document {
  id: number;
  filename: string;
  extractedText: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Função para buscar documentos
  const fetchDocuments = async () => {
    const userId = localStorage.getItem('userId'); // Certifique-se de que o userId é obtido
    if (!userId) {
      alert('Usuário não autenticado!');
      return;
    }
  
    try {
      const response = await api.get(`/documents/list?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDocuments(response.data);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      alert('Erro ao buscar documentos!');
    }
  };
  

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo para enviar.');
      return;
    }
  
    const userId = localStorage.getItem('userId'); // Obtém o userId do localStorage
    if (!userId) {
      alert('Usuário não autenticado!');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userId', userId); // Adiciona o userId ao FormData
  
    try {
      await api.post('/documents/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Upload realizado com sucesso!');
      fetchDocuments(); // Atualiza a lista de documentos
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload!');
    }
  };
  


  // Carregar documentos ao carregar a página
  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Seus Documentos</h1>

      {/* Lista de documentos */}
      <ul className="list-disc pl-5">
        {documents.map((doc) => (
          <li key={doc.id} className="mb-2">
            <div>
              <strong>Nome:</strong> {doc.filename}
            </div>
            <div>
              <strong>Texto extraído:</strong> {doc.extractedText || 'Nenhum texto extraído'}
            </div>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() =>
                window.open(`http://localhost:5555/documents/download/${doc.id}`, '_blank')
              }
            >
              Baixar Documento
            </button>
          </li>
        ))}
      </ul>

      {/* Upload de documento */}
      <div className="mt-8">
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Fazer Upload
        </button>
      </div>
    </div>
  );
}
