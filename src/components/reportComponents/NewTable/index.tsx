import React, { useState, useMemo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
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
import { ReactComponent as UberEatsIcon } from "../../../assets/svg/UberEatsR.svg";
import { ReactComponent as DoordashIcon } from "../../../assets/svg/DoorDashIconR.svg";
import { ReactComponent as SwiggyIcon } from "../../../assets/svg/SwiggyIconR.svg";
import { ReactComponent as ZomatoIcon } from "../../../assets/svg/ZomatoIconR.svg";
import { ReactComponent as SeamlessIcon } from "../../../assets/svg/SeamlessIconR.svg";
import { ReactComponent as GloriaFoodIcon } from "../../../assets/svg/GloriaFoodIconR.svg";
import { NewTableProps } from "interface/newReportsInterface";
import { ReactComponent as OpenEyeIcon } from "../../../assets/svg/eye-on.svg";
import { ReactComponent as CloseEyeIcon } from "../../../assets/svg/eye-off.svg";
import { maskPhone } from "utils";
import ReactPaginate from "react-paginate";
import TableShimmer from "./NewShimmerTable";
import DownloadReport from "../DownloadReports";
import TableDateDropdown from "../TableDateDropdown";
import CustomDropdown from "components/common/customDropdown";
import "jspdf-autotable";
import "./style.scss";

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
  queryParams,
  apiEndPoint,
  searchQuery,
  headerData,
  tableData,
  currentPage,
  totalPages,
  onPageChange = () => { },
  rowsPerPage = 0,
  setRowsPerPage,
  loader,
  // setLoader,
  count,
  searchPlaceHolder,
  onSearch,
  showDateDropDown = false,
  selectedDate,
  onDateSelect = () => { },
  showTableHeader = true,
  showPagination = true,
  rowNoWrap = false,
  showIcons = true,
  tableContainerClassName = "",
  totalElements = 0,
  headers = [],
  tableRef=null,
  showRoundedStyleCount = false,
}) => {

  const getToTableHeaderRef = useRef<HTMLDivElement>(null)

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: null,
  });

  const [initialLoader, setInitialLoader] = useState(true);
  const [tableLoader, setTableLoader] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const [visibility, setVisibility] = useState<{ [key: number]: boolean }>({});
  const permissions = useSelector((state: RootState) => state.employee.permissions);


  const employeeAccess = useMemo(() => permissions?.find(
    (item: any) =>
      item?.module === "PORTAL" &&
      item?.funtions?.includes("Employee details")
  ), [permissions])
  const toggleVisibility = (e: React.MouseEvent<HTMLSpanElement>, rowIndex: number) => {
    e?.preventDefault()
    e?.stopPropagation()

    if (employeeAccess) {
      setVisibility((prev: any) => ({
        ...prev,
        [rowIndex]: !prev[rowIndex],
      }));
    }
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

  const handleSort = (key: string, isNum=false) => {

    let direction: SortConfig["direction"] = "asc";
    if (sortConfig?.key === key && sortConfig?.direction === "asc")
      direction = "desc";
    else if (sortConfig?.key === key && sortConfig?.direction === "desc")
      direction = "asc";
    setSortConfig({ key, direction });

  };

  const sortedData = useMemo(() => {
    if (!tableData || tableData?.length === 0) return [];
    if (!sortConfig?.direction || !sortConfig?.key) return tableData;

    return [...tableData].sort((a, b) => {
      const aValue = a?.[sortConfig?.key] ?? "";
      const bValue = b?.[sortConfig?.key] ?? "";
    
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig?.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
    
      // If not numbers, compare as strings
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
    
      if (aString < bString) return sortConfig?.direction === "asc" ? -1 : 1;
      if (aString > bString) return sortConfig?.direction === "asc" ? 1 : -1;
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
    if (headerKey === "orderChannel") {
      if (rowvalue === "Walkin" || rowvalue === "DineIn") {
        return <WalkinIcon />;
      } else if (rowvalue === "Delivery") {
        return <DeliveryIcon />;
      } else if (rowvalue === "Pickup" || rowvalue === "Instore" || rowvalue === "In-store") {
        return <PickUpIcon />;
      } else if (rowvalue === "Grubhub") {
        return <GrubhubIcon />;
      } else if (rowvalue === "UberEats" || rowvalue === "Uber Eats" || rowvalue === "Ubereats" || rowvalue === "ubereats" || rowvalue === "uberEats" || rowvalue === "Uber eats") {
        return <UberEatsIcon />;
      } else if (rowvalue === "DoorDash" || rowvalue === "doordash_pos") {
        return <DoordashIcon />;
      } else if (rowvalue === "Swiggy") {
        return <SwiggyIcon />;
      } else if (rowvalue === "Zomato") {
        return <ZomatoIcon />;
      } else if (rowvalue === "Seamless") {
        return <SeamlessIcon />;
      } else if (rowvalue === "GloriaFood") {
        return <GloriaFoodIcon />;
      } else {
        return <DeliveryIcon />;
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
      } else if (rowvalue === "Order Ready" || rowvalue === "Order Created") {
        return " bubble bubble-text-green-one";
      } else if (rowvalue === "Order Completed") {
        return " bubble bubble-text-dark-green";
      } else if (rowvalue === "In Delivery") {
        return " bubble bubble-text-light-green-one";
      } else if (rowvalue === "Pre order placed" || rowvalue === "Order Printed") {
        return " bubble bubble-text-light-green-one";
      } else if (rowvalue === "Payment Failed") {
        return " bubble bubble-text-pink-red";
      } else if (rowvalue === "Order Cancelled") {
        return " bubble bubble-text-pink-red";
      } else if (rowvalue === "Order Served") {
        return " bubble-text-diff-green";
      } else {
        return " bubble bubble-text-brown-one";
      }

    } else if (headerValue === "Order Channel") {

      return " rep-order-channel";
    } else if (headerValue === "Status") {
      if (rowvalue === "queue" || rowvalue === "Queue") {
        return " bubble bubble-text-blue-two";
      } else if (rowvalue === "assigned" || rowvalue === "Assigned") {
        return " bubble bubble-text-blue-one";
      } else if (
        rowvalue === "Unavailable"
      ) {
        return " bubble bubble-text-orange-one";
      } else if (rowvalue === "LateShow" || rowvalue === "lateShow") {
        return " bubble bubble-text-orange-one";
      } else if (
        rowvalue === "Available"
      ) {
        return " bubble bubble-text-green-one";
      } else if (rowvalue === "seated" || rowvalue === "Seated" || rowvalue === "Order Printed") {
        return " bubble bubble-text-light-green-one";
      } else if (rowvalue === "noshow") {
        return " bubble bubble-text-diff-orange-brown";
      } else if (rowvalue === "Cancelled" || rowvalue === "cancelled") {
        return "bubble bubble-text-brown-one"
      } else if (rowvalue === "Completed" || rowvalue === "completed") {
        return "bubble bubble-text-diff-green"
      } else if (rowvalue === "Order Cancelled") {
        return " bubble bubble-text-pink-red";
      } else if (rowvalue === "Order Served") {
        return " bubble-text-diff-green";
      } else {
        return " bubble bubble-text-brown-one";
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

  const formatMonetaryValue = (value: any): string => {
    // Return dash for any empty/invalid/special values
    if (value === '' ||
      value === '-' ||
      value === null ||
      value === undefined) {
      return '-';
    }

    // Handle numeric values
    const numValue = typeof value === 'number' ? value : Number(value);

    // Return dash if NaN, otherwise format the number
    return isNaN(numValue) ? '-' : numValue.toFixed(2);
  };

  const scrollToTableHeader = () => {
    if (getToTableHeaderRef?.current) {
      getToTableHeaderRef?.current?.scrollIntoView
      ({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }

  const handleRecordPerPageLimitChange = (e: React.MouseEvent<HTMLButtonElement>, num: number): void => {
    scrollToTableHeader()
    if (setRowsPerPage) {
      setRowsPerPage(num);
    }
    onPageChange(1);
  };

  return initialLoader ? (
    <TableShimmer  ref={tableRef} />
  ) : (
    <div className={`new-table-container ${tableContainerClassName}`}>
      {showTableHeader && (
        <>
          {" "}
          <div className="table-header" ref={getToTableHeaderRef}>
            <div className="table-title-with-count-container">
              <h2 className="table-title">{kpiTitle}</h2>
              {showRoundedStyleCount && tableData?.length > 0 && <p className="table-title-count">{totalElements}</p>}
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
                {(tableData || apiEndPoint) && headerData && (
                  <DownloadReport
                    employeeAccess={employeeAccess}
                    apiParams={{
                      apiEndPoint: apiEndPoint || "",
                      ...queryParams,
                      page: 1,
                      size: totalElements,
                      search: searchQuery,
                    }}
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
                {showRoundedStyleCount && tableData?.length > 0 && (
                  <p className="table-title-count-small-screen">{totalElements}</p>
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
              {(tableData || apiEndPoint) && headerData && (
                <DownloadReport

                  employeeAccess={employeeAccess} //TODO : change dynamic
                  apiParams={{
                    apiEndPoint: apiEndPoint || "",
                    ...queryParams,
                    page: 1,
                    size: totalElements,
                    search: searchQuery,
                  }}
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
                      header?.isSortable && handleSort(header?.key, header?.isNum)
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
                          className={`sort-icon ${sortConfig?.key === header?.key
                              ? sortConfig?.direction
                              : ""
                            }`}
                        />
                      )}
                      {header?.isPrivate && (
                        <span onClick={(e: React.MouseEvent<HTMLSpanElement>) => { toggleVisibility(e, header.key) }}>
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
                              {row[header?.key] ? header?.prefix : ""}
                              {header?.isPrivate
                                ? visibility[header.key]
                                  ? row[header?.key]
                                  : maskPhone(row[header?.key])
                                : header?.isMonetary
                                  ? formatMonetaryValue(row[header?.key])
                                  : row[header?.key]
                              }
                              {header?.suffix ? `${(row[header?.key] || row[header?.key] === 0) ? ` ${header?.suffix}` : ""}` : ""}
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
                        className={`option ${rowsPerPage === num ? "selected" : ""
                          }`}
                        onClick={(e) => handleRecordPerPageLimitChange(e,num)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <span className="total-elements">
                  {/* {currentPage}-{rowsPerPage} of {totalElements}  */}
                  {/* changed as per prod input */}
                  {(currentPage - 1) * Number(rowsPerPage) + 1}-{Number(rowsPerPage) * currentPage > totalElements ? totalElements : Number(rowsPerPage) * currentPage} of {totalElements}
                </span>
              </div>
            )}
            <ReactPaginate
              nextLabel={
                <button className="pagination-button prev-button" onClick={()=>scrollToTableHeader()}>
                  {width > 600 && <span>Next</span>}
                  <ArrowRight className="arrow-icon" />
                </button>
              }
              pageLabelBuilder={(page: number) => (
                <button
                  onClick={()=>scrollToTableHeader()}
                  className={`${page == currentPage ? "active" : ""
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
                <button className="pagination-button prev-button" 
                onClick={()=>scrollToTableHeader()}
                >
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
