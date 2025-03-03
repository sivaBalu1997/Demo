import React from "react";

import { ReactComponent as CloseIcon } from "../../../assets/svg/close.svg";

const RoundedPill = ({ data, closeIconOnClick, handeClear }) => {
  return (
    <>
      <div className="selected-categories-container">
        <span className="selected-categories-text">Selected:</span>
        {data.map((item) => (
          <div className="category-rounded-pill-container">
            <div className="category-rounded-pill">
              <span className="poppins-fw400-fs16 category-pill-text">
                {item.label}
              </span>
              <CloseIcon className="category-pill-close" onClick={() => { closeIconOnClick(item.value) }} />
            </div>
          </div>
        ))}
        {!data?.[0]?.value?null:<span className="selected-categories-text" style={{ cursor: "pointer", border: "1px solid grey", padding: "0.5rem", borderRadius: "8px" }} onClick={handeClear}>Clear</span>}
      </div>
    </>
  );
};

export default RoundedPill;
