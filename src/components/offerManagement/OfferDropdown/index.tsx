import React from "react";
import "./style.scss";
import edit from "../../../assets/svg/editoffer.svg";
import duplicate from "../../../assets/svg/Duplicate.svg";
import disable from "../../../assets/svg/offerdisable.svg";
import bin from "../../../assets/svg/offerbin.svg";

const index = () => {
  const data = [
    {
      name: "Edit",
      img: edit,
    },
    {
      name: "Duplicate",
      img: duplicate,
    },
    {
      name: "Disable",
      img: disable,
    },
    {
      name: "Delete",
      img: bin,
    },
  ];
  return (
    <div className="Offersdropdown-container">
      {data.map((elem) => {
        return (
          <>
            <div className="Offersdropdown-items">
              <img className="Offersdropdown_img" src={elem.img} alt="" />
              <h4 className="Offersdropdown-heading">{elem.name}</h4>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default index;