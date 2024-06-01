// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CashCardListContainer from './components/CashCardList/CashCardListContainer';
import Login from './components/common/Login';
import Home from './components/home/Home';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/cashcards"
              element={
                <PrivateRoute>
                  <CashCardListContainer />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
