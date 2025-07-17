import express from 'express';
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getJobById,
} from '../controllers/jobController.js';
import protect from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import Job from '../models/Job.js';

const router = express.Router();

router.post('/', protect, createJob);
router.get('/', protect, getJobs);
router.put('/:id', protect, updateJob);
router.get('/:id', protect, getJobById);
router.delete('/:id', protect, deleteJob);

router.post(
  '/:id/upload-resume',
  protect,
  upload.single('resume'),
  async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ message: 'Job not found' });

      // check ownership
      if (job.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      job.resume = req.file.filename;
      await job.save();

      res.json({ message: 'Resume uploaded successfully', resume: job.resume });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Resume upload failed' });
    }
  }
);

export default router;
