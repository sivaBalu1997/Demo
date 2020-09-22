import React from "react";
import logo from "../../assets/images/logo.png";
import "../../styles/auth.scss";
import { Link } from "react-router-dom";

const ForgotPsd = () => {
  return (
    <div className="otp_login">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="sign_form">
        <h4>Reset Password</h4>
        <form>
          <input type="password" placeholder="Current password" />
          <input type="password" placeholder="Enter new password" />
          <input type="password" placeholder="Re enter password" />
          <button>
            <Link to="/basic-details">Reset password</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPsd;
