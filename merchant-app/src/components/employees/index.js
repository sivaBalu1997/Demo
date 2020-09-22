import React, { useState } from "react";
import empIcon from "../../assets/images/emp.png";
import AddEmployee from "./AddEmployee";
import { Link } from "react-router-dom";
import Menu from "../menu";
import Button from "../common/Button";

const Employees = () => {
  const [addEmployee, setAddEmployee] = useState(false);
  return (
    <>
      <Menu />
      {addEmployee === false ? (
        <div className="menu-items">
          <h2>Employees</h2>
          <div className="header-menu">
            <div className="empty-menu">
              <img src={empIcon} alt={"emp"} />
              <Button
                onClick={() => setAddEmployee(true)}
                type={"button"}
                value={"Add Employee"}
                backgroundColor={"#67833E"}
                color={"#fff"}
                iconType={"add"}
              />
            </div>
          </div>
        </div>
      ) : (
        <AddEmployee setAddEmployee={setAddEmployee} />
      )}
    </>
  );
};

export default Employees;
