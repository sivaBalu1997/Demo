import DateRangeCompareDropdown from 'components/reportComponents/DateRangeCompareDropdown';
import StoreFilter from 'components/reportComponents/StoreFilter';
import useDateFilter from 'hooks/useDateFilter';
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from 'redux/newReports/newReportsActions';

const SalesTrend:React.FC = () => {

  const [selectedFilters, setSelectedFilters] = useState({
    firstDate: { startDate: "", endDate: "" },
    secondDate: { startDate: "", endDate: "" },
  });

  const handleFilterChange = useCallback((firstDate, secondDate) => {
    setSelectedFilters({ firstDate, secondDate });
  }, []);

  const dispatch = useDispatch();

  const locations = useSelector((state: any) => state?.newReports?.storeLocationsList);
  const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation);


  const { startDate, endDate, selectedDateFilterType, handleDateChange } = useDateFilter();

  const datepickerApply = (type: string, data1?: any, data2?: any) => {
    console.log("Dates",data1, data2)
    handleDateChange("Custom Date", data1, data2);
  };


  return (
    <div className='report-sales-trend'>
          <StoreFilter
            startDate={startDate}
            endDate={endDate}
            showDate={false}
            storeOptions={locations}
            selectedDate={selectedDateFilterType}
            selectedStore={selectedLocation}
            setSelectedDate={(data) => handleDateChange(data?.value)}
            datePickerApplyFunction={(date1: any, date2: any) => datepickerApply("Custom Date", date1, date2)}
            dateDropdownFunction={(date1: any, date2: any) => datepickerApply("Custom Date", date1, date2)}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
            showComparableDateDropdown={true}
            onFilterChangeForCompare={handleFilterChange}
          />
          {/* <p>First Date Range: {selectedFilters?.firstDate?.startDate} to {selectedFilters?.firstDate?.endDate}</p>
          <p>Second Date Range: {selectedFilters?.secondDate?.startDate} to {selectedFilters?.secondDate?.endDate}</p> */}
    </div>
  )
}

export default SalesTrend
