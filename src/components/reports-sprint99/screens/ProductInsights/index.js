import React, { useState, useContext } from "react";
import { ProdI } from "../../originalAPIData/OproductInsightsData";
import { S } from "../../originalAPIData/OsalesReportData";
import { DDDD } from "../../mock D/nested";
import Table from "../../components/Table";
import BarChart from "../../components/Charts/BarChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import { ThemeContext } from "../../context/ThemeContext";
import "./style.scss";
import moment from "moment";
// import { gradientColors } from "../../utils/color";
import { generateGradient } from "../../utils/color";

const ProductInsights = () => {
  const {isDarkTheme} = useContext(ThemeContext);
  const [startDate, setStartDate] = useState("2023-08-06");
  const [endDate, setEndDate] = useState("2024-08-06");
  const [openCustomDateRange, setOpenCustomDateRange] = useState(false);

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const displayCustomDateRange = () => {
    setOpenCustomDateRange((op) => !op);
  };

  const ProdTopTwenty = ProdI["Top 20 Popular Items"];
  const TopTwentyXaxisData = ProdTopTwenty.map((item) => item["Product name"]);
  const TopTwentyYaxisData = ProdTopTwenty.map((item) => item.Quantity);

  const ProdICancelReasonData = ProdI["Top Cancel Reasons"];
  const XCancelReasonLabels = ProdICancelReasonData.map(
    (item) => item.cancel_rsn
  );
  const Yvoid_items = ProdICancelReasonData.map((item) => item.void_items);

  const topTwentyLeast = ProdI["Least 20 Popular Items"];
  const LeastTwentyItemX = topTwentyLeast.map((item) => item["Product name"]);
  const LeastTwentyItemY = topTwentyLeast.map((item) => item.Quantity);

  const [openFilter, setOpenFilter] = useState(false);

  const openFilterDropDown = () => {
    setOpenFilter((op) => !op);
  };

  //==========================================================================//

  const getTop10Items = (data) => {
    return data["Top Voided Items"]
      .sort((a, b) => b.void_items - a.void_items)
      .slice(0, 10);
  };

  const top10Items = getTop10Items(ProdI);

  const XtopTenItemName = top10Items.map((item) => item.name);
  const YvoidTenItems = top10Items.map((item) => item.void_items);

  const categoryArray = S["Category - US"].map((item) => item.Category);

  const [openCategoryDropDown, setOpenCategoryDropDown] = useState(false);
  const [
    selectedCategoryFilterProductSummary,
    setCategoryFilterProductSummary,
  ] = useState("All Categories");

  const toggleCategoryDropDown = () => {
    setOpenCategoryDropDown((op) => !op);
  };

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

  const handleOptionClick = (option) => {
    setCategoryFilterProductSummary(option);
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
    setOpenCategoryDropDown(false);
  };

  const [openItems, setOpenItems] = useState(false);
  const toggleItemsDropDown = () => {
    setOpenItems((op) => !op);
  };

  const [selectedItems, setSelectedItems] = useState(DDDD?.Items[0]);

  const handleOptionClickForItems = (option) => {
    setSelectedItems(option);
    setOpenItems(false);
  };

  const twentyMostPopulatItemsColors = generateGradient(
    "#428af5",
    "#42d7f5",
    20
  );
  console.log({ twentyMostPopulatItemsColors });

  return (
    <div
      className={`product-insights-container ${
        isDarkTheme ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="prod-insights-head">
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
      <div className="location-name">
        <h1>Maghil Restaurant, Parsippany</h1>
      </div>
      <div className="top-twenty-popular-items">
        <BarChart
          BatChartTitle="20 Most Popular Items"
          xAxisData={TopTwentyXaxisData}
          yAxisData={TopTwentyYaxisData}
          label="items"
          backgroundColor={twentyMostPopulatItemsColors}
          borderColor={twentyMostPopulatItemsColors}
          xAxisGridColor={"transparent"}
          yAxisGridColor={"transparent"}
          xAxisTicksColor={isDarkTheme ? "#fff" : "#000"}
          yAxisTicksColor={isDarkTheme ? "#fff" : "#000"}
          pluginLegendLabelsColor={isDarkTheme ? "#fff" : "#000"}
          ttTitleColor="#fff"
          ttBodyColor="#fff"
          yAxisLabel="Quantity"
          xAxisLabel="Product Name"
        />
      </div>
      <div className="least-twenty-popular-items">
        <BarChart
          BatChartTitle="20 Least Popular Items"
          xAxisData={LeastTwentyItemX}
          yAxisData={LeastTwentyItemY}
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
          // xAxisGridColor={isDarkTheme ? "#283347" : "#ccc"}
          // yAxisGridColor={isDarkTheme ? "#283347" : "#ccc"}
          xAxisGridColor={"transparent"}
          yAxisGridColor={"transparent"}
          xAxisTicksColor={isDarkTheme ? "#fff" : "#000"}
          yAxisTicksColor={isDarkTheme ? "#fff" : "#000"}
          pluginLegendLabelsColor={isDarkTheme ? "#fff" : "#000"}
          ttTitleColor="#fff"
          ttBodyColor="#fff"
          yAxisLabel="Quantity"
          xAxisLabel="Product Name"
        />
      </div>
      <div className="top-ten-voided-items">
        <BarChart
          BatChartTitle="Top 10 Cancelled Items"
          xAxisData={XtopTenItemName}
          yAxisData={YvoidTenItems}
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
          yAxisLabel="Quantity"
          xAxisLabel="Product Name"
        />
      </div>
      <div className="top-cancelled-items">
        <BarChart
          BatChartTitle="Top Cancellation Reasons"
          xAxisData={XCancelReasonLabels}
          yAxisData={Yvoid_items}
          label="count"
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
          yAxisLabel="Count"
          xAxisLabel="Cancel Reasons"
        />
      </div>
      <div className="product-summary-dropdown-cont">
        <p>Filter By Category/Item</p>
        <div className="filter-toggle-btn-container">
          <div className="filter-toggle-btn" onClick={toggleCategoryDropDown}>
            {selectedCategoryFilterProductSummary}
          </div>
          {openCategoryDropDown && (
            <div className="filter-drop-down-options">
              {categoryArray.map((category) => (
                <p key={category} onClick={() => handleOptionClick(category)}>
                  {category}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="filter-toggle-btn-container">
          <div className="filter-toggle-btn" onClick={toggleItemsDropDown}>
            {selectedItems}
          </div>
          {openItems && (
            <div className="filter-drop-down-options">
              {DDDD.Items.map((category) => (
                <p
                  key={category}
                  onClick={() => handleOptionClickForItems(category)}
                >
                  {category}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <Table
        Heading="Product Summary"
        tableData={ProdI["Product Summary US"]}
        viewType="full"
        recordsPerPage={24}
      />
    </div>
  );
};

export default ProductInsights;
