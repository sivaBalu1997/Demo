import React, { useEffect, useState } from "react";
import Menu from "../menu";
import { useDispatch, useSelector } from "react-redux";
import Search from "../common/Search";
import CustomDropdown from "../common/customDropdown";
import API from "../../redux/api/api";
import { getOutlets } from "../../redux/actions/employeeActions";
import MerchantLogo from "../../assets/images/thalappakatti.png";
import user from "../../assets/images/user_one.png";
import { ReactComponent as Stats } from "../../assets/svg/statistics.svg";
import logout from "../../assets/images/logout.png";
import { signOut } from "../../redux/actions/authActions";
import { useHistory } from "react-router";

const axios = require("axios");
const Report1 = (props) => {

  const credentials = useSelector((state) => state.auth.credentials);
  const outlets = useSelector((state) => state.employee.outlets);
  const merchantId = credentials?.merchantId;
  const dispatch = useDispatch();
  const history = useHistory();
  const [iframeSource, setiFrameSource] = useState("");
  const [reportId, setReportId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (credentials) {
      dispatch(getOutlets(credentials?.merchantId));
    }
    console.log(props.id, 'id');
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

  const [headerDetails, setHeaderDetails] = useState({
    merchantName: "Thalapakatti Biriyani",
    merchantAddress: "Aarapalayam",
    merchantLogo: MerchantLogo,
    UserProfileImage: user
  });

  async function fetchData() {
    const token = credentials?.accessToken;
    API({
      method: "get",
      url: "/merchants/" + branchId + "/reports/" + reportId + "/",
      headers: {
        Authorization: "bearer " + token,
      },
    })
      .then(res => {
        //console.log(res);
        if (res.status === 200) {
          console.log(res.data.url);
          setiFrameSource(res.data.url);
        }
        else {
          setError("please try again later");
        }
      }).catch(err => {
        console.log(err);
        setError("please try again later");
      })
  }
  useEffect(() => {
    if (reportId !== "") {
      fetchData();
    }
  }, [reportId, branchId]);

  async function fetchData() {
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
          console.log(res.data.url);
          setiFrameSource(res.data.url);
        } else {
          setError("please try again later");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("please try again later");
      });
  }

  const logoutUser = () => {
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  };

  return (
    <>
      <Menu />
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
          <img onClick={logoutUser} src={logout} alt="Logout" height="20" style={{ marginLeft: '90%' }} /> &nbsp; Logout
        </div>
        <div className="header-menu"
        style={{
            justifyContent: "space-between"
          }}>
          <div>
            <Stats className="menu-items-SVG"
              style={{
                marginBottom: 10
              }}  />
            <h2
            style={{
                marginBottom: 10
              }} >{"Reports & Insights  >   Daily Report"}</h2>
          </div>
          <div style={{
           marginTop:40,
          }}>
            <CustomDropdown
              options={Array.from(outlets, (outlet) => outlet.locationName)}
              placeholder={"Branch"}
              onSelect={(outletSelected) => {
                const outletObject = outlets.filter(
                  (outlet) => outlet.locationName == outletSelected.value
                );
                setBranchId(outletObject[0].id);
                setBranchName(outletSelected.value);
                setReportId("2");
              }}
              value={branchName}
              name={"Branch"}
            />
          </div>
        </div>
        {iframeSource.length > 0 ?
          <iframe
            src={iframeSource}
            frameBorder="0"
            width="1000"
            height="600"
            allowtransparency="true"
            scrolling="hidden"
          ></iframe> : null}
      </div>
    </>
  );
};

export default Report1;
