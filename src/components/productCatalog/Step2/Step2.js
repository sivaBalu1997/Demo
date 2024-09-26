import React, { useContext } from "react";
import "./Step2.scss";
import NormalStep2 from "../NormalStep2/NormalStep2";
import { useNavigate, Link } from "react-router-dom";

import edit from "../../../assets/images/edit.png";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { useSelector } from "react-redux";
import SpecialReview from "../SpecialReview/SpecialReview";
import { useHistory } from "react-router-dom";

const Step2 = () => {
  const prizingDetail = useSelector(
    (state) => state?.PricingDetailReducer?.prizingData
  );

  const { setActiveCategory } = useContext(Contextpagejs);
  return (
    <div className="container-step2">
      <div className="Step2-Container">
        <div className="Step2-form">
          <div className="Step2-header">
            <h1 className="Step2-heading">
              Step 2 Pricing and Kitchen Details
            </h1>
            <div>
              <Link
                to="/productCatalog/Pricingandkitchendetails"
                className="editbuttonpricing"
                onClick={() =>
                  setActiveCategory("Step 2: Pricing and kitchen details")
                }
              >
                <img src={edit} alt="" width={15} height={15} />
                <span >Edit</span>
              </Link>{" "}
            </div>
          </div>

          <div className="Res">
            <h1 className="Res-heading">Alagappan Nagar</h1>
          </div>
          <div className="CostPrice">
            <h1 className="CostPrice-heading">Cost Price</h1>
            <h1 className="Rupees-heading">Rs 30</h1>
          </div>
          <h1 className="Step2Kitchen-relatedheading">Kitchen Related</h1>
          <div className="Step2KitchenRelated">
            <div className="Step2KitchenStation">
              <h1 className="Step2KitchenStationheading">Kitchen Station</h1>
              <h1 className="Step2KitchenStationvalue">
                {" "}
                {prizingDetail?.kitchenstation || "-"}
              </h1>
            </div>
            <div className="Step2Preparation">
              <h1 className="Step2Preparationheading">Preparation</h1>
              <h1 className="Step2Preparationvalue">
                {prizingDetail?.Preparationtime.hours+" hours" || "-"}{" "}{prizingDetail?.Preparationtime.minutes+" minutes" || "-"}
              </h1>
            </div>
          </div>
          <h1 className="Step2Inventory-relatedheading">Inventory</h1>
          <div className="Step2InventoryRelated">
            <div className="Step2InventoryServings">
              <h1 className="Step2Servingsheading">
                Maximum No. of servings per day
              </h1>
              <h1 className="Step2Servingsvalue">
                {" "}
                {(prizingDetail &&
                  prizingDetail.form &&
                  prizingDetail.form.Inventory1 &&
                  prizingDetail.form.Inventory1) ||
                  "-"}{" "}
              </h1>
            </div>
            <div className="Step2Threshold">
              <h1 className="Step2Thresholdheading">Threshold</h1>
              <h1 className="Step2Thresholdvalue">
                {(prizingDetail &&
                  prizingDetail.form &&
                  prizingDetail.form.Inventory2) ||
                  "-"}
              </h1>
            </div>
          </div>
          <div className="Step2InventoryRelated">
            <div className="Step2InventoryMaxCount">
              <h1 className="Step2Servingsheading">
                Next availabe time at maximum count{" "}
              </h1>
              <h1 className="Step2Servingsvalue"> Show </h1>
            </div>
            <div className="Step2ResetInventory">
              <h1 className="Step2Thresholdheading">
                Reset Inventory Everyday
              </h1>
              <h1 className="Step2Thresholdvalue">Yes</h1>
            </div>
          </div>
          {prizingDetail && prizingDetail?.normalForm ? (
            <NormalStep2 />
          ) : (
            <SpecialReview />
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2;
