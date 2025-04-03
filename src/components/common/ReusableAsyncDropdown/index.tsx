import React, { useState } from "react";
import Select, { components } from 'react-select';
// import { FixedSizeList as List } from "react-window";
// Import your custom icon (for example, an SVG as a React component)
import { ReactComponent as CustomIcon } from '../../../assets/svg/search.svg';

const DropdownIndicator = (props:any) => {
  return (
    <components.DropdownIndicator {...props}>
      <CustomIcon style={{ width: 16, height: 16 }} />
    </components.DropdownIndicator>
  );
};

interface ReusableDropdownProps {
  options?: Array<{ label: string; value: any }>;
  value?: { label: string; value: any } | { label: string; value: any }[] | null;
  onChange?: (selectedOption: any) => void;
  placeholder?: string;
  isSearchable?: boolean;
  dropdownContainerClassName?: string;
  dropdownClassName?: string;
  dropdownPrefix?: string;
  showSearchIcon?: boolean;
  onInputChange?: (inputValue: string) => void;
  isLoading?: boolean;
  LoadingIndicator?: () => JSX.Element;
  loadingMessage?: string;
  [key: string]: any; // To allow additional props
}

const ReusableDropdown: React.FC<ReusableDropdownProps> = ({
  options = [],
  value = null,
  onChange = () => {},
  placeholder = '',
  isSearchable = true,  
  dropdownContainerClassName = '',
  dropdownClassName = '',
  dropdownPrefix = '',
  showSearchIcon = false,
  onInputChange = () => {},
  isLoading = false,
  LoadingIndicator = () => null,
  loadingMessage = "Loading...",
  ...props
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div className={dropdownContainerClassName}>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isSearchable={isSearchable}
        className={dropdownClassName}
        classNamePrefix={`${menuIsOpen ? "menu-open " : ""} ${dropdownPrefix}`}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        components={showSearchIcon ? { DropdownIndicator, LoadingIndicator: LoadingIndicator } : {}}
        onInputChange={onInputChange}
        isLoading={isLoading}
        loadingMessage={() => loadingMessage}
        {...props}
      />
    </div>
  );
};
export default ReusableDropdown;