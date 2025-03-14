import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import "../../styles/auth.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  storeCredentials,
  ClearSignIn,
} from "../../redux/auth/authActions";
import { useHistory } from "react-router";

import { ReactComponent as OpenEyeIcon } from "../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/svg/closed_eye.svg";
import { ReactComponent as MagilHub } from "../../assets/svg/magilhubLogo.svg";

const SignIn = ({ setLogin }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm();

  const authState = useSelector((state) => state.auth);
  const [isPasswordVisible, SetIsPasswordVisible] = useState(false);

  const elementId = document.getElementById("pass");

  const onSubmit = (values) => {
    //console.log(values);
    dispatch(signIn(values));
  };

  useEffect(() => {
    if (!authState.signInLoading && authState.signedIn) {
      if (authState.credentials.isTempPassword) {
        history.push("/reset");
      } else {
        if (window.innerWidth <= 575) {
          history.push("/report/32");
          // history.push("/sales-reports");
        } else {
          history.push("/employees");
        }
      }
    } else {
      if (
        !authState.signInLoading &&
        authState.signInMessage != "" &&
        !authState.signedIn
      )
        alert(authState.signInMessage);
      dispatch(ClearSignIn());
    }
  }, [authState.signInLoading]);

  window.addEventListener("popstate", function (event) {
    if (localStorage.length === 0) {
      history.replace("/notFound");
    }
  });

  return (
    <div className="otp_login">
      <div className="logo logoContainer">
        {/* <img src={logo} alt="logo" /> */}
        <MagilHub className="magilhub-login-logo" />
        <span className="magilhub-logo2">Maghil</span>
      </div>
      <div className="sign_form">
        <h4>Sign In To Access</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div
            className="login--password"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
          <input
            type="text"
            name="businessName"
            placeholder="Enter Your Business Name"
            ref={register({ required: "Required" })}
            style={{display: "flex", justifyContent:"center", alignItems:"center"}}
          />
        </div>
        <div
            className="login--password"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
          <input
            type="text"
            name="userId"
            placeholder="Enter Your User ID"
            ref={register({ required: "Required" })}
          />
          </div>
          <div
            className="login--password"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              ref={register({ required: "Required" })}
            />
            {isPasswordVisible ? (
              <OpenEyeIcon
                onClick={() => SetIsPasswordVisible(false)}
                style={{
                  position: "absolute",
                  paddingTop: "1%",
                  left: window.innerWidth <= 600 ? "80%" : "93%",
                  width: "fit-content"
                }}
                className=""
              />
            ) : (
              <ClosedEyeIcon
                onClick={() => SetIsPasswordVisible(true)}
                style={{
                  position: "absolute",
                  paddingTop: "1%",
                  left: window.innerWidth <= 600 ? "80%" : "93%",
                  width: "fit-content"
                }}
              />
            )}
          </div>
          {/* <Link to="/reset">
            <p className="f_psd">Forgot Password ?</p>
          </Link> */}
          <div style={{display: "flex", justifyContent: "center", "alignItems": "center"}}>
          <button type="submit">
            {" "}
            {authState.signInLoading ? "Signing In" : "Sign In"}{" "}
          </button>
          </div>
        </form>

        {/* <p>
          Don’t Have An Account Sign Up Now?{" "}
          <span onClick={() => setLogin(false)}>Register Now</span>
        </p> */}
      </div>
    </div>
  );
};

export default SignIn;