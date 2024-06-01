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
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login response:', data);
      login(data.token);
      setShowModel(false);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken');
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
