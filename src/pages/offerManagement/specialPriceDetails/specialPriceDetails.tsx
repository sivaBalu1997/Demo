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
import { AnyAaaaRecord } from "dns";
import { OfferDataSendingRequest } from "redux/offer/offerActions";
import calender from "../../../assets/images/calendar 1.png";
import Overlap from "components/offerManagement/Overlapping/Overlap";
import { useHistory } from "react-router-dom";
import { Contextpagejs } from "pages/productCatalog/contextpage";

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
}

const SpecialPriceDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isExpanded } = useContext(Contextpagejs);
  const dietaryData = useSelector(
    (state: any) => state.productCatalog.dietaryData.data
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
      type: "D",
      parentId: "",
      canDelete: false,
    },
    {
      id: "2",
      name: "Thired Party",
      locationId: "",
      type: "D",
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
      id: "3",
      name: "Merchant",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
  ];

  const termsOption = [
    {
      id: "1",
      name: "Term1",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
    {
      id: "3",
      name: "Term2",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
  ];

  const catagoryOption = [
    {
      id: "1",
      name: "Veg",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
    {
      id: "2",
      name: "Non-veg",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
    {
      id: "3",
      name: "Vegan",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
    {
      id: "2",
      name: "Butter",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
  ];

  const subCatagoryOption = [
    {
      id: "1",
      name: "Veg-sub",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
    {
      id: "2",
      name: "Non-veg",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
    {
      id: "3",
      name: "Vegan-sub",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
    {
      id: "2",
      name: "Butter-sub",
      locationId: "",
      type: "D",
      parentId: "",
      canDelete: false,
    },
  ];

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(null);
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

  const [channal, setChannal] = useState([]);
  const [vissibleTo, setvissibleTo] = useState([]);
  const [terms, setterms] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [subCatagory, setSubCatagory] = useState([]);
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

  const [selecteFoodItems, setselecteFoodItems] = useState([
    {
      id: 1,
      itemName: "Parotta",
      originalPrice: "$100.00",
      updatedPrice: "$50.00",
      available: true,
    },
    {
      id: 2,
      itemName: "Briyani",
      originalPrice: "$100.00",
      updatedPrice: "$50.00",
      available: false,
    },
    {
      id: 3,
      itemName: "Tandoori",
      originalPrice: "$100.00",
      updatedPrice: "$50.00",
      available: true,
    },
    {
      id: 4,
      itemName: "Mutton Dum Biriyani",
      originalPrice: "$100.00",
      updatedPrice: "$50.00",
      available: false,
    },
    {
      id: 5,
      itemName: "Tandoori",
      originalPrice: "$100.00",
      updatedPrice: "$50.00",
      available: true,
    },
    {
      id: 6,
      itemName: "Mutton Dum Biriyani",
      originalPrice: "$100.00",
      updatedPrice: "$50.00",
      available: false,
    },
    {
      id: 7,
      itemName: "Tandoori",
      originalPrice: "$100.00",
      updatedPrice: "$50.00",
      available: true,
    },
    {
      id: 8,
      itemName: "Mutton Dum Biriyani",
      originalPrice: "$100.00",
      updatedPrice: "$50.00",
      available: false,
    },
  ]);

  const handleonclick = () => {
    const values = getValues();
    trigger();
    dispatch(OfferDataSendingRequest(values));
    setOverlapShow(true);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedDate1(null);
    setValue("fromDate", date);
  };
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
    setValue("toDate", date);
  };

  const selectedradiowatch = watch();
  const handleFromToTime = (value: string, timePeriod: string) => {
    let currentTime = String(getValues(`${value}`));
    currentTime = currentTime.replace(/\s?(AM|PM)$/i, "").trim();
    const timeRegex = /^([01]?\d|2[0-3]):[0-5]\d$/;
    if (timeRegex.test(currentTime)) {
      const timeWithPeriod = `${currentTime} ${timePeriod}`.trim();
      console.log({ timeWithPeriod });
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
    const exists = data.some((food: any) => food.id === item.id);

    if (exists) {
      data1 = data.filter((food: any) => food.id !== item.id);
    } else {
      data1 = [
        ...data,
        {
          id: item.id,
          itemName: item.itemName,
          originalPrice: item.originalPrice,
          updatedPrice: item.updatedPrice,
          available: item.available,
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
    }
  }

  const applyOffer = (type: any, name: any, value: any, item: any) => {
    console.log(type, name, value);
    const data: any = item.map((item: any) => {
      const originalPrice = parseFloat(item.originalPrice.replace("$", ""));
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
        updatedPrice: `$${updatedPrice.toFixed(2)}`,
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
    const data = selectedFoodItems.filter((item: any) => item?.id !== id);
    console.log({ data });
    setselectedFoodItems(data);
  };

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
                          options={channelOption}
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
                          dropDownType="DIET"
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
                        error={errors.offerToVisible}
                        dropdownopen={DropdownOpen.ordertype}
                        onToggle={() => handleDropdownToggle("ordertype")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={false}
                        editValues={false}
                        dropDownType="DIET"
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
                        options={termsOption}
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
                        addNew={false}
                        editValues={false}
                        dropDownType="DIET"
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
                        dropDownType="DIET"
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
                        dropDownType="DIET"
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
                      onClick={() => setShowlistOfItems(!showlistOfItems)}
                    />
                  </div>
                </div>
                <div>
                  {showlistOfItems && (
                    <div className="searched-items-listed" ref={listpopupRef}>
                      <ul className="listing-selected-items">
                        {selecteFoodItems.map((item: any, index: number) => (
                          <li
                            key={index}
                            className={`selectedlist ${
                              selectedFoodItems.some(
                                (food: any) => food.id === item.id
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
                              onClick={() => handleDelete(item?.id)}
                            />
                          </td>
                          <td className="offer-table-data toggle-icon-data">
                            <Toggle
                              toggle={item.available}
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
                              onChange={handleDateChange}
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
                      <div></div>
                    </div>
                    To
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
                              onChange={handleDateChange1}
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
                      <div></div>
                    </div>
                  </div>
                )}

                <div className="timeContainer">
                  <h4 className="Time-heading">Time</h4>
                  <div className="time-format">
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
                                if (/^[0-9:]*$/.test(inputValue)) {
                                  if (inputValue.length <= 5) {
                                    const formattedValue = inputValue
                                      .replace(/[^0-9]/g, "")
                                      .match(/(\d{0,2})(\d{0,2})?/);

                                    const hours =
                                      (formattedValue && formattedValue[1]) ||
                                      "";
                                    const minutes =
                                      (formattedValue && formattedValue[2]) ||
                                      "";

                                    const formattedTime = [hours, minutes]
                                      .filter(Boolean)
                                      .join(":");

                                    onChange(formattedTime);
                                  }
                                }
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
                    To
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
                                    const minutes =
                                      (formattedValue && formattedValue[2]) ||
                                      "";

                                    const formattedTime = [hours, minutes]
                                      .filter(Boolean)
                                      .join(":");

                                    onChange(formattedTime);
                                  }
                                }
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
                            // Validate hh:mm format
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
