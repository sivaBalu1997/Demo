import React, { useState, useEffect, useMemo } from "react";
import Header from "./header";
import "../../styles/billings.scss";
import { ReactComponent as BackArrow } from "../../assets/svg/backArrow.svg";
import { ReactComponent as INRIcon } from "../../assets/svg/inrBlack.svg";
import { ReactComponent as TickIcon } from "../../assets/svg/tickMark.svg";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubscriptionPlan,
  createSubscription,
  clearSubscriptionRequest,
  getSubscriptionBillingDetails,
  clearUpdateSubscription,
  updateSubscriptionRequest,
} from "../../redux/actions/subscriptionActions";
import {
  ACTIVE_SUBSCRIPTION_STATUS,
  SELECTED_BRANCH_DATA,
} from "../../shared/constants";
import { ReactComponent as Loader } from "../../assets/svg/loader.svg";

import Button from "../common/Button";

const ChangePlan = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState();
  const authData = localStorage.getItem("CREDENTIALS");

  const locationId = useSelector(
    (state) => state.auth.credentials && state.auth.credentials.locationId
  );

  const subscriptionDetails = useSelector(
    (state) => state.subscription.subscriptionDetails
  );

  const plans = useSelector((state) => state.subscription.subscriptionPlan);

  const subscriptionShortURL = useSelector(
    (state) => state.subscription.subscriptionShortURL
  );

  const createSubscriptionLoading = useSelector(
    (state) => state.subscription.createSubscriptionLoading
  );

  const createSubscriptionSuccess = useSelector(
    (state) => state.subscription.createSubscriptionSuccess
  );

  const createSubscriptionFailure = useSelector(
    (state) => state.subscription.createSubscriptionFailure
  );

  const updateSubscriptionLoading = useSelector(
    (state) => state.subscription.updateSubscriptionLoading
  );

  const updateSubscriptionSuccess = useSelector(
    (state) => state.subscription.updateSubscriptionSuccess
  );

  const updateSubscriptionFailure = useSelector(
    (state) => state.subscription.updateSubscriptionFailure
  );

  const branch = localStorage.getItem(SELECTED_BRANCH_DATA);
  const branchDetails = branch && JSON.parse(branch);
  const getPlanLoading = useSelector(
    (state) => state.subscription.getPlanLoading
  );

  const getSubscriptionDetailsLoading = useSelector(
    (state) => state.subscription.getSubscriptionDetailsLoading
  );

  const isSubscriptionExisting = useMemo(() => {
    return (
      subscriptionDetails &&
      ACTIVE_SUBSCRIPTION_STATUS.includes(
        subscriptionDetails.subscriptionStatus
      )
    );
  }, [subscriptionDetails]);

  useEffect(() => {
    if (!authData) {
      history.push("/");
    }
  }, [authData]);

  const isLoadingState = useMemo(() => {
    return (
      getSubscriptionDetailsLoading ||
      getPlanLoading ||
      createSubscriptionLoading ||
      updateSubscriptionLoading
    );
  }, [
    getSubscriptionDetailsLoading,
    getPlanLoading,
    updateSubscriptionLoading,
    createSubscriptionLoading,
  ]);

  useEffect(() => {
    if (locationId && branch) {
      // if (subscriptionDetails == null) {
      dispatch(getSubscriptionBillingDetails({ locationId: branchDetails.id }));
      // }
      // plans.length == 0 &&
      dispatch(getSubscriptionPlan({ locationId: branchDetails.id }));
    }
  }, [locationId, branch]);

  useEffect(() => {
    if (
      !createSubscriptionLoading &&
      createSubscriptionSuccess &&
      subscriptionShortURL != null
    ) {
      dispatch(clearSubscriptionRequest());
      history.push("/management/billing");
      window.open(subscriptionShortURL, "_blank", "location=yes");
    } else if (!createSubscriptionLoading && createSubscriptionFailure) {
      clearSubscriptionRequest();
    }
  }, [
    subscriptionShortURL,
    createSubscriptionLoading,
    createSubscriptionSuccess,
    createSubscriptionFailure,
  ]);

  useEffect(() => {
    if (!updateSubscriptionLoading && updateSubscriptionSuccess) {
      clearUpdateSubscription();
    } else if (!updateSubscriptionLoading && updateSubscriptionFailure) {
      clearUpdateSubscription();
    }
  }, [
    updateSubscriptionLoading,
    updateSubscriptionSuccess,
    updateSubscriptionFailure,
  ]);

  const onCreateSubscription = () => {
    locationId &&
      selectedPlan &&
      branchDetails &&
      dispatch(
        createSubscription({
          locationId: branchDetails.id,
          planId: selectedPlan.details.authCode,
        })
      );
  };

  const updateSubscription = () => {
    locationId &&
      selectedPlan &&
      subscriptionDetails &&
      branchDetails &&
      dispatch(
        updateSubscriptionRequest({
          locationId: branchDetails.id,
          planId: selectedPlan.details.authCode,
          subscriptionId: subscriptionDetails.subscriptionId,
        })
      );
  };

  const handleSubmit = () => {
    isSubscriptionExisting ? updateSubscription() : onCreateSubscription();
  };

  return (
    <div className="container">
      <Header />
      <div className="changePlan-sub-header">
        <>
          <BackArrow onClick={() => history.goBack()} className="backButton" />
          <span className="sub-header-title">Plan details</span>
        </>
      </div>
      {isLoadingState ? (
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
        <React.Fragment>
          <div className="changePlan-content-container">
            <div className="changePlan-plan-list">
              {plans &&
                plans.map((data, i) => {
                  return (
                    <div
                      onClick={() => setSelectedPlan(data)}
                      className={
                        selectedPlan &&
                        selectedPlan.details.planName === data.details.planName
                          ? ` changePlan-plan-list-item changePlan-plan-list-item-active`
                          : " changePlan-plan-list-item"
                      }
                    >
                      <div className="plan-content-container">
                        <div className="changePlan-text-Container">
                          <span
                            className={
                              (selectedPlan &&
                                selectedPlan.details.planName ===
                                  data.details.planName) ||
                              !selectedPlan
                                ? `chnagePlan-plan-list-item-plan-text ${data.details.planName}`
                                : "chnagePlan-plan-list-item-plan-text"
                            }
                          >
                            {data.details.planName}
                          </span>
                        </div>
                        <div className="changePlan-text-Container">
                          <span
                            className={
                              (selectedPlan &&
                                selectedPlan.planName === data.planName) ||
                              !selectedPlan
                                ? `chnagePlan-plan-list-item-price-text `
                                : "chnagePlan-plan-list-item-price-text chnagePlan-plan-list-item-price-text-disable"
                            }
                          >
                            <INRIcon fill="#000" />{" "}
                            {Math.ceil(
                              (parseInt(data.details.costPrice) / 118) * 100
                            )}
                            *
                          </span>
                        </div>
                        <div style={{ width: "70%" }}>
                          {data &&
                            data.modules &&
                            data.modules.map((module, i) => {
                              return (
                                <span
                                  className={
                                    (selectedPlan &&
                                      selectedPlan.details.planName ===
                                        data.details.planName) ||
                                    !selectedPlan
                                      ? `chnagePlan-plan-list-item-facility-text`
                                      : "chnagePlan-plan-list-item-facility-text chnagePlan-plan-list-item-facility-text-disable"
                                  }
                                >
                                  {module.moduleName}
                                </span>
                              );
                            })}
                        </div>
                      </div>
                      <div>
                        {selectedPlan &&
                          selectedPlan.details.planName ===
                            data.details.planName && <TickIcon />}
                      </div>
                    </div>
                  );
                })}
            </div>
            <span className="changePlan-secondary-list">
              *Excludes Additional GST 18%
            </span>
          </div>
          <div className="changePlan-button-container">
            <Button
              value={"Cancel"}
              type="reset"
              backgroundColor={"#fff"}
              color={"#979797"}
              className="changePlan-submit-button"
              clickHandler={() => {
                setSelectedPlan(null);
              }}
            />
            <Button
              type="submit"
              backgroundColor={"#67833E"}
              color={"#fff"}
              className="changePlan-submit-button"
              clickHandler={() => {
                handleSubmit();
              }}
              value={
                isSubscriptionExisting
                  ? "Update Subscription"
                  : "Create Subscription"
              }
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ChangePlan;
