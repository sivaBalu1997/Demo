import React from 'react';
import './RadioButton.scss';

interface RadioButtonOption {
  value: string;
  label: string;
}

interface RadioButtonGroupProps {
  options: RadioButtonOption[];
  selectedValue?: string;
  name: string;
  onChange: (value: string) => void;
  register: any;
}

const RadioButton: React.FC<RadioButtonGroupProps> = ({ options, selectedValue, name, onChange, register }) => {

  
  
  return (
    <div className="radio-button-group">
      {options.map((option) => (
        <label key={option.value} className="radio-button">
          <div className="radio-button-input-and-label" style={{color: "#000000" }}>
            <input
              type="radio"
              {...register(name)}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)} 
              className="radio-button-input"
            />
            {option.label}
          </div>
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
