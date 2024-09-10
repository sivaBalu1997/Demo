import React, { useEffect } from 'react'
import './SearchBox.scss'
import { useState, useContext } from 'react'
import searchIcon from '../../../assets/images/searchicon.png'
import NotFound from '../../../assets/svg/NotFound copy.svg'
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { useSelector } from 'react-redux'

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [optionSelected, setOptionSelected] = useState(false);
  const { isExpanded } = useContext(Contextpagejs);
  const data = useSelector((state) => state.storeMockDataReducer.data);

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Only update items if data is not undefined
    if (data && data.length) {
      setItems(data.map((elem) => elem.name));
    }
  }, [data]); // Add data as a dependency

  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterOptions(value);
    setOptionSelected(false);
  }

  const filterOptions = (input) => {
    const filtered = items.filter(option =>
      option.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setFilteredOptions([]);
    setOptionSelected(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => {
        const newIndex = Math.min(filteredOptions.length - 1, prevIndex + 1);
        setSearchTerm(filteredOptions[newIndex] || "");
        return newIndex;
      });
    }

    if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => {
        const newIndex = Math.max(0, prevIndex - 1);
        setSearchTerm(filteredOptions[newIndex] || "");
        return newIndex;
      });
    }

    if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        handleOptionClick(filteredOptions[highlightedIndex]);
        setHighlightedIndex(-1);
      }
    }

    if (e.key === 'Backspace') {
      setHighlightedIndex(-1);
      const newValue = searchTerm.slice(0, -1);
      setSearchTerm(newValue);
      filterOptions(newValue);
    }
  };

  return (
    <div className="Search-Container">
      <div>
        <input
          className={`${isExpanded ? "Header-Search1" : "Header-Search"}`}
          value={searchTerm}
          placeholder='Search'
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          type="text"
        />
        <img
          className={`${isExpanded ? "SerchIcon-Header1" : "SerchIcon-Header"}`}
          src={searchIcon}
          alt=""
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
                  <img className="NotFoundImage" src={NotFound} alt="" />
                  <h3 className='heading-none'>No Results Found</h3>
                </div>
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SearchBox;
