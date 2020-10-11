import React, { useEffect, useState } from "react";
import "../../styles/auth.scss";
import SignIn from "./SignIn";
import { useHistory } from "react-router";
import { CREDENTIALS } from "../../shared/constants";
import { useDispatch } from "react-redux";
import { storeCredentials } from "../../redux/actions/authActions";

const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const credentails = JSON.parse(localStorage.getItem(CREDENTIALS));
    // console.log("Credentials:", credentails);
    if (credentails) {
      dispatch(storeCredentials(credentails));
      history.replace("/management/employees");
    }
  }, []);

  const [isLoggedin, setLogin] = useState(false);
  return <SignIn setLogin={setLogin} />;
};

export default Auth;
