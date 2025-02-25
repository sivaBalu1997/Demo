import React, { useState } from "react";
import ReportsNotFound from "components/reportComponents/ReportsNotFound";
import SalesCard from "components/reportComponents/SalesCard";
import TenderType from "components/reportComponents/TendorTypeCard";
import CardTypeChart from "components/reportComponents/chart";
import EmployeeSalesChart from "components/reportComponents/chart/chartEmployees";
import DiscountAndVoidedOrders from "components/reportComponents/chart/DiscountAndVoidedOrders";
import ChannelSalesChart from "components/reportComponents/chart/channelChart";
import RevenueClassChart from "components/reportComponents/chart/RevenueClassChart";
import StoreFilter from "components/reportComponents/StoreFilter";
import "./SalesOverview.scss";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
import TenderCard from "components/reportComponents/TendorTypeCard/TendorCard";

import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow-down.svg";
import { ReactComponent as ArrowUp } from "../../../assets/svg/arrow-down.svg";
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

// import TenderType from "components/reportComponents/TendorTypeCard";
import DownloadPopOver from "pages/CategoryReport/downloadOption";
import LinearBarChart from "pages/CategoryReport/barChart";
import DoughnutChart from "pages/CategoryReport/doughnutChart";
import DoughnutChartWithButton from "components/reportComponents/Charts/DoughnutChartButton";
import { useSelector } from "react-redux";

const tabs = [
  "Today's report",
  "Sales Overview",
  "Categories",
  "Employees",
  "Trends",
];
interface ReportProps { }

const SalesOverview: React.FC<ReportProps> = () => {

  const restaurantDetails = useSelector((state: any) => state?.auth?.restaurantDetails?.branch)

  const mappedIdWithBranchName = restaurantDetails?.map((branchWithId: any) => ({ value: branchWithId?.id, label: branchWithId?.locationName }))

  const [selectedDate, setSelectedDate] = useState({
    label: "Yesterday",
    value: "Yesterday",
  });
  const [selectedStore, setSelectedStore] = useState(mappedIdWithBranchName?.[0]);
  const salesData = [
    {
      type: "Total Sales",
      amount: "$8500.90",
      trend: "+20%",
      positive: true,
      showLineChart: true,
    },
    {
      type: "Net Sales",
      amount: "$6990.50",
      trend: "+20%",
      positive: true,
      showLineChart: true,
    },
    {
      type: "Total Tax",
      amount: "$425.00",
      trend: "-20%",
      positive: false,
      showLineChart: true,
    },
    {
      type: "Total Tips",
      amount: "$250.00",
      trend: "-20%",
      positive: false,
      showLineChart: true,
    },
  ];

  const tenderData = [
    {
      icon: <PayTapIcon />,
      title: "Swipe/Tap/Dip",
      amount: "$3058.50",
      orders: 46,
      percentage: 18,
      details: {
        onPremOrders: 35,
        onPremSales: "$2520.00",
        offPremOrders: 11,
        offPremSales: "$1536.50",
      },
    },
    {
      icon: <PayTapIcon />,
      title: "Keyed In",
      amount: "$3058.50",
      orders: 46,
      percentage: 6,
      details: {
        onPremOrders: 35,
        onPremSales: "$2520.00",
        offPremOrders: 11,
        offPremSales: "$1536.50",
      },
    },
    {
      icon: <PayTapIcon />,
      title: "Cash",
      amount: "$3058.50",
      orders: 46,
      percentage: 13,
    },
    {
      icon: <PayTapIcon />,
      title: "UberEats",
      amount: "$3058.50",
      orders: 46,
      percentage: 12,
    },
    {
      icon: <PayTapIcon />,
      title: "Google Pay",
      amount: "$3058.50",
      orders: 46,
      percentage: 29,
    },
  ];
  const datepickerApply = (data1: any, data2: any) => {
    console.log(data1, data2, "selected Date is here");
  };



  return (
    <>
      {/* Date and Store */}
      <StoreFilter
        selectedDate={selectedDate}
        selectedStore={selectedStore}
        setSelectedDate={setSelectedDate}
        setSelectedStore={setSelectedStore}
        datePickerApplyFunction={datepickerApply}
      />

      {/*  ReportsNotFound*/}
      {/* <ReportsNotFound status="notFound"/>
          <ReportsNotFound status="error"/> */}

      {/*  Total Sales*/}

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
            cardTitle="Total Sales"
            cardValue={8500.9}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="increment"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Net Sales"
            cardValue={6990.9}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="increment"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Total Tax"
            cardValue={425.0}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="increment"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Total Tips"
            cardValue={250.0}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="decrement"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Gratuity"
            cardValue={350.0}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="decrement"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Transactions"
            cardValue={2135}
            isMonetary={false}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="increment"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Discount"
            cardValue={155.5}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="decrement"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Cancelled"
            cardValue={80.0}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="decrement"
            graphType="arrow"
            isPercent={true}
          />
        </div>
      </div>

      {/* Tendor type */}
      {/* <div className="tender-list">
      {tenderData.map((tender, index) => (
        <TenderCard key={index} {...tender} />
      ))}
    </div> */}
      <div>
        <h2 className="sales-overview-sub-heading ">Tendor Type</h2>
      </div>
      <div className="reports-tendor-container">
        <div className="left-section">
          <h3 className="tender-type-sub-heading">Debit card</h3>
          <div className="tender-type-container">
            <TenderType
              icon={<PayTapIcon />}
              tendorTitle="Swipe/Tap/Dip"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
            <TenderType
              icon={<KeyedInIcon />}
              tendorTitle="Keyed In"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
          </div>
          <div className="tender-type-container">
            <h3 className="tender-type-sub-heading">Cash</h3>
            <TenderType
              icon={<CashIcon />}
              tendorTitle="Cash"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
          </div>
          <h3 className="tender-type-sub-heading">Aggregators</h3>
          <div className="tender-type-container">
            <TenderType
              icon={<UberEatsIcon />}
              tendorTitle="UberEats"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
            <TenderType
              icon={<GrubHubIcon />}
              tendorTitle="Grubhub"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
            <TenderType
              icon={<DoordashIcon />}
              tendorTitle="Doordash"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
          </div>
        </div>
        <div className="right-section">
          <h3 className="tender-type-sub-heading">Credit card</h3>
          <div className="tender-type-container">
            <TenderType
              icon={<PayTapIcon />}
              tendorTitle="Swipe/Tap/Dip"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
            <TenderType
              icon={<KeyedInIcon />}
              tendorTitle="Keyed In"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
          </div>

          <h3 className="tender-type-sub-heading">Coupons</h3>
          <div className="tender-type-container">
            <TenderType
              icon={<CouponsIcon />}
              tendorTitle="Coupons"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
            <TenderType
              icon={<GiftCardIcon />}
              tendorTitle="Gift Card"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
          </div>

          <h3 className="tender-type-sub-heading">Digital Payments</h3>
          <div className="tender-type-container">
            <TenderType
              icon={<GooglePayIcon />}
              tendorTitle="Google Pay"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
            <TenderType
              icon={<ApplePayIcon />}
              tendorTitle="Apple Pay"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
            <TenderType
              icon={<OfflineQRIcon />}
              tendorTitle="Offline QR"
              expandable={true}
              amount={2500}
              orders={25}
              percentage={80}
              onPremOrders={15}
              onPremSales={150}
              offPremOrders={10}
              offPremSales={100}
            />
          </div>
        </div>
      </div>

      <h2 className="sales-overview-sub-heading ">By Card Type</h2>
      <CardTypeChart />

      <h2 className="sales-overview-sub-heading ">By Employees</h2>
      <EmployeeSalesChart />

      <h2 className="sales-overview-sub-heading ">By Channel</h2>
      <ChannelSalesChart />

      <div style={{ display: "flex", width: "100%", height: "500px" }}>
        <div className="" style={{ width: "50%", height: "100%" }}>
          <h2 className="sales-overview-sub-heading ">By Discount</h2>
          <DoughnutChartWithButton />
        </div>
        <div className="" style={{ width: "50%", height: "100%" }}>
          <h2 className="sales-overview-sub-heading ">Voided orders</h2>
          <DoughnutChartWithButton />
        </div>
      </div>
      <div>
        <h2 className="sales-overview-sub-heading ">By Revenue class</h2>
        <RevenueClassChart />
      </div>
    </>
  );
};

export default SalesOverview;
