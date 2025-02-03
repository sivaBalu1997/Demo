// live reports page
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { LD } from "../../../assets/mockData/originalAPIData/OliveReportData";
import { DDDD } from "assets/mockData/mock D/nested";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useDispatch, useSelector } from "react-redux";
import { liveDiscountRequest, liveNetSalesRequest, liveOpenSalesRequest, liveOrderNonDineInRequest, liveOrdersRequest, liveRefundsRequest } from "redux/newReports/newReportsActions";
import Table from "../../../components/reportComponents/Table";
import Topnavbar from "../../../components/reportComponents/TopNavbar";
import SidePanel from "pages/SidePanel";
import moment from "moment";
import ToolTip from "../../../assets/svg/ToolTip.svg"
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

interface SalesData {
  paymentMode: string;
  totalSales: number;
  totalOrders: number;
  type: string;
}

const CustomerInsights = () => {

  const selectedBranch = useSelector(
    (state: any) => state.auth?.selectedBranch || null
  );

  const [showLiveNetSaleTooltip, setShowLiveNetSaleTooltip] = useState<boolean>(false);
  // const [showLiveNetSaleTooltip, setShowLiveNetSaleTooltip] = useState<boolean>(false)

  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  const locationid = useSelector((state: any) => state?.auth?.credentials?.locationId)

  const liveDiscountDataAPIRedux = useSelector((state: any) => state?.newReports?.liveDiscountSuccess);

  const liveOpenSalesDataAPIRedux = useSelector((state: any) => state?.newReports?.liveOpenSalesSuccess)

  const liveOrdersAPIRedux = useSelector((state: any) => state?.newReports?.liveOrdersSuccess?.content)


  const liveOrdersTotalPageNo = useSelector((state: any) => state?.newReports?.liveOrdersSuccess?.totalPages)

  const liveRefundsAPIRedux = useSelector((state: any) => state?.newReports?.liveRefundsSuccess)

  const liveNetSalesAPIRedux = useSelector((state: any) => state?.newReports?.liveNetSalesSuccess)

  const liveOrderNonDineInAPIRedux = useSelector((state: any) => state?.newReports?.liveOrderNonDineInSuccess?.content)

  const liveOrderNonDineInTotalPageNo = useSelector((state: any) => state?.newReports?.liveOrderNonDineInSuccess?.totalPages)

  const liveOrdersLoading = useSelector((state: any) => state?.newReports?.liveOrdersLoading)

  const liveOrderNonDineInLoading = useSelector((state: any) => state?.newReports?.liveOrderNonDineInLoading)


  const countryCode = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.country
  );


  const RECORDS_PER_PAGE_LIMIT = 15

  const [totalPageNoCurrentPageLiveOrders, setTotalPageNoCurrentPageLiveOrders] = useState<number>(liveOrdersTotalPageNo || 1)
  const [currentPageLiveOrders, setCurrentPageLiveOrders] = useState<number>(1);

  const [totalPageNoCurrentPageLiveOrdersNonDineIn, setTotalPageNoCurrentPageLiveOrdersNonDineIn] = useState<number>(liveOrderNonDineInTotalPageNo || 1)
  const [currentPageLiveOrdersNonDineIn, setCurrentPageLiveOrdersNonDineIn] = useState<number>(1);




  const formatOrderDates = (content: Array<Record<string, any>>): Array<Record<string, any>> => {
    return content?.map(item => {
      if (item?.orderDate) {
        const date = new Date(item.orderDate);
        if (!isNaN(date.getTime())) {
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }).format(date);
          return { ...item, orderDate: formattedDate };
        }
      }
      return { ...item, orderDate: null }; // Handle invalid or null dates
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
  const liveOrderDateTransformed = formatOrderDates(liveOrdersAPIRedux)
  // console.log("live details", { liveOrdersAPIRedux, liveOrderDateTransformed })


  const dispatch = useDispatch();

  // const [currentDate, setCurrentDate] = useState('');
  // const formattedDate = moment().format('YYYY-MM-DD');
  // setCurrentDate(formattedDate);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    dispatch(liveDiscountRequest({ locationid }))
  }, [locationid])

  useEffect(() => {
    dispatch(liveOpenSalesRequest({ locationid }))
  }, [locationid])

  useEffect(() => {
    dispatch(liveOrdersRequest({ locationid, tablePageNo: currentPageLiveOrders, tableRecordLimit: RECORDS_PER_PAGE_LIMIT }))
  }, [locationid, currentPageLiveOrders])

  useEffect(() => {
    dispatch(liveRefundsRequest({ locationid }))
  }, [locationid])

  useEffect(() => {
    dispatch(liveNetSalesRequest({ locationid }))
  }, [locationid])

  useEffect(() => {
    const formattedDate = moment().format('YYYY-MM-DD');
    setCurrentDate(formattedDate);
    currentDate && dispatch(liveOrderNonDineInRequest({ locationid }))
    // currentDate && dispatch(liveOrderNonDineInRequest({ locationid, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: RECORDS_PER_PAGE_LIMIT, startDate: currentDate, endDate: currentDate }))
  }, [locationid, currentPageLiveOrdersNonDineIn, currentDate])


  // <Loader
  //   className="imgLoader2"
  //   height="100px"
  //   width="100px"
  //   style={{
  //     filter:
  //       "invert(45%) sepia(31%) saturate(435%) hue-rotate(72deg) brightness(91%) contrast(88%)",
  //   }}
  // />

  //<p className='s-live-no-data'>No data found !</p>

  // console.log({ liveOrderNonDineInTotalPageNo, liveOrdersTotalPageNo })

  return (
    <div style={{ display: "flex", flexDirection: "row", width: '100%' }}>
      <SidePanel />
      <div
        style={isExpanded ? { width: '100%' } : { width: '94%' }}
        className={`live-reports ${isDarkTheme ? "dark-theme" : "light-theme"
          } ${isExpanded ? "l-expanded-width-sales" : ""}`}
      >
        <Topnavbar />
        <div className="cust-insights-head">
          <div className="name-board">
            <h1 className="liveHeader">Reports Dashboard</h1>
          </div>
        </div>
        <div className="location-name">
          <h1>{selectedBranch?.locationName}</h1>
        </div>
        <div className="l-live-boxes-container">
          <div className={isExpanded ? "l-live-inner-box-expanded" : "l-live-inner-box"}>
            <div className="l-live-box">
              {liveDiscountDataAPIRedux && liveDiscountDataAPIRedux > 0 ? <h2>{countryCode === "US" ? '$' : '₹'}{liveDiscountDataAPIRedux && liveDiscountDataAPIRedux > 0 && liveDiscountDataAPIRedux}</h2> :
                // <p className='s-live-no-data'>No data found !</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <h3>Discounts</h3>
            </div>
            <div className="l-live-box">
              {liveRefundsAPIRedux && liveRefundsAPIRedux > 0 ? <h2>{countryCode === "US" ? '$' : '₹'}{liveRefundsAPIRedux && liveRefundsAPIRedux > 0 && liveRefundsAPIRedux}</h2> :
                // <p className='s-live-no-data'>No data found !</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <h3>Refund</h3>
            </div>
            <div className="l-live-box">
              {liveOpenSalesDataAPIRedux && liveOpenSalesDataAPIRedux > 0 ? <h2>{countryCode === "US" ? '$' : '₹'}{liveOpenSalesDataAPIRedux && liveOpenSalesDataAPIRedux > 0 && liveOpenSalesDataAPIRedux}</h2> :
                // <p className='s-live-no-data'>No data found !</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <h3>Open Sales</h3>
            </div>
            <div className="l-live-box">
              {liveNetSalesAPIRedux && liveNetSalesAPIRedux > 0 ? <h2>{countryCode === "US" ? '$' : '₹'}{liveNetSalesAPIRedux && liveNetSalesAPIRedux > 0 && liveNetSalesAPIRedux}</h2> :
                // <p className='s-live-no-data'>No data found !</p>
                <h2>{countryCode === "US" ? '$' : '₹'}0.00</h2>
              }
              <div className="l-label-tooltip-container">
                <h3>Net Sales</h3>
                <div
                  className="l-tooltip-wrapper"
                  onMouseEnter={() => setShowLiveNetSaleTooltip(true)}
                  onMouseLeave={() => setShowLiveNetSaleTooltip(false)}
                >
                  <img className="l-tool-tip-image" src={ToolTip} alt="tool-tip" />
                  {showLiveNetSaleTooltip && (
                    <div className="l-tool-tip-content">
                      Item Total - Discount
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tables-container-one">
          <Table
            currentPage={currentPageLiveOrders}
            setCurrentPage={setCurrentPageLiveOrders}
            Heading="Live Orders"
            tableData={liveOrderDateTransformed && liveOrderDateTransformed}
            // tableData={liveOrdersAPIRedux && liveOrdersAPIRedux}
            // liveOrdersAPIRedux
            viewType="full"
            recordsPerPage={RECORDS_PER_PAGE_LIMIT}
            totalpageNo={liveOrdersTotalPageNo ? liveOrdersTotalPageNo : 1}
            tabledataLoading={liveOrdersLoading}
          />
        </div>
        <div className="live-orders-non-dine-in">
          <Table
            currentPage={currentPageLiveOrdersNonDineIn}
            setCurrentPage={setCurrentPageLiveOrdersNonDineIn}
            Heading="Live Orders (Non-Dine-In)"
            tableData={liveOrderNonDineInAPIRedux && liveOrderNonDineInAPIRedux?.length > 0 && liveOrderNonDineInAPIRedux}
            viewType="full" recordsPerPage={RECORDS_PER_PAGE_LIMIT}
            totalpageNo={liveOrderNonDineInTotalPageNo ? liveOrderNonDineInTotalPageNo : 1}
            tabledataLoading={liveOrderNonDineInLoading}
          />

        </div>
        {/* <div className="tables-container-two">
          <Table
            Heading="Pick-Up & Delivery"
            tableData={DDDD["PickUp/Delivery"]}
            viewType="full"
            recordsPerPage={5}
          />
          <Table
            Heading="Check-In"
            tableData={LD["Check-In"]}
            viewType="full"
            recordsPerPage={5}
          />
        </div> */}
      </div>
    </div>
  );
};

export default CustomerInsights;