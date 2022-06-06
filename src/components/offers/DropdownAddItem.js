import React from "react";

class DropdownAddItem extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      value: "",
      is_add: false,
    };
  }

  render() {
    return (
      <div className="bottom-add_fields">
        <div
          className={
            !this.state.is_add
              ? "addlink-btn display-block"
              : "addlink-btn display-none"
          }
          onClick={() => this.setState({ is_add: true })}
        >
          <i className="bi bi-plus"></i>&nbsp;Add terms &amp; conditions
        </div>

        <div
          className={
            this.state.is_add
              ? "dropdown-items display-flex"
              : "dropdown-items display-none"
          }
        >
          <input
            type="text"
            placeholder="Add"
            onChange={this.handleChange.bind(this)}
            value={this.state.value}
            minLength="2"
          />
          <button
            onClick={() => this.addDropdownItem(this.state.value)}
            className="addbtnset"
          >
            Add
          </button>
        </div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  addDropdownItem(value) {
    if (value) {
      this.setState({ value: "" });
      this.props.addDropdownItem(this.props.dropdown_key, value);
    }
  }
}

export default DropdownAddItem;
