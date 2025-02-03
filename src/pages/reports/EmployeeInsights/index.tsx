import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { EmployeeD } from "../../../assets/mockData/originalAPIData/OemployeeData";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import DatePicker from "react-datepicker";
import Table from "../../../components/reportComponents/Table";
import SidePanel from "pages/SidePanel";
import Topnavbar from "components/reportComponents/TopNavbar";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import CanvaPieChart from "components/reportComponents/Charts/CanvaPieChart";
import BarChart from "components/reportComponents/Charts/BarChart";
import { ReportsChartDropDown } from "components/reportComponents/ReportsChartDropDown";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { employeeStaffActivityRequest, employeeStaffDiscountRequest, employeeStaffPerformanceRequest, employeeStaffTipGratuityRequest } from "redux/newReports/newReportsActions";


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

interface employeeState {
  startDate: Date;
  endDate: Date;
  openCustomDateRange: boolean;
  openStartDatePicker: boolean;
  openEndDatePicker: boolean;
  openFilter: boolean;
  selectedPeriod: string;
}

const EmployeeInsights: React.FC = () => {

  const dispatch = useDispatch();

  const TABLE_RECORDS_LIMIT = 15;

  const locationid = useSelector((state: any) => state?.auth?.credentials?.locationId)

  const employeeSummaryAPIRedux = useSelector((state: any) => state?.newReports?.employeeStaffTipGratuitySuccess?.content);
  const employeeSummaryTotalPagesRedux = useSelector((state: any) => state?.newReports?.employeeStaffTipGratuitySuccess?.totalPages);
  const employeeSummaryLoading = useSelector((state: any) => state?.newReports?.employeeStaffTipGratuityLoading);

  const employeePerformanceAPIRedux = useSelector((state: any) => state?.newReports?.employeePerformanceSuccess?.content);
  const employeePerformanceTotalPagesRedux = useSelector((state: any) => state?.newReports?.employeePerformanceSuccess?.totalPages);
  const employeePerformanceLoading = useSelector((state: any) => state?.newReports?.employeeStaffPerformanceLoading);

  const employeeDiscountAPIRedux = useSelector((state: any) => state?.newReports?.employeeDiscountSuccess?.content);
  const employeeDiscountTotalPagesRedux = useSelector((state: any) => state?.newReports?.employeeDiscountSuccess?.totalPages);
  const employeeDiscountLoading = useSelector((state: any) => state?.newReports?.employeeStaffDiscountLoading);

  const employeeVoidActivityAPIRedux = useSelector((state: any) => state?.newReports?.employeeVoidActivitySuccess?.content);
  const employeeVoidActivityTotalPagesRedux = useSelector((state: any) => state?.newReports?.employeeVoidActivitySuccess?.totalPages);
  const employeeVoidActivityLoading = useSelector((state: any) => state?.newReports?.employeeStaffActivityLoading);


  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  const [state, setState] = useState<employeeState>({
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


  const openFilterDropDown = () => {
    setState((prevState) => ({
      ...prevState,
      openFilter: !prevState.openFilter,
    }));
  };

  const handleOptionClickForDate = (option: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedPeriod: option,
      openCustomDateRange: option === "Custom Range",
      openStartDatePicker: option === "Custom Range",
      openEndDatePicker: option === "Custom Range",
      startDate:
        option === "Custom Range"
          ? moment().toDate()
          : prevState.startDate,
      endDate:
        option === "Custom Range"
          ? moment().toDate()
          : prevState.endDate,
      openFilter: false,
    }));
  };

  // const XemployeeNameBar = EmployeeD["Sales By Employee"].map(
  //   (item) => item["Employee Name"]
  // );

  // const YemployeeSalesBar = EmployeeD["Sales By Employee"].map(
  //   (item) => item.Sales
  // );

  const getSalesLocationStartEndDate = useMemo(() => {
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
        computedStartDate = startDate;
        computedEndDate = endDate;
        break;
      default:
        break;
    }

    // Validate locationId and date range
    if (!locationid) {
      console.error("locationId is missing");
      return null;
    }

    return {
      locationid,
      startDate: moment(computedStartDate).format("YYYY-MM-DD"),
      endDate: moment(computedEndDate).format("YYYY-MM-DD"),
      // tablePageNo: currentPageSalesByItemCategory,
      // tableRecordLimit: TABLE_RECORDS_LIMIT,
    };
  }, [state, locationid]);

  // console.log("qqqq22", { getSalesLocationStartEndDate })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setState((prevState) => ({
          ...prevState,
          openFilter: false,
        }));
      }
    };

    if (state.openFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state.openFilter]);

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
    if (getSalesLocationStartEndDate) {
      dispatch(
        employeeStaffTipGratuityRequest({
          ...getSalesLocationStartEndDate,
          tablePageNo: currentPageEmployeeTipsFeeSummary,
          tableRecordLimit: TABLE_RECORDS_LIMIT,
        })
      );
    }
  }, [getSalesLocationStartEndDate, currentPageEmployeeTipsFeeSummary]);

  useEffect(() => {
    if (getSalesLocationStartEndDate) {
      dispatch(
        employeeStaffPerformanceRequest({
          ...getSalesLocationStartEndDate,
          tablePageNo: currentPageEmployeePerformance,
          tableRecordLimit: TABLE_RECORDS_LIMIT,
        })
      );
    }
  }, [getSalesLocationStartEndDate, currentPageEmployeePerformance]);

  useEffect(() => {
    if (getSalesLocationStartEndDate) {
      dispatch(
        employeeStaffDiscountRequest({
          ...getSalesLocationStartEndDate,
          tablePageNo: currentPageEmployeeDiscount,
          tableRecordLimit: TABLE_RECORDS_LIMIT,
        })
      );
    }
  }, [getSalesLocationStartEndDate, currentPageEmployeeDiscount]);

  useEffect(() => {
    if (getSalesLocationStartEndDate) {
      dispatch(
        employeeStaffActivityRequest({
          ...getSalesLocationStartEndDate,
          tablePageNo: currentPageEmployeeVoidActivity,
          tableRecordLimit: TABLE_RECORDS_LIMIT,
        })
      );
    }
  }, [getSalesLocationStartEndDate, currentPageEmployeeVoidActivity]);

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
          <div className="dates">
            <div className="label-time-period">
              <p>Select Time Period</p>
            </div>
            <div className="filter-toggle-btn-container">
              <div className="filter-toggle-btn" onClick={openFilterDropDown}>
                {state.selectedPeriod} {/* Display the selected option */}
              </div>
              {state.openFilter && (
                <div className="filter-drop-down-options" ref={dropdownRef}>
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
              )}
            </div>
          </div>
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
          <h1>Maghil Restaurant, Parsippany</h1>
        </div>
        <div className="employee-details-container">
          <Table
            currentPage={currentPageEmployeeTipsFeeSummary}
            setCurrentPage={setCurrentPageEmployeeTipsFeeSummary}
            Heading="Employee Summary"
            tableData={employeeSummaryAPIRedux && employeeSummaryAPIRedux?.length > 0 && employeeSummaryAPIRedux}
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
            tableData={employeeDiscountAPIRedux && employeeDiscountAPIRedux?.length > 0 && employeeDiscountAPIRedux}
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
            recordsPerPage={TABLE_RECORDS_LIMIT}
            totalpageNo={employeeVoidActivityTotalPagesRedux}
            tabledataLoading={employeeVoidActivityLoading}
          />
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
        </div>
      </div>
    </div >
  );
};

export default EmployeeInsights;
