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
import { ReactComponent as Loader } from "../../../assets/svg/loader.svg";

import {
  createSpecialOfferRequest,
  SPOfferListSendingRequest,
  getOfferItemsRequest,
  updateSpecialOfferRequest,
} from "redux/offer/offerActions";
import { selectedCategory } from "redux/productCatalog/productCatalogActions";

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
  offerToVisible: string;
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
  fromPeriod: string;
  toPeriod: string;
  startTime: string;
  endTime: string;
}

const SpecialPriceDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isExpanded, setDuplicateOffer, duplicateOffer } =
    useContext(Contextpagejs);
  const orderTypes = useSelector(
    (state: any) => state.auth.restaurantDetails?.orderTypes
  );
  const locationid = useSelector(
    (state: any) => state.auth.credentials?.locationId
  );

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

  const catagoryOption = useSelector((state: any) => state.offer.categoryData);
  const createSpecialOfferOverlap = useSelector(
    (state: any) => state.offer.createSpecialOfferOverlapData
  );


  const subCatagoryOption = useSelector(
    (state: any) => state.offer.subCategoryData
  );
console.log({subCatagoryOption});


  const editOfferData = useSelector((state: any) => state.offer.editSpData);
  const editOfferDataLoading = useSelector(
    (state: any) => state.offer.getOfferListLoading
  );
  const editOfferDataFailed = useSelector(
    (state: any) => state.offer.getOfferListSuccess
  );
  const createLoading = useSelector(
    (state: any) => state.offer.createSpecialOfferloading
  );
  const createLoadingsucess = useSelector(
    (state: any) => state.offer.createSpecialOfferSuccess
  );
  const updateLoadingsucess = useSelector(
    (state: any) => state.offer.updateSpecialOfferSuccess
  );


  const OfferlistData = useSelector(
    (state: any) => state.offer.getOfferListData
  );
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedDate1, setSelectedDate1] = useState<any>(null);

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [stFlag,setstFlag]=useState(false)
  const [etFlag,setetFlag]=useState(false)

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
  const [vissibleTo, setvissibleTo] = useState([]);
  const [terms, setterms] = useState<any>([]);
  const [selectedTerm, setSelectedTerm] = useState<any>();
  const [catagory, setCatagory] = useState([]);
  const [subCatagory, setSubCatagory] = useState([]);
  const [SelectedCatagory, setSelectedCatagory] = useState<any>([]);
  const [SelectedsubCatagory, setSelectedSubCatagory] = useState<any>([]);
  const [selectedChannal, setSelectedChannal] = useState<any>([]);
  const [selectedVissibleTo, setSelectedVissibleTo] = useState<any>([]);
  const [flag, setFlag] = useState(false);
  const [negativeError,setNegativeError]=useState(false)
  // console.log({selectedChannal});

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
      offerToVisible: "",
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
      fromPeriod: "AM",
      toPeriod: "AM",
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
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [selectedFoodItems, setselectedFoodItems] = useState<any[]>([]);
  const datePickerRef = useRef<any | null>(null);
  const datePickerRef1 = useRef<any | null>(null);
  const [parentId, setParentId] = useState("");
  const [subCatagoryId, setSubCatagoryId] = useState([]);
   
  const handleonclick = async() => {
    const values = getValues();
    const fromTiming = getValues("fromTime");
    const endTiming = getValues("toTime");
    const offerChannel = getValues("offerChannel");
    const st=getValues("fromPeriod")
    const en=getValues("toPeriod")
setetFlag(true)
setstFlag(true)
    const fromTimeFormat =
      fromTiming && st ? fromTiming + " " + st : "";

    const toTimeFormat =
      endTiming && en ? endTiming + " " + en : "";

    if (fromTimeFormat && toTimeFormat) {
      const converttime = convertTo24HourFormatWithSeconds(fromTimeFormat);
      // console.log({ converttime });
    } else {
      console.error(
        "Invalid time format. Please ensure both time and AM/PM are selected."
      );
    }
    const payload = {
      locationId: locationid,
      offerId: editOfferData?.offerId || null,
      offerName: values?.offerName,
      channel: selectedChannal?.map((item: any) => item.id),
      visibleTo: selectedVissibleTo?.map((item: any) => item?.name[0]),
      termsAndConditions: selectedTerm?.map((item: any) => item?.name),
      specialType: values?.specialTypeName,
      type: values?.specialType === "Percentage" ? "PERCENT" : "FLATFEE",
      value: values?.specialTypeValue,

      category: {
        id: SelectedCatagory && SelectedCatagory[0]?.id,
      },
      subCategory: SelectedsubCatagory?.map((item: any) => ({ id: item.id })),
      items: selectedFoodItems?.map((item) => {
        return {
          itemId: item?.itemId,
          isEnabled: item?.isEnabled,
        };
      }),

      effectivePeriod: {
        isDateEnabled: dateShow,
        startDate: dateShow ? formatDate(selectedDate) : null,
        endDate: dateShow ? formatDate(selectedDate1) : null,
        startTime: convertTo24HourFormatWithSeconds(fromTimeFormat),
        endTime: convertTo24HourFormatWithSeconds(toTimeFormat),
        validDays: values?.AvailableDays.filter((data)=>data!=0).map((data)=>data==7?0:data),
      },
    };
    const formaData=getValues();
    console.log({formaData});
    

    const triggerValid = await trigger(); 
    console.log({ triggerValid });
    const isvalid = valiadtionforDateandTime();
    // console.log("errorsdate",valiadtionforDateandTime());
    // dispatch(createSpecialOfferRequest(payload));
    // if(isvalid)
    //   {
    //     if(editOfferData?.offerId && !duplicateOffer)
    //       {
    //         dispatch(updateSpecialOfferRequest(payload))
    //       }
    //       else{
    //         dispatch(createSpecialOfferRequest(payload));

    //       }
    //   }
    console.log('llllpppp',isvalid,negativeError,triggerValid)

    if (isvalid && !negativeError && triggerValid) {
      if (editOfferData?.offerId && !duplicateOffer) {
        dispatch(updateSpecialOfferRequest(payload));
      } else {
        dispatch(createSpecialOfferRequest(payload));
      }
    }

    //   if (isvalid) {

    //     if(editOfferData?.offerId)
    //       {
    //          dispatch(updateSpecialOfferRequest(payload))
    //       }
    //       else{
    //  dispatch(createSpecialOfferRequest(payload));
    //       }

    //     //setOverlapShow(true);
    //   }

    //console.log("kkkkk",payload)
    //setOverlapShow(true);
  };
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const convertTo24HourFormatWithSeconds = (time12h: any) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:00`;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedDate1(null);
    setValue("fromDate", date);

    setValidationErrors((prevErrors: any) => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors && updatedErrors[0]) {
        updatedErrors[0].fromDateError = "";
        return updatedErrors;
      }
      return updatedErrors;
    });
  };
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
    setValue("toDate", date);
    setValidationErrors((prevErrors: any) => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors && updatedErrors[0]) {
        updatedErrors[0].toDateError = "";
        return updatedErrors;
      }
      return updatedErrors;
    });
  };

  const selectedradiowatch = watch();
  console.log("jjjjj",selectedradiowatch)
  const handleFromToTime = (value: string, timePeriod: string) => {
    console.log({ timePeriod });

    let currentTime = String(getValues(`${value}`));
    currentTime = currentTime.replace(/\s?(AM|PM)$/i, "").trim();
    const timeRegex = /^([01]?\d|2[0-3]):[0-5]\d$/;
    if (timeRegex.test(currentTime)) {
      const timeWithPeriod = `${currentTime} ${timePeriod}`.trim();
      // setValue(`${value}`, timeWithPeriod);
    }
    // validationForstartTimeValidation()
    // validationForEndTimeValidation()
  };

  const [updatedPrice, setUpdatedPrice] = useState(-1);
  const [showlistOfItems, setShowlistOfItems] = useState(false);
  const [overlapShow, setOverlapShow] = useState(false);
  const [highlighted, setHighlighted] = useState<any>();
  const selectedValue = watch("specialType");

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
      if (!editOfferData) {
        setDayThird([]);
      }

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

  useEffect(() => {
    if (orderTypes?.length > 0) {
      const data = orderTypes.map((item: any) => {
        return {
          name: item?.typeName,
          id: item?.id,
          type: item?.typeGroup,
        };
      });
      setChannal([...data]);
      setFlag(true);
    }
  }, [orderTypes]);
  const listpopupRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      listpopupRef?.current &&
      !listpopupRef?.current?.contains(event.target as Node)
    ) {
      setShowlistOfItems(false);
    }
  };
  useEffect(()=>{
if(selectedFoodItems.length>0){
  const val=selectedFoodItems.filter((item)=>item.updatedPrice<0)
    if(val.length>0){
      setNegativeError(true)
    }
    else{
      setNegativeError(false)
    }
}
  },[selectedFoodItems])

  const validateDaysInRange = (startDate: any, endDate: any) => {
    let dateRange = generateDateRange(startDate, endDate);
    let availableDays = dateRange.map((date: any) =>
      date.getDay() === 0 ? 7 : date.getDay()
    );
    setDisableDay(availableDays);
    if (availableDays.length === 1) {
      setDayThird(availableDays);
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
      setDayThird(mappedDay);
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
  useEffect(()=>{
       if(subCatagoryId?.length==0 && parentId){
        setSelectedSubCatagory([])
        setselectedFoodItems([])
       }
  },[subCatagoryId])

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
  const [validationErrors, setValidationErrors] = useState<any>([
    {
      fromDateError: "",
      toDateError: "",
      startTimeError: "",
      endTimeError: "",
      selectedItems: "",
    },
  ]);
  const convertStringToDate = (inputDate: any) => {
    const date = new Date(inputDate); // Automatically parses ISO 8601 dates like "2024-12-05"
    return date; // Returns a valid Date object
  };

  const convertToPeriodFormat = (time24: any) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    const formattedTime = `${hours12}:${minutes.toString().padStart(2, "0")}`;
    return {
      time: formattedTime,
      period: period,
    };
  };
  useEffect(() => {
    if (editOfferData&&flag) {
      if(editOfferData?.offerName){
      setValue("offerName", editOfferData?.offerName);}
      if(editOfferData?.channel?.length>0 && channal.length>0){
        const data=channal.filter((item:any) =>editOfferData?.channel.includes(item.id));
        setValue("offerChannel",data[0]?.name)
        setSelectedChannal([...data])
        }

        if(editOfferData?.visibleTo?.length>0){
         const data=visibleOption.filter((item:any) =>editOfferData?.visibleTo.includes(item?.name[0]));
         setValue("offerToVisible", data.map((opt) => opt.name).join(", "))
         setSelectedVissibleTo([...data])
         }
         if(editOfferData?.termsAndConditions?.length>0){
          const data= editOfferData?.termsAndConditions.map((item:any,index:any)=>{
              return {
                id: index,
                name: item,
                locationId: "",
                type: "T",
                parentId: "",
                canDelete: true,
              }
          })
          setterms([...data])
          setSelectedTerm([...data])
          setValue("termsAndConditions",editOfferData?.termsAndConditions?.join(","))
         }
         if(editOfferData?.specialType){
          setValue("specialTypeName",editOfferData?.specialType=='SURGE HOUR'?"Surge Hour":"Happy Hour")
         }
         if(editOfferData?.type){
          setValue("specialType", editOfferData?.type=="PERCENT"?"Percentage":"Amount");
         }
         if(editOfferData?.value)
         {
         setValue("specialTypeValue", editOfferData?.value);
         }
         if(editOfferData?.category){
          setSelectedCatagory([editOfferData?.category])
          setParentId(editOfferData?.category?.id)
          setValue("category",editOfferData?.category?.name)
         }
         if(editOfferData?.subCategory?.length>0){
          setSelectedSubCatagory([...editOfferData?.subCategory])
          setValue("subCategory",editOfferData?.subCategory?.map((item:any)=>item.name).join(","))
          setSubCatagoryId(editOfferData?.subCategory?.map((item:any)=>item.id))
         }
         if(editOfferData?.items?.length>0){
          setselectedFoodItems([...editOfferData?.items])
         }




         if(editOfferData.effectivePeriod){
            if(editOfferData.effectivePeriod?.isDateEnabled){
              setDateShow(editOfferData.effectivePeriod?.isDateEnabled)
              if(editOfferData.effectivePeriod?.startDate){
                const data= convertStringToDate(editOfferData.effectivePeriod?.startDate)
                setSelectedDate(data)
                setValue("fromDate", data);
      
              
              }
              if(editOfferData.effectivePeriod?.endDate){
              const data=convertStringToDate(editOfferData.effectivePeriod?.endDate)
               setSelectedDate1(data)
               setValue("toDate", data);
              }
            }
            if(editOfferData?.effectivePeriod?.startTime){
              const data =convertToPeriodFormat(editOfferData?.effectivePeriod?.startTime)
              setValue("fromTime", data.time);
              setValue("fromPeriod",data.period)
             // setStartTime(convertTo12HourFormat(editOfferData?.effectivePeriod?.startTime))
            }
            if(editOfferData?.effectivePeriod?.endTime){
              const data =convertToPeriodFormat(editOfferData?.effectivePeriod?.endTime)
              setValue("toTime", data.time);
              setValue("toPeriod",data.period)
              //setEndTime(convertTo12HourFormat(editOfferData?.effectivePeriod?.endTime))
            }
            if(editOfferData?.effectivePeriod?.validDays?.length>0)
            {
              const data =editOfferData?.effectivePeriod?.validDays?.map((data:any)=>data==0?7:data)
              if(data.length==7){
                data.push(0)
              }
            setDayThird(data)
            setValue("AvailableDays", data);

            }
         }
    }
  }, [flag]);

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

    if (errors && errors[0]) {
      if (StartTime === "") {
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
    if (errors && errors[0]) {
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
          (endTimeHours === startTimeHours &&
            endTimeMinutes <= startTimeMinutes &&
            ((selectedFrom === "AM" && selectedTo === "AM") ||
              (selectedFrom === "PM" && selectedTo === "PM")))
        ) {
          errors[0].EndTimeError = "End time must be greater than start time";
        } else {
          errors[0].EndTimeError = "";
        }
      }
    }

    setValidationErrors(errors);
  };

  const validationForEndTime = () => {
    const errors = [...validationErrors];
    const StartTime = getValues("fromTime");
    const EndTime = getValues("toTime");
    const fromPeriod = getValues("fromPeriod");
    const toPeriod = getValues("toPeriod");

    // Ensure errors array has an object to store the errors
    if (!errors[0]) {
      errors[0] = {};
    }

    // Reset previous errors
    errors[0].startTimeError = "";
    errors[0].EndTimeError = "";

    // Validate Start Time
    if (!StartTime) {
      errors[0].startTimeError = "Start time is required";
    }

    // Validate End Time
    if (!EndTime) {
      errors[0].EndTimeError = "End time is required";
    }

    if (StartTime && EndTime) {
      function convertTo24Hour(time: any, period: any) {
        let [hours, minutes] = time.split(":").map(Number);
        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }
        return { hours, minutes };
      }
      const start = convertTo24Hour(StartTime, fromPeriod);
      const end = convertTo24Hour(EndTime, toPeriod);
      if (
        end.hours < start.hours ||
        (end.hours === start.hours && end.minutes < start.minutes)
      ) {
        errors[0].EndTimeError = "End time must be greater than start00 time";
      } else {
        errors[0].EndTimeError = "";
      }
    }

    // Update the validationErrors state
    setValidationErrors(errors);
  };

  const valiadtionforDateandTime = () => {
    let dataandTimeerrors: any = [];

    let Errors = {
      fromDateError: "",
      toDateError: "",
      startTimeError: "",
      EndTimeError: "",
      selectedItems: "",
    };

    if (dateShow && selectedDate === null) {
      Errors.fromDateError = "Date must be given";
    } else {
      Errors.fromDateError = "";
    }
    if (dateShow && selectedDate1 === null) {
      Errors.toDateError = "Date must be given";
    } else {
      Errors.toDateError = "";
    }
    const StartTime = getValues("fromTime");
    console.log({ StartTime });

    if (StartTime === "") {
      Errors.startTimeError = "Time is required ";
    } else {
      Errors.startTimeError = "";
    }
    const EndTime = getValues("toTime");

    const fromPeriod = getValues("fromPeriod");
    const toPeriod = getValues("toPeriod");

    if (endTime === "") {
      Errors.EndTimeError = "Time is required";
    } else {
      Errors.EndTimeError = "";
    }
    if (StartTime && EndTime) {
      function convertTo24Hour(time: any, period: any) {
        let [hours, minutes] = time.split(":").map(Number);
        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }
        return { hours, minutes };
      }
      const start = convertTo24Hour(StartTime, fromPeriod);
      const end = convertTo24Hour(EndTime, toPeriod);
      if (
        end.hours < start.hours ||
        (end.hours === start.hours && end.minutes < start.minutes)
      ) {
        Errors.EndTimeError = "End time must be greater than start00 time";
      } else {
        Errors.EndTimeError = "";
      }
    }
    if (selectedFoodItems?.length === 0) {
      console.log("array length", selectedFoodItems?.length);

      Errors.selectedItems = "No item selected";
    } else {
      Errors.selectedItems = "";
    }

    if (
      Errors.fromDateError ||
      Errors.toDateError ||
      Errors.startTimeError ||
      Errors.EndTimeError ||
      Errors.selectedItems
    ) {
      dataandTimeerrors[0] = Errors;
    }

    setValidationErrors(dataandTimeerrors);

    if (
      Errors.fromDateError === "" &&
      Errors.toDateError === "" &&
      Errors.startTimeError === "" &&
      Errors.EndTimeError === "" &&
      Errors.selectedItems == ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const itemlistfunction = () => {
    setShowlistOfItems(true);
    const payload = {
      locationId: locationid,
      catagoryId: subCatagoryId.length>0
        ? subCatagoryId.map((opt) => opt).join(",")
        : parentId,
    };
    dispatch(getOfferItemsRequest(payload));
  };
  const handleToggle = (item: any) => {
    const data = [...selectedFoodItems];
    data.forEach((item1) => {
      if (item.id == item1.id) {
        item1.isEnabled = item1.isEnabled ? 0 : 1;
      }
    });
    setselectedFoodItems([...data]);
  };
  useEffect(() => {
    if (!createLoading && (createLoadingsucess || updateLoadingsucess)) {
      history.push("/Offers/active");
    }
  }, [createLoadingsucess, createLoading, updateLoadingsucess]);
  useEffect(() => {
    if (createSpecialOfferOverlap.length > 0) {
      setOverlapShow(true);
    }
  }, [createSpecialOfferOverlap]);

  const restaurantDetails = useSelector(
    (state: any) => state?.auth.restaurantDetails
  );

  const Pricesymbol = `${restaurantDetails?.country === "US" ? "$" : "Rs."}`;

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
            {editOfferData?.offerId && !duplicateOffer ? (
              <h1>Edit offer</h1>
            ) : (
              <h1>Create Special Price Details</h1>
            )}
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
                    rules={{
                      required: "Offer is required",
                      validate: (value) =>
                        value.trimStart() === value ||
                        "Offer name cannot start with a space",
                    }}
                    render={({ onChange, onBlur, value, error }: any) => (
                      <InputComponent
                        name="offerName"
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // Prevent updating value if it starts with a space
                          if (inputValue === "" || inputValue[0] !== " ") {
                            onChange(inputValue);
                          }
                        }}

                        onBlur={onBlur}
                        value={value}
                        trigger={trigger}
                        error={errors?.offerName}
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
                          selectedOptions={selectedChannal}
                          setSelectedOptions={setSelectedChannal}
                          type="radio"
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
                          search={false}
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
                        setSelectedOptions={setSelectedVissibleTo}
                        selectedOptions={selectedVissibleTo}
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
                        error={errors?.offerToVisible}
                        dropdownopen={DropdownOpen.ordertype}
                        onToggle={() => handleDropdownToggle("ordertype")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={false}
                        editValues={false}
                        dropDownType="offerToVisible"
                        search={false}
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
                        setSelectedOptions={setSelectedTerm}
                        selectedOptions={selectedTerm}
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
                        editValues={true}
                        dropDownType="termsAndConditions"
                        search={false}
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
                  onChange={(value) => {
                    setValue("specialTypeName", value);
                    handleRadioChange("specialTypeName", value);
                  }}
                  register={register}
                />
              </div>
              <p className="valuebasedon">Value based on</p>
              <div className="type-dropdown">
                <RadioButtonGroup
                  options={selectType}
                  selectedValue={selectedValue}
                  name="specialType"
                  onChange={(value) => {
                    setValue("specialType", value);
                    handleRadioChange("specialType", value);
                  }}
                  register={register}
                />
              </div>
              <div className="cPspecialTypeContainer">
                <Controller
                  name="specialTypeValue"
                  control={control}
                  rules={{
                    required: "Special type value is required",
                    validate: (value) =>
                      /^\d*\.?\d{0,2}$/.test(value) ||
                      "Only numbers with up to 2 decimal places are allowed",
                  }}
                  render={({ onChange, onBlur, value, error }: any) => (
                    <InputComponent
                      name="specialTypeValue"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const typeName = getValues("specialType");

                        if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
                          if (
                            typeName === "Percentage" &&
                            parseFloat(inputValue) > 100
                          ) {
                            return;
                          }
                          onChange(inputValue);
                        }
                      }}
                      onBlur={() => {
                        priceCalulate(selectedFoodItems);
                      }}
                      value={value}
                      trigger={trigger}
                     
                      error={errors?.specialTypeValue}
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
                        setSelectedOptions={setSelectedCatagory}
                        selectedOptions={SelectedCatagory}
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
                        setSubCatagoryId={setSubCatagoryId}
                        parentId={parentId}
                        dropDownType="CATEGORY"
                        search={true}
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
                        setSelectedOptions={setSelectedSubCatagory}
                        selectedOptions={SelectedsubCatagory}
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
                        search={false}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="select-offerfooditems" ref={listpopupRef}>
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
                  {showlistOfItems ? (
                    <div className="dropdownimage">
                      <img
                        src={dropdown}
                        alt="dropdown"
                        style={{ rotate: "180deg" }}
                        onClick={() => {
                          setShowlistOfItems(false);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="dropdownimage">
                     <img
  src={dropdown}
  alt="dropdown"
  onClick={() => {
    const category = getValues("category");
    const subcategory = getValues("subCategory");

    if (subCatagoryOption?.length > 0) {
      if (!subcategory) {
        return;
      }
    }
    if (category !== "" && (subcategory !== "" || subCatagoryOption?.length === 0)) {
      itemlistfunction();
    }
  }}
/>

                    </div>
                  )}
                </div>
                {validationErrors[0]?.selectedItems &&
                  selectedFoodItems.length === 0 && (
                    <span className="time-error-message">
                      {validationErrors[0]?.selectedItems}
                    </span>
                  )}
                <div>
                  {showlistOfItems && (
                    <div
                      className="searched-items-listed"
                      style={{
                       position:"relative",
                       top:validationErrors[0]?.selectedItems!==""&&selectedFoodItems.length===0?"-1.3rem":"",
                        display: "flex",
                        justifyContent:
                          editOfferDataLoading ||
                          !editOfferDataFailed ||
                          OfferlistData.length === 0
                            ? "center"
                            : "",
                        alignItems:
                          editOfferDataLoading ||
                          !editOfferDataFailed ||
                          OfferlistData.length === 0
                            ? "center"
                            : "",
                      }}
                    >
                      {editOfferDataLoading ? (
                        <Loader
                          className="cPimgLoader1"
                          height="300px"
                          width="300px"
                          style={{
                            filter:
                              "invert(45%) sepia(31%) saturate(435%) hue-rotate(72deg) brightness(91%) contrast(88%)",
                            height: "70px",
                            width: "70px",
                          }}
                        />
                      ) : !editOfferDataFailed || OfferlistData.length === 0 ? (
                        <div>
                          <h1 className="nodata-found">No data found</h1>
                        </div>
                      ) : (
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
                              onClick={() => {
                              
                                handleItemClick(index, item)}
                              }
                            >
                              {item.itemName}
                            </li>
                          ))}
                        </ul>
                      )}
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
                          <td className="offer-table-data originalprice">
                            {Pricesymbol}
                            {item.originalPrice
                              ? item.originalPrice.toString().length === 1
                                ? `${item.originalPrice}.00`
                                : item.originalPrice.toFixed(2)
                              : "0.00"}
                          </td>
                          <td className="offer-table-data updatedprice" style={{
    color: item.updatedPrice < 0 ? "#e52333" : "", 
  }}>
                            {item.updatedPrice ? (
                              <>
                                {item.updatedPrice && Pricesymbol}
                                {item.updatedPrice}
                              </>
                            ) : (
                              <>-</>
                            )}
                          </td>
                          <td
                            className="offer-table-data bin-image"
                           
                          >
                            <img
                              src={Bin}
                              alt="Delete"
                              className="deletebinImage"
                              onClick={() => handleDelete(item?.itemId)}
                            />
                          </td>
                         {editOfferData?.offerId&&  <td className="offer-table-data toggle-icon-data">
                            <Toggle
                              toggle={item.isEnabled}
                              item={item}
                              setToggle={handleToggle}
                              togglecolor="white"
                              name="enable"
                            />
                          </td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {negativeError&&<span className="negative-price">*Price Cannot Be Negative,Please Enter a valid Amount</span> }

              <div className="effectiveperiod">
                <h3>Effective period</h3>

                <div className="Date-available">
                  <h3>Date </h3>
                  <span>
                    <Toggle
                      name="Date"
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
                                onChange={(date: any) => {
                                  onChange(date);
                                  handleDateChange(date);
                                }}
                                minDate={new Date()}
                                ref={datePickerRef}
                                onKeyDown={(e: React.KeyboardEvent) =>
                                  e.preventDefault()
                                }
                                className="offerdatePicker-special"
                              />
                              {error && (
                                <span className="error-message">
                                  {error.message}
                                </span>
                              )}
                            </div>
                          )}
                          // rules={{
                          //   required: "This field is required",
                          //   validate: (value) => {
                          //     const timeRegex =
                          //       /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
                          //     return (
                          //       timeRegex.test(value) ||
                          //       "Please enter a valid time in hh:mm format"
                          //     );
                          //   },
                          // }}
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
                    <span className="To-text">To</span>
                    <div>
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
                                onChange={(date: any) => {
                                  onChange(date);
                                  handleDateChange1(date);
                                }}
                                placeholderText="07/01/2034"
                                dateFormat="MM/dd/yyyy"
                                showPopperArrow
                                ref={datePickerRef1}
                                minDate={selectedDate || new Date()}
                                className="offerdatePicker"
                                onKeyDown={(e: React.KeyboardEvent) =>
                                  e.preventDefault()
                                }
                              />
                              {error && (
                                <span className="error-message">
                                  {error.message}
                                </span>
                              )}
                            </div>
                          )}
                          // rules={{
                          //   required: "This field is required",
                          //   validate: (value) => {
                          //     const timeRegex =
                          //       /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
                          //     return (
                          //       timeRegex.test(value) ||
                          //       "Please enter a valid time in hh:mm format"
                          //     );
                          //   },
                          // }}
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
                                className={`time-selector__input ${
                                  error ? "error" : ""
                                }`}
                                value={value}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  validationForEndTime();

                                  if (/^[0-9:]*$/.test(inputValue)) {
                                    if (inputValue.length <= 5) {
                                      const formattedValue = inputValue
                                        .replace(/[^0-9]/g, "")
                                        .match(/(\d{0,2})(\d{0,2})?/);

                                      let hours =
                                        (formattedValue && formattedValue[1]) ||
                                        "";
                                      let minutes =
                                        (formattedValue && formattedValue[2]) ||
                                        "";

                                      if (
                                        hours.length === 2 &&
                                        parseInt(hours, 10) > 12
                                      ) {
                                        return;
                                      }
                                      if (
                                        minutes.length === 2 &&
                                        parseInt(minutes, 10) > 59
                                      ) {
                                        return;
                                      }

                                      const formattedTime = [hours, minutes]
                                        .filter(Boolean)
                                        .join(":");

                                      onChange(formattedTime);
                                      setStartTime(formattedTime);
                                    }
                                  }
                                }}
                                onBlur={()=>{
                                  setstFlag(true)
                                }}
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

                        <div>
                          <Controller
                            name="fromPeriod"
                            control={control}
                            defaultValue="AM"
                            render={({
                              field,
                              trigger,
                              value,
                              error,
                              onChange,
                              onBlur,
                            }: any) => (
                              <div className="" style={{ display: "flex" }}>
                                <button
                                  type="button"
                                  className={`time-selector__button_fromtime ${
                                    value === "AM" ? "selected" : ""
                                  }`}
                                  name="fromPeriod"
                                  onClick={() => {
                                    setValue("fromPeriod", "AM"); // Update fromPeriod in the form
                                    validationForEndTime(); // Validate
                                  }}
                                >
                                  AM
                                </button>
                                <button
                                  type="button"
                                  className={`time-selector__button_fromtime ${
                                    value === "PM" ? "selected" : ""
                                  }`}
                                  name="fromPeriod"
                                  onClick={() => {
                                    setValue("fromPeriod", "PM");
                                    validationForEndTime(); // Validate
                                  }}
                                >
                                  PM
                                </button>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      {validationErrors[0]?.startTimeError && stFlag && (
                        <span className="time-error-message">
                          {validationErrors[0]?.startTimeError}
                        </span>
                      )}
                    </div>
                    <span className="To-text">To</span>
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
                                      if (
                                        hours.length === 2 &&
                                        parseInt(hours, 10) > 12
                                      ) {
                                        return;
                                      }

                                      if (
                                        minutes.length === 2 &&
                                        parseInt(minutes, 10) > 59
                                      ) {
                                        return;
                                      }

                                      const formattedTime = [hours, minutes]
                                        .filter(Boolean)
                                        .join(":");

                                      onChange(formattedTime);
                                      setEndTime(formattedTime);
                                    }
                                  }
                                  validationForEndTime();
                                }}
                                onBlur={()=>{
                                  setetFlag(true)
                                }}
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

                        <div className="">
                          <Controller
                            name="toPeriod"
                            control={control}
                            defaultValue="AM"
                            render={({
                              field,
                              trigger,
                              value,
                              error,
                              onChange,
                              onBlur,
                            }: any) => (
                              <div className="period-buttons">
                                <button
                                  type="button"
                                  className={`time-selector__button ${
                                    value === "AM" ? "selected" : ""
                                  }`}
                                  name="toPeriod"
                                  onClick={() => {
                                    setValue("toPeriod", "AM");
                                    validationForEndTime();
                                  }}
                                >
                                  AM
                                </button>
                                <button
                                  type="button"
                                  className={`time-selector__button ${
                                    value === "PM" ? "selected" : ""
                                  }`}
                                  name="toPeriod"
                                  onClick={() => {
                                    setValue("toPeriod", "PM");
                                    validationForEndTime();
                                  }}
                                >
                                  PM
                                </button>
                              </div>
                            )}
                          />
                        </div>
                        {/* <button
                        className={`time-selector__button ${
                          selectedTo === "PM" ? "selected" : ""
                        }`}
                         name="toPeriod"
                         
                        onClick={() => {
                          setSelectedTo("PM");
                          validationForEndTime("PM")
                          setValue("toPeriod","PM")
                          // handleFromToTime("toTime", "PM");
                        }}
                      >
                        PM
                      </button> */}
                      </div>
                      <div>
                        {validationErrors[0]?.EndTimeError && etFlag && (
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
              {!createLoading ? "Save" : <div className="reviewLoaders"></div>}
            </button>
          </div>
          {/* <button onClick={handleonclick}>click</button> */}
        </div>
      </>
    </div>
  );
};

export default SpecialPriceDetails;

// {
//   "headers": {},
//   "body": [
//       {
//           "offerId": "cefb0ef2-65ff-44e5-861b-3633c0e23c94",
//           "offerName": "Diwali201overlap",
//           "offerPrice": 20.0,
//           "offerStartTime": "12:30:00",
//           "offerEndTime": "13:30:00",
//           "itemId": "0193aad5-cfe3-7afd-8db0-1e5e4c632557",
//           "itemName": "heqe",
//           "currentOfferName": "Offertest34",
//           "currentOfferPrice": 25.0,
//           "currentOfferStartTime": "00:00:00",
//           "currentOfferEndTime": "12:35:00"
//       },
//       {
//           "offerId": "cefb0ef2-65ff-44e5-861b-3633c0e23c94",
//           "offerName": "Diwali201overlap",
//           "offerPrice": 20.0,
//           "offerStartTime": "12:30:00",
//           "offerEndTime": "13:30:00",
//           "itemId": "0193aafb-a8f3-77d4-b45f-e2faaba5788c",
//           "itemName": "heqe",
//           "currentOfferName": "Offertest34",
//           "currentOfferPrice": 25.0,
//           "currentOfferStartTime": "00:00:00",
//           "currentOfferEndTime": "12:35:00"
//       },
//       {
//           "offerId": "cefb0ef2-65ff-44e5-861b-3633c0e23c94",
//           "offerName": "Diwali201overlap",
//           "offerPrice": 20.0,
//           "offerStartTime": "12:30:00",
//           "offerEndTime": "13:30:00",
//           "itemId": "0193ab90-1165-79c1-82b7-a688a44027e2",
//           "itemName": "kasbjndk",
//           "currentOfferName": "Offertest34",
//           "currentOfferPrice": 25.0,
//           "currentOfferStartTime": "00:00:00",
//           "currentOfferEndTime": "12:35:00"
//       }
//   ],
//   "statusCode": "CONFLICT",
//   "statusCodeValue": 409
// }
