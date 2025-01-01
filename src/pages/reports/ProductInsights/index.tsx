import React, { useState, useContext, useEffect, useRef } from "react";
import { ProdI } from "../../../assets/mockData/originalAPIData/OproductInsightsData";
import { S } from "../../../assets/mockData/originalAPIData/OsalesReportData";
import { DDDD } from "../../../assets/mockData/mock D/nested";
import { ThemeContext } from "../../../context/ThemeContext";
import { generateGradient } from "../../../util/color";
import Table from "../../../components/reportComponents/Table";
import BarChart from "../../../components/reportComponents/Charts/BarChart";
import DatePicker from "react-datepicker";
import SidePanel from "pages/SidePanel";
import Topnavbar from "components/reportComponents/TopNavbar";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles
import "./style.scss";

interface TopVoidedItem {
  name: string;
  void_items: number;
}

interface ProductInsightsData {
  "Top Voided Items": TopVoidedItem[];
}

interface ProductInsightsProps {
  data: ProductInsightsData;
}

const ProductInsights: React.FC<ProductInsightsProps> = () => {
  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  console.log({ isDarkTheme });
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [openCustomDateRange, setOpenCustomDateRange] =
    useState<boolean>(false);

  const [currentPageProductSummary, setCurrentPageProductSummary] = useState<number>(1);
  console.log({ currentPageProductSummary })

  const [openStartDatePicker, setOpenStartDatePicker] =
    useState<boolean>(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState<boolean>(false);

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

  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const openFilterDropDown = () => {
    setOpenFilter((op) => !op);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    if (openFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilter]);

  const getTop10Items = (data: ProductInsightsData): TopVoidedItem[] => {
    return data["Top Voided Items"]
      .sort((a: TopVoidedItem, b: TopVoidedItem) => b.void_items - a.void_items)
      .slice(0, 10);
  };

  const top10Items = getTop10Items(ProdI);

  const XtopTenItemName = top10Items.map((item) => item.name);
  const YvoidTenItems = top10Items.map((item) => item.void_items);

  const categoryArray = S["Category - US"].map((item) => item.Category);

  const [openCategoryDropDown, setOpenCategoryDropDown] =
    useState<boolean>(false);
  const [
    selectedCategoryFilterProductSummary,
    setCategoryFilterProductSummary,
  ] = useState<string>("All Categories");

  const toggleCategoryDropDown = () => {
    setOpenCategoryDropDown((op) => !op);
  };

  const [selectedPeriod, setSelectedPeriod] = useState<string>("Today");

  const handleOptionClickForDate = (option: string) => {
    setSelectedPeriod(option);
    if (option === "Custom Range") {
      setOpenCustomDateRange(true);
      setStartDate(new Date());
      setEndDate(new Date());
    } else {
      setOpenCustomDateRange(false);
    }
    setOpenFilter(false);
  };

  const handleOptionClick = (option: string) => {
    setCategoryFilterProductSummary(option);
    if (option === "Custom Range") {
      setOpenCustomDateRange(true);
      setStartDate(new Date());
      setEndDate(new Date());
    } else {
      setOpenCustomDateRange(false);
    }
    setOpenCategoryDropDown(false);
  };

  const [openItems, setOpenItems] = useState(false);
  const toggleItemsDropDown = () => {
    setOpenItems((op) => !op);
  };

  const [selectedItems, setSelectedItems] = useState(DDDD?.Items[0]);

  const handleOptionClickForItems = (option: string) => {
    setSelectedItems(option);
    setOpenItems(false);
  };

  const twentyMostPopulatItemsColors = generateGradient(
    "#428af5",
    "#42d7f5",
    20
  );

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SidePanel />
      <div
        className={`p-product-insights-container ${isDarkTheme ? "p-dark-theme" : "p-light-theme"
          }`}
      >
        <Topnavbar />
        <div className="p-prod-insights-head">
          <div className="p-name-board">
            <h1>Reports Dashboard</h1>
          </div>
          <div className="p-dates">
            <div className="p-label-time-period">
              <p>Select Time Period</p>
            </div>
            <div className="p-filter-toggle-btn-container">
              <div className="p-filter-toggle-btn" onClick={openFilterDropDown}>
                {selectedPeriod}
              </div>
              {openFilter && (
                <div className="p-filter-drop-down-options" ref={dropdownRef}>
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
          <div className="p-date-range-style">
            <label className="p-dateLabel" htmlFor="p-start-date">
              From
            </label>
            <DatePicker
              placeholderText="Start Date"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="dd MMM yyyy"
              className="p-start-date"
              onSelect={() => setOpenStartDatePicker(false)}
              onFocus={() => {
                setOpenStartDatePicker(true);
              }}
            />
            <label className="p-dateLabel" htmlFor="p-end-date">
              To
            </label>
            <DatePicker
              placeholderText="End Date"
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              dateFormat="dd MMM yyyy"
              className="p-end-date"
              onSelect={() => setOpenEndDatePicker(false)}
              onFocus={() => {
                setOpenEndDatePicker(true);
              }}
            />
          </div>
        )}
        <div className="p-location-name">
          <h1>Maghil Restaurant, Parsippany</h1>
        </div>
        <div className="p-top-twenty-popular-items">
          <BarChart
            BatChartTitle="20 Most Popular Items"
            TitleColor={isDarkTheme ? "#fff" : "#000"}
            xAxisData={TopTwentyXaxisData}
            yAxisData={TopTwentyYaxisData}
            label="items"
            backgroundColor={twentyMostPopulatItemsColors}
            borderColor={twentyMostPopulatItemsColors}
            xAxisGridColor={"transparent"}
            xAxislabelColor={isDarkTheme ? "#fff" : "#000"}
            yAxisGridColor={"transparent"}
            yAxislabelColor={isDarkTheme ? "#fff" : "#000"}
            xAxisTicksColor={isDarkTheme ? "#fff" : "#000"}
            yAxisTicksColor={isDarkTheme ? "#fff" : "#000"}
            pluginLegendLabelsColor={isDarkTheme ? "#fff" : "#000"}
            ttTitleColor="#fff"
            ttBodyColor="#fff"
            yAxisLabel="Quantity"
            xAxisLabel="Product Name"
          />
        </div>
        <div className="p-least-twenty-popular-items">
          <BarChart
            BatChartTitle="20 Least Popular Items"
            TitleColor={isDarkTheme ? "#fff" : "#000"}
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
            xAxisGridColor={"transparent"}
            yAxisGridColor={"transparent"}
            xAxislabelColor={isDarkTheme ? "#fff" : "#000"}
            yAxislabelColor={isDarkTheme ? "#fff" : "#000"}
            xAxisTicksColor={isDarkTheme ? "#fff" : "#000"}
            yAxisTicksColor={isDarkTheme ? "#fff" : "#000"}
            pluginLegendLabelsColor={isDarkTheme ? "#fff" : "#000"}
            ttTitleColor="#fff"
            ttBodyColor="#fff"
            yAxisLabel="Quantity"
            xAxisLabel="Product Name"
          />
        </div>
        <div className="p-top-ten-voided-items">
          <BarChart
            BatChartTitle="Top 10 Cancelled Items"
            TitleColor={isDarkTheme ? "#fff" : "#000"}
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
            xAxislabelColor={isDarkTheme ? "#fff" : "#000"}
            xAxisLabel="Product Name"
            yAxislabelColor={isDarkTheme ? "#fff" : "#000"}
          />
        </div>
        <div className="p-top-cancelled-items">
          <BarChart
            BatChartTitle="Top Cancellation Reasons"
            TitleColor={isDarkTheme ? "#fff" : "#000"}
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
            xAxislabelColor={isDarkTheme ? "#fff" : "#000"}
            xAxisLabel="Cancel Reasons"
            yAxislabelColor={isDarkTheme ? "#fff" : "#000"}
          />
        </div>
        <div className="p-product-summary-dropdown-cont">
          <p>Filter By Category/Item</p>
          <div className="p-filter-toggle-btn-container">
            <div
              className="p-filter-toggle-btn"
              onClick={toggleCategoryDropDown}
            >
              {selectedCategoryFilterProductSummary}
            </div>
            {openCategoryDropDown && (
              <div className="p-filter-drop-down-options">
                {categoryArray.map((category) => (
                  <p key={category} onClick={() => handleOptionClick(category)}>
                    {category}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="p-filter-toggle-btn-container">
            <div className="p-filter-toggle-btn" onClick={toggleItemsDropDown}>
              {selectedItems}
            </div>
            {openItems && (
              <div className="p-filter-drop-down-options">
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
          currentPage={currentPageProductSummary}
          setCurrentPage={setCurrentPageProductSummary}
          Heading="Product Summary"
          tableData={ProdI["Product Summary US"]}
          viewType="full"
          recordsPerPage={24}
        />
      </div>
    </div>
  );
};

export default ProductInsights;
