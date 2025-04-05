import moment from "moment";
import React, { useEffect, useState } from "react";
import "../Sales/report.scss";
import Header from "components/reportComponents/Header";
import TabNavigation from "components/common/TabNavigation";
import SidePanel from "pages/SidePanel";
import { useDispatch, useSelector } from "react-redux";
import {
  changeDateFilterType,
  changeEndDate,
  changeLocation,
  changeStartDate,
  getRestaurantRequestFromNewReports,
  storeLocationsList,
} from "redux/newReports/newReportsActions";
import { RootState } from "redux/rootReducer";
import { tabsForCustomer } from "constants/reportConstants";
import SummaryInsights from "./summaryInsights";
import DetailedInsights from "./detailedInsights";
import "./index.scss";


interface ReportProps { }

const CheckInReport: React.FC<ReportProps> = () => {
  const [activeTab, setActiveTab] = useState("Summary Insights");

  const dispatch = useDispatch();
  /*********************************************************** */
  const restaurantDetails = useSelector(
    (state: RootState) => state?.auth?.restaurantDetails?.branch
  );
  const selectedLocation = useSelector(
    (state: any) => state?.newReports?.selectedLocation
  );
  const startDate = useSelector(
    (state: RootState) => state?.newReports?.selectedStartDate
  );
  const endDate = useSelector(
    (state: RootState) => state?.newReports?.selectedEndDate
  );
  const restaurant = useSelector((state: RootState) => state?.auth?.restaurantDetails);

  useEffect(() => {
    if (selectedLocation?.value
    ) {
      dispatch(getRestaurantRequestFromNewReports(selectedLocation?.value
      ));
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (!startDate || !endDate) {
      dispatch(
        changeDateFilterType({
          label: "Today",
          value: "Today",
        })
      );
      dispatch(changeStartDate(moment().format("YYYY-MM-DD")));
      dispatch(changeEndDate(moment().format("YYYY-MM-DD")));
    }
  }, [startDate, endDate]);


  useEffect(() => {
    let isLocationChanged = true
    if (restaurantDetails?.length) {
      const mappedIdWithBranchName = restaurantDetails?.map(
        (branchWithId: any) => {
          if (branchWithId?.id === selectedLocation?.value) isLocationChanged = false
          return ({
            value: branchWithId?.id,
            label: branchWithId?.locationName,
          }
          )
        }
      );

      dispatch(storeLocationsList(mappedIdWithBranchName))
      if (isLocationChanged) {
        const branch = mappedIdWithBranchName?.find((branch: any) => branch.label === restaurant?.branchName);
        dispatch(changeLocation(branch))
      }
    }
  }, [restaurantDetails, selectedLocation]);


  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SidePanel />

        <div className="reports-container ">
          {/* Header */}
          <Header title="Reports & Insights" />

          {/* Tab Navigation */}
          <TabNavigation
            tabs={tabsForCustomer}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {activeTab === "Summary Insights" ? <SummaryInsights /> : null}
          {activeTab === "Detailed Insights" ? <DetailedInsights /> : null}
        </div>
      </div>
    </>
  );
};

export default CheckInReport;
