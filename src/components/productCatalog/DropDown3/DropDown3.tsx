import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import './DropDown3.scss';
import UpArrow from "../../../assets/images/dropdown.png";
 
// Define the types for props
interface DropDown3Props {
  selectedValues?: string[];
  onSelect: (values: string[]) => void;
  options?: string[];
  addOption: (option: string) => void;
  label: string;
  index?:number;
  placeholder:string
 
  validation?: {
    isValid: boolean;
    errorMessage?: string;
  };
  onBlur?: () => void;
}
 
const DropDown3: React.FC<DropDown3Props> = ({
  selectedValues = [],
  onSelect,
  options = [],
  addOption,
 
  label,
  validation,
  placeholder,
  onBlur
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [rotateImg, setRotateImg] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
 
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
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    onSelect(newSelectedValues);
  };
 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
 
 
 
  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };
 
  return (
    <div className="dropdown-containerPricing2" ref={dropdownRef}>
      <label className='droplabelPricing2'>{label}</label>
      <div
        className={!validation?.isValid ? "dropdownPricingred2" : "dropdownPricing2"}
        onClick={handleDropdownClick}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {selectedValues.length > 0 ? (
          <div className='valuePricing2'>
            {selectedValues.slice(0, 3).join(', ')}
          </div>
        ) : (
          <div className='valuePlaceholder2'>
            {/* Placeholder or empty state can be handled here */}
          </div>
        )}
        <div>
          <img
            src={UpArrow}
            className={rotateImg ? 'arrowrotatePricing2' : 'arrowdropPricing2'}
            alt="arrow"
          />
        </div>
      </div>
      {isOpen && (
        <div className="optionsPricing2">
          {options.length > 0 ? (
            options.map((option, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name={option}
                  className="checkboxPricing2"
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
      {!validation?.isValid && (
        <p style={{ color: 'red', fontSize: "0.75rem", fontWeight: "500" }}>
          {validation?.errorMessage}
        </p>
      )}
    </div>
  );
};
 
export default DropDown3;