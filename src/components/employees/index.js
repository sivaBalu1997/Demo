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
import { clearMenuData } from "../../redux/actions/menuAction";

const Employees = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const credentials = useSelector((state) => state.auth.credentials);
  const employeeDetailsLoading = useSelector(
    (state) => state.employee.employeeDetailsLoading
  );
  const employeeDetailsFailure = useSelector(
    (state) => state.employee.employeeDetailsFailure
  );
  const employeeList = useSelector((state) => state.employee.employeeDetails);
  useEffect(() => {
    credentials?.merchantId && dispatch(getEmployees(credentials?.merchantId));
  }, [credentials?.merchantId]);


  // useEffect(() => {
  //   if (credentials) {
  //     dispatch(getEmployees(credentials?.merchantId));
  //   }
  // }, [credentials, employeeList.isActive])

  useEffect(() => {
    setLoading(employeeDetailsLoading);
    //console.log(employeeDetailsLoading, "employeeDetailsLoading");
  }, [employeeDetailsLoading, employeeList]);

  const logoutUser = () => {
    dispatch(clearMenuData());
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  }

  return (
    <>
      {loading ? (
        <div
          className="menu-items"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "25%",
          }}
        >
          Loading, Please wait!!
        </div>
      ) : employeeList?.length === 0 && !loading && employeeDetailsFailure === "" ? (
        <div className="menu-items">
         <div className="header-menu">
          <div style={{
            display:"flex",
            justifyContent:'space-between',
            width:'100%'
          }}>
            <h2 style={{color:"black"}}>Employees Management</h2>
            <div className="header">
          <p
            onClick={logoutUser}
            style={{
              marginLeft: "88%",
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              cursor: "pointer",
              // marginTop:"-30px",
            }}
          >
            <img src={logout} alt="Logout" height="20" />
            &nbsp; Log Out
          </p>
          <br />
          <br />
        </div>
          </div>
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
                  history.push("/management/employees/add");
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <EmployeeList loading={loading}/>
      )}
    </>
  );
};

export default Employees;
