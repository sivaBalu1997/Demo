import React, { useEffect, useMemo } from "react";
import "../../styles/billings.scss";
import { ReactComponent as INRIcon } from "../../assets/svg/inr.svg";

import { useHistory } from "react-router-dom";
import Header from "../billing/header";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubscriptionBillingDetails,
  getSubscriptionPlan,
} from "../../redux/subscription/subscriptionActions";
import moment from "moment";
import { ReactComponent as Loader } from "../../assets/svg/loader.svg";

const Billing = () => {
  const history = useHistory();
  const authData = localStorage.getItem("CREDENTIALS");

  const dispatch = useDispatch();

  const locationId = useSelector(
    (state) => state.auth.credentials && state.auth.credentials.locationId
  );
  const branch = useSelector((state) => state.auth.selectedBranch);

  const subscriptionDetails = useSelector(
    (state) => state.subscription.subscriptionDetails
  );

  const getSubscriptionDetailsLoading = useSelector(
    (state) => state.subscription.getSubscriptionDetailsLoading
  );

  const plans = useSelector((state) => state.subscription.subscriptionPlan);
  useEffect(() => {
    if (!authData) {
      history.push("/");
    }
  }, [authData]);
  useEffect(() => {
    if (locationId && branch) {
      branch.id &&
        dispatch(getSubscriptionBillingDetails({ locationId: branch.id }));
      branch.id && dispatch(getSubscriptionPlan({ locationId: branch.id }));
    }
  }, [locationId, branch]);

  const getPlanName = (planId) => {
    let filteredPlans = plans.filter((plans) => {
      return plans.details.authCode == planId;
    });
    if (filteredPlans && filteredPlans.length > 0) {
      return filteredPlans[0].details.planName;
    } else {
      return "";
    }
  };

  const getPlanAmount = (planId) => {
    let filteredPlans = plans.filter((plans) => {
      return plans.details.authCode == planId;
    });
    if (filteredPlans && filteredPlans.length > 0) {
      return Math.ceil(
        (parseInt(filteredPlans[0].details.costPrice) / 118) * 100
      ).toFixed(0);
    } else {
      return "";
    }
  };
  return (
    <>
      <div className="container">
        <Header />
        <div className="row1">
          <div className="row-header">
            <span className="row-header-text">Subscription</span>
          </div>
          { getSubscriptionDetailsLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20%",
              }}
            >
              <Loader height="100px" width="100px" />
            </div>
          ) : (
            <div className="row1-content">
              <div style={{ width: "50%" }}>
                <div className="row-table-container">
                  <div className="row-table-item">
                    <span className="row-table-key">Plan</span>
                    {subscriptionDetails ? (
                      <span className="row-table-value plan-name-text">
                        {getPlanName(subscriptionDetails.planId)}
                      </span>
                    ) : (
                      <span className="row-table-value renewal-date-text">
                        {"No Plan"}
                      </span>
                    )}
                  </div>
                  <div className="row-table-divider"></div>
                  <div className="row-table-item">
                    <span className="row-table-key">Renewal date</span>
                    <span className="row-table-value renewal-date-text">
                      {subscriptionDetails
                        ? moment(
                            subscriptionDetails.currentBillingCycleEndDate
                          ).format("DD MMM'YY")
                        : // new Date(
                          //     subscriptionDetails.subscriptionEndDate
                          //   ).toLocaleDateString()
                          "-"}
                    </span>
                  </div>
                  <div className="row-table-divider"></div>
                  <div className="row-table-item">
                    <span className="row-table-key">Bill amount</span>
                    {subscriptionDetails ? (
                      <span className="row-table-value bill-amount-text">
                        <INRIcon />
                        {getPlanAmount(subscriptionDetails.planId)}
                      </span>
                    ) : (
                      <span className="row-table-value renewal-date-text">
                        {"-"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="row-secondary-text-container">
                  <span className="row-secondary-text">
                    {subscriptionDetails ? (
                      <React.Fragment>
                        {"Your plan renews on " +
                          new Date(
                            subscriptionDetails.currentBillingCycleEndDate
                          ).toDateString()}
                      </React.Fragment>
                    ) : (
                      " "
                    )}
                  </span>
                  <span className="row-secondary-text italic">
                    You have opted for auto debit payment monthly
                  </span>
                </div>
              </div>

              <div className="row-options">
                {/* <span className="row-option-text">Manage payment</span> */}
                <span
                  className="row-option-text"
                  onClick={() => history.push("/management/billing/history")}
                >
                  Billing history
                </span>
                <span
                  className="row-option-text"
                  onClick={() => {
                    !subscriptionDetails &&
                      history.push("/management/billing/changeplan");
                  }}
                >
                  {/* {subscriptionDetails ? "Change plan" : "Start subscription"} */}
                  {!subscriptionDetails && "Start subscription"}
                </span>
                {subscriptionDetails && (
                  <span
                    className="row-option-text"
                    onClick={() =>
                      // history.push("/management/billing/cancelsubscription")
                      window.alert(
                        "Contact magilhub Support for cancelling the Subscription."
                      )
                    }
                  >
                    Cancel subscription
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        {/* <hr className="row-divider" /> */}
        {/* <div className="row1">
          <div className="row-header">
            <span className="row-header-text">Magilhub fees</span>
          </div>
          <div className="row1-content">
            <div style={{ width: "25%" }}>
              <div className="row-table-container">
                <div className="row-table-item">
                  <span className="row-table-key">Due date</span>
                  <span className="row-table-value renewal-date-text">
                    01 Sep’21
                  </span>
                </div>
                <div className="row-table-divider"></div>

                <div className="row-table-item">
                  <span className="row-table-key">Bill amount</span>
                  <span className="row-table-value bill-amount-text">
                    <INRIcon /> 899
                  </span>
                </div>
              </div>
              <div className="row-secondary-text-container">
                <span className="row-secondary-text italic">
                  You have opted for auto debit payment monthly{" "}
                </span>
              </div>
            </div>
            <div className="row-options">
              <span className="row-option-text">Manage payment</span>
              <span className="row-option-text">Transaction history</span>
            </div>
          </div>
        </div> */}
        {/* <hr className="row-divider" /> */}

        {/* <div className="row1">
          <div className="row-header">
            <span className="row-header-text">Add ons</span>
          </div>
          <div className="row1-content">
            <div>
              <div>
                <span className="row-secondary-text italic">
                  You’ve no add ons
                </span>
              </div>
            </div>
            <div className="row-options">
              <span className="row-option-text">Add new add ons</span>
              <span className="row-option-text">Add ons history</span>
            </div>
          </div>
        </div> */}
        {/* <hr className="row-divider" /> */}
        {/* <div className="row1">
          <div className="row-header">
            <span className="row-header-text">Refund wallet </span>
            <span> (used to refund for customers)</span>
          </div>
          <div className="row1-content">
            <div>
              <div className="row4-content">
                <span className="row-secondary-text ">Amount in wallet</span>
                <span className="row-table-value bill-amount-text">
                  <INRIcon /> 899
                </span>
              </div>
            </div>
            <div className="row-options">
              <span className="row-option-text">Recharge wallet</span>
              <span className="row-option-text">Refund history</span>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Billing;
