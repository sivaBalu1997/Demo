import React, { useEffect, useState, useContext } from 'react';
import './SearchBox.scss';
import searchIcon from '../../../assets/images/searchicon.png';
import NotFound from '../../../assets/svg/NotFound copy.svg';
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { useSelector, useDispatch } from 'react-redux';
import { storeMockDataFilteredRequest } from 'redux/productCatalog/productCatalogActions';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState(''); // User input only
  const [displayTerm, setDisplayTerm] = useState(''); // User input + suggestion for display
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [optionSelected, setOptionSelected] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [filteredOptionsDispatch, setFilteredOptionsDispatch] = useState([]);
  const [orgData, setOrgData] = useState([]);

  const data = useSelector((state) => state.storeMockDataReducer.data);
  const dispatch = useDispatch();
  const { isExpanded } = useContext(Contextpagejs);

  useEffect(() => {
    const itemNames = menuData?.flatMap(item => item?.itemResponseList)
      .map(item => item?.itemName);

    setOrgData(itemNames); // Set original data when it is available
  }, [data]);

  useEffect(() => {
    dispatch(storeMockDataFilteredRequest(filteredOptionsDispatch));
  }, [filteredOptionsDispatch]);

  const menuData = useSelector((state) => state.productCatalog?.menuData);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterOptions(value);
    setOptionSelected(false);
  };

  const filterOptions = (input) => {
    const itemNames = menuData.flatMap(item => item.itemResponseList)
      .map(item => item.itemName);

    const filtered = itemNames.filter(item => 
      item?.toLowerCase().includes(input?.toLowerCase())
    );

    setFilteredOptions(filtered);
    setFilteredOptionsDispatch(filtered);

    // Auto-fill with the first match if there are filtered options
    if (filtered.length > 0 && input.length > 0) {
      const firstMatch = filtered[0];
      if (firstMatch.toLowerCase().startsWith(input.toLowerCase())) {
        const suggestion = firstMatch.slice(input.length);
        setDisplayTerm(input + suggestion); // Display the suggestion in the input box
        setHighlightedIndex(0);  // Automatically highlight the first option
      } else {
        setDisplayTerm(input); // No match, just show the raw input
      }
    } else {
      setDisplayTerm(input); // No suggestions, just show the raw input
    }
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
   
    setOptionSelected(true);
    setFilteredOptions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => {
        const newIndex = Math.min(filteredOptions.length - 1, prevIndex + 1);
        setSearchTerm(filteredOptions[newIndex]);
        setDisplayTerm(filteredOptions[newIndex]);
        return newIndex;
      });
    }

    if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => {
        const newIndex = Math.max(0, prevIndex - 1);
        setSearchTerm(filteredOptions[newIndex]);
        setDisplayTerm(filteredOptions[newIndex]);
        return newIndex;
      });
    }

    if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        handleOptionClick(filteredOptions[highlightedIndex]);
        setHighlightedIndex(-1);
      }
    }
    
    // Allow user to delete input
    if (e.key === 'Backspace') {
      setOptionSelected(false); // Allow for changing selection
    }
  };

  return (
    <div className="Search-Container">
      <div>
        <input
          className={`${isExpanded ? "Header-Search1" : "Header-Search"}`}
          value={searchTerm}  // Show the display term which includes the suggestion
          placeholder="Search"
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          type="text"
        />
        <img
          className={`${isExpanded ? "SerchIcon-Header1" : "SerchIcon-Header"}`}
          src={searchIcon}
          alt="Search Icon"
        />
      </div>

      <div className={isExpanded ? "Search-Container-options1" : 'Search-Container-options'}>
        {searchTerm && (
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={index === highlightedIndex ? 'highlighted' : ''}
                >
                  <div className={isExpanded ? 'Search-Container-options1-items' : "Search-Container-options-items"}>
                    {option}
                  </div>
                </li>
              ))
            ) : !optionSelected && (
              <div className={isExpanded ? 'Search-Container-options1-none' : 'Search-Container-options-none'}>
                <div className='Search-Container-options-none-flex-direction'>
                  <img className="NotFoundImage" src={NotFound} alt="No Results Found" />
                  <h3 className='heading-none'>No Results Found</h3>
                </div>
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
