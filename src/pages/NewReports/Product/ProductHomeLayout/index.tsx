import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeDateFilterType, changeEndDate, changeLocation, changeStartDate, storeLocationsList } from 'redux/newReports/newReportsActions';
import { RootState } from 'redux/rootReducer';
import TabNavigation from 'components/common/TabNavigation';
import SidePannelMob from 'components/reportComponents/SiePannelMob';
import moment from 'moment';
import Header from "components/reportComponents/Header";
import SidePanel from 'pages/SidePanel'
import ProductInsights from '../ProductInsights';
import ProductAvailability from '../ProductAvailability';
import "../../Sales/report.scss"

const tabs = ["Insights", "Availability"]; 
interface ReportProps { }

const ProductHomeLayout: React.FC<ReportProps> = () => {
    const [activeTab, setActiveTab] = useState("Insights");
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

        {activeTab === "Insights" ? <ProductInsights /> : null}
        {activeTab === "Availability" ? <ProductAvailability /> : null}
      </div>
    </div>
  </>
  )
}

export default ProductHomeLayout
