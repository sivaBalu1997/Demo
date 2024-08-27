import { useState } from "react";

const formatDate = (dateString, format = "MM-DD-YYYY") => {
  console.log("FM");
  // Check if dateString is empty or null
  if (!dateString) {
    return "";
  }

  // Regex to validate input format (yyyy-mm-dd)
  const isoFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Return original string if it does not match the ISO format
  if (!isoFormatRegex.test(dateString)) {
    return "";
  }

  // Create a Date object from the string
  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString; // Return original string if invalid
  }
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  if (format === "DD-MMM-YYYY") {
    options.month = "short";
  }

  let [month, day, year] = new Intl.DateTimeFormat("en-US", options)
    .format(date)
    .split("/");

  if (format === "MM-DD-YYYY") {
    return `${month}-${day}-${year}`;
  } else if (format === "DD-MMM-YYYY") {
    const shortMonth = new Date(date).toLocaleString("default", {
      month: "short",
    });
    return `${day}-${shortMonth.toUpperCase()}-${year}`;
  }
  return dateString;
};

const useFormattedDate = (initialDate, format = "MM-DD-YYYY") => {
  const [date, setDate] = useState(initialDate);
  console.log("FMC");
  const updateDate = (newDate) => {
    setDate(formatDate(newDate, format));
  };

  return [date, updateDate];
};

export default useFormattedDate;
