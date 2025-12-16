import Router from './router';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />

      <header
        style={{
          height: '40px',
        }}
      ></header>

      <Router />

      {/* <footer
        style={{
          textAlign: 'center',
          marginTop: '40px',
          padding: '20px 0',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          textShadow: '0 0 6px rgba(0,0,0,0.6)',
        }}
      >
        <span>Desenvolvido por</span>
        <br />
        <span style={{ fontWeight: '700' }}>DMM Tech</span>
      </footer> */}
    </>
  );
}

export default App;
