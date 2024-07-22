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
  getEmployeeRoles,
  updateEmployeeRequest,
  resetEmployeeActionCompleted,
} from "../../redux/actions/employeeActions";
import { useHistory } from "react-router";

import { ReactComponent as OpenEyeIcon } from "../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/svg/closed_eye.svg";
import dropArrow from '../../assets/svg/dropArrow.svg'
import { employeeData, functionData } from "./data";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dropdownRef = useRef(null)
  const [list, setList] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isOutletDropdownOpen, setIsOutletDropdownOpen] = useState(false)
  const [isRoleDropDownOpen, setIsRoleDropDownOpen] = useState(false)
  const [role, setRole] = useState('')
  const [openFunction, setOpenFuction] = useState(false)
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
    firstName: editEmployeeData.firstName,
    lastName: editEmployeeData.lastName,
    mobileNumber: editEmployeeData.phone,
    nickName : editEmployeeData.nickName,
    education: editEmployeeData.education,
    role: editEmployeeData.assignedRole,
    email: editEmployeeData.email,
    pin: editEmployeeData.pin,
    dateOfBirth: editEmployeeData.dateOfBirth,
    userId: editEmployeeData.userId,
    outlet: editEmployeeData.locationName.split(",")[1],
    staffId: editEmployeeData.staffId
  }

  const [pinEnabled, setPinEnabled] = useState(editEmployee ? true : false)
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
  const employeeUpdateLoading = useSelector((state) => state.employee.employeeUpdateLoading)
  const employeeUpdated = useSelector((state) => state.employee.employeeUpdated);
  const employeeActionCompleted = useSelector((state) => state.employee.employeeActionCompleted);

  useEffect(() => {
    dispatch(getEmployeeRoles())
  }, [])

  const roles = useSelector((state) => state.employee.employeeRoleAndFunctions) 

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

  const getRole = (credentials) => {
    const neighbourhoodDeliveryRole = [
      "Operator-neighbourhood",
      "Branch manager-neighbourhood",
      "Regional manager-neighbourhood",
      "Owner-neighbourhood",
      "Delivery-neighbourhood",
    ];
  
    const decodedToken = credentials?.accessToken ? jwt_decode(credentials.accessToken) : null;
    const roles = decodedToken?.resource_access?.["merchant-app"]?.roles || [];
  
    if (roles.length > 0 && neighbourhoodDeliveryRole.includes(roles[0])) {
      return [
        "Branch_Manager",
        "Regional_Manager",
        "Operator",
        "Owner",
        "Delivery",
      ];
    } else {
      return [
        "Chef",
        "Restaurant_Owner",
        "Restaurant_Manager",
        "Admin",
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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenFuction(false);
    }
  };

  useEffect(() => {
    if (openFunction) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [openFunction])

  useEffect(() => {
    if (editEmployee && editEmployee.role) {
      setSelectedRole(editEmployee.role);
    }
  }, [editEmployee]);

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
    setSelectedRole(role);
    const functionsForRole = roles
      .flatMap((module) => module.functionality)
      .filter((func) => func.roles?.includes(role)) 
      .flatMap((func) => func.name);
    setCheckedFunctions(functionsForRole);
  };

  const isFunctionChecked = (functionName) => {
    return checkedFunctions.includes(functionName.toLowerCase());
  };

  const handleCheckboxChange = (functionName) => {
    setCheckedFunctions((prevCheckedFunctions) => {
      if (prevCheckedFunctions.includes(functionName.toLowerCase())) {
        return prevCheckedFunctions.filter((func) => func !== functionName.toLowerCase());
      } else {
        return [...prevCheckedFunctions, functionName.toLowerCase()];
      }
    });
  };

  const isModuleChecked = (moduleName) => {
    return roles
      .find((module) => module.module.toLowerCase() === moduleName.toLowerCase())
      .functionality.every((func) => checkedFunctions.includes(func.name.toLowerCase()));
  };

  const handleModuleCheckboxChange = (moduleName) => {
    const moduleFunctions = roles
      .find((module) => module.module.toLowerCase() === moduleName.toLowerCase())
      .functionality.map((func) => func.name.toLowerCase());

    setCheckedFunctions((prevCheckedFunctions) => {
      if (moduleFunctions.every((func) => prevCheckedFunctions.includes(func))) {
        return prevCheckedFunctions.filter((func) => !moduleFunctions.includes(func));
      } else {
        return [...prevCheckedFunctions, ...moduleFunctions.filter((func) => !prevCheckedFunctions.includes(func))];
      }
    })
  }

  const handleReset = () => {
    const functionsForRole = roles
      .flatMap((module) => module.functionality)
      .filter((func) => func.roles.includes(selectedRole))
      .flatMap((func) => func.name.toLowerCase())
    setCheckedFunctions(functionsForRole)
  }

  const isDefaultActionsUpdated = (selectedFunctions, role) => {
    const defaultFunctions = roles
      .flatMap((module) => module.functionality)
      .filter((func) => func.roles.includes(role))
      .map((func) => func.name.toLowerCase());
  
    const selectedFunctionNames = selectedFunctions.map((func) => func.name.toLowerCase());
  
    const isUpdated = selectedFunctionNames.some((func) => !defaultFunctions.includes(func));
    return isUpdated;
  };

  useEffect(() => {
    if (employeeAdded && !employeeUpdateLoading) {
      history.replace('/management/employees');
    }
  }, [employeeAdded, employeeUpdateLoading, history]);


  const onSubmit = (formValues) => {
    const rolesAndFunctions = roles.map((module) => {
      const moduleFunctions = module.functionality
        .filter((func) => checkedFunctions.includes(func.name.toLowerCase()))
        .map((func) => ({
          moduleType: module.module,
          moduleName: func.name,
          urls: func.urls
        }));
  
      return moduleFunctions.length > 0
        ? moduleFunctions
        : null;
    }).flat().filter((item) => item !== null);
  
    // Update formValues
    formValues["firstName"] = formValues.firstName;
    formValues["fullName"] = `${formValues.firstName} ${formValues.lastName}`;
    formValues["role"] = formValues.role;
    formValues["businessName"] = credentials.businessName;
    formValues["userId"] = formValues.userId;
    formValues["nickName"] = formValues.nickName;
    formValues["email"] = formValues.email;
    formValues["mobileNumber"] = formValues.mobileNumber;
    formValues["address"] = `${formValues.address1} ${formValues.address2}`;
    formValues["dateOfBirth"] = selectedDate;
    formValues["education"] = formValues.education;
    formValues["merchantId"] = credentials.merchantId;
    formValues["devicePin"] = pins.join('');
    formValues["IsTempPassword"] = false;
    formValues["password"] = formValues.password || null;
    formValues["isToUseNickName"] = formValues.useNickname;
    formValues["locationId"] = outlets.find((outlet) =>
      outlet.locationName.includes(formValues["outlet"])
    ).id;
    formValues["userAccessInfoList"] = rolesAndFunctions;
    const isUpdated = isDefaultActionsUpdated(
      rolesAndFunctions.map(module => ({ name: module.moduleName, urls: module.urls })),
      formValues["role"]
    );
    formValues["isDefaultFunctionalityAccessUpdated"] = isUpdated;
    if(editEmployeeData){
      formValues["id"] = editEmployeeData.staffId
    }
    // Clean up formValues
    delete formValues.address1;
    delete formValues.address2;
    delete formValues["outlet"];
    delete formValues["useNickname"];
    delete formValues["pin"]
  
    // Submit the form
    console.log("Form Submitted");

    if (editEmployee) {
      dispatch(updateEmployeeRequest(formValues))
    } else {
      console.log("Emp Add")
      console.log(editEmployee)
      dispatch(addEmployee(formValues));
    }
  }

  const splitAddress = (address) => {
    const parts = address.split(',');
    if (parts.length > 1) {
      const addressLine1 = parts.slice(0, -1).join(',').trim();
      const addressLine2 = parts[parts.length - 1].trim();
      return [addressLine1, addressLine2];
    }
  
    const maxLength = 30;
    if (address.length <= maxLength) {
      return [address, ''];
    }
  
    const splitIndex = address.lastIndexOf(' ', maxLength);
    return [
      address.slice(0, splitIndex),
      address.slice(splitIndex + 1)
    ];
  };
  
  useEffect(() => {
    if (editEmployeeData) {
      if(editEmployeeData?.pin && editEmployeeData?.pin?.length === 4) {
        const first = editEmployeeData?.pin?.split('')[0]
        const second = editEmployeeData?.pin?.split('')[1]
        const third = editEmployeeData?.pin?.split('')[2]
        const fourth = editEmployeeData?.pin?.split('')[3]
        setPins([first,second,third,fourth])
      }

      if(editEmployeeData?.dateOfBirth && editEmployeeData?.dateOfBirth?.length > 0){
        const date = new Date(editEmployeeData.dateOfBirth);
        setSelectedDate(date)
      }
      setValue('firstName',editEmployeeData.firstName || '')
      setValue('lastName', editEmployeeData.lastName || '')
      setValue('mobileNumber', editEmployeeData.mobileNumber || editEmployeeData.phone || '')
      setValue('nickName', editEmployeeData.nickName || '')
      setValue('education', editEmployeeData.education || '')
      setValue('role', editEmployeeData.assignedRole || '')
      setValue('email', editEmployeeData.email || '')
      setValue('dateOfBirth', editEmployeeData.dateOfBirth || '')
      setValue('userId', editEmployeeData.userId || '')
      setValue('outlet', editEmployeeData.locationName.split(',')[1] || '')

      if(editEmployeeData?.address){
        const [address1, address2] = splitAddress(editEmployeeData.address)
        setValue('address1', address1)
        setValue('address2', address2)
      }
    }
  }, [editEmployeeData]);

  const addEmployeeFailure = useSelector((state) => state.employee.addEmployeeFailure)
  const updateEmployeeFailure = useSelector((state) => state.employee.updateEmployeeFailure)

  useEffect(() => {
    if (employeeActionCompleted && (addEmployeeFailure || !employeeUpdated)) {
      console.log("Emp Action Complete")
      history.replace('/management/employees');
      dispatch(resetEmployeeActionCompleted());
    }
  }, [employeeActionCompleted, history]);

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
                  <div>

                    <TextInput
                      type="text"
                      placeholder="First Name*"
                      maxLength={15}
                      name="firstName"
                      formRegister={register({
                        required: "Required",
                      })}
                      error={null}
                      className={
                        errors.firstName?.type === "required"
                          ? "fN errorInput"
                          : "add-employee-text-input"
                      }
                    />
                  </div>

                  <div>
                    <TextInput
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      formRegister={register()}
                      className={"add-employee-text-input"}
                      maxLength={15}
                    />
                  </div>
                </div>

                <div>
                  <TextInput
                    type="text"
                    placeholder="Nick Name"
                    name="nickName"
                    formRegister={register({
                     required: useNickname && "Required"
                    })}
                    maxLength={15}
                    className={errors.nickName ? 'fN errorInputBox' :'inputBox'}
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
                      formRegister={register({
                        required: "Required",
                      })}
                      className={errors.mobileNumber?.type === "required" ? 'num errorInput' :'add-employee-text-input'}
                      min={0}
                      // disabled={editEmployee && editEmployee.phone}
                    />
                  </div>
                  <div>
                    <TextInput
                      type="email"
                      placeholder="Email"
                      name="email"
                      formRegister={register()}
                      className={"add-employee-text-input"}
                    />
                  </div>
                </div>

                <div>
                  <TextInput
                    type="text"
                    placeholder="Address Line 1"
                    name="address1"
                    formRegister={register()}
                    className={"inputBox"}
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    placeholder="Address Line 2"
                    name="address2"
                    formRegister={register()}
                    className={"inputBox"}
                  />
                </div>

                <div className="flexContainer">
                  <div>
                    <TextInput
                      type="text"
                      placeholder="Education"
                      name="education"
                      formRegister={register()}
                      className={"add-employee-text-input"}
                    />
                  </div>
                    <div style={{zIndex:99999}}>
                      <DatePicker 
                        placeholderText="DOB" 
                        value={null} 
                        name="dob" 
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className={"dateInput"} 
                        formRegister={register()}
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
                      rules={{
                        required: "Required",
                      }}
                      render={({ onChange, onBlur, value, name }) => (
                        <CustomDropdown
                          options={Array.from(
                            outlets,
                            (outlet) => outlet.locationName.split(",")[1]
                          )}
                          placeholder={"Assign Outlet*"}
                          onSelect={(outletSelected) => {
                            const outletObject = outlets.find((outlet) =>
                              outlet.locationName.includes(outletSelected.value)
                            );
                            onChange(outletObject.locationName.split(",")[1])
                          }}
                          value={editEmployee ? editEmployee.outlet : ''}
                          name={name}
                          controlClassName={
                            editEmployee
                              ? "disabled-dropdown add-employee-dropdown"
                              : "add-employee-dropdown"
                          }
                          arrowClassName={"add-employee-dropdown-arrow"}
                          placeholderClass={"dropDown"}
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
                      required: "Required",
                    }}
                    render={({ onChange, onBlur, value, name }) => (
                      <CustomDropdown
                        options={getRole()}
                        placeholder={"Assign Role*"}
                        onSelect={(role) => {
                          onChange(role.value);
                          handleRoleChange(role.value);
                          if (jwt_decode(credentials?.accessToken)?.resource_access["merchant-app"]?.roles[0].includes("neighbourhood")) {
                            onChange(role.value + "-neighbourhood");
                          }
                        }}
                        value={editEmployee ? editEmployee.role : ''}
                        name={name}
                        placeholderClass={"dropDown"}
                        controlClassName={"add-employee-dropdown"}
                        arrowClassName={"add-employee-dropdown-arrow"}
                      />
                    )}
                  />
                  {selectedRole && <div className="roleFunction">
                    <p onClick={() => setOpenFuction(!openFunction)}>Edit Roles/Functions</p>
                  </div>}
                  {openFunction && (
                    <div className="functionsDropDown" ref={dropdownRef}>
                      <p style={{textAlign: 'center', fontWeight: 600}}>Roles/Function</p>
                      <div className="checkBoxContainer">
                        {roles.map((module) => (
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
                              <div className="checkBoxItem" key={func.name}>
                                <label>
                                  <input 
                                    type="checkbox" 
                                    className="checkbox" 
                                    checked={isFunctionChecked(func.name)} 
                                    onChange={() => handleCheckboxChange(func.name)} 
                                  />
                                  <p>{func.name}</p>
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
                <div>
                  <TextInput
                    type="text"
                    placeholder="User ID*"
                    name="userId"
                    formRegister={register({
                      required: "Required",
                    })}
                    className={errors.userId?.type ? 'uId errorInput' :'add-employee-text-input'}
                  />
                </div>
                
                <div>
                  <TextInput
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password*"
                    minLength={6}
                    name="password"
                    formRegister={register({
                      required: !editEmployee && "Required",
                    })}
                    className={errors.password?.type === "required" ? 'pass errorInput' :'add-employee-text-input'}
                    containerStyle={{ paddingBottom: "0px" }}
                  />
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
                </div>
              </div>

                <div
                  className="acess-flex"
                  style={{ marginTop: editEmployee ? 10 : 20 }}
                >
                  <p style={{fontSize: "15px", color:'#ccc'}}>Create Pin*</p>
                  <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
                    <div style={{ display: 'flex', border: errors.pin ? '1px solid #FF0505' : '1px solid #ccc', borderRadius: '7px' }}>
                      {[0, 1, 2, 3].map((i) => (
                        <input
                          key={i}
                          formRegister={register()}
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
                  setOpenModal(!openModal)
                }}
              >
                 <input className="clear-all-btn" type="button" value="Clear All" />
              </span>
              <span>
                <input 
                  className="save-btn" 
                  type="submit" 
                  value="Save" 
                /> 
              </span>
            </div>
          </form>

         {openModal && <div className="modal">
            <div className="modalContainer">
              <p>Are you sure?</p>
              <p>All unsaved changes will be lost.</p>
              <div className="modalBtn">
                <input type="button" 
                  className="yesBtn" 
                  value='Yes' 
                  onClick={()=> {
                    history.replace("/management/employees")
                  }} 
                />
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
