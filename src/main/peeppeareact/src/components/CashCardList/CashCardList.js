import React from 'react';
import './CashCardList.css';

const CashCardList = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return <div className="no-cards">No cards available</div>;
  }

  return (
    <div className="card-list">
      {cards.map(card => (
        <div key={card.id}>
          <h3>{card.holderName}</h3>
          <p>ID: {card.id}</p>
          <p>Balance: ${card.balance ? card.balance.toFixed(2) : 'N/A'}</p>
        </div>
      ))}
    </div>
  );
};

export default CashCardList;
