import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import CustomDropdown from "../common/customDropdown";
import Switchbox from "../common/Switchbox";
import EmployeeList from "./EmployessList";

const options = ["chef", "restaurant"];

const AddEmployee = ({ setAddEmployee }) => {
  const [value, setValue] = useState("");
  const [list, setList] = useState(false);

  const onChange = (option) => {
    setValue(option);
  };
  return (
    <>
      {list === false ? (
        <div className="menu-details">
          <div onClick={() => setAddEmployee(false)} className="title">
            <h2>
              {" "}
              <IoIosArrowBack /> Add Employee
            </h2>
          </div>
          <form>
            <div className="menu-details-form">
              <div className="primary-sec">
                <div>
                  <TextInput type="text" placeholder="First Name" />
                </div>
                <div>
                  <TextInput type="text" placeholder="Phone" />
                </div>
                <div>
                  <CustomDropdown
                    options={options}
                    placeholder={"Assign Role"}
                    onSelect={onChange}
                    value={value}
                  />
                </div>
                <div className="acess-flex">
                  <p>User Access</p>
                  <Switchbox />{" "}
                  <TextInput type="number" placeholder="Create PIN" />
                </div>
                <div>
                  <TextInput type="number" placeholder="User ID" />
                </div>
                <div>
                  <TextInput type="password" placeholder="Create password" />
                </div>
              </div>
              <div className="primary-sec">
                <div>
                  <TextInput type="text" placeholder="Last Name" />
                </div>
                <div>
                  <CustomDropdown
                    options={options}
                    placeholder={"Email"}
                    onSelect={onChange}
                    value={value}
                  />
                </div>
                <div>
                  <CustomDropdown
                    options={options}
                    placeholder={"Assign Outlet"}
                    onSelect={onChange}
                    value={value}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="form-cta">
            <Button
              value={"Cancel"}
              backgroundColor={"#fff"}
              color={"#979797"}
            />
            <Button
              type={"submit"}
              value={"Save"}
              backgroundColor={"#67833E"}
              color={"#fff"}
              onClick={() => setList(true)}
            />
          </div>
        </div>
      ) : (
        <EmployeeList setList={() => setList(false)} />
      )}
    </>
  );
};

export default AddEmployee;
