import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import menuIcon from "../../assets/images/food.png";

const ReviewMenu = () => {
  return (
    <div className="customization-sec">
      <div className="title">
        <Link to="/menuInput">
          <IoIosArrowBack />
          <h2>Review The Menu</h2>
        </Link>
      </div>
      <div className="review-sec">
        <div className="primary-details">
          <div className="review-heading">
            <h3>Primary Details</h3>
            <button>Edit</button>
          </div>
          <img src={menuIcon} alt="menu" />
          <div className="custom-item">
            <div>
              <div>
                <h4>Item Code</h4>
                <p>RX120000</p>
              </div>
              <div>
                <h4>Menu Category</h4>
                <p>Lunch</p>
              </div>
              <div>
                <h4>Item Price</h4>
                <p>$ 50</p>
              </div>
            </div>
            <div>
              <div>
                <h4>Item Name</h4>
                <p>Non Veg Loaded Pizza</p>
              </div>
              <div>
                <h4>menu Sub Category</h4>
                <p>Non Veg Pizza</p>
              </div>
              <div>
                <h4>Dietary Type</h4>
                <p>Non Veg</p>
              </div>
            </div>
          </div>
          <h4>Description</h4>
          <p>
            This is lamb fried in low steam and then in high steam with onion,
            tomato, chillies, pepper
          </p>
          <div className="other-detail">
            <div className="review-heading">
              <h3>Other Details</h3>
            </div>
            <div>
              <h4>UOM</h4>
              <p>Per Piece</p>
            </div>
            <div>
              <h4>Calorie Point</h4>
              <p>214 Cal</p>
            </div>
            <div>
              <h4>Select Outlet</h4>
              <p>Byepass Road, Anna Nagar</p>
            </div>
            <div>
              <h4>Maximum Count For Online</h4>
              <p>300</p>
            </div>
          </div>
        </div>
        <div className="custom-details">
          <div className="review-heading">
            <h3>Customization</h3>
            <button>Edit</button>
          </div>
          <div className="custom-inner">
            <h4>Size</h4>
            <div>
              <h4>Small</h4>
              <p>$ 20</p>
            </div>
            <div>
              <h4>Regular</h4>
              <p>$ 35</p>
            </div>
            <div>
              <h4>Large</h4>
              <p>$ 40</p>
            </div>
          </div>
          <div className="custom-inner">
            <h4>Extras</h4>
            <div>
              <h4>Cheese</h4>
              <p>$ 10</p>
            </div>
            <div>
              <h4>Chicken</h4>
              <p>$ 20</p>
            </div>
            <div>
              <h4>Onions</h4>
              <p>$ 5</p>
            </div>
          </div>
        </div>
      </div>
      <div className="form-cta">
        <Link to="/">
          <Button value={"Cancel"} backgroundColor={"#fff"} color={"#979797"} />
        </Link>
        <Link to="/menulist">
          <Button
            type={"submit"}
            value={"Save The menu"}
            backgroundColor={"#FF5554"}
            color={"#fff"}
          />
        </Link>
      </div>
    </div>
  );
};

export default ReviewMenu;
