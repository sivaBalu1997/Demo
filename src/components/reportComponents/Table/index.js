import React, { useContext, useState } from "react";
import arrow from "../../../assets/images/san.svg";
import blackarrow from "../../../assets/svg/blacksan.svg";
import exportFromJSON from "export-from-json";
import downloadVector from "../../../assets/svg/download-svg-2.svg";
import { ThemeContext } from "../../../helpers/context/ThemeContext";
import "./style.scss";

const Table = ({ tableData, viewType, recordsPerPage = 10, Heading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [expandedRows, setExpandedRows] = useState([]); // Track expanded rows
  const {isDarkTheme}  = useContext(ThemeContext);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig?.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = Array.isArray(tableData)
    ? [...tableData]?.sort((a, b) => {
        if (sortConfig?.key) {
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

  const records = sortedData?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(sortedData?.length / recordsPerPage);

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
    tableData && tableData?.length > 0
      ? Object.keys(tableData[0])?.filter((header) => header !== "drop down")
      : [];

  const formatItemDetails = (details) => {
    return details
      ?.map((item) => `${item?.itemName} x${item?.quantity}`)
      .join(", ");
  };

  const toggleRowExpansion = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((row) => row !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const csvDownloadFn = (data) => {
    const fileName = Heading;
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const jsonDownloadFn = (data) => {
    const fileName = Heading;
    const exportType = exportFromJSON.types.json;
    exportFromJSON({ data, fileName, exportType });
  };

  const xlsxDownloadFn = (data) => {
    const fileName = Heading;
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const [openDownloadDropDown, setOpenDownloadDropDown] = useState(false);

  const toggleExportDropDown = () => {
    setOpenDownloadDropDown((op) => !op);
  };

  return (
    <>
      <div
        className={`pagination ${viewType === "half" ? "half-width" : ""} ${
          isDarkTheme ? "dark-theme" : "light-theme"
        }`}
      >
        <div className="table-head">
          <h3>{Heading}</h3>
          <div className="export-container">
            <img
              src={downloadVector}
              alt="download-file-svg"
              onClick={toggleExportDropDown}
            />
            {openDownloadDropDown && (
              <div className="export-drop-down">
                <p onClick={() => jsonDownloadFn(tableData)}>JSON</p>
                <p onClick={() => csvDownloadFn(tableData)}>CSV</p>
                <p onClick={() => xlsxDownloadFn(tableData)}>XLSX</p>
              </div>
            )}
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead className="tableHeader">
              <tr>
                {tableHeader?.map((header, index) => {
                  const isNumeric = typeof tableData[0][header] === "number";
                  return (
                    <th
                      className={`header ${
                        isNumeric ? "align-right" : "align-left"
                      }`}
                      key={index}
                      onClick={() => handleSort(header)}
                    >
                      {header}
                      <span className="sort-icon">
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
            <tbody className="tableBody">
              {records?.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr
                    className="mainRow"
                    onClick={() => toggleRowExpansion(rowIndex)}
                  >
                    {tableHeader.map((header, cellIndex) => (
                      <td
                        className={`tableCell ${
                          typeof row[header] === "number" ? "align-right" : ""
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
                    <tr className="expandedRow">
                      <td colSpan={tableHeader.length}>
                        <table className="nestedTable">
                          <thead>
                            <tr>
                              {Object.keys(row["drop down"][0]).map(
                                (nestedHeader, nestedIndex) => (
                                  <th
                                    key={nestedIndex}
                                    className="nestedHeader"
                                  >
                                    {nestedHeader}
                                  </th>
                                )
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {row["drop down"].map(
                              (nestedRow, nestedRowIndex) => (
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
        <div className="paginationCursor">
          <ul className="pagenationContainer">
            {currentPage > 1 && (
              <li className="page-item">
                {isDarkTheme ? (
                  <img
                    className="leftArrow"
                    src={blackarrow}
                    alt="previous"
                    onClick={prePage}
                  />
                ) : (
                  <img
                    className="leftArrow"
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
              <li className="page-item">
                {isDarkTheme ? (
                  <img src={blackarrow} alt="next" onClick={nextPage} />
                ) : (
                  <img src={arrow} alt="next" onClick={nextPage} />
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
