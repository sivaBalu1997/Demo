import React, { useEffect, useState } from "react";
import "../../styles/auth.scss";
import SignIn from "./SignIn";
import { useHistory } from "react-router";
import { CREDENTIALS } from "../../shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { ClearSignIn, signOut, storeCredentials } from "../../redux/auth/authActions";

const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const credentails = JSON.parse(localStorage.getItem(CREDENTIALS));
    // console.log("Credentials:", credentails);
    if (credentails) {
      dispatch(storeCredentials(credentails));
      if (window.innerWidth <= 575) {
        history.push("/report/32");
      } else {
        history.replace("/employees");
      }
    }
  }, []);



  const [isLoggedin, setLogin] = useState(false);
  return <SignIn setLogin={setLogin} />;
};

export default Auth;
