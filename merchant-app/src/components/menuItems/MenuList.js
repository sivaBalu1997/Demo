import React, { useState } from "react";
import eye from "../../assets/images/eye.png";
import veg from "../../assets/images/veg.png";
import nonVeg from "../../assets/images/non-veg.png";
import Switchbox from "../common/Switchbox";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MenuList = ({ results }) => {
  const [isChecked, setToggleTrue] = useState(true);

  const handleSwitch = (id) => {
    setToggleTrue(id);
  };

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
            <tr key={row.id}>
              <td>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </td>
              <td className="eye-icon">
                <img src={eye} alt="eye" />
              </td>
              <td>
                <img src={row.Image} alt="eye" />
              </td>
              <td>{row.itemCode}</td>
              <td className="item-type">
                <img src={row.itemType === "veg" ? veg : nonVeg} alt="veg" />
                {row.itemName}
              </td>
              <td>{row.uom}</td>
              <td>$ {row.price}</td>
              <td>
                <Switchbox isChecked={isChecked} handleSwitch={handleSwitch} />
              </td>
              <td className="custom">{row.custom}</td>
              <td className="edit-icon">
                <FaEdit />
              </td>
              <td className="trash-icon">
                <FaTrashAlt />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default MenuList;
