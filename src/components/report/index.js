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
const Report = (props) => {

  const credentials = useSelector((state) => state.auth.credentials);
  const outlets = useSelector((state) => state.employee.outlets);
  const merchantId = credentials?.merchantId;
  const dispatch = useDispatch();
  const history = useHistory();
  const [iframeSource, setiFrameSource] = useState("");
  const [reportId, setReportId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
          console.log(res.data.url);
          setiFrameSource(res.data.url);
          setLoading(false);
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
      <div className="header-menu" style={{
        justifyContent: "space-between"
      }}>
        <div>
          <Stats className="menu-items-SVG" />
          <h2 style={{
            fontSize: '1.1vw'
          }}>{`Reports & Insights  >   ${props.title}`}</h2>
        </div>
        <CustomDropdown
          options={Array.from(outlets, (outlet) => outlet.locationName.split(",")[1])}
          placeholder={"Select Your Branch Here"}
          onSelect={(outletSelected) => {
            const outletObject = outlets.filter(
              (outlet) => outlet.locationName.includes(outletSelected.value)
            );
            setBranchId(outletObject[0].id);
            setBranchName(outletSelected.value);
            setReportId(props.id);
          }}
          value={branchName}
          name={"Branch"}
          controlClassName={"report-dropdown"}
          arrowClassName={"report-dropdown-arrow"}
        />
      </div>
      {iframeSource.length > 0 ?
        <iframe
          src={iframeSource}
          frameBorder="0"
          width="1000"
          height="5000"
          allowtransparency="true"
          scrolling="no"
        ></iframe> : loading ?
          <p className="menu-list" style={{ display: 'flex', justifyContent: 'center', paddingTop: '25%' }}>Loading, Please Wait!!!</p> :
          error !== "" ?
            <p className="menu-list" style={{ display: 'flex', justifyContent: 'center', paddingTop: '25%' }}>{error}</p> : null}
    </div>
  );
};

export default Report;
