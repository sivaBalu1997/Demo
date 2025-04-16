import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../../../redux/newReports/newReportsActions";
import {
  liveCheckInOverviewRequest,
  liveCheckInSeaterAvailabilityRequest,
  liveCheckInGuestCountRequest,
  liveCheckInStatusRequest,
  liveCheckInAvgWaitTimeRequest,
  liveCheckInGroupAvgWaitTimeRequest,
  liveCheckInTableRequest,
  liveCheckInTodayRequest,
} from "../../../../redux/checkInReports/checkInReportsActions";
import StoreFilter from "components/reportComponents/StoreFilter";
import DownloadPopOver from "pages/NewReports/Sales/CategoryReport/downloadOption";
import MiniCard from "components/common/MiniCard/MiniCard";
import CustomBarChart from "components/reportComponents/Charts/CustomBarChart";
import StackedBarChart from "components/reportComponents/Charts/StackedBarChart";
import NewTable from "components/reportComponents/NewTable";
import useDateFilter from "hooks/useDateFilter";
import { formatNumberByCountry, getCurrencySymbol } from "utils";
import ErrorHandler from "components/reportComponents/ErrorHandler";
import SwitchableBox from "components/reportComponents/SwitchableBox";
import DownloadReport from "components/reportComponents/DownloadReports";
import { DownloadHeaderItem } from "../../../../interface/newReportsInterface"


const headerData = [
  {
    key: "checkInNumber",
    label: "Check-in",
    alignment: "left",
    isSortable: true,
    prefix:"#",
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
    isPrivate:true
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
    alignment: "left",
    isSortable: true,
  },
  {
    key: "checkInTime",
    label: "Check-in time",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "assignedTime",
    label: "Assigned time",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "liveCheckInStatus",
    label: "Status",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "waitTime",
    label: "Wait time",
    alignment: "left",
    isSortable: true,
    suffix: "Mins",
  },
  {
    key: "guestSize",
    label: "Guest size",
    alignment: "right",
    isSortable: true,
  },
];

const headerData1 = [
  {
    key: "checkInNumber",
    label: "Check-in",
    alignment: "left",
    isSortable: true,
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
    isPrivate:true
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
    alignment: "left",
    isSortable: true,
  },
  {
    key: "checkInTime",
    label: "Check-in time",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "assignedTime",
    label: "Assigned time",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "todayCheckInStatus",
    label: "Status",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "waitTime",
    label: "Wait time",
    alignment: "left",
    isSortable: true,
    suffix: "Mins",
  },
  {
    key: "guestSize",
    label: "Guest size",
    alignment: "right",
    isSortable: true,
  },
];



const CheckInLiveReport = () => {
  const [liveCheckInSearchQuery, setLiveCheckInSearchQuery] = useState("");
  const [liveCheckInCurrentPage, setLiveCheckInCurrentPage] = useState(1);
  const [liveCheckInPageLimit, setLiveCheckInPageLimit] = useState(10);
  const [todayCheckInSearchQuery, setTodayCheckInSearchQuery] = useState("");
  const [todayCheckInCurrentPage, setTodayCheckInCurrentPage] = useState(1);
  const [todayCheckInPageLimit, setTodayCheckInPageLimit] = useState(10);
  const [activeBtn, setActiveBtn] = useState("Live Check-ins");
  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );

  // Live Check-in selectors
  const liveCheckInOverview = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInOverviewSuccess
  );

  const liveCheckInSeaterAvailability = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInSeaterAvailabilitySuccess
  );

  const liveCheckInSeaterAvailabilityMapped = liveCheckInSeaterAvailability?.map((data: any) => ({
    seaters: `${data.seaters} seaters`,
    available:formatNumberByCountry(data.available),
  }))

  const liveCheckInGuestCount = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInGuestCountSuccess
  );
  const liveCheckInStatus = useSelector(
    (state: any) => state?.checkInReports?.liveCheckinStatusSuccess
  );
  const liveCheckInAvgWaitTime = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInAvgWaitTimeSuccess
  );
  const liveCheckInGroupAvgWaitTime = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInGroupAvgWaitTimeSuccess
  );
  const liveCheckInTable = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInTableSuccess
  );
  const liveCheckInToday = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInTodaySuccess
  );

  // Loading states
  const isLiveCheckInOverviewLoading = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInOverviewLoading
  );
  const isLiveCheckInSeaterAvailabilityLoading = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInSeaterAvailabilityLoading
  );
  const isLiveCheckInGuestCountLoading = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInGuestCountLoading
  );
  const isLiveCheckInStatusLoading = useSelector(
    (state: any) => state?.checkInReports?.liveCheckinStatusLoading
  );
  const isLiveCheckInAvgWaitTimeLoading = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInAvgWaitTimeLoading
  );
  const isLiveCheckInGroupAvgWaitTimeLoading = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInGroupAvgWaitTimeLoading
  );
  const isLiveCheckInTableLoading = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInTableLoading
  );
  const isLiveCheckInTodayLoading = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInTodayLoading
  );

  // Error states
  const liveCheckInOverviewError = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInOverviewFailure
  );
  const liveCheckInSeaterAvailabilityError = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInSeaterAvailabilityFailure
  );
  const liveCheckInGuestCountError = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInGuestCountFailure
  );
  const liveCheckInStatusError = useSelector(
    (state: any) => state?.checkInReports?.liveCheckinStatusFailure
  );
  const liveCheckInAvgWaitTimeError = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInAvgWaitTimeFailure
  );
  const liveCheckInGroupAvgWaitTimeError = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInGroupAvgWaitTimeFailure
  );
  const liveCheckInTableError = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInTableFailure
  );
  const liveCheckInTodayError = useSelector(
    (state: any) => state?.checkInReports?.liveCheckInTodayFailure
  );


  const dispatch = useDispatch();
  const { selectedDateFilterType } = useDateFilter();

  useEffect(() => {
    if (selectedLocation?.value) {
      dispatch(liveCheckInOverviewRequest({ locationId: selectedLocation?.value }));
      dispatch(
        liveCheckInSeaterAvailabilityRequest({ locationId: selectedLocation?.value })
      );
      dispatch(liveCheckInGuestCountRequest({ locationId: selectedLocation?.value }));
      dispatch(liveCheckInStatusRequest({ locationId: selectedLocation?.value }));
      dispatch(liveCheckInAvgWaitTimeRequest({ locationId: selectedLocation?.value }));
      dispatch(
        liveCheckInGroupAvgWaitTimeRequest({ locationId: selectedLocation?.value })
      );

    }
  }, [dispatch, selectedLocation]);



  useEffect(() => {
    if(selectedLocation?.value){
      let searchLive = liveCheckInSearchQuery;
      if (searchLive?.[0] === "#") searchLive = searchLive.slice(1);
      dispatch(liveCheckInTableRequest({ locationId: selectedLocation?.value, search: searchLive, page: liveCheckInCurrentPage, size: liveCheckInPageLimit,type:"livecheckin" }));
    }
  }, [selectedLocation,liveCheckInCurrentPage,liveCheckInPageLimit]);


  useEffect(() => {
    if(selectedLocation?.value){

      let searchToday = todayCheckInSearchQuery;
      if (searchToday?.[0] === "#") searchToday = searchToday.slice(1);
    dispatch(liveCheckInTodayRequest({ locationId: selectedLocation?.value, search: searchToday, page: todayCheckInCurrentPage, size: todayCheckInPageLimit , type:"todaycheckin"}));
    }
  }, [selectedLocation,todayCheckInCurrentPage,todayCheckInPageLimit]);



  const   handleLiveCheckInSearch = (value: string) => {
    if(selectedLocation?.value ){
      let search = value;
      if (search?.[0] === "#") search = search.slice(1);
    setLiveCheckInSearchQuery(value);
    dispatch(liveCheckInTableRequest({ locationId: selectedLocation?.value, search, page: 1, size: liveCheckInPageLimit ,type:"livecheckin"}));
    setLiveCheckInCurrentPage(1)
    }
    // setLiveCheckInPageLimit(10)
  };
  const handleTodayCheckInSearch = (value: string) => {
    if(selectedLocation?.value){
      let search = value;
      if (search?.[0] === "#") search = search.slice(1);
    setTodayCheckInSearchQuery(value);
    dispatch(liveCheckInTodayRequest({ locationId: selectedLocation?.value, search, page: 1, size: todayCheckInPageLimit , type:"todaycheckin"}));
    setTodayCheckInCurrentPage(1)
    }
    // setTodayCheckInPageLimit(10)
  };

const handleRefreshClick=()=>{
  if(selectedLocation?.value){
  dispatch(liveCheckInOverviewRequest({ locationId: selectedLocation?.value }));
  dispatch(
    liveCheckInSeaterAvailabilityRequest({ locationId: selectedLocation?.value })
  );
  dispatch(liveCheckInGuestCountRequest({ locationId: selectedLocation?.value }));
  dispatch(liveCheckInStatusRequest({ locationId: selectedLocation?.value }));
  dispatch(liveCheckInAvgWaitTimeRequest({ locationId: selectedLocation?.value }));
  dispatch(
    liveCheckInGroupAvgWaitTimeRequest({ locationId: selectedLocation?.value })
  );
  let searchLive = liveCheckInSearchQuery;
  if (searchLive?.[0] === "#") searchLive = searchLive.slice(1);
  let searchToday = todayCheckInSearchQuery;
  if (searchToday?.[0] === "#") searchToday = searchToday.slice(1);
  dispatch(liveCheckInTableRequest({ locationId: selectedLocation?.value, search: searchLive, page: liveCheckInCurrentPage, size: liveCheckInPageLimit ,type:"livecheckin"}));
  dispatch(liveCheckInTodayRequest({ locationId: selectedLocation?.value, search:searchToday, page: todayCheckInCurrentPage, size: todayCheckInPageLimit , type:"todaycheckin"}));
  }
}

const filteredLiveCheckInOverviewKeysForDownloadHeader = useMemo<DownloadHeaderItem[]>(() => {
  const statusOrderMap: Record<string, string> = {
    totalActive: 'TOTAL ACTIVE',
    inQueue: 'IN-QUEUE',
    assigned: 'ASSIGNED',
    lateShow: 'LATE SHOW'
  };

  return Object.keys(liveCheckInOverview || {})
    .filter((status): status is keyof typeof statusOrderMap =>
      !["seated", "noShow"].includes(status) && status in statusOrderMap
    )
    .sort(
      (a, b) =>
        Object.keys(statusOrderMap).indexOf(a) -
        Object.keys(statusOrderMap).indexOf(b)
    )
    .map((status) => ({
      key: status,
      label: statusOrderMap[status],
    }));
}, [liveCheckInOverview]);


const liveCheckInOverviewTableDataMapped = useMemo(() => {
  return liveCheckInOverview && [liveCheckInOverview]?.map((dataToBeMapped: any) => ({
    totalActive: formatNumberByCountry(dataToBeMapped.totalActive),
    inQueue: formatNumberByCountry(dataToBeMapped.inQueue),
    assigned: formatNumberByCountry(dataToBeMapped.assigned),
    lateShow: formatNumberByCountry(dataToBeMapped.lateShow),
  }));
}, [liveCheckInOverview]);





const liveCheckinStatusMapped = liveCheckInStatus?.map((data: any) => ({
  status: data.status,
  count: Number(data.count),
}))
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="reports-page-container">
        <div className="reports-page-body">
          <StoreFilter
          handleRefreshClick={handleRefreshClick}
            storeOptions={locations}
            selectedDate={selectedDateFilterType}
            selectedStore={selectedLocation}
            showRefresh={true}
            showDate={false}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
          />
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Check-in Overview</h1>
              {/* <DownloadPopOver /> */}
              <DownloadReport kpiTitle="Check-in Overview" headerData={filteredLiveCheckInOverviewKeysForDownloadHeader} tableData={liveCheckInOverviewTableDataMapped}/>
            </div>
            <MiniCard
              data={[
                {
                  title: "TOTAL ACTIVE",
                  value:formatNumberByCountry(liveCheckInOverview?.totalActive),
                },
                {
                  title: "IN-QUEUE",
                  value:formatNumberByCountry(liveCheckInOverview?.inQueue) ,
                },
                {
                  title: "ASSIGNED",
                  value:formatNumberByCountry(liveCheckInOverview?.assigned) ,
                },
                {
                  title: "LATE SHOW",
                  value: formatNumberByCountry(liveCheckInOverview?.lateShow),
                },
              ]}
              />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Seater wise Availability</h1>
              {/* <DownloadPopOver /> */}
              <DownloadReport kpiTitle="Seater wise Availability" headerData={[{key:"seaters",label:"Seater"},{key:"available",label:"Available"}]} tableData={liveCheckInSeaterAvailabilityMapped}/>
            </div>
            <ErrorHandler isError={liveCheckInSeaterAvailabilityError} data={liveCheckInSeaterAvailability}  errorType="checkinNotFound">          
            <MiniCard
              data={liveCheckInSeaterAvailability?.map((data: any) => ({
                title: `${data.seaters} seaters`,
                value:formatNumberByCountry(data.available),
              }))}
            />
              </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">
                {"By Guest Count (In-queue)"}
              </h1>
              {/* <DownloadPopOver /> */}
              <DownloadReport kpiTitle="By Guest Count (In-queue)" headerData={[{key:"groupSize",label:"Group Size"},{key:"guestCount",label:"Guest Count"}]} tableData={liveCheckInGuestCount}/>
            </div>
            <ErrorHandler isError={liveCheckInGuestCountError} data={liveCheckInGuestCount}  errorType="checkinNotFound">              
              <CustomBarChart
              barColor="#009689"
              toolTipBorderColor="#009689"
              xAxisTooltipLabel="Queue"
              yAxisTooltipLabel="Count"
              dataList={liveCheckInGuestCount?.map((data: any) => ({
                xAxisValue: `Group of ${data.groupSize || 0}`,
                yAxisValue: Number(data.guestCount),
              }))}
              loader={isLiveCheckInGuestCountLoading}
              showLabel={false}
              />
              </ErrorHandler>
            
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">By Status- Check-in</h1>
              {/* <DownloadPopOver /> */}
              <DownloadReport kpiTitle="By Status- Check-in" headerData={[{key:"status",label:"Status"},{key:"checkInCount",label:"Check-in Count"}]} tableData={liveCheckInStatus?.map((data: any) => ({
                status: data.status,
                checkInCount: Number(data.count),
              }))}/>
            </div>
            <ErrorHandler isError={liveCheckInStatusError} data={liveCheckInStatus}  errorType="checkinNotFound">   
            <CustomBarChart
              barColor="#225E96"
              toolTipBorderColor="#225E96"
              xAxisTooltipLabel="Status"
              yAxisTooltipLabel="Check-in Count"
              dataList={liveCheckInStatus?.map((data: any) => ({
                xAxisValue: data.status,
                yAxisValue: Number(data.count),
              }))}
              loader={isLiveCheckInStatusLoading}
              showLabel={false}
            />
               </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Avg wait time</h1>
              {/* <DownloadPopOver /> */}
              <DownloadReport kpiTitle="Avg wait time" headerData={[{key:"channel",label:"Channel"},{key:"waitTime",label:"Wait Time"}]} tableData={liveCheckInAvgWaitTime}/>
            </div>
            <ErrorHandler isError={liveCheckInAvgWaitTimeError} data={liveCheckInAvgWaitTime}  errorType="checkinNotFound">   
            <CustomBarChart
              barColor="#CE9E0F"
              toolTipBorderColor="#CE9E0F"
              xAxisTooltipLabel="Channel"
              yAxisTooltipLabel="Wait time"
              yAxisTooltipAppendInBack=" mins"
              dataList={liveCheckInAvgWaitTime?.map((data: any) => ({
                xAxisValue: data.channel,
                yAxisValue: Number(data.waitTime),
              }))}
              loader={isLiveCheckInAvgWaitTimeLoading}
              showLabel={false}
            />
               </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Avg Wait Time by groups</h1>
              {/* <DownloadPopOver /> */}
              <DownloadReport kpiTitle="Avg Wait Time by groups" headerData={[{key:"groupSize",label:"Group Size"},{key:"avgWaitTime",label:"Avg Wait Time"}]} tableData={liveCheckInGroupAvgWaitTime}/>
            </div>
            <ErrorHandler isError={liveCheckInGroupAvgWaitTimeError} data={liveCheckInGroupAvgWaitTime} errorType="checkinNotFound">   
            <StackedBarChart
              loader={isLiveCheckInGroupAvgWaitTimeLoading}
              dataList={liveCheckInGroupAvgWaitTime
                ?.filter((item: any) => item?.timeRange) // Ensure valid timeRange
                ?.sort((a: any, b: any) => {
                  const getStartTime = (str: string) => (str ? parseInt(str.split("-")[0]) || 0 : 0);
                  return getStartTime(a?.timeRange) - getStartTime(b?.timeRange);
                })?.map((data: any) => ({
                timeRange: data?.timeRange || "",
                groupName: data?.groupSize || "",
                count: data?.checkInCount || 0,
              }))}
            />
               </ErrorHandler>
          </div>
          <div className="reports-page-sub-header-container">
          <SwitchableBox
                textOne={"Live Check-ins"}
                textTwo={"Today Check-ins"}
                isActive={activeBtn == "Today Check-ins" }
                toggleSwitch={()=> setActiveBtn((prev) => (prev === "Live Check-ins" ? "Today Check-ins" : "Live Check-ins"))}
            />
          </div>
          <div className="todays-report-tables-container">
            {activeBtn == "Live Check-ins" && (
              //  <ErrorHandler isError={liveCheckInTableError} data={liveCheckInTable}>   
              <NewTable
                kpiTitle="Live Check-ins"
                searchQuery={liveCheckInSearchQuery}
                headerData={headerData as any}
                tableData={liveCheckInTable?.content||[] as any}
                currentPage={liveCheckInCurrentPage}
                totalPages={liveCheckInTable?.totalPages||0}
                onPageChange={setLiveCheckInCurrentPage}
                rowsPerPage={liveCheckInPageLimit}
                setRowsPerPage={setLiveCheckInPageLimit}
                count={liveCheckInTable?.totalElements||0}
                 loader={isLiveCheckInTableLoading}
                 onSearch={handleLiveCheckInSearch}
                searchPlaceHolder="Search by table number, customer name"
                totalElements={liveCheckInTable?.totalElements || 0}
              />
                //  </ErrorHandler>
            )}
            {activeBtn == "Today Check-ins" && (
              //  <ErrorHandler isError={liveCheckInTodayError} data={todayCheckInCurrentPage}>   
              <NewTable
                kpiTitle="Today Check-ins"
                searchQuery={todayCheckInSearchQuery}
                // onSearchChange={setTodayCheckInSearchQuery}
                headerData={headerData1 as any}
                tableData={liveCheckInToday?.content||[] as any}
                currentPage={todayCheckInCurrentPage}
                totalPages={liveCheckInToday?.totalPages||0}
                count={liveCheckInToday?.totalElements||0}
                onPageChange={setTodayCheckInCurrentPage}
                rowsPerPage={todayCheckInPageLimit}
                setRowsPerPage={setTodayCheckInPageLimit}
                loader={isLiveCheckInTodayLoading}
                searchPlaceHolder="Search by table number, customer name"
                onSearch={handleTodayCheckInSearch}
                totalElements={liveCheckInToday?.totalElements || 0}
              />
                //  </ErrorHandler>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInLiveReport;
