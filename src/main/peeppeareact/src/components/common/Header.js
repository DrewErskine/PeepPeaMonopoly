// src/components/common/Header.js
import React, { useState } from 'react';
import Model from './Model';
import LoginForm from './LoginForm';
import './common.css';

const Header = () => {
  const [showModel, setShowModel] = useState(false);

  const handleLoginClick = () => {
    setShowModel(true);
  };

  const handleCloseModel = () => {
    setShowModel(false);
  };

  const handleLoginSubmit = (credentials) => {
    console.log('Login submitted:', credentials);
    // Perform login action here
    setShowModel(false);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Peep Monopoly Cash Cards</h1>
        <button className="login-button" onClick={handleLoginClick}>Login</button>
      </div>
      <Model show={showModel} onClose={handleCloseModel}>
        <LoginForm onSubmit={handleLoginSubmit} />
      </Model>
    </header>
  );
};

export default Header;
