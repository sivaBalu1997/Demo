import React, { useEffect, useState } from "react";
import Menu from "../menu";
import { useSelector } from 'react-redux';
import MerchantLogo from "../../assets/images/thalappakatti.png";
import user from "../../assets/images/user_one.png";
import API from "../../redux/api/api";
import Search from "../common/Search";
import { ReactComponent as Stats } from "../../assets/svg/statistics.svg";

const axios = require('axios');
const Report = () => {
    const credentials = useSelector((state) => state.auth.credentials);
    const id = credentials?.merchantId;

    const [iframeSource, setiFrameSource] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

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
            url: "/merchants/" + id + "/reports/" + id + "/",
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

    return (
        <>
            <Menu />
            <div className="menu-items">
                <div className="header">
                    <img src={headerDetails.merchantLogo} />
                    <div>
                        <p>{headerDetails.merchantName}</p>
                        <p>{headerDetails.merchantAddress}</p>
                    </div>
                    <img
                        src={headerDetails.UserProfileImage}
                        className="user-profile"
                        alt="loading" />
                </div>
                <div className="header-menu">
                    <div>
                        <Stats className="menu-items-SVG"
                            style={{
                                marginBottom: 5
                            }} />
                        <h2>{"Reports & Insights  >   Daily Report"}</h2>
                    </div>
                    <Search />
                </div>
                {iframeSource.length > 0 ?
                    <iframe
                        src={iframeSource}
                        frameBorder="0"
                        width="1000"
                        height="600"
                        allowtransparency="true"
                    ></iframe> : null}
            </div>
        </>
    );
};

export default Report;
