import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import auth from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

// Hardcoded users
const hardcodedUsers = [
    { username: 'testuser', password: 'password123' },
    { username: 'seconduser', password: 'password456' }
];

// Create hardcoded users at startup
const createHardcodedUsers = async () => {
    try {
        for (const userData of hardcodedUsers) {
            const user = await User.findOne({ username: userData.username });
            if (!user) {
                const newUser = new User(userData);
                await newUser.save();
            }
        }
    } catch (err) {
        console.error('Error creating hardcoded users:', err.message);
    }
};

createHardcodedUsers();

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Incorrect username or password' });
        }
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current user information
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
