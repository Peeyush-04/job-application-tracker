// libraries
import express from "express";
import { register, login } from '../controllers/authController.js';
import protect from "../middleware/authMiddleware.js";

// intialize router
const router = express.Router();

// POST /api/auth/register
router.post('/register', register);
router.post('/login', login);

export default router;