import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

// Middleware function for authentication
const auth = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token' });

    try {
                // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Store the full user object in req.user for access in other routes
        req.user = user;
        next(); // Call the next middleware in the stack
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export default auth;
