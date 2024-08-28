import React, { useState, useEffect } from "react";
import "./styles.css";
import TextInput from "../../components/common/TextInput";
import Dropdown from "../../components/common/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { makePayment } from "../../redux/payment/paymentAction";
import { getRestaurantRequest } from "../../redux/auth/authActions";
import {
  NavLink,
  Link,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
const bankName = [
  { id: 1, option: "SBI" },
  { id: 2, option: "ICICI" },
  { id: 3, option: "Bank of Baroda" },
];

const AccountType = [
  { id: 1, option: "Saving" },
  { id: 2, option: "Current" },
];

const Payment = () => {
  const [BankName, setBankName] = useState(bankName);
  const [selectedTab, setselectedTab] = useState(1);
  const [value, setvalue] = useState({
    name: "",
    mobile: "",
    email: "",
    bank: "",
    accountType: "",
    accountNumber: "",
    IFSC: "",
    PAN: "",
  });

  const [errors, setErrors] = useState({
    name: { error: "", status: "" },
    mobile: { error: "", status: "" },
    email: { error: "", status: "" },
    bank: { error: "", status: "" },
    IFSC: { error: "", status: "" },
    accountType: { error: "", status: "" },
    accountNumber: { error: "", status: "" },
    PAN: { error: "", status: "" },
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };
  const restaurantLocation = useSelector(
    (state) => state.auth.restaurantDetails.country
  );

  const restaurantDetails = useSelector(
    (state) => state.auth.restaurantDetails
  );

  const data = useSelector((state) => state);

  const locationId = useSelector(
    (state) => state.auth.credentials && state.auth.credentials.locationId
  );

  const paymentDataLoading = useSelector(
    (state) => state.payment.makePaymentLoading
  );
  const paymentDataSuccess = useSelector(
    (state) => state.payment.makePaymentSuccess
  );
  const paymentDataFailedMessage = useSelector(
    (state) => state.payment.paymentFailedMessage
  );

  const paymentDataSuccessMessage = useSelector(
    (state) => state.payment.paymentSuccessData
  );

  const paymentDataFailed = useSelector(
    (state) => state.payment.makePaymentFailed
  );

  useEffect(() => {
    if (
      !paymentDataLoading &&
      !paymentDataSuccess &&
      paymentDataFailedMessage &&
      paymentDataFailed
    ) {
      alert(paymentDataFailedMessage);
    }
  }, [
    paymentDataLoading,
    paymentDataSuccess,
    paymentDataFailedMessage,
    paymentDataFailed,
  ]);

  useEffect(() => {
    if (
      !paymentDataLoading &&
      paymentDataSuccess &&
      paymentDataSuccessMessage
    ) {
      alert(paymentDataSuccessMessage);
      dispatch(getRestaurantRequest(locationId));
      history.push("/management/employees");
    }
  }, [paymentDataLoading, paymentDataSuccess, paymentDataSuccessMessage]);

  const onBlur = (e, i) => {
    const { value, name } = e.target;
    if (name === "IFSC") {
      if (value === "") {
        setErrors({
          ...errors,
          [name]: { error: `${name} code required`, status: "error" },
        });
      } else if (!/^[A-Za-z]{4}[a-zA-Z0-9]{7}$/.test(value)) {
        setErrors({
          ...errors,
          [name]: { error: `${name} code not valid`, status: "error" },
        });
      } else {
        setErrors({ ...errors, [name]: { error: "", status: "" } });
      }
    }

    if (name === "email") {
      if (value === "") {
        setErrors({
          ...errors,
          [name]: { error: `Email required`, status: "error" },
        });
      } else if (
        !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        setErrors({
          ...errors,
          [name]: { error: `Email not valid`, status: "error" },
        });
      } else {
        setErrors({ ...errors, [name]: { error: "", status: "" } });
      }
    }

    if (name === "accountNumber") {
      if (value === "") {
        setErrors({
          ...errors,
          [name]: { error: `Account number required`, status: "error" },
        });
      } else {
        setErrors({ ...errors, [name]: { error: "", status: "" } });
      }
    }

    if (name === "name") {
      if (value === "") {
        setErrors({
          ...errors,
          [name]: { error: `Name required`, status: "error" },
        });
      } else if (!/^.{4,}$/.test(value)) {
        setErrors({
          ...errors,
          [name]: { error: `Name not valid`, status: "error" },
        });
      } else {
        setErrors({ ...errors, [name]: { error: "", status: "" } });
      }
    }
  };

  return (
    <div style={{ width: "75%" }}>
      <div className="container">
        <div className="header-menu">
          <div>
            <h2 className="header-text">Payments</h2>
          </div>
        </div>
        <div>
          <div className="tab-container">
            <span
              onClick={() => setselectedTab(1)}
              className={selectedTab === 1 ? "tab active-tab" : "tab"}
            >
              Merchant Bank Details
            </span>
            {/* <span
              className={selectedTab === 2 ? "tab active-tab" : "tab"}
              onClick={() => setselectedTab(2)}
            >
              Other tabs
            </span> */}
          </div>
          <hr className="underline" />
        </div>
        {
          restaurantLocation === "IN" ? (
            <div style={{ flex: "0 0 30%", width: "30%", marginTop: "3rem" }}>
              <div className="input-field-container">
                <TextInput
                  placeholder="Account Holder Name"
                  type="text"
                  name="name"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={value.name}
                  onBlur={onBlur}
                  error={errors.name.error}
                  className="payment-input"
                  // style={{ fontSize: "14px !important" }}
                />
              </div>
              {/* <div className="input-field-container">
                <TextInput
                  placeholder="Account linked Mobile Number"
                  type="text"
                  name="mobile"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  onBlur={onBlur}
                />
              </div> */}
              <div className="input-field-container">
                <TextInput
                  placeholder="email ID"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={value.email}
                  type="text"
                  name="email"
                  onBlur={onBlur}
                  error={errors.email.error}
                  className="payment-input"
                />
              </div>
              {/* <div className="input-field-container">
                <Dropdown
                  color={"#979797"}
                  data={BankName}
                  // selectValue={banksName}
                  placeholder="Bank Name"
                  name="bank"
                  handleSelect={(e) => {
                    onChange(e);
                  }}
                />
              </div> */}
              {/* <div className="input-field-container">
                <Dropdown
                  color={"#979797"}
                  data={AccountType}
                  // selectValue={banksName}
                  placeholder="Account Type"
                  name="accountType"
                  handleSelect={(e) => {
                    onChange(e);
                  }}
                />
              </div> */}
              <div className="input-field-container">
                <TextInput
                  placeholder="Account  Number"
                  type="number"
                  name="accountNumber"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  value={value.accountNumber}
                  onBlur={onBlur}
                  error={errors.accountNumber.error}
                  className="payment-input"
                />
              </div>
              <div className="input-field-container">
                <TextInput
                  placeholder="IFSC Code"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  type="text"
                  name="IFSC"
                  onBlur={onBlur}
                  value={value.IFSC}
                  error={errors.IFSC.error}
                  className="payment-input"
                />
                {/* {errors.IFSC.error ? <span>{errors.IFSC.error}</span> : null} */}
              </div>
              {/* <div className="input-field-container">
                <TextInput
                  placeholder="PAN Number (Optional)"
                  type="text"
                  name="PAN"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  onBlur={onBlur}
                />
              </div> */}
            </div>
          ) : null
          // <div style={{ flex: "0 0 30%", width: "30%", marginTop: "3rem" }}>
          //   <div className="input-field-container">
          //     <TextInput
          //       placeholder="Full Beneficiary Name"
          //       type="text"
          //       name="name"
          //     />
          //   </div>

          //   <div className="input-field-container">
          //     <TextInput
          //       placeholder="Account Number"
          //       type="text"
          //       name="accountNumber"
          //     />
          //   </div>
          //   <div className="input-field-container">
          //     <TextInput
          //       placeholder="ABA Number (Routing Number)"
          //       type="text"
          //       name="ABA"
          //     />
          //   </div>
          //   <div className="input-field-container">
          //     <Dropdown
          //       color={"#979797"}
          //       data={BankName}
          //       // selectValue={banksName}
          //       placeholder="Bank Name"
          //       name="Bank Name"
          //     />
          //   </div>
          //   <div className="input-field-container">
          //     <TextInput
          //       placeholder="Bank Address"
          //       type="text"
          //       name="bankAddress"
          //     />
          //   </div>
          // </div>
        }
      </div>
      <div>
        <div className="footer">
          <div
            className="cancel-button button-text"
            onClick={() =>
              setvalue({
                name: "",
                mobile: "",
                email: "",
                bank: "",
                accountType: "",
                accountNumber: "",
                IFSC: "",
                PAN: "",
              })
            }
          >
            Reset
          </div>

          <div
            className="submit-button button-text"
            onClick={() => {
              const data = {
                name: value.name,
                locationId: restaurantDetails.id,
                paymentOptions: ["BHARAT_QR", "PAYMENT_LINKS"],
                partyName: restaurantDetails.branchName.split(",")[0],
                partyAddress: restaurantDetails.branchName.split(",")[1],
                email: value.email,
                ifscCode: value.IFSC,
                beneficiaryName: value.name,
                // accountType: value.accountType,
                accountNumber: value.accountNumber,
              };

              const { name, email, IFSC, accountType, accountNumber } = value;

              if (
                name &&
                email &&
                IFSC &&
                // accountType &&
                accountNumber &&
                !errors.name.error &&
                !errors.IFSC.error &&
                !errors.accountNumber.error &&
                // !errors.accountType.error &&
                !errors.email.error
              ) {
                dispatch(makePayment(data));
              }
            }}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
