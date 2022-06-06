import React, { useState } from "react";
import "../../styles/menus.scss";
import "rc-time-picker/assets/index.css";
import { ReactComponent as CrossIcon } from "../../assets/svg/crossIcon.svg";
const ScaleLevelPopup = (props) => {
  const data = props.data ? props.data : "";
  const scaleData = data.data ? data.data : "";

  const [scaletext, setscaletext] = useState("");

  const handlechange = (e) => {
    setscaletext(e.target.value);
  };

  const submithandler = () => {
    if (scaletext) {
      props.updateScaleLevel(data.key, data.index, scaletext);
    }
  };

  const closePopup = () => {
    props.setScalePopupData("");
  };

  return (
    data && (
      <div className="popup">
        <div className="popup_inner">
          <div className="modal-title-container">
            <span className="modal-heading-text">{"Edit Scale Level"}</span>
            <CrossIcon onClick={closePopup} style={{ cursor: "pointer" }} />
          </div>
          <hr className="modal-title-border" />
          <div className="modal-content">
            <span className="modal-item-name">
              Change scale level offer percent.
            </span>
            <span className="modal-item-category">{scaleData.value}</span>

            <input
              type="number"
              value={scaletext}
              onChange={(e) => {
                handlechange(e);
              }}
            />
            <form id="value" onSubmit={(e) => <></>}>
              <div className="radio-outer-container">
                <div className="radio-container"></div>
              </div>
              <div className="bottom-button-container">
                <div className="modal-cancel-button" onClick={closePopup}>
                  Cancel
                </div>
                <div
                  className="modal-submit-button"
                  onClick={() => submithandler()}
                >
                  {"Ok"}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ScaleLevelPopup;
