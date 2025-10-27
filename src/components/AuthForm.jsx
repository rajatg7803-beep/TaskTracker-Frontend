import React, { useState } from 'react';
import { register, login } from '../api';

//toggle between login and register forms.
const AuthForm = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const res = await login({ email: form.email, password: form.password });
        onAuth(res.data.token);
      } else {
        await register(form);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {/* Password hint for registration */}
        {!isLogin && (
          <div style={{ fontSize: '0.9em', color: '#555', marginBottom: 8 }}>
            Password must be at least 6 characters.
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button
        style={{ background: '#e2e8f0', color: '#2d3748', marginTop: 10 }}
        onClick={() => { setIsLogin(!isLogin); setError(''); }}
      >
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
    </div>
  );
};

export default AuthForm;