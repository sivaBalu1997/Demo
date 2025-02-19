import React, { useContext } from 'react';
import { Contextpagejs } from 'pages/productCatalog/contextpage';
import SidePanel from 'pages/SidePanel';
import "./style.scss";

const Category: React.FC = () => {
    const { isExpanded } = useContext(Contextpagejs);

    return (
        <div style={{ display: "flex", flexDirection: "row", width: '100%' }}>
            <SidePanel />
            <div
                // style={isExpanded ? { width: '82%' } : { width: '94%' }}
                className={`new-product-container ${isExpanded ? "new-product-container-expanded" : ""}`}
            >
                Category
            </div>
        </div>
    )
}

export default Category
