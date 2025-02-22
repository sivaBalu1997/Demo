import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as TableDownloadOptionsIcon } from "../../../assets/svg/r-options-table.svg";
import { ReactComponent as PdfDownloadIcon } from "../../../assets/svg/r-pdf-download-option-icon.svg";
import { ReactComponent as JsonDownloadIcon } from "../../../assets/svg/r-json-download-option-icon.svg";
import { ReactComponent as CsvDownloadIcon } from "../../../assets/svg/r-csv-download-option-icon.svg";
import { ReactComponent as DownloadBtn } from "../../../assets/svg/r-download-button-icon.svg";
import "./style.scss";
import exportFromJSON from 'export-from-json';
import jsPDF from 'jspdf';

interface DownloadReportProps {
    tableData: Array<Record<string, any>>;
    headerData: Array<{ key: string; label: string }>;
    kpiTitle: string;
}

const DownloadReport: React.FC<DownloadReportProps> = ({ tableData, headerData, kpiTitle }) => {
    const [showDownloadables, setShowDownloadables] = useState<boolean>(false)
    // console.log("1111", { showDownloadables })

    const csvDownloadFn = (data: Array<Record<string, any>>) => {
        const fileName = kpiTitle;
        const exportType = exportFromJSON.types.csv;
        exportFromJSON({ data, fileName, exportType });
    };

    const jsonDownloadFn = (data: Array<Record<string, any>>) => {
        const fileName = kpiTitle;
        const exportType = exportFromJSON.types.json;
        exportFromJSON({ data, fileName, exportType });
    };

    const xlsxDownloadFn = (data: Array<Record<string, any>>) => {
        const fileName = kpiTitle;
        const exportType = exportFromJSON.types.xls;
        exportFromJSON({ data, fileName, exportType });
    };

    const pdfDownloadFn = (data: Array<Record<string, any>>, headers: Array<{ key: string; label: string }>) => {
        const doc = new jsPDF();
        doc.text(kpiTitle, 14, 10); // Title at the top

        // Prepare the table data
        const tableColumnHeaders = headers && headers?.map(header => header.label);
        const tableRows = data && data?.map(row => headers?.map(header => row[header.key] || ""));

        // Add the table using autoTable
        (doc as any).autoTable({
            head: [tableColumnHeaders],
            body: tableRows,
            startY: 20,
        });

        // Save the PDF
        doc.save(`${kpiTitle}.pdf`);
    };

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
    return (
        <div className="table-download-options-container">
            <TableDownloadOptionsIcon
                className="table-download-options"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowDownloadables((val) => !val);
                }}
            />
            {showDownloadables && (
                <div className="table-download-options-pop-over" ref={downloadPopoverRef}>
                    <p className="pop-over-title">Total sales overview</p>
                    <div className="formats-container">
                        <div className="download-icon-with-title">
                            <PdfDownloadIcon onClick={() => pdfDownloadFn(tableData, headerData)} />
                            <p>.PDF</p>
                        </div>
                        <div className="download-icon-with-title">
                            <JsonDownloadIcon onClick={() => jsonDownloadFn(tableData)} />
                            <p>.JSON</p>
                        </div>
                        <div className="download-icon-with-title">
                            <CsvDownloadIcon onClick={() => csvDownloadFn(tableData)} />
                            <p>.CSV</p>
                        </div>
                    </div>
                    <button className='download-btn'><DownloadBtn />Download</button>
                </div>
            )}
        </div>
    )
}

export default DownloadReport
