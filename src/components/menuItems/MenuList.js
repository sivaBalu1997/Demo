import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import eye from "../../assets/images/eye.png";
import closeEye from "../../assets/images/eye_close.png";
import veg from "../../assets/images/veg.png";
import nonVeg from "../../assets/images/non-veg.png";
import Switchbox from "../common/Switchbox";

const MenuList = ({ results }) => {
  return (
    <div className="menu-list">
      <table width="100%">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Image</th>
            <th>Item Code </th>
            <th>Item Name </th>
            <th>UOM</th>
            <th>Price</th>
            <th>Online</th>
            <th>Custom</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        {results.map((row) => {
          return (
            <MenuView
              key={row.id}
              Image={row.Image}
              itemCode={row.itemCode}
              itemType={row.itemType}
              itemName={row.itemName}
              uom={row.uom}
              price={row.price}
              custom={row.custom}
            />
          );
        })}
      </table>
    </div>
  );
};

const MenuView = ({
  Image,
  itemCode,
  itemName,
  itemType,
  uom,
  price,
  custom,
}) => {
  const [isChecked, setToggleTrue] = useState(true);
  return (
    <tr style={{ opacity: isChecked === true ? "unset" : "0.5" }}>
      <td>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
      </td>
      <td className="eye-icon">
        <img
          onClick={() => setToggleTrue(!isChecked)}
          src={isChecked === true ? eye : closeEye}
          alt="eye"
        />
      </td>
      <td>
        <img src={Image} alt="eye" />
      </td>
      <td>{itemCode}</td>
      <td className="item-type">
        <img src={itemType === "veg" ? veg : nonVeg} alt="veg" />
        {itemName}
      </td>
      <td>{uom}</td>
      <td>$ {price}</td>
      <td>
        <Switchbox
          isChecked={isChecked}
          handleSwitch={() => setToggleTrue(!isChecked)}
        />
      </td>
      <td className="custom">{custom}</td>
      <td className="edit-icon">
        <FaEdit />
      </td>
      <td className="trash-icon">
        <FaTrashAlt />
      </td>
    </tr>
  );
};

export default MenuList;
