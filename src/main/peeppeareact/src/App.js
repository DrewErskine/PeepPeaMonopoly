// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header'; 
import Footer from './components/common/Footer'; 
import CashCardListContainer from './components/CashCardList/CashCardListContainer';
import CashCardDetailContainer from './components/CashCardDetail/CashCardDetailContainer';
import CashCardFormContainer from './components/CashCardForm/CashCardFormContainer';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/cashcards/new" element={<CashCardFormContainer />} />
            <Route path="/cashcards/:id" element={<CashCardDetailContainer />} />
            <Route path="/cashcards" element={<CashCardListContainer />} />
            <Route path="/" exact element={<CashCardListContainer />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
