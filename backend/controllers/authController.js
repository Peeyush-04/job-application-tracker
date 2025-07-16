// libraries
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// generate token
const generateToken = (userId) => {
  return jwt.sign({id: userId}, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// register logic
export const register = async (request, response) => {
  const { name, email, password } = request.body;

  try {
    // check user existence
    const existing = await User.findOne({ email });
    if(existing) {
      return response.status(400).json({ message: 'User already exists.'});
    }
    
    // create new user
    const user = await User.create({ name, email, password });

    // generate token
    const token = generateToken(user._id);

    // return response
    response.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (err) {
    response.status(500).json({ message: 'Registration failed.', error: err.message });
  }
};

// login logic
export const login = async (request, response) => {
  const {email, password} = request.body;

  try {
    // check user existence
    const user = await User.findOne({email});
    if(!user) {
      return response.status(400).json({message: 'User not found or Invalid user email'});
    }

    // compare password
    const passwordMatched = await bcrypt.compare(password, user.password);
    if(!passwordMatched) {
      return response.status(400).json({message: 'Invalid password'});
    }

    // generate token
    const token = generateToken(user._id);

    // return success response
    response.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    response.status(500).json({
      message: 'Login failed',
      error: err.message,
    });
  }
};