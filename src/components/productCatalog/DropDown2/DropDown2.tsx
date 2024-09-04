import React, { useState, useRef, useEffect } from 'react';
import './DropDown2.scss';
import UpArrow from "../../../assets/images/dropdown.png";

// Define type for the `addOption` function
type AddOptionFunction = (option: string) => void;

// Define type for the `onSelect` function
type OnSelectFunction = (selectedValues: string[]) => void;

// Define the props type for Dropdown component
interface DropdownProps {
  selectedValues?: string[];
  onSelect: OnSelectFunction;
  options?: string[];
  label: string;
  index?:number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // New onChange prop
}


// Dropdown component with TypeScript
const Dropdown: React.FC<DropdownProps> = ({
  selectedValues = [],
  onSelect,
  options = [],
  label,
  index,
  onChange // New onChange prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showTextBox, setShowTextBox] = useState(false);
  const [rotateimg, setRotateImg] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setRotateImg(false);
      }
    };

    // Add event listener on mount
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
    setRotateImg(!rotateimg);
  };

  const handleOptionClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    onSelect(newSelectedValues);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  

  const toggleTextBox = () => {
    setShowTextBox(!showTextBox);
  };

  return (
    <div className="dropdown-containerPricing1" ref={dropdownRef}>
      <label className='droplabelPricing1'>{label}</label>
      <div className="dropdownPricing1" onClick={handleDropdownClick}>
        {selectedValues.length > 0 ? (
          <div className='valuePricing1'>
            {selectedValues.slice(0, 3).join(', ')}
          </div>
        ) : (
          <div></div>
        )}
        <div>
          <img src={UpArrow} className={rotateimg ? 'arrowrotatePricing1' : 'arrowdropPricing1'} alt="Dropdown arrow" />
        </div>
      </div>
      {isOpen && (
        <div className="optionsPricing1">
          {options.length > 0 ? (
            options.map((option, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name={option}
                  className="checkboxPricing"
                  value={option}
                  checked={selectedValues.includes(option)}
                  onChange={handleOptionClick}
                />
                {option}
              </label>
            ))
          ) : (
            <div>No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
