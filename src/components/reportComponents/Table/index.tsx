import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../../context/ThemeContext";
import arrow from "../../../assets/images/san.svg";
import blackarrow from "../../../assets/svg/blacksan.svg";
import exportFromJSON from "export-from-json";
import downloadVector from "../../../assets/svg/download-svg-2.svg";
import "./style.scss";

interface TableProps {
  tableData: Array<Record<string, any>>;
  Heading: string;
  viewType: string;
  recordsPerPage: number;
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalpageNo: number;
  tabledataLoading?: any;
}

interface SortConfig {
  key: string | null;
  direction: "ascending" | "descending" | null;
}

interface Row {
  [key: string]: any;
}

interface NestedRow {
  [key: string]: any;
}

const Table = ({
  tableData,
  viewType,
  recordsPerPage = 10,
  Heading,
  currentPage,
  setCurrentPage,
  totalpageNo,
  tabledataLoading
}: TableProps) => {

  console.log({ Heading, tableData })
  // const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });
  // console.log({ totalpageNo })
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  // const lastIndex = currentPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;

  const countryCode = useSelector(
    (state: any) => state?.auth?.restaurantDetails?.country
  );


  const [records, setRecords] = useState<Array<Record<string, any>>>(tableData)


  console.log("H", { Heading, records })

  useEffect(() => {
    setRecords(tableData)
  }, [tableData])

  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const recordData = Array.isArray(tableData) && tableData?.length > 0

      ? [...tableData].sort((a: Row, b: Row) => {
        if (direction) {
          const aValue = a[key];
          const bValue = b[key];

          if (typeof aValue === "number" && typeof bValue === "number") {
            return direction === "ascending"
              ? aValue - bValue
              : bValue - aValue;
          }

          if (typeof aValue === "string" && typeof bValue === "string") {
            return direction === "ascending"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }
        }
        return 0;
      })
      : tableData;

    setRecords(recordData)
  };



  // const records = tableData
  // console.log({ records })

  // const totalpageNo = Math.ceil(sortedData.length / recordsPerPage);

  // console.log('from table comp', { currentPage })
  // console.log({ lastIndex }, { firstIndex }, "sortedDataLength: ", sortedData?.length)


  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalpageNo) {
      setCurrentPage(currentPage + 1);
    }
  };

  const tableHeader =
    tableData?.length > 0
      ? Object.keys(tableData[0]).filter((header) => header !== "drop down")
      : [];

  // console.log({ tableHeader })

  const formatItemDetails = (
    details: Array<{ itemName: string; quantity: number }>
  ) => {
    console.log({ details })
    return details && details
      ?.map((item) => `${item.itemName} x${item.quantity}`)
      .join(", ");
  };

  const toggleRowExpansion = (index: number) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((row) => row !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const csvDownloadFn = (data: Array<Record<string, any>>) => {
    const fileName = Heading;
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const jsonDownloadFn = (data: Array<Record<string, any>>) => {
    const fileName = Heading;
    const exportType = exportFromJSON.types.json;
    exportFromJSON({ data, fileName, exportType });
  };

  const xlsxDownloadFn = (data: Array<Record<string, any>>) => {
    const fileName = Heading;
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const [openDownloadDropDown, setOpenDownloadDropDown] =
    useState<boolean>(false);

  const toggleExportDropDown = () => {
    setOpenDownloadDropDown((op) => !op);
  };

  const toggleAllRows = () => {
    if (expandedRows?.length === records?.length) {
      setExpandedRows([]);
    } else {
      const allRowIndexes = records?.map((_, index) => index);
      setExpandedRows(allRowIndexes);
    }
  };

  const hasDropDown = tableData && tableData?.some((row) => "drop down" in row);

  function camelCaseToSpaceSeparated(camelCaseString: string) {
    // Add space before each uppercase letter, and capitalize the first word
    return camelCaseString
      .replace(/([A-Z])/g, ' $1') // Add space before each uppercase letter
      .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
  }

  return (
    <>
      <div
        className={`t-report-pagination ${viewType === "half" ? "t-half-width" : ""
          } ${isDarkTheme ? "t-dark-theme" : "t-light-theme"}`}
      >
        <div className="t-table-head">
          <h3>{Heading}</h3>
          <div className="t-side-attribs">
            {hasDropDown && (
              <div className="t-expand-all" onClick={toggleAllRows}>
                <span>
                  {expandedRows?.length === records?.length ? "-" : "+"}
                </span>
              </div>
            )}
            {records?.length > 0 &&
              <div className="t-export-container">
                <img
                  src={downloadVector}
                  alt="download-file-svg"
                  onClick={toggleExportDropDown}
                />
                {openDownloadDropDown && (
                  <div className="t-export-drop-down">
                    <p onClick={() => jsonDownloadFn(tableData)}>JSON</p>
                    <p onClick={() => csvDownloadFn(tableData)}>CSV</p>
                    <p onClick={() => xlsxDownloadFn(tableData)}>XLSX</p>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
        <div className="t-table-wrapper">
          <table className="t-table">
            <thead className="t-tableHeader">
              <tr className="t-tableRowHead">
                {tableHeader?.map((header, index) => {
                  const isNumeric = typeof tableData[0][header] === "number" && header !== "S.No";
                  const isMonetary = /sales|amount|price/i.test(header);
                  const currencySymbol = countryCode === "US" ? "$" : "₹";
                  return (
                    <th
                      className={`t-header ${isNumeric ? "t-align-right" : "t-align-left"
                        }`}
                      key={index}
                      onClick={() => handleSort(header)}
                    >
                      {camelCaseToSpaceSeparated(header)}
                      {isMonetary && ` (${currencySymbol})`} {/* Add the dynamic currency symbol */}
                      <span className="t-sort-icon">
                        {sortConfig.key === header &&
                          sortConfig.direction === "ascending"
                          ? "🔽"
                          : "🔼"}
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            {tabledataLoading ? (
              <div className="reports-table-loader"></div>
            ) : records?.length > 0 ? (
              <tbody className="t-tableBody">
                {records.map((row: Row, rowIndex: number) => (
                  <React.Fragment key={rowIndex}>
                    <tr
                      className="t-mainRow"
                      onClick={() => toggleRowExpansion(rowIndex)}
                    >
                      {tableHeader.map((header, cellIndex) => (
                        <td
                          className={`t-tableCell ${header === "S.No"
                              ? "t-align-left"
                              : typeof row[header] === "number"
                                ? "t-align-right"
                                : ""
                            }`}
                          key={cellIndex}
                        >
                          {Array.isArray(row[header]) ? (
                            formatItemDetails(row[header])
                          ) : (
                            row[header] === null || row[header] === "" ? "-" : row[header]
                          )}
                        </td>
                      ))}
                    </tr>
                    {expandedRows.includes(rowIndex) && row["drop down"] && (
                      <tr className="t-expandedRow">
                        <td colSpan={tableHeader.length}>
                          <table className="t-nestedTable">
                            <thead>
                              <tr>
                                {Object.keys(row["drop down"][0]).map(
                                  (nestedHeader, nestedIndex) => (
                                    <th
                                      key={nestedIndex}
                                      className="t-nestedHeader"
                                    >
                                      {nestedHeader}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {row["drop down"].map(
                                (nestedRow: NestedRow, nestedRowIndex: number) => (
                                  <tr key={nestedRowIndex}>
                                    {Object.values(nestedRow).map(
                                      (nestedValue, nestedValueIndex) => (
                                        <td key={nestedValueIndex}>
                                          {nestedValue ? nestedValue : "NA"}
                                        </td>
                                      )
                                    )}
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            ) : (
              <div className="r-table-no-data">No Data Found!</div>
            )}
          </table>
        </div>
        {records?.length > 0 &&
          <div className="t-paginationCursor">
            <ul className="t-pagenationContainer">
              {currentPage > 1 && (
                <li className="t-page-item">
                  {isDarkTheme ? (
                    <img
                      className="t-leftArrow"
                      src={blackarrow}
                      alt="previous"
                      onClick={prePage}
                    />
                  ) : (
                    <img
                      className="t-leftArrow"
                      src={arrow}
                      alt="previous"
                      onClick={prePage}
                    />
                  )}
                </li>
              )}
              <li>
                Page {currentPage} of {totalpageNo}
              </li>
              {currentPage < totalpageNo && (
                <li className="t-page-item">
                  {isDarkTheme ? (
                    <img
                      className="t-rightArrow"
                      src={blackarrow}
                      alt="next"
                      onClick={nextPage}
                    />
                  ) : (
                    <img
                      className="t-rightArrow"
                      src={arrow}
                      alt="next"
                      onClick={nextPage}
                    />
                  )}
                </li>
              )}
            </ul>
          </div>}
      </div>
    </>
  );
};

export default Table;
