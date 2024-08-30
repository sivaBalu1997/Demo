import React, { useState } from 'react'
import './style/employeeForm.css'
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../assets/images/cal.png";
import ResetLogo from "../../assets/images/resetIcon.png";
import { useEffect, useRef } from "react";
import CustomDropdown from "../../components/common/customDropdown";
import { useParams } from "react-router";
import { ReactComponent as OpenEyeIcon } from "../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/svg/closed_eye.svg";
import { ReactComponent as ResetIcon } from "../../assets/svg/refresh-cw.svg";
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";


import {
  refreshPin,
} from "../../redux/employee/employeeActions";


const EmployeeForm = () => {

    const [selectedRole, setSelectedRole] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [restaurantBranch,setRestaurantBranch] = useState([]);
    const [restaurantBranchDefaultValue,setRestaurantBranchDefaultValue]  = useState("");
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
    const [pins, setPins] = useState(['', '', '', ''])
    const [showPin, setShowPin] = useState(true)
    const [selectedDate, setSelectedDate] = useState(null)
    const [checkedFunctions, setCheckedFunctions] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [checkedModules, setCheckedModules] = useState([])
    const [openFunction, setOpenFuction] = useState(false)
    const [countryCode,setCountryCode] = useState("");

    const isGettingNewPin = useSelector((state) => state.employee.isGettingNewPin)
    const branchOptions = restaurantBranch ? restaurantBranch.map(branch => branch?.locationName) : [];
    const credentials = useSelector((state) => state.auth.credentials);
    const employee = useSelector((state) => state.employee.employeeByIdDetails)
    const rolesAndFunctions = useSelector((state) => state.employee.rolesAndFunctions)
    const roles = useSelector((state) => state.employee.employeeRoleAndFunctions)
    const restaurantDetails = useSelector((state) => state.auth.restaurantDetails)
    const userBranchName = useSelector((state)=>state.auth.restaurantDetails.branchName) 
    const refreshNewPin = useSelector((state) => state.employee.refreshPin)

    const inputRefs = useRef([])
    const dropdownRef = useRef(null)

    const history = useHistory();
    const dispatch = useDispatch()

    const { 
            register, 
            handleSubmit, 
            getValues,
            setValue, 
            trigger, 
            control, 
            formState, 
            errors, 
            reset 
          } = useForm({
              defaultValues: {
                firstName: '',  
                lastName: '',
                fullName: '',
                role: '',
                businessName: '',
                userId: '',
                nickName: '',
                email: '',
                mobileNumber: '',
                address1: '',
                address2: '',
                dateOfBirth: '',
                education: '',
                devicePin: '',
                IsTempPassword: false,
                password: '',
                isToUseNickName: false,     
              }
    });
  
    const onSubmit = (formValues) => {
      console.log({formValues})
    };
  
    const resetForm = () => {
      reset();
    };

    const refreshPinValue = ()=>{
      dispatch(refreshPin(credentials?.merchantId))
    }

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
    }, [refreshNewPin, setValue, getValues, trigger])

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
    rolesAndFunctions: rolesAndFunctions
  }

  useEffect(() => {
    const countryC = restaurantDetails?.country;
    if (restaurantDetails) {
      countryC && setCountryCode(countryC === "US" ? '+1 ' : "+91 ");
      setRestaurantBranch(restaurantDetails?.branch);
      if (restaurantDetails?.branch) {
        setRestaurantBranchDefaultValue(userBranchName);
        setIsDropdownDisabled(true);
        setValue('outlet', userBranchName);
      } else {
        setRestaurantBranchDefaultValue("");    
        setIsDropdownDisabled(false);
      }
      const isOutletHasDropDown = credentials?.role ? true : credentials?.role === "Restaurant_Owner" ? true : 
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


  const replaceUnderscoresWithSpaces = (str) => {
    return str.replace(/_/g, ' ');
  };
  
  const processedOptions = getRole().map(option => ({
    value: option,
    label: replaceUnderscoresWithSpaces(option),
  }));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pins];
      newPin[index] = value;
      setPins(newPin);
      setValue(`pin${index}`, value);

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
  
    return selectedFunctionNames.some((func) => !defaultFunctions.includes(func));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  }

  
  return (
    <div className='employeeFormContainer'>
      <div className='employeeFormHeader'>
        <IoIosArrowBack 
            className='backArrow' 
            onClick={() => history.goBack()}
        />
        <h3>Employee Setup</h3>
      </div>
      <form className='formStyle' onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className='employeeFormBody'>
        <h3 className='employeeFormTitle'>Personal Info</h3>
          <div >
            <div className="employeeForm">
                <div className="flexContainer">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name*"
                      name="firstName"
                      ref={register({
                        required: "Required",
                      })}
                      onKeyPress={(e) => {
                        if (!/^[A-Za-z\s]$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      error={null}
                      className={
                        errors.firstName?.type === "required" ? "errorInput" : "nameInput"
                      }
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      className="nameInput"
                      onKeyPress={(e) => {
                        if (!/^[A-Za-z\s]$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Nick Name"
                    name="nickName"
                    className={errors.nickName ? 'fN errorInputBox' : 'nickNameInput'}
                  />
                </div>

                <div className="employeeCheckBox">
                  <label className='checkBoxLabel'> 
                    <input 
                      type="checkbox" 
                      className="checkbox" 
                      name="useNickname" 
                    />  
                    <p>Utilize a nickname as needed in all forthcoming activities</p>
                  </label>
                </div>

                <div className="flexbox">
                  <div>
                    <div className='phoneContainer'>
                      <div className="countryCode">
                        {countryCode}
                      </div>
                      <input
                        type="text"
                        placeholder="Phone"
                        name="mobileNumber"
                        className='phoneInput'
                        formRegister={register({
                          validate: (value) =>{
                            if(value.length > 1 && value.length < 10 ){
                              return "Invalid Number"
                            }
                            return true
                          }
                        })}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.mobileNumber && errors.mobileNumber.type === 'validate' && (
                      <p style={{ fontSize: '12px', color: '#FF0505', marginTop: '15px' }}>
                        {errors.mobileNumber?.message}
                      </p>
                    )}
                    </div>
                  </div>

                  <div className="emailContainer">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="emailInput"
                    />
                  </div>
                </div>

                <div className='employeeAddressFormContainer'>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    name="address1"
                    className="employeeAddressForm"
                  />
                </div>

                <div className='employeeAddressForm'>
                  <input
                    type="text"
                    placeholder="Address Line 2"
                    name="address2"
                    className="employeeAddressForm"
                  />
                </div>

                <div className="flexContainer">
                  <div>
                    <input
                      type="text"
                      placeholder="Education"
                      name="education"
                      className={"educationInput"}
                    />
                  </div>

                  <div className="date-picker-container">
                    <DatePicker
                      name='dateOfBirth'
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
                    />
                    <img
                      className="cal_icon"
                      alt="Calendar Icon"
                      src={Calendar}
                      width="15"
                      onClick={() => document.querySelector('.dateInput').focus()}
                    />
                  </div>
                    
                </div>

                <hr className='employeeFormSeperater' />
                
                <h3>Formal Setup*</h3>

                <div className="flexContainer">               
                  <div className={errors.outlet?.type ? 'errorCustomInput' : 'selectContainer'}>
                    <div>
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

                  <div className={errors.role?.type ? "errorCustomInput" : "selectContainer"}>
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
                            onChange(role.value);
                            handleRoleChange(role.value);
                            if (jwt_decode(credentials?.accessToken)?.resource_access["merchant-app"]?.roles[0].includes("neighbourhood")) {
                              onChange(role.value + "-neighbourhood");
                            }
                          }}
                          value={editEmployee ? editEmployee.role : value}
                          name={name}
                          placeholderClass={"dropDown"}
                          controlClassName={"add-employee-dropdown"}
                          arrowClassName={"add-employee-dropdown-arrow"}
                        />
                      )}
                    />
                    {selectedRole && <div className="employeeFormRoleFunction">
                      <p onClick={() => setOpenFuction(!openFunction)}>Edit Roles/Functions</p>
                    </div>}
                    {openFunction && (
                      <div className="dropDownContainer"> 
                        <div className="functionsDropDown" ref={dropdownRef}>     
                        <p className="dropDownTitle fixedTitle" style={{textAlign: 'center', fontWeight: 500}}>Roles/Functions</p>               
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
                        </div>

                        <div className="functionBtn">
                          <button 
                            className="resetbtn" 
                            type="button" 
                            value="Reset" 
                            onClick={handleReset}
                          >
                            <span>
                              <img src={ResetLogo}/>Reset
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
                    <input
                      type="text"
                      placeholder="User ID*"
                      name="userId"
                      ref={register({
                        required: "Required",
                      })}
                      className={errors.userId ? 'errorInput' :'userIdInput'}
                      autoComplete = {false}
                      onKeyDown={(event) => {
                        if(event.key === ' ' || event.code === 'Space'){
                          event.preventDefault()
                        }
                      }}
                    //   disabled={!!params?.id?.length}
                      // disabled={editEmployee}
                    />
                  </div>
                  
                  <div>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Password*"
                      // minLength={6}
                      name="password"
                      ref={register({
                        required: "Required",
                      })}                      
                      className={errors.password ? 'errorPassInput' :'passwordInput'}
                      autoComplete = {false}
                    />
                    {isPasswordVisible ? (
                      <OpenEyeIcon
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className='employeeFormEyeIcon'
                    />
                    ) : (
                    <ClosedEyeIcon
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className='employeeFormEyeIcon'
                    />
                    )}
                    {errors.password  && (
                      <p className='errorPassText'>
                        Enter valid password. Your password should contain atleast 8 characters, 1 capital letter, 1 special character, and 1 number
                      </p>
                    )}
                  </div>
                </div>

                <div className="acess-flex">
                  <p>Create Pin*</p>
                  <div className="input-wrapper">
                    {[0, 1, 2, 3].map((i) => (
                      <input
                      key={`pin-${i}`}
                      ref={(el) => (inputRefs.current[i] = el)}
                      type={showPin ? 'text' : 'password'}
                      name={`pin${i}`}
                      maxLength="1"
                      disabled
                      {...register(`pin${i}`, { required: "Required" })}
                      value={getValues(`pin${i}`) || ''}
                      className={`pin-input ${errors[`pin${i}`] ? 'errorInput' : ''}`}
                      />
                    ))}
                  </div>
                  <div className="icon-wrapper">
                    <ResetIcon
                      onClick={refreshPinValue}
                      disabled={isGettingNewPin}
                      className={isGettingNewPin ? 'rotating-div' : 'resetIcon'}
                    />
                    {showPin ? (
                      <OpenEyeIcon onClick={toggleShowPin} className="eyeIcon show" />
                    ) : (
                      <ClosedEyeIcon onClick={toggleShowPin} className="eyeIcon hide" />
                    )}
                  </div>  
                </div>

            </div>

              {/* <div className="btn form-cta">
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
              </div> */}
          </div>
        </div>

        <div className='employeeFormFooter'>
            <input 
                className='employeeForm-clearAll'
                type='button'
                onClick={resetForm}
                value={'Clear All'}
            />
            <input
                className='employeeForm-save'
                type='submit'
                value={'Save'}
            />
        </div>
      </form>
    </div>
  )
}

export default EmployeeForm
