import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import "../../styles/auth.scss";
import { useDispatch, useSelector } from "react-redux";
import { signIn, storeCredentials } from "../../redux/actions/authActions";
import { useHistory } from "react-router";
const SignIn = ({ setLogin }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm();

  const authState = useSelector((state) => state.auth);

  const onSubmit = (values) => {
    console.log(values);
    dispatch(signIn(values));
  };

  useEffect(() => {
    if (!authState.signInLoading && authState.signedIn) {
      if (authState.credentials.isTempPassword) {
        history.push("/reset");
      } else {
        history.push("/employees");
      }
    }
  }, [authState.signInLoading]);

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
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            ref={register({ required: "Required" })}
          />
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
