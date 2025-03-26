import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeDateFilterType, changeEndDate, changeLocation, changeStartDate, getRestaurantRequestFromNewReports, storeLocationsList } from 'redux/newReports/newReportsActions';
import { RootState } from 'redux/rootReducer';
import TabNavigation from 'components/common/TabNavigation';
import moment from 'moment';
import Header from "components/reportComponents/Header";
import SidePanel from 'pages/SidePanel'
import ProductInsights from './ProductInsights';
import ProductAvailability from './ProductAvailability';
import "../Sales/report.scss"
import { getRestaurantRequest } from 'redux/auth/authActions';
import { tabsForProduct } from 'CommonConstants/reportConstants';

interface ReportProps { }

const ProductReports: React.FC<ReportProps> = () => {    
    const [activeTab, setActiveTab] = useState("Insights");
    
      const dispatch = useDispatch();
      /*********************************************************** */
      const restaurantDetails = useSelector(    (state: RootState) => state?.auth?.restaurantDetails?.branch  );
        const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)
          const startDate = useSelector((state: RootState) => state?.newReports?.selectedStartDate)
          const endDate = useSelector((state: RootState) => state?.newReports?.selectedEndDate)

      

        useEffect(() => {
          if (selectedLocation?.value
          ) {
            dispatch(getRestaurantRequestFromNewReports(selectedLocation?.value
            ));
          }
        }, [selectedLocation]);    
          
      useEffect(() => {
        if(!startDate ||!endDate){
          dispatch(changeDateFilterType({
            label: "Today",
            value: "Today",
          }))
          dispatch(changeStartDate(moment().format("YYYY-MM-DD")))
          dispatch(changeEndDate(moment().format("YYYY-MM-DD")))
        }
      }, [startDate, endDate])  
    

  useEffect(() => {
    let isLocationChanged=true
    if (restaurantDetails?.length) {
      const mappedIdWithBranchName = restaurantDetails?.map(
        (branchWithId: any) => {
          if(branchWithId?.id===selectedLocation?.value)isLocationChanged=false
          return({
          value: branchWithId?.id,
          label: branchWithId?.locationName,
        }
      )}
      );

      dispatch(storeLocationsList(mappedIdWithBranchName))
      if(isLocationChanged){
        dispatch(changeLocation(mappedIdWithBranchName?.[0]))
      }
    }
  }, [restaurantDetails, selectedLocation]);
    
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    <SidePanel/>
      <div className="reports-container ">
        
        {/* Header */}
        <Header  title="Reports & Insights"/>

        {/* Tab Navigation */}
        <TabNavigation tabs={tabsForProduct} activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "Insights" ? <ProductInsights /> : null}
        {activeTab === "Availability" ? <ProductAvailability /> : null}
      </div>
    </div>
  </>
  )
}

export default ProductReports
