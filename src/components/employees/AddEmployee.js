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
import { functionData } from "./data";
import { rolesAndFunction } from "./data";
 

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
  const [pins, setPins] = useState(['', '', '', ''])
  const [showPin, setShowPin] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const inputRefs = useRef([])
  const [checkedFunctions, setCheckedFunctions] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [checkedModules, setCheckedModules] = useState([])
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
  const [pinEnabled, setPinEnabled] = useState(editEmployee ? true : false)
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
  } = useForm()

  const [pin, setPin] = useState(
    editEmployee ? editEmployee.devicePin : getValues("devicePin")
  )

  const credentials = useSelector((state) => state.auth.credentials);
  const employeeAdded = useSelector((state) => state.employee.employeeAdded);
  const updatePinMessage = useSelector(
    (state) => state.employee.updateEmployeePINMessage
  )
  const updatePinLoading = useSelector(
    (state) => state.employee.updateEmployeePINLoading
  )
  const updatePinSuccess = useSelector(
    (state) => state.employee.updateEmployeePINSuccess
  )
  const updatePinFailed = useSelector(
    (state) => state.employee.updateEmployeePINFailed
  )
  const addEmployeeMessage = useSelector(
    (state) => state.employee.addEmployeeMessage.updateEmployeePINMessage
  )
  const addEmployeeLoading = useSelector(
    (state) => state.employee.addEmployeeLoading
  )
  const outlets = useSelector((state) => state.employee.outlets);

  const watchUserId = watch("userId");
  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");
  const useNickname = watch("useNickname", false);
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
      alert(updatePinMessage)
      history.goBack()
      dispatch(updateEmployeeClear())
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
        "Restaurant Owner",
        "Restaurant Manager",
        "System Admin",
        "Supervisor",
        "Waiter",
        "Host",
        "Delivery",
      ]
    }
  }
  useEffect(() => {
    if (!addEmployeeLoading && employeeAdded) {
      dispatch(resetAddEmployee());
      history.replace("/management/employees")
    }
  }, [addEmployeeLoading, employeeAdded])

  useEffect(() => {
    if (getValues("userId") === " ") {
      setValue("userId", "");
    }
    if (addEmployeeMessage !== "") {
      dispatch(resetAddEmployee());
    }
  }, [watchUserId]);

  useEffect(() => {
    let name = getValues("firstName").replace(/[^A-Za-z ]/g, "")
    var splitted = name.split(" ");
    // console.log("Input Splitted: ", splitted);

    if (
      splitted.every((name) => {
        return name == "";
      })
    ) {
      setValue("firstName", "")
    } else {
      if (splitted.length > 0) {
        for (var i = 0; i < splitted.length; i++) {
          if (splitted[i].length === 1) {
            //   console.log("one Len");
            splitted[i] = splitted[i].charAt(0).toUpperCase()
          } else {
            splitted[i] =
              splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1)
          }
        }
        name = splitted.join(" ");
        // console.log("Output: ", name)
        setValue("firstName", name)
      }
    }
  }, [watchFirstName])

  useEffect(() => {
    let name = getValues("lastName").replace(/[^A-Za-z ]/g, "")
    var splitted = name.split(" ");
    // console.log("Input Splitted: ", splitted);

    if (
      splitted.every((name) => {
        return name == ""
      })
    ) {
      setValue("lastName", "");
    } else {
      if (splitted.length > 0) {
        for (var i = 0; i < splitted.length; i++) {
          if (splitted[i].length === 1) {
            //   console.log("one Len");
            splitted[i] = splitted[i].charAt(0).toUpperCase()
          } else {
            splitted[i] =
              splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1)
          }
        }
        name = splitted.join(" ")
        // console.log("Output: ", name)
        setValue("lastName", name)
      }
    }
  }, [watchLastName]);

  const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet.locationName.split(",")[1])
    setIsOutletDropdownOpen(false)
  } 

  const handleSelectRole = (role) => {
    setSelectedRole(role)
    setIsRoleDropDownOpen(false)
  } 

  const handleChange = (e, index) => {
    const value = e.target.value
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pins]
      newPin[index] = value
      setPins(newPin)
      if (value && index < 3) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pins[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const toggleShowPin = () => {
    setShowPin(!showPin)
  }

  const handleRoleChange = (role) => {
    setSelectedRole(role)
    const functionsForRole = rolesAndFunction
      .flatMap((module) => module.functionality)
      .filter((func) => func.roles.includes(role))
      .flatMap((func) => func.name)
    setCheckedFunctions(functionsForRole)
  }

  const isFunctionChecked = (functionName) => {
    return checkedFunctions.includes(functionName.toLowerCase())
  }

  const handleCheckboxChange = (functionName) => {
    setCheckedFunctions((prevCheckedFunctions) => {
      if (prevCheckedFunctions.includes(functionName.toLowerCase())) {
        return prevCheckedFunctions.filter((func) => func !== functionName.toLowerCase())
      } else {
        return [...prevCheckedFunctions, functionName.toLowerCase()]
      }
    })
  }

  const isModuleChecked = (moduleName) => {
    return functionData
      .find((module) => module.module.toLowerCase() === moduleName.toLowerCase())
      .functionality.every((func) => checkedFunctions.includes(func.toLowerCase()));
  };
  
  const handleModuleCheckboxChange = (moduleName) => {
    const moduleFunctions = functionData
      .find((module) => module.module.toLowerCase() === moduleName.toLowerCase())
      .functionality.map((func) => func.toLowerCase());
  
    setCheckedFunctions((prevCheckedFunctions) => {
      if (moduleFunctions.every((func) => prevCheckedFunctions.includes(func))) {
        return prevCheckedFunctions.filter((func) => !moduleFunctions.includes(func));
      } else {
        return [...prevCheckedFunctions, ...moduleFunctions.filter((func) => !prevCheckedFunctions.includes(func))]
      }
    })
  }

  const getDefaultFunctionalitiesForRole = (role) => {
    return rolesAndFunction
      .flatMap((module) => module.functionality)
      .filter((func) => func.roles.includes(role))
      .flatMap((func) => func.name.map(name => name.toLowerCase()));
  };
  
  const isDefaultActionsUpdated = (selectedFunctions, role) => {
    const defaultFunctions = getDefaultFunctionalitiesForRole(role);
    const selectedFunctionNames = selectedFunctions.flatMap(module => module.functions.map(func => func.name.toLowerCase()));
    return selectedFunctionNames.some(func => !defaultFunctions.includes(func));
  }
  
  const getFunctionUrl = (functionName) => {
    for (const module of rolesAndFunction) {
      for (const func of module.functionality) {
        if (func.name.includes(functionName.toLowerCase())) {
          return func.urls;
        }
      }
    }
    return []
  }

  const handleReset = () => {
    const functionsForRole = getDefaultFunctionalitiesForRole(selectedRole);
    setCheckedFunctions(functionsForRole);
  };

  const onSubmit = (formValues) => {
    // let pin = formValues.devicePin
    const selectedFunctions = functionData.map((module) => ({
      module: module.module,
      functions: module.functionality
        .filter((func) => checkedFunctions.includes(func.toLowerCase()))
        .map((func) => ({
          name: func,
          urls: getFunctionUrl(func)
        }))
    })).filter((module) => module.functions.length > 0)
  
    formValues["rolesAndFunctions"] = selectedFunctions;
    formValues["firstName"] = formValues.firstName
    formValues["lastname"] = formValues.lastName
    formValues["role"] = formValues.role
    formValues["userId"] = credentials.businessName
    formValues["nickName"] = formValues.nickName
    formValues["email"] = formValues.email
    formValues["phone"] = formValues.mobileNumber
    formValues["address"] = `${formValues.address1} ${formValues.address2}`
    formValues["dateOfBirth"] = selectedDate
    formValues["education"] = formValues.education
    // formValues["merchantId"] = credentials.merchantId
    formValues["pin"] = pins.join('')
    formValues["locationId"] = outlets.find((outlet) =>
      outlet.locationName.includes(formValues["outlet"])
    ).id
    formValues["isDefaultActionsUpdated"] = isDefaultActionsUpdated(selectedFunctions, formValues["role"])
    // if (!pinEnabled) {
    //   formValues["devicePin"] = ""
    // }

    // delete formValues["firstName"]
    delete formValues["lastName"]
    delete formValues.address1;
    delete formValues.address2;
    delete formValues["outlet"]
    //console.log("Employee details", formValues)
    console.log("Form Submitted")
    if (editEmployee) {
      dispatch(updateEmployeePIN({ id: editEmployeeData.id, pin: pin }))
    } else {
      dispatch(addEmployee(formValues))
    }
  }

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
                      // value={editEmployee ? editEmployee.firstName : null}
                      // disabled={editEmployee && editEmployee.firstName}
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
                      // disabled={editEmployee}
                    />
                  </div>
                </div>

                <div>
                  <TextInput
                    type="text"
                    placeholder="Nick Name"
                    name="nickName"
                    refRegister={register({
                     required: useNickname && "Required"
                    })}
                    // className={""}
                    maxLength={15}
                    className={errors.nickName ? 'fN errorInputBox' :'inputBox'}
                    // value={editEmployee ? editEmployee.nickName : null}
                    // disabled={editEmployee && editEmployee.lastName}
                    // disabled={editEmployee}
                  />
                </div>

                <div className="checkBox">
                  <label> 
                    <input type="checkbox" className="checkbox" name="useNickname" ref={register} />  
                    <p>Utilize a nickname as needed in all forthcoming activities</p>
                  </label>
                </div>

                <div className="flexContainer">
                  <div>
                    <TextInput
                      type="number"
                      placeholder="Phone*"
                      name="mobileNumber"
                      refRegister={register({
                        required: !editEmployee && "Required",
                      })}
                      className={errors.mobileNumber?.type === "required" ? 'num errorInput' :'add-employee-text-input'}
                      min={0}
                      value={editEmployee ? editEmployee.mobileNumber : null}
                      // disabled={editEmployee && editEmployee.mobileNumber}
                      // disabled={editEmployee}
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
                      // disabled={editEmployee}
                    />
                  </div>
                </div>

                <div>
                  <TextInput
                    type="text"
                    placeholder="Address Line 1"
                    name="address1"
                    refRegister={register()}
                    className={"inputBox"}
                    // value={editEmployee ? editEmployee.address : null}
                    // disabled={editEmployee && editEmployee.email}
                    // disabled={editEmployee}
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    placeholder="Address Line 2"
                    name="address2"
                    refRegister={register()}
                    className={"inputBox"}
                    // value={editEmployee ? editEmployee.address : null}
                    // disabled={editEmployee && editEmployee.email}
                    // disabled={editEmployee}
                  />
                </div>

                <div className="flexContainer">
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Education"
                      name="education"
                      refRegister={register()}
                      className={"add-employee-text-input"}
                      // value={editEmployee ? editEmployee.address : null}
                      // disabled={editEmployee && editEmployee.email}
                      // disabled={editEmployee}
                    />
                  </div>
                    <div style={{zIndex:99999}}>
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
                        name="dob" 
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className={"dateInput"} 
                        refRegister={register()}
                        // disabled={editEmployee} 
                        yearDropdownItemNumber={50} 
                        scrollableYearDropdown
                        showYearDropdown
                        minDate={new Date(1970, 0, 1)}  
                        maxDate={new Date()}  
                      />
                    </div>
                </div>
                <hr style={{marginRight:'40px'}}/>
                
                <h3>Formal Setup*</h3>
                <div className="flexContainer">
                
                <div className={errors.outlet?.type ? 'errorCustomInput' :'selectContainer'} style={{ cursor: "pointer" }}>
                  <div style={{zIndex: 0}}>
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
                          placeholder={"Assign Outlet*"}
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
                          // disabled={editEmployee}
                        />
                      )}
                    />
                  </div>
                </div>
                
                <div className={errors.role?.type ? "errorCustomInput" : "selectContainer"} style={{ cursor: "pointer" }}>
                  <Controller
                    control={control}
                    name="role"
                    defaultValue={""}
                    rules={{
                      required: !editEmployee && "Required",
                    }}
                    render={({ onChange, onBlur, value, name }) => (
                      <CustomDropdown
                        options={getRole()}
                        placeholder={"Assign Role*"}
                        onSelect={(role) => {
                          onChange(role.value)
                          handleRoleChange(role.value)
                          if (jwt_decode(credentials?.accessToken).resource_access["merchant-app"].roles[0].includes("neighbourhood"))
                            onChange(role.value + "-neighbourhood")
                        }}
                        value={value}
                        name={name}
                        placeholderClass={"dropDown"}
                        controlClassName={"add-employee-dropdown"}
                        arrowClassName={"add-employee-dropdown-arrow"}
                      />
                    )}
                  />
                  <div className="roleFunction">
                    <p onClick={() => setOpenFuction(!openFunction)}>Edit Roles/Functions</p>
                  </div>
                  {openFunction && (
                    <div className="functionsDropDown">
                      <p style={{textAlign: 'center', fontWeight: 600}}>Roles/Function</p>
                      <div className="checkBoxContainer">
                        {functionData.map((module) => (
                          <div className="checkboxList" key={module.module}>
                            <div className="checkBoxItem">
                              <label>
                                <input 
                                  type="checkbox" 
                                  className="checkbox" 
                                  checked={isModuleChecked(module.module)} 
                                  onChange={() => handleModuleCheckboxChange(module.module)} 
                                />
                                <p style={{fontWeight:600}}>{module.module}</p>
                              </label>
                            </div>
                            {module.functionality.map((func) => (
                              <div className="checkBoxItem" key={func}>
                                <label>
                                  <input 
                                    type="checkbox" 
                                    className="checkbox" 
                                    checked={isFunctionChecked(func)} 
                                    onChange={() => handleCheckboxChange(func)} 
                                  />
                                  <p>{func}</p>
                                </label>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="functionBtn">
                        <input className="saveBtn" type="button" value="Save" onClick={() => setOpenFuction(!openFunction)} />
                        <input className="resetbtn" type="button" value="Reset" onClick={handleReset} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flexContainer">
              {/* {errors.userId?.type === "required" && (
                  <p className="error-msg">User Id Required</p>
                )} */}
                <div>
                  <TextInput
                    type="text"
                    placeholder="User ID*"
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
                    placeholder="Password*"
                    minLength={6}
                    name="password"
                    refRegister={register({
                      // required: "Required",
                      required: !editEmployee && "Required",
                    })}
                    className={errors.password?.type === "required" ? 'pass errorInput' :'add-employee-text-input'}
                    // style={{ fontSize: "18px" }}
                    containerStyle={{ paddingBottom: "0px" }}
                    // disabled={editEmployee}
                  />
                  {/* <div> */}
                  {isPasswordVisible ? (
                    <ClosedEyeIcon
                      onClick={() => SetIsPasswordVisible(false)}
                      style={{
                        position: "relative",
                        bottom: 30,
                        left: 370, 
                        cursor:'pointer'
                      }}
                    />
                  ) : (
                    <OpenEyeIcon
                      onClick={() => SetIsPasswordVisible(true)}
                      style={{
                        position: "relative",
                        bottom: 30,
                        left: 370, 
                        cursor:'pointer'
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
                  <p style={{fontSize: "15px", color:'#ccc'}}>Create Pin*</p>
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
                    <div style={{ display: 'flex', border: errors.pin ? '1px solid #FF0505' : '1px solid #ccc', borderRadius: '7px' }}>
                      {[0, 1, 2, 3].map((i) => (
                        <input
                          key={i}
                          refRegister={register()}
                          ref={(el) => {
                            inputRefs.current[i] = el;
                            register(el, { required: "Required" });
                          }}
                          type={showPin ? 'text' : 'password'}
                          value={pins[i]}
                          onChange={(e) => handleChange(e, i)}
                          onKeyDown={(e) => handleKeyDown(e, i)}
                          name='pin'
                          // maxLength="4"
                          // minLength="4"
                          style={{
                            width: '40px',
                            fontSize: '16px',
                            textAlign: 'center',
                            border: 'none',
                            borderRight: errors.pin ? '1px solid #FF0505' : '1px solid #ccc',
                            padding: '10px',
                            outline: 'none',
                          }}
                          className={errors[`pin${i}`] ? 'errorInput' : ''}
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
                            cursor: 'pointer'
                          }}
                          className={'closedEyeIcon'}
                        />
                      ) : (
                        <OpenEyeIcon
                          onClick={toggleShowPin}
                          style={{
                            position: "relative",
                            left: 20, 
                            cursor: 'pointer'
                          }}
                          className={'openedEyeIcon'}
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
                  // history.replace("/management/employees")
                  setOpenModal(!openModal)
                }}
              >
                 <input className="clear-all-btn" type="button" value="Clear All" />
              </span>
              <span
                onClick={() => {
                  
                  //console.log(errors, "errors")
                  // history.replace('/management/employees')
                }}
              >
                <input className="save-btn" type="submit" value="Save" /> 
              </span>
            </div>
          </form>
         {openModal && <div className="modal">
            <div className="modalContainer">
              <p>Are you sure?</p>
              <p>All unsaved changes will be lost.</p>
              <div className="modalBtn">
                <input type="button" className="yesBtn" value='Yes' onClick={()=> {
                  history.replace("/management/employees")
                }} />
                <input type="button" className="noBtn" value='No' onClick={()=>{setOpenModal(!openModal)}} />
              </div>
            </div>
          </div>}
        </div>
      ) : (
        <EmployeeList setList={() => setList(false)} />
      )}
    </>
  )
}

export default AddEmployee;
