import React, { useEffect, useRef, useState } from 'react';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
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
import exportFromJSON, { ExportType } from 'export-from-json';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import "./style.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadableReportRequest } from 'redux/newReports/newReportsActions';
import { RootState } from 'redux/rootReducer';
import DownloadShimmer from './DownloadShimmer';
import { NewTableHeader } from 'interface/newReportsInterface';

interface DownloadReportProps {
    tableData: Array<Record<string, any>>;
    apiParams?: Record<string, any>;
    // {
    //     limit: number;
    //     api:string;
    //     page:1;
    //     sortBy?: string;
    //     search?: string;
    //     locationId?: string;
    //     startDate?: string;
    //     endDate?: string;
    // }
    headerData?: Array<{ key: string; label: string }>;
    kpiTitle: string;
    downloadRef?: React.RefObject<HTMLDivElement>;
    employeeAccess?: boolean;
}

const DownloadReport: React.FC<DownloadReportProps> = ({ tableData = [], headerData = [], kpiTitle, downloadRef, apiParams, employeeAccess = false }) => {
    const [showDownloadables, setShowDownloadables] = useState<boolean>(false)
    const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
    const dataToDownload: any = useSelector((state: RootState) => state.newReports.downloadableReportSuccess)
    const dataToDownloadLoading = useSelector((state: RootState) => state.newReports.downloadableReportLoading)
    const dataToDownloadError = useSelector((state: RootState) => state.newReports.downloadableReportFailure)
    const dispatch = useDispatch()
    useEffect(() => {
        if (showDownloadables && apiParams?.apiEndPoint) {
            dispatch(getDownloadableReportRequest(apiParams))
        }

    }, [apiParams, showDownloadables])

    const toSentenceCase = (text: string) => {
        return text
            .replace(/([A-Z])/g, " $1") // Add space before capital letters
            .trim()                      // Remove extra spaces
            .toLowerCase()               // Convert to lowercase
            .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
    };

    const transformKeysToSentenceCase = (data: Array<Record<string, any>>) => {
        if (data.length === 0) return [];

        // Get original key order from the first object
        const originalKeys = Object.keys(data[0]);
        const transformedKeys = originalKeys.map(toSentenceCase);

        return data.map(obj => {
            const newObj: Record<string, any> = {};
            originalKeys.forEach((key, index) => {
                newObj[transformedKeys[index]] = obj[key]; // Maintain key order
            });
            return newObj;
        });
    };

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

    const generateDataOutput = (data: Array<Record<string, any>>, exportType: ExportType) => {
        let transformedData;
        const prefix = exportType === exportFromJSON.types.json ? "" : "=";
        if (exportType === "xls") {
            const fileType =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            transformedData = data.map(row => {
                const newRow: Record<string, any> = {};
                headerData.forEach(header => {
                    const value = row[header?.key];
                    if (
                        (header?.key === "customerNumber" || header?.key === "phone") && employeeAccess
                    ) {
                        newRow[header?.label] = value;
                    } else {
                        newRow[header?.label] = value;
                    }
                });
                return newRow;
            });
            const fileExtension = ".xlsx";

            const ws = XLSX.utils.json_to_sheet(transformedData);

            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

            const finalData = new Blob([excelBuffer], { type: fileType });

            FileSaver.saveAs(finalData, kpiTitle + fileExtension);


        } else {
            if (headerData?.length > 0) {
                transformedData = data.map(row => {
                    const newRow: Record<string, any> = {};
                    headerData.forEach(header => {
                        const value = row[header?.key];
                        // Force Excel to treat numeric-looking strings as text
                        const shouldWrapInFormula = typeof value === "string" && /^\d+$/.test(value);
                        if (
                            (header?.key === "customerNumber" || header?.key === "phone") && employeeAccess
                        ) {
                            newRow[header?.label] = `${prefix}"${value}"`;
                        } else if (shouldWrapInFormula) {
                            newRow[header?.label] = `${prefix}"${value}"`;
                        } else {
                            newRow[header?.label] = value;
                        }
                    });
                    return newRow;
                });
            } else {
                transformedData = data.map(row => {
                    const newRow: Record<string, any> = {};
                    Object.entries(row).forEach(([key, value]) => {
                        const shouldWrapInFormula = typeof value === "string" && /^\d+$/.test(value);

                        if (
                            (key === "customerNumber" || key === "phone") && employeeAccess
                        ) {
                            newRow[key] = `${prefix}"${value}"`;
                        } else if (shouldWrapInFormula) {
                            newRow[key] = `${prefix}"${value}"`;
                        } else {
                            newRow[key] = value;
                        }
                    });
                    return newRow;
                });
            }

            exportFromJSON({
                data: transformedData,
                fileName: kpiTitle,
                exportType,
            });
        }
    };

    // const csvDownloadFn = (data: Array<Record<string, any>>) => {
    //     const exportType = exportFromJSON.types.csv;

    //     const transformedData=data?.map((row) => {
    //         const newRow: Record<string, any> = {};
    //         Object.entries(row).forEach(([key, value]) => {
    //             if(key==="customerNumber"||key==="email"){
    //                 if(employeeAccess) newRow[key] = `="${value}"`;
    //             }else{

    //                 newRow[key] = `="${value}"`;
    //             }
    //     });
    //     return newRow;
    // })

    // };

    // const jsonDownloadFn = (data: Array<Record<string, any>>, headers:NewTableHeader[]) => {
    //     const fileName = kpiTitle;
    //     const exportType = exportFromJSON.types.json;
    //     if(headers?.length>0){
    //         return newRow;
    //     }else{


    // })
    //     exportFromJSON({ data:transformedData, fileName, exportType });
    // };

    // const xlsxDownloadFn = (data: Array<Record<string, any>>) => {
    //     const fileName = kpiTitle;
    //     const exportType = exportFromJSON.types.xls;

    //     // First transform the data to sentence case
    //     const transformedData = transformKeysToSentenceCase(data).map(row => {
    //         const newRow: Record<string, any> = {};
    //         Object.entries(row).forEach(([key, value]) => {
    //             if(key==="customerNumber"||key==="email"){
    //                 if(employeeAccess) newRow[key] = `="${value}"`;
    //             }else{


    //             // If value is a string containing only numbers and starts with 0, format it as text
    //             if (typeof value === 'string' && /^\d+$/.test(value) && value.startsWith('0')) {
    //                 // Format as text by adding ="value" which Excel will interpret correctly
    //                 newRow[key] = `="${value}"`;
    //             } else {
    //                 newRow[key] = `="${value}"`
    //             }
    //         }
    //         });
    //         return newRow;
    //     });

    //     exportFromJSON({ data: transformedData, fileName, exportType });

    // };

    const pdfDownloadFn = (data: Array<Record<string, any>>, headers?: Array<{ key: string; label: string }>) => {


        const doc = new jsPDF();
        doc.text(kpiTitle, 14, 10); // Title at the top
        let headerData = headers;
        if (!headerData?.length && data?.length > 0) {
            headerData = Object.keys(data[0]).map(key => ({
                key,
                label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
            }));
        }

        // Prepare the table data
        const tableColumnHeaders = headerData && headerData?.map((header) => {
            if (header?.key === "customerNumber" || header?.key === "email") {
                if (employeeAccess) return header.label;
            } else {
                return header.label
            }
        });
        const tableRows = data && data?.map(row => headerData?.map(header => {
            if (header?.key === "customerNumber" || header?.key === "email") {
                if (employeeAccess) return row[header.key] || ""
            } else {
                return row[header.key] ?? ""
            }

        }));

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
        // if (downloadRef?.current && selectedFormat === "pdf") { //TODO:Remove
        //     generatePdfFromRef(); // Invoke if downloadRef is present
        // }else


        if (selectedFormat === "pdf") {
            pdfDownloadFn(apiParams?.apiEndPoint ? dataToDownload?.content : tableData, headerData);
        } else if (selectedFormat === "json") {
            generateDataOutput(apiParams?.apiEndPoint ? dataToDownload?.content : tableData, exportFromJSON.types.json);
        } else if (selectedFormat === "csv") {
            generateDataOutput(apiParams?.apiEndPoint ? dataToDownload?.content : tableData, exportFromJSON.types.csv);
        } else if (selectedFormat === "xlsx") {
            generateDataOutput(apiParams?.apiEndPoint ? dataToDownload?.content : tableData, exportFromJSON.types.xls);
        }
        setShowDownloadables(false);
        setSelectedFormat(null);
    };

    return (
        <div className="table-download-options-container">
            {tableData?.length ? <TableDownloadOptionsIcon
                className="table-download-options"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowDownloadables((val) => !val);
                }}
            /> : null
            }

            {showDownloadables && (
                <>
                    {dataToDownloadLoading ? <DownloadShimmer /> : <>
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
                    </>}
                </>
            )}
        </div>
    )
}

export default DownloadReport
