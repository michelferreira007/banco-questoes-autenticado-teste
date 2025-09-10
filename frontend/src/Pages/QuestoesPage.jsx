import React, { useEffect, useState } from 'react';

export default function QuestoesPage() {
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/questoes_pas_uem')
      .then(response => {
        if (!response.ok) throw new Error(`Erro na rede: Status ${response.status}`);
        return response.json();
      })
      .then(data => {
        setQuestoes(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Carregando questões...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Erro: {error.message}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      {questoes.map(questao => (
        <div key={questao.id} style={{ border: '1px solid #ccc', padding: '15px', margin: '20px 0', borderRadius: '8px' }}>
          <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            {`Questão ${questao.numero_questao} (${questao.materia} - ${questao.ano})`}
          </h2>
          <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>{questao.enunciado}</p>
          <div style={{ marginTop: '15px' }}>
            {questao.afirmativas.map(af => (
              <div key={af.numero} style={{ marginBottom: '10px', display: 'flex' }}>
                <strong style={{ marginRight: '10px' }}>{af.numero})</strong>
                <span>{af.texto}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
            <p><strong>Soma correta:</strong> {questao.resposta_soma}</p>
            <p><strong>Resolução:</strong> {questao.resolucao}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
