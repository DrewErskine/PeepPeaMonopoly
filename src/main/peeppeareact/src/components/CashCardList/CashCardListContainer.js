// src/components/CashCardListContainer.js
import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient.js';
import CashCardList from './CashCardList';

const CashCardListContainer = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient.get('/cashcards')
      .then(response => {
        setCards(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching cards: {error.message}</div>;
  }

  return <CashCardList cards={cards} />;
};

export default CashCardListContainer;
