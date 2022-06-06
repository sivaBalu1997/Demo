import React, { useState, useEffect, Fragment, useRef } from "react";
import "../../styles/menus.scss";
import { ReactComponent as TickIcon } from "../../assets/svg/tickIcon.svg";
import { ReactComponent as EditIcon } from "../../assets/svg/editIcon.svg";
import { ReactComponent as DeleteIcon } from "../../assets/svg/deleteIcon.svg";
import { ReactComponent as PencilIcon } from "../../assets/svg/pencilIcon.svg";
import { ReactComponent as BinIcon } from "../../assets/svg/binIcon.svg";

import { FaEllipsisV } from "react-icons/fa";
import DisableItemPopup from "./disableItemPopup";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useItemStatus } from "../../hooks/useItemStatus";
import { ReactComponent as Block } from "../../assets/svg/block.svg";
import { ReactComponent as UnBlock } from "../../assets/svg/unblock.svg";
import { deleteMenuItemRequest } from "../../redux/actions/productCatalogActions";
import moment from "moment";
const MenuItem = (props) => {
  console.log(props,"DDDDDDD")
  const [disablePopup, setdisablePopup] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const ref = useRef();

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
  const history = useHistory();

  // let data =
  //   props.data &&
  //   props.data.availability &&
  //   props.data.availability.length > 0 &&
  //   Math.min.apply(
  //     Math,
  //     props.data.availability.map(function (o) {
  //       console.log(JSON.parse(o.startTime.split(":")[0]));
  //       // return JSON.parse(o.startTime.split(":")[0]);
  //     })
  //   );

  const availabilityTime =
    props &&
    props.data &&
    props.data.availability &&
    props.data.availability.length > 0 &&
    props.data.availability.reduce(function (prev, current) {
      // console.log(current, `prev`, prev);
      return prev.startTime < current.startTime ? prev : current;
    });

  function enableScroll() {
    window.onscroll = function () {};
  }

  useEffect(() => {
    disablePopup ? disableScroll() : enableScroll();
  }, [disablePopup]);

  function tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  }
  const get12HoursTime = (t24Stamp) => {
    let timeString = t24Stamp.split("T")[1];
    if (timeString == "00:00:00") {
      if (availabilityTime) {
        return `Available by Tomorrow ${tConv24(availabilityTime.startTime)}`;
      } else {
        return "Available by Tomorrow";
      }
    } else {
      let hours = timeString.split(":")[0];
      let mins = timeString.split(":")[1];
      let median = "";
      if (parseInt(hours) > 12) {
        hours = parseInt(hours) - 12 + "";
        median = "PM";
      } else {
        median = "AM";
      }
      return (
        "Not available untill " + [hours, ":", mins, median].join(" ") + ""
      );
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };

    // document.EventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      // document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [show]);

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
      <tr style={{ marginLeft: "100px" }}>
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
        <td>Rs. {props.data.price}</td>
        {/* <td>₹ 200</td> */}
        {/* <td>All Outlets</td> */}
        <td className="status-value-container">
          <div className="sub-category-inner-container">
            <div className="status-value-inner-container">
              <div className="status-icon-container">
                {props.data.enable === true && !props.data.categoryOff ? (
                  <TickIcon />
                ) : (
                  <DeleteIcon />
                )}
                {/* <TickIcon /> */}
                <EditIcon
                  className="editIcon"
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
              {!props.data.categoryOff && props.data.itemUnAvailableUntil && (
                <span className="status-text">
                  {/* Not available until{" "}
                  {moment(props.data.itemUnAvailableUntil).format("hh:mm A")} */}
                  {/* {getDisableItemText(props.data)} */}

                  {new Date(props.data.itemUnAvailableUntil).getFullYear() >
                  3000 ? (
                    "Temporarily Unavailable"
                  ) : (
                    <span>
                      {get12HoursTime(props.data.itemUnAvailableUntil)}
                    </span>
                  )}
                </span>
              )}
              {props.data.categoryOff && (
                <span className="status-text">
                  Category is Off Enable it via App
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
        <td ref={ref}>
          <FaEllipsisV
            onClick={() => {
              // if (show) {
              setShow(!show);
              // }
            }}
          />
          {show ? (
            <ul>
              <li
                onClick={() => {
                  history.push({
                    pathname: `/management/menu/Items/update/${props.data.itemId}`,
                    state: props.data,
                  });
                }}
              >
                <Fragment>
                  <PencilIcon />
                  &nbsp; Update
                </Fragment>
              </li>
              {/* <hr /> */}
              <li
                onClick={() => {
                  dispatch(deleteMenuItemRequest(props.data.itemId));
                }}
              >
                <Fragment>
                  {/* <UnBlock /> */}
                  <BinIcon />
                  &nbsp; Delete
                </Fragment>
              </li>
            </ul>
          ) : null}
        </td>
      </tr>
    </>
  );
};

export default MenuItem;
