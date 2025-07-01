import Job from '../models/Job.js';

export const createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.user.id });
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getJobs = async (req, res) => {
  const { search } = req.query;
  let query = {};
  if (search) query.title = { $regex: search, $options: 'i' };
  const jobs = await Job.find(query).sort({ createdAt: -1 });
  res.json(jobs);
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.json(job);
};

export const getFeaturedJobs = async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 }).limit(5);
  res.json(jobs);
}; 