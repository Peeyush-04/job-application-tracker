import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/job.js';
import userRoutes from './routes/user.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use('/upload', express.static('upload'));
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/user', userRoutes);

// DB & Server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('=> Successfully connected to DB.');
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}).catch(err => {
  console.error('Connection error: ', err);
});
