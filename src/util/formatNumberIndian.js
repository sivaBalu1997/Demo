export const formatNumberIndian = (number) => {
  let numStr = number.toString();
  // Split the number into integer and decimal parts
  let [integerPart, decimalPart] = numStr.split(".");

  // Format the integer part for the Indian numbering system
  let lastThree = integerPart.substring(integerPart.length - 3);
  let otherNumbers = integerPart.substring(0, integerPart.length - 3);
  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }
  let formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  // Reattach the decimal part if present
  if (decimalPart) {
    formatted += "." + decimalPart;
  }

  return formatted;
};
