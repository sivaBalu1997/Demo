import React, { useContext } from 'react'
import { Contextpagejs } from 'pages/productCatalog/contextpage';
import SidePanel from 'pages/SidePanel'
import "./style.scss";


const SalesOverView: React.FC = () => {
    const { isExpanded } = useContext(Contextpagejs);

    return (
        <div style={{ display: "flex", flexDirection: "row", width: '100%' }}>
            <SidePanel />
            <div
                // style={isExpanded ? { width: '82%' } : { width: '94%' }}
                className={`sales-overview-container ${isExpanded ? "sales-overview-container-expanded" : ""}`}
            >
                SalesOverView
            </div>
        </div>
    )
}

export default SalesOverView
