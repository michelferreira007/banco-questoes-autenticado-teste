import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';

// Função auxiliar para parsear o JSON de forma segura
const parseJsonSafely = (jsonString) => {
  // Se a string for nula, vazia ou não for uma string, retorna um array vazio
  if (!jsonString || typeof jsonString !== 'string') {
    return [];
  }
  try {
    // Tenta parsear o JSON
    return JSON.parse(jsonString);
  } catch (error) {
    // Se der erro no parse, loga o erro no console e retorna um array vazio
    console.error("Erro ao parsear JSON da afirmativa:", error, "String original:", jsonString);
    return [];
  }
};

function QuestoesPage() {
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestoes() {
      try {
        const response = await fetch('/api/questoes_pas_uem');
        if (!response.ok) {
          throw new Error(`Erro na rede: Status ${response.status}`);
        }
        const data = await response.json();
        setQuestoes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestoes();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Banco de Questões - UEM (Somatória)</h1>
        
        {loading && <p>Carregando questões...</p>}
        {error && <p className="text-red-500">Erro ao carregar a página: {error}</p>}
        
        {!loading && !error && (
          <div className="space-y-6">
            {questoes.map((questao) => {
              // Usamos nossa função segura para parsear as afirmativas
              const afirmativas = parseJsonSafely(questao.afirmativas);

              return (
                <div key={questao.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-xl font-semibold mb-2">
                    Questão {questao.numero_questao} ({questao.materia} - {questao.ano})
                  </h2>
                  <p className="text-gray-700 mb-4">{questao.enunciado}</p>
                  
                  <div className="space-y-2 mb-4">
                    {afirmativas.map((item) => (
                      <p key={item.numero} className="text-gray-600">
                        <strong>{item.numero})</strong> {item.texto}
                      </p>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md">
                    <p><strong>Soma correta:</strong> {questao.resposta_soma}</p>
                    <p className="mt-2"><strong>Resolução:</strong> {questao.resolucao}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestoesPage;
