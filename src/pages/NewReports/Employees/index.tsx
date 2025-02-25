import React, { useEffect, useState } from 'react';
import { ReactComponent as ArrowLeft } from "../../../assets/svg/r-arrow-left.svg";
import { NewTableHeader } from 'interface/newReportsInterface';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation, employeeStaffActivityRequest, locationDetailsRequest } from 'redux/newReports/newReportsActions';
import StoreFilter from 'components/reportComponents/StoreFilter';
import CustomBarChart from 'components/reportComponents/ReusableCharts/CustomBarChart';
import CardWithMiniGraph from 'components/reportComponents/CardWithMiniGraph';
import CustomDropdown from 'components/common/customDropdown';
import NewTable from 'components/reportComponents/NewTable';
import useSalesLocationDates from 'hooks/useSalesLocationDates';
import "./style.scss";

const Employees: React.FC = () => {

    const restaurantDetails = useSelector((state: any) => state?.auth?.restaurantDetails?.branch)

    const mappedIdWithBranchName = restaurantDetails?.map((branchWithId: any) => ({ value: branchWithId?.id, label: branchWithId?.locationName }))

    const [selectedDate, setSelectedDate] = useState({ label: "Yesterday", value: "Yesterday" });
    const [selectedStore, setSelectedStore] = useState(mappedIdWithBranchName?.[0]);

    // console.log("2222", selectedStore?.value)

    const selectedLocationidFromDropDown = selectedStore?.value

    const [employeeVoidRecordLimit, setEmployeeVoidRecordLimit] = useState<number>(10);

   const locationid = useSelector((state: any) => state?.auth?.credentials?.locationId)
   const locations=useSelector((state: any) => state?.newReports?.locationDetailsData?.content)
       const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)
  const dispatch = useDispatch();

  const countryCode = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.country
);
    useEffect(() => {
        dispatch(locationDetailsRequest({ locationid }))
    }, [locationid])


    useEffect(() => {
      dispatch(changeLocation({label:locations?.[0],value:locationid }))
  }, [locations])
    




    const currencySymbol = countryCode === "US" ? "$" : "₹";

    const employeeVoidActivityAPIRedux = useSelector(
        (state: any) => state?.newReports?.employeeStaffActivitySuccess?.content
    );

    const employeeVoidActivityTotalPagesRedux = useSelector(
        (state: any) => state?.newReports?.employeeStaffActivitySuccess?.totalPages
    );

    const employeeVoidActivityLoading = useSelector(
        (state: any) => state?.newReports?.employeeStaffActivityLoading
    );

    const [searchQuery, setSearchQuery] = useState('');

    const [currentPageEmployeeVoidActivity, setCurrentPageEmployeeVoidActivity] =
        useState<number>(1);

    // const getLocationDates = useSalesLocationDates(state, locationid);

    const newTableHeaders: NewTableHeader[] = [
        { key: "steward", label: `Steward`, isSortable: true, alignment: "left" },
        {
            key: "voidedAmount",
            label: `Voided amount (${currencySymbol})`,
            isSortable: true,
            alignment: "right",
        },
        {
            key: "voidedItems",
            label: `Voided items`,
            isSortable: false,
            alignment: "left",
        },
        {
            key: "voidedReasons",
            label: `Voided reasons`,
            isSortable: false,
            alignment: "left",
        },
    ];

    const handleSearch = (value: string, kpiTitle: string) => {
        switch (kpiTitle) {
            case 'Employee Void Activity':
                if (selectedLocationidFromDropDown) {
                    dispatch(
                        employeeStaffActivityRequest({
                            locationid: selectedLocationidFromDropDown,
                            startDate: "2025-01-25",
                            endDate: "2025-02-24",
                            tablePageNo: currentPageEmployeeVoidActivity,
                            tableRecordLimit: employeeVoidRecordLimit,
                        })
                    );
                }
                break;

            // case 'Live Orders Non Dine-in':
            //   currentDate && dispatch(liveOrderNonDineInRequest({ locationid, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: value }))
            //   break;

            default:
                console.warn(`Unknown KPI title: ${kpiTitle}`);
        }
    };

    // Chart Data
    const chartData = [
        { name: "Add discount", value: 240.5 },
        { name: "Others", value: 180.0 },
        { name: "Complementary", value: 320.75 },
        { name: "Remove Gratuity", value: 200.0 },
    ];

    // Tooltip Data
    const tooltipData = {
        "Add discount": { tooltipContent: "Discount applied successfully!" },
        "Others": { tooltipContent: "Miscellaneous changes recorded." },
        "Complementary": { tooltipContent: "This item was given for free." },
        "Remove Gratuity": { tooltipContent: "Gratuity charges removed." },
    };

    // Custom Bar Style
    const customBarStyle = {
        borderRadius: "8px",
    };

    const [showAllActivityTable, setShowAllActivityTable] = useState<boolean>(false);

    const [employeeList, setEmployeeList] = useState("Sales");

    const handleDropdownChangeStore = (selectedValue: string) => {
        setEmployeeList(selectedValue);
    };

    useEffect(() => {
        if (selectedLocationidFromDropDown) {
            dispatch(
                employeeStaffActivityRequest({
                    locationid: selectedLocationidFromDropDown,
                    startDate: "2025-01-25",
                    endDate: "2025-02-24",
                    tablePageNo: currentPageEmployeeVoidActivity,
                    tableRecordLimit: employeeVoidRecordLimit,
                })
            );
        }
    }, [
        selectedLocationidFromDropDown,
        // startDate,
        // endDate,
        currentPageEmployeeVoidActivity,
        employeeVoidRecordLimit,
    ]);

    const handleGoBackToChart = () => {
        setShowAllActivityTable(false);
    }

    const getDates = (startDate: any, endDate: any) => {
        console.log("startDate", startDate);
        console.log("endDate", endDate);
        console.log("Hi from fun")
    }

    return (
        <div className='report-sales-employee-container'>
                {showAllActivityTable ? <div className="void-activity-table-container">
                <div className="void-activity-button-container">
                    <button className='back-to-chart-btn' onClick={handleGoBackToChart}><ArrowLeft />Back</button>
                </div>
                <NewTable
                    kpiTitle="Employee Void Activity"
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    headerData={newTableHeaders}
                    tableData={
                        employeeVoidActivityAPIRedux &&
                        employeeVoidActivityAPIRedux?.length > 0 &&
                        employeeVoidActivityAPIRedux
                    }
                    currentPage={currentPageEmployeeVoidActivity}
                    totalPages={employeeVoidActivityTotalPagesRedux}
                    onPageChange={setCurrentPageEmployeeVoidActivity}
                    rowsPerPage={employeeVoidRecordLimit}
                    setRowsPerPage={setEmployeeVoidRecordLimit}
                    loader={employeeVoidActivityLoading}
                    count={employeeVoidActivityAPIRedux?.length}
                    searchPlaceHolder="Search By Steward, Voided reasons"
                    onSearch={handleSearch}
                />
            </div>:<>
                  <StoreFilter
      storeOptions={locations?.map(((data:any)=>({label:data,value:locationid })))}
        selectedDate={selectedDate}
        selectedStore={selectedLocation}
        setSelectedDate={setSelectedDate}
        setSelectedStore={(store)=>dispatch(changeLocation(store))}
      />
            <div className="employee-report-sales-overview-box-container-parent">
                <h2>Sales Overview</h2>
                <div className="select-employee-container">
                    <p>Select employee</p>
                    <div className="select-employee-dropdown">
                        <CustomDropdown
                            options={[
                                { value: "All", label: "All" },
                                { value: "Lloyd Forger", label: "Lloyd Forger" },
                                { value: "Anya Forger", label: "Anya Forger" },
                                { value: "Daybreak", label: "Daybreak" },
                                { value: "stuart little", label: "stuart little" },
                            ]}
                            value={"Sales"}
                            className="category-dropdown"
                            onSelect={handleDropdownChangeStore}
                        />
                    </div>
                </div>
                <div className="employee-report-sales-overview-box-container">
                    <CardWithMiniGraph cardTitle="Total Sales" cardValue={8500.90} isMonetary={true} loader={false} incrementDecrementValue={"21"} graphType='chart' incrementOrDecrement='decrement' showMiniGraph={true} />
                    <CardWithMiniGraph cardTitle="Net Sales" cardValue={6990.90} isMonetary={true} loader={false} incrementDecrementValue={"20"} graphType='chart' incrementOrDecrement='increment' showMiniGraph={true} />
                    <CardWithMiniGraph cardTitle="Total Tax" cardValue={425.00} isMonetary={true} loader={false} incrementDecrementValue={"18"} graphType='chart' incrementOrDecrement='increment' showMiniGraph={true} />
                    <CardWithMiniGraph cardTitle="Total Tips" cardValue={250.00} isMonetary={true} loader={false} incrementDecrementValue={"19"} graphType='chart' incrementOrDecrement='decrement' showMiniGraph={true} />
                    <CardWithMiniGraph cardTitle="Gratuity" cardValue={350.00} isMonetary={true} loader={false} incrementDecrementValue={"41"} graphType='chart' incrementOrDecrement='decrement' showMiniGraph={true} />
                    <CardWithMiniGraph cardTitle="Transactions" cardValue={2135} isMonetary={false} loader={false} incrementDecrementValue={"31"} graphType='chart' incrementOrDecrement='increment' showMiniGraph={true} />
                    <CardWithMiniGraph cardTitle="Discount" cardValue={155.50} isMonetary={true} loader={false} incrementDecrementValue={"11"} graphType='chart' incrementOrDecrement='increment' showMiniGraph={true} />
                    <CardWithMiniGraph cardTitle="Cancelled" cardValue={80.00} isMonetary={true} loader={false} incrementDecrementValue={"21"} graphType='chart' incrementOrDecrement='increment' showMiniGraph={true} />
                </div>
            </div>
        <CustomBarChart
                data={chartData}
                tooltipData={tooltipData}
                barColor="#67823D"
                barStyle={customBarStyle}
                showGrid={true} // Enable grid
                gridColor="#ccc" // Light gray grid
                gridStrokeWidth={0.5} // Subtle grid lines
                kpiTitle='All Activity'
                showRelatedTable={showAllActivityTable}
                setShowRelatedTable={setShowAllActivityTable}
            /> 
        </> } 
        </div>
    );
};

export default Employees;