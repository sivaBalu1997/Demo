import React, { useState } from "react";
import "../../../styles/table-mangagement/menu.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const allOrders = [
  { id: 1, order: "Order no 0102AB001", table: ["Table 01", "Table 02AB"] },
  {
    id: 2,
    order: "Order no 0102AB001",
    table: ["Table 04", "Table 05", "Table 06AB"],
  },
  { id: 3, order: "Order no 0102AB001", table: ["Table 01", "Table 02AB"] },
  { id: 4, order: "Order no 0102AB001", table: ["Table 05", "Table 06AB"] },
];

const menuTab = [
  { id: 1, tab: "All orders" },
  { id: 2, tab: "Pending" },
  { id: 3, tab: "Cancelled" },
];
const Menu = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [activeNav, setActiveNav] = useState(false);
  console.log(activeNav);
  return (
    <div className="menu" style={{ width: activeNav === true ? "55%" : "2%" }}>
      {activeNav === false ? (
        <div onClick={() => setActiveNav(!activeNav)} className="toggle-button" style={{ right: activeNav === true ? "0" : "-29px" }}>
          <FaAngleRight />
        </div>
      ) : (
        <div>
          <ul>
            {menuTab.map((tablist) => (
              <li
                className={activeTab === tablist.id ? "active" : ""}
                onClick={() => setActiveTab(tablist.id)}
                key={tablist.id}
              >
                {tablist.tab}
              </li>
            ))}
          </ul>
          <div>
            {activeTab === 1 ? (
              <div>
                {allOrders.map((list) => (
                  <div key={list.id} className="menu-list">
                    <h3>{list.order}</h3>
                    <div className="table-list">
                      {list.table.map((view) => (
                        <p>{view}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {activeTab === 2 ? (
              <div>
                <p>No Pendings</p>
              </div>
            ) : null}
            {activeTab === 3 ? (
              <div>
                <p>empty</p>
              </div>
            ) : null}
          </div>
          <div
            onClick={() => setActiveNav(!activeNav)}
            className="toggle-button"
          >
            <FaAngleLeft />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
