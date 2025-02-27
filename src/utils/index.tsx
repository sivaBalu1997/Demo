export function getRandomColor() {
  return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}
  
  export function amountFormatter(amount: number|string, countryCode?: string) {
    const currencySymbol = countryCode === "US" ? "$" : "₹";
    const amountToFormat=Number(amount||0)
    return `${currencySymbol}${amountToFormat.toFixed(2)}`;
  }