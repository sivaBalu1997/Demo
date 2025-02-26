import { NewTableHeader } from "interface/newReportsInterface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancellationSummaryRequest, changeLocation, discountSummaryRequest, locationDetailsRequest, offerSummaryRequest, paymentDetailsRequest, salesByChannelRequest, salesByRevenueClassRequest, salesCardTypeRequest, salesCategoryRequest, salesSummaryReportRequest, staffSalesRequest, voidedOrderSummaryRequest } from "redux/newReports/newReportsActions";


interface TenderTypeItem {
    paymentMode:string;
    totalSales: number;
    totalOrders: number;
    type?: string;
    salesPercentage: string;
    cardName?: string | null;
    premises: 'ONPREM'|'third party'| string;
    cardType?: string | null;
    onPremOrders?: number;
    onPremSales?: number;
    offPremOrders?: number;
    offPremSales?: number;
  }
  
  interface TenderTypeItem {
    paymentMode: string;
    totalSales: number;
    totalOrders: number;
    type?: string;
    salesPercentage: string;
    cardName?: string | null;
    premises: 'ONPREM' | 'third party' | string;
    cardType?: string | null;
    onPremOrders?: number;
    onPremSales?: number;
    offPremOrders?: number;
    offPremSales?: number;
  }

export const useSalesOverview=({

})=>{
    const restaurantDetails = useSelector(
        (state: any) => state?.auth?.restaurantDetails?.branch
      );
      const [viewType, setViewType] = useState("default")
      const [searchQuery, setSearchQuery] = useState('');
      const [currentPageOfferDiscount, setCurrentPageOfferDiscount] =
      useState<number>(1);
      const [currentRowsOfferDiscount, setCurrentRowsOfferDiscount] =
      useState<number>(10);
      const [currentPageVoiddedOrders, setCurrentPageVoiddedOrders] =
      useState<number>(1);
      const [currentRowsVoiddedOrders, setCurrentRowsVoiddedOrders] =
      useState<number>(10);
    
      const mappedIdWithBranchName = restaurantDetails?.map(
        (branchWithId: any) => ({
          value: branchWithId?.id,
          label: branchWithId?.locationName,
        })
      );
    
      const [selectedDate, setSelectedDate] = useState({
        label: "Yesterday",
        value: "Yesterday",
      });
      const [selectedStore, setSelectedStore] = useState(
        mappedIdWithBranchName?.[0]
      );
      const datepickerApply = (data1: any, data2: any) => {
        console.log(data1, data2, "selected Date is here");
      };
    
      const [tenderType, setTenderType] = useState<Record<string, TenderTypeItem>>({})
      /******************************************************************************************* */
      const locationId = useSelector((state: any) => state?.auth?.credentials?.locationId)
      const locations = useSelector((state: any) => state?.newReports?.locationDetailsData?.content)
      const selectedLocation = useSelector((state: any) => state?.newReports?.selectedLocation)
      const tendorTypes = useSelector((state: any) => state?.newReports?.paymentDetailsData?.content)
      const salesSummary = useSelector((state: any) => state?.newReports?.salesSummaryReportData)
      const staffSalesData = useSelector((state: any) => state?.newReports?.staffSalesData?.content)
      const salesCardTypeData = useSelector((state: any) => state?.newReports?.salesCardTypeData?.content)
      const salesCategory = useSelector((state: any) => state?.newReports?.salesByItemCategorySuccess)
    
      const discountSummary = useSelector((state: any) => state?.newReports?.discountSummarySuccess?.content)
      const discountSummaryLoading = useSelector((state: any) => state?.newReports?.discountSummaryLoading)
          const discountSummaryTotalPages = useSelector(
            (state: any) => state?.newReports?.discountSummarySuccess?.totalPages
        );
    
      const cancellationSummary = useSelector((state: any) => state?.newReports?.cancellationSummarySuccess?.content)
      const cancellationSummaryLoading = useSelector((state: any) => state?.newReports?.cancellationSummaryLoading)
    const cancellationSummaryTotalPages = useSelector(
      (state: any) => state?.newReports?.cancellationSummarySuccess?.totalPages
    );
      const salesByChannel = useSelector((state: any) => state?.newReports?.salesByChannelData?.content)
      const salesByRevenueClass = useSelector((state: any) => state?.newReports?.salesByRevenueClassSuccess?.content)
      const offerSummary = useSelector((state: any) => state?.newReports?.offerSummaryData?.content)
      const voidedOrderSummary = useSelector((state: any) => state?.newReports?.voidedOrderSummaryData?.content)
      //  const hourlySalesReportChartData=useSelector((state: any) => state?.newReports?.hourlySalesReportChartData)
      const dispatch = useDispatch();
      useEffect(() => {
        console.log({
          selectedLocation,
          tendorTypes,
          salesSummary,
          staffSalesData,
          salesCardTypeData,
          salesCategory,
          discountSummary,
          offerSummary,
          voidedOrderSummary,
          cancellationSummary,
          salesByChannel,
          salesByRevenueClass
          // hourlySalesReportChartData
        })
      }, [selectedLocation, salesSummary, staffSalesData, salesCardTypeData, salesCategory, discountSummary, cancellationSummary, salesByChannel, salesByRevenueClass, offerSummary, voidedOrderSummary])
    
      useEffect(() => {
        dispatch(locationDetailsRequest({ locationId }))
      }, [locationId])
    
    
      useEffect(() => {
        dispatch(changeLocation({ label: locations?.[0], value: locationId }))
      }, [locations])
      /******************************************************************************************* */
    
      useEffect(() => {
        Promise.all([
          dispatch(paymentDetailsRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
          dispatch(salesSummaryReportRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
          dispatch(staffSalesRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
          dispatch(salesCardTypeRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-01-10", endDate: "2024-01-17" })),
          dispatch(salesCategoryRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
          dispatch(salesByChannelRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
          dispatch(salesByRevenueClassRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
          dispatch(discountSummaryRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
          dispatch(cancellationSummaryRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
          dispatch(offerSummaryRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" })),
          dispatch(voidedOrderSummaryRequest({ locationid: selectedLocation?.value, tableRecordLimit: 100, tablePageNo: 1, startDate: "2024-12-01", endDate: "2024-12-31" }))
        ])
    
      }, [selectedLocation])
    
    
    
      const arrayToObject = (arr: TenderTypeItem[] = []) => {
        return arr?.reduce((acc, item) => {
          if (item?.paymentMode === "Online/Key-In" || item?.paymentMode === "Card Swipe") {
            acc[`${item?.paymentMode + "-" + item?.cardType}`] = item;
          } else {
            acc[`${item?.paymentMode}`] = item;
    
          }
          return acc;
        }, {} as Record<string, TenderTypeItem>);
      }
    
    
      useEffect(() => {
        setTenderType(arrayToObject(tendorTypes))
        console.log(111, {}, tendorTypes);
    
      }, [tendorTypes])
    
    
      const handleGoBackToChart = () => {
        setViewType("default");
      }
    
      const countryCode = useSelector(
        (state: any) => state?.auth?.restaurantDetails?.country
    );
      const currencySymbol = countryCode === "US" ? "$" : "₹";
    
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
      switch (viewType) {
          case "discountOffer": 
                  dispatch(
                    discountSummaryRequest({
                          locationid: selectedLocation?.value,
                          startDate: "2025-01-25",
                          endDate: "2025-02-24",
                          tablePageNo: currentPageOfferDiscount,
                          tableRecordLimit: currentRowsOfferDiscount,
                      })
                  );
              break;
              case "voidedOffer": 
              dispatch(
                cancellationSummaryRequest({
                      locationid: selectedLocation?.value,
                      startDate: "2025-01-25",
                      endDate: "2025-02-24",
                      tablePageNo: currentPageVoiddedOrders,
                      tableRecordLimit: currentRowsVoiddedOrders,
                      search:searchQuery,
                  })
              );
          break;
    
          // case 'Live Orders Non Dine-in':
          //   currentDate && dispatch(liveOrderNonDineInRequest({ locationid, tablePageNo: currentPageLiveOrdersNonDineIn, tableRecordLimit: liveOrderNonDineInPageLimit, startDate: currentDate, endDate: currentDate, searchQuery: value }))
          //   break;
    
          default:
              console.warn(`Unknown KPI title: ${kpiTitle}`);
      }
    };
    
    return{
        viewType,locations, locationId, selectedLocation, selectedDate, setSelectedDate, datepickerApply,dispatch, salesSummary, tenderType, staffSalesData,salesByChannel,salesCardTypeData,salesByRevenueClass,handleGoBackToChart, searchQuery,setSearchQuery,newTableHeaders, discountSummary, currentPageOfferDiscount,
        discountSummaryTotalPages, 
        setCurrentPageOfferDiscount,
        currentRowsOfferDiscount,
        setCurrentRowsOfferDiscount,
        discountSummaryLoading,
        handleSearch,
        cancellationSummary,
        currentPageVoiddedOrders,
        setCurrentPageVoiddedOrders,
    cancellationSummaryTotalPages,
    currentRowsVoiddedOrders,
    setCurrentRowsVoiddedOrders,
    cancellationSummaryLoading
    }
}   