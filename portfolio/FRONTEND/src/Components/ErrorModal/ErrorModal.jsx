import React from 'react';
import './ErrorModal.css'; // Optional for additional styling

const ErrorModal = ({ show, onClose, message , isError }) => {
  if (!show) {
    return null;
  }
  const responseStyle = {
    backgroundColor:"hsl(133, 83%, 54%)"
  }
  return (
    <>
    <div className="error-modal-overlay" onClick={onClose}></div>
    <div className="error-modal">
      <div className="error-modal-header" style={!isError ? responseStyle : {}}>{isError ? "ERROR" : "Response"}</div>
      <div className="error-modal-body">
        <p>{message}</p>
      </div>
      <div className="error-modal-footer">
        <button className="error-modal-close" style={!isError ? responseStyle : {}} onClick={onClose} autoFocus={true}>
          Close
        </button>
      </div>
    </div>
  </>
  );
};

export default ErrorModal;
