import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { formatNumberByCountry, getCurrencySymbol } from 'utils';
import { cardWithMiniGraphDataForTodays, textOneForTodaysSwitch, textTwoForTodaysSwitch } from 'CommonConstants/reportConstants';
import { NewTableHeader } from 'interface/newReportsInterface';
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
import SwitchableBox from 'components/reportComponents/SwitchableBox';
import CardWithMiniGraph from 'components/reportComponents/CardWithMiniGraph';
import moment from 'moment';
import NewTable from 'components/reportComponents/NewTable';
import StoreFilter from 'components/reportComponents/StoreFilter';
import "./style.scss";
import DownloadReport from 'components/reportComponents/DownloadReports';

const TodaysReport: React.FC = () => {

    const dispatch = useDispatch();

    const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)

    const [currentDate, setCurrentDate] = useState('');
    const [currentPageLiveOrders, setCurrentPageLiveOrders] = useState<number>(1);
    const [currentPageLiveOrdersNonDineIn, setCurrentPageLiveOrdersNonDineIn] = useState<number>(1);
    const [isSwitchActive, setIsSwitchActive] = useState<boolean>(false);
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
    const countryCode = useSelector((state: any) => state?.newReports?.getDetailsRestaurantSuccess?.country);
    const locations = useSelector((state: any) => state?.newReports?.storeLocationsList)
    const billedDataAPIRedux = useSelector((state: any) => state?.newReports?.billedSuccess)
    const billedDataAPIReduxLoading = useSelector((state: any) => state?.newReports?.billedLoading)
    const unBilledAPIRedux = useSelector((state: any) => state?.newReports?.unBilledSuccess)
    const unBilledAPIReduxLoading = useSelector((state: any) => state?.newReports?.unBilledLoading)

    const billedDataArrayForDownloading = [billedDataAPIRedux]
    const billedDataAPIReduxHeaderForDownloading = billedDataAPIRedux && Object.keys(billedDataAPIRedux)?.map((key) => ({
        key,
        label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()
      }));
    
    const unBilledAPIReduxArrayForDownloading = [unBilledAPIRedux]
    const unBilledAPIReduxHeaderForDownloading = unBilledAPIRedux && Object.keys(unBilledAPIRedux)?.map((key) => ({
        key,
        label: key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).trim()
      }));

    const currencySymbol = useMemo(() => (getCurrencySymbol(countryCode)), [countryCode]);

    const liveOrderNonDineInTableHeaders: NewTableHeader[] = [
        { key: 'orderNumber', label: 'Order Number', isSortable: true, alignment: 'left', prefix: "#" },
        { key: 'orderChannel', label: 'Order Channel', isSortable: false, alignment: 'left' },
        { key: 'orderType', label: 'Order Type', isSortable: false, alignment: 'left' },
        { key: 'timeElapsed', label: 'Time Elapsed', isSortable: true, alignment: 'left' },
        { key: 'orderStatus', label: 'Order Status', isSortable: false, alignment: 'left' },
        { key: 'customerName', label: 'Customer Name', isSortable: true, alignment: 'left' },
        { key: 'customerNumber', label: 'Customer Number', isSortable: true, isPrivate: true, alignment: 'left' },
        { key: 'orderTotal', label: `Order Total`, isSortable: true, alignment: 'right', isMonetary:true,prefix: currencySymbol },
        // { key: 'orderDate', label: 'Order Date', isSortable: true, alignment: 'left' },
        // { key: 'requestedEta', label: 'Requested ETA', isSortable: true, alignment: 'left' },
    ];

    const orderedLiveNonDineInData = liveOrderNonDineInAPIRedux?.map((toBeMappedData: any) => ({
        orderNumber: toBeMappedData.orderNumber,
        orderChannel: toBeMappedData.orderChannel,
        orderType: toBeMappedData.orderType,
        timeElapsed: toBeMappedData.timeElapsed,
        orderStatus: toBeMappedData.orderStatus,
        customerName: toBeMappedData.customerName,
        customerNumber: toBeMappedData.customerNumber,
        orderTotal: toBeMappedData.orderTotal,
        // orderDate: toBeMappedData.orderDate,
        // requestedEta: toBeMappedData.requestedEta,
    }));


    const liveOrdersDineInTableHeaders: NewTableHeader[] = [
        { key: 'orderNumber', label: 'Order number', isSortable: true, alignment: 'left' , prefix: "#"},
        { key: 'tableName', label: 'Table name', isSortable: true, alignment: 'left' },
        { key: 'orderDate', label: 'Order date', isSortable: true, alignment: 'left' },
        { key: 'orderTime', label: 'Order time', isSortable: true, alignment: 'left' },
        { key: 'tableOccupancyDuration', label: 'Table occupancy duration', isSortable: true, alignment: 'left' },
        { key: 'orderAmount', label: `Order amount`, isSortable: true, alignment: 'right',isMonetary:true, prefix: currencySymbol },
    ]

    const orderedLiveOrdersData = liveOrdersAPIRedux?.map((toBeMappedData: any) => ({
        orderNumber: toBeMappedData.orderNumber,
        tableName: toBeMappedData.tableName,
        orderDate: toBeMappedData.orderDate,
        orderTime: toBeMappedData.orderTime,
        tableOccupancyDuration: toBeMappedData.tableOccupancyDuration,
        orderAmount: toBeMappedData.orderAmount,
    }))

    useEffect(() => {
        const formattedDate = moment().format('YYYY-MM-DD');
        setCurrentDate(formattedDate);
        let search=liveOrdersSearchQuery
        if(search?.[0]==="#")   search = search.slice(1);
        
        currentDate && dispatch(liveOrdersRequest({ locationid: selectedLocation?.value, tablePageNo: currentPageLiveOrders, tableRecordLimit: liveOrdersPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: search }))
    }, [selectedLocation, currentPageLiveOrders, liveOrdersPageLimit, currentDate,liveOrdersSearchQuery])


    useEffect(() => {
        const formattedDate = moment().format('YYYY-MM-DD');
        setCurrentDate(formattedDate);
        let search=liveOrderNonDineInSearchQuery
        if(search[0]==="#")   search = search.slice(1);
        currentDate && dispatch(liveOrderNonDineInRequest({ locationid: selectedLocation?.value, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: search }))
    }, [selectedLocation, currentPageLiveOrdersNonDineIn, currentDate, liveOrderNonDineInPageLimit,liveOrderNonDineInSearchQuery])

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
    }


    const handleSearch = (value: string, kpiTitle: string) => {       
        let search=value
        if(search?.[0]==="#")   search = search.slice(1);
        switch (kpiTitle) {
            case 'Live Dine-in orders':
                setLiveOrdersSearchQuery(value)
                setCurrentPageLiveOrders(1)
                dispatch(liveOrdersRequest({ locationid: selectedLocation?.value, tablePageNo: 1, tableRecordLimit: liveOrdersPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: search }))
                break;

            case 'Live Off-Premise orders':
                setLiveOrderNonDineInSearchQuery(value)
                setCurrentPageLiveOrdersNonDineIn(1)
                dispatch(liveOrderNonDineInRequest({ locationid: selectedLocation?.value, tablePageNo: 1, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: search }))
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
                textOne={textOneForTodaysSwitch}
                textTwo={textTwoForTodaysSwitch}
                isActive={isSwitchActive}
                toggleSwitch={handleToggleSwitch}
            />
            <div className="todays-report-sales-overview-box-container-parent">
                <div className="sales-overview-box-with-download">
                    <h2>Sales Overview</h2>
                    {((!billedDataAPIReduxLoading && billedDataArrayForDownloading)&& (!unBilledAPIReduxLoading && unBilledAPIReduxArrayForDownloading)) && (
                        <DownloadReport
                            kpiTitle="Sales Overview"
                            tableData={isSwitchActive ? billedDataArrayForDownloading : unBilledAPIReduxArrayForDownloading}
                            headerData={isSwitchActive ? billedDataAPIReduxHeaderForDownloading : unBilledAPIReduxHeaderForDownloading}
                        />
                    )}                
                </div>
                <div className="todays-report-sales-overview-box-container">
                    {isSwitchActive ? (cardWithMiniGraphDataForTodays?.map(({ title, key, isMonetary }) => (
                        <CardWithMiniGraph
                            key={key}
                            cardTitle={title}
                            cardValue={formatNumberByCountry(billedDataAPIRedux?.[key], countryCode, isMonetary)}
                            isMonetary={isMonetary}
                            loader={billedDataAPIReduxLoading}
                        />
                    ))
                    ) : (
                        cardWithMiniGraphDataForTodays?.map(({ title, key, isMonetary }) => (
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
                    apiEndPoint="/sales/live/tables"
                    queryParams={{locationId: selectedLocation?.value, startDate: currentDate, endDate: currentDate}}
                    kpiTitle="Live Dine-in orders"
                    searchQuery={liveOrdersSearchQuery}
                    headerData={liveOrdersDineInTableHeaders}
                    tableData={orderedLiveOrdersData && orderedLiveOrdersData?.length > 0 && orderedLiveOrdersData}
                    currentPage={currentPageLiveOrders}
                    totalPages={liveOrdersTotalPageNo ? liveOrdersTotalPageNo : 1}
                    onPageChange={setCurrentPageLiveOrders}
                    rowsPerPage={liveOrdersPageLimit}
                    setRowsPerPage={setLiveOrdersPageLimit}
                    loader={liveOrdersLoading}
                    count={liveOrdersAPIRedux?.length}
                    searchPlaceHolder="Search by order number, table name"
                    onSearch={handleSearch}
                    totalElements={liveOrdersAPIReduxTotalElements}
                />
                <NewTable
                    apiEndPoint="/sales/live/tracking"
                    queryParams={{locationId: selectedLocation?.value, startDate: currentDate, endDate: currentDate}}
                    kpiTitle="Live Off-Premise orders"
                    searchQuery={liveOrderNonDineInSearchQuery}
                    headerData={liveOrderNonDineInTableHeaders}
                    tableData={orderedLiveNonDineInData && orderedLiveNonDineInData?.length > 0 && orderedLiveNonDineInData}
                    currentPage={currentPageLiveOrdersNonDineIn}
                    totalPages={liveOrderNonDineInTotalPageNo ? liveOrderNonDineInTotalPageNo : 1}
                    onPageChange={setCurrentPageLiveOrdersNonDineIn}
                    rowsPerPage={liveOrderNonDineInPageLimit}
                    setRowsPerPage={setLiveOrderNonDineInPageLimit}
                    loader={liveOrderNonDineInLoading}
                    count={liveOrderNonDineInAPIRedux?.length}
                    searchPlaceHolder="Search by order number, customer name"
                    onSearch={handleSearch}
                    totalElements={liveOrderNonDineInAPIReduxTotalElements}
                />
            </div>
        </div >

    )
}

export default TodaysReport