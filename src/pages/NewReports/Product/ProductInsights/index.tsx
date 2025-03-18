import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation } from 'redux/newReports/newReportsActions';
import StoreFilter from 'components/reportComponents/StoreFilter'
import useDateFilter from 'hooks/useDateFilter';
import ReusableBarChart from 'components/reportComponents/ReusableCharts/ReusableBarChart';
// import ReusableDoughnutChart from 'components/reportComponents/ReusableCharts/ReusableDoughnutChart';
import StackedBarChart from "components/reportComponents/Charts/CustomStackedChart";
import DownloadReport from 'components/reportComponents/DownloadReports';
import "./style.scss"
import { productAvailabilityByChannelsRequest, productInsightsCancelledItemsRequest, productInsightsCancelledReasonsRequest, productInsightsItemsCancelledReasonsRequest, productInsightsTopLeastPopularRequest, productInsightsTopLeastPopularRevenueRequest, productInsightsTopPopularRequest, productInsightsTopPopularRevenueRequest, productInsightsTopRevenueRequest, productInsightsTopRevenueStreamsRequest } from 'redux/productReports/productReportsActions';
import ErrorHandler from "components/reportComponents/ErrorHandler";
import DoughnutChart from 'components/reportComponents/Charts/DoughnutChartButtonVoided';
import DownloadPopOver from 'pages/CategoryReport/downloadOption';
import CustomBarChart from 'components/reportComponents/Charts/CustomBarChart';
import SwitchableBox from 'components/reportComponents/SwitchableBox';
import CustomDropdown from 'components/common/customDropdown';
import MultiSwitchableBox from 'components/reportComponents/MultiSwitchableBox';

interface dataList {
  xAxisData: string;
  stackName: string;
  stackValue: number;
}

const chartFilterOptions: { value: string, label: string }[] = [
  { value: "Overall", label: "Overall" },
  { value: "Weekdays", label: "Weekdays" },
  { value: "Weekends", label: "Weekends" },
  { value: "Lunch", label: "Lunch" },
  { value: "Dinner", label: "Dinner" },
];

const ProductInsights = () => {
  const [isLeastPopularSelected, setIsLeastPopularSelected] = useState(false);
  const [isLeastPopularRevenueSelected, setIsLeastPopularRevenueSelected] = useState(false);

  const locations = useSelector((state: any) => state?.newReports?.storeLocationsList);
  const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation);
  const countryCode = useSelector((state: any) => state?.auth?.restaurantDetails?.country);

  // Top Revenue States
  const topRevenueData = useSelector((state: any) => state?.productReports?.topRevenueSuccess);
  const topRevenueLoading = useSelector((state: any) => state?.productReports?.topRevenueLoading);
  const topRevenueError = useSelector((state: any) => state?.productReports?.topRevenueFailure);

  // Top Popular States
  const topPopularData = useSelector((state: any) => state?.productReports?.topPopularSuccess?.content);
  const topPopularLoading = useSelector((state: any) => state?.productReports?.topPopularLoading);
  const topPopularError = useSelector((state: any) => state?.productReports?.topPopularFailure);

  const topLeastPopularData = useSelector((state: any) => state?.productReports?.topLeastPopularSuccess?.content);
  const topLeastPopularLoading = useSelector((state: any) => state?.productReports?.topLeastPopularLoading);
  const topLeastPopularError = useSelector((state: any) => state?.productReports?.topLeastPopularFailure);

  // Top Popular Revenue States
  const topPopularRevenueData = useSelector((state: any) => state?.productReports?.topPopularRevenueSuccess);
  const topPopularRevenueLoading = useSelector((state: any) => state?.productReports?.topPopularRevenueLoading);
  const topPopularRevenueError = useSelector((state: any) => state?.productReports?.topPopularRevenueFailure);

  const topLeastPopularRevenueData = useSelector((state: any) => state?.productReports?.topLeastPopularRevenueSuccess);
  const topLeastPopularRevenueLoading = useSelector((state: any) => state?.productReports?.topLeastPopularRevenueLoading);
  const topLeastPopularRevenueError = useSelector((state: any) => state?.productReports?.topLeastPopularRevenueFailure);

  // Top Revenue Streams States
  const topRevenueStreamsData = useSelector((state: any) => state?.productReports?.topRevenueStreamsSuccess);
  const topRevenueStreamsLoading = useSelector((state: any) => state?.productReports?.topRevenueStreamsLoading);
  const topRevenueStreamsError = useSelector((state: any) => state?.productReports?.topRevenueStreamsFailure);

  // Cancelled Items States
  const cancelledItemsData = useSelector((state: any) => state?.productReports?.cancelledItemsSuccess);
  const cancelledItemsLoading = useSelector((state: any) => state?.productReports?.cancelledItemsLoading);
  const cancelledItemsError = useSelector((state: any) => state?.productReports?.cancelledItemsFailure);

  // Cancelled Reasons States
  const cancelledReasonsData = useSelector((state: any) => state?.productReports?.cancelledReasonsSuccess);
  const cancelledReasonsLoading = useSelector((state: any) => state?.productReports?.cancelledReasonsLoading);
  const cancelledReasonsError = useSelector((state: any) => state?.productReports?.cancelledReasonsFailure);

  // Items Cancelled Reasons States
  const itemsCancelledReasonsData = useSelector((state: any) => state?.productReports?.itemsCancelledReasonsSuccess);
  const itemsCancelledReasonsLoading = useSelector((state: any) => state?.productReports?.itemsCancelledReasonsLoading);
  const itemsCancelledReasonsError = useSelector((state: any) => state?.productReports?.itemsCancelledReasonsFailure);


  const { startDate, endDate, selectedDateFilterType, handleDateChange } = useDateFilter();

  useEffect(() => {
    console.log({
      topRevenueData,
      topPopularData,
      topPopularRevenueData,
      topRevenueStreamsData,
      cancelledItemsData,
      cancelledReasonsData,
      itemsCancelledReasonsData,
    })
  }, [topRevenueData, topPopularData, topPopularRevenueData, topRevenueStreamsData, cancelledItemsData, cancelledReasonsData, itemsCancelledReasonsData])
  const dispatch = useDispatch();

  useEffect(() => {
    const params = {
      locationId: selectedLocation?.value,
      startDate: startDate,
      endDate: endDate

    }
    dispatch((productInsightsTopRevenueRequest(params)));
    dispatch(productInsightsTopPopularRequest(params))
    dispatch(productInsightsTopLeastPopularRequest(params))
    dispatch(productInsightsTopRevenueStreamsRequest(params))
    dispatch(productInsightsCancelledItemsRequest(params))
    dispatch(productInsightsCancelledReasonsRequest(params))
    dispatch(productInsightsItemsCancelledReasonsRequest(params))
    dispatch(productInsightsTopPopularRevenueRequest(params))
    dispatch(productInsightsTopLeastPopularRevenueRequest(params))
  }, [selectedLocation, startDate, endDate])



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
      <div className="reports-page-sub-header-container">
        <h1 className="reports-page-heading">
          Top 10 Revenue Making Categories
        </h1>
        <DownloadPopOver />
      </div>
      <ErrorHandler isError={topRevenueError} data={topRevenueData} >
        <CustomBarChart
          barColor="#049E16"
          toolTipBorderColor="#049E16"
          xAxisTooltipLabel="Product Name"
          yAxisTooltipLabel="Sales"
          dataList={topRevenueData?.map((data: any) => ({
            xAxisValue: `${data.productName || ""}`,
            yAxisValue: `$${Number(data?.sales || 0)?.toFixed(2)}`,
          }))}
          loader={topRevenueLoading}
          showLabel={false}
        />
      </ErrorHandler>


      {/* <ReusableBarChart
          dataList={topRevenueData}
          loader={false}
          xKey="productName"
          yKey="sales"
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
        /> */}

      {/* <div className="reports-page-sub-header-container">
        <div className='reports-page-sub-header-custom-container'>

          <h1 className="reports-page-heading">
            Top 20 popular
          </h1>
          <MultiSwitchableBox
          texts={["Popular", "Least Popular"]}
          activeIndex={isLeastPopularSelected ? 1 : 0}
          onSwitch={(index) => setIsLeastPopularSelected(index === 1)}
          />
        </div>

        <div className='reports-page-sub-header-custom-container'>
          <CustomDropdown
            value={chartFilterOptions[0]?.value}
            options={chartFilterOptions}
            onSelect={handleChartFilter}
            placeholder="Select Date"
            className="table-date-dropdown"
            disabled={false}
          />
          <DownloadPopOver />
        </div>
      </div>
      <ErrorHandler isError={isLeastPopularSelected ? topLeastPopularError : topRevenueError} data={isLeastPopularSelected ? topLeastPopularData : topRevenueData} >
        <CustomBarChart
          barColor="#14A789"
          toolTipBorderColor="#14A789"
          xAxisTooltipLabel="Product Name"
          yAxisTooltipLabel="Quantity"
          dataList={(isLeastPopularSelected ? topLeastPopularData : topRevenueData)?.map((data: any) => ({
            xAxisValue: `${data.itemName || ""}`,
            yAxisValue: Number(data?.itemCount || 0),
          }))}
          loader={isLeastPopularSelected ? topLeastPopularLoading : topRevenueLoading}
          showLabel={false}
        />
      </ErrorHandler> */}
      <ReusableBarChart
          dataList={topPopularData}
          loader={false}
          xKey="itemName"
          yKey="itemCount"
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

<div className="reports-page-sub-header-container">
        <div className='reports-page-sub-header-custom-container'>

          <h1 className="reports-page-heading">
          Top 20 popular revenue making
          </h1>
          <MultiSwitchableBox
          texts={["Popular", "Least Popular"]}
          activeIndex={isLeastPopularRevenueSelected ? 1 : 0}
          onSwitch={(index) => setIsLeastPopularRevenueSelected(index === 1)}
          />
        </div>

        <div className='reports-page-sub-header-custom-container'>
          <CustomDropdown
            value={chartFilterOptions[0]?.value}
            options={chartFilterOptions}
            onSelect={handleChartFilter}
            placeholder="Select Date"
            className="table-date-dropdown"
            disabled={false}
          />
          <DownloadPopOver />
        </div>
      </div>
      <ErrorHandler isError={isLeastPopularRevenueSelected ? topLeastPopularRevenueError : topPopularRevenueError} data={isLeastPopularRevenueSelected ? topLeastPopularRevenueData : topPopularRevenueData} >
        <CustomBarChart
          barColor="#AA562A"
          toolTipBorderColor="#AA562A"
          xAxisTooltipLabel="Product Name"
          yAxisTooltipLabel="Quantity"
          dataList={(isLeastPopularRevenueSelected ? topLeastPopularRevenueData : topPopularRevenueData)?.map((data: any) => ({
            xAxisValue: `${data.itemName || ""}`,
            yAxisValue: Number(data?.itemCount || 0),
          }))}
          loader={isLeastPopularRevenueSelected ? topLeastPopularRevenueLoading : topPopularRevenueLoading}
          showLabel={false}
        />
      </ErrorHandler>
      {/* <ReusableBarChart
        dataList={topPopularRevenueData}
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
      /> */}
      <div className="sales-overview-doughnut-chart-container" style={{ width: "100%" }} >
        <div className="doughnut-chart-with-button">
          <h2 className="sales-overview-sub-heading ">Top Revenue Streams</h2>
          <ErrorHandler data={topRevenueStreamsData} isError={topRevenueStreamsError}>
            <DoughnutChart
              dataList={topRevenueStreamsData?.map((data: any) => ({
                name: data?.productName,
                label: data?.productName,
                count: data?.sales,
                items: data?.sales,
                amount: data?.sales
              }))}
              countryCode={countryCode}
              loader={topRevenueStreamsLoading}
            />
          </ErrorHandler>
        </div>
        <div className="doughnut-chart-with-button" >
          <h2 className="sales-overview-sub-heading ">Cancelled Items</h2>
          <ErrorHandler data={cancelledItemsData} isError={cancelledItemsError} >
            <DoughnutChart
              dataList={cancelledItemsData?.map((data: any) => ({
                name: data?.itemName,
                label: data?.itemName,
                count: data?.itemCount,
                items: data?.itemCount,
                amount: data?.itemCount
              }))}
              countryCode={countryCode}
              loader={cancelledItemsLoading}
            />
          </ErrorHandler>
        </div>
      </div>
      <div className="sales-overview-doughnut-chart-container" style={{  width: "100%" }} >
        <div className="doughnut-chart-with-button">
          <h2 className="sales-overview-sub-heading ">Cancelled Reasons</h2>
          <ErrorHandler data={cancelledReasonsData} isError={cancelledReasonsError}>
            <DoughnutChart
              dataList={cancelledReasonsData?.map((data: any) => ({
                name: data?.voidedReason,
                label: data?.voidedReason,
                count: data?.voidedItems,
                items: data?.voidedItems,
                amount: data?.voidedItems
              }))}
              countryCode={countryCode}
              loader={cancelledReasonsLoading}
            />
          </ErrorHandler>
        </div>
        <div className="doughnut-chart-with-button" >
        </div>
      </div>
      <div className="items-cancelled-reasons-container">
        <div className="items-cancelled-reason-head-download-container">
          <p className='items-cancelled-heading'>Items Cancelled Reasons</p>
          <DownloadReport kpiTitle='Items Cancelled Reasons' tableData={itemsCancelledReasonsData} />
        </div>
        <ErrorHandler data={itemsCancelledReasonsData} isError={itemsCancelledReasonsError}>
        <StackedBarChart
          loader={false}
          dataList={itemsCancelledReasonsData?.map((data: any) => ({ xAxisData: data?.itemName, stackName: data?.voidedReason, stackValue: data?.voidedReasonCount }))}
          colorList={["#1F77B4", "#3FE1C0", "#E17100", "#049E16", "#F89B29"]}
          toolTipBorderColor="#F89B29"
        />
             </ErrorHandler>
      </div>
    </div>
  )
}

export default ProductInsights
