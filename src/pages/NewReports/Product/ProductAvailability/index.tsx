import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation, employeeStaffActivityRequest, getEmployeeChartSliceTableRequest } from 'redux/newReports/newReportsActions';
import { ReactComponent as ArrowLeft } from "../../../../assets/svg/r-arrow-left.svg";
import { productAvailabilityByChannelsDetailsRequest, productAvailabilityByChannelsRequest, productAvailabilityDropdownRequest } from 'redux/productReports/productReportsActions';
import MultiSwitchableBox from 'components/reportComponents/MultiSwitchableBox';
import StoreFilter from 'components/reportComponents/StoreFilter';
import useDateFilter from 'hooks/useDateFilter';
import NewTable from 'components/reportComponents/NewTable';
import CustomBarChart from 'components/reportComponents/ReusableCharts/CustomBarChart';
import "./style.scss"


const ProductAvailability = () => {

  const texts = ["All", "Available", "Unavailable"];

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

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [employeeVoidRecordLimit, setEmployeeVoidRecordLimit] =
  useState<number>(10);
  const employeeChartRef = useRef<HTMLDivElement>(null);
  const [showAllActivityTable, setShowAllActivityTable] =
  useState<boolean>(false);
  const [selectedValueForChartSlice, setSelectedValueForChartSlice] = useState<any>("");
  
  // Generic table states :
  const [genericTableRecordLimit, setGenericTableRecordLimit] = useState<number>(10);
  const [searchQueryForGenericTable, setSearchQueryForGenericTable] = useState("");
  const [currentPageGenericTable, setCurrentPageGenericTable] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<any>({ label: "All", value: "All" })
  
  const dispatch = useDispatch();

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


  const handleSearch = (value: string, kpiTitle: string) => {
    setSearchQueryForGenericTable(value);
  };


  const resetPagination = () => {
    setCurrentPageGenericTable(1)
    setGenericTableRecordLimit(10)
    setSearchQueryForGenericTable("")
    setSelectedCategory({ name: "All", value: "All" })
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
          optionList={(availabilityDropdownData && availabilityDropdownData?.map((opt: any) => ({ label: opt.categoryName, value: opt.categoryId })) || [{ label: "All", value: "All" }]) || [{ label: "All", value: "All" }]}
          optionListLoader={availabilityDropdownLoading}
          selectedOption={selectedCategory?.value}
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
          totalElements={availabilityByChannelsDetailsData?.totalElements || 0}
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
              barColor={["#67823D","#14A789","#E17100","#FF8C00","#06C167","#EE2637"]}
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
