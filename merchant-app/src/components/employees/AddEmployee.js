import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import TextInput from "../common/TextInput";
import CustomDropdown from "../common/customDropdown";
import Switchbox from "../common/Switchbox";
import EmployeeList from "./EmployessList";
import { useDispatch, useSelector } from "react-redux";
import { CREDENTIALS } from "../../shared/constants";
import { getOutlets } from "../../redux/actions/employeeActions";

const roles = [
  "Restaurant_Owner",
  "Restaurant_Manager",
  "System_Admin",
  "Owner",
  "Cashier",
  "Supervisor",
  "Waiter",
  "Host",
  "Employee",
];

const AddEmployee = ({ setAddEmployee }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [list, setList] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  const credentials = useSelector((state) => state.auth.credentials);
  const outlets = useSelector((state) => state.employee.outlets);

  useEffect(() => {
    console.log("MerchantId:", credentials?.merchantId);
    credentials && dispatch(getOutlets(credentials.merchantId));
  }, []);

  useEffect(() => {
    console.log(outlets);
  }, [outlets]);

  const onSubmit = (values) => {
    console.log("Employee details", values);
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="menu-details-form">
              <div className="primary-sec">
                <div>
                  <TextInput
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    placeholder="Phone"
                    name="mobileNumber"
                  />
                </div>
                <div>
                  <CustomDropdown
                    options={roles}
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
                    options={roles}
                    placeholder={"Email"}
                    onSelect={onChange}
                    value={value}
                  />
                </div>
                <div>
                  <CustomDropdown
                    options={Array.from(
                      outlets,
                      (outlet) => outlet.locationName
                    )}
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
