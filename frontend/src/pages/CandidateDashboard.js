import React, { useEffect, useState } from 'react';
import API from '../api';

export default function CandidateDashboard() {
  const [apps, setApps] = useState([]);
  useEffect(() => {
    API.get('/applications').then(res => setApps(res.data));
  }, []);
  return (
    <div>
      <h2>My Applications</h2>
      <ul>
        {apps.map(app => (
          <li key={app._id}>
            {app.job?.title} at {app.job?.company} - {app.status}
          </li>
        ))}
      </ul>
    </div>
  );
} 