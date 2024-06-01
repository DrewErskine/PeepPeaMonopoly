// C:\Users\Dmers\Code\Spring\PeepMonopoly\src\main\peeppeareact\src\components\common\Login.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { AuthContext } from '../../AuthContext';

const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
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
