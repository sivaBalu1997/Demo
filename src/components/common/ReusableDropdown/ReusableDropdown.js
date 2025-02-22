import React, { useState } from "react";
import Select from "react-select";

const ReusableDropdown = ({
  options = [],
  value = null,
  onChange,
  placeholder,
  isSearchable = true,
  dropdownContainerClassName,
  dropdownClassName,
  dropdownPrefix,
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
        classNamePrefix={`${menuIsOpen?"menu-open ":""} ${dropdownPrefix}`}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        {...props}
      />
    </div>
  );
};
export default ReusableDropdown;