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

import { ReactComponent as InfoIcon } from "../../../../assets/svg/info_grey.svg";
import { NewTableHeader } from "interface/newReportsInterface";
import { formatNumberByCountry } from "utils";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
import StoreFilter from "components/reportComponents/StoreFilter";
import NewTable from "components/reportComponents/NewTable";
import useDateFilter from "hooks/useDateFilter";
import "../../Sales/SalesOverview/SalesOverview.scss";
import HourlyCheckinChart from "./hourlyChart";
import HourlyCheckinChartGuest from "./hourlyChartGuest";

import DailyCheckinsChart from "./DailyCheckinsChart";
import DineInDurationChart from "./DineInDurationChart";
import DownloadPopOver from "pages/NewReports/Sales/CategoryReport/downloadOption";
import CustomBarChart from "components/reportComponents/Charts/CustomBarChart";
import StackedBarChart from "components/reportComponents/Charts/StackedBarChart";
import ErrorHandler from "components/reportComponents/ErrorHandler";
import DownloadReport from "components/reportComponents/DownloadReports";

interface ReportProps { }
interface CustomBarChartData {
  xAxisValue: string;
  yAxisValue: number;
  tooltipValue: number;
}

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
    isPrivate: true,
    isSortable: false,
  },
  {
    key: "totalVisits",
    label: "Visits",
    alignment: "center",
    isSortable: true,
  },
];


const headerData1 = [
  {
    key: "checkInNumber",
    label: "Check-in",
    alignment: "left",
    isSortable: false,
    prefix:"#"
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
    isPrivate: true
  },
  {
    key: "channel",
    label: "Channel",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "tableName",
    label: "Table",
    alignment: "center",
    isSortable: false,
  },
  {
    key: "checkInTime",
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
    suffix:"Mins"
  },
  {
    key: "guestSize",
    label: "Guest size",
    alignment: "center",
    isSortable: true,
  },
];


const CheckInOverview: React.FC<ReportProps> = ({ }) => {
  const [checkInSearchQuery, setcheckInSearchQuery] = useState("");
  const [checkInCurrentPage, setcheckInCurrentPage] = useState(1);
  const [checkInPageLimit, setcheckInPageLimit] = useState(10);
  const [todayCheckInSearchQuery, settodayCheckInSearchQuery] = useState("");
  const [todayCheckInCurrentPage, settodayCheckInCurrentPage] = useState(1);
  const [todayCheckInPageLimit, settodayCheckInPageLimit] = useState(10);
  const [topTableDate, setTopTableDate] = useState<{ from: string | null; to: string | null; kpiTitle: string }>({ from: null, to: null, kpiTitle: "" });

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


  const checkInOverviewHourlyTableData = useMemo(() => {
    return checkInOverviewHourly?.map((dataToBeMapped: any)=>({
      channelName: dataToBeMapped?.channelName,
      checkinHour: dataToBeMapped?.checkinHour,
      totalCheckins: dataToBeMapped?.totalCheckins,
    }))
  },[checkInOverviewHourly])

  const checkInOverviewGuestsHourly = useSelector(
    (state: any) => state?.checkInReports?.checkInOverviewGuestsHourlySuccess
  );


  const checkInOverviewGuestsHourlyMapped = useMemo(() => {
    return checkInOverviewGuestsHourly?.map((dataToBeMapped: any)=>({
      channelName: dataToBeMapped?.channelName,
      checkinHour: dataToBeMapped?.checkinHour,
      totalGuests: dataToBeMapped?.totalGuests,
    }))
  },[checkInOverviewGuestsHourly])

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

  // const download = checkInOverviewAvgWaitTimeGroup
  //               ?.filter((item: any) => item?.waitTime) // Ensure valid timeRange
  //               ?.sort((a: any, b: any) => {
  //                 const getStartTime = (str: string) => (str ? parseInt(str.split("-")[0]) || 0 : 0);
  //                 return getStartTime(a?.waitTime) - getStartTime(b?.waitTime);
  //               })?.map((data: any) => ({
  //                 timeRange: data?.waitTime || "",
  //                 groupName: data?.groupSize || "",
  //                 count: data?.checkInCount || 0,
  //             }))

  console.log({checkInOverviewAvgWaitTimeGroup})

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

  const countryCode = useSelector((state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country);

  useEffect(() => {
    if (selectedLocation && startDate && endDate) {
      const payload = {
        locationId: selectedLocation?.value,
        startDate,
        endDate,
      };

      dispatch(checkInOverviewRequest(payload));
      dispatch(checkInOverviewHourlyRequest(payload));
      dispatch(checkInOverviewGuestsHourlyRequest(payload));
      dispatch(checkInOverviewDailyAndGuestRequest(payload));
      dispatch(checkInOverviewDineInGroupRequest(payload));
      dispatch(checkInOverviewGuestSizeRequest(payload));
      dispatch(checkInOverviewAvgWaitTimeGroupRequest(payload));
    }
  }, [dispatch, selectedLocation, startDate, endDate]);

  useEffect(() => {
    const payload = {
      locationId: selectedLocation?.value,
      startDate,
      endDate,
      search: checkInSearchQuery,
      page: checkInCurrentPage,
      size: checkInPageLimit
    };
    dispatch(checkInOverviewTableDetailsRequest(payload));

  }, [selectedLocation, startDate, endDate, checkInCurrentPage, checkInPageLimit])


  useEffect(() => {
    const payload = {
      locationId: selectedLocation?.value,
      startDate: topTableDate?.from,
      endDate: topTableDate?.to,
      search: todayCheckInSearchQuery,
      page: todayCheckInCurrentPage,
      size: todayCheckInPageLimit
    };
    dispatch(checkInOverviewTopCustomerRequest(payload));

  }, [selectedLocation, topTableDate, todayCheckInCurrentPage, todayCheckInPageLimit])


  const handleDateSelectForTable = (from: string | null, to: string | null, kpiTitle: string) => {
    const temp = { from, to, kpiTitle }
    setTopTableDate(temp)
  };

  const handleCheckInSearch = (value: string) => {
    setcheckInSearchQuery(value)

    dispatch((checkInOverviewTableDetailsRequest({ locationId: selectedLocation?.value, search: value, page: 1, size: checkInPageLimit, startDate, endDate })))
    setcheckInCurrentPage(1)
  }
  const handleTopSearch = (value: string) => {
    settodayCheckInSearchQuery(value)
    dispatch((checkInOverviewTopCustomerRequest({ locationId: selectedLocation?.value, search: value, page: 1, size: checkInPageLimit, startDate: topTableDate?.from, endDate: topTableDate?.to })))
    settodayCheckInCurrentPage(1)
  }
  const checkInOverviewHeaderForDownloading = checkInOverview && Object.keys(checkInOverview)?.map((key) => ({
    key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()
  }));


  const checkInOverviewMapped = checkInOverview && [checkInOverview]?.map((dataTobeMapped: any)=>({
    "totalCheckin": dataTobeMapped?.totalCheckin,
    "totalGuests": dataTobeMapped?.totalGuests,
    "totalCencellation": dataTobeMapped?.totalCencellation,
    "totalCheckinPercentage": dataTobeMapped?.totalCheckinPercentage,
    "totalGuestsPercentage": dataTobeMapped?.totalGuestsPercentage,
    "totalCencellationPercentage": dataTobeMapped?.totalCencellationPercentage,
    "avgWaitTime": dataTobeMapped?.avgWaitTime,
    "avgWaitTimeChangePercentage": dataTobeMapped?.avgWaitTimeChangePercentage,
    "avgCheckins": dataTobeMapped?.avgCheckins,
    "avgGuests": dataTobeMapped?.avgGuests,
  }))

  return (
    <>

      <StoreFilter
        startDate={startDate}
        endDate={endDate}
        storeOptions={locations}
        selectedDate={selectedDateFilterType}
        selectedStore={selectedLocation}
        setSelectedDate={(data) => handleDateChange(data?.value)}
        datePickerApplyFunction={(date1: any, date2: any) =>
          handleDateChange("Custom Date", date1, date2)
        }
        setSelectedStore={(store) => dispatch(changeLocation(store))}
      />


      <div className="todays-report-sales-overview-box-container-parent">
        <div className="total-sales-heading-container">
          <div className="total-sales-overview-header-with-download">
            <h2> Check-in Overview</h2>
            <div className="total-sales-info-container">
              <InfoIcon />
              <div className="total-sales-info-content">
                The graph shows percentage comparison based on the previous day or week, depending on your selection.
              </div>
            </div>
          </div>
          {(!isCheckInOverviewLoading && checkInOverview && checkInOverviewHeaderForDownloading) && <DownloadReport kpiTitle="Check-in Overview" tableData={checkInOverviewMapped} headerData={checkInOverviewHeaderForDownloading} />}
        </div>


        <div className="todays-report-sales-overview-box-container">
          <CardWithMiniGraph
            cardTitle="Total check-ins"
            cardValue={formatNumberByCountry(checkInOverview?.totalCheckin, countryCode, false)}
            incrementDecrementValue={checkInOverview?.totalCheckinPercentage || 0}
            loader={isCheckInOverviewLoading}
            showMiniGraph={true}
            graphType="arrow"
            isPercent={true}
            key="total-check"
          />
          <CardWithMiniGraph
            cardTitle="Total Guests"
            cardValue={formatNumberByCountry(checkInOverview?.totalGuests, countryCode, false)}
            incrementDecrementValue={checkInOverview?.totalGuestsPercentage || 0}
            loader={isCheckInOverviewLoading}
            showMiniGraph={true}
            graphType="arrow"
            isPercent={true}
            key="net-sales"
          />
          <CardWithMiniGraph
            cardTitle="total cancellation"
            cardValue={formatNumberByCountry(checkInOverview?.totalCencellation, countryCode, false)}
            incrementDecrementValue={checkInOverview?.totalCencellationPercentage || 0}
            loader={isCheckInOverviewLoading}
            showMiniGraph={true}
            graphType="arrow"
            isPercent={true}
            key="total-tax"
          />
          <CardWithMiniGraph
            cardTitle="avg wait time"
            cardValue={formatNumberByCountry(checkInOverview?.avgWaitTime, countryCode, false)}
            incrementDecrementValue={checkInOverview?.avgWaitTimeChangePercentage || 0}
            loader={isCheckInOverviewLoading}
            showMiniGraph={true}
            graphType="arrow"
            isPercent={true}
            key="total-tips"
          />
          <CardWithMiniGraph
            cardTitle="Avg check-ins"
            cardValue={formatNumberByCountry(checkInOverview?.avgCheckins, countryCode, false)}
            incrementDecrementValue={0}
            loader={isCheckInOverviewLoading}
            showMiniGraph={true}
            graphType="arrow"
            isPercent={true}
            key="gratuity"
          />
          <CardWithMiniGraph
            cardTitle="avg guests"
            cardValue={formatNumberByCountry(checkInOverview?.avgGuests, countryCode, false)}
            incrementDecrementValue={0}
            isMonetary={false}
            loader={isCheckInOverviewLoading}
            showMiniGraph={true}
            graphType="arrow"
            isPercent={true}
            key="transactions"
          />
        </div>
      </div>

      {/* <div className="sales-charts-container">   */}
      <div style={{ marginTop: "10vh" }}>
        <span className="heading-with-download-container-checkin-overview">
          <h2
            className="sales-overview-sub-heading"
          >
            Hourly Checkin
          </h2>
          <DownloadReport 
            kpiTitle="Hourly Check-in"
            tableData={checkInOverviewHourlyTableData} 
            headerData={[{key:"channelName",label:"Channel Name"},{key:"checkinHour",label:"Checkin Hour"},{key:"totalCheckins",label:"Total checkins"}]}
          />
        </span>
        <ErrorHandler isError={checkInOverviewHourlyError} data={checkInOverviewHourly}>
          <HourlyCheckinChart
            dataList={checkInOverviewHourly}
            loader={isCheckInOverviewHourlyLoading}
          />
        </ErrorHandler>
      </div>

      <div style={{ marginTop: "10vh" }}>
      <span className="heading-with-download-container-checkin-overview">
          <h2
            className="sales-overview-sub-heading"
          >
            Hourly Guest
          </h2>
          <DownloadReport 
            kpiTitle="Hourly Guest"
            tableData={checkInOverviewGuestsHourlyMapped} 
            headerData={[{key:"channelName",label:"Channel Name"},{key:"checkinHour",label:"Checkin Hour"},{key:"totalGuests",label:"Total guests"}]}
          />
        </span>
        <ErrorHandler isError={checkInOverviewGuestsHourlyError} data={checkInOverviewGuestsHourly}>
          <HourlyCheckinChartGuest
            dataList={checkInOverviewGuestsHourly}
            loader={isCheckInOverviewGuestsHourlyLoading}
          />
        </ErrorHandler>
      </div>

      <div style={{ marginTop: "10vh" }}>
      <span className="heading-with-download-container-checkin-overview">
          <h2
            className="sales-overview-sub-heading"
          >
            Daily Check-ins & Guests
          </h2>
          <DownloadReport 
            kpiTitle="Daily Check-ins & Guests"
            tableData={checkInOverviewDailyAndGuest} 
            headerData={[{key:"day",label:"Day"},{key:"totalCheckins",label:"Total checkins"},{key:"totalGuests",label:"Total guests"}]}
          />
        </span>
        <ErrorHandler isError={checkInOverviewDailyAndGuestError} data={checkInOverviewDailyAndGuest}>
          <DailyCheckinsChart
            dataList={checkInOverviewDailyAndGuest}
            loader={isCheckInOverviewDailyAndGuestLoading}
          />
        </ErrorHandler>
      </div>

      <div style={{ marginTop: "10vh" }}>
      <span className="heading-with-download-container-checkin-overview">
          <h2
            className="sales-overview-sub-heading"
          >
            Dine-in Duration By Groups
          </h2>
          <DownloadReport 
            kpiTitle="Dine-in Duration By Groups"
            tableData={checkInOverviewDineInGroup} 
            headerData={
              [
                {key:"day",label:"Day"},
                {key:"groupSize",label:"Group size"},
                {key:"avgDineInDuration",label:"Avg Dine In Duration"},
              ]
            }
          />
        </span>
        <ErrorHandler isError={checkInOverviewDineInGroupError} data={checkInOverviewDineInGroup}>
          <DineInDurationChart
            dataList={checkInOverviewDineInGroup}
            loader={isCheckInOverviewDineInGroupLoading}
          />
        </ErrorHandler>
      </div>

      <div>
        <div className="reports-page-sub-header-container">
          <h1 className="reports-page-heading">Group size Distrbution</h1>
          <DownloadReport 
            kpiTitle="Group size Distrbution"
            tableData={checkInOverviewGuestSize} 
            headerData={
              [
                {key:"groupSize",label:"Group size"},
                {key:"guestSize",label:"Guest size"},
              ]
            }
          />
        </div>
        <ErrorHandler isError={checkInOverviewGuestSizeError} data={checkInOverviewGuestSize}>
          <CustomBarChart
            barColor="#67833E"
            toolTipBorderColor="#67833E"
            xAxisTooltipLabel="Party"
            yAxisTooltipLabel="Count"
            yAxisTooltipAppendInBack=""
            dataList={checkInOverviewGuestSize?.map((data: any) => ({
              xAxisValue: data.groupSize === 10 ? `Group of 8+` : `Group of ${data.groupSize}`,
              yAxisValue: Number(data.guestSize),
            }))}
            loader={isCheckInOverviewGuestSizeLoading}
            showLabel={false}
          />
        </ErrorHandler>
      </div>

      <div className="todays-report-tables-container">
        <NewTable
          kpiTitle={`Check-in Details (${checkInOverviewTableDetails?.totalElements || 0})`}
          searchQuery={checkInSearchQuery}
          // onSearchChange={setcheckInSearchQuery}
          headerData={headerData1 as any}
          tableData={checkInOverviewTableDetails?.content?.filter((data:any)=>data?.status)||[] as any}
          currentPage={checkInCurrentPage}
          totalPages={checkInOverviewTableDetails?.totalPages || 0}
          onPageChange={setcheckInCurrentPage}
          rowsPerPage={checkInPageLimit}
          setRowsPerPage={setcheckInPageLimit}
          loader={isCheckInOverviewTableDetailsLoading}
          // count={40}
          // // loader={true}
          // count={liveOrdersAPIRedux?.length}
          searchPlaceHolder="Search by table number, customer name"
          onSearch={handleCheckInSearch}
          totalElements={checkInOverviewTableDetails?.totalElements || 0}
        // // searchDebounce={()=>searchDebounce()}
        />


        <NewTable
          kpiTitle={`Top Repeat Customers (${checkInOverviewTopCustomer?.totalElements || 0})`}
          searchQuery={todayCheckInSearchQuery}
          // onSearchChange={setLiveCheckInSearchQuery}
          headerData={headerData as any}
          tableData={checkInOverviewTopCustomer?.content || [] as any}
          currentPage={todayCheckInCurrentPage}
          totalPages={checkInOverviewTopCustomer?.totalPages || 0}
          onPageChange={settodayCheckInCurrentPage}
          rowsPerPage={todayCheckInPageLimit}
          setRowsPerPage={settodayCheckInPageLimit}
          loader={isCheckInOverviewTopCustomerLoading}
          // // loader={true}
          // count={liveOrdersAPIRedux?.length}
          searchPlaceHolder="Search by number, customer name"
          onSearch={handleTopSearch}
          // // searchDebounce={()=>searchDebounce()}
          showDateDropDown={true}
          onDateSelect={handleDateSelectForTable}
          totalElements={checkInOverviewTopCustomer?.totalElements || 0}
        />
      </div>
      <div>
        <div className="reports-page-sub-header-container">
          <h1 className="reports-page-heading">Avg Wait Time by groups</h1>
          {/* <DownloadPopOver /> */}
          <DownloadReport kpiTitle="Avg Wait Time by groups" 
            headerData={
              [
                {"key":"groupSize", "label":"Group Size" },
                {"key":"checkInCount", "label":"CheckIn Count" },
                {"key":"waitTime", "label":"Wait Time" },
              ]
            } 
            tableData={checkInOverviewAvgWaitTimeGroup}
          />
        </div>
        <ErrorHandler isError={checkInOverviewAvgWaitTimeGroupError} data={checkInOverviewAvgWaitTimeGroup}>
          <StackedBarChart
            loader={isCheckInOverviewAvgWaitTimeGroupLoading}
            dataList={checkInOverviewAvgWaitTimeGroup
                ?.filter((item: any) => item?.waitTime) // Ensure valid timeRange
                ?.sort((a: any, b: any) => {
                  const getStartTime = (str: string) => (str ? parseInt(str.split("-")[0]) || 0 : 0);
                  return getStartTime(a?.waitTime) - getStartTime(b?.waitTime);
                })?.map((data: any) => ({
                  timeRange: data?.waitTime || "",
                  groupName: data?.groupSize || "",
                  count: data?.checkInCount || 0,
              }))}
          />
        </ErrorHandler>
      </div>

    </>
  );
};

export default CheckInOverview;
