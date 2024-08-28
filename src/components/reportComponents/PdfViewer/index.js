import React, { useContext } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import "./style.scss"; // Import your custom SCSS file
import { ThemeContext } from "../../../helpers/context/ThemeContext";

const PdfViewer = ({ fileUrl }) => {
  // Accept `fileUrl` as a prop
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const {isDarkTheme} = useContext(ThemeContext);

  return (
    <div
      className={`pdf-viewer-container ${
        isDarkTheme ? "dark-theme" : "light-theme"
      }`}
    >
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};

export default PdfViewer;
