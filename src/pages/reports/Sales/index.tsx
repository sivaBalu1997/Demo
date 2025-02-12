import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { S } from "../../../assets/mockData/originalAPIData/OsalesReportData";
import { ThemeContext } from "../../../context/ThemeContext";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useDispatch, useSelector } from "react-redux";
import { actualSalesRequest, actualSalesThirdPartyRequest, cancellationSummaryRequest, discountSummaryRequest, hourlySalesRequest, salesByItemCategoryRequest, salesByRevenueClassRequest, salesSummaryRequest } from "redux/newReports/newReportsActions";
import { DateRangeStateInterface } from "interface/newReportsInterface";
import Table from "../../../components/reportComponents/Table";
import CanvaPieChart from "../../../components/reportComponents/Charts/CanvaPieChart";
import DatePicker from "react-datepicker";
import BarChart from "../../../components/reportComponents/Charts/BarChart";
import moment from "moment";
import SidePanel from "pages/SidePanel";
import Topnavbar from "components/reportComponents/TopNavbar";
import ToolTip from "../../../assets/svg/ToolTip.svg"
import DateFilterDropdown from "components/reportComponents/DateFilterDropdown";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import useSalesLocationDates from "hooks/useSalesLocationDates";

type FormatCurrencyOptions = {
  locale: 'IN' | 'US';
};

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

interface transformedhourlySalesChartDataFromAPIReduxType {
  formattedHour: string;
  itemTotal: number;
}


const Sales: React.FC = () => {

  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // console.log({ width })


  const [showNetSaleToolTip, setShowNetSaleToolTip] = useState<boolean>(false)
  const [showTotalSalesToolTip, setShowTotalSalesToolTip] = useState<boolean>(false)
  const [showTotalSalesTwo, setShowTotalSalesTwo] = useState<boolean>(false)
  const [showNetSalesTwo, setShowNetSalesTwo] = useState<boolean>(false)
  const [showTaxTwo, setShowTaxTwo] = useState<boolean>(false)

  const selectedBranch = useSelector(
    (state: any) => state.auth?.selectedBranch || null
  );

  const salesSummaryStatusAPIRedux = useSelector((state: any) => state?.newReports?.salesSummaryStatus)

  //pp
  const salesByItemCategoryAPIReduxTotalPageNo = useSelector((state: any) => state?.newReports?.salesByItemCategorySuccess?.totalPages);


  const salesDataFromAPIRedux = useSelector((state: any) => state?.newReports?.salesSummarySuccess);


  const salesByItemCategoryAPIRedux = useSelector((state: any) => state?.newReports?.salesByItemCategorySuccess?.content);

  const salesByRevenueClassAPIRedux = useSelector((state: any) => state?.newReports?.salesByRevenueClassSuccess?.content);

  const revenueClassTotalPageNo = useSelector((state: any) => state?.newReports?.salesByRevenueClassSuccess?.totalPages)

  const actualSalesAPIRedux = useSelector((state: any) => state?.newReports?.actualSalesSuccess);

  const actualSalesThirdPartyAPIRedux = useSelector((state: any) => state?.newReports?.actualThirdPartySalesSuccess);

  const salesDataFromAPIReduxLoading = useSelector((state: any) => state?.newReports?.SalesSummaryLoading);

  const cancellationSummaryAPIReduxLoading = useSelector((state: any) => state?.newReports?.cancellationSummaryLoading)


  const segregatedDataForMaghilSales = actualSalesAPIRedux?.content
    ?.filter((item: any) => item.type === "maghil")
    ?.map(({ type, ...rest }: any) => rest);


  const segregatedDataForMaghilSalesTotalPageNo = segregatedDataForMaghilSales?.totalPages

  const segregatedDataForThirdPartySales = actualSalesThirdPartyAPIRedux?.content
    ?.filter((item: any) => item.type === "third party")
    ?.map(({ type, ...rest }: any) => rest);


  const segregatedDataForThirdPartySalesTotalPageNo = segregatedDataForThirdPartySales?.totalPages


  const hourlySalesChartDataFromAPIRedux = useSelector((state: any) => state?.newReports?.hourlySalesSuccess);

  const transformedhourlySalesChartDataFromAPIRedux = hourlySalesChartDataFromAPIRedux && hourlySalesChartDataFromAPIRedux?.content?.map(({ formattedHour, itemTotal }: transformedhourlySalesChartDataFromAPIReduxType) => ({ formattedHour, itemTotal }));

  const hourlyX = transformedhourlySalesChartDataFromAPIRedux && transformedhourlySalesChartDataFromAPIRedux?.map((item: any) => item?.formattedHour);

  const hourlyY = transformedhourlySalesChartDataFromAPIRedux && transformedhourlySalesChartDataFromAPIRedux?.map((item: any) => item?.itemTotal);

  const discountSummaryAPIRedux = useSelector((state: any) => state?.newReports?.discountSummarySuccess?.content)

  const discountSummaryPageNo = useSelector((state: any) => state?.newReports?.discountSummarySuccess?.totalPages)
  //pp

  const cancellationSummaryAPIRedux = useSelector((state: any) => state?.newReports?.cancellationSummarySuccess?.content)

  const reorderedData = cancellationSummaryAPIRedux?.map((item: any) => ({
    orderNo: item.orderNo, // Place `orderNo` first
    steward: item.steward,
    orderType: item.orderType,
    itemName: item.itemName,
    refundedQuantity: item.refundedQuantity,
    amount: item.amount,
    reason: item.reason,
    time: item.time,
  }));


  const cancellationSummaryTotalPageNo = useSelector((state: any) => state?.newReports?.cancellationSummarySuccess?.totalPages)

  const actualSalesLoading = useSelector((state: any) => state?.newReports?.actualSalesLoading);

  const actualThirdPartySalesLoading = useSelector((state: any) => state?.newReports?.actualThirdPartySalesLoading);

  const salesByItemCatgoryLoading = useSelector((state: any) => state?.newReports?.salesByItemCategoryLoading);

  const salesByRevenueClassLoading = useSelector((state: any) => state?.newReports?.salesByRevenueClassLoading);

  const discountSummaryLoading = useSelector((state: any) => state?.newReports?.discountSummaryLoading);

  const hourlySalesChartDataLoading = useSelector((state: any) => state?.newReports?.hourlySalesLoading);
  //pp

  const locationid = useSelector((state: any) => state?.auth?.credentials?.locationId)
  // const locationid = "969c059b-6597-47a8-b175-08658e9bf41c";


  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  // const [state, setState] = useState<SalesState>({
  const [state, setState] = useState<DateRangeStateInterface>({
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    openCustomDateRange: false,
    openStartDatePicker: false,
    openEndDatePicker: false,
    openFilter: false,
    selectedPeriod: "Yesterday",
  });


  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const TABLE_RECORDS_LIMIT = 15;

  const [currentPageForDirectStoreOnlineSalesMaghil, setCurrentPageForDirectStoreOnlineSalesMaghil] = useState<number>(1);

  const [currentPageForActualThirdPartySales, setCurrentPageForActualThirdPartySales] = useState<number>(1);

  const [currentPageSalesByItemCategory, setCurrentPageSalesByItemCategory] = useState<number>(1);

  const [currentPageSalesByRevenueClass, setCurrentPageSalesByRevenueClass] = useState<number>(1);

  const [currentPageDiscountSummary, setCurrentPageDiscountSummary] = useState<number>(1);

  const [currentPageCancellationSummary, setCurrentPageCancellationSummary] = useState<number>(1);


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


  const countryCode = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.country
  );


  const getLocationDates = useSalesLocationDates(state, locationid);

  const dispatch = useDispatch();

  useEffect(() => {
    if (getLocationDates) {
      dispatch(salesSummaryRequest(getLocationDates));
    }
  }, [getLocationDates]);

  useEffect(() => {
    if (getLocationDates) {
      dispatch(salesByItemCategoryRequest({ ...getLocationDates, tablePageNo: currentPageSalesByItemCategory, tableRecordLimit: TABLE_RECORDS_LIMIT }));
    }
  }, [getLocationDates, currentPageSalesByItemCategory]);

  useEffect(() => {
    if (getLocationDates) {
      dispatch(salesByRevenueClassRequest({ ...getLocationDates, tablePageNo: currentPageSalesByRevenueClass, tableRecordLimit: TABLE_RECORDS_LIMIT }));
    }
  }, [getLocationDates, currentPageSalesByRevenueClass]);

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        actualSalesThirdPartyRequest({
          ...getLocationDates,
          tablePageNo: currentPageForActualThirdPartySales,
          tableRecordLimit: TABLE_RECORDS_LIMIT,
        })
      );
    }
  }, [getLocationDates, currentPageForActualThirdPartySales]);


  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        actualSalesRequest({
          ...getLocationDates,
          tablePageNo: currentPageForDirectStoreOnlineSalesMaghil,
          tableRecordLimit: TABLE_RECORDS_LIMIT,
        })
      );
    }
  }, [getLocationDates, currentPageForDirectStoreOnlineSalesMaghil]);

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        hourlySalesRequest({
          ...getLocationDates,
          // tablePageNo: currentPageForDirectStoreOnlineSalesMaghil,
          // tableRecordLimit: TABLE_RECORDS_LIMIT,
        })
      );
    }
  }, [getLocationDates]);

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        discountSummaryRequest({
          ...getLocationDates,
          tablePageNo: currentPageDiscountSummary,
          tableRecordLimit: TABLE_RECORDS_LIMIT,
          // tableRecordLimit: 200,
        })
      );
    }
  }, [getLocationDates, currentPageDiscountSummary]);

  useEffect(() => {
    if (getLocationDates) {
      dispatch(
        cancellationSummaryRequest({
          ...getLocationDates,
          tablePageNo: currentPageCancellationSummary,
          tableRecordLimit: TABLE_RECORDS_LIMIT,
        })
      );
    }
  }, [getLocationDates, currentPageCancellationSummary]);




  const formatOrderDates = (content: Array<Record<string, any>>): Array<Record<string, any>> => {
    return content.map(item => {
      const date = new Date(item.orderDate);
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(date);

      return { ...item, orderDate: formattedDate };
    });
  };

  // Example usage
  const content = [
    {
      tableName: "A1",
      orderDate: "2025-01-07T22:46:21.000+00:00",
      tableOccupancyDuration: "315 mins",
      orderAmount: 27.25,
    },
    // other objects...
  ];

  const formattedContent = formatOrderDates(content);

  // const dataPPP = [
  //   {
  //     paymentMode: "Credit Card",
  //     totalSales: 2100.75,
  //     totalOrders: 140,
  //     type: "maghil",
  //   },
  //   {
  //     paymentMode: "Credit Card",
  //     totalSales: 1500,
  //     totalOrders: 120,
  //     type: "maghil",
  //   },
  //   {
  //     paymentMode: "Cash",
  //     totalSales: 950,
  //     totalOrders: 110,
  //     type: "maghil",
  //   },
  //   {
  //     paymentMode: "Cash",
  //     totalSales: 800.5,
  //     totalOrders: 90,
  //     type: "maghil",
  //   },
  //   {
  //     paymentMode: "Cash",
  //     totalSales: 800.5,
  //     totalOrders: 90,
  //     type: "",
  //   },
  // ];

  // console.log('M', dataPPP.filter((item: any) => item.type === "maghil"));
  // console.log('T', dataPPP.filter((item: any) => item.type !== "maghil"));

  // console.log("smp", salesSummaryStatusAPIRedux && salesSummaryStatusAPIRedux?.totalMagilDeliveryCharges)

  // console.log("formatNumberIndian", formatNumberIndian(salesDataFromAPIRedux?.totalMagilSales?.toFixed(2)))

  type CurrencyFormatOptions = {
    locale?: 'IN' | 'US';
  };

  const formatCurrency = (number: number, options?: CurrencyFormatOptions): string => {
    const { locale = 'US' } = options || {};

    if (locale === 'IN') {
      // Indian format: 1,00,000
      return number
        .toString()
        .replace(/\B(?=(\d{2})+(?!\d))/g, ',')
        .replace(/^(\d+),/, '$1,');
    }

    // US format: 100,000
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

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
      {/* {width <= 900 ? <></> : <SidePanel />} */}
      {/* <div className={`${isExpanded ? "alignment-fix-class" : ""}`}> */}
      <div
        style={isExpanded ? { width: '82%' } : { width: '94%' }}
        className={`s-sales-container ${isDarkTheme ? "sales-dark-theme" : "sales-light-theme"
          } ${isExpanded ? "s-expanded-width-sales" : ""}`}
      >
        <Topnavbar />
        <div className="s-sales-head">
          <div className="s-name-board">
            <h1>Reports Dashboard</h1>
          </div>
          <div className="sales-date-filter-container">
            <DateFilterDropdown
              selectedPeriod={state.selectedPeriod}
              startDate={state.startDate}
              endDate={state.endDate}
              onSelect={handleDateSelection}
            />
          </div>
        </div>
        <div className="s-name-board-two">
          <h1>{selectedBranch?.locationName}</h1>
        </div>
        <div className="s-overall-summary">
          <div className="s-overall-summary-inner-wrap">
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalMagilOrders ? <h2>
                {salesDataFromAPIRedux?.totalMagilOrders}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>0</h2>
              }
              <h3>Total Orders</h3>
            </div>
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalMagilSales ? <h2>
                {countryCode === "US" ? '$' : '₹'}
                {salesDataFromAPIRedux?.totalMagilSales?.toFixed(2)}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <div className="label-tooltip-container">
                <h3>Total Sales</h3>
                <div
                  className="s-tooltip-wrapper"
                  onMouseEnter={() => setShowTotalSalesToolTip(true)}
                  onMouseLeave={() => setShowTotalSalesToolTip(false)}
                >
                  <img className="s-tool-tip-image" src={ToolTip} alt="tool-tip" />
                  {showTotalSalesToolTip && (
                    <div className="tool-tip-content">
                      Item total + Tax + Tip + Convenience fee + Delivery charges + Service tax - Discount
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalMagilNetSales ? <h2>
                {countryCode === "US" ? '$' : '₹'}
                {salesDataFromAPIRedux?.totalMagilNetSales?.toFixed(2)}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <div className="label-tooltip-container">
                <h3>Net Sales</h3>
                <div
                  className="s-tooltip-wrapper"
                  onMouseEnter={() => setShowNetSaleToolTip(true)}
                  onMouseLeave={() => setShowNetSaleToolTip(false)}
                >
                  <img className="s-tool-tip-image" src={ToolTip} alt="tool-tip" />
                  {showNetSaleToolTip && (
                    <div className="tool-tip-content"
                      onMouseEnter={() => setShowNetSaleToolTip(true)}
                      onMouseLeave={() => setShowNetSaleToolTip(false)}>
                      Item Total - Discount
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalMagilTips ? <h2>
                {countryCode === "US" ? '$' : '₹'}
                {salesDataFromAPIRedux?.totalMagilTips?.toFixed(2)}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <h3>Tips</h3>
            </div>
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalMagilTax ? <h2>
                {countryCode === "US" ? '$' : '₹'}
                {salesDataFromAPIRedux?.totalMagilTax?.toFixed(2)}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <h3>Tax</h3>
            </div>
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalMagilServiceFee ? <h2>
                {countryCode === "US" ? '$' : '₹'}
                {salesDataFromAPIRedux?.totalMagilServiceFee?.toFixed(2)}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <h3>Service Fee - US</h3>
            </div>
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesSummaryStatusAPIRedux && salesDataFromAPIRedux && salesDataFromAPIRedux.totalMagilDeliveryCharges ?
                <h2>
                  {countryCode === "US" ? '$' : '₹'}{salesDataFromAPIRedux?.totalMagilDeliveryCharges?.toFixed(2)}
                </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <h3>Store Delivery Charges</h3>
            </div>
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalConvenienceFee ? <h2>
                {countryCode === "US" ? '$' : '₹'}{salesDataFromAPIRedux?.totalConvenienceFee?.toFixed(2)}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <h3>Convenience Fee (Maghil)</h3>
            </div>
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalCardProcessingFee ? <h2>
                {countryCode === "US" ? '$' : '₹'}{salesDataFromAPIRedux?.totalCardProcessingFee?.toFixed(2)}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <h3>Card Processsing Fee</h3>
            </div>
          </div>
        </div>
        {/* Total Sales (Direct Sales + Store price adjusted third party orders) START */}
        <div className="s-overall-total-sales-ds">
          <h1 className="title-overall-total-sales-ds">Total Sales (Direct Sales + Store price adjusted third party orders)</h1>
          <div className="s-overall-total-sales-ds-inner-wrap">
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalOrdersIncludingThirdparty ? <h2>
                {salesDataFromAPIRedux?.totalOrdersIncludingThirdparty}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>0</h2>
              }
              <h3>Total Transactions</h3>
            </div>
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalGrossSalesIncludingThirdparty ? <h2>
                {countryCode === "US" ? '$' : '₹'}
                {salesDataFromAPIRedux?.totalGrossSalesIncludingThirdparty?.toFixed(2)}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <div className="label-tooltip-container">
                <h3>Total Sales</h3>
                <div
                  className="s-tooltip-wrapper"
                  onMouseEnter={() => setShowTotalSalesTwo(true)}
                  onMouseLeave={() => setShowTotalSalesTwo(false)}
                >
                  <img className="s-tool-tip-image" src={ToolTip} alt="tool-tip" />
                  {showTotalSalesTwo && (
                    <div className="tool-tip-content">
                      Item total + Tax + Tip + Convenience fee + Delivery charges + Service tax - Discount
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalNetSalesIncludingThirdparty ? <h2>
                {countryCode === "US" ? '$' : '₹'}
                {salesDataFromAPIRedux?.totalNetSalesIncludingThirdparty?.toFixed(2)}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <div className="label-tooltip-container">
                <h3>Net Sales</h3>
                <div
                  className="s-tooltip-wrapper"
                  onMouseEnter={() => setShowNetSalesTwo(true)}
                  onMouseLeave={() => setShowNetSalesTwo(false)}
                >
                  <img className="s-tool-tip-image" src={ToolTip} alt="tool-tip" />
                  {showNetSalesTwo && (
                    <div className="tool-tip-content">
                      Item total - Discount
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`s-box ${isExpanded ? "s-expanded-boxes" : ""}`}>
              {salesDataFromAPIRedux?.totalTaxIncludingThirdparty ? <h2>
                {countryCode === "US" ? '$' : '₹'}
                {salesDataFromAPIRedux?.totalTaxIncludingThirdparty?.toFixed(2)}
              </h2> :
                // <p className="s-summary-no-data">No data found!</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <div className="label-tooltip-container">
                <h3>Tax</h3>
                <div
                  className="s-tooltip-wrapper"
                  onMouseEnter={() => setShowTaxTwo(true)}
                  onMouseLeave={() => setShowTaxTwo(false)}
                >
                  <img className="s-tool-tip-image" src={ToolTip} alt="tool-tip" />
                  {showTaxTwo && (
                    <div className="tool-tip-content">
                      Magil tax  + Third party tax
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Total Sales (Direct Sales + Store price adjusted third party orders) END */}
        <div className="direct-sales-store-price-cont">
          <div className="inner-direct-sales-store-prices">
            <Table
              currentPage={currentPageForDirectStoreOnlineSalesMaghil}
              setCurrentPage={setCurrentPageForDirectStoreOnlineSalesMaghil}
              Heading="Direct Store/Online Sales (Maghil)"
              tableData={segregatedDataForMaghilSales && segregatedDataForMaghilSales?.length > 0 && segregatedDataForMaghilSales}
              viewType="full"
              recordsPerPage={TABLE_RECORDS_LIMIT}
              totalpageNo={segregatedDataForMaghilSalesTotalPageNo ? segregatedDataForMaghilSalesTotalPageNo : 1}
              tabledataLoading={actualSalesLoading}
            />
            <Table
              currentPage={currentPageForActualThirdPartySales}
              setCurrentPage={setCurrentPageForActualThirdPartySales}
              Heading="Actual 3rd Party Sales"
              tableData={segregatedDataForThirdPartySales && segregatedDataForThirdPartySales?.length > 0 && segregatedDataForThirdPartySales}
              viewType="full"
              recordsPerPage={TABLE_RECORDS_LIMIT}
              totalpageNo={segregatedDataForThirdPartySalesTotalPageNo ? segregatedDataForThirdPartySalesTotalPageNo : 1}
              tabledataLoading={actualThirdPartySalesLoading}
            />

          </div>
        </div>
        <div className="s-day-of-the-week">
          <div className="s-day-of-the-week-inner">
            <BarChart
              BatChartTitle="Hourly Net (Direct) Sales"
              TitleColor={isDarkTheme ? "#fff" : "#000"}
              xAxisData={hourlyX && hourlyX}
              yAxisData={hourlyY && hourlyY}
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
              // yAxisLabel="Average Sales per Hour"
              yAxisLabel="Net Sales"
              xAxislabelColor={isDarkTheme ? "#fff" : "#000"}
              xAxisLabel="Hours"
              yAxislabelColor={isDarkTheme ? "#fff" : "#000"}
              barChartLoading={hourlySalesChartDataLoading}
            />
          </div>
        </div>
        {/* <div
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
        </div> */}
        {/* <div className="s-day-of-the-week">
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
        </div> */}
        <div className="s-tab-cont">
          <div className="s-table-container-one-s">
            <Table
              currentPage={currentPageSalesByItemCategory}
              setCurrentPage={setCurrentPageSalesByItemCategory}
              Heading="Sales By Item Category"
              tableData={salesByItemCategoryAPIRedux && salesByItemCategoryAPIRedux?.length > 0 && salesByItemCategoryAPIRedux}
              viewType="full"
              recordsPerPage={TABLE_RECORDS_LIMIT}
              totalpageNo={salesByItemCategoryAPIReduxTotalPageNo ? salesByItemCategoryAPIReduxTotalPageNo : 1}
              tabledataLoading={salesByItemCatgoryLoading}
            />
            <Table
              currentPage={currentPageSalesByRevenueClass}
              setCurrentPage={setCurrentPageSalesByRevenueClass}
              Heading="Sales By Revenue Class"
              tableData={salesByRevenueClassAPIRedux && salesByRevenueClassAPIRedux?.length > 0 && salesByRevenueClassAPIRedux}
              viewType="full"
              recordsPerPage={TABLE_RECORDS_LIMIT}
              totalpageNo={revenueClassTotalPageNo ? revenueClassTotalPageNo : 1}
              tabledataLoading={salesByRevenueClassLoading}
            />
          </div>
        </div>
        <div className="s-tab-cont">
          <div className="s-table-container-two-s">
            <Table
              currentPage={currentPageDiscountSummary}
              setCurrentPage={setCurrentPageDiscountSummary}
              Heading="Discount Summary"
              tableData={discountSummaryAPIRedux && discountSummaryAPIRedux?.length > 0 && discountSummaryAPIRedux}
              viewType="full"
              recordsPerPage={TABLE_RECORDS_LIMIT}
              totalpageNo={discountSummaryPageNo ? discountSummaryPageNo : 1}
              tabledataLoading={discountSummaryLoading}
            />
            <Table
              currentPage={currentPageCancellationSummary}
              setCurrentPage={setCurrentPageCancellationSummary}
              Heading="Cancel Item Tracker"
              // tableData={cancellationSummaryAPIRedux?.length > 0 ? cancellationSummaryAPIRedux : []}
              tableData={reorderedData?.length > 0 ? reorderedData : []}
              viewType="full"
              recordsPerPage={TABLE_RECORDS_LIMIT}
              totalpageNo={cancellationSummaryTotalPageNo ? cancellationSummaryTotalPageNo : 1}
              tabledataLoading={cancellationSummaryAPIReduxLoading}
            />
          </div>
        </div>
      </div>
      {/* </div> */}
    </div >
  );
};

export default Sales;