import express from 'express';
import multer from 'multer';
import protect from '../middleware/authMiddleware.js';
import { uploadResume } from '../controllers/userController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.post('/upload-resume', protect, upload.single('resume'), uploadResume);
router.get('/me', protect, (req, res) => {
  res.json(req.user);
});

export default router;
