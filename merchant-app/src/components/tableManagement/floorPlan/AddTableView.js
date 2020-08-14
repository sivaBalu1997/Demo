import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

import "../../../styles/table-mangagement/floorPlan.scss";
import "../../../styles/table-mangagement/table.scss";
import { Link } from "react-router-dom";
import FloorMenu from "../floorMenu";
import tableOne from "../../../assets/images/table-1.png";
import tableTwo from "../../../assets/images/table-2.png";

const dataTable = [
  { id: 1, table: "T1", type: "square" },
  { id: 2, table: "T1", type: "Square" },
  { id: 3, table: "T1", type: "square" },
  { id: 4, table: "T1", type: "square" },
  { id: 5, table: "T1", type: "square" },
  { id: 6, table: "T1", type: "square" },
  { id: 7, table: "T1", type: "square" },
  { id: 8, table: "T1", type: "rec" },
  { id: 9, table: "T1", type: "rec" },
];

const barTable = [
  { id: 1, table: "T1", type: "circle" },
  { id: 2, table: "T1", type: "circle" },
  { id: 3, table: "T1", type: "circle" },
  { id: 4, table: "T1", type: "circle" },
  { id: 6, table: "T1", type: "triangle" },
  { id: 7, table: "T1", type: "triangle" },
  { id: 8, table: "T1", type: "triangle" },
];

const header = [
  { id: 1, value: "Main dining hall" },
  { id: 2, value: "Roof Top" },
  { id: 3, value: "Bar with restaurant" },
  { id: 4, value: "Waiting" },
];

const AddTableView = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openSection, setSectionModal] = useState(false);
  const [activeheader, setActive] = useState(1);

  return (
    <div className="floor-sec">
      <div className="floor-header">
        <Link to="/">
          <MdKeyboardArrowLeft />
        </Link>
        <h2>Floor Plan</h2>
      </div>
      <div className="table-header">
        {header.map((list) => (
          <HeaderPick
            setActive={setActive}
            id={list.id}
            value={list.value}
            activeheader={activeheader}
          />
        ))}
      </div>
      <div className="table-view">
        {activeheader === 1 ? (
          <div className="table-border">
            {dataTable.map((label) => (
              <div
                key={label.id}
                style={{ flex: label.type === "rec" ? "0 0 30%" : "0 0 18%" }}
                className="inner-table"
              >
                <div>
                  <p>{label.table}</p>
                </div>
                <div>
                  <p>
                    <img src={tableOne} alt="table" />1
                  </p>

                  <p>
                    <img src={tableTwo} alt="table" />2
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {activeheader === 3 ? (
          <div className="table-border">
            {barTable.map((label) => (
              <div
                key={label.id}
                className={
                  label.type === "triangle" ? "diamond-shape" : "inner-round"
                }
              >
                {label.type === "circle" ? (
                  <>
                    <div>
                      <p>{label.table}</p>
                    </div>
                    <div>
                      <p>
                        <img src={tableOne} alt="table" />1
                      </p>

                      <p>
                        <img src={tableTwo} alt="table" />2
                      </p>
                    </div>
                  </>
                ) : (
                  <section>
                    <div>
                      <p>{label.table}</p>
                    </div>
                    <div style={{ marginLeft: "82px", marginTop: "-45px" }}>
                      <p>
                        <img src={tableOne} alt="table" />1
                      </p>

                      <p>
                        <img src={tableTwo} alt="table" />2
                      </p>
                    </div>
                  </section>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <FloorMenu
        openModal={openModal}
        setOpenModal={setOpenModal}
        openSection={openSection}
        setSectionModal={setSectionModal}
      />
    </div>
  );
};

const HeaderPick = ({ setActive, id, activeheader, value }) => {
  const [onEdit, setEdit] = useState(false);
  const [drop, setDrop] = useState(false);
  return (
    <div
      onClick={() => setActive(id)}
      className={activeheader === id ? "active" : ""}
      onMouseEnter={() => setEdit(true)}
      onMouseLeave={() => setEdit(false)}
    >
      <p>{value}</p>
      {onEdit === true ? <FaPencilAlt onClick={() => setDrop(!drop)} /> : null}
      {/* {drop === true ? (
        <ul className="table-dropdown">
          <span>
            <li>Edit</li>
            <li>Delete</li>
          </span>
        </ul>
      ) : null} */}
    </div>
  );
};

export default AddTableView;
