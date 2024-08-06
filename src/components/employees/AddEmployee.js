import React, { useEffect,useState, useRef } from "react";
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
import Calendar from "../../assets/images/cal.png";
import ResetLogo from "../../assets/images/resetIcon.png";
import InputMask from 'react-input-mask';
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
  setEditEmployeeData,
  getEmployeeByIdRequest,
  clearEditEmployeeData,
  refreshPin
} from "../../redux/actions/employeeActions";
import { useHistory, useParams } from "react-router";

import { ReactComponent as OpenEyeIcon } from "../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/svg/closed_eye.svg";
import { ReactComponent as ResetIcon } from "../../assets/svg/refresh-cw.svg";

import dropArrow from '../../assets/svg/dropArrow.svg'
import OtpInput from "../common/OtpInput";

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
  const [selectedDate, setSelectedDate] = useState(null)
  const inputRefs = useRef([])
  const [checkedFunctions, setCheckedFunctions] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [checkedModules, setCheckedModules] = useState([])

  const isValidDate = (date) => !isNaN(date.getTime()); 
  const params = useParams()

  useEffect(()=> {
    params?.id?.length && dispatch(getEmployeeByIdRequest(params.id))
    !params?.id?.length && dispatch(clearEditEmployeeData())
  },[params.id])

  const employee = useSelector((state) => state.employee.employeeByIdDetails)

  const employeeByIdDetailsLoading =  useSelector((state) => state.employee.employeeByIdDetailsLoading)

  const refreshNewPin = useSelector((state) => state.employee.refreshPin)
  const isGettingNewPin = useSelector((state) => state.employee.isGettingNewPin)


  // useEffect(() => {
  //   dispatch(setEditEmployeeData(employee))
  // },[employee])

  // const employee = useSelector(
  //   (state) => state.employee.employee
  // )

  const editEmployee = employee && {
    firstName: employee?.firstName,
    lastName: employee?.lastName,
    mobileNumber: employee?.phone,
    nickName : employee?.nickName,
    education: employee?.education,
    role: employee?.assignedRole,
    email: employee?.email,
    pin: employee?.pin,
    dateOfBirth: employee?.dateOfBirth,
    userId: employee?.userId,
    outlet: employee?.locationName,
    staffId: employee?.staffId,
    rolesAndFunctions: employee?.rolesAndFunctions
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
    (state) => state.employee.addEmployeeMessage
  )
  const addEmployeeLoading = useSelector(
    (state) => state.employee.addEmployeeLoading
  )
  const outlets = useSelector((state) => state.employee.outlets);
  const employeeUpdateLoading = useSelector((state) => state.employee.employeeUpdateLoading)
  const employeeUpdated = useSelector((state) => state.employee.employeeUpdated);
  const employeeActionCompleted = useSelector((state) => state.employee.employeeActionCompleted);
  const addEmployeeFailure = useSelector((state) => state.employee.addEmployeeFailure)
  const updateEmployeeFailure = useSelector((state) => state.employee.updateEmployeeFailure)

  const restaurantDetails = useSelector((state) => state.auth.restaurantDetails)
  // console.log({restaurantDetails});

  const [countryCode,setCountryCode] = useState("");
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);

  const [restaurantBranch,setRestaurantBranch] = useState([]);
  const [restaurantBranchDefaultValue,setRestaurantBranchDefaultValue]  = useState("");
  const branchOptions = restaurantBranch ? restaurantBranch.map(branch => branch?.locationName) : [];

  useEffect(() => {
    const countryC = restaurantDetails?.country;
    if (restaurantDetails) {
      countryC && setCountryCode(countryC === "US" ? '+1 ' : "+91 ");
      setRestaurantBranch(restaurantDetails?.branch);
      if (restaurantDetails?.branch?.length === 1) {
        setRestaurantBranchDefaultValue(restaurantDetails?.branch[0].locationName);
        setIsDropdownDisabled(true);
        setValue('outlet', restaurantDetails?.branch[0].locationName);
      } else {
        setRestaurantBranchDefaultValue("");
        setIsDropdownDisabled(false);
      }
    }
  }, [restaurantDetails, setValue]);
  

  useEffect(() => {
    dispatch(getEmployeeRoles())
  }, [])
  
  const roles = useSelector((state) => state.employee.employeeRoleAndFunctions) 

  useEffect(() => {
    const tempArr = [];
    if (editEmployee?.rolesAndFunctions?.length > 0) {
      for (let i = 0; i < editEmployee.rolesAndFunctions.length; i++) {
        const roleFunc = editEmployee.rolesAndFunctions[i];
        
        if (roleFunc?.funtions) { 
          for (let j = 0; j < roleFunc.funtions.length; j++) {
            tempArr.push(roleFunc.funtions[j].toLowerCase());
          }
        }
      }
      
      setCheckedFunctions(tempArr);
    }
  }, [employee]); 

  const watchUserId = watch("userId");
  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");
  const useNickname = watch("useNickname", false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // useEffect(() => {
  //   credentials && dispatch(getOutlets(credentials.merchantId));
  // }, []);

  useEffect(() => {
    if (!updatePinLoading && updatePinFailed && updatePinMessage) {
      alert(updatePinMessage);
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
  
    if (roles?.length > 0 && neighbourhoodDeliveryRole.includes(roles[0])) {
      return [
        "Branch_Manager",
        "Regional_Manager",
        "RegionalEmployee",
        "Operator",
        "Owner",
        "Delivery",
      ];
    } else {
      return [
        "Chef",
        "RegionalManager",
        "RegionalEmployee",
        "Manager",
        "RestaurantOwner",
        "Supervisor",
        "Waiter",
        "Host",
        "Delivery",
        "Cashier",
        "OrderTaker"
      ];
    }
  };  

  const [otp, setOtp] = useState('');

  
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
    let name = getValues("firstName")?.replace(/[^A-Za-z ]/g, "")
    var splitted = name?.split(" ");
    // console.log("Input Splitted: ", splitted);

    if (
      splitted?.every((name) => {
        return name == "";
      })
    ) {
      setValue("firstName", "")
    } else {
      if (splitted?.length > 0) {
        for (var i = 0; i < splitted?.length; i++) {
          if (splitted?.[i]?.length === 1) {
            //   console.log("one Len");
            splitted[i] = splitted?.[i]?.charAt(0).toUpperCase()
          } else {
            splitted[i] =
              splitted?.[i]?.charAt(0).toUpperCase() + splitted?.[i]?.slice(1)
          }
        }
        name = splitted?.join(" ");
        // console.log("Output: ", name)
        setValue("firstName", name)
      }
    }
  }, [watchFirstName])

  useEffect(() => {
    let name = getValues("lastName")?.replace(/[^A-Za-z ]/g, "")
    var splitted = name?.split(" ");
    // console.log("Input Splitted: ", splitted);

    if (
      splitted?.every((name) => {
        return name == ""
      })
    ) {
      setValue("lastName", "");
    } else {
      if (splitted?.length > 0) {
        for (var i = 0; i < splitted?.length; i++) {
          if (splitted?.[i].length === 1) {
            //   console.log("one Len");
            splitted[i] = splitted?.[i].charAt(0).toUpperCase()
          } else {
            splitted[i] =
              splitted?.[i].charAt(0).toUpperCase() + splitted?.[i].slice(1)
          }
        }
        name = splitted?.join(" ")
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

  // useEffect(() => {
  //   if (openFunction) {
  //     document.addEventListener('mousedown', handleClickOutside)
  //   } else {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   };
  // }, [openFunction])

  useEffect(() => {
    if (editEmployee && editEmployee.role) {
      setSelectedRole(editEmployee.role);
    }
  }, [editEmployee]);

  const handleSelectOutlet = (outlet) => {
    setSelectedOutlet(outlet.locationName)
    setIsOutletDropdownOpen(false)
  } 

  const handleSelectRole = (role) => {
    setSelectedRole(role)
    setIsRoleDropDownOpen(false)
  } 

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pins];
      newPin[index] = value;
      setPins(newPin);
      setValue(`pin${index}`, value); // Update react-hook-form value

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pins[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSpace = (event) => {
    if (event.key === ' ' && event.target.value.length === 0) {
      event.preventDefault();
    }
  };

  const toggleShowPin = () => {
    setShowPin(!showPin)
  }

  const initializeCheckedFunctions = (rolesAndFunctions) => {
    const functionsSet = new Set();
    rolesAndFunctions.forEach(roleFunc => {
      if (roleFunc.funtions) {
        roleFunc.funtions.forEach(func => {
          functionsSet.add(func.toLowerCase());
        });
      }
    });
    setCheckedFunctions([...functionsSet]);
  };
  
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    
    if (editEmployee) {
      initializeCheckedFunctions(editEmployee.rolesAndFunctions);
    } else {
      const functionsForRole = roles
        .flatMap(module => module.functionality)
        .filter(func => func.roles?.includes(role))
        .map(func => func.name.toLowerCase());
      
      setCheckedFunctions(functionsForRole);
    }
  };
  
  
  const isFunctionChecked = (functionName) => {
    return checkedFunctions.includes(functionName.toLowerCase());
  };
  
  const handleCheckboxChange = (functionName) => {
    setCheckedFunctions(prevCheckedFunctions => {
      const funcName = functionName.toLowerCase();
      if (prevCheckedFunctions.includes(funcName)) {
        return prevCheckedFunctions.filter(func => func !== funcName);
      } else {
        return [...prevCheckedFunctions, funcName];
      }
    })
  }
  
  const isModuleChecked = (moduleName) => {
    const module = roles.find((module) => module.module.toLowerCase() === moduleName.toLowerCase());
    if (!module) return false;
  
    return module.functionality?.every((func) => checkedFunctions.includes(func.name.toLowerCase()));
  }
  
  const handleModuleCheckboxChange = (moduleName) => {
    const module = roles.find((module) => module.module.toLowerCase() === moduleName.toLowerCase());
    if (!module) return;
  
    const moduleFunctions = module.functionality.map((func) => func.name.toLowerCase());
  
    setCheckedFunctions((prevCheckedFunctions) => {
      if (moduleFunctions?.every((func) => prevCheckedFunctions.includes(func))) {
        return prevCheckedFunctions.filter((func) => !moduleFunctions.includes(func));
      } else {
        return [...prevCheckedFunctions, ...moduleFunctions.filter((func) => !prevCheckedFunctions.includes(func))];
      }
    })
  }
  
  const handleReset = () => {
    if (editEmployee) {
      initializeCheckedFunctions(editEmployee.rolesAndFunctions);
    } else {
      const functionsForRole = roles
        .flatMap((module) => module.functionality)
        .filter((func) => func.roles.includes(selectedRole))
        .map((func) => func.name.toLowerCase());
  
      setCheckedFunctions(functionsForRole);
    }
  };
  
  const isDefaultActionsUpdated = (selectedFunctions, role) => {
    const defaultFunctions = roles
      .flatMap((module) => module.functionality)
      .filter((func) => func.roles.includes(role))
      .map((func) => func.name.toLowerCase());
  
    const selectedFunctionNames = selectedFunctions.map((func) => func.name.toLowerCase());
  
    return selectedFunctionNames.some((func) => !defaultFunctions.includes(func));
  };
  
  // const employeeUpdated = useSelector((state)=>state.employee.employeeUpdated)

  useEffect(() => {
    if (employeeAdded && !employeeUpdateLoading) {
      history.replace('/management/employees');
    }
    // if(employeeUpdated && !employeeUpdateLoading){
    //   history.replace('/management/employees');
    // }
  }, [employeeAdded, employeeUpdateLoading, history]);

  const hasPinErrors = pins.length != 4;// [0, 1, 2, 3].some(i => errors[`pin${i}`]);

  useEffect(() => {
    refreshNewPin?.length > 0 && setPins(refreshNewPin)
  }, [refreshNewPin])
  


  const onSubmit = (formValues) => {
    const rolesAndFunctions = roles.map(module => {
      const moduleFunctions = module.functionality
        .filter(func => checkedFunctions.includes(func.name.toLowerCase()))
        .map(func => ({
          moduleType: module.module,
          moduleName: func.name,
          urls: func.urls
        }));
  
      return moduleFunctions?.length > 0 ? moduleFunctions : null;
    }).flat().filter(item => item !== null);
  
    // Update formValues with additional data
    formValues = {
      ...formValues,
      firstName: formValues.firstName,
      fullName: `${formValues.firstName} ${formValues.lastName}`,
      role: formValues.role,
      businessName: credentials.businessName,
      userId: formValues.userId ||editEmployee?.userId,
      nickName: formValues.nickName,
      email: formValues.email || null,
      mobileNumber: formValues.mobileNumber,
      address: `${formValues.address1} ${formValues.address2}` || null,
      dateOfBirth: selectedDate,
      education: formValues.education,
      merchantId: credentials.merchantId,
      devicePin: pins.join('') || null,
      IsTempPassword: false,
      password: formValues.password || null,
      isToUseNickName: formValues.useNickname,
      locationId: restaurantBranch.find(outlet => outlet.locationName.includes(formValues["outlet"]))?.id,
      userAccessInfoList: rolesAndFunctions,
      isDefaultFunctionalityAccessUpdated: isDefaultActionsUpdated(
        rolesAndFunctions.map(module => ({ name: module.moduleName, urls: module.urls })),
        formValues["role"]
      ),
    };

    if (employee) {
      formValues["id"] = employee.staffId;
    }
  
    // Clean up formValues
    delete formValues.address1;
    delete formValues.address2;
    delete formValues["outlet"];
    delete formValues["useNickname"];
    delete formValues["pin0"];
    delete formValues["pin1"];
    delete formValues["pin2"];
    delete formValues["pin3"];
  
    // Submit the form

    formValues.successCB = () => {
       history.goBack();
    }
  
    if (editEmployee) {
      dispatch(updateEmployeeRequest(formValues));
    } else {
      dispatch(addEmployee(formValues));
    }
  };
  
  const splitAddress = (address) => {
    const parts = address?.split(',');
    if (parts?.length > 1) {
      const addressLine1 = parts.slice(0, -1).join(',').trim();
      const addressLine2 = parts[parts?.length - 1].trim();
      return [addressLine1, addressLine2];
    }
  
    const maxLength = 30;
    if (address?.length <= maxLength) {
      return [address, ''];
    }
  
    const splitIndex = address.lastIndexOf(' ', maxLength);
    return [
      address.slice(0, splitIndex),
      address.slice(splitIndex + 1)
    ];
  };

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };
  
  useEffect(() => {
    if (employee) {
      if(employee?.dateOfBirth && employee?.dateOfBirth?.length > 0){
        const date = new Date(employee?.dateOfBirth);
        setSelectedDate(date)
      }
      setValue('firstName',employee?.firstName?.trim() || '')
      setValue('lastName', employee?.lastName?.trim() || '')
      setValue('mobileNumber', employee?.mobileNumber?.trim() || employee?.phone || '')
      setValue('nickName', employee?.nickName?.trim() || '')
      setValue('education', employee?.education || '')
      setValue('role', employee?.assignedRole || '')
      setValue('email', employee?.email || null)
      setValue('dateOfBirth', employee?.dateOfBirth || '')
      setValue('userId', employee?.userId || '')
      setValue('outlet', employee?.locationName || '')

      if(employee?.address){
        const [address1, address2] = splitAddress(employee.address)
        setValue('address1', isEmptyOrSpaces(address1) ? null : address1)
        setValue('address2', address2)
      }
    }
  }, [employee]);

  useEffect(() => {
    if (employeeActionCompleted && (addEmployeeFailure || !employeeUpdated)) {
      history.goBack();
      dispatch(resetEmployeeActionCompleted());
    }
  }, [employeeActionCompleted, history]);

  const outletOptions = outlets ? Array.from(outlets, (outlet) => outlet?.locationName?.split(",")[1]).filter(Boolean) : [];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

const handleDateChangeRaw = (e) => {
  e.preventDefault();
}

const validatePassword = (value) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if(!editEmployee){
    return passwordRegex.test(value);
  }
}

  if(!!params?.id?.length && employeeByIdDetailsLoading)  return (
    <p style={{
      display: "flex",
      justifyContent: "center",
      paddingTop: "25%",
      marginLeft:'35%'
    }}>Loading, Please wait!!</p>
  )

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const refreshPinValue = ()=>{
    dispatch(refreshPin(credentials?.merchantId))
  }

  return (
    <>
      {list === false ? (
        <div className="menu-details">
          <div
            onClick={() => history.goBack()}
            className="title"
          >
            <h2>
              {" "}
              <IoIosArrowBack />{" "}
              {!!params?.id?.length ? "Edit Employee Setup" : "Employee Setup"}
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
                      //maxLength={15}
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
                      onKeyDown={handleSpace}
                    />
                  </div>

                  <div>
                    <TextInput
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      formRegister={register()}
                      className={"add-employee-text-input"}
                      //maxLength={15}
                    />
                  </div>
                </div>

                <div>
                  <TextInput
                    type="text"
                    placeholder="Nick Name"
                    name="nickName"
                    formRegister={register({
                      required: useNickname && "Required",
                    })}
                    //maxLength={15}
                    className={errors.nickName ? 'fN errorInputBox' : 'inputBox'}
                    onKeyDown={handleSpace}
                    onKeyPress={(e) => {
                      if(!/^[A-Za-z]*$/.test(e.key)){
                        e.preventDefault();
                      }
                    }}
                  />
                </div>

                <div className="checkBox" style={{marginTop:"-20px"}}>
                  <label> 
                    <input 
                      type="checkbox" 
                      className="checkbox" 
                      name="useNickname" 
                      checked={employee?.toUseNickName}
                      ref={register} />  
                    <p>Utilize a nickname as needed in all forthcoming activities</p>
                  </label>
                </div>

                <div className="flexBox">
                  <div>
                <div className={errors.mobileNumber ? 'num phoneErrorInput countryCodeMo' : 'phoneContainer countryCodeMo'}>
                  <div className="countryCode" style={{
                     display:'flex',
                     justifyContent:'center',
                     alignItems:'center',
                     border: '1px solid #B4B4B4',
                     backgroundColor: '#EFEFEF',
                     height:'48px',
                     width:'37px',
                     borderRadius:'4px 0 0 4px',
                     borderRight:'none'
                  }}>
                    {countryCode}
                  </div>
                <InputMask
                style={{marginRight:'15px'}}
                    mask="999-999-9999"
                    maskChar=""
                    {...register('mobileNumber', {
                      required: "Required",
                      validate: (value) => value.replace(/\D/g, '').length === 10 || "Invalid Number",
                    })}
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        type="text"
                        placeholder="Phone*"
                        className={errors.mobileNumber ? 'num phoneErrorInput' : 'phoneContainer'}
                      />
                    )}
                  </InputMask>
                  </div>
                    {errors.mobileNumber && errors.mobileNumber.type === 'validate' && (
                      <p style={{ fontSize: '12px', color: '#FF0505', marginTop: '15px' }}>
                        {errors.mobileNumber?.message}
                      </p>
                    )}
                  </div>
                  <div className="emailContainer">
                    <TextInput
                      type="email"
                      placeholder="Email"
                      name="email"
                      formRegister={register()}
                      className={"add-employee-text-input"}
                      onKeyDown={handleSpace}
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
                    onKeyDown={handleSpace}
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    placeholder="Address Line 2"
                    name="address2"
                    formRegister={register()}
                    className={"inputBox"}
                    onKeyDown={handleSpace}
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
                      onKeyDown={handleSpace}
                    />
                  </div>
                  <div 
                    className="date-picker-container"
                    style={{
                      marginTop:'-18px',
                      zIndex:'999999999'
                    }}
                  >
                    <DatePicker
                      placeholderText="MM/DD/YYYY"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      onChangeRaw={handleDateChangeRaw}
                      className="dateInput"
                      yearDropdownItemNumber={50}
                      scrollableYearDropdown
                      showYearDropdown
                      minDate={new Date(1970, 0, 1)}
                      maxDate={new Date()}
                      // isClearable={true}
                    />
                    <img
                      className="cal_icon"
                      alt="Calendar Icon"
                      src={Calendar}
                      width="15"
                      onClick={() => document.querySelector('.dateInput').focus()}
                      style={{right:'10px', top:'38%'}}
                    />
                  </div>
                    
                </div>
                <hr style={{marginRight:'40px'}}/>
                
                <h3>Formal Setup*</h3>
                <div className="flexContainer">
                
                <div className={errors.outlet?.type ? 'errorCustomInput' : 'selectContainer'} style={{ cursor: "pointer" }}>
                  <div style={{ zIndex: 0 }}>
                    <Controller
                      control={control}
                      name="outlet"
                      defaultValue={restaurantBranchDefaultValue}
                      rules={{
                        required: "Required",
                      }}
                      render={({ onChange, onBlur, value, name }) => (
                        <CustomDropdown
                          options={branchOptions}
                          placeholder={"Outlets*"}
                          onSelect={(outletSelected) => {
                            if (restaurantBranch && outletSelected) {
                              const selectedBranch = restaurantBranch.find(branch =>
                                branch?.locationName?.includes(outletSelected?.value)
                              );
                              if (selectedBranch) {
                                onChange(selectedBranch.locationName);
                              }
                            }
                          }}
                          value={restaurantBranchDefaultValue || (editEmployee ? editEmployee?.outlet : restaurantBranchDefaultValue)}
                          name={name}
                          controlClassName={
                            editEmployee || isDropdownDisabled
                              ? "disabled-dropdown add-employee-dropdown"
                              : "add-employee-dropdown"
                          }
                          arrowClassName={"add-employee-dropdown-arrow"}
                          placeholderClass={"dropDown"}
                          disabled={isDropdownDisabled}
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
                        placeholder={"Roles*"}
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
                      <p className="dropDownTitle fixedTitle" style={{textAlign: 'center', fontWeight: 600}}>Roles/Function</p>               
                      <div className="checkList">
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
                      </div>
                      <div className="functionBtn">
                        <button className="resetbtn"  value="Reset" onClick={handleReset}>
                          <span>
                          <img src={ResetLogo}/>
                          Reset
                          </span>
                        </button>
                        <button className="saveBtn"  value="Save" onClick={() => setOpenFuction(!openFunction)} >
                          Save
                        </button>
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
                    autoComplete = {false}
                    disabled={!!params?.id?.length}
                    onKeyDown={(event) => {
                      if(event.key === ' ' || event.code === 'Space'){
                        event.preventDefault()
                      }
                    }}
                    disabled={editEmployee}
                  />
                </div>
                
                <div>
                  <TextInput
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password*"
                    // minLength={6}
                    name="password"
                    formRegister={register({
                      required: !editEmployee && "Required",
                      validate : validatePassword
                    })}
                    className={!editEmployee && errors.password ? 'pass errorInput' :'add-employee-text-input'}
                    containerStyle={{ paddingBottom: "0px" }}
                    autoComplete = {false}
                    onKeyDown={handleSpace}
                  />
                  {isPasswordVisible ? (
                    <OpenEyeIcon
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={{
                      position: "relative",
                      bottom: 30,
                      left: 370, 
                      cursor:'pointer'
                    }}
                  />
                  ) : (
                  <ClosedEyeIcon
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={{
                      position: "relative",
                      bottom: 30,
                      left: 370, 
                      cursor:'pointer'
                    }}
                  />
                  )}
                  {errors.password && errors.password.type==='validate' && (
                    <p style={{ fontSize: '12px', color: '#FF0505', marginTop: '-15px' }}>
                      Enter valid password. Your password should contain 1 capital letter, 1 special character, and 1 number
                    </p>
                  )}
                </div>
              </div>

                <div
                  className="acess-flex"
                  style={{ marginTop: editEmployee ? 10 : 20 }}
                >
                  <p style={hasPinErrors ? {fontSize: "15px", color:' #FF0505'} : {fontSize: "15px", color:'#ccc'}}>Create Pin*</p>
                  <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
                    <div style={{ display: 'flex', border: hasPinErrors ? '1px solid #FF0505' : '1px solid #ccc', borderRadius: '7px' }}>
                      {[0, 1, 2, 3].map((i) => (                        
                        <input
                          key={`pin-${i}`}
                          ref={(el) => (inputRefs.current[i] = el)}
                          type={showPin ? 'text' : 'password'}
                          value={pins[i]}
                          onChange={(e) => handleChange(e, i)}
                          onKeyDown={(e) => handleKeyDown(e, i)}
                          name={`pin${i}`}
                          maxLength="1"
                          disabled
                          style={{
                            width: '40px',
                            fontSize: '16px',
                            textAlign: 'center',
                            border: 'none',
                            borderRight: i < 3 ? (errors[`pin${i}`] ? '1px solid #FF0505' : '1px solid #ccc') : 'none',
                            padding: '10px',
                            outline: 'none',
                          }}
                          {...register(`pin${i}`, { required: !editEmployee && "Required" })}
                          className={errors[`pin${i}`] ? 'errorInput' : ''}
                        />
                      ))}
                    </div>
                    <div>
                      <ResetIcon
                          onClick={refreshPinValue}
                          disabled={isGettingNewPin}
                          style={{
                            position: "relative",
                            marginLeft: 20, 
                            // marginRight:10,
                            cursor: 'pointer'
                          }}
                          className={isGettingNewPin ? 'rotating-div':''}
                        />
                    </div>
                    <div>
                      {showPin ? (
                        <OpenEyeIcon
                          onClick={toggleShowPin}
                          style={{
                            position: "relative",
                            left: 20, 
                            cursor: 'pointer'
                          }}
                          className={'openedEyeIcon'}
                        />
                      ) : (
                        <ClosedEyeIcon
                          onClick={toggleShowPin}
                          style={{
                            position: "relative",
                            left: 20, 
                            cursor: 'pointer'
                          }}
                          className={'closedEyeIcon'}
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
                <input 
                  className="clear-all-btn" 
                  type="button" 
                  value="Clear All" 
                  disabled = {addEmployeeLoading}
                />
              </span>
              <span>
                <input 
                  className="save-btn" 
                  type="submit" 
                  value={addEmployeeLoading || employeeUpdateLoading ? '' : "Save"} 
                /> 
                {(addEmployeeLoading || employeeUpdateLoading) && <div className="loaders"></div>}
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
