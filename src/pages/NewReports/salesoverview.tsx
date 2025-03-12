import React, { useContext, useEffect, useState } from "react";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useDispatch, useSelector } from "react-redux";
import {
  liveDiscountRequest,
  liveNetSalesRequest,
  liveOpenSalesRequest,
  liveOrderNonDineInRequest,
  liveOrdersRequest,
  liveRefundsRequest,
} from "redux/newReports/newReportsActions";
import { NewTableHeader } from "interface/newReportsInterface";
import SidePanel from "pages/SidePanel/indexOld";

import moment from "moment";
import NewTable from "components/reportComponents/NewTable";
import "./styles.scss";
import CategoryReport from "pages/CategoryReport";
import ReportsTabSwitch from "components/reportComponents/ReportsTabSwitch";
import TodaysReport from "./TodaysReport";

const SalesOverView: React.FC = () => {
  const { isExpanded } = useContext(Contextpagejs);

  const [liveOrdersSearchQuery, setLiveOrdersSearchQuery] = useState("");
  const [liveOrdersPageLimit, setLiveOrdersPageLimit] = useState<number>(10);

  const [liveOrderNonDineInSearchQuery, setLiveOrderNonDineInSearchQuery] =
    useState("");
  const [liveOrderNonDineInPageLimit, setLiveOrderNonDineInPageLimit] =
    useState<number>(10);

  const locationid = useSelector(
    (state: any) => state?.auth?.credentials?.locationId
  );

  const liveDiscountDataAPIRedux = useSelector(
    (state: any) => state?.newReports?.liveDiscountSuccess
  );

  const liveOpenSalesDataAPIRedux = useSelector(
    (state: any) => state?.newReports?.liveOpenSalesSuccess
  );

  const liveOrdersAPIRedux = useSelector(
    (state: any) => state?.newReports?.liveOrdersSuccess?.content
  );

  const liveOrdersTotalPageNo = useSelector(
    (state: any) => state?.newReports?.liveOrdersSuccess?.totalPages
  );

  const liveRefundsAPIRedux = useSelector(
    (state: any) => state?.newReports?.liveRefundsSuccess
  );

  const liveNetSalesAPIRedux = useSelector(
    (state: any) => state?.newReports?.liveNetSalesSuccess
  );

  const liveOrderNonDineInAPIRedux = useSelector(
    (state: any) => state?.newReports?.liveOrderNonDineInSuccess?.content
  );

  const liveOrderNonDineInTotalPageNo = useSelector(
    (state: any) => state?.newReports?.liveOrderNonDineInSuccess?.totalPages
  );

  const liveOrdersLoading = useSelector(
    (state: any) => state?.newReports?.liveOrdersLoading
  );

  const liveOrderNonDineInLoading = useSelector(
    (state: any) => state?.newReports?.liveOrderNonDineInLoading
  );

  const countryCode = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.country
  );

  const currencySymbol = countryCode === "US" ? "$" : "₹";

  const liveOrderNonDineInTableHeaders: NewTableHeader[] = [
    {
      key: "customerName",
      label: "Customer Name",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderDate",
      label: "Order Date",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderNumber",
      label: "Order Number",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderChannel",
      label: "Order Channel",
      isSortable: false,
      alignment: "left",
    },
    {
      key: "orderType",
      label: "Order Type",
      isSortable: false,
      alignment: "left",
    },
    {
      key: "requestedEta",
      label: "Requested ETA",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "timeElapsed",
      label: "Time Elapsed",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderStatus",
      label: "Order Status",
      isSortable: false,
      alignment: "left",
    },
    {
      key: "customerNumber",
      label: "Customer Number",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderTotal",
      label: `Order Total (${currencySymbol})`,
      isSortable: true,
      alignment: "right",
    },
  ];

  const liveOrdersDineInTableHeaders: NewTableHeader[] = [
    {
      key: "orderDate",
      label: "Order Date",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "tableName",
      label: "Table Name",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "tableOccupancyDuration",
      label: "Table Occupancy Duration",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderAmount",
      label: `Order Amount (${currencySymbol})`,
      isSortable: true,
      alignment: "right",
    },
    {
      key: "orderNumber",
      label: "Order Number",
      isSortable: true,
      alignment: "right",
    },
  ];

  // const RECORDS_PER_PAGE_LIMIT = 15

  const [
    totalPageNoCurrentPageLiveOrders,
    setTotalPageNoCurrentPageLiveOrders,
  ] = useState<number>(liveOrdersTotalPageNo || 1);
  const [currentPageLiveOrders, setCurrentPageLiveOrders] = useState<number>(1);

  const [
    totalPageNoCurrentPageLiveOrdersNonDineIn,
    setTotalPageNoCurrentPageLiveOrdersNonDineIn,
  ] = useState<number>(liveOrderNonDineInTotalPageNo || 1);
  const [currentPageLiveOrdersNonDineIn, setCurrentPageLiveOrdersNonDineIn] =
    useState<number>(1);

  const [isSwitchActive, setIsSwitchActive] = useState<boolean>(false);

  const handleToggleSwitch = () => {
    setIsSwitchActive((prev) => !prev);
  };

  const dispatch = useDispatch();

  // const [currentDate, setCurrentDate] = useState('');
  // const formattedDate = moment().format('YYYY-MM-DD');
  // setCurrentDate(formattedDate);
  const [currentDate, setCurrentDate] = useState("");

  // const handleSearchDebounce = (value: string, kpiTitle: string) => {
  //     dispatch(liveOrdersRequest({ locationid, tablePageNo: currentPageLiveOrders, tableRecordLimit: liveOrdersPageLimit, searchQuery: value }))
  // }

  const [activeTab, setActiveTab] = useState<string>("today");

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <SidePanel />
      <div
        className={`sales-overview-container ${
          isExpanded ? "sales-overview-container-expanded" : ""
        }`}
      >
        {/* <CategoryReport /> */}
        <h2>Reports & Insights</h2>
        <ReportsTabSwitch onTabChange={setActiveTab} />
        <div className="tab-content">
          {activeTab === "today" && <TodaysReport />}
          {activeTab === "sales" && <SalesOverView />}
          {activeTab === "categories" && <CategoryReport />}
          {/* {activeTab === "employees" && <Employees />} */}
          {/* {activeTab === "trends" && <Trends />} */}
        </div>
      </div>
    </div>
  );
};

export default SalesOverView;
