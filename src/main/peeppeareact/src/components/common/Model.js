// src/components/common/Model.js
import React from 'react';
import './Model.css';

const Model = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="model-overlay">
      <div className="model">
        <button className="close-button" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Model;
