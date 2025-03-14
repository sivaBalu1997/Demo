import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeDateFilterType, changeEndDate, changeLocation, changeStartDate, storeLocationsList } from 'redux/newReports/newReportsActions';
import { RootState } from 'redux/rootReducer';
import TabNavigation from 'components/common/TabNavigation';
import SidePannelMob from 'components/reportComponents/SiePannelMob';
import moment from 'moment';
import Header from "components/reportComponents/Header";
import SidePanel from 'pages/SidePanel'
import Overview from '../Overview';
import PerformanceTrend from '../PerformanceTrend';
import "../../Sales/report.scss"

const tabs = ["Overview", "Performance Trend"]; 
interface ReportProps { }

const StaffHomeLayout: React.FC<ReportProps> = () => {
    const [activeTab, setActiveTab] = useState("Overview");
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
    
      const handleSideMenu=()=>{
        setIsExpanded(true)
      }
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    <SidePanel/>
      <div className="reports-container ">

        {/* Header */}
        <Header  title="Reports & Insights"/>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "Overview" ? <Overview /> : null}
        {activeTab === "Performance Trend" ? <PerformanceTrend /> : null}
      </div>
    </div>
  </>
  )
}

export default StaffHomeLayout
