import React, { useState } from 'react';
import API from '../api';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'candidate' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const url = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await API.post(url, form);
      localStorage.setItem('token', data.token);
      setMsg('Success!');
    } catch {
      setMsg('Error');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />}
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        {!isLogin && (
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
      {msg && <p>{msg}</p>}
    </div>
  );
} 