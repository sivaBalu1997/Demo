import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../../redux/newReports/newReportsActions";

import StoreFilter from "components/reportComponents/StoreFilter";
import DownloadPopOver from "pages/CategoryReport/downloadOption";
import CustomBarChart from "components/reportComponents/Charts/CustomBarChart";
import StackedBarChart from "components/reportComponents/Charts/CustomStackedChart";
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

const stackedDataList = [
  { xAxisData: "1 month", stackName: "Active", stackValue: 11 },
  { xAxisData: "1 month", stackName: "Dormant", stackValue: 6 },

  { xAxisData: "1-6 months", stackName: "Active", stackValue: 8 },
  { xAxisData: "1-6 months", stackName: "Dormant", stackValue: 5 },

  { xAxisData: "1-12 months", stackName: "Active", stackValue: 6 },
  { xAxisData: "1-12 months", stackName: "Dormant", stackValue: 3 },

  { xAxisData: "1-3 years", stackName: "Active", stackValue: 6 },
  { xAxisData: "1-3 years", stackName: "Dormant", stackValue: 8 },

  { xAxisData: "3+ years", stackName: "Active", stackValue: 5 },
  { xAxisData: "3+ years", stackName: "Dormant", stackValue: 6 },
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

const SummaryInsights = () => {
  const [activeBtn, setActiveBtn] = useState("Live Check-ins");

  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );

  const dispatch = useDispatch();
  const { selectedDateFilterType } = useDateFilter();

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="reports-page-container">
        <div className="reports-page-body">
          <StoreFilter
            storeOptions={locations}
            selectedDate={selectedDateFilterType}
            selectedStore={selectedLocation}
            showRefresh={false}
            showDate={false}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
          />

          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">{"Customer Volume"}</h1>
              <DownloadPopOver />
            </div>
            <CustomBarChart
              barColor="#009689"
              toolTipBorderColor="#009689"
              xAxisTooltipLabel=""
              yAxisTooltipLabel="Count"
              dataList={dataList3?.map((data: any) => ({
                xAxisValue: `Group of ${data.xAxisValue || 0}`,
                yAxisValue: Number(data.yAxisValue),
              }))}
              loader={false}
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Customers By Tenure</h1>
              <DownloadPopOver />
            </div>
            <StackedBarChart
              loader={false}
              dataList={stackedDataList}
              colorList={["#1F77B4", "#17BECF"]}
              toolTipBorderColor="#17BECF"
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Customers By Tenure</h1>
              <DownloadPopOver />
            </div>
            <StackedBarChart
              loader={false}
              dataList={stackedDataList}
              colorList={["#AA562A", "#F89B29"]}
              toolTipBorderColor="#F89B29"
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">
                Customers By Avg Cover Size
              </h1>
              <DownloadPopOver />
            </div>
            <CustomBarChart
              barColor="#67833E"
              toolTipBorderColor="#67833E"
              xAxisTooltipLabel=""
              yAxisTooltipLabel="Count"
              dataList={dataList3}
              loader={false}
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">
                Customers By Loyalty Levels
              </h1>
              <DownloadPopOver />
            </div>
            <CustomBarChart
              barColor="#2682D9"
              toolTipBorderColor="#2682D9"
              xAxisTooltipLabel=""
              yAxisTooltipLabel="Count"
              dataList={dataList3}
              loader={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryInsights;
