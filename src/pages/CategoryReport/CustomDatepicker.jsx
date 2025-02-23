import React, { forwardRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import "./datePicker.scss"; // Your custom styles
import "react-multi-date-picker/styles/layouts/mobile.css"; // Mobile-friendly layout

// Wrap the component using forwardRef.
// If no ref is provided, ref remains undefined but the component works normally.
const CustomDatePicker = forwardRef(
  (
    {
      render,
      className,
      datePickerContainerClassName,
      monthYearSeparator = " ",
      inputMode = false,
      themeColor = "red ",
      closeBtnOnclick,
      applyBtnOnclick,
      containerClassName,
      arrowClassName,offsetY
    },
    ref
  ) => {
    const [selectedDates, setSelectedDates] = useState([]);

    const handleApply = (dates) => {
      console.log("Applied Dates:", dates);
      setSelectedDates(dates);
    };

    const handleCancel = () => {
      console.log("Canceled");
      setSelectedDates([]);
    };

    return (
      <div className={containerClassName}>
        <DatePicker
          ref={ref}
          arrowClassName={arrowClassName}
          value={selectedDates}
          containerClassName={datePickerContainerClassName}
          onChange={setSelectedDates}
          range
          sort
          inputMode={inputMode}
          offsetY={offsetY}
        
          render={render}
          format="MMM DD YYYY"
          monthYearSeparator={monthYearSeparator}
          // months={["January","Feb","March","April","May","June","July","August","September","October","November","December"]}
          numberOfMonths={2} // Display two months side by side
          className={`${themeColor} ` + className}
          // plugins={[
          //   <Toolbar
          //     key="toolbar"

          //     names={{today:"",deselect:"Apply",close:"cancel",}}
          //     position="bottom"
          //     cancelButton
          //     applyButton
          //     onCancel={handleCancel}
          //     onApply={handleApply}
          //     cancelButtonText="Cancel"
          //     applyButtonText="Apply"
          //   />,
          // ]}
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
