import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CashCardList from './components/CashCardList/CashCardList';
import CashCardDetail from './components/CashCardDetail/CashCardDetail';
import CashCardForm from './components/CashCardForm/CashCardForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/cashcards/new" element={<CashCardForm />} />
          <Route path="/cashcards/:id" element={<CashCardDetail />} />
          <Route path="/cashcards" element={<CashCardList />} />
          <Route path="/" exact element={<CashCardList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
