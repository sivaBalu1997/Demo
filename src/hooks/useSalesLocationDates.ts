import moment from "moment";
import { useMemo } from "react";


interface SalesLocationState {
  selectedPeriod: 
    | "Today"
    | "This Week"
    | "Last 7 days"
    | "This Month"
    | "Last Month"
    | "Last 30 days"
    | "Yesterday"
    | "Custom Range";
  startDate: Date | null;
  endDate: Date | null;
}

interface SalesLocationData {
  locationid: string;
  startDate: string;
  endDate: string;
}

const useSalesLocationDates = (state: SalesLocationState, locationid: string | null): SalesLocationData | null => {
  return useMemo(() => {
    const { selectedPeriod, startDate, endDate } = state;
    let computedStartDate = moment().toDate();
    let computedEndDate = moment().toDate();

    switch (selectedPeriod) {
      case "Today":
        computedStartDate = moment().startOf("day").toDate();
        computedEndDate = moment().endOf("day").toDate();
        break;
      case "This Week":
        computedStartDate = moment().startOf("week").toDate();
        computedEndDate = moment().endOf("week").toDate();
        break;
      case "Last 7 days":
        computedStartDate = moment().subtract(7, "days").startOf("day").toDate();
        computedEndDate = moment().endOf("day").toDate();
        break;
      case "This Month":
        computedStartDate = moment().startOf("month").toDate();
        computedEndDate = moment().endOf("month").toDate();
        break;
      case "Last Month":
        computedStartDate = moment().subtract(1, "month").startOf("month").toDate();
        computedEndDate = moment().subtract(1, "month").endOf("month").toDate();
        break;
      case "Last 30 days":
        computedStartDate = moment().subtract(30, "days").startOf("day").toDate();
        computedEndDate = moment().endOf("day").toDate();
        break;
      case "Yesterday":
        computedStartDate = moment().subtract(1, "day").startOf("day").toDate();
        computedEndDate = moment().subtract(1, "day").endOf("day").toDate();
        break;
      case "Custom Range":
        computedStartDate = startDate ?? moment().toDate();
        computedEndDate = endDate ?? moment().toDate();
        break;
      default:
        break;
    }

    if (!locationid) {
      console.error("locationId is missing");
      return null;
    }

    return {
      locationid,
      startDate: moment(computedStartDate).format("YYYY-MM-DD"),
      endDate: moment(computedEndDate).format("YYYY-MM-DD"),
    };
  }, [state, locationid]);
};

export default useSalesLocationDates;
