import React, { useState, useMemo, useEffect, useRef } from "react";
import { ReactComponent as SearchIcon } from "../../../assets/svg/r-search-icon.svg";
import { ReactComponent as SortIcon } from "../../../assets/svg/r-sort-icon.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/r-arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/r-arrow-right.svg";
import { ReactComponent as ClearSearchIcon } from "../../../assets/svg/r-clear-search-icon-x.svg";
import { ReactComponent as NoResultsFoundStampIcon } from "../../../assets/svg/r-sad-no-results-found-stamp.svg";
import { ReactComponent as NoOrdersFoundStampIcon } from "../../../assets/svg/r-no-orders-found-today-bag.svg";
import { ReactComponent as WalkinIcon } from "../../../assets/svg/r-walk-in-icon.svg";
import { ReactComponent as DeliveryIcon } from "../../../assets/svg/r-delivery-icon.svg";
import { ReactComponent as PickUpIcon } from "../../../assets/svg/r-pick-up-icon.svg";
import { ReactComponent as GrubhubIcon } from "../../../assets/svg/r-grubhub-icon.svg";
import { NewTableProps } from "interface/newReportsInterface";
import { ReactComponent as OpenEyeIcon } from "../../../assets/svg/eye-on.svg";
import { ReactComponent as CloseEyeIcon } from "../../../assets/svg/eye-off.svg";
import { maskPhone } from "utils";
import ReactPaginate from "react-paginate";
import TableShimmer from "./NewShimmerTable";
import DownloadReport from "../DownloadReports";
import TableDateDropdown from "../TableDateDropdown";
import "jspdf-autotable";
import "./style.scss";
import CustomDropdown from "components/common/customDropdown";

interface SortConfig {
  key: string;
  direction: "asc" | "desc" | null;
}

const NewTable: React.FC<NewTableProps> = ({
  optionList,
  selectedOption,
  setOptions,
  isCustomOption,
  kpiTitle,
  searchQuery,
  headerData,
  tableData,
  currentPage,
  totalPages,
  onPageChange = () => {},
  rowsPerPage,
  setRowsPerPage,
  loader,
  // setLoader,
  count,
  searchPlaceHolder,
  onSearch,
  showDateDropDown = false,
  selectedDate,
  onDateSelect = () => {},
  showTableHeader = true,
  showPagination = true,
  rowNoWrap = false,
  showIcons = true,
  tableContainerClassName = "",
  totalElements = 0,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: null,
  });

  const [initialLoader, setInitialLoader] = useState(true);
  const [tableLoader, setTableLoader] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const [visibility, setVisibility] = useState<{ [key: number]: boolean }>({});

  const toggleVisibility = (rowIndex: number) => {
    setVisibility((prev: any) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  useEffect(() => {
    if (loader) {
      if (searchFlag) {
        setTableLoader(true);
      } else {
        setInitialLoader(true);
      }
    } else {
      setTableLoader(false);
      setInitialLoader(false);
    }
  }, [loader]);

  const handleSort = (key: string) => {
    let direction: SortConfig["direction"] = "asc";
    if (sortConfig?.key === key && sortConfig?.direction === "asc")
      direction = "desc";
    else if (sortConfig?.key === key && sortConfig?.direction === "desc")
      direction = null;
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!tableData || tableData?.length === 0) return [];
    if (!sortConfig?.direction || !sortConfig?.key) return tableData;
    return [...tableData]?.sort((a, b) => {
      const aValue = a[sortConfig?.key];
      const bValue = b[sortConfig?.key];
      if (aValue < bValue) return sortConfig?.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [tableData, sortConfig]);

  // const filteredData = useMemo(() => {
  //   if (!searchQuery) return sortedData;
  //   return (
  //     sortedData &&
  //     sortedData?.filter((row) =>
  //       Object.values(row).some((value) =>
  //         String(value).toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     )
  //   );
  // }, [sortedData, searchQuery]);

  const paginatedData = useMemo(() => {
    return sortedData;
  }, [sortedData, currentPage, rowsPerPage]);

  const [showDownloadables, setShowDownloadables] = useState<boolean>(false);

  const downloadPopoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Ensure that the click is not inside the popover or the button that toggles it
      if (
        downloadPopoverRef.current &&
        !downloadPopoverRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".table-download-options")
      ) {
        setShowDownloadables(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value, kpiTitle);
    setSearchFlag(true);
  };

  const getOrderChannelIcons = (rowvalue: string, headerKey?: string) => {
    if (headerKey != "orderType") {
      if (rowvalue === "Walkin" || rowvalue === "Instore") {
        return <WalkinIcon />;
      } else if (rowvalue === "Delivery") {
        return <DeliveryIcon />;
      } else if (rowvalue === "Pick-up" || rowvalue === "Pickup") {
        return <PickUpIcon />;
      } else if (rowvalue === "Grubhub") {
        return <GrubhubIcon />;
      }
    }
  };

  const getDynamicClassNames = (rowvalue: string, headerValue: string) => {
    if (headerValue === "Order Status") {
      if (rowvalue === "In Queue") {
        return " bubble bubble-text-blue-one";
      } else if (rowvalue === "Accepted" || rowvalue === "Order placed") {
        return " bubble bubble-text-blue-two";
      } else if (
        rowvalue === "In Progress" ||
        rowvalue === "Pre Order Placed"
      ) {
        return " bubble bubble-text-orange-one";
      } else if (rowvalue === "KOT Ready" || rowvalue === "Order in prep") {
        return " bubble bubble-text-brown-one";
      } else if (rowvalue === "Order Ready") {
        return " bubble bubble-text-green-one";
      } else if (rowvalue === "In Delivery") {
        return " bubble bubble-text-light-green-one";
      } else if (rowvalue == "Pre order placed") {
        return " bubble bubble-text-light-green-one";
      }
    } else if (headerValue === "Order Channel") {
      return " rep-order-channel";
    } else if (headerValue === "Status") {
      if (rowvalue === "queue") {
        return " bubble bubble-text-blue-one";
      } else if (rowvalue === "assigned") {
        return " bubble bubble-text-blue-two";
      } else if (
        rowvalue === "Cancelled" ||
        rowvalue === "cancelled" ||
        rowvalue === "Unavailable"
      ) {
        return " bubble bubble-text-orange-one";
      } else if (rowvalue === "LateShow" || rowvalue === "lateShow") {
        return " bubble bubble-text-brown-one";
      } else if (
        rowvalue === "Completed" ||
        rowvalue === "completed" ||
        rowvalue === "Available"
      ) {
        return " bubble bubble-text-green-one";
      } else if (rowvalue === "seated") {
        return " bubble bubble-text-light-green-one";
      } else if (rowvalue === "noshow") {
        return " bubble bubble-text-violet-one";
      }
    }
  };
  const handleDateSelect = (
    from: string | null,
    to: string | null,
    kpiTitleForCustomDateDropdown: string
  ) => {
    onDateSelect(from, to, kpiTitleForCustomDateDropdown);
    setSearchFlag(true);
  };
  return initialLoader ? (
    <TableShimmer />
  ) : (
    <div className={`new-table-container ${tableContainerClassName}`}>
      {showTableHeader && (
        <>
          {" "}
          <div className="table-header">
            <div className="table-title-with-count-container">
              <h2 className="table-title">{kpiTitle}</h2>
              {!!count && <p className="table-title-count">{totalElements}</p>}
            </div>
            <div className="table-header-position">
              {showDateDropDown && (
                <div className="table-date-dropdown-container">
                  {isCustomOption ? (
                    <CustomDropdown
                      value={selectedOption}
                      options={optionList || []}
                      onSelect={setOptions}
                      placeholder="Select Option"
                      className="table-date-dropdown"
                      disabled={false}
                      // controlClassName="dropdown-control"
                    />
                  ) : (
                    <TableDateDropdown
                      kpiTitleForCustomDateDropdown={kpiTitle}
                      onDateSelect={(from, to, kpiTitleForCustomDateDropdown) =>
                        handleDateSelect(
                          from,
                          to,
                          kpiTitleForCustomDateDropdown
                        )
                      }
                    />
                  )}
                </div>
              )}

              <div className="table-search-with-download-opt-container">
                <div className="search-container">
                  <SearchIcon className="search-icon" />
                  <input
                    type="text"
                    placeholder={
                      searchPlaceHolder ? searchPlaceHolder : "Search..."
                    }
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="search-input"
                  />
                  {searchQuery?.length > 0 && (
                    <ClearSearchIcon
                      className="clear-search-icon"
                      onClick={() => onSearch("", kpiTitle)}
                    />
                  )}
                </div>
                {tableData && headerData && (
                  <DownloadReport
                    tableData={tableData}
                    headerData={headerData}
                    kpiTitle={kpiTitle}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="table-header-small-screen">
            <div className="table-name-with-download-container">
              <div className="table-title-with-count-container-small-screen">
                <h2 className="table-title-small-screen">{kpiTitle}</h2>
                {!!count && (
                  <p className="table-title-count-small-screen">{count}</p>
                )}
                {showDateDropDown && (
                  <div className="table-date-dropdown-container-small-screen">
                    <TableDateDropdown
                      kpiTitleForCustomDateDropdown={kpiTitle}
                      onDateSelect={(from, to, kpiTitleForCustomDateDropdown) =>
                        onDateSelect(from, to, kpiTitleForCustomDateDropdown)
                      }
                    />
                  </div>
                )}
              </div>
              {tableData && headerData && (
                <DownloadReport
                  tableData={tableData}
                  headerData={headerData}
                  kpiTitle={kpiTitle}
                />
              )}
            </div>
            <div className="table-search-small-screen">
              <div className="search-container-small-screen">
                <SearchIcon className="search-icon-small-screen" />
                <input
                  type="text"
                  placeholder={
                    searchPlaceHolder ? searchPlaceHolder : "Search..."
                  }
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="search-input-small-screen"
                />
                {searchQuery?.length > 0 && <ClearSearchIcon
                  className="clear-search-icon-small-screen"
                  onClick={() => onSearch("", kpiTitle)}
                />}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="table-wrapper">
        {!tableLoader &&
        !initialLoader &&
        searchQuery &&
        (!tableData || tableData?.length === 0) ? (
          <div className="no-results-container">
            <NoResultsFoundStampIcon />
            <p className="no-results-text">
              No results found for "{searchQuery}"
            </p>
          </div>
        ) : !tableLoader &&
          !initialLoader &&
          (!tableData || tableData?.length === 0) ? (
          <div className="no-results-container">
            {/* Case 1: No data available at all */}
            <NoOrdersFoundStampIcon />
            <p className="no-results-text">No Orders Found</p>
          </div>
        ) : (
          /* Case 3: Display the table if data is available */
          <table>
            <thead>
              <tr>
                {headerData?.map((header: any) => (
                  <th
                    key={header?.key}
                    style={{ textAlign: header?.alignment || "left" }}
                    className={`${header?.isSortable ? "sortable" : ""}`}
                    onClick={() =>
                      header?.isSortable && handleSort(header?.key)
                    }
                  >
                    <div
                      className="header-content"
                      style={{
                        display: "flex",
                        justifyContent: header?.alignment,
                      }}
                    >
                      <span className="re-table-header-label">{header?.label}</span>
                      {header?.isSortable && (
                        <SortIcon
                          className={`sort-icon ${
                            sortConfig?.key === header?.key
                              ? sortConfig?.direction
                              : ""
                          }`}
                        />
                      )}
                      {header?.isPrivate && (
                        <span onClick={() => toggleVisibility(header.key)}>
                          {visibility[header.key] ? (
                            <OpenEyeIcon
                              className={`sort-icon`}
                              style={{ cursor: "pointer" }}
                            />
                          ) : (
                            <CloseEyeIcon
                              className={`sort-icon `}
                              style={{ cursor: "pointer" }}
                            />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableLoader
                ? // Shimmer Effect for Table Rows (only when search, pagination, row-limit changes)
                  [...Array(rowsPerPage)].map((_, index) => (
                    <tr key={index} className="skeleton-row">
                      {headerData.map((header: any, i: any) => (
                        <td key={i}>
                          <div className="skeleton-box"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                : // Actual Data Rendering
                  paginatedData?.map((row, index) => {
                    const rowStyle: any = {};
                    if (rowNoWrap) {
                      rowStyle.textWrap = "nowrap";
                    }
                    return (
                      <tr key={index} style={rowStyle}>
                        {headerData?.map((header: any) => {
                          const styles: any = {
                            textAlign: header?.alignment || "left",
                          };
                          if (row?.color) {
                            styles.color = row?.color;
                          }
                          return (
                            <td key={header?.key} style={styles}>
                              <div
                                className={getDynamicClassNames(
                                  row[header?.key],
                                  header?.label
                                )}
                              >
                                {showIcons
                                  ? getOrderChannelIcons(
                                      row[header?.key],
                                      header?.key
                                    )
                                  : ""}
                                {header?.prefix || ""}
                                {header?.isPrivate
                                  ? visibility[header.key]
                                    ? row[header?.key]
                                    : maskPhone(row[header?.key])
                                  : row[header?.key]}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        )}
      </div>

      {tableData &&
        tableData?.length !== 0 &&
        setRowsPerPage &&
        showPagination &&
        currentPage !== undefined &&
        totalPages !== undefined && (
          <div className="table-footer">
            {width < 600 ? (
              <div className="page-info">
                Page {currentPage}/{totalPages}
              </div>
            ) : (
              <div className="record-limit-total-elements-container">
                <div className="results-per-page">
                  <span>Result per page:</span>
                  <div className="options">
                    {[10, 20, 30]?.map((num) => (
                      <button
                        key={num}
                        className={`option ${
                          rowsPerPage === num ? "selected" : ""
                        }`}
                        onClick={() => setRowsPerPage(num)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <span className="total-elements">
                  {currentPage}-{rowsPerPage} of {totalElements}
                </span>
              </div>
            )}
            <ReactPaginate
              nextLabel={
                <button className="pagination-button prev-button">
                  {width > 600 && <span>Next</span>}
                  <ArrowRight className="arrow-icon" />
                </button>
              }
              pageLabelBuilder={(page: number) => (
                <button
                  className={`${
                    page == currentPage ? "active" : ""
                  } pagination-number-button`}
                >
                  {page}
                </button>
              )}
              onPageChange={(event: { selected: number }) => {
                onPageChange(event.selected + 1);
              }}
              pageCount={totalPages}
              previousLabel={
                <button className="pagination-button prev-button">
                  <ArrowLeft className="arrow-icon" />
                  {width > 600 && <span>Prev</span>}
                </button>
              }
              breakLabel="..."
              marginPagesDisplayed={1}
              pageRangeDisplayed={width > 600 ? 3 : 0}
              forcePage={currentPage - 1}
              containerClassName="pagination"
              activeClassName="active"
              disabledClassName="disabled"
            />
          </div>
        )}
    </div>
  );
};

export default NewTable;
