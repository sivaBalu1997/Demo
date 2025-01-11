import React, { useContext, useRef } from "react";
import "./Trash.scss";
import Trash from "../../../assets/svg/trash-2.svg";
import { useDispatch, useSelector } from "react-redux";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { deleteMenuItemRequest } from "redux/productCatalog/productCatalogActions";

const EyeModal = ({ onTrashclose, ItemId }) => {
  const { setApiPayload, ApiPayload } = useContext(Contextpagejs);

  const dispatch = useDispatch();
  const locationid = useSelector((state) => state.auth?.credentials?.locationId);
  const deleteMenuItemSuccessMessage = useSelector((state) => state.yourReducer?.deleteMenuItemSuccessMessage);
  const deleteMenuItemLoading = useSelector(
    (state) => state.productCatalog?.deleteMenuItemLoading
  );

  const trashmodalRef = useRef();


  const closeModal = () => {
    onTrashclose();
  };
  const handleChange = () => {
    const payload = {
      locationid: locationid,
      itemId: ItemId,
    };
    dispatch(deleteMenuItemRequest(payload));
    if (deleteMenuItemSuccessMessage === "Menu item deleted successfully") {
      onTrashclose();
    }
  };

  console.log({deleteMenuItemLoading})

  return (
    <div
      ref={trashmodalRef}
      // onClick={TrashClose}
      className="TrashModal-Container"
    >
      <div className="TrashModal-Window">
        <div className="TrashModal-Form">
          <div className="TrashImage">
            <img src={Trash} alt="trash-icon"></img>
          </div>
          <div className="TrashMessage">
            <h1 className="Trash-Heading">
            Are you certain you want to delete this item{" "}
            </h1>
            <h1 className="Trash-Heading"> from both the listing and the database? </h1>
          </div>
          <div className="Trash-Button">
            <button 
              className={deleteMenuItemLoading ? "TrashButtonLoad1" : "TrashButton1"}
              onClick={closeModal}
              disabled={deleteMenuItemLoading}
            >
              Cancel
            </button>
            <button 
              className={deleteMenuItemLoading ? "TrashButtonLoad2" : "TrashButton2"}
              onClick={handleChange}
              disabled={deleteMenuItemLoading}
            >
              {!deleteMenuItemLoading ?
                "Delete" : 
                <div className="reviewLoaders"></div>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeModal;
