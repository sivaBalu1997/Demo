//      NewReports/Employee/index.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLocation,
  employeeStaffActivityRequest,
  employeeSalesOverviewRequest,
  getEmployeeActivityRequest,
  changeDateFilterType,
} from "redux/newReports/newReportsActions";
import { RootState } from "redux/rootReducer";
import { getEmployees } from "redux/employee/employeeActions";
import { EmployeeType } from "interface/employeeInterface";
import { formatNumberByCountry, transformSalesData } from "utils";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/r-arrow-left.svg";
import { NewTableHeader } from "interface/newReportsInterface";
import StoreFilter from "components/reportComponents/StoreFilter";
import CustomBarChart from "components/reportComponents/ReusableCharts/CustomBarChart";
import CardWithMiniGraph from "components/reportComponents/CardWithMiniGraph";
import CustomDropdown from "components/common/customDropdown";
import NewTable from "components/reportComponents/NewTable";
import useDateFilter from "hooks/useDateFilter";
import "./style.scss";

const Employees: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState({
    label: "Today",
    value: "Today",
  });
  const employeeSalesOverViewFromAPIRedux = useSelector(
    (state: any) => state?.newReports?.employeeSalesOverviewSuccess
  );

  const employeeSalesOverViewFromAPIReduxLoader = useSelector(
    (state: any) => state?.newReports?.employeeSalesOverviewLoading
  );
  const { startDate, endDate, handleDateChange } = useDateFilter();


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

  const datepickerApply = (data1: any, data2: any) => {
    handleDateChange("Custom Date", data1, data2);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPageEmployeeVoidActivity, setCurrentPageEmployeeVoidActivity] =
    useState<number>(1);


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
        if (selectedLocation?.value) {
          dispatch(
            employeeStaffActivityRequest({
              locationid: selectedLocation?.value,
              startDate: startDate,
              endDate: endDate,
              tablePageNo: currentPageEmployeeVoidActivity,
              tableRecordLimit: employeeVoidRecordLimit,
            })
          );
        }
        break;

      default:
        console.warn(`Unknown KPI title: ${kpiTitle}`);
    }
  };

  const chartDataFromAPIRedux = getEmployeeActivityDataFromAPIRedux?.map(
    (data: any) => ({ name: data?.actionType, value: data?.extractedValue })
  );

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

  useEffect(() => {
    if (selectedLocation?.value) {
      dispatch(
        getEmployees(
          selectedLocation?.value,
        )
      );
    }
  }, [selectedLocation?.value])

  const employeeLists: EmployeeType[] = useSelector(
    (state: RootState) => state.employee.employeeDetails
  );

  const employeeDropdownOptions =
    employeeLists?.map((employee) => ({
      value: employee?.staffId,
      label: `${employee?.firstName}`,
    }));

    console.log({employeeDropdownOptions});
    const employeeTempArray = [...employeeDropdownOptions, {label:"all", value:"all"}]


  const [employeeList, setEmployeeList] = useState(employeeTempArray?.[0]?.value);
  console.log({employeeList})


  const handleDropdownChangeStore = (selectedValue: any) => {
    setEmployeeList(selectedValue?.value);
  };


  useEffect(() => {
    if (selectedLocation?.value) {
      dispatch(
        employeeStaffActivityRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          tablePageNo: currentPageEmployeeVoidActivity,
          tableRecordLimit: employeeVoidRecordLimit,
        })
      );

    }
  }, [
    selectedLocation,
    startDate,
    endDate,
    currentPageEmployeeVoidActivity,
    employeeVoidRecordLimit,
  ]);


  const [selectedValueForChartSlice, setSelectedValueForChartSlice] = useState<string | "">("")

  const handleGoBackToChart = () => {
    setShowAllActivityTable(false);
    setSelectedValueForChartSlice("");
  };

  useEffect(() => {
    if (selectedLocation?.value && employeeList) {
      dispatch(
        employeeSalesOverviewRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          staffId: employeeList,
        })
      );
    }
  }, [selectedLocation?.value, startDate, endDate, employeeList]);

  useEffect(() => {
    if (selectedLocation?.value) {
      dispatch(
        getEmployeeActivityRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          staffId: employeeList,
        })
      );
    }
  }, [selectedLocation?.value, startDate, endDate, employeeList]);


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
                  options={employeeTempArray}
                  value={employeeTempArray?.[0]?.label}
                  className="category-dropdown"
                  onSelect={(selected: any) => handleDropdownChangeStore(selected as { label: React.ReactNode; value: string })}
                />
              </div>
            </div>
            <div className="employee-report-sales-overview-box-container">
              <CardWithMiniGraph
                cardTitle="Total Sales"
                cardValue={formatNumberByCountry(employeeSalesOverViewFromAPIRedux?.totalMagilSales, countryCode, true)}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.totalSalesPercentage
                }
                graphType="chart"
                incrementOrDecrement={transformSalesData(employeeSalesOverViewFromAPIRedux?.totalSalesPercentage)}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Net Sales"
                cardValue={
                  formatNumberByCountry(employeeSalesOverViewFromAPIRedux?.totalMagilNetSales, countryCode, true)
                }
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.netSalesPercentage
                }
                graphType="chart"
                incrementOrDecrement={transformSalesData(employeeSalesOverViewFromAPIRedux?.netSalesPercentage)}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Total Tax"
                cardValue={formatNumberByCountry(employeeSalesOverViewFromAPIRedux?.totalMagilTax, countryCode, true)}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.totalTaxPercentage
                }
                graphType="chart"
                incrementOrDecrement={transformSalesData(employeeSalesOverViewFromAPIRedux?.totalTipsPercentage)}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Total Tips"
                cardValue={formatNumberByCountry(employeeSalesOverViewFromAPIRedux?.totalMagilTips, countryCode, true)}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.totalTipsPercentage
                }
                graphType="chart"
                incrementOrDecrement={transformSalesData(employeeSalesOverViewFromAPIRedux?.totalTipsPercentage)}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Gratuity"
                cardValue={formatNumberByCountry(employeeSalesOverViewFromAPIRedux?.gratuity, countryCode, true)}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.gratuityPercentage
                }
                graphType="chart"
                incrementOrDecrement={transformSalesData(employeeSalesOverViewFromAPIRedux?.gratuityPercentage)}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Discount"
                cardValue={formatNumberByCountry(employeeSalesOverViewFromAPIRedux?.discounts, countryCode, true)}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.discountPercentage
                }
                graphType="chart"
                incrementOrDecrement={transformSalesData(employeeSalesOverViewFromAPIRedux?.discountPercentage)}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Cancelled"
                cardValue={formatNumberByCountry(employeeSalesOverViewFromAPIRedux?.cancelledOrders, countryCode, true)}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.cancelledPercentage
                }
                graphType="chart"
                incrementOrDecrement={transformSalesData(employeeSalesOverViewFromAPIRedux?.cancelledPercentage)}
                showMiniGraph={true}
              />
            </div>
          </div>
          <CustomBarChart
            data={chartDataFromAPIRedux}
            tooltipData={tooltipDataFromAPI}
            barColor="#67823D"
            barStyle={customBarStyle}
            showGrid={true} 
            gridColor="#ccc" 
            gridStrokeWidth={0.5} 
            kpiTitle="All Activity"
            showRelatedTable={showAllActivityTable}
            setShowRelatedTable={setShowAllActivityTable}
            setSelectedValueForChartSlice={setSelectedValueForChartSlice}
          />
          {/* <NewTable
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
          /> */}
        </>
      )}
    </div>
  );
};

export default Employees;