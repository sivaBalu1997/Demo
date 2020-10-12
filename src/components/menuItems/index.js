import React, { useState } from "react";
import MenuList from "./MenuList";
import Search from "../common/Search";
import Dropdown from "../common/Dropdown";
import foodImage from "../../assets/images/food.png";

const tableData = {
  rows: [
    {
      id: 1,
      Image: `${foodImage}`,
      itemCode: 12345,
      itemType: "non-veg",
      itemName: "Chicken Burger Pizza",
      uom: "Piece",
      price: 35,
      custom: null,
    },
    {
      id: 2,
      Image: `${foodImage}`,
      itemCode: 12345,
      itemType: "non-veg",
      itemName: "Chicken Burger Pizza",
      uom: "Piece",
      price: 35,
      custom: null,
    },
    {
      id: 3,
      Image: `${foodImage}`,
      itemCode: 12345,
      itemType: "veg",
      itemName: "Veg Burger Pizza",
      uom: "Piece",
      price: 35,
      custom: "view",
    },
    {
      id: 4,
      Image: `${foodImage}`,
      itemCode: 12345,
      itemType: "veg",
      itemName: "Veg Burger Pizza",
      uom: "Piece",
      price: 35,
      custom: null,
    },
    {
      id: 5,
      Image: `${foodImage}`,
      itemCode: 12345,
      itemType: "non-veg",
      itemName: "Chicken Burger Pizza",
      uom: "Piece",
      price: 35,
      custom: "view",
    },
    {
      id: 6,
      Image: `${foodImage}`,
      itemCode: 12345,
      itemType: "veg",
      itemName: "Veg Burger Pizza",
      uom: "Piece",
      price: 35,
      custom: "view",
    },
    {
      id: 7,
      Image: `${foodImage}`,
      itemCode: 12345,
      itemType: "non-veg",
      itemName: "Chicken Burger Pizza",
      uom: "Piece",
      price: 35,
      custom: "view",
    },
    {
      id: 8,
      Image: `${foodImage}`,
      itemCode: 12345,
      itemType: "non-veg",
      itemName: "Chicken Burger Pizza",
      uom: "Piece",
      price: 35,
      custom: null,
    },
    {
      id: 9,
      Image: `${foodImage}`,
      itemCode: 12345,
      itemType: "non-veg",
      itemName: "Chicken Burger Pizza",
      uom: "Piece",
      price: 35,
      custom: null,
    },
  ],
};

const foodSelect = [
  { id: 1, option: "South Indian Lunch" },
  { id: 2, option: "North Indian Lunch" },
  { id: 3, option: "Italian Food" },
];

const MenuItems = () => {
  const [selectValue, setSelectValue] = useState(foodSelect.option);

  const handleSelect = (event) => {
    setSelectValue(event.target.value);
  };
  return (
    <div className="menu-items">
      <div className="header-menu">
        <h2>Menu Items</h2>
        <Search />
      </div>
      <div className="drop-list">
        <Dropdown
          color={"#000"}
          data={foodSelect}
          selectValue={selectValue}
          handleSelect={handleSelect}
        />
      </div>
      <MenuList results={tableData.rows} />
    </div>
  );
};

export default MenuItems;
