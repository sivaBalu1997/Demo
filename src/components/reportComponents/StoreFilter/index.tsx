import React, { useRef, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { storeMockDataRequest } from 'redux/productCatalog/productCatalogActions';
// import { Contextpagejs } from 'pages/productCatalog/contextpage';
// import { useHistory } from 'react-router-dom';
import "./StoreFilter.scss";
import CustomDropdown from "components/common/customDropdown";
import ReportsRefreshButton from "../ReportsRefreshButton";
import CustomDatePicker from "pages/CategoryReport/CustomDatepicker";
import { DateObject } from "react-multi-date-picker";
import { useSelector } from "react-redux";

interface StoreFilterProps {
  selectedDate?: StoreOption;
  setSelectedDate?: (date: StoreOption) => void;
  selectedStore?: StoreOption;
  setSelectedStore?: (store: StoreOption) => void;
  datePickerApplyFunction?: any;
  dateDropdownFunction?: any;
  showDate?: boolean;
  showStore?: boolean;
  showRefresh?: boolean;
  handleRefreshClick?: () => void;
  storeOptions?: StoreOption[]
}
interface StoreOption {
  label: string;
  value: string;
}

const dateOptions: StoreOption[] = [
  { label: "Yesterday", value: "Yesterday" },
  { label: "Today", value: "Today" },
  { label: "This week", value: "This week" },
  { label: "This month", value: "This month" },
  { label: "This year", value: "This year" },
  { label: "Custom Date", value: "Custom Date" },
];

const StoreFilter = ({
  selectedDate,
  setSelectedDate = () => { },
  selectedStore,
  setSelectedStore = () => { },
  datePickerApplyFunction,
  dateDropdownFunction,
  handleRefreshClick = () => { },
  showDate = true,
  showStore = true,
  showRefresh = false,
  storeOptions = []
}: StoreFilterProps) => {
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const { storeList } = useContext(Contextpagejs);

  // const [selectedStore, setSelectedStore] = useState(null);

  // const onSelectStore = (store) => {
  //     setSelectedStore(store);
  //     dispatch(storeMockDataRequest(store.storeId));
  //     history.push(`/product-catalog?storeId=${store.storeId}`);
  // };

  const restaurantDetails = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.branch
  );

  const mappedIdWithBranchName: StoreOption[] = restaurantDetails?.map(
    (branchWithId: any) => ({
      value: branchWithId?.id,
      label: branchWithId?.locationName,
    })
  );

  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [rangeDateLabel, setRangeDateLabel] = useState("");
  const datePickerHandleOnChange: any = (dates: any): void => {
    setSelectedDates(dates);
  };
  const closeBtnOnclick = () => {
    setIsDateSelected(false);
    calendarRef.current?.closeCalendar();
    setSelectedDate(dateOptions[0]);
  };
  const applyBtnOnclick = () => {
    if (selectedDates.length === 2) {
      setIsDateSelected(true);
      // If the dates are not already DateObject instances, wrap them:
      const startDate =
        selectedDates[0] instanceof DateObject
          ? selectedDates[0]
          : new DateObject(selectedDates[0]);
      const endDate =
        selectedDates[1] instanceof DateObject
          ? selectedDates[1]
          : new DateObject(selectedDates[1]);

      if (datePickerApplyFunction != null && datePickerApplyFunction) {
        datePickerApplyFunction(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"));
      }
      calendarRef.current?.closeCalendar();

      setRangeDateLabel(
        `${startDate.format("MMM DD")} - ${endDate.format("MMM DD")}`
      );
    }
  };
  const calendarRef = useRef<any>(null);
  function formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const handleDateDropdownOnSelect = (option: StoreOption) => {
    const today = new Date();
    let from, to;
    if (option.value == "Yesterday") {
      from = to = new Date(today);
      from.setDate(today.getDate() - 1);
    } else if (option.value == "Today") {
      from = to = new Date(today);
    } else if (option.value == "This week") {
      from = new Date(today);
      from.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
      to = today;
    } else if (option.value == "This month") {
      from = new Date(today.getFullYear(), today.getMonth(), 1); // 1st of this month
      to = today;
    } else if (option.value == "This year") {
      from = new Date(today.getFullYear(), 0, 1); // 1st Jan of this year
      to = today;
    } else {
      from = to = today;
    }

    const formattedFromDate = formatDateToYYYYMMDD(from);
    const formattedToDate = formatDateToYYYYMMDD(to);

    if (dateDropdownFunction) {
      dateDropdownFunction(formattedFromDate, formattedToDate);
      console.log("formattedFromDate 1111", formattedFromDate);
      console.log("formattedToDate 1111", formattedToDate);
    }
    if (option.value == "Custom Date") {
      calendarRef.current?.openCalendar();
    } else {
      setIsDateSelected(false);
    }
    setSelectedDate(option);
  };
  return (
    <div className="reports-filters-section">
      <div className="category-store-name">
        <span>Store name</span>
        <h1>{selectedStore?.label || ""}</h1>
      </div>
      <div className="category-dropdown-container">
        {showDate ? (
          <div className="category-dropdown-sub-container">
            <span className="category-dropdown-text">Select date</span>
            <CustomDropdown
              onSelect={handleDateDropdownOnSelect}
              options={dateOptions}
              value={
                isDateSelected
                  ? {
                    value: "Custom Date",
                    label: `${rangeDateLabel != "" ? rangeDateLabel : "Custom Date"
                      }`,
                  }
                  : selectedDate
              }
              className="category-dropdown"
            />
            <CustomDatePicker
              containerClassName={"category-date-picker-container"}
              handleOnChange={datePickerHandleOnChange}
              datePickerContainerClassName="category-custom-datepicker-container"
              ref={calendarRef}
              applyBtnOnclick={applyBtnOnclick}
              closeBtnOnclick={closeBtnOnclick}
              className="category-custom-datepicker"
              render={<></>}
              arrowClassName="category-custom-datepicker-arrow"
              offsetY={-15}
            />
            {/* <Dropdown data={[{id:"1",name:"Princeton",option:"Princeton"}]} className={"category-dropdown"}/> */}
          </div>
        ) : null}
        {showStore ? (
          <div className="category-dropdown-sub-container">
            <span className="category-dropdown-text">Select store</span>
            <CustomDropdown
              onSelect={(option: StoreOption) => setSelectedStore(option)}
              options={mappedIdWithBranchName}
              value={selectedStore}
              className="category-dropdown"
            />
          </div>
        ) : null}

        {showRefresh ? (
          <div className="category-dropdown-sub-container">
            <span className="category-dropdown-text"> &nbsp;</span>
            <ReportsRefreshButton
              loader={false}
              onRefreshClick={handleRefreshClick}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StoreFilter;
