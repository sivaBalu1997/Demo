import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancellationSummaryRequest,
  changeLocation,
  discountSummaryRequest,
  offerSummaryRequest,
  paymentDetailsRequest,
  salesByChannelRequest,
  salesByRevenueClassRequest,
  salesCardTypeRequest,
  salesCategoryRequest,
  salesSummaryReportRequest,
  staffSalesRequest,
  voidedOrderSummaryRequest,
} from "redux/newReports/newReportsActions";
import ReportsNotFound from "components/reportComponents/ReportsNotFound";
import TenderType from "components/reportComponents/TendorTypeCard";
import CardTypeChart from "components/reportComponents/chart";
import EmployeeSalesChart from "components/reportComponents/chart/chartEmployees";
import ChannelSalesChart from "components/reportComponents/chart/channelChart";
import RevenueClassChart from "components/reportComponents/chart/RevenueClassChart";
import StoreFilter from "components/reportComponents/StoreFilter";
import "./SalesOverview.scss";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";

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
// import DownloadPopOver from "pages/CategoryReport/downloadOption";
// import LinearBarChart from "pages/CategoryReport/barChart";
// import DoughnutChart from "pages/CategoryReport/doughnutChart";
import DoughnutChartWithButton from "components/reportComponents/Charts/DoughnutChartButton";
import NewTable from "components/reportComponents/NewTable";
import { NewTableHeader } from "interface/newReportsInterface";
import DoughnutChartWithButtonVoided from "components/reportComponents/Charts/DoughnutChartButtonVoided";
import useDateFilter from "hooks/useDateFilter";
import { transformSalesData } from "utils";
// import { useSalesOverview } from "./useSalessOverview";

interface ReportProps { }



interface TenderTypeItem {
  paymentMode: string;
  totalSales: number;
  totalOrders: number;
  type?: string;
  salesPercentage: string;
  cardName?: string | null;
  premises: "ONPREM" | "third party" | string;
  cardType?: string | null;
  onPremOrders?: number;
  onPremSales?: number;
  offPremOrders?: number;
  offPremSales?: number;

}


type TenderItem = {
  totalSales: number;
  totalOrders: number;
  onPremiseSales: number;
  onPremiseOrders: number;
  offPremiseSales: number;
  offPremiseOrders: number;
  salesPercentage: number;
};

type GroupedData = {
  debit: Record<string, TenderItem>;
  credit: Record<string, TenderItem>;
  cash: Record<string, TenderItem>[];
  aggregators: Record<string, TenderItem>[];
  coupons: Record<string, TenderItem>[];
  digitalPayments: Record<string, TenderItem>[];
  others: Record<string, TenderItem>[];
};


const SalesOverview: React.FC<ReportProps> = ({ }) => {
  const [offerType, setOfferType] = useState<string>("");
  const [viewType, setViewType] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPageOfferDiscount, setCurrentPageOfferDiscount] =
    useState<number>(1);
  const [currentRowsOfferDiscount, setCurrentRowsOfferDiscount] =
    useState<number>(10);
  const [currentPageVoiddedOrders, setCurrentPageVoiddedOrders] =
    useState<number>(1);
  const [currentRowsVoiddedOrders, setCurrentRowsVoiddedOrders] =
    useState<number>(10);

  const { startDate, endDate, handleDateChange } = useDateFilter();

  const [selectedDate, setSelectedDate] = useState({
    label: "Yesterday",
    value: "Yesterday",
  });

  const datepickerApply = (data1: any, data2: any) => {
    handleDateChange("Custom Date", data1, data2);
  };

  const [tenderType, setTenderType] = useState<Record<string, TenderTypeItem>>(
    {}
  );
  /******************************************************************************************* */
  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );
  const tendorTypes = useSelector(
    (state: any) => state?.newReports?.paymentDetailsData
  );

  const tendorTypesLoader = useSelector(
    (state: any) => state?.newReports?.paymentDetailsLoading
  );

  const salesSummary = useSelector(
    (state: any) => state?.newReports?.salesSummaryReportData
  );
  const salesSummaryLoader = useSelector(
    (state: any) => state?.newReports?.salesSummaryReportLoading
  );
  const staffSalesData = useSelector(
    (state: any) => state?.newReports?.staffSalesData?.content
  );

  const staffSalesLoading = useSelector(
    (state: any) => state?.newReports?.staffSalesLoading
  );

  const salesCardTypeData = useSelector(
    (state: any) => state?.newReports?.salesCardTypeData?.content
  );

  const salesCardTypeDataLoading = useSelector(
    (state: any) => state?.newReports?.salesCardTypeLoading
  );

  const salesCategory = useSelector(
    (state: any) => state?.newReports?.salesByItemCategorySuccess
  );

  const discountSummary = useSelector(
    (state: any) => state?.newReports?.discountSummarySuccess?.content
  );
  const discountSummaryLoading = useSelector(
    (state: any) => state?.newReports?.discountSummaryLoading
  );
  const discountSummaryTotalPages = useSelector(
    (state: any) => state?.newReports?.discountSummarySuccess?.totalPages
  );

  const cancellationSummary = useSelector(
    (state: any) => state?.newReports?.cancellationSummarySuccess?.content
  );
  const cancellationSummaryLoading = useSelector(
    (state: any) => state?.newReports?.cancellationSummaryLoading
  );
  const cancellationSummaryTotalPages = useSelector(
    (state: any) => state?.newReports?.cancellationSummarySuccess?.totalPages
  );
  const salesByChannel = useSelector(
    (state: any) => state?.newReports?.salesByChannelData?.content
  );

  const salesByChannelLoading = useSelector(
    (state: any) => state?.newReports?.salesByChannelLoading
  );

  const salesByRevenueClass = useSelector(
    (state: any) => state?.newReports?.salesByRevenueClassSuccess?.content
  );

  const salesByRevenueClassLoading = useSelector(
    (state: any) => state?.newReports?.salesByRevenueClassLoading
  );

  const offerSummary = useSelector(
    (state: any) => state?.newReports?.offerSummaryData?.content
  );

  const offerSummaryLoading = useSelector(
    (state: any) => state?.newReports?.offerSummaryLoading
  );

  const voidedOrderSummary = useSelector(
    (state: any) => state?.newReports?.voidedOrderSummaryData?.content
  );

  const voidedOrderSummaryLoader = useSelector(
    (state: any) => state?.newReports?.voidedOrderSummaryLoading
  );

  const getPremisesSummary = useSelector(
    (state: any) => state?.newReports?.premisesSummaryData?.content
  );

  //  const hourlySalesReportChartData=useSelector((state: any) => state?.newReports?.hourlySalesReportChartData)
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("use", {
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
      salesByRevenueClass,
      // hourlySalesReportChartData
    });
  }, [
    selectedLocation,
    salesSummary,
    staffSalesData,
    salesCardTypeData,
    salesCategory,
    discountSummary,
    cancellationSummary,
    salesByChannel,
    salesByRevenueClass,
    offerSummary,
    voidedOrderSummary,
  ])
  /******************************************************************************************* */

  useEffect(() => {
    Promise.all([
      dispatch(
        paymentDetailsRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesSummaryReportRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        staffSalesRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesCardTypeRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesCategoryRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesByChannelRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        salesByRevenueClassRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        discountSummaryRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        cancellationSummaryRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        offerSummaryRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
      dispatch(
        voidedOrderSummaryRequest({
          locationid: selectedLocation?.value,
          tableRecordLimit: 100,
          tablePageNo: 1,
          startDate: startDate,
          endDate: endDate,
        })
      ),
    ]);
  }, [selectedLocation, startDate, endDate]);



  const handleGoBackToChart = () => {
    setViewType("default");
  };

  const countryCode = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.country
  );

  const discountTableHeaders: NewTableHeader[] = [
    {
      key: "orderNo",
      label: `Order number`,
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderType",
      label: `Order type`,
      isSortable: true,
      alignment: "left",
    },
    {
      key: "stew",
      label: `Staff name`,
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderTotal",
      label: `Order Total`,
      isSortable: true,
      alignment: "right",
    },
    {
      key: "discountAmount",
      label: `Discounted amount`,
      isSortable: true,
      alignment: "right",
    },
  ];
  const voidedTableHeaders: NewTableHeader[] = [
    {
      key: "orderNo",
      label: `Order number`,
      isSortable: true,
      alignment: "left",
    },
    {
      key: "orderType",
      label: `Order type`,
      isSortable: true,
      alignment: "left",
    },
    {
      key: "itemName",
      label: `Item name`,
      isSortable: true,
      alignment: "left",
    },
    {
      key: "steward",
      label: `Staff name`,
      isSortable: true,
      alignment: "left",
    },
    {
      key: "refundedQuantity",
      label: `Quantity`,
      isSortable: true,
      alignment: "right",
    },
    {
      key: "amount",
      label: `Refunded amount`,
      isSortable: true,
      alignment: "right",
    },
  ];


  const handleSearch = (value: string, kpiTitle: string) => {
    switch (viewType) {
      case "discountOffer":
        dispatch(
          discountSummaryRequest({
            locationid: selectedLocation?.value,
            startDate: startDate,
            endDate: endDate,
            tablePageNo: currentPageOfferDiscount,
            tableRecordLimit: currentRowsOfferDiscount,
            search: value,
          })
        );
        break;
      case "voidedOffer":
        dispatch(
          cancellationSummaryRequest({
            locationid: selectedLocation?.value,
            startDate: startDate,
            endDate: endDate,
            tablePageNo: currentPageVoiddedOrders,
            tableRecordLimit: currentRowsVoiddedOrders,
            search: searchQuery,
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



  const handleSummaryView = (view: string, data: any) => {
    setViewType(view);
    setOfferType(data?.label);
  }

  //   {
  // "paymentMode": "CASH",
  // "totalSales": 88819.93,
  // "totalOrders": 527,
  // "type": "maghil",
  // "salesPercentage": "65.91",
  // "cardName": null,
  // "premises": "ONPREM",
  // "cardType": null,
  // "wholeTotalSales": 0,
  // "wholeTotalOrders": 0
  // },

  const groupedData: any = useMemo(() => {
    const tendorGroups: any = {
      "Debit card": [],
      "Credit card": [],
      "Cash": [],
      "Aggregator": [],
      "Coupon": [],
      "Digital payment": [],
      "Others": []
    }

    const tempdataObj: any = {}
    tendorTypes?.forEach((item: any) => {
      let key = tempdataObj[`${item?.paymentMode}-${item?.cardType}`] || {
        onPremiseSales: 0,
        onPremiseOrders: 0,
        offPremiseSales: 0,
        offPremiseOrders: 0,
        paymentMode: item?.paymentMode,
        totalSales: Number(item?.totalSales || 0),
        totalOrders: Number(item?.totalOrders || 0),
        salesPercentage: 0,
        cardName: item?.cardName,
        cardType: item?.cardType,
        isExpandable: false
      };
      if (item?.cardType && key) {
        key.isExpandable = true
          if (item?.premises === "ONPREM") {
            key.onPremiseSales += Number(item?.totalSales || 0)
            key.onPremiseOrders += Number(item?.totalOrders || 0)
          } else if (item?.premises === "OFFPREM") {
            key.offPremiseSales += Number(item?.totalSales || 0)
            key.offPremiseOrders += Number(item?.totalOrders || 0)
          }
          key.totalSales = Number(item?.wholeTotalSales || 0)
          key.totalOrders = Number(item?.wholeTotalOrders || 0)
          key.salesPercentage += Number(item?.salesPercentage || 0)
      
      }else{
        key.salesPercentage=Number(item?.salesPercentage || 0)
      }
      tempdataObj[`${item?.paymentMode}-${item?.cardType}`] = key
    })

    console.log({ tempdataObj });


    Object.entries(tempdataObj)?.forEach(([itemkey, value]: [string, any]) => {
      const parts = itemkey.split("-");
      const cardType = parts.pop() || ""; // Extract the last element (credit/debit)
      const key = parts.join("-");
      if (["Swipe/Tap/Dip", "Card Swipe"]?.includes(key)) {
        if (cardType === "CREDIT") {
          tendorGroups["Credit card"].push(value)
        } else if (cardType === "DEBIT") { tendorGroups["Debit card"].push(value) }

      } else if (["Keyed In", "Online/Key-In"]?.includes(key)) {
        if (cardType === "CREDIT") {
          tendorGroups["Credit card"].push(value)
        } else if (cardType === "DEBIT") { tendorGroups["Debit card"].push(value) }

      } else if (["CASH"]?.includes(key)) {
        tendorGroups["Cash"].push(value)
      } else if (["Doordash", "Swiggy", "Grubhub", "Zomato"]?.includes(key)) {
        tendorGroups["Aggregator"].push(value)
      } else if (["Coupon"]?.includes(key)) {
        tendorGroups["Coupon"].push(value)
      } else if (["Digital payment", "OFFLINE_QR"]?.includes(key)) {
        tendorGroups["Digital payment"].push(value)
      } else {
        tendorGroups["Others"].push(value)
      }
    })

    console.log({ tendorGroups });

    return tendorGroups;
  }, [tendorTypes]);


  console.log({ groupedData });

const knownTendorIcons:any={
  "Swipe/Tap/Dip":<PayTapIcon />,
  "Keyed In":<KeyedInIcon />,
  "Cash":<CashIcon />,
  "UberEats":<UberEatsIcon />,
  "Grubhub":<GrubHubIcon />,
  "Doordash":<DoordashIcon />,
  "Coupons":<CouponsIcon />,
  "Gift Card":<GiftCardIcon />,
"Google Pay":<GooglePayIcon />,
"Apple Pay":<ApplePayIcon />,
"Offline QR":<OfflineQRIcon />

}



  return (
    <>
      {viewType === "default" ? (
        <>
          {/* Date and Store */}
          <StoreFilter
            storeOptions={locations}
            selectedDate={selectedDate}
            selectedStore={selectedLocation}
            setSelectedDate={setSelectedDate}
            datePickerApplyFunction={datepickerApply}
            dateDropdownFunction={datepickerApply}
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
                  The graph shows the percentage compared to the previous day.
                  If you select this week, the comparison chart will display
                  last week's data
                </div>
              </div>
            </div>


            <div className="todays-report-sales-overview-box-container">
              <CardWithMiniGraph
                cardTitle="Total Sales"
                cardValue={salesSummary?.totalMagilSales}
                incrementDecrementValue={salesSummary?.totalSalesPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(salesSummary?.totalSalesPercentage)}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Net Sales"
                cardValue={salesSummary?.totalMagilNetSales}
                incrementDecrementValue={salesSummary?.netSalesPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(salesSummary?.netSalesPercentage)}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Total Tax"
                cardValue={salesSummary?.totalMagilTax}
                incrementDecrementValue={salesSummary?.totalTaxPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={salesSummary?.totalTaxPercentage !== "0.00" && salesSummary?.totalTaxPercentage !== 0}
                incrementOrDecrement={transformSalesData(salesSummary?.totalTaxPercentage)}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Total Tips"
                cardValue={salesSummary?.totalMagilTips}
                incrementDecrementValue={salesSummary?.totalTipsPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(salesSummary?.totalTipsPercentage)}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Gratuity"
                cardValue={salesSummary?.gratuity}
                incrementDecrementValue={salesSummary?.gratuityPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(salesSummary?.gratuityPercentage)}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Transactions"
                cardValue={salesSummary?.totalMagilOrders}
                incrementDecrementValue={salesSummary?.transactionPercentage}
                isMonetary={false}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(salesSummary?.transactionPercentage)}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Discount"
                cardValue={salesSummary?.discounts}
                incrementDecrementValue={salesSummary?.discountPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(salesSummary?.discountPercentage)}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Cancelled"
                cardValue={salesSummary?.cancelledOrders}
                incrementDecrementValue={salesSummary?.cancelledPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(salesSummary?.cancelledPercentage)}
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
            {
              Object?.entries(groupedData || {})?.map(([key, value]) => (
                <>
                  {(!Array.isArray(value) || !value?.length) ? null :
                    <div className="left-section">
                      <h3 className="tender-type-sub-heading">{key}</h3>
                      <div className="tender-type-container">
                        {Array.isArray(value) && value.map((item: any, index: number) => (
                                              <TenderType
                              icon={knownTendorIcons?.[item?.paymentMode]||<KeyedInIcon />}
                              key={index}
                              tendorTitle={item?.paymentMode}
                              expandable={item?.isExpandable}
                              amount={item?.totalSales || 0}
                              orders={item?.totalOrders || 0}
                              percentage={Number(
                                item?.salesPercentage || 0
                              )}
                              onPremOrders={
                                item?.onPremiseOrders || 0
                              }
                              onPremSales={
                                item?.onPremiseSales || 0
                              }
                              offPremOrders={
                                item?.offPremiseOrders || 0
                              }
                              offPremSales={
                                item?.offPremiseSales || 0
                              }
                              loader={tendorTypesLoader}
                            />
             
                        ))}

                      </div>
                    </div>
                  }
                </>
              ))
            }
          </div>




          {/* <div className="reports-tendor-container">
            <div className="left-section">
              <h3 className="tender-type-sub-heading">Debit card</h3>
              <div className="tender-type-container">
                <TenderType
                  icon={<PayTapIcon />}
                  tendorTitle="Swipe/Tap/Dip"
                  expandable={true}
                  amount={tenderType?.["Card Swipe-DEBIT"]?.totalSales || 0}
                  orders={tenderType?.["Card Swipe-DEBIT"]?.totalOrders || 0}
                  percentage={Number(
                    tenderType?.["Card Swipe-DEBIT"]?.salesPercentage || 0
                  )}
                  onPremOrders={
                    tenderType?.["Card Swipe-DEBIT"]?.onPremOrders || 0
                  }
                  onPremSales={
                    tenderType?.["Card Swipe-DEBIT"]?.onPremSales || 0
                  }
                  offPremOrders={
                    tenderType?.["Card Swipe-DEBIT"]?.offPremOrders || 0
                  }
                  offPremSales={
                    tenderType?.["Card Swipe-DEBIT"]?.offPremSales || 0
                  }
                  loader={tendorTypesLoader}
                // loader={true}
                />
                <TenderType
                  icon={<KeyedInIcon />}
                  tendorTitle="Keyed In"
                  expandable={true}
                  amount={tenderType?.["Online/Key-In-DEBIT"]?.totalSales || 0}
                  orders={tenderType?.["Online/Key-In-DEBIT"]?.totalOrders || 0}
                  percentage={Number(
                    tenderType?.["Online/Key-In-DEBIT"]?.salesPercentage || 0
                  )}
                  onPremOrders={
                    tenderType?.["Online/Key-In-DEBIT"]?.onPremOrders || 0
                  }
                  onPremSales={
                    tenderType?.["Online/Key-In-DEBIT"]?.onPremSales || 0
                  }
                  offPremOrders={
                    tenderType?.["Online/Key-In-DEBIT"]?.offPremOrders || 0
                  }
                  offPremSales={
                    tenderType?.["Online/Key-In-DEBIT"]?.offPremSales || 0
                  }
                  loader={tendorTypesLoader}
                />
              </div>
              <div className="tender-type-container">
                <h3 className="tender-type-sub-heading">Cash</h3>
                <TenderType
                  icon={<CashIcon />}
                  tendorTitle="Cash"
                  amount={tenderType?.["CASH"]?.totalSales || 0}
                  orders={tenderType?.["CASH"]?.totalOrders || 0}
                  percentage={Number(
                    tenderType?.["CASH"]?.salesPercentage || 0
                  )}
                  loader={tendorTypesLoader}
                />
              </div>
              <h3 className="tender-type-sub-heading">Aggregators</h3>
              <div className="tender-type-container">
                <TenderType
                  icon={<UberEatsIcon />}
                  tendorTitle="UberEats"
                  amount={tenderType?.["Uber eats"]?.totalSales || 0}
                  orders={tenderType?.["Uber eats"]?.totalOrders || 0}
                  percentage={Number(
                    tenderType?.["Uber eats"]?.salesPercentage || 0
                  )}
                  loader={tendorTypesLoader}
                />
                <TenderType
                  icon={<GrubHubIcon />}
                  tendorTitle="Grubhub"
                  amount={tenderType?.["Grubhub"]?.totalSales || 0}
                  orders={tenderType?.["Grubhub"]?.totalOrders || 0}
                  percentage={Number(
                    tenderType?.["Grubhub"]?.salesPercentage || 0
                  )}
                  loader={tendorTypesLoader}
                />
                <TenderType
                  icon={<DoordashIcon />}
                  tendorTitle="Doordash"
                  amount={tenderType?.["Doordash"]?.totalSales || 0}
                  orders={tenderType?.["Doordash"]?.totalOrders || 0}
                  percentage={Number(
                    tenderType?.["Doordash"]?.salesPercentage || 0
                  )}
                  loader={tendorTypesLoader}
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
                  percentage={Number(
                    tenderType?.["Card Swipe-CREDIT"]?.salesPercentage || 0
                  )}
                  onPremOrders={
                    tenderType?.["Card Swipe-CREDIT"]?.onPremOrders || 0
                  }
                  onPremSales={
                    tenderType?.["Card Swipe-CREDIT"]?.onPremSales || 0
                  }
                  offPremOrders={
                    tenderType?.["Card Swipe-CREDIT"]?.offPremOrders || 0
                  }
                  offPremSales={
                    tenderType?.["Card Swipe-CREDIT"]?.offPremSales || 0
                  }
                  loader={tendorTypesLoader}
                />
                <TenderType
                  icon={<KeyedInIcon />}
                  tendorTitle="Keyed In"
                  expandable={true}
                  amount={tenderType?.["Online/Key-In-CREDIT"]?.totalSales || 0}
                  orders={
                    tenderType?.["Online/Key-In-CREDIT"]?.totalOrders || 0
                  }
                  percentage={Number(
                    tenderType?.["Online/Key-In-CREDIT"]?.salesPercentage || 0
                  )}
                  onPremOrders={
                    tenderType?.["Online/Key-In-CREDIT"]?.onPremOrders || 0
                  }
                  onPremSales={
                    tenderType?.["Online/Key-In-CREDIT"]?.onPremSales || 0
                  }
                  offPremOrders={
                    tenderType?.["Online/Key-In-CREDIT"]?.offPremOrders || 0
                  }
                  offPremSales={
                    tenderType?.["Online/Key-In-CREDIT"]?.offPremSales || 0
                  }
                  loader={tendorTypesLoader}
                />
              </div>

              <h3 className="tender-type-sub-heading">Coupons</h3>
              <div className="tender-type-container">
                <TenderType
                  icon={<CouponsIcon />}
                  tendorTitle="Coupons"
                  amount={tenderType?.["Coupons"]?.totalSales || 0}
                  orders={tenderType?.["Coupons"]?.totalOrders || 0}
                  percentage={Number(
                    tenderType?.["Coupons"]?.salesPercentage || 0
                  )}
                  loader={tendorTypesLoader}
                />
                <TenderType
                  icon={<GiftCardIcon />}
                  tendorTitle="Gift Card"
                  amount={tenderType?.["Gift Card"]?.totalSales || 0}
                  orders={tenderType?.["Gift Card"]?.totalOrders || 0}
                  percentage={Number(
                    tenderType?.["Gift Card"]?.salesPercentage || 0
                  )}
                  loader={tendorTypesLoader}
                />
              </div>

              <h3 className="tender-type-sub-heading">Digital Payments</h3>
              <div className="tender-type-container">
                <TenderType
                  icon={<GooglePayIcon />}
                  tendorTitle="Google Pay"
                  amount={tenderType?.["Google Pay"]?.totalSales || 0}
                  orders={tenderType?.["Google Pay"]?.totalOrders || 0}
                  percentage={Number(
                    tenderType?.["Google Pay"]?.salesPercentage || 0
                  )}
                  loader={tendorTypesLoader}
                />
                <TenderType
                  icon={<ApplePayIcon />}
                  tendorTitle="Apple Pay"
                  amount={tenderType?.["Apple Pay"]?.totalSales || 0}
                  orders={tenderType?.["Apple Pay"]?.totalOrders || 0}
                  percentage={Number(
                    tenderType?.["Apple Pay"]?.salesPercentage || 0
                  )}
                  loader={tendorTypesLoader}
                />
                <TenderType
                  icon={<OfflineQRIcon />}
                  tendorTitle="Offline QR"
                  amount={tenderType?.["OFFLINE_QR"]?.totalSales || 0}
                  orders={tenderType?.["OFFLINE_QR"]?.totalOrders || 0}
                  percentage={Number(
                    tenderType?.["OFFLINE_QR"]?.salesPercentage || 0
                  )}
                  loader={tendorTypesLoader}
                />
              </div>
            </div>
          </div> */}

          <h2 className="sales-overview-sub-heading ">Card Type</h2>
          <CardTypeChart
            dataList={salesCardTypeData}
            loader={salesCardTypeDataLoading}
          />

          <h2 className="sales-overview-sub-heading ">By Employees</h2>
          <EmployeeSalesChart
            dataList={staffSalesData}
            loader={staffSalesLoading}
          />

          <h2 className="sales-overview-sub-heading ">By Channel</h2>
          <ChannelSalesChart
            dataList={salesByChannel}
            loader={salesByChannelLoading}
          />

          <div className="sales-overview-doughnut-chart-container">
            <div className="" style={{ width: "50%", height: "100%" }}>
              <h2 className="sales-overview-sub-heading ">By Discount</h2>
              <DoughnutChartWithButton
                dataList={offerSummary}
                countryCode={countryCode}
                handleClick={(data: any) =>
                  handleSummaryView("discountOffer", data)
                }
                loader={offerSummaryLoading}
              />
            </div>
            <div className="" style={{ width: "50%", height: "100%" }}>
              <h2 className="sales-overview-sub-heading ">Voided orders</h2>
              <DoughnutChartWithButtonVoided
                dataList={voidedOrderSummary}
                countryCode={countryCode}
                handleClick={(data: any) =>
                  handleSummaryView("voidedOrder", data)
                }
                loader={voidedOrderSummaryLoader}
              />
            </div>
          </div>
          <h2 className="sales-overview-sub-heading ">By Revenue class</h2>
          <RevenueClassChart
            dataList={salesByRevenueClass}
            loader={salesByRevenueClassLoading}
          />
        </>
      ) : viewType === "discountOffer" ? (
        <>
          <div className="void-activity-table-container">
            <div className="void-activity-button-container">
              <button
                className="back-to-chart-btn"
                onClick={handleGoBackToChart}
              >
                <ArrowLeft />
                Back
              </button>
            </div>
            <NewTable
              kpiTitle={`By discount - ${offerType}`}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              headerData={discountTableHeaders}
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
              // count={discountSummary?.length}
              searchPlaceHolder="Search By Staff name"
              onSearch={handleSearch}

            />
          </div>
        </>
      ) : (
        <div className="void-activity-table-container">
          <div className="void-activity-button-container">
            <button className="back-to-chart-btn" onClick={handleGoBackToChart}>
              <ArrowLeft />
              Back
            </button>
          </div>
          <NewTable
            kpiTitle={`Voided orders - ${offerType}`}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            headerData={voidedTableHeaders}
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
            // count={cancellationSummary?.length}
            searchPlaceHolder="Search By Staff name"
            onSearch={handleSearch}
          />
        </div>
      )}
    </>
  );
};

export default SalesOverview;
