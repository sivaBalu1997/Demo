import React, { useState, useEffect } from "react";
import empIcon from "../../assets/images/emp.png";
import AddEmployee from "./AddEmployee";
import Menu from "../menu";
import { useHistory } from "react-router";
import Button from "../common/Button";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "../../redux/actions/employeeActions";
import EmployeeList from "./EmployessList";
import logout from "../../assets/images/logout.png";
import { signOut } from "../../redux/actions/authActions";

const Employees = () => {
  const [addEmployee, setAddEmployee] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const credentials = useSelector((state) => state.auth.credentials);
  const employeeDetailsLoading = useSelector(
    (state) => state.employee.employeeDetailsLoading
  );
  const employeeDetailsFailure = useSelector(
    (state) => state.employee.employeeDetailsLoading
  );
  const employeeList = useSelector((state) => state.employee.employeeDetails);

  useEffect(() => {
    dispatch(getEmployees(credentials?.merchantId));
  }, []);

  useEffect(() => {
    if (!addEmployee && credentials) {
      dispatch(getEmployees(credentials?.merchantId));
    }
  }, [addEmployee, credentials]);

  const logoutUser = () => {
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  };

  return (
    <>
      <Menu />
      {employeeList?.length === 0 && !addEmployee ? (
        <div className="menu-items">
          <div id="employee_header">
            <h2>Employees</h2>
            <p onClick={logoutUser}>
              {" "}
              <img src={logout} alt="Logout" height="20" /> &nbsp; Logout
            </p>
          </div>

          <div className="header-menu">
            <div className="empty-menu">
              <img src={empIcon} alt={"emp"} />
              <Button
                type={"button"}
                value={"Add Employee"}
                backgroundColor={"#67833E"}
                color={"#fff"}
                iconType={"add"}
                clickHandler={() => {
                  setAddEmployee(true);
                }}
              />
            </div>
          </div>
        </div>
      ) : addEmployee ? (
        <AddEmployee setAddEmployee={setAddEmployee} />
      ) : (
        <EmployeeList
          employeeList={employeeList}
          setAddEmployee={setAddEmployee}
        />
      )}
    </>
  );
};

export default Employees;
