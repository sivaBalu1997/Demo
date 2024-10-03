import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Switch, useLocation } from "react-router-dom";
import '../../styles/CmsTopNavBar.scss'

const TopNavbar = () => {
    const location = useLocation()
    const [activeLink, setActiveLink] = useState(location.pathname)

    useEffect(() => {
        setActiveLink(location.pathname)
    }, [location])

    return (
            <div className="topNavbar">
                <div className="topNavbar topNavbarContainer">
                    <ul className='topNavbar category-menu'>
                        <li className={activeLink === '/cms/welcome' ? 'active' : ''}>
                            <Link to="/cms/welcome">Welcome Page</Link>
                            {activeLink === '/cms/welcome' && <hr />}
                        </li>
                        <li className={activeLink === '/cms/restaurantInfo' ? 'active' : ''}>
                            <Link to="/cms/restaurantInfo">Restaurant Info</Link>
                            {activeLink === '/cms/restaurantInfo' && <hr />}
                        </li>
                        <li className={activeLink === '/cms/exploreMenu' ? 'active' : ''}>
                            <Link to="/cms/exploreMenu">Explore Menu</Link>
                            {activeLink === '/cms/exploreMenu' && <hr />}
                        </li>
                        <li className={activeLink === '/cms/fullMenu' ? 'active' : ''}>
                            <Link to="/cms/fullMenu">Full Menu</Link>
                            {activeLink === '/cms/fullMenu' && <hr />}
                        </li>
                    </ul>
                </div>
                <hr className="topNavbar bottomborder" />
            </div>
    )
}

export default TopNavbar;
