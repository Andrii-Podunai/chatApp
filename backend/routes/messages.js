import express from 'express';
import Message from '../models/Message.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all messages
router.get('/', auth, async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Send a message
router.post('/', auth, async (req, res) => {
    const { message } = req.body;
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newMessage = new Message({ user: user.username, message });

        await newMessage.save(); // Save message without callback

        // Emit the message via Socket.IO
        req.app.get('io').emit('receiveMessage', newMessage);
        res.status(201).json(newMessage); // Send new message in response
    } catch (err) {
        console.error('Error sending message:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a message
router.delete('/:id', auth, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Check if the user is the author of the message
        if (message.user !== req.user.username) {
            return res.status(403).json({ message: 'You can only delete your own messages' });
        }

        // Use deleteOne instead of message.remove()
        await Message.deleteOne({ _id: req.params.id });
        req.app.get('io').emit('deleteMessage', req.params.id);
        res.json({ message: 'Message deleted' });

    } catch (err) {
        console.error('Error deleting message:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
