import mongoose from 'mongoose';

// Define the Message schema
const MessageSchema = new mongoose.Schema({
    user: { type: String, required: false },
    message: { type: String, required: false },
    timestamp: { type: Date, default: Date.now, required: false },
});

// Create the Message model using the Message schema
const Message = mongoose.model('Message', MessageSchema);
export default Message;
