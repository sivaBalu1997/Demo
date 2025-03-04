import moment from "moment";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDateFilterType } from "redux/newReports/newReportsActions";

const useDateFilter = () => {
    const today = useMemo(() => moment(), []);
    const yesterday = useMemo(() => moment().subtract(1, "day"), []);

    const [startDate, setStartDate] = useState(today.format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(today.format("YYYY-MM-DD"));
    const [dateSelectionType, setDateSelectionType] = useState({
        label: "Today",
        value: "Today",
      });

        const selectedDateFilterType = useSelector((state: any) => state?.newReports?.selectedDateFilterType)
const dispatch = useDispatch();
    const handleDateTypeChange = (type:{label:string, value:string}) => {
        setDateSelectionType(type);
    };

    const handleDateChange = (type:string, customStartDate?: string, customEndDate?: string) => {
           dispatch(changeDateFilterType({ label: type, value: type }))
        setDateSelectionType({ label: type, value: type });

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
        selectedDateFilterType,
        handleDateTypeChange,
        handleDateChange,
    };
};

export default useDateFilter;
