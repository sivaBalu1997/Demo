import React, { useCallback, useEffect, useState } from "react";import { useDispatch, useSelector } from "react-redux";

import { API } from "../../redux/api";
import { getOutlets } from "../../redux/employee/employeeActions";
import { clearMenuData } from "../../redux/menu/menuAction";

import { signOut } from "../../redux/auth/authActions";
import { useHistory, useLocation } from "react-router";
import {
  IS_SPORT_VERTICAL,
  IS_SPORT_DOMAIN,
} from "../../shared/constants";
import SidePanel from "../SidePanel";
import CustomDropdown from "../../components/common/customDropdown/index";
import RoundedPill from "components/common/RoundedPill/RoundedPill";
import MiniCard from "components/common/MiniCard/MiniCard";
import SalesChart from "./salesReport";
import LinearBarChart from "./barChart";
import ReusableDropdown from "components/common/ReusableDropdown/ReusableDropdown";
const axios = require("axios");

const reportCategory = [{ id: 32, option: "Sales" }];

const CategoryReport = (props) => {
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
  const [activeBtn, setActiveBtn] = useState("categories");
  // console.log("qqqq8", { selectValue })
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

  const fetchData = async () => {
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
  };

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
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SidePanel />
      <div className="menu-items">
        <div className="header header-category">
          <h1 className="report-title">{"Reports & Insights"}</h1>
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
          </div>
        </div>
        <div>
          <div className="category-filters-section">
            <div className="category-store-name">
              <span>Store name</span>
              <h1>A2B, Princeton</h1>
            </div>
            <div className="category-dropdown-container">
              <div className="category-dropdown-sub-container">
                <span className="category-dropdown-text">Select date</span>
                <CustomDropdown
                  options={[{ value: "Sales", label: "Sales" }]}
                  value={"Sales"}
                  className="category-dropdown"
                />
                {/* <Dropdown data={[{id:"1",name:"Princeton",option:"Princeton"}]} className={"category-dropdown"}/> */}
              </div>
              <div className="category-dropdown-sub-container">
                <span className="category-dropdown-text">Select store</span>
                <CustomDropdown
                  options={[{ value: "Sales", label: "Sales" }]}
                  value={"Sales"}
                  className="category-dropdown"
                />
              </div>
            </div>
          </div>
          <div className="category-btn-switch">
            <button
              className={`category-btn  ${
                activeBtn == "categories" ? "active-btn" : ""
              }`}
              onClick={() => {
                setActiveBtn("categories");
              }}
            >
              Categories
            </button>
            <button
              className={`category-btn  ${
                activeBtn == "items" ? "active-btn" : ""
              }`}
              onClick={() => {
                setActiveBtn("items");
              }}
            >
              Items
            </button>
          </div>
          <div>
            <div className="select-categories-title-container">
              <span className="select-categories-title poppins-fw400-fs16">
                Select Categories{" "}
              </span>
              <span className="font-color-red poppins-fw400-fs16">*</span>
            </div>
            {/* <CustomDropdown
              options={[{ value: "Sales", label: "Sales" }]}
              className="select-food-item-dropdown"
              placeholder="Select Categories"
            /> */}
            <ReusableDropdown
              options={[{ value: "Sales", label: "Sales" },{ value: "Dosai", label: "Dosai" },{ value: "Veg Briyani", label: "Veg Briyani" }]}
              value={"Sales"}
              placeholder={"Select categories"}
              dropdownContainerClassName="select-food-item-dropdown-cotainer"
              dropdownClassName="select-food-item-dropdown"
              dropdownPrefix={"select-food-item-dropdown-prefix"}
            />
          </div>
          <RoundedPill data={[{ name: "Dosai" }, { name: "Cadai" }]} />
          <div>
            <h1 className="categories-overview-heading">Categories Overview</h1>
            <MiniCard
              data={[
                { title: "TOTAL SALES", value: "8500.90" },
                { title: "TOTAL SALES", value: "8500.90" },
                { title: "TOTAL SALES", value: "8500.90" },
                { title: "TOTAL SALES", value: "8500.90" },
                { title: "TOTAL SALES", value: "8500.90" },
              ]}
            />
          </div>
          <div>
            <h1 className="categories-overview-heading">Categories sales</h1>
            <LinearBarChart barColorCode={"#02B04C"} />
          </div>
          <div>
            <h1 className="categories-overview-heading">
              By Channels - Categories
            </h1>
            <SalesChart />
          </div>
          <div>
            <h1 className="categories-overview-heading">Categories Voids</h1>
            <LinearBarChart barColorCode={"#7D7774"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryReport;
