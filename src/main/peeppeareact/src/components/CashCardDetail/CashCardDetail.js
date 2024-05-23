import React from 'react';
import './CashCardDetail.css';

const CashCardDetail = ({ card }) => {
  return (
    <div className="card-detail">
      <h2>Card Details</h2>
      <p>Holder: {card.holderName}</p>
      <p>ID: {card.id}</p>
      <p>Balance: ${card.balance.toFixed(2)}</p>
    </div>
  );
};

export default CashCardDetail;
