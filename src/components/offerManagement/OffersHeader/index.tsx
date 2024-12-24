import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.scss";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { removeeditdata } from "redux/offer/offerActions";
import { useDispatch } from "react-redux";

const Index = () => {
  const MenuItems = ["Active", "Completed"];
  const history = useHistory();
  const location = useLocation();
  const dispatch=useDispatch();
  const { isExpanded } = useContext(Contextpagejs);

  const handleItemClick = (item: string) => {
    history.push(`/Offers/${item.toLowerCase()}`);
  };

  return (
    <div className="OffersHeaderContainer">
      <div className={isExpanded ? "OffersHeadersWindow" : "OffersHeadersWindow1"}>
        <div
          className={
            isExpanded ? "SpecialPriceContainer2" : "SpecialPriceContainer"
          }
        >
          <p className="SpecialPriceHeading">Special Price</p>
          <button
            className="AddOfferButton"
            onClick={() => {history.push("/offer/special")
              
              dispatch(removeeditdata())
            }}
          >
            + Add New Offers
          </button>
        </div>
        <div className="ActiveCompletedHeading">
          <ul className="OfferListContainer">
            {MenuItems.map((elem, index) => {
              const isActive = location.pathname.includes(elem.toLowerCase());
              return (
                <li key={index} onClick={() => handleItemClick(elem)}>
                  <div className="OfferList-Section">
                    <span
                      className={`OfferListItem ${isActive ? "active-link" : ""}`}
                    >
                      {elem}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={isExpanded ? "ActiveCompletediv" : "ActiveCompletediv2"}
        ></div>
      </div>
    </div>
  );
};

export default Index;
