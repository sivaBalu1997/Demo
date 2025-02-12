import React, { useEffect, useRef, useState } from "react";
import { DateRangeStateInterface } from "interface/newReportsInterface";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

interface DateFilterDropdownProps {
    selectedPeriod: DateRangeStateInterface["selectedPeriod"];
    startDate: Date;
    endDate: Date;
    onSelect: (option: DateRangeStateInterface["selectedPeriod"], startDate: Date, endDate: Date) => void;
}

const DateFilterDropdown: React.FC<DateFilterDropdownProps> = ({ selectedPeriod, startDate, endDate, onSelect }) => {
    const [openFilter, setOpenFilter] = useState(false);
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const openFilterDropDown = () => {
        setOpenFilter((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenFilter(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [openFilter]);

    const handleOptionClickForDate = (option: DateRangeStateInterface["selectedPeriod"]) => {
        const isCustomRange = option === "Custom Range";
        const newStartDate = isCustomRange ? moment().toDate() : moment().startOf("day").toDate();
        const newEndDate = isCustomRange ? moment().toDate() : moment().endOf("day").toDate();

        onSelect(option, newStartDate, newEndDate);
        setOpenFilter(false);
    };

    const handleStartDateChange = (date: Date | null) => {
        if (date && date > endDate) {
            alert("Start date cannot be greater than the end date.");
        } else if (date) {
            onSelect(selectedPeriod, date, endDate);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date && date < startDate) {
            alert("End date cannot be earlier than the start date.");
        } else if (date) {
            onSelect(selectedPeriod, startDate, date);
        }
    };

    const dateOptions = [
        "Yesterday",
        "Today",
        "This Week",
        "Last 7 days",
        "This Month",
        "Last Month",
        "Last 30 days",
        "Custom Range",
    ] as const;

    return (
        <div className="dates">
            <div className="date-flex-column-parent">
                <div className="label-time-period">
                    <p>Select Time Period</p>
                </div>
                <div className="filter-toggle-btn-container">
                    <div className="filter-toggle-btn" onClick={openFilterDropDown}>
                        {selectedPeriod}
                    </div>
                    {openFilter && (
                        <div className="filter-drop-down-options" ref={dropdownRef}>
                            {dateOptions?.map((option) => (
                                <p key={option} onClick={() => handleOptionClickForDate(option)}>
                                    {option}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {selectedPeriod === "Custom Range" && (
                <div className="e-date-range-style">
                    <label className="e-dateLabel" htmlFor="e-start-date">From</label>
                    <DatePicker
                        placeholderText="Start Date"
                        selected={startDate}
                        onChange={handleStartDateChange}
                        dateFormat="dd MMM yyyy"
                        className="e-start-date"
                        onSelect={() => setOpenStartDatePicker(false)}
                        onFocus={() => setOpenStartDatePicker(true)}
                    />
                    <label className="e-dateLabel" htmlFor="e-end-date">To</label>
                    <DatePicker
                        placeholderText="End Date"
                        selected={endDate}
                        onChange={handleEndDateChange}
                        dateFormat="dd MMM yyyy"
                        className="e-end-date"
                        onSelect={() => setOpenEndDatePicker(false)}
                        onFocus={() => setOpenEndDatePicker(true)}
                    />
                </div>
            )}
        </div>
    );
};

export default DateFilterDropdown;
