// C:\Users\Dmers\Code\Spring\PeepMonopoly\src\main\peeppeareact\src\components\common\Header.js
import React, { useState } from 'react';
import Model from './Model';
import LoginForm from './LoginForm';
import { useAuth } from '../../AuthContext';
import './common.css';

const Header = () => {
    const [showModel, setShowModel] = useState(false);
    const { isAuthenticated, login, logout } = useAuth();

    const handleLoginClick = () => {
        setShowModel(true);
    };

    const handleCloseModel = () => {
        setShowModel(false);
    };

    const handleLoginSubmit = async (credentials) => {
        console.log('Login submitted:', credentials);
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include', // Add this to include credentials in the request
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login response:', data);
            login(); // Update authentication state
            localStorage.setItem('authToken', data.token); // Store token if applicable
            setShowModel(false);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleLogout = () => {
        logout(); // Update authentication state
        localStorage.removeItem('authToken'); // Remove token if applicable
    };

    return (
        <header className="app-header">
            <div className="header-content">
                <h1>Peep Monopoly Cash Cards</h1>
                {isAuthenticated ? (
                    <button className="account-button" onClick={handleLogout}>Account</button>
                ) : (
                    <button className="login-button" onClick={handleLoginClick}>Login</button>
                )}
            </div>
            <Model show={showModel} onClose={handleCloseModel}>
                <LoginForm onSubmit={handleLoginSubmit} />
            </Model>
        </header>
    );
};

export default Header;
