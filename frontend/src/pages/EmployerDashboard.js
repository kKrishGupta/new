import React, { useState } from 'react';
import API from '../api';

export default function EmployerDashboard() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [msg, setMsg] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await API.post('/jobs', { title, company, location, description, requirements });
      setMsg('Job posted!');
    } catch {
      setMsg('Error posting job');
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handlePost}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} required />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <textarea placeholder="Requirements" value={requirements} onChange={e => setRequirements(e.target.value)} required />
        <button type="submit">Post Job</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
} 