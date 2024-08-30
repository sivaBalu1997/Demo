import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

type PropType = 'deleteEmp' | 'Block' | 'Unblock' | 'clear' | 'other';

interface ModalProps {
  isOpen: boolean;
  message: any;
  onConfirm: () => void;
  onCancel?: () => void;
  type: 'confirmation' | 'alert';
  isLoading?: boolean;
  logo?: string;
  propType?: PropType;
}

// Custom validator for `type` prop
const typePropType = (props: any, propName: string, componentName: string) => {
  const validTypes = ['confirmation', 'alert'];
  if (!validTypes.includes(props[propName])) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected one of ${validTypes.join(', ')}.`);
  }
  return null;
};

// Custom validator for `propType`
const propTypePropType = (props: any, propName: string, componentName: string) => {
  const validPropTypes = ['deleteEmp', 'Block', 'Unblock', 'clear', 'other'];
  return null;
};

const Modal: React.FC<ModalProps> = ({ isOpen, message, onConfirm, onCancel, type, isLoading, logo, propType }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modalContainerAz">
        {logo && <img src={logo} alt='icon' />}
        <p>{message}</p>
        <div className="modalBtn">
          {type === 'confirmation' && (
            <>
              <button className="yesBtn" onClick={onConfirm} disabled={isLoading}>
                {isLoading ? <div className="loader"></div> : 
                  propType === 'deleteEmp' ? 'Delete' : 
                  propType === 'Block' ? 'Block' : 
                  propType === 'Unblock' ? 'Unblock' : 
                  propType === 'clear' ? 'Clear All' : 
                  'Yes'
                }
              </button>
              <button className="noBtn" onClick={onCancel} disabled={isLoading}>
                Cancel
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
  type: typePropType, 
  isLoading: PropTypes.bool,
  logo: PropTypes.string,
  propType: propTypePropType 
};

Modal.defaultProps = {
  onCancel: undefined,
  isLoading: false,
  logo: undefined,
  propType: undefined
};

export default Modal;
