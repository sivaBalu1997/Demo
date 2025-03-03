import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  voidedSummaryRequest,
  categoryChannelSummaryRequest,
  categorySalesRequest,
  categorySalesSummaryRequest,
  changeLocation,
  dropdownDetailsRequest,
} from "../../redux/newReports/newReportsActions";
import { formatNumberByCountry } from "utils";

import RoundedPill from "components/common/RoundedPill/RoundedPill";
import MiniCard from "components/common/MiniCard/MiniCard";
import SalesChart from "./salesReport";
import LinearBarChart from "./barChart";
import ReusableDropdown from "components/common/ReusableDropdown/ReusableDropdown";
import DoughnutChart from "./doughnutChart";
import DownloadPopOver from "./downloadOption";
import StoreFilter from "components/reportComponents/StoreFilter";
import LinearBarChartCategorySales from "./barChart1";
import useDateFilter from "hooks/useDateFilter";
import "./Tabs.css";

const CategoryReport = (props) => {
  const dispatch = useDispatch();
  //TODO: move to redux
  const [selectedCategories, setSelectedCategories] = useState([{ label: "All", value: "" }]);
  const [selectedItems, setSelectedItems] = useState([{ label: "All", value: "" }]);
  const [activeBtn, setActiveBtn] = useState("categories");
  const locations = useSelector(
    (state) => state?.newReports?.storeLocationsList
  );
  const selectedLocation = useSelector(
    (state) => state?.newReports?.selectedLocation
  );
  const salesByItemCategoryData = useSelector(
    (state) => state?.newReports?.salesByItemCategorySuccess?.content
  );
  const dropdownDetailsData = useSelector(
    (state) => state?.newReports?.dropdownDetailsData
  );
  // console.log("BBBBBB",{dropdownDetailsData})
  const categorySalesData = useSelector(
    (state) => state?.newReports?.categorySalesData
  );
  const categorySalesDataLoading = useSelector(
    (state) => state?.newReports?.categorySalesLoading
  );
  const categorySalesSummaryData = useSelector(
    (state) => state?.newReports?.categorySalesSummaryData
  );
  const categorySalesSummaryDataLoading = useSelector(
    (state) => state?.newReports?.categorySalesSummaryLoading
  );
  const categoryChannelSummaryData = useSelector(
    (state) => state?.newReports?.categoryChannelSummaryData
  );
  const categoryChannelSummaryDataLoading = useSelector(
    (state) => state?.newReports?.categorySalesSummaryLoading
  );
  const voidedSummaryData = useSelector(
    (state) => state?.newReports?.voidedSummaryData
  );
  const voidedSummaryDataLoading = useSelector(
    (state) => state?.newReports?.voidedSummaryLoading
  );

    const countryCode = useSelector(
      (state) => state?.auth?.restaurantDetails?.country
    );
  const categoryList = useSelector((state) => state?.newReports?.categoryList);

  // console.log("CCCCCC",{categoryList})

  const { startDate, endDate, handleDateChange } = useDateFilter();
  

  useEffect(() => {
    console.log("use", {
      locations,
      selectedLocation,
      salesByItemCategoryData,
      dropdownDetailsData,
      categorySalesData,
      categorySalesSummaryData,
      categoryChannelSummaryData,
      voidedSummaryData,
    });
  }, [
    selectedLocation,
    locations,
    selectedLocation,
    salesByItemCategoryData,
    dropdownDetailsData,
    categorySalesData,
    categorySalesSummaryData,
    categoryChannelSummaryData,
    voidedSummaryData,
  ]);

  // const itemList = useSelector((state) => state?.newReports?.itemList)

  useEffect(() => {
    if (!categoryList?.length) {
      dispatch(dropdownDetailsRequest({ locationid: selectedLocation?.value }));
    }
  }, [categoryList, selectedLocation]);



  useEffect(() => {
    const categoryIds = selectedCategories?.map((item) => item.value);
    const itemIds = selectedItems?.map((item) => item.value);
console.log({categoryIds, itemIds, activeBtn})
    if (selectedLocation?.value) {
      let params={
        locationId: selectedLocation?.value,
        startDate: startDate,
        endDate: endDate,
        tablePageNo: 1,
        tableRecordLimit: 100,
      }
      console.log({activeBtn});
      
      if(activeBtn==="categories"){
        if(categoryIds?.length&& categoryIds[0]!=="")    {    params.categoryIds=categoryIds}
        else{
          params.groupByCategory=true
        }
      }else if(activeBtn==="items"){
        if(itemIds?.length&& itemIds[0]!=="") { params.itemIds=itemIds}
        else  { params.groupByCategory=false}
      }
      dispatch(
        categoryChannelSummaryRequest(params)
      );
      if(activeBtn==="categories"){
        dispatch(
          categorySalesRequest(params)
        );
      } 
      dispatch(
        categorySalesSummaryRequest(params)
      );
      dispatch(
        voidedSummaryRequest(params)
      );
    }

    // dispatch(salesByItemCategoryRequest({ locationid:selectedLocation?.value, startDate:"2024-12-01" , endDate:"2024-12-31",tablePageNo:1,tableRecordLimit:100 }))
  }, [selectedLocation, selectedCategories, selectedItems, startDate, endDate,activeBtn]);



  const [selectedDate, setSelectedDate] = useState({
    label: "Yesterday",
    value: "Yesterday",
  });

  const calendarRef = useRef();

  // Date formatting function
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getDateFromOption = (option) => {
    const today = new Date();
    switch (option) {
      case "Today":
        return formatDate(today);
      case "Yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return formatDate(yesterday);
      case "This week":
        const weekStart = new Date(today);
        weekStart.setDate(weekStart.getDate() - 7);
        return formatDate(weekStart);
      case "This month":
        const monthStart = new Date(today);
        monthStart.setDate(1);
        return formatDate(monthStart);
      default:
        return formatDate(today);
    }
  };

  const handleSelectCategoriesOnChange = (selectedCategoriesData) => {
    if (!selectedCategoriesData.value) {
      setSelectedCategories([{ label: "All", value: "" }]);
      setSelectedItems([{ label: "All", value: "" }]);
      return;
    }
  
    const category = dropdownDetailsData?.find(
      (cat) => cat.categoryId === selectedCategoriesData.value
    );
  
    if (category) {
      let tempCategories = [...selectedCategories];
  
      tempCategories = tempCategories.filter(cat => cat.value !== "");
  
      // Add new category if it's not already selected
      if (!tempCategories.some(cat => cat.value === category.categoryId)) {
        tempCategories.push({
          value: category.categoryId,
          label: category.categoryName,
        });
        setSelectedCategories(tempCategories);
        const selectedCategoryIds = tempCategories.map((cat) => cat.value);
        const filteredItems = [
          ...new Map(
            dropdownDetailsData
              .filter((item) => selectedCategoryIds.includes(item.categoryId))
              .map((item) => [item.itemId, { value: item.itemId, label: item.itemName }])
          ).values(),
        ];
      
        // Update selected items state
        setSelectedItems(filteredItems);
      }
  
    }
  };


  const handleSelectItemsOnChange = (selectedItemsData) => {
    if (!selectedItemsData.value) {
      setSelectedItems([{ label: "All", value: "" }]);
      return;
    }
    const item = dropdownDetailsData?.find(
      (item) => item.itemId === selectedItemsData.value
    );
    if (item) {
      let tempItems = [...selectedItems];

      tempItems = tempItems.filter(cat => cat.value !== "");
      if (!tempItems.some(a => a.value === item.itemId)) {
      tempItems.push({ value: item.itemId, label: item.itemName });
      }

      setSelectedItems(tempItems);
    }
  };

  const categoryCloseOnClick = (categoryId) => {
    let tempCategories = [...selectedCategories];
    tempCategories = tempCategories.filter(
      (selectedData) => selectedData.value !== categoryId
    );
    setSelectedCategories(tempCategories);
  };

  const itemsCloseOnClick = (itemId) => {
    let tempItems = [...selectedItems];
    tempItems = tempItems.filter(
      (selectedData) => selectedData.value !== itemId
    );
    setSelectedItems(tempItems);
  };

  const handleSelectDateOnClick = (dropDownData) => {
    if (dropDownData.value === "Custom date") {
      calendarRef.current?.openCalendar();
    } else {
      setSelectedDate({
        label: dropDownData.value,
        value: getDateFromOption(dropDownData.value),
      });
    }
  };

  const handleCategoryClear=()=>{
  setSelectedCategories([{ label: "All", value: "" }]);
  setSelectedItems([{ label: "All", value: "" }]);
  }
  const handleItemsClear=()=>{
    // setSelectedCategories([{ label: "All", value: "" }]);
    setSelectedItems([{ label: "All", value: "" }]);
    }
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="category-page-cotainer">
        <div className="category-page-body">
          <StoreFilter
            storeOptions={locations}
            selectedDate={selectedDate}
            selectedStore={selectedLocation}
            setSelectedDate={setSelectedDate}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
            datePickerApplyFunction={(date1, date2) =>
              handleDateChange("Custom Date", date1, date2)
            }
            dateDropdownFunction={(date1, date2) =>
              handleDateChange("Custom Date", date1, date2)
            }
          />
          <div className="category-btn-switch">
            <button
              className={`category-btn  ${activeBtn == "categories" ? "active-btn" : ""
                }`}
              onClick={() => {
                setActiveBtn("categories");
              }}
            >
              Categories
            </button>
            <button
              className={`category-btn  ${activeBtn == "items" ? "active-btn" : ""
                }`}
              onClick={() => {
                setActiveBtn("items");
              }}
            >
              Items
            </button>
          </div>
          <div className="categories-items-container">
            <div className="categories-items-content">
              <div>
                <div className="select-categories-title-container">
                  <span className="select-categories-title poppins-fw400-fs16">
                    Select Categories{" "}
                  </span>
                  <span className="font-color-red poppins-fw400-fs16">*</span>
                </div>
                <ReusableDropdown
                  options={    [{ label: "All", value: "" },  ...categoryList || []]}
                  value={selectedCategories}
                  placeholder={"Select categories"}
                  dropdownContainerClassName="select-food-item-dropdown-cotainer"
                  dropdownClassName="select-food-item-dropdown"
                  dropdownPrefix={"select-food-item-dropdown-prefix"}
                  onChange={handleSelectCategoriesOnChange}
                />
              </div>
              <RoundedPill
                data={selectedCategories}
                closeIconOnClick={categoryCloseOnClick}
                handeClear={handleCategoryClear}
              />
            </div>
            {activeBtn == "items" ? (
              <div className="categories-items-content">
                <div>
                  <div className="select-categories-title-container">
                    <span className="select-categories-title poppins-fw400-fs16">
                      Select Items
                    </span>
                    <span className="font-color-red poppins-fw400-fs16">*</span>
                  </div>
                  <ReusableDropdown
                    options={
                      [{ label: "All", value: "" },
                      ...dropdownDetailsData?.map((data) => ({
                        value: data?.itemId,
                        label: data?.itemName,
                      })) || []]
                    }
                    value={selectedItems}
                    placeholder={"Select items"}
                    dropdownContainerClassName="select-food-item-dropdown-cotainer"
                    dropdownClassName="select-food-item-dropdown"
                    dropdownPrefix={"select-food-item-dropdown-prefix"}
                    onChange={handleSelectItemsOnChange}
                  />
                </div>
                <RoundedPill
                  data={selectedItems}
                  closeIconOnClick={itemsCloseOnClick}
                  handeClear={handleItemsClear}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <div className="categories-graph-header-container">
              <h1 className="categories-overview-heading">
                {activeBtn == "categories" ? "Categories Overview" : ""}
                {activeBtn == "items" ? "Items overview" : ""}
              </h1>
              <DownloadPopOver />
            </div>
            <MiniCard
              data={[
                {
                  title: "TOTAL SALES",
                  value: `$ ${
                    formatNumberByCountry(categorySalesSummaryData?.totalSales, countryCode, true) || 0
                  }`,
                },
                {
                  title: "VOID",
                  value: `$ ${
                    formatNumberByCountry(categorySalesSummaryData?.voidAmount, countryCode, true) || 0
                  }`,
                },
                {
                  title: "ADD-ON",
                  value: `$ ${
                    formatNumberByCountry(categorySalesSummaryData?.addOn, countryCode, true) || 0
                  }`,
                },
                {
                  title: "TOTAL QUANTITY",
                  value: `${ formatNumberByCountry(categorySalesSummaryData?.totalQuantity, countryCode, false) || 0}`,
                },
              ]}
            />
          </div>
          <div>
            <div className="categories-graph-header-container">
              <h1 className="categories-overview-heading">
                {activeBtn == "categories" ? "Categories sales" : ""}
                {activeBtn == "items" ? "Items sales" : ""}
              </h1>
              <DownloadPopOver />
            </div>
            <LinearBarChart
              dataList={categorySalesData}
              barColorCode={activeBtn == "categories" ? "#02B04C" : "#14A789"}
              loader={categorySalesDataLoading}
            />
          </div>
          <div>
            <div className="categories-graph-header-container">
              <h1 className="categories-overview-heading">
                {activeBtn == "categories" ? "By Channels - Categories" : ""}
                {activeBtn == "items" ? "By Channels - Items" : ""}
              </h1>
              <DownloadPopOver />
            </div>

            <SalesChart
              dataList={categoryChannelSummaryData}
              loader={categoryChannelSummaryDataLoading}
            />
          </div>
          {activeBtn == "categories" ? (
            <div>
              <div className="categories-graph-header-container">
                <h1 className="categories-overview-heading">
                  Categories Voids
                </h1>
                <DownloadPopOver />
              </div>
              <LinearBarChartCategorySales
                dataList={voidedSummaryData}
                barColorCode={"#AA562A"}
                loader={voidedSummaryDataLoading}
              />
            </div>
          ) : (
            ""
          )}
          {activeBtn == "items" ? (
            <div>
              <div className="categories-graph-header-container">
                <h1 className="categories-overview-heading">Cancellation</h1>
                <DownloadPopOver />
              </div>
              <DoughnutChart
                dataList={voidedSummaryData}
                countryCode={countryCode}
                loader={voidedSummaryDataLoading}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryReport;
