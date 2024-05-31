import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext'; // Import AuthProvider

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
