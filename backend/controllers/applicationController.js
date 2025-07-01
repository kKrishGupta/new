import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

export const applyJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const resume = req.file ? req.file.path : '';
    const application = new Application({
      job: jobId,
      candidate: req.user.id,
      resume,
      coverLetter
    });
    await application.save();

    // Email notification
    const job = await Job.findById(jobId).populate('postedBy');
    const candidate = await User.findById(req.user.id);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: job.postedBy.email,
      subject: `New Application for ${job.title}`,
      text: `Candidate ${candidate.name} applied for ${job.title}.`
    });

    res.json({ msg: 'Application submitted!' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getApplications = async (req, res) => {
  const apps = await Application.find({ candidate: req.user.id }).populate('job');
  res.json(apps);
}; 