import React, { useCallback, useEffect, useState } from "react";
import Menu from "../SidePanel";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/common/Search";
import Dropdown from "../../components/common/Dropdown";
import CustomDropdown from "../../components/common/customDropdown";
import { API } from "../../redux/api";
import { getOutlets } from "../../redux/employee/employeeActions";
import { clearMenuData } from "../../redux/menu/menuAction";
import MerchantLogo from "../../assets/images/thalappakatti.png";
import user from "../../assets/images/user_one.png";
import { ReactComponent as Stats } from "../../assets/svg/statistics.svg";
import logout from "../../assets/images/logout.png";
import { signOut } from "../../redux/auth/authActions";
import { useHistory, useLocation } from "react-router";
import {
  IS_SPORT_VERTICAL,
  STORAGE_BUCKET_URL,
  IS_SPORT_DOMAIN,
} from "../../shared/constants";
import { selectBranch } from "../../redux/auth/authActions";
import SidePanel from "../SidePanel";
const axios = require("axios");

const reportCategory = [{ id: 32, option: "Sales" }];

const Report = (props) => {
  const credentials = useSelector((state) => state.auth.credentials);
  const outlets = useSelector((state) => state.employee.outlets);
  const restaurantDetails = useSelector(
    (state) => state.auth.restaurantDetails
  );
  const merchantId = credentials?.merchantId;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [iframeSource, setiFrameSource] = useState("");
  const [reportId, setReportId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectValue, setSelectValue] = useState(
    location.state ? location.state : reportCategory[0].option
  );
  const [reportData, setReportData] = useState([]);
  const [singleBranchId, setSingleBranchId] = useState(
    restaurantDetails?.branch?.length > 0 && restaurantDetails?.branch[0].id
  );
  const branchDetails = useSelector((state) => state.auth.selectedBranch);

  useEffect(() => {
    getReportData(branchDetails?.id);
  }, []);

  useEffect(() => {
    if (outlets.length == 0 && credentials) {
      setBranchId(credentials?.locationId);
    }
  }, [outlets]);

  useEffect(() => {
    if (credentials) {
      dispatch(getOutlets(credentials?.merchantId));
    }
  }, [credentials]);

  useEffect(() => {
    if (reportId !== "") {
      fetchData();
    }
  }, [reportId, branchId]);

  const fetchData = async() =>  {
    setLoading(true);
    const token = credentials?.accessToken;
    API({
      method: "get",
      url:
        "/merchants/" +
        merchantId +
        "/location/" +
        branchId +
        "/reports/" +
        reportId,
      headers: {
        Authorization: "bearer " + token,
      },
    })
      .then((res) => {
        //console.log(res);
        if (res.status === 200) {
          //console.log(res.data.url);
          setiFrameSource(res.data.url);
          setLoading(false);
        } else {
          setError("please try again later");
        }
      })
      .catch((err) => {
        //console.log(err);
        setError("please try again later");
      });
  }

  const getReportData = async (locationId) => {
    const token = credentials?.accessToken;
    let reportId =
      restaurantDetails.country == "US" && location.pathname === "report/32"
        ? 41
        : restaurantDetails.country == "IN" && location.pathname === "report/32"
        ? 32
        : location.pathname === "/report/51"
        ? 51
        : location.pathname === "/report/57"
        ? 57
        : location.pathname === "/report/63"
        ? 63
        : location.pathname === "/report/67"
        ? 67
        : location.pathname === "/report/82"
        ? 82
        : 2;
    API({
      method: "get",
      url:
        "/merchants/" +
        merchantId +
        "/location/" +
        locationId +
        "/reports/" +
        reportId,
      headers: {
        Authorization: "bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setReportData(res.data?.url);
          setiFrameSource(res.data.url);
        } else {
          setError("please try again later");
        }
      })
      .catch((err) => {
        setError("please try again later");
      });
  };

  const logoutUser = () => {
    dispatch(clearMenuData());
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  };

  return (
    <div style={{display:'flex', flexDirection:'row'}}>
      <SidePanel />
      <div className="menu-items">
      <div className="header">
        <p
          className="logout-user"
          onClick={logoutUser}
          style={{
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          <img src={logout} alt="Logout" height="20" />
          &nbsp; Log Out
        </p>
      </div>
      <div
        className="report-checkin-dropDown"
        style={{ width: "100%", marginTop: "30px" }}
      >
        {/* <Dropdown
          color={"#979797"}
          data={reportCategory}
          selectValue={selectValue}
          handleSelect={handleSelect}
        /> */}
      </div>

      <div
        className="header-menu"
        style={{
          justifyContent: "space-between",
        }}
      >
        {/* <div>
          <Stats className="menu-items-SVG" />
          <h2
            style={{
              fontSize: "1.1vw",
            }}
          >{`Reports & Insights  >   ${props.title}`}</h2>
        </div> */}
        <div>
          {selectValue === "Sales" && (
            <div
              className={`${
                location.pathname === "/report/32" ? "selected" : "unselected"
              }`}
              onClick={() => history.push("/report/32", "Sales")}
            >
              Sales Report
            </div>
          )}
          {selectValue === "Sales" && (
            <div
              className={`tab ${
                location.pathname === "/report/82" ? "selected" : "unselected"
              }`}
              onClick={() => history.push("/report/82", "Sales")}
            >
              Category Report
            </div>
          )}
          {/* {
            <div
              className={` ${
                location.pathname === "/report/32"
                  ? "selected"
                  : "unselected"
              }`}
              onClick={() => history.push("/report/32", "Check In")}
            >
              Checkin Report
            </div>
          } */}

          {restaurantDetails.vertical == IS_SPORT_DOMAIN && (
            <div
              className={`tab ${
                location.pathname === "/management/report/67"
                  ? "selected"
                  : "unselected"
              }`}
              onClick={() => history.push("/management/report/67", "Sales")}
            >
              Enrolment tracker
            </div>
          )}
          {selectValue === "Sales" && (
            <div
              className={` ${
                location.pathname === "/report/57" ? "selected" : "unselected"
              }`}
              onClick={() => history.push("/report/57", "Sales")}
            >
              Product Insights
            </div>
          )}

          {
            <div
              className={`tab ${
                location.pathname === "/report/2" ? "selected" : "unselected"
              }`}
              onClick={() => history.push("/report/2", "Sales")}
            >
              Check-In Report
            </div>
          }

          {selectValue === "Sales" && (
            <div
              className={` ${
                location.pathname === "/report/51" ? "selected" : "unselected"
              }`}
              onClick={() => history.push("/report/51", "Sales")}
            >
              Customer Insights
            </div>
          )}
          {branchDetails.cusine != null &&
            branchDetails.cusine[0] != null &&
            branchDetails.cusine[0] == IS_SPORT_VERTICAL &&
            selectValue === "Sales" && (
              <div
                className={` ${
                  location.pathname === "/management/report/63"
                    ? "selected"
                    : "unselected"
                }`}
                onClick={() => history.push("/management/report/63", "Sales")}
              >
                Consolidated Report
              </div>
            )}
          {/* {selectValue === "Sales" && (
            <div
              className={`tab ${
                location.pathname === "/management/report/4"
                  ? "selected"
                  : "unselected"
              }`}
              onClick={() => history.push("/management/report/4", "Sales")}
            >
              Order insights
            </div>
          )} */}
          {/* {selectValue === "Sales" && (
            <div
              className={`tab ${
                location.pathname === "/management/report/12"
                  ? "selected"
                  : "unselected"
              }`}
              onClick={() => history.push("/management/report/12", "Sales")}
            >
              Sales insights
            </div>
          )} */}
          {/* <div
            className={`tab ${
              location.pathname === "/management/report/4"
                ? "selected"
                : "unselected"
            }`}
            style={{
              borderBottom:
                location.pathname === "/management/report/4"
                  ? "3px solid #67833E"
                  : "3px solid #fff",
              color:
                location.pathname === "/management/report/4"
                  ? "#67833E"
                  : "rgba(0, 0, 0, 0.5)",
            }}
            onClick={() => history.push("/management/report/4")}
          >
            Weekly Report
          </div> */}
        </div>
        {/* <CustomDropdown
          options={Array.from(
            outlets,
            (outlet) => outlet.locationName.split(",")[1]
          )}
          placeholder={"Select Branch"}
          onSelect={(outletSelected) => {
            const outletObject = outlets.filter((outlet) =>
              outlet.locationName.includes(outletSelected.value)
            );
            setBranchId(outletObject[0].id);
            setBranchName(outletSelected.value);
            setReportId(props.id);
          }}
          value={branchName}
          name={"Branch"}
          controlClassName={"report-dropdown"}
          arrowClassName={"report-dropdown-arrow"}
        /> */}
      </div>
      {reportData ? (
        <iframe
          className="reportData-deskTop"
          src={reportData}
          frameBorder="0"
          width="1000"
          height="5000"
          allowtransparency="true"
          scrolling="no"
        ></iframe>
      ) : loading ? (
        <p
          className="menu-list"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "25%",
          }}
        >
          Loading, Please Wait!!!
        </p>
      ) : error !== "" ? (
        <p
          className="menu-list"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "25%",
          }}
        >
          {error}
        </p>
      ) : null}
      {reportData && window.innerWidth <= 575 ? (
        <iframe
          className="reportData-mobile"
          src={reportData}
          frameBorder="0"
          width="1000"
          height="5000"
          allowtransparency="true"
          scrolling="no"
        ></iframe>
      ) : loading ? (
        <p
          className="menu-list"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "25%",
          }}
        >
          Loading, Please Wait!!!
        </p>
      ) : error !== "" ? (
        <p
          className="menu-list"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "25%",
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
    </div>
  );
};

export default Report;
