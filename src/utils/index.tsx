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