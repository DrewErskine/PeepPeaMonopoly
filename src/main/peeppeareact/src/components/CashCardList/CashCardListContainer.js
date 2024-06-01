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
        console.log('Using token:', authToken); // Logging token before making request
        const response = await axios.get('http://localhost:8080/cashcards', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        console.log('API response:', response.data);
        setCards(response.data);
      } catch (err) {
        console.error('Error fetching cash cards:', err);
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
