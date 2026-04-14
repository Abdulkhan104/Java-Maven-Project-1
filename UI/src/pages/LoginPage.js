import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email === 'admin@veecart.com' && password === 'admin123') {
      const user = { id: 1, fullName: 'Admin User', email, role: 'ADMIN' };
      localStorage.setItem('veecart_user', JSON.stringify(user));
      setUser(user);
      navigate('/admin');
    } else if (email === 'demo@veecart.com' && password === 'demo123') {
      const user = { id: 2, fullName: 'Demo User', email, role: 'USER' };
      localStorage.setItem('veecart_user', JSON.stringify(user));
      setUser(user);
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login to VeeCart</h2>
      {error && <div style={{ background: '#fee', color: '#c33', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px' }} />
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
      </form>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>Demo: demo@veecart.com / demo123</p>
        <p>Admin: admin@veecart.com / admin123</p>
        <Link to="/register">Create Account</Link>
      </div>
    </div>
  );
};

export default LoginPage;