import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function JobListingsPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    API.get('/jobs').then(res => setJobs(res.data));
  }, []);
  const filtered = jobs.filter(job => job.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <input placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)} />
      <ul>
        {filtered.map(job => (
          <li key={job._id}>
            <Link to={`/jobs/${job._id}`}>{job.title} at {job.company}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 