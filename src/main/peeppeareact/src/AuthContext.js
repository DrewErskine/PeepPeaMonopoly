import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    console.log('Token set:', token); // Logging the token
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    console.log('Token removed'); // Logging token removal
  };

  useEffect(() => {
    console.log('Current token:', authToken); // Logging current token
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated: !!authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
