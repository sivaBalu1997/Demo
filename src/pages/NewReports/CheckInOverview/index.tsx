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

import { ReactComponent as InfoIcon } from "../../../assets/svg/info_grey.svg";
import { NewTableHeader } from "interface/newReportsInterface";
import { formatNumberByCountry } from "utils";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
import StoreFilter from "components/reportComponents/StoreFilter";
import NewTable from "components/reportComponents/NewTable";
import useDateFilter from "hooks/useDateFilter";
import "../SalesOverview/SalesOverview.scss";
import HourlyCheckinChart from "./hourlyChart";
import HourlyCheckinChartGuest from "./hourlyChartGuest";

import DailyCheckinsChart from "./DailyCheckinsChart";
import DineInDurationChart from "./DineInDurationChart";
import DownloadPopOver from "pages/CategoryReport/downloadOption";
import CustomBarChart from "components/reportComponents/Charts/CustomBarChart";
import StackedBarChart from "components/reportComponents/Charts/StackedBarChart";
import ErrorHandler from "components/reportComponents/ErrorHandler";

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

  const datepickerApply = (type: string, data1?: any, data2?: any) => {
    handleDateChange("Custom Date", data1, data2);
  };

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
            <h2
              className="sales-overview-sub-heading "          
            >
              Check-in Overview
            </h2>

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
        <div>
          <h2
            className="sales-overview-sub-heading "
            style={{ marginTop: "10vh" }}
          >
            Hourly Checkin
          </h2>
          <ErrorHandler isError={isCheckInOverviewHourlyLoading} data={checkInOverviewHourly}>
            <HourlyCheckinChart
              dataList={checkInOverviewHourly}
              loader={isCheckInOverviewHourlyLoading}
            />
          </ErrorHandler>
        </div>

        <div>
          <h2
            className="sales-overview-sub-heading "
            style={{ marginTop: "10vh" }}
          >
            Hourly Guest
          </h2>
          <ErrorHandler isError={isCheckInOverviewGuestsHourlyLoading} data={checkInOverviewGuestsHourly}>
            <HourlyCheckinChartGuest
              dataList={checkInOverviewGuestsHourly}
              loader={isCheckInOverviewGuestsHourlyLoading}
            />
          </ErrorHandler>
        </div>

        <div>
          <h2
            className="sales-overview-sub-heading "
            style={{ marginTop: "10vh" }}
          >
            {" "}
            Daily Check-ins & Guests
          </h2>
          <ErrorHandler isError={isCheckInOverviewDailyAndGuestLoading} data={checkInOverviewDailyAndGuest}>
            <DailyCheckinsChart
              dataList={checkInOverviewDailyAndGuest}
              loader={isCheckInOverviewDailyAndGuestLoading}
            />
          </ErrorHandler>
        </div>

        <div>
          <h2
            className="sales-overview-sub-heading "
            style={{ marginTop: "10vh" }}
          >
            Dine-in Duration By Groups
          </h2>
          <ErrorHandler isError={isCheckInOverviewDineInGroupLoading} data={checkInOverviewDineInGroup}>
            <DineInDurationChart
              dataList={checkInOverviewDineInGroup}
              loader={isCheckInOverviewDineInGroupLoading}
            />
          </ErrorHandler>
        </div>

        <div>
          <div className="reports-page-sub-header-container">
            <h1 className="reports-page-heading">Group size Distrbution</h1>
            <DownloadPopOver />
          </div>
          <ErrorHandler isError={isCheckInOverviewGuestSizeLoading} data={checkInOverviewGuestSize}>
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
            tableData={checkInOverviewTableDetails?.content || [] as any}
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
            searchPlaceHolder="Search by table number, customer name"
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
            <DownloadPopOver />
          </div>
          <ErrorHandler isError={isCheckInOverviewAvgWaitTimeGroupLoading} data={checkInOverviewAvgWaitTimeGroup}>
            <StackedBarChart
              loader={false}
              dataList={checkInOverviewAvgWaitTimeGroup?.map((data: any) => ({
                timeRange: data?.waitTime || "",
                groupName: data?.groupSize || "",
                count: data?.checkInCount || 0,
              }))}
            />
          </ErrorHandler>
        </div>

      </>
    </>
  );
};

export default CheckInOverview;
