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

interface StoreFilterProps {
  selectedDate?: StoreOption;
  setSelectedDate?: (date: StoreOption) => void;
  selectedStore?: StoreOption;
  setSelectedStore?: (store: StoreOption) => void;
  datePickerApplyFunction?: any;
  showDate?: boolean;
  showStore?: boolean;
  showRefresh?: boolean;
  handleRefreshClick?: () => void;
}
interface StoreOption {
  label: string;
  value: string;
}

const dateOptions: StoreOption[] = [
  { label: "Yesterday", value: "Yesterday" },
  { label: "This week", value: "This week" },
  { label: "This month", value: "This month" },
  { label: "This year", value: "This year" },
  { label: "Custom Date", value: "Custom Date" },
];

const storeOptions: StoreOption[] = [
  { label: "A2B Princeton", value: "A2B Princeton" },
  { label: "A2B Store 2", value: "A2B Store 2" },
  { label: "A2B Store 3", value: "A2B Store 3" },
  { label: "A2B Store 4", value: "A2B Store 4" },
];
const StoreFilter = ({
  selectedDate,
  setSelectedDate = () => {},
  selectedStore,
  setSelectedStore = () => {},
  datePickerApplyFunction,
  handleRefreshClick = () => {},
  showDate = true,
  showStore = true,
  showRefresh = false,
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
        datePickerApplyFunction(startDate, endDate);
      }
      calendarRef.current?.closeCalendar();

      setRangeDateLabel(
        `${startDate.format("MMM DD")} - ${endDate.format("MMM DD")}`
      );
    }
  };
  const calendarRef = useRef<any>(null);
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
              onSelect={(option: StoreOption) => {
                if (option.value == "Custom Date") {
                  calendarRef.current?.openCalendar();
                } else {
                  setIsDateSelected(false);
                }
                setSelectedDate(option);
              }}
              options={dateOptions}
              value={
                isDateSelected
                  ? {
                      value: "Custom Date",
                      label: `${
                        rangeDateLabel != "" ? rangeDateLabel : "Custom Date"
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
              options={storeOptions}
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
