import React, { useContext } from "react"
import "./Header.scss";
interface HeaderProps {
    title: string;
    btnTittle?: string;
    handleBtnClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, btnTittle, handleBtnClick }) => {

    return (
        <div className="main-header-container">
            <h2 className="main-header">{title}</h2>
            {/* {btnTittle ?<div className="main-header-btn-container"><button className="main-header-btn" onClick={handleBtnClick}>{btnTittle}</button></div>:null} */}
        </div>
    );
}
export default Header;