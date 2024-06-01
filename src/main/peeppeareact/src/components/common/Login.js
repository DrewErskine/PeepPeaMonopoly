import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAuth } from '../../AuthContext'; // Correct import

const Login = () => {
  const { isAuthenticated, login } = useAuth(); // Correct usage
  const navigate = useNavigate();

  const handleLoginSubmit = (token) => {
    login(token); // Update authentication state and store token
    navigate('/cashcards'); // Redirect to a protected route after login
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>You are already logged in</p>
      ) : (
        <LoginForm onSubmit={handleLoginSubmit} />
      )}
    </div>
  );
};

export default Login;
