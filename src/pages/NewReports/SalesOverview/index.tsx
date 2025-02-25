import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { billerUnbilledRequest, cancellationSummaryRequest, changeLocation, discountSummaryRequest, hourlySalesReportChartRequest, locationDetailsRequest, offerSummaryRequest, paymentDetailsRequest, salesByChannelRequest, salesByRevenueClassRequest, salesCardTypeRequest, salesCategoryRequest, salesSummaryReportRequest, staffSalesRequest, voidedOrderSummaryRequest } from 'redux/newReports/newReportsActions';
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
import { ReactComponent as ArrowLeft } from "../../../assets/svg/r-arrow-left.svg";

// import TenderType from "components/reportComponents/TendorTypeCard";
import DownloadPopOver from "pages/CategoryReport/downloadOption";
import LinearBarChart from "pages/CategoryReport/barChart";
import DoughnutChart from "pages/CategoryReport/doughnutChart";
import DoughnutChartWithButton from "components/reportComponents/Charts/DoughnutChartButton";
import NewTable from "components/reportComponents/NewTable";
import { NewTableHeader } from "interface/newReportsInterface";

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

interface TenderTypeItem {
  paymentMode: string;
  totalSales: number;
  totalOrders: number;
  type?: string;
  salesPercentage: string;
  cardName?: string | null;
  premises: 'ONPREM' | 'third party' | string;
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
  const [viewType, setViewType] = useState("default")
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPageOfferDiscount, setCurrentPageOfferDiscount] =
  useState<number>(1);
  const [currentRowsOfferDiscount, setCurrentRowsOfferDiscount] =
  useState<number>(10);
  const [currentPageVoiddedOrders, setCurrentPageVoiddedOrders] =
  useState<number>(1);
  const [currentRowsVoiddedOrders, setCurrentRowsVoiddedOrders] =
  useState<number>(10);

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
  const [selectedStore, setSelectedStore] = useState(
    mappedIdWithBranchName?.[0]
  );
  const datepickerApply = (data1: any, data2: any) => {
    console.log(data1, data2, "selected Date is here");
  };

  const [tenderType, setTenderType] = useState<Record<string, TenderTypeItem>>({})
  /******************************************************************************************* */
  const locationId = useSelector((state: any) => state?.auth?.credentials?.locationId)
  const locations = useSelector((state: any) => state?.newReports?.locationDetailsData?.content)
  const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)
  const tendorTypes = useSelector((state: any) => state?.newReports?.paymentDetailsData?.content)
  const salesSummary = useSelector((state: any) => state?.newReports?.salesSummaryReportData)
  const staffSalesData = useSelector((state: any) => state?.newReports?.staffSalesData?.content)
  const salesCardTypeData = useSelector((state: any) => state?.newReports?.salesCardTypeData?.content)
  const salesCategory = useSelector((state: any) => state?.newReports?.salesByItemCategorySuccess)

  const discountSummary = useSelector((state: any) => state?.newReports?.discountSummarySuccess?.content)
  const discountSummaryLoading = useSelector((state: any) => state?.newReports?.discountSummaryLoading)
      const discountSummaryTotalPages = useSelector(
        (state: any) => state?.newReports?.discountSummarySuccess?.totalPages
    );

  const cancellationSummary = useSelector((state: any) => state?.newReports?.cancellationSummarySuccess?.content)
  const cancellationSummaryLoading = useSelector((state: any) => state?.newReports?.cancellationSummaryLoading)
const cancellationSummaryTotalPages = useSelector(
  (state: any) => state?.newReports?.cancellationSummarySuccess?.totalPages
);
  const salesByChannel = useSelector((state: any) => state?.newReports?.salesByChannelData?.content)
  const salesByRevenueClass = useSelector((state: any) => state?.newReports?.salesByRevenueClassSuccess?.content)
  const offerSummary = useSelector((state: any) => state?.newReports?.offerSummaryData?.content)
  const voidedOrderSummary = useSelector((state: any) => state?.newReports?.voidedOrderSummaryData?.content)
  //  const hourlySalesReportChartData=useSelector((state: any) => state?.newReports?.hourlySalesReportChartData)
  const dispatch = useDispatch();
  useEffect(() => {
    console.log({
      selectedLocation,
      tendorTypes,
      salesSummary,
      staffSalesData,
      salesCardTypeData,
      salesCategory,
      discountSummary,
      offerSummary,
      voidedOrderSummary,
      cancellationSummary,
      salesByChannel,
      salesByRevenueClass
      // hourlySalesReportChartData
    })
  }, [selectedLocation, salesSummary, staffSalesData, salesCardTypeData, salesCategory, discountSummary, cancellationSummary, salesByChannel, salesByRevenueClass, offerSummary, voidedOrderSummary])

  useEffect(() => {
    dispatch(locationDetailsRequest({ locationId }))
  }, [locationId])


  useEffect(() => {
    dispatch(changeLocation({ label: locations?.[0], value: locationId }))
  }, [locations])
  /******************************************************************************************* */

  useEffect(() => {
    Promise.all([
      dispatch(paymentDetailsRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
      dispatch(salesSummaryReportRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
      dispatch(staffSalesRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
      dispatch(salesCardTypeRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-01-10", endDate: "2024-01-17" })),
      dispatch(salesCategoryRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
      dispatch(salesByChannelRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
      dispatch(salesByRevenueClassRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
      dispatch(discountSummaryRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
      dispatch(cancellationSummaryRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
      dispatch(offerSummaryRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
      dispatch(voidedOrderSummaryRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" }))
    ])

  }, [selectedLocation])



  const arrayToObject = (arr: TenderTypeItem[] = []) => {
    return arr?.reduce((acc, item) => {
      if (item?.paymentMode === "Online/Key-In" || item?.paymentMode === "Card Swipe") {
        acc[`${item?.paymentMode + "-" + item?.cardType}`] = item;
      } else {
        acc[`${item?.paymentMode}`] = item;

      }
      return acc;
    }, {} as Record<string, TenderTypeItem>);
  }


  useEffect(() => {
    setTenderType(arrayToObject(tendorTypes))
    console.log(111, {}, tendorTypes);

  }, [tendorTypes])


  const handleGoBackToChart = () => {
    setViewType("default");
  }

  const countryCode = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.country
);
  const currencySymbol = countryCode === "US" ? "$" : "₹";

  const newTableHeaders: NewTableHeader[] = [
    { key: "steward", label: `Steward`, isSortable: true, alignment: "left" },
    {
        key: "voidedAmount",
        label: `Voided amount (${currencySymbol})`,
        isSortable: true,
        alignment: "right",
    },
    {
        key: "voidedItems",
        label: `Voided items`,
        isSortable: false,
        alignment: "left",
    },
    {
        key: "voidedReasons",
        label: `Voided reasons`,
        isSortable: false,
        alignment: "left",
    },
];

const handleSearch = (value: string, kpiTitle: string) => {
  switch (viewType) {
      case "discountOffer": 
              dispatch(
                discountSummaryRequest({
                      locationid: selectedLocation?.value,
                      startDate: "2025-01-25",
                      endDate: "2025-02-24",
                      tablePageNo: currentPageOfferDiscount,
                      tableRecordLimit: currentRowsOfferDiscount,
                  })
              );
          break;
          case "voidedOffer": 
          dispatch(
            cancellationSummaryRequest({
                  locationid: selectedLocation?.value,
                  startDate: "2025-01-25",
                  endDate: "2025-02-24",
                  tablePageNo: currentPageVoiddedOrders,
                  tableRecordLimit: currentRowsVoiddedOrders,
                  search:searchQuery,
              })
          );
      break;

      // case 'Live Orders Non Dine-in':
      //   currentDate && dispatch(liveOrderNonDineInRequest({ locationid, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: value }))
      //   break;

      default:
          console.warn(`Unknown KPI title: ${kpiTitle}`);
  }
};

  return (
    <>
      {viewType === "default" ? <>
        {/* Date and Store */}
        <StoreFilter
          storeOptions={locations?.map(((data: any) => ({ label: data, value: locationId })))}
          selectedDate={selectedDate}
          selectedStore={selectedLocation}
          setSelectedDate={setSelectedDate}
          datePickerApplyFunction={datepickerApply}
          setSelectedStore={(store) => dispatch(changeLocation(store))}
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
        <div className="reports-tendor-container">
          <div className="left-section">
            <h3 className="tender-type-sub-heading">Debit card</h3>
            <div className="tender-type-container">
              <TenderType
                icon={<PayTapIcon />}
                tendorTitle="Swipe/Tap/Dip"
                expandable={true}
                amount={tenderType?.["Card Swipe-DEBIT"]?.totalSales || 0}
                orders={tenderType?.["Card Swipe-DEBIT"]?.totalOrders || 0}
                percentage={Number(tenderType?.["Card Swipe-DEBIT"]?.salesPercentage || 0)}
                onPremOrders={tenderType?.["Card Swipe-DEBIT"]?.onPremOrders || 0}
                onPremSales={tenderType?.["Card Swipe-DEBIT"]?.onPremSales || 0}
                offPremOrders={tenderType?.["Card Swipe-DEBIT"]?.offPremOrders || 0}
                offPremSales={tenderType?.["Card Swipe-DEBIT"]?.offPremSales || 0}
              />
              <TenderType
                icon={<KeyedInIcon />}
                tendorTitle="Keyed In"
                expandable={true}
                amount={tenderType?.["Online/Key-In-DEBIT"]?.totalSales || 0}
                orders={tenderType?.["Online/Key-In-DEBIT"]?.totalOrders || 0}
                percentage={Number(tenderType?.["Online/Key-In-DEBIT"]?.salesPercentage || 0)}
                onPremOrders={tenderType?.["Online/Key-In-DEBIT"]?.onPremOrders || 0}
                onPremSales={tenderType?.["Online/Key-In-DEBIT"]?.onPremSales || 0}
                offPremOrders={tenderType?.["Online/Key-In-DEBIT"]?.offPremOrders || 0}
                offPremSales={tenderType?.["Online/Key-In-DEBIT"]?.offPremSales || 0}
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
                amount={tenderType?.["Uber eats"]?.totalSales || 0}
                orders={tenderType?.["Uber eats"]?.totalOrders || 0}
                percentage={Number(tenderType?.["Uber eats"]?.salesPercentage || 0)}
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
                amount={tenderType?.["Card Swipe-CREDIT"]?.totalSales || 0}
                orders={tenderType?.["Card Swipe-CREDIT"]?.totalOrders || 0}
                percentage={Number(tenderType?.["Card Swipe-CREDIT"]?.salesPercentage || 0)}
                onPremOrders={tenderType?.["Card Swipe-CREDIT"]?.onPremOrders || 0}
                onPremSales={tenderType?.["Card Swipe-CREDIT"]?.onPremSales || 0}
                offPremOrders={tenderType?.["Card Swipe-CREDIT"]?.offPremOrders || 0}
                offPremSales={tenderType?.["Card Swipe-CREDIT"]?.offPremSales || 0}
              />
              <TenderType
                icon={<KeyedInIcon />}
                tendorTitle="Keyed In"
                expandable={true}
                amount={tenderType?.["Online/Key-In-CREDIT"]?.totalSales || 0}
                orders={tenderType?.["Online/Key-In-CREDIT"]?.totalOrders || 0}
                percentage={Number(tenderType?.["Online/Key-In-CREDIT"]?.salesPercentage || 0)}
                onPremOrders={tenderType?.["Online/Key-In-CREDIT"]?.onPremOrders || 0}
                onPremSales={tenderType?.["Online/Key-In-CREDIT"]?.onPremSales || 0}
                offPremOrders={tenderType?.["Online/Key-In-CREDIT"]?.offPremOrders || 0}
                offPremSales={tenderType?.["Online/Key-In-CREDIT"]?.offPremSales || 0}
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
        </div>

        <h2 className="sales-overview-sub-heading ">By Card Type</h2>
        <CardTypeChart dataList={salesCardTypeData} />

        <h2 className="sales-overview-sub-heading ">By Employees</h2>
        <EmployeeSalesChart dataList={staffSalesData} />

        <h2 className="sales-overview-sub-heading ">By Channel</h2>
        <ChannelSalesChart dataList={salesByChannel} />

        <div className="sales-overview-doughnut-chart-container">
          <div className="" style={{ width: "50%", height: "100%" }}>
            <h2 className="sales-overview-sub-heading ">By Discount</h2>
            <DoughnutChartWithButton dataList={offerSummary} />
          </div>
          <div className="" style={{ width: "50%", height: "100%" }}>
            <h2 className="sales-overview-sub-heading ">Voided orders</h2>
            {/* <DiscountAndVoidedOrders dataList={offerSummary} /> */}
          </div>
        </div>
        <h2 className="sales-overview-sub-heading ">By Revenue class</h2>
        <RevenueClassChart dataList={salesByRevenueClass} />
      </> : (viewType === "discountOffer" ? (<>

        <div className="void-activity-table-container">
          <div className="void-activity-button-container">
            <button className='back-to-chart-btn' onClick={handleGoBackToChart}><ArrowLeft />Back</button>
          </div>
          <NewTable
            kpiTitle="Employee Void Activity"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            headerData={newTableHeaders}
            tableData={
              discountSummary &&
              discountSummary?.length > 0 &&
              discountSummary
            }
            currentPage={currentPageOfferDiscount}
            totalPages={discountSummaryTotalPages}
            onPageChange={setCurrentPageOfferDiscount}
            rowsPerPage={currentRowsOfferDiscount}
            setRowsPerPage={setCurrentRowsOfferDiscount}
            loader={discountSummaryLoading}
            count={discountSummary?.length}
            searchPlaceHolder="Search By Staff name"
            onSearch={handleSearch}
          />
        </div>
      </>): (
        <div className="void-activity-table-container">
          <div className="void-activity-button-container">
            <button className='back-to-chart-btn' onClick={handleGoBackToChart}><ArrowLeft />Back</button>
          </div>
          <NewTable
            kpiTitle="Employee Void Activity"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            headerData={newTableHeaders}
            tableData={
              cancellationSummary &&
              cancellationSummary?.length > 0 &&
              cancellationSummary
            }
            currentPage={currentPageVoiddedOrders}
            totalPages={cancellationSummaryTotalPages}
            onPageChange={setCurrentPageVoiddedOrders}
            rowsPerPage={currentRowsVoiddedOrders}
            setRowsPerPage={setCurrentRowsVoiddedOrders}
            loader={cancellationSummaryLoading}
            count={cancellationSummary?.length}
            searchPlaceHolder="Search By Staff name"
            onSearch={handleSearch}
          />
        </div>))}
    </>
  );
};

export default SalesOverview;
