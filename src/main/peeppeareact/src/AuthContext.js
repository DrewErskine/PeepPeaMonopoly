// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [authUser, setAuthUser] = useState(localStorage.getItem('authUser'));
  const navigate = useNavigate();

  const login = (token, username) => {
    setAuthToken(token);
    setAuthUser(username);
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', username);
    navigate('/home');
  };

  const logout = () => {
    setAuthToken(null);
    setAuthUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    navigate('/login');
  };

  const isAuthenticated = !!authToken; // Convert to boolean

  return (
    <AuthContext.Provider value={{ authToken, authUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
