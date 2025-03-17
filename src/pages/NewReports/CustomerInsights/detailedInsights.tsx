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

const headerData2 = [
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
const tableData2 = [
  {
    orderDate: "02-20-2025, 6:52 PM",
    itemDetails: "Mango lassi, Milkshake, Mutton biriyani, Chicken biriyani",
  },
];
const headerData1 = [
  {
    key: "customerName",
    label: "Customer name",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "contact",
    label: "Contact",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "emailAddress",
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
    key: "loyaltyLevel",
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
  {
    key: "preOrderIndicator",
    label: "Pre-order Indicator",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "qualityComplaints",
    label: "Quality complaints",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "tenureInMonths",
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
    key: "totalSpent",
    label: "Total spent",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "cancelledOrders",
    label: "Cancelled Orders",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "cancelledItems",
    label: "Cancelled Items",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "missingItems",
    label: "Missing Items",
    alignment: "left",
    isSortable: true,
  },
  {
    key: "chargebacks",
    label: "Charge backs",
    alignment: "right",
    isSortable: true,
  },
];
const tableData = [
  {
    customerName: "Devon Lane",
    contact: "+1 9172881407",
    emailAddress: "ashokofficial@gmail.com",
    address: "14 Jackson Ave, Princeton, NJ28540,USA",
    loyaltyLevel: "Loyal",
    highNetworthCustomer: "Yes",
    preOrderIndicator: "Yes",
    qualityComplaints: "Yes",
    tenureInMonths: 15,
    totalVisits: 23,
    totalSpent: "$1250.50",
    cancelledOrders: 4,
    cancelledItems: 12,
    missingItems: 2,
    chargebacks: "N/A",
  },
];
console.log(
  headerData1.map((hea) => {
    return { [hea.key]: "" };
  })
);
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

const DetailedInsights = () => {
  const [activeBtn, setActiveBtn] = useState("Live Check-ins");
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
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedCustomerPhoneNumber, setSelectedCustomerPhoneNumber] =
    useState("asdsa");
  const headers4 = [
    {
      key: "customerDate",
      label: "Customer date",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "orderNumber",
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

  const tableData4 = [
    {
      customerDate: "02-20-2025, 6:52 PM",
      orderNumber: "#006614",
      orderType: "Pickup",
      itemDetails: "Mango lassi-1",
      totalItems: "4",
    },
    {
      customerDate: "02-20-2025, 6:52 PM",
      orderNumber: "#006615",
      orderType: "Delivery",
      itemDetails: "Mango lassi-1",
      totalItems: "4",
    },
    {
      customerDate: "02-20-2025, 6:52 PM",
      orderNumber: "#006616",
      orderType: "Dine-in",
      itemDetails: "Mango lassi-1",
      totalItems: "4",
    },
    {
      customerDate: "02-20-2025, 6:52 PM",
      orderNumber: "#006617",
      orderType: "Pickup",
      itemDetails: "Mango lassi-1",
      totalItems: "4",
    },
    {
      customerDate: "02-20-2025, 6:52 PM",
      orderNumber: "#006618",
      orderType: "Delivery",
      itemDetails: "Mango lassi-1",
      totalItems: "4",
    },
    // ...
  ];
  const headerData5 = [
    {
      key: "favoriteItem",
      label: "Favorite item",
      alignment: "left",
      isSortable: true,
    },
    {
      key: "quantityOrdered",
      label: "Quantity ordered",
      alignment: "left",
      isSortable: true,
    },
  ];
  const tableData5 = [
    { favoriteItem: "Mango lassi", quantityOrdered: 26 },
    { favoriteItem: "Milkshake", quantityOrdered: 30 },
    { favoriteItem: "Butter naan", quantityOrdered: 45 },
    { favoriteItem: "Fish biryani", quantityOrdered: 14 },
    { favoriteItem: "Ghee pongal", quantityOrdered: 67 },
    { favoriteItem: "Mutton biryani", quantityOrdered: 19 },
    { favoriteItem: "Chicken biryani", quantityOrdered: 26 },
    { favoriteItem: "Garlic naan", quantityOrdered: 21 },
    { favoriteItem: "Butter scotch icecream", quantityOrdered: 20 },
    { favoriteItem: "Fish biryani", quantityOrdered: 11 },
  ];
  const datepickerApply = (type: string, data1?: any, data2?: any) => {
    handleDateChange("Custom Date", data1, data2);
  };
  const handleDropDownOnChange: any = (e: any) => {
    console.log(e, "Here it is ");
    setSelectedCustomerPhoneNumber(e.value);
  };

  const handleDropDownOnsearch: any = (e: any) => {
    dispatch(
      detailedInsightsCustomerDetailsRequest({
        locations: selectedLocation,
        startDate: startDate,
        endDate: endDate,
        searchText: e,
      })
    );
  };
  useEffect(() => {
    if (selectedCustomerPhoneNumber) {
      dispatch(
        detailedInsightsSummaryRequest({
          locations: selectedLocation,
          startDate: startDate,
          endDate: endDate,
          phnNo: selectedCustomerPhoneNumber,
        })
      );
      dispatch(
        detailedInsightsDineInRequest({
          locations: selectedLocation,
          startDate: startDate,
          endDate: endDate,
          phnNo: selectedCustomerPhoneNumber,
        })
      );
      dispatch(
        detailedInsightsOffPremRequest({
          locations: selectedLocation,
          startDate: startDate,
          endDate: endDate,
          phnNo: selectedCustomerPhoneNumber,
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
          locations: selectedLocation,
          startDate: startDate,
          endDate: endDate,
          phnNo: selectedCustomerPhoneNumber,
        })
      );
      dispatch(
        detailedInsightsCustomerTopFavItemsRequest({
          locations: selectedLocation,
          startDate: startDate,
          endDate: endDate,
          phnNo: selectedCustomerPhoneNumber,
        })
      );
    }
  }, [selectedCustomerPhoneNumber, selectedLocation, startDate, endDate]);
  useEffect(() => {
    if (selectedCustomerPhoneNumber) {
      dispatch(
        detailedInsightsCustomerOrderRequest({
          locations: selectedLocation,
          startDate: startDate,
          endDate: endDate,
          phnNo: selectedCustomerPhoneNumber,
          currentPage: customerOrderCurrentPage,
          pageSize: customerOrderPageLimit,
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
              options={[]}
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
            <NewTable
              kpiTitle=""
              searchQuery={""}
              headerData={headerData1 as any}
              onSearch={() => {}}
              tableData={
                (tableData.length > 0
                  ? tableData
                  : [
                      headerData1.reduce((acc: any, { key }) => {
                        acc[key] = "N/A";
                        acc.color = "#8D8D8D";
                        return acc;
                      }, {}),
                    ]) as any
              }
              showTableHeader={false}
              showPagination={false}
              loader={false}
              searchPlaceHolder="Search by table number, customer name"
              rowNoWrap={true}
            />{" "}
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Dine-in Insights</h1>
              <DownloadPopOver />
            </div>
            <NewTable
              kpiTitle=""
              searchQuery={""}
              // onSearchChange={() => {}}
              headerData={headerData1 as any}
              onSearch={() => {}}
              tableData={
                (tableData.length > 0
                  ? tableData
                  : [
                      headerData1.reduce((acc: any, { key }) => {
                        acc[key] = "N/A";
                        acc.color = "#8D8D8D";
                        return acc;
                      }, {}),
                    ]) as any
              }
              currentPage={1}
              totalPages={1}
              // count={10}
              showTableHeader={false}
              showPagination={false}
              rowsPerPage={10}
              loader={false}
              // onSearch={handleTodayCheckInSearch}
              rowNoWrap={true}
              tableContainerClassName="full-width"
            />{" "}
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Off-prem Insights</h1>
              <DownloadPopOver />
            </div>
            <NewTable
              kpiTitle=""
              searchQuery={""}
              // onSearchChange={() => {}}
              headerData={headerData1 as any}
              onSearch={() => {}}
              tableData={
                (tableData.length > 0
                  ? tableData
                  : [
                      headerData1.reduce((acc: any, { key }) => {
                        acc[key] = "N/A";
                        acc.color = "#8D8D8D";
                        return acc;
                      }, {}),
                    ]) as any
              }
              currentPage={1}
              totalPages={1}
              // count={10}
              showTableHeader={false}
              showPagination={false}
              rowsPerPage={10}
              loader={false}
              searchPlaceHolder="Search by table number, customer name"
              // onSearch={handleTodayCheckInSearch}
              rowNoWrap={true}
              tableContainerClassName="full-width"
            />{" "}
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Customers Order History</h1>
              <DownloadPopOver />
            </div>
            <NewTable
              kpiTitle=""
              searchQuery={""}
              // onSearchChange={() => {}}
              headerData={headers4 as any}
              onSearch={() => {}}
              showIcons={false}
              tableData={
                (tableData4.length > 0
                  ? tableData4
                  : [
                      headers4.reduce((acc: any, { key }) => {
                        acc[key] = "N/A";
                        acc.color = "#8D8D8D";
                        return acc;
                      }, {}),
                    ]) as any
              }
              totalPages={1}
              // count={10}
              showTableHeader={false}
              onPageChange={setCustomerOrderCurrentPage}
              tableContainerClassName="full-width"
              currentPage={customerOrderCurrentPage}
              // totalPages={checkInOverviewTableDetails?.totalPages||0}
              rowsPerPage={customerOrderPageLimit}
              setRowsPerPage={setCustomerOrderPageLimit}
              // loader={isCheckInOverviewTableDetailsLoading}
              rowNoWrap={true}
            />{" "}
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Latest Order Info</h1>
              <DownloadPopOver />
            </div>
            <NewTable
              kpiTitle=""
              searchQuery={""}
              // onSearchChange={() => {}}
              headerData={headerData2 as any}
              onSearch={() => {}}
              tableData={
                (tableData2.length > 0
                  ? tableData2
                  : [
                      headerData2.reduce((acc: any, { key }) => {
                        acc[key] = "N/A";
                        acc.color = "#8D8D8D";
                        return acc;
                      }, {}),
                    ]) as any
              }
              currentPage={1}
              totalPages={1}
              // count={10}
              showPagination={false}
              showTableHeader={false}
              rowsPerPage={10}
              loader={false}
              searchPlaceHolder="Search by table number, customer name"
              // onSearch={handleTodayCheckInSearch}
              rowNoWrap={true}
              tableContainerClassName="full-width"
            />{" "}
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">
                Customers Top 10 Favorite Items{" "}
              </h1>
              <DownloadPopOver />
            </div>
            <NewTable
              kpiTitle=""
              searchQuery={""}
              // onSearchChange={() => {}}
              headerData={headerData5 as any}
              onSearch={() => {}}
              tableData={
                (tableData5.length > 0
                  ? tableData5
                  : [
                      headerData5.reduce((acc: any, { key }) => {
                        acc[key] = "N/A";
                        acc.color = "#8D8D8D";
                        return acc;
                      }, {}),
                    ]) as any
              }
              currentPage={1}
              totalPages={1}
              // count={10}
              showTableHeader={false}
              showPagination={false}
              rowsPerPage={10}
              loader={false}
              searchPlaceHolder="Search by table number, customer name"
              // onSearch={handleTodayCheckInSearch}
              rowNoWrap={true}
              tableContainerClassName="full-width"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedInsights;
