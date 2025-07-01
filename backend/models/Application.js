import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resume: String,
  coverLetter: String,
  status: { type: String, default: 'applied' },
  appliedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema); 