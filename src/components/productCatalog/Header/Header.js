import React, { useContext, useState } from 'react'
import '../Header/Header.scss'
import SearchBox from '../SearchBox/SearchBox1'
import filterIcon from '../../../assets/svg/filter.svg'
import Excel from '../../../assets/svg/Excel.svg'
import publish from '../../../assets/svg/publish.svg'
import DownloadExcel from '../../../assets/images/ExcelDownload.png'
import { Contextpagejs } from '../../../pages/productCatalog/contextpage'
import { useHistory } from 'react-router-dom'
import Menu120 from '../Menu120/Menu120'
import Filter from '../Filter/Filter'
import ArrowHover from '../../../assets/svg/ArrowHover.svg'
import DatePicker from 'react-datepicker';
import {removeDataRequest } from 'redux/productCatalog/productCatalogActions';
import { useDispatch} from 'react-redux';
const Header = () => {
  const{isExpanded}=useContext(Contextpagejs)
  const [filterSelected,setFilterSelected]=useState(false)

  const history=useHistory()
  const dispatch =useDispatch()
  const handleFilter=()=>{
    setFilterSelected(!filterSelected)
  }

  const handleClick=()=>{
    dispatch(removeDataRequest())
    history.push("/productCatalog/PrimaryDetails")
  }
  

  return (
    <div className={isExpanded ? 'Header-Container1' : "Header-Container"}>
      <div className='Header-Heading-Search-Filter-Container'>
        <Menu120/>
        <SearchBox/>
        </div>
      <div 
        onClick={()=>handleClick()} 
        className={isExpanded ? "Add-Item-Container1" : "Add-Item-Container"
      }>
        <h3 className='Add-Item-Heading-Plus'>+</h3>
        <h3 className='Add-Item-Heading' >Add Item</h3>
      </div>
    </div>
  )
}

export default Header