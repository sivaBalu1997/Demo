import React, { useState, useEffect } from "react";
import Header from "./header";
import "../../styles/billings.scss";
import { ReactComponent as BackArrow } from "../../assets/svg/backArrow.svg";
import { useHistory } from "react-router-dom";
import Button from "../../components/common/Button";

const CancelSubscription = () => {
  const history = useHistory();
  const authData = localStorage.getItem("CREDENTIALS");

  useEffect(() => {
    if (!authData) {
      history.push("/");
    }
  }, [authData]);

  return (
    <div className="container">
      <Header />
      <div className="changePlan-sub-header">
        <>
          <BackArrow onClick={() => history.goBack()} className="backButton" />
          <span className="sub-header-title">Stick with us </span>
        </>
      </div>

      <div className="cancelSub-content-container">
        <span className="cancelSub-answer-text">
          Switch to our basic plan for just /month and keep using our service,
          without interruption
        </span>
      </div>

      <div className="cancelSub-button-container">
        <Button
          value={"Compare plans"}
          type="reset"
          backgroundColor={"#fff"}
          color={"#979797"}
          className="changePlan-submit-button"
        />
        <Button
          type="submit"
          value="Proceed cancellation"
          backgroundColor={"#67833E"}
          color={"#fff"}
          className="changePlan-submit-button"
          clickHandler={() => {
            // handleCancel();
          }}
        />
      </div>
    </div>
  );
};

export default CancelSubscription;
