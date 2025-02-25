import React, { useContext, useEffect, useState } from 'react'
import { Contextpagejs } from 'pages/productCatalog/contextpage';
import { useDispatch, useSelector } from 'react-redux';
import { billerUnbilledRequest, changeLocation, liveDiscountRequest, liveNetSalesRequest, liveOpenSalesRequest, liveOrderNonDineInRequest, liveOrdersRequest, liveRefundsRequest, locationDetailsRequest } from 'redux/newReports/newReportsActions';
import { NewTableHeader } from 'interface/newReportsInterface';

import SwitchableBox from 'components/reportComponents/SwitchableBox';
import CardWithMiniGraph from 'components/reportComponents/CardWithMiniGraph';
import moment from 'moment';
import NewTable from 'components/reportComponents/NewTable';
// import CustomDropdown from "../../../../src/components/common/customDropdown/index";
import "./style.scss";
// import CustomDropdown from 'components/common/customDropdown';
// import ReportsRefreshButton from 'components/reportComponents/ReportsRefreshButton';
// import CustomBarChart from 'components/reportComponents/ReusableCharts/CustomBarChart';
import StoreFilter from 'components/reportComponents/StoreFilter';


const TodaysReport: React.FC = () => {

    const restaurantDetails = useSelector((state: any) => state?.auth?.restaurantDetails?.branch)

    const mappedIdWithBranchName = restaurantDetails?.map((branchWithId: any) => ({ value: branchWithId?.id, label: branchWithId?.locationName }))


    const { isExpanded } = useContext(Contextpagejs);
    const [selectedDate, setSelectedDate] = useState({ label: "Yesterday", value: "Yesterday" });
    const [selectedStore, setSelectedStore] = useState(mappedIdWithBranchName?.[0]);

    const [liveOrdersSearchQuery, setLiveOrdersSearchQuery] = useState('')
    const [liveOrdersPageLimit, setLiveOrdersPageLimit] = useState<number>(10)

    const [liveOrderNonDineInSearchQuery, setLiveOrderNonDineInSearchQuery] = useState('')
    const [liveOrderNonDineInPageLimit, setLiveOrderNonDineInPageLimit] = useState<number>(10)

    const selectedLocationidFromDropDown = selectedStore?.value

    const locationid = useSelector((state: any) => state?.auth?.credentials?.locationId)

    const liveDiscountDataAPIRedux = useSelector((state: any) => state?.newReports?.liveDiscountSuccess);

    const liveOpenSalesDataAPIRedux = useSelector((state: any) => state?.newReports?.liveOpenSalesSuccess)

    const liveOrdersAPIRedux = useSelector((state: any) => state?.newReports?.liveOrdersSuccess?.content)

    const liveOrdersTotalPageNo = useSelector((state: any) => state?.newReports?.liveOrdersSuccess?.totalPages)

    const liveRefundsAPIRedux = useSelector((state: any) => state?.newReports?.liveRefundsSuccess)

    const liveNetSalesAPIRedux = useSelector((state: any) => state?.newReports?.liveNetSalesSuccess)

    const liveOrderNonDineInAPIRedux = useSelector((state: any) => state?.newReports?.liveOrderNonDineInSuccess?.content)

    const liveOrderNonDineInTotalPageNo = useSelector((state: any) => state?.newReports?.liveOrderNonDineInSuccess?.totalPages)

    const liveOrdersLoading = useSelector((state: any) => state?.newReports?.liveOrdersLoading)

    const liveOrderNonDineInLoading = useSelector((state: any) => state?.newReports?.liveOrderNonDineInLoading)

    const countryCode = useSelector(
        (state: any) => state?.auth?.restaurantDetails?.country
    );

  const locations = useSelector((state:any) => state?.newReports?.locationDetailsData?.content)
  const selectedLocation = useSelector((state:any) => state?.newReports?.selectedLocation)


  useEffect(() => {
    dispatch(locationDetailsRequest({ locationid }))
  }, [locationid])


  useEffect(() => {
    dispatch(changeLocation({ label: locations?.[0], value: locationid }))
  }, [locations])
    
    const currencySymbol = countryCode === "US" ? "$" : "₹";

    const billedOrUnbilledDataAPIRedux = useSelector((state: any) => state?.newReports?.billedUnbilledSuccess)
    // console.log("6666", { billedOrUnbilledDataAPIRedux })

    const billedOrUnbilledDataAPIReduxLoading = useSelector((state: any) => state?.newReports?.billedUnbilledLoading)

    const liveOrderNonDineInTableHeaders: NewTableHeader[] = [
        { key: 'customerName', label: 'Customer Name', isSortable: true, alignment: 'left' },
        { key: 'orderDate', label: 'Order Date', isSortable: true, alignment: 'left' },
        { key: 'orderNumber', label: 'Order Number', isSortable: true, alignment: 'left' },
        { key: 'orderChannel', label: 'Order Channel', isSortable: false, alignment: 'left' },
        { key: 'orderType', label: 'Order Type', isSortable: false, alignment: 'left' },
        { key: 'requestedEta', label: 'Requested ETA', isSortable: true, alignment: 'left' },
        { key: 'timeElapsed', label: 'Time Elapsed', isSortable: true, alignment: 'left' },
        { key: 'orderStatus', label: 'Order Status', isSortable: false, alignment: 'left' },
        { key: 'customerNumber', label: 'Customer Number', isSortable: true, alignment: 'left' },
        { key: 'orderTotal', label: `Order Total (${currencySymbol})`, isSortable: true, alignment: 'right' },
    ];


    const liveOrdersDineInTableHeaders: NewTableHeader[] = [
        { key: 'orderDate', label: 'Order Date', isSortable: true, alignment: 'left' },
        { key: 'tableName', label: 'Table Name', isSortable: true, alignment: 'left' },
        { key: 'tableOccupancyDuration', label: 'Table Occupancy Duration', isSortable: true, alignment: 'left' },
        { key: 'orderAmount', label: `Order Amount (${currencySymbol})`, isSortable: true, alignment: 'right' },
        { key: 'orderNumber', label: 'Order Number', isSortable: true, alignment: 'right' }
    ];



    // const RECORDS_PER_PAGE_LIMIT = 15

    const [totalPageNoCurrentPageLiveOrders, setTotalPageNoCurrentPageLiveOrders] = useState<number>(liveOrdersTotalPageNo || 1)
    const [currentPageLiveOrders, setCurrentPageLiveOrders] = useState<number>(1);

    const [totalPageNoCurrentPageLiveOrdersNonDineIn, setTotalPageNoCurrentPageLiveOrdersNonDineIn] = useState<number>(liveOrderNonDineInTotalPageNo || 1)
    const [currentPageLiveOrdersNonDineIn, setCurrentPageLiveOrdersNonDineIn] = useState<number>(1);

    const [isSwitchActive, setIsSwitchActive] = useState<boolean>(false);
    const textOne: string = "Overall";
    const textTwo: string = "Live Orders";
    const [activeTextForSwitchableBox, setActiveTextForSwitchableBox] = useState<string>(textOne);

    const handleToggleSwitch = () => {
        setIsSwitchActive((prev) => !prev)
        setActiveTextForSwitchableBox((prev) => (prev === textOne ? textTwo : textOne));
    }


    const dispatch = useDispatch();

    // const [currentDate, setCurrentDate] = useState('');
    // const formattedDate = moment().format('YYYY-MM-DD');
    // setCurrentDate(formattedDate);
    const [currentDate, setCurrentDate] = useState('');

    // const handleSearchDebounce = (value: string, kpiTitle: string) => {
    //     dispatch(liveOrdersRequest({ locationid, tablePageNo: currentPageLiveOrders, tableRecordLimit: liveOrdersPageLimit, searchQuery: value }))
    // }


    const handleSearch = (value: string, kpiTitle: string) => {
        switch (kpiTitle) {
            case 'Live Orders':
                dispatch(liveOrdersRequest({ locationid: selectedLocationidFromDropDown, tablePageNo: currentPageLiveOrders, tableRecordLimit: liveOrdersPageLimit, searchQuery: value }))
                break;

            case 'Live Orders Non Dine-in':
                currentDate && dispatch(liveOrderNonDineInRequest({ locationid: selectedLocationidFromDropDown, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: value }))
                break;

            default:
                console.warn(`Unknown KPI title: ${kpiTitle}`);
        }
    };

    useEffect(() => {
        dispatch(liveDiscountRequest({ locationid: selectedLocationidFromDropDown }))
    }, [selectedLocationidFromDropDown])

    useEffect(() => {
        dispatch(liveOpenSalesRequest({ locationid: selectedLocationidFromDropDown }))
    }, [selectedLocationidFromDropDown])

    useEffect(() => {
        const formattedDate = moment().format('YYYY-MM-DD');
        setCurrentDate(formattedDate);
        currentDate && dispatch(liveOrdersRequest({ locationid: selectedLocationidFromDropDown, tablePageNo: currentPageLiveOrders, tableRecordLimit: liveOrdersPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: liveOrdersSearchQuery }))
    }, [selectedLocationidFromDropDown, currentPageLiveOrders, liveOrdersPageLimit, currentDate, liveOrdersSearchQuery])

    useEffect(() => {
        dispatch(liveRefundsRequest({ locationid: selectedLocationidFromDropDown }))
    }, [selectedLocationidFromDropDown])

    useEffect(() => {
        dispatch(liveNetSalesRequest({ locationid: selectedLocationidFromDropDown }))
    }, [selectedLocationidFromDropDown])

    useEffect(() => {
        const formattedDate = moment().format('YYYY-MM-DD');
        setCurrentDate(formattedDate);
        currentDate && dispatch(liveOrderNonDineInRequest({ locationid: selectedLocationidFromDropDown, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: liveOrderNonDineInSearchQuery }))
        // currentDate && dispatch(liveOrderNonDineInRequest({ locationid, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: RECORDS_PER_PAGE_LIMIT, startDate: currentDate, endDate: currentDate }))
    }, [selectedLocationidFromDropDown, currentPageLiveOrdersNonDineIn, currentDate, liveOrderNonDineInPageLimit])

    useEffect(() => {
        const formattedDate = moment().format('YYYY-MM-DD');
        setCurrentDate(formattedDate);
        currentDate && dispatch(billerUnbilledRequest({ locationid: selectedLocationidFromDropDown, startDate: currentDate, type: isSwitchActive === true ? 'notcompleted' : 'completed' }))
    }, [isSwitchActive, currentDate, selectedLocationidFromDropDown])

    const [selectedOptionStore, setSelectedOptionStore] = useState("Sales");

    const handleDropdownChangeStore = (selectedValue: string) => {
        setSelectedOptionStore(selectedValue);
    };

    const handleRefreshClick = () => {
        console.log('Refresh button clicked')
    }



    return (
        <div className='todays-report-container'>
            <StoreFilter  storeOptions={locations?.map(((data:any)=>({label:data,value:locationid })))}
            selectedStore={selectedLocation}  setSelectedStore={(store)=>dispatch(changeLocation(store))} handleRefreshClick={handleRefreshClick} showRefresh={true} showDate={false} />

            <SwitchableBox
                textOne="Overall"
                textTwo="Live Orders"
                isActive={isSwitchActive}
                toggleSwitch={handleToggleSwitch}
            />
            <div className="todays-report-sales-overview-box-container-parent">
                <h2>Sales Overview</h2>
                <div className="todays-report-sales-overview-box-container">
                    <CardWithMiniGraph cardTitle="Total Sales" cardValue={billedOrUnbilledDataAPIRedux?.totalSales} isMonetary={true} loader={billedOrUnbilledDataAPIReduxLoading} />
                    <CardWithMiniGraph cardTitle="Net Sales" cardValue={billedOrUnbilledDataAPIRedux?.totalNetSales} isMonetary={true} loader={billedOrUnbilledDataAPIReduxLoading} />
                    <CardWithMiniGraph cardTitle="Total Tax" cardValue={billedOrUnbilledDataAPIRedux?.totalTax} isMonetary={true} loader={billedOrUnbilledDataAPIReduxLoading} />
                    <CardWithMiniGraph cardTitle="Total Tips" cardValue={billedOrUnbilledDataAPIRedux?.totalTip} isMonetary={true} loader={billedOrUnbilledDataAPIReduxLoading} />
                    <CardWithMiniGraph cardTitle="Gratuity" cardValue={billedOrUnbilledDataAPIRedux?.totalServiceTax} isMonetary={true} loader={billedOrUnbilledDataAPIReduxLoading} />
                    <CardWithMiniGraph cardTitle="Transactions" cardValue={billedOrUnbilledDataAPIRedux?.totalTransactions} isMonetary={billedOrUnbilledDataAPIReduxLoading} loader={billedOrUnbilledDataAPIReduxLoading} />
                    <CardWithMiniGraph cardTitle="Discount" cardValue={billedOrUnbilledDataAPIRedux?.totalDiscount} isMonetary={true} loader={billedOrUnbilledDataAPIReduxLoading} />
                    <CardWithMiniGraph cardTitle="Cancelled" cardValue={billedOrUnbilledDataAPIRedux?.totalCancelledOrders} isMonetary={true} loader={billedOrUnbilledDataAPIReduxLoading} />
                </div>
            </div>
            <div className="todays-report-tables-container">
                <NewTable
                    kpiTitle="Live Orders"
                    searchQuery={liveOrdersSearchQuery}
                    onSearchChange={setLiveOrdersSearchQuery}
                    headerData={liveOrdersDineInTableHeaders}
                    tableData={liveOrdersAPIRedux && liveOrdersAPIRedux?.length > 0 && liveOrdersAPIRedux}
                    currentPage={currentPageLiveOrders}
                    totalPages={liveOrdersTotalPageNo ? liveOrdersTotalPageNo : 1}
                    onPageChange={setCurrentPageLiveOrders}
                    rowsPerPage={liveOrdersPageLimit}
                    setRowsPerPage={setLiveOrdersPageLimit}
                    loader={liveOrdersLoading}
                    // loader={true}
                    count={liveOrdersAPIRedux?.length}
                    searchPlaceHolder="Search by order number, table name"
                    onSearch={handleSearch}
                // searchDebounce={()=>searchDebounce()}
                />
                <NewTable
                    kpiTitle="Live Orders Non Dine-in"
                    searchQuery={liveOrderNonDineInSearchQuery}
                    onSearchChange={setLiveOrderNonDineInSearchQuery}
                    headerData={liveOrderNonDineInTableHeaders}
                    tableData={liveOrderNonDineInAPIRedux && liveOrderNonDineInAPIRedux?.length > 0 && liveOrderNonDineInAPIRedux}
                    currentPage={currentPageLiveOrdersNonDineIn}
                    totalPages={liveOrderNonDineInTotalPageNo ? liveOrderNonDineInTotalPageNo : 1}
                    onPageChange={setCurrentPageLiveOrdersNonDineIn}
                    rowsPerPage={liveOrderNonDineInPageLimit}
                    setRowsPerPage={setLiveOrderNonDineInPageLimit}
                    loader={liveOrderNonDineInLoading}
                    count={liveOrderNonDineInAPIRedux?.length}
                    searchPlaceHolder="Search by order number, customer name"
                    onSearch={handleSearch}
                />
            </div>
        </div>

    )
}

export default TodaysReport