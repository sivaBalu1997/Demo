import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../../redux/newReports/newReportsActions";
import {  liveCheckInOverviewRequest, 
  liveCheckInSeaterAvailabilityRequest, 
  liveCheckInGuestCountRequest, 
  liveCheckInStatusRequest, 
  liveCheckInAvgWaitTimeRequest, 
  liveCheckInGroupAvgWaitTimeRequest, 
  liveCheckInTableRequest, 
  liveCheckInTodayRequest} from "../../../redux/checkInReports/checkInReportsActions";
import StoreFilter from "components/reportComponents/StoreFilter";
import DownloadPopOver from "pages/CategoryReport/downloadOption";
import MiniCard from "components/common/MiniCard/MiniCard";
import CustomBarChart from "components/reportComponents/Charts/CustomBarChart";
import StackedBarChart from "components/reportComponents/Charts/StackedBarChart";
import NewTable from "components/reportComponents/NewTable";
import useDateFilter from "hooks/useDateFilter";

interface CustomBarChartData {
  xAxisValue: string;
  yAxisValue: number;
  tooltipValue: number;
}

const headerData = [
  {
    key: "checkInNumber",
    label: "Check-in",
    alignment: "left",
    isSortable: true,
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
    key: "liveCheckIn",
    label: "Status",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "avgTime",
    label: "Wait time",
    alignment: "left",
    isSortable: true,
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
    key: "todayCheckIn",
    label: "Status",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "avgTime",
    label: "Wait time",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "guestSize",
    label: "Guest size",
    alignment: "right",
    isSortable: true,
  },
];

const todayTableData = [
  {
    checkinId: "#5852",
    guestName: "Albert Flores",
    phone: "(308) 555-0121",
    channel: "Online",
    tableNo: "A43",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Completed",
    waitTime: "13 Mins",
    guestSize: 4,
  },
  {
    checkinId: "#5852",
    guestName: "Arlene McCoy",
    phone: "(308) 555-0121",
    channel: "Kiosk",
    tableNo: "-",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Late show",
    waitTime: "13 Mins",
    guestSize: 3,
  },
  {
    checkinId: "#5852",
    guestName: "Devon Lane",
    phone: "(308) 555-0121",
    channel: "Online",
    tableNo: "A43",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Cancelled",
    waitTime: "13 Mins",
    guestSize: 6,
  },
  {
    checkinId: "#5852",
    guestName: "Esther Fox",
    phone: "(308) 555-0121",
    channel: "Kiosk",
    tableNo: "A45",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Completed",
    waitTime: "13 Mins",
    guestSize: 5,
  },
  {
    checkinId: "#5852",
    guestName: "Esther Howard",
    phone: "(308) 555-0121",
    channel: "Merchant",
    tableNo: "A46",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Cancelled",
    waitTime: "13 Mins",
    guestSize: 12,
  },
  {
    checkinId: "#5852",
    guestName: "Robert Fox",
    phone: "(308) 555-0121",
    channel: "Online",
    tableNo: "D23",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Completed",
    waitTime: "13 Mins",
    guestSize: 9,
  },
  {
    checkinId: "#5852",
    guestName: "Esther Fox",
    phone: "(308) 555-0121",
    channel: "Kiosk",
    tableNo: "-",
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
    channel: "Online",
    tableNo: "A50",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Late show",
    waitTime: "13 Mins",
    guestSize: 4,
  },
];
const liveTableData = [
  {
    checkinId: "#5852",
    guestName: "Albert Flores",
    phone: "(308) 555-0121",
    channel: "Online",
    tableNo: "A43",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Assigned",
    waitTime: "13 Mins",
    guestSize: 4,
  },
  {
    checkinId: "#5852",
    guestName: "Arlene McCoy",
    phone: "(308) 555-0121",
    channel: "Kiosk",
    tableNo: "-",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Late show",
    waitTime: "13 Mins",
    guestSize: 3,
  },
  {
    checkinId: "#5852",
    guestName: "Devon Lane",
    phone: "(308) 555-0121",
    channel: "Online",
    tableNo: "A43",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "In Queue",
    waitTime: "13 Mins",
    guestSize: 6,
  },
  {
    checkinId: "#5852",
    guestName: "Esther Fox",
    phone: "(308) 555-0121",
    channel: "Kiosk",
    tableNo: "A45",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Assigned",
    waitTime: "13 Mins",
    guestSize: 5,
  },
  {
    checkinId: "#5852",
    guestName: "Esther Howard",
    phone: "(308) 555-0121",
    channel: "Merchant",
    tableNo: "A46",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Seated",
    waitTime: "13 Mins",
    guestSize: 12,
  },
  {
    checkinId: "#5852",
    guestName: "Robert Fox",
    phone: "(308) 555-0121",
    channel: "Online",
    tableNo: "D23",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "In Queue",
    waitTime: "13 Mins",
    guestSize: 9,
  },
  {
    checkinId: "#5852",
    guestName: "Esther Fox",
    phone: "(308) 555-0121",
    channel: "Kiosk",
    tableNo: "-",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Assigned",
    waitTime: "13 Mins",
    guestSize: 8,
  },
  {
    checkinId: "#5852",
    guestName: "Devon Lane",
    phone: "(308) 555-0121",
    channel: "Online",
    tableNo: "A50",
    checkinTime: "12:09 AM",
    assignedTime: "01:09 PM",
    status: "Late show",
    waitTime: "13 Mins",
    guestSize: 4,
  },
];
const dataList1: CustomBarChartData[] = [
  {
    xAxisValue: "Group of 2",
    yAxisValue: 742.0,
    tooltipValue: 23,
  },
  {
    xAxisValue: "Group of 4",
    yAxisValue: 500.5,
    tooltipValue: 15,
  },
  {
    xAxisValue: "Group of 6",
    yAxisValue: 1200.75,
    tooltipValue: 45,
  },
  {
    xAxisValue: "Group of 8",
    yAxisValue: 300.25,
    tooltipValue: 10,
  },
  {
    xAxisValue: "Group of 12",
    yAxisValue: 980.4,
    tooltipValue: 30,
  },
];
const dataList2: CustomBarChartData[] = [
  {
    xAxisValue: "Beverages",
    yAxisValue: 742.0,
    tooltipValue: 0,
  },
  {
    xAxisValue: "Snacks",
    yAxisValue: 500.5,
    tooltipValue: 15,
  },
  {
    xAxisValue: "Bakery",
    yAxisValue: 1200.75,
    tooltipValue: 45,
  },
  {
    xAxisValue: "Dairy",
    yAxisValue: 300.25,
    tooltipValue: 10,
  },
  {
    xAxisValue: "Meat",
    yAxisValue: 980.4,
    tooltipValue: 30,
  },
];
const dataList3: CustomBarChartData[] = [
  {
    xAxisValue: "Beverages",
    yAxisValue: 742.0,
    tooltipValue: 23,
  },
  {
    xAxisValue: "Snacks",
    yAxisValue: 500.5,
    tooltipValue: 15,
  },
  {
    xAxisValue: "Bakery",
    yAxisValue: 1200.75,
    tooltipValue: 45,
  },
  {
    xAxisValue: "Dairy",
    yAxisValue: 300.25,
    tooltipValue: 10,
  },
  {
    xAxisValue: "Meat",
    yAxisValue: 980.4,
    tooltipValue: 30,
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

  const locations = useSelector((state: any) => state?.newReports?.storeLocationsList);
  const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation);
  
  // Live Check-in selectors
  const liveCheckInOverview = useSelector((state: any) => state?.checkInReports?.liveCheckInOverviewSuccess);
  const liveCheckInSeaterAvailability = useSelector((state: any) => state?.checkInReports?.liveCheckInSeaterAvailabilitySuccess);
  const liveCheckInGuestCount = useSelector((state: any) => state?.checkInReports?.liveCheckInGuestCountSuccess);
  const liveCheckInStatus = useSelector((state: any) => state?.checkInReports?.liveCheckInStatusSuccess);
  const liveCheckInAvgWaitTime = useSelector((state: any) => state?.checkInReports?.liveCheckInAvgWaitTimeSuccess);
  const liveCheckInGroupAvgWaitTime = useSelector((state: any) => state?.checkInReports?.liveCheckInGroupAvgWaitTimeSuccess);
  const liveCheckInTable = useSelector((state: any) => state?.checkInReports?.liveCheckInTableSuccess);
  const liveCheckInToday = useSelector((state: any) => state?.checkInReports?.liveCheckInTodaySuccess);

  // Loading states
  const isLiveCheckInOverviewLoading = useSelector((state: any) => state?.checkInReports?.liveCheckInOverviewLoading);
  const isLiveCheckInSeaterAvailabilityLoading = useSelector((state: any) => state?.checkInReports?.liveCheckInSeaterAvailabilityLoading);
  const isLiveCheckInGuestCountLoading = useSelector((state: any) => state?.checkInReports?.liveCheckInGuestCountLoading);
  const isLiveCheckInStatusLoading = useSelector((state: any) => state?.checkInReports?.liveCheckInStatusLoading);
  const isLiveCheckInAvgWaitTimeLoading = useSelector((state: any) => state?.checkInReports?.liveCheckInAvgWaitTimeLoading);
  const isLiveCheckInGroupAvgWaitTimeLoading = useSelector((state: any) => state?.checkInReports?.liveCheckInGroupAvgWaitTimeLoading);
  const isLiveCheckInTableLoading = useSelector((state: any) => state?.checkInReports?.liveCheckInTableLoading);
  const isLiveCheckInTodayLoading = useSelector((state: any) => state?.checkInReports?.liveCheckInTodayLoading);

  // Error states
  const liveCheckInOverviewError = useSelector((state: any) => state?.checkInReports?.liveCheckInOverviewFailure);
  const liveCheckInSeaterAvailabilityError = useSelector((state: any) => state?.checkInReports?.liveCheckInSeaterAvailabilityFailure);
  const liveCheckInGuestCountError = useSelector((state: any) => state?.checkInReports?.liveCheckInGuestCountFailure);
  const liveCheckInStatusError = useSelector((state: any) => state?.checkInReports?.liveCheckInStatusFailure);
  const liveCheckInAvgWaitTimeError = useSelector((state: any) => state?.checkInReports?.liveCheckInAvgWaitTimeFailure);
  const liveCheckInGroupAvgWaitTimeError = useSelector((state: any) => state?.checkInReports?.liveCheckInGroupAvgWaitTimeFailure);
  const liveCheckInTableError = useSelector((state: any) => state?.checkInReports?.liveCheckInTableFailure);
  const liveCheckInTodayError = useSelector((state: any) => state?.checkInReports?.liveCheckInTodayFailure);

  const dispatch = useDispatch();
  const { selectedDateFilterType } = useDateFilter();

  const handleLiveCheckInSearch = (value: string) => { };
  const handleTodayCheckInSearch = (value: string) => { };

  useEffect(() => {
    if (selectedLocation) {
      dispatch(liveCheckInOverviewRequest({ locationId: selectedLocation }));
      dispatch(liveCheckInSeaterAvailabilityRequest({ locationId: selectedLocation }));
      dispatch(liveCheckInGuestCountRequest({ locationId: selectedLocation }));
      dispatch(liveCheckInStatusRequest({ locationId: selectedLocation }));
      dispatch(liveCheckInAvgWaitTimeRequest({ locationId: selectedLocation }));
      dispatch(liveCheckInGroupAvgWaitTimeRequest({ locationId: selectedLocation }));
      dispatch(liveCheckInTableRequest({ locationId: selectedLocation }));
      dispatch(liveCheckInTodayRequest({ locationId: selectedLocation }));
    }
  }, [dispatch, selectedLocation]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="reports-page-container">
        <div className="reports-page-body">
          <StoreFilter
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
              <DownloadPopOver />
            </div>
            <MiniCard
              data={[
                {
                  title: "TOTAL ACTIVE",
                  value: `${liveCheckInOverview?.totalActive||0}`,
                },
                {
                  title: "IN-QUEUE",
                  value: `${liveCheckInOverview?.inQueue||0}`,
                },
                {
                  title: "ASSIGNED",
                  value: `${liveCheckInOverview?.assigned||0}`,
                },
                {
                  title: "LATE SHOW",
                  value: `${liveCheckInOverview?.lateShow||0}`,
                },
              ]}
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Seater wise Availability</h1>
              <DownloadPopOver />
            </div>
            <MiniCard
              data={liveCheckInSeaterAvailability?.map((data:any)=>({title:`${data.seaters} seaters`, value:(data.available||0)}))}
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">
                {"By Guest Count (In-queue)"}
              </h1>
              <DownloadPopOver />
            </div>
            <CustomBarChart
              barColor="#009689"
              toolTipBorderColor="#009689"
              xAxisTooltipLabel="Product Category"
              yAxisTooltipLabel="Total Sales"
              dataList={liveCheckInGuestCount?.map((data:any)=>({xAxisValue:`Group of ${data.guestCount||0}`, yAxisValue:Number(data.groupSize)}))}
              loader={false}
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">By Status- Check-in</h1>
              <DownloadPopOver />
            </div>
            <CustomBarChart
              barColor="#225E96"
              toolTipBorderColor="#225E96"
              xAxisTooltipLabel="Status"
              yAxisTooltipLabel="Check-in Count:"
              dataList={liveCheckInStatus?.map((data:any)=>({xAxisValue:data.status, yAxisValue:Number(data.count)}))}
              loader={false}
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Avg wait time</h1>
              <DownloadPopOver />
            </div>
            <CustomBarChart
              barColor="#CE9E0F"
              toolTipBorderColor="#CE9E0F"
              xAxisTooltipLabel="Channel"
              yAxisTooltipLabel="Wait time"
              yAxisTooltipAppendInBack=" mins"
              dataList={liveCheckInAvgWaitTime?.map((data:any)=>({xAxisValue:data.channel, yAxisValue:Number(data.avgWaitTime)}))}
              loader={false}
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Avg Wait Time by groups</h1>
              <DownloadPopOver />
            </div>
            <StackedBarChart loader={false} dataList={liveCheckInGroupAvgWaitTime?.map((data:any)=>({timeRange:data?.timeRange||"", groupName:data?.groupName||"",count: data?.totalCheckins||0}))}/>
            {/* <CustomBarChart
              barColor="#CE9E0F"
              toolTipBorderColor="#CE9E0F"
              xAxisTooltipLabel="Channel"
              yAxisTooltipLabel="Wait time"
              yAxisTooltipAppendInBack=" mins"
              dataList={dataList3}
              
            /> */}
          </div>
          <div className="category-btn-switch checkin-btn-switch">
            <button
              className={`category-btn  ${activeBtn == "Live Check-ins" ? "active-btn" : ""
                }`}
              onClick={() => {
                setActiveBtn("Live Check-ins");
              }}
            >
              Live Check-ins
            </button>
            <button
              className={`category-btn  ${activeBtn == "Today Check-ins" ? "active-btn" : ""
                }`}
              onClick={() => {
                setActiveBtn("Today Check-ins");
              }}
            >
              Today Check-ins
            </button>
          </div>
          <div className="todays-report-tables-container">
            {activeBtn == "Live Check-ins" && (
              <NewTable
                kpiTitle="Live Check-ins"
                searchQuery={liveCheckInSearchQuery}
                onSearchChange={setLiveCheckInSearchQuery}
                headerData={headerData as any}
                tableData={liveCheckInTable as any}
                currentPage={liveCheckInCurrentPage}
                totalPages={50}
                onPageChange={setLiveCheckInCurrentPage}
                rowsPerPage={liveCheckInPageLimit}
                setRowsPerPage={setLiveCheckInPageLimit}
                loader={false}
                count={40}
                // // loader={true}
                // count={liveOrdersAPIRedux?.length}
                searchPlaceHolder="Search by table number, customer name"
                onSearch={handleLiveCheckInSearch}
              // // searchDebounce={()=>searchDebounce()}
              />
            )}
            {activeBtn == "Today Check-ins" && (
              <NewTable
                kpiTitle="Today Check-ins"
                searchQuery={todayCheckInSearchQuery}
                onSearchChange={setTodayCheckInSearchQuery}
                headerData={headerData1 as any}
                tableData={liveCheckInToday as any}
                currentPage={todayCheckInCurrentPage}
                totalPages={50}
                count={56}
                onPageChange={setTodayCheckInCurrentPage}
                rowsPerPage={todayCheckInPageLimit}
                setRowsPerPage={setTodayCheckInPageLimit}
                loader={false}
                // // loader={true}
                // count={liveOrdersAPIRedux?.length}
                searchPlaceHolder="Search by table number, customer name"
                onSearch={handleTodayCheckInSearch}
              // // searchDebounce={()=>searchDebounce()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInLiveReport;
