import React from "react";

const TableButton = ({ type, value, bgType, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="custom-button"
      style={{
        background: bgType === "trans" ? "transparent" : "#2E2E2E",
        color: bgType === "trans" ? "#000" : "#fff",
      }}
      type={type}
    >
      {value}
    </button>
  );
};

export default TableButton;
