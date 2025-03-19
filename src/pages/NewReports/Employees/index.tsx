//      NewReports/Employee/index.tsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLocation,
  employeeStaffActivityRequest,
  employeeSalesOverviewRequest,
  getEmployeeActivityRequest,
  getEmployeeChartSliceTableRequest,
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
import ErrorHandler from "components/reportComponents/ErrorHandler";

// Custom Bar Style
const customBarStyle = {
  borderRadius: "8px",
};

const Employees: React.FC = () => {
  const [employeeVoidRecordLimit, setEmployeeVoidRecordLimit] =
    useState<number>(10);

  const employeeChartRef = useRef<HTMLDivElement>(null);

  const [showAllActivityTable, setShowAllActivityTable] =
    useState<boolean>(false);
  const [selectedValueForChartSlice, setSelectedValueForChartSlice] = useState<
    string | ""
  >("");
  const [currentPageEmployeeVoidActivity, setCurrentPageEmployeeVoidActivity] =
    useState<number>(1);

  const employeeSalesOverViewFromAPIRedux = useSelector(
    (state: any) => state?.newReports?.employeeSalesOverviewSuccess
  );
  const employeeSalesOverViewFromAPIReduxLoader = useSelector(
    (state: any) => state?.newReports?.employeeSalesOverviewLoading
  );

  const countryCode = useSelector(    (state: any) => state?.auth?.restaurantDetails?.country  );

  const currencySymbol = countryCode === "US" ? "$" : "₹";



  // useSelector for Table states :
  const getEmployeeChartSliceTableDataFromAPIRedux = useSelector((state: any) => state?.newReports?.employeeChartSliceTableSuccess?.content)
  const getEmployeeChartSliceTableDataFromAPIReduxTotalElements = useSelector((state: any) => state?.newReports?.employeeChartSliceTableSuccess?.totalElements)
  const getEmployeeChartSliceTotalPagesFromAPIRedux = useSelector((state: any) => state?.newReports?.employeeChartSliceTableSuccess?.totalPages)
  const getEmployeeChartSliceTableDataLoaderFromAPIRedux = useSelector((state: any) => state?.newReports?.employeeChartSliceTableLoading)
  // console.log("PPP", { getEmployeeChartSliceTableDataFromAPIRedux, getEmployeeChartSliceTotalPagesFromAPIRedux, getEmployeeChartSliceTableDataLoaderFromAPIRedux })

  // Generic table states :
  const [genericTableRecordLimit, setGenericTableRecordLimit] = useState<number>(10);
  const [searchQueryForGenericTable, setSearchQueryForGenericTable] = useState("");
  const [currentPageGenericTable, setCurrentPageGenericTable] = useState<number>(1);



  const { startDate, endDate, selectedDateFilterType, handleDateChange } =
    useDateFilter();
  const dispatch = useDispatch();

  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );

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

  const getEmployeeActivityDataFromAPIReduxFailure = useSelector(
    (state: any) => state?.newReports?.getemployeeActivityFailure
  );


  useEffect(() => {
    if (selectedLocation?.value) {
      dispatch(getEmployees(selectedLocation?.value));
    }
  }, [selectedLocation?.value]);

  const [selectedValueStateData, setSelectedValueStateData] =
    useState<NewTableHeader[]>();

  const getChartSliceTableHeaders = (selectedValueForChartSlice: string) => {
    // console.log("PPP5", { selectedValueForChartSlice })
    switch (selectedValueForChartSlice) {
      case "Remove tax":
        return [
          {
            key: "actionType",
            label: `Action Type`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "createdTime",
            label: "Created time",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "fromDetails",
            label: `From details`,
            isSortable: true,
            alignment: "right",
          },
          {
            key: "orderNo",
            label: "Order number",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "staffId",
            label: `Staff Id`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "staffName",
            label: `Staff Name`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "toDetails",
            label: `To details`,
            isSortable: true,
            alignment: "right",
          },
        ];

      case "Apply discount":
        return [
          {
            key: "orderNo",
            label: "Order number",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "staffId",
            label: `Staff Id`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "createdTime",
            label: "Created time",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "fromDetails",
            label: `From details (${currencySymbol})`,
            isSortable: true,
            alignment: "right",
          },
          {
            key: "actionType",
            label: `Action Type`,
            isSortable: true,
            alignment: "left",
          },
        ];

      case "Order edited":
        return [
          {
            key: "orderNo",
            label: "Order number",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "createdTime",
            label: "Created time",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "staffId",
            label: `Staff Id`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "actionType",
            label: `Action Type`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "fromDetails",
            label: `From details`,
            isSortable: true,
            alignment: "right",
          },
          {
            key: "toDetails",
            label: `To details`,
            isSortable: true,
            alignment: "right",
          },
        ];

      case "Order cancelled":
        return [
          {
            key: "actionType",
            label: `Action Type`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "createdTime",
            label: "Created time",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "fromDetails",
            label: `From details`,
            isSortable: true,
            alignment: "right",
          },
          {
            key: "orderNo",
            label: "Order number",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "staffId",
            label: `Staff Id`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "staffName",
            label: `Staff Name`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "toDetails",
            label: `To details`,
            isSortable: true,
            alignment: "right",
          },
        ];

      case "Void payment":
        return [
          {
            key: "actionType",
            label: `Action Type`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "createdTime",
            label: "Created time",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "fromDetails",
            label: `From details`,
            isSortable: true,
            alignment: "right",
          },
          {
            key: "orderNo",
            label: "Order number",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "staffId",
            label: `Staff Id`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "staffName",
            label: `Staff Name`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "toDetails",
            label: `To details`,
            isSortable: true,
            alignment: "right",
          },
        ];

      case "Remove tip":
        return [
          {
            key: "orderNumber",
            label: "Order number",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "dateAndTime",
            label: `Date & Time`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "amount",
            label: `Amount (${currencySymbol})`,
            isSortable: true,
            alignment: "right",
          },
          {
            key: "staffName",
            label: `Staff name`,
            isSortable: true,
            alignment: "left",
          },
        ];

      case "Remove service tax":
        return [
          {
            key: "orderNumber",
            label: "Order number",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "dateAndTime",
            label: `Date& Time`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "amount",
            label: `Amount (${currencySymbol})`,
            isSortable: true,
            alignment: "right",
          },
          {
            key: "staffName",
            label: `Staff name`,
            isSortable: true,
            alignment: "left",
          },
        ];

      case "Others":
        return [
          {
            key: "orderNo",
            label: "Order number",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "staffId",
            label: `Staff Id`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "createdTime",
            label: "Created time",
            isSortable: true,
            alignment: "left",
          },
          {
            key: "actionType",
            label: `Action Type`,
            isSortable: true,
            alignment: "left",
          },
          {
            key: "fromDetails",
            label: `From details`,
            isSortable: true,
            alignment: "right",
          },
          {
            key: "toDetails",
            label: `To details`,
            isSortable: true,
            alignment: "right",
          },
          {
            key: "staffName",
            label: `Staff Name`,
            isSortable: true,
            alignment: "left",
          },
        ];

      default:
        return [];
    }
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

  const datepickerApply = (data1: any, data2: any) => {
    handleDateChange("Custom Date", data1, data2);
  };

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
    setSearchQueryForGenericTable(value);
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

  const chartDataFromAPIReduxOthers =
    getEmployeeActivityDataFromAPIRedux?.reduce((acc: any[], data: any) => {
      if (
        data.actionType === "Order edited" ||
        data.actionType === "Order cancelled"
      ) {
        const existingOthers = acc.find((item) => item.name === "Others");
        if (existingOthers) {
          existingOthers.value += data.extractedValue;
        } else {
          acc.push({ name: "Others", value: data.extractedValue });
        }
      } else {
        acc.push({ name: data.actionType, value: data.extractedValue });
      }
      return acc;
    }, []);

  // console.log("RRR",{chartDataFromAPIReduxOthers})

  const tooltipDataFromAPI = getEmployeeActivityDataFromAPIRedux?.reduce(
    (acc: any, data: any) => {
      acc[data.actionType] = {
        tooltipContent: `Value: ${data.extractedValue}`,
      };
      return acc;
    },
    {}
  );

  const tooltipDataFromAPIOthers = getEmployeeActivityDataFromAPIRedux?.reduce(
    (acc: any, data: any) => {
      if (
        data.actionType === "Order edited" ||
        data.actionType === "Order cancelled"
      ) {
        if (acc["Others"]) {
          acc["Others"].tooltipContent = `Value: ${
            parseFloat(acc["Others"].tooltipContent.split(": ")[1]) +
            data.extractedValue
          }`;
        } else {
          acc["Others"] = { tooltipContent: `Value: ${data.extractedValue}` };
        }
      } else {
        acc[data.actionType] = {
          tooltipContent: `Value: ${data.extractedValue}`,
        };
      }
      return acc;
    },
    {}
  );

  // console.log("RR",{tooltipDataFromAPIOthers})

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

  useEffect(() => {
    if (selectedLocation?.value) {
      dispatch(getEmployees(selectedLocation?.value));
    }
  }, [selectedLocation?.value]);

  const employeeLists: EmployeeType[] = useSelector(
    (state: RootState) => state.employee.employeeDetails
  );

  const employeeLoader = useSelector(
    (state: RootState) => state.employee.employeeDetailsLoading
  );

  const employeeDropdownOptions =
    employeeLists?.map((employee) => ({
      value: employee?.staffId,
      label: `${employee?.firstName}`,
    }));

  const employeeTempArray = [{ label: "All", value: "All" },...employeeDropdownOptions ]

  const [employeeList, setEmployeeList] = useState(
    employeeTempArray?.[0]?.value
  );

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

  const handleGoBackToChart = () => {
    setShowAllActivityTable(false);
    setSelectedValueForChartSlice("");
    setTimeout(() => {
      employeeChartRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  useEffect(() => {
    if (selectedLocation?.value && employeeList) {
      dispatch(
        employeeSalesOverviewRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          staffId: employeeList === "All" ? "" : employeeList,
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
          staffId: employeeList === "All" ? "" : employeeList,
        })
      );
    }
  }, [selectedLocation?.value, startDate, endDate, employeeList]);

  useEffect(() => {
    if (selectedLocation?.value && selectedValueForChartSlice) {
      dispatch(
        getEmployeeChartSliceTableRequest({
          locationid: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          chartSliceName:
            selectedValueForChartSlice === "Others"
              ? "Order cancelled,Order edited"
              : selectedValueForChartSlice,
          tablePageNo: currentPageGenericTable,
          tableRecordLimit: genericTableRecordLimit,
        })
      );
    }
  }, [
    selectedLocation?.value,
    startDate,
    endDate,
    selectedValueForChartSlice,
    currentPageGenericTable,
    genericTableRecordLimit,
  ]);

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
            kpiTitle={`${selectedValueForChartSlice}`}
            searchQuery={searchQueryForGenericTable}
            headerData={getChartSliceTableHeaders(selectedValueForChartSlice)}
            tableData={
              getEmployeeChartSliceTableDataFromAPIRedux &&
              getEmployeeChartSliceTableDataFromAPIRedux?.length > 0 &&
              getEmployeeChartSliceTableDataFromAPIRedux
            }
            currentPage={currentPageGenericTable}
            totalPages={getEmployeeChartSliceTotalPagesFromAPIRedux}
            onPageChange={setCurrentPageGenericTable}
            rowsPerPage={genericTableRecordLimit}
            setRowsPerPage={setGenericTableRecordLimit}
            loader={getEmployeeChartSliceTableDataLoaderFromAPIRedux}
            count={getEmployeeChartSliceTableDataFromAPIRedux?.length}
            searchPlaceHolder="Search By Steward, Voided reasons"
            onSearch={handleSearch}
            totalElements={getEmployeeChartSliceTableDataFromAPIReduxTotalElements || 0}
          />
        </div>
      ) : (
        <>
          <StoreFilter
            startDate={startDate}
            endDate={endDate}
            storeOptions={locations}
            selectedDate={selectedDateFilterType}
            selectedStore={selectedLocation}
            setSelectedDate={(data) => handleDateChange(data?.value)}
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
                  onSelect={(selected: any) =>
                    handleDropdownChangeStore(
                      selected as { label: React.ReactNode; value: string }
                    )
                  }
                  loader={employeeLoader}
                />
              </div>
            </div>
            <div className="employee-report-sales-overview-box-container">
              <CardWithMiniGraph
                cardTitle="Total Sales"
                cardValue={formatNumberByCountry(
                  employeeSalesOverViewFromAPIRedux?.totalMagilSales,
                  countryCode,
                  true
                )}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                // loader={true}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.totalSalesPercentage
                }
                graphType="arrow"
                incrementOrDecrement={transformSalesData(
                  employeeSalesOverViewFromAPIRedux?.totalSalesPercentage
                )}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Net Sales"
                cardValue={formatNumberByCountry(
                  employeeSalesOverViewFromAPIRedux?.totalMagilNetSales,
                  countryCode,
                  true
                )}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.netSalesPercentage
                }
                graphType="arrow"
                incrementOrDecrement={transformSalesData(
                  employeeSalesOverViewFromAPIRedux?.netSalesPercentage
                )}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Total Tax"
                cardValue={formatNumberByCountry(
                  employeeSalesOverViewFromAPIRedux?.totalMagilTax,
                  countryCode,
                  true
                )}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.totalTaxPercentage
                }
                graphType="arrow"
                incrementOrDecrement={transformSalesData(
                  employeeSalesOverViewFromAPIRedux?.totalTipsPercentage
                )}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Total Tips"
                cardValue={formatNumberByCountry(
                  employeeSalesOverViewFromAPIRedux?.totalMagilTips,
                  countryCode,
                  true
                )}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.totalTipsPercentage
                }
                graphType="arrow"
                incrementOrDecrement={transformSalesData(
                  employeeSalesOverViewFromAPIRedux?.totalTipsPercentage
                )}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Gratuity"
                cardValue={formatNumberByCountry(
                  employeeSalesOverViewFromAPIRedux?.gratuity,
                  countryCode,
                  true
                )}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.gratuityPercentage
                }
                graphType="arrow"
                incrementOrDecrement={transformSalesData(
                  employeeSalesOverViewFromAPIRedux?.gratuityPercentage
                )}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Discount"
                cardValue={formatNumberByCountry(
                  employeeSalesOverViewFromAPIRedux?.discounts,
                  countryCode,
                  true
                )}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.discountPercentage
                }
                graphType="arrow"
                incrementOrDecrement={transformSalesData(
                  employeeSalesOverViewFromAPIRedux?.discountPercentage
                )}
                showMiniGraph={true}
              />
              <CardWithMiniGraph
                cardTitle="Cancelled"
                cardValue={formatNumberByCountry(
                  employeeSalesOverViewFromAPIRedux?.cancelledOrders,
                  countryCode,
                  true
                )}
                isMonetary={true}
                loader={employeeSalesOverViewFromAPIReduxLoader}
                incrementDecrementValue={
                  employeeSalesOverViewFromAPIRedux?.cancelledPercentage
                }
                graphType="arrow"
                incrementOrDecrement={transformSalesData(
                  employeeSalesOverViewFromAPIRedux?.cancelledPercentage
                )}
                showMiniGraph={true}
              />
            </div>
          </div>
          <div ref={employeeChartRef}>
              <ErrorHandler data={getEmployeeActivityDataFromAPIRedux} isError={getEmployeeActivityDataFromAPIReduxFailure} >
                <CustomBarChart
                  // data={chartDataFromAPIRedux}
                  data={chartDataFromAPIReduxOthers}
                  // tooltipData={tooltipDataFromAPI}
                  tooltipData={tooltipDataFromAPIOthers}
                  barColor={["#67823D"]}
                  barStyle={customBarStyle}
                  showGrid={true}
                  gridColor="#ccc"
                  gridStrokeWidth={0.5}
                  kpiTitle="All Activity"
                  showRelatedTable={showAllActivityTable}
                  setShowRelatedTable={setShowAllActivityTable}
                  setSelectedValueForChartSlice={setSelectedValueForChartSlice}
                />
              </ErrorHandler>
          </div>
        </>
      )}
    </div>
  );
};

export default Employees;
