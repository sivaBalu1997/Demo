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
import Topnavbar from "components/reportComponents/TopNavbar";
import { Contextpagejs } from "pages/productCatalog/contextpage";

interface PaymentModeData {
  "Payment Mode": string;
  "#Total Orders": number;
  "#Amount Paid": number;
}

interface DayOfTheWeekData {
  day: string;
  "Average Sales in Dollars": number;
}

interface HourOfTheDayData {
  Hour: string;
  "Average Sales per Hour": number;
}

interface SalesState {
  startDate: Date;
  endDate: Date;
  openCustomDateRange: boolean;
  openStartDatePicker: boolean;
  openEndDatePicker: boolean;
  openFilter: boolean;
  selectedPeriod: string;
}

interface ChartOptions {
  animationEnabled: boolean;
  exportEnabled: boolean;
  theme: "light1" | "dark1" | "dark2";
  title: {
    text: string;
    fontSize: number;
  };
  data: Array<{
    type: "pie";
    indexLabel: string;
    indexLabelPlacement: string;
    indexLabelFontSize: number;
    startAngle: number;
    dataPoints: Array<{
      label: string;
      y: number;
    }>;
    toolTipContent: string;
    showInLegend: string;
    legendText: string;
  }>;
  backgroundColor: string;
}

const Sales: React.FC = () => {
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  const [state, setState] = useState<SalesState>({
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    openCustomDateRange: false,
    openStartDatePicker: false,
    openEndDatePicker: false,
    openFilter: false,
    selectedPeriod: "Today",
  });

  const formatNumberIndian = (number: number): string => {
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

  const transformedDataForCanvaPie = S["Payment Mode"].map(
    (item: PaymentModeData) => ({
      label: item["Payment Mode"],
      y: item["#Total Orders"],
    })
  );

  const backgroundColorForPie = isDarkTheme ? "#222b3c" : "#fff";

  const options: ChartOptions = {
    animationEnabled: true,
    exportEnabled: false,
    theme: isDarkTheme ? "dark1" : "light1",
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

  const transformedDataForCanvaPieDollars = S["Payment Mode"].map(
    (item: PaymentModeData) => ({
      label: item["Payment Mode"],
      y: parseFloat(item["#Amount Paid"].toFixed(0)),
    })
  );

  const optionsDolla: ChartOptions = {
    animationEnabled: true,
    exportEnabled: false,
    theme: isDarkTheme ? "dark1" : "light1",
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

  const openFilterDropDown = () => {
    setState((prevState) => ({
      ...prevState,
      openFilter: !prevState.openFilter,
    }));
  };

  const handleOptionClick = (option: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedPeriod: option,
      openCustomDateRange: option === "Select Custom Date Range",
      openStartDatePicker: option === "Select Custom Date Range",
      openEndDatePicker: option === "Select Custom Date Range",
      startDate:
        option === "Select Custom Date Range"
          ? moment().toDate()
          : prevState.startDate,
      endDate:
        option === "Select Custom Date Range"
          ? moment().toDate()
          : prevState.endDate,
      openFilter: false,
    }));
  };

  const XAvgSalesinDolla = S["Day of the Week"].map(
    (item: DayOfTheWeekData) => item["Average Sales in Dollars"]
  );
  const YdayofTheWeekDA = S["Day of the Week"].map(
    (item: DayOfTheWeekData) => item.day
  );

  const XHour = S["Hour of the Day"].map((item: HourOfTheDayData) => item.Hour);
  const YAverageSalesperHour = S["Hour of the Day"].map(
    (item: HourOfTheDayData) => item["Average Sales per Hour"]
  );

  // console.log({ isExpanded });

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SidePanel />
      {/* <div className={`${isExpanded ? "alignment-fix-class" : ""}`}> */}
      <div
        className={`s-sales-container ${
          isDarkTheme ? "sales-dark-theme" : "sales-light-theme"
        } ${isExpanded ? "s-expanded-width-sales" : ""}`}
      >
        <Topnavbar />
        <div className="s-sales-head">
          <div className="s-name-board">
            <h1>Reports Dashboard</h1>
          </div>
          <div className="s-dates">
            <div className="s-label-time-period">
              <p>Select Time Period</p>
            </div>
            <div className="s-filter-toggle-btn-container">
              <div className="s-filter-toggle-btn" onClick={openFilterDropDown}>
                {state.selectedPeriod}
              </div>
              {state.openFilter && (
                <div className="s-filter-drop-down-options">
                  <p onClick={() => handleOptionClick("Today")}>Today</p>
                  <p onClick={() => handleOptionClick("This Week")}>
                    This Week
                  </p>
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
                    onClick={() =>
                      handleOptionClick("Select Custom Date Range")
                    }
                  >
                    Select Custom Date Range
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {state.openCustomDateRange && (
          <div className="s-date-range-style">
            <label className="dateLabel" htmlFor="s-start-date">
              From
            </label>
            <DatePicker
              placeholderText="Start Date"
              selected={state.startDate}
              onChange={(date: Date | null) =>
                date &&
                setState((prevState) => ({ ...prevState, startDate: date }))
              }
              dateFormat="dd MMM yyyy"
              className="s-start-date"
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
            <label className="dateLabel" htmlFor="s-end-date">
              To
            </label>
            <DatePicker
              placeholderText="End Date"
              selected={state.endDate}
              onChange={(date: Date | null) =>
                date &&
                setState((prevState) => ({ ...prevState, endDate: date }))
              }
              dateFormat="dd MMM yyyy"
              className="s-end-date"
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
        <div className="s-name-board-two">
          <h1>Maghil Restaurant, Parsippany</h1>
        </div>
        <div className="s-overall-summary">
          <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
            <h2>
              {formatNumberIndian(
                Number(S["Total Sales Processed"][0]["count(o.id)"].toFixed(0))
              )}
            </h2>
            <h3>Total Orders</h3>
          </div>
          <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
            <h2>
              $
              {formatNumberIndian(
                Number(S["Total Sales"][0]["Gross Sales"].toFixed(0))
              )}
            </h2>
            <h3>Total Sales</h3>
          </div>
          <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
            <h2>
              $
              {formatNumberIndian(
                Number(S["Net Sales"][0]["Net Sales"].toFixed(0))
              )}
            </h2>
            <h3>Net Sales</h3>
          </div>
          <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
            <h2>
              ${formatNumberIndian(Number(S["Tips - US"][0].Tips.toFixed(0)))}
            </h2>
            <h3>Tips</h3>
          </div>
          <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
            <h2>
              ${formatNumberIndian(Number(S["Tax - US"][0].Tax.toFixed(0)))}
            </h2>
            <h3>Tax</h3>
          </div>
        </div>
        <div className="s-day-of-the-week">
          <div className="s-day-of-the-week-inner">
            <BarChart
              BatChartTitle="Sales By Hour of the Day"
              TitleColor={isDarkTheme ? "#fff" : "#000"}
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
              xAxislabelColor={isDarkTheme ? "#fff" : "#000"}
              xAxisLabel="Hours"
              yAxislabelColor={isDarkTheme ? "#fff" : "#000"}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="s-canva-pie-chart-outer-cont">
            <div className="s-canva-pie-chart-cont">
              <CanvaPieChart options={options} />
            </div>
            <div className="s-canva-pie-chart-cont">
              <CanvaPieChart options={optionsDolla} />
            </div>
          </div>
        </div>
        <div className="s-day-of-the-week">
          <div className="s-day-of-the-week-inner">
            <BarChart
              BatChartTitle="Sales By Day of the Week"
              TitleColor={isDarkTheme ? "#fff" : "#000"}
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
              yAxisLabel="Average Sales in Dollars"
              yAxislabelColor={isDarkTheme ? "#fff" : "#000"}
              xAxisLabel="Days"
              xAxislabelColor={isDarkTheme ? "#fff" : "#000"}
            />
          </div>
        </div>
        <div className="s-tab-cont">
          <div className="s-table-container-one-s">
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
        <div className="s-tab-cont">
          <div className="s-table-container-two-s">
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
      {/* </div> */}
    </div>
  );
};

export default Sales;
