// reportConstants.ts
// This file contains the constants for the reports pages.

import { IcardWithMiniGraphData } from "interface/newReportsInterface";

export const textOneForTodaysSwitch: string = "Live Orders";
export const textTwoForTodaysSwitch: string = "Overall";

export const cardWithMiniGraphDataForTodays: IcardWithMiniGraphData[] = [
    { title: "Total Sales", key: "totalSales", isMonetary: true },
    { title: "Net Sales", key: "totalNetSales", isMonetary: true },
    { title: "Total Tax", key: "totalTax", isMonetary: true },
    { title: "Total Tips", key: "totalTip", isMonetary: true },
    { title: "Gratuity", key: "totalServiceTax", isMonetary: true },
    { title: "Transactions", key: "totalTransactions", isMonetary: false },
    { title: "Discount", key: "totalDiscount", isMonetary: true },
    { title: "Cancelled", key: "totalCancelledOrders", isMonetary: true },
];