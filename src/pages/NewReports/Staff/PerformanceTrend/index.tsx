import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from 'redux/newReports/newReportsActions';
import { RootState } from 'redux/rootReducer';
import { EmployeeType } from 'interface/employeeInterface';
import MultiLineChart from 'components/reportComponents/ReusableCharts/MultiLineChart';
import StoreFilter from 'components/reportComponents/StoreFilter';
import useDateFilter from 'hooks/useDateFilter';
import CustomDropdown from "components/common/customDropdown";
import "./style.scss";


const PerformanceTrend = () => {

  const multiLineColors = ["#049E16", "#F89B29", "#2682D9", "#FF5733", "#FF33A1", "#A133FF", "#33FFF5", "#FF6F61", "#6B8E23", "#DC143C"];

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

  const { startDate, endDate, selectedDateFilterType, handleDateChange } =
  useDateFilter();

   const dispatch = useDispatch();

   const locations = useSelector(
      (state: any) => state?.newReports?.storeLocationsList
    );
    const selectedLocation = useSelector(
      (state: any) => state?.newReports?.selectedLocation
    );

      const employeeLists: EmployeeType[] = useSelector(
        (state: RootState) => state.employee.employeeDetails
      );
  
  const handleChartFilter = (selectedValue: string, kpiTitle: string) => {
    console.log(`Filter changed to ${selectedValue} for kpiTitle : ${kpiTitle}`);
  };

  const datepickerApply = (data1: any, data2: any) => {
    handleDateChange("Custom Date", data1, data2);
  };

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
        gratuities: [10.00, 15.00, 20.00, 25.00, 30.00, 35.00, 40.00],
      },
      {
        label: 'Alan Fox',
        data: [110, 115, 125, 135, 145, 155, 165],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        orders: [42, 44, 46, 48, 50, 52, 54],
        sales: [135.50, 140.00, 145.00, 150.00, 155.00, 160.00, 165.00],
        tips: [38.50, 40.00, 42.00, 44.00, 46.00, 48.00, 50.00],
        gratuities: [40.50, 42.00, 44.00, 46.00, 48.00, 50.00, 52.00],
      },
      {
        label: 'Ajith Kumar',
        data: [105, 110, 120, 130, 140, 150, 160],
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        orders: [25, 30, 35, 40, 45, 50, 55],
        sales: [105.00, 110.00, 120.00, 130.00, 140.00, 150.00, 160.00],
        tips: [15.00, 20.00, 25.00, 30.00, 35.00, 40.00, 45.00],
        gratuities: [20.00, 25.00, 30.00, 35.00, 40.00, 45.00, 50.00],
      },
    ],
  };

  return (
    <div className='performance-trend-page-container'>
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
          />
        </div>
        <p>clear</p>
      </div>
      <MultiLineChart 
        kpiLoaderState={false} 
        kpiTitle='Sales Performance' 
        data={chartData} 
        showDownloadReport={true}
        showChartFilter={true}
        chartFilterOptions={[
          { value: "last_3_months", label: "Last 3 Months" },
          { value: "last_6_months", label: "Last 6 Months" },
        ]}
        handleChartFilter={handleChartFilter}
      />
    </div>
  )
}

export default PerformanceTrend
