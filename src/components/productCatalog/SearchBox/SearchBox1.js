import React, { useEffect } from 'react'
import './SearchBox.scss'
import { useState, useContext } from 'react'
import searchIcon from '../../../assets/images/searchicon.png'
import NotFound from '../../../assets/svg/NotFound copy.svg'
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { storeMockDataFilteredRequest } from 'redux/productCatalog/productCatalogActions'

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [optionSelected, setOptionSelected] = useState(false);
  const { isExpanded } = useContext(Contextpagejs);
  const data = useSelector((state) => state.storeMockDataReducer.data);

  const [filteredOptions, setFilteredOptions] = useState([]);
  const [filteredOptionsDispatch, setFilteredOptionsDispatch] = useState([]);
  const dispatch=useDispatch();

  

  useEffect(() => {
    if (data && data.length) {
      setFilteredOptions(data.map((elem) => elem.name)); 

    }
  }, [data]);
  useEffect(()=>{
    dispatch(storeMockDataFilteredRequest(filteredOptionsDispatch))
    
  },[filteredOptionsDispatch])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    filterOptions(value);
    setOptionSelected(false);
  }
  const filterOptions = (input) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredOptions(filtered);
    setFilteredOptionsDispatch(filtered)
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option.name);
    filterOptions(option.name);
    setOptionSelected(true);
    setFilteredOptions([]);
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

      <div className={isExpanded ? "Search-Container-options1" : 'Search-Container-options'} >
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
                  {option.name}
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
