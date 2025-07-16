// libraries
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// protecting auth routes
const protect = async (request, response, next) => {
  try {
    // get token from header
    const authHeader = request.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
      return response.status(401).json({message: 'No token provided. Authorization denied.'});
    }

    // exract token
    const token = authHeader.split(' ')[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    request.user = await User.findById(decoded.id).select('-password'); // excluding password

    next(); // move to next middleware/route handler
  } catch (err) {
    return response.status(401).json({
      message: 'Invalid or expired token',
      error: err.message,
    });
  }
};

export default protect;