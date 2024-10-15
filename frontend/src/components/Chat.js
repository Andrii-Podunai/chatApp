import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './Chat.css'; // Importing styles for the chat component

const Chat = ({ token, user }) => {
    const [messages, setMessages] = useState([]); // State to hold the list of messages
    const [message, setMessage] = useState(''); // State to hold the current message being typed
    const [socket, setSocket] = useState(null); // State to hold the socket connection
    const messagesEndRef = useRef(null); // Ref to auto-scroll to the bottom of messages

    // Function to scroll to the bottom of the messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const newSocket = io('http://localhost:5001');
        setSocket(newSocket);

        const fetchMessages = async () => {
            const res = await axios.get('http://localhost:5001/api/messages', {
                headers: { Authorization: token },
            });
            setMessages(res.data); // Update state with fetched messages
        };

        fetchMessages();

        newSocket.on('receiveMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]); // Add new message to state
        });

        newSocket.on('deleteMessage', (messageId) => {
            console.log('Message deleted with ID:', messageId); // Log message deletion
            setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId)); // Remove deleted message from state
        });

        return () => newSocket.close(); // Cleanup on component unmount
    }, [token]);

    useEffect(() => {
        scrollToBottom(); // Scroll to the bottom whenever a new message is added
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (message.trim() === '' || !user) return; // Don't send empty messages or if user is null

        const newMessage = { user: user.username, message }; // Create message object with user info

        setMessage('');
        await axios.post(
            'http://localhost:5001/api/messages',
            { user: user.username, message }, // Send message along with user info
            { headers: { Authorization: token } }
        );
    };

    const deleteMessage = async (messageId) => {
        await axios.delete(`http://localhost:5001/api/messages/${messageId}`, {
            headers: { Authorization: token },
        });
        setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId)); // Remove deleted message from state
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        window.location.reload(); // Reload the page
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h2 data-testid="chat-title">Chat</h2>
                {user && <div className="user-info" data-testid="user-info">You: {user.username}</div>}
                <button onClick={handleLogout} className="logout-button" data-testid="logout-button">Logout</button>
            </header>
            <div className="messages" data-testid="messages-container">
                {messages.map((msg) => (
                    <div key={msg._id} className="message" data-testid={`message-${msg._id}`}> {/* Unique data-testid */}
                        <div className="message-content">
                            <strong>{msg.user}: </strong>
                            <span data-testid="message-text" className="message-text">{msg.message}</span>
                        </div>
                        {msg.user === user?.username && (
                            <button data-testid={`delete-button-${msg._id}`} className="delete-button" onClick={() => deleteMessage(msg._id)}>
                                Delete
                            </button>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="message-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} // Update message state on input change
                    placeholder="Type your message..."
                    required
                    data-testid="message-input"
                />
                <button type="submit" data-testid="send-button">Send</button>
            </form>
        </div>
    );
};

export default Chat;
