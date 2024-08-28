import React, { useState } from "react";
import CustomDropdown from "../../components/common/customDropdown";
import logo from "../../assets/images/logo.png";
import upload from "../../assets/images/upload.png";
import "../../styles/auth.scss";
import TextInput from "../../components//common/TextInput";
import { Link } from "react-router-dom";

const options = ["Main Outlet", "Middle Outlet", "Triangle"];
const optionsTwo = ["Currency", "Middle Outlet", "Triangle"];

const BasicDetails = () => {
  const [defaultOptions, setDefaultOptions] = useState("Main Outlet");
  const [defaultOptionsTwo, setDefaultOptionsTwo] = useState("Currency");

  const onSelect = (option) => {
    setDefaultOptions(option);
  };

  const onSelectNext = (option) => {
    setDefaultOptionsTwo(option);
  };
  return (
    <div className="basic_details">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <h3>Welcome Enter Your basic Details</h3>
      <form>
        <div className="upload-sec">
          <img src={upload} alt="upload" />
          <h4>Upload Image</h4>
        </div>
        <TextInput type="text" placeholder="Your Name" />
        <TextInput type="text" placeholder="Restaurant / Hotel Name" />
        <div>
          <CustomDropdown
            options={options}
            value={defaultOptions}
            onSelect={onSelect}
          />
        </div>
        <div>
          <CustomDropdown
            options={optionsTwo}
            value={defaultOptionsTwo}
            onSelect={onSelectNext}
          />
        </div>
        <button type="submit">
          <Link to="/business">Save</Link>
        </button>
      </form>
    </div>
  );
};

export default BasicDetails;
