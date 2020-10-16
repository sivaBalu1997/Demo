import React, { useState, useEffect, Fragment } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Search from "../common/Search";
import CustomDropdown from "../common/customDropdown";
import logout from "../../assets/images/logout.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signOut } from "../../redux/actions/authActions";
import MerchantLogo from "../../assets/images/thalappakatti.png";
import user from "../../assets/images/user_one.png";
import { ReactComponent as Employees } from "../../assets/svg/employees.svg";
import { ReactComponent as Add } from "../../assets/svg/add.svg";
import AddEmployee from "./AddEmployee";

const EmployeeList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const credentials = useSelector((state) => state.auth.credentials);
  const [headerDetails, setHeaderDetails] = useState({
    merchantName: "Thalapakatti Biriyani",
    merchantAddress: "Aarapalayam",
    merchantLogo: MerchantLogo,
    UserProfileImage: user
  });

  const logoutUser = () => {
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  };

  return (
    <>
      <div className="menu-items">
        <div className="header">
          {/* <img src={headerDetails.merchantLogo} />
            <div>
              <p>{headerDetails.merchantName}</p>
              <p>{headerDetails.merchantAddress}</p>
            </div>
            <img
              src={headerDetails.UserProfileImage}
              className="user-profile"
              alt="loading" /> */}
          <p onClick={logoutUser} style={{
            marginLeft: '88%',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}>
            <img src={logout} alt="Logout" height="20" />
              &nbsp; Log Out
            </p>
        </div>
        <div className="header-menu">
          <div>
            <Employees className="menu-items-SVG"
              style={{
                marginBottom: 5
              }} />
            <h2>Employees setup</h2>
          </div>
        </div>
        {props.employeeList ?
          <div className="menu-list" style={{
            paddingBottom: '3%'
          }}>
            <table width="100%" style={{ height: '50%' }}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Outlet </th>
                  <th>Contact</th>
                  <th>User ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.employeeList.map((row, index) => {
                  return (
                    <EmployeeRow
                      key={row.id}
                      serialNumber={index + 1}
                      name={row.name}
                      outlet={String(row.locationName).split(",")[1]}
                      contact={row.mobileNumber}
                      userId={row.userId}
                    />
                  );
                })}
              </tbody>
            </table>
            <button
              onClick={() => history.push("/management/employees/add")}
              type={"button"}
              className="add-button"
            >
              <Add />
            </button>
          </div> : null}
      </div>
    </>
  );
};

const EmployeeRow = ({ serialNumber, name, role, outlet, contact, userId }) => {
  const [show, setShow] = useState(false);
  return (
    <tr>
      <td>{serialNumber}</td>
      <td>{name}</td>
      <td>{outlet}</td>
      <td> {contact}</td>
      <td>{userId.split("@")[0]}</td>
      {/* <td>
        <BiDotsVerticalRounded onClick={() => setShow(!show)} />
        {show ? (
          <ul>
            <li>Edit</li>
            <li>Delete</li>
          </ul>
        ) : null}
      </td> */}
    </tr>
  );
};

export default EmployeeList;
