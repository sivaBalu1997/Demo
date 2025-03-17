import React from "react";

const MiniCard = ({ data }) => {
  return (
    <>
        <div className="categories-overview-container">
        {data.map((item, index) => (
          <div className="categories-overview-card-container" key={index}>
            <div className="categories-overview-card">
              <p className="categories-overview-card-title">{item.title}</p>
              <p className="categories-overview-card-data">{item.value}</p>
            </div>
          </div>
        ))}
        </div>
     
    </>
  );
};

export default MiniCard;
