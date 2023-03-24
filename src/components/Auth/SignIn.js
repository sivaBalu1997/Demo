import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import "../../styles/auth.scss";
import { useDispatch, useSelector } from "react-redux";
import { signIn, storeCredentials,ClearSignIn } from "../../redux/actions/authActions";
import { useHistory } from "react-router";

import { ReactComponent as OpenEyeIcon } from "../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/svg/closed_eye.svg";

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
          history.push("/management/report/32");
        } else {
          history.push("/management/employees");
        }
      }
    }
    else{ if (!authState.signInLoading && authState.signInMessage!="" && !authState.signedIn)
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
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="sign_form">
        <h4>Sign In To Access</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="businessName"
            placeholder="Enter Your Business Name"
            ref={register({ required: "Required" })}
          />
          <input
            type="text"
            name="userId"
            placeholder="Enter Your User ID"
            ref={register({ required: "Required" })}
          />
          <div
              className="login--password"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              ref={register({ required: "Required" })}
            />
            {isPasswordVisible ? (
              <ClosedEyeIcon
                onClick={() => SetIsPasswordVisible(false)}
                style={{
                  position: "absolute",
                  paddingTop: "1%",
                  paddingRight: "1%",
                }}
              />
            ) : (
              <OpenEyeIcon
                onClick={() => SetIsPasswordVisible(true)}
                style={{
                  position: "absolute",
                  paddingTop: "1%",
                }}
              />
            )}
          </div>
          {/* <Link to="/reset">
            <p className="f_psd">Forgot Password ?</p>
          </Link> */}
          <button type="submit">
            {" "}
            {authState.signInLoading ? "Signing In" : "Sign In"}{" "}
          </button>
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
