import React, { useState } from "react";

const DropdownAddItem1 = (props) => {
  const [value, setvalue] = useState("");
  const [is_add, setisadd] = useState(false);

  const handleChange = (event) => {
    setvalue(event.target.value);
  };

  const addDropdownItem = (value) => {
    if (value) {
      setvalue("");
      props.addDropdownItem(props.dropdown_key, value);
    }
  };

  return (
    <div className="bottom-add_fields">
      <div
        className={
          !is_add ? "addlink-btn display-block" : "addlink-btn display-none"
        }
        // onClick={() => this.setState({ is_add: true })}
        onClick={() => setisadd(!is_add)}
      >
        <i className="bi bi-plus"></i>&nbsp;Add terms &amp; conditions
      </div>

      <div
        className={
          is_add ? "dropdown-items display-flex" : "dropdown-items display-none"
        }
      >
        <input
          type="text"
          placeholder="New Term"
          onChange={handleChange}
          value={value}
          minLength={2}
        />
        <button onClick={() => addDropdownItem(value)} className="addbtnset">
          Add
        </button>
      </div>
    </div>
  );
};

export default DropdownAddItem1;
