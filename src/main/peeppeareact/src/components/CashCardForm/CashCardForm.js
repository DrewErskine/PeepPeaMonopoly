import React, { useState } from 'react';
import './CashCardForm.css';

const CashCardForm = ({ onSubmit }) => {
  const [holderName, setHolderName] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ holderName, balance: parseFloat(balance) });
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <label>
        Holder Name:
        <input type="text" value={holderName} onChange={e => setHolderName(e.target.value)} />
      </label>
      <label>
        Balance:
        <input type="number" value={balance} onChange={e => setBalance(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CashCardForm;
