import React from "react";
import { Link } from "react-router-dom";
import Plus from "../../assets/images/add.png";
import Gift from "../../assets/images/gift.png";

const TemplateOffer = () => {
  return (
    <>
      <div className="menu-list p-3per">
        <img src={Gift} alt="" className="gift-img" />

        <div className="text-center m-t-30">
          <button type={"button"} className="offer-btn">
            <img src={Plus} alt="" className="offer_img" />
            <Link to={"/management/Offers/AddOffer"}>Add New Offers</Link>
          </button>
          <p>Add new offers by using offer template</p>

          <p>Or</p>
          <button type={"button"} className="offer-btn">
            <img src={Plus} alt="" className="offer_img" />{" "}
            <Link to={"/management/Offers/CreateOffer"}>Create New Offers</Link>
            {/* Create New Offers */}
          </button>
          <p>Create new offers by using offer form</p>
        </div>
      </div>{" "}
    </>
  );
};

export default TemplateOffer;
