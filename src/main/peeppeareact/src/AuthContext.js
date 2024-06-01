// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setAuthToken(token);
      setUsername(storedUsername);
    }
  }, []);

  const login = (token, username) => {
    setAuthToken(token);
    setUsername(username);
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setAuthToken(null);
    setUsername(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ authToken, username, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
