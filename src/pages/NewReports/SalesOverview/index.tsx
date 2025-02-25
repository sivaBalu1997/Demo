import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { billerUnbilledRequest, cancellationSummaryRequest, changeLocation, discountSummaryRequest, hourlySalesReportChartRequest, locationDetailsRequest, paymentDetailsRequest, salesCardTypeRequest, salesCategoryRequest, salesSummaryReportRequest, staffSalesRequest } from 'redux/newReports/newReportsActions';
import ReportsNotFound from "components/reportComponents/ReportsNotFound";
// import SalesCard from "components/reportComponents/SalesCard";
import TenderType from "components/reportComponents/TendorTypeCard";
import CardTypeChart from "components/reportComponents/chart";
import EmployeeSalesChart from "components/reportComponents/chart/chartEmployees";
import DiscountAndVoidedOrders from "components/reportComponents/chart/DiscountAndVoidedOrders";
import ChannelSalesChart from "components/reportComponents/chart/channelChart";
import RevenueClassChart from "components/reportComponents/chart/RevenueClassChart";
import StoreFilter from "components/reportComponents/StoreFilter";
import "./SalesOverview.scss";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
// import TenderCard from "components/reportComponents/TendorTypeCard/TendorCard";

// import { ReactComponent as ArrowDown } from "../../../assets/svg/arrow-down.svg";
// import { ReactComponent as ArrowUp } from "../../../assets/svg/arrow-down.svg";
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

const tabs = [
  "Today's report",
  "Sales Overview",
  "Categories",
  "Employees",
  "Trends",
];
interface ReportProps {}

interface TenderTypeItem {
  paymentMode:string;
  totalSales: number;
  totalOrders: number;
  type?: string;
  salesPercentage: string;
  cardName?: string | null;
  premises: 'ONPREM'|'third party'| string;
  cardType?: string | null;
  onPremOrders?: number;
  onPremSales?: number;
  offPremOrders?: number;
  offPremSales?: number;
}

const SalesOverview: React.FC<ReportProps> = () => {
  const restaurantDetails = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.branch
  );

  const mappedIdWithBranchName = restaurantDetails?.map(
    (branchWithId: any) => ({
      value: branchWithId?.id,
      label: branchWithId?.locationName,
    })
  );

  const [selectedDate, setSelectedDate] = useState({
    label: "Yesterday",
    value: "Yesterday",
  });

  const datepickerApply = (data1: any, data2: any) => {
    console.log(data1, data2, "selected Date is here");
  };
  
  const [tenderType, setTenderType] = useState<Record<string, TenderTypeItem>>({})
/******************************************************************************************* */
   const locationId = useSelector((state: any) => state?.auth?.credentials?.locationId)
   const locations=useSelector((state: any) => state?.newReports?.locationDetailsData?.content)
       const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)
       const tendorTypes = useSelector((state: any) => state?.newReports?.paymentDetailsData)
       const salesSummary=useSelector((state: any) => state?.newReports?.salesSummaryReportData)
       const staffSalesData=useSelector((state: any) => state?.newReports?.staffSalesData)
      const salesCardTypeData=useSelector((state: any) => state?.newReports?.salesCardTypeData)
       const salesCategory=useSelector((state: any) => state?.newReports?.salesByItemCategorySuccess)

       const discountSummary=useSelector((state: any) => state?.newReports?.discountSummarySuccess)

       const cancellationSummary=useSelector((state: any) => state?.newReports?.cancellationSummarySuccess)
 const hourlySalesReportChartData=useSelector((state: any) => state?.newReports?.hourlySalesReportChartData)
       const dispatch = useDispatch();
       useEffect(() => {
console.log({
  selectedLocation,
  tendorTypes,
  salesSummary,
  staffSalesData,
  salesCardTypeData,
  salesCategory ,
  discountSummary,
  cancellationSummary,
  hourlySalesReportChartData
})
    }, [selectedLocation,tendorTypes,salesSummary,staffSalesData,salesCardTypeData,salesCategory , discountSummary,cancellationSummary,hourlySalesReportChartData])

    useEffect(() => {
        dispatch(locationDetailsRequest({ locationId }))
    }, [locationId])


    useEffect(() => {
      dispatch(changeLocation({label:locations?.[0],value:locationId }))
  }, [locations])
  /******************************************************************************************* */
  
       useEffect(() => {
        Promise.all([
          dispatch(paymentDetailsRequest({ locationid :selectedLocation?.value,tableRecordLimit:100,tablePageNo:1,startDate:"2024-12-01" , endDate:"2024-12-31"})),
          dispatch(salesSummaryReportRequest({ locationid :selectedLocation?.value,tableRecordLimit:100,tablePageNo:1 ,startDate:"2024-12-01" , endDate:"2024-12-31"})),
          dispatch(staffSalesRequest({ locationid :selectedLocation?.value,tableRecordLimit:100,tablePageNo:1 ,startDate:"2024-12-01" , endDate:"2024-12-31"})),
          dispatch(salesCardTypeRequest({ locationid :selectedLocation?.value,tableRecordLimit:100,tablePageNo:1,startDate:"2024-12-01" , endDate:"2024-12-31"})),
          dispatch(salesCategoryRequest({ locationid :selectedLocation?.value,tableRecordLimit:100,tablePageNo:1,startDate:"2024-12-01" , endDate:"2024-12-31"})),
          dispatch(discountSummaryRequest({ locationid :selectedLocation?.value,tableRecordLimit:100,tablePageNo:1,startDate:"2024-12-01" , endDate:"2024-12-31"})),
          dispatch(cancellationSummaryRequest({ locationid :selectedLocation?.value,tableRecordLimit:100,tablePageNo:1,startDate:"2024-12-01" , endDate:"2024-12-31"}))
        ])

    }, [selectedLocation])



    const arrayToObject = (arr: TenderTypeItem[]=[]) => {
      return arr?.reduce((acc, item) => {
        acc[`${item?.paymentMode}`] = item;
        return acc;
      }, {} as Record<string, TenderTypeItem>);
    }


    useEffect(() => {
      setTenderType(arrayToObject(tendorTypes))
      console.log(arrayToObject(tendorTypes),tendorTypes);
      
  }, [tendorTypes])



  return (
    <>
      {/* Date and Store */}
      <StoreFilter
      storeOptions={locations?.map(((data:any)=>({label:data,value:locationId })))}
        selectedDate={selectedDate}
        selectedStore={selectedLocation}
        setSelectedDate={setSelectedDate}
        datePickerApplyFunction={datepickerApply}
        setSelectedStore={(store)=>dispatch(changeLocation(store))}
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
            cardValue={salesSummary?.totalMagilSales}
            incrementDecrementValue={salesSummary?.totalSalesPercentage}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="increment"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Net Sales"
            cardValue={salesSummary?.totalMagilNetSales}
            incrementDecrementValue={salesSummary?.netSalesPercentage}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="increment"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Total Tax"
            cardValue={salesSummary?.totalMagilTax}
            incrementDecrementValue={salesSummary?.totalTaxPercentage}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="increment"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Total Tips"
            cardValue={salesSummary?.totalMagilTips}
            incrementDecrementValue={salesSummary?.totalTipsPercentage}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="decrement"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Gratuity"
            cardValue={salesSummary?.gratuity}
            incrementDecrementValue={salesSummary?.gratuityPercentage}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="decrement"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Transactions"
            cardValue={salesSummary?.totalMagilOrders}
            incrementDecrementValue={salesSummary?.transactionPercentage}
            isMonetary={false}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="increment"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Discount"
            cardValue={salesSummary?.discounts}
            incrementDecrementValue={salesSummary?.discountPercentage}
            isMonetary={true}
            loader={false}
            showMiniGraph={true}
            incrementOrDecrement="decrement"
            graphType="arrow"
            isPercent={true}
          />
          <CardWithMiniGraph
            cardTitle="Cancelled"
            cardValue={salesSummary?.cancelledOrders}
            incrementDecrementValue={salesSummary?.cancelledPercentage}
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

      <div>
        <h2 className="sales-overview-sub-heading ">Tendor Type</h2>
      </div>
      {/* <div className="reports-tendor-container">
        <div className="left-section">
          <h3 className="tender-type-sub-heading">Debit card</h3>
          <div className="tender-type-container">
            <TenderType
              icon={<PayTapIcon />}
              tendorTitle="Swipe/Tap/Dip"
              expandable={true}
              amount={tenderType?.["Swipe/Tap/Dip"]?.totalSales || 0}
              orders={tenderType?.["Swipe/Tap/Dip"]?.totalOrders || 0}
              percentage={Number(tenderType?.["Swipe/Tap/Dip"]?.salesPercentage || 0)}
              onPremOrders={tenderType?.["Swipe/Tap/Dip"]?.onPremOrders || 0}
              onPremSales={tenderType?.["Swipe/Tap/Dip"]?.onPremSales || 0}
              offPremOrders={tenderType?.["Swipe/Tap/Dip"]?.offPremOrders || 0}
              offPremSales={tenderType?.["Swipe/Tap/Dip"]?.offPremSales || 0}
            />
            <TenderType
              icon={<KeyedInIcon />}
              tendorTitle="Keyed In"
              expandable={true}
              amount={tenderType?.["Keyed In"]?.totalSales || 0}
              orders={tenderType?.["Keyed In"]?.totalOrders || 0}
              percentage={Number(tenderType?.["Keyed In"]?.salesPercentage || 0)}
              onPremOrders={tenderType?.["Keyed In"]?.onPremOrders || 0}
              onPremSales={tenderType?.["Keyed In"]?.onPremSales || 0}
              offPremOrders={tenderType?.["Keyed In"]?.offPremOrders || 0}
              offPremSales={tenderType?.["Keyed In"]?.offPremSales || 0}
            />
          </div>
          <div className="tender-type-container">
            <h3 className="tender-type-sub-heading">Cash</h3>
            <TenderType
              icon={<CashIcon />}
              tendorTitle="Cash"
              amount={tenderType?.["CASH"]?.totalSales || 0}
              orders={tenderType?.["CASH"]?.totalOrders || 0}
              percentage={Number(tenderType?.["CASH"]?.salesPercentage || 0)}
             />
          </div>
          <h3 className="tender-type-sub-heading">Aggregators</h3>
          <div className="tender-type-container">
            <TenderType
              icon={<UberEatsIcon />}
              tendorTitle="UberEats"
              amount={tenderType?.["UberEats"]?.totalSales || 0}
              orders={tenderType?.["UberEats"]?.totalOrders || 0}
              percentage={Number(tenderType?.["UberEats"]?.salesPercentage || 0)}
            />
            <TenderType
              icon={<GrubHubIcon />}
              tendorTitle="Grubhub"
              amount={tenderType?.["Grubhub"]?.totalSales || 0}
              orders={tenderType?.["Grubhub"]?.totalOrders || 0}
              percentage={Number(tenderType?.["Grubhub"]?.salesPercentage || 0)}
            />
            <TenderType
              icon={<DoordashIcon />}
              tendorTitle="Doordash"
              amount={tenderType?.["Doordash"]?.totalSales || 0}
              orders={tenderType?.["Doordash"]?.totalOrders || 0}
              percentage={Number(tenderType?.["Doordash"]?.salesPercentage || 0)}
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
              amount={tenderType?.["Swipe/Tap/Dip"]?.totalSales || 0}
              orders={tenderType?.["Swipe/Tap/Dip"]?.totalOrders || 0}
              percentage={Number(tenderType?.["Swipe/Tap/Dip"]?.salesPercentage || 0)}
              onPremOrders={tenderType?.["Swipe/Tap/Dip"]?.onPremOrders || 0}
              onPremSales={tenderType?.["Swipe/Tap/Dip"]?.onPremSales || 0}
              offPremOrders={tenderType?.["Swipe/Tap/Dip"]?.offPremOrders || 0}
              offPremSales={tenderType?.["Swipe/Tap/Dip"]?.offPremSales || 0}
            />
            <TenderType
              icon={<KeyedInIcon />}
              tendorTitle="Keyed In"
              expandable={true}
              amount={tenderType?.["Keyed In"]?.totalSales || 0}
              orders={tenderType?.["Keyed In"]?.totalOrders || 0}
              percentage={Number(tenderType?.["Keyed In"]?.salesPercentage || 0)}
              onPremOrders={tenderType?.["Keyed In"]?.onPremOrders || 0}
              onPremSales={tenderType?.["Keyed In"]?.onPremSales || 0}
              offPremOrders={tenderType?.["Keyed In"]?.offPremOrders || 0}
              offPremSales={tenderType?.["Keyed In"]?.offPremSales || 0}
            />
          </div>

          <h3 className="tender-type-sub-heading">Coupons</h3>
          <div className="tender-type-container">
            <TenderType
              icon={<CouponsIcon />}
              tendorTitle="Coupons"
              amount={tenderType?.["Coupons"]?.totalSales || 0}
              orders={tenderType?.["Coupons"]?.totalOrders || 0}
              percentage={Number(tenderType?.["Coupons"]?.salesPercentage || 0)}

            />
            <TenderType
              icon={<GiftCardIcon />}
              tendorTitle="Gift Card"
              amount={tenderType?.["Gift Card"]?.totalSales || 0}
              orders={tenderType?.["Gift Card"]?.totalOrders || 0}
              percentage={Number(tenderType?.["Gift Card"]?.salesPercentage || 0)}
            />
          </div>

          <h3 className="tender-type-sub-heading">Digital Payments</h3>
          <div className="tender-type-container">
            <TenderType
              icon={<GooglePayIcon />}
              tendorTitle="Google Pay"
              amount={tenderType?.["Google Pay"]?.totalSales || 0}
              orders={tenderType?.["Google Pay"]?.totalOrders || 0}
              percentage={Number(tenderType?.["Google Pay"]?.salesPercentage || 0)}
            />
            <TenderType
              icon={<ApplePayIcon />}
              tendorTitle="Apple Pay"
              amount={tenderType?.["Apple Pay"]?.totalSales || 0}
              orders={tenderType?.["Apple Pay"]?.totalOrders || 0}
              percentage={Number(tenderType?.["Apple Pay"]?.salesPercentage || 0)}
            />
            <TenderType
              icon={<OfflineQRIcon />}
              tendorTitle="Offline QR"
              amount={tenderType?.["OFFLINE_QR"]?.totalSales || 0}
              orders={tenderType?.["OFFLINE_QR"]?.totalOrders || 0}
              percentage={Number(tenderType?.["OFFLINE_QR"]?.salesPercentage || 0)}
            />
          </div>
        </div>
      </div> */}

      {/* <h2 className="sales-overview-sub-heading ">By Card Type</h2>
      <CardTypeChart dataList={salesCardTypeData} />

      <h2 className="sales-overview-sub-heading ">By Employees</h2>
      <EmployeeSalesChart dataList={staffSalesData} />

      <h2 className="sales-overview-sub-heading ">By Channel</h2>
      <ChannelSalesChart  dataList={staffSalesData} />

      <div className="sales-overview-doughnut-chart-container">
        <div className="" style={{ width: "50%", height: "100%" }}>
          <h2 className="sales-overview-sub-heading ">By Discount</h2>
          <DoughnutChartWithButton />
          // <DiscountAndVoidedOrders dataList={discountSummary} />
        </div>
        <div className="" style={{ width: "50%", height: "100%" }}>
          <h2 className="sales-overview-sub-heading ">Voided orders</h2>
          <DiscountAndVoidedOrders dataList={cancellationSummary} />
        </div>
      </div>
      <h2 className="sales-overview-sub-heading ">By Revenue class</h2>
      <RevenueClassChart dataList={hourlySalesReportChartData} /> */}
    </>
  );
};

export default SalesOverview;
