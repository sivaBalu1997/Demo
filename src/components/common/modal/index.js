import React from "react";

const Modal = ({ children, openModal }) => {
  const showHideClassName = openModal
    ? "modal-table display-block"
    : "modal-table display-none";

  return (
    <div className={showHideClassName}>
      <section className="main-tabel">{children}</section>
    </div>
  );
};

export default Modal;
