import React, { useEffect, useState } from "react";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/r-arrow-left.svg";
import { NewTableHeader } from "interface/newReportsInterface";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLocation,
  employeeStaffActivityRequest,
  locationDetailsRequest,
  employeeSalesOverviewRequest,
  getEmployeeActivityRequest,
} from "redux/newReports/newReportsActions";
import StoreFilter from "components/reportComponents/StoreFilter";
import CustomBarChart from "components/reportComponents/ReusableCharts/CustomBarChart";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
import CustomDropdown from "components/common/customDropdown";
import NewTable from "components/reportComponents/NewTable";
import useSalesLocationDates from "hooks/useSalesLocationDates";
import "./style.scss";
import moment from "moment";

const Employees: React.FC = () => {
  const restaurantDetails = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.branch
  );

  const employeeSalesOverViewFromAPIRedux = useSelector(
    (state: any) => state?.newReports?.employeeSalesOverviewSuccess
  );

  const employeeSalesOverViewFromAPIReduxLoader = useSelector(
    (state: any) => state?.newReports?.employeeSalesOverviewLoading
  );

  // console.log("qqqq", { employeeSalesOverViewFromAPIRedux })

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

  // console.log("2222", selectedStore?.value)

  const selectedLocationidFromDropDown = selectedStore?.value;

  const [employeeVoidRecordLimit, setEmployeeVoidRecordLimit] =
    useState<number>(10);

  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );
  const dispatch = useDispatch();

  const countryCode = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.country
  );

  const currencySymbol = countryCode === "US" ? "$" : "₹";

  const employeeVoidActivityAPIRedux = useSelector(
    (state: any) => state?.newReports?.employeeStaffActivitySuccess?.content
  );

  const employeeVoidActivityTotalPagesRedux = useSelector(
    (state: any) => state?.newReports?.employeeStaffActivitySuccess?.totalPages
  );

  const employeeVoidActivityLoading = useSelector(
    (state: any) => state?.newReports?.employeeStaffActivityLoading
  );

  const getEmployeeActivityDataFromAPIRedux = useSelector(
    (state: any) => state?.newReports?.getemployeeActivitySuccess
  );

  console.log("22", { getEmployeeActivityDataFromAPIRedux });

  const [appliedStartDate, setAppliedStartDate] = useState<string>(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );
  const [appliedEndDate, setAppliedEndDate] = useState<string>(
    moment().subtract(1, "days").format("YYYY-MM-DD")
  );

  useEffect(() => {
    const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
    setAppliedStartDate(yesterday);
    setAppliedEndDate(yesterday);
  }, []);

  const datepickerApply = (data1: any, data2: any) => {
    console.log(data1, data2, "selected Date is here");
    setAppliedStartDate(data1);
    setAppliedEndDate(data2);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPageEmployeeVoidActivity, setCurrentPageEmployeeVoidActivity] =
    useState<number>(1);

  // const getLocationDates = useSalesLocationDates(state, locationid);

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
    switch (kpiTitle) {
      case "Employee Void Activity":
        if (selectedLocationidFromDropDown) {
          dispatch(
            employeeStaffActivityRequest({
              locationid: selectedLocationidFromDropDown,
              startDate: appliedStartDate,
              endDate: appliedEndDate,
              tablePageNo: currentPageEmployeeVoidActivity,
              tableRecordLimit: employeeVoidRecordLimit,
            })
          );
        }
        break;

      // case 'Live Orders Non Dine-in':
      //   currentDate && dispatch(liveOrderNonDineInRequest({ locationid, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: value }))
      //   break;

      default:
        console.warn(`Unknown KPI title: ${kpiTitle}`);
    }
  };

  const chartDataFromAPIRedux = getEmployeeActivityDataFromAPIRedux?.map(
    (data: any) => ({ name: data?.actionType, value: data?.extractedValue })
  );
  // const chartDataFromAPIReduxTooltip = getEmployeeActivityDataFromAPIRedux?.map((data: any) => ({ "name": data?.actionType }))

  const tooltipDataFromAPI = getEmployeeActivityDataFromAPIRedux?.reduce(
    (acc: any, data: any) => {
      acc[data.actionType] = {
        tooltipContent: `Value: ${data.extractedValue}`,
      };
      return acc;
    },
    {}
  );

  // Chart Data
  const chartData = [
    { name: "Add discount", value: 240.5 },
    { name: "Others", value: 180.0 },
    { name: "Complementary", value: 320.75 },
    { name: "Remove Gratuity", value: 200.0 },
  ];

  // Tooltip Data
  const tooltipData = {
    "Add discount": { tooltipContent: "Discount applied successfully!" },
    Others: { tooltipContent: "Miscellaneous changes recorded." },
    Complementary: { tooltipContent: "This item was given for free." },
    "Remove Gratuity": { tooltipContent: "Gratuity charges removed." },
  };

  // Custom Bar Style
  const customBarStyle = {
    borderRadius: "8px",
  };

  const [showAllActivityTable, setShowAllActivityTable] =
    useState<boolean>(false);

  const [employeeList, setEmployeeList] = useState("Sales");

  const handleDropdownChangeStore = (selectedValue: string) => {
    setEmployeeList(selectedValue);
  };

  useEffect(() => {
    if (selectedLocationidFromDropDown) {
      dispatch(
        employeeStaffActivityRequest({
          locationid: selectedLocationidFromDropDown,
          startDate: appliedStartDate,
          endDate: appliedEndDate,
          tablePageNo: currentPageEmployeeVoidActivity,
          tableRecordLimit: employeeVoidRecordLimit,
        })
      );
    }
  }, [
    selectedLocationidFromDropDown,
    appliedStartDate,
    appliedEndDate,
    currentPageEmployeeVoidActivity,
    employeeVoidRecordLimit,
  ]);

  const handleGoBackToChart = () => {
    setShowAllActivityTable(false);
  };

  useEffect(() => {
    if (selectedLocationidFromDropDown) {
      dispatch(
        employeeSalesOverviewRequest({
          locationid: selectedLocationidFromDropDown,
          startDate: appliedStartDate,
          endDate: appliedEndDate,
        })
      );
    }
  }, [selectedLocationidFromDropDown, appliedStartDate, appliedEndDate]);

  useEffect(() => {
    if (selectedLocationidFromDropDown) {
      dispatch(
        getEmployeeActivityRequest({
          locationid: selectedLocationidFromDropDown,
          startDate: "2024-02-04",
          endDate: "2025-02-24",
        })
      );
    }
  }, [selectedLocationidFromDropDown]);

  // const
  // const number = Math.floor(+floatString);

  return (
    <div className="report-sales-employee-container">
      {showAllActivityTable ? (
        <div
          className="void-activity-table-container"
          style={{ marginTop: showAllActivityTable ? "5vh" : "" }}
        >
          <div className="void-activity-button-container">
            <button className="back-to-chart-btn" onClick={handleGoBackToChart}>
              <ArrowLeft />
              Back
            </button>
          </div>
          <NewTable
            kpiTitle="Employee Void Activity"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            headerData={newTableHeaders}
            tableData={
              employeeVoidActivityAPIRedux &&
              employeeVoidActivityAPIRedux?.length > 0 &&
              employeeVoidActivityAPIRedux
            }
            currentPage={currentPageEmployeeVoidActivity}
            totalPages={employeeVoidActivityTotalPagesRedux}
            onPageChange={setCurrentPageEmployeeVoidActivity}
            rowsPerPage={employeeVoidRecordLimit}
            setRowsPerPage={setEmployeeVoidRecordLimit}
            loader={employeeVoidActivityLoading}
            count={employeeVoidActivityAPIRedux?.length}
            searchPlaceHolder="Search By Steward, Voided reasons"
            onSearch={handleSearch}
          />
        </div>
      ) : (
        <>
          <StoreFilter
            storeOptions={locations}
            selectedDate={selectedDate}
            selectedStore={selectedLocation}
            setSelectedDate={setSelectedDate}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
            datePickerApplyFunction={datepickerApply}
            dateDropdownFunction={datepickerApply}
          />
          <div className="employee-report-sales-overview-box-container-parent">
            <h2>Sales Overview</h2>
            <div className="select-employee-container">
              <p>Select employee</p>
              <div className="select-employee-dropdown">
                <CustomDropdown
                  options={[
                    { value: "All", label: "All" },
                    { value: "Lloyd Forger", label: "Lloyd Forger" },
                    { value: "Anya Forger", label: "Anya Forger" },
                    { value: "Daybreak", label: "Daybreak" },
                    { value: "stuart little", label: "stuart little" },
                  ]}
                  value={"Sales"}
                  className="category-dropdown"
                  onSelect={handleDropdownChangeStore}
                />
              </div>
            </div>
            <div className="employee-report-sales-overview-box-container">
              <CardWithMiniGraph
                cardTitle="Total Sales"
                cardValue={employeeSalesOverViewFromAPIRedux?.totalMagilSales}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.totalSalesPercentage
                }
                graphType="chart"
                incrementOrDecrement={
                  employeeSalesOverViewFromAPIRedux?.totalSalesPercentage > 0
                    ? "increment"
                    : "decrement"
                }
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Net Sales"
                cardValue={
                  employeeSalesOverViewFromAPIRedux?.totalMagilNetSales
                }
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.netSalesPercentage
                }
                graphType="chart"
                incrementOrDecrement={
                  employeeSalesOverViewFromAPIRedux?.netSalesPercentage > 0
                    ? "increment"
                    : "decrement"
                }
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Total Tax"
                cardValue={employeeSalesOverViewFromAPIRedux?.totalMagilTax}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.totalTaxPercentage
                }
                graphType="chart"
                incrementOrDecrement={
                  employeeSalesOverViewFromAPIRedux?.totalTipsPercentage > 0
                    ? "increment"
                    : "decrement"
                }
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Total Tips"
                cardValue={employeeSalesOverViewFromAPIRedux?.totalMagilTips}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.totalTipsPercentage
                }
                graphType="chart"
                incrementOrDecrement={
                  employeeSalesOverViewFromAPIRedux?.totalTipsPercentage > 0
                    ? "increment"
                    : "decrement"
                }
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Gratuity"
                cardValue={employeeSalesOverViewFromAPIRedux?.gratuity}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.gratuityPercentage
                }
                graphType="chart"
                incrementOrDecrement={
                  employeeSalesOverViewFromAPIRedux?.gratuityPercentage > 0
                    ? "increment"
                    : "decrement"
                }
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Discount"
                cardValue={employeeSalesOverViewFromAPIRedux?.discounts}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.discountPercentage
                }
                graphType="chart"
                incrementOrDecrement={
                  employeeSalesOverViewFromAPIRedux?.discountPercentage > 0
                    ? "increment"
                    : "decrement"
                }
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Cancelled"
                cardValue={employeeSalesOverViewFromAPIRedux?.cancelledOrders}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.cancelledPercentage
                }
                graphType="chart"
                incrementOrDecrement={
                  employeeSalesOverViewFromAPIRedux?.cancelledPercentage > 0
                    ? "increment"
                    : "decrement"
                }
                showMiniGraph={true}
              />
            </div>
          </div>
          <CustomBarChart
            data={chartDataFromAPIRedux}
            tooltipData={tooltipDataFromAPI}
            barColor="#67823D"
            barStyle={customBarStyle}
            showGrid={true} // Enable grid
            gridColor="#ccc" // Light gray grid
            gridStrokeWidth={0.5} // Subtle grid lines
            kpiTitle="All Activity"
            showRelatedTable={showAllActivityTable}
            setShowRelatedTable={setShowAllActivityTable}
          />
        </>
      )}
    </div>
  );
};

export default Employees;
