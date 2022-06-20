import React, { useEffect, useRef, useState } from "react";
import "./common.scss";
import downArrow from "../../../assets/images/down-arrow.png";
import { animated } from "react-spring";

import edit from "../../../assets/images/edit.png";
import ScaleLevelPopup from "../../offers/ScaleLevelPopup";

const CustomDropDown = (props) => {
  const myRef = useRef(null);
  // console.log(props);
  const [dropdownData, setDropdownData] = useState({
    list: [],
    is_single: props.is_single ? true : false,
    show_all: props.show_all ? true : false,
    is_all_checked: false,
    selected_value: [],
    is_show: false,
    error: props.error ? props.error : "",
  });
  
  const [format, setformat] = useState(/[:]/);

  useEffect(() => {
    let selectedValue = "";
    let isAllChecked = false;
    let selectedList = props.selected_list ? props.selected_list : [];
    let selectedId = props.selected_id ? props.selected_id : "";
    let isSingle = props.is_single ? true : false;
    let listUpdate = props.list_update;
    let selectKey = props.select_key ? props.select_key : "id";
    let list = [];
    let error = props.error ? props.error : "";
   
    for (let i = 0; i < props.list.length; i++) {
      const data = props.list[i];
      data.checked = false;

      if (
        !isSingle &&
        (selectedList.includes(data[selectKey]) || data.checked)
      ) {
        selectedValue += selectedValue ? `, ${data.value}` : data.value;
        isAllChecked = true;
        data.checked = true;
      }
      if (isSingle && selectedId == data[selectKey]) {
        selectedValue = data.value;
        data.checked = true;
      }
      list.push(data);
    }
    // console.log(
    //   dropdownData,
    //   selectedList,
    //   list,
    //   props.dropdown_key,
    //   selectedId,
    //   "selectedList"
    // );

    let data = Object.assign({}, JSON.parse(JSON.stringify(dropdownData)));
    data.list = list;
    data.selected_value = selectedValue;
    data.is_all_checked = isAllChecked;
    data.error = error;
    setDropdownData(data);
  }, [
    props.list,
    props.selected_list,
    props.selected_id,
    props.list_update,
    props.error,
  ]);
  const checkIfClickedOutside = (e) => {
    // If the menu is open and the clicked target is not within the menu,
    // then close the menu

    if (
      dropdownData.is_show &&
      myRef.current &&
      !myRef.current.contains(e.target)
    ) {
      let data = Object.assign({}, JSON.parse(JSON.stringify(dropdownData)));
      data.is_show = false;
      setDropdownData(data);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdownData]);

  const openDropDown = () => {
    let data = Object.assign({}, JSON.parse(JSON.stringify(dropdownData)));

    if (props.dropdown_key === "outlet_dropdown" && props.disable === true) {
      data.is_show = data.is_show;
      setDropdownData(data);
    } else {
      data.is_show = !data.is_show;
      setDropdownData(data);
    }
  };

  const changeDropdownArrow = () => {
    let data = Object.assign({}, JSON.parse(JSON.stringify(dropdownData)));
    data.is_show = !data.is_show;

    setDropdownData(data);
  };

  const selectValue = (e, type) => {
    const isChecked = e.target.checked;
    let list = [];
    let selectedValue = "";
    let selectedList = [];
    let selectedId = null;
    let isAllChecked = false;
    let selectKey = props.select_key ? props.select_key : "id";

    for (let i = 0; i < dropdownData.list.length; i++) {
      const data = dropdownData.list[i];
      if (type == "all" || e.target.id == data.id) {
        data.checked = isChecked;
      } else if (isChecked && dropdownData.is_single) {
        data.checked = false;
      }
      if (data.checked) {
        selectedValue += selectedValue ? `, ${data.value}` : data.value;
        isAllChecked = true;
        selectedList.push(data[selectKey]);
        selectedId = data[selectKey];
      }
      list.push(data);
    }
    props.onSelect(
      props.dropdown_key,
      dropdownData.is_single ? selectedId : selectedList,
      list
    );

    let data = Object.assign({}, JSON.parse(JSON.stringify(dropdownData)));
    data.list = list;
    data.selected_value = selectedValue;
    data.is_all_checked = isAllChecked;
    data.is_show = dropdownData.is_single ? false : data.is_show;
    setDropdownData(data);
  };

  return (
    <>
      <div className="dropdown" ref={myRef}>
        <div id="tag-container" tabIndex="100">
          <div id="location-tags" onClick={openDropDown}>
            <span
              className="selectedItem-name"
              style={{ color: dropdownData.selected_value ? "#000" : "" }}
            >
              {dropdownData.selected_value
                ? dropdownData.selected_value
                : props.placeholder}{" "}
            </span>
          </div>
          {dropdownData.selected_value && (
            <span
              // onClick={() => document.getElementById(name).focus()}
              class={dropdownData.selected_value ? "value-floating-label " : ""}
            >
              {props.placeholder}
            </span>
          )}
          <img
            src={downArrow}
            alt="arrow"
            className="select__arrow"
            onClick={changeDropdownArrow}
          />

          {dropdownData.is_show && (
            <animated.div className="dropdown-items-divs">
              {!dropdownData.is_single ? (
                <ul>
                  <li className="items">
                    {dropdownData.show_all === true && (
                      <div className="dropdown-items">
                        <label className="checkbox-custom">
                          All
                          <input
                            className={
                              props.hide_check_box
                                ? "dropdown-checkbox display-none"
                                : "dropdown-checkbox"
                            }
                            type="checkbox"
                            id={0}
                            onChange={(e) => selectValue(e, "all")}
                            // checked={
                            //   dropdownData.is_all_checked === dropdownData?.list.length ? true : false
                            // }
                            checked={dropdownData.checked}
                          />
                          <span
                            className={
                              props.hide_check_box
                                ? "checkbox-labels display-none"
                                : "checkbox-labels"
                            }
                          ></span>
                        </label>
                      </div>
                    )}
                  </li>
                  {dropdownData.list.map((i, j) => (
                    <li key={i.id} className="items">
                      <div className="dropdown-items">
                        <label className="checkbox-custom">
                          {i.value}
                          <input
                            type="checkbox"
                            className="dropdown-checkbox"
                            checked={i.checked}
                            value={i.value}
                            id={i.id}
                            onChange={(e) => selectValue(e)}
                          />
                          <span className="checkbox-labels"></span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="radiotypeitems">
                  {dropdownData?.is_single &&
                    dropdownData?.list.map((i, j) => (
                      <li key={i.id} className="items">
                        <div className="dropdown-items">
                          <label className="checkbox-custom">
                            {format.test(i.value) === true ? (
                              <>
                                {" "}
                                <span className="m-b-5">
                                  {i.value.split(/[:]/)[0]}
                                </span>
                                :{" "}
                                <img
                                  src={edit}
                                  alt="edit"
                                  className="w-12 scale_option"
                                  onClick={(e) => {
                                    props.openScalePopup(
                                      j,
                                      i,
                                      props.dropdown_key
                                    );
                                    // e.preventDefault();
                                  }}
                                />
                                <br />
                                <span className="m-t-5 d-inline-block m-b-10">
                                  {i.value.split(/[:]/)[1]}
                                </span>
                              </>
                            ) : (
                              <span>{i.value}</span>
                            )}

                            <input
                              type="checkbox"
                              className={
                                props.hide_check_box
                                  ? "dropdown-checkbox display-none"
                                  : "dropdown-checkbox"
                              }
                              checked={i.checked}
                              value={i.value}
                              id={i.id}
                              onChange={(e) => selectValue(e)}
                            />
                            <span
                              className={
                                props.hide_check_box
                                  ? "checkbox-labels display-none"
                                  : "checkbox-labels"
                              }
                            ></span>
                          </label>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
              {props.children}
            </animated.div>
          )}
        </div>
       
      </div>
    </>
  );
};

export default CustomDropDown;
