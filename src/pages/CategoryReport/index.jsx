import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Tabs.css";
import {
  voidedSummaryRequest,
  dropdownDetailsRequest,
  categoryChannelSummaryRequest,
  categorySalesRequest,
  categorySalesSummaryRequest,
  locationDetailsRequest,
  changeLocation,
  salesByItemCategoryRequest,
} from "../../redux/newReports/newReportsActions";


import RoundedPill from "components/common/RoundedPill/RoundedPill";
import MiniCard from "components/common/MiniCard/MiniCard";
import SalesChart from "./salesReport";
import LinearBarChart from "./barChart";
import ReusableDropdown from "components/common/ReusableDropdown/ReusableDropdown";
import DoughnutChart from "./doughnutChart";
import DownloadPopOver from "./downloadOption";
import StoreFilter from "components/reportComponents/StoreFilter";

const CategoryReport = (props) => {
  const dispatch = useDispatch();
    //TODO: move to redux
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
 const locationId = useSelector((state) => state?.auth?.credentials?.locationId)
  const locations = useSelector((state) => state?.newReports?.locationDetailsData?.content)
  const selectedLocation = useSelector((state) => state?.newReports?.selectedLocation)
  const salesByItemCategoryData = useSelector((state) => state?.newReports?.salesByItemCategorySuccess?.content)
  const dropdownDetailsData = useSelector((state) => state?.newReports?.dropdownDetailsData?.content)
const categorySalesData = useSelector((state) => state?.newReports?.categorySalesSuccess?.content)
const categorySalesSummaryData = useSelector((state) => state?.newReports?.categorySalesSummarySuccess)
const categoryChannelSummaryData = useSelector((state) => state?.newReports?.categoryChannelSummarySuccess?.content)
const voidedSummaryData = useSelector((state) => state?.newReports?.voidedSummarySuccess?.content)


  useEffect(() => {
    dispatch(locationDetailsRequest({ locationId }))
  }, [locationId])


  useEffect(() => {
    dispatch(changeLocation({ label: locations?.[0], value: locationId }))
  }, [locations])
  


  useEffect(() => {
    dispatch(dropdownDetailsRequest({ locationid:selectedLocation?.value,startDate:"2024-12-01" , endDate:"2024-12-31",tablePageNo:1,tableRecordLimit:100 }))
  }, [selectedLocation])

  useEffect(() => {

    const categoryIds=selectedCategories?.map((item)=>item.value)
    const itemIds=selectedItems?.map((item)=>item.value)

    // dispatch(salesByItemCategoryRequest({ locationid:selectedLocation?.value, startDate:"2024-12-01" , endDate:"2024-12-31",tablePageNo:1,tableRecordLimit:100 }))
    dispatch(categorySalesRequest({ locationid:selectedLocation?.value, startDate:"2024-12-01" , endDate:"2024-12-31",tablePageNo:1,tableRecordLimit:100,itemIds,categoryIds }))
    dispatch(categorySalesSummaryRequest({ locationid:selectedLocation?.value, startDate:"2024-12-01" , endDate:"2024-12-31",tablePageNo:1,tableRecordLimit:100,itemIds,categoryIds })) 
    dispatch(categoryChannelSummaryRequest({ locationid:selectedLocation?.value, startDate:"2024-12-01" , endDate:"2024-12-31",tablePageNo:1,tableRecordLimit:100,itemIds,categoryIds })) 
    dispatch(voidedSummaryRequest({ locationid:selectedLocation?.value, startDate:"2024-12-01" , endDate:"2024-12-31",tablePageNo:1,tableRecordLimit:100,itemIds,categoryIds }))
  }, [selectedLocation, selectedCategories, selectedItems])
  
  const [activeBtn, setActiveBtn] = useState("categories");


  const [selectedDate, setSelectedDate] = useState({ label: "Yesterday", value: "Yesterday" });
  const [selectedStore, setSelectedStore] = useState({ label: "A2B Princeton", value: "A2B Princeton" });
  

  const calendarRef = useRef();

  // Date formatting function
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
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
    const category = dropdownDetailsData?.find(
      cat => cat.categoryId === selectedCategoriesData.value
    );
    if (category) {
      setSelectedCategories((prevData) => [
        ...prevData,
        { value: category.categoryId, label: category.categoryName }
      ]);
    }
  };

  const handleSelectItemsOnChange = (selectedItemsData) => {
    const item = dropdownDetailsData?.find(
      item => item.itemId === selectedItemsData.value
    );
    if (item) {
      setSelectedItems((prevData) => [
        ...prevData,
        { value: item.itemId, label: item.itemName }
      ]);
    }
  };

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
    if (dropDownData.value === "Custom date") {
      calendarRef.current?.openCalendar();
    } else {
      setSelectedDate({
        label: dropDownData.value,
        value: getDateFromOption(dropDownData.value)
      });
    }
  };


  // Fetch category data when date, store, or selections change
  // useEffect(() => {
  //   if (selectedStore?.value && selectedDate?.value) {
  //     try {
  //       const payload = {
  //         locationid: selectedStore.value,
  //         startDate: selectedDate.value,
  //         endDate: selectedDate.value,
  //         categoryIds: selectedCategories.map(cat => cat.id).filter(Boolean),
  //         itemIds: selectedItems.map(item => item.id).filter(Boolean)
  //       };

  //       // Dispatch all requests simultaneously for better performance
  //       Promise.all([

  //         dispatch(voidedSummaryRequest()),
  //         dispatch(categoryChannelSummaryRequest()),
  //         dispatch(categorySalesRequest()),
  //         dispatch(categorySalesSummaryRequest()),
  //       ]).catch(error => {
  //         console.error('Error fetching category data:', error);
  //       });
  //     } catch (error) {
  //       console.error('Error preparing category data request:', error);
  //     }
  //   }
  // }, [dispatch, selectedStore, selectedDate, selectedCategories, selectedItems]);




  // Loading state
  // const isLoading = voidedSummaryLoading ||
  //   dropdownDetailsLoading ||
  //   categoryChannelSummaryLoading ||
  //   categorySalesLoading ||
  //   categorySalesSummaryLoading;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div className="category-page-cotainer">
        <div className="category-page-body">
      
            <StoreFilter
              storeOptions={locations?.map(((data) => ({ label: data, value: locationId })))}
              selectedDate={selectedDate}
              selectedStore={selectedLocation}
              setSelectedDate={setSelectedDate}
              setSelectedStore={(store) => dispatch(changeLocation(store))}
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
                {/* <CustomDropdown
              options={[{ value: "Sales", label: "Sales" }]}
              className="select-food-item-dropdown"
              placeholder="Select Categories"
            /> */}
                <ReusableDropdown
                  // categorySalesData?.map((data)=>({ value: data?.categoryName, label: data?.categoryName  }))||
                  options={dropdownDetailsData?.map((data)=>({ value: data?.categoryId, label: data?.categoryName  }))||[]}
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
                    options={dropdownDetailsData?.map((data)=>({ value: data?.itemId, label: data?.itemName  }))||[]}
                    //TODO: confirm if we nee to filter items based on categry
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
                { title: "TOTAL SALES", value: `$ ${categorySalesSummaryData?.totalSales?.toFixed(2) ||0}` },
                { title: "NET SALES", value: `$ ${categorySalesSummaryData?.netSales?.toFixed(2) ||0}` },
                { title: "DISCOUNT", value: `$ ${categorySalesSummaryData?.discount?.toFixed(2) ||0}` },
                { title: "VOID", value: `$ ${categorySalesSummaryData?.void?.toFixed(2) ||0}` },
                { title: "ADD-ON", value: `$ ${categorySalesSummaryData?.addOn?.toFixed(2) ||0}` },
                { title: "TOTAL QUANTITY", value: `${categorySalesSummaryData?.totalQuantity ||0}` },
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

            <SalesChart dataList={categoryChannelSummaryData}/>
          </div>
          {activeBtn == "categories" ? (
            <div>
              <div className="categories-graph-header-container">
                <h1 className="categories-overview-heading">
                  Categories Voids
                </h1>
                <DownloadPopOver />
              </div>
              <LinearBarChart  dataList={voidedSummaryData} barColorCode={"#7D7774"} />
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
              <DoughnutChart  dataList={voidedSummaryData} />
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
