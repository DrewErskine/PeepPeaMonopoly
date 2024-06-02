// src/components/CashCardList/CashCardListContainer.js
import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient'; // Ensure the correct import path
import CashCardList from './CashCardList'; // Import the CashCardList component
import './CashCardList.css'; // Import the shared CSS

const CashCardListContainer = () => {
  const [cashCards, setCashCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCashCards = async () => {
      try {
        const response = await apiClient.get('/cashcards');
        setCashCards(response.data);
      } catch (err) {
        setError('Failed to fetch cash cards. Please ensure you are logged in.');
      }
    };

    fetchCashCards();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Cash Cards</h1>
      <CashCardList cards={cashCards} />
    </div>
  );
};

export default CashCardListContainer;
