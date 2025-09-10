import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.jsx'; // Importamos nossa nova Sidebar

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
    <div className="flex"> {/* Container principal que coloca os itens lado a lado */}
      <Sidebar /> {/* Nossa nova barra lateral */}
      
      {/* Área de conteúdo principal */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Banco de Questões - UEM (Somatória)</h1>
        
        {loading && <p>Carregando questões...</p>}
        {error && <p className="text-red-500">Erro ao carregar a página: {error}</p>}
        
        {!loading && !error && (
          <div className="space-y-6">
            {questoes.map((questao) => (
              // Este é o "Card" da questão, inspirado nas suas referências
              <div key={questao.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl font-semibold mb-2">
                  Questão {questao.numero_questao} ({questao.materia} - {questao.ano})
                </h2>
                <p className="text-gray-700 mb-4">{questao.enunciado}</p>
                
                <div className="space-y-2 mb-4">
                  {JSON.parse(questao.afirmativas).map((item) => (
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestoesPage;
