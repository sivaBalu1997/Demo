import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatNumberByCountry, getCurrencySymbol } from 'utils';
import { useWindowSize } from 'hooks/useWindowSize';
import {
  cardWithMiniGraphDataForTodays,
  cardWithMiniGraphDataForTodaysWithoutGratuity,
  textOneForTodaysSwitch,
  textTwoForTodaysSwitch,
} from "constants/reportConstants";
import { NewTableHeader } from "interface/newReportsInterface";
import {
  billedRequest,
  changeLocation,
  liveOrderNonDineInRequest,
  liveOrdersRequest,
  paidCancelledOrdersRequest,
  paidDineInOrdersRequest,
  paidOffPremiseOrdersRequest,
  unBilledRequest,
} from "redux/newReports/newReportsActions";
import SwitchableBox from "components/reportComponents/SwitchableBox";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
import moment from "moment";
import NewTable from "components/reportComponents/NewTable";
import StoreFilter from "components/reportComponents/StoreFilter";
import DownloadReport from "components/reportComponents/DownloadReports";
import ErrorHandler from 'components/reportComponents/ErrorHandler';
import "./style.scss";

const TodaysReport: React.FC = () => {
  const dispatch = useDispatch();

  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );
  const [currentDate, setCurrentDate] = useState("");
  const [currentPageLiveOrders, setCurrentPageLiveOrders] = useState<number>(1);
  const [currentPageLiveOrdersNonDineIn, setCurrentPageLiveOrdersNonDineIn] =
    useState<number>(1);
  const [isSwitchActive, setIsSwitchActive] = useState<boolean>(false);
  const [liveOrdersSearchQuery, setLiveOrdersSearchQuery] = useState("");
  const [liveOrdersPageLimit, setLiveOrdersPageLimit] = useState<number>(10);
  const [liveOrderNonDineInSearchQuery, setLiveOrderNonDineInSearchQuery] =
    useState("");
  const [liveOrderNonDineInPageLimit, setLiveOrderNonDineInPageLimit] =
    useState<number>(10);
  // paid dine-in orders states :
  const [currentPagePaidDineInOrders, setCurrentPagePaidDineInOrders] = useState<number>(1)
  const [paidDineInOrdersSearchQuery, setPaidDineInOrdersSearchQuery] = useState("")
  const [paidDineInOrdersPageLimit, setPaidDineInOrdersPageLimit] = useState<number>(10)
  // paid off-premise orders states :
  const [currentPagePaidOffPremiseOrders, setCurrentPagePaidOffPremiseOrders] = useState<number>(1)
  const [paidOffPremiseOrdersSearchQuery, setPaidOffPremiseOrdersSearchQuery] = useState("")
  const [paidOffPremisePageLimit, setPaidOffPremisePageLimit] = useState<number>(10)
  // paid cancelled orders states :
  const [currentPagePaidCancelledOrders, setCurrentPagePaidCancelledOrders] = useState<number>(1)
  const [paidCancelledOrdersSearchQuery, setPaidCancelledOrdersSearchQuery] = useState("")
  const [paidCancelledOrdersPageLimit, setPaidCancelledOrdersPageLimit] = useState<number>(10)

  const { width } = useWindowSize();

  const isMobile = width <= 600;

  const paidDineInOrdersAPIRedux = useSelector(
    (state: any) => state?.newReports?.paidDineInOrdersSuccess
  )

  const paidDineInOrdersLoading = useSelector(
    (state: any) => state?.newReports?.paidDineInOrdersLoading
  )

  const paidOffPremiseOrdersAPIRedux = useSelector(
    (state: any) => state?.newReports?.paidOffPremiseOrdersSuccess
  )

  const paidOffPremiseOrdersAPIReduxLoading = useSelector(
    (state: any) => state?.newReports?.paidOffPremiseOrdersLoading
  )

  const liveOrdersAPIRedux = useSelector(
    (state: any) => state?.newReports?.liveOrdersSuccess?.content
  );
  const liveOrdersAPIReduxTotalElements = useSelector(
    (state: any) => state?.newReports?.liveOrdersSuccess?.totalElements
  );
  const liveOrdersTotalPageNo = useSelector(
    (state: any) => state?.newReports?.liveOrdersSuccess?.totalPages
  );
  const liveOrderNonDineInAPIRedux = useSelector(
    (state: any) => state?.newReports?.liveOrderNonDineInSuccess?.content
  );
  const liveOrderNonDineInAPIReduxTotalElements = useSelector(
    (state: any) => state?.newReports?.liveOrderNonDineInSuccess?.totalElements
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
    (state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country
  );
  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const billedDataAPIRedux = useSelector(
    (state: any) => state?.newReports?.billedSuccess
  );
  const billedDataAPIReduxLoading = useSelector(
    (state: any) => state?.newReports?.billedLoading
  );

  const billedDataAPIReduxError = useSelector(
    (state: any) => state?.newReports?.billedFailure
  );

  const unBilledAPIRedux = useSelector(
    (state: any) => state?.newReports?.unBilledSuccess
  );
  const unBilledAPIReduxLoading = useSelector(
    (state: any) => state?.newReports?.unBilledLoading
  );

  const unBilledAPIReduxError = useSelector(
    (state: any) => state?.newReports?.unBilledFailure
  );

  const paidCancelledOrdersAPIRedux = useSelector(
    (state: any) => state?.newReports?.paidCancelledOrdersSuccess
  )

  const paidCancelledOrdersAPIReduxLoading = useSelector(
    (state: any) => state?.newReports?.paidCancelledOrdersLoading
  )

  const billedDataArrayForDownloading = [billedDataAPIRedux];
  const billedDataAPIReduxHeaderForDownloading =
    billedDataAPIRedux &&
    Object.keys(billedDataAPIRedux)?.map((key) => ({
      key,
      label: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim(),
    }));

  const unBilledAPIReduxArrayForDownloading = [unBilledAPIRedux];
  const unBilledAPIReduxHeaderForDownloading =
    unBilledAPIRedux &&
    Object.keys(unBilledAPIRedux)?.map((key) => ({
      key,
      label: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .trim(),
    }));

  const currencySymbol = useMemo(
    () => getCurrencySymbol(countryCode, true),
    [countryCode]
  );


  const liveOrderNonDineInTableHeaders: NewTableHeader[] = [
    {
      key: "orderNumber",
      label: "Order Number",
      isSortable: true,
      alignment: "left",
      prefix: "#",
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
      key: "timeElapsed",
      label: "Time Elapsed",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderStatus",
      label: "Order Status",
      isSortable: false,
      alignment: "center",
    },
    {
      key: "customerName",
      label: "Customer Name",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "customerNumber",
      label: "Customer Number",
      isSortable: true,
      isPrivate: true,
      alignment: "left",
    },
    {
      key: "orderTotal",
      label: `Order Total`,
      isSortable: true,
      alignment: "right",
      isMonetary: true,
      prefix: currencySymbol,
    },
    // { key: 'orderDate', label: 'Order Date', isSortable: true, alignment: 'left' },
    // { key: 'requestedEta', label: 'Requested ETA', isSortable: true, alignment: 'left' },
  ];

  const paidCancelledOrdersHeaders: NewTableHeader[] = [
    {
      key: "orderNumber",
      label: "Order Number",
      isSortable: true,
      alignment: "left",
      prefix: "#",
    },
    {
      key: "orderChannel",
      label: "Order Channel",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderType",
      label: "Order Type",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderTime",
      label: "Order time",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "customerName",
      label: "Customer Name",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "customerNumber",
      label: "Customer Number",
      isSortable: false,
      isPrivate: true,
      alignment: "left",
    },
    {
      key: "orderTotal",
      label: "Updated order total",
      isSortable: true,
      alignment: "left",
      isMonetary: true,
      prefix: currencySymbol,
    },
    {
      key: "canceledAmount",
      label: `Cancelled Amount`,
      isSortable: true,
      alignment: "right",
      isMonetary: true,
      prefix: currencySymbol,
    }
  ];

  const orderedLiveNonDineInData = liveOrderNonDineInAPIRedux?.map(
    (toBeMappedData: any) => ({
      orderNumber: toBeMappedData.orderNumber,
      orderChannel: toBeMappedData.orderChannel,
      orderType: toBeMappedData.orderType,
      timeElapsed: toBeMappedData.timeElapsed,
      orderStatus: toBeMappedData.orderStatus,
      customerName: toBeMappedData.customerName,
      customerNumber: toBeMappedData.customerNumber,
      orderTotal: toBeMappedData.orderTotal,
      // orderDate: toBeMappedData.orderDate,
      // requestedEta: toBeMappedData.requestedEta,
    })
  );

  const liveOrdersDineInTableHeaders: NewTableHeader[] = [
    {
      key: "orderNumber",
      label: "Order number",
      isSortable: true,
      alignment: "left",
      prefix: "#",
    },
    {
      key: "tableName",
      label: "Table name",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderDate",
      label: "Order date",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderTime",
      label: "Order time",
      isSortable: true,
      alignment: "left",
    },
    // {
    //   key: "orderStatus",
    //   label: "Order Status",
    //   isSortable: false,
    //   alignment: "left",
    // },
    {
      key: "tableOccupancyDuration",
      label: "Table occupancy duration",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderAmount",
      label: `Order amount`,
      isSortable: true,
      alignment: "right",
      isMonetary: true,
      prefix: currencySymbol,
    },
  ];

  const orderedLiveOrdersData = liveOrdersAPIRedux?.map(
    (toBeMappedData: any) => ({
      orderNumber: toBeMappedData.orderNumber,
      tableName: toBeMappedData.tableName,
      orderDate: toBeMappedData.orderDate,
      orderTime: toBeMappedData.orderTime,
      orderStatus: toBeMappedData.orderStatus,
      tableOccupancyDuration: toBeMappedData.tableOccupancyDuration,
      orderAmount: toBeMappedData.orderAmount,
    })
  );

  const liveOrdersDineInTableHeadersMobile: NewTableHeader[] = [
    {
    key: "tableName",
    label: "Table name",
    isSortable: true,
    alignment: "left",
  },
    {
    key: "orderAmount",
    label: `Order amount`,
    isSortable: true,
    alignment: "right",
    isMonetary: true,
    prefix: currencySymbol,
  },
    {
    key: "tableOccupancyDuration",
    label: "Table occupancy duration",
    isSortable: true,
    alignment: "left",
  },
    {
    key: "orderTime",
    label: "Order time",
    isSortable: true,
    alignment: "left",
  },
];

const orderedLiveOrdersDataMobile = liveOrdersAPIRedux?.map(
  (toBeMappedData: any) => ({
    tableName: toBeMappedData.tableName,
    orderAmount: toBeMappedData.orderAmount,
    tableOccupancyDuration: toBeMappedData.tableOccupancyDuration,
    orderTime: toBeMappedData.orderTime,
  })
);

const liveOrderNonDineInTableHeadersMobile : NewTableHeader[] = [
  {
    key: "orderNumber",
    label: "Order Number",
    isSortable: true,
    alignment: "left",
    prefix: "#",
  },
  {
    key: "orderChannel",
    label: "Order Channel",
    isSortable: false,
    alignment: "left",
  },
  {
    key: "orderStatus",
    label: "Order Status",
    isSortable: false,
    alignment: "left",
  },
  {
    key: "customerName",
    label: "Customer Name",
    isSortable: true,
    alignment: "left",
  },
  {
    key: "customerNumber",
    label: "Customer Number",
    isSortable: true,
    isPrivate: true,
    alignment: "left",
  },
  {
    key: "orderTotal",
    label: `Order Total`,
    isSortable: true,
    alignment: "right",
    isMonetary: true,
    prefix: currencySymbol,
  },
];

const orderedLiveNonDineInDataMobile = liveOrderNonDineInAPIRedux?.map(
  (toBeMappedData: any) => ({
    orderNumber: toBeMappedData.orderNumber,
    orderChannel: toBeMappedData.orderChannel,
    orderStatus: toBeMappedData.orderStatus,
    customerName: toBeMappedData.customerName,
    customerNumber: toBeMappedData.customerNumber,
    orderTotal: toBeMappedData.orderTotal,
  })
);

const paidDineInOrdersAPIReduxMapped =  paidDineInOrdersAPIRedux?.content?.map((dataToBeMapped: any)=>({
  orderNumber: dataToBeMapped?.orderNumber,
  tableName: dataToBeMapped?.tableName,
  orderDate: dataToBeMapped?.orderDate,
  orderTime: dataToBeMapped?.orderTime,
  orderStatus: dataToBeMapped?.orderStatus,
  tableOccupancyDuration: dataToBeMapped?.tableOccupancyDuration,
  orderAmount: dataToBeMapped?.orderAmount,
}))

const paidDineInOrdersAPIReduxMappedMobile = paidDineInOrdersAPIRedux?.content?.map((dataToBeMapped: any)=>({
  tableName: dataToBeMapped?.tableName,
  orderAmount: dataToBeMapped?.orderAmount,
  tableOccupancyDuration: dataToBeMapped?.tableOccupancyDuration,
  orderTime: dataToBeMapped?.orderTime,
}))

const paidOffPremiseOrdersAPIReduxMapped = paidOffPremiseOrdersAPIRedux?.content?.map(
  (toBeMappedData: any) => ({
    orderNumber: toBeMappedData?.orderNumber,
    orderChannel: toBeMappedData?.orderChannel,
    orderType: toBeMappedData?.orderType,
    timeElapsed: toBeMappedData?.timeElapsed,
    orderStatus: toBeMappedData?.orderStatus,
    customerName: toBeMappedData?.customerName,
    customerNumber: toBeMappedData?.customerNumber,
    orderTotal: toBeMappedData?.orderTotal,
    // orderDate: toBeMappedData?.orderDate,
    // requestedEta: toBeMappedData?.requestedEta,
  })
);

const paidOffPremiseOrdersAPIReduxMappedMobile = paidOffPremiseOrdersAPIRedux?.content?.map(
  (toBeMappedData: any) => ({
    orderNumber: toBeMappedData?.orderNumber,
    orderChannel: toBeMappedData?.orderChannel,
    orderStatus: toBeMappedData?.orderStatus,
    customerName: toBeMappedData?.customerName,
    customerNumber: toBeMappedData?.customerNumber,
    orderTotal: toBeMappedData?.orderTotal,
  })
);

  // Unpaid Dine-in orders
  useEffect(() => {
    const formattedDate = moment().format("YYYY-MM-DD");
    setCurrentDate(formattedDate);
    let search = liveOrdersSearchQuery;
    if (search?.[0] === "#") search = search.slice(1);

    currentDate &&
      dispatch(
        liveOrdersRequest({
          locationid: selectedLocation?.value,
          tablePageNo: currentPageLiveOrders,
          tableRecordLimit: liveOrdersPageLimit,
          startDate: currentDate,
          endDate: currentDate,
          searchQuery: search,
        })
      );
  }, [
    selectedLocation,
    currentPageLiveOrders,
    liveOrdersPageLimit,
    currentDate,
    liveOrdersSearchQuery,
  ]);

  // Paid Dine-in orders 
  useEffect(() => {
    const formattedDate = moment().format("YYYY-MM-DD");
    setCurrentDate(formattedDate);
    let search = paidDineInOrdersSearchQuery;
    if (search?.[0] === "#") search = search.slice(1);

    currentDate &&
      dispatch(
        paidDineInOrdersRequest({
          locationid: selectedLocation?.value,
          tablePageNo: currentPagePaidDineInOrders,
          tableRecordLimit: paidDineInOrdersPageLimit,
          startDate: currentDate,
          endDate: currentDate,
          searchQuery: search,
          type: "Paid",
        })
      );
  }, [
    selectedLocation,
    currentPagePaidDineInOrders,
    paidDineInOrdersPageLimit,
    currentDate,
    paidDineInOrdersSearchQuery,
  ]);

  // Unpaid Off-Premise orders
  useEffect(() => {
    const formattedDate = moment().format("YYYY-MM-DD");
    setCurrentDate(formattedDate);
    let search = liveOrderNonDineInSearchQuery;
    if (search[0] === "#") search = search.slice(1);
    currentDate &&
      dispatch(
        liveOrderNonDineInRequest({
          locationid: selectedLocation?.value,
          tablePageNo: currentPageLiveOrdersNonDineIn,
          tableRecordLimit: liveOrderNonDineInPageLimit,
          startDate: currentDate,
          endDate: currentDate,
          searchQuery: search,
        })
      );
  }, [
    selectedLocation,
    currentPageLiveOrdersNonDineIn,
    currentDate,
    liveOrderNonDineInPageLimit,
    liveOrderNonDineInSearchQuery,
  ]);

  // Paid Off-Premise orders
  useEffect(() => {
    const formattedDate = moment().format("YYYY-MM-DD");
    setCurrentDate(formattedDate);
    let search = paidOffPremiseOrdersSearchQuery;
    if (search[0] === "#") search = search.slice(1);
    currentDate &&
      dispatch(
        paidOffPremiseOrdersRequest({
          locationid: selectedLocation?.value,
          tablePageNo: currentPagePaidOffPremiseOrders,
          tableRecordLimit: paidOffPremisePageLimit,
          startDate: currentDate,
          endDate: currentDate,
          searchQuery: search,
          type: "Paid",
        })
      );
  }, [
    selectedLocation,
    currentPagePaidOffPremiseOrders,
    currentDate,
    paidOffPremisePageLimit,
    paidOffPremiseOrdersSearchQuery,
  ]);

  useEffect(() => {
    const formattedDate = moment().format("YYYY-MM-DD");
    setCurrentDate(formattedDate);
    currentDate &&
      dispatch(
        billedRequest({
          locationid: selectedLocation?.value,
          startDate: currentDate,
          type: "completed",
        })
      );
  }, [currentDate, selectedLocation]);

  useEffect(() => {
    const formattedDate = moment().format("YYYY-MM-DD");
    setCurrentDate(formattedDate);
    currentDate &&
      dispatch(
        unBilledRequest({
          locationid: selectedLocation?.value,
          startDate: currentDate,
          type: "notcompleted",
        })
      );
  }, [currentDate, selectedLocation]);

  const handleToggleSwitch = () => {
    setIsSwitchActive((prev) => !prev);
  };

  useEffect(() => {
    let search = paidCancelledOrdersSearchQuery;
      dispatch(
        paidCancelledOrdersRequest({
          locationid: selectedLocation?.value,
          tablePageNo: currentPagePaidCancelledOrders,
          tableRecordLimit: paidCancelledOrdersPageLimit,
          search: search,
        })
      );
  },[paidCancelledOrdersSearchQuery, selectedLocation, currentPagePaidCancelledOrders, paidCancelledOrdersPageLimit]);

  const handleSearch = (value: string, kpiTitle: string) => {
    let search = value;
    if (search?.[0] === "#") search = search.slice(1);
  
    switch (kpiTitle) {
      case "Unpaid Dine-in orders":
        setLiveOrdersSearchQuery(value);
        setCurrentPageLiveOrders(1);
        dispatch(
          liveOrdersRequest({
            locationid: selectedLocation?.value,
            tablePageNo: 1,
            tableRecordLimit: liveOrdersPageLimit,
            startDate: currentDate,
            endDate: currentDate,
            searchQuery: search,
          })
        );
        break;
  
      case "Paid Dine-in orders":
        setPaidDineInOrdersSearchQuery(value);
        setCurrentPagePaidDineInOrders(1);
        dispatch(
          paidDineInOrdersRequest({
            locationid: selectedLocation?.value,
            tablePageNo: currentPagePaidDineInOrders,
            tableRecordLimit: paidDineInOrdersPageLimit,
            startDate: currentDate,
            endDate: currentDate,
            searchQuery: search,
            type: "Paid",
          })
        );
        break;
  
      case "Unpaid Off-Premise orders":
        setLiveOrderNonDineInSearchQuery(value);
        setCurrentPageLiveOrdersNonDineIn(1);
        dispatch(
          liveOrderNonDineInRequest({
            locationid: selectedLocation?.value,
            tablePageNo: 1,
            tableRecordLimit: liveOrderNonDineInPageLimit,
            startDate: currentDate,
            endDate: currentDate,
            searchQuery: search,
          })
        );
        break;
  
      case "Paid Off-Premise orders":
        setPaidOffPremiseOrdersSearchQuery(value);
        setCurrentPagePaidOffPremiseOrders(1);
        dispatch(
          paidOffPremiseOrdersRequest({
            locationid: selectedLocation?.value,
            tablePageNo: currentPagePaidOffPremiseOrders,
            tableRecordLimit: paidOffPremisePageLimit,
            startDate: currentDate,
            endDate: currentDate,
            searchQuery: search,
            type: "Paid",
          })
        );
        break;
      
      case "Paid cancelled orders":
        setPaidCancelledOrdersSearchQuery(value);
        setCurrentPagePaidCancelledOrders(1);
        dispatch(
          paidCancelledOrdersRequest({
            locationid: selectedLocation?.value,
            tablePageNo: currentPagePaidCancelledOrders,
            tableRecordLimit: paidCancelledOrdersPageLimit,
            search: search,
          })
        );
        break;
  
      default:
        console.warn(`Unknown KPI title: ${kpiTitle}`);
    }
  };
  

  const handleRefreshClick = () => {
    setLiveOrdersSearchQuery("");
    setLiveOrdersPageLimit(10);
    setCurrentPageLiveOrders(1);
    
    setPaidDineInOrdersSearchQuery("")
    setPaidDineInOrdersPageLimit(10);
    setCurrentPagePaidDineInOrders(1);

    setLiveOrderNonDineInSearchQuery("");
    setLiveOrderNonDineInPageLimit(10);
    setCurrentPageLiveOrdersNonDineIn(1);

    setPaidOffPremiseOrdersSearchQuery("");
    setPaidOffPremisePageLimit(10);
    setCurrentPagePaidOffPremiseOrders(1);

    setPaidCancelledOrdersSearchQuery("");
    setPaidCancelledOrdersPageLimit(10);
    setCurrentPagePaidCancelledOrders(1);

    dispatch(
      liveOrdersRequest({
        locationid: selectedLocation?.value,
        tablePageNo: 1,
        tableRecordLimit: 10,
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        searchQuery: "",
      })
    );
    dispatch(
      paidDineInOrdersRequest({
        locationid: selectedLocation?.value,
        tablePageNo: 1,
        tableRecordLimit: 10,
        startDate: currentDate,
        endDate: currentDate,
        searchQuery: "",
        type: "Paid",
      })
    );
    dispatch(
      liveOrderNonDineInRequest({
        locationid: selectedLocation?.value,
        tablePageNo: 1,
        tableRecordLimit: 10,
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        searchQuery: "",
      })
    );
    dispatch(
      paidOffPremiseOrdersRequest({
        locationid: selectedLocation?.value,
        tablePageNo: 1,
        tableRecordLimit: 10,
        startDate: currentDate,
        endDate: currentDate,
        searchQuery: "",
        type: "Paid",
      })
    );
    dispatch(
      billedRequest({
        locationid: selectedLocation?.value,
        startDate: currentDate,
        type: "completed",
      })
    );
    dispatch(
      unBilledRequest({
        locationid: selectedLocation?.value,
        startDate: currentDate,
        type: "notcompleted",
      })
    );

    // dispatch(
    //   paidCancelledOrdersRequest({
    //     locationid: selectedLocation?.value,
    //     tablePageNo: 1,
    //     tableRecordLimit: 10,
    //     search: "",
    //   })
    // );

  };

  return (
    <div className="todays-report-container">
      <StoreFilter
        storeOptions={locations}
        selectedStore={selectedLocation}
        setSelectedStore={(store) => dispatch(changeLocation(store))}
        handleRefreshClick={handleRefreshClick}
        showRefresh={true}
        showDate={false}
      />

      <SwitchableBox
        textOne={textOneForTodaysSwitch}
        textTwo={textTwoForTodaysSwitch}
        isActive={isSwitchActive}
        toggleSwitch={handleToggleSwitch}
      />
      <div className="todays-report-sales-overview-box-container-parent">
        <div className="sales-overview-box-with-download">
          <h2>Sales Overview</h2>
          {!billedDataAPIReduxLoading &&
            billedDataArrayForDownloading &&
            !unBilledAPIReduxLoading &&
            unBilledAPIReduxArrayForDownloading && (
              <DownloadReport
                kpiTitle="Today's Sales Overview"
                tableData={
                  isSwitchActive
                    ? billedDataArrayForDownloading
                    : unBilledAPIReduxArrayForDownloading
                }
                headerData={
                  isSwitchActive
                    ? billedDataAPIReduxHeaderForDownloading
                    : unBilledAPIReduxHeaderForDownloading
                }
              />
            )}
        </div>

        <ErrorHandler
          data={isSwitchActive ? billedDataAPIRedux : unBilledAPIRedux}
          isError={isSwitchActive ? billedDataAPIReduxError : unBilledAPIReduxError}
          isLoading={ isSwitchActive ? billedDataAPIReduxLoading : unBilledAPIReduxLoading}
        >
          <div className="todays-report-sales-overview-box-container">
            {(countryCode === "US"
              ? cardWithMiniGraphDataForTodays
              : cardWithMiniGraphDataForTodaysWithoutGratuity
            )
              .filter(({ key }) => !isSwitchActive ? key !== "totalCancelledOrders" : true)
              .map(({ title, key, isMonetary }) => (
                <CardWithMiniGraph
                  key={key}
                  cardTitle={title}
                  cardValue={formatNumberByCountry(
                    (isSwitchActive ? billedDataAPIRedux : unBilledAPIRedux)?.[key],
                    countryCode,
                    isMonetary
                  )}
                  isMonetary={isMonetary}
                  loader={isSwitchActive ? billedDataAPIReduxLoading : unBilledAPIReduxLoading}
                />
              ))}
          </div>
        </ErrorHandler>


      </div>
      <div className="todays-report-tables-container">
        {!isSwitchActive && <NewTable
          apiEndPoint="/sales/live/tables"
          queryParams={{
            locationId: selectedLocation?.value,
            startDate: currentDate,
            endDate: currentDate,
          }}
          kpiTitle={`Unpaid Dine-in orders`}
          searchQuery={liveOrdersSearchQuery}
          headerData={isMobile ? liveOrdersDineInTableHeadersMobile : liveOrdersDineInTableHeaders}
          tableData={isMobile ? orderedLiveOrdersDataMobile : orderedLiveOrdersData}
          currentPage={currentPageLiveOrders}
          totalPages={liveOrdersTotalPageNo ? liveOrdersTotalPageNo : 1}
          onPageChange={setCurrentPageLiveOrders}
          rowsPerPage={liveOrdersPageLimit}
          setRowsPerPage={setLiveOrdersPageLimit}
          loader={liveOrdersLoading}
          count={liveOrdersAPIReduxTotalElements}
          searchPlaceHolder="Search by order number, table name"
          onSearch={handleSearch}
          totalElements={liveOrdersAPIReduxTotalElements}
        />}
        {isSwitchActive && <NewTable
          apiEndPoint="/sales/live/tables"
          queryParams={{
            locationId: selectedLocation?.value,
            startDate: currentDate,
            endDate: currentDate,
            type:"Paid",
          }}
          kpiTitle={`Paid Dine-in orders`}
          searchQuery={paidDineInOrdersSearchQuery}
          headerData={isMobile ? liveOrdersDineInTableHeadersMobile : liveOrdersDineInTableHeaders}
          tableData={isMobile ? paidDineInOrdersAPIReduxMappedMobile : paidDineInOrdersAPIReduxMapped}
          currentPage={currentPagePaidDineInOrders}
          onPageChange={setCurrentPagePaidDineInOrders}
          totalPages={paidDineInOrdersAPIRedux?.totalPages ? paidDineInOrdersAPIRedux?.totalPages : 1}
          rowsPerPage={paidDineInOrdersPageLimit}
          setRowsPerPage={setPaidDineInOrdersPageLimit}
          loader={paidDineInOrdersLoading}
          count={paidDineInOrdersAPIRedux?.totalElements}
          searchPlaceHolder="Search by order number, table name"
          onSearch={handleSearch}
          totalElements={paidDineInOrdersAPIRedux?.totalElements}
        />}
        {!isSwitchActive && <NewTable
          apiEndPoint="/sales/live/tracking"
          queryParams={{
            locationId: selectedLocation?.value,
            startDate: currentDate,
            endDate: currentDate,
          }}
          kpiTitle={`Unpaid Off-Premise orders`}
          searchQuery={liveOrderNonDineInSearchQuery}
          headerData={isMobile ? liveOrderNonDineInTableHeadersMobile : liveOrderNonDineInTableHeaders}
          tableData={isMobile ? orderedLiveNonDineInDataMobile : orderedLiveNonDineInData}
          currentPage={currentPageLiveOrdersNonDineIn}
          totalPages={
            liveOrderNonDineInTotalPageNo ? liveOrderNonDineInTotalPageNo : 1
          }
          onPageChange={setCurrentPageLiveOrdersNonDineIn}
          rowsPerPage={liveOrderNonDineInPageLimit}
          setRowsPerPage={setLiveOrderNonDineInPageLimit}
          loader={liveOrderNonDineInLoading}
          count={liveOrderNonDineInAPIReduxTotalElements}
          searchPlaceHolder="Search by order number, customer name"
          onSearch={handleSearch}
          totalElements={liveOrderNonDineInAPIReduxTotalElements}
          rowNoWrap={true}
        />}
        {isSwitchActive && <NewTable
          apiEndPoint="/sales/live/tracking"
          queryParams={{
            locationId: selectedLocation?.value,
            startDate: currentDate,
            endDate: currentDate,
            type:"Paid",
          }}
          kpiTitle={`Paid Off-Premise orders`}
          searchQuery={paidOffPremiseOrdersSearchQuery}
          headerData={isMobile ? liveOrderNonDineInTableHeadersMobile : liveOrderNonDineInTableHeaders}
          tableData={isMobile ? paidOffPremiseOrdersAPIReduxMappedMobile : paidOffPremiseOrdersAPIReduxMapped}
          currentPage={currentPagePaidOffPremiseOrders}
          onPageChange={setCurrentPagePaidOffPremiseOrders}
          totalPages={paidOffPremiseOrdersAPIRedux?.totalPages ? paidOffPremiseOrdersAPIRedux?.totalPages : 1}
          rowsPerPage={paidOffPremisePageLimit}
          setRowsPerPage={setPaidOffPremisePageLimit}
          loader={paidOffPremiseOrdersAPIReduxLoading}
          count={paidOffPremiseOrdersAPIRedux?.totalElements}
          searchPlaceHolder="Search by order number, customer name"
          onSearch={handleSearch}
          totalElements={paidOffPremiseOrdersAPIRedux?.totalElements}
          rowNoWrap={true}
        />}
        {isSwitchActive && <NewTable
          apiEndPoint="/sales/live/canceledOrders"
          queryParams={{
            locationId: selectedLocation?.value,
            startDate: currentDate,
            endDate: currentDate,
            type:"Paid",
          }}
          kpiTitle={`Paid cancelled orders`}
          searchQuery={paidCancelledOrdersSearchQuery}
          headerData={isMobile ? paidCancelledOrdersHeaders : paidCancelledOrdersHeaders}
          tableData={isMobile ? paidCancelledOrdersAPIRedux?.content : paidCancelledOrdersAPIRedux?.content}
          currentPage={currentPagePaidCancelledOrders}
          onPageChange={setCurrentPagePaidCancelledOrders}
          totalPages={paidCancelledOrdersAPIRedux?.totalPages ? paidCancelledOrdersAPIRedux?.totalPages : 1}
          rowsPerPage={paidCancelledOrdersPageLimit}
          setRowsPerPage={setPaidCancelledOrdersPageLimit}
          loader={paidCancelledOrdersAPIReduxLoading}
          count={paidCancelledOrdersAPIRedux?.content?.length}
          searchPlaceHolder="Search by order number, Phone number"
          onSearch={handleSearch}
          totalElements={paidCancelledOrdersAPIRedux?.totalElements}
          rowNoWrap={true}
        />}
      </div>
    </div>
  );
};

export default TodaysReport;