// src/components/common/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Attempting to log in with', { username, password });

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    setIsLoading(true);
    try {
      const response = await apiClient.post('/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Login response:', response.data);
      const { token, username } = response.data;
      localStorage.setItem('authToken', token); // Store the token in localStorage
      login(token, username);
      setError('');
      if (onSubmit) onSubmit(token);
      navigate('/home'); // Redirect to /home after successful login
    } catch (err) {
      console.error('Login error:', err.response);
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
