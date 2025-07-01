import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobListingsPage from './pages/JobListingsPage';
import JobDetailPage from './pages/JobDetailPage';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import AuthPage from './pages/AuthPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/jobs">Jobs</Link> | <Link to="/employer">Employer</Link> | <Link to="/candidate">Candidate</Link> | <Link to="/auth">Login/Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobListingsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/employer" element={<EmployerDashboard />} />
        <Route path="/candidate" element={<CandidateDashboard />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
} 