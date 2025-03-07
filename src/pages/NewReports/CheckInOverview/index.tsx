import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancellationSummaryRequest,
  changeDateFilterType,
  changeLocation,
  discountSummaryRequest,
  offerSummaryRequest,
  paymentDetailsRequest,
  salesByChannelRequest,
  salesByRevenueClassRequest,
  salesCardTypeRequest,
  salesCategoryRequest,
  salesSummaryReportRequest,
  staffSalesRequest,
  voidedOrderSummaryRequest,
} from "redux/newReports/newReportsActions";
import { ReactComponent as PayTapIcon } from "../../../assets/svg/pay_tap.svg";
import { ReactComponent as KeyedInIcon } from "../../../assets/svg/pay-card.svg";
import { ReactComponent as CashIcon } from "../../../assets/svg/pay-cash.svg";
import { ReactComponent as CouponsIcon } from "../../../assets/svg/pay-coupon.svg";
import { ReactComponent as GiftCardIcon } from "../../../assets/svg/pay-gift-card.svg";
import { ReactComponent as UberEatsIcon } from "../../../assets/svg/pay-uber-eats.svg";
import { ReactComponent as GooglePayIcon } from "../../../assets/svg/pay-gpay.svg";
import { ReactComponent as GrubHubIcon } from "../../../assets/svg/pay-grub-hub.svg";
import { ReactComponent as ApplePayIcon } from "../../../assets/svg/pay-apple.svg";
import { ReactComponent as DoordashIcon } from "../../../assets/svg/pay-doordash.svg";
import { ReactComponent as OfflineQRIcon } from "../../../assets/svg/pay-tap.svg";
import { ReactComponent as InfoIcon } from "../../../assets/svg/info_grey.svg";
import { NewTableHeader } from "interface/newReportsInterface";
import { formatNumberByCountry, transformSalesData } from "utils";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
import EmployeeSalesChart from "components/reportComponents/chart/chartEmployees";
import ChannelSalesChart from "components/reportComponents/chart/channelChart";
import RevenueClassChart from "components/reportComponents/chart/RevenueClassChart";
import StoreFilter from "components/reportComponents/StoreFilter";
import DoughnutChartWithButton from "components/reportComponents/Charts/DoughnutChartButton";
import NewTable from "components/reportComponents/NewTable";
import DoughnutChartWithButtonVoided from "components/reportComponents/Charts/DoughnutChartButtonVoided";
import useDateFilter from "hooks/useDateFilter";
import "../SalesOverview/SalesOverview.scss";
import HourlyCheckinChart from "./hourlyChart";
import DailyCheckinsChart from "./DailyCheckinsChart";
import DineInDurationChart from "./DineInDurationChart";
import GuestSizeChart from "./GuestSizeChart";


interface ReportProps { }

const knownTendorIcons: any = {
  "Swipe/Tap/Dip": <PayTapIcon />,
  "Online/Key-In": <PayTapIcon />,
  "Keyed In": <KeyedInIcon />,
  Cash: <CashIcon />,
  "CASH": <CashIcon />,
  UberEats: <UberEatsIcon />,
  Grubhub: <GrubHubIcon />,
  Doordash: <DoordashIcon />,
  Coupons: <CouponsIcon />,
  "Gift Card": <GiftCardIcon />,
  "Google Pay": <GooglePayIcon />,
  "Apple Pay": <ApplePayIcon />,
  "Offline QR": <OfflineQRIcon />,
  "OFFLINE_QR": <OfflineQRIcon />,
};

const headerData: NewTableHeader[] = [
    {
      key: "customerName",
      label: "Customer name",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "phone",
      label: "Phone",
      alignment: "left",
      isSortable: false,
    },
    {
      key: "visits",
      label: "Visits",
      alignment: "center",
      isSortable: true,
    },
  ];
  
const todayTableData: any[] = [
  {
    customerName: "Albert Flores",
    phone: "(308) 555-0121",
    visits: 12,
  },
  {
    customerName: "Devon Lane",
    phone: "(316) 555-0116",
    visits: 4,
  },
  {
    customerName: "Esther Howard",
    phone: "+91 9876543210",
    visits: 13,
  },
  {
    customerName: "Robert Fox",
    phone: "(405) 555-0128",
    visits: 8,
  },
  {
    customerName: "Robert Fox",
    phone: "(405) 555-0128",
    visits: 3,
  },
  {
    customerName: "Esther Howard",
    phone: "+91 9876543210",
    visits: 11,
  },
  {
    customerName: "Devon Lane",
    phone: "(316) 555-0116",
    visits: 16,
  },
  {
    customerName: "Robert Fox",
    phone: "+91 9876543210",
    visits: 6,
  },
  {
    customerName: "Devon Lane",
    phone: "(316) 555-0116",
    visits: 4,
  },
  {
    customerName: "Robert Fox",
    phone: "(405) 555-0128",
    visits: 5,
  },
];



const headerData1 = [
  {
    key: "checkinId",
    label: "Check-in",
    alignment: "left",
    isSortable: false,
  },
  {
    key: "guestName",
    label: "Guest name",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "phone",
    label: "Phone",
    alignment: "left",
    isSortable: false,
  },
  {
    key: "channel",
    label: "Channel",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "tableNo",
    label: "Table",
    alignment: "center",
    isSortable: false,
  },
  {
    key: "checkinTime",
    label: "Check-in time",
    alignment: "center",
    isSortable: true,
  },
  {
    key: "assignedTime",
    label: "Assigned time",
    alignment: "center",
    isSortable: false,
  },
  {
    key: "status",
    label: "Status",
    alignment: "center",
    isSortable: true,
  },
  {
    key: "waitTime",
    label: "Wait time",
    alignment: "center",
    isSortable: false,
  },
  {
    key: "guestSize",
    label: "Guest size",
    alignment: "center",
    isSortable: true,
  },
];


const todayTableData1 = [
  {
    checkinId: "#5852",
    guestName: "Esther Howard",
    phone: "(308) 555-0121",
    channel: "Online",
    tableNo: "A44",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Late show",
    waitTime: "13 Mins",
    guestSize: 13,
  },
  {
    checkinId: "#5852",
    guestName: "Robert Fox",
    phone: "(308) 555-0121",
    channel: "Kiosk",
    tableNo: "A45",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Completed",
    waitTime: "13 Mins",
    guestSize: 8,
  },
  {
    checkinId: "#5852",
    guestName: "Devon Lane",
    phone: "(308) 555-0121",
    channel: "Merchant",
    tableNo: "D23",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Completed",
    waitTime: "13 Mins",
    guestSize: 16,
  },
  {
    checkinId: "#5852",
    guestName: "Devon Lane",
    phone: "(308) 555-0121",
    channel: "Kiosk",
    tableNo: "D02",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Cancelled",
    waitTime: "13 Mins",
    guestSize: 4,
  },
];



const CheckInOverview: React.FC<ReportProps> = ({ }) => {
  const [viewType, setViewType] = useState("default");
  const [liveCheckInSearchQuery, setLiveCheckInSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPageOfferDiscount, setCurrentPageOfferDiscount] = useState<number>(1);
  const [currentRowsOfferDiscount, setCurrentRowsOfferDiscount] = useState<number>(10);
  const [currentPageVoiddedOrders, setCurrentPageVoiddedOrders] = useState<number>(1);
  const [currentRowsVoiddedOrders, setCurrentRowsVoiddedOrders] = useState<number>(10);
  const [offerType, setOfferType] = useState<string>("");
  const [voidedReason, setVoidedReason] = useState<string>("");
  const [otherOffer, setOtherOffer] = useState<string>("");
  const [otherVoided, setOtherVoided] = useState<string>("");

  const offerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { startDate, endDate, selectedDateFilterType, handleDateChange } = useDateFilter();

  const locations = useSelector((state: any) => state?.newReports?.storeLocationsList);
  const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation);
  const tendorTypes = useSelector((state: any) => state?.newReports?.paymentDetailsData);
  const tendorTypesLoader = useSelector((state: any) => state?.newReports?.paymentDetailsLoading);
  const salesSummary = useSelector((state: any) => state?.newReports?.salesSummaryReportData);
  const salesSummaryLoader = useSelector((state: any) => state?.newReports?.salesSummaryReportLoading);
  const staffSalesData = useSelector((state: any) => state?.newReports?.staffSalesData?.content);
  const staffSalesLoading = useSelector((state: any) => state?.newReports?.staffSalesLoading);
  const salesCardTypeData = useSelector((state: any) => state?.newReports?.salesCardTypeData?.content);
  const salesCardTypeDataLoading = useSelector((state: any) => state?.newReports?.salesCardTypeLoading);
  const salesCategory = useSelector((state: any) => state?.newReports?.salesByItemCategorySuccess);
  const discountSummary = useSelector((state: any) => state?.newReports?.discountSummarySuccess?.content);
  const discountSummaryLoading = useSelector((state: any) => state?.newReports?.discountSummaryLoading);
  const discountSummaryTotalPages = useSelector((state: any) => state?.newReports?.discountSummarySuccess?.totalPages);
  const cancellationSummary = useSelector((state: any) => state?.newReports?.cancellationSummarySuccess?.content);
  const cancellationSummaryLoading = useSelector((state: any) => state?.newReports?.cancellationSummaryLoading);
  const cancellationSummaryTotalPages = useSelector((state: any) => state?.newReports?.cancellationSummarySuccess?.totalPages);
  const salesByChannel = useSelector((state: any) => state?.newReports?.salesByChannelData?.content);
  const salesByChannelLoading = useSelector((state: any) => state?.newReports?.salesByChannelLoading);
  const salesByRevenueClass = useSelector((state: any) => state?.newReports?.salesByRevenueClassSuccess?.content);
  const salesByRevenueClassLoading = useSelector((state: any) => state?.newReports?.salesByRevenueClassLoading);
  const offerSummary = useSelector((state: any) => state?.newReports?.offerSummaryData?.content);
  const offerSummaryLoading = useSelector((state: any) => state?.newReports?.offerSummaryLoading);
  const voidedOrderSummary = useSelector((state: any) => state?.newReports?.voidedOrderSummaryData?.content);
  const voidedOrderSummaryLoader = useSelector((state: any) => state?.newReports?.voidedOrderSummaryLoading);
  const countryCode = useSelector((state: any) => state?.auth?.restaurantDetails?.country);

 
  

  const groupedData: any = useMemo(() => {
    const tendorGroups: any = {
      "Debit card": [],
      "Credit card": [],
      Cash: [],
      Aggregator: [],
      Coupon: [],
      "Digital payment": [],
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
        totalSales: Number(item?.totalSales || 0),
        totalOrders: Number(item?.totalOrders || 0),
        salesPercentage: 0,
        cardName: item?.cardName,
        cardType: item?.cardType,
        isExpandable: false,
      };
      if (item?.cardType && key) {
        key.isExpandable = true;
        if (item?.premises === "ONPREM") {
          key.onPremiseSales += Number(item?.totalSales || 0);
          key.onPremiseOrders += Number(item?.totalOrders || 0);
        } else if (item?.premises === "OFFPREM") {
          key.offPremiseSales += Number(item?.totalSales || 0);
          key.offPremiseOrders += Number(item?.totalOrders || 0);
        }
        key.totalSales = Number(item?.wholeTotalSales || 0);
        key.totalOrders = Number(item?.wholeTotalOrders || 0);
        key.salesPercentage += Number(item?.salesPercentage || 0);
      } else {
        key.salesPercentage = Number(item?.salesPercentage || 0);
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
        }
      } else if (["Keyed In", "Online/Key-In"]?.includes(key)) {
        if (cardType === "CREDIT") {
          tendorGroups["Credit card"].push(value);
        } else if (cardType === "DEBIT") {
          tendorGroups["Debit card"].push(value);
        }
      } else if (["CASH"]?.includes(key)) {
        tendorGroups["Cash"].push(value);
      } else if (["Doordash", "Swiggy", "Grubhub", "Zomato"]?.includes(key)) {
        tendorGroups["Aggregator"].push(value);
      } else if (["Coupon"]?.includes(key)) {
        tendorGroups["Coupon"].push(value);
      } else if (["Digital payment", "OFFLINE_QR"]?.includes(key)) {
        tendorGroups["Digital payment"].push(value);
      } else {
        tendorGroups["Others"].push(value);
      }
    });


    return tendorGroups;
  }, [tendorTypes]);
  console.log({startDate, endDate})

  useEffect(() => {
    Promise.all([
      dispatch(
        paymentDetailsRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesSummaryReportRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        staffSalesRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesCardTypeRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesCategoryRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesByChannelRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesByRevenueClassRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),

      dispatch(
        offerSummaryRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        voidedOrderSummaryRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
    ]);
  }, [selectedLocation, startDate, endDate]);

  useEffect(() => {
      dispatch(
        cancellationSummaryRequest({
          locationid: selectedLocation?.value,

          tableRecordLimit: currentRowsVoiddedOrders,
          tablePageNo: currentPageVoiddedOrders,
          startDate: startDate,
          endDate: endDate,
          search: searchQuery,
          reason: voidedReason,
        })
      );
  }, [
    voidedReason,
    startDate,
    endDate,
    currentRowsVoiddedOrders,
    currentPageVoiddedOrders,
    searchQuery,
  ]);

  useEffect(() => {
      dispatch(
        discountSummaryRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: currentRowsOfferDiscount,
          tablePageNo: currentPageOfferDiscount,
          startDate: startDate,
          endDate: endDate,
          search: searchQuery,
          offer: offerType,
        })
      );
  
  }, [
    offerType, startDate, endDate, currentRowsOfferDiscount, currentPageOfferDiscount, searchQuery,
  ]);

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
    let params:any={
      locationid: selectedLocation?.value,
      startDate: startDate,
      endDate: endDate,
      tablePageNo: currentPageOfferDiscount,
      tableRecordLimit: currentRowsOfferDiscount,
      search: value,
    }
    switch (viewType) {
      case "discountOffer":
        params.offer=offerType
        dispatch(
          discountSummaryRequest(params)
        );
        break;
      case "voidedOffer":
        params.reason=voidedReason
        dispatch(
          cancellationSummaryRequest(params)
        );
        break;

      default:
        console.warn(`Unknown KPI title: ${kpiTitle}`);
    }
  };

  const handleSummaryView = (view: string, data: any) => {
    let params:any={
      locationid: selectedLocation?.value,
      startDate: startDate,
      endDate: endDate,
      tablePageNo: currentPageOfferDiscount,
      tableRecordLimit: currentRowsOfferDiscount,
    }
    setViewType(view);
    if (view == "discountOffer") {
      setOfferType(data?.label);
      let label=data?.label
      if(data?.label==="Other"){
        label=otherOffer
      }
        setOtherOffer(label)
      params.offer=label
      dispatch(  discountSummaryRequest(params))
    }
    if (view === "voidedOrder") {
      let label=data?.label
      if(data?.label==="Other"){
        label=otherVoided
      }
      setVoidedReason(label)
      params.reason=label
      dispatch(cancellationSummaryRequest(params))
    }
  };


  const datepickerApply = (type: string, data1?: any, data2?: any) => {
    handleDateChange("Custom Date", data1, data2);
  };


const handleOther=(type:string, other:string)=>{
  if(type==="discountOffer"){
    setOtherOffer(other)
  }
  if(type==="voidedOffer"){
    setOtherVoided(other)
  }

}
  return (
    <>
        <>
          <StoreFilter
            storeOptions={locations}
            selectedDate={selectedDateFilterType}
            selectedStore={selectedLocation}
            setSelectedDate={(data) => handleDateChange(data?.value)}
            datePickerApplyFunction={(date1: any, date2: any) => datepickerApply("Custom Date", date1, date2)}
            dateDropdownFunction={(date1: any, date2: any) => datepickerApply("Custom Date", date1, date2)}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
          />

          <div className="todays-report-sales-overview-box-container-parent">
            <div className="total-sales-heading-container">
              <h2>Total sales Overview</h2>
              <div className="total-sales-info-container">
                <InfoIcon />
                <div className="total-sales-info-content">
                  The graph shows the percentage compared to the previous day.
                  If you select this week, the comparison chart will display
                  last week's data
                </div>
              </div>
            </div>

            <div className="todays-report-sales-overview-box-container">
              <CardWithMiniGraph
                cardTitle="Total check-ins"
                cardValue={formatNumberByCountry(125, countryCode, false)}
                incrementDecrementValue={+20}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                graphType="chart"
                isPercent={true}
                key="total-check"
              />
              <CardWithMiniGraph
                cardTitle="Total Guests"
                cardValue={formatNumberByCountry(968, countryCode, false)}
                incrementDecrementValue={+20}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                graphType="chart"
                isPercent={true}
                key="net-sales"
              />
              <CardWithMiniGraph
                cardTitle="total cancellation"
                cardValue={formatNumberByCountry(34, countryCode, false)}
                incrementDecrementValue={-20}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                graphType="chart"
                isPercent={true}
                key="total-tax"
              />
              <CardWithMiniGraph
                cardTitle="avg wait time"
                cardValue={formatNumberByCountry(13 ,countryCode, false)}
                incrementDecrementValue={+20}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                graphType="chart"
                isPercent={true}
                key="total-tips"
              />
              <CardWithMiniGraph
                cardTitle="Avg check-ins"
                cardValue={formatNumberByCountry(430, countryCode, false)}
                incrementDecrementValue={0}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                graphType="chart"
                isPercent={true}
                key="gratuity"
              />
              <CardWithMiniGraph
                cardTitle="avg guests"
                cardValue={formatNumberByCountry(362, countryCode, false)}
                incrementDecrementValue={0} 
                isMonetary={false}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                graphType="chart"
                isPercent={true}
                key="transactions"
              />
              
            </div>
          </div>



     


          {/* <div className="sales-charts-container">   */}
          <div>
            <h2 className="sales-overview-sub-heading " style={{ marginTop: "10vh" }}>Hourly Checkin</h2>
            <HourlyCheckinChart
              // dataList={salesCardTypeData}
              // loader={salesCardTypeDataLoading}
            />
          </div>

          <div>
            <h2 className="sales-overview-sub-heading " style={{ marginTop: "10vh" }}>Hourly Gueste</h2>
            <HourlyCheckinChart
              // dataList={salesCardTypeData}
              // loader={salesCardTypeDataLoading}
            />
          </div>  

          <div>
            <h2 className="sales-overview-sub-heading " style={{ marginTop: "10vh" }}> Daily Check-ins & Guests</h2>
   <DailyCheckinsChart/>
          </div>  
         
          <div>
            <h2 className="sales-overview-sub-heading " style={{ marginTop: "10vh" }}>Dine-in Duration By Groups</h2>
        <DineInDurationChart/>
          </div>


          {/* <div>
            <h2 className="sales-overview-sub-heading " style={{ marginTop: "10vh" }}>By Revenue class</h2>
            <GuestSizeChart  />
          </div> */}

          <div className="todays-report-tables-container">
              <NewTable
                kpiTitle="Check-in Details (52)"
                searchQuery={liveCheckInSearchQuery}
                onSearchChange={setLiveCheckInSearchQuery}
                headerData={headerData1 as any}
                tableData={todayTableData1 as any}
                currentPage={1}
                totalPages={50}
                onPageChange={()=>{}}
                rowsPerPage={10}
                setRowsPerPage={()=>{}} 
                loader={false}
                // count={40}                
                // // loader={true}
                // count={liveOrdersAPIRedux?.length}
                searchPlaceHolder="Search by table number, customer name"
                onSearch={()=>{}}
                // // searchDebounce={()=>searchDebounce()}
              />
           
           <NewTable
                kpiTitle="Top Repeat Customers (200)"
                searchQuery={liveCheckInSearchQuery}
                onSearchChange={setLiveCheckInSearchQuery}
                headerData={headerData as any}
                tableData={todayTableData as any}
                currentPage={1}
                totalPages={50}
                onPageChange={()=>{}}
                rowsPerPage={10}
                setRowsPerPage={()=>{}} 
                loader={false}
                    
                // // loader={true}
                // count={liveOrdersAPIRedux?.length}
                searchPlaceHolder="Search by table number, customer name"
                onSearch={()=>{}}
                // // searchDebounce={()=>searchDebounce()}
              />
          </div>
        </>
    </>
  );
};

export default CheckInOverview;
