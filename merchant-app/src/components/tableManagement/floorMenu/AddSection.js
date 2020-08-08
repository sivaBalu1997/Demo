import React from "react";

import Input from "../../common/input";
import "../../../styles/table-mangagement/common.scss";
import "../../../styles/table-mangagement/floorPlan.scss";
import TableButton from "../button";
import { MdCompareArrows } from "react-icons/md";
import { Link } from "react-router-dom";

const AddSection = ({ setOpenModal }) => {
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
          <label style={{ opacity: "1" }}>Section name</label>
          <div className="date-flex">
            <Input type="date" name="table" />
            <MdCompareArrows />
            <Input type="date" name="table" />
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
