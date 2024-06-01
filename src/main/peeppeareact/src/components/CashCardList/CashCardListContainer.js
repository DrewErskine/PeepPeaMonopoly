// src/components/CashCardList/CashCardListContainer.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CashCardList from './CashCardList';
import { useAuth } from '../../AuthContext';

const CashCardListContainer = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchCashCards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cashcards', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setCards(response.data);
      } catch (err) {
        setError('Failed to fetch cash cards');
      }
    };

    if (authToken) {
      fetchCashCards();
    }
  }, [authToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <CashCardList cards={cards} />;
};

export default CashCardListContainer;
