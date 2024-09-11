import React, { useContext, useState } from 'react'
import '../Header/Header.scss'
import SearchBox from '../SearchBox/SearchBox1'
import filterIcon from '../../../assets/svg/filter.svg'
import Excel from '../../../assets/svg/Excel.svg'
import DownloadExcel from '../../../assets/images/ExcelDownload.png'
import { Contextpagejs } from '../../../pages/productCatalog/contextpage'
import { useHistory } from 'react-router-dom'
import Menu120 from '../Menu120/Menu120'
import Filter from '../Filter/Filter'
import ArrowHover from '../../../assets/svg/ArrowHover.svg'



const Header = () => {
  const{isExpanded,setIsExpanded}=useContext(Contextpagejs)

  const [filterSelected,setFilterSelected]=useState(false)
  const history=useHistory()

  const handleFilter=()=>{
    setFilterSelected(!filterSelected)
  }

  return (
    <div className={isExpanded?'Header-Container1':"Header-Container"}>

      {/* {**********************HeaderSection*****************************************************************} */}

      <div className='Header-Heading-Search-Filter-Container'>
        <Menu120/>
        <SearchBox/>
        <div className='Filter-Div'  >
          <div className='Filter-FlexCol'>
            <img   className={isExpanded?'FilterIcon-Header1':"FilterIcon-Header"} onClick={handleFilter}  src={filterIcon} alt="" />
            <img className='ArrowHoverHeader' src={ArrowHover} alt="" />
            <div className='FilterHover'>Filter</div>
          </div>    
        {filterSelected && <Filter/>}
        </div>
        <div className='Excel-flex-col'>
          <img className={`${filterSelected?"Excel-Header1":"Excel-Header"}  ${isExpanded?"Excel1":"Excel"}`} src={Excel} alt="" />
          <img className={`${filterSelected?"Excel-Header-Download1":"Excel-Header-Download"}  ${isExpanded?"Exceldownloadicon1":"Exceldownloadicon"}`} src={DownloadExcel} alt="" />
          {filterSelected===false && <img className='ArrowHoverHeaderExcel' src={ArrowHover} alt="" />}
          {filterSelected===false &&  <div className='ExcelHover'>Import</div>}
        </div>  
        </div>


      <div 
        onClick={()=>history.push("/productCatalog/PrimaryDetails")} 
        className={isExpanded ? "Add-Item-Container1" : "Add-Item-Container"
      }>
        <h3 className='Add-Item-Heading-Plus'>+</h3>
        <h3 className='Add-Item-Heading' >Add Item</h3>
      </div>
    </div>
  )
}

export default Header