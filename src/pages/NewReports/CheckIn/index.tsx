import moment from "moment";
import React, { useEffect, useState } from "react";
import "../Sales/report.scss";
import Header from "components/reportComponents/Header";
import TabNavigation from "components/common/TabNavigation";
import SidePanel from "pages/SidePanel/indexOld";
import { useDispatch, useSelector } from "react-redux";
import {  changeDateFilterType, changeEndDate, changeLocation, changeStartDate,  storeLocationsList } from "redux/newReports/newReportsActions";
import CheckInLiveReport from "../CheckInLive";
import CheckInOverview from "../CheckInOverview";
import { RootState } from "redux/rootReducer";

const tabs = ["Live Check-in Report", "Check-in Overview", ]; //"Inception"
interface ReportProps { }

const CheckInReport: React.FC<ReportProps> = () => {
  const [activeTab, setActiveTab] = useState("Live Check-in Report");
  const [isExpanded, setIsExpanded] = useState(false); 

  const dispatch = useDispatch();
  /*********************************************************** */
  const restaurantDetails = useSelector(    (state: RootState) => state?.auth?.restaurantDetails?.branch  );
    const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)
      const startDate = useSelector((state: RootState) => state?.newReports?.selectedStartDate)
      const endtDate = useSelector((state: RootState) => state?.newReports?.selectedEndDate)

  useEffect(() => {
    if(!startDate ||!endtDate){
      dispatch(changeDateFilterType({
        label: "Today",
        value: "Today",
      }))
      dispatch(changeStartDate(moment().format("YYYY-MM-DD")))
      dispatch(changeEndDate(moment().format("YYYY-MM-DD")))
    }
  }, [startDate, endtDate])  

  useEffect(() => {
    if (!selectedLocation?.value&&restaurantDetails?.length) {
      const mappedIdWithBranchName = restaurantDetails?.map(
        (branchWithId: any) => ({
          value: branchWithId?.id,
          label: branchWithId?.locationName,
        })
      );

      dispatch(storeLocationsList(mappedIdWithBranchName))
      dispatch(changeLocation(mappedIdWithBranchName?.[0]))
    }
  }, [restaurantDetails, selectedLocation]);


  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SidePanel/>
     
        <div className="reports-container ">

          {/* Header */}
          <Header title="Reports & Insights" />

          {/* Tab Navigation */}
          <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "Live Check-in Report" ? <CheckInLiveReport /> : null}
          {activeTab === "Check-in Overview" ? <CheckInOverview /> : null}
          {/* {activeTab === "Inception" ? <Inception /> : null} */}
        </div>
      </div>
    </>
  );
};

export default CheckInReport;

