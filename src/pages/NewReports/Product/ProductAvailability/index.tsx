import React, { useEffect, useRef, useState } from 'react'
import MultiSwitchableBox from 'components/reportComponents/MultiSwitchableBox';
import "./style.scss"
import StoreFilter from 'components/reportComponents/StoreFilter';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation, employeeStaffActivityRequest, getEmployeeChartSliceTableRequest } from 'redux/newReports/newReportsActions';
import useDateFilter from 'hooks/useDateFilter';
import NewTable from 'components/reportComponents/NewTable';
import { ReactComponent as ArrowLeft } from "../../../../assets/svg/r-arrow-left.svg";
import CustomBarChart from 'components/reportComponents/ReusableCharts/CustomBarChart';

// r-arrow-left.svg

const ProductAvailability = () => {

  const texts = ["All", "Available", "Unavailable"];
  const [activeIndex, setActiveIndex] = useState<number>(0);
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

  const countryCode = useSelector(    (state: any) => state?.auth?.restaurantDetails?.country  );
  const currencySymbol = countryCode === "US" ? "$" : "₹";
  // useSelector for Table states :
  const getEmployeeChartSliceTableDataFromAPIRedux = useSelector((state: any) => state?.newReports?.employeeChartSliceTableSuccess?.content)
  const getEmployeeChartSliceTableDataFromAPIReduxtotalElements = useSelector((state: any) => state?.newReports?.employeeChartSliceTableSuccess?.totalElements)
  const getEmployeeChartSliceTotalPagesFromAPIRedux = useSelector((state: any) => state?.newReports?.employeeChartSliceTableSuccess?.totalPages)
  const getEmployeeChartSliceTableDataLoaderFromAPIRedux = useSelector((state: any) => state?.newReports?.employeeChartSliceTableLoading)
  const getEmployeeActivityDataFromAPIRedux = useSelector(
    (state: any) => state?.newReports?.getemployeeActivitySuccess
  );

  // Generic table states :
  const [genericTableRecordLimit, setGenericTableRecordLimit] = useState<number>(10);
  const [searchQueryForGenericTable, setSearchQueryForGenericTable] = useState("");
  const [currentPageGenericTable, setCurrentPageGenericTable] = useState<number>(1);

  const dispatch = useDispatch();

  const locations = useSelector((state: any) => state?.newReports?.storeLocationsList)
  const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)

  const { startDate, endDate, selectedDateFilterType, handleDateChange } =
  useDateFilter();
  
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


  const handleSwitch = (index: number) => {
    setActiveIndex(index);
  };

  const handleRefreshClick = () => {
    console.log("refreshed")
  }

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

      // Custom Bar Style
  const customBarStyle = {
    borderRadius: "8px",
  };

  return (
    <div className='report-product-insights'>
      {showAllActivityTable ? (<div
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
            searchPlaceHolder="Search By Category/Item"
            onSearch={handleSearch}
            totalElements={getEmployeeChartSliceTableDataFromAPIReduxtotalElements || 0}
          />
        </div>
        ) : (
          <>
            <StoreFilter storeOptions={locations}
              selectedStore={selectedLocation}
              setSelectedStore={(store) => dispatch(changeLocation(store))}
              handleRefreshClick={handleRefreshClick}
              showRefresh={true} showDate={false}
            />
            <MultiSwitchableBox texts={texts} activeIndex={activeIndex} onSwitch={handleSwitch} />
            <div ref={employeeChartRef}>
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
              kpiTitle="Availability Items By Channels"
              showRelatedTable={showAllActivityTable}
              setShowRelatedTable={setShowAllActivityTable}
              setSelectedValueForChartSlice={setSelectedValueForChartSlice}
            />
          </div>
          </>
        )
        
      }
    </div>
  )
}

export default ProductAvailability
