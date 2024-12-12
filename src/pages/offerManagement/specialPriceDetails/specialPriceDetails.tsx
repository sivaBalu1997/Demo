import React, { useContext, useEffect, useRef, useState } from "react";
import "./specialPriceDetails.scss";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import SidePanel from "pages/SidePanel";
import InputComponent from "components/offerManagement/InputComponent/InputComponent";
import Dropdown from "components/offerManagement/Dropdown/Dropdown";
import { useSelector } from "react-redux";
import RadioButtonGroup from "../../../components/productCatalog/RadioButton/RadioButton";
import DaysCheck from "../../../components/offerManagement/DaysCheckin/DaysChecking";
import Bin from "../../../assets/images/trash-2.png";
import Input from "components/common/input";
import Toggle from "components/offerManagement/Toggle/Toggle";
import dropdown from "../../../assets/images/dropdown.png";
import { useDispatch } from "react-redux";
import calender from "../../../assets/images/calendar 1.png";
import Overlap from "components/offerManagement/Overlapping/Overlap";
import { useHistory } from "react-router-dom";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { createSpecialOfferRequest, SPOfferListSendingRequest,getOfferItemsRequest } from "redux/offer/offerActions";


interface itemobject {
  id: number;
  itemName: string;
  originalPrice: string;
  updatedPrice: string;
  available: boolean;
}
interface specialPriceForm {
  offerName: string;
  offerChannel: string;
  offerToVisible: string[];
  termsAndConditions: string;
  specialTypeName: string;
  specialType: string;
  specialTypeValue: string;
  category: string;
  subCategory: string;
  selectedFooditems: itemobject[];
  DatePicked: boolean;
  fromTime: string;
  toTime: string;
  fromDate: string;
  toDate: string;
  AvailableDays: number[];
}

const SpecialPriceDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isExpanded } = useContext(Contextpagejs);
  const orderTypes = useSelector(
    (state:any) => state.auth.restaurantDetails?.orderTypes
  );
  const locationid = useSelector(
    (state: any) => state.auth.credentials?.locationId
  );
  const channelOption = [
    {
      id: "1",
      name: "Dine-In",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
    {
      id: "2",
      name: "Delivery",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
    {
      id: "3",
      name: "PickUp",
      locationId: "",
      type: "P",
      parentId: "",
      canDelete: false,
    },
  ];

  const visibleOption = [
    {
      id: "1",
      name: "Customer",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
    {
      id: "2",
      name: "Merchant",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
  ];

  const catagoryOption = useSelector(
    (state: any) => state.offer.categoryData
  )

  const subCatagoryOption = useSelector(
    (state: any) => state.offer.subCategoryData
    
  )


  const editOfferData2 = {
    "offerId": "a00c82e3-7e5f-45ed-8314-97cc1072e12b",
    "offerName": "OFFER2023",
    "offerCode": "2023off",
    "type": "PERCENT",
    "value": 5.0,
    "channel": [
        "02feb858-c58d-48c5-8dd4-9a173390b4eb",
        "cd5996ed-7201-4faf-b996-5757aa684ad8",
        "bc534a3f-4080-4014-83b5-aeb5cee93d95"
    ],
    "effectivePeriod": {
        "isDateEnabled": null,
        "startDate": null,
        "endDate": null,
        "startTime": null,
        "endTime": null,
        "validDays": null
    },
    "items": [
        {
            "itemId": "0074afc7-719b-43a8-a948-bbda0fd6f9c3",
            "itemName": "Paneer Fried Rice",
            "specialPrice": 13.9825,
            "originalPrice": 16.4500,
            "isEnabled": 1
        },
        {
            "itemId": "01601102-5fc1-4b80-80a1-3788e6c563cc",
            "itemName": "Strawberry Milkshake",
            "specialPrice": 6.3665,
            "originalPrice": 7.4900,
            "isEnabled": 1
        }
    ],
    "isEnabled": 2,
    
  };
  
  const editOfferData = useSelector(
    (state: any) => state.offer.editSpData
  );
  console.log({editOfferData});



  const OfferlistData = useSelector(
    (state: any) => state.offer.getOfferListData
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(null);

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const selectName = [
    { value: "Happy Hour", label: "Happy Hour" },
    { value: "Surge Hour", label: "Surge Hour" },
  ];

  const selectType = [
    { value: "Percentage", label: "Percentage" },
    { value: "Amount", label: "Amount" },
  ];

  const handleRadioChange = (
    radioname: keyof specialPriceForm,
    value: string
  ) => {
    setValue(radioname, value);
  };




  const [channal, setChannal] = useState<any>([]);
  const [vissibleTo,setvissibleTo] =useState([]) 
  const [terms,setterms] =useState([{id: '1',
    name: "Term1",
    locationId:"",
    type: "D",
    parentId: '',
    canDelete: false},
    {id: '3',
      name: "Term2",
      locationId:"",
      type: "D",
      parentId: '',
      canDelete: false}
      ]) 
  const [catagory,setCatagory] =useState([]) 
  const [subCatagory,setSubCatagory] =useState([])
  const [DropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({
    channel: false,
    ordertype: false,
    terms: false,
    category: false,
    subCategory: false,
    fooditems: false,
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm<specialPriceForm>({
    defaultValues: {
      offerName: "",
      offerChannel: "",
      offerToVisible: [],
      termsAndConditions: "",
      specialTypeName: "Happy Hour",
      specialType: "Percentage",
      specialTypeValue: "",
      category: "",
      subCategory: "",
      selectedFooditems: [],
      DatePicked: true,
      fromTime: "",
      toTime: "",
      fromDate: "",
      toDate: "",
      AvailableDays: [],
    },
  });
  const handleDropdownToggle = (dropdownName: string) => {
    setDropdownOpen((prevState) => {
      return {
        DietaryType: false,
        cuisine: false,
        mealType: false,
        bestPair: false,
        category: false,
        subCategory: false,
        [dropdownName]: !prevState[dropdownName],
      };
    });
  };

  const [availabilityid, setAvailabilityid] = useState<string[]>([]);
  const [DayThird, setDayThird] = useState<number[]>([]);
  const [disabledDay, setDisableDay] = useState<any[]>([]);
  const [selectedFrom, setSelectedFrom] = useState("AM");
  const [selectedTo, setSelectedTo] = useState("AM");
  const [selectedFoodItems, setselectedFoodItems] = useState<any[]>([]);
  const datePickerRef = useRef<any | null>(null);
  const datePickerRef1 = useRef<any | null>(null);
  const [parentId,setParentId]=useState("")
  const [subCatagoryId,setSubCatagoryId]=useState("")
  const [selecteFoodItems, setselecteFoodItems] = useState([
    {
    "itemId": "0074afc7-719b-43a8-a948-bbda0fd6f9c3",
    "itemName": "Paneer Fried Rice",
    "originalPrice": 16.4500,
    "isEnabled": 1
},
{
    "itemId": "01601102-5fc1-4b80-80a1-3788e6c563cc",
    "itemName": "Strawberry Milkshake",
    "originalPrice": 7.4900,
    "isEnabled": 1
},
{
    "itemId": "0192bf12-1884-795d-9916-b55b0606293e",
    "itemName": "chocolate cream",
    "originalPrice": 35.0000,
    "isEnabled": 1
},
{
    "itemId": "0192bf1b-b715-7fe1-89c8-387681b3b115",
    "itemName": "chocolate ice cream",
    "originalPrice": 35.0000,
    "isEnabled": 1
},
{
    "itemId": "0192bf1f-7639-7369-aeef-d1e9bb98a922",
    "itemName": "test1",
    "originalPrice": 35.0000,
    "isEnabled": 1
},
{
    "itemId": "0192bf2c-2552-71a4-81ef-96f008af84cb",
    "itemName": "Rose Milk",
    "originalPrice": 35.0000,
    "isEnabled": 1
},
{
    "itemId": "0192bf5e-d6be-7fab-9903-3b50c6e9006b",
    "itemName": "Rose Milk",
    "originalPrice": 35.0000,
    "isEnabled": 1
},
{
    "itemId": "0192bf64-966c-73a3-b2dd-b5a58efe4c38",
    "itemName": "Strawberry dessert",
    "originalPrice": 35.0000,
    "isEnabled": 1
}
]);

  const handleonclick = () => {
    const values = getValues();
    const payload={
      locationId:locationid,
      offerId:null,
      offerName: values?.offerName,
      channel:values?.offerChannel,
      visibleTo:values?.offerToVisible?.map((item:any)=>item[0]), 
      termsAndConditions:values?.termsAndConditions,
      specialType:values?.specialTypeName,
      type:values?.specialType,
      value:values?.specialTypeValue,
      items:selectedFoodItems.map((item)=>{
        return{
          itemId:item?.itemId,
          isEnabled:item?.isEnabled
        }
      }),
      effectivePeriod:{
        isDateEnabled:dateShow,
        startDate:dateShow?formatDate(values?.fromDate):null,
        endDate:dateShow?formatDate(values?.toDate):null,
        startTime:values?.fromTime,
        endTime:values?.toTime,
        validDays:values?.AvailableDays
     }
        }

    trigger();

    const isvalid= valiadtionforDateandTime()
    console.log("errorsdate",valiadtionforDateandTime());
    
    if(isvalid)
    {
      dispatch(createSpecialOfferRequest(payload));
      setOverlapShow(true);
    }
   
   
   
    //console.log("kkkkk",payload)
    //setOverlapShow(true);
  };
  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 
  
    return `${year}-${month}-${day}`; 
  };
  const convertTo24HourFormatWithSeconds = (time12h:any) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
  
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedDate1(null);
    setValue("fromDate", date);
    setValidationErrors((prevErrors:any) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[0].fromDateError = ""; 
      return updatedErrors;
    });
  };
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
    setValue("toDate", date);
    setValidationErrors((prevErrors:any) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[0].toDateError = ""; 
      return updatedErrors;
    });
  };

  const selectedradiowatch = watch();
  const handleFromToTime = (value: string, timePeriod: string) => {
    let currentTime = String(getValues(`${value}`));
    currentTime = currentTime.replace(/\s?(AM|PM)$/i, "").trim();
    const timeRegex = /^([01]?\d|2[0-3]):[0-5]\d$/;
    if (timeRegex.test(currentTime)) {
      const timeWithPeriod = `${currentTime} ${timePeriod}`.trim();
      setValue(`${value}`, timeWithPeriod);
    }
  };

  const [updatedPrice, setUpdatedPrice] = useState(-1);
  const [showlistOfItems, setShowlistOfItems] = useState(false);
  const [overlapShow, setOverlapShow] = useState(false);
  const [highlighted, setHighlighted] = useState<any>();
  const selectedValue = watch("specialTypeName");

  const handleItemClick = (index: number, item: any) => {
    setHighlighted(index);
    const data = [...selectedFoodItems];
    let data1 = [];
    // setselectedFoodItems((prev : any) => {
    const exists = data.some((food: any) => food.itemId === item.itemId);

    if (exists) {
      data1 = data.filter((food: any) => food.itemId !== item.itemId);
    } else {
      data1 = [
        ...data,
        {
          itemId: item.itemId,
          itemName: item.itemName,
          originalPrice: item.originalPrice,
          isEnabled: item.isEnabled,
        },
      ];
    }
    if (
      selectedradiowatch?.specialTypeValue &&
      selectedradiowatch?.specialType &&
      selectedradiowatch?.specialTypeName
    ) {
      priceCalulate(data1);
    } else {
      setselectedFoodItems([...data1]);
    }
  };

  useEffect(() => {
    if (selectedDate && selectedDate1) {
      setDayThird([]);
      if (selectedDate == selectedDate1) {
        handleSingleDayRange(selectedDate, selectedDate1);
      } else {
        validateDaysInRange(selectedDate, selectedDate1);
      }
    }
  }, [selectedDate, selectedDate1]);

  useEffect(() => {
    setValue("selectedFooditems", selectedFoodItems);
  }, [selectedFoodItems]);

  useEffect(()=>{
  if(orderTypes?.length>0){
   const data= orderTypes.map((item:any)=>{
        return{
          name:item?.typeName,
          id:item?.id,
          type:item?.typeGroup
        }
    })
    setChannal([...data])
  }
  },[orderTypes])

  const listpopupRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      listpopupRef?.current &&
      !listpopupRef?.current?.contains(event.target as Node)
    ) {
      setShowlistOfItems(false);
    }
  };

  const validateDaysInRange = (startDate: any, endDate: any) => {
    let dateRange = generateDateRange(startDate, endDate);
    let availableDays = dateRange.map((date: any) =>
      date.getDay() === 0 ? 7 : date.getDay()
    );
    setDisableDay(availableDays);
    if(availableDays.length === 1){
      setDayThird(availableDays)
    }
  };

  const generateDateRange = (startDate: any, endDate: any) => {
    let currentDate = new Date(startDate);
    let range = [];

    while (currentDate <= new Date(endDate)) {
      range.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };

  function handleSingleDayRange(startDate: any, endDate: any) {
    if (startDate === endDate) {
      let dayIndex = new Date(startDate).getDay();
      let mappedDay: any = dayIndex === 0 ? 7 : dayIndex;
      setDisableDay(mappedDay);
      setDayThird(mappedDay)
    }
  }

  const applyOffer = (type: any, name: any, value: any, item: any) => {
    const data: any = item.map((item: any) => {
      const originalPrice = item.originalPrice;
      let updatedPrice = originalPrice;
      if (name === "Happy Hour" && type == "Percentage") {
        updatedPrice = originalPrice - originalPrice * (value / 100);
      } else if (name === "Happy Hour" && type == "Amount") {
        updatedPrice = originalPrice - value;
      } else if (name === "Surge Hour" && type == "Percentage") {
        updatedPrice = originalPrice * (1 + value / 100);
      } else if (name === "Surge Hour" && type == "Amount") {
        updatedPrice = originalPrice + Number(value);
      }
      return {
        ...item,
        updatedPrice: updatedPrice.toFixed(2),
      };
    });
    setselectedFoodItems([...data]);
  };

  const priceCalulate = (data: any) => {
    if (
      selectedradiowatch?.specialTypeValue &&
      selectedradiowatch?.specialType &&
      selectedradiowatch?.specialTypeName &&
      data.length > 0
    ) {
      applyOffer(
        selectedradiowatch?.specialType,
        selectedradiowatch?.specialTypeName,
        selectedradiowatch?.specialTypeValue,
        data
      );
    }
  };

  const closeOverlapPopUp = () => {
    setOverlapShow(false);
  };

  useEffect(() => {
    if (
      selectedradiowatch?.specialType &&
      selectedradiowatch?.specialTypeName &&
      selectedradiowatch?.specialTypeValue &&
      selectedFoodItems.length > 0
    ) {
      priceCalulate(selectedFoodItems);
    }
  }, [
    selectedradiowatch?.specialType,
    selectedradiowatch?.specialTypeName,
    selectedradiowatch?.specialTypeValue,
  ]);

  useEffect(() => {
    if (showlistOfItems) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showlistOfItems]);

  const handleImageClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const handleImageClick2 = () => {
    if (datePickerRef1.current) {
      datePickerRef1.current.setOpen(true);
    }
  };

  const [dateShow, setDateShow] = useState(false);

  const handleDelete = (id: any) => {
    const data = selectedFoodItems.filter((item: any) => item?.itemId !== id);
    setselectedFoodItems(data);
  };
  const [validationErrors,setValidationErrors]=useState<any>([])


  useEffect(()=>{
    if(editOfferData)
    {
      setValue("offerName",editOfferData?.offerName)
      setValue("offerChannel",editOfferData?.channel?.join(",") || "")
      setValue("DatePicked",editOfferData?.effectivePeriod?.isDateEnabled)
      setValue("fromTime",editOfferData?.effectivePeriod?.startTime)
      setValue("toTime",editOfferData?.effectivePeriod?.endTime)
      setValue("fromDate",editOfferData?.effectivePeriod?.startDate)
      setValue("toDate",editOfferData?.effectivePeriod?.endDate)
      setValue("specialType",editOfferData?.type)
      setValue("AvailableDays",editOfferData?.effectivePeriod?.validDays)
      setValue("selectedFooditems",editOfferData?.items)
      setValue("specialTypeValue",editOfferData?.value)

      

    }

  },[editOfferData,setValue])
  
  // const validateModifiers = (modifications: any[]) => {
  //   const errors = [...customizationerrors];

  //   modifications?.forEach((modifier, index) => {
  //     const {
  //       modifierName,
  //       modifierId,
  //       modifierOptions,
  //       selectedValue,
  //       selectionType,
  //     } = modifier;

  //     let modifierErrors: any = {
  //       modifierNameError: modifierName.trim() ? "" : ``,
  //       id: modifierId || "",
  //       errormsgforselectedvalues: "",
  //       options: [],
  //     };

  //     if (!modifierName.trim()) {
  //       modifierErrors.modifierNameError = `Modifier Name is required`;
  //     }
  //     if (atleastOnestream && selectedValue.length === 0 ) {
  //       modifierErrors.errormsgforselectedvalues = "Available service streams required";
  //     }

  //     if (Array.isArray(modifierOptions)) {
  //       modifierOptions.forEach((option: any, optIndex: number) => {
  //         let optionErrors: any = {
  //           optionName: option.modifierOptionName || "",
  //           optionId: option.modifierOptionId || "",
  //           optionNameError: "",
  //           optionPrice: option.cost || 0,
  //           optionPriceError: "",
  //         };

  //         const nameRegex = /^[a-zA-Z0-9\s]+$/;
  //         if (!option.modifierOptionName.trim() ) {
  //           optionErrors.optionNameError = `Option Name is required`;
  //         }
  //         // else if (!nameRegex.test(option.modifierOptionName && modifierName!=="")) {
  //         //   optionErrors.optionNameError = `Option Name must not contain special characters`;
  //         // }

        
  //         if (isNaN(option.cost) || option.cost <= 0 ) {
  //           optionErrors.optionPriceError = `Price field is required`;
  //         }

  //         modifierErrors.options.push(optionErrors);
  //       });
  //     } else {
  //       modifierErrors.options.push({
  //         optionNameError: `Options must be an array`,
  //       });
  //     }

  //     if (
  //       modifierErrors.modifierNameError ||
  //       modifierErrors.errormsgforselectedvalues ||
  //       modifierErrors.options.some(
  //         (opt: any) => opt.optionNameError || opt.optionPriceError
  //       )
  //     ) {
  //       errors[index] = modifierErrors;
  //     } else {
  //       errors[index] = null;
  //     }
  //   });

  //   setcustomizationerrors(errors);

  //   const validateCustomizationErrors = () => {
  //     return errors.every((error) => {
  //       if (!error) return true;
  //       const hasNoTopLevelErrors =
  //         error.modifierNameError === "" &&
  //         error.errormsgforselectedvalues === "";
  //       const hasNoOptionErrors = error.options.every(
  //         (option: any) =>
  //           option.optionNameError === "" && option.optionPriceError === ""
  //       );

  //       return hasNoTopLevelErrors && hasNoOptionErrors;
  //     });
  //   };

  //   return validateCustomizationErrors();
  // };



  const validationForstartTimeValidation = () => {
    const errors = [...validationErrors];
    const StartTime = getValues("fromTime");
    
   if(errors && errors[0])
   {
    if (StartTime === "" ) {
       errors[0].startTimeError = "Time is required";
    } else {
      errors[0].startTimeError = "";
    }
    
   
   }
   
  
   
  
   
  
    setValidationErrors(errors); 
  };
  const validationForEndTimeValidation = () => {
    const errors = [...validationErrors];
    const StartTime = getValues("fromTime");
    const EndTime = getValues("toTime");
   if(errors && errors[0])
   {
   
    if (EndTime === "") {
      errors[0].EndTimeError = "Time is required";
    } else {
      errors[0].EndTimeError = "";
    }
    if (StartTime && EndTime) {
      const startTimeHours = parseInt(StartTime.split(":")[0]);
      const startTimeMinutes = parseInt(StartTime.split(":")[1]);
      const endTimeHours = parseInt(EndTime.split(":")[0]);
      const endTimeMinutes = parseInt(EndTime.split(":")[1]);
  
      if (
        endTimeHours < startTimeHours ||
        (endTimeHours === startTimeHours && endTimeMinutes <= startTimeMinutes)
      ) {
        errors[0].EndTimeError = "End time must be greater than start time";
      } else {
        errors[0].EndTimeError = "";
      }
    }
   }
   
  
   
  
   
  
    setValidationErrors(errors); 
  };

  const valiadtionforDateandTime= ()=>{
   let dataandTimeerrors:any=[];

   let Errors={
    fromDateError:"",
    toDateError:"",
    startTimeError:"",
    EndTimeError:""

   }

    if(dateShow && selectedDate===null)
    {
      Errors.fromDateError="Date must be given"
    }
    else{
      Errors.fromDateError=""

    }
    if(dateShow && selectedDate1===null)
    {
        Errors.toDateError="Date must be given"
    }
    else{
      Errors.toDateError=""

    }
    const StartTime=  getValues("fromTime");
    console.log({startTime});
    
    if(startTime==="")
    {
      Errors.startTimeError="Time is required"
    }
    else{
       Errors.startTimeError=""

    }
    const EndTime=getValues("toTime");
 
    console.log({endTime});
    if(endTime==="")
    {
      Errors.EndTimeError="Time is required"
    }
    else{
      Errors.EndTimeError=""
    }
    if (StartTime && EndTime) {
      const startTimeHours = parseInt(StartTime.split(":")[0]);
      const startTimeMinutes = parseInt(StartTime.split(":")[1]);
      const endTimeHours = parseInt(EndTime.split(":")[0]);
      const endTimeMinutes = parseInt(EndTime.split(":")[1]);
  
      if (endTimeHours < startTimeHours ||
          (endTimeHours === startTimeHours && endTimeMinutes <= startTimeMinutes)) {
        Errors.EndTimeError = "End time must be greater than start time";
      }
      else{
        Errors.EndTimeError = "";

      }
    }


    if(Errors.fromDateError||Errors.toDateError||Errors.startTimeError||Errors.toDateError)
    {
      dataandTimeerrors[0]=Errors;
    }

    setValidationErrors(dataandTimeerrors);


    if(Errors.fromDateError===""&&Errors.toDateError===""&&Errors.startTimeError===""&&Errors.EndTimeError==="")
      {
        return true;
      }
      else{
        return false;
      }
  }

  console.log({validationErrors});
  


   const itemlistfunction =()=>{
    setShowlistOfItems(!showlistOfItems)
    const payload ={
      locationId:locationid,
      catagoryId:subCatagoryId?subCatagoryId:parentId
    }
   dispatch(getOfferItemsRequest(payload))
    
   }
  return (
    <div className={isExpanded ? "offer-creationpage" : "offer-creationpage1"}>
      <SidePanel />
      <>
        <div
          className={
            isExpanded
              ? "offer-creationpage-container"
              : "offer-creationpage-container1"
          }
        >
          <div className="specialoffer-heading">
            <h1>Create Special Price Details</h1>
          </div>

          <div
            className={
              isExpanded ? "specialprice-container" : "specialprice-container1"
            }
          >
            <div className="offer-primary-details">
              <h3>Primary Details</h3>
            </div>

            <div className="offer-primary-part1">
              <div className="offerPrimaryRow1">
                <div className="offerNameContainer">
                  <Controller
                    name="offerName"
                    control={control}
                    rules={{ required: "offer is required" }}
                    render={({ onChange, onBlur, value }: any) => (
                      <InputComponent
                        name="offerName"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        trigger={trigger}
                        error={errors.offerName}
                        height="44px"
                        placeholder="Offer Name"
                      />
                    )}
                  />
                </div>

                <div className="offerChannelContainer">
                  <div className="OfferSelectChannel">
                    <Controller
                      name="offerChannel"
                      control={control}
                      render={({ field }: any) => (
                        <Dropdown
                          options={channal}
                          type="checkbox"
                          setOptions={setChannal}
                          placeholder="Select Channel"
                          register={register}
                          name="offerChannel"
                          trigger={trigger}
                          setValue={setValue}
                          getValues={getValues}
                          validation={{ required: "offerChannel is required" }}
                          error={errors.offerChannel}
                          dropdownopen={DropdownOpen.channel}
                          onToggle={() => handleDropdownToggle("channel")}
                          setDropdownOpen={setDropdownOpen}
                          addNew={false}
                          editValues={false}
                          dropDownType="offerChannel"
                          search = {false}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="offerPrimaryRow2">
                <div className="visibleDropdown">
                  <Controller
                    name="offerToVisible"
                    control={control}
                    render={({ field }: any) => (
                      <Dropdown
                        options={visibleOption}
                        type="checkbox"
                        setOptions={setvissibleTo}
                        placeholder="Select Visible to"
                        register={register}
                        name="offerToVisible"
                        trigger={trigger}
                        setValue={setValue}
                        getValues={getValues}
                        validation={{ required: "offerToVisible is required" }}
                        error={errors?.offerToVisible&&errors?.offerToVisible[0] }
                        dropdownopen={DropdownOpen.ordertype}
                        onToggle={() => handleDropdownToggle("ordertype")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={false}
                        editValues={false}
                        dropDownType="offerToVisible"
                        search = {false}
                      />
                    )}
                  />
                </div>
                <div className="termsAndConditionsContainer">
                  <Controller
                    name="termsAndConditions"
                    control={control}
                    render={({ field }: any) => (
                      <Dropdown
                        options={terms}
                        type="checkbox"
                        setOptions={setterms}
                        placeholder="Select Terms and Conditions"
                        register={register}
                        name="termsAndConditions"
                        trigger={trigger}
                        setValue={setValue}
                        getValues={getValues}
                        validation={{
                          required: "termsAndConditions is required",
                        }}
                        error={errors.termsAndConditions}
                        dropdownopen={DropdownOpen.terms}
                        onToggle={() => handleDropdownToggle("terms")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={true}
                        editValues={false}
                        dropDownType="termsAndConditions"
                        search = {false}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="specialType-details">
              <h3>Special Type</h3>
              <div>
                <RadioButtonGroup
                  options={selectName}
                  name="specialTypeName"
                  selectedValue={selectedradiowatch.specialTypeName}
                  onChange={(value) =>
                    handleRadioChange("specialTypeName", value)
                  }
                  register={register}
                />
              </div>
              <p className="valuebasedon">Value based on</p>
              <div className="type-dropdown">
                <RadioButtonGroup
                  options={selectType}
                  selectedValue={selectedradiowatch.specialType}
                  name="specialType"
                  onChange={(value) => handleRadioChange("specialType", value)}
                  register={register}
                />
              </div>
              <div className="cPspecialTypeContainer">
                <Controller
                  name="specialTypeValue"
                  control={control}
                  rules={{ required: "specialTypeValue is required" }}
                  render={({ onChange, onBlur, value }: any) => (
                    <InputComponent
                      name="specialTypeValue"
                      onChange={onChange}
                      onBlur={() => {
                        priceCalulate(selectedFoodItems);
                      }}
                      value={value}
                      trigger={trigger}
                      error={errors.specialTypeValue}
                      width="400px"
                      placeholder="Enter the Value"
                    />
                  )}
                />
              </div>
            </div>

            <div className="items-details">
              <h3>Items</h3>
              <div className="category-details">
                <div>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }: any) => (
                      <Dropdown
                        options={catagoryOption}
                        type="radio"
                        setOptions={setCatagory}
                        placeholder="Select Category"
                        register={register}
                        name="category"
                        trigger={trigger}
                        setValue={setValue}
                        getValues={getValues}
                        validation={{ required: "category is required" }}
                        error={errors.category}
                        dropdownopen={DropdownOpen.category}
                        onToggle={() => handleDropdownToggle("category")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={false}
                        editValues={false}
                        setParentId={setParentId}
                        dropDownType="CATEGORY"
                        search = {true}
                      />
                    )}
                  />
                </div>
                
                <div>
                  <Controller
                    name="subCategory"
                    control={control}
                    render={({ field }: any) => (
                      <Dropdown
                        options={subCatagoryOption}
                        type="checkbox"
                        setOptions={setSubCatagory}
                        placeholder="Select Sub Category"
                        register={register}
                        name="subCategory"
                        trigger={trigger}
                        setValue={setValue}
                        getValues={getValues}
                        validation={{ required: "subCategory is required" }}
                        error={errors.subCategory}
                        dropdownopen={DropdownOpen.subCategory}
                        onToggle={() => handleDropdownToggle("subCategory")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={false}
                        editValues={false}
                        dropDownType="SUB_CATEGORY"
                        setSubCatagoryId={setSubCatagoryId}
                        parentId={parentId}
                        search = {false}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="select-offerfooditems">
                <div className="seraching-for-items">
                  <div className="seraching-for-itemsbox">
                    <Controller
                      name="selectedFooditems"
                      control={control}
                      render={({ field }: any) => (
                        <input
                          type="text"
                          name="selectedFooditems"
                          placeholder="Select Food Items"
                          className="selectedFooditems"
                        />
                      )}
                    />
                  </div>
                  <div className="dropdownimage">
                    <img
                      src={dropdown}
                      alt="dropdown"
                     onClick={() => {itemlistfunction()}}
                    />
                  </div>
                </div>
                <div>
                  {console.log(OfferlistData)}
                  {showlistOfItems && (
                    <div className="searched-items-listed" ref={listpopupRef}>
                      <ul className="listing-selected-items"> 
                        {OfferlistData?.map((item: any, index: number) => (
                          <li
                            key={index}
                            className={`selectedlist ${
                              selectedFoodItems.some(
                                (food: any) => food.itemId === item.itemId
                              )
                                ? "highlighted"
                                : ""
                            }`}
                            onClick={() => handleItemClick(index, item)}
                          >
                            {item.itemName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {overlapShow && <Overlap onclose={closeOverlapPopUp} />}

              {selectedFoodItems.length > 0 && (
                <div className="list-of-offeritems">
                  <table
                    style={{
                      borderCollapse: "collapse",
                      width: "100%",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    <thead>
                      <tr className="offer-table-row">
                        <th className="offer-table-heading">S.No</th>
                        <th className="offer-table-heading">Item Name</th>
                        <th className="offer-table-heading">Original Price</th>
                        <th className="offer-table-heading">Updated Price</th>
                        <th className="offer-table-heading">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFoodItems?.map((item: any, index) => (
                        <tr key={index} className="offeritems-listed">
                          <td className="offer-table-data">{index + 1}</td>
                          <td className="offer-table-data">{item.itemName}</td>
                          <td className="offer-table-data">
                            {item.originalPrice}
                          </td>
                          <td className="offer-table-data">
                            {item.updatedPrice}
                          </td>
                          <td
                            className="offer-table-data bin-image"
                            style={{ paddingLeft: "-1rem" }}
                          >
                            <img
                              src={Bin}
                              alt="Delete"
                              className="deletebinImage"
                              onClick={() => handleDelete(item?.itemId)}
                            />
                          </td>
                          <td className="offer-table-data toggle-icon-data">
                            <Toggle
                              toggle={item.isEnabled}
                              togglecolor="white"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="effectiveperiod">
                <h3>Effective period</h3>

                <div className="Date-available">
                  <h3>Date </h3>
                  <span>
                    <Toggle
                      toggle={dateShow}
                      setToggle={setDateShow}
                      togglecolor="white"
                    />
                  </span>
                </div>
                {dateShow && (
                  <div className="offerdate-select">
                    <div>
                    <div className="offer-from-date">
                      <Controller
                        name="fromDate"
                        control={control}
                        defaultValue=""
                        render={({
                          field,
                          trigger,
                          value,
                          error,
                          onChange,
                          onBlur,
                        }: any) => (
                          <div>
                            <DatePicker
                              placeholderText="07/01/2034"
                              dateFormat="MM/dd/yyyy"
                              selected={selectedDate}
                              onChange={(date:any) => {
                                onChange(date); 
                                handleDateChange(date); 
                              }}
                              minDate={new Date()}
                              ref={datePickerRef}
                              className="offerdatePicker-special"
                            />
                            {error && (
                              <span className="error-message">
                                {error.message}
                              </span>
                            )}
                          </div>
                        )}
                        rules={{
                          required: "This field is required",
                          validate: (value) => {
                            const timeRegex =
                              /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
                            return (
                              timeRegex.test(value) ||
                              "Please enter a valid time in hh:mm format"
                            );
                          },
                        }}
                      />
                      <img
                        src={calender}
                        className="calender-img-offer"
                        onClick={handleImageClick}
                      />
                      
                    </div>
                    <div>
                      {validationErrors[0]?.fromDateError && (
                              <span className="time-error-message">
                                {validationErrors[0]?.fromDateError}
                              </span>
                            )}
                      </div>
                    </div>
                 
                    To
                    <div >
                    <div className="offer-to-date">
                      <Controller
                        name="toDate"
                        control={control}
                        defaultValue=""
                        render={({
                          field,
                          trigger,
                          value,
                          error,
                          onChange,
                          onBlur,
                        }: any) => (
                          <div>
                            <DatePicker
                              selected={selectedDate1}
                              onChange={(date:any)=>{
                                onChange(date)
                                handleDateChange1(date)}}
                              placeholderText="07/01/2034"
                              dateFormat="MM/dd/yyyy"
                              showPopperArrow
                              ref={datePickerRef1}
                              minDate={selectedDate || new Date()}
                              className="offerdatePicker"
                            />
                            {error && (
                              <span className="error-message">
                                {error.message}
                              </span>
                            )}
                          </div>
                        )}
                        rules={{
                          required: "This field is required",
                          validate: (value) => {
                            const timeRegex =
                              /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
                            return (
                              timeRegex.test(value) ||
                              "Please enter a valid time in hh:mm format"
                            );
                          },
                        }}
                      />
                      <img
                        src={calender}
                        className="calender-img1-offer"
                        onClick={handleImageClick2}
                      ></img>
                     
                    </div>
                    <div>
                      {validationErrors[0]?.toDateError && (
                              <span className="time-error-message">
                                {validationErrors[0]?.toDateError}
                              </span>
                            )}
                      </div>
                    </div>
                    
                    
                  </div>
                )}

                <div className="timeContainer">
                  <h4 className="Time-heading">Time</h4>
                  <div className="time-format">

                    <div className="from-time-errormsg">


                    <div className="time-selector">
                      <Controller
                        name="fromTime"
                        control={control}
                        defaultValue=""
                        render={({
                          field,
                          trigger,
                          value,
                          error,
                          onChange,
                          onBlur,
                        }: any) => (
                          <div>
                           <input
  type="text"
  placeholder="hh:mm"
  className={`time-selector__input ${error ? "error" : ""}`}
  value={value}
  onChange={(e) => {
    const inputValue = e.target.value;

   
    if (/^[0-9:]*$/.test(inputValue)) {
      if (inputValue.length <= 5) {
        const formattedValue = inputValue
          .replace(/[^0-9]/g, "") 
          .match(/(\d{0,2})(\d{0,2})?/); 

        let hours = (formattedValue && formattedValue[1]) || "";
        let minutes = (formattedValue && formattedValue[2]) || "";

        if (hours.length === 2 && parseInt(hours, 10) > 12) {
          return; 
        }
        if (minutes.length === 2 && parseInt(minutes, 10) > 59) {
          return; 
        }

        const formattedTime = [hours, minutes].filter(Boolean).join(":");

        onChange(formattedTime); 
        setStartTime(formattedTime); 
      }
    }
    validationForstartTimeValidation()
  }}
  onBlur={onBlur}
/>

                            {error && (
                              <span className="error-message">
                                {error.message}
                              </span>
                            )}
                          </div>
                        )}
                        rules={{
                          required: "This field is required",
                          validate: (value) => {
                            const timeRegex =
                              /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
                            return (
                              timeRegex.test(value) ||
                              "Please enter a valid time in hh:mm format"
                            );
                          },
                        }}
                      />

                      <button
                        className={`time-selector__button_fromtime ${
                          selectedFrom === "AM" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setSelectedFrom("AM");

                          handleFromToTime("fromTime", "AM");
                        }}
                      >
                        AM
                      </button>
                      <button
                        className={`time-selector__button_fromtime ${
                          selectedFrom === "PM" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setSelectedFrom("PM");
                          handleFromToTime("fromTime", "PM");
                        }}
                      >
                        PM
                      </button>
                    </div>
                    {validationErrors[0]?.startTimeError && (
                              <span className="time-error-message">
                                {validationErrors[0]?.startTimeError}
                              </span>
                            )}

                    </div>
                   

                    To
                    <div className="to-time-errormsg">
                    <div className="time-selector">
                      <Controller
                        name="toTime"
                        control={control}
                        defaultValue=""
                        render={({
                          field,
                          trigger,
                          value,
                          error,
                          onChange,
                          onBlur,
                        }: any) => (
                          <div>
                            <input
                              type="text"
                              placeholder="hh:mm"
                              className={`time-selector__input ${
                                error ? "error" : ""
                              }`}
                              value={value}
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                if (/^[0-9:]*$/.test(inputValue)) {
                                  if (inputValue.length <= 5) {
                                    const formattedValue = inputValue
                                      .replace(/[^0-9]/g, "")
                                      .match(/(\d{0,2})(\d{0,2})?/);

                                    const hours =
                                      (formattedValue && formattedValue[1]) ||
                                      "";
                                    let minutes =
                                      (formattedValue && formattedValue[2]) ||
                                      "";
                                      if (hours.length === 2 && parseInt(hours, 10) > 12) {
                                        return; 
                                      }
                                      
                                      if (minutes.length === 2 && parseInt(minutes, 10) > 59) {
                                        return; 
                                      }
                                      

                                    const formattedTime = [hours, minutes]
                                      .filter(Boolean)
                                      .join(":");

                                    onChange(formattedTime);
                                    setEndTime(formattedTime)
                                  }
                                }
                                validationForEndTimeValidation();
                              }}
                              onBlur={onBlur}
                            />
                            {error && (
                              <span className="error-message">
                                {error.message}
                              </span>
                            )}
                          </div>
                        )}
                        rules={{
                          required: "This field is required",
                          validate: (value) => {
                          
                            const timeRegex =
                              /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
                            return (
                              timeRegex.test(value) ||
                              "Please enter a valid time in hh:mm format"
                            );
                          },
                        }}
                      />

                      <button
                        className={`time-selector__button ${
                          selectedTo === "AM" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setSelectedTo("AM");
                          handleFromToTime("toTime", "AM");
                        }}
                      >
                        AM
                      </button>
                      <button
                        className={`time-selector__button ${
                          selectedTo === "PM" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setSelectedTo("PM");
                          handleFromToTime("toTime", "PM");
                        }}
                      >
                        PM
                      </button>
                    </div>
                    <div>
                    {validationErrors[0]?.EndTimeError && (
                              <span className="time-error-message">
                                {validationErrors[0]?.EndTimeError}
                              </span>
                            )}
                    </div>
                    </div>
                    
                  </div>
                </div>

                <div className="checkeddays">
                  <DaysCheck
                    checkedItems={DayThird}
                    setCheckedItems={setDayThird}
                    setId={setAvailabilityid}
                    setValue={setValue}
                    getValues={getValues}
                    valueName="AvailableDays"
                    register={register}
                    disabledays={disabledDay}
                    dateShow={dateShow}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={
              isExpanded
                ? "saveandcancel-btn-offer"
                : "saveandcancel-btn-offer1"
            }
          >
            <button
              className="cancel-btn"
              onClick={() => history.push("/Offers/active")}
            >
              Cancel
            </button>
            <button className="save-btn" onClick={handleonclick}>
              Save
            </button>
          </div>
          {/* <button onClick={handleonclick}>click</button> */}
        </div>
      </>
    </div>
  );
};

export default SpecialPriceDetails;