import "rc-time-picker/assets/index.css";
import React, { useState } from "react";
import { ReactComponent as CrossIcon } from "../../assets/svg/crossIcon.svg";
import "../../styles/menus.scss";

const ScaleLevelPopup = (props) => {
  console.log(props,props.data.data.value.includes("%"),"checking propss")
  const data = props.data ? props.data : "";
  const scaleData = data.data ? data.data : "";

  const [scaletext, setscaletext] = useState(props.data.data.replace);

  const handlechange = (e) => {
    console.log(e.target.value,"checkingg")
  
    if (Math.sign(e.target.value) >= 0) {
      if(props.data.data.value.includes("%") ===true){
        if(e.target.value>100){
          alert("Please Enter Within 100")
        }else{
          setscaletext(e.target.value);
        }
      }else{
        setscaletext(e.target.value);
      }
     
  } 
  else{
    alert("Accepts Positive Number")
  }
  if(e.target.value === 0){
    alert("Please Enter Greater than Zero")
  }
  }
  const submithandler = () => {
   
    if (scaletext) {
      props.updateScaleLevel(data.key, data.index, scaletext);
    }else if(scaletext ===""){
      alert("Please Enter valid number")
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
              min="0"
              maxlength="5"
              onkeypress="return /[0-9]/i.test(event.key)"
              pattern = "+/d+"
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
