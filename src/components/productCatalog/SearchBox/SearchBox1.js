import React, { useEffect, useState, useContext,useRef } from 'react';
import './SearchBox.scss';
import searchIcon from '../../../assets/images/searchicon.png';
import NotFound from '../../../assets/svg/NotFound copy.svg';
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { useSelector, useDispatch } from 'react-redux';
import { searchForItem, storeMockDataFilteredRequest } from 'redux/productCatalog/productCatalogActions';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState(''); // User input only
  const [displayTerm, setDisplayTerm] = useState(''); // User input + suggestion for display
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [optionSelected, setOptionSelected] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [filteredOptionsDispatch, setFilteredOptionsDispatch] = useState([]);
  const [orgData, setOrgData] = useState([]);
  const [closeModal, setCloseModal] = useState(false)

  const data = useSelector((state) => state.storeMockDataReducer.data);
  const dispatch = useDispatch();
  const { isExpanded } = useContext(Contextpagejs);
  const popupRef = useRef(null);
  useEffect(() => {
    const itemNames = menuData?.flatMap(item => item?.itemResponseList)
      .map(item => item?.itemName);

    setOrgData(itemNames); // Set original data when it is available
  }, [data]);
  useEffect(() => {
    if(searchTerm==''){
      dispatch(searchForItem({}));
    }
  }, []);


  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setCloseModal(false); // Close the popup
    }
  };

  useEffect(() => {
    if (closeModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup on unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeModal]);

  useEffect(() => {
    dispatch(storeMockDataFilteredRequest(filteredOptionsDispatch));
  }, [filteredOptionsDispatch]);

  const menuData = useSelector((state) => state.productCatalog?.menuData);

  const handleSearch = (e) => {
  let value = e.target.value;
  const regex = /^[a-zA-Z\s]*$/;

  // Prevent spaces as the first character or standalone
  if (regex.test(value) && !(value.length === 1 && value === ' ')) {
    dispatch(searchForItem({}));
    setSearchTerm(value);
    setDisplayTerm(value);
    filterOptions(value);
    setOptionSelected(false);
    setCloseModal(true);
    }
   
    // if (e.key === 'Backspace') {
    //   if (optionSelected) {
    //     // If an option was selected, reset searchTerm and displayTerm
    //     setSearchTerm('');
    //     setDisplayTerm('');
    //     setOptionSelected(false); // Allow new input
    //     setFilteredOptions([]);   // Clear suggestions
    //   } else {
    //     setOptionSelected(false); // Allow for changing selection
    //   }
    // }

  };

  const filterOptions = (input) => {
    const itemNames = menuData?.flatMap(item => item?.itemResponseList)
      .map(item => item?.itemName);

    const filtered = itemNames?.filter(item =>
      item?.toLowerCase().includes(input?.toLowerCase())
    );

    setFilteredOptions(filtered);
    setFilteredOptionsDispatch(filtered);

    if (filtered.length > 0 && input.length > 0) {
      const firstMatch = filtered[0];
      if (firstMatch.toLowerCase().startsWith(input.toLowerCase())) {
        const suggestion = firstMatch.slice(input.length);
        setDisplayTerm(input + suggestion);
        setHighlightedIndex(0);
      } else {
        setDisplayTerm(input);
      }
    } else {
      setDisplayTerm(input);
    }
  };

  const handleOptionClick = (option) => {
    setSearchTerm(option);
    setDisplayTerm(option);
    setOptionSelected(true);
    setCloseModal(false)
    let result = null;
    menuData?.forEach((category) => {
      category?.itemResponseList?.forEach((item) => {
        if (item?.itemName === option) {
          result = {
            categoryId: category.categoryId,
            categoryName: category.categoryName,
            itemResponseList: [item],
          };
        }
      });
    });

    dispatch(searchForItem(result));

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

    // if (e.key === 'Backspace') {
    //   if (optionSelected) {
    //     // If an option was selected, reset searchTerm and displayTerm
    //     setSearchTerm('');
    //     setDisplayTerm('');
    //     setOptionSelected(false); // Allow new input
    //     setFilteredOptions([]);   // Clear suggestions
    //   } else {
    //     setOptionSelected(false); // Allow for changing selection
    //   }
    // }
  };

  return (
    <div className="MLSearch-Container">
      <div className='MLsearchbox'>
        <input
          className={`${isExpanded ? "MLHeader-Search1" : "MLHeader-Search"}`}
          value={`${searchTerm}`}
          placeholder="Search"
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          type="text"
        />
        <img
          className={`${isExpanded ? "MLSerchIcon-Header1" : "MLSerchIcon-Header"}`}
          // className={"MLSerchIcon-Header1"}
          src={searchIcon}
          alt="Search Icon"
        />
      </div>

      <div ref={popupRef} className={isExpanded ? "MLSearch-Container-options1" : 'MLSearch-Container-options-menu'}>
        {searchTerm && closeModal && (
          <ul className='MLsearchBoxContainer'>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={index === highlightedIndex ? 'MLhighlighted' : ''}
                >
                  <div className={isExpanded ? 'MLSearch-Container-options1-items' : "MLSearch-Container-options-items"}>
                    {option}
                  </div>
                </li>
              ))
            ) : !optionSelected && (
              <div className={isExpanded ? 'MLSearch-Container-options1-none' : 'MLSearch-Container-options-none'}>
                <div className='MLSearch-Container-options-none-flex-direction'>
                  <img className="MLNotFoundImage" src={NotFound} alt="MLNo Results Found" />
                  <h3 className='MLheading-none'>No Results Found</h3>
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
