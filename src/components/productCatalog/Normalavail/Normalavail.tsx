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
import Tooltip from "../Tooltip/Tooltip";
import info from "../../../assets/svg/info.svg";

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
  [key: string]: { isValid: boolean; errorMessage: string }; // Adjust this as necessary
};

interface NormalavailProps {
  getNormalForm?: (form: any) => void;
  validateDropdown: (
    value: string[],
    key: keyof DropdownValidationState
  ) => void;

  validationState: {
    [key: string]: { isValid: boolean; errorMessage: string };
  };

  // Corrected type for setValidationStateerr
  setValidationStateerr: React.Dispatch<
    React.SetStateAction<DropdownValidationState>
  >;

  dinein: boolean;
  setDineIn: React.Dispatch<React.SetStateAction<boolean>>;
  setMainFormState: React.Dispatch<React.SetStateAction<MainFormType>>;
  handleValidate: () => void;
  mainFormState: any;
  dineinfields?: any;
  setDineInFields: (form: any) => void;
  onToggelChange:(dineIn: boolean, online: boolean, pickup: boolean,delivery:boolean) => void;
}

type MealType1 = string;
type MealType = string[];
type SelectedValueType = string;
type SelectedValuesMealTypeState = MealType[];
type ServiceValueType = string;
interface SelectedValuesState {
  [key: number]: any; // Replace `any` with the actual type of `values`
}
type OptionType = string;

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
  onToggelChange

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
  const [optionsselectthird, setOptionsSelectThird] = useState([
    "Swiggy",
    "Zomato",
  ]);
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
    (state: any) => state.PricingDetailReducer.prizingData.mainForm
  );
  useEffect(()=>{
    onToggelChange(dinein,online,pickup,delivery)

  },[dinein,online,pickup,delivery])

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
  };

  useEffect(() => {
    if (prizingDetail?.normalForm?.formNormal) {
      setformNormal({
        PickuppriceNormal:
          prizingDetail.normalForm.formNormal.PickuppriceNormal || "",
        PickupmealtypeNormal:
          prizingDetail.normalForm.formNormal.PickupmealtypeNormal || "",
        DeliverypriceNormal:
          prizingDetail.normalForm.formNormal.DeliverypriceNormal || "",
        DeliverymealtypeNormal:
          prizingDetail.normalForm.formNormal.DeliverymealtypeNormal || "",
        SwiggyorzomatoNormal:
          prizingDetail.normalForm.formNormal.SwiggyorzomatoNormal || "",
        SwiggyNormal: prizingDetail.normalForm.formNormal.SwiggyNormal || "",
        SwiggymealtypeNormal:
          prizingDetail.normalForm.formNormal.SwiggymealtypeNormal || "",
        ZomatoNormal: prizingDetail.normalForm.formNormal.ZomatoNormal || "",
        ZomatomealtypeNormal:
          prizingDetail.normalForm.formNormal.ZomatomealtypeNormal || "",
      });

      const updatedFields = prizingDetail?.normalForm?.dineinfields.map(
        (item: any) => ({
          DineInPrice: item?.DineInPrice || "",
          DineInMealType: item.DineInMealType || [], // Ensure it's an array for dropdowns
          DineInService: item?.DineInService || "",
          showDay: false,
          dayButtonText: "Choose Day",
        })
      );

      setDineInFields(updatedFields);

      // Initialize selected values
      const initialSelectedValues = updatedFields.map(
        (item: any) => item.DineInMealType
      );
      setSelectedValuesMealType(initialSelectedValues);

      const initialSelectedValues2 = updatedFields.map(
        (item: any) => item.DineInService
      );
      setSelectedValues(initialSelectedValues2);
      setDineIn(true);

      const WeekDays = prizingDetail?.normalForm?.WeekDays;
    }

    const mainForm = {
      availabilityid,
      formNormal,
      dineinfields,
      Normaldays: Normaldays,
      DeliveryMealType: selectedValues3,
      PicupMealType:
        prizingDetail?.normalForm?.PicupMealType || selectedValues2,
      Pickup: DayPickup,

      DineInServiceArea: [selectedValues],
      Delivery: DayDelivery,

      thirdParty: DayThird,
      WeekDays: dineInDates1,

      DineIn: dineInDates1,
    };

    if (prizingDetail?.normalForm) {
      setSelectedValues2(
        prizingDetail.normalForm.PicupMealType || selectedValues2
      );
      // Other state initializations...
    }

    if (prizingDetail?.normalForm) {
      setSelectedValues3(
        prizingDetail.normalForm.DeliveryMealType || selectedValues3
      );
      // Other state initializations...
    }
    if (prizingDetail?.normalForm) {
      setSelectedValues4(prizingDetail.normalForm.Swiggy || selectedValues4);
      // Other state initializations...
    }
    if (prizingDetail?.normalForm) {
      setSelectedValues5(prizingDetail.normalForm.Zomato || selectedValues5);
      // Other state initializations...
    }

    if (prizingDetail?.normalForm) {
      setDayPickup(prizingDetail.normalForm.Pickup || []);

      setShowDayPickup(true);
    }

    if (prizingDetail?.normalForm) {
      setDayDelivery(prizingDetail.normalForm.Delivery || []);

      setShowDayDelivery(true);
    }

    if (prizingDetail?.normalForm) {
      setDayThird(prizingDetail.normalForm.thirdParty || []);

      setShowDayThird(true);
    }

    if (prizingDetail?.normalForm) {
      setNormalDays(prizingDetail.normalForm.Normaldays || []);
    }
  }, []);
  const handleDelete = (index: number): void => {
    // Filter out the entry at the given index
    const newEntries = dineinfields.filter((_: any, i: any) => i !== index);
    setDineInFields(newEntries);

    // Handle selected values
    const newSelectedValues1 = { ...selectedValues };
    delete newSelectedValues1[index];
    setSelectedValues(newSelectedValues1);

    // Handle selected meal type values
    const newSelectedValuesMealtype = { ...selectedValuesmealtype };
    delete newSelectedValuesMealtype[index];
    setSelectedValuesMealType(newSelectedValuesMealtype);

    // Handle dine-in dates
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
  const handleSelect2 = (values: any, index: number): void => {
    // Update selected values state
    setSelectedValues((prevState: SelectedValuesState) => ({
      ...prevState,
      [index]: values,
    }));

    // Update the dineinfields state with the new selected values
    const newDineInFields = [...dineinfields];
    newDineInFields[index] = {
      ...newDineInFields[index],
      DineInService: values,
    };
    setDineInFields(newDineInFields);

    // Clear validation error for the specified field
  };

  const addOption2 = (newOption: OptionType): void => {
    setOptions2((prevOptions) => [...prevOptions, newOption]);
  };
  const handleSelect3 = (values: string[]): void => {
    setSelectedValues2(values);
    validateDropdown(values, "Pickup");
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
    const newSelectedValues = [...selectedValuesmealtype];
    newSelectedValues[index] = value;
    setSelectedValuesMealType(newSelectedValues);

    const newDineInFields = [...dineinfields];
    newDineInFields[index].DineInMealType = value;
    setDineInFields(newDineInFields);

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
      console.error("Index out of bounds");
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

  return (
    <div>
      <div className="AvailDaycheck">
        <div className="AvailDaycheck-Heading">
           <h1 className="AvailableDaysHeadingNormal">Available days</h1>
        <div className="tooltip"> <Tooltip message="Kitchen Related">
                      <div className="ToolKitchen">
                        <img src={info} alt="" width={25} height={25} />
                      </div>
                    </Tooltip></div></div>
       
        <div className="dayschecking">
          <DaysCheck
            checkedItems={Normaldays}
            setCheckedItems={setNormalDays}
            id={availabilityid}
            setId={setAvailabilityid}
          ></DaysCheck>
        </div>
      </div>
      {/* <h1 className="AvailableServiceHeading">Avaliable Service Streams</h1> */}
      {/* DineIn Related */}
      <div className="DineInRelated">
        <h1 className="DineInRelatedHeadingNormalAvail">Dine In</h1>
        <div className="toggleII">
          <Toggle toggle={dinein} setToggle={setDineIn} />
        </div>
      </div>
      {dinein ? (
        <>
          {dineinfields.map((entry: any, index: any) => {
            const mealTypeKey = `DineInMealType_${index}`;
            const priceKey = `DineInPrice_${index}`;
            const DineInService = `DineInService_${index}`;
            return (
              <>
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
                        handleValidate();
                      }}
                    />
                    {!validationState[priceKey]?.isValid && (
                      <span className="Errormsg">
                        {validationState[priceKey]?.errorMessage}
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
                        handleValidate={handleValidate}
                        onBlur={() => {
                          // validateDropdown(selectedValuesmealtype[index] || [], index)
                          handleValidate();
                        }}
                        // validation={
                        //  validationState.NormalMealtype
                        // }
                      />
                    </div>
                    <div>
                      {" "}
                      {!validationState[mealTypeKey]?.isValid && (
                        <span className="Errormsg">
                          {validationState[mealTypeKey]?.errorMessage}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="Service">
                    <DropDown
                      selectedValues={selectedValues[index] || ""}
                      onSelect={(values) => handleSelect2(values, index)}
                      options={options2}
                      label="Service Area*"
                      index={index}
                      handleValidate={handleValidate}
                      onChange={(e) =>
                        handleServiceSelect2(
                          index,
                          e.target.value,
                          "DineInService"
                        )
                      }
                      onBlur={() => {
                        // validateDropdown(selectedValuesmealtype[index] || [], index)
                        handleValidate();
                      }}
                      // validation={validationState.NormalServiceArea}
                      width=""
                    />
                    {!validationState[DineInService]?.isValid && (
                      <span className="Errormsg">
                        {validationState[DineInService]?.errorMessage}
                      </span>
                    )}
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
                  Setup for specific days?
                  </h3>
                  <h3
                    className="dineInChooseDayContainer-chooseheading"
                    onClick={() => addDay(index)}
                  >
                    {entry.dayButtonText}
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
              {pickup ? (
                <div>
                  <div className="LabelPricePickup">
                    <LableComponent lable="Price*" />
                  </div>
                  <div className="PickupInput11Normal">
                    <input
                      type="text"
                      className="DineInInput1Normal"
                      value={formNormal.PickuppriceNormal}
                      onChange={(e) =>
                        setformNormal({
                          ...formNormal,
                          PickuppriceNormal: e.target.value,
                        })
                      }
                    ></input>
                    <div className="PrizeD">
                      <DropDown
                        selectedValues={selectedValues2}
                        onSelect={handleSelect3}
                        options={options3}
                        onBlur={() =>
                          validateDropdown(selectedValues2, "Pickup")
                        }
                        validation={validationState.Pickup}
                        label="Meal Type*"
                        width="Drop1"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="dineInChooseDayContainer">
                      {showDayPickup ? (
                        <h3 className="dineInChooseDayContainerHeading">
                          Back for default days
                        </h3>
                      ) : (
                        <h3 className="dineInChooseDayContainerHeading">
                          Setup for specific days?
                        </h3>
                      )}
                      {showDayPickup ? (
                        <h3
                          className="dineInChooseDayContainer-chooseheading"
                          onClick={addDayPickupfalse}
                        >
                          Default days
                        </h3>
                      ) : (
                        <h3
                          className="dineInChooseDayContainer-chooseheading"
                          onClick={addDayPickup}
                        >
                          Choose Day
                        </h3>
                      )}
                    </div>

                    <div className="dayspickup">
                      {showDayPickup ? (
                        <DaysCheck
                          checkedItems={DayPickup}
                          setCheckedItems={setDayPickup}
                          {
                            ...(availabilityid.length > 0
                              ? { id: availabilityid, setId: setAvailabilityid }
                              : { id: [], setId: () => {} }) // Provide default empty values if `availabilityid` is empty
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
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
            <div className= {online?"DeliverySectionNormal":"DeliverySectionNormalclose"} >
              {delivery ? (
                <div>
                  <p className="LabelPrice"> Price*</p>
                  <div className="DineInInput11Normal delivery">
                    <input
                      type="text"
                      className="DineInInput1Normal"
                      value={formNormal.DeliverypriceNormal}
                      onChange={(e) =>
                        setformNormal({
                          ...formNormal,
                          DeliverypriceNormal: e.target.value,
                        })
                      }
                    ></input>
                    <div className="DeliveryD">
                      <DropDown
                        selectedValues={selectedValues3}
                        onSelect={handleSelect4}
                        options={options4}
                        label="Meal Type*"
                        onBlur={() =>
                          validateDropdown(selectedValues3, "Delivery")
                        }
                        validation={validationState.Delivery}
                        width="Drop1"
                      />
                    </div>
                  </div>
                  <div className="dineInChooseDayContainer">
                    {showDayDelivery ? (
                      <h3 className="dineInChooseDayContainerHeading">
                        Back for default days
                      </h3>
                    ) : (
                      <h3 className="dineInChooseDayContainerHeading">
                        Setup for specific days?
                      </h3>
                    )}
                    {showDayDelivery ? (
                      <h3
                        className="dineInChooseDayContainer-chooseheading"
                        onClick={addDayDeliveryfalse}
                      >
                        Default days
                      </h3>
                    ) : (
                      <h3
                        className="dineInChooseDayContainer-chooseheading"
                        onClick={addDayDelivery}
                      >
                        Choose Day
                      </h3>
                    )}
                  </div>

                  <div className="dayspickup">
                    {showDayDelivery ? (
                      <DaysCheck
                        checkedItems={DayDelivery}
                        setCheckedItems={setDayDelivery}
                        {
                          ...(availabilityid.length > 0
                            ? { id: availabilityid, setId: setAvailabilityid }
                            : { id: [], setId: () => {} }) // Provide default empty values if `availabilityid` is empty
                        }
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

            <h1 className="ThirdDeliveryRelatedHeadingNormal">
              Third Party delivery
            </h1>
            <div>
              <div className="Delivery11">
                <DropDown
                  selectedValues={selectedthirdvalues}
                  onSelect={handleSelectThird}
                  options={optionsselectthird}
                  label="SwiggyZomato"
                  onBlur={() =>
                    validateDropdown(selectedthirdvalues, "SwiggyZomato")
                  }
                  validation={validationState.PickupSwiggy}
                  width="Drop1"
                />
              </div>
              {selectedthirdvalues.includes("Swiggy") && (
                <div className="LabelSwiggyInputDropDown">
                  <div className="LabelSwiggyInput">
                    <label className="swiggyZomatoHeading">Swiggy Price</label>
                    <input
                      className="swiggyZomato-input"
                      type="text"
                      // placeholder="Enter Swiggy details"
                      onChange={(e) =>
                        setformNormal({
                          ...formNormal,
                          SwiggyNormal: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="Third1">
                    <DropDown
                      selectedValues={selectedValues4}
                      onSelect={handleSelect5}
                      options={options4}
                      label="Meal Type*"
                      onBlur={() =>
                        validateDropdown(selectedValues3, "ThirdDelivery1")
                      }
                      validation={validationState.ThirdDelivery1}
                      width="Drop1"
                    />
                  </div>
                </div>
              )}
              {selectedthirdvalues.includes("Zomato") && (
                <div className="LabelSwiggyInputDropDown">
                  <div className="LabelSwiggyInput">
                    <label className="swiggyZomatoHeading">Zomato Price</label>
                    <input
                      className="swiggyZomato-input"
                      type="text"
                      // placeholder="Enter Zomato details"
                      onChange={(e) =>
                        setformNormal({
                          ...formNormal,
                          ZomatoNormal: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="Third2">
                    <DropDown
                      selectedValues={selectedValues5}
                      onSelect={handleSelect6}
                      options={options4}
                      label="Meal Type*"
                      onBlur={() =>
                        validateDropdown(selectedValues5, "ThirdDelivery2")
                      }
                      validation={validationState.ThirdDelivery2}
                      width="Drop1"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="dineInChooseDayContainer">
              {showDayThird ? (
                <h3 className="dineInChooseDayContainerHeading">
                  Back to Default days
                </h3>
              ) : (
                <h3 className="dineInChooseDayContainerHeading">
                  Setup for specific days?
                </h3>
              )}
              {showDayThird ? (
                <h3
                  className="dineInChooseDayContainer-chooseheading"
                  onClick={addDayThirdfalse}
                >
                  Default Days
                </h3>
              ) : (
                <h3
                  className="dineInChooseDayContainer-chooseheading"
                  onClick={addDayThird}
                >
                  Choose Day
                </h3>
              )}
            </div>
            {showDayThird ? (
              <DaysCheck
                checkedItems={DayThird}
                setCheckedItems={setDayThird}
                {
                  ...(availabilityid.length > 0
                    ? { id: availabilityid, setId: setAvailabilityid }
                    : { id: [], setId: () => {} }) // Provide default empty values if `availabilityid` is empty
                }
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Normalavail;
