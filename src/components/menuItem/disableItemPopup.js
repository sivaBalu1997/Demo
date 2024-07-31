import React, { useState, useCallback } from "react";
import "../../styles/menus.scss";
import "rc-time-picker/assets/index.css";
import moment from "moment";
import TimePicker from "rc-time-picker";
import { endOfDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as CrossIcon } from "../../assets/svg/crossIcon.svg";

const DisableItemPopup = (props) => {
  console.log(props, "check props data");
  const getFormattedDateFromISO = useCallback((dateISOString) => {
    return dateISOString.replace("T", " ").replace("Z", "");
  }, []);
  const {
    data,
    setdisablePopup,
    updateItemVisibility,
    updateItemOrderTypeAvailabilityDate,
  } = props;
  const now = moment().hour(0).minute(0);
  const [pickedTime, setpickedTime] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const format = "h:mm A";

  function onChange(value) {
    setpickedTime(getFormattedDateFromISO(new Date(value).toISOString()));
  }

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const isItemEnabled = data.enable === true;
  const orderTypeId = useSelector((state) => state.menu.menu.orderTypeId);

  return (
    <div className="popup">
      <div className="popup_inner">
        <div className="modal-title-container">
          <span className="modal-heading-text">
            {isItemEnabled ? "Disable Item" : "Enable Item"}
          </span>
          <CrossIcon
            onClick={() => setdisablePopup(false)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <hr className="modal-title-border" />
        <div className="modal-content">
          <span className="modal-item-name">{data.itemName}</span>
          <span className="modal-item-category">{data.subCategory}</span>
          {/* <input type="checkbox" className="modal-checkbox" checked="checked" /> */}
          {/* <label class="checkbox-container">
            <span className="checkbox-content">
              Disable across all sections
            </span>
            <input type="checkbox" />
            <span class="check"></span>
          </label>
          <label class="checkbox-container">
            <span className="checkbox-content">Disable across all outlets</span>
            <input type="checkbox" />
            <span class="check"></span>
          </label> */}
          {/* <div style={{ marginLeft: "30px" }}>
            <div className="switch-container">
              <Switch
                onChange={() => setoutletEnable(!outletEnable)}
                checked={outletEnable}
                checkedIcon={false}
                uncheckedIcon={false}
                onColor="#00B71D"
                width={35}
                height={18}
              />
              <span className="switch-text">Outlet 1</span>
            </div>

            <div className="switch-container">
              <Switch
                onChange={() => setoutletEnable(!outletEnable)}
                checked={outletEnable}
                checkedIcon={false}
                uncheckedIcon={false}
                onColor="#00B71D"
                width={35}
                height={18}
              />
              <span className="switch-text">Outlet 2</span>
            </div>
            <div className="switch-container">
              <Switch
                onChange={() => setoutletEnable(!outletEnable)}
                checked={outletEnable}
                checkedIcon={false}
                uncheckedIcon={false}
                onColor="#00B71D"
                width={35}
                height={18}
              />
              <span className="switch-text">Outlet 3</span>
            </div>
          </div> */}
          <form id="value" onSubmit={(e) => console.log("Event", e.target)}>
            <div className="radio-outer-container">
              {isItemEnabled && (
                <div className="radio-container">
                  <span className="checkbox-content">End of Today</span>
                  <input
                    type="radio"
                    className="radio"
                    name="disable-action"
                    value="EOT"
                    onChange={handleRadioChange}
                  />
                </div>
              )}
              {/* <div className="radio-container">
                <span className="checkbox-content">End of Session</span>
                <input type="radio" className="radio" name="disable-action" />
              </div> */}
              <div className="radio-container">
                <span className="checkbox-content">
                  {isItemEnabled
                    ? "Until manually enabled"
                    : "Until manually disabled"}
                </span>
                <input
                  type="radio"
                  className="radio"
                  name="disable-action"
                  value="UME"
                  onChange={handleRadioChange}
                />
              </div>
              {isItemEnabled && (
                <div className="radio-container">
                  <TimePicker
                    showSecond={false}
                    defaultValue={now}
                    className="xxx"
                    onChange={onChange}
                    format={format}
                    use12Hours
                    style={{ width: "75px" }}
                    allowEmpty={false}
                  />
                  <input
                    type="radio"
                    className="radio"
                    name="disable-action"
                    value="TP"
                    onChange={handleRadioChange}
                  />
                </div>
              )}
            </div>
            <div className="bottom-button-container">
              <div
                className="modal-cancel-button"
                onClick={() => setdisablePopup(false)}
              >
                Cancel
              </div>
              <div
                className="modal-submit-button"
                style={{
                  backgroundColor: selectedValue ? "#67833e" : "#b6b9b1",
                }}
                onClick={() => {
                  // if (props.data.display === 1) {
                  //   props.updateItemVisibility(false);
                  // } else if (props.data.display === 0) {
                  //   props.updateItemVisibility(true);
                  // }
                  // let selectedValue;
                  let value = document.getElementsByName("disable-action");
                  for (let i = 0; i < value.length; i++) {
                    if (value[i].checked) {
                      setSelectedValue(value[i].value);
                    }
                  }
                  switch (selectedValue) {
                    case "UME":
                      if (isItemEnabled) {
                        let currentDate = getFormattedDateFromISO(
                          new Date("9999").toISOString()
                        );
                        updateItemOrderTypeAvailabilityDate(false, currentDate);
                      } else {
                        let currentDate = getFormattedDateFromISO(
                          new Date().toISOString()
                        );
                        updateItemOrderTypeAvailabilityDate(false, currentDate);
                      }
                      break;
                    case "EOT":
                      let date = getFormattedDateFromISO(
                        endOfDay(new Date()).toISOString()
                      );
                      updateItemOrderTypeAvailabilityDate(false, date);
                      break;
                    case "TP":
                      updateItemOrderTypeAvailabilityDate(false, pickedTime);
                      break;
                    default:
                      break;
                  }
                }}
              >
                {/* <input type="submit" /> */}
                {isItemEnabled ? "Disable" : "Enable"}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DisableItemPopup;
