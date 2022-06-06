import React, { useEffect, useMemo } from "react";
import Header from "./header";
import { useHistory } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/svg/backArrow.svg";
import { ReactComponent as INRIcon } from "../../assets/svg/inrBlack.svg";
import { ReactComponent as VisaIcon } from "../../assets/svg/visaIcon.svg";
import { ReactComponent as MasterCardIcon } from "../../assets/svg/masterCardIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubscriptionBillingDetails,
  getSubscriptionPlan,
} from "../../redux/actions/subscriptionActions";
import { ReactComponent as Loader } from "../../assets/svg/loader.svg";
import moment from "moment";

const BillingHistory = () => {
  const history = useHistory();
  const authData = localStorage.getItem("CREDENTIALS");
  const dispatch = useDispatch();

  const subscriptionDetails = useSelector(
    (state) => state.subscription.subscriptionDetails
  );
  const authState = useSelector((state) => state.auth);

  const invoiceDetails = useSelector(
    (state) => state.subscription.invoiceDetails
  );
  const branchDetails = useSelector((state) => state.auth.selectedBranch);

  const locationId = useSelector(
    (state) => state.auth.credentials && state.auth.credentials.locationId
  );

  const plans = useSelector((state) => state.subscription.subscriptionPlan);

  const getSubscriptionDetailsLoading = useSelector(
    (state) => state.subscription.getSubscriptionDetailsLoading
  );
  
  const getPlanLoading = useSelector(
    (state) => state.subscription.getPlanLoading
  );

  const isLoadingState = useMemo(() => {
    return getSubscriptionDetailsLoading || getPlanLoading;
  }, [getSubscriptionDetailsLoading, getPlanLoading]);

  useEffect(() => {
   
    if (branchDetails && branchDetails.id) {
      // if (subscriptionDetails == null) {
      dispatch(getSubscriptionBillingDetails({ locationId: branchDetails.id }));
      // }
      // plans.length == 0 &&
      dispatch(getSubscriptionPlan({ locationId: branchDetails.id }));
    }
  }, [branchDetails]);
  const getFormattedDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const getPaymentDetails = (paymentDetails) => {
    if (paymentDetails.paymentMethod == "card") {
      if (paymentDetails.cardType === "VISA") {
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <VisaIcon /> **** **** **** {paymentDetails.cardNumber}
          </span>
        );
      } else if (paymentDetails.cardType === "MASTER") {
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <MasterCardIcon />
            **** **** **** {paymentDetails.cardNumber}
          </span>
        );
      } else {
        return "CARD - **** **** **** " + paymentDetails.cardNumber;
      }
    } else if (paymentDetails.paymentMethod == "upi") {
      return "UPI ID - " + paymentDetails.upi;
    } else if (paymentDetails.paymentMethod == "wallet") {
      return "WALLET - " + paymentDetails.walletName;
    } else {
      return paymentDetails.paymentMethod;
    }
  };

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
      return (
        Math.ceil((parseInt(filteredPlans[0].details.costPrice) / 118) *
        100
      )).toFixed(2);
    } else {
      return "";
    }
  };

  const getRazorpayAmount = (amount) => {
    return amount * 0.01;
  };
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
          <span className="sub-header-title">Billing History </span>
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
          <div style={{ width: "50%", marginTop: "2rem" }}>
            <div className="row-table-container">
              <div className="row-table-item">
                <span className="row-table-key">Plan</span>
                {subscriptionDetails ? (
                  <span className="row-table-value plan-name-text">
                    {getPlanName(subscriptionDetails.planId)}
                  </span>
                ) : (
                  <span className="row-table-value renewal-date-text">
                    {"-"}
                  </span>
                )}
              </div>
              <div className="row-table-divider"></div>
              <div className="row-table-item">
                <span className="row-table-key">Next bill</span>
                {subscriptionDetails ? (
                  <span className="row-table-value renewal-date-text">
                    {/* {new Date(
                      subscriptionDetails.currentBillingCycleEndDate
                    ).toDateString()} */}
                    {moment(
                      subscriptionDetails.currentBillingCycleEndDate
                    ).format("DD MMM'YY")}
                  </span>
                ) : (
                  <span className="row-table-value renewal-date-text">
                    {"-"}
                  </span>
                )}
              </div>
              <div className="row-table-divider"></div>
              <div className="row-table-item">
                <span className="row-table-key">Amount</span>
                {subscriptionDetails ? (
                  <span className="row-table-value renewal-date-text">
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
          </div>
          <div>
            <table width="100%" style={{ height: "50%", marginTop: "30px" }}>
              <thead>
                <tr className="billingHistory-table-header">
                  <th>Date</th>
                  <th>Billing cycle</th>
                  <th>Payment method </th>
                  <th>Subscription</th>
                  <th>Tax</th>
                  <th>Total amount</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {invoiceDetails &&
                  invoiceDetails.map((invoice, idx) => {
                    return (
                      <tr className="billingHistory-table-data">
                        <td>{getFormattedDate(invoice.invoiceDate)}</td>
                        <td>
                          {getFormattedDate(invoice.billingCycleStartDate)}
                          {"-"}
                          {getFormattedDate(invoice.billingCycleEndDate)}
                        </td>
                        <td>
                          {/* {u.paymentMethod === "visa" ? (
                            <VisaIcon />
                          ) : (
                            <MasterCardIcon />
                          )} */}
                          {getPaymentDetails(invoice.paymentDetails)}
                        </td>
                        <td>
                          {getPlanName(invoice.planId)} {"-"}{" "}
                          <INRIcon fill="#000" height="12px" />{" "}
                          {getPlanAmount(invoice.planId)}
                        </td>
                        <td>
                          <INRIcon fill="#000" height="12px" />{" "}
                          {(
                            getRazorpayAmount(invoice.amount) -
                            (parseInt(getRazorpayAmount(invoice.amount)) /
                              118) *
                              100
                          ).toFixed(2)}
                        </td>{" "}
                        <td>
                          {" "}
                          <INRIcon fill="#000" height="12px" />{" "}
                          {getRazorpayAmount(invoice.amount)}
                        </td>
                        <td>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              window.open(invoice.invoiceUrl);
                            }}
                          >
                            <p
                              style={{
                                color: "blue",
                                textDecoration: "underline",
                              }}
                            >
                              {"View"}
                            </p>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default BillingHistory;
