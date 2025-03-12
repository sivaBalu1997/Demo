import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from 'redux/newReports/newReportsActions';
import StoreFilter from 'components/reportComponents/StoreFilter'
import useDateFilter from 'hooks/useDateFilter';
import ReusableBarChart from 'components/reportComponents/ReusableCharts/ReusableBarChart';
import ReusableDoughnutChart from 'components/reportComponents/ReusableCharts/ReusableDoughnutChart';
import StackedBarChart from "components/reportComponents/Charts/CustomStackedChart";
import DownloadReport from 'components/reportComponents/DownloadReports';
import "./style.scss"

const foodSalesData = [
  { "Product Name": "Steak", Sales: 7500.50 },
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

const twentyPopular = [
  { "Product Name": "Steak", Quantity: 7500 },
  { "Product Name": "Sushi", Quantity: 5000 },
  { "Product Name": "Dumplings", Quantity: 3200 },
  { "Product Name": "Noodles", Quantity: 2900 },
  { "Product Name": "Fried Rice", Quantity: 2700 },
  { "Product Name": "Tacos", Quantity: 1200 },
  { "Product Name": "Sandwich", Quantity: 1100 },
  { "Product Name": "Parotta", Quantity: 1100 },
  { "Product Name": "Egg Parotta", Quantity: 1100 },
  { "Product Name": "Salad", Quantity: 900 },
  { "Product Name": "Burger", Quantity: 850 },
  { "Product Name": "Pizza", Quantity: 800 },
  { "Product Name": "Pasta", Quantity: 780 },
  { "Product Name": "Biryani", Quantity: 750 },
  { "Product Name": "Shawarma", Quantity: 700 },
  { "Product Name": "Ice Cream", Quantity: 650 },
  { "Product Name": "Momos", Quantity: 600 },
  { "Product Name": "Pancakes", Quantity: 550 },
  { "Product Name": "Fries", Quantity: 500 },
  { "Product Name": "Hot Dog", Quantity: 450 }
];

const mockData = [
  { name: 'Category A', value: 400, color: '#0088FE' },
  { name: 'Category B', value: 300, color: '#00C49F' },
  { name: 'Category C', value: 300, color: '#FFBB28' },
  { name: 'Category D', value: 200, color: '#FF8042' },
];

const chartData = [
  { label: 'Service delay', value: 22, color: '#2E7D32' },
  { label: 'Wrong order', value: 21, color: '#FF9800' },
  { label: 'Taste issue', value: 21, color: '#2196F3' },
  { label: 'Service delay', value: 13, color: '#E91E63' },
  { label: 'Extra order', value: 23, color: '#FF9800' }
];

const data = {
  labels: ['Service delay', 'Wrong order', 'Taste issue', 'Service delay', 'Extra order'],
  datasets: [{
    data: [22, 21, 21, 13, 23],
    backgroundColor: ['#2E7D32', '#FF9800', '#2196F3', '#E91E63', '#FF9800'],
    borderColor: ['#2E7D32', '#FF9800', '#2196F3', '#E91E63', '#FF9800'],
    borderWidth: 1,
  }],
};

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

const stackedDataListTwo = [
  { xAxisData: "Fried Idli", stackName: "Customer complaints", stackValue: 30 },
  { xAxisData: "Fried Idli", stackName: "Item not available", stackValue: 20 },
  { xAxisData: "Fried Idli", stackName: "Restaurant closing time", stackValue: 50 },
  { xAxisData: "Fried Idli", stackName: "Chef not available", stackValue: 10 },
  { xAxisData: "Fried Idli", stackName: "Others", stackValue: 70 },

  { xAxisData: "Mutton Biryani", stackName: "Customer complaints", stackValue: 25 },
  { xAxisData: "Mutton Biryani", stackName: "Item not available", stackValue: 18 },
  { xAxisData: "Mutton Biryani", stackName: "Restaurant closing time", stackValue: 45 },
  { xAxisData: "Mutton Biryani", stackName: "Chef not available", stackValue: 8 },
  { xAxisData: "Mutton Biryani", stackName: "Others", stackValue: 60 },

  { xAxisData: "Mutton Soup", stackName: "Customer complaints", stackValue: 20 },
  { xAxisData: "Mutton Soup", stackName: "Item not available", stackValue: 15 },
  { xAxisData: "Mutton Soup", stackName: "Restaurant closing time", stackValue: 40 },
  { xAxisData: "Mutton Soup", stackName: "Chef not available", stackValue: 6 },
  { xAxisData: "Mutton Soup", stackName: "Others", stackValue: 55 },

  { xAxisData: "Fish Biryani", stackName: "Customer complaints", stackValue: 22 },
  { xAxisData: "Fish Biryani", stackName: "Item not available", stackValue: 17 },
  { xAxisData: "Fish Biryani", stackName: "Restaurant closing time", stackValue: 48 },
  { xAxisData: "Fish Biryani", stackName: "Chef not available", stackValue: 7 },
  { xAxisData: "Fish Biryani", stackName: "Others", stackValue: 58 },

  { xAxisData: "Chicken Soup", stackName: "Customer complaints", stackValue: 18 },
  { xAxisData: "Chicken Soup", stackName: "Item not available", stackValue: 14 },
  { xAxisData: "Chicken Soup", stackName: "Restaurant closing time", stackValue: 42 },
  { xAxisData: "Chicken Soup", stackName: "Chef not available", stackValue: 5 },
  { xAxisData: "Chicken Soup", stackName: "Others", stackValue: 50 },

  { xAxisData: "Plain Dosa", stackName: "Customer complaints", stackValue: 28 },
  { xAxisData: "Plain Dosa", stackName: "Item not available", stackValue: 19 },
  { xAxisData: "Plain Dosa", stackName: "Restaurant closing time", stackValue: 47 },
  { xAxisData: "Plain Dosa", stackName: "Chef not available", stackValue: 9 },
  { xAxisData: "Plain Dosa", stackName: "Others", stackValue: 63 },

  { xAxisData: "Channa Samosa", stackName: "Customer complaints", stackValue: 16 },
  { xAxisData: "Channa Samosa", stackName: "Item not available", stackValue: 12 },
  { xAxisData: "Channa Samosa", stackName: "Restaurant closing time", stackValue: 38 },
  { xAxisData: "Channa Samosa", stackName: "Chef not available", stackValue: 4 },
  { xAxisData: "Channa Samosa", stackName: "Others", stackValue: 45 },

  { xAxisData: "Aloo Matar", stackName: "Customer complaints", stackValue: 20 },
  { xAxisData: "Aloo Matar", stackName: "Item not available", stackValue: 14 },
  { xAxisData: "Aloo Matar", stackName: "Restaurant closing time", stackValue: 41 },
  { xAxisData: "Aloo Matar", stackName: "Chef not available", stackValue: 6 },
  { xAxisData: "Aloo Matar", stackName: "Others", stackValue: 52 },
];


const ProductInsights = () => {

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

  const handleViewDetails = (value: string) => {
    console.log(`View details for: ${value}`);
  };


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
          showChartFilter={false}
          // handleChartFilter={handleChartFilter}
          showSwitchable={false}
          switchableTextOne='Most popular'
          switchableTextTwo='Most revenue making'
          // getToggledValueInParentPage={getToggledValueInParentPage}
          isYAxisQuantity={false}
        />
        <ReusableBarChart
          dataList={twentyPopular}
          loader={false}
          xKey="Product Name"
          yKey="Quantity"
          // extraKeys={["orders"]}
          title="Top 20 popular"
          barColor="#14A789"
          // xPrefix="👤 "
          // yPrefix="$"
          // ySuffix="K"
          tooltipStyles={{
            backgroundColor: "white",
            borderColor: "#14A789",
            titleColor: "black",
            bodyColor: "black",
          }}
          kpiTitle='Top 20 popular'
          showChartFilter={true}
          handleChartFilter={handleChartFilter}
          showSwitchable={true}
          switchableTextOne='Popular'
          switchableTextTwo='Least popular'
          getToggledValueInParentPage={getToggledValueInParentPage}
          isYAxisQuantity={true}
        />
        <ReusableBarChart
          dataList={twentyPopular}
          loader={false}
          xKey="Product Name"
          yKey="Quantity"
          title="Top 20 popular revenue making"
          barColor="#AA562A"
          yPrefix="$"
          ySuffix="K"
          tooltipStyles={{
            backgroundColor: "white",
            borderColor: "#AA562A",
            titleColor: "black",
            bodyColor: "black",
          }}
          kpiTitle='Top 20 popular revenue making'
          showChartFilter={true}
          handleChartFilter={handleChartFilter}
          showSwitchable={true}
          switchableTextOne='Popular'
          switchableTextTwo='Least popular'
          getToggledValueInParentPage={getToggledValueInParentPage}
          isYAxisQuantity={false}
        />
        <ReusableDoughnutChart
          data={chartData}
          totalAmount="$1200.50"
          totalItems={125}
          tooltipAmount="$87.50"
        />
        <div className="items-cancelled-reasons-container">
          <div className="items-cancelled-reason-head-download-container">
            <p className='items-cancelled-heading'>Items Cancelled Reasons</p>
            <DownloadReport kpiTitle='Items Cancelled Reasons' tableData={stackedDataListTwo} />
          </div>
          <StackedBarChart
            loader={false}
            dataList={stackedDataListTwo}
            colorList={["#1F77B4", "#3FE1C0", "#E17100", "#049E16", "#F89B29"]}
            toolTipBorderColor="#F89B29"
          />
        </div>
    </div>
  )
}

export default ProductInsights
