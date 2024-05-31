// src/components/CashCardDetailContainer.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import CashCardDetail from './CashCardDetail';

const CashCardDetailContainer = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient.get(`/cashcards/${id}`)
      .then(response => {
        setCard(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching card details: {error.message}</div>;
  }

  return card ? <CashCardDetail card={card} /> : <div>Card not found</div>;
};

export default CashCardDetailContainer;
