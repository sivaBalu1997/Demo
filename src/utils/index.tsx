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
  amPmFormat
}