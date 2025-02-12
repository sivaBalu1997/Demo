import React, { useEffect,useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../../components/common/TextInput";
import CustomDropdown from "../../components/common/customDropdown";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../assets/svg/newCalendar.svg";
import ResetLogo from "../../assets/images/resetIcon.png";
import InputMask from "react-input-mask"
import alertImg from '../../assets/svg/alert-triangle.svg'
import info from '../../assets/svg/info.svg'
import {
  addEmployee,
  resetAddEmployee,
  updateEmployeeClear,
  getEmployeeRoles,
  updateEmployeeRequest,
  resetEmployeeActionCompleted,
  getEmployeeByIdRequest,
  clearEditEmployeeData,
  refreshPin,
  getEmployeeRoleByIdRequest
} from "../../redux/employee/employeeActions";
import { useHistory, useParams } from "react-router-dom";
import { ReactComponent as OpenEyeIcon } from "../../assets/svg/eyeOpenNew.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/svg/newEye.svg";
import { ReactComponent as ResetIcon } from "../../assets/svg/refresh-cw.svg";
import Modal from "../../components/Modal/Modal";
import { RootState } from "redux/rootReducer";
import { EditEmployeeType, EmployeeIdByDetails, RoleType, RolesAndFunctions } from "interface/employeeInterface";
import { RestaurantDetails } from "interface/authInterface";
import SidePanel from "pages/SidePanel";

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
  const [pins, setPins] = React.useState(['', '', '', ''])
  const [showPin, setShowPin] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date|null>(null)
  const inputRefs = useRef<(HTMLInputElement|null)[]>([])
  const [checkedFunctions, setCheckedFunctions] = useState<string[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [checkedModules, setCheckedModules] = useState([])

  const credentials = useSelector((state:RootState) => state.auth.credentials);

  interface RouteParams {
    id?: string; 
  }

  interface DecodedToken {
    resource_access?: {
      "merchant-app"?: {
        roles?: string[];
      };
    };
  }

  const params = useParams<RouteParams>()

  const employee : EmployeeIdByDetails | null = useSelector((state:RootState) => state.employee.employeeByIdDetails || 'null')

  const employeeByIdDetailsLoading =  useSelector((state:RootState) => state.employee.employeeByIdDetailsLoading)

  const refreshNewPin = useSelector((state:RootState) => state.employee.refreshPin)
  const isGettingNewPin = useSelector((state:RootState) => state.employee.isGettingNewPin)

  const roleFunctionFetching = useSelector((state:RootState) => state.employee.roleFunctionFetching)
  const rolesAndFunctions : RolesAndFunctions[] = useSelector((state:RootState) => state.employee.rolesAndFunctions)
  const [localRoleFunctionFetching, setLocalRoleFunctionFetching] = useState(false);

  const [dataFetching, setDataFetching] = useState<boolean>(true);
  const [saveBtndisable, setSaveBtnDisable] = useState(false);

  useEffect(()=> {
    params?.id?.length && dispatch(getEmployeeByIdRequest({staffId:params.id,sagaCallBack:invokePermission}));
    !params?.id?.length && dispatch(clearEditEmployeeData())
    !params?.id?.length && credentials?.merchantId && dispatch(refreshPin(credentials?.merchantId))
  },[params.id, credentials])

  // const invokePermission =(employeeData)=>{
  //   employeeData?.isActive &&  dispatch(getEmployeeRoleByIdRequest({staffId:employeeData.staffId}));
  // }

  const invokePermission = (employeeData:any, statusCode:number) => {
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

  const [editEmployee, setEditEmployee] = React.useState<EditEmployeeType>();

  useEffect(() => {
  if(employee && !dataFetching) { 
    setEditEmployee({
      firstName: employee?.firstName  || '',
      lastName: employee?.lastName || '',
      mobileNumber: employee?.phone || '',
      nickName : employee?.nickName || '',
      education: employee?.education || '',
      role: employee?.assignedRole || '',
      email: employee?.email || '',
      pin: employee?.pin || '',
      dateOfBirth: employee?.dateOfBirth || '',
      userId: employee?.userId || '',
      outlet: employee?.locationName || '',
      staffId: employee?.staffId || '',
      rolesAndFunctions: rolesAndFunctions
    })}
  }, [employee,employeeByIdDetailsLoading , localRoleFunctionFetching, dataFetching])


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

  const employeeAdded = useSelector((state:RootState) => state.employee.employeeAdded);
  const updatePinMessage = useSelector(
    (state:RootState) => state.employee.updateEmployeePINMessage
  )
  const updatePinLoading = useSelector(
    (state:RootState) => state.employee.updateEmployeePINLoading
  )
  const updatePinSuccess = useSelector(
    (state:RootState) => state.employee.updateEmployeePINSuccess
  )
  const updatePinFailed = useSelector(
    (state:RootState) => state.employee.updateEmployeePINFailed
  )
  const addEmployeeMessage = useSelector(
    (state:RootState) => state.employee.addEmployeeMessage
  )
  const addEmployeeLoading = useSelector(
    (state:RootState) => state.employee.addEmployeeLoading
  )
  const outlets = useSelector((state:RootState) => state.employee.outlets);
  const employeeUpdateLoading = useSelector((state:RootState) => state.employee.employeeUpdateLoading)
  const employeeUpdated = useSelector((state:RootState) => state.employee.employeeUpdated);
  const employeeActionCompleted = useSelector((state:RootState) => state.employee.employeeActionCompleted);
  const addEmployeeFailure = useSelector((state:RootState) => state.employee.addEmployeeFailure)
  const updateEmployeeFailure = useSelector((state:RootState) => state.employee.updateEmployeeFailure)

  const restaurantDetails = useSelector((state:RootState) => state.auth.restaurantDetails)

  const userBranchName = useSelector((state:RootState)=>state.auth?.restaurantDetails?.branchName || null) 

  const [countryCode,setCountryCode] = useState("");
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [nickname, setNickname] = useState(editEmployee ? employee?.toUseNickName : false);
  const useNicknameWatch = watch("useNickname", false);
  const [useNickname, setUseNickname] = useState(false);

  const [restaurantBranch,setRestaurantBranch] = useState<RestaurantDetails["branch"]>([]);
  const [restaurantBranchDefaultValue,setRestaurantBranchDefaultValue]  = useState<string|null>("");
  const branchOptions = restaurantBranch 
  ? restaurantBranch.map((branch) => ({
      value: branch?.locationName || "",
      label: branch?.locationName || ""
    })) 
  : [];  const employeeRoleAndFunctionsLoading = useSelector((state:RootState) => state.employee.employeeRoleAndFunctionsLoading)

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
                                  credentials?.role === "Magil_Admin" ? true :
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
  
  const roles = useSelector((state:RootState) => state?.employee?.employeeRoleAndFunctions) 

  useEffect(() => {
    if (employee) {
      setUseNickname(employee.toUseNickName || false);
      setValue("useNickname", employee.toUseNickName || false);
    }
  }, [employee, setValue]);

  const handleNickNameCheckboxChange = (event:ChangeEvent<HTMLInputElement>) => {
    setUseNickname(event.target.checked);
  };

  useEffect(() => {
    const tempArr = [];
    if (rolesAndFunctions?.length > 0) {
      for (let i = 0; i < rolesAndFunctions?.length; i++) {
        const roleFunc : any = rolesAndFunctions[i];
        
        if (roleFunc?.funtions) { 
          for (let j = 0; j < roleFunc.funtions.length; j++) {
            tempArr.push(roleFunc.funtions[j].toLowerCase());
          }
        }
      }
    }
    setCheckedFunctions(tempArr);
  }, [employee,rolesAndFunctions]); 

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

  const getRole = () => {
    const neighbourhoodDeliveryRole = [
      "Operator-neighbourhood",
      "Branch manager-neighbourhood",
      "Regional manager-neighbourhood",
      "Owner-neighbourhood",
      "Delivery-neighbourhood",
    ];
  
    const decodedToken : any = credentials?.accessToken ? jwt_decode(credentials.accessToken) : null;
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


  const replaceUnderscoresWithSpaces = (str:string) => {
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
      history.replace("/employees")
    }
  }, [addEmployeeLoading, employeeAdded])


  useEffect(() => {
    if (editEmployee && editEmployee.role) {
      setSelectedRole(editEmployee.role);
    }
  }, [editEmployee]);

  const handleChange = (e : ChangeEvent<HTMLInputElement>, index:number) => {
    const value = e.target.value;
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pins];
      newPin[index] = value;
      setPins(newPin);
      setValue(`pin${index}`, value);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e : KeyboardEvent<HTMLInputElement>, index:number) => {
    if (e.key === 'Backspace' && !pins[index] && index > 0) {
      inputRefs?.current[index - 1]?.focus();
    }
  };

  const handleSpace = (event:KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' && (event.target as HTMLInputElement).value.length === 0) {
      event.preventDefault();
    }
  };

  const toggleShowPin = () => {
    setShowPin(!showPin)
  }

  const initializeCheckedFunctions = (rolesAndFunctions:RolesAndFunctions[]) => {
    const functionsSet = new Set<string>();
    rolesAndFunctions.forEach(roleFunc => {
      if (roleFunc.funtions) {
        roleFunc.funtions.forEach(func => {
          functionsSet.add(func.name.toLowerCase());
        });
      }
    });
    setCheckedFunctions([...functionsSet]);
  };
  
  const handleRoleChange = (role:string) => {
    setSelectedRole(prevRole => {
      if (editEmployee && prevRole === role) {
        initializeCheckedFunctions(editEmployee.rolesAndFunctions);
      } else {
        const functionsForRole = (roles as RolesAndFunctions[])
          .flatMap(module => module?.functionality ?? '')
          .filter(func => func.roles?.includes(role) ?? '')
          .map(func => func?.displayName?.toLowerCase() ?? '');
        
        setCheckedFunctions(functionsForRole);
      }
        return role;
    });
  };

  const isFunctionChecked = (functionName:string) => {
    return checkedFunctions.includes(functionName.toLowerCase());
  };
  
  const handleCheckboxChange = (functionName:string) => {
    setCheckedFunctions(prevCheckedFunctions => {
      const funcName = functionName.toLowerCase();
      if (prevCheckedFunctions.includes(funcName)) {
        return prevCheckedFunctions.filter(func => func !== funcName);
      } else {
        return [...prevCheckedFunctions, funcName];
      }
    })
  }
  
  const isModuleChecked = (moduleName:string) => {
    const module = (roles as RolesAndFunctions[]).find((module) => module?.module.toLowerCase() === moduleName.toLowerCase());
    if (!module) return false;
  
    return module.functionality?.every((func) => func?.displayName && checkedFunctions.includes(func?.displayName?.toLowerCase()));
  }
  
  const handleModuleCheckboxChange = (moduleName: string) => {
    const module = (roles as RolesAndFunctions[]).find((module) => module.module.toLowerCase() === moduleName.toLowerCase());
    if (!module) return;
      const moduleFunctions = module.functionality
      .map((func) => func?.displayName?.toLowerCase())
      .filter((funcName): funcName is string => funcName !== undefined); 
  
    setCheckedFunctions((prevCheckedFunctions) => {
      if (moduleFunctions.every((func) => prevCheckedFunctions.includes(func))) {
        return prevCheckedFunctions.filter((func) => !moduleFunctions.includes(func));
      } else {
        return [...prevCheckedFunctions, ...moduleFunctions.filter((func) => !prevCheckedFunctions.includes(func))];
      }
    });
  };
  
  
  const handleReset = () => {
      const functionsForRole = (roles as RolesAndFunctions[])
        .flatMap((module) => module?.functionality ?? '')
        .filter((func) => func?.roles?.includes(selectedRole) ?? '')
        .map((func) => func?.displayName?.toLowerCase() ?? '');
  
      setCheckedFunctions(functionsForRole);
  };
  
  const isDefaultActionsUpdated = (selectedFunctions:string[], role:string) => {

    const defaultFunctions = (roles as RolesAndFunctions[])
      .flatMap((module) => module?.functionality)
      .filter((func) => func?.roles?.includes(role))
      .map((func) => func?.displayName?.toLowerCase());

    const selectedFunctionNames = selectedFunctions.map((func) => func?.toLowerCase() ?? '');
    const hasExtraFunctions = selectedFunctionNames.some((func) => !defaultFunctions.includes(func));
    const hasMissingFunctions = selectedFunctionNames.length !== defaultFunctions.length;

    return hasExtraFunctions || hasMissingFunctions;
  };
  
  // const employeeUpdated = useSelector((state)=>state.employee.employeeUpdated)

  useEffect(() => {
    if (employeeAdded && !employeeUpdateLoading) {
      history.replace('/employees');
    }
    // if(employeeUpdated && !employeeUpdateLoading){
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

  const removeDashes=(phoneNumber:string)=> {
    return phoneNumber.replace(/-/g,'');
  }

  const onSubmit = (formValues:any) => {

    interface PayloadRolesType{
      moduleType: string
      moduleName: string
      urls: string[]
      displayName?:string
    }

    const rolesAndFunctions = (roles as RolesAndFunctions[]).map(module => {

      const moduleFunctions = module?.functionality
        .filter(func => func?.displayName && checkedFunctions?.includes(func?.displayName?.toLowerCase()))
        .map(func => ({
          moduleType: module.module,
          moduleName: func.name,
          urls: func.urls
        }));
  
      return moduleFunctions?.length > 0 ? moduleFunctions : null;
    }).flat().filter(item => item !== null);
  
    const transformedRolesAndFunctions: string[] = (rolesAndFunctions as PayloadRolesType[])
    .map(module => module.displayName?.toLowerCase() ?? ''); 
  

    // Update formValues with additional data
    formValues = {
      ...formValues,
      firstName: formValues.firstName,
      fullName: `${formValues.firstName} ${(formValues.lastName|| '').trim()}`,
      role: formValues.role,
      businessName: credentials?.businessName,
      userId: formValues.userId ||editEmployee?.userId,
      nickName: formValues.nickName?.trim(),
      email: formValues.email || null,
      mobileNumber: formValues?.mobileNumber && formValues?.mobileNumber?.length > 0 ? removeDashes(formValues.mobileNumber) : "" ,
      address: formValues.address1 || formValues.address2 ? `${formValues.address1 || ""} ${formValues.address2 || ""}`.trim() : null,
      dateOfBirth: selectedDate,
      education: formValues.education,
      merchantId: credentials?.merchantId,
      devicePin: pins.join('') || null,
      IsTempPassword: false,
      password: formValues.password || null,
      isToUseNickName: formValues.useNickname,
      locationId: restaurantBranch.find(outlet => outlet.locationName.includes(formValues["outlet"]))?.id,
      userAccessInfoList: rolesAndFunctions,
      isDefaultFunctionalityAccessUpdated: isDefaultActionsUpdated(
        transformedRolesAndFunctions,        
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

  const splitAddress = (address:string) => {
    const parts = address?.split(',');
    if (parts?.length > 1) {
      const addressLine1 = parts.slice(0, -1).join(',')?.trim();
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

  const isEmptyOrSpaces = (str:string) => {
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


  const handleDateChange = (date:Date) => {
    setSelectedDate(date);
  };

const handleDateChangeRaw = (e: ChangeEvent) => {
  e.preventDefault();
}

const validatePassword = (value:string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if(value.length > 0){
     return passwordRegex.test(value);
    }
  }

const [key, setKey] = useState(Math.random());
// const d=watch()

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
    setValue('email', '');
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
    <div style={{display:'flex', flexDirection:'row'}}>
       <SidePanel />
      <div style={{display: 'flex',width: '100%',justifyContent: 'center',alignItems:'center'}}>
       <p style={{}}>Loading, Please wait!!</p>
      </div>
    </div>
  )}
  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <SidePanel />
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
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="new-password">
            <div className="menu-details-form">
              <div className="primary-sec">
                <div className="flexContainer">
                  <div>
                    <label className={errors.firstName ? "errorLabel" : "inputLabel"}>First Name*</label>
                    <Controller
                     control={control}
                      name="firstName"
                      rules={{
                        required: 'First name is required',
                        minLength: {
                          value: 2,
                          message: 'First name must be at least 2 characters long',
                        },
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message: 'First name can only contain letters',
                        },
                      }}
                      render={({ onChange, value, name }) => (
                        <TextInput
                        type="text"
                        name={name}
                        onChange={onChange}
                        value={value}
                      
                       /// formRegister={register("firstName", { required: "Required" })} 
                       // error={errors.firstName?.message || null}
                        className={
                          errors.firstName ? "fN errorInput" : "add-employee-text-input"
                        }
                        onKeyPress={(e:KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === " " && (e.target as HTMLInputElement).value.length < 1 || !/^[A-Za-z\s]$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        // placeholder="First Name*"
                      />
                       
                      )}
                      />
                      {(errors.firstName) && (
                        <p className = 'employeeError'>
                          {errors.firstName?.message}
                        </p>
                      )}
                  {/* <TextInput
                    type="text"
                    // placeholder="First Name*"
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
                    onKeyPress={(e : KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === ' ' && (e.target as HTMLInputElement).value.length < 1 || !/^[A-Za-z\s]$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  /> */}
                  </div>

                  <div>
                  <label className="inputLabel">Last Name</label>
                  <Controller
                     control={control}
                      name="lastName"
                      render={({ onChange, value, name }) => (
                    <TextInput
                      type="text"
                      // placeholder="Last Name"
                      value={value}
                      onChange={onChange}
                      name={name}
                      //formRegister={register()}
                      className={"add-employee-text-input"}
                      onKeyPress={(e : KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === ' ' && (e.target as HTMLInputElement).value.length < 1 || !/^[A-Za-z\s]$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                      )}
                      />
                  </div>
                </div>

                <div>
                  <label className={errors.nickName ? "errorLabel" : "inputLabel"}>Nick Name</label>
                  <Controller
                     control={control}
                      name="nickName"
                      render={({ onChange, value, name }) => (
                  <TextInput
                    type="text"
                    onChange={onChange}
                    value={value}
                    name={name}
                    className={errors.nickName ? 'fN errorNickNameBox' : 'nickNameBox'}
                    onKeyPress={(e:KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === ' ' && (e.target as HTMLInputElement).value.length < 1) {
                        e.preventDefault(); 
                      }
                    }}
                  />
                      )}
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
                      autoComplete="off"
                    />  
                    <p>Utilize a nickname as needed in all forthcoming activities</p>
                  </label>
                </div>

                <div className="flexBox">
                  <div>
                  <label className={errors.mobileNumber ? "errorLabel" : "inputLabel"}>Phone</label>
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
                        onChange={(e:ChangeEvent) => onChange((e.target as HTMLInputElement).value)}
                        value={value}
                        name={name}
                      >
                        {(inputProps:any) => (
                          <input
                            {...inputProps}
                            type="text"
                            // placeholder="Phone"
                            id="mobileNumber"
                            className={errors.mobileNumber ? 'num phoneErrorInput' : 'phoneContainer'}
                            maxLength={12}
                            autoComplete="off"
                          />
                        )}
                      </InputMask>
                    )}
                  />
                  </div>
                    {(errors.mobileNumber  || (errors.mobileNumber && errors.mobileNumber.type === 'validate')) && (
                      <p style={{ fontSize: '12px', color: '#FF0505', marginTop:8,marginBottom:5 }}>
                        {errors.mobileNumber?.message}
                      </p>
                    )}
                  </div>

                  <div className={errors.email ? 'addEmployeeEmailError' : 'addEmployeeEmail'}>
                    <label className={errors.email ? "errorLabel" : "inputLabel"}>Email</label>
                    <div>
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          validate: {
                            validEmail: (value) => {
                              if (value && value.length > 0) {
                                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email address";
                              }
                              return true;
                            }
                          }
                        }}
                        render={({ onChange, value, name }) => (
                          <input
                            type="text"
                            name={name}
                            value={value}
                            onChange={onChange}
                            className={errors.email ? 'emailErrorInput' : 'emailInput'}
                            autoComplete="new-password"
                            onKeyDown={(e) => {
                              if(e.key === ' '){
                                e.preventDefault()
                              }
                            }}
                          />
                        )}
                      />
                    </div>
                    {(errors.email  || (errors.email && errors.email.type === 'validate')) && (
                        <p style={{ fontSize: '12px', color: '#FF0505',marginTop:5,marginBottom:5 }}>
                          {errors.email?.message}
                        </p>
                      )}
                  </div>
                </div>

                <div className="addressField">
                  <label className="inputLabel">Address Line 1</label>
                  <Controller
                     control={control}
                      name="address1"
                      render={({ onChange, value, name }) => (
                  <TextInput
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    //formRegister={register()}
                    className={"inputBox"}
                    onKeyDown={handleSpace}
                  />
                      )}
                      />
                </div>
                <div>
                  <label className="inputLabel">Address Line 2</label>
                  <Controller
                     control={control}
                      name="address2"
                      render={({ onChange, value, name }) => (
                  <TextInput
                    type="text"
                    name={name}
                    onChange={onChange}
                    value={value}
                    //formRegister={register()}
                    className={"inputBox"}
                    onKeyDown={handleSpace}
                  />
                      )}
                      />
                </div>

                <div className="flexContainer">
                  <div>
                  <label className="inputLabel">Education</label>
                  <Controller
                     control={control}
                      name="education"
                      render={({ onChange, value, name }) => (
                    <TextInput
                      type="text"
                      // placeholder="Education"
                      onChange={onChange}
                      value={value}
                      name={name}
                      formRegister={register()}
                      className={"add-employee-text-input"}
                      onKeyDown={handleSpace}
                    />
                      )}
                      />
                  </div>

                  <div>
                    <label className="inputLabel">Date</label>
                    <div 
                      className="date-picker-container"
                      // style={{
                      //   zIndex:'9999999'
                      // }}
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
                        width="20"
                        onClick={() => {
                          const dateInput = document.querySelector('.dateInput') as HTMLInputElement;
                          dateInput?.focus();
                        }}
                        style={{right:'10px', top:'32%'}}
                      />
                    </div>
                  </div>
                    
                </div>
                <hr style={{marginRight:'40px'}}/>
                
                <h3>Formal Setup*</h3>  
                <div className="flexContainer">  
                        
                <div>
                  <label className={errors.outlet ? "errorLabel" : "inputLabel"}>Outlet*</label>     
                  <div className={errors.outlet?.type ? 'errorCustomInput' : 'selectContainer'} style={{ cursor: "pointer" }}>
                    
                    <div style={{ zIndex: 0 }}>
                      <Controller
                        control={control}
                        name="outlet"
                        //defaultValue={restaurantBranchDefaultValue}
                        rules={{
                          required: "Required",
                        }}
                        render={({ onChange, onBlur, value, name }) => (
                          <CustomDropdown
                            options={branchOptions}
                            // placeholder={"Outlets*"}
                            onSelect={(outletSelected: { value: string; label: string }) => {
                              if (restaurantBranch && outletSelected) {
                                const selectedBranch = restaurantBranch.find(branch =>
                                  branch?.locationName?.includes(outletSelected?.value)
                                );
                                if (selectedBranch) {
                                  onChange(selectedBranch.locationName);
                                }
                              }
                            }}
                            value={restaurantBranchDefaultValue || (editEmployee ? editEmployee?.outlet : restaurantBranchDefaultValue)|| value}
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
                </div>
                
                <div>
                  <label className={errors.role ? "errorLabel" : "inputLabel"}>Roles*</label>
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
                          placeholder={""}
                          onSelect={(role: { value: string; label: string }) => {
                            onChange(role.value);
                            handleRoleChange(role.value);
                            const token = credentials?.accessToken ?? '';
                            const decodedToken = jwt_decode<DecodedToken>(token);
                            if (decodedToken.resource_access?.["merchant-app"]?.roles?.includes("neighbourhood")) {
                              onChange(role.value + "-neighbourhood");
                            }
                          }}
                          disabled={employeeRoleAndFunctionsLoading}
                          value={editEmployee ? editEmployee?.role : value}
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
                            {(roles as RolesAndFunctions[]).map((module) => (
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
                                  <div key={func.displayName}>
                                    <label className="checkboxLabel">
                                      <input 
                                        type="checkbox" 
                                        className="checkbox" 
                                        checked={isFunctionChecked(func?.displayName ?? '' )} 
                                        onChange={() => handleCheckboxChange(func.displayName ?? '')} 
                                      />
                                      <p className="funcName">{func.displayName}</p>
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
                    {(errors.role) && (
                        <p className = 'employeeError'>
                          {errors.role?.message}
                        </p>
                      )}
                  </div>
                </div>
                </div>

                <div className="flexContainer">
                 <div>
                  <label className={errors.userId ? "errorLabel" : "inputLabel"}>User Id*</label>
                  <div>
                  <Controller
                        control={control}
                        name="userId"
                        rules={{
                          required: "Required",
                        }}
                        render={({ onChange, onBlur, value, name }) => (
                      <TextInput
                        type="text"
                        onChange={onChange}
                        value={value}
                        // placeholder="User ID*"
                        name={name}
                        className={errors.userId?.type ? 'uId errorInput' :'add-employee-text-input'}
                        autoComplete="new-password"
                        disabled={!!params?.id?.length}
                        onKeyDown={(event:any) => {
                          if(event.key === ' ' || event.code === 'Space'){
                            event.preventDefault()
                          }
                        }}
                        // disabled={editEmployee}
                      />
                        )}
                        />
                        {(errors.userId) && (
                        <p className = 'employeeError'>
                          {errors.userId?.message}
                        </p>
                      )}
                    </div>
                 </div>
                  
                 <div>
                  <label className={errors.password ? "errorLabel" : "inputLabel"}>Password*</label>
                  <div>
                  <Controller
                        control={control}
                        name="password"
                        rules={{
                          required: !editEmployee ? 'Password is required' : '',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long',
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                          },
                        }}
                        render={({ onChange, onBlur, value, name }) => (
                      <TextInput
                        type={isPasswordVisible ? "text" : "password"}
                        onChange={onChange}
                        value={value}
                        // placeholder="Password*"
                        // minLength={6}
                        name={name}
                        // formRegister={register({
                        //   required: !editEmployee ? "Required" : false,
                        //   validate: {
                        //     validatePassword,
                        //     validLength: (value) => 
                        //       !value || value.replace(/\D/g, '').length === 10 
                        //         ? true 
                        //         : "Invalid Password"
                        //   }
                        // })}
                        className={errors.password ? 'pass errorInput' :'add-employee-text-input'}
                        containerStyle={{ paddingBottom: "0px" }}
                        autoComplete="new-password"
                        onKeyDown={handleSpace}
                      />
                        )}
                        />
                      {isPasswordVisible ? (
                        <OpenEyeIcon
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={{
                          position: "relative",
                          bottom: 35,
                          left: 370, 
                          cursor:'pointer'
                        }}
                      />
                      ) : (
                      <ClosedEyeIcon
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={{
                          position: "relative",
                          bottom: 35,
                          left: 370, 
                          cursor:'pointer'
                        }}
                      />
                      )}
                       {(errors.password) && (
                        <p className = 'employeeError'>
                          {errors.password?.message}
                        </p>
                      )}
                    </div>
                    <div className="passwordErrorText">
                  {errors.password && errors.password.type==='validate' && (
                      <p className="passwordAlertHint">
                        <p className="passwordAlertHint">Invalid Password <br/>
                        Your password should be atleast 8 characters.</p>
                        <ul className="passwordAlertHintUL">
                          <li>Atleast one uppercase</li>
                          <li>Atleast one Specialcharacter</li>
                          <li>Atleast one Numeric</li>
                        </ul>
                      </p>
                    )}
                  </div>
                 </div>  
                </div>
              <div
                className="acess-flex"
                style={{ marginTop: editEmployee ? 10 : 20 }}
              >
                <div className="tooltipContainer" style={hasPinErrors ? {fontSize: "15px", color:' #FF0505'} : {fontSize: "15px", color:'#646262'}}>Create Pin* 
                  <img src={info} alt="info" className="infoToolTip"/>
                  <span className="hoverImage">The four digit pin will be used for validating the user</span>
                </div>

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
                        maxLength={1}
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
                        {...(register(`pin${i}`, { required: !editEmployee && "Required" }) as unknown as React.InputHTMLAttributes<HTMLInputElement>)}
                        className={errors[`pin${i}`] ? 'errorInput' : ''}
                      />
                    ))}
                  </div>
                  <div>
                    <ResetIcon
                        onClick={isGettingNewPin ? undefined : refreshPinValue}
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

          <Modal
            isOpen={openModal}
            message={
              <div>
                <p>Are you sure you want to clear all input fields?</p>
                <p>Any unsaved changes will be lost.</p>
              </div>
            }
            onConfirm={()=>{
              handleCleardata();
              setOpenModal(false);
            }}
            onCancel={() => {setOpenModal(false)}}
            type={'confirmation'}
            isLoading={false}
            logo={alertImg}
            propType="clear"
          />
        </div>
    </>
    </div>
  )
}

export default AddEmployee;
