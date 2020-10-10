import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import Button from "../common/Button";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../common/TextInput";
import CustomDropdown from "../common/customDropdown";
import Switchbox from "../common/Switchbox";
import EmployeeList from "./EmployessList";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  getOutlets,
  resetAddEmployee,
} from "../../redux/actions/employeeActions";

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
  const [list, setList] = useState(false);
  const [outlet, setOutlet] = useState("");
  const [pinEnabled, setPinEnabled] = useState(false);
  const [role, setRole] = useState("");
  const {
    handleSubmit,
    register,
    errors,
    setValue,
    getValues,
    control,
    formState,
  } = useForm();
  const credentials = useSelector((state) => state.auth.credentials);
  const employeeAdded = useSelector((state) => state.employee.employeeAdded);
  const addEmployeeMessage = useSelector(
    (state) => state.employee.addEmployeeMessage
  );
  const addEmployeeLoading = useSelector(
    (state) => state.employee.addEmployeeLoading
  );

  const outlets = useSelector((state) => state.employee.outlets);

  useEffect(() => {
    console.log("MerchantId:", credentials?.merchantId);
    credentials && dispatch(getOutlets(credentials.merchantId));
  }, []);

  useEffect(() => {
    if (!addEmployeeLoading && employeeAdded) {
      console.log("Employee Added");
      dispatch(resetAddEmployee());
      setAddEmployee(false);
    }
  }, [addEmployeeLoading, employeeAdded]);

  const onSubmit = (formValues) => {
    formValues["fullName"] = formValues.firstName + " " + formValues.lastName;
    formValues["businessName"] = credentials.businessName;
    formValues["merchantId"] = credentials.merchantId;

    if (!pinEnabled) {
      formValues["devicePin"] = "";
    }

    delete formValues["firstName"];
    delete formValues["lastName"];
    console.log("Employee details", formValues);
    dispatch(addEmployee(formValues));
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
                    refRegister={register({
                      required: "Required",
                    })}
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    placeholder="Phone"
                    name="mobileNumber"
                    refRegister={register()}
                  />
                </div>
                <div>
                  <Controller
                    control={control}
                    name="role"
                    defaultValue={""}
                    // rules={{ required: true }}
                    render={({ onChange, onBlur, value, name }) => (
                      <CustomDropdown
                        options={roles}
                        placeholder={"Assign Role"}
                        onSelect={(role) => {
                          console.log("Role Changed:", role.value);
                          onChange(role.value);
                        }}
                        value={value}
                        name={name}
                      />
                    )}
                  />
                </div>
                <div className="acess-flex">
                  <p>User Access</p>
                  <Switchbox
                    isChecked={pinEnabled}
                    handleSwitch={() => setPinEnabled(!pinEnabled)}
                  />{" "}
                  <TextInput
                    type="text"
                    placeholder="Create PIN"
                    name="devicePin"
                    refRegister={register()}
                    disabled={!pinEnabled}
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    placeholder="User ID"
                    name="userId"
                    refRegister={register({
                      required: "Required",
                    })}
                  />
                </div>
                <div>
                  <TextInput
                    type="password"
                    placeholder="Create password"
                    name="password"
                    refRegister={register({
                      required: "Required",
                    })}
                  />
                </div>
              </div>
              <div className="primary-sec">
                <div>
                  <TextInput
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    refRegister={register()}
                  />
                </div>
                <div>
                  <TextInput
                    type="email"
                    placeholder="Email"
                    name="email"
                    refRegister={register()}
                  />
                </div>
                <div>
                  <Controller
                    control={control}
                    name="locationId"
                    defaultValue={""}
                    rules={{ required: true }}
                    render={({ onChange, onBlur, value, name }) => (
                      <CustomDropdown
                        options={Array.from(
                          outlets,
                          (outlet) => outlet.locationName
                        )}
                        placeholder={"Assign Outlet"}
                        onSelect={(outletSelected) => {
                          const outletObject = outlets.filter(
                            (outlet) =>
                              outlet.locationName == outletSelected.value
                          );
                          onChange(outletObject[0].id);
                        }}
                        value={outlet}
                        name={name}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="form-cta">
              <span style={{ border: 0, color: "tomato", marginRight: 100 }}>
                {addEmployeeMessage}
              </span>
              <span
                onClick={() => {
                  console.log("Cancelling");
                  setAddEmployee(false);
                }}
              >
                <Button
                  value={"Cancel"}
                  type="reset"
                  backgroundColor={"#fff"}
                  color={"#979797"}
                />
              </span>
              <Button
                type="submit"
                value="Save"
                backgroundColor={"#67833E"}
                color={"#fff"}
                onClick={() => {
                  console.log(errors);
                }}
              />
            </div>
          </form>
        </div>
      ) : (
        <EmployeeList setList={() => setList(false)} />
      )}
    </>
  );
};

export default AddEmployee;
