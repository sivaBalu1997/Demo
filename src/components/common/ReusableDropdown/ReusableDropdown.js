import React, { useState } from "react";
import Select, { components } from 'react-select';
// import { FixedSizeList as List } from "react-window";
// Import your custom icon (for example, an SVG as a React component)
import { ReactComponent as CustomIcon } from '../../../assets/svg/search.svg';

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <CustomIcon style={{ width: 16, height: 16 }} />
    </components.DropdownIndicator>
  );
};

const ReusableDropdown = ({
  options = [],
  value = null,
  onChange = () => {},
  placeholder = '',
  isSearchable = true,  
  dropdownContainerClassName = '',
  dropdownClassName = '',
  dropdownPrefix = '',
  showSearchIcon=false,
  onInputChange=()=>{},
  isLoading=false,
  LoadingIndicator=() => null,
  loadingMessage="Loading...",
  onLoadMore,
  onLoadPrev,
  ...props
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
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
        // components={{ MenuList }}
        components={showSearchIcon?{ DropdownIndicator, LoadingIndicator: LoadingIndicator, }:null}
        onInputChange={onInputChange}
    isLoading={isLoading}
    loadingMessage={() => loadingMessage}
    onMenuScrollToTop={onLoadPrev}
    onMenuScrollToBottom={onLoadMore}

        {...props}
      />
    </div>
  );
};
export default ReusableDropdown;