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

  // Summary boxes data from redux :
  const dailyCheckInBoxAPIRedux = useSelector((state: any) => state?.newReports?.dailyCheckInSuccess)
  const dailyCheckInResponseSuccess = useSelector((state: any) => state?.newReports?.dailyCheckInResponseSuccess)
  const dailyGuestBoxAPIRedux = useSelector((state: any) => state?.newReports?.dailyGuestSuccess)
  const dailyGuestSuccessResponse = useSelector((state: any) => state?.newReports?.dailyGuestSuccessResponse)
  const dailyCancellationBoxAPIRedux = useSelector((state: any) => state?.newReports?.dailyCancellationSuccess)
  const dailyCancellationSucessResponse = useSelector((state: any) => state?.newReports?.dailyCancellationSucessResponse)
  const newCustomerSizeBoxAPIRedux = useSelector((state: any) => state?.newReports?.newCustomerSizeSuccess)
  const newCustomerSizeSuccessResponse = useSelector((state: any) => state?.newReports?.newCustomerSizeSuccessResponse)
  const repeatCustomerCountBoxAPIRedux = useSelector((state: any) => state?.newReports?.customerSizeSuccess)
  const customerSizeSuccessResponse = useSelector((state: any) => state?.newReports?.customerSizeSuccessResponse)

  // Charts data from redux :
  const dailyHourlyGuestAPIRedux = useSelector((state: any) => state?.newReports?.dailyHourlyGuestsSuccess)
  const dailyHourlyGuestAPIReduxLoader = useSelector((state: any) => state?.newReports?.dailyHourlyGuestsLoading)
  const dailyHourlyCheckInAPIRedux = useSelector((state: any) => state?.newReports?.dailyHourlyCheckInSuccess)
  const dailyHourlyCheckInAPIReduxLoader = useSelector((state: any) => state?.newReports?.dailyHourlyCheckInLoading)
  const dayOverDayGuestAPIRedux = useSelector((state: any) => state?.newReports?.dayOverDayGuestSuccess)
  const dayOverDayGuestAPIReduxLoader = useSelector((state: any) => state?.newReports?.dayOverDayGuestLoading)
  const dailyDineInTimeChartAPIRedux = useSelector((state: any) => state?.newReports?.peakSummarySuccess)
  const dailyDineInTimeChartAPIReduxLoader = useSelector((state: any) => state?.newReports?.peakSummaryLoading)
  const dailyPartySizeDistributionAPIRedux = useSelector((state: any) => state?.newReports?.partySizeSuccess)
  const dailyPartySizeDistributionAPIReduxLoader = useSelector((state: any) => state?.newReports?.partySizeLoading)
  const weeklyTrendAPIRedux = useSelector((state: any) => state?.newReports?.dayCheckInSuccess)
  const weeklyTrendAPIReduxLoader = useSelector((state: any) => state?.newReports?.dayCheckInloading)
  // console.log("8888", { dailyHourlyGuestAPIRedux, dailyHourlyCheckInAPIRedux, dayOverDayGuestAPIRedux, dailyDineInTimeChartAPIRedux, dailyPartySizeDistributionAPIRedux, weeklyTrendAPIRedux })

  // Tables data from redux :
  const repeatCustomerAPIRedux = useSelector((state: any) => state?.newReports?.customerDetailsSuccess)
  const repeatCustomerAPIReduxLoader = useSelector((state: any) => state?.newReports?.customerDetailsLoading)

  // console.log({ repeatCustomerAPIRedux })
  const liveCheckInStatusAPIRedux = useSelector((state: any) => state?.newReports?.liveCheckInStatusSuccess)
  const liveCheckInStatusAPIReduxLoader = useSelector((state: any) => state?.newReports?.liveCheckInStatusLoading)
  const dailyCheckInDetailsAPIRedux = useSelector((state: any) => state?.newReports?.dailyCheckInStatusSuccess)
  const dailyCheckInDetailsAPIReduxLoader = useSelector((state: any) => state?.newReports?.dailyCheckInStatusLoading)
  // console.log("2222", { dailyCheckInDetailsAPIRedux, liveCheckInStatusAPIRedux })
  // console.log("9999", { repeatCustomerAPIRedux, liveCheckInStatusAPIRedux, dailyCheckInDetailsAPIRedux })


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
  const [liveCheckInStatusDataCurrentPage, setLiveCheckInStatusDataCurrentPage] = useState<number>(1)

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
    console.log("CCCC")
    if (getLocationDates) {
      console.log("DDDD")
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
          ...getLocationDates, tablePageNo: currentPageRepeatCustomers, tableRecordLimit: RECORDS_PER_PAGE_LIMIT
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
          ...getLocationDates, tablePageNo: liveCheckInStatusDataCurrentPage, tableRecordLimit: RECORDS_PER_PAGE_LIMIT
        })
      )
    }
  }, [getLocationDates])

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        dailyCheckInStatusRequest({
          ...getLocationDates, tablePageNo: currentPageDailyCheckInDetails, tableRecordLimit: RECORDS_PER_PAGE_LIMIT
        })
      )
    }
  }, [getLocationDates])




  const transformDataByChannelForStackBar = (
    data: { channelName: string; reservationTime: string; count: number }[],
    channelName: string | null
  ) => {
    return data
      ?.filter((point) => point?.channelName === channelName)
      ?.map((point) => ({
        label: point?.reservationTime,
        y: point?.count,
      }));
  };

  const onlineData = transformDataByChannelForStackBar(
    dailyHourlyCheckInAPIRedux?.content,
    "ONLINE"
  );
  const merchantData = transformDataByChannelForStackBar(
    dailyHourlyCheckInAPIRedux?.content,
    "MERCHANT"
  );
  const emptyTypeData = transformDataByChannelForStackBar(
    dailyHourlyCheckInAPIRedux?.content,
    null
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
        name: "Null",
        showInLegend: true,
        dataPoints: emptyTypeData,
      },
    ],
    backgroundColor: isDarkTheme ? "#222b3c" : "#ffffff",
  };

  const dailyHourlyGuestChartDataMerchant = transformDataByChannelForStackBar(dailyHourlyGuestAPIRedux?.content, "MERCHANT")
  const dailyHourlyGuestChartDataOnline = transformDataByChannelForStackBar(dailyHourlyGuestAPIRedux?.content, "ONLINE")
  const dailyHourlyGuestChartDataEmpty = transformDataByChannelForStackBar(dailyHourlyGuestAPIRedux?.content, null)


  const dailyHourlyGuestsChartConfig: {
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
      text: "Daily Hourly Guests",
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
        dataPoints: dailyHourlyGuestChartDataOnline,
      },
      {
        type: "stackedColumn",
        name: "Merchant",
        showInLegend: true,
        dataPoints: dailyHourlyGuestChartDataMerchant,
      },
      {
        type: "stackedColumn",
        name: "Null",
        showInLegend: true,
        dataPoints: dailyHourlyGuestChartDataEmpty,
      },
    ],
    backgroundColor: isDarkTheme ? "#222b3c" : "#ffffff",
  };

  // const transformDataForDayOverDayGuest = (data: {
  //   name: string;
  //   date: string;
  //   guests: number;
  // }[]) => {
  //   return data?.map((mappingFilterData) => {
  //     // Create a new date object using optional chaining
  //     const date = new Date(mappingFilterData?.date);

  //     // Format the date to "Jan 1 2025" if date is valid
  //     const formattedDate = date?.toLocaleDateString('en-US', {
  //       month: 'short',
  //       day: 'numeric',
  //       year: 'numeric'
  //     });

  //     return {
  //       x: formattedDate,
  //       y: mappingFilterData?.guests
  //     };
  //   });
  // };

  const transformDataForDayOverDayGuest = (data: { name: string; date: string; guests: number; }[]) => {
    return data?.map(({ date, guests }) => {
      const parsedDate = new Date(date); // Ensure it's a valid Date object
      return {
        x: parsedDate, // Use Date object instead of formatted string
        y: guests
      };
    });
  };



  const guestValues = transformDataForDayOverDayGuest(dayOverDayGuestAPIRedux?.content)
  // console.log("PPPP", { guestValues })
  // const checkInValues = transformDataForDayOverDayGuest(checkInD["Day Over Day Guests One"], "checkIns")
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
      title: "Guest Count",
      gridColor: isDarkTheme ? "#445678" : "#cccccc",
    },
    axisX: {
      title: "Reservation Date",
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
        // type: "spline",
        // type: "splineArea",
        name: "Guests",
        showInLegend: true,
        dataPoints: guestValues,
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

  const dataForDineInTime = dailyDineInTimeChartAPIRedux?.content?.map((data: { actualDineInTime: number, partySize: number }) => ({ y: data?.actualDineInTime, label: data?.partySize }))

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
      title: "Actual Dine In Time",
      gridColor: isDarkTheme ? "#445678" : "#cccccc",
    },
    axisX: {
      title: "Party Size",
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


  const partySizeDistributionValue = dailyPartySizeDistributionAPIRedux?.content?.map((data: { count: number, totalGuests: number }) => ({
    y: data?.count,
    label: data?.totalGuests
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
      title: "Party Size",
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

  const XAvgSalesinDolla = weeklyTrendAPIRedux?.content?.map(
    (item: { totalCheckins: number }) => item?.totalCheckins
  );
  const YdayofTheWeekDA = weeklyTrendAPIRedux?.content?.map((item: { day: string }) => item?.day);

  const handleDateSelection = (option: DateRangeStateInterface["selectedPeriod"],
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
            <SummaryBox summaryTitle="Daily Checkins" boxValue={dailyCheckInResponseSuccess ? (dailyCheckInBoxAPIRedux || 0) : 0} />
            <SummaryBox summaryTitle="Daily Guest" boxValue={dailyGuestSuccessResponse ? (dailyGuestBoxAPIRedux || 0) : 0} />
            <SummaryBox summaryTitle="Daily Cancellation" boxValue={dailyCancellationSucessResponse ? (dailyCancellationBoxAPIRedux || 0) : 0} />
            <SummaryBox summaryTitle="New Customers" boxValue={newCustomerSizeSuccessResponse ? (newCustomerSizeBoxAPIRedux || 0) : 0} />
            <SummaryBox summaryTitle="Repeat Customer Count" boxValue={customerSizeSuccessResponse ? (repeatCustomerCountBoxAPIRedux || 0) : 0} />
          </div>
        </div>
        <div className="canva-stacked-bar-container">
          <ReusableCanvaChart options={MockchartOptions} loader={dailyHourlyCheckInAPIReduxLoader} ChartTitle="Daily Hourly CheckIn" />
        </div>
        <div className="canva-stacked-bar-container">
          <ReusableCanvaChart options={MockchartOptionsSpline} loader={dayOverDayGuestAPIReduxLoader} ChartTitle="Day Over Day Guests" />
        </div>
        {/* MockchartOptionsDineInTime */}
        <div className="canva-stacked-bar-container">
          <ReusableCanvaChart options={MockchartOptionsDineInTime} loader={dailyDineInTimeChartAPIReduxLoader} ChartTitle="Daily Dine In Time" />
        </div>
        {/* MockchartOptionsPartySizeDistribution */}
        <div className="canva-stacked-bar-container">
          <ReusableCanvaChart options={MockchartOptionsPartySizeDistribution} loader={dailyPartySizeDistributionAPIReduxLoader} ChartTitle="Party Size Distribution" />
        </div>
        <div className="canva-stacked-bar-container">
          <ReusableCanvaChart options={dailyHourlyGuestsChartConfig} loader={dailyHourlyGuestAPIReduxLoader} ChartTitle="Daily Hourly Guests" />
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
              barChartLoading={weeklyTrendAPIReduxLoader}
            />
          </div>
        </div>
        <div className="repeat-customers-table-container">
          <Table
            currentPage={currentPageRepeatCustomers}
            setCurrentPage={setCurrentPageRepeatCustomers}
            tableData={repeatCustomerAPIRedux?.content}
            viewType="full"
            recordsPerPage={RECORDS_PER_PAGE_LIMIT}
            Heading="Repeat Customers"
            totalpageNo={repeatCustomerAPIRedux?.totalPages}
            tabledataLoading={repeatCustomerAPIReduxLoader}
          />
        </div>
        <div className="daily-checkin-table-container">
          <Table
            currentPage={currentPageDailyCheckInDetails}
            setCurrentPage={setCurrentPageDailyCheckInDetails}
            tableData={dailyCheckInDetailsAPIRedux?.content}
            viewType="full"
            recordsPerPage={RECORDS_PER_PAGE_LIMIT}
            Heading="Daily CheckIn Details"
            totalpageNo={dailyCheckInDetailsAPIRedux?.totalPages}
            tabledataLoading={liveCheckInStatusAPIReduxLoader}
          />
        </div>
        <div className="daily-checkin-table-container">
          <Table
            currentPage={liveCheckInStatusDataCurrentPage}
            setCurrentPage={setLiveCheckInStatusDataCurrentPage}
            tableData={liveCheckInStatusAPIRedux?.content}
            viewType="full"
            recordsPerPage={15}
            Heading="Live CheckIn Status"
            totalpageNo={liveCheckInStatusAPIRedux?.totalPages}
            tabledataLoading={dailyCheckInDetailsAPIReduxLoader}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
