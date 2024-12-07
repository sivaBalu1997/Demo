import React, { useState, useContext, useEffect, useRef } from "react";
import { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form";
import "./PricingDetails.scss";
import Toggle from "../../../components/productCatalog/Toggle/Toggle";
import Specialavail from "../../../components/productCatalog/SpecialAvail/Specialavail";
import Normalavail from "../../../components/productCatalog/Normalavail/Normalavail";
import { useDispatch, useSelector } from "react-redux";
import {
  getTagClassRequest,
  PricingDetailRequest,
  PricingDetailsClear,
  removeDataRequest,
} from "../../../redux/productCatalog/productCatalogActions";
import Dropdown from "../../../components/productCatalog/DropDownList/DropDownList";
import { useHistory } from "react-router-dom";
import { Contextpagejs } from "../contextpage";
import Navigationpage from "components/productCatalog/Navigation/NavigationPage";
import SidePanel from "pages/SidePanel";
import SaveAndNext from "components/productCatalog/Savenextbutton/SaveAndNext";
import Inventory from "components/productCatalog/Inventory/Inventory";
import info from "../../../assets/svg/info.svg";

import {
  imageslist,
  dietarytype,
  cuisine,
  mealType,
  subcategory,
  alcoholradio,
  calorieponitradio,
  portionsizeradio,
} from "../../../assets/mockData/Moca_data";
import { StateDataTag3 } from "../PrimaryPage/PrimaryPage";
import { RootState } from "redux/rootReducer";
import { type } from "os";
import Tooltip from "components/productCatalog/Tooltip/TooltipMsg";

interface SelectedValuesState {
  [key: number]: any;
}

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

interface availabilities {
  availabilityDays: number[];

  sessions: string[];
}

interface thirdpartyDeliveryDetails {
  availabilities: availabilities[];
  price: number;
  typeId: string;
  typeName: string;
}
type MainFormTypespecial = {
  availabilityid: string[];
  fromDate: string | Date | undefined;
  toDate: string | Date | undefined;
  specialdays: number[];
  dineinfields: DineInField[];
  pickupDetails: thirdpartyDeliveryDetails[];
  deliveryDetails: thirdpartyDeliveryDetails[];
  thirdpartyDetails: thirdpartyDeliveryDetails[];
};

type DineInField = {
  DineInId?: string;
  DineInPrice: string | string[];
  // DineInMealType: string | string[];
};

type DineinFieldSpecial = {
  DineInId: string;
  DineInPrice: string | string[];
  DineInMealType: string | string[];
  DineInService: string | string[];
};

interface FormState {
  Pickupprice?: string;
  Pickupmealtype?: string;
  Deliveryprice?: string;
  Deliverymealtype?: string;
  Swiggyorzomato?: string;
  Swiggy?: string;
  Swiggymealtype?: string;
  Zomato?: string;
  Zomatomealtype?: string;
  Inventory1: string;
  Inventory2: string;
}

type MainFormSpecial = {
  form1: FormState;
  dineinfields: DineinFieldSpecial[];
  specialcheck: number[];
  fromDate: string | Date | undefined;
  toDate: string | Date | undefined;
  selectedValuespickup: string[];
  selectedValuesdelivery: string[];
  Swiggy: string[];
  Zomato: string[];
  Availabilityid: string[];
};

interface ValidationState {
  isValid: boolean;
  errorMessage: string;
}
interface DropdownValidationState {
  kitchen: ValidationState;
  preparationTime: ValidationState;
  DineinMeal: ValidationState;
  Pickup: ValidationState;
  Delivery: ValidationState;
  ThirdDelivery1: ValidationState;
  ThirdDelivery2: ValidationState;
  Pickupspecial: ValidationState;
  Deliveryspecial: ValidationState;
  Deliveryspecial1: ValidationState;
  Deliveryspecial2: ValidationState;
  tagName: never;
}
interface FormState1 {
  Inventory1: string;
  Inventory2: string;
}
interface Option {
  name: string;
  id: string;
}

interface MainForm {
  form: FormState1;
  kitchenstation: string;
  Preparationtime: {
    hours: string;
    minutes: string;
  };
  KitchenStationId: string;
  normalForm?: any;
  specialForm?: any;
  resetInventory: boolean;
  nextAvailable: boolean;
  printKot: boolean;
}

interface PricingDetailsFormData {
  kitchen: string[];
}
interface option {
  name: string;
}

interface State {
  auth: {
    credentials: {
      locationId: string;
    };
  };
}
interface StateData {
  productCatalog: {
    availability: [];
  };
}

const PricingDetails = () => {
  const kitchenDetail = useRef<(() => void) | null>(null);
  const normalFormRef = useRef<(() => void) | null>(null);
  const specialFormRef = useRef<(() => void) | null>(null);

  const [mainFormState, setMainFormState] = useState<MainFormType>({
    availabilityid: [],
    formNormal: {
      PickuppriceNormal: "",
      PickupmealtypeNormal: "",
      DeliverypriceNormal: "",
      DeliverymealtypeNormal: "",
      SwiggyorzomatoNormal: "",
      SwiggyNormal: "",
      SwiggymealtypeNormal: "",
      ZomatoNormal: "",
      ZomatomealtypeNormal: "",
    },
    dineinfields: [],
    Normaldays: [],
    DeliveryMealType: [],
    PicupMealType: [],
    Pickup: [],
    DineInServiceArea: [],
    Delivery: [],
    thirdParty: [],
    WeekDays: [],
    DineIn: [],
    Swiggy: [],
    Zomato: [],
  });

  // const [mainFormStateSpecial, setMainFormStateSpecial] = useState<MainFormTypespecial>({
  //   availabilityid: [],
  //   fromDate:"",
  //   toDate:"",
  //   dineinfields: [],
  //   specialdays: [],
  //   pickupDetails:[],
  //   deliveryDetails:[],
  //   thirdpartyDetails:[]

  // });
  const [mainFormStateSpecial, setMainFormStateSpecial] =
    useState<MainFormType>({
      availabilityid: [],
      formNormal: {
        PickuppriceNormal: "",
        PickupmealtypeNormal: "",
        DeliverypriceNormal: "",
        DeliverymealtypeNormal: "",
        SwiggyorzomatoNormal: "",
        SwiggyNormal: "",
        SwiggymealtypeNormal: "",
        ZomatoNormal: "",
        ZomatomealtypeNormal: "",
      },
      dineinfields: [],
      Normaldays: [],
      DeliveryMealType: [],
      PicupMealType: [],
      Pickup: [],
      DineInServiceArea: [],
      Delivery: [],
      thirdParty: [],
      WeekDays: [],
      DineIn: [],
      Swiggy: [],
      Zomato: [],
    });

  const {
    control,
    handleSubmit,
    register,
    getValues,
    setValue,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<MainForm>({
    defaultValues: {
      form: {
        Inventory1: "",
        Inventory2: "",
      },
      kitchenstation: "",
      KitchenStationId: "",
      Preparationtime: {
        hours: "hhh",
        minutes: "mmm",
      },
      normalForm: mainFormState,
      specialForm: mainFormStateSpecial,
    },
  });

  const dataFromRedux = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );

  const locationid = useSelector((state: State) => state?.auth?.credentials);
  const data = useSelector(
    (state: StateData) => state?.productCatalog?.availability
  );

  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const [Preparationtime, setpreparationTime] = useState({
    hours: "",
    minutes: "",
  });

  const prizingDetail = useSelector(
    (state: any) => state.PricingDetailReducer.prizingData || {}
  );

  const cuisineData = useSelector(
    (state: any) => state.productCatalog.cuisineData.data
  );

  const kitchenStationData = useSelector(
    (state: any) => state.productCatalog.kitchenStation
  );

  const [options, setOptions] = useState<option[]>([]);
  const [options1, setOptions1] = useState<Option[]>([]);
  const [DropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({
    Kitchen: false,
  });

  const history = useHistory();
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);

  const [mainFormSpecial, setMainFormSpecial] = useState<MainFormSpecial>({
    form1: {
      Pickupprice: "",
      Pickupmealtype: "",
      Deliveryprice: "",
      Deliverymealtype: "",
      Swiggyorzomato: "",
      Swiggy: "",
      Swiggymealtype: "",
      Zomato: "",
      Zomatomealtype: "",
      Inventory1: "",
      Inventory2: "",
    },
    dineinfields: [],
    specialcheck: [],
    fromDate: new Date(),
    toDate: new Date(),
    selectedValuespickup: [],
    selectedValuesdelivery: [],
    Swiggy: [],
    Zomato: [],
    Availabilityid: [],
  });

  const primarypagedetails = useSelector(
    (state: RootState) => state.primarypage.data
  );

  const [resetInventory, setResetInventory] = useState(false);
  const [nextAvailable, setNextAvailable] = useState(false);
  const [printKot, setPrintKot] = useState(false);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const [selectedValue1, setSelectedValue1] = useState<string[]>([]);
  const [id, setId] = useState([]);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    Inventory1: "",
    Inventory2: "",
  });
  const [formerrors, setFormErrors] = useState({
    Inventory1: "",
    Inventory2: "",
  });
  const [dinein, setDineIn] = useState(false);

  const [dineinspecial, setdineinspecial] = useState(false);
  const [inventory, setInventory] = useState(false);
  const [isOptionTrue, setIsOptionTrue] = useState(true);

  const [validationState, setValidationState] = useState({
    kitchen: { isValid: true, errorMessage: "" },
    preparationTime: { isValid: true, errorMessage: "" },
    DineinMeal: { isValid: true, errorMessage: "" },
    Pickup: { isValid: true, errorMessage: "" },
    Delivery: { isValid: true, errorMessage: "" },
    ThirdDelivery1: { isValid: true, errorMessage: "" },
    ThirdDelivery2: { isValid: true, errorMessage: "" },
    Pickupspecial: { isValid: true, errorMessage: "" },
    Deliveryspecial: { isValid: true, errorMessage: "" },
    Deliveryspecial1: { isValid: true, errorMessage: "" },
    Deliveryspecial2: { isValid: true, errorMessage: "" },
    NormalMealtype: { isValid: true, errorMessage: "" },
    NormalServiceArea: { isValid: true, errorMessage: "" },
    PickupSwiggy: { isValid: true, errorMessage: "" },
  });

  const validateDropdown = (value: string[], field: string | number) => {
    let isValid = true;
    let errorMessage = "";
    if (value.length === 0) {
      isValid = false;
      errorMessage = "This field is required";
    }
    setValidationState((prevState) => ({
      ...prevState,
      [field]: { isValid, errorMessage },
    }));
  };

  const validateForm = (): boolean => {
    validateDropdown(selectedValues, "kitchen");
    validateDropdown(selectedValue1, "preparationTime");
    return (
      validationState.kitchen.isValid && validationState.preparationTime.isValid
    );
  };

  const handleDropdownToggle = (dropdownName: string) => {
    setDropdownOpen((prevState) => {
      return {
        kitchen: false,
        [dropdownName]: !prevState[dropdownName],
      };
    });
  };

  let mainForm: MainForm = {
    form: {
      Inventory1: "",
      Inventory2: "",
    },

    kitchenstation: "",

    Preparationtime: {
      hours: "",
      minutes: "",
    },

    KitchenStationId: "",
    normalForm: isOptionTrue ? mainFormState : undefined,

    specialForm: isOptionTrue ? undefined : mainFormSpecial,
    resetInventory: resetInventory,
    nextAvailable: nextAvailable,
    printKot: printKot,
  };

  useEffect(() => {
    if (prizingDetail) {
      // setInventory(true);
      setResetInventory(prizingDetail?.resetInventory);
      setNextAvailable(prizingDetail?.nextAvailable);
      setPrintKot(
        prizingDetail?.printKot || prizingDetail?.ignoreMasterKotPrint
      );

      // Prepare the kitchenstation name for the dropdown
      const kitchenStationName = prizingDetail?.kitchenstation;

      // Set form values including kitchenstation
      reset({
        form: {
          Inventory1: prizingDetail.form?.Inventory1 || "",
          Inventory2: prizingDetail.form?.Inventory2 || "",
        },
        // kitchenstation: kitchenStationName,
        Preparationtime: {
          hours: prizingDetail.Preparationtime?.hours || "",
          minutes: prizingDetail.Preparationtime?.minutes || "",
        },
      });

      setOptions1(prizingDetail.kitchenstation);
      // setValue("kitchenstation", kitchenStationName);
      // setTimeout(() => {
      //   console.log("kitchenstation value:", getValues("kitchenstation"));
      // }, 0);
    }
  }, [prizingDetail, reset, setOptions1, setValue]);

  useEffect(() => {
    setOptions(data);
    getApi();
  }, [data]);

  const getApi = async () => {
    dispatch(getTagClassRequest(locationid));
  };

  const handleBlur = (fieldValue: string[], fieldName: string) => {
    validateDropdown(fieldValue, fieldName);
  };

  const orderTypes = useSelector(
    (state: RootState) => state.auth.selectedBranch?.orderTypes
  );
  const DineInId = orderTypes?.find((item) => item.typeGroup === "D")?.id;
  const pickUpId = orderTypes?.find((item) => item.typeGroup === "P")?.id;
  const deliveryId = orderTypes?.find((item) => item.typeGroup === "S")?.id;
  const thirdpartyid = orderTypes?.find((item) => item.typeGroup === "T")?.id;

  const [dineinfields, setDineInFields] = useState<DineInField[]>([
    {
      DineInId: DineInId,
      DineInPrice: "",
      // DineInMealType: [],
    },
  ]);
  const [dineinfieldsSpecial, setDineInFieldsSpecial] = useState<DineInField[]>(
    [
      {
        DineInId: DineInId,
        DineInPrice: "",
        // DineInMealType: [],
      },
    ]
  );

  const dineInMapped = dineinfields?.map((field: any) => ({
    typeId: field.DineInId,
    typeName: field.DineInMealType,
    price: parseFloat(field?.DineInPrice),
  }));

  const [dineinfields1, setDineInFields1] = useState<DineinFieldSpecial[]>([
    {
      DineInId: "",
      DineInPrice: "",
      DineInMealType: "",
      DineInService: "",
    },
  ]);

  type DropdownValidationState = {
    [key: string]: { isValid: boolean; errorMessage: string };
  };

  const validateDineInFields = (dineinfields: DineInField[]) => {
    const errors: DropdownValidationState = {};

    dineinfields.forEach((field, index) => {
      const mealTypeKey = `DineInMealType_${index}`;
      const priceKey = `DineInPrice_${index}`;
      const DineInService = `DineInService_${index}`;

      // Validate DineInMealType
      // if (!field.DineInMealType || field.DineInMealType.length === 0) {
      //   errors[mealTypeKey] = {
      //     isValid: false,
      //     errorMessage: "Meal type should not be empty.",
      //   };
      // } else {
      //   errors[mealTypeKey] = { isValid: true, errorMessage: "" };
      // }
      if(dinein)
      {
        if (
          !field.DineInPrice ||
          isNaN(Number(field.DineInPrice)) ||
          Number(field.DineInPrice) === 0
        ) {
          errors[priceKey] = {
            isValid: false,
            errorMessage: "Price",
          };
        } else {
          errors[priceKey] = { isValid: true, errorMessage: "" };
        }  
      }
      
     
    });

    return errors;
  };

  const validateDineInFields1 = (dineinfieldsSpecial: DineInField[]) => {
    const errors: DropdownValidationState = {};

    dineinfieldsSpecial?.forEach((field, index) => {
      const mealTypeKey = `DineInMealType_${index}`;
      const priceKey = `DineInPrice_${index}`;

      // Validate DineInMealType
      // if (!field.DineInMealType || field.DineInMealType.length === 0) {
      //   errors[mealTypeKey] = {
      //     isValid: false,
      //     errorMessage: "Service should not be empty.",
      //   };
      // } else {
      //   errors[mealTypeKey] = { isValid: true, errorMessage: "" };
      // }

      if (!field.DineInPrice || isNaN(Number(field.DineInPrice))) {
        errors[priceKey] = {
          isValid: false,
          errorMessage: " Invalid Price",
        };
      } else {
        errors[priceKey] = { isValid: true, errorMessage: "" };
      }
    });

    return errors;
  };

  const handleValidateDropdown = () => {
    const dropErrors: DropdownValidationState = {};

    if (mainFormState.PicupMealType.length === 0) {
      dropErrors.Pickup = {
        isValid: false,
        errorMessage: "Please fill this field",
      };
    }
    if (!mainFormState.formNormal.PickuppriceNormal) {
      dropErrors.PickupPrice = { isValid: false, errorMessage: "Price" };
    }
    if (mainFormState.DeliveryMealType.length == 0) {
      dropErrors.Delivery = {
        isValid: false,
        errorMessage: "Please Fill this field",
      };
      if (!mainFormState.formNormal.DeliverypriceNormal) {
        dropErrors.DeliveryPrice = { isValid: false, errorMessage: "Price" };
      }
    } else {
      dropErrors.Delivery = { isValid: true, errorMessage: "" };
      dropErrors.Pickup = { isValid: true, errorMessage: "" };
      dropErrors.PickupPrice = { isValid: true, errorMessage: "" };
      dropErrors.DeliveryPrice = { isValid: true, errorMessage: "" };
    }
    return dropErrors;
  };
  const handleValidateDropdown1 = () => {
    const dropErrors: DropdownValidationState = {};

    if (mainFormStateSpecial.dineinfields.length === 0) {
      dropErrors.Pickup = {
        isValid: false,
        errorMessage: "Please fill this field",
      };
    }
    // if (!mainFormStateSpecial.formNormal.PickuppriceNormal) {
    //   dropErrors.PickupPrice = { isValid: false, errorMessage: "Price" };
    // }
    // if (mainFormState.DeliveryMealType.length == 0) {
    //   dropErrors.Delivery = {
    //     isValid: false,
    //     errorMessage: "Please Fill this field",
    //   };
    //   if (!mainFormStateSpecial.formNormal.DeliverypriceNormal) {
    //     dropErrors.DeliveryPrice = { isValid: false, errorMessage: "Price" };
    //   }
    // } else {
    //   dropErrors.Delivery = { isValid: true, errorMessage: "" };
    //   dropErrors.Pickup = { isValid: true, errorMessage: "" };
    //   dropErrors.PickupPrice = { isValid: true, errorMessage: "" };
    //   dropErrors.DeliveryPrice = { isValid: true, errorMessage: "" };
    // }
    return dropErrors;
  };
  const handleValidateSpecial = () => {
    const dropErrors1: DropdownValidationState = {};
    if (mainFormSpecial.selectedValuespickup.length === 0) {
      dropErrors1.PickupSpecial = {
        isValid: false,
        errorMessage: "Please Fill this Field",
      };
    } else {
      dropErrors1.PickupSpecial = { isValid: true, errorMessage: "" };
    }
    if (mainFormSpecial.selectedValuesdelivery.length === 0) {
      dropErrors1.DeliverySpecial = {
        isValid: false,
        errorMessage: "Please Fill this Field",
      };
    } else {
      dropErrors1.DeliverySpecial = { isValid: true, errorMessage: "" };
    }
    if (!mainFormSpecial.form1.Pickupprice) {
      dropErrors1.PickupPrizeSpecial = {
        isValid: false,
        errorMessage: "Price",
      };
    } else {
      dropErrors1.PickupPrizeSpecial = {
        isValid: true,
        errorMessage: "",
      };
    }
    if (!mainFormSpecial.form1.Deliveryprice) {
      dropErrors1.DeliveryPrizeSpecial = {
        isValid: false,
        errorMessage: "Price",
      };
    } else {
      dropErrors1.DeliveryPrizeSpecial = {
        isValid: true,
        errorMessage: "",
      };
    }
    return dropErrors1;
  };

  const [validationStateerr, setValidationStateerr] =
    useState<DropdownValidationState>({});

  const handleValidate = (): boolean => {
   

    const dineInErrors = isOptionTrue
      ? validateDineInFields(dineinfields)
      : validateDineInFields1(dineinfieldsSpecial);

    const combinedErrors = {
      // ...dropdownErrors,
      ...dineInErrors,
    };

    setValidationStateerr(combinedErrors);

    const isValid = Object.values(combinedErrors).every(
      (error) => error.isValid === true
    );

    return isValid;
  };

  const handleReset = () => {
    if (kitchenDetail.current) {
      kitchenDetail.current();
    }
    if (normalFormRef.current) {
      normalFormRef.current();
    }
    if (specialFormRef.current) {
      specialFormRef.current();
    }

    reset({
      form: {
        Inventory1: "",
        Inventory2: "",
      },
      kitchenstation: "",
      Preparationtime: {
        hours: "",
        minutes: "",
      },
    });
    dispatch(PricingDetailsClear())
  };

  const handleInventoryCheck = (event: any) => {
    setResetInventory(event.target.checked);
  };

  const handleNextAvailCheckbox = (event: any) => {
    setNextAvailable(event.target.checked);
  };

  const handlePrintKOt = (value: boolean) => {
    setPrintKot(value);
  };

  const ItemsPrimaryDetails = useSelector(
    (state: any) => state.primarypage?.data
  );

  const [childFunction, setChildFunction] = useState<() => void>(() => () => {});
  const [validationFunction, setValidationFunction] = useState<(() => boolean) | null>(null);

  const handleValidationCheck = () => {
    if (validationFunction) {
      const isValid = validationFunction(); 
    } else {      
    }
  };


  return (
    <div className={isExpanded ? "pricingDetailsExpanded" : "pricingDetails"}>
      <SidePanel />
      <div>
        <Navigationpage
          getFormData={getValues}
          seletedpage="Pricing"
          reset={handleReset}
          triggerValidation={() => trigger()}
          mainForm={mainForm}
          handleValidate={handleValidate}
        />
        <div
          className={
            isExpanded
              ? "pricingdetails-containerExpanded"
              : "pricingdetails-container"
          }
        >
          <div className="pricing-form">
            <div className="Tool">

           
              <p className="KitchenRelatedHeading">Kitchen Related</p>
              <div className="tool-tip-kitchen-detail">
                <Tooltip
                  message="Specify the kitchen station for this item and the maximum preparation time required."
                  styles={{
                    marginTop: "-0.8rem",
                    marginLeft: "2rem",
                    width: "450px",
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
                    rotate: "-90deg",
                    position: "relative",
                    right: "1rem",
                  }}
                >
                  <div className="ToolKitchen" style={{border:"none",outline:"none"}}>
                    <img src={info} alt="info icon" width={20} height={20} />
                  </div>
                </Tooltip>
              </div>
            </div>

            <div className="KitchenRelated">
              <Controller
                name="kitchenstation"
                control={control}
                render={({ field }: any) => (
                  <Dropdown
                    {...field}
                    name="kitchenstation"
                    options={kitchenStationData}
                    type="radio"
                    setOptions={setOptions1}
                    placeholder="Search for option"
                    register={register}
                    setValue={setValue}
                    error={errors.kitchenstation}
                    trigger={trigger}
                    getValues={getValues}
                    validation={{ required: "Kitchen Station is required" }}
                    addNew={true}
                    editValues={true}
                    setDropdownOpen={setDropdownOpen}
                    dropdownopen={DropdownOpen.Kitchen}
                    onToggle={() => handleDropdownToggle("Kitchen")}
                    dropDownType="KITCHEN_STATION"
                    resetSelection={kitchenDetail}
                  />
                )}
              />

              <div className="Prepartiontime">
                <label htmlFor="" className="heading">
                  Preparation time
                </label>

                <div className="Prepartiontime-input-fileds">
                  <Controller
                    name="Preparationtime.hours"
                    control={control}
                    defaultValue=""
              
                    render={({ field, trigger, value }: any) => (
                      <input
                        type="text"
                        name="hours"
                          placeholder="00"
                        value={value}
                        className="Prepartiontime-input-hours"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^(1[0-9]|2[0-3]|[1-9])$/.test(value) || value === "") {
                            setValue(
                              "Preparationtime.hours",
                              value === "" ? "" : Number(value)
                            );
                        }
                        }}
                      />
                    )}
                    rules={{
                      required: "This field is required",
                      validate: (value) =>
                        value === "" ||
                        /^[1-9]$|^1[0-2]$/.test(value) ||
                        "Please enter valid time",
                    }}
                  />

                  <span className="timeSpan">Hours</span>
                  <span className="timeSpan">:</span>

                  <Controller
                    name="Preparationtime.minutes"
                    control={control}
                    defaultValue=""
                    render={({ field, trigger, value }: any) => (
                      <input
                        type="text"
                        name="minutes"
                        value={value}
                        placeholder="00"
                        className="Prepartiontime-input-mins"
                        onChange={(e) => {
                          const inputValue = e.target.value;

                          // Allow only numeric input or empty
                          if (/^[0-9]*$/.test(inputValue)) {
                            // Set value only if it's in the range of 0-60 or empty
                            if (
                              inputValue === "" ||
                              /^(59|[0-5]?[0-9])$/.test(inputValue)
                            ) {
                              setValue("Preparationtime.minutes", inputValue);

                            }
                          }
                          // Optionally, trigger validation
                          // trigger(trigger);
                        }}
                      />
                    )}
                    rules={{
                      required: "This field is required",
                      validate: (value) =>
                        value === "" ||
                        /^(60|[0-5]?[0-9])$/.test(value) ||
                        "Please enter a valid time",
                    }}
                  />

                  <span className="timeSpan">Minutes</span>
                </div>
              </div>
            </div>

            <div className="Kitchen-checkbox">
              <input
                type="checkbox"
                className="checkbox1-Kitchen"
                onChange={() => handlePrintKOt(!printKot)}
                checked={printKot}
              />
              <label
                onClick={() => handlePrintKOt(!printKot)}
                className="Inventorycheck"
              >
                Don't print the item in Master KOT
              </label>
            </div>

            {/* <div className="InventoryToggle">
              <div>
                <p className="IHeading">Inventory</p>
              </div>
              <div className="toggleI">
                <Toggle toggle={inventory} setToggle={setInventory} />
              </div>
            </div> */}

            {/* <div className="InventorySection">
              {inventory && (
                <div>
                  <div className="InventoryHeading">
                    <p>Max No. of servings per day*</p>
                    <p className="threshold">Threshold*</p>
                  </div>
                  <div className="InventoryInput">
                    <Controller
                      name="form.Inventory1"
                      control={control}
                      defaultValue=""
                      render={({ field, trigger, value }: any) => (
                        <input
                          className="I1"
                          type="text"
                          value={value}
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            setValue("form.Inventory1", value);
                            // trigger(trigger);
                          }}
                          style={{
                            borderColor: formerrors.Inventory1
                              ? "red"
                              : "rgba(0, 0, 0, 0.3)",
                          }}
                        />
                      )}
                      rules={{ required: "This field is required" }}
                    />

                    <Controller
                      name="form.Inventory2"
                      control={control}
                      defaultValue=""
                      render={({ field, value }: any) => (
                        <input
                          className="I1"
                          type="text"
                          value={value}
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;

                            setValue("form.Inventory2", value);

                            // trigger(form.Inventory2);
                          }}
                          style={{
                            borderColor: formerrors.Inventory2
                              ? "red"
                              : "rgba(0, 0, 0, 0.3)",
                          }}
                        />
                      )}
                    />
                  </div>

                  {formerrors.Inventory1 && (
                    <p className="ErrorsForm">{formerrors.Inventory1}</p>
                  )}
                  {formerrors.Inventory2 && (
                    <p className="ErrorsFormi2">{formerrors.Inventory2}</p>
                  )}
                  <div className="Inventcheckbox">
                    <div className="checkboxI">
                      <input
                        type="checkbox"
                        className="checkbox1-color"
                        onChange={handleInventoryCheck}
                        checked={resetInventory}
                      />
                      <label className="InventoryHeadingII">
                        Reset inventory everyday
                      </label>
                    </div>

                    <div className="checkbox2">
                      <input
                        type="checkbox"
                        className="checkbox1-color"
                        onChange={handleNextAvailCheckbox}
                        checked={nextAvailable}
                      />
                      <label className="InventoryHeadingII">
                        Show next available time when maximum count is reached
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div> */}

            <div className="services-Heading">
              <p> Available Service Streams </p>
            </div>

            <div className="NormalSpecial">
              <div className="Normal">
                <input
                  type="radio"
                  value="true"
                  checked={isOptionTrue === true}
                  onChange={() => setIsOptionTrue(true)}
                  className="N1radio"
                />
                <label className="N1">Normal Availability</label>
              </div>
              {/* <div className="Special">
                <input
                  type="radio"
                  value="false"
                  checked={isOptionTrue === false}
                  onChange={() => setIsOptionTrue(false)}
                  className="S1radio"
                />
                <label className="S1">Special Availability</label>
              </div> */}
            </div>

            {isOptionTrue ? (
              <Normalavail
                validateDropdown={validateDropdown}
                dinein={dinein}
                setDineIn={setDineIn}
                validationState={validationState}
                setMainFormState={setMainFormState}
                mainFormState={mainFormState}
                selectedValues2={selectedValues2}
                setSelectedValues2={setSelectedValues2}
                dineinfields={dineinfields}
                handleValidate={handleValidate}
                setDineInFields={setDineInFields}
                setValidationStateerr={setValidationStateerr}
                ValidationStateerr={validationStateerr}
                resetSelection={normalFormRef}
                getValues={getValues}
                setValidationFunction={setValidationFunction}
              />
            ) : (
              <>
                {/* <Specialavail
                validateDropdown={validateDropdown}
                dinein={dineinspecial}
                setDineIn={setdineinspecial}
                validationState={validationState}
                setMainFormStatespecial={setMainFormStateSpecial}
                mainFormState={mainFormStateSpecial}
                selectedValues2={selectedValues2}
                setSelectedValues2={setSelectedValues2}
                dineinfields={dineinfieldsSpecial}
                handleValidate={handleValidate}
                setDineInFields={setDineInFieldsSpecial}
                setValidationStateerr={setValidationStateerr}
                ValidationStateerr={validationStateerr}
                resetSelection={normalFormRef}
              /> */}
              </>
            )}

            {/* <div
                className={
                  isExpanded
                    ? "saveandnextPricingExpanded"
                    : "saveandnextPricing"
                }
              >
                <button className="clearallPricing">Clear All</button>
                <button className="link saveall" onClick={dispatchEvent}>
                  Save & next
                </button>
              </div> */}
            <SaveAndNext
              getFormData={getValues}
              seletedpage="Pricing"
              reset={handleReset}
              triggerValidation={() => trigger()}
              mainForm={mainForm}
              handleValidate={validationFunction}
             
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetails;
