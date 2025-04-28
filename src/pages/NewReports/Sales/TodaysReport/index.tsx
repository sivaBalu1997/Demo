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
import { GroupedDataArray, groupedDataFlat, NewTableHeader } from "interface/newReportsInterface";
import {
  billedRequest,
  changeLocation,
  getTenderTypeRequest,
  liveDiscountRequest,
  liveNetSalesRequest,
  liveOpenSalesRequest,
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
import { ReactComponent as PayTapIcon } from "../../../../assets/svg/pay_tap.svg";
import { ReactComponent as KeyedInIcon } from "../../../../assets/svg/pay-card.svg";
import { ReactComponent as DefaultTenderTypeIcon } from "../../../../assets/svg/default-tender-type-icon-r.svg";
import { ReactComponent as SwiggyIcon } from "../../../../assets/svg/swiggy-icon-big-r.svg";
import { ReactComponent as ZomatoIcon } from "../../../../assets/svg/zomato-icon-big-r.svg";
import { ReactComponent as SeamlessIcon } from "../../../../assets/svg/seamless-icon-big-r.svg";
import { ReactComponent as GloriaFoodIcon } from "../../../../assets/svg/gloria-food-icon-big-r.svg";
import { ReactComponent as CashIcon } from "../../../../assets/svg/pay-cash.svg";
import { ReactComponent as CouponsIcon } from "../../../../assets/svg/pay-coupon.svg";
import { ReactComponent as GiftCardIcon } from "../../../../assets/svg/pay-gift-card.svg";
import { ReactComponent as UberEatsIcon } from "../../../../assets/svg/pay-uber-eats.svg";
import { ReactComponent as GooglePayIcon } from "../../../../assets/svg/pay-gpay.svg";
import { ReactComponent as GrubHubIcon } from "../../../../assets/svg/pay-grub-hub.svg";
import { ReactComponent as ApplePayIcon } from "../../../../assets/svg/pay-apple.svg";
import { ReactComponent as DoordashIcon } from "../../../../assets/svg/pay-doordash.svg";
import { ReactComponent as OfflineQRIcon } from "../../../../assets/svg/pay-tap.svg";
import "./style.scss";
import TenderType from 'components/reportComponents/TendorTypeCard';

const knownTendorIcons: any = {
  "Swipe/Tap/Dip": <PayTapIcon />,
  "Online/Key-In": <PayTapIcon />,
  "Card Swipe": <PayTapIcon />,
  "Keyed In": <KeyedInIcon />,
  Cash: <CashIcon />,
  "CASH": <CashIcon />,
  "Uber eats": <UberEatsIcon />,
  Grubhub: <GrubHubIcon />,
  Doordash: <DoordashIcon />,
  Coupons: <CouponsIcon />,
  "Gift Card": <GiftCardIcon />,
  "Google Pay": <GooglePayIcon />,
  "Apple Pay": <ApplePayIcon />,
  "Offline QR": <OfflineQRIcon />,
  "OFFLINE_QR": <OfflineQRIcon />,
  "Swiggy": <SwiggyIcon />,
  "Zomato": <ZomatoIcon />,
  "Seamless": <SeamlessIcon />,
  "GloriaFood": <GloriaFoodIcon />,
};

const leftGroup = ["Debit card", "Card", "Cash", "Aggregators"]
const rightGroup = ["Credit card", "Coupons", "Digital payments", "Others"]



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
  const tenderTypes = useSelector((state: any) => state?.newReports?.tenderTypeSuccess);
  const tenderTypesLoader = useSelector((state: any) => state?.newReports?.tenderTypeLoading);
  const tenderTypesError = useSelector((state: any) => state?.newReports?.tenderTypeFailure);

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
      orderNumber: Number(toBeMappedData.orderNumber || 0),
      orderChannel: toBeMappedData.orderChannel,
      orderType: toBeMappedData.orderType,
      timeElapsed: toBeMappedData.timeElapsed,
      orderStatus: toBeMappedData.orderStatus,
      customerName: toBeMappedData.customerName,
      customerNumber: toBeMappedData.customerNumber,
      orderTotal: Number(toBeMappedData.orderTotal || 0),
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
    {
      key: "orderStatus",
      label: "Order Status",
      isSortable: false,
      alignment: "left",
    },
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
      orderNumber: Number(toBeMappedData.orderNumber || 0),
      tableName: toBeMappedData.tableName,
      orderDate: toBeMappedData.orderDate,
      orderTime: toBeMappedData.orderTime,
      orderStatus: toBeMappedData.orderStatus,
      tableOccupancyDuration: toBeMappedData.tableOccupancyDuration,
      orderAmount: Number(toBeMappedData.orderAmount || 0),
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


  const liveOrderNonDineInTableHeadersMobile: NewTableHeader[] = [
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
      orderNumber: Number(toBeMappedData.orderNumber || 0),
      orderChannel: toBeMappedData.orderChannel,
      orderStatus: toBeMappedData.orderStatus,
      customerName: toBeMappedData.customerName,
      customerNumber: toBeMappedData.customerNumber,
      orderTotal: Number(toBeMappedData.orderTotal || 0),
    })
  );

  const paidDineInOrdersAPIReduxMapped = paidDineInOrdersAPIRedux?.content?.map((dataToBeMapped: any) => ({
    orderNumber: Number(dataToBeMapped?.orderNumber || 0),
    tableName: dataToBeMapped?.tableName,
    orderDate: dataToBeMapped?.orderDate,
    orderTime: dataToBeMapped?.orderTime,
    orderStatus: dataToBeMapped?.orderStatus,
    tableOccupancyDuration: dataToBeMapped?.tableOccupancyDuration,
    orderAmount: Number(dataToBeMapped?.orderAmount || 0),
  }))

  const paidDineInOrdersAPIReduxMappedMobile = paidDineInOrdersAPIRedux?.content?.map((dataToBeMapped: any) => ({
    tableName: dataToBeMapped?.tableName,
    orderAmount: dataToBeMapped?.orderAmount,
    tableOccupancyDuration: dataToBeMapped?.tableOccupancyDuration,
    orderTime: dataToBeMapped?.orderTime,
  }))

  const paidOffPremiseOrdersAPIReduxMapped = paidOffPremiseOrdersAPIRedux?.content?.map(
    (toBeMappedData: any) => ({
      orderNumber: Number(toBeMappedData?.orderNumber || 0),
      orderChannel: toBeMappedData?.orderChannel,
      orderType: toBeMappedData?.orderType,
      timeElapsed: toBeMappedData?.timeElapsed,
      orderStatus: toBeMappedData?.orderStatus,
      customerName: toBeMappedData?.customerName,
      customerNumber: toBeMappedData?.customerNumber,
      orderTotal: Number(toBeMappedData?.orderTotal || 0),
      // orderDate: toBeMappedData?.orderDate,
      // requestedEta: toBeMappedData?.requestedEta,
    })
  );

  const paidOffPremiseOrdersAPIReduxMappedMobile = paidOffPremiseOrdersAPIRedux?.content?.map(
    (toBeMappedData: any) => ({
      orderNumber: Number(toBeMappedData?.orderNumber || 0),
      orderChannel: toBeMappedData?.orderChannel,
      orderStatus: toBeMappedData?.orderStatus,
      customerName: toBeMappedData?.customerName,
      customerNumber: toBeMappedData?.customerNumber,
      orderTotal: Number(toBeMappedData?.orderTotal),
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


  useEffect(() => {
    if (selectedLocation?.value) {
      dispatch(getTenderTypeRequest({
        locationid: selectedLocation?.value
      }))
    }
  }, [selectedLocation])

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
  }, [paidCancelledOrdersSearchQuery, selectedLocation, currentPagePaidCancelledOrders, paidCancelledOrdersPageLimit]);

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
    if (selectedLocation?.value) dispatch(getTenderTypeRequest({ locationid: selectedLocation?.value }))
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

    dispatch(
      paidCancelledOrdersRequest({
        locationid: selectedLocation?.value,
        tablePageNo: 1,
        tableRecordLimit: 10,
        search: "",
      })
    );

  };

  const groupedData: any = useMemo(() => {
    const tendorGroups: any = {
      "Debit card": [],
      "Card": [],
      "Credit card": [],
      Cash: [],
      Coupons: [],
      "Digital payments": [],
      Aggregators: [],
      Others: [],
    };


    const tempdataObj: any = {};
    tenderTypes?.forEach((item: any) => {
      let key = tempdataObj[`${item?.paymentMode}-${item?.cardType}`] || {
        onPremiseSales: 0,
        onPremiseOrders: 0,
        offPremiseSales: 0,
        offPremiseOrders: 0,
        paymentMode: item?.paymentMode,
        totalSales: 0,
        totalOrders: 0,
        salesPercentage: 0,
        cardName: item?.cardName,
        cardType: item?.cardType,
        isExpandable: false,
      };
      if (item?.premises) {
        key.isExpandable = true;
        if (item?.premises === "ONPREM") {
          key.onPremiseSales += Number(item?.totalSales || 0);
          key.onPremiseOrders += Number(item?.totalOrders || 0);
        } else if (item?.premises === "OFFPREM") {
          key.offPremiseSales += Number(item?.totalSales || 0);
          key.offPremiseOrders += Number(item?.totalOrders || 0);
        }
        key.totalSales += Number(item?.totalSales || 0);
        key.totalOrders += Number(item?.totalOrders || 0);
        key.salesPercentage += Number(item?.salesPercentage || 0);
      } else {
        key.totalSales += Number(item?.totalSales || 0);
        key.totalOrders += Number(item?.totalOrders || 0);
        key.salesPercentage += Number(item?.salesPercentage || 0);
      }
      tempdataObj[`${item?.paymentMode}-${item?.cardType}`] = key;
    });


    Object.entries(tempdataObj)?.forEach(([itemkey, value]: [string, any]) => {
      const parts = itemkey.split("-");
      const cardType = parts.pop() || ""; // Extract the last element (credit/debit)
      const key = parts.join("-");
      if (["Swipe/Tap/Dip", "Card Swipe"]?.includes(key)) {
        if (cardType === "CREDIT") {
          tendorGroups["Credit card"].push(value);
        } else if (cardType === "DEBIT") {
          tendorGroups["Debit card"].push(value);
        } else {
          tendorGroups["Card"].push(value);
        }
      } else if (["Keyed In", "Online/Key-In"]?.includes(key)) {
        if (cardType === "CREDIT") {
          tendorGroups["Credit card"].push(value);
        } else if (cardType === "DEBIT") {
          tendorGroups["Debit card"].push(value);
        } else {
          tendorGroups["Card"].push(value);
        }
      } else if (["CASH"]?.includes(key)) {
        tendorGroups["Cash"].push(value);
      } else if (["Doordash", "Swiggy", "Grubhub", "Zomato"]?.includes(key)) {
        tendorGroups["Aggregators"].push(value);
      } else if (["Coupon", "Coupons"]?.includes(key)) {
        tendorGroups["Coupons"].push(value);
      } else if (["Digital payment", "Digital payments", "OFFLINE_QR"]?.includes(key)) {
        tendorGroups["Digital payments"].push(value);
      } else {
        tendorGroups["Others"].push(value);
      }
    });


    return tendorGroups;
  }, [tenderTypes]);

  const tenderTypeflatMappedData: (Omit<groupedDataFlat, "isExpandable"> & { group: string })[] = Object.entries(groupedData as GroupedDataArray)?.flatMap(
    ([group, items]) =>
      items?.map(({ isExpandable, salesPercentage, ...rest }) => ({
        ...rest,
        group,
        salesPercentage: Number(salesPercentage.toFixed(2)), // Ensuring a number type
      }))
  );

  const tenderTypeHeaderForDownloading = tenderTypeflatMappedData?.length > 0 && Object.keys(tenderTypeflatMappedData[0])?.map((key) => ({
    key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()
  }))

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
          isLoading={isSwitchActive ? billedDataAPIReduxLoading : unBilledAPIReduxLoading}
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

      {isSwitchActive ? <><div className="tender-type-head-container">
        <h2 className="sales-overview-sub-heading ">Tender Type</h2>
        {(!tenderTypesLoader && tenderTypeflatMappedData && tenderTypeHeaderForDownloading) && <DownloadReport kpiTitle="Tender Type" tableData={tenderTypeflatMappedData} headerData={tenderTypeHeaderForDownloading} />}
      </div>
        <ErrorHandler data={tenderTypes} isError={tenderTypesError}>
          <div className="reports-tendor-container">
            <div className="left-section">
              {leftGroup?.map((key) => (
                <>
                  {!Array.isArray(groupedData[key]) || !groupedData[key]?.length ? null : (
                    <>
                      <h3 className="tender-type-sub-heading">{key}</h3>
                      <div className="tender-type-container">
                        {Array.isArray(groupedData[key]) &&
                          groupedData[key].map((item: any, index: number) => (
                            <TenderType
                              icon={
                                knownTendorIcons?.[item?.paymentMode] || (
                                  // <KeyedInIcon />
                                  <DefaultTenderTypeIcon />
                                )
                              }
                              key={index}
                              tendorTitle={item?.paymentMode}
                              expandable={item?.isExpandable}
                              amount={item?.totalSales || 0}
                              orders={item?.totalOrders || 0}
                              percentage={Number(item?.salesPercentage || 0)}
                              onPremOrders={item?.onPremiseOrders || 0}
                              onPremSales={item?.onPremiseSales || 0}
                              offPremOrders={item?.offPremiseOrders || 0}
                              offPremSales={item?.offPremiseSales || 0}
                              loader={tenderTypesLoader}
                            />
                          ))}
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>

            <div className="right-section">
              {rightGroup?.map((key) => (

                <>
                  {!Array.isArray(groupedData[key]) || !groupedData[key]?.length ? null : (
                    <>
                      <h3 className="tender-type-sub-heading">{key}</h3>
                      <div className="tender-type-container">
                        {Array.isArray(groupedData[key]) &&
                          groupedData[key].map((item: any, index: number) => (
                            <TenderType
                              icon={
                                knownTendorIcons?.[item?.paymentMode] || (
                                  <DefaultTenderTypeIcon />
                                )
                              }
                              key={index}
                              tendorTitle={item?.paymentMode}
                              expandable={item?.isExpandable}
                              amount={item?.totalSales || 0}
                              orders={item?.totalOrders || 0}
                              percentage={Number(item?.salesPercentage || 0)}
                              onPremOrders={item?.onPremiseOrders || 0}
                              onPremSales={item?.onPremiseSales || 0}
                              offPremOrders={item?.offPremiseOrders || 0}
                              offPremSales={item?.offPremiseSales || 0}
                              loader={tenderTypesLoader}
                            />
                          ))}
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>
          </div>
        </ErrorHandler>

      </>
        : null}
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
          searchPlaceHolder="Search by order number, table name"
          onSearch={handleSearch}
          totalElements={liveOrdersAPIReduxTotalElements}
          showRoundedStyleCount={true}
        />}
        {isSwitchActive && <NewTable
          apiEndPoint="/sales/live/tables"
          queryParams={{
            locationId: selectedLocation?.value,
            startDate: currentDate,
            endDate: currentDate,
            type: "Paid",
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
          searchPlaceHolder="Search by order number, table name"
          onSearch={handleSearch}
          totalElements={paidDineInOrdersAPIRedux?.totalElements}
          showRoundedStyleCount={true}
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
          searchPlaceHolder="Search by order number, customer name"
          onSearch={handleSearch}
          totalElements={liveOrderNonDineInAPIReduxTotalElements}
          rowNoWrap={true}
          showRoundedStyleCount={true}
        />}
        {isSwitchActive && <NewTable
          apiEndPoint="/sales/live/tracking"
          queryParams={{
            locationId: selectedLocation?.value,
            startDate: currentDate,
            endDate: currentDate,
            type: "Paid",
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
          searchPlaceHolder="Search by order number, customer name"
          onSearch={handleSearch}
          totalElements={paidOffPremiseOrdersAPIRedux?.totalElements}
          rowNoWrap={true}
          showRoundedStyleCount={true}
        />}
        {isSwitchActive && <NewTable
          apiEndPoint="/sales/live/canceledOrders"
          queryParams={{
            locationId: selectedLocation?.value,
            startDate: currentDate,
            endDate: currentDate,
            type: "Paid",
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
          searchPlaceHolder="Search by order number, Phone number"
          onSearch={handleSearch}
          totalElements={paidCancelledOrdersAPIRedux?.totalElements}
          rowNoWrap={true}
          showRoundedStyleCount={true}
        />}
      </div>
    </div>
  );
};

export default TodaysReport;
