import React, { useState, useMemo, useEffect } from 'react';
import { ReactComponent as SearchIcon } from "../../../assets/svg/r-search-icon.svg";
import { ReactComponent as SortIcon } from "../../../assets/svg/r-sort-icon.svg"
import { ReactComponent as ArrowLeft } from "../../../assets/svg/r-arrow-left.svg"
import { ReactComponent as ArrowRight } from "../../../assets/svg/r-arrow-right.svg"
import { NewTableProps } from 'interface/newReportsInterface';
import ReactPaginate from 'react-paginate';
import './style.scss';
import TableShimmer from './NewShimmerTable';

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
    loader,
    setLoader
}) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: null });


    const handleSort = (key: string) => {
        let direction: SortConfig['direction'] = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        else if (sortConfig.key === key && sortConfig.direction === 'desc') direction = null;
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        if (!sortConfig.direction || !sortConfig.key) return tableData;
        return [...tableData].sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
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
        const startIndex = (currentPage - 1) * rowsPerPage;
        return filteredData && filteredData?.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredData, currentPage, rowsPerPage]);

    // useEffect(() => {
    //     // Simulate data fetching
    //     setTimeout(() => {
    //         setLoader(false);  // Data has loaded
    //     }, 2000);
    // }, []);

    return (
        loader ? (  // If loading, show shimmer
            <TableShimmer />
        ) : (  // Once loader is false, render the table
            <div className="new-table-container">
                <div className="table-header">
                    <h2 className="table-title">{kpiTitle}</h2>
                    <div className="search-container">
                        <SearchIcon className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={e => onSearchChange(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="table-wrapper">
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
                            {paginatedData && paginatedData?.map((row, index) => (
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
                </div>

                <div className="table-footer">
                    <div className="page-info">Page {currentPage}/{totalPages}</div>
                    <ReactPaginate
                        previousLabel={<ArrowLeft className="arrow-icon" />}
                        nextLabel={<ArrowRight className="arrow-icon" />}
                        breakLabel="..."
                        pageCount={totalPages}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={(event: { selected: number }) => onPageChange(event.selected + 1)}
                        containerClassName="pagination"
                        activeClassName="active"
                        disabledClassName="disabled"
                        previousClassName="prev-button"
                        nextClassName="next-button"
                    />
                </div>
            </div>
        )
    );
};


export default NewTable;
