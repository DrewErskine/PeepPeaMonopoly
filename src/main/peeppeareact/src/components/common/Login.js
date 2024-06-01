// src/components/common/Login.js
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAuth } from '../../AuthContext';

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

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
      login(data.token, data.username);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
    }
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
