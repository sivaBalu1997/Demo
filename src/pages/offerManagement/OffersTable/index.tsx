import React, { useContext, useState } from "react";
import "./style.scss"; // Import SCSS for styling
import OfferHeader from "../../../components/offerManagement/OffersHeader";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import ThreeDotsImage from "../../../../src/assets/images/ThreeDots.png"
import DaysWeekOffer from "../../../components/offerManagement/DaysOfweekOffers"
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

  const renderItems = (items:any) => {
    const maxVisibleItems = 5;
    return (
      <>
        {items.slice(0, maxVisibleItems).join(", ")}
        {items.length > maxVisibleItems && (
          <span className="extra-items"> +{items.length - maxVisibleItems} Items</span>
        )}
      </>
    );
  };
  const [highligteddays, setHigligtedDays] = useState<string[]>([]); // Correct type for array of strings
  return (
    <div>
      <OfferHeader />
      <div className={isExpanded==true?"table-container":"table-container1"}>
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
            <div className={isExpanded?"OfferDiv":"OfferDiv2"}></div>

          </thead>
          <tbody className="OffrTablebody">
            {data.map((row, index) => (
              <tr key={index} className="OffrtsTabletr">
                <td className="OffrtsTabletd">{row.name}</td>
                <div className="RowDuration">
                <td className="OffrtsTabletd">{row.duration}   <DaysWeekOffer highlightedDays={["S","F","T"]} /></td>
              
                </div>
                <td className="OffrtsTabletd">{row.channel}</td>
                <td className="OffrtsTabletd">{renderItems(row.items)}</td>
                <td className="OffrtsTabletd">{row.totalItems}</td>
                <td className="OffrtsTabletd">{row.specialPrice}</td>
                <td className="OffrtsTabletd"><img src={ThreeDotsImage} width="5" height="20"></img></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
