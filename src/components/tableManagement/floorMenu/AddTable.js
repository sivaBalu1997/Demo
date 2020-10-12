import React, { useState } from "react";
import { MdReplay } from "react-icons/md";

import Input from "../../common/input";
import "../../../styles/table-mangagement/common.scss";
import CustomDropdown from "../../common/customDropdown";
import TableButton from "../button";
import { Link } from "react-router-dom";

const options = ["Rectangle", "Square", "Triangle"];

const AddTable = ({ setOpenModal }) => {
  const [defaultOptions, setDefaultOptions] = useState("Rectangle");
  const [count, setCount] = useState(0);
  const [chairCount, setChairCount] = useState(0);

  const onSelect = (option) => {
    setDefaultOptions(option);
  };
  return (
    <div className="add-table">
      <div>
        <div>
          <label>Table name</label>
          <Input type="text" placeholder="0/5" name="table" />
        </div>
        <div>
          <label>Table shape</label>
          <CustomDropdown
            options={options}
            value={defaultOptions}
            onSelect={onSelect}
          />
        </div>
        <div className="counter-sec">
          <div className="counter">
            <label>Chairs</label>
            <div>
              <span onClick={() => setCount(count - 1)}>-</span>
              <div className="count-number">{count}</div>
              <span onClick={() => setCount(count + 1)}>+</span>
            </div>
          </div>
          <div className="counter">
            <label>High chair</label>
            <div>
              <span onClick={() => setChairCount(chairCount - 1)}>-</span>
              <div className="count-number">{chairCount}</div>
              <span onClick={() => setChairCount(chairCount + 1)}>+</span>
            </div>
          </div>
        </div>
        <div className="checkbox">
          <div>
            <label>
              <input type="checkbox" defaultChecked="checked" />
              <span className="checkmark"></span>
              Mergable
            </label>
          </div>
          <div className="check-flex">
            <div>
              <label>
                <input type="checkbox" />
                <span className="checkmark"></span>
                Left
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" />
                <span className="checkmark"></span>
                Right
              </label>
            </div>
          </div>
          <div>
            <label>
              <input type="checkbox" defaultChecked="checked" />
              <span className="checkmark"></span>
              Enable for kiosk
            </label>
          </div>
        </div>
      </div>

      <div>
        <div>
          <label>Table Type</label>
          <CustomDropdown
            options={options}
            value={defaultOptions}
            onSelect={onSelect}
          />
        </div>
        <div className="reset-div">
          <MdReplay />
        </div>
        <div className="bottom-cta">
          <TableButton
            onClick={() => setOpenModal(false)}
            type="button"
            value="Cancel"
            bgType="trans"
          />
          <Link to="/add-table">
            <TableButton type="submit" value="Save" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddTable;
