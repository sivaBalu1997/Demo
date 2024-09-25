import React, { useContext, useState } from "react";
import arrow from "../../../assets/images/san.svg";
import blackarrow from "../../../assets/svg/blacksan.svg";
import exportFromJSON from "export-from-json";
import downloadVector from "../../../assets/svg/download-svg-2.svg";
import { ThemeContext } from "../../../context/ThemeContext";
import "./style.scss";

interface TableProps {
  tableData: Array<Record<string, any>>;
  Heading: string;
  viewType: string;
  recordsPerPage: number;
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
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const { isDarkTheme } = useContext(ThemeContext) ?? { isDarkTheme: false };
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = Array.isArray(tableData)
    ? [...tableData].sort((a: Row, b: Row) => {
        if (sortConfig.key) {
          const aValue = a[sortConfig.key];
          const bValue = b[sortConfig.key];

          if (typeof aValue === "number" && typeof bValue === "number") {
            return sortConfig.direction === "ascending"
              ? aValue - bValue
              : bValue - aValue;
          }

          if (typeof aValue === "string" && typeof bValue === "string") {
            return sortConfig.direction === "ascending"
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }
        }
        return 0;
      })
    : [];

  const records = sortedData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(sortedData.length / recordsPerPage);

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const tableHeader =
    tableData.length > 0
      ? Object.keys(tableData[0]).filter((header) => header !== "drop down")
      : [];

  const formatItemDetails = (
    details: Array<{ itemName: string; quantity: number }>
  ) => {
    return details
      .map((item) => `${item.itemName} x${item.quantity}`)
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

  return (
    <>
      <div
        className={`t-report-pagination ${
          viewType === "half" ? "t-half-width" : ""
        } ${isDarkTheme ? "t-dark-theme" : "t-light-theme"}`}
      >
        <div className="t-table-head">
          <h3>{Heading}</h3>
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
        </div>
        <div className="t-table-wrapper">
          <table className="t-table">
            <thead className="t-tableHeader">
              <tr className="t-tableRowHead">
                {tableHeader.map((header, index) => {
                  const isNumeric = typeof tableData[0][header] === "number";
                  return (
                    <th
                      className={`t-header ${
                        isNumeric ? "t-align-right" : "t-align-left"
                      }`}
                      key={index}
                      onClick={() => handleSort(header)}
                    >
                      {header}
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
            <tbody className="t-tableBody">
              {records.map((row: Row, rowIndex: number) => (
                <React.Fragment key={rowIndex}>
                  <tr
                    className="t-mainRow"
                    onClick={() => toggleRowExpansion(rowIndex)}
                  >
                    {tableHeader.map((header, cellIndex) => (
                      <td
                        className={`t-tableCell ${
                          typeof row[header] === "number" ? "t-align-right" : ""
                        }`}
                        key={cellIndex}
                      >
                        {Array.isArray(row[header])
                          ? formatItemDetails(row[header])
                          : row[header]}
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
                              (
                                nestedRow: NestedRow,
                                nestedRowIndex: number
                              ) => (
                                <tr key={nestedRowIndex}>
                                  {Object.values(nestedRow).map(
                                    (nestedValue, nestedValueIndex) => (
                                      <td key={nestedValueIndex}>
                                        {nestedValue}
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
          </table>
        </div>
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
              Page {currentPage} of {nPage}
            </li>
            {currentPage < nPage && (
              <li className="t-page-item">
                {isDarkTheme ? (
                  <img
                    className="t-leftArrow"
                    src={blackarrow}
                    alt="next"
                    onClick={nextPage}
                  />
                ) : (
                  <img
                    className="t-leftArrow"
                    src={arrow}
                    alt="next"
                    onClick={nextPage}
                  />
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Table;
