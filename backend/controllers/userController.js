import fs from 'fs';
import path from 'path';
import User from '../models/User.js';

export const uploadResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Delete previous resume if exists
    if (user.resume && fs.existsSync(user.resume)) {
      fs.unlinkSync(user.resume);
    }

    // Save new resume path
    user.resume = req.file.path;
    await user.save();

    res.status(200).json({ message: 'Resume uploaded successfully', resume: user.resume });
  } catch (err) {
    res.status(500).json({ message: 'Resume upload failed', error: err.message });
  }
};
