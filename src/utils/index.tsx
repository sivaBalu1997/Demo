// using module name util as folder name is ok in case of react but is not recommended
//TODO: move contents of util to utils
import { IncrementOrDecrementTypeEnum } from "interface/newReportsInterface";
import React from "react"

const countryCurrency:Record<string,string>={
  "US":"$",
  "IN":"₹"
  //Add possible branch countruies here
} 

const daysOfWeek = {
  Sun:"Sunday",
  Mon:"Monday",
  Tue:"Tuesday",
  Wed:"Wednesday",
  Thu:"Thursday",
  Fri:"Friday",
  Sat:"Saturday"
}

const reverseDaysOfWeek = Object.fromEntries(
  Object.entries(daysOfWeek).map(([key, value]) => [value, key])
);

function getRandomColor() {
  return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}
  
 function amountFormatter(amount: number|string, countryCode: string="US") {
    const amountToFormat=Number(amount||0)
    return `${getCurrencySymbol(countryCode)}${amountToFormat.toFixed(2)}`;
  }



  const transformSalesData = (percent:string|number|null): IncrementOrDecrementTypeEnum => {
  const percentType=IncrementOrDecrementTypeEnum.NULL
  if(!percent)return IncrementOrDecrementTypeEnum.NULL
  const percentVal=Number(percent)
  
  if(percentVal>0)return IncrementOrDecrementTypeEnum.INCREMENT
  else if(percentVal<0)return IncrementOrDecrementTypeEnum.DECREMENT
  return percentType
  };

 const roundNum=(num:string|number|null, round=2):string=>{
    return Number(num||0)?.toFixed(round)

  }


 function formatNumberByCountry(
  input: string | number | null | undefined, 
  countryCode: 'US' | 'India'="US", 
  isMonetary: boolean = false
): string {
  if (input === null || input === undefined || input === "" || input === 0) {
    return "0"; // Default to "0" if input is invalid
  }

  let number = typeof input === 'number' ? input : parseFloat(input);
  if (isNaN(number)) {
    return "0"
  };

  const locale = countryCode === 'US' ? 'en-US' : 'en-IN';
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: isMonetary ? 2 : 0,
    maximumFractionDigits: isMonetary ? 2 : 0,
    useGrouping: true, // Ensures proper comma formatting
  };

  return new Intl.NumberFormat(locale, options).format(number);
}


 function maskPhone(phone: string): string {
  if(!phone || phone === "-" || phone === "") return "-";
  const last4Digit = phone.slice(-4);
  return last4Digit ? "(XXX) XXX-" + last4Digit : "";
}

 function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  return '*'.repeat(localPart.length) + '@' + domain;
}
 function formatNumberByK(
  input: string | number | null | undefined
): string {
  if (input === null || input === undefined || input === "" || input === 0) {
    return "0"; // Default to "0" if input is invalid
  }

  let number = typeof input === 'number' ? input : parseFloat(input);
  if (isNaN(number)) {
    return "0"
  };

  const options: Intl.NumberFormatOptions = {
    notation: "compact",
    compactDisplay: "short",
    useGrouping: true, // Ensures proper comma formatting
  };

  let formattedNumber = new Intl.NumberFormat('en-US', options).format(number);
  if (formattedNumber.includes('k')) {
    const [num, suffix] = formattedNumber.split('k');
    formattedNumber = `${parseFloat(num).toFixed(3)}k`;
  }

  return formattedNumber;
}

function getCurrencySymbol(countryCode:string,styled:boolean=false):any{
  return  countryCurrency?.[countryCode]?(styled?<span style={{fontFamily:"sans-serif"}}>{countryCurrency[countryCode]}</span>:countryCurrency[countryCode]):""
}

// const generateTooltipContent = (dataset: any, dataIndex: number) => {
//   let detailsHTML = '';

//   // Add the hour information at the top
//   if (dataset.hours && dataset.hours[dataIndex]) {
//     detailsHTML += `Hour: ${dataset.hours[dataIndex]}`;
//   }

//   // Loop through the dataset and extract the relevant values
//   Object.entries(dataset).forEach(([key, value]) => {
//     if (Array.isArray(value) && typeof value?.[dataIndex] === 'number') {
//       if (key !== 'data' && key !== 'hours') { // Exclude 'data' and 'hours' from this loop
//         if (key === 'orders') {
//           detailsHTML += `<br>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value[dataIndex]}`;
//         } else {
//           detailsHTML += `<br>${key.charAt(0).toUpperCase() + key.slice(1)}: $${value[dataIndex]?.toFixed(2)}`;
//         }
//       }
//     }
//   });

//   return detailsHTML;
// };

const generateTooltipContent = (dataset: any, dataIndex: number) => {
  let detailsHTML = '';

  // Define a map for custom labels
  const labelMap: { [key: string]: string } = {
    hours: 'Hour',
    orders: 'Orders',
    sales: 'Sales',
    // Add more mappings as needed
  };

  // Add the hour information at the top
  if (dataset.hours && dataset.hours[dataIndex]) {
    detailsHTML += `<div style="display: flex;"><span style="color: #8D8D8D;">${labelMap['hours']}:</span> <span>${dataset.hours[dataIndex]}</span></div>`;
  }

  // Loop through the dataset and extract the relevant values
  Object.entries(dataset).forEach(([key, value]) => {
    if (Array.isArray(value) && typeof value?.[dataIndex] === 'number') {
      if (key !== 'data' && key !== 'hours') { // Exclude 'data' and 'hours' from this loop
        const label = labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
        if (key === 'orders') {
          detailsHTML += `<div style="display: flex;"><span style="color: #8D8D8D;">${label} : </span><span>${value[dataIndex]}</span></div>`;
        } else {
          detailsHTML += `<div style="display: flex;"><span style="color: #8D8D8D; text-wrap: nowrap;">${label} : </span><span>$${value[dataIndex]?.toFixed(2)}</span></div>`;
        }
      }
    }
  });

  return detailsHTML;
};

// convert the case of a string to title case
function titleCase(str: string): string {
  return str?.replace(   /\w\S*/g,    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()  )
}

function weekFullForm(day: keyof typeof daysOfWeek): string {
  return daysOfWeek[day] || "";
}

function weekShortForm(day: keyof typeof daysOfWeek): string {
  return reverseDaysOfWeek[day] || "";
}


// check if the number in Railway format is AM Or PM
function amPmFormat(data: number): string {
  if(data==24)return "AM"
  return data>11?"PM":"AM"
}

// type ApiEntry = {
//   date: string;
//   fullName: string;
//   tip: string;
//   serviceFee: string;
//   total: string;
//   orders: number;
// };

// type ChartDataset = {
//   label: string;
//   data: number[];
//   borderColor: string;
//   backgroundColor: string;
//   orders: number[];
//   sales: number[];
//   tips: number[];
//   gratuities?: number[];
//   serviceFee?: number[];
// };

// export const transformChartData = (apiData: ApiEntry[], country: string) => {
//   const dayMap: Record<string, number> = {
//     Sunday: 0,
//     Monday: 1,
//     Tuesday: 2,
//     Wednesday: 3,
//     Thursday: 4,
//     Friday: 5,
//     Saturday: 6,
//   };

//   const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const colorOptions = [
//     { borderColor: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.1)' },
//     { borderColor: 'green', backgroundColor: 'rgba(0, 255, 0, 0.1)' },
//     { borderColor: 'orange', backgroundColor: 'rgba(255, 165, 0, 0.1)' },
//     { borderColor: 'purple', backgroundColor: 'rgba(128, 0, 128, 0.1)' },
//   ];

//   const peopleMap: Record<string, ChartDataset> = {};
//   let colorIndex = 0;

//   for (const entry of apiData) {
//     const name = entry.fullName.trim();
//     const dayIndex = dayMap[entry.date];

//     if (!peopleMap[name]) {
//       const { borderColor, backgroundColor } = colorOptions[colorIndex % colorOptions.length];
//       colorIndex++;

//       peopleMap[name] = {
//         label: name,
//         data: new Array(7).fill(0),
//         orders: new Array(7).fill(0),
//         sales: new Array(7).fill(0),
//         tips: new Array(7).fill(0),
//         ...(country === 'US'
//           ? { gratuities: new Array(7).fill(0) }
//           : { serviceFee: new Array(7).fill(0) }),
//         borderColor,
//         backgroundColor,
//       };
//     }

//     const dataset = peopleMap[name];
//     dataset.data[dayIndex] = parseFloat(entry.total);
//     dataset.sales[dayIndex] = parseFloat(entry.total);
//     dataset.orders[dayIndex] = entry.orders;
//     dataset.tips[dayIndex] = parseFloat(entry.tip);

//     if (country === 'US') {
//       dataset.gratuities![dayIndex] = parseFloat(entry.serviceFee);
//     } else {
//       dataset.serviceFee![dayIndex] = parseFloat(entry.serviceFee);
//     }
//   }

//   return {
//     labels,
//     datasets: Object.values(peopleMap),
//   };
// };


// export const transformChartData = (apiData: ApiEntry[], country: string) => {
//   const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const shortWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   const firstDate = apiData[0]?.date || '';
//   const isMonth = months.includes(firstDate);

//   const labels = isMonth ? shortMonths : shortWeekdays;

//   const dayMap: Record<string, number> = (isMonth ? months : weekdays)
//     .reduce((acc, name, index) => {
//       acc[name] = index;
//       return acc;
//     }, {} as Record<string, number>);

//   const colorOptions = [
//     { borderColor: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.1)' },
//     { borderColor: 'green', backgroundColor: 'rgba(0, 255, 0, 0.1)' },
//     { borderColor: 'orange', backgroundColor: 'rgba(255, 165, 0, 0.1)' },
//     { borderColor: 'purple', backgroundColor: 'rgba(128, 0, 128, 0.1)' },
//   ];

//   const peopleMap: Record<string, ChartDataset> = {};
//   let colorIndex = 0;

//   for (const entry of apiData) {
//     const name = entry.fullName.trim();
//     const dayIndex = dayMap[entry.date];

//     if (!peopleMap[name]) {
//       const { borderColor, backgroundColor } = colorOptions[colorIndex % colorOptions.length];
//       colorIndex++;

//       peopleMap[name] = {
//         label: name,
//         data: new Array(12).fill(0), // default to 12 for months
//         orders: new Array(12).fill(0),
//         sales: new Array(12).fill(0),
//         tips: new Array(12).fill(0),
//         ...(country === 'US'
//           ? { gratuities: new Array(12).fill(0) }
//           : { serviceFee: new Array(12).fill(0) }),
//         borderColor,
//         backgroundColor,
//       };
//     }

//     const dataset = peopleMap[name];

//     dataset.data[dayIndex] = parseFloat(entry.total);
//     dataset.sales[dayIndex] = parseFloat(entry.total);
//     dataset.orders[dayIndex] = entry.orders;
//     dataset.tips[dayIndex] = parseFloat(entry.tip);

//     if (country === 'US') {
//       dataset.gratuities![dayIndex] = parseFloat(entry.serviceFee);
//     } else {
//       dataset.serviceFee![dayIndex] = parseFloat(entry.serviceFee);
//     }
//   }

//   return {
//     labels: labels.slice(0, isMonth ? 12 : 7),
//     datasets: Object.values(peopleMap).map((ds) => {
//       // Trim arrays to 7 for weekdays
//       if (!isMonth) {
//         ds.data = ds.data.slice(0, 7);
//         ds.orders = ds.orders.slice(0, 7);
//         ds.sales = ds.sales.slice(0, 7);
//         ds.tips = ds.tips.slice(0, 7);
//         if (country === 'US') {
//           ds.gratuities = ds.gratuities?.slice(0, 7);
//         } else {
//           ds.serviceFee = ds.serviceFee?.slice(0, 7);
//         }
//       }
//       return ds;
//     }),
//   };
// };



type ChartInput = Record<string, any>;

type Dataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

export function transformChartDataDynamic(
  apiData: ChartInput[],
  config: {
    labelKey: string;
    xAxisKey: string;
    metrics: string[];
  }
) {
  const { labelKey, xAxisKey, metrics } = config;

  const rawLabels = Array.from(new Set(apiData.map(item => item[xAxisKey])));

  const fullWeekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const fullMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const shortWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const isMonth = fullMonths.includes(rawLabels[0]);
  const fullLabels = isMonth ? fullMonths : fullWeekdays;
  const shortLabels = isMonth ? shortMonths : shortWeekdays;

  const labelIndexMap: Record<string, number> = {};
  rawLabels.forEach((label) => {
    const index = fullLabels.indexOf(label);
    if (index !== -1) labelIndexMap[label] = index;
  });

  const sortedLabels = rawLabels
    ?.map(label => ({ full: label, index: labelIndexMap[label] }))
    ?.filter(item => item.index !== undefined)
    ?.sort((a, b) => a.index - b.index)
    ?.map(item => shortLabels[item.index]);

  const colorOptions = [
    { borderColor: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.1)' },
    { borderColor: 'green', backgroundColor: 'rgba(0, 255, 0, 0.1)' },
    { borderColor: 'orange', backgroundColor: 'rgba(255, 165, 0, 0.1)' },
    { borderColor: 'purple', backgroundColor: 'rgba(128, 0, 128, 0.1)' },
  ];

  const datasetsMap: Record<string, Record<string, number[]>> = {};
  let colorIndex = 0;

  for (const entry of apiData) {
    const label = entry[labelKey]?.trim();
    const xAxisVal = entry[xAxisKey];
    const labelPos = labelIndexMap[xAxisVal];
    if (labelPos === undefined) continue;

    if (!datasetsMap[label]) {
      datasetsMap[label] = {};
      for (const metric of metrics) {
        datasetsMap[label][metric] = new Array(fullLabels.length).fill(0);
      }
    }

    for (const metric of metrics) {
      const val = parseFloat(entry[metric]) || 0;
      datasetsMap[label][metric][labelPos] = val;
    }
  }

  // Flatten to one dataset per label+metric
  const datasets: Dataset[] = [];
  for (const [label, metricData] of Object.entries(datasetsMap)) {
    for (const [metric, dataArray] of Object.entries(metricData)) {
      const color = colorOptions[colorIndex % colorOptions.length];
      colorIndex++;

      datasets?.push({
        label: `${label} - ${metric}`,
        data: dataArray,
        borderColor: color.borderColor,
        backgroundColor: color.backgroundColor,
      });
    }
  }

  return {
    labels: sortedLabels,
    datasets,
  };
}





// export all functions 
export{
  getRandomColor,
  amountFormatter,
  transformSalesData,
  roundNum,
  formatNumberByCountry,
  maskPhone,
  maskEmail,
  formatNumberByK,
  getCurrencySymbol,
  generateTooltipContent,
  titleCase,
  weekFullForm,
  weekShortForm,
  amPmFormat,
}