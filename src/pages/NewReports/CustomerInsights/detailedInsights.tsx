import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../../redux/newReports/newReportsActions";

import StoreFilter from "components/reportComponents/StoreFilter";

import useDateFilter from "hooks/useDateFilter";
import ReusableDropdown from "components/common/ReusableDropdown/ReusableDropdown";
import NewTable from "components/reportComponents/NewTable";
import {
  detailedInsightsCustomerDetailsRequest,
  detailedInsightsCustomerOrderRequest,
  detailedInsightsCustomerTopFavItemsRequest,
  detailedInsightsDineInRequest,
  detailedInsightsLatestOrderRequest,
  detailedInsightsOffPremRequest,
  detailedInsightsSummaryRequest,
} from "../../../redux/customerInsights/customerInsightsActions";
import ErrorHandler from "components/reportComponents/ErrorHandler";
import { getCurrencySymbol } from "utils";
import DownloadReport from "components/reportComponents/DownloadReports";

const latestOrderTableHeader = [
  {
    key: "orderDate",
    label: "Order date",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "itemDetails",
    label: "Item details",
    alignment: "left",
    isSortable: true,
  },
];

const dineInTableHeader = [
  {
    key: "grpType",
    label: "Group type",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "firstVisit",
    label: "First visit",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "latestVisit",
    label: "Latest visit",
    alignment: "left",
    isSortable: false,
  },
  {
    key: "dineinTenure",
    label: "Dine-in Tenure",
    alignment: "right",
    isSortable: true,
  },
  {
    key: "totalVisits",
    label: "Total visits",
    alignment: "right",
    isSortable: true,
  },
  {
    key: "avgGrpSize",
    label: "Avg Group size",
    alignment: "right",
    isSortable: true,
  },
];
const topFavItemTableHeader = [
  {
    key: "favoriteItem",
    label: "Favorite item",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "qtyOrdered",
    label: "Quantity ordered",
    alignment: "right",
    isSortable: true,
  },
];
const DetailedInsights = () => {
  const [customerOrderCurrentPage, setCustomerOrderCurrentPage] = useState(1);
  const [customerOrderPageLimit, setCustomerOrderPageLimit] = useState(10);

  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );
  const countryCode = useSelector((state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country);
  const dispatch = useDispatch();
  const { startDate, endDate, selectedDateFilterType, handleDateChange } =
    useDateFilter();
  const [selectedCustomerPhoneNumber, setSelectedCustomerPhoneNumber] =
    useState("");
  const [searchCustomer, setSearchCustomer] = useState("");

  const detailedInsightsCustomerDetailsData = useSelector(
    (state: any) =>
      state?.customerInsights?.detailedInsightsCustomerDetailsSuccess
  );
  const detailedInsightsCustomerDetailsLoading = useSelector(
    (state: any) =>
      state?.customerInsights?.detailedInsightsCustomerDetailsLoading
  );
  const detailedInsightsCustomerDetailsFailure = useSelector(
    (state: any) =>
      state?.customerInsights?.detailedInsightsCustomerDetailsFailure
  );

  const detailedInsightsSummaryData = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsSummarySuccess
  );
  const detailedInsightsSummaryLoading = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsSummaryLoading
  );
  const detailedInsightsSummaryFailure = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsSummaryFailure
  );

  const detailedInsightsDineInData = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsDineInSuccess
  );
  const detailedInsightsDineInLoading = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsDineInLoading
  );
  const detailedInsightsDineInFailure = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsDineInFailure
  );

  const detailedInsightsOffPremData = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsOffPremSuccess
  );
  const detailedInsightsOffPremLoading = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsOffPremLoading
  );
  const detailedInsightsOffPremFailure = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsOffPremFailure
  );

  const detailedInsightsCustomersOrderData = useSelector(
    (state: any) =>
      state?.customerInsights?.detailedInsightsCustomersOrderSuccess
  );
  const detailedInsightsCustomersOrderLoading = useSelector(
    (state: any) =>
      state?.customerInsights?.detailedInsightsCustomersOrderLoading
  );
  const detailedInsightsCustomersOrderFailure = useSelector(
    (state: any) =>
      state?.customerInsights?.detailedInsightsCustomersOrderFailure
  );

  const detailedInsightsLatestOrderData = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsLatestOrderSuccess
  );
  const detailedInsightsLatestOrderLoading = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsLatestOrderLoading
  );
  const detailedInsightsLatestOrderFailure = useSelector(
    (state: any) => state?.customerInsights?.detailedInsightsLatestOrderFailure
  );

  const detailedInsightsCustomersTopFavItemsData = useSelector(
    (state: any) =>
      state?.customerInsights?.detailedInsightsCustomersTopFavItemsSuccess
  );
  const detailedInsightsCustomersTopFavItemsLoading = useSelector(
    (state: any) =>
      state?.customerInsights?.detailedInsightsCustomersTopFavItemsLoading
  );
  const detailedInsightsCustomersTopFavItemsFailure = useSelector(
    (state: any) =>
      state?.customerInsights?.detailedInsightsCustomersTopFavItemsFailure
  );

  const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode)), [countryCode]);

  const offPremTableHeader = [
    {
      key: "firstOrder",
      label: "First order",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "lastOrder",
      label: "Last order",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "totalOrders",
      label: "Total orders",
      alignment: "right",
      isSortable: false,
    },
    {
      key: "totalItems",
      label: "Total items",
      alignment: "right",
      isSortable: true,
    },
    {
      key: "maxOrderAmount",
      label: "Max order amount",
      alignment: "right",
      prefix: currencySymbol,
      isMonetary: true,
      isSortable: true,
    },
    {
      key: "totalSpent",
      label: "Total spent",
      alignment: "right",
      isMonetary: true,
      prefix: currencySymbol,
      isSortable: true,
    },
    {
      key: "avgCoverSize",
      label: "Avg cov size",
      alignment: "right",
      isSortable: true,
    },
  ];


  const summaryTableHeader = [
    {
      key: "fullName",
      label: "Customer name",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "phoneNumber",
      label: "Contact",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "email",
      label: "Email address",
      alignment: "left",
      isSortable: false,
    },
    {
      key: "address",
      label: "Address",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "loyaltyTyp",
      label: "Loyalty level",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "highNetworthCustomer",
      label: "High Networth Customer",
      alignment: "left",
      isSortable: true,
    },
    // {
    //   key: "preOrderIndicator",
    //   label: "Pre-order Indicator",
    //   alignment: "left",
    //   isSortable: true,
    // },
    // {
    //   key: "qualityComplaints",
    //   label: "Quality complaints",
    //   alignment: "left",
    //   isSortable: true,
    // },
    {
      key: "tenureMonths",
      label: "Tenure in months",
      alignment: "right",
      isSortable: true,
    },
    {
      key: "totalVisits",
      label: "Total visits",
      alignment: "right",
      isSortable: true,
    },
    {
      key: "totalSpend",
      label: "Total spent",
      alignment: "right",
      isMonetary: true,
      prefix: currencySymbol,
      isSortable: true,
    },
    {
      key: "canceledOrdersCount",
      label: "Cancelled Orders",
      alignment: "right",
      isSortable: true,
    },
    {
      key: "canceledItems",
      label: "Cancelled Items",
      alignment: "right",
      isSortable: true,
    },
    // {
    //   key: "missingItems",
    //   label: "Missing Items",
    //   alignment: "right",
    //   isSortable: true,
    // },
    // {
    //   key: "chargebacks",
    //   label: "Charge backs",
    //   alignment: "right",
    //   isSortable: true,
    // },
  ];
  const headers4 = [
    {
      key: "orderDate",
      label: "Order date",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "orderNo",
      label: "Order number",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "orderType",
      label: "Order type",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "itemDetails",
      label: "Item details",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "orderTotal",
      label: "Order total",
      alignment: "right",
      isMonetary: true,
      prefix: currencySymbol,
      isSortable: true,
    },
    {
      key: "totalItems",
      label: "Total items",
      alignment: "right",
      isSortable: true,
    }
  ];


  useEffect(() => {
    dispatch(
      detailedInsightsCustomerDetailsRequest({
        locationId: selectedLocation?.value,
        startDate: startDate,
        endDate: endDate,
        search: searchCustomer,
        page: 1,
        size: 20
      })
    );
  }, [searchCustomer, selectedLocation, startDate, endDate]);

  useEffect(() => {
    if (selectedCustomerPhoneNumber) {
      dispatch(
        detailedInsightsSummaryRequest({
          locationId: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          phoneNumber: selectedCustomerPhoneNumber.split("+")[1],
        })
      );
      dispatch(
        detailedInsightsDineInRequest({
          locationId: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          phoneNumber: selectedCustomerPhoneNumber.split("+")[1],
        })
      );
      dispatch(
        detailedInsightsOffPremRequest({
          locationId: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          phoneNumber: selectedCustomerPhoneNumber.split("+")[1],
        })
      );
      // dispatch(
      //   detailedInsightsCustomerOrderRequest({
      //     locations: selectedLocation,
      //     startDate: startDate,
      //     endDate: endDate,
      //     phnNo: selectedCustomerPhoneNumber,
      //     currentPage: customerOrderCurrentPage,
      //     pageSize: customerOrderPageLimit,
      //   })
      // );
      dispatch(
        detailedInsightsLatestOrderRequest({
          locationId: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          phoneNumber: selectedCustomerPhoneNumber.split("+")[1],
        })
      );
      dispatch(
        detailedInsightsCustomerTopFavItemsRequest({
          locationId: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          phoneNumber: selectedCustomerPhoneNumber.split("+")[1],
        })
      );
    }
  }, [selectedCustomerPhoneNumber, selectedLocation, startDate, endDate]);


  useEffect(() => {
    if (selectedCustomerPhoneNumber) {
      dispatch(
        detailedInsightsCustomerOrderRequest({
          locationId: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          phoneNumber: selectedCustomerPhoneNumber.split("+")[1],
          tablePageNo: customerOrderCurrentPage,
          tableRecordLimit: customerOrderPageLimit,
        })
      );
    }
  }, [
    selectedCustomerPhoneNumber,
    customerOrderCurrentPage,
    customerOrderPageLimit,
    startDate,
    endDate,
    selectedLocation,
  ]);
  // useEffect(()=>{
  //   console.log({
  //     detailedInsightsCustomerDetailsData,
  //     detailedInsightsSummaryData,
  //     detailedInsightsDineInData,
  //     detailedInsightsOffPremData,
  //     detailedInsightsCustomersOrderData,
  //     detailedInsightsLatestOrderData,
  //     detailedInsightsCustomersTopFavItemsData

  //   })

  // },[detailedInsightsCustomerDetailsData,
  //   detailedInsightsSummaryData,
  //   detailedInsightsDineInData,
  //   detailedInsightsOffPremData,
  //   detailedInsightsCustomersOrderData,
  //   detailedInsightsLatestOrderData,
  //   detailedInsightsCustomersTopFavItemsData
  // ])

  const handleDropDownOnChange: any = (e: any) => {
    setSelectedCustomerPhoneNumber(e.value);
  };

  const handleDropDownOnsearch: any = (e: any) => {
    setSearchCustomer(e);
  };

  const options = useMemo(
    () =>
      (detailedInsightsCustomerDetailsData?.content || [])?.map((customerData: any) => ({
        label: `${customerData?.customerName} - ${customerData?.phoneNumber}`,
        value: `${customerData?.phoneNumber}`,
      })) || [],
    [detailedInsightsCustomerDetailsData]
  )


  const loadOptions = async (type: string) => {
    // console.log("Loading", type);
    // console.log(detailedInsightsCustomerDetailsData);
    const page = detailedInsightsCustomerDetailsData?.number + 1
    let pageNumber = page
    if (type === "prev" && page > 1) {
      pageNumber -= 1
    } else if (type === "next" && page < detailedInsightsCustomerDetailsData?.totalPages - 1) {
      pageNumber += 1
    }

    dispatch(detailedInsightsCustomerDetailsRequest({
      locationId: selectedLocation?.value,
      startDate: startDate,
      endDate: endDate,
      search: searchCustomer,
      page: pageNumber,
      size: 20
    }))
  }



  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="reports-page-container">
        <div className="reports-page-body">
          <StoreFilter
            storeOptions={locations}
            selectedDate={selectedDateFilterType}
            endDate={endDate}
            startDate={startDate}
            selectedStore={selectedLocation}
            showRefresh={false}
            showDate={true}
            setSelectedDate={handleDateChange}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
          />

          {/* <div className={dropdownContainerClassName}> */}

          {/* </div> */}
          <div className="searchable-dropdown">
            <ReusableDropdown
              onLoadPrev={() => loadOptions("prev")}
              onLoadMore={() => loadOptions("next")}
              isLoading={detailedInsightsCustomerDetailsLoading}
              options={options}
              placeholder="Search by customer name, contact number"
              dropdownContainerClassName="select-food-item-dropdown-cotainer"
              dropdownClassName="select-food-item-dropdown"
              dropdownPrefix={"select-food-item-dropdown-prefix"}
              showSearchIcon={true}
              onChange={handleDropDownOnChange}
              onInputChange={handleDropDownOnsearch}
              noOptionsMessage={`No results found for "${searchCustomer}"`}
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Summary</h1>
              <DownloadReport kpiTitle="Summary" tableData={detailedInsightsSummaryData} />
            </div>
            <ErrorHandler errorType={selectedCustomerPhoneNumber ? "reportNotFound" : "customerNotFound"} isError={detailedInsightsSummaryFailure} data={detailedInsightsSummaryData}>

              <NewTable
                kpiTitle=""
                searchQuery={""}
                headerData={summaryTableHeader as any}
                onSearch={() => { }}
                tableData={detailedInsightsSummaryData}
                showTableHeader={false}
                showPagination={false}
                loader={detailedInsightsSummaryLoading}
                searchPlaceHolder="Search by table number, customer name"
                rowNoWrap={true}
                tableContainerClassName="full-width"
              />{" "}
            </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Dine-in Insights</h1>
              <DownloadReport kpiTitle="Dine-in Insights" tableData={detailedInsightsDineInData} />
            </div>
            <ErrorHandler errorType={selectedCustomerPhoneNumber ? "reportNotFound" : "customerNotFound"} isError={detailedInsightsDineInFailure} data={detailedInsightsDineInData}>
              <NewTable
                kpiTitle=""
                searchQuery={""}
                // onSearchChange={() => {}}
                headerData={dineInTableHeader as any}
                onSearch={() => { }}
                tableData={detailedInsightsDineInData}
                currentPage={1}
                totalPages={1}
                // count={10}
                showTableHeader={false}
                showPagination={false}
                rowsPerPage={10}
                loader={detailedInsightsDineInLoading}
                // onSearch={handleTodayCheckInSearch}
                rowNoWrap={true}
                tableContainerClassName="full-width"
              />
            </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Off-prem Insights</h1>
              <DownloadReport kpiTitle="Off-prem Insights" tableData={detailedInsightsOffPremData} />
            </div>
            <ErrorHandler errorType={selectedCustomerPhoneNumber ? "reportNotFound" : "customerNotFound"} isError={detailedInsightsOffPremFailure} data={detailedInsightsOffPremData}>
              <NewTable
                kpiTitle=""
                searchQuery={""}
                // onSearchChange={() => {}}
                headerData={offPremTableHeader as any}
                onSearch={() => { }}
                tableData={detailedInsightsOffPremData}
                currentPage={1}
                totalPages={1}
                // count={10}
                showTableHeader={false}
                showPagination={false}
                rowsPerPage={10}
                loader={detailedInsightsOffPremLoading}
                searchPlaceHolder="Search by table number, customer name"
                // onSearch={handleTodayCheckInSearch}
                rowNoWrap={true}
                tableContainerClassName="full-width"
              />
            </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Customers Order History</h1>
              <DownloadReport kpiTitle="Customers Order History" tableData={detailedInsightsCustomersOrderData?.content || []} />
            </div>
            <ErrorHandler errorType={selectedCustomerPhoneNumber ? "reportNotFound" : "customerNotFound"} isError={detailedInsightsCustomersOrderFailure} data={detailedInsightsCustomersOrderData} isLoading={detailedInsightsCustomersOrderLoading}>
              <NewTable
                kpiTitle=""
                searchQuery={""}
                // onSearchChange={() => {}}
                headerData={headers4 as any}
                onSearch={() => { }}
                showIcons={false}
                tableData={detailedInsightsCustomersOrderData?.content || []}
                totalPages={detailedInsightsCustomersOrderData?.totalPages || 0}
                count={detailedInsightsCustomersOrderData?.content?.length || 0}
                showTableHeader={false}
                onPageChange={setCustomerOrderCurrentPage}
                tableContainerClassName="full-width"
                currentPage={customerOrderCurrentPage}
                loader={detailedInsightsCustomersOrderLoading}
                // totalPages={checkInOverviewTableDetails?.totalPages||0}
                rowsPerPage={customerOrderPageLimit}
                setRowsPerPage={setCustomerOrderPageLimit}
                // loader={isCheckInOverviewTableDetailsLoading}
                rowNoWrap={true}
                totalElements={detailedInsightsCustomersOrderData?.totalElements || 0}
              />
            </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Latest Order Info</h1>
              <DownloadReport kpiTitle="Latest Order Info" tableData={detailedInsightsLatestOrderData} />
            </div>
            <ErrorHandler errorType={selectedCustomerPhoneNumber ? "reportNotFound" : "customerNotFound"} isError={detailedInsightsLatestOrderFailure} data={detailedInsightsLatestOrderData} isLoading={detailedInsightsLatestOrderLoading}>
              <NewTable
                kpiTitle="Latest Order Info"
                searchQuery={""}
                // onSearchChange={() => {}}
                headerData={latestOrderTableHeader as any}
                onSearch={() => { }}
                tableData={detailedInsightsLatestOrderData}
                currentPage={1}
                totalPages={1}
                // count={10}
                showPagination={false}
                showTableHeader={false}
                rowsPerPage={10}
                loader={detailedInsightsLatestOrderLoading}
                searchPlaceHolder="Search by table number, customer name"
                // onSearch={handleTodayCheckInSearch}
                rowNoWrap={true}
                tableContainerClassName="full-width"
              />
            </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">
                Customers Top 10 Favorite Items
              </h1>
              <DownloadReport kpiTitle="Customers Top 10 Favorite Items" tableData={detailedInsightsCustomersTopFavItemsData} />
            </div>

            <ErrorHandler errorType={selectedCustomerPhoneNumber ? "reportNotFound" : "customerNotFound"} isError={detailedInsightsCustomersTopFavItemsFailure} data={detailedInsightsCustomersTopFavItemsData} isLoading={detailedInsightsCustomersTopFavItemsLoading}>
              <NewTable
                kpiTitle=""
                searchQuery={""}
                // onSearchChange={() => {}}
                headerData={topFavItemTableHeader as any}
                onSearch={() => { }}
                tableData={detailedInsightsCustomersTopFavItemsData}
                currentPage={1}
                totalPages={1}
                // count={10}
                showTableHeader={false}
                showPagination={false}
                rowsPerPage={10}
                loader={detailedInsightsCustomersTopFavItemsLoading}
                searchPlaceHolder="Search by table number, customer name"
                // onSearch={handleTodayCheckInSearch}
                rowNoWrap={true}
                tableContainerClassName="full-width"
              />
            </ErrorHandler>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedInsights;
