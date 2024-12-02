import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import OfferHeader from "../../../components/offerManagement/OffersHeader";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import ThreeDotsImage from "../../../../src/assets/images/ThreeDots.png";
import DaysWeekOffer from "../../../components/offerManagement/DaysOfweekOffers";
import OfferDropDown from "../../../components/offerManagement/OfferDropdown";
import SidePanel from "pages/SidePanel";

const Table = () => {
  const { isExpanded } = useContext(Contextpagejs);

  const data = [
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: ["Biriyani", "Chapati"],
      totalItems: 5,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: [
        "Biriyani",
        "Chapati",
        "Parotta",
        "Parotta",
        "Parotta",
        "Parotta",
      ],
      totalItems: 9,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: [
        "Biriyani",
        "Chapati",
        "Parotta",
        "Parotta",
        "Parotta",
        "Parotta",
      ],
      totalItems: 5,
      specialPrice: "10%",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: [
        "Biriyani",
        "Chapati",
        "Parotta",
        "Parotta",
        "Parotta",
        "Parotta",
      ],
      totalItems: 9,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: [
        "Biriyani",
        "Chapati",
        "Parotta",
        "Parotta",
        "Parotta",
        "Parotta",
      ],
      totalItems: 9,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: [
        "Biriyani",
        "Chapati",
        "Parotta",
        "Parotta",
        "Parotta",
        "Parotta",
      ],
      totalItems: 9,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: [
        "Biriyani",
        "Chapati",
        "Parotta",
        "Parotta",
        "Parotta",
        "Parotta",
      ],
      totalItems: 9,
      specialPrice: "$5.89",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleOfferDropdown = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setActiveIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className={isExpanded ? " offerTable" : "offerTable1"}>
      <SidePanel />
      <div className="offerTableBody">
        <OfferHeader />
        <div className={isExpanded ? "table-container" : "table-container1"}>
          <table className={isExpanded ? "OffersTable" : "OffersTable1"}>
            <thead className="OfferTableHeading">
              <tr className="">
                <th className="OffrtsTableth">Name</th>
                <th className="OffrtsTableth">Duration</th>
                <th className="OffrtsTableth">Channel</th>
                <th className="OffrtsTableth">Items</th>
                <th className="OffrtsTableth">Total Items</th>
                <th className="OffrtsTableth">Special Price</th>
                <th className="OffrtsTableth"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="OffrtsTabletr">
                  <td className="OffrtsTabletd">{row.name}</td>
                  <td className="OffrtsTabletd">
                    <p className="duration">{row.duration}</p>
                    <DaysWeekOffer highlightedDays={[1, 2]} />
                  </td>
                  <td className="OffrtsTabletd">{row.channel}</td>
                  <td className="OffrtsTabletd">{renderItems(row.items)}</td>
                  <td className="OffrtsTabletd">{row.totalItems}</td>
                  <td className="OffrtsTabletd">{row.specialPrice}</td>
                  <td className="OffrtsTabletd">
                    <div className="action-container" ref={componentRef}>
                      <img
                        src={ThreeDotsImage}
                        width="5"
                        height="20"
                        // ref={componentRef}
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
    </div>
  );
};

export default Table;
