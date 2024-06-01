// src/components/home/Home.js
import React from 'react';
import { useAuth } from '../../AuthContext';
import './Home.css';

const Home = () => {
  const { username, authToken } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to Peep Monopoly Cash Cards</h1>
      <p>This is the home page of the application.</p>
      <div className="user-info">
        <h2>User Information</h2>
        {username ? (
          <>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Token:</strong> {authToken}</p>
          </>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
      <div className="links">
        <a href="/cashcards" className="link-button">View Cash Cards</a>
      </div>
    </div>
  );
};

export default Home;
