import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    API.get(`/jobs/${id}`).then(res => setJob(res.data));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('jobId', id);
    formData.append('coverLetter', coverLetter);
    if (resume) formData.append('resume', resume);
    try {
      await API.post('/applications', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Application submitted!');
    } catch (err) {
      setMsg('Error submitting application');
    }
  };

  if (!job) return <div>Loading...</div>;
  return (
    <div>
      <h2>{job.title} at {job.company}</h2>
      <p>{job.description}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Requirements:</b> {job.requirements}</p>
      <form onSubmit={handleApply}>
        <textarea placeholder="Cover Letter" value={coverLetter} onChange={e => setCoverLetter(e.target.value)} />
        <input type="file" onChange={e => setResume(e.target.files[0])} />
        <button type="submit">Apply</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
} 