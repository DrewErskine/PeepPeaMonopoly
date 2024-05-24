import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header'; 
import Footer from './components/common/Footer'; 
import CashCardList from './components/CashCardList/CashCardList';
import CashCardDetail from './components/CashCardDetail/CashCardDetail';
import CashCardForm from './components/CashCardForm/CashCardForm';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/cashcards/new" element={<CashCardForm />} />
            <Route path="/cashcards/:id" element={<CashCardDetail />} />
            <Route path="/cashcards" element={<CashCardList />} />
            <Route path="/" exact element={<CashCardList />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
