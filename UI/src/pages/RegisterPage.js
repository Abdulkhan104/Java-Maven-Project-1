import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = ({ setUser }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const newUser = { id: Date.now(), fullName, email, role: 'USER' };
    localStorage.setItem('veecart_user', JSON.stringify(newUser));
    setUser(newUser);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register for VeeCart</h2>
      {error && <div style={{ background: '#fee', color: '#c33', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '5px' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '5px' }} />
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
      </form>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;