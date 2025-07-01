import express from 'express';
import auth from '../middleware/auth.js';
import { createJob, getJobs, getJob, getFeaturedJobs } from '../controllers/jobController.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/featured', getFeaturedJobs);
router.get('/:id', getJob);
router.post('/', auth, createJob);

export default router; 