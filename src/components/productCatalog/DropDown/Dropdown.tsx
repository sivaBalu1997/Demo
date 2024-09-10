import React, { useState, useRef, useEffect, ChangeEvent, FocusEvent } from 'react';
import './Dropdown.scss';
import UpArrow from "../../../assets/images/dropdown.png";

// Define types for props
interface DropdownProps {
  selectedValues?: string[];
  onSelect: (values: string[]) => void;
  options?: string[];
  label: string;
  validation?: {
    isValid: boolean;
    errorMessage?: string;
  };
  onBlur?: () => void;
  width:string
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedValues = [],
  onSelect,
  options = [],
  label,
  validation,
  width,
  onBlur
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rotateImg, setRotateImg] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      // Type guard to ensure event is a MouseEvent
      if (event instanceof MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setRotateImg(false);
          
        }
      }
    };
  
    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);
  
    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
    setRotateImg(!rotateImg);
  };

  const handleOptionClick = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value) // Unselect if already selected
      : [...selectedValues, value]; // Add to selected values

    onSelect(newSelectedValues); // Update parent state
  };

  return (
    <div className="dropdown-containerPricing" ref={dropdownRef}>
      <label className='droplabelPricing'>{label}</label>
      <div 
        className={!validation?.isValid ? "dropdownPricingred" : "dropdownPricingList"} 
        style={{width:"Drop1"?"300px":"200px"}}
        onClick={handleDropdownClick} 
        tabIndex={0}
      >
        {selectedValues.length > 0 ? (
          <div className='valuePricing'>
            {selectedValues.slice(0, 3).join(', ')}
          </div>
        ) : (
          <div className='valuePlaceholder'>
            {/* Placeholder or empty state can be handled here */}
          </div>
        )}
        <div>
          <img src={UpArrow} className={rotateImg ? 'arrowrotatePricing' : 'arrowdropPricing'} alt="arrow" />
        </div>
      </div>
      {isOpen && (
        <div className="optionsPricing">
          {options.length > 0 ? (
            options.map((option, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name={option}
                  className="checkboxPricing"
                  value={option}
                  checked={selectedValues.includes(option)} // Ensure correct checked state
                  onChange={handleOptionClick} // Handle selecting the option
                />
                {option}
              </label>
            ))
          ) : (
            <div>No options available</div>
          )}
        </div>
      )}
      {!validation?.isValid && (
        <p style={{ color: 'red', fontSize: "0.75rem", fontWeight: "500" }}>
          {validation?.errorMessage}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
