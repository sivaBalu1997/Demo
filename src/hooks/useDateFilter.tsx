import moment from "moment";
import {  useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDateFilterType, changeEndDate, changeStartDate } from "redux/newReports/newReportsActions";

const useDateFilter = () => {
    // const today = useMemo(() => moment(), []);
    // const yesterday = useMemo(() => moment().subtract(1, "day"), []);

const startDate = useSelector((state: any) => state?.newReports?.selectedStartDate)
const endDate = useSelector((state: any) => state?.newReports?.selectedEndDate)
const selectedDateFilterType = useSelector((state: any) => state?.newReports?.selectedDateFilterType)

const dispatch = useDispatch();

    useEffect(() => {
        if(!startDate || !endDate){          
        dispatch(changeStartDate(moment().format("YYYY-MM-DD")))
        dispatch(changeEndDate(moment().format("YYYY-MM-DD")))
        }
    }, [])


    const handleDateChange = (type:string, customStartDate?: string, customEndDate?: string) => {
        // console.log({type, customStartDate, customEndDate});
        
           dispatch(changeDateFilterType({ label: type, value: type }))

        switch (type) {
            case "Yesterday":
                dispatch(changeStartDate(moment().subtract(1, "day").format("YYYY-MM-DD")));
                dispatch(changeEndDate(moment().subtract(1, "day").format("YYYY-MM-DD")));
                break;

            case "Today":
                dispatch(changeStartDate(moment().format("YYYY-MM-DD")));
                dispatch(changeEndDate(moment().format("YYYY-MM-DD")));
                break;

            case "This week":
                dispatch(changeStartDate(moment().startOf("week").format("YYYY-MM-DD")));
                dispatch(changeEndDate(moment().format("YYYY-MM-DD")));
                break;

            case "This month":       
                dispatch(changeStartDate(moment().startOf("month").format("YYYY-MM-DD")));
                dispatch(changeEndDate(moment().format("YYYY-MM-DD")));
                break;

            case "This year":
                dispatch(changeStartDate(moment().startOf("year").format("YYYY-MM-DD")));
                dispatch(changeEndDate(moment().format("YYYY-MM-DD")));
                break;

            case "Custom Date":
                if (customStartDate && customEndDate) {
                    dispatch(changeStartDate(customStartDate));
                    dispatch(changeEndDate(customEndDate));
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
        // changeStartDate,
        // changeEndDate,
        // setDateSelectionType,
        selectedDateFilterType,
        handleDateChange,
    };
};

export default useDateFilter;
