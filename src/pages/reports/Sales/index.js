import React, { useContext, useState } from "react";
import { S } from "../../../assets/mockData/originalAPIData/OsalesReportData";
import Table from "../../../components/reportComponents/Table";
import CanvaPieChart from "../../../components/reportComponents/Charts/CanvaPieChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ThemeContext } from "../../../helpers/context/ThemeContext";
import BarChart from "../../../components/reportComponents/Charts/BarChart";
import "./style.scss";
import moment from "moment";
import SidePanel from "pages/SidePanel";

const Sales = () => {
  const {isDarkTheme}= useContext(ThemeContext);
  const [startDate, setStartDate] = useState(moment().format("MM-DD-YYYY"));
  const [endDate, setEndDate] = useState(moment().format("MM-DD-YYYY"));
  const [openCustomDateRange, setOpenCustomDateRange] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const displayCustomDateRange = () => {
    setOpenCustomDateRange((op) => !op);
  };

  const formatNumberIndian = (number) => {
    let numStr = number.toString();
    let [integerPart, decimalPart] = numStr.split(".");

    let lastThree = integerPart.substring(integerPart.length - 3);
    let otherNumbers = integerPart.substring(0, integerPart.length - 3);
    if (otherNumbers !== "") {
      lastThree = "," + lastThree;
    }
    let formatted =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    if (decimalPart) {
      formatted += "." + decimalPart;
    }

    return formatted;
  };

  const transformedDataForCanvaPie = S["Payment Mode"].map((item) => ({
    label: item["Payment Mode"],
    y: item["#Total Orders"],
  }));

  const backgroundColorForPie = isDarkTheme ? "#222b3c" : "#fff";

  const options = {
    animationEnabled: true,
    exportEnabled: false,
    theme: isDarkTheme ? "dark1" : "light1", // "light1", "dark1", "dark2"
    title: {
      text: "Orders By Channel",
      fontSize: 30,
    },
    data: [
      {
        type: "pie",
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        indexLabelFontSize: 14,
        startAngle: -90,
        dataPoints: transformedDataForCanvaPie,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
      },
    ],
    backgroundColor: backgroundColorForPie || "#ffffff",
  };

  const transformedDataForCanvaPieDollars = S["Payment Mode"].map((item) => ({
    label: item["Payment Mode"],
    y: parseFloat(item["#Amount Paid"].toFixed(0)),
  }));

  const optionsDolla = {
    animationEnabled: true,
    exportEnabled: false,
    theme: isDarkTheme ? "dark1" : "light1", // "light1", "dark1", "dark2"
    title: {
      text: "Sales By Channel",
      fontSize: 30,
    },
    data: [
      {
        type: "pie",
        indexLabel: "'$'{y}",
        indexLabelPlacement: "inside",
        indexLabelFontSize: 14,
        startAngle: -90,
        dataPoints: transformedDataForCanvaPieDollars,
        toolTipContent: "<b>{label}</b>: '$'{y}",
        showInLegend: "true",
        legendText: "{label}",
      },
    ],
    backgroundColor: backgroundColorForPie || "#ffffff",
  };

  const [openFilter, setOpenFilter] = useState(false);

  const openFilterDropDown = () => {
    setOpenFilter((op) => !op);
  };
  const [selectedPeriod, setSelectedPeriod] = useState("Today");

  const handleOptionClick = (option) => {
    setSelectedPeriod(option);
    if (option === "Select Custom Date Range") {
      setOpenCustomDateRange(true);
      setOpenStartDatePicker(true);
      setOpenEndDatePicker(true);
      setStartDate(moment().format("MM-DD-YYYY"));
      setEndDate(moment().format("MM-DD-YYYY"));
    } else {
      setOpenCustomDateRange(false);
      setOpenStartDatePicker(false);
      setOpenEndDatePicker(false);
    }
    setOpenFilter(false);
  };

  const XAvgSalesinDolla = S["Day of the Week"].map(
    (item) => item["Average Sales in Dollars"]
  );
  const YdayofTheWeekDA = S["Day of the Week"].map((item) => item.day);

  const XHour = S["Hour of the Day"].map((item) => item.Hour);
  const YAverageSalesperHour = S["Hour of the Day"].map(
    (item) => item["Average Sales per Hour"]
  );

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <SidePanel />
      <div
      className={`sales-container ${
        isDarkTheme ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="sales-head">
        <div className="name-board">
          <h1>Reports Dashboard</h1>
        </div>
        <div className="dates">
          <div className="label-time-period">
            <p>Select Time Period</p>
          </div>
          <div className="filter-toggle-btn-container">
            <div className="filter-toggle-btn" onClick={openFilterDropDown}>
              {selectedPeriod}
            </div>
            {openFilter && (
              <div className="filter-drop-down-options">
                <p onClick={() => handleOptionClick("Today")}>Today</p>
                <p onClick={() => handleOptionClick("This Week")}>This Week</p>
                <p onClick={() => handleOptionClick("Last 7 days")}>
                  Last 7 days
                </p>
                <p onClick={() => handleOptionClick("This Month")}>
                  This Month
                </p>
                <p onClick={() => handleOptionClick("Last Month")}>
                  Last Month
                </p>
                <p onClick={() => handleOptionClick("Last 30 days")}>
                  Last 30 days
                </p>
                <p
                  onClick={() => handleOptionClick("Select Custom Date Range")}
                >
                  Select Custom Date Range
                </p>
              </div>
            )}
          </div>
          {openCustomDateRange && (
            <div className="date-range-style">
              <DatePicker
                placeholderText="Start Date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd MMM yyyy"
                className="start-date"
                open={openStartDatePicker}
                onSelect={() => setOpenStartDatePicker(false)}
                onFocus={() => {
                  setOpenStartDatePicker(true);
                  setOpenEndDatePicker(true);
                }}
              />
              <DatePicker
                placeholderText="End Date"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd MMM yyyy"
                className="end-date"
                open={openEndDatePicker}
                onSelect={() => setOpenEndDatePicker(false)}
                onFocus={() => {
                  setOpenStartDatePicker(true);
                  setOpenEndDatePicker(true);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="name-board-two">
        <h1>Maghil Restaurant, Parsippany</h1>
      </div>
      <div className="overall-summary">
        <div className="box">
          <h2>
            {formatNumberIndian(
              S["Total Sales Processed"][0]["count(o.id)"].toFixed(0)
            )}
          </h2>
          <h3>Total Orders</h3>
        </div>
        <div className="box">
          <h2>
            ${formatNumberIndian(S["Total Sales"][0]["Gross Sales"].toFixed(0))}
          </h2>
          <h3>Total Sales</h3>
        </div>
        <div className="box">
          <h2>
            ${formatNumberIndian(S["Net Sales"][0]["Net Sales"].toFixed(0))}
          </h2>
          <h3>Net Sales</h3>
        </div>
        <div className="box">
          <h2>${formatNumberIndian(S["Tips - US"][0].Tips.toFixed(0))}</h2>
          <h3>Tips</h3>
        </div>
        <div className="box">
          <h2>${formatNumberIndian(S["Tax - US"][0].Tax.toFixed(0))}</h2>
          <h3>Tax</h3>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="canva-pie-chart-outer-cont">
          <div className="canva-pie-chart-cont">
            <CanvaPieChart options={options} />
          </div>
          <div className="canva-pie-chart-cont">
            <CanvaPieChart options={optionsDolla} />
          </div>
        </div>
      </div>
      <div className="day-of-the-week">
        <div className="day-of-the-week-inner">
          <BarChart
            BatChartTitle="Sales By Hour of the Day"
            xAxisData={XHour}
            yAxisData={YAverageSalesperHour}
            label="Dollars"
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
            yAxisLabel="Average Sales per Hour"
            xAxisLabel="Hours"
          />
        </div>
      </div>
      <div className="day-of-the-week">
        <div className="day-of-the-week-inner">
          <BarChart
            BatChartTitle="Sales By Day of the Week"
            xAxisData={YdayofTheWeekDA}
            yAxisData={XAvgSalesinDolla}
            label="Dollars"
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
            yAxisLabel="Average Sales in Dollars "
            xAxisLabel="Days"
          />
        </div>
      </div>
      <div className="tab-cont">
        <div className="table-container-one-s">
          <Table
            Heading="Sales By Item Category"
            tableData={S["Category - US"]}
            viewType="half"
            recordsPerPage={6}
          />
          <Table
            Heading="Sales By Revenue Class"
            tableData={S["Revenue Class"]}
            viewType="half"
            recordsPerPage={5}
          />
        </div>
      </div>
      <div className="tab-cont">
        <div className="table-container-two-s">
          <Table
            Heading="Discount Summary"
            tableData={S["Discount Summary"]}
            viewType="half"
            recordsPerPage={5}
          />
          <Table
            Heading="Cancellation Summary"
            tableData={S["Cancel Item Tracker"]}
            viewType="half"
            recordsPerPage={5}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Sales;
