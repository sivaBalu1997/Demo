import React, { useContext } from 'react'
import { Contextpagejs } from 'pages/productCatalog/contextpage';
import SidePanel from 'pages/SidePanel';
import "./style.scss";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isExpanded } = useContext(Contextpagejs);
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div className={`${isExpanded ? "SubHeadingContainerExpanded" : "SubHeadingContainerMin"}`}>
                <SidePanel />
            </div>
            <div style={{ flex: 1, padding: "20px" }}>{children}</div>
        </div >
    );
};

export default Layout;
