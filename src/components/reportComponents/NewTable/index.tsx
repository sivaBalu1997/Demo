import React, { useState, useMemo, useEffect } from 'react';
import { ReactComponent as SearchIcon } from "../../../assets/svg/r-search-icon.svg";
import { ReactComponent as SortIcon } from "../../../assets/svg/r-sort-icon.svg";
import { ReactComponent as ArrowLeft } from "../../../assets/svg/r-arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/svg/r-arrow-right.svg";
import { ReactComponent as ClearSearchIcon } from "../../../assets/svg/r-clear-search-icon-x.svg";
import { ReactComponent as TableDownloadOptionsIcon } from "../../../assets/svg/r-options-table.svg";
import { ReactComponent as PdfDownloadIcon } from "../../../assets/svg/r-pdf-download-option-icon.svg";
import { ReactComponent as JsonDownloadIcon } from "../../../assets/svg/r-json-download-option-icon.svg";
import { ReactComponent as CsvDownloadIcon } from "../../../assets/svg/r-csv-download-option-icon.svg";
import { ReactComponent as DownloadBtn } from "../../../assets/svg/r-download-button-icon.svg";
import { ReactComponent as NoResultsFoundStampIcon } from "../../../assets/svg/r-sad-no-results-found-stamp.svg";
import { ReactComponent as NoOrdersFoundStampIcon } from "../../../assets/svg/r-no-orders-found-today-bag.svg"
import { NewTableProps } from 'interface/newReportsInterface';
import ReactPaginate from 'react-paginate';
import TableShimmer from './NewShimmerTable';
import './style.scss';

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
}) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });

    // const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    // console.log("9999", { tableData })

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

    // useEffect(() => {
    //     // Simulate data fetching
    //     setTimeout(() => {
    //         setLoader(false);  // Data has loaded
    //     }, 2000);
    // }, []);

    const [showDownloadables, setShowDownloadables] = useState<boolean>(false)
    console.log("1111", { showDownloadables })



    return (
        loader ? (
            <TableShimmer />
        ) : (
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
                                onChange={e => onSearchChange(e.target.value)}
                                className="search-input"
                            />
                            <ClearSearchIcon className='clear-search-icon' onClick={() => onSearchChange('')} />
                        </div>
                        <div className="table-download-options-container">
                            <TableDownloadOptionsIcon
                                className="table-download-options"
                                onClick={() => setShowDownloadables((val) => !val)}
                            />
                            {showDownloadables && (
                                <div className="table-download-options-pop-over">
                                    <p className="pop-over-title">Total sales overview</p>
                                    <div className="formats-container">
                                        <div className="download-icon-with-title">
                                            <PdfDownloadIcon />
                                            <p>.PDF</p>
                                        </div>
                                        <div className="download-icon-with-title">
                                            <JsonDownloadIcon />
                                            <p>.JSON</p>
                                        </div>
                                        <div className="download-icon-with-title">
                                            <CsvDownloadIcon />
                                            <p>.CSV</p>
                                        </div>
                                    </div>
                                    <button className='download-btn'><DownloadBtn />Download</button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <div className="table-wrapper">
                    {/* Case 1: No data available at all */}
                    {!tableData || tableData.length === 0 ? (
                        <div className="no-results-container">
                            <NoOrdersFoundStampIcon />
                            <p className="no-results-text">No Orders Found</p>
                        </div>
                    ) : searchQuery && filteredData.length === 0 ? (
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
                                            className={`table-header-cell align-${header?.alignment || 'left'} ${header?.isSortable ? 'sortable' : ''}`}
                                            onClick={() => header?.isSortable && handleSort(header?.key)}
                                        >
                                            <div className="header-content">
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
                                {paginatedData?.map((row, index) => (
                                    <tr key={index}>
                                        {headerData?.map(header => (
                                            <td key={header?.key} style={{ textAlign: header?.alignment || 'left' }}>
                                                {row[header?.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>


                {tableData && <div className="table-footer">
                    {/* <div className="page-info">Page {currentPage}/{totalPages}</div> */}
                    <div className="results-per-page">
                        <span>Result per page:</span>
                        <div className="options">
                            {[10, 15, 20, 30].map((num) => (
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
                        previousLabel={<ArrowLeft className="arrow-icon" />}
                        nextLabel={<ArrowRight className="arrow-icon" />}
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
                </div>}
            </div>
        )
    );
};


export default NewTable;
