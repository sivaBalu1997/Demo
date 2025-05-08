import React, { useState } from "react";
import Select, { components } from 'react-select';
// import { FixedSizeList as List } from "react-window";
// Import your custom icon (for example, an SVG as a React component)
import { ReactComponent as CustomIcon } from '../../../assets/svg/search.svg';
import { ReactComponent as NoResultsFoundStampIcon } from "../../../assets/svg/r-sad-no-results-found-stamp.svg";
import CustomerDropdownShimmer from "components/Shimmer/CustomerDropdownShimmer";
import NoOptionsFound from "components/reportComponents/NoOptionsFound";
import './style.scss';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <CustomIcon style={{ width: 16, height: 16 }} />
    </components.DropdownIndicator>
  );
};

const ReusableDropdown = ({
  options = [],
  // value = null,
  onChange = () => { },
  placeholder = '',
  isSearchable = true,
  dropdownContainerClassName = '',
  dropdownClassName = '',
  dropdownPrefix = '',
  showSearchIcon = false,
  onInputChange = () => { },
  isLoading = false,
  LoadingIndicator = () => null,
  loadingMessage = "Loading...",
  onLoadMore=()=>{},
  onLoadPrev=()=>{},
  searchValue="",
  noOptionsComponent = () => null,
  noOptionsMessage = '',
  ...props
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  // const MenuList=({ options, children, maxHeight, getValue })=>{
  //   const [value] = getValue();
  //   const height =35
  //   const initialOffset = options.indexOf(value) * height;
  //   return(
  //     <List
  //     height={maxHeight}
  //     itemCount={children.length}
  //     itemSize={height}
  //     initialScrollOffset={initialOffset}
  //   >
  //     {({ index, style }) => <div style={style}>{children[index]}</div>}
  //   </List>
  //   )
  // }

  const handleInputChange = (inputValue, { action }) => {     
    if (
      action === "menu-close" ||
      action === "input-blur" ||
      action === "set-value"
    ) {
      return;
    } else {
      const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9\s-'"()]/g, '')
      onInputChange(sanitizedValue);
      setInputValue(sanitizedValue);
    }  
  };
  const handleChange = (selectedOption) => {     
    onChange(selectedOption);
    const sanitizedValue = selectedOption?.value?.replace(/[^a-zA-Z0-9\s-'"()]/g, '');
    setValue(selectedOption);
    setInputValue("");
  };

  return (
    <div className={dropdownContainerClassName}>
      <Select
        options={options}
        value={value}
        inputValue={inputValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder={placeholder}
        isSearchable={isSearchable}
        className={dropdownClassName}
        classNamePrefix={`${menuIsOpen ? "menu-open " : ""} ${dropdownPrefix}`}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={(e) => {             
          setMenuIsOpen(false)
        }}
        // components={{ MenuList }}
        components={{
          ...(showSearchIcon ? {
            DropdownIndicator,
            LoadingIndicator: () => null,
            LoadingMessage: () => <CustomerDropdownShimmer />,
          }:{}),
          ...(searchValue ? {
            NoOptionsMessage: () => (
              <NoOptionsFound
                noDataFoundIcon={<NoResultsFoundStampIcon />}
                noDataFoundMesssage={noOptionsMessage}
                noOptionsFoundContainerClassName="no-options-found-container"
              />
            ),
          }:{}),
        }}
        noOptionsMessage={() => searchValue ? "No Option" : null} 
        isLoading={isLoading}
        loadingMessage={() => loadingMessage}
        // onMenuScrollToTop={onLoadPrev}
        // onMenuScrollToBottom={onLoadMore}
        {...props}
      />
    </div>
  );
};
export default ReusableDropdown;