import React, { useState, useEffect } from "react";
import Toggle from "../Toggle/Toggle";
import "./Normalavail.scss";
import DaysCheck from "../DayCheck/DaysCheck";
import Dropdown2 from "../DropDown2/DropDown2";
import DropDown3 from "../DropDown3/DropDown3";
import DropDown from "../DropDown/Dropdown";
import DaysCheckDin from "../DayCheckDinein/DaysCheckDinein";
import { useSelector } from "react-redux";
import LableComponent from "../LableComponent/LableComponent";
import TooltipMsg from "../Tooltip/TooltipMsg";
import info from "../../../assets/svg/info.svg";
import { RootState } from "redux/rootReducer";
import { State } from "sockjs-client";
import session from "redux-persist/lib/storage/session";

type MainFormType = {
  availabilityid: string[];
  formNormal: {
    PickuppriceNormal: string;
    PickupmealtypeNormal: string;
    DeliverypriceNormal: string;
    DeliverymealtypeNormal: string;
    SwiggyorzomatoNormal: string;
    SwiggyNormal: string;
    SwiggymealtypeNormal: string;
    ZomatoNormal: string;
    ZomatomealtypeNormal: string;
  };
  dineinfields: any;
  Normaldays: number[];
  DeliveryMealType: string[];
  PicupMealType: string[];
  Pickup: number[];
  DineInServiceArea: SelectedValuesState[];
  Delivery: number[];
  thirdParty: number[];
  WeekDays: number[][];
  DineIn: number[][];
  Swiggy: string[];
  Zomato: string[];
};
interface NormalForm {
  PickuppriceNormal: string;
  PickupmealtypeNormal: string;
  DeliverypriceNormal: string;
  DeliverymealtypeNormal: string;
  SwiggyorzomatoNormal: string;
  SwiggyNormal: string;
  SwiggymealtypeNormal: string;
  ZomatoNormal: string;
  ZomatomealtypeNormal: string;
}
interface DineInField {
  DineInPrice: string;
  DineInMealType: string[];
  DineInService: string;
  showDay: boolean;
  dayButtonText: string;
}

type DropdownValidationState = {
  [key: string]: { isValid: boolean; errorMessage: string }; 
};

interface DeliveryDetails {
  typeName: string;
  typeId: string;
  price: number;
  availabilities: Availability[];
}

interface NormalavailProps {
  getNormalForm?: (form: any) => void;
  validateDropdown: (
    value: string[],
    key: keyof DropdownValidationState
  ) => void;

  validationState: {
    [key: string]: { isValid: boolean; errorMessage: string };
  };

  setValidationStateerr: React.Dispatch<
    React.SetStateAction<DropdownValidationState>
  >;
  ValidationStateerr?: any;

  dinein: boolean;
  setDineIn: React.Dispatch<React.SetStateAction<boolean>>;
  setMainFormState: React.Dispatch<React.SetStateAction<MainFormType>>;
  handleValidate: () => void;
  mainFormState: any;
  dineinfields?: any;
  setDineInFields: (form: any) => void;
  selectedValues2: any;
  setSelectedValues2: (form: any) => void;
  resetSelection?: any;
}

type MealType1 = string;
type MealType = string[];
type SelectedValueType = string;
type SelectedValuesMealTypeState = MealType[];
type ServiceValueType = string;
interface SelectedValuesState {
  [key: number]: any;
}
type OptionType = string;

interface Availability {
  availabilityDays: string[];
  sessions: string[];
}

interface PriceInfo {
  typeName: string;
  typeId: string;
  price: number; // Change to number to reflect the new format
  availabilities: Availability[];
}

const Normalavail: React.FC<NormalavailProps> = ({
  getNormalForm,
  validateDropdown,
  validationState,
  dinein,
  setDineIn,
  setMainFormState,
  mainFormState,
  dineinfields,
  setDineInFields,
  setValidationStateerr,
  handleValidate,
  ValidationStateerr,
  resetSelection,
}) => {
  const [online, setOnline] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const [dineinentry, setDineInEntry] = useState<string[]>([]);
  const [Normaldays, setNormalDays] = useState<number[]>([]);
  const [options2, setOptions2] = useState(["Breakfast", "Lunch", "Dinner"]);

  const [options3, setOptions3] = useState(["Breakfast", "Lunch", "Dinner"]);
  const [options4, setOptions4] = useState(["Breakfast", "Lunch", "Dinner"]);
  const [options5, setOptions5] = useState(["Breakfast", "Lunch", "Dinner"]);
  const [options6, setOptions6] = useState(["Breakfast", "Lunch", "Dinner"]);
  const [availabilityid, setAvailabilityid] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] =
    React.useState<SelectedValuesState>({});

  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
  const [selectedValues3, setSelectedValues3] = useState<string[]>([]);
  const [selectedValues4, setSelectedValues4] = useState<string[]>([]);
  const [selectedValues5, setSelectedValues5] = useState<string[]>([]);
  const [selectedthirdvalues, setSelectedThirdValues] = useState<string[]>([]);
  const [selectedValuesmealtype, setSelectedValuesMealType] =
    React.useState<SelectedValuesMealTypeState>([]);

  const [optionsmealtype, setOptionsMealType] = useState([
    "Breakfast",
    "Lunch",
    "Dinner",
  ]);

  //   {_-------------------Array for Day Check---------------------------------}
  const [dineInDates, setDineInDates] = useState([]);
  const [DayPickup, setDayPickup] = useState<number[]>([]);
  const [DayDelivery, setDayDelivery] = useState<number[]>([]);
  const [DayThird, setDayThird] = useState<number[]>([]);
  const [dineInDates1, setDineInDates1] = useState<number[][]>([[]]);
  //   {_-------------------Use State  for Showing Day checck ---------------------------------}
  const [showDay, setShowDay] = useState(false);
  const [showDayPickup, setShowDayPickup] = useState(false);
  const [showDayDelivery, setShowDayDelivery] = useState(false);
  const [showDayThird, setShowDayThird] = useState(false);

  const prizingDetail = useSelector(
    (state: any) => state.PricingDetailReducer.prizingData
  );

  const [formNormal, setformNormal] = useState({
    PickuppriceNormal: "",
    PickupmealtypeNormal: "",
    DeliverypriceNormal: "",
    DeliverymealtypeNormal: "",
    SwiggyorzomatoNormal: "",
    SwiggyNormal: "",
    SwiggymealtypeNormal: "",
    ZomatoNormal: "",
    ZomatomealtypeNormal: "",
  });

  const [buttonText, setButtonText] = useState([{ ChooseDay: "Choose Day" }]);
  const [Text, setText] = useState(
    dineinfields.map(() => "Set up for Specific Day")
  );

  const orderTypess = useSelector(
    (state: any) => state.auth?.restaurantDetails?.branch[0]?.orderTypes
  );

  const orderTypes = useSelector(
    (state: RootState) => state.auth?.restaurantDetails?.branch[0]?.orderTypes
  );

  const DineInId = orderTypess?.find((item: any) => item.typeGroup === "D")?.id;
  const pickUpId = orderTypess?.find((item: any) => item.typeGroup === "P")?.id;
  const deliveryId = orderTypess?.find(
    (item: any) => item.typeGroup === "S"
  )?.id;

  const thirdpartyid = orderTypess?.find(
    (item: any) => item.typeGroup === "T"
  )?.id;

  const thirdPartyTypeName = orderTypes?.find((item:any) => item.typeGroup === 'T')?.typeName

  const [pickupDetails, setPickUpDetails] = useState<DeliveryDetails>({
    typeId: pickUpId,
    typeName: "PickUp",
    availabilities: [
      {
        availabilityDays: [],
        sessions: [],
      },
    ],
    price: 0,
  });

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    typeId: deliveryId,
    price: 0,
    typeName: "Delivery",
    availabilities: [
      {
        availabilityDays: [],
        sessions: [],
      },
    ],
  });

  const [formattedDineInData, setFormattedDineInData] =
    useState<DeliveryDetails>({
      typeId: DineInId,
      typeName: "DineIn",
      price: 0,
      availabilities: [
        {
          availabilityDays: [],
          sessions: [],
        },
      ],
    });

  const [priceInfo, setPriceInfo] = useState<PriceInfo[]>([{
    typeId: '',
    price: 0,
    typeName: "",
    availabilities: [
      {
        availabilityDays: [],
        sessions: [],
      },
    ],
  }]);

  const [mealTypes, setMealTypes] = useState<Record<string, string[]>>({});

  const handleMealTypeChange = (
    option: string,
    selectedMealTypes: string[],
    index : number
  ) => {
    setMealTypes((prev) => ({
      ...prev,
      [option]: selectedMealTypes,
    }));

    const data = [...priceInfo]
    data[index].availabilities[0].sessions = selectedMealTypes
    setPriceInfo(data)
  };

  const mainForm = {
    availabilityid: availabilityid,
    formNormal,
    dineinfields,
    Normaldays: Normaldays,
    DeliveryMealType: selectedValues3,
    PicupMealType: selectedValues2,
    Pickup: DayPickup,

    DineInServiceArea: [selectedValues],
    Delivery: DayDelivery,

    thirdParty: DayThird,
    WeekDays: dineInDates1,

    DineIn: dineInDates1,
    Swiggy: selectedValues4,
    Zomato: selectedValues5,

    ...(dinein && {
      dineInDetails: formattedDineInData,
    }),
    
    ...(pickup && {pickupDetails: pickupDetails}),

   ...(delivery && { deliveryDetails: deliveryDetails}),

    // ...(selectedthirdvalues?.length > 0 && {                    //need to fix 3rd Party
    //   thirdpartyDetails: priceInfo
    // })
   ...( priceInfo && {thirdpartyDetails: priceInfo}  )
  };

  const optionsselectthird = orderTypes
    ?.filter((item) => item.typeGroup === "T")
    .map((item) => item.typeName);

  const thirdPartyData = orderTypes?.filter((item) => item.typeGroup === 'T').map((item) => item)

  const dineInTypes = orderTypes
    ?.filter((item) => item.typeGroup === "D")
    .map((item) => item.typeName);

  const pickUpTypes = orderTypes
    ?.filter((item) => item.typeGroup === "P")
    .map((item) => item.typeName);

  const deliveryTypes = orderTypes
    ?.filter((item) => item.typeGroup === "S")
    .map((item) => item.typeName);

    useEffect(()=>{
      if(selectedthirdvalues){
        const data = [...priceInfo]
        selectedthirdvalues.forEach((item, index) => {
          data[index].typeName = item
        })
        data.forEach((item,index) => {
          const id = thirdPartyData?.find((value) => item.typeName === value.typeName)?.id
          data[index].typeId = String(id)
        })
      }
    },[selectedthirdvalues]) 

    useEffect(() => {
      if (prizingDetail?.normalForm?.formNormal) {
        setformNormal({
          PickuppriceNormal: prizingDetail?.normalForm?.formNormal?.PickuppriceNormal || "",
          PickupmealtypeNormal: prizingDetail?.normalForm?.formNormal?.PickupmealtypeNormal || "",
          DeliverypriceNormal: prizingDetail?.normalForm?.formNormal?.DeliverypriceNormal || "",
          DeliverymealtypeNormal: prizingDetail?.normalForm?.formNormal?.DeliverymealtypeNormal || "",
          SwiggyorzomatoNormal: prizingDetail?.normalForm?.formNormal?.SwiggyorzomatoNormal || "",
          SwiggyNormal: prizingDetail?.normalForm?.formNormal?.SwiggyNormal || "",
          SwiggymealtypeNormal: prizingDetail.normalForm?.formNormal?.SwiggymealtypeNormal || "",
          ZomatoNormal: prizingDetail?.normalForm?.formNormal?.ZomatoNormal || "",
          ZomatomealtypeNormal: prizingDetail.normalForm?.formNormal?.ZomatomealtypeNormal || "",
        });
    
        const updatedFields = prizingDetail?.normalForm?.dineinfields.map((item: any) => ({
          DineInPrice: item?.DineInPrice || "",
          DineInMealType: item.DineInMealType || [],
          DineInService: item?.DineInService || "",
          showDay: true,
          dayButtonText: "Choose Day",
        }));
    
        setOnline(true);
        setPickup(true);
        setDelivery(true);
        setDineInFields(updatedFields);
    
        // Set delivery details
        const deliveryDetails = prizingDetail?.normalForm?.deliveryDetails;
        const pickupDetails = prizingDetail?.normalForm?.pickupDetails
        const thirdpartyDetails = prizingDetail?.normalForm?.thirdpartyDetails        
        const thirdPartyTypeName = prizingDetail?.normalForm?.thirdpartyDetails?.map
        if(pickupDetails){
          setPickUpDetails({
            typeId: pickUpId,
            price: pickupDetails?.price || '',
            typeName: pickupDetails?.typeName || '',
            availabilities: pickupDetails?.availabilities || [],
          })
        }

        if (deliveryDetails) {
          setDeliveryDetails({
            typeId: deliveryId,
            price: deliveryDetails?.price || "",
            typeName: deliveryDetails?.typeName || "",
            availabilities: deliveryDetails?.availabilities || [],
          });
        }
    
        if(thirdpartyDetails){
          const data = thirdpartyDetails?.map((item : any) => item?.typeName)
          setSelectedThirdValues(data)
          setPriceInfo(thirdpartyDetails)
          const object : any = {}
          const item = thirdpartyDetails?.map((item : any) => item)
          item.forEach((element : any) => {
            object[element.typeName] = element?.availabilities[0]?.sessions
          });
          setMealTypes(object)
        }
        
        // Initialize selected values
        const initialSelectedValues = updatedFields.map((item: any) => item.DineInMealType);
        setSelectedValuesMealType(initialSelectedValues);
    
        const initialSelectedValues2 = updatedFields.map((item: any) => item.DineInService);
        setSelectedValues(initialSelectedValues2);
        setDineIn(true);
      }
    
      if (prizingDetail?.normalForm) {
        setSelectedValues2(prizingDetail.normalForm.PicupMealType || selectedValues2);
        setSelectedValues3(prizingDetail.normalForm.deliveryDetails?.sessions || selectedValues3);
        setSelectedValues4(prizingDetail.normalForm.Swiggy || selectedValues4);
        setSelectedValues5(prizingDetail.normalForm.Zomato || selectedValues5);
        setDayPickup(prizingDetail.normalForm.Pickup || []);
        setShowDayPickup(true);
        setDayDelivery(prizingDetail.normalForm.Delivery || []);
        setShowDayDelivery(true);
        setDayThird(prizingDetail.normalForm.thirdParty || []);
        setShowDayThird(true);
        setNormalDays(prizingDetail.normalForm.Normaldays || []);
        setDineInDates1(prizingDetail.normalForm.DineIn || []);
        // setSelectedThirdValues(["Swiggy", "Zomato"]);
      }
    }, [prizingDetail]);
    

  const handleDelete = (index: number): void => {
    const newEntries = dineinfields.filter((_: any, i: any) => i !== index);
    setDineInFields(newEntries);

    
    const newSelectedValues1 = { ...selectedValues };
    delete newSelectedValues1[index];
    setSelectedValues(newSelectedValues1);

    const newSelectedValuesMealtype = { ...selectedValuesmealtype };
    delete newSelectedValuesMealtype[index];
    setSelectedValuesMealType(newSelectedValuesMealtype);

    const newArray = [...dineInDates1];
    newArray.splice(index, 1);
    setDineInDates1(newArray);
  };

  const AddDineInEntry = () => {
    setDineInEntry([...dineinentry, ""]);
    setDineInFields([
      ...dineinfields,
      {
        DineInPrice: "",
        DineInMealType: [],
        DineInService: "",
        showDay: false,
        dayButtonText: "Choose Day",
      },
    ]);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newEntries = [...dineinfields];
    newEntries[index] = {
      ...newEntries[index],
      [e.target.name as keyof DineInField]: e.target.value,
    };
    setDineInFields(newEntries);
  
    const newPrice = parseFloat(e.target.value) || 0; 
    setFormattedDineInData((prevData: any) => ({
      ...prevData,
      price: newPrice, 
    }));
  };

  const addDay = (index: number): void => {
    const newText = [...Text];
    const tempArray = [...dineInDates1];
    const newDineInFields = [...dineinfields];

    if (Text[index] === "Set up for Specific Day") {
      newText[index] = "Set up for All Days";
      tempArray[index] = [];
      newDineInFields[index].showDay = false;
    } else {
      newText[index] = "Set up for Specific Day";
      newDineInFields[index].showDay = true;
    }

    setText(newText);
    setDineInDates1(tempArray);
    setDineInFields(newDineInFields);
  };

  const addDayPickup = () => {
    setShowDayPickup(true);
  };

  const addDayPickupfalse = () => {
    setShowDayPickup(false);
  };

  const addDayDelivery = () => {
    setShowDayDelivery(true);
  };
  const addDayDeliveryfalse = () => {
    setShowDayDelivery(false);
  };

  const addDayThird = () => {
    setShowDayThird(true);
  };

  const addDayThirdfalse = () => {
    setShowDayThird(false);
  };


  useEffect(() => {
    if (JSON.stringify(mainFormState) !== JSON.stringify(mainForm)) {
      setMainFormState(mainForm);
    }
  }, [mainForm]);

  useEffect(() => {
   if(DayThird && priceInfo[0]?.typeName){
      const data = priceInfo
      data.forEach((item) => {
        item.availabilities[0].availabilityDays = DayThird.map((day) => day.toString())
      })
      setPriceInfo(data)
   }
  }, [DayThird]);

  useEffect(() => {
    setDeliveryDetails((prev) => ({
      ...prev,
      availabilities: [
        {
          ...prev.availabilities[0],
          availabilityDays: DayDelivery.map((day) => day.toString()),
        },
      ],
    }));
  }, [DayDelivery]);

  useEffect(() => {
    setPickUpDetails((prev) => ({
      ...prev,
      availabilities: [
        {
          ...prev.availabilities[0],
          availabilityDays: DayPickup.map((day) => day.toString()),
        },
      ],
    }));
  }, [DayPickup]);

  const handleSelect2 = (values: any, index: number): void => {
    setSelectedValues((prevState: SelectedValuesState) => ({
      ...prevState,
      [index]: values,
    }));

    const newDineInFields = [...dineinfields];
    newDineInFields[index] = {
      ...newDineInFields[index],
      DineInService: values,
    };
    setDineInFields(newDineInFields);
  };

  const addOption2 = (newOption: OptionType): void => {
    setOptions2((prevOptions) => [...prevOptions, newOption]);
  };
  const handleSelect3 = (newSelectedValues: string[]) => {
    setSelectedValues2(newSelectedValues);
  };

  const addOption3 = (newOption: OptionType): void => {
    setOptions3((prevOptions) => [...prevOptions, newOption]);
  };

  const handleSelect4 = (values: string[]): void => {
    setSelectedValues3(values);
    validateDropdown(values, "Pickup");
  };

  const addOption4 = (newOption: OptionType): void => {
    setOptions4([...options4, newOption]);
  };

  const handleSelect5 = (value: string[]): void => {
    setSelectedValues4(value);
    validateDropdown(value, "ThirdDelivery1");
  };

  const addOption5 = (newOption: OptionType): void => {
    setOptions5([...options5, newOption]);
  };

  const handleSelect6 = (value: string[]): void => {
    setSelectedValues5(value);
    validateDropdown(value, "ThirdDelivery2");
  };

  const addOption6 = (newOption: OptionType): void => {
    setOptions6([...options6, newOption]);
  };

  const handleSelectMealtype = (value: MealType, index: number): void => {
    // Ensure selectedValuesmealtype is iterable
    const newSelectedValues = Array.isArray(selectedValuesmealtype)
      ? [...selectedValuesmealtype]
      : [];
    newSelectedValues[index] = value;
    setSelectedValuesMealType(newSelectedValues);
  
    const newDineInFields = [...dineinfields];
    newDineInFields[index].DineInMealType = value;
    setDineInFields(newDineInFields);
  
    // Update formattedDineInData state, ensuring you update the correct availabilities index
    setFormattedDineInData((prevData: DeliveryDetails) => {
      const updatedAvailabilities = [...prevData.availabilities];
  
      // Ensure that the sessions are updated as a flat array and not nested arrays
      updatedAvailabilities[index] = {
        ...updatedAvailabilities[index],
        sessions: [...newSelectedValues.filter(Boolean).flat()], // Flatten the array
      };
  
      return {
        ...prevData,
        availabilities: updatedAvailabilities,
      };
    });
  
    if (dinein) {
      validateDropdown(value, index);
    }
  };
  
  
  const addOptionMealType = (newOption: OptionType): void => {
    setOptionsMealType([...optionsmealtype, newOption]);
  };

  const handleServiceSelect2 = (
    index: number,
    value: ServiceValueType,
    validfield: string
  ): void => {
    setSelectedValues(value);

    const newDineInFields = [...dineinfields];
    newDineInFields[index].DineInService = value;
    setDineInFields(newDineInFields);
    setValidationStateerr((prevState) => ({
      ...prevState,
      [validfield]: {
        ...prevState[validfield],
        isValid: false,
        errorMessage: "",
      },
    }));
  };

  const handleMealSelect2 = (
    index: number,
    value: MealType,
    validfield: string
  ): void => {
    if (index < 0 || index >= dineinfields.length) {
      return;
    }
    const newDineInFields = [...dineinfields];
    newDineInFields[index].DineInMealType = value;
    setDineInFields(newDineInFields);
    setValidationStateerr((prevState) => ({
      ...prevState,
      [validfield]: {
        ...prevState[validfield],
        isValid: false,
        errorMessage: "",
      },
    }));
  };

  const handleSelectThird = (value: string[]): void => {
    setSelectedThirdValues(value);
    validateDropdown(value, "ThirdDeliverySwiggyZomato");
  };

  const clearSelection = () => {
    setSelectedValuesMealType([]);

    setNormalDays([]);
    setSelectedValues2([]);
    setformNormal({
      PickuppriceNormal: "",
      PickupmealtypeNormal: "",
      DeliverypriceNormal: "",
      DeliverymealtypeNormal: "",
      SwiggyorzomatoNormal: "",
      SwiggyNormal: "",
      SwiggymealtypeNormal: "",
      ZomatoNormal: "",
      ZomatomealtypeNormal: "",
    });
    setDayPickup([]);
    setSelectedValues3([]);
    setDayDelivery([]);
    setDayThird([]);
    setSelectedValues4([]);
    setSelectedValues5([]);
    setSelectedValues([]);
    setDineInFields((prevDineInFields: any) =>
      prevDineInFields.map(() => ({
        DineInPrice: "",
        DineInMealType: [],
        DineInService: [],
      }))
    );
  };

  useEffect(() => {
    if (resetSelection) {
      resetSelection.current = clearSelection;
    }
  }, [resetSelection]);

  const [dropdownopened, setDropdownopened] = useState<boolean>(false);

  return (
    <div>
      <div className="AvailDaycheck">
        <div className="AvailDaycheck-Heading">
          <h1 className="AvailableDaysHeadingNormal">Available days</h1>
          <div className="tooltip">
            <TooltipMsg
              message="Enter a unique code for this food item, used for identification."
              styles={{
                marginLeft: "2rem",
                width: "350px",
                height: "35px",
                backgroundColor: "#67833E",
                color: "white",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "5px",
              }}
              Arrowstyle={{
                marginTop: "0rem",
                rotate: "-90deg",
                position: "relative",
                left: "-1.6rem",
              }}
            >
              <div className="ToolKitchen">
                <img src={info} alt="info icon" width={20} height={20} />
              </div>
            </TooltipMsg>
          </div>
        </div>

        <div className="dayschecking">
          <DaysCheck
            checkedItems={Normaldays}
            setCheckedItems={setNormalDays}
            id={availabilityid}
            setId={setAvailabilityid}
          ></DaysCheck>
          <p className="Note">
            Note : Changes here will apply to all service types unless specific
            day options are enabled
          </p>
        </div>
      </div>
      {/* <h1 className="AvailableServiceHeading">Avaliable Service Streams</h1> */}
      {/* DineIn Related */}

      {(
        <div className="DineInRelated">
          <h1 className="DineInRelatedHeadingNormalAvail">Dine In</h1>
          <Toggle toggle={dinein} setToggle={setDineIn} />
        </div>
      )}

      {dinein ? (
        <>
          {dineinfields?.map((entry: any, index: any) => {
            const mealTypeKey = `DineInMealType_${index}`;
            const priceKey = `DineInPrice_${index}`;
            const DineInService = `DineInService_${index}`;
            return (
              <>
              <div className="DineIn-Fields">
              <div className="LabelPrice">
                  <LableComponent lable="Price*" />
                </div>
                <div
                  className="DineInInput11Normal"
                  key={index}
                  style={{ zIndex: dineinfields.length - index }}
                >
                  <div className="Dine-In-Price">
                    <input
                      type="text"
                      name="DineInPrice"
                      value={entry.DineInPrice}
                      className="DineInInput1Normal"
                      onChange={(e) => {
                        handleChange(index, e);
                      }}
                    />
                    {!ValidationStateerr[priceKey]?.isValid && (
                      <span className="ErrormsgPrice">
                        {ValidationStateerr[priceKey]?.errorMessage}
                      </span>
                    )}
                  </div>

                  <div className="Mealz">
                    <div>
                      <DropDown
                        selectedValues={selectedValuesmealtype[index] || ""}
                        onSelect={(values) =>
                          handleSelectMealtype(values, index)
                        }
                        options={optionsmealtype}
                        index={index}
                        label="Meal Type*"
                        width="Drop1"
                      />
                    </div>
                    <div>
                      {!ValidationStateerr[mealTypeKey]?.isValid && (
                        <span className="Errormsg">
                          {ValidationStateerr[mealTypeKey]?.errorMessage}
                        </span>
                      )}
                    </div>
                  </div>

                  <h1
                    onClick={() => handleDelete(index)}
                    className="DeleteButtonDine"
                  >
                    - Delete
                  </h1>
                </div>
                <div className="dineInChooseDayContainer">
                  <h3 className="dineInChooseDayContainerHeading">
                    Choose for Specific day
                  </h3>
                  <h3
                    className="dineInChooseDayContainer-chooseheading"
                    onClick={() => addDay(index)}
                  >
                   Choose Day
                  </h3>
                </div>
                <div className="dayspickup">
                  {entry.showDay && (
                    <DaysCheckDin
                      checkedItems={dineInDates1}
                      setCheckedItems={setDineInDates1}
                      index={index}
                      {...(availabilityid
                        ? { id: availabilityid, setId: setAvailabilityid }
                        : {})}
                    />
                  )}
                </div>
              </div>
                
              </>
            );
          })}
 
          <h1 className="AddentryNormal" onClick={AddDineInEntry}>
            {" "}
            + Add entry
          </h1>
        </>
      ) : (
        ""
      )}

      {/* OnlineRelated */}
      <div className="OnlineRelatedNormal">
        <h1 className="OnlineRelatedHeadingNormal">Online</h1>
        <div className="toggleIII">
          <Toggle toggle={online} setToggle={setOnline} />
        </div>
      </div>

      <div className="OnlineSectionNormal">
        {online ? (
          <div className="onlineselected">
            {/* PickupRelated */}
            <div className="PickupRelatedNormal">
              <h1 className="PickupRelatedHeadingNormal">Pick Up</h1>
              <div className="toggleIV">
                <Toggle toggle={pickup} setToggle={setPickup} />
              </div>
            </div>
            <div className="PickupSectionNormal">
              {pickup && pickUpTypes ? (
                <div>
                  <div className="LabelPricePickup">
                    <LableComponent lable="Price*" />
                  </div>
                  <div className="PickupInput11Normal">
                    <input
                      type="text"
                      className="DineInInput1Normal"
                      value={pickupDetails?.price}
                      onChange={(e) =>
                        setPickUpDetails({
                          ...pickupDetails,
                          price: Number(e.target.value),
                        })
                      }
                    />
                    <div className="PrizeD">
                      <DropDown
                        selectedValues={
                          pickupDetails.availabilities[0].sessions
                        }
                        onSelect={(selectedMealTypes) =>
                          setPickUpDetails((prevDetails) => ({
                            ...prevDetails,
                            availabilities: prevDetails.availabilities.map(
                              (availability, index) =>
                                index === 0
                                  ? {
                                      ...availability,
                                      sessions: selectedMealTypes,
                                    }
                                  : availability
                            ),
                          }))
                        }
                        options={options3}
                        label="Meal Type*"
                        width="Drop1"
                      />
                    </div>
                  </div>
                  <div className="PickupChooseDayContainer">
                    {showDayPickup ? (
                      <h3 className="pickupChooseDayContainerHeading">
                        Back for default days
                      </h3>
                    ) : (
                      <h3 className="pickupChooseDayContainerHeading">
                        Setup for specific days?
                      </h3>
                    )}
                    {showDayPickup ? (
                      <h3
                        className="pickupChooseDayContainer-chooseheading"
                        onClick={addDayPickupfalse}
                      >
                        Default days
                      </h3>
                    ) : (
                      <h3
                        className="pickupChooseDayContainer-chooseheading"
                        onClick={addDayPickup}
                      >
                        Choose Day
                      </h3>
                    )}
                  </div>
                  <div className="dayspick-pickup">
                    {showDayPickup ? (
                      <DaysCheck
                        checkedItems={DayPickup}
                        setCheckedItems={setDayPickup}
                        {...(availabilityid.length > 0
                          ? { id: availabilityid, setId: setAvailabilityid }
                          : { id: [], setId: () => {} })}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* DeliveryRelated    */}
            <div className="DeliveryRelatedNormal">
              <h1 className="DeliveryRelatedHeadingNormal">Delivery</h1>
              <div className="toggleV">
                <Toggle toggle={delivery} setToggle={setDelivery} />
              </div>
            </div>

            <div
              className={
                online ? "DeliverySectionNormal" : "DeliverySectionNormalclose"
              }
            >
              {delivery && deliveryTypes ? (
                <div>
                  <div></div>
                  <p className="LabelPrice-delivery"> Price*</p>
                  <div className="Online-delivery">
                    <input
                      type="text"
                      className="DineInInput1Normal"
                      value={deliveryDetails?.price}
                      onChange={(e) => {
                        const newPrice = e.target.value;
                        setDeliveryDetails((prevDetails:any) => ({
                          ...prevDetails,
                          price: Number(newPrice),
                        }));
                      }}
                    />
                    <div className="DeliveryD">
                      <DropDown
                        selectedValues={
                          deliveryDetails.availabilities[0].sessions
                        }
                        onSelect={(selectedMealTypes) => {
                          setDeliveryDetails((prevDetails) => ({
                            ...prevDetails,
                            availabilities: [
                              {
                                ...prevDetails.availabilities[0],
                                sessions: selectedMealTypes,
                              },
                            ],
                          }));
                        }}
                        options={options4}
                        label="Meal Type*"
                        width="Drop1"
                      />
                    </div>
                  </div>
                  <div className="deliveryChooseDayContainer">
                    {showDayDelivery ? (
                      <h3 className="deliveryChooseDayContainerHeading">
                        Back for default days
                      </h3>
                    ) : (
                      <h3 className="deliveryChooseDayContainerHeading">
                        Setup for specific days?
                      </h3>
                    )}
                    {showDayDelivery ? (
                      <h3
                        className="deliveryChooseDayContainer-chooseheading"
                        onClick={addDayDeliveryfalse}
                      >
                        Default days
                      </h3>
                    ) : (
                      <h3
                        className="deliveryChooseDayContainer-chooseheading"
                        onClick={addDayDelivery}
                      >
                        Choose Day
                      </h3>
                    )}
                  </div>
                  <div className="dayspickup">
                    {showDayDelivery && (
                      <DaysCheck
                        checkedItems={DayDelivery}
                        setCheckedItems={setDayDelivery}
                        {...(availabilityid.length > 0
                          ? { id: availabilityid, setId: setAvailabilityid }
                          : { id: [], setId: () => {} })} // Provide default empty values if `availabilityid` is empty
                      />
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <h1 className="ThirdDeliveryRelatedHeadingNormal">
              Third Party delivery
            </h1>
            <div className="thirdpartyContainer">
              <div className="Delivery11">
                <DropDown
                  selectedValues={selectedthirdvalues}
                  onSelect={handleSelectThird}
                  options={optionsselectthird}
                  label=""
                  isopened={setDropdownopened}
                  onBlur={() =>
                    validateDropdown(selectedthirdvalues, "SwiggyZomato")
                  }
                  validation={validationState.PickupSwiggy}
                  width="Drop1"
                />
              </div>

              {/* Dynamically render based on selected options */}
              {selectedthirdvalues?.map((option, index) => {
                  return (
                    <div key={option} className="LabelSwiggyInputDropDown">
                      <div className="LabelSwiggyInput">
                        {/* <label className="swiggyZomatoHeading">
                          {option} Price
                        </label> */}
                        <p className="Thrid-party-price"> {option} Price</p>
                        <input
                          className="swiggyZomato-input"
                          type="text"
                          value={priceInfo[index]?.price || ""}
                          onChange={(e) =>{
                            const data = [...priceInfo]
                            data[index].price = Number(e.target.value)
                            setPriceInfo(data)
                          }}
                        />
                      </div>
                      <div className={`Third${option}  thridparties-dropdown `} style={{zIndex:dropdownopened?'-1':''}}>
                        <DropDown
                          selectedValues={mealTypes[option] || []}
                          onSelect={(selected) =>
                            handleMealTypeChange(option, selected, index)
                          }
                          options={options4}
                          label="Meal Type*"
                        
                          onBlur={() =>
                            validateDropdown(
                              mealTypes[option],
                              `ThirdDelivery${option}`
                            )
                          }
                          validation={validationState[`ThirdDelivery${option}`]}
                          width="Drop1"
                        />
                      </div>
                    </div>
                  );
                
                return null;
              })}

              <div className="ThirdPartyChooseDayContainer">
                {showDayThird ? (
                  <h3 className="ThirdPartyChooseDayContainerHeading">
                    Back to Default days
                  </h3>
                ) : (
                  <h3 className="ThirdPartyChooseDayContainerHeading">
                    Setup for specific days?
                  </h3>
                )}
                {showDayThird ? (
                  <h3
                    className="ThirdPartyChooseDayContainer-chooseheading"
                    onClick={addDayThirdfalse}
                  >
                    Default Days
                  </h3>
                ) : (
                  <h3
                    className="ThirdPartyChooseDayContainer-chooseheading"
                    onClick={addDayThird}
                  >
                    Choose Day
                  </h3>
                )}
              </div>

              {showDayThird && (
                <DaysCheck
                  checkedItems={DayThird}
                  setCheckedItems={setDayThird}
                  {...(availabilityid.length > 0
                    ? { id: availabilityid, setId: setAvailabilityid }
                    : { id: [], setId: () => {} })}
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Normalavail;
