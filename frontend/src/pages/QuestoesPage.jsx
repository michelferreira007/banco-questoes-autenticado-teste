import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx';

const parseJsonSafely = (jsonString) => {
  if (!jsonString || typeof jsonString !== 'string') return [];
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Erro ao parsear JSON:", jsonString, error);
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
        if (!response.ok) throw new Error(`Erro na rede: Status ${response.status}`);
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
    <div className="flex bg-gray-50 min-h-screen"> {/* Adiciona um fundo cinza claro e altura mínima */}
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Banco de Questões - UEM (Somatória)</h1>
        
        {loading && <p>Carregando questões...</p>}
        {error && <p className="text-red-500">Erro ao carregar a página: {error}</p>}
        
        {!loading && !error && (
          <div className="space-y-8"> {/* Aumenta o espaço entre os cards */}
            {questoes.map((questao) => {
              // AQUI ESTÁ A MÁGICA: Parseamos o JSON aqui fora
              const afirmativasArray = parseJsonSafely(questao.afirmativas);

              return (
                <div key={questao.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800">
                      Questão {questao.numero_questao}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                      {questao.materia} - {questao.ano}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{questao.enunciado}</p>
                  
                  {/* AGORA SIM: Mapeamos o array de afirmativas que acabamos de criar */}
                  <div className="space-y-3 mb-4 pl-4 border-l-2 border-gray-200">
                    {afirmativasArray.map((item) => (
                      <div key={item.numero}>
                        <p className="text-gray-800">
                          <strong>{item.numero})</strong> {item.texto}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md border">
                    <p className="font-semibold"><strong>Soma correta:</strong> {questao.resposta_soma}</p>
                    {questao.resolucao && (
                      <p className="mt-2 text-sm text-gray-600"><strong>Resolução:</strong> {questao.resolucao}</p>
                    )}
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
