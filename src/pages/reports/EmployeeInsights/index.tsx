import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { EmployeeD } from "../../../assets/mockData/originalAPIData/OemployeeData";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { ReportsChartDropDown } from "components/reportComponents/ReportsChartDropDown";
import { useDispatch, useSelector } from "react-redux";
import { employeeStaffActivityRequest, employeeStaffDiscountRequest, employeeStaffPerformanceRequest, employeeStaffTipGratuityRequest } from "redux/newReports/newReportsActions";
import { DateRangeStateInterface, NewTableHeader } from "interface/newReportsInterface";
import DatePicker from "react-datepicker";
import Table from "../../../components/reportComponents/Table";
import SidePanel from "pages/SidePanel";
import Topnavbar from "components/reportComponents/TopNavbar";
import CanvaPieChart from "components/reportComponents/Charts/CanvaPieChart";
import BarChart from "components/reportComponents/Charts/BarChart";
import moment from "moment";
import SummaryBox from "components/reportComponents/SummaryBox";
import DateFilterDropdown from "components/reportComponents/DateFilterDropdown";
import useSalesLocationDates from "hooks/useSalesLocationDates";
import NewTable from "components/reportComponents/NewTable";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import SwitchableBox from "components/reportComponents/SwitchableBox";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";


interface CanvaPieChartOptions {
  animationEnabled: boolean;
  exportEnabled: boolean;
  theme: "light1" | "dark1" | "dark2";
  title: {
    text: string;
    fontSize: number;
  };
  data: Array<{
    type: "pie" | "line" | "doughnut";
    indexLabel?: string;
    indexLabelPlacement: string;
    indexLabelFontSize: number;
    startAngle: number;
    dataPoints: Array<{
      label: string;
      y: number;
    }>;
    toolTipContent?: string;
    showInLegend?: string;
    legendText?: string;
    axisX?: { // Only valid for line charts
      title: string;
      titleFontSize: number;
      labelFontSize: number;
    };
    axisY?: { // Only valid for line charts
      title: string;
      titleFontSize: number;
      labelFontSize: number;
    };
  }>;
  backgroundColor: string;
}


const EmployeeInsights: React.FC = () => {

  const dispatch = useDispatch();

  const TABLE_RECORDS_LIMIT = 15;
  const [employeeVoidRecordLimit, setEmployeeVoidRecordLimit] = useState<number>(15);

  const selectedBranch = useSelector(
    (state: any) => state.auth?.selectedBranch || null
  );

  const locationid = useSelector((state: any) => state?.auth?.credentials?.locationId)

  // const netWorkStatus = useSelector((state: any) => state?.newReports?.employeeStaffTipGratuitySuccess);
  // console.log("PPPP", { netWorkStatus })


  const employeeSummaryAPIRedux = useSelector((state: any) => state?.newReports?.employeeStaffTipGratuitySuccess?.content);
  const updatedEmployeeSummary = employeeSummaryAPIRedux?.map(({ total, date, ...rest }: any) => rest);
  // console.log("2222222222", { updatedEmployeeSummary })
  // console.log("1111", { employeeSummaryAPIRedux })
  const employeeSummaryTotalPagesRedux = useSelector((state: any) => state?.newReports?.employeeStaffTipGratuitySuccess?.totalPages);
  // console.log("1111", { employeeSummaryTotalPagesRedux })
  const employeeSummaryLoading = useSelector((state: any) => state?.newReports?.employeeStaffTipGratuityLoading);

  const employeePerformanceAPIRedux = useSelector((state: any) => state?.newReports?.employeeStaffPerformanceSuccess?.content);
  // console.log("1111", { employeePerformanceAPIRedux })
  const employeePerformanceTotalPagesRedux = useSelector((state: any) => state?.newReports?.employeeStaffPerformanceSuccess?.totalPages);
  // console.log("1111", { employeePerformanceTotalPagesRedux })
  const employeePerformanceLoading = useSelector((state: any) => state?.newReports?.employeeStaffPerformanceLoading);

  const employeeDiscountAPIRedux = useSelector((state: any) => state?.newReports?.employeeStaffDiscountSuccess?.content);
  // console.log("1111", { employeeDiscountAPIRedux })

  const employeeDisountMappped = employeeDiscountAPIRedux?.map((data: any) => ({
    EmployeeName: data?.fullName,
    Discount: data?.tip
  }))

  // console.log("1111", { employeeDisountMappped })
  const employeeDiscountTotalPagesRedux = useSelector((state: any) => state?.newReports?.employeeStaffDiscountSuccess?.totalPages);
  // console.log("1111", { employeeDiscountTotalPagesRedux })
  const employeeDiscountLoading = useSelector((state: any) => state?.newReports?.employeeStaffDiscountLoading);

  const employeeVoidActivityAPIRedux = useSelector((state: any) => state?.newReports?.employeeStaffActivitySuccess?.content);
  console.log("1111", { employeeVoidActivityAPIRedux })
  const employeeVoidActivityTotalPagesRedux = useSelector((state: any) => state?.newReports?.employeeStaffActivitySuccess?.totalPages);
  // console.log("1111", { employeeVoidActivityTotalPagesRedux })
  const employeeVoidActivityLoading = useSelector((state: any) => state?.newReports?.employeeStaffActivityLoading);



  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  // const [state, setState] = useState<employeeState>({
  const [state, setState] = useState<DateRangeStateInterface>({
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    openCustomDateRange: false,
    openStartDatePicker: false,
    openEndDatePicker: false,
    openFilter: false,
    selectedPeriod: "Yesterday",
  });
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [chartType, setChartType] = useState<string>("Bar");

  const [currentPageEmployeeTipsFeeSummary, setCurrentPageEmployeeTipsFeeSummary] = useState<number>(1);
  const [currentPageEmployeePerformance, setCurrentPageEmployeePerformance] = useState<number>(1);
  const [currentPageEmployeeDiscount, setCurrentPageEmployeeDiscount] = useState<number>(1);
  const [currentPageEmployeeVoidActivity, setCurrentPageEmployeeVoidActivity] = useState<number>(1);

  const getLocationDates = useSalesLocationDates(state, locationid);

  // Data/Config For Pie Chart start ====================================================
  const empTips = EmployeeD["Employee Performance"]?.map((items: any) => ({
    label: items["Employee"],
    y: items["Tips"]
  }))

  // console.log("qqqq", { empTips })
  const backgroundEmployeeColorForPieChart = isDarkTheme ? "#222b3c" : "#fff";

  const EmployeeTipsPieOptions: CanvaPieChartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    theme: isDarkTheme ? "dark1" : "light1",
    title: {
      text: "Distribution of Tips by Employee",
      fontSize: 30,
    },
    data: [
      {
        type: "pie",
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        indexLabelFontSize: 14,
        startAngle: -90,
        dataPoints: empTips,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
      },
    ],
    backgroundColor: backgroundEmployeeColorForPieChart || "#ffffff",
  };
  // Data/Config For Pie Chart end =====================================================

  // Data/Config For Bar Chart start ====================================================
  const empNameBarX = EmployeeD["Employee Performance"]?.map((items: any) => items["Employee"]);
  // console.log("qqqq", { empNameBarX })
  const empSalesBarY = EmployeeD["Employee Performance"]?.map((items: any) => items["Orders Handled"]);
  // console.log("qqqq", { empSalesBarY })
  // Data/Config For Bar Chart end ====================================================

  // Data/Config For Line Chart Start ====================================================
  const empLineX = EmployeeD["Employee Performance"]?.map((items: any) => ({
    label: items["Employee"],
    y: items["Sales"]
  }));
  // console.log("qqqq", { empLineX })
  const SalesTrendsByEmployee: CanvaPieChartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    theme: isDarkTheme ? "dark1" : "light1",
    title: {
      text: "Distribution of Tips by Employee",
      fontSize: 30,
    },
    data: [
      {
        type: "line",
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        indexLabelFontSize: 14,
        startAngle: -90,
        dataPoints: empLineX,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "tips",
        axisX: {
          title: "Employee", // Label for X-axis
          titleFontSize: 20, // Optional: You can adjust font size
          labelFontSize: 14, // Optional: You can adjust label font size for X-axis
        },
        axisY: {
          title: "Sales", // Label for Y-axis
          titleFontSize: 20, // Optional: You can adjust font size
          labelFontSize: 14, // Optional: You can adjust label font size for Y-axis
        },
      },
    ],
    backgroundColor: backgroundEmployeeColorForPieChart || "#ffffff",
  };
  // Data/Config For Line Chart End ====================================================

  const handleChartOptionSelect = (selectedOption: string) => {
    // console.log("Selected Option:", selectedOption);
    setChartType(selectedOption);
    return selectedOption;
  };

  const renderChart = () => {
    switch (chartType) {
      case "Bar":
        return <div className="employee-sales-chart">
          <BarChart
            BatChartTitle="Orders Handled vs. Employee"
            TitleColor={isDarkTheme ? "#fff" : "#000"}
            xAxisData={empNameBarX && empNameBarX}
            yAxisData={empSalesBarY && empSalesBarY}
            label="Orders Handled"
            backgroundColor={[
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ]}
            borderColor={[
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
            ]}
            xAxisGridColor={"transparent"}
            yAxisGridColor={"transparent"}
            xAxisTicksColor={isDarkTheme ? "#fff" : "#000"}
            yAxisTicksColor={isDarkTheme ? "#fff" : "#000"}
            pluginLegendLabelsColor={isDarkTheme ? "#fff" : "#000"}
            ttTitleColor="#fff"
            ttBodyColor="#fff"
            // yAxisLabel="Average Sales per Hour"
            yAxisLabel="Orders handled"
            xAxislabelColor={isDarkTheme ? "#fff" : "#000"}
            xAxisLabel="Employee"
            yAxislabelColor={isDarkTheme ? "#fff" : "#000"}
          // barChartLoading={hourlySalesChartDataLoading}
          />
        </div>;
      case "Pie":
        return <div className="employee-tips-pie-chart">
          <CanvaPieChart options={EmployeeTipsPieOptions} />
        </div>;
      case "line":
        return <div className="employee-tips-pie-chart">
          <CanvaPieChart options={SalesTrendsByEmployee} />
        </div>;
      default:
        return <div>Select a chart type</div>;
    }
  };

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        employeeStaffTipGratuityRequest({
          ...getLocationDates,
          tablePageNo: currentPageEmployeeTipsFeeSummary,
          tableRecordLimit: TABLE_RECORDS_LIMIT,
        })
      );
    }
  }, [getLocationDates, currentPageEmployeeTipsFeeSummary]);

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        employeeStaffPerformanceRequest({
          ...getLocationDates,
          tablePageNo: currentPageEmployeePerformance,
          tableRecordLimit: TABLE_RECORDS_LIMIT,
        })
      );
    }
  }, [getLocationDates, currentPageEmployeePerformance]);

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        employeeStaffDiscountRequest({
          ...getLocationDates,
          tablePageNo: currentPageEmployeeDiscount,
          tableRecordLimit: TABLE_RECORDS_LIMIT,
        })
      );
    }
  }, [getLocationDates, currentPageEmployeeDiscount]);

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        employeeStaffActivityRequest({
          ...getLocationDates,
          tablePageNo: currentPageEmployeeVoidActivity,
          tableRecordLimit: employeeVoidRecordLimit,
        })
      );
    }
  }, [getLocationDates, currentPageEmployeeVoidActivity, employeeVoidRecordLimit]);

  const handleDateSelection = (option: DateRangeStateInterface["selectedPeriod"], // Ensuring type safety
    startDate: Date,
    endDate: Date) => {
    setState((prev) => ({
      ...prev,
      selectedPeriod: option, // Now it correctly matches the expected type
      startDate,
      endDate,
    }));
  };

  const [searchQuery, setSearchQuery] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  // const rowsPerPage = 15; // Set number of rows per page
  // const totalPages = Math.ceil(mockData.length / rowsPerPage);
  // const [loader, setLoader] = useState<boolean>(false);

  const countryCode = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.country
  );

  const currencySymbol = countryCode === "US" ? "$" : "₹";

  const newTableHeaders: NewTableHeader[] = [
    { key: 'steward', label: `Steward`, isSortable: true, alignment: 'left' },
    { key: 'voidedAmount', label: `Voided amount (${currencySymbol})`, isSortable: true, alignment: 'right' },
    { key: 'voidedItems', label: `Voided items`, isSortable: false, alignment: 'left' },
    { key: 'voidedReasons', label: `Voided reasons`, isSortable: false, alignment: 'left' },
  ];

  const [isSwitchActive, setIsSwitchActive] = useState<boolean>(false);

  const handleToggleSwitch = () => {
    setIsSwitchActive((prev) => !prev)
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", width: '100%' }}>
      <SidePanel />
      <div
        style={isExpanded ? { width: '100%' } : { width: '94%' }}
        className={`employee-container ${isDarkTheme ? "dark-theme" : "light-theme"
          } ${isExpanded ? "e-expanded-width-sales" : ""}`}
      >
        <Topnavbar />
        <div className="employee-head">
          <div className="name-board">
            <h1>Reports Dashboard</h1>
          </div>
          <div className="employee-date-filter-container">
            {/* <SummaryBox summaryTitle="Summary Title" boxValue={15} toolTipMessage="Tooltip Message" isMonetary={true} /> */}
            <DateFilterDropdown
              selectedPeriod={state.selectedPeriod}
              startDate={state.startDate}
              endDate={state.endDate}
              onSelect={handleDateSelection}
            />
          </div>
          {/* <div className="dates"> */}
          {/* <div className="label-time-period">
              <p>Select Time Period</p>
            </div> */}
          {/* <div className="filter-toggle-btn-container"> */}
          {/* <div className="filter-toggle-btn" onClick={openFilterDropDown}>
                {state.selectedPeriod} 
              </div> */}
          {/* {state.openFilter && (
                <div className="filter-drop-down-options" ref={dropdownRef}>
                  <p onClick={() => handleOptionClickForDate("Yesterday")}>Yesterday</p>
                  <p onClick={() => handleOptionClickForDate("Today")}>Today</p>
                  <p onClick={() => handleOptionClickForDate("This Week")}>
                    This Week
                  </p>
                  <p onClick={() => handleOptionClickForDate("Last 7 days")}>
                    Last 7 days
                  </p>
                  <p onClick={() => handleOptionClickForDate("This Month")}>
                    This Month
                  </p>
                  <p onClick={() => handleOptionClickForDate("Last Month")}>
                    Last Month
                  </p>
                  <p onClick={() => handleOptionClickForDate("Last 30 days")}>
                    Last 30 days
                  </p>
                  <p
                    onClick={() =>
                      handleOptionClickForDate("Custom Range")
                    }
                  >
                    Custom Range
                  </p>
                </div>
              )} */}
          {/* </div> */}
          {/* </div> */}
        </div>
        {state.openCustomDateRange && (
          <div className="e-date-range-style">
            <label className="e-dateLabel" htmlFor="e-start-date">
              From
            </label>
            <DatePicker
              placeholderText="Start Date"
              selected={state.startDate}
              onChange={(date: Date | null) => {
                if (date && date > state.endDate) {
                  alert("Start date cannot be greater than the end date.");
                } else if (date) {
                  setState((prevState) => ({ ...prevState, startDate: date }));
                }
              }}
              dateFormat="dd MMM yyyy"
              className="e-start-date"
              onSelect={() =>
                setState((prevState) => ({
                  ...prevState,
                  openStartDatePicker: false,
                }))
              }
              onFocus={() => {
                setState((prevState) => ({
                  ...prevState,
                  openStartDatePicker: true,
                }));
              }}
            />
            <label className="e-dateLabel" htmlFor="e-end-date">
              To
            </label>
            <DatePicker
              placeholderText="End Date"
              selected={state.endDate}
              onChange={(date: Date | null) => {
                if (date && date < state.startDate) {
                  alert("End date cannot be earlier than the start date.");
                } else if (date) {
                  setState((prevState) => ({ ...prevState, endDate: date }));
                }
              }}
              dateFormat="dd MMM yyyy"
              className="e-end-date"
              onSelect={() =>
                setState((prevState) => ({
                  ...prevState,
                  openEndDatePicker: false,
                }))
              }
              onFocus={() => {
                setState((prevState) => ({
                  ...prevState,
                  openEndDatePicker: true,
                }));
              }}
            />
          </div>
        )}
        <div className="name-board-two">
          <h1>{selectedBranch?.locationName}</h1>
        </div>
        <div className="employee-details-container">
          <Table
            currentPage={currentPageEmployeeTipsFeeSummary}
            setCurrentPage={setCurrentPageEmployeeTipsFeeSummary}
            Heading="Employee Summary"
            // tableData={employeeSummaryAPIRedux && employeeSummaryAPIRedux?.length > 0 && employeeSummaryAPIRedux}
            tableData={updatedEmployeeSummary && updatedEmployeeSummary?.length > 0 && updatedEmployeeSummary}
            //updatedEmployeeSummary
            viewType="full"
            recordsPerPage={TABLE_RECORDS_LIMIT}
            totalpageNo={employeeSummaryTotalPagesRedux}
            tabledataLoading={employeeSummaryLoading}
          />
        </div>
        <div className="employee-details-container">
          <Table
            currentPage={currentPageEmployeePerformance}
            setCurrentPage={setCurrentPageEmployeePerformance}
            Heading="Employee Performance"
            tableData={employeePerformanceAPIRedux}
            viewType="full"
            recordsPerPage={TABLE_RECORDS_LIMIT}
            totalpageNo={employeePerformanceTotalPagesRedux}
            tabledataLoading={employeePerformanceLoading}
          />
        </div>
        <div className="employee-details-container">
          <Table
            currentPage={currentPageEmployeeDiscount}
            setCurrentPage={setCurrentPageEmployeeDiscount}
            Heading="Employee Discount"
            // tableData={employeeDiscountAPIRedux && employeeDiscountAPIRedux?.length > 0 && employeeDiscountAPIRedux}
            tableData={employeeDisountMappped && employeeDisountMappped?.length > 0 && employeeDisountMappped}
            viewType="full"
            recordsPerPage={TABLE_RECORDS_LIMIT}
            totalpageNo={employeeDiscountTotalPagesRedux}
            tabledataLoading={employeeDiscountLoading}
          />
        </div>
        <div className="employee-details-container">
          <Table
            currentPage={currentPageEmployeeVoidActivity}
            setCurrentPage={setCurrentPageEmployeeVoidActivity}
            Heading="Employee Void Activity"
            tableData={employeeVoidActivityAPIRedux && employeeVoidActivityAPIRedux?.length > 0 && employeeVoidActivityAPIRedux}
            viewType="full"
            recordsPerPage={employeeVoidRecordLimit}
            totalpageNo={employeeVoidActivityTotalPagesRedux}
            tabledataLoading={employeeVoidActivityLoading}
          />
        </div>
        <div className="employee-details-container">
          <NewTable
            kpiTitle="Employee Void Activity"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            headerData={newTableHeaders}
            tableData={employeeVoidActivityAPIRedux && employeeVoidActivityAPIRedux?.length > 0 && employeeVoidActivityAPIRedux}
            currentPage={currentPageEmployeeVoidActivity}
            totalPages={employeeVoidActivityTotalPagesRedux}
            onPageChange={setCurrentPageEmployeeVoidActivity}
            rowsPerPage={employeeVoidRecordLimit}
            setRowsPerPage={setEmployeeVoidRecordLimit}
            loader={employeeVoidActivityLoading}
            count={employeeVoidActivityAPIRedux?.length}
            searchPlaceHolder="Search By Steward, Voided reasons"
          />
        </div>
        {/* SwitchableBox */}
        <div className="employee-details-container">
          <SwitchableBox
            textOne="Overall"
            textTwo="Live Orders"
            isActive={isSwitchActive}
            toggleSwitch={handleToggleSwitch}
          />
        </div>
        {/* CardWithMiniGraph */}
        <div className="employee-details-container">
          <CardWithMiniGraph cardTitle="Total Sales" cardValue={15} incrementDecrementValue={"21"} isMonetary={true} showMiniGraph={true} incrementOrDecrement="decrement" />
        </div>
        <div className="dynamic-chart-container">
          <div className="chart-options-config-header">
            <h2>Employee Charts</h2>
            <div className="rep-label-chart-option-cont">
              <label>Select Chart Type</label>
              <ReportsChartDropDown
                options={["Bar", "Pie", "line"]}
                onSelect={handleChartOptionSelect}
              />
            </div>
          </div>
          {renderChart()}
          {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", gap: "20px" }}> */}
          {/* <SummaryBox summaryTitle="Summary Title" boxValue={15} toolTipMessage="Tooltip Message" isMonetary={true} /> */}
          {/* <DateFilterDropdown
              selectedPeriod={state.selectedPeriod}
              startDate={state.startDate}
              endDate={state.endDate}
              onSelect={handleDateSelection}
            /> */}
          {/* </div> */}
        </div>
      </div>
    </div >
  );
};

export default EmployeeInsights;
