import React, { useEffect, useState } from "react";
import Menu from "../menu";
import { useSelector } from 'react-redux';
import Search from "../common/Search";
import CustomDropdown from "../common/customDropdown";
import Store from "../../redux/store";
import API from "../../redux/api/api";

const axios = require('axios');
const Report = () => {
    const credentials = useSelector((state) => state.auth.credentials);
    const id = credentials?.merchantId;

    const [iframeSource, setiFrameSource] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

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
            <div style={{
                paddingLeft: '5%'
            }}>
                <div className="header-menu" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                    <h2>Report</h2>
                    <div style={{ width: '40%' }}>
                        <Search />
                    </div>
                </div>
                <div className="drop-list" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '70%',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ width: '50%', marginRight: '2%' }}>
                        <CustomDropdown
                            placeholder="Select report"
                        /></div>
                    <div style={{ width: '30%' }}>
                        <CustomDropdown
                            placeholder="Branch"
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
                    ></iframe> : null}
            </div>
        </>
    );
};

export default Report;
