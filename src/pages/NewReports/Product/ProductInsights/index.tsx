import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from 'redux/newReports/newReportsActions';
import StoreFilter from 'components/reportComponents/StoreFilter'
import useDateFilter from 'hooks/useDateFilter';
import ReusableBarChart from 'components/reportComponents/ReusableCharts/ReusableBarChart';
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
    </div>
  )
}

export default ProductInsights
