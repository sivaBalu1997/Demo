import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import "../../styles/auth.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { resetPassword } from "../../redux/actions/authActions";
import { useForm } from "react-hook-form";

import { ReactComponent as OpenEyeIcon } from "../../assets/svg/opened_eye.svg";
import { ReactComponent as ClosedEyeIcon } from "../../assets/svg/closed_eye.svg";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const credentials = useSelector((state) => state.auth.credentials);
  const resetPasswordLoading = useSelector(
    (state) => state.auth.resetPasswordLoading
  );
  const resetPasswordSuccess = useSelector(
    (state) => state.auth.resetPasswordSuccess
  );

  const [isPasswordVisible, SetIsPasswordVisible] = useState(false);
  const [isRepasswordVisible, setIsRepasswordVisible] = useState(false);

  const {
    handleSubmit,
    register,
    errors,
    setValue,
    getValues,
    control,
    formState,
  } = useForm();

  useEffect(() => {
    if (!resetPasswordLoading && resetPasswordSuccess) {
      history.push("/management/employees");
    }
  }, [resetPasswordLoading, resetPasswordSuccess]);

  const onSubmit = () => {
    if (password == repassword) {
      const userId = credentials.userId.split("@")[0];
      dispatch(
        resetPassword({
          businessName: credentials.businessName,
          userId: userId,
          password: password,
        })
      );
    }
  };

  return (
    <div className="otp_login">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="sign_form">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <input type="password" placeholder="Current password" /> */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              name="password"
              placeholder="Enter new password"
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
              ref={register()}
            />
            {
              isPasswordVisible ?
                <ClosedEyeIcon onClick={() => SetIsPasswordVisible(false)}
                  style={{
                    position: 'absolute',
                    paddingTop: '1%',
                    paddingRight: '1%'
                  }} />
                :
                <OpenEyeIcon onClick={() => SetIsPasswordVisible(true)}
                  style={{
                    position: 'absolute',
                    paddingTop: '1%',
                    paddingRight: '1%'
                  }} />
            }
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}>
            <input
              type={isRepasswordVisible ? "text" : "password"}
              name="repassword"
              value={repassword}
              placeholder="Re enter password"
              onChange={(event) => {
                setRePassword(event.currentTarget.value);
              }}
              ref={register()}
            />
            {
              isRepasswordVisible ?
                <ClosedEyeIcon onClick={() => setIsRepasswordVisible(false)}
                  style={{
                    position: 'absolute',
                    paddingTop: '1%',
                    paddingRight: '1%'
                  }} />
                :
                <OpenEyeIcon onClick={() => setIsRepasswordVisible(true)}
                  style={{
                    position: 'absolute',
                    paddingTop: '1%',
                    paddingRight: '1%'
                  }} />
            }
          </div>
          <button
            type="submit"
            // onClick={() => {
            //   console.log(errors);
            // }}
          >
            Reset Password
          </button>
        </form>
        <br /> <br />
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push("/management/employees");
          }}
        >
          skip for now
        </span>
      </div>
    </div>
  );
};

export default ResetPassword;
