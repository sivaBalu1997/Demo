import "../../styles/menus.scss";
import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "../common/InputDropDown";
import TextInput from "../common/inputTextCustomized";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { SELECTED_BRANCH_DATA } from "../../shared/constants";
import Switch from "react-switch";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import { ReactComponent as SearchIcon } from "../../assets/svg/search.svg";
import { ReactComponent as AddImageIcon } from "../../assets/svg/addImage.svg";
import { ReactComponent as Loader } from "../../assets/svg/loaderWhite.svg";

import { Fragment } from "react";
import { FaTrash } from "react-icons/fa";
import { updateMenuItemAttribute } from "../../redux/api/productCataloglogAPI";
import {
  getMenuCategoryRequest,
  getMenuSubCategoryRequest,
  getTagClassRequest,
  getIngredientsRequest,
  getModifierRequest,
  getAvailabilityRequest,
  clearMenuItemSuccess,
  updateMenuAttributeRequest,
  addMenuItemRequest,
  cleanMenuItemSuccessMsg,
  updateMenuItemRequest,
} from "../../redux/actions/productCatalogActions";

import { STORAGE_BUCKET_URL } from "../../shared/constants";
import ReviewMenu from "../reviewMenu";
import moment from "moment";
const AddItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const branch = localStorage.getItem(SELECTED_BRANCH_DATA);
  const branchDetails = branch && JSON.parse(branch);
  const menuCategories = useSelector(
    (state) => state.productCatalog.categoryData
  );
  const menuSubCategories = useSelector(
    (state) => state.productCatalog.subCategoryData
  );
  const tagClasses = useSelector((state) => state.productCatalog.tagClass);
  const modifier = useSelector((state) => state.productCatalog.modifier);
  const ingredients = useSelector((state) => state.productCatalog.ingredients);
  const updateMenuItemSuccess = useSelector(
    (state) => state.productCatalog.updateMenuAttributeSuccess
  );

  const addItemSuccess = useSelector(
    (state) => state.productCatalog.addMenuSuccess
  );
  const addMenuLoading = useSelector(
    (state) => state.productCatalog.addMenuLoading
  );
  const addMenuSuccessMessage = useSelector(
    (state) => state.productCatalog.addMenuSuccessMessage
  );

  const updatemenuItemSuccess = useSelector(
    (state) => state.productCatalog.updateMenuItemSuccess
  );

  const updatemenuItemLoading = useSelector(
    (state) => state.productCatalog.updateMenuItemLoading
  );

  const updatemenuItemSuccessMessage = useSelector(
    (state) => state.productCatalog.updateMenuItemSuccessMessage
  );
  const state = location && location.state;
  const Availability = useSelector(
    (state) => state.productCatalog.availability
  );
  const data = useSelector((state) => state);
  const [selectValue, setselectValue] = useState(menuCategories.name);
  console.log(menuCategories,"checking menu ca")
  const [category, setcategory] = useState(state ? state.categoryId : "");
  const [tag, setTag] = useState(state ? state.tagId : []);
  const [searchIngredientText, setsearchIngredientText] = useState("");
  const credentials = useSelector((state) => state.auth.credentials);
  // const branchDetails = useSelector((state) => state.auth.selectedBranch);
  const [subCategory, setsubCategory] = useState(
    state ? state.subCategoryId : ""
  );
  let filteredAvailability =
    state &&
    state.availability &&
    state.availability.length > 0 &&
    state.availability.map((u, i) => {
      return u.id;
    });

  const [availability, setavailability] = useState(
    state && state.availability ? filteredAvailability : []
  );
  // const [taxClass, settaxClass] = useState(taxClasses.name);
  const [selectedIngredients, setselectedIngredients] = useState(
    state ? state.ingredient : []
  );
  const noOfItem = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
  ];

  const maxItem = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
    { id: 6, name: "6" },
    { id: 7, name: "7" },
    { id: 8, name: "8" },
    { id: 9, name: "9" },
    { id: 10, name: "10" },
  ];
  const stateCustomization =
    state &&
    state.customization &&
    state.customization.length > 0 &&
    state.customization.map((u, i) => {
      return {
        modifierName: u.type,
        numberofItem: "",
        maxCount: u.maxRequired,
        minCount: 1,
        type: u.type,
        // serviceStream: [],
        options: [{ modifierOptionName: u.optionName, cost: u.price }],
        mendatory: false,
        typeId: u.typeId,
      };
    });

  const [step, setstep] = useState(1);
  const [cookItemBatch, setcookItemBatch] = useState(false);
  const [dineIn, setdineIn] = useState(false);
  const [online, setonline] = useState(false);
  const [pickUp, setpickUp] = useState(false);
  const [delivery, setdelivery] = useState(false);
  const [isCustomizationAdded, setIsCustomizationAdded] = useState(false);
  const [customization, setcustomization] = useState(
    state && state.customization ? true : false
  );
  const [customizedMenu, setcustomizedMenu] = useState(
    state && state.customization && stateCustomization.length > 0
      ? stateCustomization
      : []
  );
  const [counter, setcounter] = useState(1);
  const [selectedImage, setselectedImage] = useState();
  const [discription, setdiscription] = useState(
    state ? state.description : ""
  );
  const [itemName, setitemName] = useState(state ? state.itemName : "");
  const [itemCode, setitemCode] = useState(state ? state.itemCode : "");
  const [itemCost, setItemCost] = useState(state ? state.price : "");
  const [altName, setaltName] = useState(state ? state.itemAltName : "");
  const [ingredient, setIngredient] = useState([]);
  useEffect(() => {
    if (addItemSuccess && !addMenuLoading && addMenuSuccessMessage) {
      alert(addMenuSuccessMessage);
      history.push("/management/menu/Items");
      dispatch(cleanMenuItemSuccessMsg());
    }
  }, [addItemSuccess, addMenuLoading, addMenuSuccessMessage]);

  useEffect(() => {
    if (
      updatemenuItemSuccessMessage &&
      !updatemenuItemLoading &&
      updatemenuItemSuccess
    ) {
      alert(updatemenuItemSuccessMessage);
      history.push("/management/menu/Items");
      dispatch(cleanMenuItemSuccessMsg());
    }
  }, [
    updatemenuItemSuccess,
    updatemenuItemLoading,
    updatemenuItemSuccessMessage,
  ]);

  useEffect(() => {
    if (ingredients) {
      setIngredient(ingredients);
    }
  }, [ingredients]);
  const {
    register,
    errors,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState,
  } = useForm();
  const onSubmit = (data) => {};
  // console.log(`category:::::`, category);
  useEffect(() => {
    if (branchDetails) {
      dispatch(getMenuCategoryRequest(branchDetails.id));
      dispatch(getTagClassRequest(branchDetails.id));
      dispatch(getModifierRequest(branchDetails.id));
      if (category) {
        dispatch(
          getMenuSubCategoryRequest({
            locationId: branchDetails.id,
            id: category,
          })
        );
      }
    }
  }, [updateMenuItemSuccess]);

  useEffect(() => {
    if (branchDetails) {
      dispatch(getIngredientsRequest(branchDetails.id));
      dispatch(getAvailabilityRequest(branchDetails.id));
    }
  }, []);

  useEffect(() => {
    if (category && branchDetails) {
      dispatch(
        getMenuSubCategoryRequest({
          locationId: branchDetails.id,
          id: category,
        })
      );
    }
  }, [category]);
  const getImageURL = useCallback((data) => {
    return data.imageType
      ? data.imageType &&
          STORAGE_BUCKET_URL +
            data.imageType.split("/")[0] +
            "/" +
            data.imageId +
            "." +
            data.imageType.split("/")[1]
      : data.img &&
          STORAGE_BUCKET_URL +
            data.type.split("/")[0] +
            "/" +
            data.img +
            "." +
            data.type.split("/")[1];
  });

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setselectedImage(URL.createObjectURL(img));
    }
  };
  useEffect(() => {
    if (searchIngredientText.length >= 3) {
      let newArray = [...ingredients];
      const data = newArray.filter((contact) =>
        contact.name.toLowerCase().includes(searchIngredientText.toLowerCase())
      );

      setIngredient(data);
    } else if (searchIngredientText.length < 3) {
      setIngredient(ingredients);
    }
  }, [searchIngredientText]);

  let populatedIngredients = selectedIngredients
    ? selectedIngredients.map((u) => {
        return u.id;
      })
    : [];
  let customizedMenuList =
    customizedMenu && customizedMenu.length >= 1
      ? customizedMenu.map((u) => {
          return u.modifierName;
        })
      : [];

  let modifiedData = {
    locationId: branchDetails.id,
    itemCode: itemCode,
    itemName: itemName,
    description: discription,
    price: itemCost,
    categoryId: category,
    subCategoryId: subCategory,
    kitchenStations: tag,
    taxFeeId: "",
    ingredients: populatedIngredients,
    modifiers: customizedMenuList,
    availabilityId: [],
    category: "",
    subCategory: "",
    customization: customizedMenu,
    itemId: state && state && state.itemId ? state.itemId : null,
  };

  return (
    <>
      {/* <div style={{ width: "78%" }}> */}
      <div className="addItem-container">
        <div className="innerContainer">
          {step !== 3 && (
            <>
              <div className="header">Menu Item Details</div>
              {/* <div className="tab-panel-container">
                <div
                  className="tab-panel-container1"
                  onClick={() => setstep(1)}
                >
                  <span
                    className={`tab1-panel-text ${
                      step === 2 && "tab1-panel-text-active"
                    }`}
                  >
                    Step 1: Primary Details
                  </span>
                  <div
                    className={`tab-panel ${
                      step === 1 ? "tab1-active" : "tab1-disabled"
                    }`}
                  ></div>
                </div>
                <div
                  className="tab-panel-container2"
                  onClick={() => {
                    if (!itemName || !itemCost) {
                      let error = "";
                      if (!itemName) {
                        error += "Please add Item Name \n";
                      }
                      if (!itemCost) {
                        error += "Please add Item Cost";
                      }
                      console.log(error,"Chek error")
                      alert(error);
                    }
                    if (itemName && itemCost) {
                      setstep(2);
                    }
                  }}
                >
                  <span
                    className={
                      step === 1 ? "tab2-panel-text" : "tab1-panel-text"
                    }
                  >
                    Step 2: Outlet related Details
                  </span>
                  <div
                    className={`tab-panel ${
                      step === 2 ? "tab2-active" : "tab2-disabled"
                    }`}
                  ></div>
                </div>
              </div> */}
            </>
          )}

          {step === 1 && (
            <Fragment>
              {/* <div className="title-container">
                <span className="title">Step 1: Primary Details</span>
              </div> */}
              <div className="content-container">
                <div className="portion-one">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* <Dropdown
                      color={"#979797"}
                      data={menuCategory}
                      selectValue={selectValue}
                      placeholder="Item Name"
                      name="itemName"
                      // {...register("itemName")}
                    /> */}
                    <TextInput
                      type={"text"}
                      placeholder={"Item Name"}
                      name="itemName"
                      value={itemName}
                      onChange={(e) => setitemName(e.target.value)}
                      style={{ color: "#000" }}
                    />
                    <TextInput
                      type={"text"}
                      placeholder={"Item Alternate Name"}
                      name="alternateName"
                      value={altName}
                      onChange={(e) => setaltName(e.target.value)}
                      style={{ color: "#000" }}
                    />
                    {/* <input {...register("itemName")} placeholder="First name" /> */}
                    {/* <TextInput
                      type={"text"}
                      placeholder={"Item Code"}
                      name="itemCode"
                      value={itemCode}
                      onChange={(e) => setitemCode(e.target.value)}
                    /> */}
                    <Dropdown
                      color={"#979797"}
                      data={menuCategories}
                      selectValue={selectValue}
                      placeholder="Menu Category"
                      name="menuCategory"
                      value={state ? state.subCategory : ""}
                      handleSelect={(e) => {
                        setcategory(e);
                      }}
                      addItemText="Add Menu Category"
                      isAddItem
                      onAddItem={(name) => {
                        let data = {
                          id: "",
                          locationId: branchDetails.id,
                          categoryName: name,
                          parentId: null,
                          operationObject: "Category",
                        };
                        dispatch(updateMenuAttributeRequest(data));
                      }}
                    />
                    <Dropdown
                      color={"#979797"}
                      data={menuSubCategories}
                      selectValue={subCategory}
                      handleSelect={(e) => {
                        setsubCategory(e);
                      }}
                      placeholder="Menu Sub Category"
                      name="menuSubCategory"
                      addItemText="Add Menu Sub Category"
                      value={state ? state.category : ""}
                      isAddItem
                      onAddItem={(name) => {
                        let data = {
                          id: "",
                          locationId: branchDetails.id,
                          categoryName: name,
                          parentId: category,
                          operationObject: "Sub-Category",
                        };

                        dispatch(updateMenuAttributeRequest(data));
                      }}
                    />
                    {/* <TextInput
                      type={"text"}
                      placeholder={"Calorie Point"}
                      name="caloriePoint"
                    /> */}
                    {/* <Dropdown
                      color={"#979797"}
                      data={taxClasses}
                      selectValue={taxClass}
                      placeholder="Tax Class Association"
                      name="taxClassAssociation"
                      handleSelect={(e) => settaxClass(e.target.value)}
                    /> */}
                    <textarea
                      type="text"
                      name="description"
                      placeholder="Description"
                      rows="4"
                      cols="50"
                      value={discription}
                      onChange={(e) => {
                        setdiscription(e.target.value);
                      }}
                      className="discription"
                    ></textarea>

                    {/* <div className="outlet-container"> */}
                    <TextInput
                      type={"number"}
                      placeholder={"Cost Price"}
                      name="cost"
                      value={itemCost}
                      min={1}
                      onKeyDown={(evt) =>
                        evt.key === "e" && evt.preventDefault()
                      }
                      onChange={(e) => setItemCost(e.target.value)}
                      style={{ color: "#000" }}
                    />
                    <div className="dropdown-container">
                      <Dropdown
                        color={"#979797"}
                        data={tagClasses}
                        selectValue={tagClasses}
                        placeholder="Kitchen Station"
                        name="kitchenStation"
                        handleSelect={(e) => {
                          setTag([e]);
                        }}
                        isAddItem
                        onAddItem={(name) => {
                          let data = {
                            id: "",
                            locationId: branchDetails.id,
                            tagName: name,
                            operationObject: "Tag",
                          };
                          dispatch(updateMenuAttributeRequest(data));
                        }}
                      />
                    </div>
                    {/* </div> */}

                    {/* <div className="other-text">Other Details</div>
                    <Dropdown
                      color={"#979797"}
                      data={menuCategory}
                      selectValue={selectValue}
                      placeholder="UOM"
                      name="UOM"
                    />
                    <TextInput
                      type={"text"}
                      placeholder={"Serving Size"}
                      name="servingSize"
                    />
                    <TextInput
                      type={"text"}
                      placeholder={"Portion Size"}
                      name="portionSize"
                    /> */}
                    {/* <input type="submit" /> */}
                  </form>
                </div>
                <div className="portion-two">
                  {/* <div className="imageContainer">
                    {selectedImage && (
                      <>
                        <img
                          src={selectedImage}
                          height="60px"
                          width="60px"
                          alt="itemImage"
                        />
                        <CrossIcon
                          onClick={() => setselectedImage()}
                          className="selectedImage-cross"
                        />
                      </>
                    )}
                    {!selectedImage && (
                      <>
                        <AddImageIcon />
                        <label className="imageText" for="files">
                          <span for="files">ⓘ</span> You can add maximum 6
                          images (png fromat with 120 x 120 pixel size)
                        </label>
                        <input
                          type="file"
                          name="myImage"
                          onChange={onImageChange}
                          id="files"
                          style={{ visibility: "hidden" }}
                        />
                      </>
                    )}
                  </div> */}
                  {/* <Dropdown
                    color={"#979797"}
                    data={Availability}
                    selectValue={subCategory}
                    handleSelect={(e) => {
                      setavailability(e);
                    }}
                    placeholder="Avalability"
                    name="menuSubCategory"
                  /> */}

                  <div className="ingredients-container">
                    <span className="other-text">Availability</span>

                    <div className="availability-item-container">
                      <div className="availabilityDataContainer">
                        {Availability &&
                          Availability.map((u, i) => {
                            let startTime = moment(
                              new Date(
                                new Date(
                                  `1970-01-01T${u.startTime}.000Z`
                                ).getTime()
                              )
                            ).format("LT");
                            let endTime = moment(
                              new Date(
                                new Date(
                                  `1970-01-01T${u.endTime}.000Z`
                                ).getTime()
                              )
                            ).format("LT");

                            return (
                              <div className="availabilityContainer">
                                <label className="checkbox-squire">
                                  <input
                                    type="checkbox"
                                    className="promotional-msg-checkbox"
                                    checked={availability.includes(u.id)}
                                    // value={}
                                    onChange={(e) => {
                                      if (availability.includes(u.id)) {
                                        let newArray = [...availability];
                                        let data = newArray.filter((el) => {
                                          return el !== u.id;
                                        });
                                        setavailability(data);
                                      } else {
                                        setavailability([
                                          ...availability,
                                          u.id,
                                        ]);
                                      }
                                    }}
                                  />
                                  <span className="checkmark-squire"></span>
                                </label>
                                <span
                                  className="availabilityText"
                                  style={{ width: "20%" }}
                                >
                                  {u.name} &nbsp;&nbsp;&nbsp;&nbsp;
                                </span>
                                <span className="availabilityText">
                                  ({startTime + " - " + endTime})
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  <div className="ingredients-container">
                    <span className="other-text">Ingredients</span>
                    {selectedIngredients && selectedIngredients.length > 0 && (
                      <div className="selected-ingredient-container">
                        {selectedIngredients.map((u) => {
                          return (
                            <div className="selected-ingredient">
                              <img
                                src={getImageURL(u)}
                                height={"15px"}
                                width={"15px"}
                              />
                              <span className="selected-ingredient-text">
                                {u.name}
                              </span>
                              <CrossIcon
                                onClick={() => {
                                  let newArray = [...selectedIngredients];
                                  let data = newArray.filter(function (el) {
                                    return el.id !== u.id;
                                  });

                                  setselectedIngredients(data);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {/* <TextInput
                      type={"text"}
                      placeholder={"Search"}
                      name="servingSize"
                      className="search-ingredients"
                      onChange={(e) => {
                        setsearchIngredientText(e.target.value);
                      }}
                    /> */}
                    <div className="ingr-search-box-container">
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search"
                        value={searchIngredientText}
                        onChange={(e) => {
                          setsearchIngredientText(e.target.value);
                        }}
                      />
                      {searchIngredientText.length > 0 ? (
                        <CrossIcon
                          onClick={() => setsearchIngredientText("")}
                        />
                      ) : (
                        <SearchIcon />
                      )}
                    </div>

                    <div className="ingredient-item-container">
                      {ingredient.map((i) => {
                        return (
                          <div
                            className="ingredient-icon-container"
                            onClick={() => {
                              if (selectedIngredients.length < 6) {
                                if (selectedIngredients.length >= 1) {
                                  const found = selectedIngredients.some(
                                    (el) => el.id === i.id
                                  );
                                  !found &&
                                    setselectedIngredients([
                                      ...selectedIngredients,
                                      i,
                                    ]);
                                } else
                                  setselectedIngredients([
                                    ...selectedIngredients,
                                    i,
                                  ]);
                              }
                            }}
                          >
                            {/* {i.icon} */}
                            <img
                              src={getImageURL(i)}
                              height={"15px"}
                              width={"15px"}
                            />
                            <span className="ingredientName">{i.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          {step === 2 && (
            <Fragment>
              {/* <div className="title-container">
                <span className="title">Step 2: Primary Details</span>
              </div> */}
              <div className="content-container"></div>
              <div>
                {/* <span className="outlet-title">Kitchen Related</span> */}
                {/* <div className="kitchen-container"> */}
                {/* <div className="dropdown-container">
                    <Dropdown
                      color={"#979797"}
                      data={menuCategory}
                      selectValue={selectValue}
                      placeholder="Kitchen Station"
                      name="kitchenStation"
                    />
                  </div> */}
                {/* <div
                    // className="preparation-dropdown-container"
                    className="dropdown-container"
                  > */}
                {/* <Dropdown
                      color={"#979797"}
                      data={menuCategory}
                      selectValue={selectValue}
                      placeholder="Preparation time"
                      name="preparationTime"
                    />
                  </div> */}
                {/* </div> */}
                {/* <div className="kitchen-container title-container">
                  <div className="outlet-container ">
                    <span> Item cooked in a batch </span>
                    <Switch
                      onChange={() => setcookItemBatch(!cookItemBatch)}
                      checked={cookItemBatch}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor="#00B71D"
                      width={35}
                      height={18}
                    />
                  </div>
                </div>
                {cookItemBatch && (
                  <div className="content-container">
                    <div className="outlet-container">
                      <TextInput
                        type={"text"}
                        placeholder={"Number of items/portion per batch"}
                        name="portionSize"
                      />
                    </div>
                  </div>
                )} */}
                {/* <span className="outlet-title">Available Service Streams</span> */}
                {/* <div className="available-stream-container">
                  <div className="dineIn-switch-container">
                    <Switch
                      onChange={() => setdineIn(!dineIn)}
                      checked={dineIn}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor="#00B71D"
                      width={35}
                      height={18}
                    />
                  </div>
                  <div className="dineIn-container">
                    <span>Dine In</span>
                    {dineIn && (
                      <div className="kitchen-container">
                        <div className="dropdown-container">
                          <Dropdown
                            color={"#979797"}
                            data={menuCategory}
                            selectValue={selectValue}
                            placeholder="Service Time"
                            name="serviceTime"
                          />
                        </div>
                        <div style={{ width: "100%", display: "flex" }}>
                          <div className="preparation-dropdown-container">
                            <Dropdown
                              color={"#979797"}
                              data={menuCategory}
                              selectValue={selectValue}
                              placeholder="Preparation time"
                              name="preparationTime"
                            />
                          </div>
                          <div style={{ marginLeft: "4rem" }}>
                            <TextInput
                              type={"text"}
                              placeholder={"Cost Price"}
                              name="portionSize"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="available-stream-container">
                  <div className="dineIn-switch-container">
                    <Switch
                      onChange={() => setonline(!online)}
                      checked={online}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor="#00B71D"
                      width={35}
                      height={18}
                    />
                  </div>
                  <div className="dineIn-container">
                    <span>Online</span>
                    {online && (
                      <>
                        <div className="kitchen-container">
                          <div className="dropdown-container">
                            <TextInput
                              type={"text"}
                              placeholder={"Maximum Count For Online"}
                              name="portionSize"
                            />
                          </div>
                        </div>
                        <div className="kitchen-container">
                          <div className="outlet-container">
                            <span>Pick Up</span>
                            <div
                              className="dineIn-switch-container"
                              style={{ justifyContent: "spaceBetween" }}
                            >
                              <Switch
                                onChange={() => setpickUp(!pickUp)}
                                checked={pickUp}
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onColor="#00B71D"
                                width={35}
                                height={18}
                              />
                            </div>
                          </div>
                        </div>
                        {pickUp && (
                          <div className="kitchen-container">
                            <div className="dropdown-container">
                              <TextInput
                                type={"text"}
                                placeholder={"Selling Price for Pickup"}
                                name="portionSize"
                              />
                            </div>
                            <div className="preparation-dropdown-container">
                              <Dropdown
                                color={"#979797"}
                                data={menuCategory}
                                selectValue={selectValue}
                                placeholder="Service Time"
                                name="preparationTime"
                              />
                            </div>
                          </div>
                        )}
                        <div className="kitchen-container">
                          <div className="outlet-container">
                            <span>Delivery</span>
                            <div
                              className="dineIn-switch-container"
                              style={{ justifyContent: "spaceBetween" }}
                            >
                              <Switch
                                onChange={() => setdelivery(!delivery)}
                                checked={delivery}
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onColor="#00B71D"
                                width={35}
                                height={18}
                              />
                            </div>
                          </div>
                        </div>
                        {delivery && (
                          <div className="kitchen-container">
                            <div className="dropdown-container">
                              <TextInput
                                type={"text"}
                                placeholder={"Selling Price for Pickup"}
                                name="portionSize"
                              />
                            </div>
                            <div className="preparation-dropdown-container">
                              <Dropdown
                                color={"#979797"}
                                data={menuCategory}
                                selectValue={selectValue}
                                placeholder="Service Time"
                                name="preparationTime"
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div> */}
                <div className="  ">
                  <div className="kitchen-container title-container">
                    <div className="outlet-container ">
                      <span> Add Customization </span>
                      <Switch
                        onChange={() => {
                          const customizationMenu = {
                            modifierName: "",
                            name: "",
                            maxCount: "",
                            minCount: 1,
                            // serviceStream: [],
                            newModifier: true,
                            options: [{ modifierOptionName: "", cost: "" }],
                            // mendatory: false,
                          };
                          setcustomization(!customization);
                          if (customizedMenu.length === 0) {
                            let newArray = [
                              ...customizedMenu,
                              customizationMenu,
                            ];
                            setcustomizedMenu(newArray);
                          }
                        }}
                        checked={customization}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onColor="#00B71D"
                        width={35}
                        height={18}
                      />
                    </div>
                  </div>

                  {customization && (
                    <div className="dineIn-container">
                      {customizedMenu.map((u, index) => {
                        return (
                          <>
                            <div
                              className="customisation-container"
                              style={{ marginTop: "1.5rem" }}
                            >
                              <Dropdown
                                color={"#979797"}
                                data={modifier}
                                selectValue={subCategory}
                                value={u.name}
                                type={u.type}
                                isAddItem
                                handleSelect={(e, name) => {
                                  let newArray = [...customizedMenu];
                                  newArray[index].modifierName = e;
                                  newArray[index].name = name;
                                  let options = modifier.filter((data) => {
                                    return data.modifierId === u.modifierName;
                                  })[0];
                                  newArray[index].options =
                                    options.modifierOptions;
                                  newArray[index].newModifier = false;

                                  newArray[index].maxCount = options.mxRequired;
                                  setcustomizedMenu(newArray);
                                  // setsubCategory(e);
                                }}
                                placeholder="Modifier Name"
                                name="modifier"
                                onAddItem={(name) => {
                                  let newArray = [...customizedMenu];
                                  newArray[index].modifierName = name;
                                  newArray[index].newModifier = true;
                                  setIsCustomizationAdded(true);
                                  setcustomizedMenu(newArray);
                                }}
                              />
                              <Dropdown
                                color={"#979797"}
                                data={noOfItem}
                                selectValue={selectValue}
                                style={{ marginLeft: "20px" }}
                                value={u.maxCount}
                                placeholder="Min. items can be selected"
                                name="preparationTime"
                                // isAddItem
                                handleSelect={(e) => {
                                  let newArray = [...customizedMenu];
                                  newArray[index].minCount = e;
                                  setcustomizedMenu(newArray);
                                }}
                              />
                              {/* <div className="preparation-dropdown-container"> */}
                              <Dropdown
                                color={"#979797"}
                                data={maxItem}
                                selectValue={selectValue}
                                style={{ marginLeft: "20px" }}
                                value={u.maxCount}
                                placeholder="Max. items can be selected"
                                name="preparationTime"
                                // isAddItem
                                handleSelect={(e) => {
                                  let newArray = [...customizedMenu];
                                  newArray[index].maxCount = e;
                                  setcustomizedMenu(newArray);
                                }}
                              />

                              {/* </div> */}

                              {/* <Dropdown
                                color={"#979797"}
                                data={menuCategories}
                                selectValue={selectValue}
                                placeholder="Menu Category"
                                name="menuCategory"
                                handleSelect={(e) => {
                                  setcategory(e.target.value);
                                }}
                              /> */}

                              {/* <div className="preparation-dropdown-container">
                                <Dropdown
                                  color={"#979797"}
                                  data={menuCategory}
                                  selectValue={selectValue}
                                  placeholder="Available Service Stream"
                                  name="preparationTime"
                                />
                              </div> */}
                              <div>
                                <FaTrash
                                  className="add-text-margin"
                                  color="#67833E"
                                  onClick={() => {
                                    let newArray = [...customizedMenu];
                                    newArray.splice(index, 1);
                                    setcustomizedMenu(newArray);
                                  }}
                                  size={15}
                                />
                              </div>
                            </div>
                            {u.options.map((data, i) => {
                              return (
                                <div className="customisation-container">
                                  <div>
                                    <TextInput
                                      type={"text"}
                                      value={data.modifierOptionName}
                                      placeholder={"Option (Item)"}
                                      name={i}
                                      onChange={(e) => {
                                        let newArray = [...customizedMenu];
                                        newArray[index].options[
                                          i
                                        ].modifierOptionName = e.target.value;
                                        setcustomizedMenu(newArray);
                                      }}
                                      style={{ color: "#000" }}
                                    />
                                  </div>
                                  <div style={{ marginLeft: "4rem" }}>
                                    <TextInput
                                      type={"number"}
                                      placeholder={"Price"}
                                      name={100 + i}
                                      min={1}
                                      onKeyDown={(evt) =>
                                        evt.key === "e" && evt.preventDefault()
                                      }
                                      value={data.cost}
                                      onChange={(e) => {
                                        let newArray = [...customizedMenu];
                                        let data = newArray[index].options[i];
                                        data.cost = e.target.value;
                                        setcustomizedMenu(newArray);
                                      }}
                                      style={{ color: "#000" }}
                                    />
                                  </div>
                                  {u.newModifier === true &&
                                    u.options.length === i + 1 && (
                                      <span
                                        className="add-text  add-text-margin"
                                        onClick={() => {
                                          let newArray = [...customizedMenu];
                                          newArray[index].options.push({
                                            modifierOptionName: "",
                                            cost: "",
                                          });
                                          setcounter(counter + 1);
                                          setcustomizedMenu(newArray);
                                        }}
                                      >
                                        + Add Item
                                      </span>
                                    )}
                                  {u.newModifier === true &&
                                    u.options.length !== i + 1 && (
                                      <FaTrash
                                        className="add-text-margin"
                                        color="#67833E"
                                        onClick={() => {
                                          let newArray = [...customizedMenu];
                                          newArray.filter((e, i) => {});
                                          newArray[index].options.splice(i, 1);
                                          setcustomizedMenu(newArray);
                                        }}
                                      />
                                    )}
                                </div>
                              );
                            })}
                            {customizedMenu.length === index + 1 && (
                              <span
                                className="add-text"
                                onClick={() => {
                                  const customizationMenu = {
                                    modifierName: "",
                                    numberofItem: "",
                                    maxCount: "",
                                    minCount: 1,
                                    // serviceStream: [],
                                    options: [
                                      { modifierOptionName: "", cost: "" },
                                    ],
                                    mendatory: false,
                                    newModifier: true,
                                  };
                                  let newArray = [
                                    ...customizedMenu,
                                    customizationMenu,
                                  ];
                                  setcustomizedMenu(newArray);
                                }}
                              >
                                + Add Group
                              </span>
                            )}

                            {/* <div className="customisation-container">
                              <div>
                                <TextInput
                                  type={"text"}
                                  placeholder={"Option (Item)"}
                                  {name}="portionSize"
                                />
                              </div>
                              <div style={{ marginLeft: "4rem" }}>
                                <TextInput
                                  type={"text"}
                                  placeholder={"Price"}
                                  name="portionSize"
                                />
                              </div>
                              <span
                                style={{ color: "#0085FF", marginLeft: "1rem" }}
                                onClick={() => console.log("Helllo,,,,")}
                              >
                                + Add Item
                              </span>
                            </div> */}
                          </>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </Fragment>
          )}
          {step === 3 ? (
            <ReviewMenu data={modifiedData} setstep={setstep} />
          ) : null}
        </div>

        <div
          className="addItem-footer"
          style={{
            position:
              (step !== 1 &&
                customizedMenu.length < 2 &&
                customizedMenu[0] &&
                customizedMenu[0].options.length < 4) ||
              (step == 3 &&
                customizedMenu.length < 4 &&
                customizedMenu[0] &&
                customizedMenu[0].options.length < 15) ||
              step == 1 ||
              !customization
                ? step == 1
                  ? ""
                  : "absolute"
                : "",
            width:
              (step !== 1 &&
                customizedMenu.length < 2 &&
                customizedMenu[0] &&
                customizedMenu[0].options.length < 4) ||
              (step == 3 &&
                customizedMenu.length < 4 &&
                customizedMenu[0] &&
                customizedMenu[0].options.length < 15) ||
              step == 1 ||
              !customization
                ? step == 1
                  ? ""
                  : "76%"
                : "",
          }}
        >
          <div
            onClick={() => {
              history.push("/management/menu/Items");
            }}
            className="plain-button button-text"
          >
            Cancel
          </div>

          <div
            className="submit-button button-text"
            onClick={async () => {
              if (step === 1) {
                if (!itemName || !itemCost) {
                  let error = "";
                  if (!itemName) {
                    error += "Please add Item Name \n";
                  }
                  if (!itemCost) {
                    error += "Please add Item Cost";
                  }
                  console.log(error,"check error")
                  alert(error);
                }
                if (itemName && itemCost) {
                  setstep(3);
                }
              } else if (step === 2) {
                // history.push({ pathname: "/review", state: data });
                setstep(3);
                //  const formData = new FormData();
                // formData.append("itemImage", selectedImage.image);
                //formData.append("item", JSON.stringify(data));
                //    dispatch(addMenuItemRequest(formData));
              } else if (step === 3) {
                dispatch(clearMenuItemSuccess());
                let customizationData = {
                  locationId: branchDetails.id,
                  modifiers: customizedMenu,
                  operationObject: "Modifier",
                };
                let newCustomization = customizedMenu
                  .filter((u) => u.newModifier === true)
                  .map((u) => {
                    return {
                      maxCount: u.maxCount,
                      mendatory: u.mendatory,
                      minCount: u.minCount,
                      modifierName: u.modifierName,
                      numberofItem: u.numberofItem,
                      options: u.options,
                    };
                  });
                const newCustomizationData =
                  (newCustomization &&
                    newCustomization.length > 0 &&
                    (await updateMenuItemAttribute({
                      locationId: branchDetails.id,
                      modifiers: newCustomization,
                      operationObject: "Modifier",
                    })
                      .then((response) => {
                        return response.data;
                      })
                      .catch((err) => {
                        return [];
                      }))) ||
                  [];
                // isCustomizationAdded &&
                //   dispatch(updateMenuAttributeRequest(customizationData));
                let populatedIngredients = selectedIngredients
                  ? selectedIngredients.map((u) => {
                      return u.id;
                    })
                  : [];
                let customizedMenuList =
                  customizedMenu && customizedMenu.length >= 1
                    ? customizedMenu.map((u) => {
                        if (!u.newModifier)
                          return u.typeId ? u.typeId : u.modifierName;
                      })
                    : [];
                let values = {
                  locationId: branchDetails.id,
                  itemCode: itemCode,
                  altName: altName,
                  itemName: itemName,
                  description: discription,
                  price: itemCost,
                  categoryId: category,
                  subCategoryId: subCategory,
                  kitchenStations: tag,
                  taxFeeId: "",
                  ingredients: populatedIngredients,
                  modifiers: [
                    ...[...new Set(customizedMenuList.filter((u) => u && u))],
                    ...newCustomizationData,
                  ],
                  availabilityId: availability,
                  category: "",
                  subCategory: "",
                  // customization: customizedMenu,
                  itemId: state && state && state.itemId ? state.itemId : null,
                };
                const formData = new FormData();
                if (
                  updateMenuItemSuccess &&
                  typeof updateMenuItemSuccess == "object"
                ) {
                  values.modifiers = updateMenuItemSuccess;
                }
                // selectedImage && formData.append("itemImage", selectedImage);
                formData.append("item", JSON.stringify(values));
                setTimeout(() => {
                  values.itemId != null
                    ? dispatch(updateMenuItemRequest(values))
                    : dispatch(addMenuItemRequest(formData));
                }, 1000);

                // history.push("/management/menu/Items");
              }
            }}
          >
            {step === 1 ? (
              "Next Step"
            ) : step === 2 ? (
              "Review The Menu"
            ) : addMenuLoading || updatemenuItemLoading ? (
              <Loader height="30px" width="30px" />
            ) : (
              "Save and Publish"
            )}
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default AddItem;
