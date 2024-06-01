// src/components/CashCardList/CashCardList.js
import React from 'react';
import PropTypes from 'prop-types';
import './CashCardList.css';

const CashCardList = ({ cards }) => {
  if (cards.length === 0) {
    return <div className="no-cards">No cards available</div>;
  }

  return (
    <div className="card-list">
      {cards.map(card => (
        <div key={card.id} className="card">
          <h2>Card ID: {card.id}</h2>
          <p>Amount: ${card.amount}</p>
          <p>Owner: {card.owner}</p>
        </div>
      ))}
    </div>
  );
};

CashCardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      owner: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CashCardList;
