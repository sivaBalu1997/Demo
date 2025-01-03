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
  inActiveUntil?: any;
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
  getValues: any;
  setValue: any;
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
  inActiveUntil?: any;
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
      getValues,
      setValue,
    } = props;

    const [online, setOnline] = useState(false);
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

    const locationid = useSelector((state: any) => state.auth.selectedBranch);

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

    const editData = useSelector((state: any) => state.productCatalog.editData);

    const [buttonText, setButtonText] = useState([{ ChooseDay: "Choose Day" }]);
    const [Text, setText] = useState(
      dineinfields?.map(() => "Set up for Specific Day")
    );
    const dataFromRedux = useSelector(
      (state: any) => state?.selectedMockDataReducer?.data
    );

    const orderTypess = locationid?.orderTypes

    const orderTypes = locationid?.orderTypes


    // const seletedItemOrderTypes=data

    const data = useSelector(
      (state: any) => state?.selectedMockDataReducer?.data
    );

    const DineInId = orderTypess?.find(
      (item: any) => item.typeGroup === "D"
    )?.id;

    console.log({orderTypess}, {orderTypes}, {DineInId})

    const pickUpId = orderTypess?.find(
      (item: any) => item.typeGroup === "P"
    )?.id;
    const DineInServiceEnabled = orderTypess?.find(
      (item: any) => item.typeGroup === "D"
    )?.isEnabled;
    //  const DeliveryServiceEnabled = false;
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
      ...(editData?.length  && { inActiveUntil: prizingDetail?.normalForm?.pickupDetails?.inActiveUntil?.split('.')[0] || null }),
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
      ...(editData?.length && {inActiveUntil: prizingDetail?.normalForm?.deliveryDetails?.inActiveUntil?.split('.')[0] || null})
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
        ...(editData?.length && {inActiveUntil: prizingDetail?.normalForm?.dineInDetails?.inActiveUntil?.split('.')[0] || null})
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
       ...(editData?.length && {inActiveUntil: prizingDetail?.normalForm?.thirdpartyDetails?.inActiveUntil?.split('.')[0] || null})
      },
    ]);

    const [dineInEnable, setdineInEnable] = useState<boolean>(true);
    const [pickupEnable, setpickupEnable] = useState<boolean>(true);
    const [deliveryEnable, setdeliveryEnable] = useState<boolean>(true);

    const seletedOrdertypes = dataFromRedux[0]?.orderTypes;

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

    useEffect(() => {
      if (!showDineIn) {
        setDineInFields((prevDineInFields: any) =>
          prevDineInFields.map(() => ({
            DineInPrice: "",
            DineInMealType: [],
            DineInService: [],
          }))
        );
        setSelectedValuesMealType([]);
      }
      if (!pickup) {
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
          ...(editData?.length  && {inActiveUntil: prizingDetail?.normalForm?.pickupDetails?.inActiveUntil || null})
        });
        setDayPickup([]);
        setShowDayPickup(false);
      }

      if (!delivery) {
        
        setDeliveryDetails({
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
          ...(editData?.length && {inActiveUntil: prizingDetail?.normalForm?.deliveryDetails?.inActiveUntil || null})
        });
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
            ...(editData?.length && {inActiveUntil: prizingDetail?.normalForm?.thirdpartyDetails?.inActiveUntil || null})
          },
        ]);
        setDayDelivery([]);
        setShowDayDelivery(false);
      }
      if (!online) {
        setPickup(false);
        setDelivery(false);
        setDayDelivery([]);
        setShowDayDelivery(false);
        setDayPickup([]);
        setShowDayPickup(false);
      }
    }, [showDineIn, online, pickup, delivery]);

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
    ?.filter((item: any) => item.typeGroup === "T" && (item.isEnabled === true || item.isEnabled === 1))
    .map((item: any) => item.typeName);

    const thirdPartyData = orderTypes
      ?.filter((item: any) => item.typeGroup === "T")
      .map((item: any) => item);

    const dineInTypes = orderTypes
      ?.filter((item: any) => item.typeGroup === "P")
      .map((item: any) => item.typeName);

    const pickUpTypes = orderTypes
      ?.filter((item: any) => item.typeGroup === "P")
      .map((item: any) => item.typeName);

    const deliveryTypes = orderTypes
      ?.filter((item: any) => item.typeGroup === "S")
      .map((item: any) => item.typeName);

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
              (value: any) => item.typeName === value.typeName
            )?.id;
            data[index].typeId = String(id);
          }
        });
      }
    }, [selectedthirdvalues]);

    useEffect(() => {
      if (prizingDetail?.normalForm?.formNormal) {
        const dineIndetail = prizingDetail?.normalForm?.dineinfields;
        const deliveryDetails = prizingDetail?.normalForm?.deliveryDetails;
        const pickupDetails = prizingDetail?.normalForm?.pickupDetails;
        const thirdpartyDetails = prizingDetail?.normalForm?.thirdpartyDetails;
        const dineIndetails = prizingDetail?.normalForm?.dineInDetails;

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

        setNormalDays(prizingDetail.normalForm.Normaldays || []);
        setDayPickup(prizingDetail.normalForm?.Pickup || []);
        setDayDelivery(prizingDetail.normalForm?.Delivery || []);
        setDayThird(prizingDetail?.normalForm?.thirdParty || []);
        dineIndetails?.availabilities?.forEach((availability: any) => {
          availability.availabilityDays =
            prizingDetail?.normalForm?.Normaldays || [];
        });

        setShowDayPickup(
          prizingDetail.normalForm?.Pickup?.length > 0 ? true : false
        );
        setShowDayDelivery(
          prizingDetail.normalForm?.Delivery?.length > 0 ? true : false
        );
        setShowDayThird(
          prizingDetail?.normalForm?.thirdParty?.length > 0 ? true : false
        );

        // if (pickupDetails) {
        //   pickupDetails?.price > 0 ? setOnline(true) : setOnline(false);
        // }

        // if (deliveryDetails) {
        //   deliveryDetails?.price > 0 ? setOnline(true) : setOnline(false);
        //   thirdpartyDetails && thirdpartyDetails[0]?.price > 0 ? setOnline(true) : setOnline(false);
        // }

        // const updatedFields = prizingDetail?.normalForm?.dineinfields?.map(
        //   (item: any) => ({
        //     DineInPrice: item?.DineInPrice,
        //     DineInMealType: item?.DineInMealType || [],
        //     DineInService: item?.DineInService,
        //     showDay: true,
        //     dayButtonText: "Choose Day",
        //   })
        // );
        // Initialize selected values
        // const initialSelectedValues = updatedFields?.map(
        //   (item: any) => item.DineInMealType
        // );
        // const initialSelectedValues2 = updatedFields?.map(
        //   (item: any) => item.DineInService
        // );
        // const initialSelectedValues2 = updatedField?.DineInService
        // setSelectedValues(initialSelectedValues2);
        // setDineIn(true);

        // setShowDineIn(true);

        const updatedField = {
          DineInPrice: dineIndetails?.price,
          DineInMealType:
            dineIndetails?.availabilities &&
            dineIndetails?.availabilities[0]?.sessions,
          showDay:
            prizingDetail.normalForm.DineIn[0]?.length > 0 ? true : false,
          dayButtonText: "Choose Day",
        };

        setDineInFields([updatedField]);
        if (updatedField.DineInPrice > 0) {
          setShowDineIn(true);
          setdineInEnable(true);
        }
        // else{
        //   setShowDineIn(false);
        //   setdineInEnable(false);
        // }

        setFormattedDineInData((prevData: DeliveryDetails) => {
          const updatedAvailabilities = [...prevData.availabilities];

          updatedAvailabilities[0] = {
            ...updatedAvailabilities[0],
            sessions: updatedField.DineInMealType,
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
          // setPickup(true)
          // setOnline(true)
          pickupDetails.price > 0 && setPickup(true);
          setOnline(true);
          setPickup(true);
          setpickupEnable(true);

          setPickUpDetails({
            typeId: pickUpId,
            typeGroup: "P",
            price: pickupDetails?.price || 0,
            typeName: pickupDetails?.typeName || "",
            availabilities: pickupDetails?.availabilities || [],
            ...(editData?.length  && {inActiveUntil: prizingDetail?.normalForm?.pickupDetails?.inActiveUntil?.split('.')[0] || null})
          });
        }

        if (deliveryDetails) {
          setOnline(true);
          setDelivery(true);
          setdeliveryEnable(true);

          setDeliveryDetails({
            typeId: deliveryId,
            typeGroup: "S",
            price: deliveryDetails?.price || "",
            typeName: deliveryDetails?.typeName || "",
            availabilities: deliveryDetails?.availabilities || [],
            ...(editData?.length && {inActiveUntil: prizingDetail?.normalForm?.deliveryDetails?.inActiveUntil?.split('.')[0] || null})
          });
        }

        if (thirdpartyDetails?.length > 0) {
          setOnline(true);
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

        const initialSelectedValues = [updatedField.DineInMealType];
        setSelectedValuesMealType(initialSelectedValues);

        setDineInDates1(prizingDetail.normalForm.DineIn || []);

        const pickupEnableOrnotWhneEdit = editData[0]?.orderTypes?.filter(
          (item: any) => item.typeGroup === "P"
        );
        const DeliveryEnableOrnotWhneEdit = editData[0]?.orderTypes?.filter(
          (item: any) => item.typeGroup === "S"
        );
        const DineInEnableOrnotWhneEdit = editData[0]?.orderTypes?.filter(
          (item: any) => item.typeGroup === "D"
        );

        if (
          editData?.length > 0 &&
          DineInEnableOrnotWhneEdit &&
          DineInEnableOrnotWhneEdit[0].isEnabled === 0
        ) {
          setShowDineIn(false);
          setdineInEnable(false);
        }

        if (
          editData?.length > 0 &&
          !pickupDetails &&
          pickupEnableOrnotWhneEdit &&
          pickupEnableOrnotWhneEdit[0].isEnabled === 0
        ) {
          setOnline(true);
          setPickup(false);
          setpickupEnable(false);
        }

        if (
          editData?.length > 0 &&
          !deliveryDetails &&
          DeliveryEnableOrnotWhneEdit &&
          DeliveryEnableOrnotWhneEdit[0].isEnabled === 0
        ) {
          setOnline(true);
          setDelivery(false);
          setdeliveryEnable(false);
        }

        // setValue("kitchenstation",prizingDetail?.kitchenstation)
      }

      if (prizingDetail?.normalForm && !prizingDetail?.normalForm?.formNormal) {
        const deliveryDetails = prizingDetail?.normalForm?.deliveryDetails;
        const pickupDetails = prizingDetail?.normalForm?.pickupDetails;
        const thirdpartyDetails = prizingDetail?.normalForm?.thirdpartyDetails;
        const dineInDetails = prizingDetail?.normalForm?.dineinfields;
        const dineIndetail = prizingDetail?.normalForm?.dineInDetails;
        // setValue("kitchenstation",prizingDetail?.kitchenstation)

        const filterOrderTypeAvailableorNotDineIn = seletedOrdertypes?.filter(
          (data: any, index: number) => data.typeId === dineIndetail?.typeId
        );
        const filterOrderTypeAvailableorNotPickup = seletedOrdertypes?.filter(
          (data: any, index: number) => data.typeId === pickupDetails?.typeId
        );
        const filterOrderTypeAvailableorNotDelivery = seletedOrdertypes?.filter(
          (data: any, index: number) => data.typeId === deliveryDetails?.typeId
        );

        setShowDayPickup(
          prizingDetail.normalForm?.Pickup?.length > 0 ? true : false
        );
        setShowDayDelivery(
          prizingDetail.normalForm?.Delivery?.length > 0 ? true : false
        );

        if (dineIndetail) {
          setShowDineIn(true);
          if (
            editData?.length > 0 &&
            filterOrderTypeAvailableorNotDineIn &&
            filterOrderTypeAvailableorNotDineIn[0]?.isEnabled === 0
          ) {
            setShowDineIn(false);
            setdineInEnable(false);
          }
        }

        if (pickupDetails) {
          pickupDetails.price > 0 && setPickup(true);
          // setPickup(true);
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
            ...(editData?.length  && {inActiveUntil: prizingDetail?.normalForm?.pickupDetails?.inActiveUntil?.split('.')[0] || null})
          });
        }

        if (deliveryDetails) {
          (deliveryDetails?.price > 0 && setDelivery(true)) ||
            (thirdpartyDetails &&
              thirdpartyDetails[0]?.price > 0 &&
              setDelivery(true));
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
            ...(editData?.length && {inActiveUntil: prizingDetail?.normalForm?.deliveryDetails?.inActiveUntil?.split('.')[0] || null})
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
      const inputValue = e.target.value;

      if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
        const newEntries = [...dineinfields];

        newEntries[index] = {
          ...newEntries[index],
          [e.target.name as keyof DineInField]: inputValue,
        };
        setDineInFields(newEntries);

        const newPrice = parseFloat(inputValue) || 0;
        setFormattedDineInData((prevData: any) => ({
          ...prevData,
          price: newPrice,
        }));

        validateDineInPrice(index, newPrice);
      }
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
          ...(editData?.length && {inActiveUntil: prizingDetail?.normalForm?.thirdpartyDetails?.inActiveUntil?.split('.')[0] || null})
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

    const validatedineMealType = () => {
      const validationErrors: Record<string, string> = { ...errors };

      dineinfields?.forEach((field: any, index: number) => {
        if (showDineIn) {
          if (
            (showDineIn && !field?.DineInMealType) ||
            field?.DineInMealType?.length === 0
          ) {
            validationErrors[`DineInMealType-${index}`] = "Meal type is empty";
          } else {
            delete validationErrors[`DineInMealType-${index}`];
          }
        }
      });

      setErrors(validationErrors);

      return Object.keys(validationErrors).length === 0;
    };

    const validatepickup = (
      togglestatus: boolean,
      selectedValluesArray: any
    ) => {
      const validationErrors: Record<string, string> = { ...errors };

      if (togglestatus) {
        if (togglestatus && selectedValluesArray?.length === 0) {
          validationErrors.pickupmealTypeSessions = "Meal type is empty";
        } else {
          delete validationErrors.pickupmealTypeSessions;
        }
      }

      setErrors(validationErrors);

      return Object.keys(validationErrors).length === 0;
    };
    const validatedelivery = (
      togglestatus: boolean,
      selectedValluesArray: any
    ) => {
      const validationErrors: Record<string, string> = { ...errors };

      if (togglestatus) {
        if (togglestatus && selectedValluesArray?.length === 0) {
          validationErrors.deliverymealTypeSessions = "Meal type is empty";
        } else {
          delete validationErrors.deliverymealTypeSessions;
        }
      }

      setErrors(validationErrors);

      return Object.keys(validationErrors).length === 0;
    };

    const validateDineInPrice = (index: number, price: number): void => {
      const validationErrors = { ...errors };
      if (!price || price <= 0) {
        validationErrors[`DineInPrice-${index}`] = "Price is empty";
      } else {
        delete validationErrors[`DineInPrice-${index}`];
      }
      setErrors(validationErrors);
    };

    //   useEffect(()=>{

    //  if(!online)
    //  {
    //   setPickup(false);
    //   setDelivery(false);
    //  }

    //   },[online])

    const validateDineinFields = () => {
      const validationErrors: Record<string, string> = {};
      // const Kitchenstationdata = getValues("kitchenstation") || prizingDetail?.kitchenstation;

      // console.log({Kitchenstationdata})

      // if (Kitchenstationdata === "" || Kitchenstationdata === undefined) {
      //   validationErrors[`kitchenstation`] = "kitchen station is required";
      // }

      if (Normaldays.length === 0) {
        validationErrors["daysCheck"] = "Please select at least one day.";
      }
      if (Normaldays && Normaldays.length > 0) {
        delete validationErrors["daysCheck"];
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

      if (delivery) {
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
      Normaldays,
    ]);
    const validatePickupPrice = (price: number): void => {
      const validationErrors = { ...errors };
      if (pickup) {
        if (!price || price <= 0) {
          validationErrors.pickupprice = "Price is empty";
        } else {
          delete validationErrors.pickupprice;
        }
      }

      setErrors(validationErrors);
    };
    const validateDeliveryPrice = (price: number): void => {
      const validationErrors = { ...errors };
      if (delivery) {
        if (!price || price <= 0) {
          validationErrors.deliveryprice = "Price is empty";
        } else {
          delete validationErrors.deliveryprice;
        }
      }

      setErrors(validationErrors);
    };

    return (
      <div>
        <div className="AvailDaycheck">
          <div className="AvailDaycheck-Heading">
            <h1 className="AvailableDaysHeadingNormal">Available days</h1>
            {/* <button onClick={handleSubmit}>Validate</button> */}
            {/* <div className="tooltip">
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
            </div> */}
          </div>

          <div className="dayschecking">
            <DaysCheck
              checkedItems={Normaldays}
              setCheckedItems={setNormalDays}
              id={availabilityid}
              setId={setAvailabilityid}
            />
            {Normaldays && Normaldays.length === 0 && (
              <span className="daycheckvalidation">
                {errors[`daysCheck`] || ""}
              </span>
            )}
            <p className={errors[`daysCheck`] ? "Note" : "Note-error"}>
              Note : Changes here will apply to all service types unless
              specific day options are enabled
            </p>
          </div>
        </div>
        {/* <h1 className="AvailableServiceHeading">Avaliable Service Streams</h1> */}
        {/* DineIn Related */}

        {DineInServiceEnabled && (
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
        )}

        {DineInServiceEnabled && showDineIn ? (
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
                            validatedineMealType={validatedineMealType}
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
                        {entry?.showDay
                          ? "Back to default days?"
                          : "Setup for specific days?"}
                      </h3>
                      <h3
                        className="dineInChooseDayContainer-chooseheading"
                        onClick={() => addDay(index)}
                      >
                        {entry?.showDay ? "Default Day" : "Choose Day"}
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
        {(pickUpIdServiceEnabled || DeliveryServiceEnabled) && (
          <div className="OnlineRelatedNormal">
            <h1 className="OnlineRelatedHeadingNormal">Online</h1>
            <div className="toggleIII">
              <Toggle toggle={online} setToggle={setOnline} />
            </div>
          </div>
        )}

        <div className="OnlineSectionNormal">
          {online ? (
            <div className="onlineselected">
              {/* PickupRelated */}

              {pickUpIdServiceEnabled && (
                <>
                  {" "}
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
                              step="any"
                              className="PriceInput1Normal-input"
                              value={pickupDetails.price || ""}
                              onKeyDown={(e) => {
                                if (["-", "+", "e", "E"].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              onInput={(e) => {
                                const inputElement =
                                  e.target as HTMLInputElement;
                                const value = inputElement.value;

                                if (value === "") {
                                  inputElement.value = "";
                                  return;
                                }

                                if (!/^\d*\.?\d{0,2}$/.test(value)) {
                                  inputElement.value = value.slice(0, -1);
                                }

                                if (/^0\d/.test(value)) {
                                  inputElement.value = value.slice(1);
                                }
                              }}
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                if (inputValue === "") {
                                  setPickUpDetails({
                                    ...pickupDetails,
                                    price: 0,
                                  });
                                  return;
                                }

                                if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
                                  const numericValue = parseFloat(inputValue);

                                  setPickUpDetails({
                                    ...pickupDetails,
                                    price: numericValue,
                                  });

                                  validatePickupPrice(numericValue);
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
                                  availabilities:
                                    prevDetails.availabilities.map(
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
                              toggleOnorOff={pickup}
                              validatepickupdelivery={validatepickup}
                              label="Meal Type*"
                              width="Drop1"
                              // onBlur={() => validatepickupdelivery()}
                            />
                            <span className="Errormsg pickuperrormsgmealType">
                              {errors.pickupmealTypeSessions}
                            </span>
                          </div>
                        </div>
                        <div className="PickupChooseDayContainer">
                          {showDayPickup ? (
                            <h3 className="pickupChooseDayContainerHeading">
                              Back to default days?
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
                              Default day
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
                                ? {
                                    id: availabilityid,
                                    setId: setAvailabilityid,
                                  }
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
                </>
              )}

              {DeliveryServiceEnabled && (
                <>
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
                              className="DeliveryInput1Normal"
                              value={deliveryDetails?.price || ""}
                              onInput={(e) => {
                                const inputElement =
                                  e.target as HTMLInputElement;
                                const value = inputElement.value;

                               
                                if (value === "") {
                                  inputElement.value = "";
                                  return;
                                }

                                if (!/^\d*\.?\d{0,2}$/.test(value)) {
                                  inputElement.value = value.slice(0, -1);
                                }

                                if (/^0\d/.test(value)) {
                                  inputElement.value = value.slice(1);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (["-", "+", "e", "E"].includes(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                if (inputValue === "") {
                                  setDeliveryDetails((prevDetails: any) => ({
                                    ...prevDetails,
                                    price: "",
                                  }));
                                  return;
                                }

                                if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
                                  const numericValue = parseFloat(inputValue);

                                  if (
                                    !isNaN(numericValue) &&
                                    numericValue !== 0
                                  ) {
                                    setDeliveryDetails((prevDetails: any) => ({
                                      ...prevDetails,
                                      price: numericValue,
                                    }));
                                    validateDeliveryPrice(numericValue);
                                  }
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
                              toggleOnorOff={delivery}
                              validatepickupdelivery={validatedelivery}
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
                              Back to default days?
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
                              Default day
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
                                ? {
                                    id: availabilityid,
                                    setId: setAvailabilityid,
                                  }
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
                              validateDropdown(
                                selectedthirdvalues,
                                "SwiggyZomato"
                              )
                            }
                            validation={validationState.PickupSwiggy}
                            width="Drop1"
                            placeHolder="Third Party"
                          />
                        </div>

                        
                        {selectedthirdvalues?.map((option, index) => {
                          return (
                            <div
                              key={option}
                              className="LabelSwiggyInputDropDown"
                            >
                              <div className="LabelSwiggyInput">
                                
                                <p className="Thrid-party-price">
                                  {" "}
                                  {option} Price
                                </p>
                                <input
  className="swiggyZomato-input"
  type="number"
  value={priceInfo[index]?.price || ""}
  onKeyDown={(e) => {
   
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  }}
  onChange={(e) => {
    const inputValue = e.target.value;

   
    if (inputValue === "") {
      const updatedData = [...priceInfo].map(
        (item, idx) =>
          idx === index
            ? {
                ...item,
                price: Number(inputValue),
              }
            : item
      );

      setPriceInfo(updatedData);
    }

    
    if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
      const updatedData = [...priceInfo].map((item, idx) =>
        idx === index
          ? {
              ...item,
              price: parseFloat(inputValue), 
            }
          : item
      );
      setPriceInfo(updatedData);
    }
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
                                    handleMealTypeChange(
                                      option,
                                      selected,
                                      index
                                    )
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
                </>
              )}
              {/* DeliveryRelated    */}
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
