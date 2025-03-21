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
  alignment?: "left" | "center" | "right";
  prefix?: string;
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
