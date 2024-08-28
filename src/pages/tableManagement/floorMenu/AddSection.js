import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa";

import Input from "../../common/input";
import "../../../styles/table-mangagement/common.scss";
import "../../../styles/table-mangagement/floorPlan.scss";
import TableButton from "../button";
import { MdCompareArrows } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomDropdown from "../../common/customDropdown";

const options = ["9.00", "10.00", "11.00"];
const optionsOne = ["22.00", "21.00", "20.00"];

const AddSection = ({ setOpenModal }) => {
  const [start, setstart] = useState("9.00");
  const [end, setEnd] = useState("22.00");

  const onStart = (option) => {
    setstart(option);
  };
  const onEnd = (option) => {
    setEnd(option);
  };
  return (
    <div className="add-table">
      <div>
        <div>
          <label style={{ opacity: "1" }}>Section name</label>
          <Input type="text" placeholder="Main dining hall" name="table" />
        </div>
        <div className="checkbox-radio">
          <label style={{ opacity: "1" }}>Status</label>
          <div className="radio">
            <label style={{ opacity: "1" }}>
              <input type="radio" defaultChecked="checked" name="radio" />
              <span class="checkmark"></span>
              open
            </label>
          </div>
          <div className="radio">
            <label style={{ opacity: "1" }}>
              <input type="radio" defaultChecked="checked" name="radio" />
              <span class="checkmark"></span>
              close
            </label>
          </div>
        </div>
      </div>

      <div>
        <div>
          <label style={{ opacity: "1" }}>Serving time</label>
          <div className="date-flex">
            <CustomDropdown
              options={options}
              value={start}
              onSelect={onStart}
              arrowClosed={<FaRegClock />}
              arrowOpen={<FaRegClock />}
            />
            <MdCompareArrows />
            <CustomDropdown
              options={optionsOne}
              value={end}
              onSelect={onEnd}
              arrowClosed={<FaRegClock />}
              arrowOpen={<FaRegClock />}
            />
          </div>
        </div>
        <div className="bottom-cta">
          <TableButton
            onClick={() => setOpenModal(false)}
            type="button"
            value="Cancel"
            bgType="trans"
          />
          <Link onClick={() => setOpenModal(false)} to="/add-table">
            <TableButton type="submit" value="Save" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddSection;
