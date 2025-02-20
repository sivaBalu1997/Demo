import React, {   useState } from "react";
import ReportsNotFound from "components/ReportsNotFound";
import SalesCard from "components/SalesCard";
import TenderType from "components/TendorTypeCard";
import CardTypeChart from "components/chart";
import EmployeeSalesChart from "components/chart/chartEmployees";
import DiscountAndVoidedOrders from "components/chart/DiscountAndVoidedOrders";
import ChannelSalesChart from "components/chart/channelChart";
import RevenueClassChart from "components/chart/RevenueClassChart";

const tabs = ["Today's report", "Sales Overview", "Categories", "Employees", "Trends"];

interface ReportProps {}

const SalesOverview: React.FC<ReportProps> = () => {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedStore, setSelectedStore] = useState("A2B Princeton");
  const salesData = [
    { type: "Total Sales", amount: "$8500.90", trend: "+20%", positive: true, showChart: true },
    { type: "Net Sales", amount: "$6990.50", trend: "+20%", positive: true, showVChart: true },
    { type: "Total Tax", amount: "$425.00", trend: "-20%", positive: false, showChart: true },
    { type: "Total Tips", amount: "$250.00", trend: "-20%", positive: false, showVChart: true },
  ];
  

  
  return (
    <>
  
          {/* Date and Store */}
          <div className="storeAndDate">
            <div className="storeInfo">
              <p className="label">Store name</p>
              <h2>A2B, Princeton</h2>
            </div>

            <div className="filters">
              <div className="filterGroup">
                <p className="label">Select date</p>
                <select value={selectedDate} onChange={(e ) => setSelectedDate(e.target.value)}>
                  {/* <option>Today</option> */}
                  <option>Yesterday</option>
                  <option>This week</option>
                  <option>This month</option>
                  <option>This year</option>
                  <option>Custom Date</option>
                </select>
              </div>

              <div className="filterGroup">
                <p className="label">Select store</p>
                <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
                  <option>A2B Princeton</option>
                  <option>A2B Store 2</option>
                  <option>A2B Store 3</option>
                  <option>A2B Store 4</option>
                </select>
              </div>
            </div>
          </div>

          {/*  ReportsNotFound*/}
          {/* <ReportsNotFound status="notFound"/>
          <ReportsNotFound status="error"/> */}

          {/*  Total Sales*/}

          <div className="sales-overview">
      <h2>Total Sales Overview</h2>
      <div className="grid">
        {salesData.map((data, index) => (
          <SalesCard key={index} {...data} />
        ))}
      </div>
    </div>

{/* Tendor type */}

<TenderType/>

<CardTypeChart/>
<EmployeeSalesChart/>
<ChannelSalesChart/>  
<DiscountAndVoidedOrders/>
<RevenueClassChart/>
        
    </>
  );
};

export default SalesOverview;
