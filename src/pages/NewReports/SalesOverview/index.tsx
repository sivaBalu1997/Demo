import React, { useEffect, useState, useMemo } from "react";
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
import { NewTableHeader } from "interface/newReportsInterface";
import { formatNumberByCountry, transformSalesData } from "utils";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
import TenderType from "components/reportComponents/TendorTypeCard";
import CardTypeChart from "components/reportComponents/chart";
import EmployeeSalesChart from "components/reportComponents/chart/chartEmployees";
import ChannelSalesChart from "components/reportComponents/chart/channelChart";
import RevenueClassChart from "components/reportComponents/chart/RevenueClassChart";
import StoreFilter from "components/reportComponents/StoreFilter";
import DoughnutChartWithButton from "components/reportComponents/Charts/DoughnutChartButton";
import NewTable from "components/reportComponents/NewTable";
import DoughnutChartWithButtonVoided from "components/reportComponents/Charts/DoughnutChartButtonVoided";
import useDateFilter from "hooks/useDateFilter";
import "./SalesOverview.scss";


interface ReportProps {}

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


const SalesOverview: React.FC<ReportProps> = ({}) => {

  const dispatch = useDispatch();

  const restaurantDetails = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.branch
  );

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
  const [offerType, setOfferType] = useState<string>("");
  const [voidedReason, setVoidedReason] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState({
    label: "Yesterday",
    value: "Yesterday",
  });
  const [tenderType, setTenderType] = useState<Record<string, TenderTypeItem>>(
    {}
  );
  
  const { startDate, endDate, handleDateChange } = useDateFilter();

  const datepickerApply = (data1: any, data2: any) => {
    handleDateChange("Custom Date", data1, data2);
  };

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

  const groupedData: any = useMemo(() => {
    const tendorGroups: any = {
      "Debit card": [],
      "Credit card": [],
      Cash: [],
      Aggregator: [],
      Coupon: [],
      "Digital payment": [],
      Others: [],
    };

    const tempdataObj: any = {};
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
        isExpandable: false,
      };
      if (item?.cardType && key) {
        key.isExpandable = true;
        if (item?.premises === "ONPREM") {
          key.onPremiseSales += Number(item?.totalSales || 0);
          key.onPremiseOrders += Number(item?.totalOrders || 0);
        } else if (item?.premises === "OFFPREM") {
          key.offPremiseSales += Number(item?.totalSales || 0);
          key.offPremiseOrders += Number(item?.totalOrders || 0);
        }
        key.totalSales = Number(item?.wholeTotalSales || 0);
        key.totalOrders = Number(item?.wholeTotalOrders || 0);
        key.salesPercentage += Number(item?.salesPercentage || 0);
      } else {
        key.salesPercentage = Number(item?.salesPercentage || 0);
      }
      tempdataObj[`${item?.paymentMode}-${item?.cardType}`] = key;
    });


    Object.entries(tempdataObj)?.forEach(([itemkey, value]: [string, any]) => {
      const parts = itemkey.split("-");
      const cardType = parts.pop() || ""; // Extract the last element (credit/debit)
      const key = parts.join("-");
      if (["Swipe/Tap/Dip", "Card Swipe"]?.includes(key)) {
        if (cardType === "CREDIT") {
          tendorGroups["Credit card"].push(value);
        } else if (cardType === "DEBIT") {
          tendorGroups["Debit card"].push(value);
        }
      } else if (["Keyed In", "Online/Key-In"]?.includes(key)) {
        if (cardType === "CREDIT") {
          tendorGroups["Credit card"].push(value);
        } else if (cardType === "DEBIT") {
          tendorGroups["Debit card"].push(value);
        }
      } else if (["CASH"]?.includes(key)) {
        tendorGroups["Cash"].push(value);
      } else if (["Doordash", "Swiggy", "Grubhub", "Zomato"]?.includes(key)) {
        tendorGroups["Aggregator"].push(value);
      } else if (["Coupon"]?.includes(key)) {
        tendorGroups["Coupon"].push(value);
      } else if (["Digital payment", "OFFLINE_QR"]?.includes(key)) {
        tendorGroups["Digital payment"].push(value);
      } else {
        tendorGroups["Others"].push(value);
      }
    });
    

    return tendorGroups;
  }, [tendorTypes]);

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
          tableRecordLimit: currentRowsVoiddedOrders,
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

  useEffect(() => {
    dispatch(
      cancellationSummaryRequest({
        locationid: selectedLocation?.value,
        tableRecordLimit: currentRowsVoiddedOrders,
        tablePageNo: currentPageVoiddedOrders,
        startDate: startDate,
        endDate: endDate,
        search: searchQuery,
        reason: voidedReason,
      })
    );
  }, [
    voidedReason,
    startDate,
    endDate,
    currentRowsVoiddedOrders,
    currentPageVoiddedOrders,
    searchQuery,
  ]);
  useEffect(() => {
    dispatch(
      discountSummaryRequest({
        locationid: selectedLocation?.value,
        tableRecordLimit: currentRowsOfferDiscount,
        tablePageNo: currentPageOfferDiscount,
        startDate: startDate,
        endDate: endDate,
        search: searchQuery,
        offer: offerType,
      })
    );
  }, [
    offerType,
    startDate,
    endDate,
    currentRowsOfferDiscount,
    currentPageOfferDiscount,
    searchQuery,
  ]);

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

      default:
        console.warn(`Unknown KPI title: ${kpiTitle}`);
    }
  };

  const handleSummaryView = (view: string, data: any) => {
    setViewType(view);
    if (view == "discountOffer") {
      setOfferType(data?.label);
    }
    if (view === "voidedOrder") {
      setVoidedReason(data?.label);
    }
  };


  console.log({ groupedData });

  const knownTendorIcons: any = {
    "Swipe/Tap/Dip": <PayTapIcon />,
    "Keyed In": <KeyedInIcon />,
    Cash: <CashIcon />,
    UberEats: <UberEatsIcon />,
    Grubhub: <GrubHubIcon />,
    Doordash: <DoordashIcon />,
    Coupons: <CouponsIcon />,
    "Gift Card": <GiftCardIcon />,
    "Google Pay": <GooglePayIcon />,
    "Apple Pay": <ApplePayIcon />,
    "Offline QR": <OfflineQRIcon />,
  };

  return (
    <>
      {viewType === "default" ? (
        <>
          <StoreFilter
            storeOptions={locations}
            selectedDate={selectedDate}
            selectedStore={selectedLocation}
            setSelectedDate={setSelectedDate}
            datePickerApplyFunction={datepickerApply}
            dateDropdownFunction={datepickerApply}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
          />

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
                cardValue={formatNumberByCountry(salesSummary?.totalMagilSales, countryCode, true)}
                incrementDecrementValue={salesSummary?.totalSalesPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(
                  salesSummary?.totalSalesPercentage
                )}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Net Sales"
                cardValue={formatNumberByCountry(salesSummary?.totalMagilNetSales, countryCode, true)}
                incrementDecrementValue={salesSummary?.netSalesPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(
                  salesSummary?.netSalesPercentage
                )}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Total Tax"
                cardValue={formatNumberByCountry(salesSummary?.totalMagilTax, countryCode, true)}
                incrementDecrementValue={salesSummary?.totalTaxPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={
                  salesSummary?.totalTaxPercentage !== "0.00" &&
                  salesSummary?.totalTaxPercentage !== 0
                }
                incrementOrDecrement={transformSalesData(
                  salesSummary?.totalTaxPercentage
                )}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Total Tips"
                cardValue={formatNumberByCountry(salesSummary?.totalMagilTips, countryCode, true)}
                incrementDecrementValue={salesSummary?.totalTipsPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(
                  salesSummary?.totalTipsPercentage
                )}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Gratuity"
                cardValue={formatNumberByCountry(salesSummary?.gratuity, countryCode, true)}
                incrementDecrementValue={salesSummary?.gratuityPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(
                  salesSummary?.gratuityPercentage
                )}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Transactions"
                cardValue={formatNumberByCountry(salesSummary?.totalMagilOrders, countryCode, false)}
                incrementDecrementValue={salesSummary?.transactionPercentage}
                isMonetary={false}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(
                  salesSummary?.transactionPercentage
                )}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Discount"
                cardValue={formatNumberByCountry(salesSummary?.discounts, countryCode, true)}
                incrementDecrementValue={salesSummary?.discountPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(
                  salesSummary?.discountPercentage
                )}
                graphType="arrow"
                isPercent={true}
              />
              <CardWithMiniGraph
                cardTitle="Cancelled"
                cardValue={formatNumberByCountry(salesSummary?.cancelledOrders, countryCode, true)}
                incrementDecrementValue={salesSummary?.cancelledPercentage}
                isMonetary={true}
                loader={salesSummaryLoader}
                showMiniGraph={true}
                incrementOrDecrement={transformSalesData(
                  salesSummary?.cancelledPercentage
                )}
                graphType="arrow"
                isPercent={true}
              />
            </div>
          </div>



          <div>
            <h2 className="sales-overview-sub-heading ">Tendor Type</h2>
          </div>
          <div className="reports-tendor-container">
            {Object?.entries(groupedData || {})?.map(([key, value]) => (
              <>
                {!Array.isArray(value) || !value?.length ? null : (
                  <div className="left-section">
                    <h3 className="tender-type-sub-heading">{key}</h3>
                    <div className="tender-type-container">
                      {Array.isArray(value) &&
                        value.map((item: any, index: number) => (
                          <TenderType
                            icon={
                              knownTendorIcons?.[item?.paymentMode] || (
                                <KeyedInIcon />
                              )
                            }
                            key={index}
                            tendorTitle={item?.paymentMode}
                            expandable={item?.isExpandable}
                            amount={item?.totalSales || 0}
                            orders={item?.totalOrders || 0}
                            percentage={Number(item?.salesPercentage || 0)}
                            onPremOrders={item?.onPremiseOrders || 0}
                            onPremSales={item?.onPremiseSales || 0}
                            offPremOrders={item?.offPremiseOrders || 0}
                            offPremSales={item?.offPremiseSales || 0}
                            loader={tendorTypesLoader}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>

    
          <h2 className="sales-overview-sub-heading ">By Card Type</h2>
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
            kpiTitle={`Voided orders - ${voidedReason}`}
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
            searchPlaceHolder="Search By Staff name"
            onSearch={handleSearch}
          />
        </div>
      )}
    </>
  );
};

export default SalesOverview;
