import React, { useState, useEffect } from 'react';
import Login from './components/Login'; 
import Chat from './components/Chat'; 
import axios from 'axios';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || ''); // State to hold the authentication token
    const [user, setUser] = useState(null); // State to hold the user information

    useEffect(() => {
        if (token) {
            const fetchUser = async () => {
                try {
                    const res = await axios.get('http://localhost:5001/api/auth/me', {
                        headers: { Authorization: token }, // Include token in headers
                    });
                    setUser(res.data); // Update user state with fetched user info
                } catch (err) {
                    console.error('Error fetching user:', err); // Log error if fetching fails
                    setToken(''); // Reset token if error occurs
                    localStorage.removeItem('token'); // Remove token from local storage
                    setUser(null); // Reset user to null
                }
            };
            fetchUser();
        }
    }, [token]);

    // Function to handle setting the token
    const setTokenHandler = (token) => {
        localStorage.setItem('token', token); // Store token in local storage
        setToken(token); // Update token state
    };

    return (
        <div className="App">
            <ErrorBoundary>
                {!token ? <Login setToken={setTokenHandler} /> : <Chat token={token} user={user} />}
            </ErrorBoundary>
        </div>
    );
}

export default App;
