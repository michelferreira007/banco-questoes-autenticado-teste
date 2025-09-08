import React, { useEffect, useState } from 'react';

// Este é o componente principal da sua aplicação React.
function App() {
  // Estados para guardar os dados, o status de carregamento e os erros.
  const [questoes, setQuestoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Este hook roda uma vez quando o componente é montado.
  useEffect(() => {
    // 1. Chama a nossa API no backend.
    fetch('/api/questoes_pas_uem')
      .then(response => {
        // Se a resposta não for 200 (OK), nós consideramos um erro.
        if (!response.ok) {
          throw new Error(`Erro na rede: Status ${response.status}`);
        }
        return response.json(); // Converte a resposta para JSON.
      })
      .then(data => {
        // 2. Se tudo deu certo, guardamos os dados recebidos.
        console.log("Dados recebidos com sucesso da API:", data);
        setQuestoes(data);
        setLoading(false); // Paramos de mostrar a mensagem de "Carregando".
      })
      .catch(error => {
        // 3. Se qualquer passo falhou, guardamos o erro.
        console.error("Falha ao buscar questões:", error);
        setError(error);
        setLoading(false);
      });
  }, []); // O array vazio [] garante que isso rode só uma vez.

  // Se ainda estiver carregando, mostre uma mensagem.
  if (loading) {
    return <div>Carregando questões do banco de dados...</div>;
  }

  // Se deu algum erro, mostre o erro.
  if (error) {
    return <div>Erro ao carregar a página: {error.message}</div>;
  }

  // Se tudo correu bem, mostre as questões.
  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1>Banco de Questões - UEM (Somatória)</h1>
      
      {questoes.length > 0 ? (
        // Faz um loop em cada questão recebida e a exibe.
        questoes.map(questao => (
          <div key={questao.id} style={{ border: '1px solid #ccc', padding: '15px', margin: '20px 0', borderRadius: '8px' }}>
            
            {/* Cabeçalho da Questão */}
            <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              {`Questão ${questao.numero_questao} (${questao.materia} - ${questao.ano})`}
            </h2>
            
            {/* Enunciado */}
            <p style={{ fontSize: '1.1em', lineHeight: '1.6' }}>{questao.enunciado}</p>
            
            {/* Lista de Afirmativas */}
            <div style={{ marginTop: '15px' }}>
              {questao.afirmativas.map(af => (
                <div key={af.numero} style={{ marginBottom: '10px', display: 'flex' }}>
                  <strong style={{ marginRight: '10px' }}>{af.numero})</strong> 
                  <span>{af.texto}</span>
                </div>
              ))}
            </div>

            {/* Resposta e Resolução */}
            <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
              <p><strong>Soma correta:</strong> {questao.resposta_soma}</p>
              <p><strong>Resolução:</strong> {questao.resolucao}</p>
            </div>
          </div>
        ))
      ) : (
        // Mensagem caso o banco de dados esteja vazio.
        <div>Nenhuma questão foi encontrada no banco de dados.</div>
      )}
    </div>
  );
}

export default App;
