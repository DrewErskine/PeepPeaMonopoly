// src/components/CashCardFormContainer.js
import React from 'react';
import apiClient from '../../api/apiClient';
import CashCardForm from './CashCardForm';

const CashCardFormContainer = () => {
  const handleSubmit = (card) => {
    apiClient.post('/cashcards', card)
      .then(response => {
        console.log('Card created:', response.data);
        // Redirect or update UI as needed
      })
      .catch(error => {
        console.error('Error creating card:', error);
      });
  };

  return <CashCardForm onSubmit={handleSubmit} />;
};

export default CashCardFormContainer;
