import React, { useEffect, useState } from "react";
import "./report.scss";
import SalesOverview from "../SalesOverview/index";
import Header from "components/reportComponents/Header";
import TabNavigation from "components/common/TabNavigation";
import CategoryReport from "pages/CategoryReport";
import TodaysReport from "../TodaysReport";
import Employees from "../Employees";
import SidePanel from "pages/SidePanel";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation, dropdownDetailsRequest, storeLocationsList } from "redux/newReports/newReportsActions";

const tabs = ["Today's report", "Sales Overview", "Categories", "Employees"]; //"Trends"

interface ReportProps {}

const SalesReport: React.FC<ReportProps> = () => {
    const [activeTab, setActiveTab] = useState("Today's report");
    const [isExpanded, setIsExpanded] = useState(false); //TODO: use redux

    const dispatch = useDispatch();
    /*********************************************************** */
    const restaurantDetails = useSelector(
        (state: any) => state?.auth?.restaurantDetails?.branch
      );
    
    useEffect(() => {
        const mappedIdWithBranchName = restaurantDetails?.map(
            (branchWithId: any) => ({
              value: branchWithId?.id,
              label: branchWithId?.locationName,
            })
          );
          dispatch(storeLocationsList(mappedIdWithBranchName))
          dispatch(changeLocation(mappedIdWithBranchName?.[0]))
          
    }, [restaurantDetails]);
    
const selectedLocation = useSelector((state:any) => state?.newReports?.selectedLocation)

  useEffect(() => {
    dispatch(dropdownDetailsRequest({ locationid:selectedLocation?.value }))
  }, [selectedLocation])
    

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <SidePanel />
                <div className="reports-container ">

                    {/* Header */}
                    <Header isExpanded={isExpanded} title="Reports & Insights" />

                    {/* Tab Navigation */}
                    <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                    {activeTab === "Sales Overview" ? <SalesOverview /> : null}
                    {activeTab === "Today's report" ? <TodaysReport /> : null}
                    {activeTab === "Categories" ? <CategoryReport /> : null}
                    {activeTab === "Employees" ? <Employees /> : null}
                    {/* {activeTab === "Trends" ?  <Trends /> : null} */}
                </div>
            </div>
        </>
    );
};

export default SalesReport;
