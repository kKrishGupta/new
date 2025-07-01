import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    API.get('/jobs/featured').then(res => setJobs(res.data));
  }, []);
  return (
    <div>
      <h1>Welcome to the Job Board!</h1>
      <h2>Featured Jobs</h2>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <Link to={`/jobs/${job._id}`}>{job.title} at {job.company}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 