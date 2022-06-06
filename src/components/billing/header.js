import React from "react";
import { ReactComponent as BillingIcon } from "../../assets/svg/billingHeader.svg";

const Header = () => {
  return (
    <div>
      <div className="title-header">
        <BillingIcon />
        &nbsp; &nbsp;
        <span> Billing</span>
      </div>
      <hr className="row-divider" />
    </div>
  );
};

export default Header;
