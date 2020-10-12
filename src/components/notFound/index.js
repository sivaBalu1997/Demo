import React from "react";
import "./styles.scss";
import { ReactComponent as Not_Found } from "../../assets/svg/notFound.svg";
import { ReactComponent as SVG_404 } from "../../assets/svg/404.svg";
import { useHistory } from "react-router";

const NotFound = () => {
  const history = useHistory();

  window.addEventListener("popstate", function (event) {
    if (localStorage.length === 0) {
      history.replace("/notFound");
    }
  })

  return (
    <div id="not-found-container">
      <Not_Found style={{ marginBottom: "4%" }} />
      <SVG_404 style={{ marginBottom: "3%" }} />
      <span style={{ marginBottom: "3%" }}>PAGE NOT FOUND</span>
      <div style={{ width: "100%" }}>
        <span>
          Oops.. the page you were looking for <br /> is not available.
        </span>
      </div>
      <button
        onClick={() => { history.push("/"); }}
        color="white"
        className="login-again-button"
      >LOGIN AGAIN</button>
    </div>
  );
};

export default NotFound;
