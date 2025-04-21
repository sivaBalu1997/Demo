import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation, salesByRevenueClassRequest } from 'redux/newReports/newReportsActions';
import StoreFilter from 'components/reportComponents/StoreFilter'
import useDateFilter from 'hooks/useDateFilter';
import ReusableBarChart from 'components/reportComponents/ReusableCharts/ReusableBarChart';
// import ReusableDoughnutChart from 'components/reportComponents/ReusableCharts/ReusableDoughnutChart';
import StackedBarChart from "components/reportComponents/Charts/CustomStackedChart";
import DownloadReport from 'components/reportComponents/DownloadReports';
import "./style.scss"
import { productInsightsCancelledItemsRequest, productInsightsCancelledReasonsRequest, productInsightsItemsCancelledReasonsRequest, productInsightsTopLeastPopularRequest, productInsightsTopLeastPopularRevenueRequest, productInsightsTopPopularRequest, productInsightsTopPopularRevenueRequest, productInsightsTopRevenueRequest, productInsightsTopRevenueStreamsRequest } from 'redux/productReports/productReportsActions';
import ErrorHandler from "components/reportComponents/ErrorHandler";
import DoughnutChart from 'components/reportComponents/ReusableCharts/ReusableDoughnutChart';
import { getCurrencySymbol } from 'utils';
import { predefinedColors } from 'constants/reportConstants';


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
  // const countryCode = useSelector((state: any) => state?.auth?.restaurantDetails?.country);
  const countryCode = useSelector((state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country);
  const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode)), [countryCode]);

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
  const topPopularRevenueData = useSelector((state: any) => state?.productReports?.topPopularRevenueSuccess?.content);
  const topPopularRevenueLoading = useSelector((state: any) => state?.productReports?.topPopularRevenueLoading);
  const topPopularRevenueError = useSelector((state: any) => state?.productReports?.topPopularRevenueFailure);

  const topLeastPopularRevenueData = useSelector((state: any) => state?.productReports?.topLeastPopularRevenueSuccess?.content);
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

  const salesByRevenueClassAPIRedux = useSelector((state: any) => state?.newReports?.salesByRevenueClassSuccess?.content);
  const salesByRevenueClassLoading = useSelector((state: any) => state?.newReports?.salesByRevenueClassLoading);
  const salesByRevenueClassError = useSelector((state: any) => state?.newReports?.salesByRevenueClassFailure);

  const { startDate, endDate, selectedDateFilterType, handleDateChange } = useDateFilter();

  // useEffect(() => {
  //   console.log({
  //     topLeastPopularData,
  //     topLeastPopularRevenueData,
  //     topRevenueData,
  //     topPopularData,
  //     topPopularRevenueData,
  //     topRevenueStreamsData,
  //     cancelledItemsData,
  //     cancelledReasonsData,
  //     itemsCancelledReasonsData,
  //     salesByRevenueClassAPIRedux
  //   })
  // }, [topRevenueData,salesByRevenueClassAPIRedux,topLeastPopularData,topLeastPopularRevenueData, topPopularData, topPopularRevenueData, topRevenueStreamsData, cancelledItemsData, cancelledReasonsData, itemsCancelledReasonsData])
  const dispatch = useDispatch();

  useEffect(() => {
    const params = {
      locationId: selectedLocation?.value,
      startDate: startDate,
      endDate: endDate
    }
    const paramsWithChartFilter = {
      locationId: selectedLocation?.value,
      startDate: startDate,
      endDate: endDate,
      filter: "Overall",
    }

    if (selectedLocation?.value) {

      dispatch((productInsightsTopRevenueRequest(params)));
      dispatch(productInsightsTopPopularRequest(paramsWithChartFilter))
      dispatch(productInsightsTopLeastPopularRequest(paramsWithChartFilter))
      dispatch(productInsightsTopRevenueStreamsRequest(params))
      dispatch(productInsightsCancelledItemsRequest(params))
      dispatch(productInsightsCancelledReasonsRequest(params))
      dispatch(productInsightsItemsCancelledReasonsRequest(params))
      dispatch(productInsightsTopPopularRevenueRequest(paramsWithChartFilter))
      dispatch(productInsightsTopLeastPopularRevenueRequest(paramsWithChartFilter))
      dispatch(salesByRevenueClassRequest(params))
    }
  }, [selectedLocation, startDate, endDate])



  const datepickerApply = (type: string, data1?: any, data2?: any) => {
    handleDateChange("Custom Date", data1, data2);
  };

  const handleChartFilter = (selectedValue: string, kpiTitle: string) => {
    // please dont remove this console log
    // console.log(`Filter changed to ${selectedValue} for kpiTitle : ${kpiTitle}`);
    switch(kpiTitle) {
      case "Top 20 popular":
        dispatch(productInsightsTopPopularRequest({
          locationId: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          filter: selectedValue,
        }));
        dispatch(productInsightsTopLeastPopularRequest({
          locationId: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          filter: selectedValue,
        }));
        break;
      case "Top 20 popular revenue making":
        dispatch(productInsightsTopPopularRevenueRequest({
          locationId: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          filter: selectedValue,
        }));
        dispatch(productInsightsTopLeastPopularRevenueRequest({
          locationId: selectedLocation?.value,
          startDate: startDate,
          endDate: endDate,
          filter: selectedValue,
        }));
        break;
      default:
        break;
    }
  };

  const getToggledValueInParentPage = (activeTextForChart: string, kpiTitle: string) => {
    // please dont remove this console log
    // console.log(`active text of "${kpiTitle}" is "${activeTextForChart}"`)
  }

  const handleViewDetails = (value: string) => {
    // please dont remove this console log
    // console.log(`View details for: ${value}`);
  };



  return (
    <div className="report-product-availability">
      <StoreFilter
        storeOptions={locations}
        selectedDate={selectedDateFilterType}
        selectedStore={selectedLocation}
        setSelectedDate={handleDateChange}
        setSelectedStore={(store) => dispatch(changeLocation(store))}
      />


      <ReusableBarChart
        dataList={topRevenueData}
        loader={topRevenueLoading}
        error={topRevenueError}
        xKey="productName"
        yKey="sales"
        xLabel="Product Name"
        yLabel="Sales"
        // extraKeys={["orders"]}
        title="Top 10 Revenue Making Categories"
        barColor="#049E16"

        yPrefix={currencySymbol}
        formatAmount={true}
        tooltipStyles={{
          backgroundColor: "white",
          borderColor: "#049E16",
          titleColor: "black",
          bodyColor: "black",
        }}
        kpiTitle='Top 10 Revenue Making Categories'
        showChartFilter={false}
        showSwitchable={false}
        isYAxisQuantity={false}
      />

      <ReusableBarChart
        dataList={isLeastPopularSelected ? topLeastPopularData : topPopularData}
        loader={isLeastPopularSelected ? topLeastPopularLoading : topPopularLoading}
        error={isLeastPopularSelected ? topLeastPopularError : topPopularError}
        xKey="itemName"
        yKey="itemCount"
        xLabel='Product Name'
        yLabel='Quantity'
        // extraKeys={["orders"]}
        title="Top 20 popular"
        barColor="#14A789"
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
        isSwitchActive={isLeastPopularSelected}
        setIsSwitchActive={() => setIsLeastPopularSelected((prev) => !prev)}
      />

      <ReusableBarChart
        dataList={isLeastPopularRevenueSelected ? topLeastPopularRevenueData : topPopularRevenueData}
        loader={isLeastPopularRevenueSelected ? topLeastPopularRevenueLoading : topPopularRevenueLoading}
        error={isLeastPopularRevenueSelected ? topLeastPopularRevenueError : topPopularRevenueError}
        xKey="itemName"
        yKey="totalItemPrice"
        xLabel='Product Name'
        yLabel='Sales'
        title="Top 20 popular revenue making"
        barColor="#AA562A"
        yPrefix={currencySymbol}
        // ySuffix="K"
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
        isSwitchActive={isLeastPopularRevenueSelected}
        setIsSwitchActive={() => setIsLeastPopularRevenueSelected((prev) => !prev)}
      />
      <div className="sales-overview-doughnut-chart-container" style={{ width: "100%" }} >
          <div className="doughnut-chart-with-button" >
                      <div className="doughnut-head-with-download-container">
          <h2 className="sales-overview-sub-heading ">Top Revenue Streams</h2>
                        {!salesByRevenueClassLoading && <DownloadReport kpiTitle="Top Revenue Streams" tableData={salesByRevenueClassAPIRedux}  />}
                      </div>
          <ErrorHandler data={salesByRevenueClassAPIRedux} isError={salesByRevenueClassError}>
            <DoughnutChart
              xKey="revenueClass"
              yKey="totalSales"
              labelKeys={[{ key: "Revenue class", value: "revenueClass" }, { key: "Sales", value: "totalSales", isAmount: true }]}
              isAmount={true}
              dataList={salesByRevenueClassAPIRedux}
              otherKeys={["totalSales", "revenueClass"]}
              countryCode={countryCode}
              loader={salesByRevenueClassLoading}
              clickable={false}
            />
          </ErrorHandler>
        </div>
        <div className="doughnut-chart-with-button" >
        <div className="doughnut-head-with-download-container">
          <h2 className="sales-overview-sub-heading ">Cancelled Items</h2>
                        {!cancelledItemsLoading && <DownloadReport kpiTitle="Cancelled Items" tableData={cancelledItemsData}  />}
                      </div>
          <ErrorHandler data={cancelledItemsData} isError={cancelledItemsError} >
            <DoughnutChart
              labelKeys={[{ key: "Name", value: "itemName" }, { key: "Items", value: "itemCount" }]}
              xKey="itemName"
              yKey="itemCount"
              otherKeys={["itemCount", "itemName"]}
              isAmount={false}
              dataList={cancelledItemsData}


              countryCode={countryCode}
              loader={cancelledItemsLoading}
              clickable={false}
            />
          </ErrorHandler>
        </div>
      </div>
      <div className="sales-overview-doughnut-chart-container" style={{ width: "100%" }} >
        <div className="doughnut-chart-with-button">
        <div className="doughnut-head-with-download-container">
          <h2 className="sales-overview-sub-heading ">Cancelled Reasons</h2>
                        {!cancelledReasonsLoading && <DownloadReport kpiTitle="Cancelled Reasons" tableData={cancelledReasonsData}  />}
                      </div>
          <ErrorHandler data={cancelledReasonsData} isError={cancelledReasonsError}>
            <DoughnutChart
              labelKeys={[{ key: "Reason", value: "voidedReason" }, { key: "Items", value: "voidedItems" }]}
              xKey="voidedReason"
              yKey="voidedItems"
              isAmount={false}
              otherKeys={["voidedItems"]}
              dataList={cancelledReasonsData}

              countryCode={countryCode}
              loader={cancelledReasonsLoading}
              clickable={false}
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
            loader={itemsCancelledReasonsLoading}
            dataList={itemsCancelledReasonsData}
            xKey="itemName"
            stackNameKey="voidedReason"
            valueKey="voidedReasonCount"
            colorList={["#1F77B4", "#3FE1C0", "#E17100", "#049E16", "#F89B29", ...predefinedColors]}
            toolTipBorderColor="#F89B29"
          />
        </ErrorHandler>
      </div>
    </div>
  )
}

export default ProductInsights
