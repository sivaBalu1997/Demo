import React, { useContext } from "react"
import "./Header.scss";
import { ReactComponent as MenuIcon } from "../../../assets/svg/menuNew.svg";
import { Contextpagejs } from "pages/productCatalog/contextpage";
interface HeaderProps {
    title: string;
    btnTittle?: string;
    handleBtnClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, btnTittle,handleBtnClick }) => {
      const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
    
    return (
        <div className="main-header-container">
            <MenuIcon className="main-menu-icon pointer" onClick={()=> setIsExpanded(true)}/>
                    <h2 className="main-header">{title}</h2>
                    {btnTittle ?<div className="main-header-btn-container"><button className="main-header-btn" onClick={handleBtnClick}>{btnTittle}</button></div>:null}
                    
        </div>
    );
}
export default Header;