import React from "react";
import "./style.scss";

const TableShimmer: React.FC = () => {
    return (
        <div className="new-table-container shimmer-container">
            <div className="table-header">
                <div className="shimmer skeleton-box" style={{ width: "150px", height: "20px" }}></div>
                <div className="search-container">
                    <div className="shimmer skeleton-box" style={{ width: "200px", height: "20px" }}></div>
                </div>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <th key={index}>
                                    <div className="shimmer skeleton-box" style={{ width: "80px", height: "16px" }}></div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, rowIndex) => (
                            <tr key={rowIndex} className="skeleton-row">
                                {Array.from({ length: 5 }).map((_, colIndex) => (
                                    <td key={colIndex}>
                                        <div className="skeleton-box"></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="table-footer">
                <div className="shimmer skeleton-box" style={{ width: "100px", height: "16px" }}></div>
                <div className="pagination">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="shimmer skeleton-box" style={{ width: "30px", height: "30px", borderRadius: "4px" }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TableShimmer;
