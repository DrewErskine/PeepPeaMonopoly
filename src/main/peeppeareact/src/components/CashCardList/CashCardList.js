import React from 'react';
import './CashCardList.css';

const CashCardList = ({ cards }) => {
  return (
    <div className="card-list">
      {cards.map(card => (
        <div key={card.id}>
          {card.holderName} - ${card.balance.toFixed(2)}
        </div>
      ))}
    </div>
  );
};

export default CashCardList;
