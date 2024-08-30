import React, { useMemo, useState } from "react";
import "./style.scss";
import Table from "../../components/Table";
import { categoryRep } from "../../apiDataOrdered/OrderedCategoryRep";
import SidePanel from "pages/SidePanel";
// import { categoryRepo } from "../../apiData/CategoryReport";
// import { reorderTableData } from "../../utils/reorderTableData";
// import PieChart from '../../components/Charts/PieChart';

const Category = () => {
  const cateData = categoryRep["Category Table"].map((item) => ({
    ...item.data,
    "Order Date": item["Order Date"],
  }));
  const [startDate, setStartDate] = useState("2023-08-06");
  const [endDate, setEndDate] = useState("2024-08-06");

  const [searchCategoryName, setSearchCategoryName] = useState("");

  // Memoize filtered data to avoid unnecessary recalculations
  const filteredData = useMemo(() => {
    return cateData.filter((item) => {
      const orderDate = new Date(item["Order Date"]);
      // console.log("moc", item["Order Date"]);
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Check if the order date is within the specified range
      const matchesDateRange = orderDate >= start && orderDate <= end;

      // Check if the category name filter is applied
      const categoryMatches = searchCategoryName
        ? item["Category Name"]
            .toLowerCase()
            .includes(searchCategoryName.toLowerCase())
        : true; // If no category name, match all

      // console.log({ orderDate, start, end, matchesDateRange, categoryMatches });
      return matchesDateRange && categoryMatches;
    });
  }, [cateData, startDate, endDate, searchCategoryName]);

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <SidePanel />
      <div className="category-report">
        <div className="cate-insights-head">
          <div className="name-board">
            <h1>Reports US</h1>
          </div>
          <div className="dates">
            <input
              type="text"
              className="search-category-name"
              value={searchCategoryName}
              placeholder="Category Name"
              onChange={(e) => setSearchCategoryName(e.target.value)}
            />
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type="date"
              className="start-date"
            />
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type="date"
              className="end-date"
            />
          </div>
        </div>
        {/* <div>
        <PieChart labels={categoryNames} data={totalGrossSales} colors={customColors} />
        </div> */}
        <div className="category-table-container">
          <Table
            tableData={filteredData}
            viewType="full"
            recordsPerPage={70}
            Heading="Category Item Sales"
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
