import React from 'react';
import { Link } from 'react-router-dom'; // Link é o que torna os links navegáveis sem recarregar a página.

// Este é o componente do CABEÇALHO.
export default function Header() {
  return (
    <header style={{
      padding: '1rem 2rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Plataforma de Questões
        </Link>
      </h1>
      <nav>
        <Link to="/questoes" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>
          Questões
        </Link>
        <Link to="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
          Login
        </Link>
      </nav>
    </header>
  );
}

