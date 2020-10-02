import React, { useState, useEffect } from "react";
import empIcon from "../../assets/images/emp.png";
import AddEmployee from "./AddEmployee";
import { Link, useHistory } from "react-router-dom";
import Menu from "../menu";
import Button from "../common/Button";
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from "../../redux/actions/employeeActions";
import EmployeeList from "./EmployessList";

const Employees = () => {
  const [addEmployee, setAddEmployee] = useState(false);
  const dispatch = useDispatch();
  const credentials = useSelector((state) => state.auth.credentials);
  const employeeDetailsLoading = useSelector((state) => state.employee.employeeDetailsLoading);
  const employeeDetailsFailure = useSelector((state) => state.employee.employeeDetailsLoading);
  const employeeList = useSelector((state) => state.employee.employeeDetails);

  useEffect(() => {
    dispatch(getEmployees(credentials?.merchantId));
  }, []);

  return (
    <>
      <Menu />
      {employeeList?.length === 0 ? addEmployee === false ? (
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
      ) : {}(
        <AddEmployee setAddEmployee={setAddEmployee} />
      ) : (
          <EmployeeList employeeList={employeeList} />
        )}
    </>
  );
};

export default Employees;
