import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from 'redux/newReports/newReportsActions';
import { RootState } from 'redux/rootReducer';
import { EmployeeType } from 'interface/employeeInterface';
import { transformChartData } from 'utils';
import { staffTrendSalesPerformanceRequest } from 'redux/staffReports/staffReportsActions';
import MultiLineChart from 'components/reportComponents/ReusableCharts/MultiLineChart';
import StoreFilter from 'components/reportComponents/StoreFilter';
import useDateFilter from 'hooks/useDateFilter';
import CustomDropdown from "components/common/customDropdown";
import "./style.scss";


const PerformanceTrend = () => {
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
  const orderFilterOptions = [
    { value: "Orders", label: "Orders" },
    { value: "Sales", label: "Sales" },
    { value: "Tips", label: "Tips" },
    { value: "Gratuities", label: "Gratuities" },
  ]
  const refundsFilterOptions = [
    { value: "Refunds", label: "Refunds" },
    { value: "Complementary", label: "Complementary" },
    { value: "Taxes", label: "Taxes" },
    { value: "Tips", label: "Tips" },
    { value: "Discounts", label: "Discounts" },
    { value: "Gratuities", label: "Gratuities" },
  ]
  const deletedFilterOptions = [
    { value: "Deleted", label: "Deleted" },
    { value: "Voids", label: "Voids" },
    { value: "Re-fires", label: "Re-fires" },
  ]


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

    const countryCode = useSelector(
      (state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country
    );

  const handleChartFilter = (selectedValue: string, kpiTitle: string) => {
    console.log(`Filter changed to ${selectedValue} for kpiTitle : ${kpiTitle}`);
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

      const isDuplicate = employeeLabelPill.some(
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

  const chartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'James Bond',
        data: [100, 120, 130, 140, 150, 160, 170],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        orders: [30, 35, 40, 45, 50, 55, 60],
        sales: [100.00, 120.00, 130.00, 140.00, 150.00, 160.00, 170.00],
        tips: [20.00, 25.00, 30.00, 35.00, 40.00, 45.00, 50.00],
        // gratuities: [10.00, 15.00, 20.00, 25.00, 30.00, 35.00, 40.00],
      },
      {
        label: 'Alan Fox',
        data: [110, 115, 125, 135, 145, 155, 165],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        orders: [42, 44, 46, 48, 50, 52, 54],
        sales: [135.50, 140.00, 145.00, 150.00, 155.00, 160.00, 165.00],
        tips: [38.50, 40.00, 42.00, 44.00, 46.00, 48.00, 50.00],
        // gratuities: [40.50, 42.00, 44.00, 46.00, 48.00, 50.00, 52.00],
      },
      {
        label: 'Ajith Kumar',
        data: [105, 110, 120, 130, 140, 150, 160],
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        orders: [25, 30, 35, 40, 45, 50, 55],
        sales: [105.00, 110.00, 120.00, 130.00, 140.00, 150.00, 160.00],
        tips: [15.00, 20.00, 25.00, 30.00, 35.00, 40.00, 45.00],
        // gratuities: [20.00, 25.00, 30.00, 35.00, 40.00, 45.00, 50.00],
      },
    ],
  };

  const chartDataFromAPI = [
    {
      "date": "Sunday",
      "fullName": "Jisoo ",
      "tip": "0.00",
      "serviceFee": "28.79",
      "total": "359.00",
      "orders": 2
    },
    {
      "date": "Monday",
      "fullName": "Jisoo ",
      "tip": "11.98",
      "serviceFee": "610.97",
      "total": "4908.38",
      "orders": 8
    },
    {
      "date": "Monday",
      "fullName": "stg two",
      "tip": "0.00",
      "serviceFee": "255.28",
      "total": "1848.51",
      "orders": 17
    },
    {
      "date": "Tuesday",
      "fullName": "Jisoo ",
      "tip": "0.00",
      "serviceFee": "252.20",
      "total": "2692.57",
      "orders": 10
    },
    {
      "date": "Tuesday",
      "fullName": "stg two",
      "tip": "61.93",
      "serviceFee": "411.93",
      "total": "3676.55",
      "orders": 39
    },
    {
      "date": "Wednesday",
      "fullName": "Jisoo ",
      "tip": "37.79",
      "serviceFee": "36.35",
      "total": "2942.66",
      "orders": 11
    },
    {
      "date": "Wednesday",
      "fullName": "stg two",
      "tip": "0.00",
      "serviceFee": "59.46",
      "total": "586.58",
      "orders": 5
    },
    {
      "date": "Thursday",
      "fullName": "Jisoo ",
      "tip": "0.00",
      "serviceFee": "436.80",
      "total": "5792.10",
      "orders": 14
    },
    {
      "date": "Thursday",
      "fullName": "stg two",
      "tip": "0.00",
      "serviceFee": "807.16",
      "total": "7597.56",
      "orders": 33
    },
    {
      "date": "Friday",
      "fullName": "Jisoo ",
      "tip": "6.19",
      "serviceFee": "180.47",
      "total": "1243.90",
      "orders": 7
    },
    {
      "date": "Friday",
      "fullName": "stg two",
      "tip": "0.00",
      "serviceFee": "375.35",
      "total": "6730.82",
      "orders": 41
    },
    {
      "date": "Saturday",
      "fullName": "stg two",
      "tip": "0.00",
      "serviceFee": "1.94",
      "total": "13.45",
      "orders": 1
    }
  ]

  const salesPerformanceTrendChartData = transformChartData(salesPerformanceAPIRedux, countryCode === "US" ? "US" : "IN");
  // console.log("PPP", salesPerformanceTrendChartData)

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
      staffIds: employeeLabelPill?.map((item) => item?.value).join(","),
    }))
  }, [selectedLocation, startDate, endDate, employeeLabelPill])


  const handleClearAllForPill = () => {
    setEmployeeTempArray([{ label: "All", value: "All" }, ...employeeDropdownOptions])
    setEmployeeLabelPill([employeeTempArray[0]])
  }

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
      <div>
        <MultiLineChart
          kpiLoaderState={false}
          kpiTitle='Sales Performance'
          data={salesPerformanceTrendChartData}
          showDownloadReport={true}
          showChartFilter={true}
          chartFilterOptions={orderFilterOptions}
          handleChartFilter={handleChartFilter}
        />
      </div>
      <div>
        <MultiLineChart
          kpiLoaderState={false}
          kpiTitle='Revenue Impact'
          data={chartData}
          showDownloadReport={true}
          showChartFilter={true}
          chartFilterOptions={refundsFilterOptions}
          handleChartFilter={handleChartFilter}
        />
      </div>
      <div>
        <MultiLineChart
          kpiLoaderState={false}
          kpiTitle='Error Performance'
          data={chartData}
          showDownloadReport={true}
          showChartFilter={true}
          chartFilterOptions={deletedFilterOptions}
          handleChartFilter={handleChartFilter}
        />
      </div>
    </div>
  )
}

export default PerformanceTrend
