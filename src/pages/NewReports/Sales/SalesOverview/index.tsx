import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancellationSummaryRequest,
  changeLocation,
  discountSummaryRequest,
  offerSummaryRequest,
  paymentDetailsRequest,
  salesByChannelRequest,
  salesByRevenueClassRequest,
  salesCardTypeRequest,
  salesCategoryRequest,
  salesSummaryReportRequest,
  salesSummaryRequest,
  staffSalesRequest,
  voidedOrderSummaryRequest,
} from "redux/newReports/newReportsActions";
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
import { ReactComponent as InfoIcon } from "../../../../assets/svg/info_grey.svg";
import { ReactComponent as ArrowLeft } from "../../../../assets/svg/r-arrow-left.svg";
import { GroupedDataArray, groupedDataFlat, NewTableHeader } from "interface/newReportsInterface";
import { formatNumberByCountry, getCurrencySymbol, transformSalesData } from "utils";
import { cardConfigForSalesTabOverView, cardConfigForSalesTabOverViewWithoutGratuity } from "constants/reportConstants";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
import TenderType from "components/reportComponents/TendorTypeCard";
import CardTypeChart from "components/reportComponents/chart";
import EmployeeSalesChart from "components/reportComponents/chart/chartEmployees";
import ChannelSalesChart from "components/reportComponents/chart/channelChart";
import RevenueClassChart from "components/reportComponents/chart/RevenueClassChart";
import StoreFilter from "components/reportComponents/StoreFilter";
import NewTable from "components/reportComponents/NewTable";
import DoughnutChart from "components/reportComponents/ReusableCharts/ReusableDoughnutChart";
import useDateFilter from "hooks/useDateFilter";
// import useDebounce from "hooks/useDebounce";
import ErrorHandler from "components/reportComponents/ErrorHandler";
import ReportNotFound from "components/reportComponents/ReportsNotFound";
import DownloadReport from "components/reportComponents/DownloadReports";
import "./SalesOverview.scss";


interface ReportProps { }


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

const discountTableHeaders: NewTableHeader[] = [
  {
    key: "orderNo",
    label: `Order number`,
    isSortable: true,
    alignment: "left",
    prefix: "#"
  },
  {
    key: "orderType",
    label: `Order type`,
    isSortable: true,
    alignment: "left",
  },
  {
    key: "stew",
    label: `Staff name`,
    isSortable: true,
    alignment: "left",
  },
  {
    key: "orderTotal",
    label: `Order Total`,
    isSortable: true,
    alignment: "right",
  },
  {
    key: "discountAmount",
    label: `Discounted amount`,
    isSortable: true,
    alignment: "right",
  },
];
const voidedTableHeaders: NewTableHeader[] = [
  {
    key: "orderNo",
    label: `Order number`,
    isSortable: true,
    alignment: "left",
    prefix: "#",
  },
  {
    key: "orderType",
    label: `Order type`,
    isSortable: true,
    alignment: "left",
  },
  {
    key: "itemName",
    label: `Item name`,
    isSortable: true,
    alignment: "left",
  },
  {
    key: "steward",
    label: `Staff name`,
    isSortable: true,
    alignment: "left",
  },
  {
    key: "refundedQuantity",
    label: `Quantity`,
    isSortable: true,
    alignment: "right",
  },
  {
    key: "amount",
    label: `Refunded amount`,
    isSortable: true,
    alignment: "right",
  },
];

const leftGroup = ["Debit card", "Card", "Cash", "Aggregators"]
const rightGroup = ["Credit card", "Coupons", "Digital payments", "Others"]

//     title: "Total Sales",
//     value: "totalMagilSales",
//     percentage: "totalSalesPercentage",
//     isMonetary: true,
//     showMiniGraph: true
//   },
//   {
//     title: "Net Sales", 
//     value: "totalMagilNetSales",
//     percentage: "netSalesPercentage",
//     isMonetary: true,
//     showMiniGraph: true
//   },
//   {
//     title: "Total Tax",
//     value: "totalMagilTax", 
//     percentage: "totalTaxPercentage",
//     isMonetary: true,
//     showMiniGraph: (val: string | number) => val !== "0.00" && val !== 0
//   },
//   {
//     title: "Total Tips",
//     value: "totalMagilTips",
//     percentage: "totalTipsPercentage", 
//     isMonetary: true,
//     showMiniGraph: true
//   },
//   {
//     title: "Gratuity",
//     value: "gratuity",
//     percentage: "gratuityPercentage",
//     isMonetary: true,
//     showMiniGraph: true
//   },
//   {
//     title: "Transactions",
//     value: "totalMagilOrders",
//     percentage: "transactionPercentage",
//     isMonetary: false,
//     showMiniGraph: true
//   },
//   {
//     title: "Discount",
//     value: "discounts",
//     percentage: "discountPercentage",
//     isMonetary: true,
//     showMiniGraph: true
//   },
//   {
//     title: "Cancelled",
//     value: "cancelledOrders",
//     percentage: "cancelledPercentage",
//     isMonetary: true,
//     showMiniGraph: true
//   }
// ];

const SalesOverview: React.FC<ReportProps> = ({ }) => {
  const [loadingState, setLoadingState] = useState(true);
  const [viewType, setViewType] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState<number>(1);
  const [rows, setRows] = useState(10)
  const [offerType, setOfferType] = useState<string>("");
  const [voidedReason, setVoidedReason] = useState<string>("");
  const [otherOffer, setOtherOffer] = useState<string>("");
  const [otherVoided, setOtherVoided] = useState<string>("");

  const offerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  // const debounceValue = useDebounce(searchQuery, 1000);
  const { startDate, endDate, selectedDateFilterType, handleDateChange } = useDateFilter();

  const locations = useSelector((state: any) => state?.newReports?.storeLocationsList);
  const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation);
  const tendorTypes = useSelector((state: any) => state?.newReports?.paymentDetailsData);
  const tendorTypesLoader = useSelector((state: any) => state?.newReports?.paymentDetailsLoading);
  const tendorTypesError = useSelector((state: any) => state?.newReports?.paymentDetailsError);
  const salesSummary = useSelector((state: any) => state?.newReports?.salesSummarySuccess);
  const salesSummaryLoader = useSelector((state: any) => state?.newReports?.SalesSummaryLoading);
  const salesSummaryError = useSelector((state: any) => state?.newReports?.salesSummaryFailure);
  const staffSalesData = useSelector((state: any) => state?.newReports?.staffSalesData?.content);
  const staffSalesLoading = useSelector((state: any) => state?.newReports?.employeeStaffPerformanceLoading);
  const staffSalesError = useSelector((state: any) => state?.newReports?.employeeStaffPerformanceFailure);
  const salesCardTypeData = useSelector((state: any) => state?.newReports?.salesCardTypeData?.content);
  const salesCardTypeDataLoading = useSelector((state: any) => state?.newReports?.salesCardTypeLoading);
  const salesCardTypeError = useSelector((state: any) => state?.newReports?.salesCardTypeFailure);
  // const salesCategory = useSelector((state: any) => state?.newReports?.salesByItemCategorySuccess);
  // const salesCategoryLoading = useSelector((state: any) => state?.newReports?.salesByItemCategoryLoading);
  // const salesCategoryError = useSelector((state: any) => state?.newReports?.salesByItemCategoryFailure);
  const discountSummary = useSelector((state: any) => state?.newReports?.discountSummarySuccess?.content);
  const discountSummaryTotalElements = useSelector((state: any) => state?.newReports?.discountSummarySuccess?.totalElements);
  const discountSummaryLoading = useSelector((state: any) => state?.newReports?.discountSummaryLoading);
  const discountSummaryError = useSelector((state: any) => state?.newReports?.discountSummaryFailure);
  const discountSummaryTotalPages = useSelector((state: any) => state?.newReports?.discountSummarySuccess?.totalPages);
  const cancellationSummary = useSelector((state: any) => state?.newReports?.cancellationSummarySuccess?.content);
  const cancellationSummaryTotalElements = useSelector((state: any) => state?.newReports?.cancellationSummarySuccess?.totalElements);
  const cancellationSummaryLoading = useSelector((state: any) => state?.newReports?.cancellationSummaryLoading);
  const cancellationSummaryError = useSelector((state: any) => state?.newReports?.cancellationSummaryFailure);
  const cancellationSummaryTotalPages = useSelector((state: any) => state?.newReports?.cancellationSummarySuccess?.totalPages);
  const salesByChannel = useSelector((state: any) => state?.newReports?.salesByChannelData?.content);
  const salesByChannelLoading = useSelector((state: any) => state?.newReports?.salesByChannelLoading);
  const salesByChannelError = useSelector((state: any) => state?.newReports?.salesByChannelFailure);
  const salesByRevenueClass = useSelector((state: any) => state?.newReports?.salesByRevenueClassSuccess?.content);
  const salesByRevenueClassLoading = useSelector((state: any) => state?.newReports?.salesByRevenueClassLoading);
  const salesByRevenueClassError = useSelector((state: any) => state?.newReports?.salesByRevenueClassFailure);
  const offerSummary = useSelector((state: any) => state?.newReports?.offerSummaryData?.content);
  const offerSummaryLoading = useSelector((state: any) => state?.newReports?.offerSummaryLoading);
  const offerSummaryError = useSelector((state: any) => state?.newReports?.offerSummaryFailure);
  const voidedOrderSummary = useSelector((state: any) => state?.newReports?.voidedOrderSummaryData?.content);
  const voidedOrderSummaryLoader = useSelector((state: any) => state?.newReports?.voidedOrderSummaryLoading);
  const voidedOrderSummaryError = useSelector((state: any) => state?.newReports?.voidedOrderSummaryFailure);
  const countryCode = useSelector((state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country);
  const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode, true)), [countryCode]);

  // useEffect(()=>{
  // console.log({
  //   tendorTypes,
  //   salesSummary,
  //   staffSalesData,
  //   salesCardTypeData,
  //   discountSummary,
  //   cancellationSummary,
  //   salesByChannel,
  //   salesByRevenueClass,
  //   offerSummary,
  //   voidedOrderSummary
  // })
  // },[tendorTypes,salesSummary,staffSalesData,
  //   salesCardTypeData,
  //   discountSummary,
  //   cancellationSummary,
  //   salesByChannel,
  //   salesByRevenueClass,
  //   offerSummary,
  //   voidedOrderSummary
  // ])
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
    tendorTypes?.forEach((item: any) => {
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
  }, [tendorTypes]);
  
  useEffect(() => {
    Promise.all([
      dispatch(salesSummaryRequest({
        locationid: selectedLocation?.value,
        startDate: startDate,
        endDate: endDate,
      })),
      dispatch(
        paymentDetailsRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesSummaryReportRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        staffSalesRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesCardTypeRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesCategoryRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesByChannelRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesByRevenueClassRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
        })
      ),

      dispatch(
        offerSummaryRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        voidedOrderSummaryRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
        })
      ),
    ]);
    setLoadingState(false);
  }, [selectedLocation, startDate, endDate]);


  useEffect(() => {
    if (viewType === "discountOffer") {
      const params: any = {
        locationid: selectedLocation?.value,
        startDate: startDate,
        endDate: endDate,
        tablePageNo: page,
        tableRecordLimit: rows,
        search: searchQuery,
        offer: offerType
      }
      dispatch(
        discountSummaryRequest(params)
      );
    }
  }, [selectedLocation, startDate, endDate, page, rows, offerType, searchQuery])

  useEffect(() => {
    if (viewType === "voidedOffer") {

      const params: any = {
        locationid: selectedLocation?.value,
        startDate: startDate,
        endDate: endDate,
        tablePageNo: page,
        tableRecordLimit: rows,
        search: searchQuery,
        reason: voidedReason
      }
      dispatch(
        cancellationSummaryRequest(params)
      );
    }

  }, [selectedLocation, startDate, endDate, page, rows, voidedReason, searchQuery])



  const handleGoBackToChart = () => {
    setViewType("default");
    setTimeout(() => {
      offerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 0)
  };

  const handleSearch = (value: string, kpiTitle: string) => {

    setPage(1)
    setSearchQuery(value)
  };

  const handleSummaryView = (view: string, data: any) => {
    resetPagination()
    let params: any = {
      locationid: selectedLocation?.value,
      startDate: startDate,
      endDate: endDate,
      tablePageNo: page,
      tableRecordLimit: rows,
    }
    setViewType(view);
    if (view == "discountOffer") {
      setOfferType(data?.label);
      let label = data?.label
      if (data?.label === "Other") {
        label = otherOffer
      }
      setOtherOffer(label)
      params.offer = label
      dispatch(discountSummaryRequest(params))
    }
    if (view === "voidedOffer") {
      let label = data?.label
      if (data?.label === "Other") {
        label = otherVoided
      }
      setVoidedReason(label)
      params.reason = label
      dispatch(cancellationSummaryRequest(params))
    }
  };

  const salesOverViewBoxForDownloading = [salesSummary]

  const salesSummaryHeaderDataForDownloadUS = [
    { "key": "totalGrossSalesIncludingThirdparty", "label": "Total Sales" },
    { "key": "totalNetSalesIncludingThirdparty", "label": "Net Sales" },
    { "key": "totalTaxIncludingThirdparty", "label": "Total Tax" },
    { "key": "totalMagilTips", "label": "Total Tips" },
    { "key": "gratuity", "label": "Gratuity" },
    { "key": "totalOrdersIncludingThirdparty", "label": "Transactions" },
    { "key": "discounts", "label": "Discounts" },
    { "key": "cancelledOrders", "label": "Cancelled Orders" },
  ]
  const salesOverViewBoxForDownloadingUS = salesOverViewBoxForDownloading?.map((dataToBeMapped: any) => ({
    totalGrossSalesIncludingThirdparty: formatNumberByCountry(dataToBeMapped?.totalGrossSalesIncludingThirdparty, countryCode, true),
    totalNetSalesIncludingThirdparty: formatNumberByCountry(dataToBeMapped?.totalNetSalesIncludingThirdparty, countryCode, true),
    totalTaxIncludingThirdparty: formatNumberByCountry(dataToBeMapped?.totalTaxIncludingThirdparty, countryCode, true),
    totalMagilTips: formatNumberByCountry(dataToBeMapped?.totalMagilTips, countryCode, true),
    gratuity: formatNumberByCountry(dataToBeMapped?.gratuity, countryCode, true),
    totalOrdersIncludingThirdparty: formatNumberByCountry(dataToBeMapped?.totalOrdersIncludingThirdparty, countryCode, false),
    discounts: formatNumberByCountry(dataToBeMapped?.discounts, countryCode, true),
    cancelledOrders: formatNumberByCountry(dataToBeMapped?.cancelledOrders, countryCode, true),
  }))

  const salesSummaryHeaderDataForDownloadIND = [
    { "key": "totalGrossSalesIncludingThirdparty", "label": "Total Sales" },
    { "key": "totalNetSalesIncludingThirdparty", "label": "Net Sales" },
    { "key": "totalTaxIncludingThirdparty", "label": "Total Tax" },
    { "key": "totalMagilTips", "label": "Total Tips" },
    { "key": "gratuity", "label": "Service Charge" },
    { "key": "totalOrdersIncludingThirdparty", "label": "Transactions" },
    { "key": "discounts", "label": "Discounts" },
    { "key": "cancelledOrders", "label": "Cancelled Orders" },
  ]
  const salesOverViewBoxForDownloadingIND = salesOverViewBoxForDownloading?.map((dataToBeMapped: any) => ({
    totalGrossSalesIncludingThirdparty: formatNumberByCountry(dataToBeMapped?.totalGrossSalesIncludingThirdparty, countryCode, true),
    totalNetSalesIncludingThirdparty: formatNumberByCountry(dataToBeMapped?.totalNetSalesIncludingThirdparty, countryCode, true),
    totalTaxIncludingThirdparty: formatNumberByCountry(dataToBeMapped?.totalTaxIncludingThirdparty, countryCode, true),
    totalMagilTips: formatNumberByCountry(dataToBeMapped?.totalMagilTips, countryCode, true),
    serviceCharge: formatNumberByCountry(dataToBeMapped?.gratuity, countryCode, true),
    totalOrdersIncludingThirdparty: formatNumberByCountry(dataToBeMapped?.totalOrdersIncludingThirdparty, countryCode, false),
    discounts: formatNumberByCountry(dataToBeMapped?.discounts, countryCode, true),
    cancelledOrders: formatNumberByCountry(dataToBeMapped?.cancelledOrders, countryCode, true),
  }))

  const salesSummaryHeaderForDownloading = salesSummary && Object.keys(salesSummary)?.map((key) => ({
    key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()
  }));

  const salesCardTypeDataForDownloading = salesCardTypeData && salesCardTypeData?.map((dataToBeMapped: any) => ({
    cardName: dataToBeMapped?.cardName,
    cardType: dataToBeMapped?.cardType,
    totalSales: dataToBeMapped?.totalSales,
  }))
  const salesCardTypeHeaderForDownloading = salesCardTypeData && salesCardTypeData?.length > 0 && Object.keys(salesCardTypeData[0])?.map((key) => ({
    key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()
  }))

  const staffSalesDataForDownloading = staffSalesData && staffSalesData?.map((dataToBeMapped: any) => ({
    fullName: dataToBeMapped?.fullName,
    totalOrders: dataToBeMapped?.orders,
    totalSales: dataToBeMapped?.total,
  })) || [];

  const staffSalesHeaderForDownloading =
    staffSalesDataForDownloading.length > 0
      ? Object.keys(staffSalesDataForDownloading[0]).map((key) => ({
        key,
        label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim(),
      }))
      : []; // Return an empty array if no data

  const salesByRevenueClassForDownloading = salesByRevenueClass && salesByRevenueClass?.map((dataToBeMapped: any) => ({
    revenueClass: dataToBeMapped?.revenueClass,
    itemsSold: dataToBeMapped?.itemsSold,
    totalSales: dataToBeMapped?.totalSales,
  }))

  const salesByRevenueClassHeaderForDownloading = salesByRevenueClass && salesByRevenueClass?.length > 0 && Object.keys(salesByRevenueClass[0])?.map((key) => ({
    key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()
  }))

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

  const offerSummaryDataForDownloading = offerSummary && offerSummary?.map((dataToBeMapped: any) => ({
    Label: dataToBeMapped?.offerName,
    Count: dataToBeMapped?.totalOrders,
    Items: dataToBeMapped?.totalDiscount,
    Amount: dataToBeMapped?.totalSales
  }))

  const offerSummaryDataHeaderForDownloading = offerSummaryDataForDownloading?.length > 0 && Object.keys(offerSummaryDataForDownloading[0])?.map((key) => ({
    key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()
  }))

  const voidedOrderSummaryDataForDownloading = voidedOrderSummary && voidedOrderSummary?.map((dataToBeMapped: any) => ({
    Label: dataToBeMapped?.voidedReasons,
    Orders: dataToBeMapped?.orderCount,
    Amount: dataToBeMapped?.voidedAmount
  }))


  const voidedOrderSummaryDataHeaderForDownloading = voidedOrderSummaryDataForDownloading?.length > 0 && Object.keys(voidedOrderSummaryDataForDownloading[0])?.map((key) => ({
    key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()
  }))

  const resetPagination = () => {
    setPage(1)
    setRows(10)
    setSearchQuery("")
  }

  const handleOther = (type: string, other: string) => {
    resetPagination()
    if (type === "discountOffer") {
      setOtherOffer(other)
    }
    if (type === "voidedOffer") {
      setOtherVoided(other)
    }

  }

  return (
    <div className="sales-overview">
      {viewType === "default" ? (
        <>
          <StoreFilter
            startDate={startDate}
            endDate={endDate}
            storeOptions={locations}
            selectedDate={selectedDateFilterType}
            selectedStore={selectedLocation}
            setSelectedDate={ handleDateChange}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
          />
          {(salesSummary?.status === "204" && selectedDateFilterType?.value === "Today") ?
            (
              <div>
                <ReportNotFound errorType={"salesNotFound"} />
              </div>
            ) : (salesSummary?.status === "204" && selectedDateFilterType?.value === "Yesterday") ? (
              <div><ReportNotFound errorType={"yestedaySalesNotFound"} /></div>
            )
              :
              (
                <div>
                  <div className="todays-report-sales-overview-box-container-parent">
                    <div className="total-sales-heading-container">
                      <div className="total-sales-overview-header-with-download">
                        <h2>Total sales Overview</h2>
                        <div className="total-sales-info-container">
                          <InfoIcon />
                          <div className="total-sales-info-content">
                            The graph shows percentage comparison based on the previous day or week, depending on your selection.
                          </div>
                        </div>
                      </div>
                      {(!salesSummaryLoader && salesOverViewBoxForDownloading && salesSummaryHeaderForDownloading) && <DownloadReport kpiTitle="Total sales Overview" tableData={countryCode === "US" ? salesOverViewBoxForDownloadingUS : salesOverViewBoxForDownloadingIND} headerData={countryCode === "US" ? salesSummaryHeaderDataForDownloadUS : salesSummaryHeaderDataForDownloadIND} />}
                    </div>

                    <ErrorHandler data={salesSummary} isError={salesSummaryError} errorType="reportNotFound" isLoading={loadingState || salesSummaryLoader}>
                      <div className="todays-report-sales-overview-box-container">
                        {countryCode === "US" ?
                          (cardConfigForSalesTabOverView?.map((card: any, index: number) => (
                            <CardWithMiniGraph
                              key={index}
                              cardTitle={card.title}
                              cardValue={formatNumberByCountry(
                                salesSummary?.[card.value],
                                countryCode,
                                card.isMonetary
                              )}
                              incrementDecrementValue={salesSummary?.[card.percentage]}
                              isMonetary={card.isMonetary}
                              loader={salesSummaryLoader}
                              showMiniGraph={
                                typeof card.showMiniGraph === 'function'
                                  ? card.showMiniGraph(salesSummary?.[card.percentage])
                                  : card.showMiniGraph
                              }
                              incrementOrDecrement={transformSalesData(
                                salesSummary?.[card.percentage]
                              )}
                              graphType="arrow"
                              isPercent={true}
                            />
                          ))
                          ) : (
                            cardConfigForSalesTabOverViewWithoutGratuity?.map((card: any, index: number) => (
                              <CardWithMiniGraph
                                key={index}
                                cardTitle={card.title}
                                cardValue={formatNumberByCountry(
                                  salesSummary?.[card.value],
                                  countryCode,
                                  card.isMonetary
                                )}
                                incrementDecrementValue={salesSummary?.[card.percentage]}
                                isMonetary={card.isMonetary}
                                loader={salesSummaryLoader}
                                showMiniGraph={
                                  typeof card.showMiniGraph === 'function'
                                    ? card.showMiniGraph(salesSummary?.[card.percentage])
                                    : card.showMiniGraph
                                }
                                incrementOrDecrement={transformSalesData(
                                  salesSummary?.[card.percentage]
                                )}
                                graphType="arrow"
                                isPercent={true}
                              />
                            )))
                        }
                      </div>
                    </ErrorHandler>
                  </div>
                  <div className="tender-type-head-container">
                    <h2 className="sales-overview-sub-heading ">Tender Type</h2>
                    {(!tendorTypesLoader && tenderTypeflatMappedData && tenderTypeHeaderForDownloading) && <DownloadReport kpiTitle="Tender Type" tableData={tenderTypeflatMappedData} headerData={tenderTypeHeaderForDownloading} />}
                  </div>
                  <ErrorHandler data={tendorTypes} isError={tendorTypesError}>
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
                                        loader={tendorTypesLoader}
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
                                        loader={tendorTypesLoader}
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

                  {/* TODO: uncomment once BE deploys this change */}
                  {/* <div className="sales-charts-parent-container">
              <div className="sales-chart-download-container">
                <h2 className="sales-overview-sub-heading ">Card Type</h2>
                {(!salesCardTypeDataLoading && salesCardTypeDataForDownloading && salesCardTypeHeaderForDownloading) && <DownloadReport kpiTitle="Card Type" tableData={salesCardTypeDataForDownloading} headerData={salesCardTypeHeaderForDownloading}/>}
              </div>
              <ErrorHandler data={salesCardTypeData} isError={salesCardTypeError}>
                <CardTypeChart
                  dataList={salesCardTypeData}
                  loader={salesCardTypeDataLoading}
                />
              </ErrorHandler>
            </div> */}

                  <div className="sales-charts-parent-container">
                    <div className="sales-chart-download-container">
                      <h2 className="sales-overview-sub-heading ">By Employees</h2>
                      {(!staffSalesLoading && staffSalesDataForDownloading && staffSalesHeaderForDownloading) && <DownloadReport kpiTitle="By Employees" tableData={staffSalesDataForDownloading} headerData={staffSalesHeaderForDownloading} />}
                    </div>
                    <ErrorHandler data={staffSalesData} isError={staffSalesError} >
                      <EmployeeSalesChart
                        dataList={staffSalesData}
                        loader={staffSalesLoading}
                      />
                    </ErrorHandler>
                  </div>

                  <div className="sales-charts-parent-container">
                    <div className="sales-chart-download-container">
                      <h2 className="sales-overview-sub-heading ">By Channel</h2>
                      {(!salesByChannelLoading && salesByChannel) && <DownloadReport kpiTitle="By Channel" tableData={salesByChannel} headerData={[{ "key": "channelName", "label": "Channel Name", }, { "key": "orders", "label": "Orders", }, { "key": "sales", "label": "Sales", }]} />}
                    </div>
                    <ErrorHandler data={salesByChannel} isError={salesByChannelError}>
                      <ChannelSalesChart
                        dataList={salesByChannel}
                        loader={salesByChannelLoading}
                      />
                    </ErrorHandler>
                  </div>

                  <div className="sales-overview-doughnut-chart-container" style={{ display: "flex", justifyContent: "flex-start", marginTop: "10vh", width: "100%" }} ref={offerRef}>
                    {/* commented out for release */}
                    {/* <div className="doughnut-chart-with-button">
                      <div className="doughnut-head-with-download-container">
                        <h2 className="sales-overview-sub-heading ">By Discount</h2>
                        {(!offerSummaryLoading && offerSummaryDataForDownloading && offerSummaryDataHeaderForDownloading) && <DownloadReport kpiTitle="By Discount" tableData={offerSummaryDataForDownloading} headerData={offerSummaryDataHeaderForDownloading} />}
                      </div>
                      <ErrorHandler data={offerSummary} isError={offerSummaryError}>
                        <DoughnutChart
                          labelKeys={[{ key: "Count", value: "totalOrders" }, { key: "Sales", value: "totalDiscount", isAmount: true }]}
                          xKey="offerName"
                          yKey="totalDiscount"
                          isAmount={true}
                          otherKeys={["totalOrders", "totalDiscount"]}
                          dataList={offerSummary}
                          countryCode={countryCode}
                          handleOther={(other: string) => handleOther("discountOffer", other)}
                          handleClick={(data: any) =>
                            handleSummaryView("discountOffer", data)
                          }
                          loader={offerSummaryLoading}
                        />
                      </ErrorHandler>
                    </div> */}
                    <div className="doughnut-chart-with-button" >
                      <div className="doughnut-head-with-download-container">
                        <h2 className="sales-overview-sub-heading ">Refunded orders</h2>
                        {(!voidedOrderSummaryLoader && voidedOrderSummaryDataForDownloading && voidedOrderSummaryDataHeaderForDownloading) && <DownloadReport kpiTitle="Voided orders" tableData={voidedOrderSummaryDataForDownloading} headerData={voidedOrderSummaryDataHeaderForDownloading} />}
                      </div>
                      <ErrorHandler data={voidedOrderSummary} isError={voidedOrderSummaryError} >
                        <DoughnutChart
                          xKey="voidedReasons"
                          yKey="voidedAmount"
                          labelKeys={[{ key: "Count", value: "orderCount" }, { key: "Refund", value: "voidedAmount", isAmount: true }]}
                          isAmount={true}
                          dataList={voidedOrderSummary}
                          otherKeys={["voidedAmount", "orderCount"]} //All keys except xkey
                          countryCode={countryCode}
                          handleOther={(other: string) => handleOther("voidedOffer", other)}
                          handleClick={(data: any) =>
                            handleSummaryView("voidedOffer", data)
                          }
                          loader={voidedOrderSummaryLoader}
                        />
                      </ErrorHandler>
                    </div>
                  </div>
                  <div className="sales-charts-parent-container">
                    <div className="sales-chart-download-container">
                      <h2 className="sales-overview-sub-heading ">By Revenue class</h2>
                      {(!salesByRevenueClassLoading && salesByRevenueClassForDownloading && salesByRevenueClassHeaderForDownloading) && <DownloadReport kpiTitle="By Revenue class" tableData={salesByRevenueClassForDownloading} headerData={salesByRevenueClassHeaderForDownloading} />}
                    </div>
                    <ErrorHandler data={salesByRevenueClass} isError={salesByRevenueClassError} >
                      <RevenueClassChart
                        dataList={salesByRevenueClass}
                        loader={salesByRevenueClassLoading}
                      />
                    </ErrorHandler>
                  </div>
                </div>
              )
          }
        </>
      ) : viewType === "discountOffer" ? (
        <>
          <div className="void-activity-table-container" >
            <div className="void-activity-button-container">
              <button
                className="back-to-chart-btn"
                onClick={handleGoBackToChart}
              >
                <ArrowLeft />
                Back
              </button>
            </div>
            {/* <ErrorHandler data={discountSummary} isError={discountSummaryError} */}
            <NewTable
              kpiTitle={`By discount - ${offerType}`}
              apiEndPoint="/sales/discountSummary"
              queryParams={{ locationId: selectedLocation?.value, startDate: startDate, endDate: endDate, offer: offerType }}
              searchQuery={searchQuery}
              headerData={discountTableHeaders}
              tableData={
                discountSummary &&
                discountSummary?.length > 0 &&
                discountSummary
              }
              currentPage={page}
              totalPages={discountSummaryTotalPages}
              onPageChange={setPage}
              rowsPerPage={rows}
              setRowsPerPage={setRows}
              loader={discountSummaryLoading}
              searchPlaceHolder="Search By Staff name"
              onSearch={handleSearch}
              totalElements={discountSummaryTotalElements || 0}
            // rowNoWrap={true}
            showRoundedStyleCount={true}
            />
            {/* </ErrorHandler> */}
          </div>
        </>
      ) : (
        <div className="void-activity-table-container" >
          <div className="void-activity-button-container">
            <button className="back-to-chart-btn" onClick={handleGoBackToChart}>
              <ArrowLeft />
              Back
            </button>
          </div>
          {/* <ErrorHandler data={cancellationSummary} isError={cancellationSummaryError}  */}
          <NewTable
            apiEndPoint="/sales/cancelSummary"
            queryParams={{ locationId: selectedLocation?.value, startDate: startDate, endDate: endDate, reason: voidedReason }}

            kpiTitle={`Refunded orders - ${voidedReason}`}
            searchQuery={searchQuery}
            headerData={voidedTableHeaders}
            tableData={
              cancellationSummary &&
              cancellationSummary?.length > 0 &&
              cancellationSummary
            }
            currentPage={page}
            totalPages={cancellationSummaryTotalPages}
            onPageChange={setPage}
            rowsPerPage={rows}
            setRowsPerPage={setRows}
            loader={cancellationSummaryLoading}
            searchPlaceHolder="Search By order number, staff name"
            onSearch={handleSearch}
            totalElements={cancellationSummaryTotalElements || 0}
            showRoundedStyleCount={true}
          />
          {/* </ErrorHandler> */}
        </div>
      )}
    </div>
  );
};

export default SalesOverview;
