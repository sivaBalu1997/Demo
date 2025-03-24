import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  voidedSummaryRequest,
  categoryChannelSummaryRequest,
  categorySalesRequest,
  categorySalesSummaryRequest,
  changeLocation,
  dropdownDetailsRequest,
} from "../../redux/newReports/newReportsActions";
import { formatNumberByCountry, getCurrencySymbol } from "utils";
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
import ErrorHandler from "components/reportComponents/ErrorHandler";
import "./Tabs.css";

const CategoryReport = (props) => {
  const [selectedCategories, setSelectedCategories] = useState([{ label: "All", value: "" }]);
  const [selectedItems, setSelectedItems] = useState([{ label: "All", value: "" }]);
  const [itemlList, setItemList] = useState([{ label: "All", value: "" }]);
  const [activeBtn, setActiveBtn] = useState("categories");

  const locations = useSelector((state) => state?.newReports?.storeLocationsList);
  const selectedLocation = useSelector((state) => state?.newReports?.selectedLocation);
  const salesByItemCategoryData = useSelector((state) => state?.newReports?.salesByItemCategorySuccess?.content);
  const dropdownDetailsData = useSelector((state) => state?.newReports?.dropdownDetailsData);
  const categorySalesData = useSelector((state) => state?.newReports?.categorySalesData);
  const categorySalesDataFailure = useSelector((state) => state?.newReports?.categorySalesError);
  const categorySalesDataLoading = useSelector((state) => state?.newReports?.categorySalesLoading);
  const categorySalesSummaryData = useSelector((state) => state?.newReports?.categorySalesSummaryData);
  const categorySalesSummaryDataLoading = useSelector((state) => state?.newReports?.categorySalesSummaryLoading);
  const categoryChannelSummaryData = useSelector((state) => state?.newReports?.categoryChannelSummaryData);
  const categoryChannelSummaryDataFailure = useSelector((state) => state?.newReports?.categoryChannelSummaryError)
  const categoryChannelSummaryDataLoading = useSelector((state) => state?.newReports?.categorySalesSummaryLoading);
  const voidedSummaryData = useSelector((state) => state?.newReports?.voidedSummaryData);
  const voidedSummaryDataFailure = useSelector((state) => state?.newReports?.voidedSummaryError)
  const voidedSummaryDataLoading = useSelector((state) => state?.newReports?.voidedSummaryLoading);
  const countryCode = useSelector((state) => state?.newReports?.getDetailsRestaurantSuccess?.country);
  const categoryList = useSelector((state) => state?.newReports?.categoryList);
  const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode)), [countryCode]);



  const dispatch = useDispatch();
  const { startDate, endDate, selectedDateFilterType, handleDateChange } = useDateFilter();

  useEffect(() => {
    if (!categoryList?.length) {
      dispatch(dropdownDetailsRequest({ locationid: selectedLocation?.value }));
    }
  }, [categoryList, selectedLocation]);

  useEffect(() => {
    setSelectedCategories([{ label: "All", value: "" }]);
    setSelectedItems([{ label: "All", value: "" }]);
    setItemList([{ label: "All", value: "" }, ...(dropdownDetailsData || [])?.map((item) => ({ label: item.itemName, value: item.itemId }))]);
  }, [dropdownDetailsData])

  useEffect(() => {
    const categoryIds = selectedCategories?.map((item) => item.value);
    const itemIds = selectedItems?.map((item) => item.value);
    if (selectedLocation?.value) {
      let params = {
        locationId: selectedLocation?.value,
        startDate: startDate,
        endDate: endDate,
      }

      if (activeBtn === "categories") {
        if (categoryIds?.length && categoryIds[0] !== "") { params.categoryIds = categoryIds }
        else {
          params.groupByCategory = true
        }
      } else if (activeBtn === "items") {
        if (itemIds?.length && itemIds[0] !== "") { params.itemIds = itemIds }
        else { params.groupByCategory = false }
      }
      dispatch(
        categoryChannelSummaryRequest(params)
      );
      dispatch(
        categorySalesRequest(params)
      );
      dispatch(
        categorySalesSummaryRequest(params)
      );
      dispatch(
        voidedSummaryRequest(params)
      );
    }
  }, [selectedLocation, selectedCategories, selectedItems, startDate, endDate, activeBtn]);

  useEffect(() => {
    const selectedCategoryIds = selectedCategories.map((cat) => cat.value);
    let filteredItems = [];
    if (!selectedCategories?.[0]?.value) {
      filteredItems = [
        ...new Map((dropdownDetailsData || [])
          .map((item) => [item.itemId, { value: item.itemId, label: item.itemName }])
        ).values(),
      ];
    } else {
      filteredItems = [
        ...new Map((dropdownDetailsData || [])
          .filter((item) => selectedCategoryIds?.includes(item?.categoryId))
          .map((item) => [item?.itemId, { value: item?.itemId, label: item?.itemName }])
        ).values(),
      ];
    }
    setItemList(filteredItems);
  }, [selectedCategories])


  const handleSelectCategoriesOnChange = (selectedCategoriesData) => {
    if (!selectedCategoriesData.value) {
      setSelectedCategories([{ label: "All", value: "" }]);
      setSelectedItems([{ label: "All", value: "" }]);
      return;
    }
    
    const category = dropdownDetailsData?.find(
      (cat) => cat.categoryId === selectedCategoriesData?.value
    );
    
    if (category) {
      let tempCategories = [...selectedCategories];

      tempCategories = tempCategories?.filter(cat => cat.value !== "");

      // Add new category if it's not already selected
      if (!tempCategories.some(cat => cat.value === category.categoryId )&& tempCategories.length<=9) {
        tempCategories.push({
          value: category.categoryId,
          label: category.categoryName,
        });
        setSelectedCategories(tempCategories);
        const selectedCategoryIds = tempCategories.map((cat) => cat.value);
        const filteredItems = [
          ...new Map(
            (dropdownDetailsData || [])
              .filter((item) => selectedCategoryIds?.includes(item?.categoryId))
              .map((item) => [item?.itemId, { value: item?.itemId, label: item?.itemName }])
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
    
      let tempCategories = [...(selectedCategories || [])];
      tempCategories = tempCategories?.filter(
        (selectedData) => selectedData.value !== categoryId
      );

      if (!categoryId||!tempCategories?.length) {

        setSelectedCategories([{ label: "All", value: "" }]);
        setSelectedItems([{ label: "All", value: "" }]);
      } else{        
        
        const selectedCategoryIds = tempCategories?.map((cat) => cat.value);

      const tempItems = [
        ...new Map(
          (dropdownDetailsData || [])
            .filter((item) => selectedCategoryIds?.includes(item?.categoryId))
            .map((item) => [item?.itemId, { value: item?.itemId, label: item?.itemName }])
        ).values(),
      ];
      
      if (!tempItems?.length) {
        tempItems = [{ label: "All", value: "" }]
      }
      setSelectedItems(tempItems);
      
      if (!tempCategories?.length) {
        tempCategories = [{ label: "All", value: "" }]
      }
      
      setSelectedCategories(tempCategories);
    }
  };

  const itemsCloseOnClick = (itemId) => {
    let tempItems = [...(selectedItems||[])];
    tempItems = tempItems?.filter(
      (selectedData) => selectedData?.value !== itemId
    );

    if (!tempItems?.length) {
      tempItems = [{ label: "All", value: "" }]
    }

    setSelectedItems(tempItems);
  };

  const handleCategoryClear = () => {
    setSelectedCategories([{ label: "All", value: "" }]);
    setSelectedItems([{ label: "All", value: "" }]);
  }
  const handleItemsClear = () => {
    // setSelectedCategories([{ label: "All", value: "" }]);
    setSelectedItems([{ label: "All", value: "" }]);
  }

  const datepickerApply = (type, data1, data2) => {
    handleDateChange("Custom Date", data1, data2);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="category-page-cotainer">
        <div className="category-page-body">
          <StoreFilter
            startDate={startDate}
            endDate={endDate}
            storeOptions={locations}
            selectedDate={selectedDateFilterType}
            selectedStore={selectedLocation}
            setSelectedDate={(data) => handleDateChange(data?.value)}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
            datePickerApplyFunction={(date1, date2) => datepickerApply("Custom Date", date1, date2)}
            dateDropdownFunction={(date1, date2) => datepickerApply("Custom Date", date1, date2)}
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
                  <div>
                    <span className="select-categories-title poppins-fw400-fs16">
                      Select Categories{" "}
                    </span>
                    <span className="font-color-red poppins-fw400-fs16">*</span>
                  </div>
                  {!selectedCategories?.[0]?.value ? null : <span className="font-color-red poppins-fw400-fs16 pointer" onClick={handleCategoryClear}>Clear all</span>}
                </div>
                <ReusableDropdown
                  options={[{ label: "All", value: "" }, ...categoryList || []]}
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
                showSelected={!window.matchMedia("(max-width: 768px)").matches}
              />
            </div>
            {activeBtn == "items" ? (
              <div className="categories-items-content">
                <div>
                  <div className="select-categories-title-container">
                    <div>
                      <span className="select-categories-title poppins-fw400-fs16">
                        Select Items
                      </span>
                      <span className="font-color-red poppins-fw400-fs16">*</span>
                    </div>
                    {!selectedItems?.[0]?.value ? null : <span className="font-color-red poppins-fw400-fs16 pointer" onClick={handleItemsClear}>Clear all</span>}
                  </div>
                  <ReusableDropdown
                    options={itemlList}
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
                  showSelected={!window.matchMedia("(max-width: 768px)").matches}

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
                  value: `${currencySymbol} ${formatNumberByCountry(categorySalesSummaryData?.totalSales, countryCode, true) || 0
                    }`,
                },
                {
                  title: "VOID",
                  value: `${currencySymbol} ${formatNumberByCountry(categorySalesSummaryData?.voidAmount, countryCode, true) || 0
                    }`,
                },
                {
                  title: "ADD-ON",
                  value: `${currencySymbol} ${formatNumberByCountry(categorySalesSummaryData?.addOn, countryCode, true) || 0
                    }`,
                },
                {
                  title: "TOTAL QUANTITY",
                  value: `${formatNumberByCountry(categorySalesSummaryData?.totalQuantity, countryCode, false) || 0}`,
                },
              ]}
              loader={categorySalesSummaryDataLoading}
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
            <ErrorHandler data={categorySalesData} isError={categorySalesDataFailure}>
              <LinearBarChart
                dataList={categorySalesData}
                barColorCode={activeBtn == "categories" ? "#02B04C" : "#14A789"}
                loader={categorySalesDataLoading}
                // isMobile={window.matchMedia("(max-width: 768px)").matches}
              />
            </ErrorHandler>

          </div>
          <div>
            <div className="categories-graph-header-container">
              <h1 className="categories-overview-heading">
                {activeBtn == "categories" ? "By Channels - Categories" : ""}
                {activeBtn == "items" ? "By Channels - Items" : ""}
              </h1>
              <DownloadPopOver />
            </div>
            <ErrorHandler data={categoryChannelSummaryData} isError={categoryChannelSummaryDataFailure}>
              <SalesChart
                dataList={categoryChannelSummaryData}
                loader={categoryChannelSummaryDataLoading}
                // isMobile={window.matchMedia("(max-width: 768px)").matches}

              />
            </ErrorHandler>
          </div>
          {activeBtn == "categories" ? (
            <div>
              <div className="categories-graph-header-container">
                <h1 className="categories-overview-heading">
                  Categories Voids
                </h1>
                <DownloadPopOver />
              </div>
              <ErrorHandler data={voidedSummaryData} isError={voidedSummaryDataFailure}>
                <LinearBarChartCategorySales
                  dataList={voidedSummaryData}
                  barColorCode={"#AA562A"}
                  loader={voidedSummaryDataLoading}
                  // isMobile={window.matchMedia("(max-width: 768px)").matches}

                />
              </ErrorHandler>
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
              <ErrorHandler data={voidedSummaryData} isError={voidedSummaryDataFailure}>
                <DoughnutChart
                  dataList={voidedSummaryData}
                  countryCode={countryCode}
                  loader={voidedSummaryDataLoading}
                  // isMobile={window.matchMedia("(max-width: 768px)").matches}
                />
              </ErrorHandler>
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
