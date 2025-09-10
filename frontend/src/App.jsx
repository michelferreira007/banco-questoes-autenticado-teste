import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importando os blocos de construção que criamos
import Header from './components/Header';
import QuestoesPage from './pages/QuestoesPage';

// Criando páginas temporárias para marcar o lugar
function HomePage() {
  return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Bem-vindo à Plataforma!</h1>;
}

function LoginPage() {
  return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Página de Login</h1>;
}

// O App agora só organiza o layout e as rotas.
function App() {
  return (
    <>
      <Header /> {/* O cabeçalho aparece em todas as páginas */}
      <main>
        {/* O Routes decide qual página mostrar */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questoes" element={<QuestoesPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
