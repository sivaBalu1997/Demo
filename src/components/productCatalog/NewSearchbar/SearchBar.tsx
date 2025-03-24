import React from 'react'
import './style.scss'
import searchIcon from '../../../assets/svg/prodSearch.svg'

const SearchBar = () => {
  return (
    <div className='v2-searchBar'>
      <div className="v2-search-container">
        <input type="text" className='v2-input' placeholder='Search by item name, item code'/>
        <img src={searchIcon} alt="v2-search" className='v2-search'/>
      </div>
    </div>
  )
}

export default SearchBar
