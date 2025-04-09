import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useContext,
  useRef,
} from "react";
import DatePicker from "react-datepicker";
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
import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form";
import { showErrorToast } from "../../../util/toastUtils";
import { de } from "date-fns/locale";
import calender from "../../../assets/svg/calendarsvg.svg";
import { truncate } from "fs";

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
  price: any;
  typeGroup: string;
  availabilities: Availability[];
  inActiveUntil?: any;
  Enabled: boolean;
  availabilityEnabled?: boolean | undefined;
  isEnabled?: number;
  isNotHide?: number;
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
  isOptionTrue?: boolean;
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
  setKitchenError: any;
  setIsOptionTrue: any;
  mealType?: any;
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
  Enabled: boolean;
  typeGroup: string;
  availabilities: Availability[];
  inActiveUntil?: any;
  availabilityEnabled?: boolean | undefined;
  isEnabled?: number;
  isNotHide?: number;
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
      setKitchenError,
      isOptionTrue,
      setIsOptionTrue,
      mealType,
    } = props;

    const [online, setOnline] = useState(false);
    const [pickup, setPickup] = useState(false);
    const [delivery, setDelivery] = useState(false);
    const [showDineIn, setShowDineIn] = useState(true);
    const { setValiadtePriceFields, setStoredFunction } =
      useContext(Contextpagejs);

    const [dineinentry, setDineInEntry] = useState<string[]>([]);
    const [pickUpEntry, setPickUpEntry] = useState<string[]>([]);
    const [deliveryEntry, setDeliveryEntry] = useState<string[]>([]);
    const [Normaldays, setNormalDays] = useState<number[]>([]);
    const [availableDaysnew, setAvailableDaysnew] = useState<number[]>([]);
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

    const availabilityDay =
      mealType.length > 0
        ? mealType[0].availabilities?.map((data: any) => {
            return data.weekDay;
          })
        : [];

    const [selectedMealType, setSelectedMealType] = useState<string[]>([]);
    const [selectedValuesmealtype, setSelectedValuesMealType] =
      React.useState<SelectedValuesMealTypeState>([]);
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

    const prizingDetail = useSelector((state: any) => state.PricingDetailReducer.prizingData);

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
    // const [Text, setText] = useState(
    //   dineinfields?.map(() => "Set up for Specific Day")
    // );
    const dataFromRedux = useSelector(
      (state: any) => state?.selectedMockDataReducer?.data
    );

    const orderTypess = locationid?.orderTypes;

    const orderTypes = locationid?.orderTypes;
    const datePickerRef = useRef<any | null>(null);
    const datePickerRef1 = useRef<any | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedDate1, setSelectedDate1] = useState<Date | null>(null);

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
      Enabled: true,
      availabilityEnabled: true,
      isEnabled: 1,
      isNotHide: 1,

      typeGroup: "P",
      availabilities: [
        {
          availabilityDays: [],
          sessions: [],
        },
      ],
      price: 0,
      ...(editData?.length && {
        inActiveUntil:
          prizingDetail?.normalForm?.pickupDetails?.inActiveUntil?.split(
            "."
          )[0] || null,
      }),
    });

    const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
      typeId: deliveryId,
      price: 0,
      Enabled: true,
      typeName: "Delivery",
      typeGroup: "S",
      availabilityEnabled: true,
      isEnabled: 1,
      isNotHide: 1,
      availabilities: [
        {
          availabilityDays: [],
          sessions: [],
        },
      ],
      ...(editData?.length && {
        inActiveUntil:
          prizingDetail?.normalForm?.deliveryDetails?.inActiveUntil?.split(
            "."
          )[0] || null,
      }),
    });

    const [formattedDineInData, setFormattedDineInData] =
      useState<DeliveryDetails>({
        typeId: DineInId,
        typeName: "DineIn",
        Enabled: true,
        availabilityEnabled: true,
        isEnabled: 1,
        isNotHide: 1,
        price: 0,
        typeGroup: "D",
        availabilities: [
          {
            availabilityDays: [],
            sessions: [],
          },
        ],
        ...(editData?.length && {
          inActiveUntil:
            prizingDetail?.normalForm?.dineInDetails?.inActiveUntil?.split(
              "."
            )[0] || null,
        }),
      });

    // const optionsselectthird = orderTypes
    //   ?.filter(
    //     (item: any) =>
    //       item.typeGroup === "T" &&
    //       (item.isEnabled === true || item.isEnabled === 1)
    //   )
    //   .map((item: any) => item.typeName);

    // const optionsselectthird = ["GloriaFood", "GrubHub"]

    const [priceInfo, setPriceInfo] = useState<PriceInfo[]>([
      {
        typeId: "",
        price: dineinfields[0]?.DineInPrice || 0,
        typeName: "",
        Enabled: true,
        typeGroup: "T",
        availabilityEnabled: true,
        isEnabled: 1,
        isNotHide: 1,
        availabilities: [
          {
            availabilityDays: [],
            sessions: dineinfields[0]?.DineInMealType || [],
          },
        ],
        ...(editData?.length && {
          inActiveUntil:
            prizingDetail?.normalForm?.thirdpartyDetails?.inActiveUntil?.split(
              "."
            )[0] || null,
        }),
      },
    ]);

    const [dineInEnable, setdineInEnable] = useState<boolean>(true);
    const [pickupEnable, setpickupEnable] = useState<boolean>(true);
    const [deliveryEnable, setdeliveryEnable] = useState<boolean>(true);

    const seletedOrdertypes = dataFromRedux[0]?.orderTypes;

    useEffect(() => {
      if (!showDineIn) {
        setDineInFields((prevDineInFields: DineInField[]) =>
          Array.isArray(prevDineInFields)
            ? prevDineInFields.map((prev) => ({
                ...prev,
                DineInPrice: "",
                Enabled: true,
              }))
            : []
        );
        setSelectedValuesMealType([]);
      }
      if (!pickup) {
        setPickUpDetails({
          typeId: pickUpId,
          typeName: "PickUp",
          typeGroup: "P",
          availabilityEnabled: true,
          isEnabled: 1,
          isNotHide: 1,
          Enabled: true,
          availabilities: [
            {
              availabilityDays: [],
              sessions: [],
            },
          ],
          price: 0,
          ...(editData?.length && {
            inActiveUntil:
              prizingDetail?.normalForm?.pickupDetails?.inActiveUntil?.split(
                "."
              )[0] || null,
          }),
        });
        setDayPickup([]);
        setShowDayPickup(false);
      }

      if (!delivery) {
        setDeliveryDetails({
          typeId: deliveryId,
          price: 0,
          Enabled: true,
          typeName: "Delivery",
          availabilityEnabled: true,
          isEnabled: 1,
          isNotHide: 1,
          typeGroup: "S",
          availabilities: [
            {
              availabilityDays: [],
              sessions: [],
            },
          ],
          ...(editData?.length && {
            inActiveUntil:
              prizingDetail?.normalForm?.deliveryDetails?.inActiveUntil?.split(
                "."
              )[0] || null,
          }),
        });
        setMealTypes({});
        setSelectedThirdValues([]);
        let thirdPartyData: any = [];
        optionsselectthird.forEach((name: any) => {
          const data = {
            typeId: "",
            price: 0,
            typeName: name,
            Enabled: true,
            availabilityEnabled: true,
            isEnabled: 1,
            isNotHide: 1,
            typeGroup: "T",
            availabilities: [
              {
                availabilityDays: [],
                sessions: [],
              },
            ],
            ...(editData?.length && {
              inActiveUntil:
                prizingDetail?.normalForm?.thirdpartyDetails?.inActiveUntil?.split(
                  "."
                )[0] || null,
            }),
          };
          thirdPartyData.push(data);
        });
        setPriceInfo([...thirdPartyData]);
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
    const checkErrors = () => {
      const errorArray: { price: string; mealType: string }[] = [];

      priceInfo.forEach((item) => {
        const errorObject: { price: string; mealType: string } = {
          price: "",
          mealType: "",
        };

        // Check if the price is empty
        if (item.price === 0) {
          errorObject.price = "Price is empty";
        } else {
          errorObject.price = "";
        }

        // Check if sessions are empty
        if (item?.availabilities) {
          if (
            item.availabilities?.some(
              (availability) => availability.sessions.length === 0
            )
          ) {
            errorObject.mealType = "Sessions are empty";
          } else {
            errorObject.mealType = "";
          }
        } else {
          errorObject.mealType = "Sessions are empty";
        }

        // Only add the errorObject if there are any errors
        if (errorObject.price || errorObject.mealType) {
          errorArray.push(errorObject);
        }
      });
      return errorArray;
    };

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

    const [isSeasonalFood, setIsSeasonalFood] = useState(false);
    const formattedDate = selectedDate
      ? new Date(selectedDate).toLocaleDateString("en-GB").split("/").join("-")
      : "";
    const formattedDate1 = selectedDate1
      ? new Date(selectedDate1).toLocaleDateString("en-GB").split("/").join("-")
      : "";

    const mainForm = {
      availabilityid: availabilityid,
      formNormal,
      dineinfields,
      Normaldays: Normaldays,
      MealTypes: selectedMealType,
      AvaiabilityFromDate: selectedDate,
      AvaiabilityToDate: selectedDate1,
      availableDaysnew: availableDaysnew,
      DeliveryMealType: selectedValues3,
      PicupMealType: selectedValues2,
      Pickup: DayPickup,
      isOptionTrue: isOptionTrue,
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

      isSeasonalItem: isSeasonalFood,
      startDate: formattedDate,
      endDate: formattedDate1,
      availabilities: [
        {
          weekDays: isOptionTrue ? ['All'] : availableDaysnew,
          sessions: selectedMealType,
        },
      ],

      // ...(selectedthirdvalues?.length > 0 && {
      //   thirdpartyDetails: priceInfo
      // })
      ...(selectedthirdvalues?.length > 0 && { thirdpartyDetails: priceInfo }),
    };

    // const date = new Date(isoDate);
    // const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    // console.log(formattedDate);

    const optionsselectthird = orderTypes
      ?.filter(
        (item: any) =>
          item.typeGroup === "T" &&
          (item.isEnabled === true || item.isEnabled === 1)
      )
      .map((item: any) => item.typeName);
    //  const MealType = useSelector(
    //     (state: any) => state.productCatalog.cuisineData.data
    //   );

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
        // const MealTypes = prizingDetail?.normalForm?.MealTypes;
        if (prizingDetail?.normalForm?.availabilities?.length > 0) {
          setSelectedMealType([
            ...prizingDetail?.normalForm?.availabilities[0]?.sessions,
          ]);
          setAvailableDaysnew([
            ...prizingDetail?.normalForm?.availabilities[0]?.weekDays,
          ]);
        }

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
        // setAvailableDaysnew(prizingDetail.normalForm.availableDaysnew || []);
        prizingDetail?.normalForm?.isSeasonalItem && setSelectedDate(prizingDetail?.normalForm?.AvaiabilityFromDate || null);
        prizingDetail?.normalForm?.isSeasonalItem && setSelectedDate1(prizingDetail?.normalForm?.AvaiabilityToDate || null);

        if (
          (prizingDetail.normalForm.AvaiabilityFromDate &&
          prizingDetail.normalForm.AvaiabilityToDate) && (prizingDetail?.normalForm?.isSeasonalItem || prizingDetail?.isSeasonalItem)

        ) {
          setIsSeasonalFood(true);
        }

        setDayPickup(prizingDetail.normalForm?.Pickup || []);
        setDayDelivery(prizingDetail.normalForm?.Delivery || []);

        setDayThird(prizingDetail?.normalForm?.thirdParty || []);
        dineIndetails?.availabilities?.forEach((availability: any) => {
          availability.availabilityDays =
            prizingDetail?.normalForm?.Normaldays || [];
        });
        setIsOptionTrue(prizingDetail?.normalForm?.isOptionTrue);

        setShowDayPickup(
          prizingDetail.normalForm?.Pickup?.length > 0 ? true : false
        );
        setShowDayDelivery(
          prizingDetail.normalForm?.Delivery?.length > 0 ? true : false
        );
        setShowDayThird(
          prizingDetail?.normalForm?.thirdParty?.length > 0 ? true : false
        );

        const updatedField = {
          DineInPrice:
            dineIndetails?.price !== 0 &&
            Number(dineIndetails?.price).toFixed(2),
          // Enabled:dineIndetails  ? dineIndetails.Enabled:
          // dineIndetailsField && dineIndetailsField[0]?.Enabled && dineIndetailsField[0]?.Enabled === true
          //     ? true
          //     : false,
          Enabled: true,
          availabilityEnabled: dineIndetail?.availabilityEnabled,
          isEnabled: dineIndetail?.isEnabled,
          isNotHide: dineIndetail?.isNotHide,
          typeGroup: dineIndetail?.typeGroup,
          typeId: dineIndetail?.typeId,
          typeName: dineIndetail?.typeName,
          DineInMealType:
            dineIndetails?.availabilities &&
            dineIndetails?.availabilities[0]?.sessions,
          showDay:
            prizingDetail.normalForm.DineIn[0]?.length > 0 ? true : false,
          dayButtonText: "Choose Day",
        };

        setDineInFields([updatedField]);
        if (Number(updatedField.DineInPrice) > 0) {
          setShowDineIn(true);
          setdineInEnable(true);
        }
        // else{
        //   setShowDineIn(false);
        //   setdineInEnable(false);
        // }

        setFormattedDineInData((prevData: any) => {
          const updatedAvailabilities = [...prevData.availabilities];

          updatedAvailabilities[0] = {
            ...updatedAvailabilities[0],
            sessions: updatedField.DineInMealType,
          };

          return {
            ...prevData,
            price: updatedField?.DineInPrice,
            availabilityEnabled: updatedField?.availabilityEnabled,
            isEnabled: updatedField?.isEnabled,
            isNotHide: updatedField?.isNotHide,
            // Enabled: updatedField?.Enabled,
            Enabled: true,
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
          pickupDetails.price > 0 && setOnline(true);
          setPickup(true);
          setpickupEnable(true);

          setPickUpDetails({
            typeId: pickUpId,
            typeGroup: "P",
            // Enabled: pickupDetails?.Enabled === true ? true : false,
            Enabled: true,
            availabilityEnabled: pickupDetails?.availabilityEnabled,
            isEnabled: pickupDetails?.isEnabled,
            isNotHide: pickupDetails?.isNotHide,
            price:
              (pickupDetails?.price !== 0 &&
                Number(pickupDetails?.price).toFixed(2)) ||
              0,
            typeName: pickupDetails?.typeName || "",
            availabilities: pickupDetails?.availabilities || [],
            ...(editData?.length && {
              inActiveUntil:
                prizingDetail?.normalForm?.pickupDetails?.inActiveUntil?.split(
                  "."
                )[0] || null,
            }),
          });
        }

        if (deliveryDetails) {
          deliveryDetails.price > 0 && setOnline(true);
          setDelivery(true);
          setdeliveryEnable(true);

          setDeliveryDetails({
            typeId: deliveryId,
            typeGroup: "S",
            Enabled: true,
            availabilityEnabled: deliveryDetails?.availabilityEnabled,
            isEnabled: deliveryDetails?.isEnabled,
            isNotHide: deliveryDetails?.isNotHide,
            // Enabled: deliveryDetails?.Enabled,
            price:
              (deliveryDetails?.price !== 0 &&
                Number(deliveryDetails?.price).toFixed(2)) ||
              0,
            typeName: deliveryDetails?.typeName || "",
            availabilities: deliveryDetails?.availabilities || [],
            ...(editData?.length && {
              inActiveUntil:
                prizingDetail?.normalForm?.deliveryDetails?.inActiveUntil?.split(
                  "."
                )[0] || null,
            }),
          });
        }

        if (thirdpartyDetails?.length > 0) {
          setOnline(true);
          const data = thirdpartyDetails?.map((item: any) => item?.typeName);
          if (thirdpartyDetails.some((item: any) => item?.price)) {
            setSelectedThirdValues(data);
          }
          const updatedDetails = thirdpartyDetails.map((detail: any) => ({
            ...detail,
            price: detail.price !== 0 && Number(detail.price).toFixed(2),
            availabilityEnabled: detail?.availabilityEnabled,
            isEnabled: detail?.isEnabled,
            isNotHide: detail?.isNotHide,
          }));

          setPriceInfo(updatedDetails);
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

        // if (
        //   editData?.length > 0 &&
        //   DineInEnableOrnotWhneEdit &&
        //   DineInEnableOrnotWhneEdit[0].isEnabled === 0
        // ) {
        //   setShowDineIn(false);
        //   setdineInEnable(false);
        // }

        // if (
        //   editData?.length > 0 &&
        //   !pickupDetails &&
        //   pickupEnableOrnotWhneEdit &&
        //   pickupEnableOrnotWhneEdit[0].isEnabled === 0
        // ) {
        //   setOnline(true);
        //   setPickup(false);
        //   setpickupEnable(false);
        // }

        // if (
        //   editData?.length > 0 &&
        //   !deliveryDetails &&
        //   DeliveryEnableOrnotWhneEdit &&
        //   DeliveryEnableOrnotWhneEdit[0].isEnabled === 0
        // ) {
        //   setOnline(true);
        //   setDelivery(false);
        //   setdeliveryEnable(false);
        // }

        // setValue("kitchenstation",prizingDetail?.kitchenstation)
      }
      if (prizingDetail?.normalForm && !prizingDetail?.normalForm?.formNormal) {
        const deliveryDetails = prizingDetail?.normalForm?.deliveryDetails;
        const pickupDetails = prizingDetail?.normalForm?.pickupDetails;
        const thirdpartyDetails = prizingDetail?.normalForm?.thirdpartyDetails;
        setIsOptionTrue(prizingDetail?.isStandardAvailability);

        if (prizingDetail?.availabilities?.length > 0) {
          const allSessions: string[] = prizingDetail?.availabilities &&  prizingDetail?.availabilities?.flatMap(
            (item: any) => item?.sessions as string[]
          );
        
          const allWeekDays: string[] = prizingDetail?.availabilities &&  prizingDetail?.availabilities?.flatMap(
            (item: any) => item?.weekDays as string[]
          );
        
          const uniqueSessions: string[] = [...new Set(allSessions)];
          const uniqueWeekDays: any[] = [...new Set(allWeekDays)];
          setSelectedMealType(uniqueSessions);
          setAvailableDaysnew(uniqueWeekDays);
        }
        
        if (
          prizingDetail?.startDate &&
          prizingDetail?.endDate
        ) {
          setIsSeasonalFood(true);
        }

        if(prizingDetail?.endDate && prizingDetail?.startDate){
          const dateStr1 = prizingDetail?.startDate 
          const [year1,month1,day1] = dateStr1?.split('-');
          const parsedDate1 = new Date(`${year1}-${month1}-${day1}`);

          const dateStr = prizingDetail?.endDate 
          const [year,month,day] = dateStr?.split('-');
          const parsedDate = new Date(`${year}-${month}-${day}`);
          
          prizingDetail?.isSeasonalItem && setSelectedDate(parsedDate1 || null);
          prizingDetail?.isSeasonalItem && setSelectedDate1(parsedDate || null);
        }

        const dineInDetails = prizingDetail?.normalForm?.dineinfields;
        const dineIndetail = prizingDetail?.normalForm?.dineInDetails;
        setShowDayPickup(
          prizingDetail.normalForm?.Pickup?.length > 0 ? true : false
        );
        setShowDayDelivery(
          prizingDetail.normalForm?.Delivery?.length > 0 ? true : false
        );

        if (dineIndetail) {
          if (editData?.length > 0) {
            dineIndetail.price > 0 ? setShowDineIn(true) : setShowDineIn(false);
          }
        }

        if (pickupDetails) {
          pickupDetails.price > 0 && setPickup(true);

          pickupDetails.price > 0 && setOnline(true);

          setPickUpDetails({
            typeId: pickUpId,
            typeGroup: "P",
            Enabled: true,
            // Enabled:
            //   (pickupDetails?.availabilityEnabled &&
            //   pickupDetails?.availabilityEnabled === true
            //     ? true
            //     : false) &&
            //   (pickupDetails?.isNotHide && pickupDetails?.isNotHide === 1
            //     ? true
            //     : false),
            price: Number(pickupDetails?.price).toFixed(2) || 0,
            typeName: pickupDetails?.typeName || "",
            availabilityEnabled: pickupDetails?.availabilityEnabled,
            isEnabled: pickupDetails?.isEnabled,
            isNotHide: pickupDetails?.isNotHide,

            availabilities: pickupDetails?.availabilities || [],
            ...(editData?.length && {
              inActiveUntil:
                prizingDetail?.normalForm?.pickupDetails?.inActiveUntil?.split(
                  "."
                )[0] || null,
            }),
          });
        }

        if (deliveryDetails) {
          (deliveryDetails?.price > 0 && setDelivery(true)) ||
            (thirdpartyDetails &&
              thirdpartyDetails[0]?.price > 0 &&
              setDelivery(true));

          (deliveryDetails?.price > 0 && setOnline(true)) ||
            (thirdpartyDetails &&
              thirdpartyDetails[0] &&
              thirdpartyDetails[0]?.price > 0 &&
              setOnline(true));
          // if (
          //   editData?.length > 0 &&
          //   filterOrderTypeAvailableorNotDelivery &&
          //   filterOrderTypeAvailableorNotDelivery[0]?.isEnabled === 0
          // ) {
          //   setDelivery(false);
          //   setdeliveryEnable(false);
          // }

          // thirdpartyDetails && thirdpartyDetails[0]?.price > 0 ? setOnline(true) : setOnline(false);
          // deliveryDetails?.price > 0 && setDelivery(true);
          setDeliveryDetails({
            typeId: deliveryId,
            typeGroup: "S",
            Enabled: true,
            // Enabled:
            //   (deliveryDetails?.availabilityEnabled &&
            //   deliveryDetails?.availabilityEnabled === true
            //     ? true
            //     : false) &&
            //   (deliveryDetails?.isNotHide && deliveryDetails?.isNotHide === 1
            //     ? true
            //     : false),

            price: Number(deliveryDetails?.price).toFixed(2) || 0,
            typeName: deliveryDetails?.typeName || "",
            availabilityEnabled: deliveryDetails?.availabilityEnabled,
            isEnabled: deliveryDetails?.isEnabled,
            isNotHide: deliveryDetails?.isNotHide,
            availabilities: deliveryDetails?.availabilities || [],
            ...(editData?.length && {
              inActiveUntil:
                prizingDetail?.normalForm?.deliveryDetails?.inActiveUntil?.split(
                  "."
                )[0] || null,
            }),
          });
        }

        if (thirdpartyDetails?.length > 0) {
          const data = thirdpartyDetails?.map((item: any) => item?.typeName);
          if (thirdpartyDetails.some((item: any) => item?.price)) {
            //need to change the logic here
            setSelectedThirdValues(data);
          }
          // setPriceInfo([...thirdpartyDetails]);

          const mappedPriceInfo = thirdpartyDetails.map((detail: any) => ({
            typeId: detail.typeId || "",
            price: Number(detail.price).toFixed(2) || 0,
            typeName: detail.typeName || "",
            Enabled: true,
            availabilityEnabled: detail?.availabilityEnabled,
            isEnabled: detail?.isEnabled,
            isNotHide: detail?.isNotHide,
            // Enabled:
            //   (detail?.availabilityEnabled &&
            //   detail?.availabilityEnabled === true
            //     ? true
            //     : false) &&
            //   (detail?.isNotHide && detail?.isNotHide === 1 ? true : false),
            typeGroup: detail.typeGroup || "T",
            availabilities: [
              {
                availabilityDays: [],
                sessions: [],
              },
            ],
            ...(editData?.length && {
              inActiveUntil:
                prizingDetail?.normalForm?.thirdpartyDetails?.inActiveUntil?.split(
                  "."
                )[0] || null,
            }),
          }));
          setPriceInfo(mappedPriceInfo);

          const object: any = {};
          const item = thirdpartyDetails?.map((item: any) => item);
          item?.forEach((element: any) => {
            object[element?.typeName] = element?.availabilities
              ? element?.availabilities[0]?.sessions
              : null;
          });
          setMealTypes(object);
          // setOnline(true);
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
          DineInPrice: Number(dineIndetail?.price).toFixed(2),
          Enabled: true,
          availabilityEnabled: dineIndetail?.availabilityEnabled,
          isEnabled: dineIndetail?.isEnabled,
          isNotHide: dineIndetail?.isNotHide,
          typeGroup: dineIndetail?.typeGroup,
          typeId: dineIndetail?.typeId,
          typeName: dineIndetail?.typeName,
          // Enabled:
          //   (dineIndetail?.availabilityEnabled &&
          //   dineIndetail?.availabilityEnabled === true
          //     ? true
          //     : false) &&
          //   (dineIndetail?.isNotHide && dineIndetail?.isNotHide === 1
          //     ? true
          //     : false),
          // DineInMealType:
          //   (dineIndetail &&
          //     dineIndetail?.availabilities &&
          //     dineIndetail?.availabilities?.length > 0 &&
          //     dineIndetail?.availabilities[0]?.sessions) ||
          //   [],
          // showDay:
          //   dineIndetail &&
          //   dineIndetail?.availabilities &&
          //   prizingDetail.normalForm.DineIn &&
          //   prizingDetail.normalForm.DineIn[0]?.length > 0
          //     ? true
          //     : false,
          // dayButtonText: "Choose Day",
        };

        setDineInFields([updatedField]);
        setFormattedDineInData((prevData: any) => {
          const updatedAvailabilities = [...prevData.availabilities];

          updatedAvailabilities[0] = {
            ...updatedAvailabilities[0],
            sessions: updatedFields && [...updatedFields[0]?.DineInMealType],
          };

          return {
            ...prevData,
            price: updatedField && updatedField?.DineInPrice,
            availabilityEnabled: updatedField?.availabilityEnabled,
            isEnabled: updatedField?.isEnabled,
            isNotHide: updatedField?.isNotHide,
            // Enabled: updatedField && updatedField?.Enabled,
            Enabled: true,
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
        // setAvailableDaysnew(prizingDetail?.normalForm?.availabilities || prizingDetail?.availabilities?. || []);
        setDineInDates1(prizingDetail.normalForm.DineIn || []);
        // setSelectedThirdValues(["Swiggy", "Zomato"]);
      }
    }, [prizingDetail, dataFromRedux[0]]);

    const handleChange = (
      index: number,
      e: React.ChangeEvent<HTMLInputElement>,
      Enable: boolean
    ): void => {
      const inputValue = e?.target?.value;

      e.preventDefault();
      if (/^\d{0,4}(\.\d{0,2})?$/.test(inputValue) && Enable) {
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

        validateDineInPrice(index, newPrice, Enable);
      }
    };

    // const addDay = (index: number, clickText: string): void => {
    //   const newText = [...Text];
    //   const tempArray = [...dineInDates1];
    //   const newDineInFields = [...dineinfields];

    //   if (Text[index] === "Set up for Specific Day") {
    //     newText[index] = "Set up for All Days";
    //     tempArray[index] = [];
    //     newDineInFields[index].showDay = false;
    //   } else {
    //     newText[index] = "Set up for Specific Day";
    //     newDineInFields[index].showDay = true;
    //   }

    //   setText(newText);
    //   setDineInDates1(tempArray);
    //   setDineInFields(newDineInFields);
    //   if (clickText === "Default Day") {
    //     const validationErrors = { ...errors };

    //     delete validationErrors[`DineInAvailableDays-${index}`];

    //     setErrors(validationErrors);
    //   }
    // };

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
        // console.log({updatedPriceInfo});

        setPriceInfo(updatedPriceInfo);
      }
    }, [DayThird]);

    useEffect(() => {
      setDeliveryDetails((prev) => ({
        ...prev,
        availabilities: [
          {
            ...prev.availabilities[0],
            availabilityDays: DayDelivery?.map((day) => day?.toString()),
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
            availabilityDays: DayPickup.map((day) => day?.toString()),
          },
        ],
      }));
    }, [DayPickup]);

    const validateThridPrice = (
      index: number,
      price: number,
      Enable: boolean
    ): void => {
      const validationErrors = { ...errors };
      if ((!price || price <= 0) && !Enable) {
        validationErrors[`ThirdPartyPrice-${index}`] = "Price is empty";
      } else {
        delete validationErrors[`ThirdPartyPrice-${index}`];
      }
      setErrors(validationErrors);
    };

    const [thirdPartiesSelected, setThirdPartiesSelected] = useState(false);

    const handleMealType = (value: string[]): void => {
      setSelectedMealType(value);
      // validateDropdown(value, "ThirdDeliverySwiggyZomato");
    };

    const handleSelectThird = (value: string[]): void => {
      setSelectedThirdValues(value);
      setThirdPartiesSelected(true);
      const defaultMealType = dineinfields[0]?.DineInMealType || [];

      setMealTypes((prev) => {
        const updatedMealTypes = { ...prev };

        value?.forEach((value) => {
          updatedMealTypes[value] = defaultMealType;
        });

        return updatedMealTypes;
      });
      validateDropdown(value, "ThirdDeliverySwiggyZomato");

      setPriceInfo(
        value.map((item, index) => ({
          typeId: "",
          price: dineinfields[0]?.DineInPrice || 0,
          typeName: "",
          availabilityEnabled: true,
          isEnabled: 1,
          isNotHide: 1,
          Enabled: true,
          typeGroup: "T",
          availabilities: [
            {
              availabilityDays: [],
              sessions: dineinfields[0]?.DineInMealType || [],
            },
          ],
          ...(editData?.length && {
            inActiveUntil:
              prizingDetail?.normalForm?.thirdpartyDetails?.inActiveUntil?.split(
                "."
              )[0] || null,
          }),
        }))
      );
    };

    // useEffect(() => {
    //   priceInfo.map((item, index) => {
    //     return validateThridPrice(index, item.price, item.Enabled);
    //   });
    // }, [priceInfo]);

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
          Enabled: false,
          ...(editData?.length && {
            inActiveUntil:
              prizingDetail?.normalForm?.thirdpartyDetails?.inActiveUntil?.split(
                "."
              )[0] || null,
          }),
        },
      ]);
      setSelectedValuesMealType([]);
      setSelectedThirdValues([]);
      setNormalDays([]);
      setAvailableDaysnew([]);
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
      setSelectedDate(null);
      setSelectedDate1(null);
      setSelectedMealType([]);
      setIsSeasonalFood(false)
      setIsOptionTrue(true)
      setDineInFields((prevDineInFields: any) =>
        prevDineInFields.map(() => ({
          DineInPrice: "",
          DineInMealType: [],
          DineInService: [],
          Enabled: true,
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
    const validateThirdPartyMealType = () => {
      const validationErrors: Record<string, string> = { ...errors };

      if (selectedthirdvalues.length > 0 && thirdPartiesSelected) {
        priceInfo.forEach((item, index) => {
          // Check if sessions are empty
          if (item?.availabilities) {
            if (
              item.availabilities?.some(
                (availability) => availability.sessions.length === 0
              ) &&
              item?.Enabled
            ) {
              validationErrors[`ThirdPartyMealType-${index}`] =
                "MealType is empty";
            } else {
              delete validationErrors[`ThirdPartyMealType-${index}`];
            }
          }
        });
      }

      setErrors(validationErrors);

      return Object.keys(validationErrors).length === 0;
    };

    const validatepickup = (
      togglestatus: boolean,
      selectedValluesArray: any
    ) => {
      const validationErrors: Record<string, string> = { ...errors };

      if (togglestatus) {
        if (
          togglestatus &&
          selectedValluesArray?.length === 0
        ) {
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
        if (
          togglestatus &&
          selectedValluesArray?.length === 0
        ) {
          validationErrors.deliverymealTypeSessions = "Meal type is empty";
        } else {
          delete validationErrors.deliverymealTypeSessions;
        }
      }

      setErrors(validationErrors);

      return Object.keys(validationErrors).length === 0;
    };

    const validateDineInPrice = (
      index: number,
      price: number,
      Enable: boolean
    ): void => {
      const validationErrors = { ...errors };
      if ((!price || price <= 0) && !Enable) {
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

    const ValiadteMealType = () => {
      const validationErrors = { ...errors };
      
      if (selectedMealType?.length === 0) { 
        validationErrors.MealType = "Meal type is empty";
      } else {
        delete validationErrors[`MealType`];
      }

      setErrors(validationErrors);
    };

    const fromDatevaliadtion = (date?: Date | null) => {
      const validationErrors = { ...errors };

      if (!isOptionTrue && isSeasonalFood && !date) {
        validationErrors.fromDate = "From date required11";
      }else{
        delete validationErrors[`fromDate`];
      }

      setErrors(validationErrors);
    };

    const toDatevaliadtion = (date?: Date | null) => {
      const validationErrors = { ...errors };

      if (!isOptionTrue && isSeasonalFood && !date) {
        validationErrors.toDate = "To date required22";
      }else{
        delete validationErrors[`toDate`];
      }

      setErrors(validationErrors);
    };

    const AvailableDatsvaliadtion = () => {
      const validationErrors = { ...errors };

      if (!isOptionTrue && availableDaysnew.length === 0) {
        validationErrors.Availabledays = "Available Days required";
      }else{
        delete validationErrors[`Availabledays`];
      }

      setErrors(validationErrors);
    };

    const validateDineinFields = () => {
      const validationErrors: Record<string, string> = {};

      // console.log({dineinfields});
      dineinfields?.forEach((field: any, index: number) => {
        if (field?.Enabled) {
          if (showDineIn) {
            if (
              (showDineIn && !field?.DineInPrice) ||
              Number(field?.DineInPrice) <= 0
            ) {
              validationErrors[`DineInPrice-${index}`] = "Price is empty";
            }

            // if (
            //   (showDineIn && !field?.DineInMealType) ||
            //   field?.DineInMealType?.length === 0
            // ) {
            //   validationErrors[`DineInMealType-${index}`] =
            //     "Meal type is empty";
            // }

            // if (field?.showDay && dineInDates1[0]?.length === 0) {

            //   validationErrors[`DineInAvailableDays-${index}`] =
            //     "Please enter available days for dinein";
            // } else {
            //   delete validationErrors[`DineInAvailableDays-${index}`];
            // }
          }
        }
      });
      // console.log({priceInfo});

      if (selectedthirdvalues.length > 0) {
        priceInfo.forEach((item, index) => {
          // Check if the price is empty
          if ((!item.price && item?.Enabled) || item?.price <= 0) {
            validationErrors[`ThirdPartyPrice-${index}`] = "Price is empty";
          }
          // Check if sessions are empty
          // if (item?.availabilities) {
          //   if (
          //     item.availabilities?.some(
          //       (availability) => availability.sessions.length === 0
          //     ) &&
          //     item?.Enabled
          //   ) {
          //     validationErrors[`ThirdPartyMealType-${index}`] =
          //       "Sessions are empty";
          //   } else {
          //     delete validationErrors[`ThirdPartyMealType-${index}`];
          //   }
          // } else {
          //   if (item?.Enabled) {
          //     validationErrors[`ThirdPartyMealType-${index}`] =
          //       "Sessions are empty";
          //   }
          // }
        });
      }

      // if (
      //   selectedthirdvalues.length > 0 &&
      //   showDayThird &&
      //   DayThird?.length === 0
      // ) {
      //   validationErrors[`ThirdPartyAvailableDays`] =
      //     "Please enter available days for ThirdParty";
      // } else {
      //   delete validationErrors[`ThirdPartyAvailableDays`];
      // }

      if (pickupDetails?.Enabled) {
        if (pickup) {
          if ((pickup && !pickupDetails?.price) || pickupDetails?.price <= 0) {
            validationErrors.pickupprice = "Price is empty";
          }
          const Pickupsessions =
            pickupDetails?.availabilities[0]?.sessions || [];
          // if (pickup && Pickupsessions?.length === 0) {
          //   validationErrors.pickupmealTypeSessions = "Meal type is empty";
          // }
        }
      }

      if (deliveryDetails?.Enabled) {
        if (delivery) {
          if (!deliveryDetails?.price || deliveryDetails?.price <= 0) {
            validationErrors.deliveryprice = "Price is empty";
          }

          const deliverysessions =
            deliveryDetails?.availabilities[0]?.sessions || [];
          // if (deliverysessions?.length === 0) {
          //   validationErrors.deliverymealTypeSessions = "Meal type is empty";
          // }
        }
      }

      // if (showDayDelivery && DayDelivery.length === 0) {
      //   validationErrors.deliveryAvailableDays =
      //     "Please enter available days for delivery";
      // }
      if (!showDineIn && !pickup && !delivery) {
        validationErrors.atleastOneOrderType =
          "Please select at least one order type.";
        showErrorToast("Please select at least one order type.");
      } 
      
      else {
        delete validationErrors.atleastOneOrderType;
      }

      if (!isOptionTrue && selectedMealType?.length === 0) {
        validationErrors.MealType = "Meal type is empty";
      }

      if (!isOptionTrue && isSeasonalFood && !selectedDate) {
        validationErrors.fromDate = "From date required";
      }

      if (!isOptionTrue && isSeasonalFood && !selectedDate1) {
        validationErrors.toDate = "To date required";
      }
      if (!isOptionTrue && availableDaysnew.length === 0) {
        validationErrors.Availabledays = "Available Days required";
      }

      fromDatevaliadtion();
      toDatevaliadtion();
      AvailableDatsvaliadtion();

      // if (
      //   pickupDetails?.Enabled &&
      //   pickup &&
      //   showDayPickup &&
      //   DayPickup.length === 0
      // ) {
      //   validationErrors.pickupAvailableDays =
      //     "Please enter available days for pickup";
      // }

      // if (showDineIn && !dineinfields[0].showDay) {
      //   if (Normaldays.length === 0) {
      //     validationErrors["daysCheck"] = "Please select Available days";
      //   }
      //   if (Normaldays && Normaldays.length > 0) {
      //     delete validationErrors["daysCheck"];
      //   }
      // }
      // if (pickup && !showDayPickup) {
      //   if (Normaldays.length === 0) {
      //     validationErrors["daysCheck"] = "Please select Available days";
      //   }
      //   if (Normaldays && Normaldays.length > 0) {
      //     delete validationErrors["daysCheck"];
      //   }
      // }

      // if (delivery && !showDayDelivery) {
      //   if (Normaldays.length === 0) {
      //     validationErrors["daysCheck"] = "Please select Available days";
      //   }
      //   if (Normaldays && Normaldays.length > 0) {
      //     delete validationErrors["daysCheck"];
      //   }
      // }

      // if (priceInfo[0].typeId !== "" && !showDayThird) {
      //   if (Normaldays.length === 0) {
      //     validationErrors["daysCheck"] = "Please select Available days";
      //   }
      //   if (Normaldays && Normaldays.length > 0) {
      //     delete validationErrors["daysCheck"];
      //   }
      // }

      setErrors(validationErrors);

      setKitchenError(true);
      return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = () => {
      let isValid = validateDineinFields();
      if (!showDineIn && !pickup && !delivery) {
        isValid = false;
      }
      if (!isValid) {
        return false;
      }
      return true;
    };

    const [disabledDay, setDisableDay] = useState<any[]>([]);

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
      availableDaysnew,
      showDayPickup,
      showDayDelivery,
      selectedthirdvalues,
      priceInfo,
      showDayThird,
      DayThird,
      DayPickup,
      dineInDates1,
      DayDelivery,
      selectedMealType,
      selectedDate,
      selectedDate1,
      isOptionTrue,
      isSeasonalFood
    ]);

    const validatePickupPrice = (price: number, Enable: boolean): void => {
      const validationErrors = { ...errors };
      if (pickup) {
        if ((!price || price <= 0) && !Enable) {
          validationErrors.pickupprice = "Price is empty";
        } else {
          delete validationErrors.pickupprice;
        }
      }

      setErrors(validationErrors);
    };
    const validateDeliveryPrice = (price: number, Enable: boolean): void => {
      const validationErrors = { ...errors };
      if (delivery) {
        if ((!price || price <= 0) && !Enable) {
          validationErrors.deliveryprice = "Price is empty";
        } else {
          delete validationErrors.deliveryprice;
        }
      }

      setErrors(validationErrors);
    };

    const preFillDataPickup = () => {
      if (dineinfields.length > 0) {
        setPickUpDetails((prevDetails) => ({
          ...prevDetails,
          price: dineinfields[0]?.DineInPrice || 0,
          availabilities: [
            {
              ...prevDetails.availabilities[0],
              sessions: dineinfields[0]?.DineInMealType || [],
            },
          ],
        }));
      }

      const validationErrors = { ...errors };

      delete validationErrors[`pickupAvailableDays`];

      setErrors(validationErrors);
    };

    const preFillDataDelivery = () => {
      if (dineinfields.length > 0) {
        setDeliveryDetails((prevDetails) => ({
          ...prevDetails,
          price: dineinfields[0]?.DineInPrice || 0,
          availabilities: [
            {
              ...prevDetails.availabilities[0],
              sessions: dineinfields[0]?.DineInMealType || [],
            },
          ],
        }));
      }
      const validationErrors = { ...errors };

      delete validationErrors[`deliveryAvailableDays`];

      setErrors(validationErrors);
    };

    const handleWheel = (event: any) => {
      event.target.blur(); // Removes focus to prevent unintended changes
      event.preventDefault();
    };

    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
      fromDatevaliadtion(date);
    };

    const handleDateChange1 = (date: Date | null) => {
      setSelectedDate1(date);
      toDatevaliadtion(date);
    };

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
    const handleSeasonalFood = (value: boolean) => {
      setIsSeasonalFood(value);
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
    const validateDaysInRange = (startDate: any, endDate: any) => {
      let dateRange = generateDateRange(startDate, endDate);
      let availableDays = dateRange.map((date: any) =>
        date.getDay() === 0 ? 7 : date.getDay()
      );
      setDisableDay(availableDays);
      if (availableDays.length === 1) {
        setDayThird(availableDays);
        setValue("AvailableDays", availableDays);
      }
    };

    useEffect(() => {
      if (selectedDate && selectedDate1) {
        if (selectedDate == selectedDate1) {
          handleSingleDayRange(selectedDate, selectedDate1);
        } else {
          validateDaysInRange(selectedDate, selectedDate1);
        }
      }
    }, [selectedDate, selectedDate1]);

    const handleToggleDineIn = (index: number) => {
      setDineInFields((prev: any) =>
        prev.map((entry: any, i: number) =>
          i === index
            ? { ...entry, availabilityEnabled: !entry.availabilityEnabled }
            : entry
        )
      );
      setFormattedDineInData((prevData: any) => ({
        ...prevData,

        availabilityEnabled: !prevData.availabilityEnabled,
      }));
    };

    const handleToggleThirdParty = (index: number) => {
      setPriceInfo((prev: any) =>
        prev.map((entry: any, i: number) =>
          i === index
            ? { ...entry, availabilityEnabled: !entry.availabilityEnabled }
            : entry
        )
      );
    };

    const handleTogglePickup = () => {
      setPickUpDetails({
        ...pickupDetails,
        availabilityEnabled: !pickupDetails.availabilityEnabled,
      });
    };
    const handleToggleDelivery = () => {
      setDeliveryDetails({
        ...deliveryDetails,
        availabilityEnabled: !deliveryDetails.availabilityEnabled,
      });
    };

    // Seasonal - isSeasonalFood
    // Available days- availableDaysnew
    // MealType - selectedMealType
    // fromdtae -selectedDate
    // to date - selectedDate1

    return (
      <div style={{margin:' 0px', padding:'0px'}}>
        {(
          <div className="AvailDaycheck">
            {!isOptionTrue && (
              <div className="Custome-Availability-container">
                <div className="Custom-Available">
                  <input
                    type="checkbox"
                    className="checkbox1-Custom"
                    onChange={() => handleSeasonalFood(!isSeasonalFood)}
                    checked={isSeasonalFood}
                  />
                  <label
                    onClick={() => handleSeasonalFood(!isSeasonalFood)}
                    className="custom-available-seasonal-food"
                  >
                    Is this a seasonal food item?
                  </label>
                </div>

                <div>
                  <h3 className="available-days-heading">Available days*</h3>
                </div>

                <div>
                  {isSeasonalFood && (
                    <div className="date-select-v2">
                      <div className="FromdateWith-Error">
                        <div className="from-date-v2">
                          <DatePicker
                            placeholderText="01/01/2025"
                            dateFormat="MM/dd/yyyy"
                            selected={selectedDate instanceof Date && !isNaN(selectedDate.getTime()) ? selectedDate : null}
                            onChange={handleDateChange}
                            ref={datePickerRef}
                            className="datePicker-special-v2"
                            minDate={new Date()}
                          />
                          <img
                            src={calender}
                            className="calender-img-v2"
                            onClick={handleImageClick}
                          />
                        </div>

                        <div className="error-msg-Availabledays">
                          <div style={{ width: "11.8rem" }}>
                            <span className="AvailabledaysError">
                              {errors.fromDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="TodateWith-Error">
                        <div className="to-date-v2">
                          <DatePicker
                            selected={selectedDate1 instanceof Date && !isNaN(selectedDate1.getTime()) ? selectedDate1 : null}
                            onChange={handleDateChange1}
                            placeholderText="01/01/2025"
                            dateFormat="MM/dd/yyyy"
                            showPopperArrow
                            ref={datePickerRef1}
                            className="datePicker-special-v2"
                            minDate={selectedDate}
                            disabled={!selectedDate}
                          />
                          <img
                            src={calender}
                            className="calender-img-v2"
                            onClick={handleImageClick2}
                          />
                        </div>

                        <div className="error-msg-Availabledays">
                          <div style={{ width: "11.8rem" }}>
                            <span className="AvailabledaysError">
                              {errors.toDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {isSeasonalFood && (
                    <div>
                      <p className="Note-special-v2">
                        Note: The item will be available only from start date to
                        end date.
                      </p>
                    </div>
                  )}

                  <div
                    className="dayschecking-v2"
                    style={{ marginTop: isSeasonalFood ? "2rem" : "-1rem" }}
                  >
                    <DaysCheck
                      checkedItems={availableDaysnew}
                      setCheckedItems={setAvailableDaysnew}
                      id={availabilityid}
                      setId={setAvailabilityid}
                      dateShow={isSeasonalFood}
                      disabledays={disabledDay}
                      errorarray={errors}
                      Errorname="Availabledays"
                      setErrorArray={setErrors}
                      availabilityDay={availabilityDay}
                      AvailableDatsvaliadtion = {AvailableDatsvaliadtion}
                    />

                    <div className="error-msg-Availabledays">
                      <div style={{ width: "11.8rem", marginBottom: '10px' }}>
                        <span className="AvailabledaysError">
                          {errors.Availabledays}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="MealType-v2">
              <h1 className="Melatype-normal-heading">Meal Type{!isOptionTrue ? '*' : ""}</h1>
              <div className="melatype-dropdown-v2">
                <DropDown
                  selectedValues={selectedMealType}
                  // onSelect={handleMealType}
                  onSelect={(values) => handleMealType(values)}
                  setSelectedMealType={setSelectedMealType}
                  EnabledOrNot={true}
                  options={mealType}
                  errorarray={errors}
                  Errorname="MealType"
                  setErrorArray={setErrors}
                  ValiadteMealType={ValiadteMealType}
                  label=""
                  // onBlur={() =>
                  //   validateDropdown(
                  //     selectedthirdvalues,
                  //     "SwiggyZomato"
                  //   )
                  // }
                  // validation={validationState.PickupSwiggy}
                  width="Drop1"
                  placeHolder="Meal Type*"
                  zIndex={true}
                  isOptionTrue={isOptionTrue}
                />

                <div className="error-msg-mealtype">
                  <div style={{ width: "11.8rem" }}>
                    <span className="deliverypriceerrormsg">
                      {errors.MealType}
                    </span>
                  </div>
                  {/* <div>
                                <span className="Errormsg deliverymealtypeerrormsg">
                                  {errors.deliverymealTypeSessions}
                                </span>
                              </div> */}
                </div>
              </div>
            </div>
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
            {/* <div className="AvailDaycheck-Heading">
              <h1 className="AvailableDaysHeadingNormal">Available days</h1>
            
            </div> */}

            {/* <div className="dayschecking">
              <div>
                <DaysCheck
                  checkedItems={Normaldays}
                  setCheckedItems={setNormalDays}
                  id={availabilityid}
                  setId={setAvailabilityid}
                />
              </div>
              <div>
                {Normaldays && Normaldays.length === 0 && (
                  <span className="daycheckvalidation">
                    {errors[`daysCheck`] || ""}
                  </span>
                )}
              </div>

              <div>
                <p className={errors[`daysCheck`] !== "" ? "Note" : "Note-error"}>
                  Note : Changes here will apply to all service types unless
                  specific day options are enabled
                </p>
              </div>
            </div> */}
          </div>
        )}
        {/* <h1 className="AvailableServiceHeading">Avaliable Service Streams</h1> */}
        {/* DineIn Related */}

        <div className="pricing-section">
          {DineInServiceEnabled && (
            <div className="DineInRelated">
              <h1 className="DineInRelatedHeadingNormalAvail">Dine In</h1>
              <span
                onClick={() => {
                  const validationErrors = { ...errors };
                  delete validationErrors[`DineInAvailableDays-${0}`];
                  setErrors(validationErrors);
                }}
                className="dine-in-toggle"
              >
                <Toggle
                  toggle={showDineIn}
                  setToggle={setShowDineIn}
                  Enabled={dineInEnable === true}
                />
              </span>
            </div>
          )}

          {DineInServiceEnabled && showDineIn ? (
            <>
              {Array.isArray(dineinfields) &&
                dineinfields?.map((entry: any, index: any) => {
                  const mealTypeKey = `DineInMealType_${index}`;
                  const priceKey = `DineInPrice_${index}`;
                  const DineInService = `DineInService_${index}`;
                  const enableOrNot = entry.availabilityEnabled;

                  return (
                    <>
                      <div className="">
                        <div
                          className="dine-In-Container"
                          style={{ height: entry?.showDay ? "11rem" : "6rem" }}
                        >
                          <div className="dine-In-inputprice-and-mealType">
                            <div className="DineInPrice-input-field-and-errormsg">
                              <div className="LabelPrice">
                                <LableComponent lable="Price*" />
                              </div>
                              <div className="input-field-availability">
                                <input
                                  type="number"
                                  name="DineInPrice"
                                  onWheel={handleWheel}
                                  value={entry.DineInPrice}
                                  // disabled={!enableOrNot}
                                  style={{
                                    border: "1px solid #5F5F5F",
                                    // border: enableOrNot
                                    //   ? "1px solid rgba(0, 0, 0, 0.3)"
                                    //   : "1px solid #5F5F5F",
                                    // opacity: enableOrNot? "100%" : "50%",
                                  }}
                                  className="DineInprice-input-field"
                                  // disabled={!entry?.Enabled}
                                  onChange={(e) => {
                                    handleChange(index, e, true);
                                  }}
                                  onInput={(e) => {
                                    const inputElement =
                                      e.target as HTMLInputElement;
                                    let value = inputElement.value;

                                    if (value.length === 1 && value === "0") {
                                      inputElement.value = "";
                                      return;
                                    }

                                    if (!/^(\d+(\.\d*)?|\.\d+)?$/.test(value)) {
                                      inputElement.value = value.slice(0, -1);
                                    }
                                  }}
                                />
                                <div>
                                  {/* 
                              {
                                editData?.length >0 &&
                                <Toggle
                  toggle={entry?.availabilityEnabled}
                 
                  
                  availabilityEnabled={()=>handleToggleDineIn(index)}
                  Enabled={true}
                />
                              } */}
                                </div>
                              </div>
                            </div>

                            {/* <div className="DineInMealType-input-field">
                            <DropDown
                              validatedineMealType={validatedineMealType}
                              EnabledOrNot={true}
                              selectedValues={
                                selectedValuesmealtype[index] || ""
                              }
                              onSelect={(values) =>
                                handleSelectMealtype(values, index)
                              }
                              options={optionsmealtype}
                              index={index}
                              label="Meal Type*"
                              onBlur={() => validateDineinFields()}
                              width="Drop1"
                            />
                          </div> */}
                          </div>
                          <div className="Error-row-of-dineIn">
                            <div style={{ width: "11.7rem" }}>
                              <span className="price-error-for-dineIn">
                                {errors[`DineInPrice-${index}`]}
                              </span>
                            </div>
                            <div>
                              {/* <span className="mealTypeError">
                              {errors[`DineInMealType-${index}`]}
                            </span> */}
                            </div>
                          </div>

                          {/* <div className="ChooseDay-DaysCheckbox-Dinein">
                          <div className="ChooseDay-container-Dinein">
                            <h3 className="Back-and-default-dineIn">
                              {entry?.showDay
                                ? "Back to default days?"
                                : "Setup for specific days?"}
                            </h3>
                            <h3
                              className="defult-and-chooseday-dineIn"
                              onClick={() => {
                                const text = entry?.showDay
                                  ? "Default Day"
                                  : "Choose Day";

                                addDay(index, text);
                              }}
                            >
                              {entry?.showDay ? "Default Day" : "Choose Day"}
                            </h3>
                          </div>
                          <div className="DaysCheckbox-container-Dinein">
                            {entry.showDay && (
                              <div className="checbox-dineIn">
                                <DaysCheckDin
                                  normalDays={Normaldays}
                                  defaultDays={entry?.showDay}
                                  checkedItems={dineInDates1}
                                  errorarray={errors}
                                  Errorname={`DineInAvailableDays-${index}`}
                                  setErrorArray={setErrors}
                                  setCheckedItems={setDineInDates1}
                                  getDisabledDays={getDisabledDays}
                                  index={index}
                                  {...(availabilityid
                                    ? {
                                        id: availabilityid,
                                        setId: setAvailabilityid,
                                      }
                                    : {})}
                                />
                              </div>
                            )}

                            <span className="Dine-Available-Days-Error">
                              {errors[`DineInAvailableDays-${index}`] || ""}
                            </span>
                          </div>
                        </div> */}
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
                      <div className="toggleIV" onClick={preFillDataPickup}>
                        <Toggle
                          toggle={pickup}
                          setToggle={setPickup}
                          Enabled={pickupEnable === true}
                          // Enabled={pickUpIdServiceEnabled === 1 && pickupEnable===true}
                        />
                      </div>
                    </div>
                    <div
                      className="PickupSectionNormal"
                      style={{
                        height: showDayPickup
                          ? "4rem"
                          : pickup
                          ? "5rem"
                          : "0rem",
                      }}
                    >
                      {pickup && pickUpTypes ? (
                        <div>
                          <div className="PickupInput11Normal">
                            <div className="pickupprice-errormsg">
                              <div className="LabelPricePickup">
                                <LableComponent lable="Price*" />
                              </div>
                              <div className="input-field-availability">
                                <input
                                  type="number"
                                  onWheel={handleWheel}
                                  step="any"
                                  // disabled={!pickupDetails?.availabilityEnabled}
                                  style={{
                                    border: "1px solid #5F5F5F",
                                    // border: pickupDetails?.availabilityEnabled
                                    // ? "1px solid rgba(0, 0, 0, 0.3)"
                                    // : "1px solid #5F5F5F",
                                    // opacity: pickupDetails?.availabilityEnabled
                                    //   ? "100%"
                                    //   : "50%",
                                  }}
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

                                    if (
                                      /^\d{0,4}(\.\d{0,2})?$/.test(inputValue)
                                    ) {
                                      const numericValue =
                                        parseFloat(inputValue);

                                      setPickUpDetails({
                                        ...pickupDetails,
                                        price: numericValue,
                                      });

                                      validatePickupPrice(
                                        numericValue,
                                        pickupDetails?.Enabled
                                      );
                                    }
                                  }}
                                />

                                {/*                               
                              {
                              editData?.length >0 &&
                              <Toggle
                  toggle={pickupDetails?.availabilityEnabled}
                  // setToggle={setShowDineIn}
                  
                  availabilityEnabled={handleTogglePickup}
                  Enabled={true}
                />
                              } */}
                              </div>
                            </div>

                            {/* <div className="PrizeD">
                              <DropDown
                                selectedValues={
                                  pickupDetails.availabilities[0].sessions
                                }
                                EnabledOrNot={true}
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
                            </div> */}
                          </div>

                          <div className="error-msg-container-pickup">
                            <div style={{ width: "12.5rem" }}>
                              <span className="Errormsg pickuperrormsg">
                                {errors.pickupprice}
                              </span>
                            </div>

                            {/* <div>
                              <span className="Errormsg pickuperrormsgmealType">
                                {errors.pickupmealTypeSessions}
                              </span>
                            </div> */}
                          </div>

                          {/* <div
                            className="PickupChooseDayContainer"
                            style={{
                              marginTop:
                                errors.pickupprice !== "" ||
                                errors.pickupmealTypeSessions !== ""
                                  ? "-1.1rem"
                                  : "",
                            }}
                          >
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
                              <h3  onClick={() => {
                                setShowDayPickup(false);
                              }} className="pickupChooseDayContainer-chooseheading1">
                                <span
                                 
                                >
                                  Default day
                                </span>
                              </h3>
                            ) : (
                              <h3
                                className="pickupChooseDayContainer-chooseheading2"
                                onClick={() => {
                                  // if(pickupDetails?.Enabled){
                                  addDayPickup();
                                  // }
                                }}
                              >
                                Choose Day
                              </h3>
                            )}
                          </div> */}
                          {/* <div className="dayspick-pickup">
                            {showDayPickup ? (
                              <DaysCheck
                                normalDays={Normaldays}
                                defaultDays={showDayPickup}
                                errorarray={errors}
                                Errorname="pickupAvailableDays"
                                setErrorArray={setErrors}
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
                            <span className="pickupdays-errormsg">
                              {errors.pickupAvailableDays}
                            </span>
                          </div> */}
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
                          ? "DeliveryRelatedNormalopen"
                          : "DeliveryRelatedNormal"
                      }`}
                    >
                      <h1
                        className="DeliveryRelatedHeadingNormal"
                        style={{ opacity: deliveryEnable ? "100%" : "50%" }}
                      >
                        Delivery
                      </h1>
                      <div className="toggleV" onClick={preFillDataDelivery}>
                        <Toggle
                          toggle={delivery}
                          setToggle={setDelivery}
                          Enabled={deliveryEnable === true}
                        />
                      </div>
                    </div>

                    <div
                      style={{ height: showDayDelivery ? "6rem" : "7rem" }}
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
                              <div className="input-field-availability">
                                <input
                                  type="number"
                                  className="DeliveryInput1Normal"
                                  onWheel={handleWheel}
                                  // disabled={
                                  //   !deliveryDetails?.availabilityEnabled
                                  // }
                                  style={{
                                    border: "1px solid #5F5F5F",

                                    // border: deliveryDetails?.availabilityEnabled
                                    // ? "1px solid rgba(0, 0, 0, 0.3)"
                                    // : "1px solid #5F5F5F",
                                    // opacity: deliveryDetails?.availabilityEnabled
                                    //   ? "100%"
                                    //   : "50%",
                                  }}
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
                                    }
                                  }}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    // if (deliveryDetails?.Enabled) {
                                    const inputValue = e.target.value;

                                    if (inputValue === "") {
                                      setDeliveryDetails(
                                        (prevDetails: any) => ({
                                          ...prevDetails,
                                          price: "",
                                        })
                                      );
                                      return;
                                    }

                                    if (
                                      /^\d{0,4}(\.\d{0,2})?$/.test(inputValue)
                                    ) {
                                      const numericValue =
                                        parseFloat(inputValue);

                                      if (
                                        !isNaN(numericValue) &&
                                        numericValue !== 0
                                      ) {
                                        setDeliveryDetails(
                                          (prevDetails: any) => ({
                                            ...prevDetails,
                                            price: numericValue,
                                          })
                                        );
                                        validateDeliveryPrice(
                                          numericValue,
                                          deliveryDetails?.Enabled
                                        );
                                      }
                                      // }
                                    }
                                  }}
                                />

                                {/* {

                              editData?.length>0 &&
                               <Toggle
                  toggle={deliveryDetails?.availabilityEnabled}
                  // setToggle={setShowDineIn}
                  
                  availabilityEnabled={handleToggleDelivery}
                  Enabled={true}
                />
                              
                              } */}
                              </div>
                            </div>

                            {/* <div className="DeliveryD">
                              <DropDown
                                selectedValues={
                                  deliveryDetails.availabilities[0].sessions
                                }
                                EnabledOrNot={true}
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
                            </div> */}
                          </div>
                          <div className="error-msg-delivey">
                            <div style={{ width: "11.8rem" }}>
                              <span className="deliverypriceerrormsg">
                                {errors.deliveryprice}
                              </span>
                            </div>
                            {/* <div>
                              <span className="Errormsg deliverymealtypeerrormsg">
                                {errors.deliverymealTypeSessions}
                              </span>
                            </div> */}
                          </div>
                          {/* <div className="deliveryChooseDayContainer">
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
                                onClick={() => {
                                  // if(deliveryDetails?.Enabled)
                                  // {
                                  addDayDeliveryfalse();

                                  const validationErrors = { ...errors };

                                  delete validationErrors[
                                    `deliveryAvailableDays`
                                  ];

                                  setErrors(validationErrors);
                                }}
                                // }
                              >
                                Default day
                              </h3>
                            ) : (
                              <h3
                                className="deliveryChooseDayContainer-chooseheading"
                                onClick={() => {
                                  if (deliveryDetails?.Enabled) {
                                    addDayDelivery();
                                  }
                                }}
                              >
                                Choose Day
                              </h3>
                            )}
                          </div> */}
                          {/* <div className="dayspickup-normal">
                            {showDayDelivery && (
                              <DaysCheck
                                checkedItems={DayDelivery}
                                errorarray={errors}
                                Errorname="deliveryAvailableDays"
                                setErrorArray={setErrors}
                                setCheckedItems={setDayDelivery}
                                {...(availabilityid.length > 0
                                  ? {
                                      id: availabilityid,
                                      setId: setAvailabilityid,
                                    }
                                  : { id: [], setId: () => {} })}
                              />
                            )}
                            <span className="deliverydays-error">
                              {errors.deliveryAvailableDays}
                            </span>
                          </div> */}
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
                              EnabledOrNot={true}
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
                              zIndex={true}
                              thirdParty = {true}
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
                                  <div className="input-field-availability">
                                    <input
                                      className="swiggyZomato-input"
                                      type="number"
                                      onWheel={handleWheel}
                                      // disabled={
                                      //   !priceInfo[index]?.availabilityEnabled
                                      // }
                                      style={{
                                        border: "1px solid #5F5F5F",

                                        // border: priceInfo[index]?.availabilityEnabled
                                        // ? " 1px solid rgba(0, 0, 0, 0.3)"
                                        // : "1px solid #5F5F5F",
                                        // opacity: priceInfo[index]?.availabilityEnabled
                                        //   ? "100%"
                                        //   : "50%",
                                      }}
                                      // style={{

                                      //   opacity: priceInfo[index]?.Enabled
                                      //     ? "100%"
                                      //     : "50%",
                                      // }}
                                      // disabled={!priceInfo[index]?.Enabled}
                                      value={priceInfo[index]?.price || ""}
                                      onKeyDown={(e) => {
                                        if (
                                          ["-", "+", "e", "E"].includes(e.key)
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        if (
                                          /^\d{0,4}(\.\d{0,2})?$/.test(
                                            inputValue
                                          )
                                        ) {
                                          const updatedData = [
                                            ...priceInfo,
                                          ].map((item, idx) =>
                                            idx === index
                                              ? {
                                                  ...item,
                                                  price: parseFloat(inputValue),
                                                }
                                              : item
                                          );
                                          validateThridPrice(
                                            index,
                                            updatedData[index]?.price,
                                            priceInfo[index]?.Enabled
                                          );
                                          setPriceInfo(updatedData);
                                        }
                                      }}
                                    />

                                    {/* {
                                  editData?.length>0 &&
                                  <Toggle
                  toggle={priceInfo[index]?.availabilityEnabled}
                  // setToggle={setShowDineIn}
                  
                  availabilityEnabled={()=>handleToggleThirdParty(index)}
                  Enabled={true}
                />

                                  } */}
                                  </div>

                                  <span className="Thirdparty-price-error">
                                    {errors[`ThirdPartyPrice-${index}`]}
                                  </span>
                                </div>
                                <div
                                  className={`Third${option}  thridparties-dropdown `}
                                  style={{
                                    zIndex: dropdownopened ? "-1" : "",
                                    // opacity: priceInfo[index]?.Enabled
                                    //   ? "100%"
                                    //   : "70%",
                                  }}
                                >
                                  {/* <DropDown
                                    validatedineMealType={
                                      validateThirdPartyMealType
                                    }
                                    selectedValues={mealTypes[option] || []}
                                    EnabledOrNot={true}
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
                                    width="Drop1"
                                  /> */}
                                  {/* <span className="ErrormsgPrice thirdpartyprice">
                                    {errors[`ThirdPartyMealType-${index}`]}
                                  </span> */}
                                </div>
                              </div>
                            );

                            return null;
                          })}

                          {/* {selectedthirdvalues.length>0 &&
                          <div className="ThirdPartyChooseDayContainer">

                            {
                              selectedthirdvalues.length>0 &&
                              <>{
                                showDayThird ? (
                                  <h3 className="ThirdPartyChooseDayContainerHeading">
                                    Back to Default days
                                  </h3>
                                ) : (
                                  <h3 className="ThirdPartyChooseDayContainerHeading">
                                    Setup for specific days?
                                  </h3>
                                )}</>
                            }
                            
                            {
                              selectedthirdvalues.length>0 &&<>
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
                              </>
                            }
                           
                          </div>
  } */}

                          {/* <div>
                            <div>
                              {showDayThird && selectedthirdvalues.length>0 &&(
                                <DaysCheck
                                  checkedItems={DayThird}
                                  setCheckedItems={setDayThird}
                                  {...(availabilityid.length > 0
                                    ? {
                                        id: availabilityid,
                                        setId: setAvailabilityid,
                                      }
                                    : { id: [], setId: () => {} })}
                                />
                              )}
                            </div>
                            <div>
                              <span className="ThirdParty-Available-Days-Error">
                                {errors[`ThirdPartyAvailableDays`] || ""}
                              </span>
                            </div>
                          </div> */}
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
      </div>
    );
  }
);

export default Normalavail;
