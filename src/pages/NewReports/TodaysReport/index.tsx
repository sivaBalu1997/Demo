import React, { useContext, useEffect, useState } from 'react'
import { Contextpagejs } from 'pages/productCatalog/contextpage';
import { useDispatch, useSelector } from 'react-redux';
import { billerUnbilledRequest, changeLocation, liveDiscountRequest, liveNetSalesRequest, liveOpenSalesRequest, liveOrderNonDineInRequest, liveOrdersRequest, liveRefundsRequest, locationDetailsRequest } from 'redux/newReports/newReportsActions';
import { NewTableHeader } from 'interface/newReportsInterface';
import SwitchableBox from 'components/reportComponents/SwitchableBox';
import CardWithMiniGraph from 'components/reportComponents/CardWithMiniGraph';
import moment from 'moment';
import NewTable from 'components/reportComponents/NewTable';
import StoreFilter from 'components/reportComponents/StoreFilter';
import "./style.scss";
import { formatNumberByCountry } from 'utils';


const TodaysReport: React.FC = () => {
    
    const dispatch = useDispatch();
    
    const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)
    const restaurantDetails = useSelector((state: any) => state?.auth?.restaurantDetails?.branch)
    const mappedIdWithBranchName = restaurantDetails?.map((branchWithId: any) => ({ value: branchWithId?.id, label: branchWithId?.locationName }))

    // console.log("MAP",{mappedIdWithBranchName})

    const [currentDate, setCurrentDate] = useState('');
    const [selectedDate, setSelectedDate] = useState({ label: "Yesterday", value: "Yesterday" });
    const [currentPageLiveOrders, setCurrentPageLiveOrders] = useState<number>(1);
    const [currentPageLiveOrdersNonDineIn, setCurrentPageLiveOrdersNonDineIn] = useState<number>(1);
    const [isSwitchActive, setIsSwitchActive] = useState<boolean>(false);
    const [selectedStore, setSelectedStore] = useState(selectedLocation);
    const [liveOrdersSearchQuery, setLiveOrdersSearchQuery] = useState('')
    const [liveOrdersPageLimit, setLiveOrdersPageLimit] = useState<number>(10)
    const [liveOrderNonDineInSearchQuery, setLiveOrderNonDineInSearchQuery] = useState('')
    const [liveOrderNonDineInPageLimit, setLiveOrderNonDineInPageLimit] = useState<number>(10)
    
    const liveOrdersAPIRedux = useSelector((state: any) => state?.newReports?.liveOrdersSuccess?.content)
    // console.log("ONE",{liveOrdersAPIRedux})
    const liveOrdersTotalPageNo = useSelector((state: any) => state?.newReports?.liveOrdersSuccess?.totalPages)
    const liveOrderNonDineInAPIRedux = useSelector((state: any) => state?.newReports?.liveOrderNonDineInSuccess?.content)
    // console.log("ONE",{liveOrderNonDineInAPIRedux})
    const liveOrderNonDineInTotalPageNo = useSelector((state: any) => state?.newReports?.liveOrderNonDineInSuccess?.totalPages)
    const liveOrdersLoading = useSelector((state: any) => state?.newReports?.liveOrdersLoading)
    const liveOrderNonDineInLoading = useSelector((state: any) => state?.newReports?.liveOrderNonDineInLoading)
    const countryCode = useSelector(
        (state: any) => state?.auth?.restaurantDetails?.country
    );
    const locations = useSelector((state: any) => state?.newReports?.storeLocationsList)
    // console.log("MAP",{selectedLocation})
    const billedOrUnbilledDataAPIRedux = useSelector((state: any) => state?.newReports?.billedUnbilledSuccess)
    const billedOrUnbilledDataAPIReduxLoading = useSelector((state: any) => state?.newReports?.billedUnbilledLoading)
    
    const textOne: string = "Live Orders";
    const textTwo: string = "Overall";

    const [activeTextForSwitchableBox, setActiveTextForSwitchableBox] = useState<string>(textOne);
    
    const currencySymbol = countryCode === "US" ? "$" : "₹";


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

    const cardWithMiniGraphData = [
        { title: "Total Sales", key: "totalSales", isMonetary: true },
        { title: "Net Sales", key: "totalNetSales", isMonetary: true },
        { title: "Total Tax", key: "totalTax", isMonetary: true },
        { title: "Total Tips", key: "totalTip", isMonetary: true },
        { title: "Gratuity", key: "totalServiceTax", isMonetary: true },
        { title: "Transactions", key: "totalTransactions", isMonetary: false },
        { title: "Discount", key: "totalDiscount", isMonetary: true },
        { title: "Cancelled", key: "totalCancelledOrders", isMonetary: true },
      ];

    useEffect(() => {
        const formattedDate = moment().format('YYYY-MM-DD');
        setCurrentDate(formattedDate);
        currentDate && dispatch(liveOrdersRequest({ locationid: selectedLocation?.value, tablePageNo: currentPageLiveOrders, tableRecordLimit: liveOrdersPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: liveOrdersSearchQuery }))
    }, [selectedLocation, currentPageLiveOrders, liveOrdersPageLimit, currentDate, liveOrdersSearchQuery])

    useEffect(() => {
        dispatch(liveDiscountRequest({ locationid: selectedLocation?.value }))
        dispatch(liveOpenSalesRequest({ locationid: selectedLocation?.value }))
        dispatch(liveRefundsRequest({ locationid: selectedLocation?.value }))
        dispatch(liveNetSalesRequest({ locationid: selectedLocation?.value }))
    }, [selectedLocation])


    useEffect(() => {
        const formattedDate = moment().format('YYYY-MM-DD');
        setCurrentDate(formattedDate);
        currentDate && dispatch(liveOrderNonDineInRequest({ locationid: selectedLocation?.value, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: liveOrderNonDineInSearchQuery }))
    }, [selectedLocation, currentPageLiveOrdersNonDineIn, currentDate, liveOrderNonDineInPageLimit])

    useEffect(() => {
        const formattedDate = moment().format('YYYY-MM-DD');
        setCurrentDate(formattedDate);
        currentDate && dispatch(billerUnbilledRequest({ locationid: selectedLocation?.value, startDate: currentDate, type: isSwitchActive === true ? 'completed':'notcompleted' }))
    }, [isSwitchActive, currentDate, selectedLocation])

    
    const handleToggleSwitch = () => {
        setIsSwitchActive((prev) => !prev)
        setActiveTextForSwitchableBox((prev) => (prev === textOne ? textTwo : textOne));
    }


    const handleSearch = (value: string, kpiTitle: string) => {
        switch (kpiTitle) {
            case 'Live Orders':
                dispatch(liveOrdersRequest({ locationid: selectedLocation?.value, tablePageNo: currentPageLiveOrders, tableRecordLimit: liveOrdersPageLimit, searchQuery: value }))
                break;

            case 'Live Orders Non Dine-in':
                currentDate && dispatch(liveOrderNonDineInRequest({ locationid: selectedLocation?.value, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: value }))
                break;

            default:
                console.warn(`Unknown KPI title: ${kpiTitle}`);
        }
    };

    const [selectedOptionStore, setSelectedOptionStore] = useState("Sales");


    const handleRefreshClick = () => {

        setSelectedDate({ label: "Yesterday", value: "Yesterday" });
        setSelectedStore(selectedLocation);
        setLiveOrdersSearchQuery('');
        setLiveOrdersPageLimit(10);
        setLiveOrderNonDineInSearchQuery('');
        setLiveOrderNonDineInPageLimit(10);
        setCurrentPageLiveOrders(1);
        setCurrentPageLiveOrdersNonDineIn(1);
        setIsSwitchActive(false);
        setActiveTextForSwitchableBox(textOne);
        setSelectedOptionStore("Sales");

        dispatch(liveDiscountRequest({ locationid: selectedStore?.value }));
        dispatch(liveOpenSalesRequest({ locationid: selectedStore?.value }));
        dispatch(liveNetSalesRequest({ locationid: selectedStore?.value }));
        dispatch(liveRefundsRequest({ locationid: selectedStore?.value }));
        dispatch(liveOrdersRequest({
            locationid: selectedStore?.value,
            tablePageNo: 1,
            tableRecordLimit: 10,
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            searchQuery: ''
        }));
        dispatch(liveOrderNonDineInRequest({
            locationid: selectedStore?.value,
            tablePageNo: 1,
            tableRecordLimit: 10,
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            searchQuery: ''
        }));
        dispatch(billerUnbilledRequest({
            locationid: selectedStore?.value,
            startDate: moment().format('YYYY-MM-DD'),
            type: isSwitchActive === true ? 'notcompleted' : 'completed'
        }));

    };


    return (
        <div className='todays-report-container'>
            <StoreFilter storeOptions={locations}
                selectedStore={selectedLocation}
                setSelectedStore={(store) => dispatch(changeLocation(store))}
                handleRefreshClick={handleRefreshClick}
                showRefresh={true} showDate={false}
            />

            <SwitchableBox
                textOne={textOne}
                textTwo={textTwo}
                isActive={isSwitchActive}
                toggleSwitch={handleToggleSwitch}
            />
            <div className="todays-report-sales-overview-box-container-parent">
                <h2>Sales Overview</h2>
                <div className="todays-report-sales-overview-box-container">
                    {cardWithMiniGraphData?.map(({ title, key, isMonetary }) => (
                        <CardWithMiniGraph
                            key={key}
                            cardTitle={title}
                            cardValue={formatNumberByCountry(billedOrUnbilledDataAPIRedux?.[key], countryCode, isMonetary)}
                            isMonetary={isMonetary}
                            loader={billedOrUnbilledDataAPIReduxLoading}
                        />
                    ))}
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
                    count={liveOrdersAPIRedux?.length}
                    searchPlaceHolder="Search by order number, table name"
                    onSearch={handleSearch}
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
        </div >

    )
}

export default TodaysReport