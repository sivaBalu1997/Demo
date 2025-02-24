import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import CustomDatePicker from "./CustomDatepicker";
import { ReactComponent as CalendarIcon } from "../../assets/svg/Calendar.svg";
import DatePicker from "react-multi-date-picker";

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

  const [selectedDate, setSelectedDate] = useState({ label: "Yesterday", value: "Yesterday" });
  const [selectedStore, setSelectedStore] = useState({ label: "A2B Princeton", value: "A2B Princeton" });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const calendarRef = useRef();
  // const CustomDatePickers = forwardRef(({ value, onChange }, ref) => (
  //   <DatePicker selected={value} onChange={onChange} ref={ref} />
  // ));
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
  const handleSelectDateOnClick = (dropDownData) => {
    console.log(dropDownData.value);
    if (dropDownData.value == "Custom date") {
      console.log("Custom Date Selected", calendarRef);
      calendarRef.current?.openCalendar();
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="category-page-cotainer">
        <div className="category-page-body">
          <div className="category-filters-section">
            <div className="category-store-name">
              <span>Store name</span>
              <h1>A2B, Princeton</h1>
            </div>
            <div className="category-dropdown-container">
              <div className="category-dropdown-sub-container">
                <span className="category-dropdown-text">Select date</span>
                <div className="category-dropdown-sub-dropdown-container">
                  <CustomDropdown
                    onSelect={handleSelectDateOnClick}
                    options={[
                      { value: "Yesterday", label: "Yesterday" },
                      { value: "Today", label: "Today" },
                      { value: "This week", label: "This week" },
                      { value: "This month", label: "This month" },
                      {
                        value: "Custom date",
                        label: "Custom date",
                        icon: <CalendarIcon />,
                      },
                    ]}
                    value={"Sales"}
                    className="category-dropdown"
                  />
                  <CustomDatePicker
                    containerClassName={"category-date-picker-container"}
                    datePickerContainerClassName="category-custom-datepicker-container"
                    ref={calendarRef}
                    className="category-custom-datepicker"
                    render={<></>}
                    arrowClassName="category-custom-datepicker-arrow"
                    offsetY={-15}
                  />
                </div>

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
