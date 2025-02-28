import moment from "moment";
import { useState, useMemo } from "react";

const useDateFilter = () => {
    const today = useMemo(() => moment(), []);
    const yesterday = useMemo(() => moment().subtract(1, "day"), []);

    const [startDate, setStartDate] = useState(yesterday.format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(yesterday.format("YYYY-MM-DD"));
    const [dateSelectionType, setDateSelectionType] = useState("Yesterday");

    // const handleDateTypeChange = (type:string) => {
    //     setDateSelectionType(type);
    // };

    const handleDateChange = (type:string, customStartDate?: string, customEndDate?: string) => {
        setDateSelectionType(type);

        switch (type) {
            case "Yesterday":
                setStartDate(yesterday.format("YYYY-MM-DD"));
                setEndDate(yesterday.format("YYYY-MM-DD"));
                break;

            case "Today":
                setStartDate(today.format("YYYY-MM-DD"));
                setEndDate(today.format("YYYY-MM-DD"));
                break;

            case "This week":
                setStartDate(today.startOf("week").format("YYYY-MM-DD"));
                setEndDate(today.format("YYYY-MM-DD"));
                break;

            case "This month":
                setStartDate(today.startOf("month").format("YYYY-MM-DD"));
                setEndDate(today.format("YYYY-MM-DD"));
                break;

            case "This year":
                setStartDate(today.startOf("year").format("YYYY-MM-DD"));
                setEndDate(today.format("YYYY-MM-DD"));
                break;

            case "Custom Date":
                if (customStartDate && customEndDate) {
                    setStartDate(customStartDate);
                    setEndDate(customEndDate);
                } else {
                    console.error("Custom date range requires valid start and end dates.");
                }
                break;

            default:
                console.error("Invalid date selection type");
        }
    };

    return {
        startDate,
        endDate,
        // setStartDate,
        // setEndDate,
        // setDateSelectionType,
        // dateSelectionType,
        // handleDateTypeChange,
        handleDateChange,
    };
};

export default useDateFilter;
