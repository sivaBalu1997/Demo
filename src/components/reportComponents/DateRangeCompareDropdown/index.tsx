import React, { useState } from "react";
import { DateOptions } from "commonConstants/reportConstants";
import { DateDropdownProps, IDateRange } from "interface/newReportsInterface";
import CustomDropdown from "../../common/customDropdown";


function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const DateRangeCompareDropdown: React.FC<DateDropdownProps> = ({
    onDateChange = () => {},
}) => {
//   const [selectedDateRange, setSelectedDateRange] = useState<IDateRange>({
//     startDate: formatDateToYYYYMMDD(new Date()),
//     endDate: formatDateToYYYYMMDD(new Date())
//   });

  const handleDateSelect = (selectedOption: { value: string; label: string }) => {
    const today = new Date();
    let from: Date, to: Date;

    switch (selectedOption.value) {
      case "Yesterday":
        from = to = new Date(today);
        from.setDate(today.getDate() - 1);
        break;
      case "Today":
        from = to = today;
        break;
      case "This week":
        from = new Date(today);
        from.setDate(today.getDate() - today.getDay()); // Start of the week (Sunday)
        to = today;
        break;
      case "7 days":
        from = new Date(today);
        from.setDate(today.getDate() - 7);
        to = today;
        break;
      default:
        from = to = today;
    }

    const formattedFromDate = formatDateToYYYYMMDD(from);
    const formattedToDate = formatDateToYYYYMMDD(to);

    // setSelectedDateRange({ startDate: formattedFromDate, endDate: formattedToDate });
    onDateChange(formattedFromDate, formattedToDate);
  };

  return (
      <CustomDropdown
        options={DateOptions}
        value={DateOptions[0].value}
        className="category-dropdown"
        onSelect={handleDateSelect}
      />
  );
};

export default DateRangeCompareDropdown;
