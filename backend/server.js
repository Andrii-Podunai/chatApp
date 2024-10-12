import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messages.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Use CORS only once
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
    methods: ['GET', 'POST', 'DELETE'], // Allow GET and POST requests
    credentials: true // Allow cookies to be sent
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", 'DELETE']
    }
});

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routers
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Pass io to routes
app.set('io', io);

// Socket.IO Events
io.on('connection', (socket) => {
    socket.on('sendMessage', (message) => {
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        // Optional: You can add logic here if needed
    });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
