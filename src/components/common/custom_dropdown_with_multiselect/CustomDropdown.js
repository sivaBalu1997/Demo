import React from "react";
import "./common.scss";
import downArrow from "../../../assets/images/down-arrow.png";
import { animated } from "react-spring";
import { format } from "date-fns";
import edit from "../../../assets/images/edit.png";
import ScaleLevelPopup from "../../offers/ScaleLevelPopup";
class CustomDropDown extends React.Component {
  myRef = null;
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    
    let selectedValue = "";
    let isAllChecked = false;
    let selectedList = this.props.selected_list ? this.props.selected_list : [];
    let selectedId = this.props.selected_id ? this.props.selected_id : "";
    let isSingle = this.props.is_single ? true : false;

    let selectKey = this.props.select_key ? this.props.select_key : "id";
console.log(selectedList,this.props.dropdown_key,selectedId,"selectedList")
    for (let i = 0; i < this.props.list.length; i++) {
      const data = this.props.list[i];
    
      if (!isSingle && (selectedList.includes(data[selectKey])||data.checked)) {
  
        selectedValue += selectedValue ? `, ${data.value}` : data.value;
        isAllChecked = true;
      }
      if (isSingle && selectedId == data[selectKey]) {
        selectedValue = data.value;
      }
    }
    this.state = {
      list:
        this.props.list && this.props.list.length > 0 ? this.props.list : [],
      is_single: isSingle,
      show_all: this.props.show_all ? true : false,
      is_all_checked: isAllChecked,
      selected_value: selectedValue,
      is_show: false,
      format: /[:]/,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.checkIfClickedOutside);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list.length != this.props.list.length) {
      let selectedValue = "";
      let isAllChecked = false;
      let selectedList = prevProps.selected_list ? prevProps.selected_list : [];
      let selectedId = prevProps.selected_id ? prevProps.selected_id : "";
      let isSingle = prevProps.is_single ? true : false;
      let disable = prevProps.disable ? true : false;
      let selectKey = prevProps.select_key ? prevProps.select_key : "id";
      console.log(selectedList,this.props.dropdown_key,"Updateeeee")
      for (let i = 0; i < this.props.list.length; i++) {
        const data = this.props.list[i];

        if (!isSingle && selectedList.includes(data[selectKey])) {
          selectedValue += selectedValue ? `, ${data.value}` : data.value;
          isAllChecked = true;
        }
        if (isSingle && selectedId == data[selectKey]) {
          selectedValue = data.value;
        }
      }

      this.setState({
        list: this.props.list,
        is_all_checked: isAllChecked,
        selected_value: selectedValue,
      });
    }
 
  }
  openDropDown = () => {
   
    if (
      this.props.dropdown_key === "outlet_dropdown" &&
      this.props.disable === true
    ) {
      this.setState({ is_show: this.state.is_show });
    } else {
      this.setState({ is_show: !this.state.is_show });
    }
  };
  render() {
 console.log(this.state.selected_value,this.state.list,this.props.dropdown_key,"DiscountType")
    return (
      <>
        <div className="dropdown" ref={this.myRef}>
          <div id="tag-container" tabIndex="100">
            <div
              id="location-tags"
              
              onClick={this.openDropDown}
            >
              <span
                className="selectedItem-name"
                style={{ color: this.state.selected_value ? "#000" : "" }}
              >
                {this.state.selected_value
                  ? this.state.selected_value
                  : this.props.placeholder}{" "}
              </span>
            </div>
            {this.state.selected_value && (
              <span
                // onClick={() => document.getElementById(name).focus()}
                class={this.state.selected_value ? "value-floating-label " : ""}
              >
                {this.props.placeholder}
              </span>
            )}
            <img
              src={downArrow}
              alt="arrow"
              className="select__arrow"
              onClick={() => this.setState({ is_show: !this.state.is_show })}
            />

            {this.state.is_show && (
              <animated.div className="dropdown-items-divs">
                {!this.state.is_single ? (
                  <ul>
                    <li className="items">
                      {this.state.show_all === true && (
                        <div className="dropdown-items">
                          <label className="checkbox-custom">
                            All
                            <input
                              className={
                                this.props.hide_check_box
                                  ? "dropdown-checkbox display-none"
                                  : "dropdown-checkbox"
                              }
                              type="checkbox"
                              id={0}
                              onChange={(e) => this.selectValue(e, "all")}
                              checked={
                                this.state.is_all_checked > 0 ? true : false
                              }
                            />
                            <span
                              className={
                                this.props.hide_check_box
                                  ? "checkbox-labels display-none"
                                  : "checkbox-labels"
                              }
                            ></span>
                          </label>
                        </div>
                      )}
                    </li>
                    {this.state.list.map((i, j) => (
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
                              onChange={(e) => this.selectValue(e)}
                            />
                            <span className="checkbox-labels"></span>
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="radiotypeitems">
                    {this.state.is_single &&
                      this.state.list.map((i, j) => (
                        <li key={i.id} className="items">
                          
                          <div className="dropdown-items">
                            <label className="checkbox-custom">
                              {this.state.format.test(i.value) === true ? (
                                <>
                                  {" "}
                                  <span>{i.value.split(/[:]/)[0]}</span>:{" "}
                                  <img
                                    src={edit}
                                    alt="edit"
                                    style={{
                                      width: "12px",
                                      marginLeft: " 200px",
                                    }}
                                    onClick={(e) => {
                                      this.props.openScalePopup(
                                        j,
                                        i,
                                        this.props.dropdown_key
                                      );
                                      e.preventDefault();
                                    }}
                                  />
                                  <br />
                                  <span>{i.value.split(/[:]/)[1]}</span>
                                </>
                              ) : (
                                <span>{i.value}</span>
                              )}
                              <input
                                type="checkbox"
                                className={
                                  this.props.hide_check_box
                                    ? "dropdown-checkbox display-none"
                                    : "dropdown-checkbox"
                                }
                                checked={i.checked}
                                value={i.value}
                                id={i.id}
                                onChange={(e) => this.selectValue(e)}
                              />
                              <span
                                className={
                                  this.props.hide_check_box
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
                {this.props.children}
              </animated.div>
            )}
          </div>
        </div>
      </>
    );
  }

  selectValue(e, type) {
  
    const isChecked = e.target.checked;
    let list = [];
    let selectedValue = "";
    let selectedList = [];
    let selectedId = null;
    let isAllChecked = false;
    let selectKey = this.props.select_key ? this.props.select_key : "id";
    for (let i = 0; i < this.state.list.length; i++) {
      const data = this.state.list[i];
      if (type == "all" || e.target.id == data.id) {
        data.checked = this.state.is_single ? true : isChecked;
      } else if (isChecked && this.state.is_single) {
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
    this.props.onSelect(
      this.props.dropdown_key,
      this.state.is_single ? selectedId : selectedList
    );
    this.setState({
      list,
      selected_value: selectedValue,
      is_all_checked: isAllChecked,
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.checkIfClickedOutside);
  }

  checkIfClickedOutside = (e) => {
    // If the menu is open and the clicked target is not within the menu,
    // then close the menu
    if (
      this.state.is_show &&
      this.myRef.current &&
      !this.myRef.current.contains(e.target)
    ) {
      this.setState({ is_show: false });
    }
  };
}

export default CustomDropDown;
