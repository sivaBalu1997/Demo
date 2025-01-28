import React, { useContext, useEffect, useRef, useState } from "react";
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
  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [openFilter, setOpenFilter] = useState(false);
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [chartType, setChartType] = useState<string>("Bar");

  const [totalPageNoCurrentPageEmployeeTipsFeeSummary, setTotalPageNoCurrentPageEmployeeTipsFeeSummary] = useState<number>(5);
  const [currentPageEmployeeTipsFeeSummary, setCurrentPageEmployeeTipsFeeSummary] = useState<number>(1);

  const [totalPageNoCurrentPageSalesByEmployeeDetails, setTotalPageNoCurrentPageSalesByEmployeeDetails] = useState<number>(5)
  const [currentPageSalesByEmployeeDetails, setCurrentPageSalesByEmployeeDetails] = useState<number>(1);

  const [openStartDatePicker, setOpenStartDatePicker] =
    useState<boolean>(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState<boolean>(false);

  const openFilterDropDown = () => {
    setOpenFilter((op) => !op);
  };
  const [openCustomDateRange, setOpenCustomDateRange] = useState(false);

  // const XemployeeNameBar = EmployeeD["Sales By Employee"].map(
  //   (item) => item["Employee Name"]
  // );

  // const YemployeeSalesBar = EmployeeD["Sales By Employee"].map(
  //   (item) => item.Sales
  // );

  const [selectedPeriod, setSelectedPeriod] = useState("Today");

  const handleOptionClickForDate = (option: string) => {
    setSelectedPeriod(option);
    if (option === "Custom Range") {
      setOpenCustomDateRange(true);
    } else {
      setOpenCustomDateRange(false);
    }
    setOpenFilter(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  // Data/Config For Pie Chart start ====================================================
  const empTips = EmployeeD["Employee Performance"]?.map((items: any) => ({
    label: items["Employee"],
    y: items["Tips"]
  }))

  console.log("qqqq", { empTips })
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
  console.log("qqqq", { empNameBarX })
  const empSalesBarY = EmployeeD["Employee Performance"]?.map((items: any) => items["Orders Handled"]);
  console.log("qqqq", { empSalesBarY })
  // Data/Config For Bar Chart end ====================================================

  // Data/Config For Line Chart Start ====================================================
  const empLineX = EmployeeD["Employee Performance"]?.map((items: any) => ({
    label: items["Employee"],
    y: items["Sales"]
  }));
  console.log("qqqq", { empLineX })
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
    console.log("Selected Option:", selectedOption);
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
                {selectedPeriod} {/* Display the selected option */}
              </div>
              {openFilter && (
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
        {openCustomDateRange && (
          <div className="e-date-range-style">
            <label className="e-dateLabel" htmlFor="e-start-date">
              From
            </label>
            <DatePicker
              placeholderText="Start Date"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="dd MMM yyyy"
              className="e-start-date"
              onSelect={() => setOpenStartDatePicker(false)}
              onFocus={() => {
                setOpenStartDatePicker(true);
              }}
            />
            <label className="e-dateLabel" htmlFor="e-end-date">
              To
            </label>
            <DatePicker
              placeholderText="End Date"
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              dateFormat="dd MMM yyyy"
              className="e-end-date"
              onSelect={() => setOpenEndDatePicker(false)}
              onFocus={() => {
                setOpenEndDatePicker(true);
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
            tableData={EmployeeD["Employee Summary"]}
            viewType="full"
            recordsPerPage={6}
            totalpageNo={totalPageNoCurrentPageEmployeeTipsFeeSummary}
          />
        </div>
        <div className="employee-details-container">
          <Table
            currentPage={currentPageSalesByEmployeeDetails}
            setCurrentPage={setCurrentPageSalesByEmployeeDetails}
            Heading="Employee Performance"
            tableData={EmployeeD["Employee Performance"]}
            viewType="full"
            recordsPerPage={6}
            totalpageNo={totalPageNoCurrentPageSalesByEmployeeDetails}
          />
        </div>
        <div className="employee-details-container">
          <Table
            currentPage={currentPageSalesByEmployeeDetails}
            setCurrentPage={setCurrentPageSalesByEmployeeDetails}
            Heading="Employee Discount"
            tableData={EmployeeD["Employee Discount"]}
            viewType="full"
            recordsPerPage={6}
            totalpageNo={totalPageNoCurrentPageSalesByEmployeeDetails}
          />
        </div>
        <div className="employee-details-container">
          <Table
            currentPage={currentPageSalesByEmployeeDetails}
            setCurrentPage={setCurrentPageSalesByEmployeeDetails}
            Heading="Employee Void Activity"
            tableData={EmployeeD["Employee Void Activity"]}
            viewType="full"
            recordsPerPage={6}
            totalpageNo={totalPageNoCurrentPageSalesByEmployeeDetails}
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
