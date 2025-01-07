// live reports page
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { LD } from "../../../assets/mockData/originalAPIData/OliveReportData";
import { DDDD } from "assets/mockData/mock D/nested";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import Table from "../../../components/reportComponents/Table";
import Topnavbar from "../../../components/reportComponents/TopNavbar";
import SidePanel from "pages/SidePanel";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { liveDiscountRequest, liveNetSalesRequest, liveOpenSalesRequest, liveOrderNonDineInRequest, liveOrdersRequest, liveRefundsRequest } from "redux/newReports/newReportsActions";

const CustomerInsights = () => {
  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  const countryCode = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.country
  );

  console.log("country from sales", countryCode)

  const RECORDS_PER_PAGE_LIMIT = 15

  const [totalPageNoCurrentPageLiveOrders, setTotalPageNoCurrentPageLiveOrders] = useState<number>(5)
  const [currentPageLiveOrders, setCurrentPageLiveOrders] = useState<number>(1);
  console.log({ currentPageLiveOrders })

  const [totalPageNoCurrentPageLiveOrdersNonDineIn, setTotalPageNoCurrentPageLiveOrdersNonDineIn] = useState<number>(5)
  const [currentPageLiveOrdersNonDineIn, setCurrentPageLiveOrdersNonDineIn] = useState<number>(1);
  console.log({ currentPageLiveOrdersNonDineIn })

  const locationid = useSelector((state: any) => state?.auth?.credentials?.locationId)
  console.log("LOC", { locationid })

  const liveDiscountDataAPIRedux = useSelector((state: any) => state?.newReports?.liveDiscountSuccess);
  console.log("liveDiscountDataAPIRedux", liveDiscountDataAPIRedux)

  const liveOpenSalesDataAPIRedux = useSelector((state: any) => state?.newReports?.liveOpenSalesSuccess)
  console.log({ liveOpenSalesDataAPIRedux })

  const liveOrdersAPIRedux = useSelector((state: any) => state?.newReports?.liveOrdersSuccess)
  console.log({ liveOrdersAPIRedux })

  const liveRefundsAPIRedux = useSelector((state: any) => state?.newReports?.liveRefundsSuccess)
  console.log({ liveRefundsAPIRedux })

  const liveNetSalesAPIRedux = useSelector((state: any) => state?.newReports?.liveNetSalesSuccess)
  console.log({ liveNetSalesAPIRedux })

  const liveOrderNonDineInAPIRedux = useSelector((state: any) => state?.newReports?.liveOrderNonDineInSuccess)
  console.log({ liveOrderNonDineInAPIRedux })


  const dispatch = useDispatch();

  // const [currentDate, setCurrentDate] = useState('');
  // const formattedDate = moment().format('YYYY-MM-DD');
  // setCurrentDate(formattedDate);
  const [currentDate, setCurrentDate] = useState('');
  console.log({ currentDate })

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
    currentDate && dispatch(liveOrderNonDineInRequest({ locationid, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: RECORDS_PER_PAGE_LIMIT, startDate: currentDate, endDate: currentDate }))
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

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SidePanel />
      <div
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
          <h1>Maghil Restaurant, Parsippany</h1>
        </div>
        <div className="l-live-boxes-container">
          <div className={isExpanded ? "l-live-inner-box-expanded" : "l-live-inner-box"}>
            <div className="l-live-box">
              <h2>Discounts</h2>
              <h3>{countryCode === "US" ? '$' : '₹'}{liveDiscountDataAPIRedux && liveDiscountDataAPIRedux > 0 ? liveDiscountDataAPIRedux : LD?.discounts?.map((dis) => dis?.Discounts)}</h3>
            </div>
            <div className="l-live-box">
              <h2>Refund</h2>
              <h3>{countryCode === "US" ? '$' : '₹'}{liveRefundsAPIRedux && liveRefundsAPIRedux > 0 ? liveRefundsAPIRedux : LD?.refunds?.map((refund) => refund?.refunds)}</h3>
            </div>
            <div className="l-live-box">
              <h2>Open Sales</h2>
              <h3>{countryCode === "US" ? '$' : '₹'}{liveOpenSalesDataAPIRedux && liveOpenSalesDataAPIRedux > 0 ? liveOpenSalesDataAPIRedux : LD?.["open sales"]?.map((openSale) => openSale?.["Open Sales"])}</h3>
            </div>
            <div className="l-live-box">
              <h2>Net Sales</h2>
              <h3>{countryCode === "US" ? '$' : '₹'}{liveNetSalesAPIRedux && liveNetSalesAPIRedux > 0 ? liveNetSalesAPIRedux : LD?.["net sales"]?.map((netSale) => netSale?.["Net Sales"])}</h3>
            </div>
          </div>
        </div>
        <div className="tables-container-one">
          <Table
            currentPage={currentPageLiveOrders}
            setCurrentPage={setCurrentPageLiveOrders}
            Heading="Live Orders"
            // tableData={liveOrdersAPIRedux && liveOrdersAPIRedux?.length > 0 ? liveOrdersAPIRedux : LD["Live Orders New"]}
            tableData={liveOrdersAPIRedux && liveOrdersAPIRedux?.length > 0 && liveOrdersAPIRedux}
            viewType="full"
            recordsPerPage={RECORDS_PER_PAGE_LIMIT}
            totalpageNo={totalPageNoCurrentPageLiveOrders}
          />
        </div>
        <div className="live-orders-non-dine-in">
          <Table
            currentPage={currentPageLiveOrdersNonDineIn}
            setCurrentPage={setCurrentPageLiveOrdersNonDineIn}
            Heading="Live Orders (Non-Dine-In)"
            // tableData={liveOrderNonDineInAPIRedux && liveOrderNonDineInAPIRedux?.length > 0 ? liveOrderNonDineInAPIRedux : LD["Live Orders (Non Dine In)"]}
            tableData={liveOrderNonDineInAPIRedux && liveOrderNonDineInAPIRedux?.length > 0 && liveOrderNonDineInAPIRedux}
            viewType="full" recordsPerPage={RECORDS_PER_PAGE_LIMIT}
            totalpageNo={totalPageNoCurrentPageLiveOrdersNonDineIn}
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
