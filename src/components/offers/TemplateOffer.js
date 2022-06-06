import React from "react";
import Gift from "../../assets/images/gift.png";
import Plus from "../../assets/images/add.png";
import { Link } from "react-router-dom";
const TemplateOffer = () => {
  return (
    <>
      <div
        className="menu-list"
        style={{
          padding: "3%",
        }}
      >
        <img src={Gift} alt="" className="gift-img" />

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button type={"button"} className="offer-btn">
            <img
              src={Plus}
              alt=""
              style={{ width: "20px", verticalAlign: "middle" }}
            />
           <Link to={"/management/Offers/AddOffer"}>
                Add New Offers
              </Link>
          </button>
          <p>Add new offers by using offer template</p>

          <p>Or</p>
          <button type={"button"} className="offer-btn">
            <img
              src={Plus}
              alt=""
              style={{ width: "20px", verticalAlign: "middle" }}
            />{" "}
               <Link to={"/management/Offers/CreateOffer"}>
               Create New Offers
              </Link>
            {/* Create New Offers */}
          </button>
          <p>Create new offers by using offer form</p>
        </div>
      </div>{" "}
    </>
  );
};

export default TemplateOffer;
