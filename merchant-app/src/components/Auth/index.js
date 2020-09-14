import React, { useState } from "react";
import OtpLogin from "./OtpLogin";
import "../../styles/auth.scss";
import SignUp from "./Signup";

const Auth = () => {
  const [isLoggedin, setLogin] = useState(false);
  return (
    <>
      {isLoggedin === false ? (
        <OtpLogin setLogin={setLogin} />
      ) : (
        <SignUp setLogin={setLogin} />
      )}
    </>
  );
};

export default Auth;
