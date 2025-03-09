import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancellationSummaryRequest,
  changeLocation,
  discountSummaryRequest,
} from "redux/newReports/newReportsActions";
import {
  checkInOverviewRequest,
  checkInOverviewHourlyRequest,
  checkInOverviewGuestsHourlyRequest,
  checkInOverviewDailyAndGuestRequest,
  checkInOverviewDineInGroupRequest,
  checkInOverviewGuestSizeRequest,
  checkInOverviewTableDetailsRequest,
  checkInOverviewTopCustomerRequest,
  checkInOverviewAvgWaitTimeGroupRequest,
} from "redux/checkInReports/checkInReportsActions";
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
import { formatNumberByCountry } from "utils";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
import StoreFilter from "components/reportComponents/StoreFilter";
import NewTable from "components/reportComponents/NewTable";
import useDateFilter from "hooks/useDateFilter";
import "../SalesOverview/SalesOverview.scss";
import HourlyCheckinChart from "./hourlyChart";
import DailyCheckinsChart from "./DailyCheckinsChart";
import DineInDurationChart from "./DineInDurationChart";
import GuestSizeChart from "./GuestSizeChart";

interface ReportProps {}

const knownTendorIcons: any = {
  "Swipe/Tap/Dip": <PayTapIcon />,
  "Online/Key-In": <PayTapIcon />,
  "Keyed In": <KeyedInIcon />,
  Cash: <CashIcon />,
  CASH: <CashIcon />,
  UberEats: <UberEatsIcon />,
  Grubhub: <GrubHubIcon />,
  Doordash: <DoordashIcon />,
  Coupons: <CouponsIcon />,
  "Gift Card": <GiftCardIcon />,
  "Google Pay": <GooglePayIcon />,
  "Apple Pay": <ApplePayIcon />,
  "Offline QR": <OfflineQRIcon />,
  OFFLINE_QR: <OfflineQRIcon />,
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

const CheckInOverview: React.FC<ReportProps> = ({}) => {
  const [viewType, setViewType] = useState("default");
  const [liveCheckInSearchQuery, setLiveCheckInSearchQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPageOfferDiscount, setCurrentPageOfferDiscount] =
    useState<number>(1);
  const [currentRowsOfferDiscount, setCurrentRowsOfferDiscount] =
    useState<number>(10);
  const [currentPageVoiddedOrders, setCurrentPageVoiddedOrders] =
    useState<number>(1);
  const [currentRowsVoiddedOrders, setCurrentRowsVoiddedOrders] =
    useState<number>(10);
  const [offerType, setOfferType] = useState<string>("");
  const [voidedReason, setVoidedReason] = useState<string>("");
  const [otherOffer, setOtherOffer] = useState<string>("");
  const [otherVoided, setOtherVoided] = useState<string>("");

  const dispatch = useDispatch();
  const { startDate, endDate, selectedDateFilterType, handleDateChange } =
    useDateFilter();

  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );

  const checkInOverview = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewSuccess
  );
  const checkInOverviewHourly = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewHourlySuccess
  );
  const checkInOverviewGuestsHourly = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewGuestsHourlySuccess
  );
  const checkInOverviewDailyAndGuest = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewDailyAndGuestSuccess
  );
  const checkInOverviewDineInGroup = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewDineInGroupSuccess
  );
  const checkInOverviewGuestSize = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewGuestSizeSuccess
  );
  const checkInOverviewTableDetails = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewTableDetailsSuccess
  );
  const checkInOverviewTopCustomer = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewTopCustomerSuccess
  );
  const checkInOverviewAvgWaitTimeGroup = useSelector(
    (state: any) =>
      state?.checkInReports?.checkInOverviewAvgWaitTimeGroupSuccess
  );

  const isCheckInOverviewLoading = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewLoading
  );
  const isCheckInOverviewHourlyLoading = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewHourlyLoading
  );
  const isCheckInOverviewGuestsHourlyLoading = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewGuestsHourlyLoading
  );
  const isCheckInOverviewDailyAndGuestLoading = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewDailyAndGuestLoading
  );
  const isCheckInOverviewDineInGroupLoading = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewDineInGroupLoading
  );
  const isCheckInOverviewGuestSizeLoading = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewGuestSizeLoading
  );
  const isCheckInOverviewTableDetailsLoading = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewTableDetailsLoading
  );
  const isCheckInOverviewTopCustomerLoading = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewTopCustomerLoading
  );
  const isCheckInOverviewAvgWaitTimeGroupLoading = useSelector(
    (state: any) =>
      state?.checkInReports?.checkInOverviewAvgWaitTimeGroupLoading
  );

  const checkInOverviewError = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewFailure
  );
  const checkInOverviewHourlyError = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewHourlyFailure
  );
  const checkInOverviewGuestsHourlyError = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewGuestsHourlyFailure
  );
  const checkInOverviewDailyAndGuestError = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewDailyAndGuestFailure
  );
  const checkInOverviewDineInGroupError = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewDineInGroupFailure
  );
  const checkInOverviewGuestSizeError = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewGuestSizeFailure
  );
  const checkInOverviewTableDetailsError = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewTableDetailsFailure
  );
  const checkInOverviewTopCustomerError = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewTopCustomerFailure
  );
  const checkInOverviewAvgWaitTimeGroupError = useSelector(
    (state: any) =>
      state?.checkInReports?.checkInOverviewAvgWaitTimeGroupFailure
  );

  const countryCode = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.country
  );

  useEffect(() => {
    if (selectedLocation && startDate && endDate) {
      const payload = {
        locationId: selectedLocation,
        startDate,
        endDate,
      };

      dispatch(checkInOverviewRequest(payload));
      dispatch(checkInOverviewHourlyRequest(payload));
      dispatch(checkInOverviewGuestsHourlyRequest(payload));
      dispatch(checkInOverviewDailyAndGuestRequest(payload));
      dispatch(checkInOverviewDineInGroupRequest(payload));
      dispatch(checkInOverviewGuestSizeRequest(payload));
      dispatch(checkInOverviewTableDetailsRequest(payload));
      dispatch(checkInOverviewTopCustomerRequest(payload));
      dispatch(checkInOverviewAvgWaitTimeGroupRequest(payload));
    }
  }, [dispatch, selectedLocation, startDate, endDate]);

  const handleSearch = (value: string, kpiTitle: string) => {
    let params: any = {
      locationid: selectedLocation?.value,
      startDate: startDate,
      endDate: endDate,
      tablePageNo: currentPageOfferDiscount,
      tableRecordLimit: currentRowsOfferDiscount,
      search: value,
    };
    switch (viewType) {
      case "discountOffer":
        params.offer = offerType;
        dispatch(discountSummaryRequest(params));
        break;
      case "voidedOffer":
        params.reason = voidedReason;
        dispatch(cancellationSummaryRequest(params));
        break;

      default:
        console.warn(`Unknown KPI title: ${kpiTitle}`);
    }
  };

  const datepickerApply = (type: string, data1?: any, data2?: any) => {
    handleDateChange("Custom Date", data1, data2);
  };

  const handleDateSelectForTable = (from: string | null, to: string | null, kpiTitle: string) => {
    console.log(`from : ${from}`, `To : ${to}`, `kpiTitle : ${kpiTitle}`);
  };


  return (
    <>
      <>
        <StoreFilter
          storeOptions={locations}
          selectedDate={selectedDateFilterType}
          selectedStore={selectedLocation}
          setSelectedDate={(data) => handleDateChange(data?.value)}
          datePickerApplyFunction={(date1: any, date2: any) =>
            datepickerApply("Custom Date", date1, date2)
          }
          dateDropdownFunction={(date1: any, date2: any) =>
            datepickerApply("Custom Date", date1, date2)
          }
          setSelectedStore={(store) => dispatch(changeLocation(store))}
        />

        <div className="todays-report-sales-overview-box-container-parent">
          <div className="total-sales-heading-container">
            <h2>Total sales Overview</h2>
            <div className="total-sales-info-container">
              <InfoIcon />
              <div className="total-sales-info-content">
                The graph shows the percentage compared to the previous day. If
                you select this week, the comparison chart will display last
                week's data
              </div>
            </div>
          </div>

          <div className="todays-report-sales-overview-box-container">
            <CardWithMiniGraph
              cardTitle="Total check-ins"
              cardValue={formatNumberByCountry(125, countryCode, false)}
              incrementDecrementValue={+20}
              isMonetary={true}
              loader={isCheckInOverviewLoading}
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
              loader={isCheckInOverviewLoading}
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
              loader={isCheckInOverviewLoading}
              showMiniGraph={true}
              graphType="chart"
              isPercent={true}
              key="total-tax"
            />
            <CardWithMiniGraph
              cardTitle="avg wait time"
              cardValue={formatNumberByCountry(13, countryCode, false)}
              incrementDecrementValue={+20}
              isMonetary={true}
              loader={isCheckInOverviewLoading}
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
              loader={isCheckInOverviewLoading}
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
              loader={isCheckInOverviewLoading}
              showMiniGraph={true}
              graphType="chart"
              isPercent={true}
              key="transactions"
            />
          </div>
        </div>

        {/* <div className="sales-charts-container">   */}
        <div>
          <h2
            className="sales-overview-sub-heading "
            style={{ marginTop: "10vh" }}
          >
            Hourly Checkin
          </h2>
          <HourlyCheckinChart
          // dataList={salesCardTypeData}
          // loader={salesCardTypeDataLoading}
          />
        </div>

        <div>
          <h2
            className="sales-overview-sub-heading "
            style={{ marginTop: "10vh" }}
          >
            Hourly Gueste
          </h2>
          <HourlyCheckinChart
          // dataList={salesCardTypeData}
          // loader={salesCardTypeDataLoading}
          />
        </div>

        <div>
          <h2
            className="sales-overview-sub-heading "
            style={{ marginTop: "10vh" }}
          >
            {" "}
            Daily Check-ins & Guests
          </h2>
          <DailyCheckinsChart />
        </div>

        <div>
          <h2
            className="sales-overview-sub-heading "
            style={{ marginTop: "10vh" }}
          >
            Dine-in Duration By Groups
          </h2>
          <DineInDurationChart />
        </div>

        {/* <div>
            <h2 className="sales-overview-sub-heading " style={{ marginTop: "10vh" }}>By Revenue class</h2>
            <GuestSizeChart  />
          </div> */}

        <div className="todays-report-tables-container">
          <NewTable
            kpiTitle="Check-in Details (52)"
            searchQuery={liveCheckInSearchQuery}
            // onSearchChange={setLiveCheckInSearchQuery}
            headerData={headerData1 as any}
            tableData={todayTableData1 as any}
            currentPage={1}
            totalPages={50}
            onPageChange={() => {}}
            rowsPerPage={10}
            setRowsPerPage={() => {}}
            loader={false}
            // count={40}
            // // loader={true}
            // count={liveOrdersAPIRedux?.length}
            searchPlaceHolder="Search by table number, customer name"
            onSearch={() => {}}
            // // searchDebounce={()=>searchDebounce()}
          />

          <NewTable
            kpiTitle="Top Repeat Customers (200)"
            searchQuery={liveCheckInSearchQuery}
            // onSearchChange={setLiveCheckInSearchQuery}
            headerData={headerData as any}
            tableData={todayTableData as any}
            currentPage={1}
            totalPages={50}
            onPageChange={() => {}}
            rowsPerPage={10}
            setRowsPerPage={() => {}}
            loader={false}
            // // loader={true}
            // count={liveOrdersAPIRedux?.length}
            searchPlaceHolder="Search by table number, customer name"
            onSearch={() => {}}
            // // searchDebounce={()=>searchDebounce()}
            showDateDropDown={true}
            onDateSelect={handleDateSelectForTable}
          />
        </div>
      </>
    </>
  );
};

export default CheckInOverview;
