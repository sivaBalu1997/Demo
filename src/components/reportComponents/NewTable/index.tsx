import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ReactComponent as SearchIcon } from "../../../assets/svg/r-search-icon.svg";
import { ReactComponent as SortIcon } from "../../../assets/svg/r-sort-icon.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/r-arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/r-arrow-right.svg";
import { ReactComponent as ClearSearchIcon } from "../../../assets/svg/r-clear-search-icon-x.svg";
import { ReactComponent as NoResultsFoundStampIcon } from "../../../assets/svg/r-sad-no-results-found-stamp.svg";
import { ReactComponent as NoOrdersFoundStampIcon } from "../../../assets/svg/r-no-orders-found-today-bag.svg";
import { ReactComponent as WalkinIcon } from "../../../assets/svg/r-walk-in-icon.svg";
import DeliveryIcon from "../../../assets/svg/r-delivery-icon.svg";
import { ReactComponent as PickUpIcon } from "../../../assets/svg/r-pick-up-icon.svg";
import { ReactComponent as GrubhubIcon } from "../../../assets/svg/r-grubhub-icon.svg";
import { NewTableProps } from 'interface/newReportsInterface';
import ReactPaginate from 'react-paginate';
import TableShimmer from './NewShimmerTable';
import exportFromJSON from "export-from-json";
import jsPDF from 'jspdf';
import "jspdf-autotable";
import './style.scss';
import DownloadReport from '../DownloadReports';

interface SortConfig {
    key: string;
    direction: 'asc' | 'desc' | null;
}

const NewTable: React.FC<NewTableProps> = ({
    kpiTitle,
    searchQuery,
    onSearchChange,
    headerData,
    tableData,
    currentPage,
    totalPages,
    onPageChange,
    rowsPerPage,
    setRowsPerPage,
    loader,
    // setLoader,
    count,
    searchPlaceHolder,
    onSearch,
}) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });

    const [initialLoader, setInitialLoader] = useState(true);
    const [tableLoader, setTableLoader] = useState(false);
    const [searchFlag, setSearchFlag] = useState(false)

    // console.log("9999", { tableData })

    useEffect(() => {
        if (loader) {
            if (searchFlag) {
                setTableLoader(true)
            } else {
                setInitialLoader(true)
            }
        } else {
            setTableLoader(false)
            setInitialLoader(false)
        }
    }, [loader]);



    const handleSort = (key: string) => {
        let direction: SortConfig['direction'] = 'asc';
        if (sortConfig?.key === key && sortConfig?.direction === 'asc') direction = 'desc';
        else if (sortConfig?.key === key && sortConfig?.direction === 'desc') direction = null;
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        if (!tableData || tableData?.length === 0) return [];
        if (!sortConfig?.direction || !sortConfig?.key) return tableData;
        return [...tableData]?.sort((a, b) => {
            const aValue = a[sortConfig?.key];
            const bValue = b[sortConfig?.key];
            if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [tableData, sortConfig]);

    const filteredData = useMemo(() => {
        if (!searchQuery) return sortedData;
        return sortedData && sortedData?.filter(row =>
            Object.values(row).some(value => String(value).toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [sortedData, searchQuery]);

    const paginatedData = useMemo(() => {
        return filteredData
    }, [filteredData, currentPage, rowsPerPage]);

    // console.log("9999", { paginatedData })


    const [showDownloadables, setShowDownloadables] = useState<boolean>(false)
    // console.log("1111", { showDownloadables })


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

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
        onSearch(event.target.value, kpiTitle);
        setSearchFlag(true)
    };

    // const getClassName = (rowvalue: string) => {
    //     if (rowvalue === 'In Queue') {
    //         return 'bubble-text-blue-one'
    //     } else if (rowvalue === 'Accepted') {
    //         return 'bubble-text-blue-two'
    //     } else if (rowvalue === 'In Progress') {
    //         return 'bubble-text-orange-one'
    //     } else if (rowvalue === 'KOT Ready') {
    //         return 'bubble-text-brown-one'
    //     } else if (rowvalue === 'Order Ready') {
    //         return 'bubble-text-green-one'
    //     } else if (rowvalue === 'In Delivery') {
    //         return 'bubble-text-light-green-one'
    //     }
    // }

    const getClassName = (rowvalue: string) => {
        if (rowvalue === 'D3') {
            return 'bubble-text-blue-one'
        } else if (rowvalue === 'D30') {
            return 'bubble-text-blue-two'
        } else if (rowvalue === 'D5') {
            return 'bubble-text-orange-one'
        } else if (rowvalue === 'D6') {
            return 'bubble-text-brown-one'
        } else if (rowvalue === 'D8') {
            return 'bubble-text-green-one'
        } else if (rowvalue === 'In Delivery') {
            return 'bubble-text-light-green-one'
        }
    }

    // const getOrderChannelIcons = (rowvalue: string) => {
    //     if (rowvalue === 'Walkin') {
    //         return <WalkinIcon />
    //     } else if (rowvalue === 'Delivery') {
    //         return <DeliveryIcon />
    //     } else if (rowvalue === 'Pick-up') {
    //         return <PickUpIcon />
    //     } else if (rowvalue === 'GrubHub') {
    //         return <GrubhubIcon />
    //     }
    // }

    const getOrderChannelIcons = (rowvalue: string) => {
        if (rowvalue === 'D3') {
            return <WalkinIcon />
        } else if (rowvalue === 'D30') {
            return <DeliveryIcon />
        } else if (rowvalue === 'D5') {
            return <PickUpIcon />
        } else if (rowvalue === 'D6') {
            return <GrubhubIcon />
        }
    }

    const getDynamicClassNames = (rowvalue: string, headerValue: string) => {
        if (headerValue === "Order Status") {
            if (rowvalue === 'D3') {
                return 'bubble-text-blue-one'
            } else if (rowvalue === 'D30') {
                return 'bubble-text-blue-two'
            } else if (rowvalue === 'D5') {
                return 'bubble-text-orange-one'
            } else if (rowvalue === 'D6') {
                return 'bubble-text-brown-one'
            } else if (rowvalue === 'D8') {
                return 'bubble-text-green-one'
            } else if (rowvalue === 'In Delivery') {
                return 'bubble-text-light-green-one'
            }
        } else if (headerValue === "Table Name") {
            return 'rep-order-channel'
        }
    }


    return (
        initialLoader ? (
            <TableShimmer />
        ) :
            (
                <div className="new-table-container">
                    <div className="table-header">
                        <div className="table-title-with-count-container">
                            <h2 className="table-title">{kpiTitle}</h2>
                            {!!count && <p className='table-title-count'>{count}</p>}
                        </div>
                        <div className="table-search-with-download-opt-container">
                            <div className="search-container">
                                <SearchIcon className="search-icon" />
                                <input
                                    type="text"
                                    placeholder={searchPlaceHolder ? searchPlaceHolder : "Search..."}
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                    className="search-input"
                                />
                                <ClearSearchIcon className='clear-search-icon' onClick={() => onSearchChange('')} />
                            </div>
                            {tableData && headerData && <DownloadReport tableData={tableData} headerData={headerData} kpiTitle={kpiTitle} />}
                        </div>
                    </div>

                    <div className="table-wrapper">
                        {/* Case 1: No data available at all */}
                        {!tableLoader && !initialLoader && (!tableData || tableData.length === 0) ? (
                            <div className="no-results-container">
                                <NoOrdersFoundStampIcon />
                                <p className="no-results-text">No Orders Found</p>
                            </div>
                        ) : !tableLoader && !initialLoader && (searchQuery && filteredData?.length === 0) ? (
                            /* Case 2: User searched but no matching results */
                            <div className="no-results-container">
                                <NoResultsFoundStampIcon />
                                <p className="no-results-text">No results found for "{searchQuery}"</p>
                            </div>
                        ) : (
                            /* Case 3: Display the table if data is available */
                            <table>
                                <thead>
                                    <tr>
                                        {headerData?.map(header => (
                                            <th
                                                key={header?.key}
                                                style={{ textAlign: header?.alignment || "left" }}
                                                className={`${header?.isSortable ? 'sortable' : ''}`}
                                                onClick={() => header?.isSortable && handleSort(header?.key)}
                                            >
                                                <div className="header-content" style={{ display: "flex", justifyContent: header?.alignment }}>
                                                    <span>{header?.label}</span>
                                                    {header?.isSortable && (
                                                        <SortIcon className={`sort-icon ${sortConfig?.key === header?.key ? sortConfig?.direction : ''}`} />
                                                    )}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableLoader ? (
                                        // Shimmer Effect for Table Rows (only when search, pagination, row-limit changes)
                                        [...Array(rowsPerPage)].map((_, index) => (
                                            <tr key={index} className="skeleton-row">
                                                {headerData.map((header, i) => (
                                                    <td key={i}>
                                                        <div className="skeleton-box"></div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        // Actual Data Rendering
                                        paginatedData?.map((row, index) => (
                                            <tr key={index}>
                                                {headerData?.map(header => (
                                                    <td key={header?.key} style={{ textAlign: header?.alignment || 'left' }}><p className={getDynamicClassNames(row[header?.key], header?.label)}>{getOrderChannelIcons(row[header?.key])}{row[header?.key]}</p></td>
                                                ))}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>


                    {
                        tableData && <div className="table-footer">
                            {/* <div className="page-info">Page {currentPage}/{totalPages}</div> */}
                            <div className="results-per-page">
                                <span>Result per page:</span>
                                <div className="options">
                                    {[10, 20, 30]?.map((num) => (
                                        <button
                                            key={num}
                                            className={`option ${rowsPerPage === num ? "selected" : ""}`}
                                            onClick={() => setRowsPerPage(num)}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <ReactPaginate
                                previousLabel={<span className='pagination-label'><ArrowLeft className="arrow-icon" />{" "}Prev</span>}
                                nextLabel={<span className="pagination-label">Next{" "}<ArrowRight className="arrow-icon" /></span>}
                                breakLabel="..."
                                pageCount={totalPages}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={3}
                                forcePage={currentPage - 1}
                                onPageChange={(event: { selected: number }) => onPageChange(event.selected + 1)}
                                containerClassName="pagination"
                                activeClassName="active"
                                disabledClassName="disabled"
                                previousClassName="prev-button"
                                nextClassName="next-button"
                            />
                        </div>
                    }
                </div >
            )
    );
};


export default NewTable;
