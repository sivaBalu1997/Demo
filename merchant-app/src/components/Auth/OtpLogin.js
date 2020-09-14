import React from "react";
import logo from "../../assets/images/logo.png";
import "../../styles/auth.scss";

const OtpLogin = () => {
  return (
    <div className="otp_login">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="sign_form">
        <h4>Sign In To Access</h4>
        <form>
          <input type="email" placeholder="Enter Your Mail ID / Phone No." />
          <input type="number" placeholder="Enter OTP" />
          <button>Verify</button>
        </form>
        <p>
          Already Have An Account? <span>Sign In Now</span>
        </p>
      </div>
    </div>
  );
};

export default OtpLogin;
