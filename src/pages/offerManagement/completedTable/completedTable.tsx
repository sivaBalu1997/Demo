import SidePanel from 'pages/SidePanel'
import React, { useContext, useRef, useState } from 'react'
import OfferHeader from "../../../components/offerManagement/OffersHeader";
import { Contextpagejs } from 'pages/productCatalog/contextpage';
import DaysWeekOffer from "../../../components/offerManagement/DaysOfweekOffers";
import ThreeDotsImage from "../../../../src/assets/images/ThreeDots.png";
import OfferDropDown from "../../../components/offerManagement/OfferDropdown";
import './style.scss'

const CompletedTable = () => {
  const { isExpanded } = useContext(Contextpagejs);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const data = [
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      date: '28/10/24 - 14/11/24',
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: ["Biriyani", "Chapati", "Parotta", "Parotta", "Parotta"],
      totalItems: 5,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      date: '28/10/24 - 14/11/24',
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: ["Biriyani", "Chapati", "Parotta", "Parotta", "Parotta"],
      totalItems: 5,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      date: '28/10/24 - 14/11/24',
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: ["Biriyani", "Chapati", "Parotta", "Parotta", "Parotta"],
      totalItems: 5,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      date: '28/10/24 - 14/11/24',
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: ["Biriyani", "Chapati", "Parotta", "Parotta", "Parotta"],
      totalItems: 5,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      date: '28/10/24 - 14/11/24',
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: ["Biriyani", "Chapati", "Parotta", "Parotta", "Parotta"],
      totalItems: 5,
      specialPrice: "$5.89",
    },
    {
      name: "Bar Happy Hour",
      duration: "10:00AM–12:00AM",
      date: '28/10/24 - 14/11/24',
      days: ["S", "M", "T", "W", "T", "F", "S"],
      channel: "Dine In, Delivery, Pickup",
      items: ["Biriyani", "Chapati", "Parotta", "Parotta", "Parotta"],
      totalItems: 5,
      specialPrice: "$5.89",
    },
  ];

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
      <div className={isExpanded ? "completedTable" : "completedTable1"}>
      <SidePanel />
      <div className="completedTableBody">
        <OfferHeader />
        <div className={isExpanded ? "completedtable-container" : "completedtable-container1"}>
          <table className={isExpanded ? "completedTablee" : "completedTablee1"}>
            <thead>
              <tr className="completedtsTabletr">
                <th className="completedtsTableth">Name</th>
                <th className="completedtsTableth">Duration</th>
                <th className="completedtsTableth">Channel</th>
                <th className="completedtsTableth">Items</th>
                <th className="completedtsTableth">Total Items</th>
                <th className="completedtsTableth">Special Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="completedtsTabletr">
                  <td className="completedtsTabletd">{row.name}</td>
                  <td className="completedtsTabletd">
                    <p className="duration"><span>{row.duration}</span>{row.date}</p>
                    <DaysWeekOffer highlightedDays={[1, 2]} />
                  </td>
                  <td className="completedtsTabletd">{row.channel}</td>
                  <td className="completedtsTabletd">{renderItems(row.items)}</td>
                  <td className="completedtsTabletd">{row.totalItems}</td>
                  <td className="completedtsTabletd">{row.specialPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CompletedTable
