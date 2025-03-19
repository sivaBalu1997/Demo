import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../../redux/newReports/newReportsActions";

import StoreFilter from "components/reportComponents/StoreFilter";
import DownloadPopOver from "pages/CategoryReport/downloadOption";

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
    alignment: "left",
    isSortable: false,
  },
  {
    key: "totalItems",
    label: "Total items",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "maxOrderAmount",
    label: "Max order amount",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "totalSpent",
    label: "Total spent",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "avgCoverSize",
    label: "Avg cov size",
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
    alignment: "left",
    isSortable: true,
  },
  {
    key: "totalVisits",
    label: "Total visits",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "avgGrpSize",
    label: "Avg Group size",
    alignment: "left",
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
    alignment: "left",
    isSortable: true,
  },
  {
    key: "totalVisits",
    label: "Total visits",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "totalSpend",
    label: "Total spent",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "canceledOrdersCount",
    label: "Cancelled Orders",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "canceledItems",
    label: "Cancelled Items",
    alignment: "left",
    isSortable: true,
  },
  // {
  //   key: "missingItems",
  //   label: "Missing Items",
  //   alignment: "left",
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
    key: "totalItems",
    label: "Total items",
    alignment: "left",
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
    alignment: "left",
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


  useEffect(() => {
    dispatch(
      detailedInsightsCustomerDetailsRequest({
        locationId: selectedLocation?.value,
        startDate: startDate,
        endDate: endDate,
        customerName: searchCustomer,
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
 

  const datepickerApply = (type: string, data1?: any, data2?: any) => {
    handleDateChange("Custom Date", data1, data2);
  };
  const handleDropDownOnChange: any = (e: any) => {
    setSelectedCustomerPhoneNumber(e.value);
  };

  const handleDropDownOnsearch: any = (e: any) => {
    setSearchCustomer(e);
  };



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
            setSelectedDate={(data) => handleDateChange(data?.value)}
            datePickerApplyFunction={(date1: any, date2: any) =>
              datepickerApply("Custom Date", date1, date2)
            }
            dateDropdownFunction={(date1: any, date2: any) =>
              datepickerApply("Custom Date", date1, date2)
            }
            setSelectedStore={(store) => dispatch(changeLocation(store))}
          />

          {/* <div className={dropdownContainerClassName}> */}

          {/* </div> */}
          <div className="searchable-dropdown">
            <ReusableDropdown
              isLoading={detailedInsightsCustomerDetailsLoading}
              options={detailedInsightsCustomerDetailsData?.map(
                (customerData: any) => {
                  return {
                    label: `${customerData?.customerName} - ${customerData?.phoneNumber}`,
                    value: `${customerData?.phoneNumber}`,
                  };
                }
              )}
              placeholder="Search by customer name, contact number"
              dropdownContainerClassName="select-food-item-dropdown-cotainer"
              dropdownClassName="select-food-item-dropdown"
              dropdownPrefix={"select-food-item-dropdown-prefix"}
              showSearchIcon={true}
              onChange={handleDropDownOnChange}
              onInputChange={handleDropDownOnsearch}
            />
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Summary</h1>
              <DownloadPopOver />
            </div>
            <ErrorHandler errorType={selectedCustomerPhoneNumber?"reportNotFound":"customerNotFound"} isError={detailedInsightsSummaryFailure}  data={detailedInsightsSummaryData}>

            <NewTable
              kpiTitle=""
              searchQuery={""}
              headerData={summaryTableHeader as any}
              onSearch={() => {}}
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
              <DownloadPopOver />
            </div>
            <ErrorHandler errorType={selectedCustomerPhoneNumber?"reportNotFound":"customerNotFound"} isError={detailedInsightsDineInFailure}  data={detailedInsightsDineInData}>
            <NewTable
              kpiTitle=""
              searchQuery={""}
              // onSearchChange={() => {}}
              headerData={dineInTableHeader as any}
              onSearch={() => {}}
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
              <DownloadPopOver />
            </div>
            <ErrorHandler errorType={selectedCustomerPhoneNumber?"reportNotFound":"customerNotFound"} isError={detailedInsightsOffPremFailure}  data={detailedInsightsOffPremData}>
            <NewTable
              kpiTitle=""
              searchQuery={""}
              // onSearchChange={() => {}}
              headerData={offPremTableHeader as any}
              onSearch={() => {}}
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
              <DownloadPopOver />
            </div>
            <ErrorHandler errorType={selectedCustomerPhoneNumber?"reportNotFound":"customerNotFound"} isError={detailedInsightsCustomersOrderFailure}  data={detailedInsightsCustomersOrderData}>
            <NewTable
              kpiTitle=""
              searchQuery={""}
              // onSearchChange={() => {}}
              headerData={headers4 as any}
              onSearch={() => {}}
              showIcons={false}
              tableData={detailedInsightsCustomersOrderData?.content||[]}
              totalPages={detailedInsightsCustomersOrderData?.totalPages||0}
              // count={10}
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
            />
                   </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Latest Order Info</h1>
              <DownloadPopOver />
            </div>
            <ErrorHandler errorType={selectedCustomerPhoneNumber?"reportNotFound":"customerNotFound"} isError={detailedInsightsLatestOrderFailure}  data={detailedInsightsLatestOrderData}>
            <NewTable
              kpiTitle=""
              searchQuery={""}
              // onSearchChange={() => {}}
              headerData={latestOrderTableHeader as any}
              onSearch={() => {}}
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
                Customers Top 10 Favorite Items{" "}
              </h1>
              <DownloadPopOver />
            </div>
            
            <ErrorHandler errorType={selectedCustomerPhoneNumber?"reportNotFound":"customerNotFound"} isError={detailedInsightsCustomersTopFavItemsFailure}  data={detailedInsightsCustomersTopFavItemsData}>
            <NewTable
              kpiTitle=""
              searchQuery={""}
              // onSearchChange={() => {}}
              headerData={topFavItemTableHeader as any}
              onSearch={() => {}}
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
