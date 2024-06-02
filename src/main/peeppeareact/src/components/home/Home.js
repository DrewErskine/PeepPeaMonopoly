// src/components/home/Home.js
import React from 'react';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom'; 
import './Home.css';

const Home = () => {
  const { authUser, authToken } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to Peep Monopoly Cash Cards</h1>
      <p>This is the home page of the application.</p>
      <div className="user-info">
        <h2>User Information</h2>
        {authUser ? (
          <>
            <p><strong>Username:</strong> {authUser}</p>
            <p><strong>Token:</strong> {authToken}</p>
          </>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
      <div className="links">
        <Link to="/cashcards" className="link-button">View Cash Cards</Link>
      </div>
    </div>
  );
};

export default Home;
