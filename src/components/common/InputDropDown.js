import React, { Fragment, useState, useEffect, useRef } from "react";
import downArrow from "../../assets/images/down-arrow.png";
import { useSpring, useTransition, animated } from "react-spring";
import "./inputDropdown.css";
import { set } from "date-fns";
const Dropdown = ({
  color,
  data,
  selectValue,

  handleSelect,
  placeholder,
  name,
  onAddItem,
  value,
  style,
  isAddItem,
  addItemText,
  type,
}) => {
  const [isShow, setisShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    type ? type : value ? value : ""
  );
  const [add, setAdd] = useState(false);
  const [addedItemName, setaddedItemName] = useState("");
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isShow && ref.current && !ref.current.contains(e.target)) {
        setisShow(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isShow]);
  return (
    <div className="dropdown" ref={ref} style={style}>
      <div id="tag-container">
        <div id="location-tags" onClick={() => setisShow(!isShow)}>
          <Fragment>
            <span
              className="selectedItem-name"
              style={{ color: selectedItem ? "#000" : "" }}
            >
              {type ? type : selectedItem ? selectedItem : placeholder}{" "}
            </span>
          </Fragment>
        </div>
        {selectedItem !== "" && (
          <span
            // onClick={() => document.getElementById(name).focus()}
            class={selectedItem !== "" ? "value-floating-label " : ""}
          >
            {placeholder}
          </span>
        )}
      </div>
      {isShow ? (
        <animated.div
          style={{
            position: "absolute",
            zIndex: "9999",
            top: "40px",
            left: "0px",
            right: "0px",
          }}
        >
          <animated.div className="tag-selection-container">
            {console.log(data,"check data")}
            {data.map((data, index) => {
              return (
                <div key={index} className="tag-line">
                  <div
                    onClick={(e) => {
                      handleSelect(
                        data.id ? data.id : data.modifierId,
                        data.modifierName
                      );
                      setSelectedItem(
                        data.option
                          ? data.option
                          : data.modifierName
                            ? data.modifierName
                            : data.tagName
                              ? data.tagName
                              : data.name
                      );
                      setisShow(false);
                    }}
                    className="tag-word"
                  >
                    <span style={{ paddingLeft: "1em" }}>
                      {data.option
                        ? data.option
                        : data.modifierName
                          ? data.modifierName
                          : data.tagName
                            ? data.tagName
                            : data.name}
                    </span>
                  </div>
                </div>
              );
            })}
            {isAddItem ? (
              <>
                {add ? (
                  <div className="add-tag-container">
                    <input
                      style={{
                        width: "80%",
                        height: "90%",
                        border: "1px solid #2196f3",
                        borderRadius: "4px",
                      }}
                      type="text"
                      onChange={(e) => setaddedItemName(e.target.value)}
                    />
                    <div
                      className="add-tag-btn"
                      onClick={() => {
                        if (addedItemName) {
                          onAddItem(addedItemName);
                          name === "modifier" && setSelectedItem(addedItemName);
                          setAdd(!add);
                        }
                      }}
                    >
                      Add
                    </div>
                  </div>
                ) : (
                  <span className="add-new-tag" onClick={() => setAdd(!add)}>
                    <span style={{ paddingLeft: "1em" }}>
                      {addItemText ? "+ " + addItemText : "+ Add New Tag"}
                    </span>
                  </span>
                )}
              </>
            ) : null}
          </animated.div>
        </animated.div>
      ) : null}
      <img
        src={downArrow}
        alt="arrow"
        className="select__arrow"
        onClick={() => setisShow(!isShow)}
      />
    </div>
  );
};

export default Dropdown;
