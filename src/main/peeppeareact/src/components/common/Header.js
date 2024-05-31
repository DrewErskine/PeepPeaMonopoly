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

  const handleLoginSubmit = (credentials) => {
    console.log('Login submitted:', credentials);
    // Perform login action here, for example, send credentials to your backend for authentication
    login(); // Update authentication state
    setShowModel(false);
  };

  const handleLogout = () => {
    logout(); // Update authentication state
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
