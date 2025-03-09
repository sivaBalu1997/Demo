import React, { useState } from "react";
import moment from "moment";
import CustomDropdown from "../../common/customDropdown";
import "./style.scss" 

interface Option {
    value: string;
    label: string;
    icon?: React.ReactNode;
  }
  
  interface DateDropdownProps {
    onDateSelect: (from: string | null, to: string | null, kpiTitle: string) => void;
    kpiTitleForCustomDateDropdown: string;  
  }
  
  const TableDateDropdown: React.FC<DateDropdownProps> = ({ onDateSelect, kpiTitleForCustomDateDropdown }) => {
    const [selectedDate, setSelectedDate] = useState<Option | undefined>(undefined);
    const [isDateSelected, setIsDateSelected] = useState(false);
  
    const dateOptions: Option[] = [
      { value: "All", label: "All" },
      { value: "Yesterday", label: "Yesterday" },
      { value: "Today", label: "Today" },
      { value: "This week", label: "This Week" },
      { value: "Last week", label: "Last Week" },
      { value: "This month", label: "This Month" },
      { value: "Last month", label: "Last Month" },
      { value: "Last 3 months", label: "Last 3 Months" },
      { value: "Last 6 months", label: "Last 6 Months" },
      { value: "This year", label: "This Year" },
    ];
  
    const handleDateDropdownOnSelect = (option: Option) => {
      let from: moment.Moment | null = null, to: moment.Moment | null = null;
    
      switch (option?.value) {
        case "All":
          from = to = null;
          break;
        case "Yesterday":
          from = to = moment().subtract(1, "days");
          break;
        case "Today":
          from = to = moment();
          break;
        case "This week":
          from = moment().startOf("week");
          to = moment();
          break;
        case "Last week":
          from = moment().subtract(1, "weeks").startOf("week");
          to = moment().subtract(1, "weeks").endOf("week");
          break;
        case "This month":
          from = moment().startOf("month");
          to = moment();
          break;
        case "Last month":
          from = moment().subtract(1, "months").startOf("month");
          to = moment().subtract(1, "months").endOf("month");
          break;
        case "Last 3 months":
          from = moment().subtract(3, "months").startOf("month");
          to = moment();
          break;
        case "Last 6 months":
          from = moment().subtract(6, "months").startOf("month");
          to = moment();
          break;
        case "This year":
          from = moment().startOf("year");
          to = moment();
          break;
        default:
          from = to = moment();
          break;
      }
    
      // Format dates before passing them to parent
      const formattedFromDate = from ? from?.format("YYYY-MM-DD") : null;
      const formattedToDate = to ? to?.format("YYYY-MM-DD") : null;
    
      // Ensure the correct values are sent before updating the state
      onDateSelect(formattedFromDate, formattedToDate, kpiTitleForCustomDateDropdown);
    
      // Update state after calling onDateSelect
      setSelectedDate(option);
      setIsDateSelected(true);
    };
    
  
    return (
      <CustomDropdown
        value={dateOptions[0]?.value}
        options={dateOptions}
        onSelect={handleDateDropdownOnSelect}
        placeholder="Select Date"
        className="table-date-dropdown"
        placeholderClass={isDateSelected ? "range-date-selected" : ""}
        disabled={false}
        // controlClassName="dropdown-control"
      />
    );
  };

export default TableDateDropdown;
