import React, { useState } from "react";
import TextInput from "../../components/common/TextInput";
import { IoIosAdd, IoIosArrowBack } from "react-icons/io";
import "../../styles/customization.scss";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import SidePanel from "pages/SidePanel/indexOld";

const AddCustomizationInput = () => {
  const [groupField, setGroupField] = useState([]);

  const addGroupInput = () => {
    const documents = groupField.concat(AddGroup);
    setGroupField(documents);
  };

  return (
   <div style={{display:'flex', flexDirection:'row'}}>
    <SidePanel />
     <div className="customization-sec">
      <div className="title">
        <Link to="/menuCustomization">
          <IoIosArrowBack />
          <h2>Add Customization</h2>
        </Link>
      </div>
      <form>
        <div className="customize-input">
          {groupField.map((Element, index) => {
            return (
              <div className="sub-item">
                <Element key={index} index={index} />
              </div>
            );
          })}
          <AddGroup />
          <button type="button" onClick={() => addGroupInput()}>
            {" "}
            <IoIosAdd /> Add Group
          </button>
        </div>
        <div className="form-cta">
          <Link to="/">
            <Button
              value={"Cancel"}
              backgroundColor={"#fff"}
              color={"#979797"}
            />
          </Link>
          <Link to="/review">
            <Button
              type={"submit"}
              value={"Review The menu"}
              backgroundColor={"#FF5554"}
              color={"#fff"}
            />
          </Link>
        </div>
      </form>
    </div>
   </div>
  );
};

const AddItem = () => (
  <React.Fragment>
    <div>
      <TextInput
        type={"text"}
        placeholder={"Item"}
        // value={"Item Price"}
        name="price"
      />
    </div>
    <TextInput
      type={"text"}
      placeholder={"Price"}
      // value={"Item Price"}
      name="price"
    />
  </React.Fragment>
);

const AddGroup = () => {
  const [inputField, setInputField] = useState([]);

  const addInput = () => {
    const documents = inputField.concat(AddItem);
    setInputField(documents);
  };
  return (
    <React.Fragment>
      <div className="add-group">
        <TextInput
          type={"text"}
          placeholder={"Group"}
          // value={"Item Price"}
          name="price"
        />
      </div>
      <div className="add-item">
        <div>
          {inputField.map((Element, index) => {
            return (
              <div className="sub-item">
                <Element key={index} index={index} />
              </div>
            );
          })}
          <div className="sub-item">
            <AddItem inputField={inputField} />
          </div>
        </div>
        <button type="button" onClick={() => addInput()}>
          {" "}
          <IoIosAdd /> Add Item
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddCustomizationInput;
