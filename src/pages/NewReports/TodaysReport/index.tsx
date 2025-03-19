import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
    billedRequest,
    changeLocation,
    liveDiscountRequest, 
    liveNetSalesRequest, 
    liveOpenSalesRequest, 
    liveOrderNonDineInRequest, 
    liveOrdersRequest, 
    liveRefundsRequest, 
    unBilledRequest, 
} from 'redux/newReports/newReportsActions';
import { NewTableHeader } from 'interface/newReportsInterface';
import { formatNumberByCountry } from 'utils';
import SwitchableBox from 'components/reportComponents/SwitchableBox';
import CardWithMiniGraph from 'components/reportComponents/CardWithMiniGraph';
import moment from 'moment';
import NewTable from 'components/reportComponents/NewTable';
import StoreFilter from 'components/reportComponents/StoreFilter';
import "./style.scss";

const TodaysReport: React.FC = () => {

    const textOne: string = "Live Orders";
    const textTwo: string = "Overall";

    const dispatch = useDispatch();

    const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)

    const [currentDate, setCurrentDate] = useState('');
    const [selectedOptionStore, setSelectedOptionStore] = useState("Sales");
    const [currentPageLiveOrders, setCurrentPageLiveOrders] = useState<number>(1);
    const [currentPageLiveOrdersNonDineIn, setCurrentPageLiveOrdersNonDineIn] = useState<number>(1);
    const [isSwitchActive, setIsSwitchActive] = useState<boolean>(false);
    const [activeTextForSwitchableBox, setActiveTextForSwitchableBox] = useState<string>(textOne);
    const [liveOrdersSearchQuery, setLiveOrdersSearchQuery] = useState('')
    const [liveOrdersPageLimit, setLiveOrdersPageLimit] = useState<number>(10)
    const [liveOrderNonDineInSearchQuery, setLiveOrderNonDineInSearchQuery] = useState('')
    const [liveOrderNonDineInPageLimit, setLiveOrderNonDineInPageLimit] = useState<number>(10)

    const liveOrdersAPIRedux = useSelector((state: any) => state?.newReports?.liveOrdersSuccess?.content)
    const liveOrdersAPIReduxTotalElements = useSelector((state: any) => state?.newReports?.liveOrdersSuccess?.totalElements)
    const liveOrdersTotalPageNo = useSelector((state: any) => state?.newReports?.liveOrdersSuccess?.totalPages)
    const liveOrderNonDineInAPIRedux = useSelector((state: any) => state?.newReports?.liveOrderNonDineInSuccess?.content)
    const liveOrderNonDineInAPIReduxTotalElements = useSelector((state: any) => state?.newReports?.liveOrderNonDineInSuccess?.totalElements)
    const liveOrderNonDineInTotalPageNo = useSelector((state: any) => state?.newReports?.liveOrderNonDineInSuccess?.totalPages)
    const liveOrdersLoading = useSelector((state: any) => state?.newReports?.liveOrdersLoading)
    const liveOrderNonDineInLoading = useSelector((state: any) => state?.newReports?.liveOrderNonDineInLoading)
    const countryCode = useSelector(
        (state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country
    );
    const locations = useSelector((state: any) => state?.newReports?.storeLocationsList)
    const billedDataAPIRedux = useSelector((state: any) => state?.newReports?.billedSuccess)
    const billedDataAPIReduxLoading = useSelector((state: any) => state?.newReports?.billedLoading)
    const unBilledAPIRedux = useSelector((state: any) => state?.newReports?.unBilledSuccess)
    const unBilledAPIReduxLoading = useSelector((state: any) => state?.newReports?.unBilledLoading)

    const currencySymbol = countryCode === "US" ? "$" : "₹";
    
    console.log("FFFFFFFFFFF",{countryCode},{currencySymbol})

    const liveOrdersDineIn = liveOrdersAPIRedux?.map((toBeMapped:any)=>({
        orderNumber: toBeMapped?.orderNumber,
        tableName: toBeMapped?.tableName,
        orderDate: toBeMapped?.orderDate,
        orderTime: toBeMapped?.orderTime,
        tableOccupancyDuration: toBeMapped?.tableOccupancyDuration,
        orderAmount: `${currencySymbol}${toBeMapped?.orderAmount}`,
    }))

    const liveNonDineOrder = liveOrderNonDineInAPIRedux?.map((toBeMapped:any)=>({
        orderNumber: toBeMapped?.orderNumber,
        orderChannel: toBeMapped?.orderChannel,
        orderType: toBeMapped?.orderType,
        timeElapsed: toBeMapped?.timeElapsed,
        orderStatus: toBeMapped?.orderStatus,
        customerName: toBeMapped?.customerName,
        customerNumber: toBeMapped?.customerNumber,
        orderTotal: `${currencySymbol}${toBeMapped?.orderTotal}`,
    }))

    const liveOrderNonDineInTableHeaders: NewTableHeader[] = [
        { key: 'orderNumber', label: 'Order Number', isSortable: true, alignment: 'left' },
        { key: 'orderChannel', label: 'Order Channel', isSortable: false, alignment: 'left' },
        { key: 'orderType', label: 'Order Type', isSortable: false, alignment: 'left' },
        { key: 'timeElapsed', label: 'Time Elapsed', isSortable: true, alignment: 'left' },
        { key: 'orderStatus', label: 'Order Status', isSortable: false, alignment: 'left' },
        { key: 'customerName', label: 'Customer Name', isSortable: true, alignment: 'left' },
        { key: 'customerNumber', label: 'Customer Number', isSortable: true, isPrivate: true, alignment: 'left' },
        { key: 'orderTotal', label: `Order Total`, isSortable: true, alignment: 'right' },
        // { key: 'orderDate', label: 'Order Date', isSortable: true, alignment: 'left' },
        // { key: 'requestedEta', label: 'Requested ETA', isSortable: true, alignment: 'left' },
    ];


    const liveOrdersDineInTableHeaders: NewTableHeader[] = [
        { key: 'orderNumber', label: 'Order number', isSortable: true, alignment: 'left' },
        { key: 'tableName', label: 'Table name', isSortable: true, alignment: 'left' },
        { key: 'orderDate', label: 'Order date', isSortable: true, alignment: 'left' },
        { key: 'orderTime', label: 'Order time', isSortable: true, alignment: 'left' },
        { key: 'tableOccupancyDuration', label: 'Table occupancy duration', isSortable: true, alignment: 'left' },
        { key: 'orderAmount', label: `Order amount`, isSortable: true, alignment: 'right' },
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
        const formattedDate = moment().format('YYYY-MM-DD');
        setCurrentDate(formattedDate);
        currentDate && dispatch(liveOrderNonDineInRequest({ locationid: selectedLocation?.value, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: liveOrderNonDineInSearchQuery }))
    }, [selectedLocation, currentPageLiveOrdersNonDineIn, currentDate, liveOrderNonDineInPageLimit])

    useEffect(() => {
        const formattedDate = moment().format('YYYY-MM-DD');
        setCurrentDate(formattedDate);
        currentDate && dispatch(billedRequest({ locationid: selectedLocation?.value, startDate: currentDate, type: 'completed' }))
    }, [currentDate, selectedLocation])

    useEffect(() => {
        const formattedDate = moment().format('YYYY-MM-DD');
        setCurrentDate(formattedDate);
        currentDate && dispatch(unBilledRequest({ locationid: selectedLocation?.value, startDate: currentDate, type: 'notcompleted' }))
    }, [currentDate, selectedLocation])


    const handleToggleSwitch = () => {
        setIsSwitchActive((prev) => !prev)
        setActiveTextForSwitchableBox((prev) => (prev === textOne ? textTwo : textOne));
    }


    const handleSearch = (value: string, kpiTitle: string) => {
        switch (kpiTitle) {
            case 'Live Dine-in orders':
                setLiveOrdersSearchQuery(value)
                dispatch(liveOrdersRequest({ locationid: selectedLocation?.value, tablePageNo: currentPageLiveOrders, tableRecordLimit: liveOrdersPageLimit, searchQuery: value }))
                break;
                
            case 'Live Off-Premise orders':
            setLiveOrderNonDineInSearchQuery(value)
            currentDate && dispatch(liveOrderNonDineInRequest({ locationid: selectedLocation?.value, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: value }))
            break;

            default:
                console.warn(`Unknown KPI title: ${kpiTitle}`);
        }
    };


    const handleRefreshClick = () => {
        setLiveOrdersSearchQuery('');
        setLiveOrdersPageLimit(10);
        setLiveOrderNonDineInSearchQuery('');
        setLiveOrderNonDineInPageLimit(10);
        setCurrentPageLiveOrders(1);
        setCurrentPageLiveOrdersNonDineIn(1);
        setIsSwitchActive(false);
        setActiveTextForSwitchableBox(textOne);
        setSelectedOptionStore("Sales");

        dispatch(liveDiscountRequest({ locationid: selectedLocation?.value }));
        dispatch(liveOpenSalesRequest({ locationid: selectedLocation?.value }));
        dispatch(liveNetSalesRequest({ locationid: selectedLocation?.value }));
        dispatch(liveRefundsRequest({ locationid: selectedLocation?.value }));
        dispatch(liveOrdersRequest({
            locationid: selectedLocation?.value,
            tablePageNo: 1,
            tableRecordLimit: 10,
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            searchQuery: ''
        }));
        dispatch(liveOrderNonDineInRequest({
            locationid: selectedLocation?.value,
            tablePageNo: 1,
            tableRecordLimit: 10,
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            searchQuery: ''
        }));
        dispatch(billedRequest({ locationid: selectedLocation?.value, startDate: currentDate, type: 'completed' }))
        dispatch(unBilledRequest({ locationid: selectedLocation?.value, startDate: currentDate, type: 'notcompleted' }))
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
                    {isSwitchActive ? (cardWithMiniGraphData?.map(({ title, key, isMonetary }) => (
                        <CardWithMiniGraph
                            key={key}
                            cardTitle={title}
                            cardValue={formatNumberByCountry(billedDataAPIRedux?.[key], countryCode, isMonetary)}
                            isMonetary={isMonetary}
                            loader={billedDataAPIReduxLoading}
                        />
                    ))
                ) : (
                    cardWithMiniGraphData?.map(({ title, key, isMonetary }) => (
                        <CardWithMiniGraph
                            key={key}
                            cardTitle={title}
                            cardValue={formatNumberByCountry(unBilledAPIRedux?.[key], countryCode, isMonetary)}
                            isMonetary={isMonetary}
                            loader={unBilledAPIReduxLoading}
                        />
                    ))
                    )}
                </div>
            </div>
            <div className="todays-report-tables-container">
                <NewTable
                    kpiTitle="Live Dine-in orders"
                    searchQuery={liveOrdersSearchQuery}
                    headerData={liveOrdersDineInTableHeaders}
                    tableData={liveOrdersDineIn && liveOrdersDineIn?.length > 0 && liveOrdersDineIn}
                    currentPage={currentPageLiveOrders}
                    totalPages={liveOrdersTotalPageNo ? liveOrdersTotalPageNo : 1}
                    onPageChange={setCurrentPageLiveOrders}
                    rowsPerPage={liveOrdersPageLimit}
                    setRowsPerPage={setLiveOrdersPageLimit}
                    loader={liveOrdersLoading}
                    count={liveOrdersDineIn?.length}
                    searchPlaceHolder="Search by order number, table name"
                    onSearch={handleSearch}
                    totalElements={liveOrdersAPIReduxTotalElements}
                />
                <NewTable
                    kpiTitle="Live Off-Premise orders"
                    searchQuery={liveOrderNonDineInSearchQuery}
                    headerData={liveOrderNonDineInTableHeaders}
                    tableData={liveNonDineOrder && liveNonDineOrder?.length > 0 && liveNonDineOrder}
                    currentPage={currentPageLiveOrdersNonDineIn}
                    totalPages={liveOrderNonDineInTotalPageNo ? liveOrderNonDineInTotalPageNo : 1}
                    onPageChange={setCurrentPageLiveOrdersNonDineIn}
                    rowsPerPage={liveOrderNonDineInPageLimit}
                    setRowsPerPage={setLiveOrderNonDineInPageLimit}
                    loader={liveOrderNonDineInLoading}
                    count={liveNonDineOrder?.length}
                    searchPlaceHolder="Search by order number, customer name"
                    onSearch={handleSearch}
                    totalElements={liveOrderNonDineInAPIReduxTotalElements}
                />
            </div>
        </div >

    )
}

export default TodaysReport