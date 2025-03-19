import React, { useEffect, useRef, useState } from 'react'
import MultiSwitchableBox from 'components/reportComponents/MultiSwitchableBox';
import "./style.scss"
import StoreFilter from 'components/reportComponents/StoreFilter';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation, employeeStaffActivityRequest, getEmployeeChartSliceTableRequest } from 'redux/newReports/newReportsActions';
import useDateFilter from 'hooks/useDateFilter';
import NewTable from 'components/reportComponents/NewTable';
import { ReactComponent as ArrowLeft } from "../../../../assets/svg/r-arrow-left.svg";
import CustomBarChart from 'components/reportComponents/ReusableCharts/CustomBarChart';
import { productAvailabilityByChannelsDetailsRequest, productAvailabilityByChannelsRequest, productAvailabilityDropdownRequest } from 'redux/productReports/productReportsActions';

// r-arrow-left.svg

const ProductAvailability = () => {

  const texts = ["All", "Available", "Unavailable"];
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [employeeVoidRecordLimit, setEmployeeVoidRecordLimit] =
    useState<number>(10);
  const employeeChartRef = useRef<HTMLDivElement>(null);
  const [showAllActivityTable, setShowAllActivityTable] =
    useState<boolean>(false);
  const [selectedValueForChartSlice, setSelectedValueForChartSlice] = useState<any>("");


  const countryCode = useSelector((state: any) => state?.auth?.restaurantDetails?.country);
  const currencySymbol = countryCode === "US" ? "$" : "₹";

  // Availability By Channels States
  const availabilityByChannelsData = useSelector((state: any) => state?.productReports?.availabilityByChannelsSuccess);
  const availabilityByChannelsDataTotalElements = useSelector((state: any) => state?.productReports?.availabilityByChannelsSuccess?.totalElements);
  const availabilityByChannelsLoading = useSelector((state: any) => state?.productReports?.availabilityByChannelsLoading);
  const availabilityByChannelsError = useSelector((state: any) => state?.productReports?.availabilityByChannelsFailure);

  // Availability By Channels Details States
  const availabilityByChannelsDetailsData = useSelector((state: any) => state?.productReports?.availabilityByChannelsDetailsSuccess);
  const availabilityByChannelsDetailsLoading = useSelector((state: any) => state?.productReports?.availabilityByChannelsDetailsLoading);
  const availabilityByChannelsDetailsError = useSelector((state: any) => state?.productReports?.availabilityByChannelsDetailsFailure);

  // Availability Dropdown States
  const availabilityDropdownData = useSelector((state: any) => state?.productReports?.availabilityDropdownSuccess);
  const availabilityDropdownLoading = useSelector((state: any) => state?.productReports?.availabilityDropdownLoading);
  const availabilityDropdownError = useSelector((state: any) => state?.productReports?.availabilityDropdownFailure);


  // Generic table states :
  const [genericTableRecordLimit, setGenericTableRecordLimit] = useState<number>(10);
  const [searchQueryForGenericTable, setSearchQueryForGenericTable] = useState("");
  const [currentPageGenericTable, setCurrentPageGenericTable] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<any>({ label: "All", value: "" })

  const dispatch = useDispatch();

  const locations = useSelector((state: any) => state?.newReports?.storeLocationsList)
  const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)

  useEffect(() => {
    if (selectedLocation?.value) {

      const params = {
        locationId: selectedLocation?.value,
      }
      dispatch(productAvailabilityByChannelsRequest(params))

    }
  }, [
    selectedLocation
  ]);

  useEffect(() => {
    if (selectedValueForChartSlice?.id) {
      dispatch(productAvailabilityDropdownRequest({ orderTypeId: selectedValueForChartSlice?.id }))
      dispatch(productAvailabilityByChannelsDetailsRequest({
        orderTypeId: selectedValueForChartSlice?.id,
        availabilityStatus: texts[activeIndex],
        page: currentPageGenericTable,
        size: genericTableRecordLimit
      }))
    }
  }, [selectedValueForChartSlice])

  useEffect(() => {
    if (selectedValueForChartSlice?.id) {
      dispatch(productAvailabilityByChannelsDetailsRequest({
        orderTypeId: selectedValueForChartSlice?.id,
        availabilityStatus: texts[activeIndex],
        categoryId: selectedCategory?.value,
        search: searchQueryForGenericTable,
        page: currentPageGenericTable,
        size: genericTableRecordLimit
      }))
    }
  }, [genericTableRecordLimit, currentPageGenericTable, searchQueryForGenericTable, selectedCategory])

  // useEffect(() => {
  //   console.log({ availabilityByChannelsData, availabilityByChannelsDetailsData, availabilityDropdownData });

  // }, [availabilityByChannelsData, availabilityByChannelsDetailsData, availabilityDropdownData])

  const handleSwitch = (index: number) => {
    setActiveIndex(index);
  };

  const handleRefreshClick = () => {
    if (selectedLocation?.value) {

      const params = {
        locationId: selectedLocation?.value,
      }
      dispatch(productAvailabilityByChannelsRequest(params))

    }
  }

  const headerData = [
    {
      key: "categoryName",
      label: `Categories`,
      isSortable: true,
      alignment: "left",
    },
    {
      key: "itemName",
      label: "Items",
      isSortable: true,
      alignment: "left",
    },
    {
      key: "itemStatus",
      label: `Status`,
      isSortable: true,
      alignment: "center",
    },
  ];


  const handleSearch = (value: string, kpiTitle: string) => {
    setSearchQueryForGenericTable(value);
  };


  const resetPagination = () => {
    setCurrentPageGenericTable(1)
    setGenericTableRecordLimit(10)
    setSearchQueryForGenericTable("")
    setSelectedCategory({ name: "All", value: "" })
  }
  const handleGoBackToChart = () => {
    setShowAllActivityTable(false);
    setSelectedValueForChartSlice("");
    resetPagination()
    setTimeout(() => {
      employeeChartRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };


  const tooltipDataFromAPIOthers = availabilityByChannelsData?.reduce(
    (acc: any, data: any) => {
      acc[data.orderType] = {
        tooltipContent: `Value: ${data.allItems}`,
      };
      return acc;
    },
    {}
  );

  // Custom Bar Style
  const customBarStyle = {
    borderRadius: "8px",
  };




  return (
    <div className='report-product-insights'>
      {showAllActivityTable ? (<div
        className="void-activity-table-container"
        style={{ marginTop: showAllActivityTable ? "5vh" : "" }}
      >
        <div className="void-activity-button-container">
          <button className="back-to-chart-btn" onClick={handleGoBackToChart}>
            <ArrowLeft />
            Back
          </button>
        </div>
        <NewTable
          optionList={availabilityDropdownData?.map((opt: any) => ({ label: opt.categoryName, value: opt.categoryId })) || []}
          selectedOption={selectedCategory}
          setOptions={setSelectedCategory}
          isCustomOption={true}

          kpiTitle={`Availability Items By Channels - ${selectedValueForChartSlice?.name}`}
          searchQuery={searchQueryForGenericTable}
          headerData={headerData}
          tableData={
            availabilityByChannelsDetailsData?.content &&
            availabilityByChannelsDetailsData?.content?.length > 0 &&
            availabilityByChannelsDetailsData?.content
          }
          currentPage={currentPageGenericTable}
          totalPages={availabilityByChannelsDetailsData?.totalPages}
          onPageChange={setCurrentPageGenericTable}
          rowsPerPage={genericTableRecordLimit}
          setRowsPerPage={setGenericTableRecordLimit}
          loader={availabilityByChannelsDetailsLoading}
          count={availabilityByChannelsData?.totalElements}
          searchPlaceHolder="Search By Category/Item"
          onSearch={handleSearch}
          showDateDropDown={true}
          totalElements={availabilityByChannelsDataTotalElements || 0}
        />
      </div>
      ) : (
        <>
          <StoreFilter storeOptions={locations}
            selectedStore={selectedLocation}
            setSelectedStore={(store) => dispatch(changeLocation(store))}
            handleRefreshClick={handleRefreshClick}
            showRefresh={true} showDate={false}
          />
          <MultiSwitchableBox texts={texts} activeIndex={activeIndex} onSwitch={handleSwitch} />
          <div ref={employeeChartRef}>
            <CustomBarChart
              customTooltip={true}
              data={activeIndex === 0 ? availabilityByChannelsData?.map((item: any) => ({ name: item.orderType, value: item.allItems, })) : activeIndex === 1 ? availabilityByChannelsData?.map((item: any) => ({ name: item.orderType, value: item.availableItems })) : availabilityByChannelsData?.map((item: any) => ({ name: item.orderType, value: item.unavailableItems }))}
              tooltipData={activeIndex === 0 ? availabilityByChannelsData?.reduce(
                (acc: any, data: any) => {
                  acc[data.orderType] = {
                    tooltipContent: `Value: ${data.allItems}`,
                    id: data.orderTypeId
                  };
                  return acc;
                },
                {}
              ) : activeIndex === 1 ? availabilityByChannelsData?.reduce(
                (acc: any, data: any) => {
                  acc[data.orderType] = {
                    tooltipContent: `Value: ${data.availableItems}`,
                    id: data.orderTypeId
                  };
                  return acc;
                },
                {}
              ) : availabilityByChannelsData?.reduce(
                (acc: any, data: any) => {
                  acc[data.orderType] = {
                    tooltipContent: `Value: ${data.unavailableItems}`,
                    id: data.orderTypeId
                  };
                  return acc;
                },
                {}
              )}
              barColor={["#67823D"]}
              barStyle={customBarStyle}
              showGrid={true}
              gridColor="#ccc"
              gridStrokeWidth={0.5}
              kpiTitle="Availability Items By Channels"
              showRelatedTable={showAllActivityTable}
              setShowRelatedTable={setShowAllActivityTable}
              setSelectedValueForChartSlice={setSelectedValueForChartSlice}
            />
          </div>
        </>
      )

      }
    </div>
  )
}

export default ProductAvailability
