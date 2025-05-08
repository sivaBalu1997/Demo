import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../../redux/newReports/newReportsActions";

import StoreFilter from "components/reportComponents/StoreFilter";
import CustomBarChart from "components/reportComponents/Charts/CustomBarChart";
import StackedBarChart from "components/reportComponents/Charts/CustomStackedChart";  
import {
  summaryInsightsCustomerVolumeRequest,
  summaryInsightsCustomerByTenureRequest,
  summaryInsightsCustomerByTotalSpendRequest,
  summaryInsightsCustomerByAvgCoverSizeRequest,
  summaryInsightsCustomerByLoyaltyLevelsRequest,
} from "../../../redux/customerInsights/customerInsightsActions";
import ErrorHandler from "components/reportComponents/ErrorHandler";
import { getCurrencySymbol } from "utils";
import { predefinedColors } from "constants/reportConstants";
import DownloadReport from "components/reportComponents/DownloadReports";

const SummaryInsights = () => {
  const locations = useSelector(
    (state: any) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );
  const summaryInsightsCustomerVolumeData = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerVolumeSuccess?.categories
  );
  const summaryInsightsCustomerVolumeDataLoading = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerVolumeLoading
  );
  const summaryInsightsCustomerVolumeFailure = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerVolumeFailure
  );
  const summaryInsightsCustomerByTenureData = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByTenureSuccess
  );
  const summaryInsightsCustomerByTenureDataLoading = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByTenureLoading
  );
  const summaryInsightsCustomerByTenureFailure = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByTenureFailure
  );
  const summaryInsightsCustomerByTotalSpendData = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByTotalSpendSuccess
  );
  const summaryInsightsCustomerByTotalSpendDataLoading = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByTotalSpendLoading
  );
  const summaryInsightsCustomerByTotalSpendFailure = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByTotalSpendFailure
  );
  const summaryInsightsCustomerByAvgCoverSizeData = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByAvgCoverSizeSuccess
  );
  const summaryInsightsCustomerByAvgCoverSizeDataLoading = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByAvgCoverSizeLoading
  );
  const summaryInsightsCustomerByAvgCoverSizeFailure = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByAvgCoverSizeFailure
  );
  const summaryInsightsCustomerByLoyaltyData = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByLoyaltySuccess
  );
  const summaryInsightsCustomerByLoyaltyDataLoading = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByLoyaltyLoading
  );
  const summaryInsightsCustomerByLoyaltyFailure = useSelector(
    (state: any) =>
      state?.customerInsights?.summaryInsightsCustomerByLoyaltyFailure
  );
  const countryCode = useSelector((state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country);
  const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode)), [countryCode]);
  const dispatch = useDispatch();

  // const summaryInsightsCustomerByTotalSpendDataWithRespectiveCurrency = summaryInsightsCustomerByTotalSpendData?.map((dataToBemapped:any)=>({
  //   "customerCount": dataToBemapped?.customerCount,

  // }))

  const useFormattedSpendData = (rawData: typeof summaryInsightsCustomerByTotalSpendData) => {
    const formattedData = useMemo(() => {
      return rawData?.map((item:any) => {
        const formattedSpend = item.spendCategory.replace(/\$/g, currencySymbol);
        return { ...item, spendCategory: formattedSpend };
      });
    }, [rawData, currencySymbol]);
  
    return formattedData;
  };

  const formattedDataForSummaryInsightsCustomerByTotalSpendData = useFormattedSpendData(summaryInsightsCustomerByTotalSpendData);
  // console.log(1111,{formattedData, summaryInsightsCustomerByTotalSpendData, countryCode, currencySymbol})

  useEffect(() => {
    if (selectedLocation?.value) {
      let params = {
        locationId: selectedLocation?.value,
      };
      dispatch(summaryInsightsCustomerVolumeRequest(params));
      dispatch(summaryInsightsCustomerByTenureRequest(params));
      dispatch(summaryInsightsCustomerByTotalSpendRequest(params));
      dispatch(summaryInsightsCustomerByAvgCoverSizeRequest(params));
      dispatch(summaryInsightsCustomerByLoyaltyLevelsRequest(params));
    }
  }, [selectedLocation]);

  const tenureOrder = [
    ...new Set(summaryInsightsCustomerByTenureData?.map((data: any) => data?.timeline))
  ] as string[]

  // const tenureOrderConverted = tenureOrder?.map((item, index) => {
  //   if (index === 0) return item;
  //   if (index === tenureOrder?.length - 1) return item;
  //   return `${tenureOrder[0]}-${item}`;
  // })

  const tenureOrderConverted = tenureOrder?.map((item, index) => {
    if (index === 0 || index === tenureOrder.length - 1) return item;
    return `1-${item}`;
  });


  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="reports-page-container">
        <div className="reports-page-body">
          <StoreFilter
            storeOptions={locations}
            // selectedDate={selectedDateFilterType}
            selectedStore={selectedLocation}
            showRefresh={false}
            showDate={false}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
          />

          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">{"Customer Volume"}</h1>
              <DownloadReport kpiTitle="Customer Volume" tableData={summaryInsightsCustomerVolumeData}/>
            </div>
            <ErrorHandler
              data={summaryInsightsCustomerVolumeData}
              isError={summaryInsightsCustomerVolumeFailure}
              isLoading={summaryInsightsCustomerVolumeDataLoading}
            >
              <CustomBarChart
                barColor="#009689"
                toolTipBorderColor="#009689"
                xAxisTooltipLabel=""
                yAxisTooltipLabel="Count"
                dataList={
                  summaryInsightsCustomerVolumeData?.map((data: any) => ({
                    xAxisValue: `${data?.orderCategory}`,
                    yAxisValue: Number(data?.customerCount),
                  }))
                  // dataList3
                }
                loader={summaryInsightsCustomerVolumeDataLoading}
              />
            </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Customers By Tenure</h1>
              <DownloadReport kpiTitle="Customers By Tenure" tableData={summaryInsightsCustomerByTenureData}/>
            </div>
            <ErrorHandler
              data={summaryInsightsCustomerByTenureData}
              isError={summaryInsightsCustomerByTenureFailure}
              isLoading={summaryInsightsCustomerByTenureDataLoading}
            >
              <StackedBarChart
                kpiTitle="Customers By Tenure"
                loader={summaryInsightsCustomerByTenureDataLoading}
                dataList={summaryInsightsCustomerByTenureData}
                // xKey="tenure"
                // stackNameKey="groupSize"
                // valueKey="count"
                xKey="timeline"
                stackNameKey="customerState"
                valueKey="customerCount"
                colorList={["#1F77B4","#17BECF","#3FE1C0", "#E17100", "#049E16", "#F89B29",...predefinedColors]}
                toolTipBorderColor="#17BECF"
                showLabelInToolTip={false}
                //  tenureOrder ={ [
                //   ...new Set(summaryInsightsCustomerByTenureData?.map((data: any) => data?.timeline))
                // ] as string[]}
                tenureOrder={tenureOrderConverted}
              />
            </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Customers By Total Spend</h1>
              <DownloadReport kpiTitle="Customers By Total Spend" tableData={summaryInsightsCustomerByTotalSpendData}/>
            </div>
            <ErrorHandler
              data={formattedDataForSummaryInsightsCustomerByTotalSpendData}
              isError={summaryInsightsCustomerByTotalSpendFailure}
              isLoading={summaryInsightsCustomerByTotalSpendDataLoading}
            >
              <StackedBarChart
                loader={summaryInsightsCustomerByTotalSpendDataLoading}
                dataList={formattedDataForSummaryInsightsCustomerByTotalSpendData}
                // xKey="spendRange"
                // stackNameKey="groupSize"
                // valueKey="count"
                xKey="spendCategory"
                stackNameKey="orderCategory"
                valueKey="customerCount"
                colorList={["#AA562A","#F89B29","#1F77B4", "#3FE1C0", "#E17100", "#049E16"]}
                toolTipBorderColor="#F89B29"
                showLabelInToolTip={false}
              />
            </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">
                Customers By Avg Cover Size
              </h1>
              <DownloadReport kpiTitle="Customers By Avg Cover Size" tableData={summaryInsightsCustomerByAvgCoverSizeData}/>
            </div>
            <ErrorHandler
              data={summaryInsightsCustomerByAvgCoverSizeData}
              isError={summaryInsightsCustomerByAvgCoverSizeFailure}
              isLoading={summaryInsightsCustomerByAvgCoverSizeDataLoading}
            >
              <CustomBarChart
                barColor="#67833E"
                toolTipBorderColor="#67833E"
                xAxisTooltipLabel=""
                yAxisTooltipLabel="Count"
                dataList={
                  summaryInsightsCustomerByAvgCoverSizeData?.map(
                    (data: any) => ({
                      xAxisValue: `${data?.orderTotalRange?.replaceAll("$", currencySymbol)}`,
                      yAxisValue: Number(data?.customerCount),
                    })
                  )
                  // dataList3
                }
                loader={summaryInsightsCustomerByAvgCoverSizeDataLoading}
              />{" "}
            </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">
                Customers By Loyalty Levels
              </h1>
              <DownloadReport kpiTitle="Customers By Loyalty Levels" tableData={summaryInsightsCustomerByLoyaltyData}/>
            </div>
            <ErrorHandler
              data={summaryInsightsCustomerByLoyaltyData}
              isError={summaryInsightsCustomerByLoyaltyFailure}
              isLoading={summaryInsightsCustomerByLoyaltyDataLoading}
            >
              <CustomBarChart
                barColor="#2682D9"
                toolTipBorderColor="#2682D9"
                xAxisTooltipLabel=""
                yAxisTooltipLabel="Count"
                dataList={
                  summaryInsightsCustomerByLoyaltyData?.map((data: any) => ({
                    xAxisValue: `${data?.loyaltyCategory}`,
                    yAxisValue: Number(data?.customerCount),
                  }))
                  // dataList3
                }
                loader={summaryInsightsCustomerByLoyaltyDataLoading}
              />
            </ErrorHandler>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryInsights;
