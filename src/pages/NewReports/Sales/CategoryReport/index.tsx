import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  voidedSummaryRequest,
  categoryChannelSummaryRequest,
  categorySalesRequest,
  categorySalesSummaryRequest,
  changeLocation,
  dropdownDetailsRequest,
} from "../../../../redux/newReports/newReportsActions";
import { formatNumberByCountry, getCurrencySymbol } from "utils";
import RoundedPill from "components/common/RoundedPill/RoundedPill";
import MiniCard from "components/common/MiniCard/MiniCard";
import SalesChart from "./salesReport";
import LinearBarChart from "./barChart";
import ReusableDropdown from "components/common/ReusableAsyncDropdown/";

import StoreFilter from "components/reportComponents/StoreFilter";
import LinearBarChartCategorySales from "./barChart1";
import useDateFilter from "hooks/useDateFilter";
import ErrorHandler from "components/reportComponents/ErrorHandler";
import "./Tabs.css";
import DownloadReport from "components/reportComponents/DownloadReports";
import { RootState } from "redux/rootReducer";
import DoughnutChart from "components/reportComponents/ReusableCharts/ReusableDoughnutChart";
import ReusableBarChart from "components/reportComponents/ReusableCharts/ReusableBarChart";

const CategoryReport = (props: any) => {
  const [selectedCategories, setSelectedCategories] = useState([{ label: "All", value: "" }]);
  const [selectedItems, setSelectedItems] = useState([{ label: "All", value: "" }]);
  const [itemlList, setItemList] = useState([{ label: "All", value: "" }]);
  const [activeBtn, setActiveBtn] = useState<"categories" | "items">("categories");
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 600px)").matches);

  const locations = useSelector((state: RootState) => state?.newReports?.storeLocationsList);
  const selectedLocation: any = useSelector((state: RootState) => state?.newReports?.selectedLocation);
  const salesByItemCategoryData = useSelector((state: any) => state?.newReports?.salesByItemCategorySuccess?.content);
  const dropdownDetailsData = useSelector((state: RootState) => state?.newReports?.dropdownDetailsData);
  const categorySalesData = useSelector((state: RootState) => state?.newReports?.categorySalesData);
  const categorySalesDataFailure = useSelector((state: RootState) => state?.newReports?.categorySalesError);
  const categorySalesDataLoading = useSelector((state: RootState) => state?.newReports?.categorySalesLoading);
  const categorySalesSummaryData: any = useSelector((state: RootState) => state?.newReports?.categorySalesSummaryData);
  const categorySalesSummaryDataLoading = useSelector((state: RootState) => state?.newReports?.categorySalesSummaryLoading);
  const categorySalesSummaryDataError = useSelector((state: RootState) => state?.newReports?.categorySalesSummaryError);
  const categoryChannelSummaryData = useSelector((state: RootState) => state?.newReports?.categoryChannelSummaryData);
  const categoryChannelSummaryDataFailure = useSelector((state: RootState) => state?.newReports?.categoryChannelSummaryError)
  const categoryChannelSummaryDataLoading = useSelector((state: RootState) => state?.newReports?.categorySalesSummaryLoading);
  const voidedSummaryData = useSelector((state: RootState) => state?.newReports?.voidedSummaryData);
  const voidedSummaryDataFailure = useSelector((state: RootState) => state?.newReports?.voidedSummaryError)
  const voidedSummaryDataLoading = useSelector((state: RootState) => state?.newReports?.voidedSummaryLoading);
  const countryCode = useSelector((state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country);
  const categoryList = useSelector((state: RootState) => state?.newReports?.categoryList);
  const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode, true)), [countryCode]);

  const dispatch = useDispatch();
  const { startDate, endDate, selectedDateFilterType, handleDateChange } = useDateFilter();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    if (!categoryList?.length) {
      dispatch(dropdownDetailsRequest({ locationid: selectedLocation?.value }));
    }
  }, [categoryList, selectedLocation]);

  useEffect(() => {
    setSelectedCategories([{ label: "All", value: "" }]);
    setSelectedItems([{ label: "All", value: "" }]);
    setItemList([{ label: "All", value: "" }, ...(dropdownDetailsData || [])?.map((item: any) => ({ label: item.itemName, value: item.itemId }))]);
  }, [dropdownDetailsData])

  useEffect(() => {
    const categoryIds = selectedCategories?.map((item) => item.value);
    const itemIds = selectedItems?.map((item) => item.value);
    if (selectedLocation?.value) {
      let params: any = {
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
          .map((item: any) => [item.itemId, { value: item.itemId, label: item.itemName }])
        ).values(),
      ];
    } else {
      filteredItems = [
        ...new Map((dropdownDetailsData || [])
          .filter((item: any) => selectedCategoryIds?.includes(item?.categoryId))
          .map((item: any) => [item?.itemId, { value: item?.itemId, label: item?.itemName }])
        ).values(),
      ];
    }
    setItemList(filteredItems);
  }, [selectedCategories])


  const handleSelectCategoriesOnChange = (selectedCategoriesData: any) => {
    if (!selectedCategoriesData.value) {
      setSelectedCategories([{ label: "All", value: "" }]);
      setSelectedItems([{ label: "All", value: "" }]);
      return;
    }

    const category: any = dropdownDetailsData?.find(
      (cat: any) => cat.categoryId === selectedCategoriesData?.value
    );

    if (category) {
      let tempCategories = [...selectedCategories];

      tempCategories = tempCategories?.filter(cat => cat.value !== "");

      // Add new category if it's not already selected
      if (!tempCategories.some((cat: any) => cat.value === category.categoryId) && tempCategories.length <= 9) {
        tempCategories.push({
          value: category.categoryId,
          label: category.categoryName,
        });
        setSelectedCategories(tempCategories);
        const selectedCategoryIds = tempCategories.map((cat) => cat.value);
        const filteredItems = [
          ...new Map(
            (dropdownDetailsData || [])
              .filter((item: any) => selectedCategoryIds?.includes(item?.categoryId))
              .map((item: any) => [item?.itemId, { value: item?.itemId, label: item?.itemName }])
          ).values(),
        ];

        // Update selected items state
        setSelectedItems(filteredItems);
      }

    }

  };

  const handleSelectItemsOnChange = (selectedItemsData: any) => {
    if (!selectedItemsData.value) {
      setSelectedItems([{ label: "All", value: "" }]);
      return;
    }
    const item: any = dropdownDetailsData?.find(
      (item: any) => item.itemId === selectedItemsData.value
    );
    if (item) {
      let tempItems = [...selectedItems];

      tempItems = tempItems.filter(cat => cat.value !== "");
      if (!tempItems.some((a: any) => a.value === item.itemId)) {
        tempItems.push({ value: item.itemId, label: item.itemName });
      }

      setSelectedItems(tempItems);
    }
  };

  const categoryCloseOnClick = (categoryId: string) => {

    let tempCategories = [...(selectedCategories || [])];
    tempCategories = tempCategories?.filter(
      (selectedData) => selectedData.value !== categoryId
    );

    if (!categoryId || !tempCategories?.length) {
      setSelectedCategories([{ label: "All", value: "" }]);
      setSelectedItems([{ label: "All", value: "" }]);
    } else {

      const selectedCategoryIds = tempCategories?.map((cat) => cat.value);

      let tempItems = [
        ...new Map(
          (dropdownDetailsData || [])
            .filter((item: any) => selectedCategoryIds?.includes(item?.categoryId))
            .map((item: any) => [item?.itemId, { value: item?.itemId, label: item?.itemName }])
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

  const itemsCloseOnClick = (itemId: string) => {
    let tempItems = [...(selectedItems || [])];
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


  const datepickerApply = (type: string, data1: any, data2: any) => {
    handleDateChange("Custom Date", data1, data2);
  };

  const categorySalesSummaryDataArrayForDownloading = [categorySalesSummaryData]
  const categorySalesSummaryDataHeaderForDownloading = categorySalesSummaryData && Object.keys(categorySalesSummaryData)?.map((key) => ({
    key,
    label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()
  }));
  const categorySalesDataHeaderForDownloading = [{
    key: "categoryName",
    label: "Category Name"
  },
  {
    key: "totalPrice",
    label: "Sales",

  },
  {
    key: "totalQuantity",
    label: "Quantity",

  }]

  const categoryChannelSummaryDataHeaderForDownloading = [{
    key: "categoryName",
    label: "Category Name"
  },
  {
    key: "channelName",
    label: "Channel Name",

  },
  {
    key: "totalAmount",
    label: "Total Amount",

  }]

  const voidedCategoriesDownloadHeader = [{
    key: "categoryName",
    label: "Category Name"
  },
  {
    key: "voidedQuantity",
    label: "Quantity",

  }, {
    key: "voidedAmount",
    label: "Sales",

  },
  ]


  const cancelledItemsDownloadHeader = [{
    key: "voidedReason",
    label: "Voided Reason"
  },
  {
    key: "voidedQuantity",
    label: "Total Item",

  }, {
    key: "voidedAmount",
    label: "Amount",

  },
  ]

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
            datePickerApplyFunction={(date1: any, date2: any) => datepickerApply("Custom Date", date1, date2)}
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
              {(!categorySalesSummaryDataLoading && categorySalesSummaryDataArrayForDownloading && categorySalesSummaryDataHeaderForDownloading) && <DownloadReport kpiTitle={activeBtn === "categories" ? "Categories Overview" : activeBtn === "items" ? "Items Overview" : ""} tableData={categorySalesSummaryDataArrayForDownloading} headerData={categorySalesSummaryDataHeaderForDownloading} />}
            </div>
          <ErrorHandler data={categorySalesSummaryData} isError={categorySalesSummaryDataError} isLoading={categorySalesSummaryDataLoading}>
            <MiniCard
              data={[
                {
                  title: "NET SALES",
                  value: <>{currencySymbol} {formatNumberByCountry(categorySalesSummaryData?.totalSales, countryCode, true) || 0 }</>
                   ,
                },
                {
                  title: "VOID",
                  value:  <>{currencySymbol} {formatNumberByCountry(categorySalesSummaryData?.voidAmount, countryCode, true) || 0 }</>
                },
                {
                  title: "ADD-ON",
                  value:<>{currencySymbol} {formatNumberByCountry(categorySalesSummaryData?.addOn, countryCode, true) || 0 }</>
                },
                {
                  title: "TOTAL QUANTITY",
                  value: `${formatNumberByCountry(categorySalesSummaryData?.totalQuantity, countryCode, false) || 0}`,
                },
              ]}
              loader={categorySalesSummaryDataLoading}
            />
            </ErrorHandler>
          </div>
          <div>
            <div className="categories-graph-header-container">
              <h1 className="categories-overview-heading">
                {activeBtn === "categories" ? "Categories sales" : ""}
                {activeBtn === "items" ? "Items sales" : ""}
              </h1>
              {(!categorySalesDataLoading && categorySalesData && categorySalesDataHeaderForDownloading) && <DownloadReport kpiTitle={activeBtn === "categories" ? "Categories Sales" : activeBtn === "items" ? "Items Sales" : ""} tableData={categorySalesData} headerData={categorySalesDataHeaderForDownloading} />}
            </div>
            <ErrorHandler data={categorySalesData} isError={categorySalesDataFailure} isLoading={categorySalesDataLoading}>
              <LinearBarChart
                dataList={categorySalesData || []}
                barColorCode={activeBtn === "categories" ? "#02B04C" : "#14A789"}
                loader={categorySalesDataLoading}
                isMobile={isMobile}
                bottomTitle={activeBtn === "categories" ? "categories" : "Items"}
              />
            </ErrorHandler>

          </div>
          <div>
            <div className="categories-graph-header-container">
              <h1 className="categories-overview-heading">
                {activeBtn === "categories" ? "By Channels - Categories" : ""}
                {activeBtn === "items" ? "By Channels - Items" : ""}
              </h1>
              {<DownloadReport kpiTitle={activeBtn === "categories" ? "By Channels - Categories" : activeBtn === "items" ? "By Channels - Items" : ""} tableData={categoryChannelSummaryData} headerData={categoryChannelSummaryDataHeaderForDownloading} />}
            </div>
            <ErrorHandler data={categoryChannelSummaryData} isError={categoryChannelSummaryDataFailure} isLoading={categoryChannelSummaryDataLoading}>
              <SalesChart
                dataList={categoryChannelSummaryData}
                loader={categoryChannelSummaryDataLoading}
                isMobile={isMobile}
                bottomTitle={activeBtn === "categories" ? "categories" : "Items"}
              />
            </ErrorHandler>
          </div>
          <br/>
          {activeBtn === "categories" ? (
            
    //   <ReusableBarChart
    //   dataList={voidedSummaryData}
    //   loader={voidedSummaryDataLoading}
    //   error={voidedSummaryDataFailure }
    //   title="Categories Voids"
    //   xKey="categoryName"
    //   yKey="voidedAmount"
    //   xLabel='Qty'
    //   yLabel='Voided amount'
    //   extraKeys={[{key:"voidedQuantity", label:"Qty"}]}
    //   barColor="#AA562A"
    //   tooltipStyles={{
    //     backgroundColor: "#fff",
    //     borderColor: "#AA562A",
    //     titleColor: "#000",
    //     bodyColor: "#000",
    //   }}
    //   kpiTitle='Categories Voids'
    //   showChartFilter={false}
    //   showSwitchable={false}
    //   isYAxisQuantity={false}
    // />
            <div>
              <div className="categories-graph-header-container">
                <h1 className="categories-overview-heading">
                  Categories Voids
                </h1>
                {<DownloadReport kpiTitle={activeBtn === "categories" ? "Categories Voids" : activeBtn === "items" ? "Cancellation" : ""}
                  tableData={voidedSummaryData || []} headerData={voidedCategoriesDownloadHeader} />}
              </div>
              <ErrorHandler data={voidedSummaryData} isError={voidedSummaryDataFailure} isLoading={voidedSummaryDataLoading}>
                <LinearBarChartCategorySales
                  dataList={voidedSummaryData||[]}
                  barColorCode={"#AA562A"}
                  loader={voidedSummaryDataLoading}
                  isMobile={isMobile}
                  bottomTitle={activeBtn === "categories" ? "categories" : "Items"}
                />
              </ErrorHandler>
            </div>
          ) : ""}
          {activeBtn === "items" ? (
            <div>
              <div className="categories-graph-header-container">
                <h1 className="categories-overview-heading">Cancellation</h1>
                {<DownloadReport kpiTitle="Cancellation"
                  tableData={voidedSummaryData || []} headerData={cancelledItemsDownloadHeader} />}
              </div>
              <ErrorHandler data={voidedSummaryData} isError={voidedSummaryDataFailure} isLoading={voidedSummaryDataLoading}>
                
                <DoughnutChart
                  xKey="voidedReason"
                  yKey="voidedAmount"
                  // yKey="voidedQuantity"
                  labelKeys={[{ key: "Total item", value: "voidedQuantity" }, { key: "Amount", value: "voidedAmount", isAmount: true }]}
                  isAmount={true}
                  dataList={(voidedSummaryData || [])}
                  otherKeys={["voidedQuantity", "voidedAmount"]}
                  countryCode={countryCode}
                  loader={voidedSummaryDataLoading}
                  clickable={false}
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
