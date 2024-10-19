import React, { useContext, useRef } from "react";
import "./Trash.scss";
import Trash from "../../../assets/images/trash-2.png";
import { useDispatch } from "react-redux";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { deleteMenuItemRequest } from "redux/productCatalog/productCatalogActions";

const EyeModal = ({ onTrashclose }) => {
  const {   setApiPayload,ApiPayload } = useContext(Contextpagejs);

  const dispatch=useDispatch();
  const trashmodalRef = useRef();
  const TrashClose = (e) => {
    if (trashmodalRef.current === e.target) {
      onTrashclose();
    }
  };
  const closeModal = () => {
    onTrashclose();
  };
  const handleChange = () => {
    dispatch(deleteMenuItemRequest(ApiPayload))

   
    onTrashclose();
  };

  return (
    <div
      ref={trashmodalRef}
      onClick={TrashClose}
      className="TrashModal-Container"
    >
      <div className="TrashModal-Window">
        <div className="TrashModal-Form">
          <div className="TrashImage">
            <img src={Trash}></img>
          </div>
          <div className="TrashMessage">
            <h1 className="Trash-Heading">
              Are you sure you want to delete the{" "}
            </h1>
            <h1 className="Trash-Heading"> item from the listing?</h1>
          </div>
          <div className="Trash-Button">
            <button className="TrashButton1" onClick={closeModal}>
              Cancel
            </button>
            <button className="TrashButton2" onClick={handleChange}>
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeModal;
