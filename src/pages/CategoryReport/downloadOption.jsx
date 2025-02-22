import React, { useEffect, useRef, useState } from "react";

import exportFromJSON from "export-from-json";
import { ReactComponent as PdfDownloadIcon } from "../../assets/svg/r-pdf-download-option-icon.svg";
import { ReactComponent as JsonDownloadIcon } from "../../assets/svg/r-json-download-option-icon.svg";
import { ReactComponent as CsvDownloadIcon } from "../../assets/svg/r-csv-download-option-icon.svg";
import { ReactComponent as DownloadBtn } from "../../assets/svg/r-download-button-icon.svg";
import { ReactComponent as TableDownloadOptionsIcon } from "../../assets/svg/r-options-table.svg";



function DownloadPopOver({   }) {
  const downloadPopoverRef = useRef(null);
  const csvDownloadFn = (data) => {};

  const jsonDownloadFn = (data) => {};

  const xlsxDownloadFn = (data) => {};
  const pdfDownloadFn = (data) => {};
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Ensure that the click is not inside the popover or the button that toggles it
      if (
        downloadPopoverRef.current &&
        !downloadPopoverRef.current.contains(event.target) &&
        !event.target.closest(".table-download-options")
      ) {
        setShowDownloadables(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const [showDownloadables, setShowDownloadables] = useState(false);



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
      <div
        className="table-download-options-pop-over"
        ref={downloadPopoverRef}
      >
        <p className="pop-over-title">Total sales overview</p>
        <div className="formats-container">
          <div className="download-icon-with-title">
            <PdfDownloadIcon onClick={() => pdfDownloadFn()} />
            <p>.PDF</p>
          </div>
          <div className="download-icon-with-title">
            <JsonDownloadIcon onClick={() => jsonDownloadFn()} />
            <p>.JSON</p>
          </div>
          <div className="download-icon-with-title">
            <CsvDownloadIcon onClick={() => csvDownloadFn()} />
            <p>.CSV</p>
          </div>
        </div>
        <button className="download-btn">
          <DownloadBtn />
          Download
        </button>
      </div>
    )}
  </div>
  );
}

export default DownloadPopOver;
