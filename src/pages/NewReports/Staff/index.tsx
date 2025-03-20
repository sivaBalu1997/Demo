import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeDateFilterType, changeEndDate, changeLocation, changeStartDate, storeLocationsList } from 'redux/newReports/newReportsActions';
import { RootState } from 'redux/rootReducer';
import TabNavigation from 'components/common/TabNavigation';
import moment from 'moment';
import Header from "components/reportComponents/Header";
import SidePanel from 'pages/SidePanel'
import Overview from './Overview';
import PerformanceTrend from './PerformanceTrend';
import "../Sales/report.scss"

const tabs = ["Overview", "Performance Trend"];
interface ReportProps { }

const StaffReports: React.FC<ReportProps> = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const dispatch = useDispatch();
  
  /*****************************Selectors****************************** */
  const restaurantDetails = useSelector((state: RootState) => state?.auth?.restaurantDetails?.branch);
  const startDate = useSelector((state: RootState) => state?.newReports?.selectedStartDate)
  const endDate = useSelector((state: RootState) => state?.newReports?.selectedEndDate)

  /*****************************useEffect****************************** */
  useEffect(() => {
    if (!startDate || !endDate) {
      dispatch(changeDateFilterType({
        label: "Today",
        value: "Today",
      }))
      dispatch(changeStartDate(moment().format("YYYY-MM-DD")))
      dispatch(changeEndDate(moment().format("YYYY-MM-DD")))
    }
  }, [startDate, endDate])

  useEffect(() => {
    if (restaurantDetails?.length) {
      const mappedIdWithBranchName = restaurantDetails?.map(
        (branchWithId: any) => ({
          value: branchWithId?.id,
          label: branchWithId?.locationName,
        })
      );

      dispatch(storeLocationsList(mappedIdWithBranchName))
      dispatch(changeLocation(mappedIdWithBranchName?.[0]))
    }
  }, [restaurantDetails]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SidePanel />
        <div className="reports-container ">

          {/* Header */}
          <Header title="Reports & Insights" />

          {/* Tab Navigation */}
          <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "Overview" ? <Overview /> : null}
          {activeTab === "Performance Trend" ? <PerformanceTrend /> : null}
        </div>
      </div>
    </>
  )
}

export default StaffReports
