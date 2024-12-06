import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
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
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { log } from "util";

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
  typeGroup: string;
  availabilities: Availability[];
}
export interface NormalavailRef {
  handleValidate: () => boolean;
  resetSelection: () => void;
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
  setValidationFunction: any;
  getValues:any
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
  price: number;
  typeGroup: string;
  availabilities: Availability[];
}

const Normalavail = forwardRef<NormalavailRef, NormalavailProps>(
  (props, ref) => {
    const {
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
      setValidationFunction,
      getValues
    } = props;

    const [online, setOnline] = useState(false);
    // console.log({online})
    const [pickup, setPickup] = useState(false);
    const [delivery, setDelivery] = useState(false);
    const [showDineIn, setShowDineIn] = useState(false);
    const { setValiadtePriceFields, setStoredFunction } =
      useContext(Contextpagejs);

    const [dineinentry, setDineInEntry] = useState<string[]>([]);
    const [pickUpEntry, setPickUpEntry] = useState<string[]>([]);
    const [deliveryEntry, setDeliveryEntry] = useState<string[]>([]);
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
    const [selectedthirdvalues, setSelectedThirdValues] = useState<string[]>(
      []
    );
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
      dineinfields?.map(() => "Set up for Specific Day")
    );
    const dataFromRedux = useSelector(
      (state: any) => state?.selectedMockDataReducer?.data
    );

    const orderTypess = useSelector(
      (state: any) => state.auth?.restaurantDetails?.branch[0]?.orderTypes
    );

    const orderTypes = useSelector(
      (state: RootState) => state.auth?.restaurantDetails?.branch[0]?.orderTypes
    );

    // const seletedItemOrderTypes=data

    const data = useSelector(
      (state: any) => state?.selectedMockDataReducer?.data
    );

    const DineInId = orderTypess?.find(
      (item: any) => item.typeGroup === "D"
    )?.id;
    const pickUpId = orderTypess?.find(
      (item: any) => item.typeGroup === "P"
    )?.id;
    const DineInServiceEnabled = orderTypess?.find(
      (item: any) => item.typeGroup === "D"
    )?.isEnabled;
    const pickUpIdServiceEnabled = orderTypess?.find(
      (item: any) => item.typeGroup === "P"
    )?.isEnabled;
    const DeliveryServiceEnabled = orderTypess?.find(
      (item: any) => item.typeGroup === "S"
    )?.isEnabled;

    const deliveryId = orderTypess?.find(
      (item: any) => item.typeGroup === "S"
    )?.id;

    const thirdpartyid = orderTypess?.find(
      (item: any) => item.typeGroup === "T"
    )?.id;

    const thirdPartyTypeName = orderTypes?.find(
      (item: any) => item.typeGroup === "T"
    )?.typeName;

    const [pickupDetails, setPickUpDetails] = useState<DeliveryDetails>({
      typeId: pickUpId,
      typeName: "PickUp",
      typeGroup: "P",
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
      typeGroup: "S",
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
        typeGroup: "D",
        availabilities: [
          {
            availabilityDays: [],
            sessions: [],
          },
        ],
      });

    const [priceInfo, setPriceInfo] = useState<PriceInfo[]>([
      {
        typeId: "",
        price: 0,
        typeName: "",
        typeGroup: "T",
        availabilities: [
          {
            availabilityDays: [],
            sessions: [],
          },
        ],
      },
    ]);

    const [dineInEnable, setdineInEnable] = useState<boolean>(true);
    const [pickupEnable, setpickupEnable] = useState<boolean>(true);
    const [deliveryEnable, setdeliveryEnable] = useState<boolean>(true);

    const seletedOrdertypes=dataFromRedux[0]?.orderTypes;


    // useEffect(() => {
    //   const DineInEnable = seletedOrdertypes?.find(
    //     (item: any) => item.typeGroup === "D"
    //   )?.isEnabled;
    //   const pickUpenable = seletedOrdertypes?.find(
    //     (item: any) => item.typeGroup === "P"
    //   )?.isEnabled;
    //   const deliveryEnable = seletedOrdertypes?.find(
    //     (item: any) => item.typeGroup === "S"
    //   )?.isEnabled;

    //   if (DineInEnable === 0) {
    //     setShowDineIn(false);
    //     setdineInEnable(false);
    //   } else {
    //     setShowDineIn(true);
    //     setdineInEnable(true);
    //   }

    //   if (pickUpenable === 0) {
    //     setPickup(false);
    //     setpickupEnable(false);
    //   } else {
    //     setPickup(true);
    //     setpickupEnable(true);
    //   }

    //   if (deliveryEnable === 0) {
    //     setDelivery(false);
    //     setdeliveryEnable(false);
    //   } else {
    //     setDelivery(true);
    //     setdeliveryEnable(true);
    //   }

    //   if (pickUpenable === 1 || deliveryEnable === 1) {
    //     setOnline(true);
    //   } else {
    //     setOnline(false);
    //   }
    // }, []);
    
    useEffect(()=>{
      if(!showDineIn){
        setDineInFields((prevDineInFields: any) =>
          prevDineInFields.map(() => ({
            DineInPrice: "",
            DineInMealType: [],
            DineInService: [],
          }))
        );
        setSelectedValuesMealType([])
      }
      if(!pickup){
        setPickUpDetails({
          typeId: pickUpId,
          typeName: "PickUp",
          typeGroup: "P",
          availabilities: [
            {
              availabilityDays: [],
              sessions: [],
            },
          ],
          price: 0,
        })
      }
      if(!delivery){
        setDeliveryDetails({typeId: deliveryId,
      price: 0,
      typeName: "Delivery",
      typeGroup: "S",
      availabilities: [
        {
          availabilityDays: [],
          sessions: [],
        },
      ],
    })
    setMealTypes({});
    setSelectedThirdValues([]);
    setPriceInfo([
      {
        typeId: "",
        price: 0,
        typeName: "",
        typeGroup: "T",
        availabilities: [
          {
            availabilityDays: [],
            sessions: [],
          },
        ],
      },
    ]);
   
      }
      if(!online){
        setPickup(false)
        setDelivery(false)
      }

    },[showDineIn,online,pickup,delivery])

    const [mealTypes, setMealTypes] = useState<Record<string, string[]>>({});

    const handleMealTypeChange = (
      option: string,
      selectedMealTypes: string[],
      index: number
    ) => {
      setMealTypes((prev) => ({
        ...prev,
        [option]: selectedMealTypes,
      }));
      const data = JSON.parse(JSON.stringify(priceInfo));
      if (!data[index].availabilities) {
        data[index].availabilities = [
          {
            availabilityDays: [],
            sessions: [],
          },
        ];
      }
      data[index].availabilities[0].sessions = selectedMealTypes;
      setPriceInfo(data);
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

      ...(showDineIn && {
        dineInDetails: formattedDineInData,
      }),

      ...(pickup && { pickupDetails: pickupDetails }),

      ...(delivery && { deliveryDetails: deliveryDetails }),

      // ...(selectedthirdvalues?.length > 0 && {
      //   thirdpartyDetails: priceInfo
      // })
      ...(selectedthirdvalues?.length > 0 && { thirdpartyDetails: priceInfo }),
    };

    const optionsselectthird = orderTypes
      ?.filter((item) => item.typeGroup === "T")
      .map((item) => item.typeName);

    const thirdPartyData = orderTypes
      ?.filter((item) => item.typeGroup === "T")
      .map((item) => item);

    const dineInTypes = orderTypes
      ?.filter((item) => item.typeGroup === "P")
      .map((item) => item.typeName);

    const pickUpTypes = orderTypes
      ?.filter((item) => item.typeGroup === "P")
      .map((item) => item.typeName);

    const deliveryTypes = orderTypes
      ?.filter((item) => item.typeGroup === "S")
      .map((item) => item.typeName);

    useEffect(() => {
      if (selectedthirdvalues && selectedthirdvalues.length > 0) {
        const data = [...priceInfo];
        selectedthirdvalues.forEach((item, index) => {
          if (data[index]?.typeName === "") {
            data[index].typeName = item;
          }
        });
        data.forEach((item, index) => {
          if (data[index].typeId === "") {
            const id = thirdPartyData?.find(
              (value) => item.typeName === value.typeName
            )?.id;
            data[index].typeId = String(id);
          }
        });
      }
    }, [selectedthirdvalues]);

    const editData = useSelector((state: any) => state.productCatalog.editData);

    useEffect(() => {
      
      if (prizingDetail?.normalForm?.formNormal) {
        const dineIndetail = prizingDetail?.normalForm?.dineinfields;
        const deliveryDetails = prizingDetail?.normalForm?.deliveryDetails;
        const pickupDetails = prizingDetail?.normalForm?.pickupDetails;
        const thirdpartyDetails = prizingDetail?.normalForm?.thirdpartyDetails;
        const dineIndetails = prizingDetail?.normalForm?.dineInDetails;
        console.log("hjk",prizingDetail?.normalForm);
        console.log({dineIndetail,dineIndetails});
        
        

        const filterOrderTypeAvailableorNotDineIn = seletedOrdertypes?.filter(
          (data: any, index: number) => data.typeId === dineIndetail?.typeId
        );
        const filterOrderTypeAvailableorNotPickup = seletedOrdertypes?.filter(
          (data: any, index: number) => data.typeId === pickupDetails?.typeId
        );
        const filterOrderTypeAvailableorNotDelivery = seletedOrdertypes?.filter(
          (data: any, index: number) => data.typeId === deliveryDetails?.typeId
        );


        setformNormal({
          PickuppriceNormal:
            prizingDetail?.normalForm?.formNormal?.PickuppriceNormal || "",
          PickupmealtypeNormal:
            prizingDetail?.normalForm?.formNormal?.PickupmealtypeNormal || "",
          DeliverypriceNormal:
            prizingDetail?.normalForm?.formNormal?.DeliverypriceNormal || "",
          DeliverymealtypeNormal:
            prizingDetail?.normalForm?.formNormal?.DeliverymealtypeNormal || "",
          SwiggyorzomatoNormal:
            prizingDetail?.normalForm?.formNormal?.SwiggyorzomatoNormal || "",
          SwiggyNormal:
            prizingDetail?.normalForm?.formNormal?.SwiggyNormal || "",
          SwiggymealtypeNormal:
            prizingDetail.normalForm?.formNormal?.SwiggymealtypeNormal || "",
          ZomatoNormal:
            prizingDetail?.normalForm?.formNormal?.ZomatoNormal || "",
          ZomatomealtypeNormal:
            prizingDetail.normalForm?.formNormal?.ZomatomealtypeNormal || "",
        });

        // if (editData?.length > 0 &&
        //   filterOrderTypeAvailableorNotDineIn &&
        //   filterOrderTypeAvailableorNotDineIn[0]?.isEnabled === 0
        // ) {
        //   setShowDineIn(true);
        //   setdineInEnable(true);
        // } else {
        //   setShowDineIn(false);
        //   setdineInEnable(false);
        // }

        // if (
        //   editData?.length > 0 &&
        //   filterOrderTypeAvailableorNotPickup &&
        //   filterOrderTypeAvailableorNotPickup[0]?.isEnabled === 1 &&
        //   pickupDetails?.price > 0
        // ) {
        //   setPickup(true);
        //   setpickupEnable(true);
        // } else {
        //   setPickup(false);
        //   setpickupEnable(false);
        // }

        // if (pickupDetails) {
        //   pickupDetails?.price > 0 ? setOnline(true) : setOnline(false);
        // }


        // if (deliveryDetails) {
        //   deliveryDetails?.price > 0 ? setOnline(true) : setOnline(false);
        //   thirdpartyDetails && thirdpartyDetails[0]?.price > 0 ? setOnline(true) : setOnline(false);
        // }

        const updatedFields = prizingDetail?.normalForm?.dineinfields?.map(
          (item: any) => ({
            DineInPrice: item?.DineInPrice,
            DineInMealType: item?.DineInMealType || [],
            DineInService: item?.DineInService,
            showDay: true,
            dayButtonText: "Choose Day",
          })
        );

        const updatedField = {
          DineInPrice: dineIndetails?.price,
          DineInMealType: dineIndetails?.availabilities && dineIndetails?.availabilities[0]?.sessions,
          showDay: prizingDetail.normalForm.DineIn[0]?.length > 0 ? true : false,
          dayButtonText: "Choose Day",
        };
  
        console.log("fghj",updatedField.DineInMealType);
        console.log();
        
        
        setDineInFields([updatedField]);
        if(updatedField.DineInPrice || updatedField.DineInMealType )
        {
      setShowDineIn(true)
        }
        setFormattedDineInData((prevData: DeliveryDetails) => {
          const updatedAvailabilities = [...prevData.availabilities];

          updatedAvailabilities[0] = {
            ...updatedAvailabilities[0],
            sessions: [...updatedFields[0]?.DineInMealType],
          };

          return {
            ...prevData,
            price: updatedField?.DineInPrice,
            availabilities: updatedAvailabilities,
          };
        });

        // Set delivery details
        const thirdPartyTypeName =
          prizingDetail?.normalForm?.thirdpartyDetails?.map;
        if (pickupDetails) {
          setPickup(true) 
          setOnline(true)
          setPickUpDetails({
            typeId: pickUpId,
            typeGroup: "P",
            price: pickupDetails?.price || 0,
            typeName: pickupDetails?.typeName || "",
            availabilities: pickupDetails?.availabilities || [],
          });
        }

        if (deliveryDetails) {
          setPickup(true) 
          setOnline(true)
          setDeliveryDetails({
            typeId: deliveryId,
            typeGroup: "S",
            price: deliveryDetails?.price || "",
            typeName: deliveryDetails?.typeName || "",
            availabilities: deliveryDetails?.availabilities || [],
          });
        }

        if (thirdpartyDetails?.length > 0) {
          // setOnline(true);
          const data = thirdpartyDetails?.map((item: any) => item?.typeName);
          if (thirdpartyDetails.some((item: any) => item?.price)) {
            setSelectedThirdValues(data);
          }
          setPriceInfo([...thirdpartyDetails]);
          const object: any = {};
          const item = thirdpartyDetails?.map((item: any) => item);
          item.forEach((element: any) => {
            object[element.typeName] =
              element?.availabilities && element?.availabilities[0]?.sessions;
          });
          setMealTypes(object);
        }

        // Initialize selected values
        const initialSelectedValues = updatedFields?.map(
          (item: any) => item.DineInMealType
        );
        setSelectedValuesMealType(initialSelectedValues);

        const initialSelectedValues2 = updatedFields?.map(
          (item: any) => item.DineInService
        );
        setSelectedValues(initialSelectedValues2);
        // setDineIn(true);
        setDineInDates1(prizingDetail.normalForm.DineIn || []);

        // setShowDineIn(true);
      }

      if (prizingDetail?.normalForm) {
        const deliveryDetails = prizingDetail?.normalForm?.deliveryDetails;
        const pickupDetails = prizingDetail?.normalForm?.pickupDetails;
        const thirdpartyDetails = prizingDetail?.normalForm?.thirdpartyDetails;
        const dineInDetails = prizingDetail?.normalForm?.dineinfields;
        const dineIndetail = prizingDetail?.normalForm?.dineInDetails;

        const filterOrderTypeAvailableorNotDineIn = seletedOrdertypes?.filter(
          (data: any, index: number) => data.typeId === dineIndetail?.typeId
        );
        const filterOrderTypeAvailableorNotPickup = seletedOrdertypes?.filter(
          (data: any, index: number) => data.typeId === pickupDetails?.typeId
        );
        const filterOrderTypeAvailableorNotDelivery = seletedOrdertypes?.filter(
          (data: any, index: number) => data.typeId === deliveryDetails?.typeId
        );

        if(dineIndetail){
          setShowDineIn(true);
          if (editData?.length > 0 &&
            filterOrderTypeAvailableorNotDineIn &&
            filterOrderTypeAvailableorNotDineIn[0]?.isEnabled === 0
          ) {
            setShowDineIn(false);
            setdineInEnable(false);
          } 
        }

        if (pickupDetails) {
          pickupDetails.price>0 && setPickup(true);
          if (
            editData?.length > 0 &&
            filterOrderTypeAvailableorNotPickup &&
            filterOrderTypeAvailableorNotPickup[0]?.isEnabled === 0
          ) {
            setPickup(false);
            setpickupEnable(false);
          } 

          setOnline(true);

          setPickUpDetails({
            typeId: pickUpId,
            typeGroup: "P",
            price: pickupDetails?.price || 0,
            typeName: pickupDetails?.typeName || "",
            availabilities: pickupDetails?.availabilities || [],
          });
        }

        if (deliveryDetails) {
          deliveryDetails?.price>0 && setDelivery(true)||thirdpartyDetails&& thirdpartyDetails[0]?.price>0 && setDelivery(true)
          if (
            editData?.length > 0 &&
            filterOrderTypeAvailableorNotDelivery &&
            filterOrderTypeAvailableorNotDelivery[0]?.isEnabled === 0 
          ) {
            setDelivery(false);
            setdeliveryEnable(false);
          } 
          setOnline(true);

          // thirdpartyDetails && thirdpartyDetails[0]?.price > 0 ? setOnline(true) : setOnline(false);
          // deliveryDetails?.price > 0 && setDelivery(true);
          setDeliveryDetails({
            typeId: deliveryId,
            typeGroup: "S",
            price: deliveryDetails?.price || 0,
            typeName: deliveryDetails?.typeName || "",
            availabilities: deliveryDetails?.availabilities || [],
          });
        }

        if (thirdpartyDetails?.length > 0) {          
          const data = thirdpartyDetails?.map((item: any) => item?.typeName);
          if (thirdpartyDetails.some((item: any) => item?.price)) {
            //need to change the logic here
            setSelectedThirdValues(data);
          }
          setPriceInfo([...thirdpartyDetails]);
          const object: any = {};
          const item = thirdpartyDetails?.map((item: any) => item);
          item?.forEach((element: any) => {
            object[element?.typeName] = element?.availabilities
              ? element?.availabilities[0]?.sessions
              : null;
          });
          setMealTypes(object);
          setOnline(true);
        }

        const updatedFields = prizingDetail?.normalForm?.dineinfields?.map(
          (item: any) => ({
            DineInPrice: item?.DineInPrice,
            DineInMealType: item?.DineInMealType || [],
            DineInService: item?.DineInService,
            showDay: true,
            dayButtonText: "Choose Day",
          })
        );

        const updatedField = {
          DineInPrice: dineIndetail?.price,
          DineInMealType:
            (dineIndetail &&
              dineIndetail?.availabilities &&
              dineIndetail?.availabilities[0]?.sessions) ||
            [],
          showDay:
            dineIndetail &&
            dineIndetail?.availabilities &&
            prizingDetail.normalForm.DineIn[0]?.length > 0
              ? true
              : false,
          dayButtonText: "Choose Day",
        };

        setDineInFields([updatedField]);
        setFormattedDineInData((prevData: DeliveryDetails) => {
          const updatedAvailabilities = [...prevData.availabilities];

          updatedAvailabilities[0] = {
            ...updatedAvailabilities[0],
            sessions: updatedFields && [...updatedFields[0]?.DineInMealType],
          };

          return {
            ...prevData,
            price: updatedField && updatedField?.DineInPrice,
            availabilities: updatedAvailabilities && updatedAvailabilities,
          };
        });

        setSelectedValues2(
          prizingDetail.normalForm.PicupMealType || selectedValues2
        );
        setSelectedValues3(
          prizingDetail.normalForm.deliveryDetails?.sessions || selectedValues3
        );
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
    }, [prizingDetail, dataFromRedux[0]]);

    const [initialPricingData, setInitialPricingData] = useState([]);

    useEffect(() => {
      // setInitialPricingData()
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

    const getDisabledDays = (index: number) => {
      const allSelectedDays = new Set<number>();
      dineInDates1.forEach((selectedDays, i) => {
        if (i !== index) {
          selectedDays.forEach((day) => allSelectedDays.add(day));
        }
      });
      return Array.from(allSelectedDays);
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
      if (selectedthirdvalues.length > 0) {
        setShowDayThird(true);
      }
      // setShowDayThird(true);
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
      if (DayThird && priceInfo[0]?.typeName) {
        const updatedPriceInfo = priceInfo.map((item) => {
          if (item.availabilities) {
            return {
              ...item,
              availabilities: item.availabilities.map((availability) => ({
                ...availability,
                availabilityDays: DayThird?.map((day) => day?.toString()),
              })),
            };
          }
          return item;
        });
        setPriceInfo(updatedPriceInfo);
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

      setFormattedDineInData((prevData: DeliveryDetails) => {
        const updatedAvailabilities = [...prevData.availabilities];

        updatedAvailabilities[index] = {
          ...updatedAvailabilities[index],
          sessions: [...newSelectedValues.filter(Boolean).flat()],
        };

        return {
          ...prevData,
          availabilities: updatedAvailabilities,
        };
      });

      if (showDineIn) {
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
      setMealTypes({});
      setPriceInfo([
        {
          typeId: "",
          price: 0,
          typeName: "",
          typeGroup: "T",
          availabilities: [
            {
              availabilityDays: [],
              sessions: [],
            },
          ],
        },
      ]);
      setSelectedValuesMealType([]);
      setSelectedThirdValues([]);
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
      setPickUpDetails({ ...pickupDetails, price: 0 });
      setDeliveryDetails({
        ...deliveryDetails, // Spread the existing state
        price: 0, // Update the price property
      });
      setDayPickup([]);
      setSelectedValues3([]);
      setDayDelivery([]);
      setDayThird([]);
      setDineIn(false);
      setOnline(false);
      setPickup(false);
      setDelivery(false);
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

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateDineinFields = () => {
      const validationErrors: Record<string, string> = {};

      const Kitchenstationdata=getValues("kitchenstation");
      console.log({Kitchenstationdata});
      if(Kitchenstationdata===""|| Kitchenstationdata===undefined)
      {
        validationErrors[`kitchenstation`] = "kitchen station is required";
      }

      dineinfields?.forEach((field: any, index: number) => {
        if (showDineIn) {
          if (
            (showDineIn && !field?.DineInPrice) ||
            Number(field?.DineInPrice) <= 0
          ) {
            validationErrors[`DineInPrice-${index}`] = "Price is empty";
          }

          if (
            (showDineIn && !field?.DineInMealType) ||
            field?.DineInMealType?.length === 0
          ) {
            validationErrors[`DineInMealType-${index}`] = "Meal type is empty";
          }
        }
      });
      if (pickup) {
        if ((pickup && !pickupDetails?.price) || pickupDetails?.price <= 0) {
          validationErrors.pickupprice = "Price is empty";
        }
        const Pickupsessions = pickupDetails?.availabilities[0]?.sessions || [];
        if (pickup && Pickupsessions?.length === 0) {
          validationErrors.pickupmealTypeSessions = "Meal type is empty";
        }
      }

      if ( delivery ) {
        if (!deliveryDetails?.price || deliveryDetails?.price <= 0) {
          validationErrors.deliveryprice = "Price is empty";
        }

        // // Validate availabilityDays
        // const availabilityDays = pickupDetails.availabilities[0]?.availabilityDays || [];
        // if (availabilityDays.length === 0) {
        //   validationErrors.availabilityDays = "Availability days are missing.";
        // }

        // Validate sessions
        const deliverysessions =
          deliveryDetails?.availabilities[0]?.sessions || [];
        if (deliverysessions?.length === 0) {
          validationErrors.deliverymealTypeSessions = "Meal type is empty";
        }
      }

      setErrors(validationErrors);

      return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = () => {
      const isValid = validateDineinFields();
      if (!isValid) {
        return false;
      }
      return true;
    };

    const validate = () => {
      const isValid = Math.random() > 0.5;
      return isValid;
    };

    useEffect(() => {
      setValidationFunction(() => handleSubmit);
    }, [
      setValidationFunction,
      dineinfields,
      pickupDetails,
      deliveryDetails,
      showDineIn,
      pickup,
      delivery,
    ]);

    return (
      <div>
        <div className="AvailDaycheck">
          <div className="AvailDaycheck-Heading">
            <h1 className="AvailableDaysHeadingNormal">Available days</h1>
            {/* <button onClick={handleSubmit}>Validate</button> */}
            <div className="tooltip">
              <TooltipMsg
                message="Select the default days this item is available for both on-premise and off-premise services."
                styles={{
                  marginLeft: "2rem",
                  width: "480px",
                  height: "35px",
                  backgroundColor: "#67833E",
                  color: "white",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  position: "relative",
                  top: "-10px",
                }}
                Arrowstyle={{
                  marginTop: "0rem",
                  rotate: "-90deg",
                  position: "relative",
                  left: "-1.0rem",
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
            />
            <p className="Note">
              Note : Changes here will apply to all service types unless
              specific day options are enabled
            </p>
          </div>
        </div>
        {/* <h1 className="AvailableServiceHeading">Avaliable Service Streams</h1> */}
        {/* DineIn Related */}

        {
          <div className="DineInRelated">
            <h1
              className="DineInRelatedHeadingNormalAvail"
              style={{ opacity: dineInEnable ? "100%" : "50%" }}
            >
              Dine In
            </h1>
            <Toggle
              toggle={showDineIn}
              setToggle={setShowDineIn}
              Enabled={dineInEnable === true}
            />
          </div>
        }

        {showDineIn ? (
          <>
            {/* <h1>jhgf</h1> */}
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
                          type="number"
                          name="DineInPrice"
                          value={entry.DineInPrice}
                          className="DineInInput1Normal"
                          onChange={(e) => {
                            handleChange(index, e);
                          }}
                          onBlur={() => validateDineinFields()}
                          onInput={(e) => {
                            const inputElement = e.target as HTMLInputElement;
                            const value = inputElement.value;

                            if (!/^(\d+(\.\d*)?|\.\d+)$/.test(value)) {
                              inputElement.value = value.slice(0, -1);
                            }
                          }}
                        />
                        {/* { !ValidationStateerr[priceKey]?.isValid && (
                        <span className="ErrormsgPrice">
                          {ValidationStateerr[priceKey]?.errorMessage}
                        </span>
                      )} */}
                        <span className="ErrormsgPrice">
                          {errors[`DineInPrice-${index}`]}
                        </span>
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
                            onBlur={() => validateDineinFields()}
                            width="Drop1"
                          />
                        </div>
                        <span className="ErrormsgPrice mealTypeError">
                          {errors[`DineInMealType-${index}`]}
                        </span>
                        <div>
                          {!ValidationStateerr[mealTypeKey]?.isValid && (
                            <span className="Errormsg">
                              {ValidationStateerr[mealTypeKey]?.errorMessage}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* <h1
                      onClick={() => handleDelete(index)}
                      className="DeleteButtonDine"
                    >
                      - Delete
                    </h1> */}
                    </div>
                    <div className="dineInChooseDayContainer">
                      <h3 className="dineInChooseDayContainerHeading">
                        Choose for Specific day ?
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
                          getDisabledDays={getDisabledDays}
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

            {/* <h1 className="AddentryNormal" onClick={AddDineInEntry}>
            {" "}
            + Add entry
          </h1> */}
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
                <h1
                  className="PickupRelatedHeadingNormal"
                  style={{ opacity: pickupEnable ? "100%" : "50%" }}
                >
                  Pick Up
                </h1>
                <div className="toggleIV">
                  <Toggle
                    toggle={pickup}
                    setToggle={setPickup}
                    Enabled={pickupEnable === true}
                    // Enabled={pickUpIdServiceEnabled === 1 && pickupEnable===true}
                  />
                </div>
              </div>
              <div className="PickupSectionNormal">
                {pickup && pickUpTypes ? (
                  <div>
                    <div className="LabelPricePickup">
                      <LableComponent lable="Price*" />
                    </div>
                    <div className="PickupInput11Normal">
                      <div className="pickupprice-errormsg">
                        <input
                          type="number"
                          className="PriceInput1Normal-input"
                          value={pickupDetails.price || ""}
                          onBlur={() => validateDineinFields()}
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault(); // Prevent typing -,
                            }
                            if (
                              e.key === "e" ||
                              e.key === "-" ||
                              e.key === "+"
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const numericValue = inputValue
                              ? Number(inputValue)
                              : 0;
                            if (!isNaN(numericValue)) {
                              setPickUpDetails({
                                ...pickupDetails,
                                price: numericValue,
                              });
                            }
                          }}
                        />
                        <span className="Errormsg pickuperrormsg">
                          {errors.pickupprice}
                        </span>
                      </div>

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
                          onBlur={() => validateDineinFields()}
                        />
                        <span className="Errormsg pickuperrormsgmealType">
                          {errors.pickupmealTypeSessions}
                        </span>
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
                    {/* <h1 className="AddentryNormal" onClick={AddDineInEntry} style={{marginTop:'19px'}}>
                    {" "}
                    + Add entry
                  </h1> */}
                  </div>
                ) : (
                  ""
                )}
              </div>

              {/* DeliveryRelated    */}
              <div
                className={`${
                  delivery
                    ? "DeliveryRelatedNormal"
                    : "DeliveryRelatedNormalopen"
                }`}
              >
                <h1
                  className="DeliveryRelatedHeadingNormal"
                  style={{ opacity: deliveryEnable ? "100%" : "50%" }}
                >
                  Delivery
                </h1>
                <div className="toggleV">
                  <Toggle
                    toggle={delivery}
                    setToggle={setDelivery}
                    Enabled={deliveryEnable === true}
                  />
                </div>
              </div>

              <div
                className={
                  online
                    ? "DeliverySectionNormal"
                    : "DeliverySectionNormalclose"
                }
              >
                {delivery && deliveryTypes ? (
                  <div>
                    <div></div>
                    <p className="LabelPrice-delivery"> Price*</p>
                    <div className="Online-delivery">
                      <div className="delivery-price-errormsg">
                        <input
                          type="number"
                          onKeyDown={(e) => {
                            if (e.key === "-") {
                              e.preventDefault(); // Prevent typing -, e, or E
                            }
                            if (
                              e.key === "e" ||
                              e.key === "-" ||
                              e.key === "+"
                            ) {
                              e.preventDefault(); // Block these keys
                            }
                          }}
                          className="DeliveryInput1Normal"
                          value={deliveryDetails?.price || ""}
                          onBlur={() => validateDineinFields()}
                          onChange={(e) => {
                            const newPrice = e.target.value;
                            setDeliveryDetails((prevDetails: any) => ({
                              ...prevDetails,
                              price: Number(newPrice),
                            }));
                          }}
                          onInput={(e) => {
                            // onInput for real-time validation (allows only numbers and one decimal point)
                            const inputElement = e.target as HTMLInputElement;
                            const newPrice = inputElement.value;

                            // Regex allows only digits and one decimal point
                            if (!/^\d*\.?\d*$/.test(newPrice)) {
                              // If invalid input, restore the last valid value by slicing off the invalid character
                              inputElement.value = newPrice.slice(0, -1);
                            }
                          }}
                        />

                        <span className="Errormsg deliverypriceerrormsg">
                          {errors.deliveryprice}
                        </span>
                      </div>

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
                          onBlur={() => validateDineinFields()}
                          options={options4}
                          label="Meal Type*"
                          width="Drop1"
                        />
                        <span className="Errormsg deliverymealtypeerrormsg">
                          {errors.deliverymealTypeSessions}
                        </span>
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
                    <div className="dayspickup-normal">
                      {showDayDelivery && (
                        <DaysCheck
                          checkedItems={DayDelivery}
                          setCheckedItems={setDayDelivery}
                          {...(availabilityid.length > 0
                            ? { id: availabilityid, setId: setAvailabilityid }
                            : { id: [], setId: () => {} })}
                        />
                      )}
                    </div>
                  </div>
                ) : null}
              </div>

              {delivery && (
                <>
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
                        placeHolder="Third Party"
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
                              type="number"
                              value={priceInfo[index]?.price || ""}
                              onKeyDown={(e) => {
                                if (e.key === "-") {
                                  e.preventDefault();
                                }
                                if (
                                  e.key === "e" ||
                                  e.key === "-" ||
                                  e.key === "+"
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                let data = JSON.parse(
                                  JSON.stringify([...priceInfo])
                                );
                                data[index].price = Number(e.target.value);
                                setPriceInfo(data);
                              }}
                            />
                          </div>
                          <div
                            className={`Third${option}  thridparties-dropdown `}
                            style={{ zIndex: dropdownopened ? "-1" : "" }}
                          >
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
                              validation={
                                validationState[`ThirdDelivery${option}`]
                              }
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
                </>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
);

export default Normalavail;