import React, { useEffect } from "react";
import Header from "./header";
import "../../styles/billings.scss";
import { ReactComponent as BackArrow } from "../../assets/svg/backArrow.svg";
import { useHistory } from "react-router-dom";
import Button from "../common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubscriptionBillingDetails,
  clearUpdateSubscription,
  cancelSubscriptionRequest,
} from "../../redux/actions/subscriptionActions";
import { SELECTED_BRANCH_DATA } from "../../shared/constants";

const CancelSubscription = () => {
  const history = useHistory();
  const authData = localStorage.getItem("CREDENTIALS");

  const dispatch = useDispatch();

  const locationId = useSelector(
    (state) => state.auth.credentials && state.auth.credentials.locationId
  );

  const selectedBranch = localStorage.getItem(SELECTED_BRANCH_DATA);
  const branch = JSON.parse(selectedBranch);
  const subscriptionDetails = useSelector(
    (state) => state.subscription.subscriptionDetails
  );

  useEffect(() => {
    if (!authData) {
      history.push("/");
    }
  }, [authData]);

  useEffect(() => {
    if (selectedBranch && locationId && subscriptionDetails == null) {
      dispatch(getSubscriptionBillingDetails({ locationId: branch.id }));
    }
  }, [locationId, selectedBranch]);

  const getFormattedDate = (date) => {
    return new Date(date).toDateString();
  };

  return (
    <div className="container">
      <Header />
      <div className="changePlan-sub-header">
        <>
          <BackArrow onClick={() => history.goBack()} className="backButton" />
          <span className="sub-header-title">Cancel subscription</span>
        </>
      </div>

      <div className="cancelSub-content-container">
        <span className="cancelSub-question-text">
          Are you sure you dont need our service anymore?
        </span>
        {subscriptionDetails && (
          <span className="cancelSub-answer-text">
            Cancellation will be effective at the end of your billing period on
            {"  " +
              getFormattedDate(subscriptionDetails.currentBillingCycleEndDate)}
          </span>
        )}
      </div>

      <div className="cancelSub-button-container">
        <Button
          value={"Cancel"}
          type="reset"
          backgroundColor={"#fff"}
          color={"#979797"}
          className="changePlan-submit-button"
          clickHandler={() => {
            history.push("/management/billing");
          }}
        />
        <Button
          type="submit"
          value="Proceed"
          backgroundColor={"#67833E"}
          color={"#fff"}
          className="changePlan-submit-button"
          clickHandler={() => {
            history.push("/management/billing/stickWithUs");
          }}
        />
      </div>
    </div>
  );
};

export default CancelSubscription;
