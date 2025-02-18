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


export type Alignment = 'left' | 'center' | 'right';

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
  alignment?: 'left' | 'center' | 'right';
}

export interface NewTableData {
  [key: string]: any;
}

export interface NewTableProps {
  kpiTitle: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  headerData: NewTableHeader[];
  tableData: NewTableData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  loader?: boolean;
  // setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  count?: number | string;
  searchPlaceHolder?: string;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc' | null;
}