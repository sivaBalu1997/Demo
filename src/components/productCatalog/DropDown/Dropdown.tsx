import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FocusEvent,
} from "react";
import "./Dropdown.scss";
import UpArrow from "../../../assets/images/dropdown.png";

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
  width: string;
  index?:number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // New onChange prop
}


const Dropdown: React.FC<DropdownProps> = ({
  selectedValues = [],
  onSelect,
  options = [],
  label,
  validation,
  width,
  onBlur,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rotateImg, setRotateImg] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
          setRotateImg(false);
          // If the dropdown closes and no option is selected, run validation
          // if (selectedValues.length === 0) {
          //   validateDropdown(selectedValues);
          // }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, selectedValues]);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
    setRotateImg(!rotateImg);
    setTouched(true);
  };

    const handleOptionClick = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
    
      // Ensure selectedValues is an array
      const newSelectedValues = Array.isArray(selectedValues)
        ? selectedValues.includes(value)
          ? selectedValues.filter((item) => item !== value)
          : [...selectedValues, value]
        : [value]; // Initialize with the first selected value if not an array
    
      onSelect(newSelectedValues);
    };
    const validateDropdown = (value: string[] | undefined, fieldName: string) => {
      if (Array.isArray(value) && value.length > 0) {
        // Proceed with your validation logic
      } else {
        // Handle the case where the array is undefined or empty
        console.log(`${fieldName} is either empty or not an array`);
      }
    };

  return (
    <div className="dropdown-containerPricing" ref={dropdownRef}>
      <label className="droplabelPricing">{label}</label>
      <div
        className={
          !validation?.isValid ? "dropdownPricingred" : "dropdownPricingList"
        }
        style={{ width: "Drop1" ? "300px" : "100px" }}
        onClick={handleDropdownClick}
        tabIndex={0}
      >
        {/* {selectedValues.length > 0 ? (
          <div className="valuePricing">
            {selectedValues.slice(0, 3).join(", ")}
          </div>
        ) : (
          <div className="valuePlaceholder"></div>
        )} */}
        <div>
          <img
            src={UpArrow}
            className={rotateImg ? "arrowrotatePricing" : "arrowdropPricing"}
            alt="arrow"
          />
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
        <p style={{ color: "red", fontSize: "0.75rem", fontWeight: "500" }}>
          {validation?.errorMessage}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
