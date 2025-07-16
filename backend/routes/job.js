import express from 'express';
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getJobById,
} from '../controllers/jobController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createJob);
router.get('/', protect, getJobs);
router.put('/:id', protect, updateJob);
router.get('/:id', protect, getJobById);
router.delete('/:id', protect, deleteJob);
export default router;
