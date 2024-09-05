import React from 'react'
import './SearchBox.scss'
import { useState ,useContext} from 'react'
import searchIcon from '../../../assets/images/searchicon.png'
import NotFound from '../../../assets/svg/NotFound copy.svg'
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [optionSelected, setOptionSelected] = useState(false);
  const{isExpanded,setIsExpanded}=useContext(Contextpagejs)

  const truncateString = (str, length) => {
    return str.length > length ? str.substring(0, length) : str;
  };


  const [items, setitems] = useState([
    {
      id: 1,
      name: truncateString("dosa", 14),
      code: "12345",
    
    },

    {
      id: 3,
      name: truncateString(" Mushroo", 14),
      code: "12345",
    
    },
    {
      id: 4,
      name: truncateString("Creamy", 14),
      code: "12345",
   
    },
    {
      id: 5,
      name: truncateString("idly Mushroo", 14),
      code: "12345",
   
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
   
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
     
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
   
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
    
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
   
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
  
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
   
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
   
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
   
    },
    {
      id: 1,
      name: truncateString("dosa", 14),
      code: "12345",
   
    },

    {
      id: 3,
      name: truncateString(" Mushroo", 14),
      code: "12345",
   
    },
    {
      id: 4,
      name: truncateString("Creamy", 14),
      code: "12345",
   
    },
    {
      id: 5,
      name: truncateString("idly Mushroo", 14),
      code: "12345",
    
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",

    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
    
    },
    {
      id: 1,
      name: truncateString("dosa", 14),
      code: "12345",

    },

    {
      id: 3,
      name: truncateString(" Mushroo", 14),
      code: "12345",
   
    },
    {
      id: 4,
      name: truncateString("Creamy", 14),
      code: "12345",
 
    },
    {
      id: 5,
      name: truncateString("idly Mushroo", 14),
      code: "12345",
 
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
   
    },
    {
      id: 2,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
   
    },
    
    
  ]);
  const [itemsfood, setitemsfood] = useState([
    {
      id: 11,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
    
    },

    {
      id: 31,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
   
    },
    {
      id: 41,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
  
    },
    {
      id: 51,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
   
    },
    {
      id: 21,
      name: truncateString("Creamy Mushroo", 14),
      code: "12345",
    
    },
    {
      id: 21,
      name: truncateString("Creamy Mushroo", 14),
 
    },
  ]);




  const [filteredOptions, setFilteredOptions] = useState(items);
  const handleSearch=(e)=>{
    const value=e.target.value
    setSearchTerm(value)
    filterOptions(value)
    setOptionSelected(false); // Reset to false when the user types


  }

  const filterOptions = (input) => {
    const filtered = items.filter(option =>
      option.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredOptions(filtered);
  };
  
  const handleOptionClick = (option) => {
    setSearchTerm(option.name);
    setFilteredOptions([]);
    setOptionSelected(true); // Set to true when an option is selected
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => {
        const newIndex = Math.min(filteredOptions.length - 1, prevIndex + 1);
        // Update the search term to the newly highlighted option
        setSearchTerm(filteredOptions[newIndex]?.name || "");
        return newIndex;
      });
    }
    
    if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => {
        const newIndex = Math.max(0, prevIndex - 1);
        setSearchTerm(filteredOptions[newIndex]?.name || "");
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
    
    <div className={"Search-Container"}>
      <div>
    
    <input className=  {`${isExpanded? "Header-Search1":"Header-Search"}`}  value={searchTerm} placeholder='Search' onChange={handleSearch}  onKeyDown={handleKeyDown} type="text" />
    <img  className=  {`${isExpanded?"SerchIcon-Header1":"SerchIcon-Header"}`}  src={searchIcon} alt="" />
    </div>

    <div className={ isExpanded?"Search-Container-options1":'Search-Container-options'}>

    {searchTerm && (
        <ul>
          {filteredOptions.length>0 ?(filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={()=>handleOptionClick(option)}
              className={index === highlightedIndex ? 'highlighted' : ''}
             

            
            >
              <div className={isExpanded?'Search-Container-options1-items':"Search-Container-options-items"} >{option.name}</div>
            </li>
          ))): !optionSelected && (

          <div className={isExpanded?'Search-Container-options1-none':'Search-Container-options-none'}>
            <div className='Search-Container-options-none-flex-direction'>
            <img className="NotFoundImage"src={NotFound} alt="" />
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