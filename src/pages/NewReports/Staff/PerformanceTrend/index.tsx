import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from 'redux/newReports/newReportsActions';
import { RootState } from 'redux/rootReducer';
import { EmployeeType } from 'interface/employeeInterface';
import { staffTrendErrorPerformanceRequest, staffTrendRevenueImpactPerformanceRequest, staffTrendSalesPerformanceRequest } from 'redux/staffReports/staffReportsActions';
import { deletedFilterOptionsErrorPerformance, orderFilterOptionsPerformance, refundsFilterOptionsRevenueImpact } from 'constants/reportConstants';
import { transformToChartAcceptables } from 'utils';
import MultiLineChart from 'components/reportComponents/ReusableCharts/MultiLineChart';
import StoreFilter from 'components/reportComponents/StoreFilter';
import useDateFilter from 'hooks/useDateFilter';
import CustomDropdown from "components/common/customDropdown";
import "./style.scss";


const PerformanceTrend = () => {

  const [selectedTypeForPerformance, setSelectedTypeForPerformance] = useState<string>("Orders")
  const [selectedTypeForRevenueImpact, setSelectedTypeForRevenueImpact] = useState<string>("Refunds")
  const [selectedErrorTypeErrorPerformance, setSelectedErrorTypeErrorPerformance] = useState<string>("Deleted")  

  const dispatch = useDispatch();

  const { startDate, endDate, selectedDateFilterType, handleDateChange } = useDateFilter();

  const multiLineColors = [
    "#049E16",
    "#F89B29", 
    "#2682D9", 
    "#FF5733", 
    "#FF33A1", 
    "#A133FF", 
    "#33FFF5", 
    "#FF6F61", 
    "#6B8E23", 
    "#DC143C"
  ];

  const chartFilterOptions: { value: string, label: string }[] = [
    { value: "Overall", label: "Overall" },
    { value: "Weekdays", label: "Weekdays" },
    { value: "Weekends", label: "Weekends" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
  ];

  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );

  const employeeLists: EmployeeType[] = useSelector(
    (state: RootState) => state.employee.employeeDetails
  );

  const salesPerformanceAPIRedux = useSelector(
    (state: any) => state?.staffReports?.staffTrendSalesPerformanceSuccess
  )

  const salesPerformanceAPIReduxLoader = useSelector(
    (state: any) => state?.staffReports?.staffTrendSalesPerformanceLoading
  )

  const salesPerformanceAPIReduxError = useSelector(
    (state: any) => state?.staffReports?.staffTrendSalesPerformanceFailure
  )
  
  const errorPerformanceAPIRedux = useSelector(
    (state: any) => state?.staffReports?.staffTrendErrorPerformanceSuccess
  )

  const errorPerformanceAPIReduxLoader = useSelector(
    (state: any) => state?.staffReports?.staffTrendErrorPerformanceLoading
  )

  const errorPerformanceAPIReduxError = useSelector(
    (state: any) => state?.staffReports?.staffTrendErrorPerformanceFailure
  )

  const revenueImpactAPIRedux = useSelector(
    (state: any) => state?.staffReports?.staffTrendRevenueImpactPerformanceSuccess
  )

  const revenueImpactAPIReduxLoader = useSelector(
    (state: any) => state?.staffReports?.staffTrendRevenueImpactPerformanceLoading
  )

  const revenueImpactAPIReduxError = useSelector(
    (state: any) => state?.staffReports?.staffTrendRevenueImpactPerformanceFailure
  )

    const countryCode = useSelector(
      (state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country
    );

  const handleChartFilter = (selectedValue: string, kpiTitle: string) => {
    // console.log(`Filter changed to ${selectedValue} for kpiTitle : ${kpiTitle}`);
    switch (kpiTitle) {
      case "Sales Performance":
        setSelectedTypeForPerformance(selectedValue);
        break;
      case "Revenue Impact":
        setSelectedTypeForRevenueImpact(selectedValue);
        break;
      case "Error Performance":
        setSelectedErrorTypeErrorPerformance(selectedValue);
        break;
      default:
        break;
    }
  };

  const employeeDropdownOptions =
    employeeLists?.map((employee) => ({
      value: employee?.staffId,
      label: `${employee?.firstName} ${employee?.lastName}`,
    }));

  const [employeeTempArray, setEmployeeTempArray] = useState<{ label: string; value: string }[]>([{ label: "All", value: "All" }, ...employeeDropdownOptions])

  const [employeeList, setEmployeeList] = useState(
    employeeTempArray?.[0]?.value
  );

  const [selectedLabel, setSelectedLabel] = useState<string>("");

  const [employeeLabelPill, setEmployeeLabelPill] = useState<{ label: string; value: string }[]>([employeeTempArray?.[0]])


  const handleDropdownChangeStore = (selectedValue: any) => {

    setEmployeeList(selectedValue?.value);

    const selectedOption = employeeTempArray?.find((employee) => employee.value === selectedValue.value);
    if (selectedOption) {
      setSelectedLabel(selectedOption.label);

      const isDuplicate = employeeLabelPill?.some(
        (item) => item.value === selectedOption.value
      );

      if (!isDuplicate) {
        setEmployeeLabelPill((prevLabels) => [
          ...prevLabels,
          { label: selectedOption.label, value: selectedOption.value },
        ]);
      }

      if (selectedValue.value !== 'All') {
        setEmployeeLabelPill((prev) =>
          prev?.filter((option) => option?.value !== 'All')
        );
      }

    }
  };

 let staffParam = employeeLabelPill?.filter((item)=>item?.value !== "All")?.map((item) => item?.value).join(",")

  // Function to remove an item from the employeeLabelPill array
  const removeItem = (value: string) => {
    if (value.toLowerCase() === "all") {
      return; // Don't remove if value is "All" or "all"
    }
    setEmployeeLabelPill((prevLabels) =>
      prevLabels?.filter((item) => item?.value !== value)
    );
  };

  useEffect(() => {
    dispatch(staffTrendSalesPerformanceRequest({
      locationid: selectedLocation?.value,
      startDate: startDate,
      endDate: endDate,
      staffIds: staffParam ? staffParam : "",
      // type: selectedTypeForPerformance, incase if backend fixes the issue of not getting data for selectedTypeForPerformance
    }))
  }, 
  [
    selectedLocation, 
    startDate, 
    endDate, 
    employeeLabelPill, 
    staffParam,
    // selectedTypeForPerformance, incase if backend fixes the issue of not getting data for selectedTypeForPerformance
  ])

  useEffect(()=>{
    dispatch(staffTrendErrorPerformanceRequest({
      locationid: selectedLocation?.value,
      startDate: startDate,
      endDate: endDate,
      staffIds: staffParam ? staffParam : "",
      errorType: selectedErrorTypeErrorPerformance,
    }))
  },
  [
    selectedLocation, 
    startDate, 
    endDate, 
    employeeLabelPill, 
    selectedErrorTypeErrorPerformance, 
    staffParam
  ])


  useEffect(() => {
    dispatch(staffTrendRevenueImpactPerformanceRequest({
      locationid: selectedLocation?.value,
      startDate: startDate,
      endDate: endDate,
      staffIds: staffParam ? staffParam : "",
      revenue: selectedTypeForRevenueImpact,
    }))
  }, [
    selectedLocation, 
    startDate, 
    endDate, 
    employeeLabelPill, 
    selectedTypeForRevenueImpact, 
    staffParam
  ])


  const handleClearAllForPill = () => {
    setEmployeeTempArray([{ label: "All", value: "All" }, ...employeeDropdownOptions])
    setEmployeeLabelPill([employeeTempArray[0]])
  }

  // TODO: use this function when Backend gives dynamic data for x-axis labels
  const getDefaultLablesArray = (selectedDateFilterType: string) => {
    switch (selectedDateFilterType) {
      case "Today":
        return ["1", "2","3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
      case "Yesterday":
        return ["1", "2","3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
      case "This Week":
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      case "This Month":
        return ["week1", "week2", "week3", "week4"];
      case "This Year":
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      default:
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      }
  }

  const salesPerformanceSales = transformToChartAcceptables({
    kpiTitle: "Sales Performance",
    dataFromApi: salesPerformanceAPIRedux,
    xAxisKey: "date",
    yAxisKey: "total",
    labelKey: "fullName",
    remainingKeys: ["tip", "serviceFee", "discount", "tax", "total", "orders"],
    defaultLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  })

  const salesPerformanceOrders = transformToChartAcceptables({
    kpiTitle: "Sales Performance",
    dataFromApi: salesPerformanceAPIRedux,
    xAxisKey: "date",
    yAxisKey: "orders",
    labelKey: "fullName",
    remainingKeys: ["tip", "serviceFee", "discount", "tax", "total", "orders"],
    defaultLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  })

  const salesPerformanceTips = transformToChartAcceptables({
    kpiTitle: "Sales Performance",
    dataFromApi: salesPerformanceAPIRedux,
    xAxisKey: "date",
    yAxisKey: "tips",
    labelKey: "fullName",
    remainingKeys: ["tip", "serviceFee", "discount", "tax", "total", "orders"],
    defaultLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  })

  const salesPerformanceGratuities = transformToChartAcceptables({
    kpiTitle: "Sales Performance",
    dataFromApi: salesPerformanceAPIRedux,
    xAxisKey: "date",
    yAxisKey: "gratuities",
    labelKey: "fullName",
    remainingKeys: ["tip", "serviceFee", "discount", "tax", "total", "orders"],
    defaultLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  })

  const getSalesPerformanceData = (selectedChartFilterForSalesPerformance: string) => {
    switch (selectedChartFilterForSalesPerformance) {
      case "Sales":
        return salesPerformanceSales;
      case "Orders":
        return salesPerformanceOrders;
      case "Tips":
        return salesPerformanceTips;
      case "Gratuities":
        return salesPerformanceGratuities;
      default:
        return salesPerformanceSales;
    }}


  const revenueImpactRefunds = transformToChartAcceptables({
    kpiTitle: "Revenue Impact",
    dataFromApi: revenueImpactAPIRedux,
    xAxisKey: "date",
    yAxisKey: "voidedAmount",
    labelKey: "steward",
    remainingKeys: ["voidedItems", "voidedAmount", "voidedReasons"],
    defaultLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  })

  const revenueImpactTaxes = transformToChartAcceptables({
    kpiTitle: "Revenue Impact",
    dataFromApi: revenueImpactAPIRedux,
    xAxisKey: "date",
    yAxisKey: "tax",
    labelKey: "fullName",
    remainingKeys: ["tip", "serviceFee", "discount", "tax", "total", "orders"],
    defaultLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  })

  const revenueImpactTips = transformToChartAcceptables({
    kpiTitle: "Revenue Impact",
    dataFromApi: revenueImpactAPIRedux,
    xAxisKey: "date",
    yAxisKey: "tip",
    labelKey: "fullName",
    remainingKeys: ["tip", "serviceFee", "discount", "tax", "total", "orders"],
    defaultLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  })

  const revenueImpactDiscounts = transformToChartAcceptables({
    kpiTitle: "Revenue Impact",
    dataFromApi: revenueImpactAPIRedux,
    xAxisKey: "date",
    yAxisKey: "discount",
    labelKey: "fullName",
    remainingKeys: ["tip", "serviceFee", "discount", "tax", "total", "orders"],
    defaultLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  })

  const revenueImpactGratuities = transformToChartAcceptables({
    kpiTitle: "Revenue Impact",
    dataFromApi: revenueImpactAPIRedux,
    xAxisKey: "date",
    yAxisKey: "serviceFee",
    labelKey: "fullName",
    remainingKeys: ["tip", "serviceFee", "discount", "tax", "total", "orders"],
    defaultLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  })

  const getRevenueImpactData = (selectedChartFilterForRevenueImpact: string) => {
    switch (selectedChartFilterForRevenueImpact) {
      case "Refunds":
        return revenueImpactRefunds;
      case "Taxes":
        return revenueImpactTaxes;
      case "Tips":
        return revenueImpactTips;
      case "Discounts":
        return revenueImpactDiscounts;
      case "Gratuities":
        return revenueImpactGratuities;
      default:
        return revenueImpactRefunds;
    }
  }

  

  const errorPerformanceData = transformToChartAcceptables({
    kpiTitle: "Error Performance",
    dataFromApi: errorPerformanceAPIRedux,
    xAxisKey: "day",
    yAxisKey: "totalQuantity",
    labelKey: "employeeName",
    remainingKeys: ["totalQuantity"],
    defaultLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    })


  return (
    <div className='performance-trend-page-container'>
      <StoreFilter
        startDate={startDate}
        endDate={endDate}
        storeOptions={locations}
        selectedDate={selectedDateFilterType}
        selectedStore={selectedLocation}
        setSelectedDate={handleDateChange}
        setSelectedStore={(store) => dispatch(changeLocation(store))}
      />
      <div className="employee-pt-section">
        <div className="select-employee-container">
          <p>Select employee</p>
          <div className="select-employee-dropdown">
            <CustomDropdown
              options={employeeTempArray}
              value={employeeTempArray?.[0]?.label}
              className="category-dropdown"
              onSelect={(selected: any) =>
                handleDropdownChangeStore(
                  selected as { label: string; value: string }
                )
              }
            />
          </div>
          <p className='pt-select-employee-clear-text' onClick={handleClearAllForPill}>clear</p>
        </div>
        <div className='employee-pt-pill-container'>
          <p className='selected-label'>Selected:</p>
          {employeeLabelPill?.map((item, index) => (
            <div
              key={index}
              className='selected-employee-pill'
            >
              {item?.label}
              <span
                onClick={() => removeItem(item?.value)} // Pass the item's value to removeItem
                className='remove-employee-pill'
              >
                {item?.label === "All" ? "" : "x"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className='perf-trend-chart-container'>
        <MultiLineChart
          kpiLoaderState={salesPerformanceAPIReduxLoader}
          kpiTitle='Sales Performance'
          data={getSalesPerformanceData(selectedTypeForPerformance)}
          showDownloadReport={true}
          showChartFilter={true}
          chartFilterOptions={orderFilterOptionsPerformance}
          handleChartFilter={handleChartFilter}
          onFailureState={salesPerformanceAPIReduxError}
        />
        <MultiLineChart
          kpiLoaderState={revenueImpactAPIReduxLoader}
          kpiTitle='Revenue Impact'
          data={getRevenueImpactData(selectedTypeForRevenueImpact)}
          showDownloadReport={true}
          showChartFilter={true}
          chartFilterOptions={refundsFilterOptionsRevenueImpact}
          handleChartFilter={handleChartFilter}
          onFailureState={revenueImpactAPIReduxError}
        />
        <MultiLineChart
          kpiLoaderState={errorPerformanceAPIReduxLoader}
          kpiTitle='Error Performance'
          data={errorPerformanceData}
          showDownloadReport={true}
          showChartFilter={true}
          chartFilterOptions={deletedFilterOptionsErrorPerformance}
          handleChartFilter={handleChartFilter}
          onFailureState={errorPerformanceAPIReduxError}
        />
      </div>
    </div>
  )
}

export default PerformanceTrend
