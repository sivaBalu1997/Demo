import React from "react";
import logo from "../../assets/images/logo.png";
import "../../styles/auth.scss";
import { Link } from "react-router-dom";

const SignUp = ({ setLogin }) => {
  return (
    <div className="otp_login">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="sign_form">
        <h4>Sign In To Access</h4>
        <form>
          <input type="email" placeholder="Enter Your Mail ID / Phone No." />
          <input type="password" placeholder="Enter Password" />

          <button>
            <Link to="/basic-details">Sign In </Link>
          </button>
        </form>
        <p>
          Don’t Have An Account Sign Up Now?{" "}
          <span onClick={() => setLogin(false)}>Register Now</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
