import React, { useContext, useEffect, useState } from "react";
import { checkInD } from "../../../assets/mockData/originalAPIData/OcheckinData";
import { ThemeContext } from "../../../context/ThemeContext";
import { S } from "../../../assets/mockData/originalAPIData/OsalesReportData";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { DateRangeStateInterface } from "interface/newReportsInterface";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../components/reportComponents/Table";
import ReusableCanvaChart from "../../../components/reportComponents/Charts/ReusabeCanvaChart";
import BarChart from "../../../components/reportComponents/Charts/BarChart";
import SidePanel from "pages/SidePanel";
import Topnavbar from "components/reportComponents/TopNavbar";
import moment from "moment";
import useSalesLocationDates from "hooks/useSalesLocationDates";
import DateFilterDropdown from "components/reportComponents/DateFilterDropdown";
import SummaryBox from "components/reportComponents/SummaryBox";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { customerDetailsRequest, customerSizeRequest, dailyCancellationRequest, dailyCheckInRequest, dailyCheckInStatusRequest, dailyGuestRequest, dailyHourlyCheckInRequest, dayCheckInRequest, dayOverDayGuestRequest, hourlyGuestsRequest, liveCheckInStatusRequest, newCustomerSizeRequest, partySizeRequest, peakSummaryRequest } from "redux/newReports/newReportsActions";



// {
//   reservation_time: string;
//   channel_name: string;
//   count: number;
// }[]

// {
//   x: string;
//   y: number;
//   type: string;
// }[]


declare namespace CanvasJS {
  interface ChartEventArgs {
    chart: any;
    dataPoint: any;
    dataSeries: any;
    index: number;
  }
}

const CheckIn: React.FC = () => {

  const RECORDS_PER_PAGE_LIMIT: number = 15;

  const dispatch = useDispatch();

  const selectedBranch = useSelector(
    (state: any) => state.auth?.selectedBranch || null
  );

  // summary boxes data from redux :
  const dailyCheckInBoxAPIRedux = useSelector((state: any) => state?.newReports?.dailyCheckInSuccess)
  console.log({ dailyCheckInBoxAPIRedux })
  const dailyGuestBoxAPIRedux = useSelector((state: any) => state?.newReports?.dailyGuestSuccess)
  const dailyCancellationBoxAPIRedux = useSelector((state: any) => state?.newReports?.dailyCancellationSuccess)
  const newCustomerSizeBoxAPIRedux = useSelector((state: any) => state?.newReports?.newCustomerSizeSuccess)
  const repeatCustomerCountBoxAPIRedux = useSelector((state: any) => state?.newReports?.customerSizeSuccess)

  //Charts data from redux :
  const dailyHourlyGuestAPIRedux = useSelector((state: any) => state?.newReports?.dailyHourlyGuestsSuccess)
  const dailyHourlyCheckInAPIRedux = useSelector((state: any) => state?.newReports?.dailyHourlyCheckInSuccess)
  const dayOverDayGuestAPIRedux = useSelector((state: any) => state?.newReports?.dayOverDayGuestSuccess)
  const dailyDineInTimeChartAPIRedux = useSelector((state: any) => state?.newReports?.peakSummarySuccess)
  const dailyPartySizeDistributionAPIRedux = useSelector((state: any) => state?.newReports?.partySizeSuccess)
  const weeklyTrendAPIRedux = useSelector((state: any) => state?.newReports?.dayCheckInSuccess)

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
  // console.log("4444", { getLocationDates })

  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };

  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  const [totalPageNoCurrentPageRepeatCustomers, setTotalPageNoCurrentPageRepeatCustomers] = useState<number>(5)
  const [currentPageRepeatCustomers, setCurrentPageRepeatCustomers] = useState<number>(1);

  const [totalPageNoCurrentPageDailyCheckInDetails, setTotalPageNoCurrentPageDailyCheckInDetails] = useState<number>(5)
  const [currentPageDailyCheckInDetails, setCurrentPageDailyCheckInDetails] = useState<number>(1);

  // const [totalPageNoReservationData, setTotalPageNoReservationData] = useState<number>(5)
  // const [currentPageReservationData, setCurrentPageReservationData] = useState<number>(1)

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        dailyCheckInRequest({
          ...getLocationDates
        })
      )
    }
  }, [getLocationDates])



  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        dailyGuestRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        dailyCancellationRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        hourlyGuestsRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])


  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        dailyHourlyCheckInRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        dayOverDayGuestRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        peakSummaryRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        partySizeRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])


  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        customerSizeRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])


  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        newCustomerSizeRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        customerDetailsRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        dayCheckInRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        liveCheckInStatusRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        dailyCheckInStatusRequest({
          ...getLocationDates,
        })
      )
    }
  }, [getLocationDates])




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
  const emptyTypeData = transformDataByChannelForStackBar(
    checkInD["Daily Hourly CheckIn"],
    "EMPTY"
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
      {
        type: "stackedColumn",
        name: "Empty",
        showInLegend: true,
        dataPoints: emptyTypeData,
      },
    ],
    backgroundColor: isDarkTheme ? "#222b3c" : "#ffffff",
  };

  const transformDataForSplineCurveAreaChart = (data: {
    x: string;
    y: number;
    type: string;
  }[], typeParam: string) => {
    return data?.filter((dataForFiltering) => dataForFiltering.type === typeParam)?.map((mappingFilterData) => ({
      x: new Date(mappingFilterData?.x),
      y: mappingFilterData?.y
    }))
  }

  const guestValues = transformDataForSplineCurveAreaChart(checkInD["Day Over Day Guests One"], "guest")
  const checkInValues = transformDataForSplineCurveAreaChart(checkInD["Day Over Day Guests One"], "checkIns")
  // console.log("4444", { guestValues, checkInValues })

  const MockchartOptionsSpline: {
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
      text: "Day Over Day Guests",
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
        type: "splineArea",
        name: "Guests",
        showInLegend: true,
        dataPoints: guestValues,
      },
      {
        type: "splineArea",
        name: "CheckIns",
        showInLegend: true,
        dataPoints: checkInValues,
      },
    ],
    backgroundColor: isDarkTheme ? "#222b3c" : "#ffffff",
  };

  // console.log("4444", { guestValues })
  const peakData = [];
  const offPeakData = [];

  checkInD["Daily Dine In Time"]?.forEach((item) => {
    if (item["Peak Time"] === "Peak") {
      peakData.push({ x: item.party_size, y: item["Dine Tine"] });
    } else {
      offPeakData.push({ x: item.party_size, y: item["Dine Tine"] });
    }
  });

  const dataForDineInTime = checkInD["Daily Dine In Time"]?.map((data) => ({ y: data?.["Dine Tine"], label: data?.party_size }))

  const MockchartOptionsDineInTime: {
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
      text: "Daily Dine In Time",
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
        type: "column",
        name: "Dine In Time",
        showInLegend: true,
        dataPoints: dataForDineInTime,
      },
    ],
    backgroundColor: isDarkTheme ? "#222b3c" : "#ffffff",
  };

  // console.log({ peakData, offPeakData })


  const partySizeDistributionValue = checkInD["Party Size Distributions"]?.map((data) => ({
    y: data?.["count"],
    label: data?.["Party Size"]
  }))

  const MockchartOptionsPartySizeDistribution: {
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
      text: "Party Size Distribution",
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
        type: "column",
        name: "Daily Party Size Distribution",
        showInLegend: true,
        dataPoints: partySizeDistributionValue,
      },
    ],
    backgroundColor: isDarkTheme ? "#222b3c" : "#ffffff",
  };

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
      selectedPeriod: option,
      startDate,
      endDate,
    }));
  };


  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div style={{ display: "flex", flexDirection: "row", width: '100%' }}>
      <SidePanel />
      <div
        style={{
          width: isExpanded
            ? "85%"
            : windowWidth <= 600
              ? "101%"
              : "94%",
        }}

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
        </div>
        <div className="checkin-name-board-two">
          <h1>{selectedBranch?.locationName}</h1>
        </div>
        <div className="daily-summary-container">
          <div className="daily-heading">
            <h1>Daily Summary</h1>
          </div>
          <div className="daily-summary-inner-container">
            <SummaryBox summaryTitle="Daily Checkins" boxValue={dailyCheckInBoxAPIRedux || 0} />
            <SummaryBox summaryTitle="Daily Guest" boxValue={dailyGuestBoxAPIRedux || 0} />
            <SummaryBox summaryTitle="Daily Cancellation" boxValue={dailyCancellationBoxAPIRedux || 0} />
            <SummaryBox summaryTitle="New Customers" boxValue={newCustomerSizeBoxAPIRedux || 0} />
            <SummaryBox summaryTitle="Repeat Customer Count" boxValue={repeatCustomerCountBoxAPIRedux || 0} />
          </div>
        </div>
        <div className="canva-stacked-bar-container">
          <ReusableCanvaChart options={MockchartOptions} />
        </div>
        <div className="canva-stacked-bar-container">
          <ReusableCanvaChart options={MockchartOptionsSpline} />
        </div>
        {/* MockchartOptionsDineInTime */}
        <div className="canva-stacked-bar-container">
          <ReusableCanvaChart options={MockchartOptionsDineInTime} />
        </div>
        {/* MockchartOptionsPartySizeDistribution */}
        <div className="canva-stacked-bar-container">
          <ReusableCanvaChart options={MockchartOptionsPartySizeDistribution} />
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
        <div className="repeat-customers-table-container">
          <Table
            currentPage={currentPageRepeatCustomers}
            setCurrentPage={setCurrentPageRepeatCustomers}
            tableData={checkInD["Repeat Customers"]}
            viewType="full"
            recordsPerPage={15}
            Heading="Repeat Customers"
            totalpageNo={totalPageNoCurrentPageRepeatCustomers}
          />
        </div>
        <div className="daily-checkin-table-container">
          <Table
            currentPage={currentPageDailyCheckInDetails}
            setCurrentPage={setCurrentPageDailyCheckInDetails}
            tableData={checkInD["Daily CheckIn Details"]}
            viewType="full"
            recordsPerPage={15}
            Heading="Daily CheckIn Details"
            totalpageNo={totalPageNoCurrentPageDailyCheckInDetails}
          />
        </div>
        {/* <div className="daily-checkin-table-container">
          <Table
            currentPage={currentPageReservationData}
            setCurrentPage={setCurrentPageReservationData}
            tableData={checkInD["Reservation Data"]}
            viewType="full"
            recordsPerPage={15}
            Heading="Reservation Data"
            totalpageNo={totalPageNoReservationData}
          />
        </div> */}
      </div>
    </div>
  );
};

export default CheckIn;
