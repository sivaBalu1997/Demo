import React, { useEffect, useState } from "react";
import Menu from "../menu";
import { useDispatch, useSelector } from "react-redux";
import Search from "../common/Search";
import CustomDropdown from "../common/customDropdown";
import API from "../../redux/api/api";
import { getOutlets } from "../../redux/actions/employeeActions";

const axios = require("axios");
const Report = () => {
  const credentials = useSelector((state) => state.auth.credentials);
  const outlets = useSelector((state) => state.employee.outlets);
  const merchantId = credentials?.merchantId;
  const dispatch = useDispatch();
  const [iframeSource, setiFrameSource] = useState("");
  const [reportId, setReportId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [error, setError] = useState(false);

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

  return (
    <>
      <Menu />
      <div
        style={{
          paddingLeft: "5%",
          width: "75%",
        }}
      >
        <div
          className="header-menu"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ fontWeight: 500 }}>Report</h2>
          <div style={{ width: "40%" }}>{/* <Search /> */}</div>
        </div>
        <div
          className="drop-list"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "70%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "50%", marginRight: "2%" }}>
            <CustomDropdown
              placeholder="Select report"
              name="report"
              options={["Daily Report", "Today Report"]}
              onSelect={(selectedReport) => {
                if (selectedReport.value == "Daily Report") {
                  setReportId("2");
                } else {
                  setReportId("1");
                }
              }}
            />
          </div>
          <div style={{ width: "50%" }}>
            <CustomDropdown
              options={Array.from(outlets, (outlet) => outlet.locationName)}
              placeholder={"Branch"}
              onSelect={(outletSelected) => {
                const outletObject = outlets.filter(
                  (outlet) => outlet.locationName == outletSelected.value
                );
                setBranchId(outletObject[0].id);
                setBranchName(outletSelected.value);
              }}
              value={branchName}
              name={"Branch"}
            />
          </div>
        </div>
        <div style={{ width: "100%" }}>
          {iframeSource.length > 0 ? (
            <iframe
              src={iframeSource}
              frameBorder="0"
              width="1000"
              height="600"
              allowtransparency="true"
              style={{
                width: "100%",
                height: "1500px",
                flex: 1,
              }}
            ></iframe>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Report;
