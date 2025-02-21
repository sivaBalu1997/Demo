import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Tabs.css";

import SidePanel from "../SidePanel";
import CustomDropdown from "../../components/common/customDropdown/index";
import RoundedPill from "components/common/RoundedPill/RoundedPill";
import MiniCard from "components/common/MiniCard/MiniCard";
import SalesChart from "./salesReport";
import LinearBarChart from "./barChart";
import ReusableDropdown from "components/common/ReusableDropdown/ReusableDropdown";
import DoughnutChart from "./doughnutChart";

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
      prevItemData.filter(
        (selectedData) => selectedData.name !== itemName
      )
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SidePanel />
      <div className="category-page-cotainer">
        <div className="category-page-header">
          <div className="category-page-header-container">
            <div className="header-category">
              <h1 className="report-title">{"Reports & Insights"}</h1>
            </div>

            <div className="tabs-container">
              {/* Tab Bar */}
              {/* <ul className="tabs-list"> */}
              {tabList.map((tab) => (
                <div
                  key={tab.key}
                  className={`tab-item ${
                    activeTab === tab.key ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </div>
              ))}
              {/* </ul> */}

              {/* Tab Content */}
              <div>
                {activeTab === "categories" && (
                  <div>
                    {/* <h2>Categories</h2>
            <p>Content for Categories goes here...</p> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="category-page-body">
          <div className="category-filters-section">
            <div className="category-store-name">
              <span>Store name</span>
              <h1>A2B, Princeton</h1>
            </div>
            <div className="category-dropdown-container">
              <div className="category-dropdown-sub-container">
                <span className="category-dropdown-text">Select date</span>
                <CustomDropdown
                  options={[
                    { value: "Sales", label: "Sales" },
                    { value: "Product", label: "Product" },
                  ]}
                  value={"Sales"}
                  className="category-dropdown"
                />
                {/* <Dropdown data={[{id:"1",name:"Princeton",option:"Princeton"}]} className={"category-dropdown"}/> */}
              </div>
              <div className="category-dropdown-sub-container">
                <span className="category-dropdown-text">Select store</span>
                <CustomDropdown
                  options={[{ value: "Sales", label: "Sales" }]}
                  value={"Sales"}
                  className="category-dropdown"
                />
              </div>
            </div>
          </div>
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
            <h1 className="categories-overview-heading">
              {activeBtn == "categories" ? "Categories Overview" : ""}
              {activeBtn == "items" ? "Items overview" : ""}
            </h1>
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
            <h1 className="categories-overview-heading">
              {activeBtn == "categories" ? "Categories sales" : ""}
              {activeBtn == "items" ? "Items sales" : ""}
            </h1>
            <LinearBarChart
              barColorCode={activeBtn == "categories" ? "#02B04C" : "#14A789"}
            />
          </div>
          <div>
            <h1 className="categories-overview-heading">
              {activeBtn == "categories" ? "By Channels - Categories" : ""}
              {activeBtn == "items" ? "By Channels - Items" : ""}
            </h1>
            <SalesChart />
          </div>
          {activeBtn == "categories" ? (
            <div>
              <h1 className="categories-overview-heading">Categories Voids</h1>
              <LinearBarChart barColorCode={"#7D7774"} />
            </div>
          ) : (
            ""
          )}
          {activeBtn == "items" ? (
            <div>
              <h1 className="categories-overview-heading">Cancellation</h1>
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
