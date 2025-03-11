import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from 'redux/newReports/newReportsActions';
import StoreFilter from 'components/reportComponents/StoreFilter'
import useDateFilter from 'hooks/useDateFilter';
import "./style.scss"
import CardTypeChart from 'components/reportComponents/chart';
import DownloadReport from 'components/reportComponents/DownloadReports';

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

  const handleRefreshClick=()=>{
    console.log("refreshed");
  }

  const datepickerApply = (type: string, data1?: any, data2?: any) => {
    handleDateChange("Custom Date", data1, data2);
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
          <div className='report-product-charts-container'>
            <div className='report-product-heading-download-container'>  
              <h2 className="report-product-chart-heading">Card Type</h2>
              <DownloadReport kpiTitle='Top 10 Revenue Making Categories' tableData={salesCardTypeData} />
            </div>
            <CardTypeChart
              dataList={salesCardTypeData}
              loader={salesCardTypeDataLoading}
            />
          </div>
        </div>
  )
}

export default ProductAvailability
