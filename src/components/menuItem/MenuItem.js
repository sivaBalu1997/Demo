import React, { useState, useEffect } from "react";
import "../../styles/menus.scss";
import { ReactComponent as TickIcon } from "../../assets/svg/tickIcon.svg";
import { ReactComponent as EditIcon } from "../../assets/svg/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/svg/deleteIcon.svg";
import { FaEllipsisV } from "react-icons/fa";
import DisableItemPopup from "./disableItemPopup";
import { useItemStatus } from "../../hooks/useItemStatus";
import moment from "moment";
const MenuItem = (props) => {
  const [disablePopup, setdisablePopup] = useState(false);
  const [
    isCustomisationUpdateLoading,
    isCustomisationOptionUpdateLoading,
    isItemOrderTypeVisibilityUpdateLoading,
    isItemVisibilityLoading,
    isItemPriceUpdateLoading,
    updateCustomisation,
    updateCustomisationOption,
    updateItemOrderTypeAvailability,
    updateItemVisibility,
    updateItemPrice,
    updateItemOrderTypeAvailabilityDate,
  ] = useItemStatus({
    itemId: props.data.itemId,
    onUpdateFinish: () => {
      setdisablePopup(false);
    },
  });

  function disableScroll() {
    // Get the current page scroll position
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    // if any scroll is attempted,
    // set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    window.onscroll = function () {};
  }

  useEffect(() => {
    disablePopup ? disableScroll() : enableScroll();
  }, [disablePopup]);

  return (
    <>
      {disablePopup && (
        <DisableItemPopup
          setdisablePopup={setdisablePopup}
          data={props.data}
          updateItemVisibility={updateItemVisibility}
          updateItemOrderTypeAvailabilityDate={
            updateItemOrderTypeAvailabilityDate
          }
        />
      )}
      <tr>
        {/* <td>
          <input
            name="isGoing"
            type="checkbox"
            // checked={this.state.isGoing}
            // onChange={this.handleInputChange}
          />
        </td> */}
        {/* <td style={{ padding: "10px" }}>
          <DummyImage />
        </td> */}
        <td style={{ padding: "10px", textAlign: "left" }}>
          {props.data.itemName}
          {/* Panner Butter Masala */}
        </td>
        {/* <td>12345</td> */}
        <td>₹ {props.data.price}</td>
        {/* <td>₹ 200</td> */}
        {/* <td>All Outlets</td> */}
        <td className="status-value-container">
          <div className="sub-category-inner-container">
            <div className="status-value-inner-container">
              <div className="status-icon-container">
                {props.data.enable === true ? <TickIcon /> : <DeleteIcon />}
                {/* <TickIcon /> */}
                <EditIcon
                  onClick={() => {
                    setdisablePopup(true);
                    // if (props.data.display === 1) {
                    //   updateItemVisibility(false);
                    // } else if (props.data.display === 0) {
                    //   updateItemVisibility(true);
                    // }
                  }}
                />
              </div>
              {props.data.itemUnAvailableUntil && (
                <span className="status-text">
                  Not available until{" "}
                  {moment(props.data.itemUnAvailableUntil).format("hh:mm A")}
                </span>
              )}
            </div>
            {/* <div className="status-value-inner-container">
              <div className="status-icon-container">
                <DeleteIcon />
                <EditIcon />
              </div>
              <span className="status-text">Not available until 7 pm</span>
            </div>
            <div className="status-value-inner-container">
              <div className="status-icon-container">
                <TickIcon />
                <EditIcon />
              </div>
              <span className="status-text">Not available until 7 pm</span>
            </div> */}
          </div>
        </td>
        {/* <td>
          <FaEllipsisV />
        </td> */}
      </tr>
    </>
  );
};

export default MenuItem;
