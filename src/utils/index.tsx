import { IncrementOrDecrementTypeEnum } from "interface/newReportsInterface";

export function getRandomColor() {
  return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}
  
  export function amountFormatter(amount: number|string, countryCode?: string) {
    const currencySymbol = countryCode === "US" ? "$" : "₹";
    const amountToFormat=Number(amount||0)
    return `${currencySymbol}${amountToFormat.toFixed(2)}`;
  }



 export  const transformSalesData = (percent:string|number|null): IncrementOrDecrementTypeEnum => {
  const percentType=IncrementOrDecrementTypeEnum.NULL
  if(!percent)return IncrementOrDecrementTypeEnum.NULL
  const percentVal=Number(percent)
  
  if(percentVal>0)return IncrementOrDecrementTypeEnum.INCREMENT
  else if(percentVal<0)return IncrementOrDecrementTypeEnum.DECREMENT
  return percentType
  };

  export const roundNum=(num:string|number|null, round=2):string=>{
    return Number(num||0)?.toFixed(round)

  }


export function formatNumberByCountry(
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


export function maskPhone(phone: string): string {
  const last4Digit = phone.slice(-4);
  return last4Digit ? "(XXX) XXX-" + last4Digit : "";
}

export function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  return '*'.repeat(localPart.length) + '@' + domain;
}