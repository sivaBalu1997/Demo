import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import Toggle from "../Toggle/Toggle";
import "./Specialvail.scss";
import DaysCheck from "../DayCheck/DaysCheck";
import "react-datepicker/dist/react-datepicker.css";
import calender from "../../../assets/images/calendar 1.png";
import DropDown3 from "../DropDown3/DropDown3";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import React from "react";
import Dropdown from "../DropDown/Dropdown";

import DropDown2 from "../DropDown2/DropDown2";

type MainFormSpecial ={
  form1: FormState;
  dineinfields: DineInField[];
  specialcheck: number[] // Single number, not an array
  fromDate: string|Date | undefined; // Allow undefined if needed; // Should be Date, not string
  toDate: string|Date | undefined; // Allow undefined if needed; // Should be Date, not string
  selectedValuespickup: string[];
  selectedValuesdelivery: string[];
  Swiggy: string[];
  Zomato: string[];
  Availabilityid: string[];
}

interface FormState {
  Pickupprice?: string;
  Pickupmealtype?: string;
  Deliveryprice?: string;
  Deliverymealtype?: string;
  Swiggyorzomato: string;
  Swiggy?: string;
  Swiggymealtype?: string;
  Zomato?: string;
  Zomatomealtype?: string;
  Inventory1?: string;
  Inventory2?: string;
  
}
type MealType = string[];
type SelectedValuesMealTypeState = MealType[];
interface SpecialAvailProps {
  getSpecialForm: (form: any) => void;
  validateDropdown: (value: string[], key: string | number) => void; // Expecting only string[] for value
  validationState: Record<
    string | number,
    { isValid: boolean; errorMessage: string }
  >;
  setMainFormSpecial: React.Dispatch<React.SetStateAction<MainFormSpecial>>|any;
    mainFormSpecial:any
}

type DineInField = {
  DineInPrice: string | string[];
  DineInMealType: string | string[];
  DineInServiceArea: string | string[];
};
interface SelectedValuesState {
  [key: number]: any; // Replace `any` with the actual type of `values`
}
const Specialavail: React.FC<SpecialAvailProps> = ({
  getSpecialForm,
  validateDropdown,
  validationState,
  setMainFormSpecial,
  mainFormSpecial
}) => {
  const [dinein, setDineIn] = useState(true);
  const [online, setOnline] = useState(false);
  const [pickup, setPickup] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [dineinentry, setDineInEntry] = useState<string[]>([""]);
  const [specialcheck, setSpecialcheck] = useState<number[]>([]);
  const [dateValue, setDateValue] = useState("7/1/24");
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [selectedValues1, setSelectedValues1] =
    useState<SelectedValuesMealTypeState>([]);
  const [options3, setOptions3] = useState<string[]>([
    "Breakfast",
    "Lunch",
    "Dinner",
  ]);
  const [selectedValuespickup, setSelectedValuesPickup] = useState<string[]>(
    []
  );
  const [optionspick, setOptionsPick3] = useState<string[]>([
    "Breakfast",
    "Lunch",
    "Dinner",
  ]);
  const [selectedValuesdelivery, setSelectedValuesDelivery] = useState<
    string[]
  >([]);
  const [optionsdelivery, setOptionsDelivery] = useState<string[]>([
    "Breakfast",
    "Lunch",
    "Dinner",
  ]);
  const [selectedValuesthird1, setSelectedValuesThird1] = useState<string[]>(
    []
  );
  const [optionsthird1, setOptionsThird1] = useState<string[]>([
    "Breakfast",
    "Lunch",
    "Dinner",
  ]);
  const [selectedValuesthird2, setSelectedValuesThird2] = useState<string[]>(
    []
  );
  const [optionsthird2, setOptionsThird2] = useState<string[]>([
    "Breakfast",
    "Lunch",
    "Dinner",
  ]);
  const [selectedValuesMealType, setSelectedValuesMealType] =
    useState<SelectedValuesMealTypeState>([]);
  const [optionsmealtype, setOptionsMealType] = useState<string[]>([
    "Breakfast",
    "Lunch",
    "Dinner",
  ]);

  const datePickerRef = useRef<any | null>(null);
  const datePickerRef1 = useRef<any | null>(null);
  const prizingDetail = useSelector(
    (state: any) => state?.PricingDetailReducer?.prizingData?.mainForm
  );
  const [availabilityid1, setAvailabilityid1] = useState<string[]>([]);

  const [form1, setForm] = useState<FormState>({
    Pickupprice: "",
    Pickupmealtype: "",
    Deliveryprice: "",
    Deliverymealtype: "",
    Swiggyorzomato: "",
    Swiggy: "",
    Swiggymealtype: "",
    Zomato: "",
    Zomatomealtype: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(null);

  const fromDate = selectedDate?.toString();
  const toDate = selectedDate1?.toString();

  const [dineinfields, setDineInFields] = useState<DineInField[]>([
    {
      DineInPrice: "",
      DineInMealType: "",
      DineInServiceArea: "",
    },
  ]);
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newEntries = [...dineinfields];
    newEntries[index][e.target.name as keyof DineInField] = e.target.value;
    setDineInFields(newEntries);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date); // Keep date as Date object
  };

  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date); // Keep date as Date object
  };

  const payLoad = {
    form1,
    dineinfields,
    specialcheck: specialcheck,
    fromDate,
    toDate,
    selectedValuespickup: selectedValuespickup,
    selectedValuesdelivery: selectedValuesdelivery,
    Swiggy: selectedValuesthird1,
    Zomato: selectedValuesthird2,
    Availabilityid: availabilityid1,
  };
  
  useEffect(() => {
    if (JSON.stringify(mainFormSpecial) !== JSON.stringify(payLoad)) {
      setMainFormSpecial(payLoad);
    }
  }, [payLoad]); 

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

  const handleSelect3 = (value: MealType, index: number) => {
    // Ensure new selected values are an array of MealType arrays
    const newSelectedValues: SelectedValuesMealTypeState = [
      ...selectedValuesMealType,
    ];
    newSelectedValues[index] = value;
    setSelectedValuesMealType(newSelectedValues);

    // Update the dine-in fields with the selected value
    const newDineInFields = [...dineinfields];
    newDineInFields[index] = {
      ...newDineInFields[index],
      DineInServiceArea: value,
    };
    setDineInFields(newDineInFields);

    // Validate the dropdown immediately after selection
    validateDropdown(newSelectedValues[index], index);
  };

  const addOption3 = (newOption: string) => {
    setOptions3([...options3, newOption]);
  };

  const handleSelectpick = (value: string[]) => {
    setSelectedValuesPickup(value);
    validateDropdown(selectedValuespickup, "Pickupspecial");
  };

  const addOptionpickup = (newOption: string) => {
    setOptionsPick3([...optionspick, newOption]);
  };

  const handleSelectdelivery = (value: string[]) => {
    setSelectedValuesDelivery(value);
    validateDropdown(selectedValuesdelivery, "Deliveryspecial");
  };

  const addOptiondelivery = (newOption: string) => {
    setOptionsDelivery([...optionsdelivery, newOption]);
  };

  const handleSelectThird1 = (value: string[]) => {
    setSelectedValuesThird1(value);
    validateDropdown(selectedValuesthird1, "Deliveryspecial1");
  };

  const addOptionThird1 = (newOption: string) => {
    setOptionsThird1([...optionsthird1, newOption]);
  };

  const handleSelectThird2 = (value: string[]) => {
    setSelectedValuesThird2(value);
    validateDropdown(selectedValuesthird2, "Deliveryspecial2");
  };

  const addOptionThird2 = (newOption: string) => {
    setOptionsThird2([...optionsthird2, newOption]);
  };

  const handleSelectMealtype = (value: MealType, index: number) => {
    const newSelectedValues = [...selectedValues1];
    newSelectedValues[index] = value;
    setSelectedValues1(newSelectedValues);

    const newArray = [...dineinfields];
    newArray[index].DineInMealType = value; // Assign a single string value
    setDineInFields(newArray);
  };

  const handleSelectService = (index: number, value: MealType) => {
    const newSelectedValues = [...selectedValues1];
    newSelectedValues[index] = value;
    setSelectedValues1(newSelectedValues);

    const newarrary = [...dineinfields];
    newarrary[index].DineInServiceArea = value;
    setDineInFields(newarrary);
  };

  // const addOptionMealType = (newOption) => {
  //   setOptionsMealType([...optionsmealtype, newOption]);
  // };

  const handleDelete = (index: number) => {
    const newEntries = dineinfields.filter((_, i) => i !== index);
    setDineInFields(newEntries);

    const newSelectedValues1 = [...selectedValues1];
    newSelectedValues1.splice(index, 1);
    setSelectedValues1(newSelectedValues1);

    const newSelectedValuesMealtype = [...selectedValuesMealType];
    newSelectedValuesMealtype.splice(index, 1);
    setSelectedValuesMealType(newSelectedValuesMealtype);
  };

  // Add a new empty value for the new field
  const AddDineInEntry = () => {
    setDineInEntry([...dineinentry, ""]); // Add an empty string or another appropriate string value
    setDineInFields([
      ...dineinfields,
      { DineInPrice: "", DineInMealType: [], DineInServiceArea: [] },
    ]);
  };

  useEffect(() => {
    if (prizingDetail) {
      setSelectedDate(prizingDetail?.specialForm?.fromDate || "");
      setSelectedDate1(prizingDetail?.specialForm?.toDate || "");
      setSpecialcheck(prizingDetail?.specialForm?.specialcheck || "");
      setForm({
        Pickupprice: prizingDetail?.specialForm?.form?.Pickupprice || "",
        Pickupmealtype: "",
        Deliveryprice: prizingDetail?.specialForm?.form?.Deliveryprice || "",
        Deliverymealtype: "",
        Swiggyorzomato: prizingDetail?.specialForm?.form?.Swiggyorzomato || "",
        Swiggy: prizingDetail?.specialForm?.form?.Swiggy || "",
        Swiggymealtype: "",
        Zomato: prizingDetail?.specialForm?.form?.Zomato || "",
        Zomatomealtype: "",
      });

      setSelectedValuesPickup(prizingDetail?.specialForm?.selectedValuespickup);
      setSelectedValuesDelivery(
        prizingDetail?.specialForm?.selectedValuesdelivery
      );
      setSelectedValuesThird1(prizingDetail?.specialForm?.Swiggy);
      setSelectedValuesThird2(prizingDetail?.specialForm?.Zomato);

      const updated = prizingDetail?.specialForm?.dineinfields.map(
        (item: DineInField) => ({
          DineInPrice: item?.DineInPrice || "",
          DineInMealType: item?.DineInMealType || [],
          DineInServiceArea: item?.DineInServiceArea || [],
        })
      );
      setDineInFields(updated);

      const initialSelectedValues =
        prizingDetail?.specialForm?.dineinfields.updated.map(
          (item: DineInField) => item.DineInMealType
        );
      setSelectedValuesMealType(initialSelectedValues);

      const initialSelectedValues2 =
        prizingDetail?.specialForm?.dineinfields.updated.map(
          (item: DineInField) => item.DineInServiceArea
        );
      setSelectedValues1(initialSelectedValues2);
      setDineIn(true);
    }
  }, []);

  return (
    <div>
      <h1 className="AvailableDaysHeading" style={{ marginTop: "40px" }}>
        Available days
      </h1>
      <div className="Date_container">
        <div className="calenderComponent">
          <div className="date-picker-container">
            <DatePicker
              placeholderText="7/1/2034" // Placeholder text for the date picker
              dateFormat="MM/dd/yyyy"
              selected={selectedDate}
              onChange={handleDateChange} // Date format for display
              ref={datePickerRef}
              className="datePicker"
            />
          </div>
          <img src={calender} className="calender" onClick={handleImageClick} />
        </div>

        <div className="calenderComponent">
          <div className="date-picker-container">
            <DatePicker
              selected={selectedDate1}
              onChange={handleDateChange1}
              placeholderText="7/1/2034" // Placeholder text for the date picker
              dateFormat="yyyy-MM-dd" // specify the format you want
              showPopperArrow
              ref={datePickerRef1}
              className="datePicker"
            />
          </div>
          <img
            src={calender}
            className="calender1"
            onClick={handleImageClick2}
          ></img>
        </div>
      </div>
      <div className="dayschecking">
        <DaysCheck
          checkedItems={specialcheck}
          setCheckedItems={setSpecialcheck}
          id={availabilityid1}
          setId={setAvailabilityid1}
        />
      </div>

      <h1 className="KitchenRelatedHeading">Avaliable Service Streams</h1>
      {/* DineIn Related */}
      <div className="DineInRelatedSpecial">
        <h1 className="DineInRelatedHeading">Dine In</h1>
        <div className="toggleDinein">
          <Toggle toggle={dinein} setToggle={setDineIn} />
        </div>
      </div>
      {dinein ? (
        <>
          {dineinfields &&
            dineinfields.map((item, index) => (
              <div
                className="DineInInput11Special"
                style={{ zIndex: dineinfields.length - index }}
              >
                <p className="LabelSpecialPrice">Price*</p>
                <input
                  type="text"
                  name="DineInPrice"
                  value={item.DineInPrice}
                  className="DineInInput1"
                  onChange={(e) => handleChange(index, e)}
                />
                <div className="DropD4">
                  <Dropdown
                    key={index}
                    selectedValues={selectedValuesMealType[index] || []}
                    onSelect={(value) => handleSelect3(value, index)}
                    options={options3}
                    label="Meal Type*"
                    onBlur={() =>
                      validateDropdown(
                        selectedValuesMealType[index] || [],
                        index
                      )
                    }
                    width="Drop1"
                    validation={
                      validationState[index] || {
                        isValid: true,
                        errorMessage: "",
                      }
                    }
                  />
                </div>
                <div className="SpecialDropDown">
                  <Dropdown
                    key={index}
                    selectedValues={selectedValues1[index] || ""}
                    onSelect={(value) => handleSelectMealtype(value, index)}
                    options={options3}
                    label="Service Area*"
                    width="Drop2"
                    validation={
                      validationState[index] || {
                        isValid: true,
                        errorMessage: "",
                      }
                    }
                  />
                </div>
                <h1
                  onClick={() => handleDelete(index)}
                  className="DeleteSpecial"
                >
                  - Delete
                </h1>
              </div>
            ))}

          <h1
            className={`${
              dineinfields.length
                ? "AddentrySpecial"
                : "AddentrySpecialOnToggle"
            }`}
            onClick={AddDineInEntry}
          >
            {" "}
            + Add entry
          </h1>
        </>
      ) : (
        ""
      )}
      {/* OnlineRelated */}
      <div className="OnlineRelated">
        <h1 className="OnlineRelatedHeading">Online</h1>
        <div className="toggleIII">
          <Toggle toggle={online} setToggle={setOnline} />
        </div>
      </div>
      <div className="OnlineSection">
        {online ? (
          <div>
            {/* PickupRelated */}
            <div className="PickupRelated">
              <h1 className="PickupRelatedHeading">Pick Up</h1>
              <div className="toggleIV">
                <Toggle toggle={pickup} setToggle={setPickup} />
              </div>
            </div>
            <div className="PickupSection">
              {pickup ? (
                <div>
                  <p className="LabelPriceSpecial"> Price*</p>
                  <div className="PickupInput11">
                    <input
                      type="text"
                      className="DineInInput1"
                      value={form1.Pickupprice}
                      onChange={(e) =>
                        setForm({ ...form1, Pickupprice: e.target.value })
                      }
                    ></input>
                    <div className="PickDrop5">
                      <Dropdown
                        selectedValues={selectedValuespickup}
                        onSelect={handleSelectpick}
                        options={optionspick}
                        label="Meal Type*"
                        width="Drop1"
                        onBlur={() =>
                          validateDropdown(
                            selectedValuespickup,
                            "Pickupspecial"
                          )
                        }
                        validation={validationState.Pickupspecial}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* DeliveryRelated    */}
            <div className="DeliveryRelated">
              <h1 className="DeliveryRelatedHeading">Delivery</h1>
              <div className="toggleV">
                <Toggle toggle={delivery} setToggle={setDelivery} />
              </div>
            </div>
            <div className="DeliverySection">
              {delivery ? (
                <div>
                  <p className="DelLabelPrice"> Price*</p>
                  <div className="Delivery11">
                    <input
                      type="text"
                      className="DineInInput1"
                      value={form1.Deliveryprice}
                      onChange={(e) =>
                        setForm({ ...form1, Deliveryprice: e.target.value })
                      }
                    ></input>
                    <div className="DelDrop">
                      <Dropdown
                        selectedValues={selectedValuesdelivery}
                        onSelect={handleSelectdelivery}
                        options={optionsdelivery}
                        label="Meal Type*"
                        onBlur={() =>
                          validateDropdown(
                            selectedValuespickup,
                            "Deliveryspecial"
                          )
                        }
                        validation={validationState.Deliveryspecial}
                        width="Drop1"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <h1 className="ThirdDeliveryRelatedHeading">
              Third Party delivery
            </h1>
            <div>
              <p className="LabelPrice1"> Swiggy,Zomato*</p>
              <div className="Delivery11">
                <input
                  type="text"
                  className="DeliveryInput2"
                  value={form1.Swiggyorzomato}
                  onChange={(e) =>
                    setForm({ ...form1, Swiggyorzomato: e.target.value })
                  }
                ></input>
              </div>
              <p className="LabelPriceSwiggy"> Swiggy*</p>
              <div className="Delivery11  thirdparty ">
                <input
                  type="text"
                  className="DineInInput1"
                  value={form1.Swiggy}
                  onChange={(e) => setForm({ ...form1, Swiggy: e.target.value })}
                ></input>
                <div className="Third1Special">
                  <Dropdown
                    selectedValues={selectedValuesthird1}
                    onSelect={handleSelectThird1}
                    options={optionsthird1}
                    width="Drop1"
                    onBlur={() =>
                      validateDropdown(selectedValuesthird1, "Deliveryspecial1")
                    }
                    validation={validationState.Deliveryspecial1}
                    label="Meal Type*"
                  />
                </div>
              </div>
              <p className="LabelPriceSwiggy"> Zomato*</p>
              <div className="Delivery11 thirdparty">
                <input
                  type="text"
                  className="DineInInput1"
                  value={form1.Zomato}
                  onChange={(e) => setForm({ ...form1, Zomato: e.target.value })}
                ></input>
                <div className="Third2">
                  <Dropdown
                    selectedValues={selectedValuesthird2}
                    onSelect={handleSelectThird2}
                    options={optionsthird2}
                    width="Drop1"
                    onBlur={() =>
                      validateDropdown(selectedValuesthird2, "Deliveryspecial2")
                    }
                    validation={validationState.Deliveryspecial2}
                    label="MealType"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Specialavail;
