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
  storeLocationsList,
} from "redux/newReports/newReportsActions";
import SummaryInsights from "./summaryInsights";
import SidePannelMob from "components/reportComponents/SiePannelMob";
import { RootState } from "redux/rootReducer";

const tabs = ["Summary Insights", "Detailed Insights"];
interface ReportProps {}

const CheckInReport: React.FC<ReportProps> = () => {
  const [activeTab, setActiveTab] = useState("Summary Insights");
  const [isExpanded, setIsExpanded] = useState(false);

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
  const endtDate = useSelector(
    (state: RootState) => state?.newReports?.selectedEndDate
  );

  useEffect(() => {
    if (!startDate || !endtDate) {
      dispatch(
        changeDateFilterType({
          label: "Today",
          value: "Today",
        })
      );
      dispatch(changeStartDate(moment().format("YYYY-MM-DD")));
      dispatch(changeEndDate(moment().format("YYYY-MM-DD")));
    }
  }, [startDate, endtDate]);

  useEffect(() => {
    if (!selectedLocation?.value && restaurantDetails?.length) {
      const mappedIdWithBranchName = restaurantDetails?.map(
        (branchWithId: any) => ({
          value: branchWithId?.id,
          label: branchWithId?.locationName,
        })
      );

      dispatch(storeLocationsList(mappedIdWithBranchName));
      dispatch(changeLocation(mappedIdWithBranchName?.[0]));
    }
  }, [restaurantDetails, selectedLocation]);

  const handleSideMenu = () => {
    setIsExpanded(true);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SidePanel />

        <div className="reports-container ">
          {/* Header */}
          <Header
            title="Reports & Insights"
          />

          {/* Tab Navigation */}
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {activeTab === "Summary Insights" ? <SummaryInsights /> : null}
          {/* {activeTab === "Inception" ? <Inception /> : null} */}
        </div>
      </div>
    </>
  );
};

export default CheckInReport;
