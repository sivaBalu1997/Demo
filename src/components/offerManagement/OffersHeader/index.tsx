import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import SidePanel from "pages/SidePanel";
import "./style.scss";
import { Contextpagejs } from "pages/productCatalog/contextpage";

const Index = () => {
  const MenuItems = ["Active", "Completed"];
  const history = useHistory();

  const [activeItem, setActiveItem] = useState<string>(MenuItems[0]);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };
  const { isExpanded } = useContext(Contextpagejs);

  return (
    <div className="OffersHeaderContainer">
      <div className={isExpanded ? "OffersHeadersWindow" : 'OffersHeadersWindow1'}>
        <div
          className={
            isExpanded ? "SpecialPriceContainer2" : "SpecialPriceContainer"
          }
        >
          <p className="SpecialPriceHeading">Special Price</p>
          <button
            className="AddOfferButton"
            onClick={() => history.push("/offer/special")}
          >
            + Add New Offers
          </button>
        </div>
        <div className="ActiveCompletedHeading">
          <ul className="OfferListContainer">
            {MenuItems.map((elem, index) => (
              <NavLink
                to={`/Offers/${elem.toLowerCase()}`}
                key={index}
                className={({ isActive }: any) =>
                  isActive || activeItem === elem
                    ? "OfferListItem active-link"
                    : "OfferListItem"
                }
                onClick={() => handleItemClick(elem)}
              >
                <li>
                  <div className="OfferList-Section">
                    <span className="Offerlist-Heading">{elem}</span>
                  </div>
                </li>
              </NavLink>
            ))}
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
