import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Tabs.css";


import CustomDropdown from "../../components/common/customDropdown/index";
import RoundedPill from "components/common/RoundedPill/RoundedPill";
import MiniCard from "components/common/MiniCard/MiniCard";
import SalesChart from "./salesReport";
import LinearBarChart from "./barChart";
import ReusableDropdown from "components/common/ReusableDropdown/ReusableDropdown";
import DoughnutChart from "./doughnutChart";
import DownloadPopOver from "./downloadOption";
import StoreFilter from "components/reportComponents/StoreFilter";

const CategoryReport = (props) => {
  const [activeBtn, setActiveBtn] = useState("categories");
  const tabList = [
    { key: "todaySummary", label: "Today summary" },
    { key: "customers", label: "Customers" },
    { key: "categories", label: "Categories" },
    { key: "employees", label: "Employees" },
    { key: "trends", label: "Trends" },
  ];
  const [categoriesList, setCategoriesList] = useState([]);
  const [itemsList, setItemsList] = useState([]);

        const [selectedDate, setSelectedDate] = useState( { label: "Yesterday", value: "Yesterday" });
        const [selectedStore, setSelectedStore] = useState({ label: "A2B Princeton", value: "A2B Princeton" });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectCategoriesOnChange = (selectedCategoriesData) => {
    console.log(selectedCategoriesData);
    setSelectedCategories((prevData) => [
      ...prevData,
      { name: selectedCategoriesData.value },
    ]);
  };
  const handleSelectItemsOnChange = (selectedItemsData) => {
    setSelectedItems((prevData) => [
      ...prevData,
      { name: selectedItemsData.value },
    ]);
  };
  // Track which tab is active
  const [activeTab, setActiveTab] = useState(tabList[0].key);
  const categoryCloseOnClick = (categoryName) => {
    setSelectedCategories((prevCategoryData) =>
      prevCategoryData.filter(
        (selectedData) => selectedData.name !== categoryName
      )
    );
  };
  const itemsCloseOnClick = (itemName) => {
    setSelectedItems((prevItemData) =>
      prevItemData.filter((selectedData) => selectedData.name !== itemName)
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>

      <div className="category-page-cotainer">
        <div className="category-page-body">
    <StoreFilter selectedDate={selectedDate} selectedStore={selectedStore} setSelectedDate={setSelectedDate} setSelectedStore={setSelectedStore}/>
          <div className="category-btn-switch">
            <button
              className={`category-btn  ${
                activeBtn == "categories" ? "active-btn" : ""
              }`}
              onClick={() => {
                setActiveBtn("categories");
              }}
            >
              Categories
            </button>
            <button
              className={`category-btn  ${
                activeBtn == "items" ? "active-btn" : ""
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
                {/* <CustomDropdown
              options={[{ value: "Sales", label: "Sales" }]}
              className="select-food-item-dropdown"
              placeholder="Select Categories"
            /> */}
                <ReusableDropdown
                  options={[
                    { value: "Sales", label: "Sales" },
                    { value: "Dosai", label: "Dosai" },
                    { value: "Veg Briyani", label: "Veg Briyani" },
                  ]}
                  value={"Sales"}
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
                    options={[
                      { value: "Sales", label: "Sales" },
                      { value: "Dosai", label: "Dosai" },
                      { value: "Veg Briyani", label: "Veg Briyani" },
                    ]}
                    value={"Sales"}
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
                { title: "TOTAL SALES", value: "8500.90" },
                { title: "TOTAL SALES", value: "8500.90" },
                { title: "TOTAL SALES", value: "8500.90" },
                { title: "TOTAL SALES", value: "8500.90" },
                { title: "TOTAL SALES", value: "8500.90" },
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
              barColorCode={activeBtn == "categories" ? "#02B04C" : "#14A789"}
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

            <SalesChart />
          </div>
          {activeBtn == "categories" ? (
            <div>
              <div className="categories-graph-header-container">
                <h1 className="categories-overview-heading">
                  Categories Voids
                </h1>
                <DownloadPopOver />
              </div>
              <LinearBarChart barColorCode={"#7D7774"} />
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
              <DoughnutChart />
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
