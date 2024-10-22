import React from 'react'
import '../SideNav/Sidenav.scss'
import I from '../../../assets/svg/1.svg'
import II from '../../../assets/svg/2.svg'
import III from '../../../assets/svg/3.svg'
import Iv from '../../../assets/svg/4.svg'
import v from '../../../assets/svg/5.svg'
import vI from '../../../assets/svg/6.svg'
import logo from '../../../assets/svg/thalappakatti-logo-anim 1@2x.svg'
import ArrowHover from '../../../assets/svg/ArrowHover.svg'
import btnnav from '../../../assets/svg/btnnav.svg'
import { useState } from 'react'
import { useContext } from 'react'
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";

const Sidenav = () => {

  const{isExpanded, setIsExpanded}=useContext(Contextpagejs)

    const sidebarData = [
        { id: 1, name: "Business", img:I },
        { id: 2, name: "Employee Setup", img:II },
        { id: 3, name: "Roles & Access", img:III  },
        { id: 4, name: "Menu", img:Iv },
        { id: 5, name: "Reports & Insights", img:v  },
        { id: 6, name: "Printer settings", img:vI  },
      ];
    
      const [selectedOption, setSelectedOption] = useState('');
      const options = ['Option 1', 'Option 2', 'Option 3'];

      const toggleExpanded=()=>{
        setIsExpanded(!isExpanded);
      }
      
      const handleChange = (event) => {
        setSelectedOption(event.target.value);
      };

  return (
    <div className='container-sidenav'>
        <nav className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
            <ul>
                <div className='headingContainer'>
                  <img className={isExpanded?"logo1":"logo"} src={logo} alt="" />

                  <div className='flexcolhheading'>
                      <h1 className='heading-Thalapakatti'>Thalapakatti Biriyani</h1>
                      <select name="Op" id="dropdown" value={selectedOption} onChange={handleChange} className='dropdown-nav'>
                        <option value="" disabled>Select an option</option>
                          {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                  </div>
                </div>
                {sidebarData.map((item,index)=>(
                  <div className='flexSidenav' key={index}>  
                    <li key={item.id}></li>
                    <div className='flexcol'>
                      <img className='imgNavbar' src={item.img} alt="" />
                      <img  className="ArrowHover"src={ArrowHover}></img>
                      <div className='imgNavbarHover'>{item.name}</div>
                    </div>
                  {isExpanded &&  <h1 className='NavName'>{item.name}</h1>}    
                  </div>                
                  )
                )}
            </ul>
        </nav>
        <div className='vertical-line-navbar' />
        <div>
          <img onClick={toggleExpanded}className={isExpanded?"btn-nav1":"btn-nav"} src={btnnav} alt="" />
        </div>
    </div>
  )
}

export default Sidenav