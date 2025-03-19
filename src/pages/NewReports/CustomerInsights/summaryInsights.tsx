import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../../redux/newReports/newReportsActions";

import StoreFilter from "components/reportComponents/StoreFilter";
import DownloadPopOver from "pages/CategoryReport/downloadOption";
import CustomBarChart from "components/reportComponents/Charts/CustomBarChart";
import StackedBarChart from "components/reportComponents/Charts/CustomStackedChart";
import useDateFilter from "hooks/useDateFilter";
import {
  summaryInsightsCustomerVolumeRequest,
  summaryInsightsCustomerByTenureRequest,
  summaryInsightsCustomerByTotalSpendRequest,
  summaryInsightsCustomerByAvgCoverSizeRequest,
  summaryInsightsCustomerByLoyaltyLevelsRequest,
} from "../../../redux/customerInsights/customerInsightsActions";
import ErrorHandler from "components/reportComponents/ErrorHandler";

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
  const dispatch = useDispatch();

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
              <DownloadPopOver />
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
              <DownloadPopOver />
            </div>
            <ErrorHandler
              data={summaryInsightsCustomerByTenureData}
              isError={summaryInsightsCustomerByTenureFailure}
              isLoading={summaryInsightsCustomerByTenureDataLoading}
            >
              <StackedBarChart
                loader={summaryInsightsCustomerByTenureDataLoading}
                dataList={
                  summaryInsightsCustomerByTenureData?.map((data: any) => ({
                    xAxisData: `${data?.timeline}`,
                    stackName: `${data?.customerState}`,
                    stackValue: Number(
                      data?.customerCount < 0
                        ? data?.customerCount * -1
                        : data?.customerCount
                    ),
                  }))
                  // stackedDataList
                }
                colorList={["#1F77B4", "#17BECF"]}
                toolTipBorderColor="#17BECF"
              />
            </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">Customers By Total Spend</h1>
              <DownloadPopOver />
            </div>
            <ErrorHandler
              data={summaryInsightsCustomerByTotalSpendData}
              isError={summaryInsightsCustomerByTotalSpendFailure}
              isLoading={summaryInsightsCustomerByTotalSpendDataLoading}
            >
              <StackedBarChart
                loader={summaryInsightsCustomerByTotalSpendDataLoading}
                dataList={
                  summaryInsightsCustomerByTotalSpendData?.map((data: any) => ({
                    xAxisData: `${data?.spendCategory}`,
                    stackName: `${data?.orderCategory}`,
                    stackValue: Number(data?.customerCount),
                  }))

                  // stackedDataList
                }
                colorList={["#AA562A", "#F89B29"]}
                toolTipBorderColor="#F89B29"
              />
            </ErrorHandler>
          </div>
          <div>
            <div className="reports-page-sub-header-container">
              <h1 className="reports-page-heading">
                Customers By Avg Cover Size
              </h1>
              <DownloadPopOver />
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
                      xAxisValue: `${data?.orderTotalRange}`,
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
              <DownloadPopOver />
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
