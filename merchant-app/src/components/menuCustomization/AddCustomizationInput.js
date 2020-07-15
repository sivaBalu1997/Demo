import React, { useState } from "react";
import TextInput from "../common/TextInput";
import { IoIosAdd, IoIosArrowBack } from "react-icons/io";
import "../../styles/customization.scss";
import { Link } from "react-router-dom";
import Button from "../common/Button";

const AddCustomizationInput = () => {
  const [inputField, setInputField] = useState([]);

  const addInput = () => {
    const documents = inputField.concat(AddItem);
    setInputField(documents);
  };
  return (
    <div className="customization-sec">
      <div className="title">
        <Link to="/menuCustomization">
          <IoIosArrowBack />
          <h2>Add Customization</h2>
        </Link>
      </div>
      <form>
        <div className="customize-input">
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
          <button>
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

export default AddCustomizationInput;
