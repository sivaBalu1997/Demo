import React, { useContext, useState } from "react";
import { checkInD } from "../../../assets/mockData/originalAPIData/OcheckinData";
import Table from "../../../components/reportComponents/Table";
import ReusableCanvaChart from "../../../components/reportComponents/Charts/ReusabeCanvaChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ThemeContext } from "../../../helpers/context/ThemeContext";
import BarChart from "../../../components/reportComponents/Charts/BarChart";
import { S } from "../../../assets/mockData/originalAPIData/OsalesReportData";
import moment from "moment";
import "./style.scss";

const CheckIn = () => {
  const [startDate, setStartDate] = useState("2023-08-06");
  const [endDate, setEndDate] = useState("2024-08-06");
  const {isDarkTheme}= useContext(ThemeContext);
  const [openFilter, setOpenFilter] = useState(false);
  const [openCustomDateRange, setOpenCustomDateRange] = useState(false);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const displayCustomDateRange = () => {
    setOpenCustomDateRange((op) => !op);
  };

  const openFilterDropDown = () => {
    setOpenFilter((op) => !op);
  };

  const transformDataByChannelForStackBar = (data, channelName) => {
    return data
      .filter((point) => point.channel_name === channelName)
      .map((point) => ({
        label: point.reservation_time,
        y: point.count,
      }));
  };

  const onlineData = transformDataByChannelForStackBar(
    checkInD["Daily Hourly CheckIn"],
    "ONLINE"
  );
  const merchantData = transformDataByChannelForStackBar(
    checkInD["Daily Hourly CheckIn"],
    "MERCHANT"
  );

  const MockchartOptions = {
    animationEnabled: true,
    theme: isDarkTheme ? "dark1" : "light2",
    title: {
      text: "Daily Hourly CheckIn",
      fontSize: "28",
    },
    axisY: {
      title: "Count",
      gridColor: isDarkTheme ? "#445678" : "#cccccc",
    },
    axisX: {
      title: "Reservation Time",
      gridColor: isDarkTheme ? "#445678" : "#cccccc",
    },
    legend: {
      cursor: "pointer", // Makes the legend items clickable
      itemclick: (e) => {
        if (
          typeof e.dataSeries.visible === "undefined" ||
          e.dataSeries.visible
        ) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
      horizontalAlign: "center",
      verticalAlign: "bottom",
      reversed: true,
    },
    toolTip: {
      shared: true,
      reversed: true,
    },
    data: [
      {
        type: "stackedColumn",
        name: "Online",
        showInLegend: true,
        dataPoints: onlineData,
      },
      {
        type: "stackedColumn",
        name: "Merchant",
        showInLegend: true,
        dataPoints: merchantData,
      },
    ],
    backgroundColor: isDarkTheme ? "#222b3c" : "#ffffff",
  };

  const peakData = [];
  const offPeakData = [];

  checkInD["Daily Dine In Time"]?.forEach((item) => {
    if (item["Peak Time"] === "Peak") {
      peakData.push({ x: item.party_size, y: item["Dine Tine"] });
    } else {
      offPeakData.push({ x: item.party_size, y: item["Dine Tine"] });
    }
  });

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

  const XAvgSalesinDolla = S["Day of the Week"].map(
    (item) => item["Average Sales in Dollars"]
  );
  const YdayofTheWeekDA = S["Day of the Week"].map((item) => item.day);

  const [selectedPeriod, setSelectedPeriod] = useState("Today");

  const handleOptionClickForDate = (option) => {
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

  return (
    <div
      className={`checkin-container ${
        isDarkTheme ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="checkin-head">
        <div className="checkin-name-board">
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
                    handleOptionClickForDate("Select Custom Date Range")
                  }
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
              />
              <DatePicker
                placeholderText="End Date"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd MMM yyyy"
                className="end-date"
              />
            </div>
          )}
        </div>
      </div>
      <div className="checkin-name-board-two">
        <h1>Maghil Restaurant, Parsippany</h1>
      </div>
      <div className="overall-summary">
        <div className="box">
          <h2>
            {formatNumberIndian(
              checkInD["Daily Checkin"].map((item) => item.count)
            )}
          </h2>
          <h3>Total CheckIns</h3>
        </div>
        <div className="box">
          <h2>
            {formatNumberIndian(
              checkInD.Cancellations.map((item) => item.count)
            )}
          </h2>
          <h3>Cancellations</h3>
        </div>
        <div className="box">
          <h2>
            {formatNumberIndian(
              checkInD["Repeat Customers Count"].map((item) => item["count(*)"])
            )}
          </h2>
          <h3>Repeat Customers</h3>
        </div>
        <div className="box">
          <h2>2,400</h2>
          <h3>New Customers</h3>
        </div>
      </div>
      <div className="canva-stacked-bar-container">
        <ReusableCanvaChart options={MockchartOptions} />
      </div>
      <div className="day-of-the-week">
        <div className="day-of-the-week-inner">
          <BarChart
            BatChartTitle="Check-In Weekly Trend"
            xAxisData={YdayofTheWeekDA}
            yAxisData={XAvgSalesinDolla}
            label="items"
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
      <div className="repeat-customers-table-container">
        <Table
          tableData={checkInD["Repeat Customers"]}
          viewType="full"
          recordsPerPage={9}
          Heading="Repeat Customers"
        />
      </div>
      <div className="daily-checkin-table-container">
        <Table
          tableData={checkInD["Daily CheckIn Details"]}
          viewType="full"
          recordsPerPage={11}
          Heading="Daily CheckIn Details"
        />
      </div>
    </div>
  );
};

export default CheckIn;
