import React, { useContext, useState } from "react";
import "./style.scss"; // Import SCSS for styling
import OfferHeader from "../../../components/offerManagement/OffersHeader";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import ThreeDotsImage from "../../../../src/assets/images/ThreeDots.png";
import DaysWeekOffer from "../../../components/offerManagement/DaysOfweekOffers";
import OfferDropDown from "../../../components/offerManagement/OfferDropdown";

const Table = () => {
  const { isExpanded } = useContext(Contextpagejs);

  const data = [
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: ["Biriyani", "Chapati", "Parotta", "Parotta", "Parotta"],
      totalItems: 5,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: ["Biriyani", "Chapati", "Parotta", "Parotta", "Parotta", "Parotta"],
      totalItems: 9,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: ["Biriyani", "Chapati", "Parotta", "Parotta", "Parotta", "Parotta"],
      totalItems: 5,
      specialPrice: "10%",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleOfferDropdown = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const renderItems = (items: any) => {
    const maxVisibleItems = 5;
    return (
      <>
        {items.slice(0, maxVisibleItems).join(", ")}
        {items.length > maxVisibleItems && (
          <span className="extra-items">
            +{items.length - maxVisibleItems} Items
          </span>
        )}
      </>
    );
  };

  return (
    <div>
      <OfferHeader />
      <div className={isExpanded ? "table-container" : "table-container1"}>
        <table className="OffersTable">
          <thead>
            <tr className="OffrtsTabletr">
              <th className="OffrtsTableth">Name</th>
              <th className="OffrtsTableth">Duration</th>
              <th className="OffrtsTableth">Channel</th>
              <th className="OffrtsTableth">Items</th>
              <th className="OffrtsTableth">Total Items</th>
              <th className="OffrtsTableth">Special Price</th>
        
            </tr>
          </thead>
          <tbody className="OffrTablebody">
            {data.map((row, index) => (
              <tr key={index} className="OffrtsTabletr">
                <td className="OffrtsTabletd">{row.name}</td>
                <td className="OffrtsTabletd">
                  {row.duration}
                  <DaysWeekOffer highlightedDays={[1, 2]} />
                </td>
                <td className="OffrtsTabletd">{row.channel}</td>
                <td className="OffrtsTabletd">{renderItems(row.items)}</td>
                <td className="OffrtsTabletd">{row.totalItems}</td>
                <td className="OffrtsTabletd">{row.specialPrice}</td>
                <td className="OffrtsTabletd">
                  <div className="action-container">
                    <img
                      src={ThreeDotsImage}
                      width="5"
                      height="20"
                      onClick={() => handleOfferDropdown(index)}
                      alt="Actions"
                    />
                    {activeIndex === index && (
                      <div className="OffersDropDownTable">
                        <OfferDropDown />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
