// client/src/components/Modal.js
import React from 'react';


const CustomModal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
