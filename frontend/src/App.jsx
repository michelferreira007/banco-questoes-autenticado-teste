import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Caminhos padronizados para minúsculas para evitar erros de case-sensitivity
import Header from './components/Header.jsx'; 
import QuestoesPage from './pages/QuestoesPage.jsx'; 

function HomePage() {
  return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Bem-vindo à Plataforma!</h1>;
}

function LoginPage() {
  return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Página de Login</h1>;
}

function App() {
  return (
    <>
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

