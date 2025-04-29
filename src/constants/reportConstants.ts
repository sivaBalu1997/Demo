// reportConstants.ts
// This file contains the constants for the reports pages.

import { ICardConfigItem, IcardWithMiniGraphData } from "interface/newReportsInterface";

// ============================================================================================
  // Report Tabs config :
export const tabsForSales = ["Today's report", "Sales Overview", "Categories", "Employees"];//"Trends" 
export const tabsForProduct = ["Availability", "Insights"]; 
export const tabsForCustomer = ["Summary Insights", "Detailed Insights"];
export const tabsForCheckIn = ["Live Check-in Report", "Check-in Overview", ]; //"Inception"
// ============================================================================================

// ============================================================================================
  //Todays Report Overview

  export const textOneForTodaysSwitch: string = "Unpaid Orders";
  export const textTwoForTodaysSwitch: string = "Paid Orders";

  export const cardWithMiniGraphDataForTodays: IcardWithMiniGraphData[] = [
      { title: "Total Sales", key: "totalSales", isMonetary: true },
      { title: "Net Sales", key: "totalNetSales", isMonetary: true },
      { title: "Total Tax", key: "totalTax", isMonetary: true },
      { title: "Total Tips", key: "totalTip", isMonetary: true },
      { title: "Gratuity", key: "totalServiceTax", isMonetary: true },
      { title: "Orders", key: "totalTransactions", isMonetary: false },
      { title: "Discount", key: "totalDiscount", isMonetary: true },
      { title: "Cancelled", key: "totalCancelledOrders", isMonetary: true },
  ];

  export const cardWithMiniGraphDataForTodaysWithoutGratuity: IcardWithMiniGraphData[] = [
    { title: "Total Sales", key: "totalSales", isMonetary: true },
    { title: "Net Sales", key: "totalNetSales", isMonetary: true },
    { title: "Total Tax", key: "totalTax", isMonetary: true },
    { title: "Total Tips", key: "totalTip", isMonetary: true },
    { title: "Service Charges", key: "totalServiceTax", isMonetary: true },
    { title: "Orders", key: "totalTransactions", isMonetary: false },
    { title: "Discount", key: "totalDiscount", isMonetary: true },
    { title: "Cancelled", key: "totalCancelledOrders", isMonetary: true },  
  ];
// ============================================================================================


// ============================================================================================
  //Sales Tab Overview
  export const cardConfigForSalesTabOverView: ICardConfigItem[] = [
    {
      title: "Total Sales",
      value: "totalGrossSalesIncludingThirdparty",
      percentage: "totalSalesPercentage",
      isMonetary: true,
      showMiniGraph: true
    },
    {
      title: "Net Sales", 
      value: "totalNetSalesIncludingThirdparty",
      percentage: "netSalesPercentage",
      isMonetary: true,
      showMiniGraph: true
    },
    {
      title: "Total Tax",
      value: "totalTaxIncludingThirdparty", 
      percentage: "totalTaxPercentage",
      isMonetary: true,
      showMiniGraph: (val: string | number) => val !== "0.00" && val !== 0
    },
    {
      title: "Total Tips",
      value: "totalMagilTips",
      percentage: "totalTipsPercentage", 
      isMonetary: true,
      showMiniGraph: true
    },
    {
      title: "Gratuity",
      value: "gratuity",
      percentage: "gratuityPercentage",
      isMonetary: true,
      showMiniGraph: true
    },
    {
      title: "Transactions",
      value: "totalOrdersIncludingThirdparty",
      percentage: "transactionPercentage",
      isMonetary: false,
      showMiniGraph: true
    },
    {
      title: "Discount",
      value: "discounts",
      percentage: "discountPercentage",
      isMonetary: true,
      showMiniGraph: true
    },
    {
      title: "Refunded",
      value: "cancelledOrders",
      percentage: "cancelledAmtPercentage",
      isMonetary: true,
      showMiniGraph: true
    }
  ];

  export const cardConfigForSalesTabOverViewWithoutGratuity: ICardConfigItem[] = [
    {
      title: "Total Sales",
      value: "totalGrossSalesIncludingThirdparty",
      percentage: "totalSalesPercentage",
      isMonetary: true,
      showMiniGraph: true
    },
    {
      title: "Net Sales", 
      value: "totalNetSalesIncludingThirdparty",
      percentage: "netSalesPercentage",
      isMonetary: true,
      showMiniGraph: true
    },
    {
      title: "Total Tax",
      value: "totalTaxIncludingThirdparty", 
      percentage: "totalTaxPercentage",
      isMonetary: true,
      showMiniGraph: (val: string | number) => val !== "0.00" && val !== 0
    },
    {
      title: "Total Tips",
      value: "totalMagilTips",
      percentage: "totalTipsPercentage", 
      isMonetary: true,
      showMiniGraph: true
    },
    {
      title: "Service Charge",
      value: "gratuity",
      percentage: "gratuityPercentage",
      isMonetary: true,
      showMiniGraph: true
    },
    {
      title: "Transactions",
      value: "totalOrdersIncludingThirdparty",
      percentage: "transactionPercentage",
      isMonetary: false,
      showMiniGraph: true
    },
    {
      title: "Discount",
      value: "discounts",
      percentage: "discountPercentage",
      isMonetary: true,
      showMiniGraph: true
    },
    {
      title: "Refunded",
      value: "cancelledOrders",
      percentage: "cancelledAmtPercentage",
      isMonetary: true,
      showMiniGraph: true
    }
  ];
// ============================================================================================


// ============================================================================================
  //Employees
  export const cardDataForEmployees = [
    // {
    //   title: "Total Sales",
    //   value: "totalMagilSales",
    //   percentage: "totalSalesPercentage"
    // },
    {
      title: "Employee Net Sales",
      value: "totalMagilNetSales",
      percentage: "netSalesPercentage"
    },
    // {
    //   title: "Total Tax",
    //   value: "totalMagilTax",
    //   percentage: "totalTaxPercentage"
    // },
    {
      title: "Total Tips",
      value: "totalMagilTips",
      percentage: "totalTipsPercentage"
    },
    {
      title: "Gratuity",
      value: "gratuity",
      percentage: "gratuityPercentage"
    },
    // {
    //   title: "Discount",
    //   value: "discounts",
    //   percentage: "discountPercentage"
    // },
    // {
    //   title: "Cancelled",
    //   value: "cancelledAmt",
    //   percentage: "cancelledAmtPercentage"
    // }
  ];

  export const cardDataForEmployeesWithoutGratuity = [
    // {
    //   title: "Total Sales",
    //   value: "totalMagilSales",
    //   percentage: "totalSalesPercentage"
    // },
    {
      title: "Net Sales",
      value: "totalMagilNetSales",
      percentage: "netSalesPercentage"
    },
    // {
    //   title: "Total Tax",
    //   value: "totalMagilTax",
    //   percentage: "totalTaxPercentage"
    // },
    {
      title: "Service Charge",
      value: "gratuity",
      percentage: "gratuityPercentage"
    },
    {
      title: "Total Tips",
      value: "totalMagilTips",
      percentage: "totalTipsPercentage"
    },
    // {
    //   title: "Discount",
    //   value: "discounts",
    //   percentage: "discountPercentage"
    // },
    // {
    //   title: "Cancelled",
    //   value: "cancelledAmt",
    //   percentage: "cancelledAmtPercentage"
    // }
  ];
// ============================================================================================



  export const DateOptions: {value:string, label:string}[] = [
    { value: "Today", label: "Today" },
    { value: "Yesterday", label: "Yesterday" },
    { value: "This week", label: "This week" },
    { value: "7 days", label: "Last 7 Days" }
  ]

  export const chartFilterOptionsForProductReportsCharts: { value: string, label: string }[] = [
    { value: "Overall", label: "Overall" },
    { value: "Weekdays", label: "Weekdays" },
    { value: "Weekends", label: "Weekends" },
    // { value: "Lunch", label: "Lunch" },
    // { value: "Dinner", label: "Dinner" },
  ];

  export const chartFilterOptionsForProductReportsWithoutWeekdaysAndWeekends: { value: string, label: string }[] = [
    { value: "Overall", label: "Overall" },
  ];

  export const orderFilterOptionsPerformance = [
    { value: "Orders", label: "Orders" },
    { value: "Sales", label: "Sales" },
    { value: "Tips", label: "Tips" },
    { value: "Gratuities", label: "Gratuities" },
  ]
  export const refundsFilterOptionsRevenueImpact = [
    { value: "Refunds", label: "Refunds" },
    // { value: "Complementary", label: "Complementary" },
    { value: "Taxes", label: "Taxes" },
    { value: "Tips", label: "Tips" },
    { value: "Discounts", label: "Discounts" },
    { value: "Gratuities", label: "Gratuities" },
  ]
  export const deletedFilterOptionsErrorPerformance = [
    { value: "Deleted", label: "Deleted" },
    { value: "Voids", label: "Voids" },
    // { value: "Re-fires", label: "Re-fires" },
  ]
  export const predefinedColors = [
    "#1F77B4",
    "#3FE1C0", 
    "#E17100", 
    "#049E16", 
    "#F89B29",
    "#E60076",  
    "#009689", 
    "#F54900", 
    "#CE9E0F", 
    "#AF4B7E", 
    "#17BECF", 
    "#ff0000", 
    "#0000ff", 
    "#ffA500", 
    "#800080", 
    "#a52a2a", 
    "#808080", 
    "#ffc0cb", 
  ];
