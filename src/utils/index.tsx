// using module name util as folder name is ok in case of react but is not recommended
//TODO: move contents of util to utils
import { Dataset } from "components/reportComponents/ReusableCharts/MultiLineChart";
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


type ChartInput = Record<string, any>;

// type Dataset = {
//   label: string;
//   data: number[];
//   borderColor: string;
//   backgroundColor: string;
// };

export function transformChartDataDynamicZ(
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
        label: `${label}`,
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

type KPIResponse = Record<string, any>;

interface TransformOptions {
  labelKey: string;
  xAxisKey: string; // like "day" or "date"
  metrics: string[];
}

const weekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dayMap: Record<string, string> = {
  sunday: 'Sun', monday: 'Mon', tuesday: 'Tue',
  wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat',
};

const getLabelIndex = (label: string): number => {
  const normalized = label.trim().toLowerCase();
  return weekLabels.findIndex(day => day.toLowerCase() === normalized || dayMap[normalized] === day);
};

export function transformChartDataDynamic(
  data: KPIResponse[],
  kpiTitle: string
) {
  const chartData: any = {
    labels: weekLabels,
    datasets: [],
  };

  if (!Array.isArray(data) || data.length === 0) return chartData;

  const groupedData: Record<string, any[]> = {};

  if (kpiTitle === 'Sales Performance') {
    data.forEach(item => {
      const name = item.employeeName;
      if (!groupedData[name]) groupedData[name] = [];

      groupedData[name].push(item);
    });

    Object.entries(groupedData).forEach(([label, entries]) => {
      const dataset: any = {
        label,
        data: Array(7).fill(0),
        orders: Array(7).fill(0),
        sales: Array(7).fill(0),
        tips: Array(7).fill(0),
        gratuities: Array(7).fill(0),
        borderColor: label === 'James Bond' ? 'blue' : label === 'Alan Fox' ? 'green' : 'orange',
        backgroundColor:
          label === 'James Bond'
            ? 'rgba(0, 0, 255, 0.1)'
            : label === 'Alan Fox'
            ? 'rgba(0, 255, 0, 0.1)'
            : 'rgba(255, 165, 0, 0.1)',
      };

      entries.forEach(entry => {
        const index = getLabelIndex(entry.day);
        if (index !== -1) {
          dataset.data[index] = entry.data ?? 0;
          dataset.orders[index] = entry.orders ?? 0;
          dataset.sales[index] = entry.sales ?? 0;
          dataset.tips[index] = entry.tips ?? 0;
          dataset.gratuities[index] = entry.gratuities ?? 0;
        }
      });

      chartData.datasets.push(dataset);
    });
  }

  else if (kpiTitle === 'Revenue Impact') {
    data.forEach(entry => {
      const label = entry.fullName || entry.steward || 'Unknown';
      if (!groupedData[label]) {
        groupedData[label] = Array(7).fill(null).map(() => ({}));
      }
  
      const index = getLabelIndex(entry.date);
      if (index !== -1) {
        const values: any = {};
  
        // Flexible parsing based on the available keys
        if ('tip' in entry || 'total' in entry) {
          values.tip = Number(entry.tip ?? 0);
          values.serviceFee = Number(entry.serviceFee ?? 0);
          values.discount = Number(entry.discount ?? 0);
          values.tax = Number(entry.tax ?? 0);
          values.total = Number(entry.total ?? 0);
          values.orders = Number(entry.orders ?? 0);
        } else if ('voidedAmount' in entry) {
          values.voidedAmount = Number(entry.voidedAmount ?? 0);
          values.voidedItems = Number(entry.voidedItems ?? 0);
          values.voidedReasons = entry.voidedReasons ?? '';
          values.orderCount = Number(entry.orderCount ?? 0);
        }
  
        groupedData[label][index] = values;
      }
    });
  
    Object.entries(groupedData).forEach(([label, weekData]) => {
      const sample = weekData.find(d => d && Object.keys(d).length > 0) || {};
      const dataset: any = { label };
  
      for (const key in sample) {
        dataset[key] = weekData.map(d => d?.[key] ?? (typeof sample[key] === 'number' ? 0 : ''));
      }
  
      chartData.datasets.push(dataset);
    });
  }

  else if (kpiTitle === 'Error Performance') {
    data.forEach(item => {
      const name = item.employeeName;
      if (!groupedData[name]) groupedData[name] = Array(7).fill(0);

      const index = getLabelIndex(item.day);
      if (index !== -1) {
        groupedData[name][index] = Number(item.totalQuantity ?? 0);
      }
    });

    Object.entries(groupedData).forEach(([label, quantities]) => {
      const dataset = {
        label,
        data: quantities,
        totalQuantity: quantities.map(q => parseFloat(Number(q).toFixed(2))),
      };
      chartData.datasets.push(dataset);
    });
  }

  return chartData;
}

export function transformChartDataDynamicTwo(
  data: KPIResponse[],
  kpiTitle: string,
  xAxisKey: string,   // e.g., "day" or "date"
  yAxisKeys: string[] // e.g., ["sales", "orders"]
) {
  const chartData: any = {
    labels: weekLabels,
    datasets: [],
  };

  if (!Array.isArray(data) || data.length === 0) return chartData;

  const groupedData: Record<string, any[]> = {};

  data.forEach(entry => {
    const label = entry.employeeName || entry.fullName || entry.steward || 'Unknown';
    if (!groupedData[label]) {
      groupedData[label] = Array(7).fill(null).map(() => ({}));
    }

    const index = getLabelIndex(entry[xAxisKey]);
    if (index !== -1) {
      const values: any = {};
      yAxisKeys.forEach(key => {
        values[key] = typeof entry[key] === 'number' ? entry[key] : Number(entry[key] ?? 0);
      });
      groupedData[label][index] = values;
    }
  });

  Object.entries(groupedData).forEach(([label, weekData]) => {
    const dataset: any = { label };
    yAxisKeys.forEach(key => {
      dataset[key] = weekData.map(d => d?.[key] ?? 0);
    });
    chartData.datasets.push(dataset);
  });

  return chartData;
}

export const grouping = (data: any, labelKey: string, groupingKey : string, yAxisData : string) => {
  const labelSet = new Set()
  data?.forEach((d:any) => labelSet.add(d[labelKey]))

  
  const grpObject: any = {}
  data.forEach((curr : any) => {
      const currKey = curr[groupingKey];
      if(!grpObject[currKey])   grpObject[currKey] = [];
      
      const item = { ...curr };
      delete item[labelKey];
      delete item[groupingKey];
      
      grpObject[currKey]?.push(item);
  });
  

  const datasets: any = [];

  for (const [key, value] of Object.entries(grpObject)) {
      const obj: any = {};
      obj["label"] = key as any;
      obj['data'] = [] as any[]
      const listOfKeysSet: any = new Set();
      for (const [key, _] of Object.entries((value as Record<string, any>[])[0])) {
          listOfKeysSet.add(key)
      }

      Array.from(listOfKeysSet).forEach((l:any) => obj[l] = []);
      (value as Record<string, any>[])?.forEach((list : any) => {
          for (const [key1, value1] of Object.entries(list)) {
              if(key1 === yAxisData)
                  obj['data'].push(value1)
              obj[key1].push(value1)
          }
      })
      datasets.push(obj);
  }
  return {
      labels: Array.from(labelSet),
      datasets: datasets
  }
}

// ===========================================
interface ChartDataItem {
  [key: string]: string | number | boolean | null | undefined;
}

interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  [key: string]: any | number[] | string[];
}

interface TransformedChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface TransformToChartOptions {
  kpiTitle: string;
  dataFromApi: ChartDataItem[];
  xAxisKey: string;
  yAxisKey: string;
  labelKey?: string;
  remainingKeys?: string[];
  defaultLabels?: string[];
}

// Color palette with 20+ distinct colors
const CHART_COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
  '#FF9F40', '#8AC24A', '#EA5F89', '#00BBD3', '#F06292',
  '#E040FB', '#00ACC1', '#7E57C2', '#26A69A', '#D4E157',
  '#5C6BC0', '#EC407A', '#42A5F5', '#66BB6A', '#FFA726',
  '#78909C', '#AB47BC', '#26C6DA', '#9CCC65', '#FF7043',
  '#8D6E63', '#7E57C2', '#42A5F5', '#66BB6A', '#FFA726'
];

function isNumericValue(value: any): boolean {
  if (typeof value === 'number') return true;
  if (typeof value !== 'string') return false;
  return /^-?\d*\.?\d+$/.test(value.trim());
}

function convertValue(value: any): any {
  if (value === null || value === undefined) return '';
  if (isNumericValue(value)) {
    return parseFloat(String(value));
  }
  return String(value);
}

function matchDate(label: string, date: string): boolean {
  return label.toLowerCase().startsWith(date.toLowerCase().substring(0, 3));
}

export function transformToChartAcceptables(options: TransformToChartOptions): TransformedChartData {
  const {
    dataFromApi,
    xAxisKey,
    yAxisKey,
    labelKey = 'steward',
    remainingKeys = [],
    defaultLabels,
  } = options;

  const uniqueLabels = defaultLabels || Array.from(new Set(dataFromApi.map(item => String(item[xAxisKey]))));
  const groupedData: Record<string, ChartDataItem[]> = {};
  
  dataFromApi.forEach(item => {
    const label = String(item[labelKey] || 'Unlabeled');
    if (!groupedData[label]) {
      groupedData[label] = [];
    }
    groupedData[label].push(item);
  });

  const datasets: ChartDataset[] = Object.entries(groupedData).map(([label, items], index) => {
    // Get color from palette (cycles through colors if more than available)
    const colorIndex = index % CHART_COLORS.length;
    const borderColor = CHART_COLORS[colorIndex];
    const backgroundColor = `${borderColor}80`; // Add alpha for fill

    const dataset: ChartDataset = {
      label,
      data: Array(uniqueLabels.length).fill(0),
      borderColor,
      backgroundColor,
    };

    remainingKeys.forEach(key => {
      const sampleValue = items[0]?.[key];
      dataset[key] = Array(uniqueLabels.length).fill(
        isNumericValue(sampleValue) ? 0 : ''
      );
    });

    items.forEach(item => {
      const date = String(item[xAxisKey]);
      const index = uniqueLabels.findIndex(label => matchDate(label, date));
      
      if (index !== -1) {
        const currentValue = Number(convertValue(item[yAxisKey])) || 0;
        dataset.data[index] += currentValue;
        
        remainingKeys.forEach(key => {
          const val = convertValue(item[key]);
          if (isNumericValue(val)) {
            dataset[key][index] += Number(val);
          } else if (val) {
            dataset[key][index] = dataset[key][index] 
              ? `${dataset[key][index]}, ${val}` 
              : val;
          }
        });
      }
    });

    return dataset;
  });

  return {
    labels: uniqueLabels,
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