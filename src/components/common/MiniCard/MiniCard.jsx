import ShimmerCardMiniGraph from "components/reportComponents/CardWithMiniGraph/ShimmerCardMiniGraph";
import React, { useState } from "react";
import CategoryOverViewShimmer from "./CategoryOverViewShimmer";

const MiniCard = ({ data, loader=false }) => {


  return (
    <>
        <div className="categories-overview-container">
        {loader ? (
          <CategoryOverViewShimmer count={data?.length || 4} />
        ) : (
          data?.map((item, index) => (
            <div className="categories-overview-card-container" key={index}>
              <div className="categories-overview-card">
                <p className="categories-overview-card-title">{item.title}</p>
                <p className="categories-overview-card-data">{item.value}</p>
              </div>
            </div>
          ))
        )}
        </div>
     
    </>
  );
};

export default MiniCard;
