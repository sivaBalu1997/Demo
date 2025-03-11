import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from 'redux/newReports/newReportsActions';
import StoreFilter from 'components/reportComponents/StoreFilter'
import useDateFilter from 'hooks/useDateFilter';
import "./style.scss"
import CardTypeChart from 'components/reportComponents/chart';
import DownloadReport from 'components/reportComponents/DownloadReports';
import ReusableBarChart from 'components/reportComponents/ReusableCharts/ReusableBarChart';
import CustomDropdown from 'components/common/customDropdown';
import CustomDropDown from 'components/common/custom_dropdown_with_multiselect/CustomDropdown';

const foodSalesData = [
  { "Product Name": "Steak", Sales: 7500 },
  { "Product Name": "Sushi", Sales: 5000 },
  { "Product Name": "Dumplings", Sales: 3200 },
  { "Product Name": "Noodles", Sales: 2900 },
  { "Product Name": "Fried Rice", Sales: 2700 },
  { "Product Name": "Tacos", Sales: 1200 },
  { "Product Name": "Sandwich", Sales: 1100 },
  { "Product Name": "parotta", Sales: 1100 },
  { "Product Name": "Egg Parotta", Sales: 1100 },
  { "Product Name": "Salad", Sales: 900 }
];

const chartFilterOptions: { value: string, label: string }[] = [
  { value: "Overall", label: "Overall" },
  { value: "Weekdays", label: "Weekdays" },
  { value: "Weekends", label: "Weekends" },
  { value: "Lunch", label: "Lunch" },
  { value: "Dinner", label: "Dinner" },
];

const ProductAvailability = () => {

  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );
  const salesCardTypeData = useSelector((state: any) => state?.newReports?.salesCardTypeData?.content);
  const salesCardTypeDataLoading = useSelector((state: any) => state?.newReports?.salesCardTypeLoading);


  const dispatch = useDispatch();

  const { startDate, endDate, selectedDateFilterType, handleDateChange } =
    useDateFilter();

  const datepickerApply = (type: string, data1?: any, data2?: any) => {
    handleDateChange("Custom Date", data1, data2);
  };

  const handleChartFilter = (selectedValue: string, kpiTitle: string) => {
    console.log(`Filter changed to ${selectedValue} for kpiTitle : ${kpiTitle}`);
  };

  const getToggledValueInParentPage = (activeTextForChart: string, kpiTitle: string) => {
    console.log(`active text of ${kpiTitle} is ${activeTextForChart}`)
  }

  return (
    <div className="report-product-availability">
      <StoreFilter
        storeOptions={locations}
        selectedDate={selectedDateFilterType}
        selectedStore={selectedLocation}
        setSelectedDate={(data) => handleDateChange(data?.value)}
        datePickerApplyFunction={(date1: any, date2: any) =>
          datepickerApply
            ("Custom Date", date1, date2)
        }
        dateDropdownFunction={(date1: any, date2: any) =>
          datepickerApply("Custom Date", date1, date2)
        }
        setSelectedStore={(store) => dispatch(changeLocation(store))}
      />
      <ReusableBarChart
          dataList={foodSalesData}
          loader={false}
          xKey="Product Name"
          yKey="Sales"
          // extraKeys={["orders"]}
          title="Top 10 Revenue Making Categories"
          barColor="#049E16"
          // xPrefix="👤 "
          yPrefix="$"
          ySuffix="K"
          tooltipStyles={{
            backgroundColor: "white",
            borderColor: "#049E16",
            titleColor: "black",
            bodyColor: "black",
          }}
          kpiTitle='Top 10 Revenue Making Categories'
          showChartFilter={true}
          handleChartFilter={handleChartFilter}
          showSwitchable={false}
          switchableTextOne='Most popular'
          switchableTextTwo='Most revenue making'
          getToggledValueInParentPage={getToggledValueInParentPage}
        />
    </div>
  )
}

export default ProductAvailability
