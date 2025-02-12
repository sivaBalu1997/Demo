import React, { useContext, useState } from "react";
import { checkInD } from "../../../assets/mockData/originalAPIData/OcheckinData";
import { ThemeContext } from "../../../context/ThemeContext";
import { S } from "../../../assets/mockData/originalAPIData/OsalesReportData";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { DateRangeStateInterface } from "interface/newReportsInterface";
import { useSelector } from "react-redux";
import Table from "../../../components/reportComponents/Table";
import ReusableCanvaChart from "../../../components/reportComponents/Charts/ReusabeCanvaChart";
import BarChart from "../../../components/reportComponents/Charts/BarChart";
import SidePanel from "pages/SidePanel";
import Topnavbar from "components/reportComponents/TopNavbar";
import moment from "moment";
import useSalesLocationDates from "hooks/useSalesLocationDates";
import DateFilterDropdown from "components/reportComponents/DateFilterDropdown";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import SummaryBox from "components/reportComponents/SummaryBox";

declare namespace CanvasJS {
  interface ChartEventArgs {
    chart: any;
    dataPoint: any;
    dataSeries: any;
    index: number;
  }
}

const CheckIn: React.FC = () => {
  const locationid = useSelector((state: any) => state?.auth?.credentials?.locationId)
  const [state, setState] = useState<DateRangeStateInterface>({
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    openCustomDateRange: false,
    openStartDatePicker: false,
    openEndDatePicker: false,
    openFilter: false,
    selectedPeriod: "Yesterday",
  });

  const getLocationDates = useSalesLocationDates(state, locationid);

  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };

  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  const [totalPageNoCurrentPageRepeatCustomers, setTotalPageNoCurrentPageRepeatCustomers] = useState<number>(5)
  const [currentPageRepeatCustomers, setCurrentPageRepeatCustomers] = useState<number>(1);

  const [totalPageNoCurrentPageDailyCheckInDetails, setTotalPageNoCurrentPageDailyCheckInDetails] = useState<number>(5)
  const [currentPageDailyCheckInDetails, setCurrentPageDailyCheckInDetails] = useState<number>(1);


  const transformDataByChannelForStackBar = (
    data: { channel_name: string; reservation_time: string; count: number }[],
    channelName: string
  ) => {
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

  const MockchartOptions: {
    animationEnabled: boolean;
    exportEnabled: boolean;
    theme: string;
    title: {
      text: string;
      fontSize: string;
    };
    axisY: {
      title: string;
      gridColor: string;
    };
    axisX: {
      title: string;
      gridColor: string;
    };
    legend: {
      cursor: string;
      itemclick: (e: CanvasJS.ChartEventArgs) => void;
      horizontalAlign: string;
      verticalAlign: string;
      reversed: boolean;
    };
    toolTip: {
      shared: boolean;
      reversed: boolean;
    };
    data: {
      type: string;
      name: string;
      showInLegend: boolean;
      dataPoints: any[];
    }[];
    backgroundColor: string;
  } = {
    animationEnabled: true,
    exportEnabled: true,
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
      cursor: "pointer",
      itemclick: (e: CanvasJS.ChartEventArgs) => {
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

  const formatNumberIndian = (number: number[]) => {
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

  return (
    <div style={{ display: "flex", flexDirection: "row", width: '100%' }}>
      <SidePanel />
      <div
        style={isExpanded ? { width: '85%' } : { width: '94%' }}
        className={`checkin-container ${isDarkTheme ? "dark-theme" : "light-theme"
          }`}
      >
        <Topnavbar />
        <div className="checkin-head">
          <div className="checkin-name-board">
            <h1>Reports Dashboard</h1>
          </div>
          <div className="checkin-date-filter-container">
            <DateFilterDropdown
              selectedPeriod={state.selectedPeriod}
              startDate={state.startDate}
              endDate={state.endDate}
              onSelect={handleDateSelection}
            />
          </div>
          {/* <div className="dates">
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
                      handleOptionClickForDate("Custom Range")
                    }
                  >
                    Custom Range
                  </p>
                </div>
              )}
            </div>
          </div> */}
        </div>
        {/* {openCustomDateRange && (
          <div className="ch-date-range-style">
            <label className="ch-dateLabel" htmlFor="ch-start-date">
              From
            </label>
            <DatePicker
              placeholderText="Start Date"
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="dd MMM yyyy"
              className="ch-start-date"
              onSelect={() => setOpenStartDatePicker(false)}
              onFocus={() => {
                setOpenStartDatePicker(true);
              }}
            />
            <label className="ch-dateLabel" htmlFor="ch-start-date">
              To
            </label>
            <DatePicker
              placeholderText="End Date"
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              dateFormat="dd MMM yyyy"
              className="ch-end-date"
              onSelect={() => setOpenEndDatePicker(false)}
              onFocus={() => {
                setOpenEndDatePicker(true);
              }}
            />
          </div>
        )} */}
        <div className="checkin-name-board-two">
          <h1>Maghil Restaurant, Parsippany</h1>
        </div>
        <div className="overall-summary">
          <div className={`box ${isExpanded ? "ch-expanded-boxes" : ""}`}>
            <h2>
              {formatNumberIndian(
                checkInD["Daily Checkin"].map((item) => item.count)
              )}
            </h2>
            <h3>Total CheckIns</h3>
          </div>
          <div className={`box ${isExpanded ? "ch-expanded-boxes" : ""}`}>
            <h2>
              {formatNumberIndian(
                checkInD.Cancellations.map((item) => item.count)
              )}
            </h2>
            <h3>Cancellations</h3>
          </div>
          <div className={`box ${isExpanded ? "ch-expanded-boxes" : ""}`}>
            <h2>
              {formatNumberIndian(
                checkInD["Repeat Customers Count"].map(
                  (item) => item["count(*)"]
                )
              )}
            </h2>
            <h3>Repeat Customers</h3>
          </div>
          <div className={`box ${isExpanded ? "ch-expanded-boxes" : ""}`}>
            <h2>2,400</h2>
            <h3>New Customers</h3>
          </div>
        </div>
        <div className="daily-summary-container">
          <div className="daily-heading">
            <h1>Daily Summary</h1>
          </div>
          <div className="daily-summary-inner-container">
            <SummaryBox summaryTitle="Daily Checkins" boxValue={10} />
            <SummaryBox summaryTitle="Daily Guest" boxValue={10} />
            <SummaryBox summaryTitle="Daily Cancellation" boxValue={10} />
            <SummaryBox summaryTitle="Total Customer" boxValue={10} />
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
              xAxislabelColor={isDarkTheme ? "#fff" : "#000"}
              yAxislabelColor={isDarkTheme ? "#fff" : "#000"}
              TitleColor={isDarkTheme ? "#fff" : "#000"}
            />
          </div>
        </div>
        {/* <div className="repeat-customers-table-container">
          <Table
            currentPage={currentPageRepeatCustomers}
            setCurrentPage={setCurrentPageRepeatCustomers}
            tableData={checkInD["Repeat Customers"]}
            viewType="full"
            recordsPerPage={9}
            Heading="Repeat Customers"
            totalpageNo={totalPageNoCurrentPageRepeatCustomers}
          />
        </div> */}
        {/* <div className="daily-checkin-table-container">
          <Table
            currentPage={currentPageDailyCheckInDetails}
            setCurrentPage={setCurrentPageDailyCheckInDetails}
            tableData={checkInD["Daily CheckIn Details"]}
            viewType="full"
            recordsPerPage={11}
            Heading="Daily CheckIn Details"
            totalpageNo={totalPageNoCurrentPageDailyCheckInDetails}
          />
        </div> */}
      </div>
    </div>
  );
};

export default CheckIn;
