import React, { useEffect, useState } from 'react'
import './dashBoardTopNav.scss'
import { Link, useLocation } from "react-router-dom";

const DashBoardTopNav = () => {
    const location = useLocation()
    const [activeLink, setActiveLink] = useState(location.pathname)

    useEffect(() => {
        setActiveLink(location.pathname)
    }, [location])

  return (
    <div className="dashTopNavbar">
        <div className="dashTopNavbar dashTopNavbarContainer">
            <ul className='dashTopNavbar category-menu'>


            <li className={activeLink === '/cms/liveOutlets' ? 'active' : ''}>
                    <Link to="/cms/liveOutlets">Live(1)</Link>
                    {activeLink ==='/cms/liveOutlets' && <hr />}
                </li>
                <li className={activeLink === '/cms/template' ? 'active' : ''}>
                    <Link to="/cms/template">Templates</Link>
                    {activeLink === '/cms/template' && <hr />}
                </li>
                <li className={activeLink === '/cms/dashboard' ? 'active' : ''}>
                    <Link to="/cms/dashboard">Dashboard</Link>
                    {activeLink === '/cms/dashboard' && <hr />}
                </li>

             

            
                <li className={activeLink === '/cms/PendingOutlet' ? 'active' : ''}>
                    <Link to="/cms/PendingOutlet">Pending Outlet</Link>
                    {activeLink === '/cms/dashboard' && <hr />}
                </li>
            </ul>
        </div>
        <hr className="dashTopNavbar bottomborder" />
    </div>
  )
}

export default DashBoardTopNav
