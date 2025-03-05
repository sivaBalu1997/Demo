import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as TableDownloadOptionsIcon } from "../../../assets/svg/r-options-table.svg";
import { ReactComponent as PdfDownloadIconUnselected } from "../../../assets/svg/r-pdf-unselected.svg";
import { ReactComponent as PdfDownloadIconSelected } from "../../../assets/svg/r-pdf-selected.svg";
import { ReactComponent as JsonDownloadIconUnselected } from "../../../assets/svg/r-json-unselected.svg";
import { ReactComponent as JsonDownloadIconSelected } from "../../../assets/svg/r-json-selected.svg";
import { ReactComponent as CsvDownloadIconUnselected } from "../../../assets/svg/r-csv-unselected.svg";
import { ReactComponent as CsvDownloadIconSelected } from "../../../assets/svg/r-csv-selected.svg";
import { ReactComponent as XlsxDownloadIconUnSelected } from "../../../assets/svg/r-xls-unselected.svg";
import { ReactComponent as XlsxDownloadIconSelected } from "../../../assets/svg/r-xls-selected.svg";
import { ReactComponent as DownloadBtn } from "../../../assets/svg/r-download-button-icon.svg";
import exportFromJSON from 'export-from-json';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import "./style.scss";

interface DownloadReportProps {
    tableData: Array<Record<string, any>>;
    headerData?: Array<{ key: string; label: string }>;
    kpiTitle: string;
    downloadRef?: React.RefObject<HTMLDivElement>;
}

const DownloadReport: React.FC<DownloadReportProps> = ({ tableData, headerData, kpiTitle, downloadRef }) => {
    const [showDownloadables, setShowDownloadables] = useState<boolean>(false)
    const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

    const generatePdfFromRef = async () => {
        if (downloadRef?.current) {
            const element = downloadRef.current;
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            const imgWidth = 190; // Adjust width to fit A4
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

            pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
            pdf.save(`${kpiTitle}.pdf`);
        }
    };

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

    const pdfDownloadFn = (data: Array<Record<string, any>>, headers?: Array<{ key: string; label: string }>) => {
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
                setSelectedFormat(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleDownload = () => {
        if (downloadRef?.current && selectedFormat === "pdf") {
            generatePdfFromRef(); // Invoke if downloadRef is present
        } else if (selectedFormat === "pdf") {
            pdfDownloadFn(tableData, headerData);
        } else if (selectedFormat === "json") {
            jsonDownloadFn(tableData);
        } else if (selectedFormat === "csv") {
            csvDownloadFn(tableData);
        } else if (selectedFormat === "xlsx") {
            xlsxDownloadFn(tableData);
        }
        setShowDownloadables(false);
        setSelectedFormat(null);
    };

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
                <div className="table-download-options-pop-over" ref={downloadPopoverRef} data-html2canvas-ignore="true">
                    <p className="pop-over-title">{kpiTitle || "Downloadables"}</p>
                    <div className="formats-container">
                        <div className="download-icon-with-title" onClick={(e) => { e.stopPropagation(); setSelectedFormat("pdf"); }}>
                            {selectedFormat === "pdf" ? <PdfDownloadIconSelected /> : <PdfDownloadIconUnselected />}
                            <p style={{ color: selectedFormat === "pdf" ? "#595959" : "#6F6F6F", fontWeight: selectedFormat === "pdf" ? "500" : "400" }}>.PDF</p>
                        </div>
                        <div className="download-icon-with-title" onClick={(e) => { e.stopPropagation(); setSelectedFormat("json"); }}>
                            {selectedFormat === "json" ? <JsonDownloadIconSelected /> : <JsonDownloadIconUnselected />}
                            <p style={{ color: selectedFormat === "json" ? "#595959" : "#6F6F6F", fontWeight: selectedFormat === "json" ? "500" : "400" }}>.JSON</p>
                        </div>
                        <div className="download-icon-with-title" onClick={(e) => { e.stopPropagation(); setSelectedFormat("csv"); }}>
                            {selectedFormat === "csv" ? <CsvDownloadIconSelected /> : <CsvDownloadIconUnselected />}
                            <p style={{ color: selectedFormat === "csv" ? "#595959" : "#6F6F6F", fontWeight: selectedFormat === "csv" ? "500" : "400" }}>.CSV</p>
                        </div>
                        <div className="download-icon-with-title" onClick={(e) => { e.stopPropagation(); setSelectedFormat("xlsx"); }}>
                            {selectedFormat === "xlsx" ? <XlsxDownloadIconSelected /> : < XlsxDownloadIconUnSelected />}
                            <p style={{ color: selectedFormat === "xlsx" ? "#595959" : "#6F6F6F", fontWeight: selectedFormat === "xlsx" ? "500" : "400" }}>.XLSX</p>
                        </div>
                    </div>
                    <button
                        className={`download-btn ${!selectedFormat ? "disabled" : ""}`}
                        onClick={handleDownload}
                        disabled={!selectedFormat}
                    >
                        <DownloadBtn /> Download
                    </button>
                </div>
            )}
        </div>
    )
}

export default DownloadReport
