import moment from "moment";
import React, { useEffect, useState } from "react";
import "./report.scss";
import SalesOverview from "../SalesOverview/index";
import Header from "components/reportComponents/Header";
import TabNavigation from "components/common/TabNavigation";
import CategoryReport from "pages/CategoryReport";
import TodaysReport from "../TodaysReport";
import Employees from "../Employees";
import SidePanel from "pages/SidePanel/indexOld";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryList, addItemList, changeDateFilterType, changeEndDate, changeLocation, changeStartDate, dropdownDetailsRequest, selectCategories, storeLocationsList } from "redux/newReports/newReportsActions";
import { RootState } from "redux/rootReducer";

const tabs = ["Today's report", "Sales Overview", "Categories", "Employees"]; //"Trends"

interface ReportProps { }

const SalesReport: React.FC<ReportProps> = () => {
  const [activeTab, setActiveTab] = useState("Today's report");

  const dispatch = useDispatch();
  /*********************************************************** */
  const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)
  const startDate = useSelector((state: RootState) => state?.newReports?.selectedStartDate)
  const endtDate = useSelector((state: RootState) => state?.newReports?.selectedEndDate)
  const restaurantDetails = useSelector(
    (state: RootState) => state?.auth?.restaurantDetails?.branch
  );
  const dropdownDetailsData = useSelector((state: RootState) => state?.newReports?.dropdownDetailsData)
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
    if (!selectedLocation?.value && restaurantDetails?.length) {
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


  useEffect(() => {
    if (selectedLocation?.value) {
      dispatch(dropdownDetailsRequest({ locationid: selectedLocation?.value }))
    }
  }, [selectedLocation])

  useEffect(() => {
    if (dropdownDetailsData?.length) {
      const uniqueCategories = [
        ...new Map(
          (dropdownDetailsData ?? [])?.map(
            ({ categoryName, categoryId }: { categoryName: string, categoryId: string }) => [categoryId, { label: categoryName, value: categoryId }]
          )
        ).values()
      ];

      const uniqueItems = [
        ...new Map(
          (dropdownDetailsData||[])?.map(
            ({ itemName, itemId, categoryId }: { itemName: string, itemId: string, categoryId: string }) => [itemId, { label: itemName, value: itemId, categoryId, }]
          )
        ).values()
      ];
      dispatch(addCategoryList(uniqueCategories))
      dispatch(addItemList(uniqueItems))
    }

  }, [dropdownDetailsData])




  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SidePanel/>
        <div className="reports-container ">

          {/* Header */}
          <Header  title="Reports & Insights"/>

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
