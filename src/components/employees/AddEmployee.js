import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../common/Button";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../common/TextInput";
import CustomDropdown from "../common/customDropdown";
import Switchbox from "../common/Switchbox";
import EmployeeList from "./EmployessList";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from '../../assets/svg/calendar.svg'
import {
  addEmployee,
  getOutlets,
  resetAddEmployee,
  setEmployeeDetailsLoading,
  updateEmployeePIN,
  updateEmployeeClear,
} from "../../redux/actions/employeeActions";
import { useHistory } from "react-router";

import { ReactComponent as OpenEyeIcon } from "../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/svg/closed_eye.svg";
import dropArrow from '../../assets/svg/dropArrow.svg'
import { empRrole } from "./data";
import { checkInFunctions } from "./data";
import { menuFunctions } from "./data";
import { serviceFunctions } from "./data";
import { otherFunctions } from "./data";
import ReactDatePicker from "react-datepicker";
 

const AddEmployee = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [list, setList] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isOutletDropdownOpen, setIsOutletDropdownOpen] = useState(false)
  const [isRoleDropDownOpen, setIsRoleDropDownOpen] = useState(false)
  const [role, setRole] = useState('')
  const [openFunction, setOpenFuction] = useState(false)
  //const [outlet, setOutlet] = useState([]);
  const [pins, setPins] = useState(['', '', '', '']);
  const [showPin, setShowPin] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const inputRefs = useRef([]);
  const editEmployeeData = useSelector(
    (state) => state.employee.editEmployeeData
  )

  const editEmployee = editEmployeeData && {
    firstName: editEmployeeData.name.split(" ")[0],
    lastName: editEmployeeData.name.split(" ")[1],
    mobileNumber: editEmployeeData.mobileNumber,
    location: editEmployeeData.locationName.split(", ")[1],
    email: editEmployeeData.email,
    devicePin: editEmployeeData.devicePin,
  }
  const [pinEnabled, setPinEnabled] = useState(editEmployee ? true : false);
  //const [role, setRole] = useState("");

  const {
    handleSubmit,
    register,
    errors,
    setValue,
    getValues,
    control,
    formState,
    watch,
  } = useForm();

  const [pin, setPin] = useState(
    editEmployee ? editEmployee.devicePin : getValues("devicePin")
  );

  const credentials = useSelector((state) => state.auth.credentials);
  const employeeAdded = useSelector((state) => state.employee.employeeAdded);
  const updatePinMessage = useSelector(
    (state) => state.employee.updateEmployeePINMessage
  );
  const updatePinLoading = useSelector(
    (state) => state.employee.updateEmployeePINLoading
  );
  const updatePinSuccess = useSelector(
    (state) => state.employee.updateEmployeePINSuccess
  );
  const updatePinFailed = useSelector(
    (state) => state.employee.updateEmployeePINFailed
  );
  const addEmployeeMessage = useSelector(
    (state) => state.employee.addEmployeeMessage.updateEmployeePINMessage
  );
  const addEmployeeLoading = useSelector(
    (state) => state.employee.addEmployeeLoading
  );
  const outlets = useSelector((state) => state.employee.outlets);

  const watchUserId = watch("userId");
  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");
  const [isPasswordVisible, SetIsPasswordVisible] = useState(false);

  useEffect(() => {
    //console.log("MerchantId:", credentials?.merchantId);
    credentials && dispatch(getOutlets(credentials.merchantId));
  }, []);

  useEffect(() => {
    if (!updatePinLoading && updatePinFailed && updatePinMessage) {
      alert(updatePinMessage);
      // history.goBack();
      dispatch(updateEmployeeClear());
    }

    if (!updatePinLoading && updatePinSuccess && updatePinMessage) {
      alert(updatePinMessage);
      history.goBack();
      dispatch(updateEmployeeClear());
    }
  }, [updatePinLoading, updatePinFailed, updatePinMessage, updatePinSuccess]);
  const getRole = () => {
    let neighbourhoodDeliveryRole = [
      "Operator-neighbourhood",
      "Branch manager-neighbourhood",
      "Regional manager-neighbourhood",
      "Owner-neighbourhood",
      "Delivery-neighbourhood",
    ];
    if (
      credentials?.accessToken &&
      neighbourhoodDeliveryRole.includes(
        jwt_decode(credentials?.accessToken).resource_access["merchant-app"]
          .roles[0]
      )
    ) {
      return [
        "Branch Manager",
        "Regional Manager",
        "Operator",
        "Owner",
        "Delivery",
      ];
    } else {
      return [
        "Chef",
        "Restaurant_Owner",
        "Restaurant_Manager",
        "System_Admin",
        "Supervisor",
        "Waiter",
        "Host",
        "Delivery",
      ];
    }
  };
  useEffect(() => {
    if (!addEmployeeLoading && employeeAdded) {
      dispatch(resetAddEmployee());
      history.replace("/management/employees");
    }
  }, [addEmployeeLoading, employeeAdded]);

  useEffect(() => {
    if (getValues("userId") === " ") {
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
        // console.log("Output: ", name)
        setValue("firstName", name)
      }
    }
  }, [watchFirstName])

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
  }, [watchLastName]);

  const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet.locationName.split(",")[1]);
    setIsOutletDropdownOpen(false);
  } 

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setIsRoleDropDownOpen(false);
  } 

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pins];
      newPin[index] = value;
      setPins(newPin);
      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pins[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const toggleShowPin = () => {
    setShowPin(!showPin);
  }


  const onSubmit = (formValues) => {
    let pin = formValues.devicePin;
    formValues["fullName"] = formValues.firstName + " " + formValues.lastName;
    formValues["businessName"] = credentials.businessName;
    formValues["merchantId"] = credentials.merchantId;
    formValues["locationId"] = outlets.find((outlet) =>
      outlet.locationName.includes(formValues["outlet"])
    ).id;
    if (!pinEnabled) {
      formValues["devicePin"] = "";
    }

    delete formValues["firstName"];
    delete formValues["lastName"];
    delete formValues["outlet"];
    //console.log("Employee details", formValues);

    if (editEmployee) {
      dispatch(updateEmployeePIN({ id: editEmployeeData.id, pin: pin }));
    } else {
      dispatch(addEmployee(formValues));
    }
  }

  console.log("Error :", errors.role?.type)

  return (
    <>
      {list === false ? (
        <div className="menu-details">
          <div
            onClick={() => history.replace("/management/employees")}
            className="title"
          >
            <h2>
              {" "}
              <IoIosArrowBack />{" "}
              {editEmployeeData ? "Edit Employee Setup" : "Add Employee Setup"}
            </h2>
          </div>
          <h3>Personal Info</h3>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="menu-details-form">
              <div className="primary-sec">
                <div className="flexContainer">
                  {/* {errors.firstName?.type === "required" && (
                    <p className="error-msg">First Name Required</p>
                  )} */}
                  <div>
                    <TextInput
                      type="text"
                      placeholder={"First Name*" }
                      maxLength={15}
                      name="firstName"
                      refRegister={register({
                        required: !editEmployee && "Required",
                      })}
                      className={errors.firstName?.type === "required" ? 'fN errorInput' :'add-employee-text-input'}
                      value={editEmployee ? editEmployee.firstName : null}
                      disabled={editEmployee && editEmployee.firstName}
                    />
                  </div>
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      refRegister={register()}
                      className={"add-employee-text-input"}
                      maxLength={15}
                      value={editEmployee ? editEmployee.lastName : null}
                      // disabled={editEmployee && editEmployee.lastName}
                      disabled={editEmployee}
                    />
                  </div>
                </div>

                <div>
                  <TextInput
                    type="text"
                    placeholder="Nick Name"
                    name="nickName"
                    refRegister={register()}
                    className={"inputBox"}
                    maxLength={15}
                    // value={editEmployee ? editEmployee.nickName : null}
                    // disabled={editEmployee && editEmployee.lastName}
                    disabled={editEmployee}
                  />
                </div>

                <div className="checkBox">
                  <label> 
                    <input type="checkbox" className="checkbox" />  
                    <p>Utilize a nickname as needed in all forthcoming activities</p>
                  </label>
                </div>

                <div className="flexContainer">
                  <div>
                    <TextInput
                      type="number"
                      placeholder="Phone"
                      name="mobileNumber"
                      refRegister={register({
                        required: !editEmployee && "Required",
                      })}
                      className={errors.mobileNumber?.type === "required" ? 'num errorInput' :'add-employee-text-input'}
                      min={0}
                      value={editEmployee ? editEmployee.mobileNumber : null}
                      // disabled={editEmployee && editEmployee.mobileNumber}
                      disabled={editEmployee}
                    />
                  </div>
                  <div>
                    <TextInput
                      type="email"
                      placeholder="Email"
                      name="email"
                      refRegister={register()}
                      className={"add-employee-text-input"}
                      value={editEmployee ? editEmployee.email : null}
                      // disabled={editEmployee && editEmployee.email}
                      disabled={editEmployee}
                    />
                  </div>
                </div>

                <div>
                  <TextInput
                    type="text"
                    placeholder="Address Line 1"
                    name="address1"
                    // refRegister={register()}
                    className={"inputBox"}
                    // value={editEmployee ? editEmployee.address : null}
                    // disabled={editEmployee && editEmployee.email}
                    disabled={editEmployee}
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    placeholder="Address Line 2"
                    name="address2"
                    // refRegister={register()}
                    className={"inputBox"}
                    // value={editEmployee ? editEmployee.address : null}
                    // disabled={editEmployee && editEmployee.email}
                    disabled={editEmployee}
                  />
                </div>

                <div className="flexContainer">
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Education"
                      name="education"
                      // refRegister={register()}
                      className={"add-employee-text-input"}
                      // value={editEmployee ? editEmployee.address : null}
                      // disabled={editEmployee && editEmployee.email}
                      disabled={editEmployee}
                    />
                  </div>
                  <div>
                    {/* <TextInput
                      type="date"
                      placeholder="Date of birth"
                      name="DOB"
                      // refRegister={register()}
                      className={"dateInput"}
                      // value={editEmployee ? editEmployee.address : null}
                      // disabled={editEmployee && editEmployee.email}
                      disabled={editEmployee}
                    /> */}
                    <DatePicker 
                      placeholderText="DOB" 
                      value={null} 
                      name="DOB" 
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      className={"dateInput"} 
                      disabled={editEmployee} 
                      yearDropdownItemNumber={15} 
                      scrollableYearDropdown
                    />
                  </div>
                </div>
                <hr style={{marginRight:'40px'}}/>
                
                <h3>Formal Setup*</h3>
                <div className="flexContainer">
                {/* {errors.outlet?.type === "required" && (
                  <p className="error-msg">Outlet Required</p>
                )} */}
                <div className={errors.outlet?.type ? 'errorCustomInput' :'selectContainer'} style={{ cursor: "pointer" }}>
                  <div>
                    <Controller
                      control={control}
                      name="outlet"
                      defaultValue={""}
                      refRegister={register({
                        required: !editEmployee && "Required",
                      })}
                      rules={{
                        // required: true
                        required: !editEmployee && "Required",
                      }}
                      render={({ onChange, onBlur, value, name }) => (
                        <CustomDropdown
                          options={Array.from(
                            outlets,
                            (outlet) => outlet.locationName.split(",")[1]
                          )}
                          placeholder={"Assign Outlet"}
                          onSelect={(outletSelected) => {
                            //console.log("outlet Changed:", outletSelected.value);
                            const outletObject = outlets.find((outlet) =>
                              outlet.locationName.includes(outletSelected.value)
                            );
                            onChange(outletObject.locationName.split(",")[1])
                          }}
                          value={editEmployee ? editEmployee.location : value}
                          name={name}
                          controlClassName={
                            editEmployee
                              ? "disabled-dropdown add-employee-dropdown"
                              : "add-employee-dropdown"
                          }
                          arrowClassName={"add-employee-dropdown-arrow"}
                          placeholderClass={"dropDown"}

                          disabled={editEmployee}
                        />
                      )}
                    />
                  </div>
                </div>
                
                <div className={errors.role?.type  ? 'errorCustomInput' : "selectContainer" } style={{ cursor: "pointer" }}>
                  <Controller
                    control={control}
                    name="role"
                    defaultValue={""}
                    rules={{
                      // required: true
                      required: !editEmployee && "Required",
                    }}
                    render={({ onChange, onBlur, value, name }) => (
                      <CustomDropdown
                        options={getRole()}
                        placeholder={"Assign Role"}
                        onSelect={(role) => {
                          onChange(role.value);
                          if (
                            jwt_decode(
                              credentials?.accessToken
                            ).resource_access[
                              "merchant-app"
                            ].roles[0].includes("neighbourhood")
                          )
                            onChange(role.value + "-neighbourhood");
                        }}
                        value={value}
                        name={name}
                        placeholderClass={"dropDown"}
                        controlClassName={"add-employee-dropdown"}
                        arrowClassName={"add-employee-dropdown-arrow"}
                        disabled={editEmployee}
                      />
                    )}
                  />
                  {openFunction && 
                  <div className="functionsDropDown">
                    <p style={{textAlign:'center', fontWeight:600}}>Roles/Function</p>
                    <div className="checkBoxContainer">
                      <div className="checkboxList">
                        {checkInFunctions.map((data) => (
                          <div className="checkBoxItem" key={data}>
                            <label>
                              <input type="checkbox" className="checkbox" />
                              <p>{data}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className="checkboxList">
                        {menuFunctions.map((data) => (
                          <div className="checkBoxItem" key={data}>
                            <label>
                              <input type="checkbox" className="checkbox" />
                              <p>{data}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className="checkboxList">
                        {serviceFunctions.map((data) => (
                          <div className="checkBoxItem" key={data}>
                            <label>
                              <input type="checkbox" className="checkbox" />
                              <p>{data}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className="checkboxList">
                        {otherFunctions.map((data) => (
                          <div className="checkBoxItem" key={data}>
                            <label>
                              <input type="checkbox" className="checkbox" />
                              <p>{data}</p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="functionBtn">
                      <input className="saveBtn" type="button" value="Save" /> 
                      <input className="resetbtn" type="button" value="Reset" />
                    </div>
                  </div>
                  }
                  <div className="roleFunction">
                    <p onClick={()=>setOpenFuction(!openFunction)}>Edit Roles/Functions</p>
                  </div>  
                </div>
              </div>


              <div className="flexContainer">
              {/* {errors.userId?.type === "required" && (
                  <p className="error-msg">User Id Required</p>
                )} */}
                <div>
                  <TextInput
                    type="text"
                    placeholder="User ID"
                    name="userId"
                    refRegister={register({
                      required: !editEmployee && "Required",
                    })}
                    className={errors.userId?.type ? 'uId errorInput' :'add-employee-text-input'}
                    disabled={editEmployee}
                  />
                </div>
                
                <div>
                  <TextInput
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    minLength={6}
                    name="password"
                    refRegister={register({
                      // required: "Required",
                      required: !editEmployee && "Required",
                    })}
                    className={errors.password?.type === "required" ? 'pass errorInput' :'add-employee-text-input'}
                    // style={{ fontSize: "18px" }}
                    containerStyle={{ paddingBottom: "0px" }}
                    disabled={editEmployee}
                  />
                  {/* <div> */}
                  {isPasswordVisible ? (
                    <ClosedEyeIcon
                      onClick={() => SetIsPasswordVisible(false)}
                      style={{
                        position: "relative",
                        bottom: 30,
                        left: 370, 
                      }}
                    />
                  ) : (
                    <OpenEyeIcon
                      onClick={() => SetIsPasswordVisible(true)}
                      style={{
                        position: "relative",
                        bottom: 30,
                        left: 370, 
                      }}
                    />
                  )}
                  {/* </div> */}
                </div>
              </div>

                <div
                  className="acess-flex"
                  style={{ marginTop: editEmployee ? 10 : 20 }}
                >
                  {errors.devicePin?.type === "minLength" ||
                  errors.devicePin?.type === "maxLength" ? (
                    <p className="error-msg">PIN Should Be of Length 4</p>
                  ) : null}
                  <p style={{fontSize: "15px", color:'#ccc'}}>Create Pin</p>
                  {/* <Switchbox
                    isChecked={pinEnabled}
                    handleSwitch={() => setPinEnabled(!pinEnabled)}
                  />{" "} */}
                  {/* <TextInput
                    containerStyle={{ paddingBottom: "0px" }}
                    type="number"
                    placeholder="Create PIN"
                    maxLength={4}
                    minLength={4}
                    name="devicePin"
                    onChange={(e) => setPin(e.target.value)}
                    refRegister={register({
                      minLength: 4,
                      maxLength: 4,
                    })}
                    // disabled={!pinEnabled}
                    min={0}
                    className={"pinInput"}
                    value={pin}
                  /> */}
                  <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
                    <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '7px' }}>
                      {[0, 1, 2, 3].map((i) => (
                        <input
                          key={i}
                          ref={(el) => (inputRefs.current[i] = el)}
                          type={showPin ? 'text' : 'password'}
                          value={pins[i]}
                          onChange={(e) => handleChange(e, i)}
                          onKeyDown={(e) => handleKeyDown(e, i)}
                          maxLength="1"
                          style={{
                            width: '40px',
                            fontSize: '16px',
                            textAlign: 'center',
                            border: 'none',
                            borderRight: i < 3 ? '1px solid #ccc' : 'none',
                            padding: '10px',
                            outline: 'none',
                          }}
                        />
                      ))}
                    </div>
                    <div>
                      {showPin ? (
                        <ClosedEyeIcon
                          onClick={toggleShowPin}
                          style={{
                            position: "relative",
                            left: 20, 
                          }}
                        />
                      ) : (
                        <OpenEyeIcon
                          onClick={toggleShowPin}
                          style={{
                            position: "relative",
                            left: 20, 
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="btn form-cta">
              <span style={{ border: 0, color: "tomato", marginRight: 100 }}>
                {addEmployeeMessage}
              </span>
              <span
                style={{marginLeft:'550px'}}
                onClick={() => {
                  //console.log("Cancelling");
                  history.replace("/management/employees");
                }}
              >
                 <input className="clear-all-btn" type="submit" value="Clear All" />
              </span>
              <span
                onClick={() => {
                  //console.log(errors, "errors");
                }}
              >
                <input className="save-btn" type="submit" value="Save" /> 
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
