import React from 'react';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom';
import './Home.css'; // Make sure you have appropriate styles

const Home = () => {
  const { authToken } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of the application.</p>
      <p>Your token is: {authToken}</p>

      <div className="card-container">
        <Link to="/cashcards" className="card-link">
          <div className="card">
            <h2>View Cash Cards</h2>
            <p>Click here to view your cash cards.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
