import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from 'redux/newReports/newReportsActions';
import StoreFilter from 'components/reportComponents/StoreFilter';
import useDateFilter from 'hooks/useDateFilter';
import MultiLineChart from 'components/reportComponents/ReusableCharts/MultiLineChart';

// const chartData = {
//   labels: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '8', '10', '11', '12', '13', '14', '15', '16' , '17', '18', '19', '20', '21', '22', "23"],
//   datasets: [
//     {
//       label: 'Yesterday',
//       data: [100, 120, 130, 140, 150, 160, 170],
//       borderColor: 'blue',
//       backgroundColor: '#2682D9',
//       orders: [30, 35, 40, 45, 50, 55, 60],
//       sales: [100.00, 120.00, 130.00, 140.00, 150.00, 160.00, 170.00],
//       tips: [20.00, 25.00, 30.00, 35.00, 40.00, 45.00, 50.00],
//       gratuities: [10.00, 15.00, 20.00, 25.00, 30.00, 35.00, 40.00],
//     },
//     {
//       label: 'Alan Fox',
//       data: [110, 115, 125, 135, 145, 155, 165],
//       borderColor: 'green',
//       backgroundColor: '#049E16',
//       orders: [42, 44, 46, 48, 50, 52, 54],
//       sales: [135.50, 140.00, 145.00, 150.00, 155.00, 160.00, 165.00],
//       tips: [38.50, 40.00, 42.00, 44.00, 46.00, 48.00, 50.00],
//       gratuities: [40.50, 42.00, 44.00, 46.00, 48.00, 50.00, 52.00],
//     },
//     {
//       label: 'Ajith Kumar',
//       data: [105, 110, 120, 130, 140, 150, 160],
//       borderColor: 'orange',
//       backgroundColor: '#F89B29',
//       orders: [25, 30, 35, 40, 45, 50, 55],
//       sales: [105.00, 110.00, 120.00, 130.00, 140.00, 150.00, 160.00],
//       tips: [15.00, 20.00, 25.00, 30.00, 35.00, 40.00, 45.00],
//       gratuities: [20.00, 25.00, 30.00, 35.00, 40.00, 45.00, 50.00],
//     },
//   ],
// };


const chartData = {
  labels: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  datasets: [
    {
      label: 'Yesterday',
      data: [90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 165, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30],
      borderColor: 'orange',
      backgroundColor: '#F89B29',
      orders: [28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 28, 30, 32, 34],
      sales: [90.00, 100.00, 110.00, 120.00, 130.00, 140.00, 150.00, 160.00, 170.00, 180.00, 165.00, 150.00, 140.00, 130.00, 120.00, 110.00, 100.00, 90.00, 80.00, 70.00, 60.00, 50.00, 40.00, 30.00],
      hours: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
    },
    {
      label: 'Today',
      data: [80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310],
      borderColor: 'blue',
      backgroundColor: '#2682D9',
      orders: [25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71],
      sales: [80.00, 90.00, 100.00, 110.00, 120.00, 130.00, 140.00, 150.00, 160.00, 170.00, 180.00, 190.00, 200.00, 210.00, 220.00, 230.00, 240.00, 250.00, 260.00, 270.00, 280.00, 290.00, 300.00, 310.00],
      hours: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
    },
  ],
};

const SalesTrend:React.FC = () => {

  const [selectedFilters, setSelectedFilters] = useState({
    firstDate: { startDate: "", endDate: "" },
    secondDate: { startDate: "", endDate: "" },
  });

  const orderFilterOptions = [
    { value: "Orders", label: "Orders" },
    { value: "Sales", label: "Sales" },
    { value: "Tips", label: "Tips" },
    { value: "Gratuities", label: "Gratuities" },
  ]

  const handleChartFilter = (selectedValue: string, kpiTitle: string) => {
    console.log(`Filter changed to ${selectedValue} for kpiTitle : ${kpiTitle}`);
  };

  const handleFilterChange = useCallback((firstDate, secondDate) => {
    setSelectedFilters({ firstDate, secondDate });
  }, []);

  const dispatch = useDispatch();

  const locations = useSelector((state: any) => state?.newReports?.storeLocationsList);
  const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation);


  const { startDate, endDate, selectedDateFilterType, handleDateChange } = useDateFilter();

  return (
    <div className='report-sales-trend'>
      <StoreFilter
        startDate={startDate}
        endDate={endDate}
        showDate={false}
        storeOptions={locations}
        selectedDate={selectedDateFilterType}
        selectedStore={selectedLocation}
        setSelectedDate={handleDateChange}
        setSelectedStore={(store) => dispatch(changeLocation(store))}
        showComparableDateDropdown={true}
        onFilterChangeForCompare={handleFilterChange}
      />
      {/* <p>First Date Range: {selectedFilters?.firstDate?.startDate} to {selectedFilters?.firstDate?.endDate}</p>
          <p>Second Date Range: {selectedFilters?.secondDate?.startDate} to {selectedFilters?.secondDate?.endDate}</p> */}
      <MultiLineChart
        kpiLoaderState={false}
        kpiTitle='Sales Performance'
        data={chartData}
        showDownloadReport={true}
        showChartFilter={true}
        chartFilterOptions={orderFilterOptions}
        handleChartFilter={handleChartFilter}
      />

<MultiLineChart
        kpiLoaderState={false}
        kpiTitle='Sales Performance'
        data={chartData}
        showDownloadReport={true}
        showChartFilter={true}
        chartFilterOptions={orderFilterOptions}
        handleChartFilter={handleChartFilter}
      />

<MultiLineChart
        kpiLoaderState={false}
        kpiTitle='Sales Performance'
        data={chartData}
        showDownloadReport={true}
        showChartFilter={true}
        chartFilterOptions={orderFilterOptions}
        handleChartFilter={handleChartFilter}
      />
    </div>
  )
}

export default SalesTrend
