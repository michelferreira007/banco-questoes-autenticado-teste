import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importando os componentes que criamos
import Header from './components/Header.jsx'; // <-- A CORREÇÃO ESTÁ AQUI!
import QuestoesPage from './pages/QuestoesPage.jsx'; // Adicionei .jsx aqui também por segurança

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
    <> {/* Usamos um fragmento <>...</> para não adicionar divs desnecessárias */}
      <Header />
      <main>
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
