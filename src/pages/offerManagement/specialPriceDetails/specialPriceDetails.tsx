import React, { useEffect, useRef, useState } from "react";
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
  const history = useHistory()
  const dietaryData = useSelector(
    (state: any) => state.productCatalog.dietaryData.data
  );
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
  const [dataDietaryType, setDataDietaryType] = useState([]);
  const [DropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({
    channel: false,
    ordertype: false,
    terms: false,
    category: false,
    subCategory: false,
    fooditems: false,
  });
  const [loading, setLoading] = useState(true);
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
      specialTypeName: "",
      specialType: "",
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
  const [selectedFrom, setSelectedFrom] = useState("AM");
  const [selectedTo, setSelectedTo] = useState("AM");
  const [selectedFoodItems, setselectedFoodItems] = useState([]);
  const datePickerRef = useRef<any | null>(null);
  const datePickerRef1 = useRef<any | null>(null);

  const selecteFoodItems = [
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
  ];
  const handleonclick = () => {
    const values = getValues();
    console.log("Current form values:", values);

    trigger();
    dispatch(OfferDataSendingRequest(values));
  };
  // const offerdata = useSelector(
  //   (state: any) => state.offer.OfferDataSendingRequest
  // );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
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
  const [showlistOfItems, setShowlistOfItems] = useState(false);
  const [overlapShow, setOverlapShow] = useState(false);
  const [highlighted, setHighlighted] = useState<any>();
  const selectedValue = watch("specialTypeName");
  const handleItemClick = (index: number, item: any) => {
    setHighlighted(index);
    setOverlapShow(true);
    setselectedFoodItems((prev: any) => {
      const exists = prev.some((food: any) => food.id === item.id);

      if (exists) {
        return prev.filter((food: any) => food.id !== item.id);
      } else {
        return [
          ...prev,
          {
            id: item.id,
            itemName: item.itemName,
            originalPrice: item.originalPrice,
            updatedPrice: item.updatedPrice,
            available: item.available,
          },
        ];
      }
    });
  };

  useEffect(() => {
    setValue("selectedFooditems", selectedFoodItems);
    console.log("44", getValues("selectedFooditems"));
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

  const closeOverlapPopUp = () => {
    setOverlapShow(false);
  };
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

  return (
    <div className="offer-creationpage">
      <SidePanel />
      <>
        <div className="offer-creationpage-container">
          <div className="specialoffer-heading">
            <h1>Create Special Price Details</h1>
          </div>

          <div className="specialprice-container">
            <div className="offer-primary-details">
              <h3>Primary Details</h3>
            </div>

            <div className="offer-primary-part1">
              <div>
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
              <div className="selectChannel">
                <Controller
                  name="offerChannel"
                  control={control}
                  render={({ field }: any) => (
                    <Dropdown
                      options={dietaryData}
                      type="checkbox"
                      setOptions={setDataDietaryType}
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
                      addNew={true}
                      editValues={true}
                      dropDownType="DIET"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="offerToVisible"
                  control={control}
                  render={({ field }: any) => (
                    <Dropdown
                      options={dietaryData}
                      type="checkbox"
                      setOptions={setDataDietaryType}
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
                      addNew={true}
                      editValues={true}
                      dropDownType="DIET"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="termsAndConditions"
                  control={control}
                  render={({ field }: any) => (
                    <Dropdown
                      options={dietaryData}
                      type="checkbox"
                      setOptions={setDataDietaryType}
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
                      dropDownType="DIET"
                    />
                  )}
                />
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
              <div>
                <Controller
                  name="specialTypeValue"
                  control={control}
                  rules={{ required: "specialTypeValue is required" }}
                  render={({ onChange, onBlur, value }: any) => (
                    <InputComponent
                      name="specialTypeValue"
                      onChange={onChange}
                      onBlur={onBlur}
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
                        options={dietaryData}
                        type="checkbox"
                        setOptions={setDataDietaryType}
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
                        addNew={true}
                        editValues={true}
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
                        options={dietaryData}
                        type="checkbox"
                        setOptions={setDataDietaryType}
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
                        addNew={true}
                        editValues={true}
                        dropDownType="DIET"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="select-offerfooditems">
                <div className="seraching-for-items">
                  <div>
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
                            className={`${
                              index === highlighted && "highlighted"
                            } selectedlist`}
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
                          />
                        </td>
                        <td className="offer-table-data toggle-icon-data">
                          <Toggle toggle={item.available} togglecolor="white" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
                              ref={datePickerRef}
                              className="offerdatePicker-special"
                            />
                            <img
                              src={calender}
                              className="calender-img-offer"
                              onClick={handleImageClick}
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
                              className="offerdatePicker"
                            />
                            <img
                              src={calender}
                              className="calender-img1-offer"
                              onClick={handleImageClick2}
                            ></img>
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

                      <div></div>
                    </div>
                  </div>
                )}
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
                                    (formattedValue && formattedValue[1]) || "";
                                  const minutes =
                                    (formattedValue && formattedValue[2]) || "";

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
                                    (formattedValue && formattedValue[1]) || "";
                                  const minutes =
                                    (formattedValue && formattedValue[2]) || "";

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

                <div className="checkeddays">
                  <DaysCheck
                    checkedItems={DayThird}
                    setCheckedItems={setDayThird}
                    setId={setAvailabilityid}
                    setValue={setValue}
                    getValues={getValues}
                    valueName="AvailableDays"
                    register={register}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="saveandcancel-btn-offer">
            <button className="cancel-btn" onClick={() => history.push('/Offers/active')}>cancel</button>
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
