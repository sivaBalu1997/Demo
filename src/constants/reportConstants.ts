// reportConstants.ts
// This file contains the constants for the reports pages.

import { ICardConfigItem, IcardWithMiniGraphData } from "interface/newReportsInterface";

export const textOneForTodaysSwitch: string = "Live Orders";
export const textTwoForTodaysSwitch: string = "Overall";

// ============================================================================================
  //Todays Report Overview
  export const cardWithMiniGraphDataForTodays: IcardWithMiniGraphData[] = [
      { title: "Total Sales", key: "totalSales", isMonetary: true },
      { title: "Net Sales", key: "totalNetSales", isMonetary: true },
      { title: "Total Tax", key: "totalTax", isMonetary: true },
      { title: "Total Tips", key: "totalTip", isMonetary: true },
      { title: "Gratuity", key: "totalServiceTax", isMonetary: true },
      { title: "Orders", key: "totalTransactions", isMonetary: false },
      { title: "Discount", key: "totalDiscount", isMonetary: true },
      // { title: "Cancelled", key: "totalCancelledOrders", isMonetary: true },
  ];

  export const cardWithMiniGraphDataForTodaysWithoutGratuity: IcardWithMiniGraphData[] = [
    { title: "Total Sales", key: "totalSales", isMonetary: true },
    { title: "Net Sales", key: "totalNetSales", isMonetary: true },
    { title: "Total Tax", key: "totalTax", isMonetary: true },
    { title: "Total Tips", key: "totalTip", isMonetary: true },
    { title: "Service Charges", key: "totalServiceTax", isMonetary: true },
    { title: "Orders", key: "totalTransactions", isMonetary: false },
    { title: "Discount", key: "totalDiscount", isMonetary: true },
    // { title: "Cancelled", key: "totalCancelledOrders", isMonetary: true },
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
      title: "Cancelled",
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
      title: "Cancelled",
      value: "cancelledOrders",
      percentage: "cancelledAmtPercentage",
      isMonetary: true,
      showMiniGraph: true
    }
  ];
// ============================================================================================


  export const tabsForSales = ["Today's report", "Sales Overview", "Categories", "Employees"]; //"Trends"
  export const tabsForProduct = ["Insights", "Availability"]; 
  export const tabsForCustomer = ["Summary Insights", "Detailed Insights"];
  export const tabsForCheckIn = ["Live Check-in Report", "Check-in Overview", ]; //"Inception"

// ============================================================================================
  //Employees
  export const cardDataForEmployees = [
    {
      title: "Total Sales",
      value: "totalMagilSales",
      percentage: "totalSalesPercentage"
    },
    {
      title: "Net Sales",
      value: "totalMagilNetSales",
      percentage: "netSalesPercentage"
    },
    {
      title: "Total Tax",
      value: "totalMagilTax",
      percentage: "totalTaxPercentage"
    },
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
    {
      title: "Discount",
      value: "discounts",
      percentage: "discountPercentage"
    },
    {
      title: "Cancelled",
      value: "cancelledAmt",
      percentage: "cancelledAmtPercentage"
    }
  ];

  export const cardDataForEmployeesWithoutGratuity = [
    {
      title: "Total Sales",
      value: "totalMagilSales",
      percentage: "totalSalesPercentage"
    },
    {
      title: "Net Sales",
      value: "totalMagilNetSales",
      percentage: "netSalesPercentage"
    },
    {
      title: "Total Tax",
      value: "totalMagilTax",
      percentage: "totalTaxPercentage"
    },
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
    {
      title: "Discount",
      value: "discounts",
      percentage: "discountPercentage"
    },
    {
      title: "Cancelled",
      value: "cancelledAmt",
      percentage: "cancelledAmtPercentage"
    }
  ];
// ============================================================================================



  export const DateOptions: {value:string, label:string}[] = [
    { value: "Today", label: "Today" },
    { value: "Yesterday", label: "Yesterday" },
    { value: "This week", label: "This week" },
    { value: "7 days", label: "Last 7 Days" }
  ]
