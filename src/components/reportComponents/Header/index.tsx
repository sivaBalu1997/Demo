import React from "react"

interface HeaderProps {
    title: string;
    isExpanded: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, isExpanded }) => {
    return (
        <div className="OffersHeaderContainer">
            <div className={isExpanded ? "OffersHeadersWindow" : "OffersHeadersWindow1"}>
                <div className={isExpanded ? "SubHeadingContainerExpanded" : "SubHeadingContainerMin"}>
                    <h2 className="SubHeading">{title}</h2>
                </div>
            </div>
        </div>
    );
}
export default Header;