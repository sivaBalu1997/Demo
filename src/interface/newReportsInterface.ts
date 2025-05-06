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

export type Alignment = "left" | "center" | "right";

export interface NewTableColumn {
  key: string;
  label: string;
  isSortable?: boolean;
  alignment?: Alignment;
}

export interface NewTableHeader {
  key: string;
  label: string;
  isSortable?: boolean;
  isPrivate?: boolean;
  isMonetary?:boolean;
  alignment?: "left" | "center" | "right";
  prefix?: string;
  suffix?: string;
}

export interface NewTableData {
  [key: string]: any;
}

export interface NewTableProps {
  optionList?: { label: string; value: string }[];
  selectedOption?: { label: string; value: string };
  setOptions?: React.Dispatch<React.SetStateAction<any>>;
  isCustomOption?: boolean;
  kpiTitle: string;
  apiEndPoint?:string;
  queryParams?: Record<string, any>;
  searchQuery: string;
  // headerData: NewTableHeader[];
  headerData: any;
  tableData: NewTableData[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  rowsPerPage?: number;
  setRowsPerPage?: React.Dispatch<React.SetStateAction<number>>;
  loader?: boolean;
  // setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  count?: number | string;
  searchPlaceHolder?: string;
  // searchDebounce?: (value: string) => void;
  onSearch: (value: string, kpiTitle: string) => void;
  getChartSliceTableHeaders?: any;
  showDateDropDown?: boolean;
  selectedDate?: string | null;
  onDateSelect?: (
    from: string | null,
    to: string | null,
    kpiTitleForCustomDateDropdown: string
  ) => void;
  showTableHeader?: boolean;
  showPagination?: boolean;
  rowNoWrap?: boolean;
  tableContainerClassName?: string;
  showIcons?: boolean;
  totalElements?: number;
  headers?: {key:string;label:string}[];
}

export interface SortConfig {
  key: string;
  direction: "asc" | "desc" | null;
}

export interface ICardWithMiniGraphProps {
  cardTitle: string | undefined | null | "";
  cardValue: number | string | undefined | "" | null;
  isMonetary?: boolean;
  showMiniGraph?: boolean;
  incrementDecrementValue?: number | string | undefined | "" | null;
  incrementOrDecrement?: IncrementOrDecrementTypeEnum;
  loader?: boolean;
  isPercent?: boolean;
  graphType?: "chart" | "arrow";
}

export enum IncrementOrDecrementTypeEnum {
  INCREMENT = "increment",
  DECREMENT = "decrement",
  NULL = "",
}

export interface IcardWithMiniGraphData {
    title: string;
    key: string;
    isMonetary: boolean;
}

export interface ICardConfigItem {
  title: string;
  value: string;
  percentage: string;
  isMonetary: boolean;
  showMiniGraph: boolean | ((val: string | number) => boolean);
}

export type groupedDataFlat = {
  onPremiseSales: number;
  onPremiseOrders: number;
  offPremiseSales: number;
  offPremiseOrders: number;
  paymentMode: string;
  totalSales: number;
  totalOrders: number;
  salesPercentage: number;
  cardName: string | null;
  cardType: string | null;
  isExpandable: boolean;
};

export type GroupedDataArray = Record<string, groupedDataFlat[]>;

export interface IDateRange {
  startDate: string;
  endDate: string;
}

export interface DateDropdownProps {
  onDateChange: (startDate: string, endDate: string) => void;
} 

export interface LiveCheckInOverview {
  [key: string]: any; // Or replace 'any' with a more specific type if available
  seated?: any;
  noShow?: any;
  totalActive?: any;
  inQueue?: any;
  assigned?: any;
  lateShow?: any;
}

export interface DownloadHeaderItem {
  key: string;
  label: string;
}
