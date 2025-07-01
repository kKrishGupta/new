import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import { applyJob, getApplications } from '../controllers/applicationController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.single('resume'), applyJob);
router.get('/', auth, getApplications);

export default router; 