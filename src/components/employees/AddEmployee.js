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
import InputMask from "react-input-mask"
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
  refreshPin,
  getEmployeeRoleByIdRequest
} from "../../redux/actions/employeeActions";
import { useHistory, useParams } from "react-router";
import { ReactComponent as OpenEyeIcon } from "../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/svg/closed_eye.svg";
import { ReactComponent as ResetIcon } from "../../assets/svg/refresh-cw.svg";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dropdownRef = useRef(null)
  const [list, setList] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [isOutletDropdownOpen, setIsOutletDropdownOpen] = useState(false)
  const [isRoleDropDownOpen, setIsRoleDropDownOpen] = useState(false)
  const [openFunction, setOpenFuction] = useState(false)
  const [pins, setPins] = useState(['', '', '', ''])
  const [showPin, setShowPin] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const inputRefs = useRef([])
  const [checkedFunctions, setCheckedFunctions] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [checkedModules, setCheckedModules] = useState([])
  const credentials = useSelector((state) => state.auth.credentials);

  const isValidDate = (date) => !isNaN(date.getTime()); 
  const params = useParams()

  const employee = useSelector((state) => state.employee.employeeByIdDetails)

  const employeeByIdDetailsLoading =  useSelector((state) => state.employee.employeeByIdDetailsLoading)

  const refreshNewPin = useSelector((state) => state.employee.refreshPin)
  const isGettingNewPin = useSelector((state) => state.employee.isGettingNewPin)

  const roleFunctionFetching = useSelector((state) => state.employee.roleFunctionFetching)
  const rolesAndFunctions = useSelector((state) => state.employee.rolesAndFunctions)
  const [localRoleFunctionFetching, setLocalRoleFunctionFetching] = useState(false);

  const [dataFetching, setDataFetching] = useState(true);
  const [saveBtndisable, setSaveBtnDisable] = useState(false);

  useEffect(()=> {
    params?.id?.length && dispatch(getEmployeeByIdRequest({staffId:params.id,sagaCallBack:invokePermission}));
    !params?.id?.length && dispatch(clearEditEmployeeData())
    !params?.id?.length && credentials?.merchantId && dispatch(refreshPin(credentials?.merchantId))
  },[params.id, credentials])

  // const invokePermission =(employeeData)=>{
  //   employeeData?.isActive &&  dispatch(getEmployeeRoleByIdRequest({staffId:employeeData.staffId}));
  // }

  const invokePermission = (employeeData, statusCode) => {
    setSaveBtnDisable(statusCode === 403 ? true : false)
    if(employeeData?.isActive ){
      setLocalRoleFunctionFetching(true);
      dispatch(getEmployeeRoleByIdRequest({
        staffId:employeeData.staffId,
        sagaCallBack: ()=>{setDataFetching(false)}
      }))
    }
    !employeeData && !employeeData?.isActive && setDataFetching(false)
  }

  // useEffect(() => {
  //   dispatch(setEditEmployeeData(employee))
  // },[employee])

  // const employee = useSelector(
  //   (state) => state.employee.employee
  // )

  const [editEmployee,setEditEmployee] = useState('')

useEffect(() => {
if(employee && !dataFetching) { 
  setEditEmployee({
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
    rolesAndFunctions: rolesAndFunctions
  })}
}, [employee,employeeByIdDetailsLoading , localRoleFunctionFetching,dataFetching])


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
    trigger,
    reset,
    clearErrors
  } = useForm()

  const [pin, setPin] = useState(
    editEmployee ? editEmployee.devicePin : getValues("devicePin")
  )
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

  const userBranchName = useSelector((state)=>state.auth.restaurantDetails.branchName) 

  const [countryCode,setCountryCode] = useState("");
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [nickname, setNickname] = useState(editEmployee ? employee?.toUseNickName : false);
  const useNicknameWatch = watch("useNickname", false);
  const [useNickname, setUseNickname] = useState(false);

  const [restaurantBranch,setRestaurantBranch] = useState([]);
  const [restaurantBranchDefaultValue,setRestaurantBranchDefaultValue]  = useState("");
  const branchOptions = restaurantBranch ? restaurantBranch.map(branch => branch?.locationName) : [];
  const saveButtonDisabled = useSelector((state) => state.employee.saveButtonDisabled)
  const employeeRoleAndFunctionsLoading = useSelector((state) => state.employee.employeeRoleAndFunctionsLoading)


  
  useEffect(() => {
    const countryC = restaurantDetails?.country;
    if (restaurantDetails) {
      countryC && setCountryCode(countryC === "US" ? '+1 ' : "+91 ");
      setRestaurantBranch(restaurantDetails?.branch);
      if (restaurantDetails?.branch) {
        setRestaurantBranchDefaultValue(userBranchName);
        setValue('outlet', userBranchName);
      } else {
        setRestaurantBranchDefaultValue("");    
        setIsDropdownDisabled(false);
      }
      const isOutletHasDropDown = credentials?.role && credentials?.role === "Restaurant_Owner" ? true : 
                                  credentials?.role === "Regional_Employee" ? true : 
                                  credentials?.role === "Restaurant_Manager" ? true : 
                                  false;
      if (isOutletHasDropDown ) {
        setIsDropdownDisabled(false);
      } else {
        setIsDropdownDisabled(true);
        setValue('outlet', userBranchName);
      }
    }
  }, [restaurantDetails, credentials, setValue, userBranchName]);


  
  useEffect(() => {
    dispatch(getEmployeeRoles())
  }, [])
  
  const roles = useSelector((state) => state.employee.employeeRoleAndFunctions) 

  useEffect(() => {
    if (employee) {
      setUseNickname(employee.toUseNickName || false);
      setValue("useNickname", employee.toUseNickName || false);
    }
  }, [employee, setValue]);

  const handleNickNameCheckboxChange = (event) => {
    setUseNickname(event.target.checked);
  };

  useEffect(() => {
    const tempArr = [];
    if (rolesAndFunctions?.length > 0) {
      for (let i = 0; i < rolesAndFunctions?.length; i++) {
        const roleFunc = rolesAndFunctions[i];
        
        if (roleFunc?.funtions) { 
          for (let j = 0; j < roleFunc.funtions.length; j++) {
            tempArr.push(roleFunc.funtions[j].toLowerCase());
          }
        }
      }
    }
    setCheckedFunctions(tempArr);
  }, [employee,rolesAndFunctions]); 

  const watchUserId = watch("userId");
  const watchFirstName = watch("firstName");
  const watchLastName = watch("lastName");
  // const useNickname = watch("useNickname", false);
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
        "Regional_Employee",
        "Operator",
        "Owner",
        "Delivery",
      ];
    } else {
      return [
        "Chef",
        "Restaurant_Manager",
        "Restaurant_Owner",
        "Regional_Employee",
        "Supervisor",
        "Waiter",
        "Host",
        "Delivery",
        "Cashier",
      ];
    }
  };  


  const replaceUnderscoresWithSpaces = (str) => {
    return str.replace(/_/g, ' ');
  };
  
  const processedOptions = getRole().map(option => ({
    value: option,
    label: replaceUnderscoresWithSpaces(option),
  }));

  const [otp, setOtp] = useState('');

  
  useEffect(() => {
    if (!addEmployeeLoading && employeeAdded) {
      dispatch(resetAddEmployee());
      history.replace("/management/employees")
    }
  }, [addEmployeeLoading, employeeAdded])

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenFuction(false);
    }
  };

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
    setSelectedRole(prevRole => {
      if (editEmployee && prevRole === role) {
        initializeCheckedFunctions(editEmployee.rolesAndFunctions);
      } else {
        const functionsForRole = roles
          .flatMap(module => module.functionality)
          .filter(func => func.roles?.includes(role))
          .map(func => func.name.toLowerCase());
        
        setCheckedFunctions(functionsForRole);
      }
        return role;
    });
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
      const functionsForRole = roles
        .flatMap((module) => module?.functionality)
        .filter((func) => func?.roles?.includes(selectedRole))
        .map((func) => func?.name?.toLowerCase());
  
      setCheckedFunctions(functionsForRole);
  };
  
  const isDefaultActionsUpdated = (selectedFunctions, role) => {
    const defaultFunctions = roles
      .flatMap((module) => module?.functionality)
      .filter((func) => func?.roles?.includes(role))
      .map((func) => func?.name?.toLowerCase());
    const selectedFunctionNames = selectedFunctions.map((func) => func.name.toLowerCase());
    const hasExtraFunctions = selectedFunctionNames.some((func) => !defaultFunctions.includes(func));
    const hasMissingFunctions = selectedFunctionNames.length !== defaultFunctions.length;
    return hasExtraFunctions || hasMissingFunctions;
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

  const refreshPinValue = ()=>{
    dispatch(refreshPin(credentials?.merchantId))
  }

  const hasPinErrors = [0, 1, 2, 3].some(i => errors[`pin${i}`]); //pins.length !== 4;

  useEffect(() => {
    if (refreshNewPin) {
      const pinString = refreshNewPin.toString();
      const formattedPins = pinString.padEnd(4, '0').slice(0, 4).split('');
      setPins(formattedPins);
      formattedPins.forEach((pin, index) => {
        setValue(`pin${index}`, pin); 
        trigger(`pin${index}`);
      });
    }
  }, [refreshNewPin]);

  const removeDashes=(phoneNumber)=> {
    return phoneNumber.replace(/-/g,'');
  }

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
      nickName: formValues.nickName.trim(),
      email: formValues.email || null,
      mobileNumber: formValues?.mobileNumber && formValues?.mobileNumber?.length > 0 ? removeDashes(formValues.mobileNumber) : "" ,
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

    if (params?.id?.length) {
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
    if (employee && !dataFetching) {
      if(employee?.dateOfBirth && employee?.dateOfBirth?.length > 0){
        const date = new Date(employee?.dateOfBirth);
        setSelectedDate(date)
      }
      setValue('firstName',employee?.firstName?.trim() || '')
      setValue('lastName', employee?.lastName?.trim() || '')
      setValue('mobileNumber', employee?.phone || '')
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
  }, [employee,employeeByIdDetailsLoading , localRoleFunctionFetching,dataFetching]);

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

const handleOtpChange = (otpValue) => {
  setOtp(otpValue);
};

const [key, setKey] = useState(Math.random());


const handleCleardata = () => {
  if (!editEmployee) {
    setValue('firstName', null);
    setValue('lastName', null);
    setValue('mobileNumber', '')
    setValue('nickName', null);
    setValue('education', null);
    setValue('role', null);  
    setSelectedDate(null);
    setValue('dateOfBirth', null);
    setValue('userId', null);
    setValue('outlet', null);
    setValue('address1', null);
    setValue('address2', null);
    setValue('password', null);
    setValue('email', null);
    setSelectedRole("");  
    setUseNickname(false);
    setOpenModal(false);
    clearErrors();
    setKey(Math.random());
  } else {
    history.goBack();
  }
}


if(!!params?.id?.length && dataFetching)  {
  return (
    <p style={{
      display: "flex",
      justifyContent: "center",
      paddingTop: "25%",
      marginLeft:'35%'
    }}>Loading, Please wait!!</p>
  )}
  return (
    <>
        <div className="menu-details">
        <div className='headLine2' 
             >
                <h3 style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    // padding: '10px',
                    fontWeight:'400',
                    fontSize:'24px'
                }}
                >
                    <IoIosArrowBack onClick={() => history.goBack()} />{" "}
                    {!!params?.id?.length ? "Edit Employee Setup" : "Employee Setup"}
                </h3>
          
            </div>
          {/* <div
            // onClick={() => history.goBack()}
            className="title"
          >
            <h2 className="addEmployeeHeader">
              {" "}
              <IoIosArrowBack onClick={() => {history.goBack()}} />{" "}
              {!!params?.id?.length ? "Edit Employee Setup" : "Employee Setup"}
            </h2>
          </div> */}
          <h3 style={{marginTop:'80px'}}>Personal Info</h3>
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
                      onKeyPress={(e) => {
                        if (e.key === ' ' && e.target.value.length < 1 || !/^[A-Za-z\s]$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>

                  <div>
                    <TextInput
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      formRegister={register()}
                      className={"add-employee-text-input"}
                      onKeyPress={(e) => {
                        if (e.key === ' ' && e.target.value.length < 1 || !/^[A-Za-z\s]$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
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
                    className={errors.nickName ? 'fN errorInputBox' : 'inputBox'}
                    onKeyPress={(e) => {
                      if (e.key === ' ' && e.target.value.length < 1) {
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
                      checked={useNickname}
                      onChange={handleNickNameCheckboxChange}
                      ref={register} 
                    />  
                    <p>Utilize a nickname as needed in all forthcoming activities</p>
                  </label>
                </div>

                <div className="flexBox">
                  <div>
                  <div className={!useNickname && errors.mobileNumber ? 'num phoneErrorInput countryCodeMo' : 'phoneContainer countryCodeMo'}>
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
                  <Controller
                    name="mobileNumber"
                    control={control}
                    rules={{
                      validate: {
                        validLength: (value) => !value || value.replace(/\D/g, '').length === 10 || "Phone number must be 10 digits",
                      }
                    }}
                    render={({ onChange, onBlur, value, name }) => (
                      
                      <InputMask
                        mask="999-999-9999"
                        maskChar=""
                        onChange={(e) => onChange(e.target.value)}
                        value={value}
                        name={name}
                      >
                        {(inputProps) => (
                          <input
                            {...inputProps}
                            type="text"
                            placeholder="Phone"
                            id="mobileNumber"
                            className={errors.mobileNumber ? 'num phoneErrorInput' : 'phoneContainer'}
                            maxLength={12}
                          />
                        )}
                      </InputMask>
                    )}
                  />
                  </div>
                    {(errors.mobileNumber  || (errors.mobileNumber && errors.mobileNumber.type === 'validate')) && (
                      <p style={{ fontSize: '12px', color: '#FF0505', marginTop: '15px' }}>
                        {errors.mobileNumber?.message}
                      </p>
                    )}
                  </div>

                  <div className="emailContainer">
                    <TextInput
                      type="text"
                      placeholder="Email"
                      name="email"
                      formRegister={register()}
                      className={"emailInput"}
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
                      zIndex:'9999999'
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
                        options={processedOptions}
                        placeholder={"Roles*"}
                        onSelect={(role) => {
                          // console.log({role});
                          onChange(role.value);
                          handleRoleChange(role.value);
                          if (jwt_decode(credentials?.accessToken)?.resource_access["merchant-app"]?.roles[0].includes("neighbourhood")) {
                            onChange(role.value + "-neighbourhood");
                          }
                        }}
                        disabled={employeeRoleAndFunctionsLoading}
                        value={editEmployee ? editEmployee.role : value}
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
                    <div className="dropDownContainer"> 
                      <div className="functionsDropDown" ref={dropdownRef}>     
                      <p className="dropDownTitle fixedTitle" style={{textAlign: 'center', fontWeight: 500}}>Roles/Functions</p>               
                      { employeeRoleAndFunctionsLoading ? <p className="rfLoading">Loading, Please wait!!</p> : <div className="checkList">
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
                              <div className="checkBoxItemfunction" >
                              {module.functionality.map((func) => (
                                <div key={func.name}>
                                  <label className="checkboxLabel">
                                    <input 
                                      type="checkbox" 
                                      className="checkbox" 
                                      checked={isFunctionChecked(func.name)} 
                                      onChange={() => handleCheckboxChange(func.name)} 
                                    />
                                    <p className="funcName">{func.name}</p>
                                  </label>
                                </div>
                              ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>}
                      <div className="functionBtn">
                        <button 
                          className="resetbtn" 
                          type="button" 
                          value="Reset" 
                          onClick={handleReset}
                        >
                          <span>
                          <img src={ResetLogo}/>
                          Reset
                          </span>
                        </button>
                        <button className="saveBtn" value="Save" onClick={() => setOpenFuction(!openFunction)} style={{border:'none'}} >
                          Save
                        </button>
                      </div>
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
                      // disabled={editEmployee}
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
                  </div>
                  {errors.password && errors.password.type==='validate' && (
                      <p className="passwordErrorText">
                        <p>Invalid Password</p>
                        Your password should be atleast 8 characters.
                        <ul>
                          <li>Atleast one uppercase</li>
                          <li>Atleast one Specialcharacter</li>
                          <li>Atleast one Numeric</li>
                        </ul>
                      </p>
                    )}
                </div>

              <div
                className="acess-flex"
                style={{ marginTop: editEmployee ? 10 : 20 }}
              >
                <p style={hasPinErrors ? {fontSize: "15px", color:' #FF0505'} : {fontSize: "15px",}}>Create Pin*</p>
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
                  if(!editEmployee){
                    setOpenModal(!openModal)
                  }else{
                    history.goBack();
                  }
                }}
              >
                <input 
                  className="clear-all-btn" 
                  type="button" 
                  value={ editEmployee ? "Back" :" Clear All"}
                  disabled = {addEmployeeLoading || employeeUpdateLoading}
                />
              </span>
              <span>
                <input 
                  className="save-btn" 
                  type="submit" 
                  value={addEmployeeLoading || employeeUpdateLoading ? '' : "Save"} 
                  disabled={saveBtndisable}
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
                    handleCleardata()
                    // history.goBack();
                  }} 
                />
                <input type="button" className="noBtn" value='No' onClick={()=>{setOpenModal(!openModal)}} />
              </div>
            </div>
          </div>}
        </div>
      
    </>
  )
}

export default AddEmployee;
