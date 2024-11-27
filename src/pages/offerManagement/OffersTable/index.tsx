import React from "react";
import "./style.scss"; // Import CSS for styling

const Table = () => {
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
      items: ["Biriyani", "Chapati", "Parotta", "Parotta", "Parotta","Parotta"],
      totalItems: 5,
      specialPrice: "10%",
    },
  ];

  return (
    <div className="table-container">
      <table>
        <thead>
          
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Channel</th>
            <th>Items</th>
            <th>Total Items</th>
            <th>Special Price</th>
          </tr>
          <div className="OfferDiv"></div>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.duration}</td>
              <td>{row.channel}</td>
              <td>
                {row.items.slice(0, 5).join(", ")}
                {row.items.length > 5 && (
                  <span className="extra-items">
                    {" "}
                    +{row.items.length - 5} Items
                  </span>
                )}
              </td>
              <td>{row.totalItems}</td>
              <td>{row.specialPrice}</td>
              <td>:</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
