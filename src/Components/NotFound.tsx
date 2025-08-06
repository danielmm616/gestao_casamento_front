import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 - Página não encontrada';
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        flexDirection: 'column',
      }}
    >
      <h1>404 - Página não encontrada ;(</h1>
      <p>
        Você está perdido... Entre em contato com Daniel Morais para encontrar
        seu convite.
      </p>
    </div>
  );
}
