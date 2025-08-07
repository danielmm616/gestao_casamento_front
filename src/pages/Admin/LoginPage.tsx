import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/api';
import './LoginPage.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await loginAdmin(email, password);
      localStorage.setItem('token', res.data.token);
      navigate('/admin/painel');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Email ou senha inválidos');
    }
  }

  return (
    <div className="login-page-container">
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img
          className="guest-response-image"
          src={'/src/assets/logo.png'}
          alt={`logo.png`}
          style={{ maxWidth: '90%', maxHeight: '150px', margin: '0 auto' }}
        />
      </div>
      <h2>Painel Admin</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
