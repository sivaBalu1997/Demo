import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css'; // Assuming you have a CSS file for styling

const Modal = ({ isOpen, message, onConfirm, onCancel, type, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modalContainer">
        <p>{message}</p>
        <div className="modalBtn">
          {type === 'confirmation' && (
            <>
              <button className="yesBtn" onClick={onConfirm} disabled={isLoading}>
                {isLoading ? <div className="loader"></div> : 'Yes'}
              </button>
              <button className="noBtn" onClick={onCancel} disabled={isLoading}>
                No
              </button>
            </>
          )}
          {type === 'alert' && (
            <button className="yesBtn" onClick={onCancel}>OK</button>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  type: PropTypes.oneOf(['confirmation', 'alert']).isRequired,
  isLoading: PropTypes.bool,
};

Modal.defaultProps = {
  onCancel: null,
  isLoading: false,
};

export default Modal;
