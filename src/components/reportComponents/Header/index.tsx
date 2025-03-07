import React from "react"
import "./Header.scss";
import { ReactComponent as MenuIcon } from "../../../assets/svg/menuNew.svg";
interface HeaderProps {
    title: string;
    isExpanded: boolean;
    handleSideMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, isExpanded,handleSideMenu }) => {
    console.log({isExpanded});
    
    return (
        <div className="reports-header-container">
            <MenuIcon className="report-menu-icon pointer" onClick={handleSideMenu}/>
                    <h2 className="reports-header">{title}</h2>
        </div>
    );
}
export default Header;