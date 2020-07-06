import React, { useState } from "react";
import TextInput from "../common/TextInput";
import Dropdown from "../common/Dropdown";
import "../../styles/menuDetail.scss";
import { IoIosAdd, IoIosInformationCircleOutline } from "react-icons/io";
import Button from "../common/Button";
import { Link } from "react-router-dom";

const menuCategory = [
  { id: 1, option: "South Indian Lunch" },
  { id: 2, option: "North Indian Lunch" },
  { id: 3, option: "Italian Food" },
];

const MenuDetials = () => {
  const [selectValue, setSelectValue] = useState(menuCategory.option);

  const handleSelect = (event) => {
    setSelectValue({
      value: event.target.value,
    });
  };
  return (
    <div className="menu-details">
      <h2>Menu Details</h2>
      <form>
        <div className="menu-details-form">
          <div className="primary-sec">
            <h3>Primary Deatils</h3>
            <TextInput
              type={"text"}
              placeholder={"Item Code"}
              // value={"Item Code"}
              name="code"
            />
            <Dropdown
              color={"#979797"}
              data={menuCategory}
              selectValue={selectValue}
              handleSelect={handleSelect}
            />
            <TextInput
              type={"text"}
              placeholder={"Item Price"}
              // value={"Item Price"}
              name="price"
            />
            <div className="upload-sec">
              <div class="upload-btn-wrapper">
                <div className="file-add">
                  <IoIosAdd />
                  <p>Add Image</p>
                </div>
                <input type="file" name="myfile" />
              </div>
              <div className="upload-des">
                <p>
                  {" "}
                  <IoIosInformationCircleOutline />
                  Add higher resolution images for better view{" "}
                </p>
              </div>
            </div>
            <h3>Other Deatils</h3>
            <Dropdown
              color={"#979797"}
              data={menuCategory}
              selectValue={selectValue}
              handleSelect={handleSelect}
            />
            <Dropdown
              color={"#979797"}
              data={menuCategory}
              selectValue={selectValue}
              handleSelect={handleSelect}
            />
            <TextInput
              type={"text"}
              placeholder={"Calorie Point"}
              // value={"Item Price"}
              name="calorie"
            />
            <Dropdown
              color={"#979797"}
              data={menuCategory}
              selectValue={selectValue}
              handleSelect={handleSelect}
            />
            <Dropdown
              color={"#979797"}
              data={menuCategory}
              selectValue={selectValue}
              handleSelect={handleSelect}
            />
            <TextInput
              type={"text"}
              placeholder={"Maximum Count For Online"}
              // value={"Item Price"}
              name="price"
            />
            <Dropdown
              color={"#979797"}
              data={menuCategory}
              selectValue={selectValue}
              handleSelect={handleSelect}
            />
          </div>
          <div className="secondary-sec">
            <TextInput
              type={"text"}
              placeholder={"Maximum Count For Online"}
              // value={"Item Price"}
              name="price"
            />
            <Dropdown
              color={"#979797"}
              data={menuCategory}
              selectValue={selectValue}
              handleSelect={handleSelect}
            />
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              rows="4"
              cols="50"
            ></textarea>
            <Dropdown
              color={"#979797"}
              data={menuCategory}
              selectValue={selectValue}
              handleSelect={handleSelect}
            />
          </div>
        </div>
        <div className="form-cta">
          <Link to="/">
            <Button
              value={"Cancel"}
              backgroundColor={"#fff"}
              color={"#979797"}
            />
          </Link>
          <Link to="/menulist">
            <Button
              type={"submit"}
              value={"Add Customization"}
              backgroundColor={"#FF5554"}
              color={"#fff"}
            />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default MenuDetials;
