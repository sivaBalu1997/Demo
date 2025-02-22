import React from "react"
import "./Header.scss";

interface HeaderProps {
    title: string;
    isExpanded: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, isExpanded }) => {
    return (
        <div className="reports-header-container">
            {/* <div className={isExpanded ? "OffersHeadersWindow" : "OffersHeadersWindow1"}> */}
                {/* <div className={isExpanded ? "SubHeadingContainerExpanded" : "SubHeadingContainerMin"}> */}
                    <h2 className="reports-header">{title}</h2>
                {/* </div> */}
             {/* </div> */}
        </div>
    );
}
export default Header;