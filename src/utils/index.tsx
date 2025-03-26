// using module name util as folder name is ok in case of react but is not recommended
//TODO: move contents of util to utils
import { IncrementOrDecrementTypeEnum } from "interface/newReportsInterface";
import React from "react"

const countryCurrency:Record<string,string>={
  "US":"$",
  "IN":"₹"
  //Add possible branch countruies here
}

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

function getCurrencySymbol(countryCode:string):any{
  return countryCurrency?.[countryCode]?<span style={{fontFamily:"sans-serif"}}>{countryCurrency[countryCode]}</span>:""
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
  getCurrencySymbol
  
}