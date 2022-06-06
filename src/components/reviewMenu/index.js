import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import menuIcon from "../../assets/images/food.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { ReactComponent as PencilIcon } from "../../assets/svg/pencilIcon.svg";

import {
  addMenuItemRequest,
  updateMenuItemSuccess,
  clearMenuItemSuccess,
  cleanMenuItemSuccessMsg,
  updateMenuItemRequest,
} from "../../redux/actions/productCatalogActions";

const ReviewMenu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, setstep } = props;
  let values = data;
  const updateMenuItemSuccess = useSelector(
    (state) => state.productCatalog.updateMenuAttributeSuccess
  );
  const menucategory = useSelector(
    (state) => state.productCatalog.categoryData
  );
  const subCategory = useSelector(
    (state) => state.productCatalog.subCategoryData
  );
  const ingredients = useSelector((state) => state.productCatalog.ingredients);
  // const getImageURL = useCallback((data) => {
  //   return (
  //     data.imageType &&
  //     STORAGE_BUCKET_URL +
  //       data.imageType.split("/")[0] +
  //       "/" +
  //       data.imageId +
  //       "." +
  //       data.imageType.split("/")[1]
  //   );
  // });
  const getCategoryName = () => {
    return menucategory.map((data, i) => {
      if (data.id == values.categoryId) {
        return data.name;
      }
    });
  };
  const getSubCategoryName = () => {
    return subCategory.map((data, i) => {
      if (data.id == values.subCategoryId) {
        return data.name;
      }
    });
  };
  const getIngredients = () => {
    let ingrData = [];
    ingredients.filter((data) => {
      if (values.ingredients.includes(data.id)) {
        ingrData.push(data);
      }
    });
    return ingrData;
  };
  return (
    <div className="customization-sec">
      <div
        onClick={() => {
          // history.push("/management/menu/Items/Add");
        }}
        className="title"
      >
        <h2>Review The Menu</h2>
      </div>
      <div className="review-sec">
        <div className="primary-details">
          <div className="review-heading">
            <h3>Primary Details</h3>
            <button
              onClick={() => {
                setstep(1);
              }}
              style={{
                color: "#67833e",
                display: "flex",
                alignItems: "center",
              }}
            >
              <PencilIcon />
              <span style={{ marginLeft: "10px" }}> Edit</span>
            </button>
          </div>
          <br />
          <br />
          <div className="custom-item">
            <div>
              <div>
                <span>Item name</span>
                <p>{values ? values.itemName : null}</p>
              </div>
              <div>
                <span>Menu Category </span>
                <p>{values ? getCategoryName() : null}</p>
              </div>
            </div>
            <div>
              <div>
                <span>Item Price</span>
                <p>{values ? values.price : null}</p>
              </div>
              <div>
                <span>Menu Sub Category</span>
                <p>{values ? getSubCategoryName() : null}</p>
              </div>
            </div>
          </div>
          <div>
            <span>Description</span>
            <p>{values ? values.description : null}</p>
          </div>

          {/* <div className="other-detail">
            <div className="review-heading">
              <h3>Other Details</h3>
            </div> */}
          {/* <div>
              <span>UOM</span>
              <p>Per Piece</p>
            </div>
            <div>
              <span>Calorie Point</span>
              <p>214 Cal</p>
            </div> */}
          {/* <div>
              <span>Select Outlet</span>
              <p>Byepass Road, Anna Nagar</p>
            </div> */}
          {/* <div>
              <span>Maximum Count For Online</span>
              <p>300</p>
            </div> */}
          {/* </div> */}
        </div>
        <div style={{ marginLeft: "4.5%", width: "42%" }}>
          <div className="review-heading">
            <h3>Customization</h3>
            <button
              onClick={() => {
                setstep(2);
              }}
              style={{
                color: "#67833e",
                display: "flex",
                alignItems: "center",
              }}
            >
              <PencilIcon />
              <span style={{ marginLeft: "10px" }}> Edit</span>
            </button>
          </div>
          <>
            {values &&
              values.customization.map((item) => (
                <div className="custom-details">
                  <div className="custom-inner">
                    <h4>{item.name ? item.name : item.modifierName}</h4>
                    {item.options.map((option) => (
                      <div>
                        <span>{option.modifierOptionName}</span>
                        <p> {option.cost}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </>
        </div>
      </div>
      {/* <div className="form-cta">
        <Link to="/management/menu/Items">
          <Button
            value={"Cancel"}
            backgroundColor={"#fff"}
            color={"rgb(103, 131, 62)"}
          />
        </Link>
        <Button
          onClick={() => {
            const formData = new FormData();
            if (
              updateMenuItemSuccess &&
              typeof updateMenuItemSuccess == "object"
            ) {
              values.modifiers = updateMenuItemSuccess;
            }
            formData.append("item", JSON.stringify(values));
            //dispatch(updateMenuItemRequest(formData));
            values.itemId != null
              ? dispatch(updateMenuItemRequest(values))
              : dispatch(addMenuItemRequest(formData));
            history.push("/management/menu/Items");
            dispatch(cleanMenuItemSuccessMsg());
          }}
          type={"submit"}
          value={"Save & Publish"}
          backgroundColor={"#67833E"}
          className="submit-button button-text"
        />
      </div> */}
    </div>
  );
};

export default ReviewMenu;
