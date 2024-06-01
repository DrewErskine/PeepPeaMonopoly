import React from 'react';
import './Model.css';

const Model = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="model-backdrop">
      <div className="model-content">
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Model;
