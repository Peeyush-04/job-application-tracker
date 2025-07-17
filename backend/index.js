import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/job.js';
import userRoutes from './routes/user.js';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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
