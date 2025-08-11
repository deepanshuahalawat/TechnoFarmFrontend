import React, { useState } from 'react';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';
import api from '/src/API'; // Make sure you have a suitable API utility
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page refresh

        try {
            const response = await axios.post('https://technofarm.in/api/authenticate', {
                username,
                password,
            });

            const token = response.data.value;
            // Save the token to local storage (or cookie) for future requests

            localStorage.setItem('token', token);
            handleUserdata(username);
         
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    const handleUserdata = async (employeeUserName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get(`/api/employee/username/${employeeUserName}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            window.location.href = '/';
        } catch (error) {
            console.error('Error fetching employee detail:', error);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
