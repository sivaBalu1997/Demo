import React, { useState, useRef, useEffect, ChangeEvent } from "react";
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
  isopened?: React.Dispatch<React.SetStateAction<boolean>>;
  width: string;
  index?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleValidate?: () => void;
  placeHolder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedValues = [],
  onSelect,
  options = [],
  label,
  validation,
  width,
  onBlur,
  handleValidate,
  placeHolder,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rotateImg, setRotateImg] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
          setRotateImg(false);
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
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    console.log({ newSelectedValues });
    onSelect(newSelectedValues);
  };

  const validateDropdown = (values: string[]) => {
    if (values.length === 0 && touched) {
      onBlur && onBlur();
    }
  };

  return (
    <div className="dropdown-containerPricing" ref={dropdownRef}>
      <label className="droplabelPricing">{label}</label>
      <div
        className="dropdownPricingList"
        style={{ width: width === "Drop1" ? "300px" : "100px" }}
        onClick={handleDropdownClick}
        tabIndex={0}
      >
        {Array.isArray(selectedValues) && selectedValues.length > 0 ? (
          <div className="valuePricing">
            {selectedValues.slice(0, 3).join(", ")}
          </div>
        ) : (
          <div className="valuePlaceholder">
            {placeHolder === "Third Party" ? "Third Party" : ""}
          </div>
        )}
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
            <div className="No-Option-Availble-dropdown">
              No options available
            </div>
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
