import React, { forwardRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import "./datePicker.scss"; // Your custom styles
import "react-multi-date-picker/styles/layouts/mobile.css"; // Mobile-friendly layout

// Define the interface for the props you want to pass:
export interface CustomDatePickerProps {
  render?: any;
  className?: string;
  datePickerContainerClassName?: string;
  monthYearSeparator?: string;
  inputMode?: string;
  themeColor?: string;
  closeBtnOnclick?: () => void;
  applyBtnOnclick?: () => void;
  handleOnChange?: () => void;
  containerClassName?: string;
  arrowClassName?: string;
  offsetY?: number;
  selectedDates?: any;
}

// forwardRef will allow an optional ref to be passed. If none is provided, ref is undefined.
const CustomDatePicker = forwardRef<HTMLDivElement, CustomDatePickerProps>(
  (
    {
      render,
      className = "",
      datePickerContainerClassName = "",
      monthYearSeparator = " ",
      inputMode = "",
      themeColor = "red ",
      closeBtnOnclick,
      applyBtnOnclick,
      handleOnChange,
      containerClassName = "",
      arrowClassName = "",
      offsetY,
      selectedDates,
    },
    ref
  ) => {
    // const [selectedDates, setSelectedDates] = useState<any[]>([]);

    // const handleApply = (dates: any) => {
    //   console.log("Applied Dates:", dates);
    //   setSelectedDates(dates);
    // };

    // const handleCancel = () => {
    //   console.log("Canceled");
    //   setSelectedDates([]);
    // };

    return (
      <div className={containerClassName}>
        <DatePicker
          ref={ref as React.MutableRefObject<any>}
          arrowClassName={arrowClassName}
          value={selectedDates}
          containerClassName={datePickerContainerClassName}
          onChange={handleOnChange}
          range
          sort
          inputMode={inputMode}
          offsetY={offsetY}
          render={render}
          format="MMM DD YYYY"
          monthYearSeparator={monthYearSeparator}
          numberOfMonths={2} // Display two months side by side
          className={`${themeColor} ${className}`}
        >
          <div className="datepicker-footer">
            <button
              type="button"
              className="datepicker-btn datepicker-cancel-btn"
              onClick={closeBtnOnclick}
            >
              Cancel
            </button>
            <button
              type="button"
              className="datepicker-btn datepicker-apply-btn"
              onClick={applyBtnOnclick}
            >
              Apply
            </button>
          </div>
        </DatePicker>
      </div>
    );
  }
);

export default CustomDatePicker;
