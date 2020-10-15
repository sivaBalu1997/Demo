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
  setEmployeeDetailsLoading,
} from "../../redux/actions/employeeActions";
import { useHistory } from "react-router";

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

const AddEmployee = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [list, setList] = useState(false);
  //const [outlet, setOutlet] = useState([]);
  const [pinEnabled, setPinEnabled] = useState(false);
  //const [role, setRole] = useState("");
  const {
    handleSubmit,
    register,
    errors,
    setValue,
    getValues,
    control,
    formState,
    watch
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

  const watchUserId = watch("userId");
  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");

  useEffect(() => {
    console.log("MerchantId:", credentials?.merchantId);
    credentials && dispatch(getOutlets(credentials.merchantId));
  }, []);

  useEffect(() => {
    if (!addEmployeeLoading && employeeAdded) {
      dispatch(resetAddEmployee());
      history.replace("/management/employees");
    }
  }, [addEmployeeLoading, employeeAdded]);

  useEffect(() => {
    if(getValues("userId") === " ") {
      setValue("userId", "");
    }
    if (addEmployeeMessage !== "") {
      dispatch(resetAddEmployee());
    }
  }, [watchUserId]);

  useEffect(() => {
    let name = getValues("firstName").replace(/[^A-Za-z ]/g, "");
    var splitted = name.split(" ");
    // console.log("Input Splitted: ", splitted);

    if (
      splitted.every((name) => {
        return name == "";
      })
    ) {
      setValue("firstName", "");
    } else {
      if (splitted.length > 0) {
        for (var i = 0; i < splitted.length; i++) {
          if (splitted[i].length === 1) {
            //   console.log("one Len");
            splitted[i] = splitted[i].charAt(0).toUpperCase();
          } else {
            splitted[i] =
              splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1);
          }
        }
        name = splitted.join(" ");
        // console.log("Output: ", name);
        setValue("firstName", name);
      }
    }
  },[watchFirstName]);

  useEffect(() => {
    let name = getValues("lastName").replace(/[^A-Za-z ]/g, "");
    var splitted = name.split(" ");
    // console.log("Input Splitted: ", splitted);

    if (
      splitted.every((name) => {
        return name == "";
      })
    ) {
      setValue("lastName", "");
    } else {
      if (splitted.length > 0) {
        for (var i = 0; i < splitted.length; i++) {
          if (splitted[i].length === 1) {
            //   console.log("one Len");
            splitted[i] = splitted[i].charAt(0).toUpperCase();
          } else {
            splitted[i] =
              splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1);
          }
        }
        name = splitted.join(" ");
        // console.log("Output: ", name);
        setValue("lastName", name);
      }
    }
  },[watchLastName]);

  const onSubmit = (formValues) => {
    formValues["fullName"] = formValues.firstName + " " + formValues.lastName;
    formValues["businessName"] = credentials.businessName;
    formValues["merchantId"] = credentials.merchantId;
    formValues["locationId"] = outlets.find((outlet) => outlet.locationName.includes(formValues["outlet"])).id;

    if (!pinEnabled) {
      formValues["devicePin"] = "";
    }

    delete formValues["firstName"];
    delete formValues["lastName"];
    delete formValues["outlet"];
    
    console.log("Employee details", formValues);
    dispatch(addEmployee(formValues));
  };

  return (
    <>
      {list === false ? (
        <div className="menu-details">
          <div onClick={() => history.replace("/management/employees")} className="title">
            <h2>
              {" "}
              <IoIosArrowBack /> Add Employee
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="menu-details-form">
              <div className="primary-sec">
                {errors.firstName?.type === "required" &&
                  <p className="error-msg">First Name Required</p>
                }
                <div>
                  <TextInput
                    type="text"
                    placeholder="First Name"
                    maxLength={15}
                    name="firstName"
                    refRegister={register({
                      required: "Required",
                    })}
                    className={"add-employee-text-input"}
                  />
                </div>
                <div>
                  <TextInput
                    type="number"
                    placeholder="Phone"
                    name="mobileNumber"
                    refRegister={register()}
                    className={"add-employee-text-input"}
                    min={0}
                  />
                </div>
                {errors.role?.type === "required" &&
                  <p className="error-msg">Role Required</p>
                }
                <div
                style={{cursor: 'pointer'}}>
                  <Controller
                    control={control}
                    name="role"
                    defaultValue={""}
                    rules={{ required: true }}
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
                        controlClassName={"add-employee-dropdown"}
                        arrowClassName={"add-employee-dropdown-arrow"}
                      />
                    )}
                  />
                </div>
                <div className="acess-flex"
                  style={{ marginTop: 30 }}>
                  <p>User Access</p>
                  <Switchbox
                    isChecked={pinEnabled}
                    handleSwitch={() => setPinEnabled(!pinEnabled)}
                  />{" "}
                  <TextInput
                    type="number"
                    placeholder="Create PIN"
                    name="devicePin"
                    refRegister={register()}
                    disabled={!pinEnabled}
                    maxLength={4}
                    minLength={4}
                    min={0}
                    className={"add-employee-text-input"}
                  />
                </div>
                {errors.userId?.type === "required" &&
                  <p className="error-msg">User Id Required</p>
                }
                <div>
                  <TextInput
                    type="text"
                    placeholder="User ID"
                    name="userId"
                    refRegister={register({
                      required: "Required",
                    })}
                    className={"add-employee-text-input"}
                  />
                </div>

                {errors.password?.type === "required" &&
                  <p className="error-msg">Password Required</p>
                }
                <div>
                  <TextInput
                    type="password"
                    placeholder="Create password"
                    minLength={6}
                    name="password"
                    refRegister={register({
                      required: "Required",
                    })}
                    className={"add-employee-text-input"}
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
                    className={"add-employee-text-input"}
                    maxLength={15}
                  />
                </div>
                <div>
                  <TextInput
                    type="email"
                    placeholder="Email"
                    name="email"
                    refRegister={register()}
                    className={"add-employee-text-input"}
                  />
                </div>
                {errors.outlet?.type === "required" && <p className="error-msg">Please Select Your Outlet</p>}
                <div
                style={{cursor: 'pointer'}}>
                  <Controller
                    control={control}
                    name="outlet"
                    defaultValue={""}
                    rules={{ required: true }}
                    render={({ onChange, onBlur, value, name }) => (
                      <CustomDropdown
                        options={Array.from(
                          outlets,
                          (outlet) => outlet.locationName.split(",")[1]
                        )}
                        placeholder={"Assign Outlet"}
                        onSelect={(outletSelected) => {
                          console.log("outlet Changed:", outletSelected.value);
                          const outletObject = outlets.find(
                            (outlet) =>
                              outlet.locationName.includes(outletSelected.value)
                          );
                          onChange(outletObject.locationName.split(",")[1]);
                        }}
                        value={value}
                        name={name}
                        controlClassName={"add-employee-dropdown"}
                        arrowClassName={"add-employee-dropdown-arrow"}
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
                  history.replace("/management/employees");
                }}
              >
                <Button
                  value={"Cancel"}
                  type="reset"
                  backgroundColor={"#fff"}
                  color={"#979797"}
                />
              </span>
              <span
                onClick={() => {
                  console.log(errors, "errors");
                }}
              >
                <Button
                  type="submit"
                  value="Save"
                  backgroundColor={"#67833E"}
                  color={"#fff"}
                />
              </span>
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
