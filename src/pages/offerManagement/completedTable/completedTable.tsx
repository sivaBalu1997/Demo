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
    <div className='completedTable'>
          <div className={isExpanded ? " offerTable" : "offerTable1"}>
      <SidePanel />
      <div className="offerTableBody">
        <OfferHeader />
        <div className={isExpanded ? "table-container" : "table-container1"}>
          <table className={isExpanded ? "OffersTable" : "OffersTable1"}>
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
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="OffrtsTabletr">
                  <td className="OffrtsTabletd">{row.name}</td>
                  <td className="OffrtsTabletd">
                    <p className="duration"><span>{row.duration}</span>{row.date}</p>
                    <DaysWeekOffer highlightedDays={[1, 2]} />
                  </td>
                  <td className="OffrtsTabletd">{row.channel}</td>
                  <td className="OffrtsTabletd">{renderItems(row.items)}</td>
                  <td className="OffrtsTabletd">{row.totalItems}</td>
                  <td className="OffrtsTabletd">{row.specialPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CompletedTable
