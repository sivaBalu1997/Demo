export interface DateRangeStateInterface {
    startDate: Date;
    endDate: Date;
    openCustomDateRange: boolean;
    openStartDatePicker: boolean;
    openEndDatePicker: boolean;
    openFilter: boolean;
    selectedPeriod:
    | "Yesterday"
    | "Today"
    | "This Week"
    | "Last 7 days"
    | "This Month"
    | "Last Month"
    | "Last 30 days"
    | "Custom Range";
  }