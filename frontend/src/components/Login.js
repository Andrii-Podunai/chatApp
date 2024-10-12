import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState(''); // State to hold the username input
    const [password, setPassword] = useState(''); // State to hold the password input

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const res = await axios.post('http://localhost:5001/api/auth/login', { username, password }); // Send login request
            setToken(res.data.token); // Set the token in the parent component
        } catch (err) {
            alert('Incorrect username or password'); // Alert on error
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 data-testid="login-title">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                    required
                    data-testid="username-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                    required
                    data-testid="password-input"
                />
                <button type="submit" data-testid="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
