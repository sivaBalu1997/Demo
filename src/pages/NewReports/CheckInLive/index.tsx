import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  voidedSummaryRequest,
  categoryChannelSummaryRequest,
  categorySalesRequest,
  categorySalesSummaryRequest,
  changeLocation,
  dropdownDetailsRequest,
} from "../../../redux/newReports/newReportsActions";

import StoreFilter from "components/reportComponents/StoreFilter";
import useDateFilter from "hooks/useDateFilter";
import DownloadPopOver from "pages/CategoryReport/downloadOption";
import MiniCard from "components/common/MiniCard/MiniCard";
import CustomBarChart from "components/reportComponents/Charts/CustomBarChart";
import StackedBarChart from "components/reportComponents/Charts/StackedBarChart";
interface CustomBarChartData {
  xAxisValue: string;
  yAxisValue: number;
  tooltipValue: number;
}
const CategoryReport = () => {
  const dispatch = useDispatch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );
  const [selectedDate, setSelectedDate] = useState({
    label: "Yesterday",
    value: "Yesterday",
  });

  const calendarRef = useRef();

  // Date formatting function
  const formatDate = (date: any) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getDateFromOption = (option: any) => {
    const today = new Date();
    switch (option) {
      case "Today":
        return formatDate(today);
      case "Yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return formatDate(yesterday);
      case "This week":
        const weekStart = new Date(today);
        weekStart.setDate(weekStart.getDate() - 7);
        return formatDate(weekStart);
      case "This month":
        const monthStart = new Date(today);
        monthStart.setDate(1);
        return formatDate(monthStart);
      default:
        return formatDate(today);
    }
  };

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
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="reports-page-container">
        <div className="reports-page-body">
          <StoreFilter
            storeOptions={locations}
            selectedDate={selectedDate}
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
                  value: `$ ${10}`,
                },
                {
                  title: "IN-QUEUE",
                  value: `$ ${140}`,
                },
                {
                  title: "ASSIGNED",
                  value: `$ ${200}`,
                },
                {
                  title: "LATE SHOW",
                  value: `$ ${40}`,
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
              data={[
                {
                  title: "2 seaters",
                  value: `${5}`,
                },
                {
                  title: "4 seaters",
                  value: `${7}`,
                },
                {
                  title: "6 seaters",
                  value: `${3}`,
                },
                {
                  title: "8 seaters",
                  value: `${9}`,
                },
              ]}
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
              dataList={dataList1}
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
              dataList={dataList2}
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
              dataList={dataList3}
              loader={false}
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Avg Wait Time by groups</h1>
              <DownloadPopOver />
            </div>
            <StackedBarChart loader={false} />
            {/* <CustomBarChart
              barColor="#CE9E0F"
              toolTipBorderColor="#CE9E0F"
              xAxisTooltipLabel="Channel"
              yAxisTooltipLabel="Wait time"
              yAxisTooltipAppendInBack=" mins"
              dataList={dataList3}
              
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryReport;
